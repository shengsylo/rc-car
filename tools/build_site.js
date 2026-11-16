#!/usr/bin/env node
// 生成公开网站（GitHub Pages）到一个文件夹：任务板登录壳（docs/）+ RC Studio 网页演示版（studio/dist + 项目/零件库数据）
// 用法：node tools/build_site.js <输出文件夹>      —— tools/publish.sh 调它
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const out = process.argv[2];
if (!out) { console.error('用法：node tools/build_site.js <输出文件夹>'); process.exit(1); }

// 只复制白名单里的文件：私有的东西（tracker 内容、.env、固件、builds）绝不会进来
const SHELL = ['index.html', 'task.html', 'site.css', 'site.js', 'app.js', 'config.js'];
fs.mkdirSync(out, { recursive: true });
for (const f of SHELL) {
  const src = path.join(ROOT, 'docs', f);
  if (!fs.existsSync(src)) { if (f === 'config.js') { console.error('缺 docs/config.js：先跑 python3 tools/tracker.py build'); process.exit(1); } continue; }
  fs.copyFileSync(src, path.join(out, f));
}
fs.writeFileSync(path.join(out, '.nojekyll'), '');

// Studio 演示版
const dist = path.join(ROOT, 'studio', 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) { console.error('studio/dist 没有：先 npm run studio:build'); process.exit(1); }
fs.cpSync(dist, path.join(out, 'studio'), { recursive: true });
const data = path.join(out, 'studio', 'data');
fs.mkdirSync(path.join(data, 'projects'), { recursive: true });
const lib = {};
for (const id of fs.readdirSync(path.join(ROOT, 'library'))) {
  const f = path.join(ROOT, 'library', id, 'part.json');
  if (fs.existsSync(f)) lib[id] = { ...JSON.parse(fs.readFileSync(f, 'utf8')), id };
}
fs.writeFileSync(path.join(data, 'library.json'), JSON.stringify(lib));
const projects = [];
for (const id of fs.readdirSync(path.join(ROOT, 'projects'))) {
  const f = path.join(ROOT, 'projects', id, 'project.json');
  if (!/^[a-z0-9-]+$/.test(id) || !fs.existsSync(f)) continue;
  const doc = JSON.parse(fs.readFileSync(f, 'utf8'));
  fs.writeFileSync(path.join(data, 'projects', id + '.json'), JSON.stringify(doc));
  projects.push({ id, name: doc.name || id, parts: doc.parts.length, wires: doc.wires.length, updated: fs.statSync(f).mtimeMs });
}
const targets = JSON.parse(fs.readFileSync(path.join(ROOT, 'targets.json'), 'utf8'));
const version = (fs.readFileSync(path.join(ROOT, 'rc_car.ino'), 'utf8').match(/FW_VERSION\s*=\s*"([^"]+)"/) || [])[1] || '?';
fs.writeFileSync(path.join(data, 'index.json'), JSON.stringify({ version, targets, projects }));
console.log(`site → ${out}：登录壳 + studio/（${Object.keys(lib).length} 个零件，${projects.length} 个项目）`);
