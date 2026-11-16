// 项目文件：projects/<id>/project.json（零件 3D 位置是唯一真相，2D 布局是投影；导线是真相，网络由导线算出）
// 零件库：library/<part>/part.json (+ top.svg, model.glb)
'use strict';
const fs = require('fs');
const path = require('path');

const ID = /^[a-z0-9][a-z0-9-]{0,40}$/;
function list(root) {
  const dir = path.join(root, 'projects');
  let ids = []; try { ids = fs.readdirSync(dir).filter(x => ID.test(x)); } catch { }
  return ids.map(id => {
    try { const p = JSON.parse(fs.readFileSync(path.join(dir, id, 'project.json'), 'utf8')); return { id, name: p.name || id, parts: (p.parts || []).length, wires: (p.wires || []).length, updated: fs.statSync(path.join(dir, id, 'project.json')).mtimeMs }; }
    catch { return null; }
  }).filter(Boolean);
}
function get(root, id) {
  if (!ID.test(String(id))) throw new Error('项目名只能用小写字母、数字、-');
  return JSON.parse(fs.readFileSync(path.join(root, 'projects', id, 'project.json'), 'utf8'));
}
function save(root, id, doc) {
  if (!ID.test(String(id))) throw new Error('项目名只能用小写字母、数字、-');
  if (!doc || typeof doc !== 'object' || !Array.isArray(doc.parts)) throw new Error('项目格式不对');
  const dir = path.join(root, 'projects', id);
  fs.mkdirSync(path.join(dir, '.history'), { recursive: true });
  const f = path.join(dir, 'project.json');
  // 每次保存留一个历史版本（最多 30 个），随时能退回
  if (fs.existsSync(f)) {
    fs.copyFileSync(f, path.join(dir, '.history', `${Date.now()}.json`));
    const h = fs.readdirSync(path.join(dir, '.history')).sort();
    for (const x of h.slice(0, Math.max(0, h.length - 30))) fs.rmSync(path.join(dir, '.history', x));
  }
  doc.schema = doc.schema || 1;
  const tmp = f + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(doc, null, 2) + '\n');
  fs.renameSync(tmp, f);
  return { ok: true, saved: Date.now() };
}
function library(root) {
  const dir = path.join(root, 'library');
  let ids = []; try { ids = fs.readdirSync(dir).filter(x => ID.test(x)); } catch { }
  const out = {};
  for (const id of ids) {
    try {
      const p = JSON.parse(fs.readFileSync(path.join(dir, id, 'part.json'), 'utf8'));
      p.id = id;
      p.hasSvg = fs.existsSync(path.join(dir, id, 'top.svg'));
      p.hasGlb = fs.existsSync(path.join(dir, id, 'model.glb'));
      out[id] = p;
    } catch { }
  }
  return out;
}
module.exports = { list, get, save, library };
