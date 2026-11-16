// RC Studio 管理平面：只绑 127.0.0.1:8090，只有这台 Mac 自己能打开。
// 驾驶端（:8080 / :8443）只走开车消息；编译、刷机、配网、OTA、项目文件都在这里。
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');
const { JobRunner } = require('./lib/jobs');
const { PortManager } = require('./lib/ports');
const { BuildRegistry } = require('./lib/builds');
const fw = require('./lib/firmware');
const projects = require('./lib/projects');

const ROOT = __dirname;
const ADMIN_PORT = Number(process.env.RC_ADMIN_PORT || 8090);
const CLI = process.env.ARDUINO_CLI || 'arduino-cli';
const STUDIO_DIST = path.join(ROOT, 'studio', 'dist');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.glb': 'model/gltf-binary', '.stl': 'model/stl', '.woff2': 'font/woff2', '.wasm': 'application/wasm' };

function start(core) {
  const jobs = new JobRunner(ROOT);
  const ports = new PortManager(CLI);
  const builds = new BuildRegistry(ROOT);
  const S = core.secrets;
  const wsClients = new Set();
  const push = obj => { const s = JSON.stringify(obj); for (const ws of wsClients) if (ws.readyState === 1) ws.send(s); };

  jobs.on('job', j => push({ t: 'job', job: j }));
  jobs.on('log', l => push({ t: 'log', ...l }));
  ports.on('ports', p => push({ t: 'ports', ports: p }));
  ports.on('serial', s => push({ t: 'serial', ...s }));
  ports.on('monitor', m => push({ t: 'monitor', ...m }));
  // 车状态变了也推给 Studio（借用驾驶端的 broadcastState 时机：每 1 秒对比一次）
  let lastCars = '';
  setInterval(() => { const s = JSON.stringify([...core.cars.values()].map(core.carSummary)); if (s !== lastCars) { lastCars = s; push({ t: 'cars', cars: JSON.parse(s) }); } }, 1000);
  // USB 插拔：每 3 秒扫一次（arduino-cli 很快）
  let scanning = false;
  setInterval(async () => { if (scanning || wsClients.size === 0) return; scanning = true; try { await ports.scan(); } finally { scanning = false; } }, 3000);

  const targets = () => fw.readTargets(ROOT);
  const wifiOf = name => (S.wifi || {})[name || S.wifiDefault || 'home'] || Object.values(S.wifi || {})[0] || null;
  const portLock = p => 'port:' + p;
  const portBusy = p => jobs.isLocked(portLock(p)) || ports.monitors.has(p);

  function status() {
    return {
      cars: [...core.cars.values()].map(core.carSummary),
      ports: ports.ports, portsError: ports.error || null, serialOk: ports.hasSerial(),
      monitors: [...ports.monitors.keys()],
      targets: targets(), builds: builds.list(), jobs: jobs.list(),
      version: fw.sketchVersion(ROOT),
      settings: settingsView(),
      projects: projects.list(ROOT),
      driveUrl: core.lanIps()[0] ? `http://${core.lanIps()[0]}:${core.PORT}/` : null,
      adminUrl: core.lanIps()[0] ? `http://${core.lanIps()[0]}:${core.PORT}/?admin=${S.adminToken}` : null,
    };
  }
  function settingsView() {
    const w = {};
    for (const [k, v] of Object.entries(S.wifi || {})) w[k] = { ssid: v.ssid, pass: require('./lib/secrets').mask(v.pass), len: (v.pass || '').length };
    return { wifi: w, wifiDefault: S.wifiDefault || 'home', host: fw.macHost(), ip: fw.lanIp(), otaPassword: !!S.otaPassword };
  }

  // ------------- 动作（REST 和 WS 共用） -------------
  const actions = {
    status: () => status(),
    scan: async () => ({ ports: await ports.scan() }),
    build: ({ target, note }) => jobs.start({ kind: 'build', title: `编译 ${target}`, locks: ['compile:' + target] },
      ctx => fw.build(ctx, { root: ROOT, cli: CLI, targets: targets(), builds, target, note })).id,
    flash: ({ build, port }) => {
      if (ports.monitors.has(port)) throw new Error('先关掉这个串口的监视器');
      return jobs.start({ kind: 'flash', title: `刷机 ${build} → ${port}`, locks: [portLock(port)] },
        ctx => fw.flash(ctx, { root: ROOT, cli: CLI, builds, buildId: build, port, targets: targets() })).id;
    },
    provision: ({ port, car, wifi }) => {
      if (ports.monitors.has(port)) throw new Error('先关掉这个串口的监视器');
      return jobs.start({ kind: 'provision', title: `配网 ${port} → 车 ${car}`, locks: [portLock(port)] },
        ctx => fw.provision(ctx, { ports, port, wifi: wifiOf(wifi), carId: car, otaPassword: S.otaPassword })).id;
    },
    // 一键：编译(可选) → 刷机 → 配网
    setup: ({ target, port, car, build, wifi }) => {
      if (ports.monitors.has(port)) throw new Error('先关掉这个串口的监视器');
      return jobs.start({ kind: 'setup', title: `一键装车 ${target} → ${port} → 车 ${car}`, locks: [portLock(port), 'compile:' + target] }, async ctx => {
        let id = build;
        if (!id) { ctx.line('— 1/3 编译 —'); id = (await fw.build(sub(ctx, 0, 40), { root: ROOT, cli: CLI, targets: targets(), builds, target })).build; }
        ctx.line('— 2/3 刷机 —'); await fw.flash(sub(ctx, 40, 80), { root: ROOT, cli: CLI, builds, buildId: id, port, targets: targets() });
        ctx.line('— 3/3 配网 —'); await sleep(2500);
        const r = await fw.provision(sub(ctx, 80, 100), { ports, port, wifi: wifiOf(wifi), carId: car, otaPassword: S.otaPassword });
        return { build: id, ...r };
      }).id;
    },
    info: ({ port }) => jobs.start({ kind: 'info', title: `读车信息 ${port}`, locks: [portLock(port)] }, ctx => fw.readInfo(ctx, { ports, port })).id,
    ota: ({ car, build }) => {
      const c = core.cars.get(Number(car));
      const b = build ? builds.get(build) : null;
      if (build && !b) throw new Error('找不到这个编译版本');
      if (!b) throw new Error('选一个编译版本');
      const t = targets()[b.target];
      if (c && c.soc && t && t.soc && c.soc !== t.soc) throw new Error(`车是 ${c.soc}，这个固件是 ${t.soc}：刷错会变砖`);
      const bad = builds.verify(b); if (bad) throw new Error(bad);
      const err = core.startOta(c, builds.appBin(b), b.version, 'Studio');
      if (err) throw new Error(err);
      return { ok: true };
    },
    monitor: async ({ port, open }) => {
      if (open === false) { await ports.stopMonitor(port); return { ok: true }; }
      if (jobs.isLocked(portLock(port))) throw new Error('这个串口正在刷机/配网');
      await ports.monitor(port); return { ok: true };
    },
    serialWrite: async ({ port, text }) => { await ports.write(port, String(text) + '\n'); return { ok: true }; },
    cancel: ({ id }) => ({ ok: jobs.cancel(id) }),
    jobLog: ({ id }) => ({ log: jobs.log(id) }),
    setWifi: ({ name, ssid, pass }) => {
      name = String(name || 'home').slice(0, 20); ssid = String(ssid || '').slice(0, 32);
      if (!ssid) throw new Error('WiFi 名称不能空');
      S.wifi = S.wifi || {};
      const old = S.wifi[name] || {};
      S.wifi[name] = { ssid, pass: pass == null || pass === '' ? (old.pass || '') : String(pass).slice(0, 64) };
      if (!S.wifiDefault) S.wifiDefault = name;
      core.saveSecrets();
      return settingsView();
    },
    // 车的驾驶参数（跟手机设置页一样）
    carCfg: ({ car, cfg }) => { const c = core.cars.get(Number(car)); if (!c || !c.online) throw new Error('车不在线'); core.send(c.ws, { t: 'cfg', ...cfg }); return { ok: true }; },
    selftest: ({ car }) => { const c = core.cars.get(Number(car)); if (!c || !c.online) throw new Error('车不在线'); if (c.driver) throw new Error('有人在开'); core.send(c.ws, { t: 'selftest' }); return { ok: true }; },
    // 项目文件（Phase 2+）
    projectList: () => projects.list(ROOT),
    projectGet: ({ id }) => projects.get(ROOT, id),
    projectSave: ({ id, doc }) => projects.save(ROOT, id, doc),
    library: () => projects.library(ROOT),
    projectCreate: ({ id, name, from }) => {
      if (projects.list(ROOT).some(p => p.id === id)) throw new Error('已经有这个项目了');
      const doc = from ? projects.get(ROOT, from) : { schema: 1, name: name || id, units: 'mm', enclosure: { size: [60, 140, 40], floor: 3, keepOut: [] }, parts: [], wires: [], rig: { steerMaxDeg: 25, joints: [] }, anim: { duration: 8, channels: { throttle: [], steer: [] } }, firmware: { targets: [] } };
      doc.name = name || doc.name;
      return projects.save(ROOT, id, doc);
    },
    // 接线图生成的 pins.h → firmware/pins/<target>.h（下次编译就用它）
    savePins: ({ target, text }) => {
      if (!targets()[target]) throw new Error('没有这个 target');
      if (!/^[\s\S]{0,8000}$/.test(text) || /#include|`|\$\(/.test(text)) throw new Error('pins.h 内容不对');
      for (const l of String(text).split('\n')) if (l.trim() && !/^\s*(\/\/.*|#pragma once|#define RC_[A-Z0-9_]+ -?\d+(\s*\/\/.*)?)$/.test(l)) throw new Error('pins.h 只能有 #define RC_XXX 数字：' + l);
      const d = path.join(ROOT, 'firmware', 'pins'); fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, target + '.h'), text);
      return { ok: true, file: `firmware/pins/${target}.h` };
    },
    removePins: ({ target }) => { if (!targets()[target]) throw new Error('没有这个 target'); fs.rmSync(path.join(ROOT, 'firmware', 'pins', target + '.h'), { force: true }); return { ok: true }; },
    pinsFile: ({ target }) => { try { return { text: fs.readFileSync(path.join(ROOT, 'firmware', 'pins', target + '.h'), 'utf8') }; } catch { return { text: null }; } },
  };
  function sub(ctx, a, b) { return { ...ctx, progress: p => ctx.progress(a + (b - a) * p / 100) }; }
  async function act(name, args) {
    const f = actions[name];
    if (!f) throw new Error('没有这个动作：' + name);
    return await f(args || {});
  }

  // ------------- HTTP -------------
  const okHost = h => /^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(String(h || ''));
  const okOrigin = o => !o || /^http:\/\/(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(o);
  const server = http.createServer(async (req, res) => {
    // 防 DNS rebinding / 别的网站偷调：Host 必须是本机，Origin 有的话也必须是本机
    if (!okHost(req.headers.host) || !okOrigin(req.headers.origin)) { res.writeHead(403); return res.end('forbidden'); }
    const u = new URL(req.url, 'http://x');
    if (u.pathname.startsWith('/api/')) {
      const name = u.pathname.slice(5);
      let args = Object.fromEntries(u.searchParams);
      if (req.method === 'POST') {
        if (!/application\/json/.test(req.headers['content-type'] || '')) { res.writeHead(415); return res.end('json only'); }
        try { args = { ...args, ...JSON.parse(await body(req)) }; } catch { res.writeHead(400); return res.end('bad json'); }
      } else if (!['status', 'jobLog', 'projectList', 'projectGet', 'library', 'scan'].includes(name)) { res.writeHead(405); return res.end('POST'); }
      try { json(res, 200, { ok: true, data: await act(name, args) }); }
      catch (e) { json(res, 400, { ok: false, error: e.message }); }
      return;
    }
    if (u.pathname.startsWith('/files/')) return serveFile(res, ROOT, u.pathname.slice(7), ['library/', 'projects/']);
    if (u.pathname.startsWith('/vendor/')) return serveFile(res, path.join(ROOT, 'node_modules'), u.pathname.slice(8), ['three/']);
    // Studio 网页
    let f = u.pathname === '/' ? 'index.html' : u.pathname.slice(1);
    if (!fs.existsSync(path.join(STUDIO_DIST, 'index.html'))) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<meta charset="utf-8"><h2>RC Studio 还没编译</h2><p>在 rc-car 文件夹跑 <code>npm run studio:build</code>，再刷新。</p>');
    }
    if (!fs.existsSync(path.join(STUDIO_DIST, f))) f = 'index.html';   // SPA
    serveFile(res, STUDIO_DIST, f);
  });
  const wss = new WebSocketServer({ noServer: true });
  server.on('upgrade', (req, sock, head) => {
    if (req.url.split('?')[0] !== '/admin' || !okHost(req.headers.host) || !okOrigin(req.headers.origin)) return sock.destroy();
    wss.handleUpgrade(req, sock, head, ws => {
      wsClients.add(ws);
      ws.send(JSON.stringify({ t: 'status', data: status() }));
      ports.scan();
      ws.on('message', async raw => {
        let m; try { m = JSON.parse(raw); } catch { return; }
        try { const data = await act(m.a, m.args); ws.send(JSON.stringify({ t: 'reply', rid: m.rid, ok: true, data })); }
        catch (e) { ws.send(JSON.stringify({ t: 'reply', rid: m.rid, ok: false, error: e.message })); }
      });
      ws.on('close', () => wsClients.delete(ws));
    });
  });
  server.on('error', e => console.log(`   ⚠ RC Studio 开不了（${e.code === 'EADDRINUSE' ? `端口 ${ADMIN_PORT} 被占用` : e.message}），驾驶端照常`));
  server.listen(ADMIN_PORT, '127.0.0.1', () => console.log(`   RC Studio（只有这台 Mac 能开）： http://127.0.0.1:${ADMIN_PORT}/`));
  return { server, jobs, ports, builds, act };
}

function body(req) { return new Promise((res, rej) => { let s = ''; req.on('data', d => { s += d; if (s.length > 4e6) { rej(new Error('too big')); req.destroy(); } }); req.on('end', () => res(s)); }); }
function json(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); }
function serveFile(res, base, rel, allow) {
  const p = path.normalize(path.join(base, decodeURIComponent(rel)));
  if (!p.startsWith(base + path.sep) || (allow && !allow.some(a => p.startsWith(path.join(base, a))))) { res.writeHead(403); return res.end(); }
  fs.readFile(p, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream', 'Cache-Control': p.includes(`${path.sep}assets${path.sep}`) ? 'max-age=31536000, immutable' : 'no-store' });
    res.end(buf);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
module.exports = { start };
