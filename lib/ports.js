// PortManager：列出 USB 串口（arduino-cli board list），串口监视器（npm serialport），同一时间一个串口只给一个人用
'use strict';
const { execFile } = require('child_process');
const EventEmitter = require('events');

let SerialPort = null, ReadlineParser = null;
try { ({ SerialPort } = require('serialport')); ({ ReadlineParser } = require('@serialport/parser-readline')); } catch { /* 没装：只能列端口，不能监视/配网 */ }

class PortManager extends EventEmitter {
  constructor(cli) { super(); this.cli = cli; this.ports = []; this.monitors = new Map(); this.lastScan = 0; }
  hasSerial() { return !!SerialPort; }
  scan() {
    return new Promise(resolve => {
      execFile(this.cli, ['board', 'list', '--format', 'json'], { timeout: 15000 }, (err, out) => {
        if (err) { this.error = err.code === 'ENOENT' ? '找不到 arduino-cli' : String(err.message).split('\n')[0]; return resolve(this.ports); }
        this.error = null;
        let j; try { j = JSON.parse(out); } catch { return resolve(this.ports); }
        const arr = Array.isArray(j) ? j : (j.detected_ports || []);
        this.ports = arr.map(d => {
          const p = d.port || d;
          const props = p.properties || {};
          const board = (d.matching_boards || d.boards || [])[0];
          return { address: p.address, protocol: p.protocol || '', label: p.label || p.address,
            vid: props.vid || '', pid: props.pid || '', serial: props.serialNumber || '',
            board: board ? board.name : '', fqbn: board ? board.fqbn : '', guess: guessChip(props.vid, props.pid) };
        }).filter(p => p.protocol === 'serial' && !/Bluetooth|debug-console|wlan/i.test(p.address));
        this.lastScan = Date.now();
        this.emit('ports', this.ports);
        resolve(this.ports);
      });
    });
  }
  // 打开串口，按行回调；返回 close()
  open(address, onLine, baud = 115200) {
    if (!SerialPort) throw new Error('没装 serialport：在 rc-car 文件夹跑 npm install');
    const sp = new SerialPort({ path: address, baudRate: baud, autoOpen: false });
    const parser = sp.pipe(new ReadlineParser({ delimiter: '\n' }));
    parser.on('data', l => onLine(String(l).replace(/\r$/, '')));
    return new Promise((resolve, reject) => {
      sp.open(err => {
        if (err) return reject(new Error(`打不开 ${address}：${err.message}（Arduino IDE 的串口监视器开着吗？）`));
        resolve({ write: s => new Promise(r => sp.write(s, () => sp.drain(r))), close: () => new Promise(r => sp.isOpen ? sp.close(() => r()) : r()), sp });
      });
    });
  }
  async monitor(address, on) {
    if (this.monitors.has(address)) return;
    const h = await this.open(address, line => this.emit('serial', { port: address, line }));
    h.sp.on('close', () => { this.monitors.delete(address); this.emit('monitor', { port: address, open: false }); });
    this.monitors.set(address, h);
    this.emit('monitor', { port: address, open: true });
  }
  async stopMonitor(address) { const h = this.monitors.get(address); if (h) await h.close(); this.monitors.delete(address); }
  async write(address, text) { const h = this.monitors.get(address); if (!h) throw new Error('先打开串口监视器'); await h.write(text); }
}
function guessChip(vid, pid) {
  vid = String(vid || '').toLowerCase().replace('0x', ''); pid = String(pid || '').toLowerCase().replace('0x', '');
  if (vid === '303a') return 'ESP32-C3/S3（原生 USB）';
  if (vid === '10c4') return 'CP210x（多半是 ESP32 DevKit）';
  if (vid === '1a86') return 'CH340（多半是 ESP32 DevKit）';
  if (vid === '0403') return 'FTDI';
  return '';
}
module.exports = { PortManager };
