// 本机秘密：~/.rcstudio/secrets.json（不进 git、不进项目文件、不进固件）
// 兼容旧的 .wifi（第 1 行 WiFi 名称，第 2 行密码）
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const DIR = process.env.RCSTUDIO_HOME || path.join(os.homedir(), '.rcstudio');
const FILE = path.join(DIR, 'secrets.json');

function load() {
  let s = {};
  try { s = JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { /* 第一次 */ }
  let dirty = false;
  if (!s.adminToken) { s.adminToken = crypto.randomBytes(12).toString('base64url'); dirty = true; }
  if (!s.otaPassword) { s.otaPassword = crypto.randomBytes(9).toString('base64url'); dirty = true; }
  if (!s.wifi) {
    const legacy = path.join(__dirname, '..', '.wifi');
    try {
      const [ssid, pass] = fs.readFileSync(legacy, 'utf8').split('\n');
      if (ssid) { s.wifi = { home: { ssid: ssid.trim(), pass: (pass || '').replace(/\r$/, '') } }; dirty = true; }
    } catch { /* 没有旧文件 */ }
  }
  if (dirty) save(s);
  return s;
}
function save(s) {
  fs.mkdirSync(DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(FILE, JSON.stringify(s, null, 2), { mode: 0o600 });
}
// 日志/界面只显示头尾
function mask(p) { p = String(p || ''); return p.length <= 2 ? '**' : p[0] + '*'.repeat(p.length - 2) + p[p.length - 1]; }

module.exports = { load, save, mask, FILE };
