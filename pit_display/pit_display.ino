/*
 * RC 远程赛车 — 维修站屏幕 v0.1
 * 一块 ESP32（ESP32-C3 SuperMini 或普通 ESP32 DevKit）+ 2.4" SPI TFT 240x320 带触摸（ST7789 + XPT2046）
 *
 * 连 Mac 服务器（WebSocket /pit），显示每台车：在线、谁在开、电压、信号、延迟、翻车、传感器状态。
 * 触摸：点车卡片 = 选中；STOP = 叫停选中的车（踢掉司机 + 刹车）；ALL STOP = 全部叫停。
 *
 * 库（flash_pit.sh 会自动装）：WebSockets、Adafruit ST7735 and ST7789 Library、Adafruit ILI9341、XPT2046_Touchscreen
 * 屏幕只能显示英文（中文要额外字库，以后再加）。
 */

#include <WiFi.h>
#include <ESPmDNS.h>
#include <WebSocketsClient.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <XPT2046_Touchscreen.h>

// ================== 配置 ==================
const char* WIFI_SSID   = "你的WiFi名称";     // flash_pit.sh 自动填
const char* WIFI_PASS   = "你的WiFi密码";
const char* SERVER_HOST = "";
const char* SERVER_IP   = "";
const int   SERVER_PORT = 8080;

#define USE_ILI9341   0      // 屏幕是 ILI9341 的话改成 1（盒子上写 7789 就保持 0）
#define TFT_INVERT    1      // 颜色像底片一样反了 → 改成 0
// 触摸校准：点屏幕时串口会打印 raw 值，把四个角的读数填到这里
#define TS_MINX 350
#define TS_MAXX 3750
#define TS_MINY 300
#define TS_MAXY 3800
#define TS_SWAP_XY  0        // 点左右跑成上下 → 改成 1
#define TS_FLIP_X   0        // 点左边跑到右边 → 改成 1
#define TS_FLIP_Y   0        // 点上面跑到下面 → 改成 1
// ==========================================

#if CONFIG_IDF_TARGET_ESP32C3
// ESP32-C3 SuperMini
const int P_SCK = 4, P_MISO = 5, P_MOSI = 6, P_TFT_CS = 7, P_DC = 10, P_RST = 20, P_T_CS = 21, P_T_IRQ = 3;
#else
// 普通 ESP32 DevKit（VSPI）
const int P_SCK = 18, P_MISO = 19, P_MOSI = 23, P_TFT_CS = 5, P_DC = 4, P_RST = 16, P_T_CS = 17, P_T_IRQ = 27;
#endif

#if USE_ILI9341
#include <Adafruit_ILI9341.h>
Adafruit_ILI9341 tft(&SPI, P_DC, P_TFT_CS, P_RST);
#else
#include <Adafruit_ST7789.h>
Adafruit_ST7789 tft(&SPI, P_TFT_CS, P_DC, P_RST);
#endif
XPT2046_Touchscreen ts(P_T_CS, P_T_IRQ);
WebSocketsClient ws;

// ---------------- 颜色 ----------------
#define C_BG    0x0841
#define C_CARD  0x10A2
#define C_LINE  0x2965
#define C_INK   0xEF7D
#define C_DIM   0x8C71
#define C_HUD   0x7F99
#define C_OK    0x3F0F
#define C_WARN  0xFE60
#define C_BAD   0xFA69
#define C_SEL   0x7F99

// ---------------- 数据 ----------------
struct Car {
  int id = 0; bool on = false; float v = 0; char bat[5] = "off"; char imu[5] = "none";
  int rssi = 0, rtt = -1, tc = -99; char drv[24] = ""; bool flip = false, low = false;
  float th = 0, g = -1; char fw[12] = ""; uint32_t at = 0; bool dirty = true;
};
const int MAXC = 3;
Car cars[MAXC];
int nCars = 0, sel = -1;
bool wsUp = false, headerDirty = true, footDirty = true;
char lastEvt[48] = "waiting for server...";
uint16_t lastEvtColor = C_DIM;
String serverAddr;
uint32_t lastResolve = 0, lastDraw = 0, lastTouch = 0, flashUntil = 0; int flashBtn = -1;

// ---------------- JSON 小工具 ----------------
float jnum(const char* s, const char* k, float d) {
  char p[20]; snprintf(p, sizeof(p), "\"%s\":", k); const char* q = strstr(s, p); return q ? atof(q + strlen(p)) : d;
}
void jstr(const char* s, const char* k, char* out, size_t n) {
  char p[20]; snprintf(p, sizeof(p), "\"%s\":\"", k); const char* q = strstr(s, p);
  if (!q) { if (n) out[0] = 0; return; }
  q += strlen(p); size_t i = 0; while (*q && *q != '"' && i < n - 1) out[i++] = *q++; out[i] = 0;
}

Car* carById(int id) {
  for (int i = 0; i < nCars; i++) if (cars[i].id == id) return &cars[i];
  if (nCars < MAXC) { cars[nCars].id = id; if (sel < 0) sel = nCars; return &cars[nCars++]; }
  return nullptr;   // 超过 3 台的先不显示
}

void onWs(WStype_t type, uint8_t* payload, size_t len) {
  if (type == WStype_CONNECTED) { wsUp = true; headerDirty = true; Serial.println("pit: connected"); }
  else if (type == WStype_DISCONNECTED) { if (wsUp) Serial.println("pit: disconnected"); wsUp = false; headerDirty = true; }
  else if (type == WStype_TEXT) {
    const char* s = (const char*)payload;
    if (strstr(s, "\"t\":\"pc\"")) {
      Car* c = carById((int)jnum(s, "id", 0)); if (!c) return;
      c->on = jnum(s, "on", 0) > 0.5; c->v = jnum(s, "v", 0);
      jstr(s, "bat", c->bat, sizeof(c->bat)); jstr(s, "imu", c->imu, sizeof(c->imu));
      c->rssi = (int)jnum(s, "rssi", 0); c->rtt = (int)jnum(s, "rtt", -1); c->tc = (int)jnum(s, "tc", -99);
      jstr(s, "drv", c->drv, sizeof(c->drv)); jstr(s, "fw", c->fw, sizeof(c->fw));
      c->flip = jnum(s, "flip", 0) > 0.5; c->low = jnum(s, "low", 0) > 0.5;
      c->th = jnum(s, "th", 0); c->g = jnum(s, "g", -1);
      c->at = millis(); c->dirty = true;
    } else if (strstr(s, "\"t\":\"pe\"")) {
      char type[20], msg[24]; jstr(s, "type", type, sizeof(type)); jstr(s, "msg", msg, sizeof(msg));
      int id = (int)jnum(s, "id", 0);
      const char* label = type; lastEvtColor = C_INK;
      if (!strcmp(type, "impact")) { label = "IMPACT"; lastEvtColor = C_BAD; }
      else if (!strcmp(type, "flip")) { label = "FLIPPED"; lastEvtColor = C_BAD; }
      else if (!strcmp(type, "upright")) { label = "upright"; lastEvtColor = C_OK; }
      else if (!strcmp(type, "low_battery")) { label = "LOW BATTERY"; lastEvtColor = C_WARN; }
      else if (!strcmp(type, "car_online")) { label = "online"; lastEvtColor = C_OK; }
      else if (!strcmp(type, "car_offline")) { label = "OFFLINE"; lastEvtColor = C_BAD; }
      else if (!strcmp(type, "driver_joined")) { label = "driver in"; }
      else if (!strcmp(type, "driver_left")) { label = "driver out"; }
      else if (!strcmp(type, "pit_stop")) { label = "PIT STOP"; lastEvtColor = C_WARN; }
      else if (!strcmp(type, "sensor")) { label = "SENSOR FAULT"; lastEvtColor = C_WARN; }
      else if (!strcmp(type, "hello")) { label = "server ok"; lastEvtColor = C_OK; }
      if (id > 0) snprintf(lastEvt, sizeof(lastEvt), "#%d %s %s", id, label, msg);
      else snprintf(lastEvt, sizeof(lastEvt), "%s", label);
      footDirty = true;
    }
  }
}

// ---------------- 画面 ----------------
const int HDR = 22, CARD_H = 56, CARD_Y0 = 24, EVT_Y = 194, BTN_Y = 208, BTN_H = 32;

void drawHeader() {
  tft.fillRect(0, 0, 320, HDR, C_BG);
  tft.setTextSize(2); tft.setTextColor(C_HUD); tft.setCursor(6, 3); tft.print("PIT WALL");
  tft.fillCircle(130, 11, 5, wsUp ? C_OK : C_BAD);
  tft.setTextSize(1); tft.setTextColor(C_DIM); tft.setCursor(140, 7);
  tft.print(wsUp ? "server" : "no server");
  tft.setCursor(226, 7);
  if (WiFi.status() == WL_CONNECTED) tft.printf("wifi %ddBm", WiFi.RSSI()); else tft.print("wifi ...");
  tft.drawFastHLine(0, HDR, 320, C_LINE);
}

void drawCard(int i) {
  Car& c = cars[i];
  int y = CARD_Y0 + i * CARD_H, h = CARD_H - 4;
  bool stale = millis() - c.at > 2000;
  bool on = c.on && !stale;
  tft.fillRoundRect(2, y, 316, h, 5, C_CARD);
  if (i == sel) tft.drawRoundRect(2, y, 316, h, 5, C_SEL), tft.drawRoundRect(3, y + 1, 314, h - 2, 4, C_SEL);
  // 车号
  tft.setTextSize(3); tft.setTextColor(on ? C_INK : C_DIM); tft.setCursor(10, y + 8); tft.printf("#%d", c.id);
  // 状态
  tft.setTextSize(2); tft.setCursor(64, y + 6);
  if (!on) { tft.setTextColor(C_BAD); tft.print("OFFLINE"); }
  else if (c.flip) { tft.setTextColor(C_BAD); tft.print("FLIPPED"); }
  else if (c.drv[0]) { tft.setTextColor(C_OK); tft.print(c.drv); }
  else { tft.setTextColor(C_DIM); tft.print("idle"); }
  // 第二行：电池 / 信号 / 延迟 / 温度
  tft.setTextSize(1); tft.setCursor(64, y + 28);
  if (!strcmp(c.bat, "ok")) { tft.setTextColor(c.low ? C_WARN : C_INK); tft.printf("%.2fV ", c.v); }
  else { tft.setTextColor(C_DIM); tft.print(!strcmp(c.bat, "err") ? "BAT ERR " : "BAT -- "); }
  tft.setTextColor(C_DIM);
  if (on) { tft.printf(" %ddBm", c.rssi); if (c.rtt >= 0) tft.printf("  %dms", c.rtt); if (c.tc > -99) tft.printf("  %dC", c.tc); }
  // 第三行：传感器 + 固件
  tft.setCursor(64, y + 40);
  tft.setTextColor(!strcmp(c.imu, "ok") ? C_DIM : !strcmp(c.imu, "err") ? C_WARN : C_DIM);
  tft.print(!strcmp(c.imu, "ok") ? "IMU ok" : !strcmp(c.imu, "err") ? "IMU NOT WORKING" : "IMU --");
  if (c.g >= 0) { tft.setTextColor(c.g > 2.5 ? C_BAD : C_DIM); tft.printf("  %.1fg", c.g); }
  tft.setTextColor(C_DIM); if (c.fw[0]) tft.printf("  fw %s", c.fw);
  // 右边：油门条
  int bx = 296, by = y + 6, bh = h - 12;
  tft.drawRect(bx, by, 12, bh, C_LINE);
  int mid = by + bh / 2, len = (int)(fabs(c.th) * (bh / 2 - 1));
  if (on && len > 0) {
    if (c.th > 0) tft.fillRect(bx + 1, mid - len, 10, len, C_OK);
    else tft.fillRect(bx + 1, mid, 10, len, C_BAD);
  }
  tft.drawFastHLine(bx, mid, 12, C_LINE);
  c.dirty = false;
}

void drawFooter() {
  tft.fillRect(0, EVT_Y, 320, BTN_Y - EVT_Y, C_BG);
  tft.setTextSize(1); tft.setTextColor(lastEvtColor); tft.setCursor(6, EVT_Y + 3); tft.print(lastEvt);
  // 按钮
  bool f0 = flashBtn == 0 && millis() < flashUntil, f1 = flashBtn == 1 && millis() < flashUntil;
  tft.fillRoundRect(2, BTN_Y, 156, BTN_H, 6, f0 ? C_INK : C_WARN);
  tft.fillRoundRect(162, BTN_Y, 156, BTN_H, 6, f1 ? C_INK : C_BAD);
  tft.setTextSize(2); tft.setTextColor(C_BG);
  tft.setCursor(16, BTN_Y + 9);
  if (sel >= 0 && sel < nCars) tft.printf("STOP #%d", cars[sel].id); else tft.print("STOP");
  tft.setCursor(186, BTN_Y + 9); tft.print("ALL STOP");
  footDirty = false;
}

// ---------------- 触摸 ----------------
bool readTouch(int& x, int& y) {
  if (!ts.touched()) return false;
  TS_Point p = ts.getPoint();
  if (p.z < 200) return false;
  Serial.printf("touch raw x=%d y=%d z=%d\n", p.x, p.y, p.z);   // 校准用
  int rx = p.x, ry = p.y;
  if (TS_SWAP_XY) { int t = rx; rx = ry; ry = t; }
  x = map(rx, TS_MINX, TS_MAXX, 0, 320); y = map(ry, TS_MINY, TS_MAXY, 0, 240);
  if (TS_FLIP_X) x = 320 - x;
  if (TS_FLIP_Y) y = 240 - y;
  x = constrain(x, 0, 319); y = constrain(y, 0, 239);
  return true;
}

void handleTouch() {
  int x, y;
  if (!readTouch(x, y) || millis() - lastTouch < 350) return;
  lastTouch = millis();
  if (y >= BTN_Y - 4) {
    if (x < 160) {
      if (sel >= 0 && sel < nCars) {
        char buf[48]; snprintf(buf, sizeof(buf), "{\"t\":\"stop\",\"car\":%d}", cars[sel].id); ws.sendTXT(buf);
        snprintf(lastEvt, sizeof(lastEvt), "STOP sent to #%d", cars[sel].id); lastEvtColor = C_WARN;
      }
      flashBtn = 0;
    } else {
      ws.sendTXT("{\"t\":\"allstop\"}");
      snprintf(lastEvt, sizeof(lastEvt), "ALL STOP sent"); lastEvtColor = C_BAD;
      flashBtn = 1;
    }
    flashUntil = millis() + 250; footDirty = true;
  } else if (y >= CARD_Y0 && y < CARD_Y0 + MAXC * CARD_H) {
    int i = (y - CARD_Y0) / CARD_H;
    if (i < nCars && i != sel) { int old = sel; sel = i; if (old >= 0) cars[old].dirty = true; cars[i].dirty = true; footDirty = true; }
  }
}

// ---------------- 网络 ----------------
void connectServer() {
  serverAddr = "";
  if (strlen(SERVER_HOST) > 0) {
    IPAddress ip = MDNS.queryHost(String(SERVER_HOST), 1500);
    if (ip != IPAddress(0, 0, 0, 0)) serverAddr = ip.toString();
  }
  if (serverAddr.length() == 0) serverAddr = SERVER_IP;
  lastResolve = millis();
  if (serverAddr.length() == 0) return;
  Serial.printf("pit: server %s:%d\n", serverAddr.c_str(), SERVER_PORT);
  ws.disconnect();
  ws.begin(serverAddr.c_str(), SERVER_PORT, "/pit");
  ws.onEvent(onWs);
  ws.setReconnectInterval(1000);
  ws.enableHeartbeat(2000, 1500, 2);
}

void setup() {
  Serial.begin(115200);
  SPI.begin(P_SCK, P_MISO, P_MOSI);
#if USE_ILI9341
  tft.begin();
#else
  tft.init(240, 320);
#endif
  tft.setRotation(1);
  tft.invertDisplay(TFT_INVERT);
  tft.fillScreen(C_BG);
  ts.begin(SPI);
  ts.setRotation(1);
  drawHeader();
  tft.setTextSize(2); tft.setTextColor(C_DIM); tft.setCursor(20, 100); tft.print("connecting wifi...");

  WiFi.mode(WIFI_STA); WiFi.setSleep(false); WiFi.begin(WIFI_SSID, WIFI_PASS);
  uint32_t t0 = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - t0 < 15000) delay(200);
  MDNS.begin("pitwall");
  tft.fillRect(0, HDR + 1, 320, 240 - HDR, C_BG);
  connectServer();
  drawHeader(); drawFooter();
}

void loop() {
  ws.loop();
  handleTouch();
  uint32_t now = millis();
  if (!wsUp && WiFi.status() == WL_CONNECTED && now - lastResolve > 10000) connectServer();
  if (now - lastDraw >= 200) {
    lastDraw = now;
    static bool lastUp = false; static uint32_t lastHdr = 0;
    if (headerDirty || lastUp != wsUp || now - lastHdr > 3000) { drawHeader(); headerDirty = false; lastUp = wsUp; lastHdr = now; }
    for (int i = 0; i < nCars; i++) {
      bool stale = now - cars[i].at > 2000;
      static bool wasStale[MAXC];
      if (cars[i].dirty || stale != wasStale[i]) { drawCard(i); wasStale[i] = stale; }
    }
    static int lastN = -1;
    if (nCars != lastN) {          // 车数量变了 → 清掉卡片区重画
      tft.fillRect(0, HDR + 1, 320, EVT_Y - HDR - 1, C_BG);
      for (int i = 0; i < nCars; i++) cars[i].dirty = true;
      lastN = nCars; footDirty = true;
    }
    if (nCars == 0) { tft.setTextSize(1); tft.setTextColor(C_DIM); tft.setCursor(80, 100); tft.print(wsUp ? "no cars yet - turn a car on" : "waiting for server..."); }
    if (footDirty || (flashBtn >= 0 && now > flashUntil)) { if (now > flashUntil) flashBtn = -1; drawFooter(); }
  }
}
