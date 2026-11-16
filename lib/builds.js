// BuildRegistry：builds/<target>/<版本>+<n>/ 放 app.bin、bootloader、partitions、manifest.json（sha256）
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class BuildRegistry {
  constructor(root) { this.root = path.join(root, 'builds'); fs.mkdirSync(this.root, { recursive: true }); }
  list(target) {
    const out = [];
    const targets = target ? [target] : safeDir(this.root);
    for (const t of targets) for (const d of safeDir(path.join(this.root, t))) {
      try { out.push(JSON.parse(fs.readFileSync(path.join(this.root, t, d, 'manifest.json'), 'utf8'))); } catch { }
    }
    return out.sort((a, b) => b.created - a.created);
  }
  get(id) { return this.list().find(b => b.id === id) || null; }
  latest(target) { return this.list(target)[0] || null; }
  dirOf(b) { return path.join(this.root, b.target, b.dir); }
  appBin(b) { return path.join(this.dirOf(b), 'app.bin'); }
  // outDir = arduino-cli --output-dir 的结果
  add({ target, fqbn, version, outDir, note }) {
    const tdir = path.join(this.root, target);
    fs.mkdirSync(tdir, { recursive: true });
    let n = 1; while (fs.existsSync(path.join(tdir, `${version}+${n}`))) n++;
    const dir = `${version}+${n}`;
    const dst = path.join(tdir, dir);
    fs.mkdirSync(dst);
    const files = {};
    const pick = (suffix, name) => {
      const f = safeDir(outDir).find(x => x.endsWith(suffix));   // rc_car.ino.bin / .ino.bootloader.bin / .ino.merged.bin 互不重叠
      if (!f) return;
      fs.copyFileSync(path.join(outDir, f), path.join(dst, name));
      const buf = fs.readFileSync(path.join(dst, name));
      files[name] = { size: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex') };
    };
    pick('.ino.bin', 'app.bin');
    pick('.bootloader.bin', 'bootloader.bin');
    pick('.partitions.bin', 'partitions.bin');
    pick('.merged.bin', 'merged.bin');
    if (!files['app.bin']) throw new Error('编译输出里找不到 .ino.bin');
    const m = { id: `${target}/${dir}`, target, fqbn, version, dir, created: Date.now(), note: note || '', files };
    fs.writeFileSync(path.join(dst, 'manifest.json'), JSON.stringify(m, null, 2));
    return m;
  }
  verify(b) {
    for (const [name, f] of Object.entries(b.files)) {
      const buf = fs.readFileSync(path.join(this.dirOf(b), name));
      if (crypto.createHash('sha256').update(buf).digest('hex') !== f.sha256) return `${name} 校验不对，文件坏了`;
    }
    return null;
  }
}
function safeDir(d) { try { return fs.readdirSync(d).filter(x => !x.startsWith('.')); } catch { return []; } }
module.exports = { BuildRegistry };
