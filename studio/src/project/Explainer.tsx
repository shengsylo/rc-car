// 动画示意图：「你开，车动。」——真实零件俯视图（用 3D 模型渲染）+ 彩色导线 + 电流流动 + 实时面板。
// 数据全部来自项目（零件、导线、脚位角色），换项目就自动换图。
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useP } from './pstore';
import { buildModel } from './models';
import { nets } from './erc';
import { sample } from './anim';
import type { Doc, Lib, LibPart, Part, Wire, PinDef } from './model';

const K = 9;              // 示意图比例：像素/毫米
const W = 1500, H = 1000; // 画布
type Placed = { part: Part; lib: LibPart; x: number; y: number; rot: 0 | 90; w: number; h: number; img: string | null };

// ---------- 用 3D 模型渲染俯视图 ----------
let renderer: THREE.WebGLRenderer | null = null;
const imgCache = new Map<string, string>();
function topView(l: LibPart): string | null {
  if (imgCache.has(l.id)) return imgCache.get(l.id)!;
  const model = buildModel(l); if (!model) return null;
  const px = 14;   // 渲染精度（像素/毫米）
  const [w, d, h] = l.size;
  const cw = Math.min(2048, Math.ceil(w * px)), ch = Math.min(2048, Math.ceil(d * px));
  try {
    if (!renderer) { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); renderer.toneMapping = THREE.ACESFilmicToneMapping; }
    renderer.setSize(cw, ch, false); renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4); sun.position.set(-30, 40, 100); scene.add(sun);
    scene.add(model);
    const cam = new THREE.OrthographicCamera(-w / 2, w / 2, d / 2, -d / 2, 0.1, 500);
    cam.position.set(0, 0, 200); cam.up.set(0, 1, 0); cam.lookAt(0, 0, 0);
    renderer.render(scene, cam);
    const url = renderer.domElement.toDataURL('image/png');
    imgCache.set(l.id, url);
    model.traverse(o => { const m = o as THREE.Mesh; if (m.geometry) m.geometry.dispose(); });
    return url;
  } catch { return null; }
}

// ---------- 版面：按零件种类放位置（不是真实位置，是讲解用的排版） ----------
const SLOT: Record<string, [number, number]> = {
  mcu: [690, 520], driver: [1050, 520], motor: [1330, 520], servo: [1050, 230], battery: [330, 880],
  video: [330, 240], sensor: [690, 230], passive: [400, 560], io: [690, 880], switch: [700, 880], cap: [1050, 870],
};
function layout(doc: Doc, lib: Lib): Placed[] {
  const out: Placed[] = []; const used = new Map<string, number>();
  for (const p of doc.parts) {
    const l = lib[p.lib]; if (!l || l.kind === 'wheel') continue;
    let key = l.kind;
    if (p.lib === 'switch') key = 'switch'; else if (p.lib.startsWith('cap')) key = 'cap';
    const base = SLOT[key] || [W / 2, 80];
    const n = used.get(key) || 0; used.set(key, n + 1);
    const rot: 0 | 90 = (l.kind === 'battery' || l.kind === 'motor' || p.lib === 'switch') ? 90 : 0;
    const w = (rot ? l.size[1] : l.size[0]) * K, h = (rot ? l.size[0] : l.size[1]) * K;
    out.push({ part: p, lib: l, x: base[0] + n * (w + 60) * (key === 'motor' ? 0 : 1), y: base[1] + (key === 'motor' ? n * (h + 60) : 0), rot, w, h, img: topView(l) });
  }
  // 大零件会盖住别人：互相推开（控制板不动，别的离控制板远一点）
  const mcu = out.find(p => p.lib.kind === 'mcu');
  const cx = mcu ? mcu.x : W / 2, cy = mcu ? mcu.y : H / 2;
  for (let it = 0; it < 80; it++) {
    let moved = false;
    for (let i = 0; i < out.length; i++) for (let j = i + 1; j < out.length; j++) {
      const A = out[i], B = out[j]; const m = 70;   // 留位置给标签和线
      const ox = (A.w + B.w) / 2 + m - Math.abs(A.x - B.x), oy = (A.h + B.h) / 2 + m - Math.abs(A.y - B.y);
      if (ox <= 0 || oy <= 0) continue;
      const mover = A === mcu ? B : B === mcu ? A : (Math.hypot(A.x - cx, A.y - cy) > Math.hypot(B.x - cx, B.y - cy) ? A : B);
      const other = mover === A ? B : A;
      if (ox < oy) mover.x += Math.sign(mover.x - other.x || 1) * Math.min(ox, 30); else mover.y += Math.sign(mover.y - other.y || 1) * Math.min(oy, 30);
      moved = true;
    }
    if (!moved) break;
  }
  return out;
}
// 针脚在画布上的位置（rot=90：零件逆时针转 90°）
function pinXY(pl: Placed, pin: PinDef): [number, number] {
  const [px, py] = pl.rot ? [-pin.y, pin.x] : [pin.x, pin.y];
  return [pl.x + px * K, pl.y - py * K];
}
// 针脚朝哪边出线：离哪条边近就往哪边
function pinDir(pl: Placed, pin: PinDef): [number, number] {
  const [x, y] = pinXY(pl, pin); const dx = (x - pl.x) / (pl.w / 2), dy = (y - pl.y) / (pl.h / 2);
  return Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx) || 1, 0] : [0, Math.sign(dy) || 1];
}

// ---------- 信号：这条线现在在干什么 ----------
type Live = { thr: number; steer: number; batt: number; amps: number; speed: number; t: number };
type Role = 'power' | 'gnd' | 'motor' | 'in1' | 'in2' | 'servo' | 'adc' | 'i2c' | 'signal';
function roleOf(defs: (PinDef | undefined)[]): Role {
  const ts = defs.filter(Boolean) as PinDef[];
  if (ts.some(d => d.type === 'gnd')) return 'gnd';
  if (ts.some(d => /power|cap_pos/.test(d.type))) return 'power';
  if (ts.some(d => /motor/.test(d.type))) return 'motor';
  const fw = ts.map(d => d.fw).find(Boolean);
  if (fw === 'IN1' || fw === 'ENA') return 'in1';
  if (fw === 'IN2') return 'in2';
  if (fw === 'SERVO') return 'servo';
  if (fw === 'BATT' || ts.some(d => d.type === 'analog_out')) return 'adc';
  if (fw === 'SDA' || fw === 'SCL') return 'i2c';
  return 'signal';
}
const ROLE_TXT: Record<Role, string> = { power: '电源（电池 +）', gnd: '地线（全部接在一起）', motor: '电机电流', in1: '油门信号 前进（PWM）', in2: '油门信号 后退（PWM）', servo: '转向信号（舵机脉冲）', adc: '电池电压检测', i2c: '陀螺仪 I²C', signal: '信号' };
function activity(r: Role, L: Live, flip: boolean): number {   // 每秒流动的像素，负数 = 反方向
  switch (r) {
    case 'power': return 30 + L.amps * 90;
    case 'gnd': return -(30 + L.amps * 90);
    case 'motor': return (flip ? -1 : 1) * L.thr * 220;
    case 'in1': return Math.max(0, L.thr) * 200;
    case 'in2': return Math.max(0, -L.thr) * 200;
    case 'servo': return 50 + Math.abs(L.steer) * 160;
    case 'adc': return 12;
    case 'i2c': return 90;
    default: return 40;
  }
}

export function Explainer() {
  const { doc, lib, t, playing, set } = useP();
  const [keys, setKeys] = useState<{ thr: number; steer: number } | null>(null);
  const [tick, setTick] = useState(0);
  const live = useRef<Live>({ thr: 0, steer: 0, batt: 4.2, amps: 0, speed: 0, t: 0 });
  const dashRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const offs = useRef<Map<string, number>>(new Map());
  const placed = useMemo(() => doc ? layout(doc, lib) : [], [doc?.parts, lib]);
  const N = useMemo(() => doc ? nets(doc, lib) : null, [doc, lib]);

  // 键盘开车（W/S 或 ↑/↓ 油门，A/D 或 ←/→ 转向）
  useEffect(() => {
    const down = new Set<string>();
    const upd = () => { const f = down.has('w') || down.has('arrowup'), b = down.has('s') || down.has('arrowdown'), l = down.has('a') || down.has('arrowleft'), r = down.has('d') || down.has('arrowright');
      setKeys(f || b || l || r ? { thr: f ? 1 : b ? -0.6 : 0, steer: l ? -1 : r ? 1 : 0 } : null); };
    const kd = (e: KeyboardEvent) => { if ((e.target as HTMLElement).closest('input,textarea,select')) return; const k = e.key.toLowerCase(); if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) { e.preventDefault(); down.add(k); upd(); } };
    const ku = (e: KeyboardEvent) => { down.delete(e.key.toLowerCase()); upd(); };
    addEventListener('keydown', kd); addEventListener('keyup', ku);
    return () => { removeEventListener('keydown', kd); removeEventListener('keyup', ku); };
  }, []);
  useEffect(() => { if (!playing && !keys) set({ playing: true }); }, []);

  // 每帧：算实时数值 + 推动导线上的电流
  useEffect(() => {
    let raf = 0, last = performance.now(), frame = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const s = useP.getState(); const L = live.current;
      const tgt = keys || (s.doc ? { thr: sample(s.doc.anim.channels.throttle, s.t), steer: sample(s.doc.anim.channels.steer, s.t) } : { thr: 0, steer: 0 });
      L.thr += (tgt.thr - L.thr) * Math.min(1, dt * 8); L.steer += (tgt.steer - L.steer) * Math.min(1, dt * 10);
      L.amps = 0.12 + 0.28 + Math.abs(L.thr) * 0.55 + Math.abs(tgt.steer - L.steer) * 1.5 + Math.abs(L.steer) * 0.05;
      L.speed += (Math.abs(L.thr) * 1.4 - L.speed) * Math.min(1, dt * 2.5);
      L.batt = Math.max(3.3, 4.2 - L.amps * 0.12 - 0.00002 * (now / 1000));
      L.t = now / 1000;
      for (const [id, el] of dashRefs.current) {
        const v = activity(el.dataset.role as Role, L, el.dataset.flip === '1');
        const o = (offs.current.get(id) || 0) - v * dt; offs.current.set(id, o);
        el.style.strokeDashoffset = String(o);
        el.style.opacity = String(Math.min(1, 0.25 + Math.abs(v) / 160));
      }
      if (++frame % 6 === 0) setTick(x => x + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [keys]);

  if (!doc) return null;
  const L = live.current;
  const byId = new Map(placed.map(p => [p.part.id, p]));
  // 导线路由：针 → 往外伸 → 走中线 → 进针；同一区域的线错开
  let lane = 0;
  const routes = doc.wires.map(w => {
    const A = byId.get(w.a.part), B = byId.get(w.b.part); if (!A || !B) return null;
    const pa = A.lib.pins.find(p => p.id === w.a.pin), pb = B.lib.pins.find(p => p.id === w.b.pin); if (!pa || !pb) return null;
    const a = pinXY(A, pa), b = pinXY(B, pb), da = pinDir(A, pa), db = pinDir(B, pb);
    const st = 14 + (lane++ % 6) * 5;
    const a1: [number, number] = [a[0] + da[0] * st, a[1] + da[1] * st], b1: [number, number] = [b[0] + db[0] * st, b[1] + db[1] * st];
    let pts: [number, number][];
    if (da[0] !== 0) { const mx = (a1[0] + b1[0]) / 2 + ((lane % 5) - 2) * 6; pts = [a, a1, [mx, a1[1]], [mx, b1[1]], b1, b]; }
    else { const my = (a1[1] + b1[1]) / 2 + ((lane % 5) - 2) * 6; pts = [a, a1, [a1[0], my], [b1[0], my], b1, b]; }
    const role = roleOf([pa, pb]);
    // 电机线：OUT1 → M+ 是正方向
    const flip = role === 'motor' && /2|4|-/.test(w.a.pin + (pa.type === 'motor_in' ? 'x' : ''));
    return { w, d: roundPath(pts), role, flip, label: `${A.part.label}.${w.a.pin} → ${B.part.label}.${w.b.pin}` };
  }).filter(Boolean) as { w: Wire; d: string; role: Role; flip: boolean; label: string }[];
  // 图例：按颜色+作用分组
  const legend = new Map<string, { color: string; role: Role; pins: string[] }>();
  for (const r of routes) {
    const k = r.w.color + r.role; const e = legend.get(k) || { color: r.w.color, role: r.role, pins: [] };
    const mcu = [r.w.a, r.w.b].find(e => byId.get(e.part)?.lib.kind === 'mcu');
    const other = [r.w.a, r.w.b].find(e => e !== mcu);
    if (mcu && other) e.pins.push(`${mcu.pin.replace('GPIO', 'G')}→${byId.get(other.part)?.part.label}.${other.pin}`);
    legend.set(k, e);
  }
  const state = Math.abs(L.thr) < 0.05 ? (Math.abs(L.steer) > 0.2 ? '原地打方向' : '待机') : L.thr > 0 ? (Math.abs(L.steer) > 0.25 ? (L.steer < 0 ? '左转加速' : '右转加速') : '前进') : '倒车';
  const stCls = Math.abs(L.thr) < 0.05 ? 'idle' : L.thr > 0 ? 'go' : 'rev';
  const motor = placed.find(p => p.lib.kind === 'motor'), servo = placed.find(p => p.lib.kind === 'servo');
  // 画面范围：包住全部零件 + 上面留标题
  const bx0 = Math.min(...placed.map(p => p.x - p.w / 2)) - 90, bx1 = Math.max(...placed.map(p => p.x + p.w / 2)) + 110;
  const by0 = Math.min(...placed.map(p => p.y - p.h / 2)) - 160, by1 = Math.max(...placed.map(p => p.y + p.h / 2)) + 70;
  const vb = placed.length ? [bx0, by0, bx1 - bx0, by1 - by0] : [0, 0, W, H];
  const tx = vb[0] + vb[2] / 2;
  const servoUs = Math.round(1500 + L.steer * 400);
  void tick;
  return (
    <div className="explainer">
      <svg viewBox={vb.join(' ')} className="ex-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.55" /></filter>
          <pattern id="exgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff08" /></pattern>
        </defs>
        <rect x={vb[0]} y={vb[1]} width={vb[2]} height={vb[3]} fill="url(#exgrid)" />
        <text x={tx} y={vb[1] + 58} className="ex-title" textAnchor="middle">你开，车动。</text>
        <text x={tx} y={vb[1] + 90} className="ex-sub" textAnchor="middle">{doc.name} · 手机 → WiFi → 控制板 → 驱动 → 电机 / 舵机</text>
        {/* 导线（底下一层粗的颜色 + 上面一层流动的亮点） */}
        {routes.map(r => <path key={r.w.id + 'b'} d={r.d} className="ex-wire" stroke={r.w.color === '#222222' ? '#3a3a40' : r.w.color} />)}
        {routes.map(r => <path key={r.w.id + 'f'} d={r.d} className="ex-flow" stroke={r.role === 'gnd' ? '#9aa' : '#fff'} filter="url(#glow)"
          data-role={r.role} data-flip={r.flip ? '1' : '0'} ref={el => { if (el) dashRefs.current.set(r.w.id, el); else dashRefs.current.delete(r.w.id); }}><title>{r.label} · {ROLE_TXT[r.role]}</title></path>)}
        {/* 零件 */}
        {placed.map(p => (
          <g key={p.part.id} transform={`translate(${p.x},${p.y}) rotate(${p.rot ? -90 : 0})`} filter="url(#shadow)">
            {p.img ? <image href={p.img} x={-p.lib.size[0] * K / 2} y={-p.lib.size[1] * K / 2} width={p.lib.size[0] * K} height={p.lib.size[1] * K} preserveAspectRatio="none" />
              : <rect x={-p.lib.size[0] * K / 2} y={-p.lib.size[1] * K / 2} width={p.lib.size[0] * K} height={p.lib.size[1] * K} rx={6} fill={p.lib.color} />}
          </g>))}
        {/* 针脚标签（接了线的脚才显示，蓝色小牌子） */}
        {placed.map(p => p.lib.pins.filter(pin => N?.netOf.has(`${p.part.id}.${pin.id}`)).map(pin => {
          const [x, y] = pinXY(p, pin); const [dx, dy] = pinDir(p, pin);
          const lx = x - dx * 16, ly = y - dy * 12; const txt = pin.id.replace('GPIO', 'G');
          return <g key={p.part.id + pin.id} className="ex-pin">
            <circle cx={x} cy={y} r={3.2} />
            {p.lib.kind !== 'motor' && <><rect x={lx - txt.length * 3.4 - 4} y={ly - 7} width={txt.length * 6.8 + 8} height={14} rx={4} /><text x={lx} y={ly + 4} textAnchor="middle">{txt}</text></>}
          </g>;
        }))}
        {/* 零件名牌 + 说明 */}
        {placed.map(p => {
          const tip = p.lib.kind === 'motor' && p.part.label.includes('转向') ? '前轮转向' : TIP[p.lib.kind] || ''; const yy = p.y - p.h / 2 - 16;
          return <g key={p.part.id + 'l'} className="ex-tag">
            <rect x={p.x - p.part.label.length * 7 - 12} y={yy - 14} width={p.part.label.length * 14 + 24} height={24} rx={12} className={'k-' + p.lib.kind} />
            <text x={p.x} y={yy + 3} textAnchor="middle">{p.part.label}</text>
            {tip && <text x={p.x} y={p.y + p.h / 2 + 22} textAnchor="middle" className="ex-tip">{tip}</text>}
          </g>;
        })}
        {/* 动起来的部分：电机轴、舵机臂、轮子方向 */}
        {motor && (() => { const ang = (L.t * L.thr * 720) % 360; const sx = motor.x + motor.w / 2 + 14, sy = motor.y;
          return <g className="ex-motor" transform={`translate(${sx},${sy})`}>
            <circle r={16} className="ex-hub" /><g transform={`rotate(${ang})`}><rect x={-15} y={-2.5} width={30} height={5} rx={2} /><rect x={-2.5} y={-15} width={5} height={30} rx={2} /></g>
            <text y={32} textAnchor="middle" className="ex-tip">{Math.round(Math.abs(L.thr) * 925)} rpm</text></g>; })()}
        {servo && (() => { const sx = servo.x, sy = servo.y - servo.h / 2 + 12; const ang = L.steer * 45;
          return <g transform={`translate(${sx + servo.w / 2 + 34},${sy})`} className="ex-servo">
            <circle r={6} /><g transform={`rotate(${ang})`}><rect x={-3} y={-34} width={6} height={36} rx={3} /></g>
            <text y={24} textAnchor="middle" className="ex-tip">{servoUs} µs</text></g>; })()}
      </svg>
      <aside className="ex-side">
        <div className="ex-card">
          <h4>接线</h4>
          {[...legend.values()].map((e, i) => <div key={i} className="ex-leg"><i style={{ background: e.color === '#222222' ? '#111' : e.color }} /><span>{ROLE_TXT[e.role]}</span><b className="mono">{e.pins.slice(0, 2).join(' ') || ''}</b></div>)}
        </div>
        <div className="ex-card live">
          <h4>LIVE <span className="dim small">{keys ? '键盘控制中' : playing ? '播放时间轴' : '暂停'}</span></h4>
          <div className="ex-row"><span>油门</span><b className="mono">{Math.round(L.thr * 100)}%</b></div>
          <div className="ex-bar"><i style={{ width: Math.abs(L.thr) * 100 + '%', background: L.thr >= 0 ? '#30d158' : '#ff9f0a' }} /></div>
          <div className="ex-row"><span>转向</span><b className="mono">{L.steer < -0.05 ? '左 ' : L.steer > 0.05 ? '右 ' : ''}{Math.round(Math.abs(L.steer) * 25)}°</b></div>
          <div className="ex-row"><span>电流</span><b className="mono">{L.amps.toFixed(2)} A</b></div>
          <div className="ex-row"><span>电池</span><b className="mono">{L.batt.toFixed(2)} V</b></div>
          <div className="ex-row"><span>速度</span><b className="mono">{L.speed.toFixed(2)} m/s</b></div>
          <svg viewBox="-60 -80 120 170" className="ex-car">
            <rect x={-26} y={-52} width={52} height={104} rx={18} className="body" />
            {[-1, 1].map(s => <rect key={'f' + s} x={s * 34 - 5} y={-46} width={10} height={20} rx={3} transform={`rotate(${L.steer * 25} ${s * 34} -36)`} />)}
            {[-1, 1].map(s => <rect key={'r' + s} x={s * 34 - 5} y={26} width={10} height={20} rx={3} />)}
            <path d="M0 -70 l-8 12 h16z" className="ex-arrow" style={{ opacity: L.thr > 0.05 ? 1 : 0.15 }} />
            <path d="M0 78 l-8 -12 h16z" className="ex-arrow rev" style={{ opacity: L.thr < -0.05 ? 1 : 0.15 }} />
          </svg>
          <div className={'ex-state ' + stCls}>{state}</div>
          <div className="ex-ctl">
            <button className={playing && !keys ? 'on' : ''} onClick={() => set({ playing: !playing })}>{playing ? '暂停时间轴' : '▶ 播放时间轴'}</button>
            <button onClick={e => { const el = (e.currentTarget as HTMLElement).closest('.explainer') as HTMLElement; document.fullscreenElement ? document.exitFullscreen() : el?.requestFullscreen?.(); }}>⛶ 全屏</button>
            <span className="dim small">或按 W A S D / 方向键自己开</span>
          </div>
        </div>
        <div className="ex-card warn">
          <b>低电压：1S 锂电 3.7V</b>
          <div className="small">碰不到危险电压。但锂电池别短路、别刺破，充电要有人看着。</div>
        </div>
      </aside>
    </div>
  );
}
const TIP: Record<string, string> = {
  mcu: '收手机指令，算出油门和方向', driver: '把小信号放大成电机电流', motor: '后轮驱动', servo: '前轮转向',
  battery: '全部的电都从这里来', video: '把画面传回给开车的人', passive: '让控制板量电池电压', sensor: '感觉车身倾斜和转弯', io: '',
};
function roundPath(pts: [number, number][]) {
  const r = 7; let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1);
    const k1 = Math.min(r, l1 / 2) / (l1 || 1), k2 = Math.min(r, l2 / 2) / (l2 || 1);
    d += ` L${x1 - (x1 - x0) * k1},${y1 - (y1 - y0) * k1} Q${x1},${y1} ${x1 + (x2 - x1) * k2},${y1 + (y2 - y1) * k2}`;
  }
  const e = pts[pts.length - 1]; return d + ` L${e[0]},${e[1]}`;
}
export type { Doc };
