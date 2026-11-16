// 2D 接线图（俯视，真实毫米）。拖零件 = 改 3D 位置；点针拉线；双击导线加拐点；剪刀工具剪线。
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useP, edit, clickPin, addPart } from './pstore';
import { pinWorld } from './geom';
import { nets } from './erc';
import type { Doc, Lib } from './model';

type View = { s: number; ox: number; oy: number };
export function Wiring() {
  const { doc, lib, sel, tool, pending, highlight, set } = useP();
  const svg = useRef<SVGSVGElement>(null);
  const [view, setView] = useState<View>({ s: 4, ox: 300, oy: 340 });
  const [mouse, setMouse] = useState<[number, number] | null>(null);
  const [hoverNet, setHoverNet] = useState<number | null>(null);
  const drag = useRef<null | { kind: 'pan' | 'part' | 'pt'; id?: string; idx?: number; sx: number; sy: number; v0: View; p0?: [number, number] }>(null);
  const N = useMemo(() => doc ? nets(doc, lib) : null, [doc, lib]);
  useEffect(() => { // 第一次：缩放到车壳
    const el = svg.current; if (!el || !doc) return;
    const r = el.getBoundingClientRect(); const e = doc.enclosure.size;
    const s = Math.min(r.width / (e[0] + 40), r.height / (e[1] + 40));
    setView({ s, ox: r.width / 2, oy: r.height / 2 });
  }, [doc?.name]);
  if (!doc) return null;
  const toWorld = (cx: number, cy: number): [number, number] => { const r = svg.current!.getBoundingClientRect(); return [(cx - r.left - view.ox) / view.s, -(cy - r.top - view.oy) / view.s]; };
  const X = (x: number) => x * view.s + view.ox, Y = (y: number) => -y * view.s + view.oy;
  const snap = (v: number, e: React.PointerEvent | PointerEvent) => e.altKey ? Math.round(v * 10) / 10 : Math.round(v * 2) / 2;

  const onDown = (e: React.PointerEvent, kind: 'pan' | 'part' | 'pt', id?: string, idx?: number) => {
    if (e.button === 2) return;
    e.stopPropagation(); (e.target as Element).setPointerCapture?.(e.pointerId);
    const p = kind === 'part' ? doc.parts.find(x => x.id === id)!.pose.p : null;
    drag.current = { kind, id, idx, sx: e.clientX, sy: e.clientY, v0: view, p0: p ? [p[0], p[1]] : undefined };
    if (kind === 'part' && tool !== 'wire') set({ sel: { kind: 'part', id: id! } });
    if (kind === 'pan' && tool === 'select') set({ sel: null });
    if (kind === 'pan' && tool === 'wire' && pending) set({ pending: null });
  };
  const onMove = (e: React.PointerEvent) => {
    setMouse(toWorld(e.clientX, e.clientY));
    const d = drag.current; if (!d) return;
    const dx = (e.clientX - d.sx), dy = (e.clientY - d.sy);
    if (d.kind === 'pan') setView({ ...d.v0, ox: d.v0.ox + dx, oy: d.v0.oy + dy });
    else if (d.kind === 'part' && d.p0) {
      if ((d as any).wire) { if (Math.hypot(dx, dy) < 4) return; set({ sel: { kind: 'part', id: d.id! } }); (d as any).wire = null; }
      edit(D => { const p = D.parts.find(x => x.id === d.id)!; p.pose.p[0] = snap(d.p0![0] + dx / view.s, e); p.pose.p[1] = snap(d.p0![1] - dy / view.s, e); }, { merge: 'mv' + d.id });
    }
    else if (d.kind === 'pt') { const w = toWorld(e.clientX, e.clientY); edit(D => { const W = D.wires.find(x => x.id === d.id)!; W.pts[d.idx!] = [snap(w[0], e), snap(w[1], e)]; }, { merge: 'pt' + d.id + d.idx }); }
  };
  const onUp = () => { const d = drag.current as any; if (d && d.wire) set({ sel: { kind: 'wire', id: d.wire } }); drag.current = null; };
  const onWheel = (e: React.WheelEvent) => {
    const r = svg.current!.getBoundingClientRect(); const mx = e.clientX - r.left, my = e.clientY - r.top;
    const k = Math.exp(-e.deltaY * 0.0015); const s = Math.max(0.5, Math.min(60, view.s * k)); const f = s / view.s;
    setView({ s, ox: mx - (mx - view.ox) * f, oy: my - (my - view.oy) * f });
  };
  const e = doc.enclosure;
  const showPinLabels = view.s > 9;
  const parts = [...doc.parts].sort((a, b) => a.pose.p[2] - b.pose.p[2]);
  const netPins = hoverNet != null ? new Set(N!.nets.find(n => n.id === hoverNet)?.pins.map(p => `${p.part}.${p.pin}`)) : null;
  return (
    <div className="wiring" onDragOver={ev => ev.preventDefault()} onDrop={ev => { const id = ev.dataTransfer.getData('text/rc-part'); if (id) addPart(id, toWorld(ev.clientX, ev.clientY)); }}>
      <svg ref={svg} className={'wsvg tool-' + tool} onPointerDown={ev => onDown(ev, 'pan')} onPointerMove={onMove} onPointerUp={onUp} onWheel={onWheel} onContextMenu={ev => ev.preventDefault()}>
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#ff3b3055" strokeWidth="2" /></pattern>
          <pattern id="grid" width={10 * view.s} height={10 * view.s} patternUnits="userSpaceOnUse" x={view.ox} y={view.oy}><path d={`M ${10 * view.s} 0 L 0 0 0 ${10 * view.s}`} fill="none" stroke="#ffffff0d" /></pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* 车壳 */}
        <rect x={X(-e.size[0] / 2)} y={Y(e.size[1] / 2)} width={e.size[0] * view.s} height={e.size[1] * view.s} rx={8 * view.s} className="encl" />
        <text x={X(0)} y={Y(e.size[1] / 2) - 6} className="dimtxt" textAnchor="middle">车头 ↑  {e.size[0]}×{e.size[1]}×{e.size[2]}mm</text>
        {e.keepOut.map((k, i) => <g key={i}><rect x={X(k.c[0] - k.s[0] / 2)} y={Y(k.c[1] + k.s[1] / 2)} width={k.s[0] * view.s} height={k.s[1] * view.s} fill="url(#hatch)" stroke="#ff3b3066" /></g>)}
        {/* 零件 */}
        {parts.map(p => {
          const l = lib[p.lib]; if (!l) return null;
          const on = sel?.kind === 'part' && sel.id === p.id; const hl = highlight.includes(p.id);
          const [w, h] = [l.size[0] * view.s, l.size[1] * view.s];
          const round = l.shape === 'cyl' ? Math.min(w, h) / 2 : l.shape === 'wheel' ? 2 * view.s : 1.2 * view.s;
          return (
            <g key={p.id} className={'wpart' + (on ? ' on' : '') + (hl ? ' hl' : '') + (l.kind === 'wheel' ? ' wheel' : '')} onPointerDown={ev => onDown(ev, 'part', p.id)}>
              <g transform={`translate(${X(p.pose.p[0])},${Y(p.pose.p[1])}) rotate(${-p.pose.r[2]})`}>
                <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={round} fill={l.color} />
                {view.s > 3 && <text y={l.size[1] * view.s / 2 - 4} className="plabel" textAnchor="middle">{p.label}</text>}
              </g>
            </g>);
        })}
        {/* 导线 */}
        {doc.wires.map(w => {
          const a = pinWorld(doc, lib, w.a.part, w.a.pin), b = pinWorld(doc, lib, w.b.part, w.b.pin); if (!a || !b) return null;
          const pts = [[a[0], a[1]], ...w.pts, [b[0], b[1]]];
          const d = 'M' + pts.map(q => `${X(q[0])},${Y(q[1])}`).join(' L');
          const on = sel?.kind === 'wire' && sel.id === w.id;
          return (
            <g key={w.id} className={'wire' + (on ? ' on' : '')}>
              <path d={d} className="whit" onPointerDown={ev => {
                  ev.stopPropagation();
                  if (tool === 'cut') { edit(D => { D.wires = D.wires.filter(x => x.id !== w.id); }); set({ sel: null }); return; }
                  // 按住拖 = 拖下面的零件（线很密时也拖得动）；不动就放开 = 选这条线
                  const under = partAt(doc, lib, toWorld(ev.clientX, ev.clientY));
                  if (under && tool === 'select') { (ev.target as Element).setPointerCapture?.(ev.pointerId); const pp = doc.parts.find(x => x.id === under)!.pose.p; drag.current = { kind: 'part', id: under, sx: ev.clientX, sy: ev.clientY, v0: view, p0: [pp[0], pp[1]], wire: w.id } as any; }
                  else set({ sel: { kind: 'wire', id: w.id } });
                }}
                onDoubleClick={ev => { const m = toWorld(ev.clientX, ev.clientY); edit(D => { const W = D.wires.find(x => x.id === w.id)!; W.pts.splice(nearestSeg(pts as any, m), 0, [Math.round(m[0] * 2) / 2, Math.round(m[1] * 2) / 2]); }); }} />
              <path d={d} className="wline" stroke={w.color === '#222222' ? '#5a5a5a' : w.color} strokeWidth={Math.max(1.5, 0.9 * view.s)} />
              {on && w.pts.map((q, i) => <circle key={i} cx={X(q[0])} cy={Y(q[1])} r={5} className="bend" onPointerDown={ev => onDown(ev, 'pt', w.id, i)}
                onDoubleClick={ev => { ev.stopPropagation(); edit(D => { D.wires.find(x => x.id === w.id)!.pts.splice(i, 1); }); }} />)}
            </g>);
        })}
        {/* 针脚 */}
        {parts.map(p => {
          const l = lib[p.lib]; if (!l) return null;
          return l.pins.map(pin => {
            const q = pinWorld(doc, lib, p.id, pin.id)!; const key = `${p.id}.${pin.id}`;
            const net = N!.netOf.get(key); const isPend = pending && pending.part === p.id && pending.pin === pin.id;
            const cls = 'pin t-' + pin.type + (net ? ' used' : '') + (isPend ? ' pend' : '') + (netPins?.has(key) ? ' net' : '');
            return (
              <g key={key} className={cls} onPointerDown={ev => { ev.stopPropagation(); clickPin({ part: p.id, pin: pin.id }); }}
                onPointerEnter={() => setHoverNet(net ?? null)} onPointerLeave={() => setHoverNet(null)}>
                <circle cx={X(q[0])} cy={Y(q[1])} r={Math.max(2.5, 0.75 * view.s)} />
                {showPinLabels && <text x={X(q[0])} y={Y(q[1]) - 0.75 * view.s - 2} className="pinlabel" textAnchor="middle">{pin.id}</text>}
                <title>{p.label}.{pin.id} · {pin.type}{pin.v ? ` · ${pin.v[0]}–${pin.v[1]}V` : ''}{pin.strap ? ' · ⚠ ' + pin.strap : ''}{pin.note ? ' · ' + pin.note : ''}</title>
              </g>);
          });
        })}
        {pending && mouse && (() => { const a = pinWorld(doc, lib, pending.part, pending.pin); return a && <line x1={X(a[0])} y1={Y(a[1])} x2={X(mouse[0])} y2={Y(mouse[1])} className="pendline" />; })()}
      </svg>
      <div className="wbar mono dim small">{mouse ? `x ${mouse[0].toFixed(1)}  y ${mouse[1].toFixed(1)} mm` : ''} · 滚轮缩放 · 拖空白平移 · 拖零件移动（Alt 精细） · 双击导线加拐点</div>
    </div>
  );
}
// 点在哪个零件上（最高的那个；按 z 轴旋转后的矩形判断）
function partAt(doc: Doc, lib: Lib, m: [number, number]): string | null {
  const hits = doc.parts.filter(p => {
    const l = lib[p.lib]; if (!l || l.kind === 'wheel') return false;
    const a = -p.pose.r[2] * Math.PI / 180; const dx = m[0] - p.pose.p[0], dy = m[1] - p.pose.p[1];
    const x = dx * Math.cos(a) - dy * Math.sin(a), y = dx * Math.sin(a) + dy * Math.cos(a);
    return Math.abs(x) <= l.size[0] / 2 && Math.abs(y) <= l.size[1] / 2;
  }).sort((a, b) => b.pose.p[2] - a.pose.p[2]);
  return hits[0]?.id ?? null;
}
function nearestSeg(pts: [number, number][], m: [number, number]) {
  let best = 0, bd = Infinity;
  for (let i = 1; i < pts.length; i++) { const d = segDist(pts[i - 1], pts[i], m); if (d < bd) { bd = d; best = i - 1; } }
  return best;
}
function segDist(a: [number, number], b: [number, number], p: [number, number]) {
  const vx = b[0] - a[0], vy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / (vx * vx + vy * vy || 1)));
  return Math.hypot(a[0] + t * vx - p[0], a[1] + t * vy - p[1]);
}
export type { Doc, Lib };
