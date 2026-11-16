// RC 远程赛车 — Mac 服务器 v0.5
//
//   手机/电脑浏览器 ──WS /ui──►  这个服务器  ──WS /car──► 车（ESP32）
//
// 职责（根基，以后 30 台车也是这套）：
//   - 车的注册（car_id）、玩家的注册（client_id）
//   - 驾驶权：一台车同一时间只有一个人开，其他人观战
//   - 30 Hz 控制循环：把玩家输入转成车的 ctl 包；玩家 300 ms 没输入 → 归零
//   - 事件引擎：翻车、碰撞、低电量、连上/断开 → 广播 + 写 events.jsonl
//   - 手感参数：存在 config.json，车一连上就下发
//
// 运行：bash start.sh   （或 node server.js）

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const crypto = require('crypto');
const secrets = require('./lib/secrets');
const SECRETS = secrets.load();
const ADMIN_TOKEN = SECRETS.adminToken;
// 编译版本库（RC Studio / tools/rc.js build 放进来的）：手机「升级」按钮用跟车同芯片的最新版
const { BuildRegistry } = require('./lib/builds');
const BUILDS = new BuildRegistry(__dirname);
function readTargets() { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'targets.json'), 'utf8')); } catch { return {}; } }
function latestBuildFor(c) {
  if (!c || !c.soc) return null;
  const T = readTargets();
  return BUILDS.list().find(b => T[b.target] && T[b.target].soc === c.soc) || null;
}
// 一次性固件下载令牌：车 OTA 时才发，2 分钟过期（固件里虽然不再有密码，也不让外人随便下载）
const otaTokens = new Map();   // token -> { file, exp }
function isLoopback(a) { return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1'; }
const ADMIN_MSGS = new Set(['selftest', 'selftest_stop', 'ota', 'calib', 'calib_clear', 'cfg']);

const PORT = Number(process.env.PORT || 8080);
const HTTPS_PORT = Number(process.env.HTTPS_PORT || 8443);   // 手机用陀螺仪转向要 https（start.sh 会自动做证书）
const DIR = __dirname;
const CFG_FILE = path.join(DIR, 'config.json');
const LOG_FILE = path.join(DIR, 'events.jsonl');
const LOG_DIR = path.join(DIR, 'logs');
try { fs.mkdirSync(LOG_DIR, { recursive: true }); } catch {}
// 固件：flash.sh 编译后放到 firmware/car.bin + firmware/info.json，车从这里下载升级
const FW_DIR = path.join(DIR, 'firmware');
function fwInfo() {
  try {
    const st = fs.statSync(path.join(FW_DIR, 'car.bin'));
    const info = JSON.parse(fs.readFileSync(path.join(FW_DIR, 'info.json'), 'utf8'));
    return { version: info.version, size: st.size, built: info.built };
  } catch { return null; }
}
const cmpVer = (a, b) => { const x = String(a || '0').split('.').map(Number), y = String(b || '0').split('.').map(Number);
  for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0); } return 0; };

const DEFAULT_CFG = { dmax: 1.0, dmin: 0.3, smax: 1.0, smin: 0.55, shold: 0.6, dinv: 0, sinv: 0, ramp: 0, scap: 1.0, sret: 80, sretp: 0.6, rdead: 60, vlim: 6.6, vcut: 6.0,
  bz: 0, bzlo: 0, bvol: 0.5, rvb: 1,
  smode: 1, pmin: 0.35, sc: 1500, sr: 400 };   // smode 转向 0 打到底/1 比例/2 舵机，pmin 比例起点，sc/sr 舵机中位/行程（微秒）   // 声音默认在手机上放，车上的蜂鸣器默认关   // bz 蜂鸣器 0 关/1 无源/2 有源，bzlo 低电平触发，bvol 音量，rvb 倒车嘀嘀
// 车的 ESP32 用 float 读数字，只能精确到 7 位 → 时间戳只发 0–999999 的小数字
const TS_MOD = 1000000;
const tsSmall = () => Date.now() % TS_MOD;
const rttFrom = ts => (Date.now() % TS_MOD - ts + TS_MOD) % TS_MOD;
let cfgStore = {};
try { cfgStore = JSON.parse(fs.readFileSync(CFG_FILE, 'utf8')); } catch { cfgStore = {}; }
const cfgFor = id => ({ ...DEFAULT_CFG, ...(cfgStore[id] || {}) });
const saveCfg = () => fs.writeFile(CFG_FILE, JSON.stringify(cfgStore, null, 2), () => {});

// ---------------- 陀螺仪水平校准 ----------------
// 车放在平地上点「设为水平」：记下这时候重力的方向 → 算一个旋转，把它转到正下方；
// 再按 1g 缩放（便宜 MPU6050 读数常常偏 10–25%），并记下陀螺仪的零点漂移。
// 存在 calib.json，换架子/装歪了重新点一次就行，不用重烧固件。
const CAL_FILE = path.join(DIR, 'calib.json');
let calStore = {};
try { calStore = JSON.parse(fs.readFileSync(CAL_FILE, 'utf8')); } catch { calStore = {}; }
const saveCal = () => fs.writeFile(CAL_FILE, JSON.stringify(calStore, null, 2), () => {});
const mv = (R, v) => [R[0] * v[0] + R[1] * v[1] + R[2] * v[2], R[3] * v[0] + R[4] * v[1] + R[5] * v[2], R[6] * v[0] + R[7] * v[1] + R[8] * v[2]];
function rotToZ(u) {          // 把单位向量 u 转到 (0,0,1) 的旋转矩阵（Rodrigues）
  const [x, y, z] = u;
  if (z < -0.9999) return [1, 0, 0, 0, -1, 0, 0, 0, -1];
  const vx = y, vy = -x, k = 1 / (1 + z);   // v = u × z
  return [1 - vy * vy * k, vx * vy * k, vy,
          vx * vy * k, 1 - vx * vx * k, -vx,
          -vy, vx, 1 - (vx * vx + vy * vy) * k];
}
function applyCal(id, m) {
  const k = calStore[id];
  if (!k || m.ax == null) return m;
  const a = mv(k.R, [m.ax * k.s, m.ay * k.s, m.az * k.s]);
  const g = mv(k.R, [m.gx - k.gb[0], m.gy - k.gb[1], m.gz - k.gb[2]]);
  return { ...m, rax: m.ax, ray: m.ay, raz: m.az, ax: +a[0].toFixed(3), ay: +a[1].toFixed(3), az: +a[2].toFixed(3), gx: +g[0].toFixed(1), gy: +g[1].toFixed(1), gz: +g[2].toFixed(1) };
}
const meanStd = arr => { const n = arr.length || 1, mu = arr.reduce((a, b) => a + b, 0) / n; return [mu, Math.sqrt(arr.reduce((a, b) => a + (b - mu) ** 2, 0) / n)]; };

// ---------------- 音乐库（RTTTL 铃声格式；全部是公版古典/民谣，或者我们自己写的） ----------------
const SONGS = [
  { id: 'podium', name: '领奖台（原创）', r: 'podium:d=8,o=5,b=150:g,c6,e6,4g6,e6,2g6,p,a6,g6,f6,e6,4d6,e6,2c6' },
  { id: 'turbo', name: '涡轮（原创）', r: 'turbo:d=16,o=5,b=170:a,a,c6,a,d6,a,e6,d6,c6,a,g,a,8p,a,a,c6,a,e6,a,g6,e6,d6,c6,a,g,4a,8p,e6,e6,g6,e6,a6,e6,g6,e6,d6,c6,d6,e6,4a' },
  { id: 'mountain', name: '山魔王的大厅（格里格）', r: 'mountain:d=4,o=5,b=140:8a,8b,8c6,8d6,8e6,8c6,4e6,8d#6,8b,4d#6,8d6,8a#,4d6,8a,8b,8c6,8d6,8e6,8c6,8e6,8a6,8g6,8e6,8c6,8e6,2g6' },
  { id: 'entertainer', name: 'The Entertainer（乔普林）', r: 'entertainer:d=4,o=5,b=140:8d,8d#,8e,c6,8e,c6,8e,2c.6,8c6,8d6,8d#6,8e6,8c6,8d6,e6,8b,d6,2c6,p,8d,8d#,8e,c6,8e,c6,8e,2c.6,8p,8a,8g,8f#,8a,8c6,e6,8d6,8c6,8a,2d6' },
  { id: 'joy', name: '欢乐颂（贝多芬）', r: 'joy:d=4,o=5,b=140:e,e,f,g,g,f,e,d,c,c,d,e,e.,8d,2d,e,e,f,g,g,f,e,d,c,c,d,e,d.,8c,2c' },
  { id: 'elise', name: '致爱丽丝（贝多芬）', r: 'elise:d=8,o=5,b=125:e6,d#6,e6,d#6,e6,b,d6,c6,4a,p,c,e,a,4b,p,e,g#,b,4c6,p,e,e6,d#6,e6,d#6,e6,b,d6,c6,4a,p,c,e,a,4b,p,e,c6,b,2a' },
  { id: 'jingle', name: '铃儿响叮当', r: 'jingle:d=4,o=5,b=180:e,e,2e,e,e,2e,e,g,c.,8d,1e,f,f,f.,8f,f,e,e,8e,8e,e,d,d,e,2d,2g,e,e,2e,e,e,2e,e,g,c.,8d,1e,f,f,f.,8f,f,e,e,8e,8e,g,g,f,d,1c' },
  { id: 'bday', name: '生日快乐', r: 'bday:d=4,o=5,b=120:8g.,16g,a,g,c6,2b,8g.,16g,a,g,d6,2c6,8g.,16g,g6,e6,c6,b,a,8f6.,16f6,e6,c6,d6,2c6' },
  { id: 'twinkle', name: '小星星', r: 'twinkle:d=4,o=5,b=150:c,c,g,g,a,a,2g,f,f,e,e,d,d,2c,g,g,f,f,e,e,2d,g,g,f,f,e,e,2d,c,c,g,g,a,a,2g,f,f,e,e,d,d,2c' },
];
const SFX_NAMES = ['boot', 'online', 'offline', 'claim', 'release', 'ok', 'err', 'alarm', 'beep', 'count', 'coin', 'lowbat'];
const sfxCar = (c, n) => { if (c && c.online && c.snd) send(c.ws, { t: 'sfx', n }); };

const cars = new Map();     // carId -> car
const clients = new Map();  // clientId -> client
let nextClient = 1;
const pits = new Set();   // 维修站屏幕（ESP32 + TFT）
const ascii = v => String(v == null ? '' : v).replace(/[^\x20-\x7e]/g, '').slice(0, 24);

const now = () => Date.now();
const send = (ws, obj) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj)); };
const toUis = obj => { const s = JSON.stringify(obj); for (const c of clients.values()) if (c.ws.readyState === 1) c.ws.send(s); };

function logEvent(type, data = {}) {
  const e = { t: 'evt', type, ts: now(), ...data };
  fs.appendFile(LOG_FILE, JSON.stringify(e) + '\n', () => {});
  toUis(e);
  const ps = JSON.stringify({ t: 'pe', id: data.car == null ? 0 : data.car, type, msg: ascii(data.g != null ? data.g + 'g' : data.v != null ? data.v + 'V' : '') });
  for (const p of pits) if (p.readyState === 1) p.send(ps);
  const who = data.car != null ? `车#${data.car}` : '';
  console.log(`[${new Date().toLocaleTimeString()}] ${type} ${who} ${data.msg || ''}`);
}

// ---------------- 断线诊断 ----------------
// 每次断线/刹停/重启都记一条，带上当时的信号、延迟、电压，并判断原因。
// 文件：logs/diag-日期.jsonl（一行一条），UI 设置里也能看到最近的记录。
const diagRecent = [];
const RST_CAUSE = {
  BROWNOUT: '电压不够，车重启了（电池没电，或 L298N 给 ESP32 的 5V 不稳）',
  PANIC: '车的程序崩溃重启（用 logs.sh 抓串口发给 Claude）',
  WDT: '车的程序卡死被看门狗重启',
  POWERON: '车断过电（开关、电池接触不良，或者电池盒弹簧被震松）',
  EXT: '有人按了 EN 键',
  SW: '软件重启（OTA 无线更新）',
};
const WIFI_REASON = {
  2: '认证超时', 4: '认证超时', 15: '认证超时', 8: '车主动断开', 34: '路由器那边信号太差',
  200: '收不到路由器信号（信号太弱 / 距离太远 / 没装天线）', 201: '找不到 WiFi', 202: '密码错', 203: '连接失败',
};
function diag(kind, car, cause, detail = {}) {
  const e = { ts: now(), time: new Date().toLocaleString('zh-CN', { hour12: false }), kind, car, cause, ...detail };
  diagRecent.push(e); if (diagRecent.length > 200) diagRecent.shift();
  const file = path.join(LOG_DIR, `diag-${new Date().toISOString().slice(0, 10)}.jsonl`);
  fs.appendFile(file, JSON.stringify(e) + '\n', () => {});
  const extra = Object.entries(detail).map(([k, v]) => `${k}=${v}`).join(' ');
  console.log(`\x1b[33m[诊断 ${new Date().toLocaleTimeString()}] ${car != null ? '车#' + car + ' ' : ''}${kind}：${cause}\x1b[0m  ${extra}`);
  toUis({ t: 'diag', ...e });
}
const sigNote = rssi => rssi == null ? '' : rssi < -80 ? `（车信号很弱 ${rssi}dBm）` : rssi < -70 ? `（车信号偏弱 ${rssi}dBm）` : '';

// ---------------- 车 ----------------
function newCar(id) {
  return {
    id, ws: null, online: false, fw: '', ip: '', imu: false, batt: false,
    sens: { imu: 'none', bat: 'off' },
    driver: null, input: { th: 0, st: 0, hn: 0, at: 0 }, seq: 0, snd: false, music: null, cal: null, stImu: null,
    tel: null, rtt: null, pingAt: 0,
    // 事件引擎状态
    flipped: false, flipSince: 0, lastImpact: 0, lowBatt: false, yaw: 0, lastTelAt: 0,
    // 断线诊断
    prev: null, downAt: 0, fsSeen: null, wdnSeen: null, fsBurst: 0, fsBurstAt: 0, inputGapMax: 0, telGapMax: 0,
    stats: { disconnects: 0, reboots: 0, failsafes: 0, wifiDrops: 0, phoneGaps: 0 },
  };
}

function carSummary(c) {
  return {
    id: c.id, online: c.online, fw: c.fw, ip: c.ip, sens: c.sens,
    driver: c.driver, driverName: c.driver ? (clients.get(c.driver) || {}).name : null,
    rtt: c.rtt, flipped: c.flipped, lowBatt: c.lowBatt, cfg: cfgFor(c.id),
    i2c: c.i2c, chip: c.chip, soc: c.soc || '', fwAvail: (latestBuildFor(c) || {}).version || null, busy: c.busy || null,
    snd: c.snd, music: c.music, calib: calStore[c.id] ? { at: calStore[c.id].at, tilt: calStore[c.id].tilt, g: calStore[c.id].g } : null,
  };
}
const broadcastState = () => toUis({ t: 'state', cars: [...cars.values()].map(carSummary) });

// 事件引擎：只读遥测，不碰硬件
function analyze(c, m) {
  const t = now();
  const dt = c.lastTelAt ? Math.min((t - c.lastTelAt) / 1000, 0.2) : 0;
  c.lastTelAt = t;
  const d = {};
  if (m.ax != null) {
    const g = Math.hypot(m.ax, m.ay, m.az);
    d.g = g;
    d.roll = Math.atan2(m.ay, m.az) * 180 / Math.PI;
    d.pitch = Math.atan2(-m.ax, Math.hypot(m.ay, m.az)) * 180 / Math.PI;
    d.glat = m.ay; d.glon = m.ax;
    c.yaw = (c.yaw + (m.gz || 0) * dt + 360) % 360;
    d.yaw = c.yaw;

    // 碰撞：加速度偏离 1g 超过 1.8g，0.8 秒内只算一次
    if (Math.abs(g - 1) > 1.8 && t - c.lastImpact > 800) {
      c.lastImpact = t;
      logEvent('impact', { car: c.id, g: +g.toFixed(2), msg: `${g.toFixed(1)}g` });
    }
    // 翻车：Z 轴朝下持续 0.8 秒
    if (m.az < -0.4) {
      if (!c.flipSince) c.flipSince = t;
      if (!c.flipped && t - c.flipSince > 800) { c.flipped = true; logEvent('flip', { car: c.id, msg: '翻车' }); sfxCar(c, 'alarm'); broadcastState(); }
    } else {
      c.flipSince = 0;
      if (c.flipped && m.az > 0.5) { c.flipped = false; logEvent('upright', { car: c.id, msg: '翻回来了' }); broadcastState(); }
    }
  }
  if (m.bat === 'ok' && m.v > 1) {
    const cfg = cfgFor(c.id);
    const low = m.v < cfg.vlim;
    if (low && !c.lowBatt) { c.lowBatt = true; logEvent('low_battery', { car: c.id, v: m.v, msg: `${m.v.toFixed(2)}V` }); sfxCar(c, 'lowbat'); broadcastState(); }
    if (!low && m.v > cfg.vlim + 0.2 && c.lowBatt) { c.lowBatt = false; broadcastState(); }
    d.pct = Math.max(0, Math.min(100, Math.round((m.v - 6.0) / (8.4 - 6.0) * 100)));
  }
  return d;
}

function onCarMessage(ws, m) {
  if (m.t === 'hello') {
    const id = Number(m.car);
    const c = cars.get(id) || newCar(id);
    if (c.ws && c.ws !== ws) try { c.ws.terminate(); } catch {}
    // 判断上次为什么断：车重启了，还是只是网络断
    if (c.prev) {
      const down = c.downAt ? now() - c.downAt : null;
      const rebooted = m.up != null && m.up < 30000 && (c.prev.up == null || m.up < c.prev.up);
      if (rebooted) {
        c.stats.reboots++;
        diag('车重启', id, RST_CAUSE[m.rst] || `重启原因 ${m.rst}`, { 断了: down != null ? down + 'ms' : '?', 断前信号: c.prev.rssi, 断前电压: c.prev.v || '未测' });
      } else {
        const wifiDropped = m.wdn != null && c.prev.wdn != null && m.wdn > c.prev.wdn;
        const why = wifiDropped ? `车的 WiFi 掉了：${WIFI_REASON[m.wdr] || '原因 ' + m.wdr}` :
          'WiFi 没掉，但和 Mac 的连接断了（Mac 睡眠 / 路由器卡 / Mac 防火墙）';
        diag('重新连上', id, why + sigNote(c.prev.rssi), { 断了: down != null ? down + 'ms' : '?' });
      }
    } else if (m.rst && m.rst !== 'POWERON' && m.rst !== 'SW') {
      diag('车开机', id, RST_CAUSE[m.rst] || m.rst);
    }
    c.fsSeen = m.fsn != null ? m.fsn : null; c.wdnSeen = m.wdn != null ? m.wdn : null;
    // 升级结果
    if (c.ota) {
      const ok = m.fw === c.ota.to;
      diag(ok ? '升级成功' : '升级失败', id, ok ? `${c.ota.from} → ${m.fw}` : `还是 ${m.fw}（应该是 ${c.ota.to}）`, { 用时: Math.round((now() - c.ota.at) / 1000) + 's' });
      logEvent(ok ? 'ota_ok' : 'ota_fail', { car: id, msg: ok ? m.fw : '' });
      c.ota = null; c.busy = null;
    }
    Object.assign(c, { ws, online: true, fw: m.fw, ip: m.ip, imu: !!m.imu, batt: !!m.batt, i2c: m.i2c || '', chip: m.chip || '', soc: m.soc || '', mac: m.mac || '', snd: !!m.snd, music: null, cal: null,
      srvAddr: String(ws._socket && ws._socket.localAddress || '').replace('::ffff:', '') });
    cars.set(id, c);
    ws.carId = id;
    send(ws, { t: 'cfg', ...cfgFor(id) });
    logEvent('car_online', { car: id, msg: `${m.ip} 固件 ${m.fw}${m.imu ? ' · 陀螺仪 OK' : ''}` });
    broadcastState();
    return;
  }
  const c = cars.get(ws.carId);
  if (!c) return;
  if (m.t === 'tel') {
    // 遥测间隔：太久没收到 = WiFi 卡顿
    if (c.lastTelAt) { const g = now() - c.lastTelAt; if (g > c.telGapMax) c.telGapMax = g; if (g > 300) c.lastTelGap = { gap: g, at: now() }; }
    c.prev = { rssi: m.rssi, v: m.v, up: m.up, heap: m.heap, wdn: m.wdn, rtt: c.rtt };
    // 车报告新的失联刹停 → 判断是哪一段慢了
    if (m.fsn != null) {
      if (c.fsSeen != null && m.fsn > c.fsSeen) {
        const n = m.fsn - c.fsSeen;
        c.stats.failsafes += n;
        const cl = clients.get(c.driver);
        const recent = (o) => o && now() - o.at < 2500 ? o.gap : 0;
        const ongoing = c.input.at ? now() - c.input.at : 0;   // 手机现在已经多久没发了
        const phoneGap = Math.max(c.inputGapMax, recent(c.lastInputGap), ongoing);
        const telGap = Math.max(c.telGapMax, recent(c.lastTelGap));
        let cause;
        if (!c.driver) cause = '没人在开（正常：放开车就会刹停）';
        else if (phoneGap > 300) cause = `手机那边断了 ${phoneGap}ms 没发操作（手机锁屏 / 浏览器切后台 / 手机 WiFi 卡）`;
        else if (telGap > 400) cause = `Mac↔车 WiFi 卡了 ${telGap}ms${sigNote(m.rssi)}`;
        else cause = `车 0.5 秒没收到控制包${sigNote(m.rssi)}`;
        if (c.driver) diag('失联刹停', c.id, cause, { 次数: n, 车信号: m.rssi, 延迟: c.rtt, 司机: cl ? cl.name : '?' });
      }
      c.fsSeen = m.fsn;
    }
    if (m.wdn != null) {
      if (c.wdnSeen != null && m.wdn > c.wdnSeen) {
        c.stats.wifiDrops += m.wdn - c.wdnSeen;
        diag('车 WiFi 掉线', c.id, WIFI_REASON[m.wdr] || `原因代码 ${m.wdr}`, { 车信号: m.rssi });
      }
      c.wdnSeen = m.wdn;
    }
    // 每秒清零一次窗口统计
    if (!c.winAt || now() - c.winAt > 1000) { c.winAt = now(); c.inputGapMax = 0; c.telGapMax = 0; }
    if (m.ax != null) {
      if (c.cal) c.cal.samples.push([m.ax, m.ay, m.az, m.gx, m.gy, m.gz]);
      m = applyCal(c.id, m);
      if (c.stImu) c.stImu.push([m.ax, m.ay, m.az, m.gx, m.gy, m.gz]);
    }
    if (c.music && !m.mu && m.mu != null && now() - c.music.at > 1500) { c.music = null; broadcastState(); }
    c.tel = m;
    if (m.imu && (m.imu !== c.sens.imu || m.bat !== c.sens.bat)) {
      const before = c.sens; c.sens = { imu: m.imu, bat: m.bat };
      if (before.imu === 'ok' && m.imu === 'err') logEvent('sensor', { car: c.id, msg: '陀螺仪不工作（不影响开车）' });
      if (before.bat === 'ok' && m.bat === 'err') logEvent('sensor', { car: c.id, msg: '电压检测不工作（不影响开车）' });
      broadcastState();
    }
    const d = analyze(c, m);
    toUis({ t: 'tel', car: c.id, ...m, ...d, rtt: c.rtt, drv: c.driver ? c.drv : null });
  } else if (m.t === 'st') {          // 自检进度
    if (m.phase === 'run' && m.step === 'imu') c.stImu = [];
    if (m.phase === 'done' && m.step === 'imu' && m.ok && c.stImu) { Object.assign(m, judgeImu(c, c.stImu)); }
    if (m.phase === 'done' && m.step === 'imu') c.stImu = null;
    if (m.phase === 'end' || m.phase === 'abort') c.stImu = null;
    toUis({ ...m, t: 'selftest', car: c.id });
    if (m.phase === 'begin') { c.busy = 'selftest'; broadcastState(); }
    if (m.phase === 'done' && !m.ok) diag('自检有问题', c.id, `${m.name}：${m.msg}`);
    if (m.phase === 'end' || m.phase === 'abort') {
      c.busy = null; broadcastState();
      diag(m.phase === 'end' ? '自检完成' : '自检中止', c.id, m.msg);
    }
  } else if (m.t === 'ota') {         // 升级进度
    toUis({ t: 'ota', car: c.id, ...m });
    if (m.state === 'fail') { diag('升级失败', c.id, m.err || '未知错误'); c.ota = null; c.busy = null; broadcastState(); }
  } else if (m.t === 'pong') {
    const r = rttFrom(Number(m.ts));
    if (r >= 0 && r < 5000) c.rtt = r;
  }
}

// 自检的陀螺仪一步：用校准后的数据判断准不准
function judgeImu(c, S) {
  if (S.length < 5) return {};
  const ax = meanStd(S.map(v => v[0]))[0], ay = meanStd(S.map(v => v[1]))[0], az = meanStd(S.map(v => v[2]))[0];
  const g = Math.hypot(ax, ay, az), tilt = Math.acos(Math.max(-1, Math.min(1, az / (g || 1)))) * 180 / Math.PI;
  const drift = Math.hypot(...[3, 4, 5].map(i => meanStd(S.map(v => v[i]))[0]));
  const chip = c.chip || '陀螺仪';
  if (!calStore[c.id]) {
    const ok = Math.abs(g - 1) < 0.12;
    return { ok, msg: ok ? `${chip} ${g.toFixed(2)}g，正常。还没校准水平：车放平后点「设为水平」` :
      `${chip} 读到 ${g.toFixed(2)}g（应该 1g）。便宜的 MPU6050 自己就有偏差，不一定是坏了 → 车放平后点「设为水平」校准，再自检一次` };
  }
  const ok = Math.abs(g - 1) < 0.1 && tilt < 15 && drift < 3;
  return { ok, msg: ok ? `${chip} 已校准：${g.toFixed(2)}g，倾斜 ${tilt.toFixed(1)}°，漂移 ${drift.toFixed(1)}°/s` :
    drift >= 3 ? `${chip} 陀螺仪漂移 ${drift.toFixed(1)}°/s（车在动？或者温度变了）→ 车放稳再点「设为水平」` :
    `${chip} 校准后还是 ${g.toFixed(2)}g / 倾斜 ${tilt.toFixed(0)}°：车没放在原来的位置，或者架子松了 → 重新「设为水平」` };
}

function finishCal(c) {
  const k = c.cal; c.cal = null; c.busy = null;
  const S = k.samples;
  const reply = (ok, msg, extra = {}) => {
    toUis({ t: 'calib', car: c.id, ok, msg, ...extra });
    diag(ok ? '水平校准完成' : '水平校准失败', c.id, msg, { 发起: k.by });
    sfxCar(c, ok ? 'ok' : 'err');
    broadcastState();
  };
  if (S.length < 10) return reply(false, `只收到 ${S.length} 个数据：陀螺仪没在工作？`);
  const st = [0, 1, 2, 3, 4, 5].map(i => meanStd(S.map(v => v[i])));
  const gyroNoise = Math.hypot(st[3][1], st[4][1], st[5][1]), accNoise = Math.hypot(st[0][1], st[1][1], st[2][1]);
  if (gyroNoise > 4 || accNoise > 0.06) return reply(false, `车在动（抖动 ${gyroNoise.toFixed(1)}°/s，${accNoise.toFixed(2)}g）：放稳别碰，再点一次`);
  const a = [st[0][0], st[1][0], st[2][0]], g = Math.hypot(...a);
  if (g < 0.5 || g > 1.6) return reply(false, `读数 ${g.toFixed(2)}g 太离谱，校准不了：陀螺仪可能坏了或者接触不良`);
  const u = a.map(x => x / g);
  const tilt = Math.acos(Math.max(-1, Math.min(1, u[2]))) * 180 / Math.PI;
  calStore[c.id] = { R: rotToZ(u).map(x => +x.toFixed(6)), s: +(1 / g).toFixed(5), gb: [st[3][0], st[4][0], st[5][0]].map(x => +x.toFixed(2)),
    g: +g.toFixed(3), tilt: +tilt.toFixed(1), at: new Date().toLocaleString('zh-CN', { hour12: false }) };
  saveCal();
  c.yaw = 0;
  reply(true, `完成：原始 ${g.toFixed(2)}g → 1.00g，装歪了 ${tilt.toFixed(1)}° 已扣掉，陀螺零点 ${calStore[c.id].gb.join(' / ')} °/s`, { g, tilt });
}

const canControl = (cl, c) => !c.driver || c.driver === cl.id;

// ---------------- 玩家 ----------------
function release(cl, reason) {
  const c = cars.get(cl.carId);
  if (c && c.driver === cl.id) {
    c.driver = null; c.input = { th: 0, st: 0, hn: 0, at: 0 };
    send(c.ws, { t: 'stop' });
    sfxCar(c, 'release');
    logEvent('driver_left', { car: c.id, msg: `${cl.name} ${reason || ''}` });
  }
  cl.carId = null;
  broadcastState();
}

function safeEq(a, b) { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); }
// 开始 OTA：file = 固件路径，version = 显示用版本。返回错误文字或 null
function startOta(c, file, version, by) {
  if (!c || !c.online) return '车不在线';
  if (c.busy) return '车正忙（' + c.busy + '）';
  if (c.driver) return '有人正在开，不能升级';
  if (!c.srvAddr) return '不知道 Mac 的地址';
  if (cmpVer(c.fw, '0.6.0') < 0) return `车上固件 ${c.fw} 太旧，没有配网功能：第一次升到 0.6 要插 USB，用 RC Studio「刷机 + 配网」`;
  let size; try { size = fs.statSync(file).size; } catch { return '固件文件不见了：' + path.basename(file); }
  const token = crypto.randomBytes(12).toString('base64url');
  otaTokens.set(token, { file, exp: now() + 120000 });
  const url = `http://${c.srvAddr}:${PORT}/fw/car.bin?k=${token}&v=${encodeURIComponent(version)}`;
  c.ota = { from: c.fw, to: version, at: now() }; c.busy = 'ota';
  send(c.ws, { t: 'ota', url });
  diag('开始升级', c.id, `${c.fw} → ${version}`, { 发起: by, 大小: Math.round(size / 1024) + 'KB' });
  broadcastState();
  setTimeout(() => { if (c.ota && now() - c.ota.at >= 89000) { diag('升级失败', c.id, '90 秒没回来：车可能没电了，或者下载中断。再试一次；新固件连不上服务器的话，车开机 3 次后会自动退回旧版'); c.ota = null; c.busy = null; broadcastState(); } }, 90000);
  return null;
}

function onUiMessage(cl, m) {
  if (m.t === 'hello' && m.admin && safeEq(String(m.admin), ADMIN_TOKEN)) cl.admin = true;
  if (ADMIN_MSGS.has(m.t) && !cl.admin) return send(cl.ws, { t: 'error', msg: '需要管理员权限：在 Mac 上打开网页，或用服务器终端里打印的「管理链接」' });
  switch (m.t) {
    case 'hello':
      cl.name = String(m.name || `玩家${cl.id}`).slice(0, 20);
      send(cl.ws, { t: 'welcome', you: cl.id, admin: !!cl.admin, name: cl.name, songs: SONGS, sfx: SFX_NAMES, httpsPort: httpsUp ? HTTPS_PORT : null });
      broadcastState();
      break;
    case 'ping':
      send(cl.ws, { t: 'pong', ts: m.ts });
      break;
    case 'claim': {
      const c = cars.get(Number(m.car));
      if (!c || !c.online) return send(cl.ws, { t: 'error', msg: '这台车不在线' });
      if (c.driver && c.driver !== cl.id) return send(cl.ws, { t: 'error', msg: `${(clients.get(c.driver) || {}).name} 正在开` });
      if (c.busy) return send(cl.ws, { t: 'error', msg: c.busy === 'ota' ? '正在升级，等一下' : c.busy === 'calib' ? '正在校准，等一下' : '正在自检，等一下' });
      if (cl.carId && cl.carId !== c.id) release(cl, '换车');
      if (c.driver !== cl.id) sfxCar(c, 'claim');
      c.driver = cl.id; cl.carId = c.id;
      logEvent('driver_joined', { car: c.id, msg: cl.name });
      broadcastState();
      break;
    }
    case 'release':
      release(cl, '');
      break;
    case 'selftest':
    case 'ota': {
      const c = cars.get(Number(m.car));
      if (!c || !c.online) return send(cl.ws, { t: 'error', msg: '车不在线' });
      if (c.driver && c.driver !== cl.id) return send(cl.ws, { t: 'error', msg: `${(clients.get(c.driver) || {}).name} 正在开，不能${m.t === 'ota' ? '升级' : '自检'}` });
      if (c.busy) return send(cl.ws, { t: 'error', msg: c.busy === 'ota' ? '正在升级' : c.busy === 'calib' ? '正在校准' : '正在自检' });
      if (c.driver === cl.id) release(cl, m.t === 'ota' ? '去升级' : '去自检');
      if (m.t === 'selftest') {
        c.input = { th: 0, st: 0, hn: 0, at: 0 };
        send(c.ws, { t: 'selftest' });
        logEvent('selftest', { car: c.id, msg: cl.name });
      } else {
        const b = latestBuildFor(c);
        if (!b) return send(cl.ws, { t: 'error', msg: c.soc ? 'Mac 上没有这块芯片的固件：先在 RC Studio「固件」里编译' : '车上固件太旧：第一次要插 USB 用 RC Studio 一键装车' });
        if (BUILDS.verify(b)) return send(cl.ws, { t: 'error', msg: '固件文件坏了：重新编译' });
        const err = startOta(c, BUILDS.appBin(b), b.version, cl.name);
        if (err) return send(cl.ws, { t: 'error', msg: err });
      }
      break;
    }
    case 'selftest_stop': {
      const c = cars.get(Number(m.car));
      if (c && c.busy === 'selftest') send(c.ws, { t: 'stop' });
      break;
    }
    case 'bg': {   // 手机页面切到后台 / 回到前台
      const c = cars.get(cl.carId);
      if (c && c.driver === cl.id) diag(m.hidden ? '手机切后台' : '手机回前台', c.id, m.hidden ? '浏览器被切到后台或锁屏，操作会停（车会刹停）' : '回来了', { 司机: cl.name });
      break;
    }
    case 'input': {
      const c = cars.get(cl.carId);
      if (!c || c.driver !== cl.id) return;
      const clamp = v => Math.max(-1, Math.min(1, Number(v) || 0));
      if (c.input.at) {
        const gap = now() - c.input.at;
        if (gap > c.inputGapMax) c.inputGapMax = gap;
        if (gap > 300) { c.lastInputGap = { gap, at: now() }; c.stats.phoneGaps++; if (gap > 1000) diag('手机卡顿', c.id, `手机 ${gap}ms 没发操作（锁屏 / 切后台 / 手机信号）`, { 司机: cl.name }); }
      }
      const prev = c.input;
      c.input = { th: clamp(m.th), st: clamp(m.st), hn: m.hn ? 1 : 0, at: now() };
      // 手动挡/自动挡：挡位和转速只是模拟出来的，转给观众的页面，让大家听到同一台发动机
      c.drv = { g: Math.max(-1, Math.min(8, Math.round(Number(m.g) || 0))), rpm: Math.max(0, Math.min(10000, Math.round(Number(m.rpm) || 0))), md: String(m.md || '').slice(0, 8) };
      // 有变化就立刻转发给车（不等 30Hz 的下一拍），转向/油门少等最多 33ms
      if (Math.abs(c.input.st - prev.st) > 0.05 || Math.abs(c.input.th - prev.th) > 0.05 || c.input.hn !== prev.hn) sendCtl(c);
      break;
    }
    case 'calib': {
      const c = cars.get(Number(m.car));
      if (!c || !c.online) return send(cl.ws, { t: 'error', msg: '车不在线' });
      if (!canControl(cl, c)) return send(cl.ws, { t: 'error', msg: '别人正在开这台车' });
      if (c.busy) return send(cl.ws, { t: 'error', msg: '车正忙（' + c.busy + '）' });
      if (!c.tel || c.tel.imu !== 'ok') return send(cl.ws, { t: 'error', msg: '陀螺仪没在工作，校准不了' });
      c.input = { th: 0, st: 0, hn: 0, at: 0 }; send(c.ws, { t: 'stop' });
      c.busy = 'calib'; c.cal = { samples: [], by: cl.name, at: now() };
      toUis({ t: 'calib', car: c.id, phase: 'run', msg: '采样中，别碰车（1.5 秒）' });
      broadcastState();
      setTimeout(() => { if (c.cal) finishCal(c); }, 1500);
      break;
    }
    case 'calib_clear': {
      const c = cars.get(Number(m.car));
      if (!c || !canControl(cl, c)) return;
      delete calStore[c.id]; saveCal();
      toUis({ t: 'calib', car: c.id, ok: true, msg: '已清除水平校准，现在显示原始数据' });
      broadcastState();
      break;
    }
    case 'sfx': {
      const c = cars.get(Number(m.car));
      if (!c || !c.online || !canControl(cl, c) || !SFX_NAMES.includes(m.n)) return;
      if (!c.snd) return send(cl.ws, { t: 'error', msg: '车上的固件还不支持声音：先升级到 0.4' });
      sfxCar(c, m.n);
      if (m.n === 'count') toUis({ t: 'count', car: c.id, at: now() });   // 页面上同步亮五盏红灯
      break;
    }
    case 'play': {
      const c = cars.get(Number(m.car));
      if (!c || !c.online || !canControl(cl, c)) return;
      if (!c.snd) return send(cl.ws, { t: 'error', msg: '车上的固件还不支持声音：先升级到 0.4' });
      let r, name;
      if (m.song) { const s = SONGS.find(x => x.id === m.song); if (!s) return; r = s.r; name = s.name; }
      else if (typeof m.rtttl === 'string') {
        r = m.rtttl.replace(/[^\x20-\x7e]/g, '').replace(/"/g, '').trim().slice(0, 1500);
        if (!/^[^:]*:[^:]*:.+/.test(r)) return send(cl.ws, { t: 'error', msg: '格式不对：应该像 名字:d=4,o=5,b=120:c,e,g' });
        name = r.split(':')[0] || '自定义';
      } else return;
      send(c.ws, { t: 'play', r, lp: m.loop ? 1 : 0 });
      c.music = { name, at: now(), loop: !!m.loop };
      broadcastState();
      break;
    }
    case 'mstop': {
      const c = cars.get(Number(m.car));
      if (!c || !c.online || !canControl(cl, c)) return;
      send(c.ws, { t: 'mstop' }); c.music = null; broadcastState();
      break;
    }
    case 'cfg': {
      const id = Number(m.car);
      const c = cars.get(id);
      if (!c || (c.driver && c.driver !== cl.id)) return;
      const allowed = Object.keys(DEFAULT_CFG);
      const next = { ...cfgFor(id) };
      for (const k of allowed) if (m[k] != null && isFinite(m[k])) next[k] = Number(m[k]);
      cfgStore[id] = next; saveCfg();
      send(c.ws, { t: 'cfg', ...next });
      broadcastState();
      break;
    }
  }
}

// ---------------- 控制循环 30 Hz（输入有变化时也会立刻发） ----------------
function sendCtl(c) {
  if (!c.online || !c.driver || c.busy) return;
  let { th, st, hn, at } = c.input;
  if (now() - at > 300) { th = 0; st = 0; hn = 0; }   // 玩家那边卡了 → 归零（车再 500 ms 收不到会自己刹停）
  if (c.flipped) th = 0;                       // 翻车了不给油
  const msg = { t: 'ctl', seq: ++c.seq, th: +th.toFixed(3), st: +st.toFixed(3) };
  if (hn) msg.hn = 1;
  send(c.ws, msg);
}
setInterval(() => { for (const c of cars.values()) sendCtl(c); }, 33);

// ---------------- 维修站屏幕：每 200 ms 发一次每台车的摘要 ----------------
function pitDriverName(c) {
  if (!c.driver) return '';
  const n = ascii((clients.get(c.driver) || {}).name);
  return n || `P${c.driver}`;
}
setInterval(() => {
  if (!pits.size) return;
  for (const c of cars.values()) {
    const T = c.tel || {};
    const ax = T.ax, g = ax != null ? Math.hypot(T.ax, T.ay, T.az) : null;
    const msg = JSON.stringify({
      t: 'pc', id: c.id, on: c.online ? 1 : 0, fw: ascii(c.fw),
      v: T.bat === 'ok' ? T.v : 0, bat: c.sens.bat, imu: c.sens.imu,
      rssi: T.rssi || 0, rtt: c.rtt == null ? -1 : c.rtt,
      drv: pitDriverName(c), flip: c.flipped ? 1 : 0, low: c.lowBatt ? 1 : 0,
      th: T.oth || 0, st: T.ost || 0, g: g == null ? -1 : +g.toFixed(2), tc: T.tc == null ? -99 : +T.tc.toFixed(0),
    });
    for (const p of pits) if (p.readyState === 1) p.send(msg);
  }
}, 200);

function pitStop(c, who) {
  if (!c) return;
  const cl = clients.get(c.driver);
  if (cl) { send(cl.ws, { t: 'error', msg: '维修站叫停了这台车' }); release(cl, '被维修站叫停'); }
  c.input = { th: 0, st: 0, hn: 0, at: 0 };
  send(c.ws, { t: 'stop' });
  logEvent('pit_stop', { car: c.id, msg: who });
}

// 每秒测一次服务器↔车的往返延迟
setInterval(() => {
  for (const c of cars.values()) if (c.online) send(c.ws, { t: 'ping', ts: tsSmall() });
}, 1000);

// 车 3 秒没遥测 → 判定离线
setInterval(() => {
  const t = now();
  for (const c of cars.values()) {
    if (c.online && c.lastTelAt && t - c.lastTelAt > 3000) {
      c.online = false; c.downAt = now(); c.stats.disconnects++;
      try { c.ws.terminate(); } catch {}
      if (c.busy !== 'ota') diag('车没回应', c.id, `3 秒没收到遥测${sigNote(c.prev && c.prev.rssi)}：车没电/重启了，或 WiFi 掉了`);
      logEvent('car_offline', { car: c.id, msg: '3 秒没有遥测' });
      broadcastState();
    }
  }
}, 1000);

// ---------------- HTTP + WebSocket ----------------
let httpsUp = false;
function onRequest(req, res) {
  const url = req.url.split('?')[0];
  if (url === '/' || url === '/index.html') {
    fs.readFile(path.join(DIR, 'ui.html'), (err, buf) => {
      if (err) { res.writeHead(500); return res.end('ui.html 不见了，放到 server.js 同一个文件夹'); }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(buf);
    });
  } else if (url === '/vendor/three.module.min.js') {
    const f = path.join(DIR, 'node_modules', 'three', 'build', 'three.module.min.js');
    fs.readFile(f, (err, buf) => {
      if (err) { res.writeHead(404); return res.end('three 没装：重新跑 bash start.sh'); }
      res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'max-age=86400' });
      res.end(buf);
    });
  } else if (url === '/fw/car.bin') {
    const k = new URL(req.url, 'http://x').searchParams.get('k') || '';
    const tok = otaTokens.get(k);
    let f = null;
    if (tok && tok.exp > now()) f = tok.file;
    else if (isLoopback(req.socket.remoteAddress)) f = path.join(FW_DIR, 'car.bin');
    if (!f) { res.writeHead(403); return res.end('forbidden'); }
    fs.readFile(f, (err, buf) => {
      if (err) { res.writeHead(404); return res.end('no firmware'); }
      const md5 = crypto.createHash('md5').update(buf).digest('hex');   // 车端 HTTPUpdate 会校验 x-MD5，下载坏了就不刷
      res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': buf.length, 'x-MD5': md5 });
      res.end(buf);
      console.log(`[${new Date().toLocaleTimeString()}] 车正在下载固件 ${Math.round(buf.length / 1024)}KB  ${req.socket.remoteAddress}`);
    });
  } else if (url === '/fw/info.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(fwInfo()));
  } else if (url === '/api/diag') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ recent: diagRecent.slice(-50).reverse(), cars: [...cars.values()].map(c => ({ id: c.id, ...c.stats })) }, null, 2));
  } else if (url === '/api/state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ cars: [...cars.values()].map(carSummary), clients: clients.size }));
  } else { res.writeHead(404); res.end(); }
}
const server = http.createServer(onRequest);

const wssCar = new WebSocketServer({ noServer: true, perMessageDeflate: false });
const wssUi = new WebSocketServer({ noServer: true, perMessageDeflate: false });
const wssPit = new WebSocketServer({ noServer: true, perMessageDeflate: false });

function onUpgrade(req, sock, head) {
  sock.setNoDelay(true);
  const url = req.url.split('?')[0];
  if (url === '/car') wssCar.handleUpgrade(req, sock, head, ws => wssCar.emit('connection', ws, req));
  else if (url === '/ui') wssUi.handleUpgrade(req, sock, head, ws => wssUi.emit('connection', ws, req));
  else if (url === '/pit') wssPit.handleUpgrade(req, sock, head, ws => wssPit.emit('connection', ws, req));
  else sock.destroy();
}
server.on('upgrade', onUpgrade);
wssCar.on('connection', ws => {
  ws.on('message', buf => { let m; try { m = JSON.parse(buf); } catch { return; } onCarMessage(ws, m); });
  ws.on('close', () => {
    const c = cars.get(ws.carId);
    if (c && c.ws === ws) {
      c.online = false; c.downAt = now(); c.stats.disconnects++;
      if (c.busy !== 'ota') diag('车断开', c.id, '和服务器的连接断了，等它重连后会写出原因', { 最后信号: c.prev && c.prev.rssi, 最后延迟: c.rtt });
      logEvent('car_offline', { car: c.id, msg: '断开' });
      broadcastState();
    }
  });
});

wssUi.on('connection', (ws, req) => {
  const qAdmin = new URL(req.url, 'http://x').searchParams.get('admin') || '';
  const cl = { id: nextClient++, ws, name: '', carId: null, ip: req.socket.remoteAddress,
    admin: isLoopback(req.socket.remoteAddress) || (!!qAdmin && safeEq(qAdmin, ADMIN_TOKEN)) };
  clients.set(cl.id, cl);
  ws.on('message', buf => { let m; try { m = JSON.parse(buf); } catch { return; } onUiMessage(cl, m); });
  ws.on('close', () => {
    const c = cars.get(cl.carId);
    if (c && c.driver === cl.id) diag('手机断开', c.id, '开车的手机断开了（锁屏 / 关网页 / 手机 WiFi 断）', { 司机: cl.name });
    release(cl, '离开'); clients.delete(cl.id); broadcastState();
  });
  send(ws, { t: 'state', cars: [...cars.values()].map(carSummary) });
});

wssPit.on('connection', (ws, req) => {
  pits.add(ws);
  console.log(`[${new Date().toLocaleTimeString()}] 维修站屏幕已连接 ${req.socket.remoteAddress}`);
  send(ws, { t: 'pe', id: 0, type: 'hello', msg: 'server ok' });
  ws.on('message', buf => {
    let m; try { m = JSON.parse(buf); } catch { return; }
    if (m.t === 'stop') pitStop(cars.get(Number(m.car)), '维修站');
    else if (m.t === 'allstop') { for (const c of cars.values()) pitStop(c, '维修站 全部停车'); }
    else if (m.t === 'ping') send(ws, { t: 'pong', ts: m.ts });
  });
  ws.on('close', () => pits.delete(ws));
});

function lanIps() {
  return Object.values(os.networkInterfaces()).flat()
    .filter(i => i && i.family === 'IPv4' && !i.internal).map(i => i.address);
}

// ---------------- 驾驶服务器（8080 / 8443）：RC Studio 里开关 ----------------
// 车和手机都连这里。关掉 = 断开所有车和手机（车会刹停，等再开时自动重连）
let sserver = null;
const drive = { running: false, since: null, error: null };
function driveStatus() {
  return { ...drive, port: PORT, httpsPort: httpsUp ? HTTPS_PORT : null, cars: [...cars.values()].filter(c => c.online).length, phones: clients.size,
    urls: drive.running ? lanIps().map(ip => `http://${ip}:${PORT}/`) : [] };
}
function startDrive() {
  return new Promise((resolve, reject) => {
    if (drive.running) return resolve(driveStatus());
    const onErr = e => {
      server.off('listening', onOk);
      drive.error = e.code === 'EADDRINUSE' ? `端口 ${PORT} 被占用：是不是另一个 node server.js 还开着？（终端 Ctrl+C 关掉它）` : e.message;
      reject(new Error(drive.error));
    };
    const onOk = () => {
      server.off('error', onErr);
      drive.running = true; drive.since = Date.now(); drive.error = null;
      // https：同一套网页和 WebSocket，只是加密了（手机陀螺仪要它；车还是走 8080 的 http）
      try {
        const key = fs.readFileSync(path.join(DIR, 'certs', 'key.pem')), cert = fs.readFileSync(path.join(DIR, 'certs', 'cert.pem'));
        sserver = https.createServer({ key, cert }, onRequest);
        sserver.on('upgrade', onUpgrade);
        sserver.on('error', e => { console.log(`https 开不了（${e.code}）：陀螺仪转向用不了，其他不影响`); httpsUp = false; });
        sserver.listen(HTTPS_PORT, '0.0.0.0', () => { httpsUp = true; });
      } catch { console.log('没有 https 证书（certs/）：用 bash start.sh 启动会自动生成。陀螺仪转向需要它'); }
      console.log('\n ▶ 驾驶服务器已开');
      for (const ip of lanIps()) console.log(`   手机/电脑打开： http://${ip}:${PORT}      （要用手机陀螺仪转向：https://${ip}:${HTTPS_PORT}）`);
      const ip0 = lanIps()[0];
      if (ip0) console.log(`   管理链接（手机校准/自检/升级用，别发给别人）： http://${ip0}:${PORT}/?admin=${ADMIN_TOKEN}`);
      console.log('   等车连上…\n');
      logEvent('server', { msg: '驾驶服务器开了' });
      resolve(driveStatus());
    };
    server.once('error', onErr);
    server.once('listening', onOk);
    server.listen(PORT, '0.0.0.0');
  });
}
function stopDrive() {
  return new Promise(resolve => {
    if (!drive.running) return resolve(driveStatus());
    for (const c of cars.values()) { if (c.online && c.ws) { try { send(c.ws, { t: 'stop' }); } catch { } } }   // 先让车刹停
    for (const w of [wssCar, wssUi, wssPit]) for (const ws of w.clients) { try { ws.close(1001, 'server stopping'); } catch { } }
    let n = sserver ? 2 : 1; const done = () => { if (--n === 0) { drive.running = false; drive.since = null; httpsUp = false; sserver = null; console.log(' ■ 驾驶服务器已关'); resolve(driveStatus()); } };
    server.close(done); if (server.closeAllConnections) server.closeAllConnections();
    if (sserver) { sserver.close(done); if (sserver.closeAllConnections) sserver.closeAllConnections(); }
    setTimeout(() => { for (const w of [wssCar, wssUi, wssPit]) for (const ws of w.clients) { try { ws.terminate(); } catch { } } }, 1500);
  });
}

setInterval(() => { const t = now(); for (const [k, v] of otaTokens) if (v.exp < t) otaTokens.delete(k); }, 30000);

// ---------------- 启动 ----------------
// 默认只开 RC Studio（127.0.0.1:8090），驾驶服务器在 Studio 里开。
//   node server.js           Studio；如果设置了「开机自动开驾驶服务器」就一起开
//   node server.js --drive   Studio + 驾驶服务器一起开（旧的用法）
const wantDrive = process.argv.includes('--drive') || process.env.RC_DRIVE === '1' || !!SECRETS.driveAutostart;
console.log('\n RC 服务器');
if (process.env.RC_NO_ADMIN !== '1') {
  require('./admin').start({
    cars, clients, carSummary, send, toUis, broadcastState, diag, logEvent, startOta, lanIps,
    PORT, secrets: SECRETS, saveSecrets: () => secrets.save(SECRETS), FW_DIR,
    drive: { start: startDrive, stop: stopDrive, status: driveStatus },
  });
}
if (wantDrive || process.env.RC_NO_ADMIN === '1') startDrive().catch(e => console.log('   ✗ 驾驶服务器开不了：' + e.message));
else console.log('   驾驶服务器（8080）没开：在 RC Studio 里点「开」\n');
