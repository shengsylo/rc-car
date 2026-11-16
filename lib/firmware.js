// 编译 / 刷机 / 配网。固件里不放任何密码：WiFi 等配置刷完后经串口写进车的 NVS。
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');

function readTargets(root) { return JSON.parse(fs.readFileSync(path.join(root, 'targets.json'), 'utf8')); }
function sketchVersion(root) {
  const m = fs.readFileSync(path.join(root, 'rc_car.ino'), 'utf8').match(/FW_VERSION\s*=\s*"([^"]+)"/);
  return m ? m[1] : '0.0.0';
}
function macHost() {
  if (process.platform === 'darwin') {
    try { return require('child_process').execFileSync('scutil', ['--get', 'LocalHostName']).toString().trim(); } catch { }
  }
  return os.hostname().split('.')[0];
}
function lanIp() {
  for (const list of Object.values(os.networkInterfaces())) for (const a of list || [])
    if (a.family === 'IPv4' && !a.internal && !a.address.startsWith('169.254')) return a.address;
  return '';
}

// 编译某个 target → BuildRegistry 里多一个版本
async function build(ctx, { root, cli, targets, builds, target, note, pinsH }) {
  const t = targets[target];
  if (!t) throw new Error(`没有这个 target：${target}`);
  const version = sketchVersion(root);
  const sk = path.join(root, '.build', 'sketch', target, 'rc_car');
  const out = path.join(root, '.build', 'out', target);
  fs.rmSync(sk, { recursive: true, force: true }); fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(sk, { recursive: true }); fs.mkdirSync(out, { recursive: true });
  fs.copyFileSync(path.join(root, 'rc_car.ino'), path.join(sk, 'rc_car.ino'));
  // pins.h：Phase 3 由接线图生成；现在有 firmware/pins/<target>.h 就用，没有就用 rc_car.ino 里的默认脚位
  const pinsFile = path.join(root, 'firmware', 'pins', target + '.h');
  if (pinsH) fs.writeFileSync(path.join(sk, 'pins.h'), pinsH);
  else if (fs.existsSync(pinsFile)) fs.copyFileSync(pinsFile, path.join(sk, 'pins.h'));
  ctx.line(`编译 ${t.name}  固件 ${version}  (${t.fqbn})`);
  ctx.progress(5);
  let seen = 0;
  const args = ['compile', '--fqbn', t.fqbn, '--output-dir', out, '--build-path', path.join(root, '.build', 'cache', target)];
  if (process.env.RC_CTAGS) args.push('--build-property', `runtime.tools.ctags.path=${process.env.RC_CTAGS}`);
  args.push(sk);
  await ctx.run(cli, args, { onLine: () => { seen++; ctx.progress(Math.min(90, 5 + seen)); } });
  const b = builds.add({ target, fqbn: t.fqbn, version, outDir: out, note });
  ctx.line(`✓ 编译好了：${b.id}  app ${Math.round(b.files['app.bin'].size / 1024)}KB`);
  return { build: b.id, version, size: b.files['app.bin'].size };
}

// USB 刷机：用 arduino-cli upload --input-dir（自带 bootloader/partitions 的那套）
async function flash(ctx, { root, cli, builds, buildId, port, targets }) {
  const b = builds.get(buildId);
  if (!b) throw new Error('找不到这个编译版本：' + buildId);
  const bad = builds.verify(b); if (bad) throw new Error(bad);
  // upload --input-dir 要求文件名跟 sketch 名一致
  const dir = path.join(root, '.build', 'flash', b.target);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const map = { 'app.bin': 'rc_car.ino.bin', 'bootloader.bin': 'rc_car.ino.bootloader.bin', 'partitions.bin': 'rc_car.ino.partitions.bin', 'merged.bin': 'rc_car.ino.merged.bin' };
  for (const [a, z] of Object.entries(map)) if (b.files[a]) fs.copyFileSync(path.join(builds.dirOf(b), a), path.join(dir, z));
  ctx.line(`刷 ${b.id} 到 ${port}`);
  ctx.progress(5);
  // 红车那块 ESP32 高速烧录常失败：targets.json 里可以设 uploadSpeed
  const sp = targets && targets[b.target] && targets[b.target].uploadSpeed;
  const fqbn = sp ? b.fqbn + (b.fqbn.split(':').length > 3 ? ',' : ':') + 'UploadSpeed=' + sp : b.fqbn;
  await ctx.run(cli, ['upload', '-p', port, '--fqbn', fqbn, '--input-dir', dir], {
    onLine: l => { const m = l.match(/\((\d+)\s*%\)/); if (m) ctx.progress(5 + Number(m[1]) * 0.9); },
  });
  ctx.line('✓ 刷好了，车在重启');
  return { build: b.id, port };
}

// 串口配网：等车说 RC:PROV? / RC:READY，发 prov JSON，等 RC:PROV OK
async function provision(ctx, { ports, port, wifi, carId, otaPassword, host, ip }) {
  if (!wifi || !wifi.ssid) throw new Error('还没设置 WiFi：在 Studio 的「设置」里填一次（只存在这台 Mac）');
  const msg = JSON.stringify({ t: 'prov', ssid: wifi.ssid, pass: wifi.pass || '', host: host || macHost(), ip: ip || lanIp(), otapw: otaPassword || '', car: Number(carId) || 1 });
  ctx.line(`配网 ${port}：WiFi「${wifi.ssid}」 车号 ${carId}  服务器 ${host || macHost()} / ${ip || lanIp()}`);
  let done, fail; const result = new Promise((res, rej) => { done = res; fail = rej; });
  let info = null;
  const h = await ports.open(port, line => {
    if (line.includes('RC:')) ctx.line('车: ' + line.replace(/"pass":"[^"]*"/, '"pass":"***"'));
    if (line.startsWith('RC:PROV OK')) done();
    else if (line.startsWith('RC:PROV ERR')) fail(new Error(line));
    const m = line.match(/^RC:(INFO|READY) (\{.*\})/); if (m) { try { info = JSON.parse(m[2]); } catch { } }
  });
  try {
    // C3 原生 USB 打开串口时可能会复位：先等 1.5 秒，再每 2 秒发一次直到车回 OK
    const t0 = Date.now();
    await sleep(1500);
    ctx.progress(30);
    let sent = 0;
    while (true) {
      if (ctx.cancelled()) throw new Error('已取消');
      if (Date.now() - t0 > 25000) throw new Error('25 秒没回应：车开着吗？固件是 0.6 以上吗？（先刷机）');
      await h.write(msg + '\n'); sent++;
      const r = await Promise.race([result.then(() => 'ok'), sleep(2000).then(() => 'wait')]);
      if (r === 'ok') break;
      ctx.progress(30 + sent * 8);
    }
  } finally { await h.close(); }
  ctx.line('✓ 配网完成，车重启后会自己连 WiFi 和服务器');
  return { carId: Number(carId) || 1, info };
}

// 读车的信息（串口 {"t":"info"}）
async function readInfo(ctx, { ports, port }) {
  let got; const p = new Promise(r => { got = r; });
  const h = await ports.open(port, line => { const m = line.match(/^RC:(INFO|READY|PROV\?)\s*(\{.*\})?/); if (m) got(m[2] ? JSON.parse(m[2]) : { prov: false }); });
  try {
    await sleep(1200);
    for (let i = 0; i < 5; i++) {
      await h.write('{"t":"info"}\n');
      const r = await Promise.race([p, sleep(1500).then(() => null)]);
      if (r) { ctx.line('车: ' + JSON.stringify(r)); return r; }
    }
    throw new Error('车没回应（固件 0.6 以上才有这个功能）');
  } finally { await h.close(); }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
module.exports = { readTargets, sketchVersion, build, flash, provision, readInfo, macHost, lanIp };
