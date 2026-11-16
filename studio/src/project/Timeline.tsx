// 动画时间轴：油门、转向两条曲线。点空白加关键帧，拖关键帧，右键删掉。
import React, { useRef } from 'react';
import { useP, edit } from './pstore';

const CH: { id: 'throttle' | 'steer'; label: string; color: string }[] = [
  { id: 'throttle', label: '油门', color: '#ff8b3e' }, { id: 'steer', label: '转向', color: '#3e9bff' }];
export function Timeline() {
  const { doc, t, playing, live, set } = useP();
  const ref = useRef<SVGSVGElement>(null);
  const drag = useRef<null | { ch: 'throttle' | 'steer'; i: number }>(null);
  if (!doc) return null;
  const dur = doc.anim.duration || 8;
  const W = 1000, laneH = 46, pad = 70;
  const tx = (tt: number) => pad + (tt / dur) * (W - pad - 10);
  const vy = (lane: number, v: number) => lane * laneH + laneH / 2 - v * (laneH / 2 - 5);
  const fromEvt = (e: React.PointerEvent, lane: number) => {
    const r = ref.current!.getBoundingClientRect(); const x = (e.clientX - r.left) * (W / r.width), y = (e.clientY - r.top) * ((laneH * 2 + 18) / r.height);
    const tt = Math.max(0, Math.min(dur, ((x - pad) / (W - pad - 10)) * dur));
    const v = Math.max(-1, Math.min(1, -(y - (lane * laneH + laneH / 2)) / (laneH / 2 - 5)));
    return [Math.round(tt * 20) / 20, Math.round(v * 20) / 20] as [number, number];
  };
  return (
    <div className="timeline">
      <div className="tl-ctl">
        <button className={playing ? '' : 'primary'} onClick={() => set({ playing: !playing, live: null })}>{playing ? '暂停' : '▶ 播放'}</button>
        <span className="mono">{t.toFixed(2)}s / </span>
        <input className="mono tiny" type="number" min={1} max={120} value={dur} onChange={e => edit(d => { d.anim.duration = Math.max(1, Number(e.target.value)); })} />s
        {live && <span className="tag running">真车数据</span>}
        <span className="dim small">点空白加关键帧 · 拖动调整 · 右键删除</span>
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${laneH * 2 + 18}`} className="tl-svg" preserveAspectRatio="none"
        onPointerMove={e => { const d = drag.current; if (!d) return; const lane = CH.findIndex(c => c.id === d.ch); const [tt, v] = fromEvt(e, lane);
          edit(D => { const k = D.anim.channels[d.ch]; k[d.i] = [tt, v]; k.sort((a, b) => a[0] - b[0]); d.i = k.findIndex(q => q[0] === tt && q[1] === v); }, { merge: 'key' + d.ch + d.i }); }}
        onPointerUp={() => { drag.current = null; }}>
        {CH.map((c, lane) => {
          const keys = doc.anim.channels[c.id] || [];
          const pts = keys.length ? [[0, keys[0][1]], ...keys, [dur, keys[keys.length - 1][1]]] : [[0, 0], [dur, 0]];
          return (
            <g key={c.id}>
              <rect x={pad} y={lane * laneH + 2} width={W - pad - 10} height={laneH - 4} className="lane"
                onPointerDown={e => { const [tt, v] = fromEvt(e, lane); edit(D => { const k = D.anim.channels[c.id] = D.anim.channels[c.id] || []; k.push([tt, v]); k.sort((a, b) => a[0] - b[0]); }); set({ t: tt, playing: false }); }} />
              <line x1={pad} x2={W - 10} y1={vy(lane, 0)} y2={vy(lane, 0)} className="zero" />
              <text x={8} y={lane * laneH + laneH / 2 + 4} className="lanelabel" fill={c.color}>{c.label}</text>
              <polyline points={pts.map(q => `${tx(q[0])},${vy(lane, q[1])}`).join(' ')} fill="none" stroke={c.color} strokeWidth={2} />
              {keys.map((k, i) => <circle key={i} cx={tx(k[0])} cy={vy(lane, k[1])} r={5} fill={c.color} className="key"
                onPointerDown={e => { e.stopPropagation(); (e.target as Element).setPointerCapture(e.pointerId); drag.current = { ch: c.id, i }; }}
                onContextMenu={e => { e.preventDefault(); edit(D => { D.anim.channels[c.id].splice(i, 1); }); }}><title>{k[0]}s  {k[1]}</title></circle>)}
            </g>);
        })}
        {/* 播放头 */}
        <g onPointerDown={e => e.stopPropagation()}>
          <line x1={tx(t)} x2={tx(t)} y1={0} y2={laneH * 2} className="playhead" />
        </g>
        <rect x={pad} y={laneH * 2} width={W - pad - 10} height={16} className="scrub"
          onPointerDown={e => { const [tt] = fromEvt(e, 0); set({ t: tt, playing: false, live: null }); (e.target as Element).setPointerCapture(e.pointerId); }}
          onPointerMove={e => { if (e.buttons) { const [tt] = fromEvt(e, 0); set({ t: tt }); } }} />
        {Array.from({ length: Math.floor(dur) + 1 }, (_, i) => <text key={i} x={tx(i)} y={laneH * 2 + 13} className="tick" textAnchor="middle">{i}s</text>)}
      </svg>
    </div>
  );
}
