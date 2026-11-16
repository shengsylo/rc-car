/*
 * RC 远程赛车 — 车端固件 v0.4
 * 板子：ESP32-WROOM-32UE DevKit   驱动：L298N   电池：2S 18650 (7.4V)
 * 车：红色 Rocket Racing（原车 6V）  驱动电机 OUT1=黄 OUT2=红   转向 OUT3=蓝 OUT4=黄
 *
 * 架构：手机 ──► Mac 服务器 ──► 车
 *   车只做「执行 + 自保护」，所有判断（翻车、碰撞、低电、谁在开）都在服务器。
 *   - 连 Mac 服务器（WebSocket /car），连不上每秒重试
 *   - 收 ctl → 输出 PWM；500 ms 没收到 → 刹停
 *   - 每 50 ms 发一次遥测（电压、信号、MPU6050 原始数据）
 *   - 收 cfg → 改手感参数（不用重烧）
 *   - OTA 无线烧录：bash flash.sh --ota
 *   - 蜂鸣器（D13，可选）：开机音、倒车嘀嘀、喇叭、音乐（RTTTL 铃声格式）
 *   - 陀螺仪发原始数据，水平校准在服务器做（换架子不用重烧）
 *
 * 库：WebSockets by Markus Sattler（flash.sh 会自动装）
 * 开发板：esp32 by Espressif v3.x，"ESP32 Dev Module"
 * 最快的烧录方式：flash.sh（第一次 USB，之后 --ota）
 */

#include <WiFi.h>
#include <ESPmDNS.h>
#include <WebSocketsClient.h>
#include <ArduinoOTA.h>
#include <Wire.h>
#include <esp_system.h>
#include <HTTPUpdate.h>
#include <Preferences.h>
#include <esp_ota_ops.h>

// ================== 配置（flash.sh 会自动填） ==================
const char* WIFI_SSID   = "你的WiFi名称";
const char* WIFI_PASS   = "你的WiFi密码";
const int   CAR_ID    = 1;
const char* SERVER_HOST = "";        // Mac 的 mDNS 名字（不带 .local），flash.sh 自动填
const char* SERVER_IP   = "";        // Mac 的 IP，mDNS 失败时备用，flash.sh 自动填
const int   SERVER_PORT = 8080;
const char* FW_VERSION  = "0.6.0";

// 运行时配置：从 NVS 读（配网写入），bin 里不再有密码。上面的常量只是旧版 flash.sh 的后备值
Preferences prefs;
char cfgSsid[33] = "", cfgPass[65] = "", cfgHost[33] = "", cfgIp[40] = "", cfgOtaPw[33] = "";
int  carId = 1;
bool provisioned = false;

// ---- 引脚：按板子自动选默认值；Studio 会根据接线图生成 pins.h 覆盖 ----
#if __has_include("pins.h")
#include "pins.h"
#endif
#if CONFIG_IDF_TARGET_ESP32C3
  // ESP32-C3 SuperMini + DRV8833 + 舵机（保时捷小车）
  #ifndef RC_DRIVER
  #define RC_DRIVER 2          // 1 = L298N（EN+IN1/IN2，转向电机）  2 = DRV8833（IN1/IN2 都是 PWM，转向用舵机）
  #endif
  #ifndef RC_PIN_IN1
  #define RC_PIN_IN1 3
  #define RC_PIN_IN2 4
  #endif
  #ifndef RC_PIN_SERVO
  #define RC_PIN_SERVO 5
  #endif
  #ifndef RC_PIN_SDA
  #define RC_PIN_SDA 8
  #define RC_PIN_SCL 9
  #endif
  #ifndef RC_PIN_BUZ
  #define RC_PIN_BUZ 10
  #endif
  #ifndef RC_PIN_BATT
  #define RC_PIN_BATT 0
  #endif
#endif
#ifndef RC_DRIVER
#define RC_DRIVER 1
#endif
#ifndef RC_PIN_ENA
#define RC_PIN_ENA 25
#endif
#ifndef RC_PIN_IN1
#define RC_PIN_IN1 26
#define RC_PIN_IN2 27
#endif
#ifndef RC_PIN_ENB
#define RC_PIN_ENB 14
#define RC_PIN_IN3 32
#define RC_PIN_IN4 33
#endif
#ifndef RC_PIN_SDA
#define RC_PIN_SDA 21
#define RC_PIN_SCL 22
#endif
#ifndef RC_PIN_BATT
#define RC_PIN_BATT 34
#endif
#ifndef RC_PIN_BUZ
#define RC_PIN_BUZ 13
#endif
#ifndef RC_PIN_SERVO
#define RC_PIN_SERVO 18
#endif
#ifndef RC_BATT_SENSE
#define RC_BATT_SENSE false
#endif
#ifndef RC_BATT_DIVIDER
#define RC_BATT_DIVIDER ((22.0 + 10.0) / 10.0)
#endif
#define STEER_MOTOR (RC_DRIVER == 1)   // 只有 L298N 板有转向电机，其他一律舵机

// L298N（RC_DRIVER 1）
const int PIN_ENA = RC_PIN_ENA, PIN_IN1 = RC_PIN_IN1, PIN_IN2 = RC_PIN_IN2;   // 驱动
const int PIN_ENB = RC_PIN_ENB, PIN_IN3 = RC_PIN_IN3, PIN_IN4 = RC_PIN_IN4;   // 转向

// MPU6050（可选，没接也能跑）
int PIN_SDA = RC_PIN_SDA, PIN_SCL = RC_PIN_SCL;   // 开机会自动试正反两种接法

// 电池电压（可选）：开关后的电池+ ─22kΩ─ ADC ─10kΩ─ GND
const bool  BATT_SENSE   = RC_BATT_SENSE;     // 接好电阻后在 pins.h 里定义 RC_BATT_SENSE true
const int   PIN_BATT     = RC_PIN_BATT;
const float BATT_DIVIDER = RC_BATT_DIVIDER;

// 蜂鸣器（可选）
const int PIN_BUZ = RC_PIN_BUZ;
// 舵机转向：信号线接 PIN_SERVO
const int PIN_SERVO = RC_PIN_SERVO;

const uint32_t FAILSAFE_MS = 500;
const uint32_t TELEM_MS    = 50;
// ===========================================================

// 声音用的音符（放在最上面：Arduino 会把函数声明自动插到文件开头，类型必须先定义）
struct Note { uint16_t f; uint16_t ms; };

// 手感参数（服务器可以远程改）
float cfgDriveMax = 1.00;   // 最大油门
float cfgDriveMin = 0.30;   // 起转占空比
float cfgSteerMax = 1.00;   // 转向最大力度
float cfgSteerMin = 0.55;   // 转向起作用的力度
float cfgVLimit   = 6.6;    // 低于此电压限速 50%
float cfgVCutoff  = 6.0;    // 低于此电压停车
float cfgSteerHold = 0.60;  // 转向打到底 0.3 秒后降到这个力度（防止"哒哒"打滑）
bool  cfgDriveInv = false;  // 前后反了
bool  cfgSteerInv = false;  // 左右反了
float cfgRetMs     = 80;    // 放开转向时反向轻推多久（帮前轮离开打到底的位置，弹簧再拉回中间）
float cfgRetPow    = 0.60;  // 反向轻推的力度
uint32_t retUntil = 0; int retDir = 0;   // 正在回正脉冲：方向和结束时间
float cfgRevDead  = 60;     // 前进↔后退直接切换时，先刹车多少毫秒再反转（减小电流冲击，0 = 直接反转）
uint32_t revUntil = 0;
float cfgRampMs   = 0;      // 油门从 0 加到满要多少毫秒（软启动，减少起步电流尖峰）
float cfgSteerCap = 1.00;   // 转向电机正在用力时，驱动最多给多少（两个电机不同时满载）
int   cfgBz     = 0;        // 蜂鸣器：0 关（默认，声音在手机上放）/ 1 无源（能放音乐）/ 2 有源（只会嘀）
bool  cfgBzLo   = false;    // 低电平触发的模块（不响或一直响就切换这个）
float cfgBVol   = 0.5;      // 音量（无源蜂鸣器用占空比调，0–1）
bool  cfgRevBeep = true;    // 倒车嘀嘀
int   cfgSteerMode = STEER_MOTOR ? 1 : 2;     // 转向：0 打到底（原来的）/ 1 比例（电机力度对抗回中弹簧，歪一点转一点）/ 2 舵机
float cfgPMin   = 0.35;     // 比例模式：轮子刚好开始转的力度
float cfgServoC = 1500;     // 舵机中位（微秒）
float cfgServoR = 400;      // 舵机行程（微秒，单边）
bool  servoOn = false;
float lastAbsS = 0;
float driveTarget = 0, driveCur = 0; uint32_t lastRampMs = 0;
const uint32_t STEER_PUSH_MS = 300;
int   steerDir = 0; uint32_t steerSince = 0;
const float DEADZONE = 0.06;

#if RC_DRIVER == 2
const int PWM_FREQ = 20000,   // DRV8833：20kHz 听不到啸叫，低速更顺
#else
const int PWM_FREQ = 2000,
#endif
          PWM_BITS = 10, PWM_MAX = (1 << PWM_BITS) - 1;

WebSocketsClient ws;
bool     wsUp       = false;
uint32_t lastCtlMs  = 0, lastTelem = 0, lastUpMs = 0, lastResolve = 0;
uint32_t lastSeq    = 0, telSeq = 0;
bool     failsafe   = true;
float    cmdTh = 0, cmdSt = 0, outTh = 0, outSt = 0;
float    battV = 0;
bool     imuOk = false;          // 开机时检测到
int      imuFails = 0;           // 连续读失败次数
const char* imuStat = "none";    // ok / none / err
const char* batStat = "off";     // ok / off / err
uint8_t  imuAddr = 0x68;
int16_t  imuRaw[7];               // ax ay az temp gx gy gz
char     i2cFound[48] = "";       // I2C 扫描到的地址，诊断接线用
const char* imuChip = "";
uint32_t lastImuProbe = 0;

// 服务器推送的 OTA
char     otaUrl[160] = "";
bool     otaPending = false;

// 自检（只能由服务器发起，开机不会自己跑）
struct StStep { const char* id; const char* name; uint16_t ms; float th; float st; const char* look; };
const StStep ST_STEPS[] = {
  {"imu",     "陀螺仪", 1000, 0,     0,  "车放着别碰它"},
  {"buz",     "蜂鸣器",  600, 0,     0,  "应该听到「嘀」一声（没接蜂鸣器就忽略）"},
  {"steer_l", "左转",    500, 0,    -1,  "前轮应该向左打"},
  {"steer_r", "右转",    500, 0,     1,  "前轮应该向右打"},
  {"steer_c", "回正",    400, 0,     0,  "前轮应该回到中间"},
  {"drive_f", "前进",    700, 0.45,  0,  "后轮应该向前转"},
  {"drive_b", "后退",    700, -0.45, 0,  "后轮应该向后转"},
  {"brake",   "刹车",    400, 0,     0,  "后轮应该停住"},
};
const int ST_N = sizeof(ST_STEPS) / sizeof(ST_STEPS[0]);
bool     stActive = false;
int      stIdx = -1;
uint32_t stAt = 0;
float    stAcc[6]; int stCnt = 0;      // 陀螺仪：ax ay az gx gy gz 累加
float    stV0 = 0, stVmin = 99;
String   serverAddr;
bool     wsTried = false;

// ---- 断线诊断计数（随遥测发给服务器，服务器负责判断原因） ----
uint32_t fsCount = 0;          // 失联刹停次数
uint32_t ctlGapMax = 0;        // 两个控制包之间最长的间隔（每次遥测后清零）
uint32_t wifiDiscCount = 0;    // WiFi 掉线次数
int      wifiLastReason = 0;   // 最后一次 WiFi 掉线原因代码
uint32_t wsDiscCount = 0;      // 和服务器断开次数
uint32_t lastFsPrint = 0;
const char* bootReason = "?";

const char* resetReasonStr() {
  switch (esp_reset_reason()) {
    case ESP_RST_POWERON:  return "POWERON";     // 正常开机
    case ESP_RST_SW:       return "SW";          // 软件重启（比如 OTA）
    case ESP_RST_PANIC:    return "PANIC";       // 程序崩溃
    case ESP_RST_INT_WDT:
    case ESP_RST_TASK_WDT:
    case ESP_RST_WDT:      return "WDT";         // 卡死被看门狗重启
    case ESP_RST_BROWNOUT: return "BROWNOUT";    // 电压不够
    case ESP_RST_EXT:      return "EXT";         // 按了 EN 键
    case ESP_RST_DEEPSLEEP:return "SLEEP";
    default:               return "OTHER";
  }
}
const char* wifiReasonCode(int r) {
  switch (r) {
    case 2: case 4: case 15: return "认证超时：密码或路由器问题";
    case 8:   return "车主动断开";
    case 200: return "收不到路由器信号（信号太弱）";
    case 201: return "找不到 WiFi";
    case 202: return "认证失败：密码错";
    case 203: return "连接失败";
    case 34:  return "路由器那边信号太差";
    default:  return "其他";
  }
}

// ---------------- PWM（兼容 core v2 / v3） ----------------
void pwmSetup(int pin, int ch) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  ledcAttach(pin, PWM_FREQ, PWM_BITS);
#else
  ledcSetup(ch, PWM_FREQ, PWM_BITS); ledcAttachPin(pin, ch);
#endif
}
void pwmWrite(int pin, int ch, int duty) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  ledcWrite(pin, duty);
#else
  ledcWrite(ch, duty);
#endif
}


// ---------------- 声音（蜂鸣器） ----------------
// 优先级：喇叭 > 音效 > 倒车嘀嘀 > 音乐。音乐按时间走，被喇叭盖住的那一段会跳过，不会卡住。
const int MUSIC_MAX = 240, SFX_MAX = 24;
Note     music[MUSIC_MAX]; int musicN = 0, musicI = 0; uint32_t musicAt = 0; bool musicLoop = false, musicOn = false;
Note     sfx[SFX_MAX];     int sfxN = 0,   sfxI = 0;   uint32_t sfxAt = 0;
bool     hornOn = false;
uint32_t revSince = 0;
int      bzLastF = -1;
const int BZ_CH = 4, BZ_BITS = 10, BZ_MAX = (1 << BZ_BITS) - 1;

void bzSetup() {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  #if CONFIG_IDF_TARGET_ESP32C3
  ledcAttach(PIN_BUZ, 2000, BZ_BITS);
  #else
  ledcAttachChannel(PIN_BUZ, 2000, BZ_BITS, BZ_CH);   // 通道 4（定时器 2），不和电机的 PWM 抢
  #endif
#else
  ledcSetup(BZ_CH, 2000, BZ_BITS); ledcAttachPin(PIN_BUZ, BZ_CH);
#endif
  bzLastF = -1;
}
void bzDuty(int d) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  ledcWrite(PIN_BUZ, d);
#else
  ledcWrite(BZ_CH, d);
#endif
}
void bzOut(int f) {                    // f = 0 静音
  if (cfgBz == 0) f = 0;
  if (f == bzLastF) return;
  bzLastF = f;
  if (f <= 0) { bzDuty(cfgBzLo ? BZ_MAX : 0); return; }
  if (cfgBz == 2) { bzDuty(cfgBzLo ? 0 : BZ_MAX); return; }      // 有源：给电就响，音高固定
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  ledcChangeFrequency(PIN_BUZ, f, BZ_BITS);
#else
  ledcChangeFrequency(BZ_CH, f, BZ_BITS);
#endif
  int d = (int)(constrain(cfgBVol, 0.02, 1.0) * (BZ_MAX / 2));   // 50% 占空比最响
  bzDuty(cfgBzLo ? BZ_MAX - d : d);
}

// 音符：c4 = 262Hz … 用 RTTTL 半音编号
float noteHz(int semis) { return 440.0f * powf(2.0f, (semis - 9) / 12.0f) / 16.0f; }   // semis 从 c0 起算

void sfxPlay(const Note* n, int cnt) {
  if (cfgBz == 0) return;
  sfxN = min(cnt, SFX_MAX); memcpy(sfx, n, sfxN * sizeof(Note)); sfxI = 0; sfxAt = millis();
}
// 内置音效（自己写的短音，不涉及任何版权）
const Note SFX_BOOT[]   = {{1047,90},{1319,90},{1568,90},{2093,220}};
const Note SFX_ONLINE[] = {{1568,70},{0,40},{2093,120}};
const Note SFX_OFFLINE[]= {{2093,90},{0,30},{1047,200}};
const Note SFX_CLAIM[]  = {{1319,60},{1760,90}};
const Note SFX_RELEASE[]= {{1760,60},{1319,90}};
const Note SFX_OK[]     = {{2093,120}};
const Note SFX_ERR[]    = {{330,180},{0,60},{330,300}};
const Note SFX_ALARM[]  = {{1800,150},{1200,150},{1800,150},{1200,150},{1800,150},{1200,300}};
const Note SFX_BEEP[]   = {{1500,200}};
const Note SFX_COUNT[]  = {{880,180},{0,820},{880,180},{0,820},{880,180},{0,820},{880,180},{0,820},{880,180},{0,820},{1760,700}};   // F1 五盏灯起步
const Note SFX_COIN[]   = {{988,70},{1319,260}};
const Note SFX_LOWBAT[] = {{1200,100},{0,80},{900,100},{0,80},{600,250}};
#define SFX(a) sfxPlay(a, sizeof(a) / sizeof(a[0]))
bool sfxByName(const char* n) {
  if (!strcmp(n, "boot")) SFX(SFX_BOOT); else if (!strcmp(n, "online")) SFX(SFX_ONLINE);
  else if (!strcmp(n, "offline")) SFX(SFX_OFFLINE); else if (!strcmp(n, "claim")) SFX(SFX_CLAIM);
  else if (!strcmp(n, "release")) SFX(SFX_RELEASE); else if (!strcmp(n, "ok")) SFX(SFX_OK);
  else if (!strcmp(n, "err")) SFX(SFX_ERR); else if (!strcmp(n, "alarm")) SFX(SFX_ALARM);
  else if (!strcmp(n, "beep")) SFX(SFX_BEEP); else if (!strcmp(n, "count")) SFX(SFX_COUNT);
  else if (!strcmp(n, "coin")) SFX(SFX_COIN); else if (!strcmp(n, "lowbat")) SFX(SFX_LOWBAT);
  else return false;
  return true;
}

// RTTTL（手机铃声格式）："名字:d=4,o=5,b=120:8e6,8d#6,4p,..."
int rtttlParse(const char* s) {
  int d = 4, o = 5, b = 120;
  const char* p = strchr(s, ':'); if (!p) return 0; p++;
  while (*p && *p != ':') {
    while (*p == ' ' || *p == ',') p++;
    char k = *p; if (!k || k == ':') break;
    p++; if (*p == '=') p++;
    int v = atoi(p); while (*p >= '0' && *p <= '9') p++;
    if (k == 'd' && v > 0) d = v; else if (k == 'o' && v > 0) o = v; else if (k == 'b' && v > 0) b = v;
  }
  if (*p != ':') return 0; p++;
  uint32_t whole = 240000UL / (uint32_t)b;    // 一个全音符多少毫秒
  int n = 0;
  static const int base[7] = {9, 11, 0, 2, 4, 5, 7};   // a b c d e f g → 半音
  while (*p && *p != '"' && n < MUSIC_MAX) {
    while (*p == ' ' || *p == ',') p++;
    if (!*p || *p == '"') break;
    int dur = d; if (*p >= '0' && *p <= '9') { dur = atoi(p); while (*p >= '0' && *p <= '9') p++; }
    char c = tolower(*p); if (!c) break; p++;
    int semi = -1;
    if (c >= 'a' && c <= 'g') semi = base[c - 'a'];
    else if (c != 'p') { while (*p && *p != ',' && *p != '"') p++; continue; }   // 不认识的字，跳过
    if (*p == '#') { semi++; p++; }
    bool dot = false; if (*p == '.') { dot = true; p++; }
    int oct = o; if (*p >= '0' && *p <= '9') { oct = *p - '0'; p++; }
    if (*p == '.') { dot = true; p++; }
    uint32_t ms = whole / (uint32_t)max(dur, 1); if (dot) ms += ms / 2;
    uint16_t f = semi < 0 ? 0 : (uint16_t)noteHz(oct * 12 + semi + 12 * 0);
    // 两个一样的音连在一起会听不出分开，每个音结尾留 10% 空隙
    uint16_t gap = ms > 40 ? ms / 10 : 0;
    if (n < MUSIC_MAX) music[n++] = {f, (uint16_t)(ms - gap)};
    if (gap && n < MUSIC_MAX) music[n++] = {0, gap};
  }
  return n;
}
void musicStop() { musicOn = false; musicN = 0; }

void soundTick() {
  uint32_t now = millis();
  int f = 0;
  // 音乐（时间一直往前走）
  if (musicOn) {
    while (musicI < musicN && now - musicAt >= music[musicI].ms) { musicAt += music[musicI].ms; musicI++; }
    if (musicI >= musicN) { if (musicLoop && musicN) { musicI = 0; musicAt = now; } else musicOn = false; }
  }
  int mf = musicOn && musicI < musicN ? music[musicI].f : 0;
  // 音效
  int sf = -1;
  if (sfxI < sfxN) {
    while (sfxI < sfxN && now - sfxAt >= sfx[sfxI].ms) { sfxAt += sfx[sfxI].ms; sfxI++; }
    if (sfxI < sfxN) sf = sfx[sfxI].f;
  }
  // 倒车嘀嘀：倒车超过 0.2 秒开始，响 0.35 秒停 0.35 秒
  bool rev = !failsafe && !stActive && driveTarget < -0.05;
  if (rev) { if (!revSince) revSince = now; } else revSince = 0;
  int rf = 0;
  if (rev && cfgRevBeep && now - revSince > 200) rf = ((now - revSince - 200) % 700) < 350 ? 1100 : 0;

  if (hornOn && !failsafe) f = ((now / 18) & 1) ? 420 : 520;   // 双音喇叭（快速交替，像汽车喇叭）
  else if (sf >= 0) f = sf;
  else if (rev && cfgRevBeep) f = rf;                          // 倒车时音乐让路
  else f = mf;
  bzOut(f);
}

// ---------------- 电机 ----------------
// 驱动电机 A：dir 1 前 / -1 后 / 0 滑行；duty 0–1
void motorA(int dir, float duty) {
  int d = (int)(constrain(duty, 0, 1) * PWM_MAX);
#if RC_DRIVER == 2
  if (dir > 0)      { pwmWrite(PIN_IN1, 0, d); pwmWrite(PIN_IN2, 1, 0); }
  else if (dir < 0) { pwmWrite(PIN_IN1, 0, 0); pwmWrite(PIN_IN2, 1, d); }
  else              { pwmWrite(PIN_IN1, 0, 0); pwmWrite(PIN_IN2, 1, 0); }
#else
  digitalWrite(PIN_IN1, dir > 0 ? HIGH : LOW);
  digitalWrite(PIN_IN2, dir < 0 ? HIGH : LOW);
  pwmWrite(PIN_ENA, 0, dir ? d : 0);
#endif
}
void motorABrake() {
#if RC_DRIVER == 2
  pwmWrite(PIN_IN1, 0, PWM_MAX); pwmWrite(PIN_IN2, 1, PWM_MAX);
#else
  digitalWrite(PIN_IN1, HIGH); digitalWrite(PIN_IN2, HIGH); pwmWrite(PIN_ENA, 0, PWM_MAX);
#endif
}
void steerOff() {
#if STEER_MOTOR
  digitalWrite(PIN_IN3, LOW); digitalWrite(PIN_IN4, LOW); pwmWrite(PIN_ENB, 1, 0);
#endif
}
void driveOut(float v) {
  outTh = v;
  if (fabs(v) < 0.001) { motorA(0, 0); return; }
  float hw = cfgDriveInv ? -v : v;
  float d = cfgDriveMin + (1.0 - cfgDriveMin) * fabs(v);
  motorA(hw > 0 ? 1 : -1, d);
}
void brake() {
  outTh = 0; driveTarget = 0; driveCur = 0;
  motorABrake();
}
void steerHw(int dir, float duty) {          // 直接驱动转向电机（dir = -1 左 / 1 右，已处理反向设置）
#if !STEER_MOTOR
  return;
#endif
  int hw = cfgSteerInv ? -dir : dir;
  digitalWrite(PIN_IN3, hw < 0 ? HIGH : LOW);
  digitalWrite(PIN_IN4, hw < 0 ? LOW : HIGH);
  pwmWrite(PIN_ENB, 1, (int)(constrain(duty, 0, 1) * PWM_MAX));
}
void servoOut(float s) {
  if (!servoOn) {
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  #if CONFIG_IDF_TARGET_ESP32C3
    ledcAttach(PIN_SERVO, 50, 14);          // C3 只有 6 个通道，自动分配；14 位是 C3 在 50Hz 的上限
  #else
    ledcAttachChannel(PIN_SERVO, 50, 16, 6);
  #endif
#else
    ledcSetup(6, 50, 16); ledcAttachPin(PIN_SERVO, 6);
#endif
    servoOn = true;
    steerOff();   // 原来的转向电机断电
  }
  float us = cfgServoC + constrain(cfgSteerInv ? -s : s, -1, 1) * cfgServoR * cfgSteerMax;
#if CONFIG_IDF_TARGET_ESP32C3
  int duty = (int)(constrain(us, 500, 2500) / 20000.0 * 16383);
#else
  int duty = (int)(constrain(us, 500, 2500) / 20000.0 * 65535);
#endif
#if ESP_ARDUINO_VERSION_MAJOR >= 3
  ledcWrite(PIN_SERVO, duty);
#else
  ledcWrite(6, duty);
#endif
}

void steerOut(float s) {
  outSt = s;
  if (cfgSteerMode == 2 || !STEER_MOTOR) { servoOut(s); steerDir = 0; retDir = 0; return; }
  // 比例模式：小输入 = 小力度，弹簧把轮子拉回一部分，所以轮子只转一点
  const float dz = cfgSteerMode == 1 ? 0.04 : 0.15;
  if (fabs(s) < dz) {
    // 刚放开：如果之前打了 0.15 秒以上，反向轻推一下，帮它离开打到底的位置
    if (steerDir != 0 && millis() - steerSince > 150 && cfgRetMs > 0 && (cfgSteerMode == 0 || lastAbsS > 0.8)) { retDir = -steerDir; retUntil = millis() + (uint32_t)cfgRetMs; }
    steerDir = 0; outSt = 0;
    if (retDir != 0 && (int32_t)(retUntil - millis()) > 0) { steerHw(retDir, cfgRetPow); return; }
    retDir = 0;
    steerOff();   // 断电滑行，弹簧拉回中间
    return;
  }
  retDir = 0;
  int dir = s < 0 ? -1 : 1;
  if (dir != steerDir) { steerDir = dir; steerSince = millis(); }
  float hw = cfgSteerInv ? -s : s;
  digitalWrite(PIN_IN3, hw < 0 ? HIGH : LOW);
  digitalWrite(PIN_IN4, hw < 0 ? LOW : HIGH);
  lastAbsS = fabs(s);
  float d;
  if (cfgSteerMode == 1) {
    d = (cfgPMin + (1.0 - cfgPMin) * fabs(s)) * cfgSteerMax;
    if (fabs(s) > 0.95 && millis() - steerSince > STEER_PUSH_MS) d = fmin(d, fmax(cfgSteerHold, cfgPMin + 0.1));   // 只有打满时才降到保持力度
  } else {
    d = (cfgSteerMin + (1.0 - cfgSteerMin) * fabs(s)) * cfgSteerMax;
    // 先全力打过去，0.3 秒后降到保持力度：转向打到底时不会一直顶着打滑
    if (millis() - steerSince > STEER_PUSH_MS) d = fmin(d, cfgSteerHold);
  }
  pwmWrite(PIN_ENB, 1, (int)(constrain(d, 0, 1) * PWM_MAX));
}
float curve(float x) { if (fabs(x) < DEADZONE) return 0; return (x > 0 ? 1 : -1) * x * x; }

// 软启动：加油门时慢慢加，减油门/刹车立刻生效；转向电机用力的那 0.3 秒里驱动限到 cfgSteerCap
void driveRamp() {
  if (failsafe) return;
  uint32_t now = millis();
  float dt = lastRampMs ? (float)(now - lastRampMs) : 0; lastRampMs = now;
  bool pushing = steerDir != 0 && now - steerSince < STEER_PUSH_MS;
  float target = driveTarget * (pushing ? cfgSteerCap : 1.0f);
  // 前进↔后退直接切换：先刹车一小段（轮子照样瞬间锁死，但电流冲击约为直接反转的一半）
  if (driveCur != 0 && target != 0 && (target > 0) != (driveCur > 0) && cfgRevDead > 0) { revUntil = now + (uint32_t)cfgRevDead; driveCur = 0; }
  if ((int32_t)(revUntil - now) > 0) {
    if (target == 0) { revUntil = 0; }
    else { motorABrake(); outTh = 0; return; }
  }
  if (driveCur != 0 && (target == 0 || (target > 0) != (driveCur > 0))) driveCur = 0;   // 换方向先归零
  if (fabs(target) <= fabs(driveCur) || cfgRampMs < 1) driveCur = target;               // 减速立刻
  else {
    float step = dt / cfgRampMs;
    float mag = fmin(fabs(target), fabs(driveCur) + step);
    driveCur = target > 0 ? mag : -mag;
  }
  driveOut(driveCur);
}

void apply() {
  if (failsafe) { brake(); steerOut(0); hornOn = false; return; }
  float limit = cfgDriveMax;
  if (BATT_SENSE && strcmp(batStat, "ok") == 0) {   // 只有读数可信时才限速
    if (battV < cfgVCutoff) limit = 0;
    else if (battV < cfgVLimit) limit *= 0.5;
  }
  steerOut(cmdSt);                     // 先转向，driveRamp 才知道转向电机是不是正在用力
  driveTarget = curve(cmdTh) * limit;
  driveRamp();
}

// ---------------- MPU6050（直接读寄存器，不用额外库） ----------------
bool i2cWrite(uint8_t addr, uint8_t reg, uint8_t val) {
  Wire.beginTransmission(addr); Wire.write(reg); Wire.write(val);
  return Wire.endTransmission() == 0;
}
void i2cScan() {
  i2cFound[0] = 0; int n = 0;
  for (uint8_t a = 1; a < 127; a++) {
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) {
      char t[8]; snprintf(t, sizeof(t), "%s0x%02X", n ? "," : "", a);
      if (strlen(i2cFound) + strlen(t) < sizeof(i2cFound)) strcat(i2cFound, t);
      n++;
    }
  }
  if (n) Serial.printf("扫描到 %s\n", i2cFound);
  else Serial.println("空");
}

bool imuProbe() {
  imuOk = false;
  for (uint8_t a : {0x68, 0x69}) {
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) { imuAddr = a; imuOk = true; break; }
  }
  if (!imuOk) { imuStat = "none"; return false; }
  uint8_t who = 0;
  Wire.beginTransmission(imuAddr); Wire.write(0x75);
  if (Wire.endTransmission(false) == 0 && Wire.requestFrom((int)imuAddr, 1) == 1) who = Wire.read();
  imuChip = who == 0x68 ? "MPU6050" : who == 0x70 ? "MPU6500" : who == 0x71 ? "MPU9250" :
            who == 0x72 ? "MPU6052C" : who == 0x98 ? "ICM20689" : "未知型号";
  i2cWrite(imuAddr, 0x6B, 0x01);   // 唤醒，用陀螺仪时钟（比内部振荡器稳）
  delay(5);
  i2cWrite(imuAddr, 0x1A, 0x03);   // 低通 44Hz
  i2cWrite(imuAddr, 0x1B, 0x08);   // 陀螺 ±500°/s
  i2cWrite(imuAddr, 0x1C, 0x10);   // 加速度 ±8g
  imuStat = "ok"; imuFails = 0;
  Serial.printf("陀螺仪 OK：%s（WHO_AM_I=0x%02X）地址 0x%02X\n", imuChip, who, imuAddr);
  return true;
}

void imuInit() {
  // 两种接法都试：SDA/SCL 接反是最常见的接线错误
  const int pairs[2][2] = {{21, 22}, {22, 21}};
  for (int k = 0; k < 2; k++) {
    if (k) Wire.end();
    PIN_SDA = pairs[k][0]; PIN_SCL = pairs[k][1];
    Wire.begin(PIN_SDA, PIN_SCL, 100000);   // 100kHz：杜邦线长，400k 容易出错
    Wire.setTimeOut(20);                    // 线松了也不会卡住主循环
    Serial.printf("I2C 试 SDA=D%d SCL=D%d：", PIN_SDA, PIN_SCL);
    i2cScan();
    if (imuProbe()) {
      if (k) Serial.println("⚠ SDA 和 SCL 接反了：已经自动适配，可以正常用（有空可以把两根线对调回来）");
      break;
    }
  }
  if (!imuOk) {
    // 两种都不行：回到标准接法，之后每 5 秒再找
    Wire.end(); PIN_SDA = 21; PIN_SCL = 22; Wire.begin(PIN_SDA, PIN_SCL, 100000); Wire.setTimeOut(20);
    Serial.println("陀螺仪未检测到。I2C 上什么都没有 → 按顺序检查：");
    Serial.println("  1. 陀螺仪板上的绿色小灯亮不亮？不亮 = VCC/GND 没接好（VCC 可以接 3V3 或 VIN）");
    Serial.println("  2. 陀螺仪的排针焊了吗？只插不焊很容易接触不良");
    Serial.println("  3. SDA 接 D21（右排第 5 个，RX0 下面），SCL 接 D22（右排第 2 个，D23 下面）");
    Serial.println("  没接也没关系，每 5 秒会再找一次");
  }
  lastImuProbe = millis();
}
void imuRead() {
  if (!imuOk) return;
  bool ok = false;
  Wire.beginTransmission(imuAddr); Wire.write(0x3B);
  if (Wire.endTransmission(false) == 0 && Wire.requestFrom((int)imuAddr, 14) == 14) {
    for (int i = 0; i < 7; i++) { int hi = Wire.read(); int lo = Wire.read(); imuRaw[i] = (int16_t)((hi << 8) | lo); }
    // 全 0 或全 -1 说明线松了
    ok = !(imuRaw[0] == 0 && imuRaw[1] == 0 && imuRaw[2] == 0) && !(imuRaw[0] == -1 && imuRaw[1] == -1 && imuRaw[2] == -1);
  }
  if (ok) { imuFails = 0; if (strcmp(imuStat, "ok") != 0) { imuStat = "ok"; Serial.println("MPU6050 恢复"); } }
  else if (++imuFails == 10) { imuStat = "err"; Serial.println("MPU6050 读不到，标记为不工作（不影响开车）"); }
  if (imuFails > 0 && imuFails % 100 == 0) { imuProbe(); }   // 每 5 秒试着重新初始化
}

// ---------------- 极简 JSON 取值 ----------------
bool jhas(const char* s, const char* key) {
  char pat[20]; snprintf(pat, sizeof(pat), "\"%s\":", key); return strstr(s, pat) != nullptr;
}
float jnum(const char* s, const char* key, float def) {
  char pat[20]; snprintf(pat, sizeof(pat), "\"%s\":", key);
  const char* p = strstr(s, pat); return p ? atof(p + strlen(pat)) : def;
}
void jstr(const char* s, const char* k, char* out, size_t n) {
  char p[20]; snprintf(p, sizeof(p), "\"%s\":\"", k); const char* q = strstr(s, p);
  if (!q) { out[0] = 0; return; }
  q += strlen(p); size_t i = 0; while (*q && *q != '"' && i < n - 1) out[i++] = *q++; out[i] = 0;
}
bool jis(const char* s, const char* type) {
  char pat[24]; snprintf(pat, sizeof(pat), "\"t\":\"%s\"", type); return strstr(s, pat) != nullptr;
}

void sendHello() {
  char buf[440];
  snprintf(buf, sizeof(buf),
    "{\"t\":\"hello\",\"car\":%d,\"fw\":\"%s\",\"ip\":\"%s\",\"mac\":\"%s\",\"imu\":%s,\"batt\":%s,"
    "\"rst\":\"%s\",\"up\":%lu,\"wdn\":%lu,\"wdr\":%d,\"wsdn\":%lu,\"fsn\":%lu,\"rssi\":%d,"
    "\"i2c\":\"%s\",\"chip\":\"%s\",\"soc\":\"%s\",\"snd\":1}",
    carId, FW_VERSION, WiFi.localIP().toString().c_str(), WiFi.macAddress().c_str(),
    imuOk ? "true" : "false", BATT_SENSE ? "true" : "false",
    bootReason, (unsigned long)millis(), (unsigned long)wifiDiscCount, wifiLastReason,
    (unsigned long)wsDiscCount, (unsigned long)fsCount, WiFi.RSSI(), i2cFound, imuChip, CONFIG_IDF_TARGET);
  ws.sendTXT(buf);
}

// ---------------- 自检 ----------------
void stSend(const char* phase, int i, bool ok, const char* msg) {
  char buf[720];
  if (i >= 0 && i < ST_N)
    snprintf(buf, sizeof(buf), "{\"t\":\"st\",\"phase\":\"%s\",\"i\":%d,\"n\":%d,\"step\":\"%s\",\"name\":\"%s\",\"look\":\"%s\",\"ok\":%s,\"msg\":\"%s\"}",
             phase, i, ST_N, ST_STEPS[i].id, ST_STEPS[i].name, ST_STEPS[i].look, ok ? "true" : "false", msg);
  else
    snprintf(buf, sizeof(buf), "{\"t\":\"st\",\"phase\":\"%s\",\"n\":%d,\"ok\":%s,\"msg\":\"%s\"}", phase, ST_N, ok ? "true" : "false", msg);
  ws.sendTXT(buf);
}
void stStart() {
  failsafe = true; brake(); steerOut(0);
  stActive = true; stIdx = 0; stAt = millis(); stCnt = 0; memset(stAcc, 0, sizeof(stAcc));
  stV0 = battV; stVmin = 99;
  Serial.println("=== 自检开始（服务器发起）===");
  stSend("begin", -1, true, "开始");
  stSend("run", 0, true, "");
}
void stAbort(const char* why) {
  if (!stActive) return;
  stActive = false; failsafe = true; brake(); steerOut(0);
  Serial.printf("自检中止：%s\n", why);
  if (wsUp) stSend("abort", stIdx, false, why);
}
void stFinishStep() {
  const StStep& st = ST_STEPS[stIdx];
  char msg[320]; bool ok = true;   // 中文一个字 3 字节，留足空间，别把字切一半（会让 WebSocket 断开）
  if (!strcmp(st.id, "imu")) {
    if (strcmp(imuStat, "ok") != 0 || stCnt < 5) {
      ok = false;
      snprintf(msg, sizeof(msg), "读不到陀螺仪（I2C 扫描：%s）。看陀螺仪板绿灯亮不亮、排针焊了没、SDA→D21 SCL→D22", i2cFound[0] ? i2cFound : "空，两种接法都试过了");
    } else {
      float ax = stAcc[0] / stCnt, ay = stAcc[1] / stCnt, az = stAcc[2] / stCnt;
      float g = sqrtf(ax * ax + ay * ay + az * az);
      // 读数准不准由服务器判断（服务器有水平校准数据），这里只确认有数据
      snprintf(msg, sizeof(msg), "%s 有数据（原始 %.2fg）", imuChip, g);
    }
  } else if (!strcmp(st.id, "buz")) {
    snprintf(msg, sizeof(msg), cfgBz ? "已发声，请听" : "蜂鸣器在设置里关掉了");
  } else if (st.th != 0 || st.st != 0) {
    if (BATT_SENSE && !strcmp(batStat, "ok") && stVmin < 98)
      snprintf(msg, sizeof(msg), "已执行，电压 %.2fV → 最低 %.2fV（掉了 %.2fV）", stV0, stVmin, stV0 - stVmin);
    else snprintf(msg, sizeof(msg), "已执行，请看车确认");
  } else snprintf(msg, sizeof(msg), "已执行");
  Serial.printf("自检 %d/%d %s：%s %s\n", stIdx + 1, ST_N, st.name, ok ? "OK" : "有问题", msg);
  stSend("done", stIdx, ok, msg);
}
void stTick() {
  if (!stActive) return;
  if (!wsUp) { stAbort("和服务器断开"); return; }
  const StStep& st = ST_STEPS[stIdx];
  // 执行这一步（用户设置的反向也会生效，正好顺便检查设置对不对）
  if (!strcmp(st.id, "brake")) brake();
  else { steerOut(st.st); driveOut(st.th); }

  if (BATT_SENSE && !strcmp(batStat, "ok") && battV > 1 && battV < stVmin) stVmin = battV;
  if (millis() - stAt >= st.ms) {
    stFinishStep();
    stIdx++; stAt = millis(); stVmin = 99; stV0 = battV;
    if (stIdx >= ST_N) {
      stActive = false; failsafe = true; brake(); steerOut(0);
      char sum[160];
      snprintf(sum, sizeof(sum), "固件 %s · WiFi %d dBm · 内存 %u · 上次重启 %s", FW_VERSION, WiFi.RSSI(), (unsigned)ESP.getFreeHeap(), bootReason);
      Serial.printf("=== 自检完成：%s ===\n", sum);
      stSend("end", -1, true, sum);
    } else {
      if (!strcmp(ST_STEPS[stIdx].id, "buz")) SFX(SFX_BEEP);
      stSend("run", stIdx, true, "");
    }
  }
}

void onWs(WStype_t type, uint8_t* payload, size_t len) {
  switch (type) {
    case WStype_CONNECTED:
      wsUp = true; lastUpMs = millis();
      if (prefs.getUChar("otap", 0)) { prefs.putUChar("otap", 0); prefs.putUChar("otab", 0); Serial.println("RC:OTA OK 新固件已确认"); }
      Serial.printf("已连上服务器 %s\n", serverAddr.c_str());
      sendHello();
      SFX(SFX_ONLINE);
      break;
    case WStype_DISCONNECTED:
      if (wsUp) {
        wsDiscCount++;
        Serial.printf("和服务器断开（第 %lu 次）：WiFi %s，信号 %d dBm，重连中…\n", (unsigned long)wsDiscCount,
                      WiFi.status() == WL_CONNECTED ? "还连着" : "也断了", WiFi.RSSI());
      }
      if (wsUp) SFX(SFX_OFFLINE);
      wsUp = false; failsafe = true; hornOn = false; apply();
      stAbort("和服务器断开");
      break;
    case WStype_TEXT: {
      const char* s = (const char*)payload;
      if (jis(s, "ctl")) {
        if (stActive) break;                        // 自检时不接受驾驶指令
        cmdTh = constrain(jnum(s, "th", 0), -1, 1);
        cmdSt = constrain(jnum(s, "st", 0), -1, 1);
        hornOn = jnum(s, "hn", 0) > 0.5;
        lastSeq = (uint32_t)jnum(s, "seq", 0);
        { uint32_t t = millis(); if (!failsafe && t - lastCtlMs > ctlGapMax) ctlGapMax = t - lastCtlMs; lastCtlMs = t; }
        failsafe = false;
        apply();
      } else if (jis(s, "stop")) {
        stAbort("收到停止");
        failsafe = true; apply();
      } else if (jis(s, "sfx")) {
        char n[16]; jstr(s, "n", n, sizeof(n)); sfxByName(n);
      } else if (jis(s, "play")) {
        const char* r = strstr(s, "\"r\":\"");
        if (r) {
          musicN = rtttlParse(r + 5); musicI = 0; musicAt = millis();
          musicLoop = jnum(s, "lp", 0) > 0.5; musicOn = musicN > 0;
          Serial.printf("播放音乐：%d 个音\n", musicN);
        }
      } else if (jis(s, "mstop")) {
        musicStop();
      } else if (jis(s, "selftest")) {
        if (!stActive) stStart();
      } else if (jis(s, "ota")) {
        jstr(s, "url", otaUrl, sizeof(otaUrl));
        if (otaUrl[0]) otaPending = true;           // 放到 loop() 里做，别在回调里阻塞
      } else if (jis(s, "ping")) {
        char buf[64]; snprintf(buf, sizeof(buf), "{\"t\":\"pong\",\"ts\":%.0f}", jnum(s, "ts", 0));
        ws.sendTXT(buf);
      } else if (jis(s, "cfg")) {
        if (jhas(s, "dmax")) cfgDriveMax = constrain(jnum(s, "dmax", cfgDriveMax), 0, 1);
        if (jhas(s, "dmin")) cfgDriveMin = constrain(jnum(s, "dmin", cfgDriveMin), 0, 1);
        if (jhas(s, "smax")) cfgSteerMax = constrain(jnum(s, "smax", cfgSteerMax), 0, 1);
        if (jhas(s, "smin")) cfgSteerMin = constrain(jnum(s, "smin", cfgSteerMin), 0, 1);
        if (jhas(s, "vlim")) cfgVLimit   = jnum(s, "vlim", cfgVLimit);
        if (jhas(s, "vcut")) cfgVCutoff  = jnum(s, "vcut", cfgVCutoff);
        if (jhas(s, "shold")) cfgSteerHold = constrain(jnum(s, "shold", cfgSteerHold), 0, 1);
        if (jhas(s, "dinv")) cfgDriveInv = jnum(s, "dinv", 0) > 0.5;
        if (jhas(s, "sinv")) cfgSteerInv = jnum(s, "sinv", 0) > 0.5;
        if (jhas(s, "sret")) cfgRetMs = constrain(jnum(s, "sret", cfgRetMs), 0, 300);
        if (jhas(s, "sretp")) cfgRetPow = constrain(jnum(s, "sretp", cfgRetPow), 0, 1);
        if (jhas(s, "rdead")) cfgRevDead = constrain(jnum(s, "rdead", cfgRevDead), 0, 300);
        if (jhas(s, "ramp")) cfgRampMs = constrain(jnum(s, "ramp", cfgRampMs), 0, 2000);
        if (jhas(s, "scap")) cfgSteerCap = constrain(jnum(s, "scap", cfgSteerCap), 0, 1);
        if (jhas(s, "bz"))   { cfgBz = constrain((int)jnum(s, "bz", cfgBz), 0, 2); bzLastF = -1; }
        if (jhas(s, "bzlo")) { cfgBzLo = jnum(s, "bzlo", 0) > 0.5; bzLastF = -1; }
        if (jhas(s, "bvol")) { cfgBVol = constrain(jnum(s, "bvol", cfgBVol), 0, 1); bzLastF = -1; }
        if (jhas(s, "rvb"))  cfgRevBeep = jnum(s, "rvb", 1) > 0.5;
        if (jhas(s, "smode")) {
          int m = constrain((int)jnum(s, "smode", cfgSteerMode), 0, 2);
          if (m != 2 && servoOn) {   // 不用舵机了：停掉舵机信号
#if ESP_ARDUINO_VERSION_MAJOR >= 3
            ledcWrite(PIN_SERVO, 0);
#else
            ledcWrite(6, 0);
#endif
          }
          cfgSteerMode = m;
        }
        if (jhas(s, "pmin")) cfgPMin = constrain(jnum(s, "pmin", cfgPMin), 0, 0.95);
        if (jhas(s, "sc"))   cfgServoC = constrain(jnum(s, "sc", cfgServoC), 900, 2100);
        if (jhas(s, "sr"))   cfgServoR = constrain(jnum(s, "sr", cfgServoR), 100, 800);
        Serial.printf("新参数 dmax=%.2f dmin=%.2f smax=%.2f smin=%.2f\n", cfgDriveMax, cfgDriveMin, cfgSteerMax, cfgSteerMin);
      }
      break;
    }
    default: break;
  }
}

// ---------------- 找服务器 ----------------
void connectServer() {
  serverAddr = "";
  if (strlen(cfgHost) > 0) {
    IPAddress ip = MDNS.queryHost(String(cfgHost), 1500);
    if (ip != IPAddress(0, 0, 0, 0)) serverAddr = ip.toString();
  }
  if (serverAddr.length() == 0) serverAddr = cfgIp;
  if (serverAddr.length() == 0) { Serial.println("没有服务器地址，用 flash.sh 烧录会自动填"); lastResolve = millis(); return; }
  if (WiFi.status() != WL_CONNECTED) { lastResolve = millis(); return; }   // WiFi 没连上，先不连服务器
  Serial.printf("连接服务器 %s:%d …\n", serverAddr.c_str(), SERVER_PORT);
  ws.disconnect();
  ws.begin(serverAddr.c_str(), SERVER_PORT, "/car");
  wsTried = true;
  ws.onEvent(onWs);
  ws.setReconnectInterval(1000);
  ws.enableHeartbeat(2000, 1500, 2);
  lastResolve = millis();
}

const char* wifiReason(int st) {
  switch (st) {
    case WL_NO_SSID_AVAIL:  return "找不到这个 WiFi 名称：名字打错？还是只有 5GHz？（ESP32 只能连 2.4GHz）";
    case WL_CONNECT_FAILED: return "连接被拒绝：多半是密码错";
    case WL_CONNECTION_LOST:return "连上又掉了：信号太弱，靠近路由器或者装天线";
    case WL_DISCONNECTED:   return "还没连上：密码错，或者信号太弱";
    case WL_IDLE_STATUS:    return "WiFi 还在初始化";
    default:                return "未知原因";
  }
}

void printWifiInfo() {
  // 密码只显示头尾，日志可能会存文件发给别人
  String pw = cfgPass, shown;
  if (pw.length() <= 2) shown = "**";
  else { shown = pw.substring(0, 1); for (size_t i = 1; i + 1 < pw.length(); i++) shown += "*"; shown += pw.substring(pw.length() - 1); }
  Serial.printf("WiFi 名称：「%s」\n", cfgSsid);
  Serial.printf("WiFi 密码：%s（%u 位）\n", shown.c_str(), (unsigned)pw.length());
  Serial.printf("服务器：%s.local / %s:%d\n", cfgHost, cfgIp, SERVER_PORT);
}

void startWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.setSleep(false);
  WiFi.onEvent([](WiFiEvent_t e, WiFiEventInfo_t info) {
    wifiDiscCount++;                      // 这里在 WiFi 的线程里，只记数，刹车交给 loop()
    wifiLastReason = info.wifi_sta_disconnected.reason;
  }, ARDUINO_EVENT_WIFI_STA_DISCONNECTED);
  printWifiInfo();
  if (!provisioned) Serial.println("还没配网：在 RC Studio 里点「配网」，或插 USB 用串口发 prov");
  WiFi.begin(cfgSsid, cfgPass);
  Serial.print("连接 WiFi ");
  uint32_t t0 = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - t0 < 15000) { delay(300); Serial.print("."); }
  if (WiFi.status() == WL_CONNECTED)
    Serial.printf("\nWiFi 已连接，车的 IP：%s，信号 %d dBm\n", WiFi.localIP().toString().c_str(), WiFi.RSSI());
  else
    Serial.printf("\nWiFi 连不上（%s），会继续重试\n", wifiReason(WiFi.status()));
  WiFi.setAutoReconnect(true);
  char host[16]; snprintf(host, sizeof(host), "car%d", carId);
  MDNS.begin(host);
  ArduinoOTA.setHostname(host);
  if (cfgOtaPw[0]) ArduinoOTA.setPassword(cfgOtaPw);   // 没密码的话局域网里谁都能刷你的车
  ArduinoOTA.onStart([]() { failsafe = true; apply(); musicStop(); bzOut(0); });
  ArduinoOTA.begin();
}

// ---------------- 配置（NVS）+ 串口配网 ----------------
void loadNvs() {
  prefs.begin("rc", false);
  String v;
  v = prefs.getString("ssid", ""); strlcpy(cfgSsid, v.c_str(), sizeof(cfgSsid));
  v = prefs.getString("pass", ""); strlcpy(cfgPass, v.c_str(), sizeof(cfgPass));
  v = prefs.getString("host", ""); strlcpy(cfgHost, v.c_str(), sizeof(cfgHost));
  v = prefs.getString("ip", "");   strlcpy(cfgIp, v.c_str(), sizeof(cfgIp));
  v = prefs.getString("otapw", ""); strlcpy(cfgOtaPw, v.c_str(), sizeof(cfgOtaPw));
  carId = prefs.getInt("car", CAR_ID);
  provisioned = cfgSsid[0] != 0;
  if (!provisioned && !strstr(WIFI_SSID, "你的WiFi") && WIFI_SSID[0]) {   // 旧版 flash.sh 编进来的值（过渡用）
    strlcpy(cfgSsid, WIFI_SSID, sizeof(cfgSsid)); strlcpy(cfgPass, WIFI_PASS, sizeof(cfgPass));
    strlcpy(cfgHost, SERVER_HOST, sizeof(cfgHost)); strlcpy(cfgIp, SERVER_IP, sizeof(cfgIp));
    provisioned = true;
    // 存进 NVS：以后从 RC Studio 来的固件（不含密码）OTA 上来也能连 WiFi
    prefs.putString("ssid", cfgSsid); prefs.putString("pass", cfgPass);
    prefs.putString("host", cfgHost); prefs.putString("ip", cfgIp);
  }
}
// OTA 后连续 3 次开机都没连上服务器 → 切回旧分区
void otaRollbackCheck() {
  if (!prefs.getUChar("otap", 0)) return;
  uint8_t b = prefs.getUChar("otab", 0) + 1; prefs.putUChar("otab", b);
  Serial.printf("RC:OTA 新固件第 %u 次开机，等连上服务器确认\n", b);
  if (b <= 3) return;
  const esp_partition_t* other = esp_ota_get_next_update_partition(NULL);
  prefs.putUChar("otap", 0); prefs.putUChar("otab", 0);
  if (other && esp_ota_set_boot_partition(other) == ESP_OK) { Serial.println("RC:OTA ROLLBACK 新固件连不上服务器，退回旧版"); delay(200); ESP.restart(); }
}
// 带转义的 JSON 字符串读取（密码里可能有引号）
bool jstrEsc(const char* s, const char* k, char* out, size_t n) {
  char p[24]; snprintf(p, sizeof(p), "\"%s\":\"", k); const char* q = strstr(s, p);
  if (!q) { out[0] = 0; return false; }
  q += strlen(p); size_t i = 0;
  while (*q && *q != '"' && i < n - 1) { if (*q == '\\' && q[1]) q++; out[i++] = *q++; }
  out[i] = 0; return true;
}
void printInfo(const char* tag) {
  Serial.printf("RC:%s {\"fw\":\"%s\",\"car\":%d,\"mac\":\"%s\",\"soc\":\"%s\",\"prov\":%d,\"ssid\":\"%s\",\"ip\":\"%s\",\"drv\":%d}\n",
    tag, FW_VERSION, carId, WiFi.macAddress().c_str(), CONFIG_IDF_TARGET, provisioned ? 1 : 0, cfgSsid,
    WiFi.status() == WL_CONNECTED ? WiFi.localIP().toString().c_str() : "", RC_DRIVER);
}
char serLine[320]; size_t serLen = 0;
void serialPoll() {
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\r') continue;
    if (c != '\n') { if (serLen < sizeof(serLine) - 1) serLine[serLen++] = c; continue; }
    serLine[serLen] = 0; serLen = 0;
    const char* s = serLine;
    if (s[0] != '{') continue;
    if (jis(s, "prov")) {
      char v[66];
      if (!jstrEsc(s, "ssid", v, sizeof(v)) || !v[0]) { Serial.println("RC:PROV ERR 没有 ssid"); continue; }
      prefs.putString("ssid", v);
      jstrEsc(s, "pass", v, sizeof(v));  prefs.putString("pass", v);
      jstrEsc(s, "host", v, sizeof(v));  prefs.putString("host", v);
      jstrEsc(s, "ip", v, sizeof(v));    prefs.putString("ip", v);
      jstrEsc(s, "otapw", v, sizeof(v)); prefs.putString("otapw", v);
      if (jhas(s, "car")) prefs.putInt("car", (int)jnum(s, "car", 1));
      Serial.println("RC:PROV OK 已保存，重启");
      failsafe = true; apply(); delay(300); ESP.restart();
    } else if (jis(s, "info")) printInfo("INFO");
    else if (jis(s, "unprov")) { prefs.clear(); Serial.println("RC:UNPROV OK"); delay(300); ESP.restart(); }
  }
}

void setup() {
  Serial.begin(115200);
  bootReason = resetReasonStr();
  WiFi.mode(WIFI_STA);        // 先开 WiFi 外设，MAC 地址才读得到
  loadNvs();
  otaRollbackCheck();
  Serial.printf("\n=== 车开机，上次重启原因：%s %s ===\n", bootReason,
    !strcmp(bootReason, "BROWNOUT") ? "← 电压不够！电池没电或 5V 不稳" :
    !strcmp(bootReason, "PANIC") ? "← 程序崩溃" : !strcmp(bootReason, "WDT") ? "← 卡死" : "");
#if RC_DRIVER == 2
  pwmSetup(PIN_IN1, 0); pwmSetup(PIN_IN2, 1);
#else
  pinMode(PIN_IN1, OUTPUT); pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT); pinMode(PIN_IN4, OUTPUT);
  pwmSetup(PIN_ENA, 0); pwmSetup(PIN_ENB, 1);
#endif
  bzSetup(); bzOut(0);
  failsafe = true; apply();
  SFX(SFX_BOOT);
  { uint32_t t = millis(); while (millis() - t < 500) { soundTick(); delay(2); } }   // 开机音放完再连 WiFi
  if (BATT_SENSE) analogSetPinAttenuation(PIN_BATT, ADC_11db);
  imuInit();
  if (!provisioned) {          // 没配网：等串口配网，电机保持刹停
    Serial.println("RC:PROV? 还没配网，等 RC Studio 发配置（插着 USB）");
    uint32_t t = 0;
    while (!provisioned) { serialPoll(); if (millis() - t > 3000) { t = millis(); printInfo("PROV?"); } delay(10); }
  }
  startWifi();
  connectServer();
  printInfo("READY");
  Serial.printf("车 #%d 固件 %s 就绪\n", carId, FW_VERSION);
}

void doHttpOta() {
  otaPending = false;
  stAbort("开始升级");
  failsafe = true; apply(); musicStop(); sfxN = 0; bzOut(0);
  Serial.printf("=== 从服务器升级固件：%s ===\n", otaUrl);
  ws.sendTXT("{\"t\":\"ota\",\"state\":\"start\"}"); ws.loop(); delay(50);
  WiFiClient client;
  httpUpdate.rebootOnUpdate(true);
  httpUpdate.onProgress([](int cur, int total) {
    static int last = -1; int p = total > 0 ? (int)((int64_t)cur * 100 / total) : 0;
    if (p / 10 != last) { last = p / 10; Serial.printf("升级 %d%%\n", p); }
  });
  prefs.putUChar("otap", 1); prefs.putUChar("otab", 0);       // 新固件连上服务器才算成功，否则 3 次开机后退回旧版
  t_httpUpdate_return r = httpUpdate.update(client, otaUrl);   // 成功会自动重启，不会走到下面
  prefs.putUChar("otap", 0);
  String err = httpUpdate.getLastErrorString(); err.replace("\"", "'");
  Serial.printf("升级失败：%s\n", err.c_str());
  char buf[220]; snprintf(buf, sizeof(buf), "{\"t\":\"ota\",\"state\":\"fail\",\"err\":\"%s\",\"code\":%d}", err.c_str(), (int)r);
  ws.sendTXT(buf);
}

void loop() {
  serialPoll();
  ArduinoOTA.handle();
  ws.loop();
  if (otaPending) doHttpOta();
  { static uint32_t sl = 0; if (stActive && millis() - sl >= 5) { sl = millis(); stTick(); } }
  soundTick();
  if (!imuOk && millis() - lastImuProbe > 5000) {
    lastImuProbe = millis();
    if (!imuProbe()) {   // 标准接法不行，再试一次反过来的
      Wire.end(); Wire.begin(PIN_SCL, PIN_SDA, 100000); Wire.setTimeOut(20);
      if (imuProbe()) { int t = PIN_SDA; PIN_SDA = PIN_SCL; PIN_SCL = t; Serial.println("陀螺仪找到了（SDA/SCL 是反的，已自动适配）"); }
      else { Wire.end(); Wire.begin(PIN_SDA, PIN_SCL, 100000); Wire.setTimeOut(20); }
    } else Serial.println("陀螺仪找到了");
  }
  { static uint32_t lr = 0; if (millis() - lr >= 5) { lr = millis(); driveRamp(); if ((!failsafe && steerDir) || retDir) steerOut(failsafe ? 0 : cmdSt); } }
  uint32_t now = millis();

  if (!failsafe && now - lastCtlMs > FAILSAFE_MS) {   // 失联刹停
    failsafe = true; apply(); fsCount++;
    if (now - lastFsPrint > 1000) {
      lastFsPrint = now;
      Serial.printf("失联刹停（第 %lu 次）：%lu ms 没收到控制，WiFi %d dBm，服务器%s\n", (unsigned long)fsCount,
                    (unsigned long)(now - lastCtlMs), WiFi.RSSI(), wsUp ? "还连着" : "断了");
    }
  }
  static uint32_t lastWifiDiscShown = 0;
  if (wifiDiscCount != lastWifiDiscShown) {
    lastWifiDiscShown = wifiDiscCount;
    failsafe = true; apply();
    Serial.printf("WiFi 掉线（第 %lu 次）：原因 %d %s\n", (unsigned long)wifiDiscCount, wifiLastReason, wifiReasonCode(wifiLastReason));
  }

  // WiFi 状态变化写到日志里
  static int lastWifi = -1; static uint32_t lastWifiMsg = 0;
  int wst = WiFi.status();
  if (wst != lastWifi || (wst != WL_CONNECTED && now - lastWifiMsg > 10000)) {
    if (wst == WL_CONNECTED) { if (lastWifi != -1) Serial.printf("WiFi 已连接，车的 IP：%s，信号 %d dBm\n", WiFi.localIP().toString().c_str(), WiFi.RSSI()); }
    else Serial.printf("WiFi 连不上（%s）\n", wifiReason(wst));
    lastWifi = wst; lastWifiMsg = now;
  }

  // 超过 10 秒连不上服务器 → 重新找（Mac 换了 IP 也能找到）
  if (!wsUp && WiFi.status() == WL_CONNECTED && now - lastResolve > 10000) {
    if (wsTried) Serial.println("10 秒没连上服务器：Mac 上 start.sh 在跑吗？防火墙允许 node 了吗？重新找服务器…");
    connectServer();
  }

  if (now - lastTelem >= TELEM_MS) {
    lastTelem = now;
    imuRead();
    if (stActive && stIdx == 0 && !strcmp(imuStat, "ok")) {
      stAcc[0] += imuRaw[0] / 4096.0; stAcc[1] += imuRaw[1] / 4096.0; stAcc[2] += imuRaw[2] / 4096.0;
      stAcc[3] += imuRaw[4] / 65.5;   stAcc[4] += imuRaw[5] / 65.5;   stAcc[5] += imuRaw[6] / 65.5; stCnt++;
    }
    if (BATT_SENSE) {
      float raw = analogReadMilliVolts(PIN_BATT) / 1000.0 * BATT_DIVIDER;
      if (raw < 4.5 || raw > 9.5) { battV = 0; batStat = "err"; }   // 不合理 → 当作没接好，不限速
      else { battV = battV < 1 ? raw : battV * 0.85 + raw * 0.15; batStat = "ok"; }
    }
    if (wsUp) {
      char buf[560];
      int n = snprintf(buf, sizeof(buf),
        "{\"t\":\"tel\",\"car\":%d,\"seq\":%lu,\"up\":%lu,\"v\":%.2f,\"rssi\":%d,\"fs\":%s,"
        "\"oth\":%.2f,\"ost\":%.2f,\"cseq\":%lu,\"heap\":%u,\"imu\":\"%s\",\"bat\":\"%s\","
        "\"fsn\":%lu,\"gap\":%lu,\"wdn\":%lu,\"wdr\":%d,\"mu\":%d,\"hn\":%d",
        carId, (unsigned long)++telSeq, (unsigned long)now, battV, WiFi.RSSI(),
        failsafe ? "true" : "false", outTh, outSt, (unsigned long)lastSeq, (unsigned)ESP.getFreeHeap(),
        imuStat, batStat, (unsigned long)fsCount, (unsigned long)ctlGapMax, (unsigned long)wifiDiscCount, wifiLastReason,
        musicOn ? 1 : 0, hornOn ? 1 : 0);
      ctlGapMax = 0;
      if (strcmp(imuStat, "ok") == 0)
        n += snprintf(buf + n, sizeof(buf) - n,
          ",\"ax\":%.3f,\"ay\":%.3f,\"az\":%.3f,\"gx\":%.1f,\"gy\":%.1f,\"gz\":%.1f,\"tc\":%.1f",
          imuRaw[0] / 4096.0, imuRaw[1] / 4096.0, imuRaw[2] / 4096.0,
          imuRaw[4] / 65.5, imuRaw[5] / 65.5, imuRaw[6] / 65.5, imuRaw[3] / 340.0 + 36.53);   // 原始值，零点/水平在服务器校准
      snprintf(buf + n, sizeof(buf) - n, "}");
      ws.sendTXT(buf);
    }
  }
}
