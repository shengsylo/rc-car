#!/usr/bin/env node
// 命令行版 RC Studio（flash.sh / reflash.sh 用它；和网页用同一套代码）
//   node tools/rc.js ports
//   node tools/rc.js build  <esp32|c3>
//   node tools/rc.js flash  <esp32|c3> [--port P] [--build ID]
//   node tools/rc.js prov   [--port P] --car N
//   node tools/rc.js setup  <esp32|c3> --car N [--port P]     编译 → 刷机 → 配网
//   node tools/rc.js info   [--port P]
//   node tools/rc.js wifi                                      设置/更新 WiFi（存 ~/.rcstudio/secrets.json）
'use strict';
const path = require('path');
const readline = require('readline');
const ROOT = path.join(__dirname, '..');
const secrets = require(path.join(ROOT, 'lib/secrets'));
const fw = require(path.join(ROOT, 'lib/firmware'));
const { PortManager } = require(path.join(ROOT, 'lib/ports'));
const { BuildRegistry } = require(path.join(ROOT, 'lib/builds'));
const { JobRunner } = require(path.join(ROOT, 'lib/jobs'));

const CLI = process.env.ARDUINO_CLI || 'arduino-cli';
const argv = process.argv.slice(2);
const cmd = argv[0];
const opt = k => { const i = argv.indexOf('--' + k); return i > 0 ? argv[i + 1] : undefined; };
const pos = argv.filter((a, i) => i > 0 && !a.startsWith('--') && !argv[i - 1].startsWith('--'));
const say = s => console.log(`\n\x1b[1;32m▶ ${s}\x1b[0m`);
const die = s => { console.log(`\n\x1b[1;31m✗ ${s}\x1b[0m`); process.exit(1); };

const S = secrets.load();
const ports = new PortManager(CLI);
const builds = new BuildRegistry(ROOT);
const jobs = new JobRunner(ROOT);
jobs.on('log', l => { if (!/^\$ /.test(l.text) || process.env.RC_VERBOSE) console.log('  ' + l.text); });
const run = (title, fn) => new Promise((res, rej) => {
  const j = jobs.start({ kind: 'cli', title }, fn);
  jobs.on('job', v => { if (v.id === j.id && v.state !== 'running') v.state === 'done' ? res(v.result) : rej(new Error(v.error)); });
});

function ask(q, hidden) {
  return new Promise(res => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (hidden) { rl._writeToOutput = s => { if (s.includes(q)) process.stdout.write(s); else process.stdout.write(''); }; }
    rl.question(q, a => { rl.close(); if (hidden) process.stdout.write('\n'); res(a); });
  });
}
async function ensureWifi(force) {
  const w = S.wifi && S.wifi[S.wifiDefault || 'home'];
  if (w && w.ssid && !force) return w;
  const ssid = (await ask('车用的 WiFi 名称（必须 2.4GHz）: ')).trim();
  const pass = await ask('WiFi 密码: ', true);
  S.wifi = S.wifi || {}; S.wifi.home = { ssid, pass }; S.wifiDefault = S.wifiDefault || 'home';
  secrets.save(S);
  console.log(`  存好了：${ssid} / ${secrets.mask(pass)}（${pass.length} 位），在 ${secrets.FILE}`);
  return S.wifi.home;
}
async function pickPort() {
  if (opt('port')) return opt('port');
  const list = await ports.scan();
  if (ports.error) die(ports.error);
  if (!list.length) die('没找到 USB 串口。换一根能传数据的线（很多线只能充电），或装 CH340/CP2102 驱动');
  if (list.length > 1) console.log('  有多个串口，用第一个：' + list.map(p => p.address).join('  ') + '（指定：--port）');
  return list[0].address;
}
function target() { const t = pos[0] || process.env.TARGET || 'esp32'; if (!fw.readTargets(ROOT)[t]) die(`没有这个型号：${t}（esp32 / c3）`); return t; }

(async () => {
  try {
    switch (cmd) {
      case 'ports': { const l = await ports.scan(); if (ports.error) die(ports.error); for (const p of l) console.log(p.address, p.board || p.guess); if (!l.length) console.log('（没有）'); break; }
      case 'wifi': await ensureWifi(true); break;
      case 'build': { const t = target(); say(`编译 ${t}`); const r = await run('build', ctx => fw.build(ctx, { root: ROOT, cli: CLI, targets: fw.readTargets(ROOT), builds, target: t })); say(`好了：${r.build}（RC Studio 和手机都能拿它无线升级）`); break; }
      case 'flash': {
        const t = target(); const port = await pickPort();
        let id = opt('build') || (builds.latest(t) || {}).id;
        if (!id) { say(`先编译 ${t}`); id = (await run('build', ctx => fw.build(ctx, { root: ROOT, cli: CLI, targets: fw.readTargets(ROOT), builds, target: t }))).build; }
        say(`刷 ${id} → ${port}（卡在 Connecting... 就按住板上 BOOT 键）`);
        await run('flash', ctx => fw.flash(ctx, { root: ROOT, cli: CLI, builds, buildId: id, port, targets: fw.readTargets(ROOT) }));
        break;
      }
      case 'prov': {
        const car = opt('car') || process.env.CAR_ID || '1'; const w = await ensureWifi(); const port = await pickPort();
        say(`配网 ${port} → 车 #${car}`);
        await run('prov', ctx => fw.provision(ctx, { ports, port, wifi: w, carId: car, otaPassword: S.otaPassword }));
        break;
      }
      case 'setup': {
        const t = target(); const car = opt('car') || process.env.CAR_ID || '1'; const w = await ensureWifi(); const port = await pickPort();
        say(`1/3 编译 ${t}`); const r = await run('build', ctx => fw.build(ctx, { root: ROOT, cli: CLI, targets: fw.readTargets(ROOT), builds, target: t }));
        say(`2/3 刷机 → ${port}（卡在 Connecting... 就按住板上 BOOT 键）`); await run('flash', ctx => fw.flash(ctx, { root: ROOT, cli: CLI, builds, buildId: r.build, port, targets: fw.readTargets(ROOT) }));
        await new Promise(r => setTimeout(r, 2500));
        say(`3/3 配网：WiFi「${w.ssid}」车 #${car}`); await run('prov', ctx => fw.provision(ctx, { ports, port: opt('port') || port, wifi: w, carId: car, otaPassword: S.otaPassword }));
        say('完成 ✓  车会自己连上服务器（bash start.sh 开着的话，RC Studio 里会看到它）');
        break;
      }
      case 'info': { const port = await pickPort(); await run('info', ctx => fw.readInfo(ctx, { ports, port })); break; }
      default: console.log(require('fs').readFileSync(__filename, 'utf8').split('\n').slice(1, 10).join('\n').replace(/^\/\/ ?/gm, ''));
    }
    process.exit(0);
  } catch (e) { die(e.message); }
})();
