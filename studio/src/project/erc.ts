// 电气检查（ERC）+ 网络 + pins.h 生成。导线是唯一真相，网络由 union-find 算出来。
import type { Doc, Lib, PinDef } from './model';

export type NetPin = { part: string; pin: string; def: PinDef; label: string };
export type Net = { id: number; pins: NetPin[]; name: string; kind: 'gnd' | 'power' | 'signal' | 'motor' };
export type Issue = { level: 'err' | 'warn' | 'info'; text: string; parts: string[]; wires?: string[] };

export function nets(doc: Doc, lib: Lib): { nets: Net[]; netOf: Map<string, number> } {
  const parent = new Map<string, string>();
  const find = (k: string): string => { let r = k; while (parent.get(r) !== r) r = parent.get(r)!; let c = k; while (parent.get(c) !== r) { const n = parent.get(c)!; parent.set(c, r); c = n; } return r; };
  const add = (k: string) => { if (!parent.has(k)) parent.set(k, k); };
  for (const w of doc.wires) {
    const a = `${w.a.part}.${w.a.pin}`, b = `${w.b.part}.${w.b.pin}`; add(a); add(b);
    const ra = find(a), rb = find(b); if (ra !== rb) parent.set(ra, rb);
  }
  // 开关当作导通（看「开着」的状态），switch 的 IN/OUT 同一网络
  for (const p of doc.parts) if (p.lib === 'switch') { const a = `${p.id}.IN`, b = `${p.id}.OUT`; if (parent.has(a) && parent.has(b)) { const ra = find(a), rb = find(b); if (ra !== rb) parent.set(ra, rb); } }
  const groups = new Map<string, NetPin[]>();
  for (const k of parent.keys()) {
    const [part, pin] = k.split('.');
    const p = doc.parts.find(x => x.id === part); const def = p && lib[p.lib]?.pins.find(x => x.id === pin);
    if (!p || !def) continue;
    const r = find(k); if (!groups.has(r)) groups.set(r, []);
    groups.get(r)!.push({ part, pin, def, label: `${p.label}.${pin}` });
  }
  const out: Net[] = []; const netOf = new Map<string, number>();
  let i = 0;
  for (const pins of groups.values()) {
    const id = ++i;
    const kind = pins.some(p => p.def.type === 'gnd') ? 'gnd' : pins.some(p => /power|cap_pos/.test(p.def.type)) ? 'power' : pins.some(p => /motor/.test(p.def.type)) ? 'motor' : 'signal';
    const src = pins.find(p => p.def.type === 'power_src') || pins.find(p => p.def.type === 'power_out');
    const mcu = pins.find(p => p.def.gpio != null);
    const name = kind === 'gnd' ? 'GND' : src ? `${src.label}` : mcu ? `GPIO${mcu.def.gpio}` : pins[0].label;
    out.push({ id, pins, name, kind });
    for (const p of pins) netOf.set(`${p.part}.${p.pin}`, id);
  }
  return { nets: out, netOf };
}

export function erc(doc: Doc, lib: Lib): Issue[] {
  const I: Issue[] = [];
  const { nets: N } = nets(doc, lib);
  const partsOf = (n: Net) => [...new Set(n.pins.map(p => p.part))];
  for (const n of N) {
    const srcs = n.pins.filter(p => p.def.type === 'power_src' || p.def.type === 'power_out');
    const hasGnd = n.pins.some(p => p.def.type === 'gnd');
    // 短路：电源和地在同一网络
    if (hasGnd && srcs.length) I.push({ level: 'err', text: `短路！${srcs.map(s => s.label).join('、')} 接到了 GND`, parts: partsOf(n) });
    if (srcs.length > 1) I.push({ level: 'err', text: `两个电源接在一起：${srcs.map(s => s.label).join(' + ')}`, parts: partsOf(n) });
    // 电压范围
    if (srcs.length && !hasGnd) {
      const v = srcs[0].def.v || [0, 0];
      for (const p of n.pins) {
        if (p === srcs[0] || !p.def.v || p.def.type === 'gnd') continue;
        if (v[1] > p.def.v[1] + 0.05) I.push({ level: 'err', text: `${p.label} 最高 ${p.def.v[1]}V，但 ${srcs[0].label} 最高 ${v[1]}V → 会烧`, parts: [p.part, srcs[0].part] });
        else if (p.def.type === 'power_in' && v[0] < p.def.v[0] - 0.05) I.push({ level: 'warn', text: `${p.label} 至少要 ${p.def.v[0]}V，${srcs[0].label} 低电时只有 ${v[0]}V（会断电/重启）`, parts: [p.part, srcs[0].part] });
      }
    }
    // MCU 引脚：输入专用、能力、同一网络两个输出
    const gp = n.pins.filter(p => p.def.gpio != null);
    if (gp.length > 1) I.push({ level: 'err', text: `两个 GPIO 接在一起：${gp.map(p => p.label).join('、')}`, parts: partsOf(n) });
    for (const g of gp) {
      for (const p of n.pins) {
        if (p === g) continue;
        if (/power|gnd|motor/.test(p.def.type)) I.push({ level: 'err', text: `${g.label} 直接接到 ${p.label}（${p.def.type === 'gnd' ? '地' : /motor/.test(p.def.type) ? '电机' : '电源'}）→ GPIO 会烧`, parts: [g.part, p.part] });
        for (const need of p.def.need || []) if (!(g.def.caps || []).includes(need)) I.push({ level: 'err', text: `${p.label} 需要 ${need.toUpperCase()}，${g.label} 没有这个功能`, parts: [g.part, p.part] });
        if ((g.def.caps || []).length === 2 && g.def.caps!.includes('in') && /logic_in|logic_io/.test(p.def.type)) I.push({ level: 'err', text: `${g.label} 只能输入，不能驱动 ${p.label}`, parts: [g.part, p.part] });
        if (p.def.v && p.def.type === 'logic_out' && p.def.v[1] > 3.6) I.push({ level: 'err', text: `${p.label} 输出 ${p.def.v[1]}V，ESP32 只能 3.3V`, parts: [g.part, p.part] });
      }
      if (g.def.strap && n.pins.length > 1) I.push({ level: 'warn', text: `${g.label}：${g.def.strap}`, parts: [g.part] });
      if (g.def.note?.includes('别用')) I.push({ level: 'warn', text: `${g.label}：${g.def.note}`, parts: [g.part] });
    }
    if (n.kind === 'motor' && n.pins.filter(p => p.def.type === 'motor_out').length > 1) {
      const chs = new Set(n.pins.filter(p => p.def.type === 'motor_out').map(p => p.part + p.def.ch + p.pin));
      if (chs.size > 1) I.push({ level: 'err', text: `驱动的两个输出接在一起：${n.pins.filter(p => p.def.type === 'motor_out').map(p => p.label).join('、')}`, parts: partsOf(n) });
    }
  }
  // 没接的必须脚
  const { netOf } = nets(doc, lib);
  for (const p of doc.parts) {
    const l = lib[p.lib]; if (!l) { I.push({ level: 'err', text: `零件库里没有 ${p.lib}`, parts: [p.id] }); continue; }
    if (!l.pins.length) continue;
    const used = l.pins.filter(x => netOf.has(`${p.id}.${x.id}`));
    if (!used.length) { if (!['wheel'].includes(l.kind)) I.push({ level: 'info', text: `${p.label} 还没接线`, parts: [p.id] }); continue; }
    const pw = l.pins.filter(x => x.type === 'power_in');
    if (pw.length && !pw.some(x => netOf.has(`${p.id}.${x.id}`)) && l.kind !== 'motor') I.push({ level: 'warn', text: `${p.label} 没接电源`, parts: [p.id] });
    const gnd = l.pins.filter(x => x.type === 'gnd');
    if (gnd.length && l.kind !== 'motor' && !gnd.some(x => netOf.has(`${p.id}.${x.id}`))) I.push({ level: 'warn', text: `${p.label} 没接 GND`, parts: [p.id] });
  }
  // 电流预算：每个电源脚带的东西
  for (const n of N) {
    const src = n.pins.find(p => p.def.type === 'power_out' && p.def.maxmA);
    if (!src) continue;
    const ma = [...new Set(n.pins.filter(p => p.def.type === 'power_in').map(p => p.part))].reduce((s, id) => s + (lib[doc.parts.find(x => x.id === id)!.lib].drawmA || 0), 0);
    if (ma > src.def.maxmA!) I.push({ level: 'err', text: `${src.label} 最多 ${src.def.maxmA}mA，接的东西约 ${ma}mA`, parts: [src.part] });
  }
  // 3D：零件互相穿模 / 超出车壳 / 碰到轮子区域
  // （在 collisions() 里算，结果合并）
  const order = { err: 0, warn: 1, info: 2 };
  const seen = new Set<string>();
  return I.filter(i => !seen.has(i.text) && seen.add(i.text)).sort((a, b) => order[a.level] - order[b.level]);
}

// pins.h：零件上标了 fw 角色的脚（例如 DRV8833.IN1 → IN1）找到同网络的 MCU GPIO
export function pinsH(doc: Doc, lib: Lib, target: { target: string; mcu: string }): { text: string; missing: string[] } {
  const { nets: N } = nets(doc, lib);
  const roles = new Map<string, number>(); const missing: string[] = [];
  let driver: number | undefined;
  for (const p of doc.parts) {
    const l = lib[p.lib]; if (!l) continue;
    if (l.driver) driver = l.driver;
    for (const pin of l.pins) {
      if (!pin.fw) continue;
      const n = N.find(n => n.pins.some(q => q.part === p.id && q.pin === pin.id));
      const g = n?.pins.find(q => q.part === target.mcu && q.def.gpio != null);
      if (g) roles.set(pin.fw, g.def.gpio!); else missing.push(`${p.label}.${pin.id}（${pin.fw}）`);
    }
  }
  const L = ['// 由 RC Studio 从接线图生成，别手改（改接线图再生成）', `// 项目：${doc.name}  目标：${target.target}`, '#pragma once'];
  if (driver) L.push(`#define RC_DRIVER ${driver}`);
  const order = ['ENA', 'IN1', 'IN2', 'ENB', 'IN3', 'IN4', 'SERVO', 'SDA', 'SCL', 'BUZ', 'BATT'];
  for (const r of [...roles.keys()].sort((a, b) => order.indexOf(a) - order.indexOf(b))) L.push(`#define RC_PIN_${r} ${roles.get(r)}`);
  // 固件要求成对定义：缺一个就别覆盖默认
  const pairs = [['IN1', 'IN2'], ['SDA', 'SCL'], ['ENB', 'IN3', 'IN4']];
  for (const g of pairs) { const have = g.filter(r => roles.has(r)); if (have.length && have.length < g.length) missing.push(`${g.join('/')} 要一起接`); }
  return { text: L.join('\n') + '\n', missing };
}

export function bom(doc: Doc, lib: Lib) {
  const m = new Map<string, number>();
  for (const p of doc.parts) m.set(p.lib, (m.get(p.lib) || 0) + 1);
  return [...m.entries()].map(([id, n]) => ({ id, n, name: lib[id]?.name || id, price: lib[id]?.price || '', verified: lib[id]?.verified }));
}
