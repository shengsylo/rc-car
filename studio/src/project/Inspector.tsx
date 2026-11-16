import React, { useEffect, useMemo, useState } from 'react';
import { useP, edit, removeSel, addPart } from './pstore';
import { erc, nets, pinsH, bom } from './erc';
import { collisions } from './collide';
import { wireLength } from './geom';
import { act, call } from '../api';
import { toast } from '../store';

const TABS = ['选中', '检查', '剪线单', 'pins.h', '零件库', '清单'] as const;
type T = typeof TABS[number];
export function Inspector() {
  const { doc, lib } = useP();
  const [tab, setTab] = useState<T>('检查');
  const issues = useMemo(() => doc ? [...erc(doc, lib), ...collisions(doc, lib)] : [], [doc, lib]);
  const sel = useP(s => s.sel);
  useEffect(() => { if (sel) setTab('选中'); }, [sel?.id]);
  if (!doc) return null;
  const errs = issues.filter(i => i.level === 'err').length, warns = issues.filter(i => i.level === 'warn').length;
  return (
    <aside className="insp">
      <div className="itabs">{TABS.map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}{t === '检查' && (errs || warns) ? <i className={errs ? 'b err' : 'b warn'}>{errs || warns}</i> : null}</button>)}</div>
      <div className="ibody">
        {tab === '选中' && <Selected />}
        {tab === '检查' && <Issues issues={issues} />}
        {tab === '剪线单' && <CutList />}
        {tab === 'pins.h' && <PinsH />}
        {tab === '零件库' && <Library />}
        {tab === '清单' && <Bom />}
      </div>
    </aside>
  );
}

function Num({ v, on, step = 0.5 }: { v: number; on: (n: number) => void; step?: number }) {
  return <input type="number" className="mono tiny" step={step} value={v} onChange={e => on(Number(e.target.value))} />;
}
function Selected() {
  const { doc, lib, sel } = useP();
  if (!doc || !sel) return <div className="dim small">在 3D 或接线图里点一个零件/导线。<br /><br />快捷键：<b>F</b> 镜头对准 · <b>W</b> 移动 · <b>E</b> 旋转 · <b>R</b> 转 90° · <b>Del</b> 删除 · <b>⌘Z</b> 撤销 · <b>L</b> 拉线 · <b>X</b> 剪刀 · <b>Esc</b> 取消</div>;
  if (sel.kind === 'wire') {
    const w = doc.wires.find(x => x.id === sel.id); if (!w) return null;
    const pa = doc.parts.find(p => p.id === w.a.part), pb = doc.parts.find(p => p.id === w.b.part);
    const L = wireLength(doc, lib, w);
    return (<div className="stack">
      <h3>导线 {w.id}</h3>
      <div>{pa?.label}.<b>{w.a.pin}</b> → {pb?.label}.<b>{w.b.pin}</b></div>
      <div>长度约 <b className="mono">{L ? Math.ceil(L * 1.15 + 6) : '–'} mm</b> <span className="dim small">（直线 {L?.toFixed(0)}mm + 15% + 两头各 3mm 剥线）</span></div>
      <label className="row">颜色 {['#e5484d', '#222222', '#f5d90a', '#3e9bff', '#ff8b3e', '#30a46c', '#ffffff'].map(c => <button key={c} className={'sw' + (w.color === c ? ' on' : '')} style={{ background: c }} onClick={() => edit(d => { d.wires.find(x => x.id === w.id)!.color = c; })} />)}</label>
      <div className="dim small">拐点 {w.pts.length} 个：双击导线加，双击拐点删。</div>
      <button className="danger" onClick={removeSel}>剪掉这条线</button>
    </div>);
  }
  const p = doc.parts.find(x => x.id === sel.id); if (!p) return null;
  const l = lib[p.lib];
  const { netOf, nets: N } = nets(doc, lib);
  const setP = (i: number, v: number) => edit(d => { d.parts.find(x => x.id === p.id)!.pose.p[i] = v; }, { merge: 'num' + p.id + i });
  const setR = (i: number, v: number) => edit(d => { d.parts.find(x => x.id === p.id)!.pose.r[i] = v; }, { merge: 'rot' + p.id + i });
  return (<div className="stack">
    <input className="h3in" value={p.label} onChange={e => edit(d => { d.parts.find(x => x.id === p.id)!.label = e.target.value; }, { merge: 'lbl' + p.id })} />
    <div className="dim small">{l?.name} · <span className="mono">{p.id}</span> {l && !l.verified && <span className="tag warn">尺寸未量</span>}</div>
    {l?.note && <div className="note small">{l.note}</div>}
    <div className="grid3"><span>位置 mm</span>{[0, 1, 2].map(i => <Num key={i} v={p.pose.p[i]} on={v => setP(i, v)} />)}</div>
    <div className="grid3"><span>旋转 °</span>{[0, 1, 2].map(i => <Num key={i} v={p.pose.r[i]} step={15} on={v => setR(i, v)} />)}</div>
    {l && <div className="dimsbox">
      <div><span>宽</span><b className="mono">{l.size[0]} mm</b><i>{(l.size[0] / 10).toFixed(2)} cm</i></div>
      <div><span>长</span><b className="mono">{l.size[1]} mm</b><i>{(l.size[1] / 10).toFixed(2)} cm</i></div>
      <div><span>高</span><b className="mono">{l.size[2]} mm</b><i>{(l.size[2] / 10).toFixed(2)} cm</i></div>
      {l.weight != null && <div><span>重</span><b className="mono">{l.weight} g</b><i>{l.verified ? '官方数据' : '估计'}</i></div>}
      {l.source && <a className="small" href={l.source} target="_blank" rel="noreferrer">尺寸来源 ↗</a>}
    </div>}
    {l && l.pins.length > 0 && <table className="tbl small"><thead><tr><th>脚</th><th>类型</th><th>接到</th></tr></thead><tbody>
      {l.pins.map(pin => { const n = N.find(x => x.id === netOf.get(`${p.id}.${pin.id}`)); return <tr key={pin.id} title={pin.strap || pin.note || ''}>
        <td className="mono">{pin.id}{pin.strap ? ' ⚠' : ''}</td><td className="dim">{pin.type}{pin.fw ? ` · ${pin.fw}` : ''}</td>
        <td className="small">{n ? n.pins.filter(q => !(q.part === p.id && q.pin === pin.id)).map(q => q.label).join('、') : <span className="dim">–</span>}</td></tr>; })}
    </tbody></table>}
    <div className="row"><button className="ghost" onClick={() => edit(d => { const q = d.parts.find(x => x.id === p.id)!; q.pose.r[2] = (q.pose.r[2] + 90) % 360; })}>转 90°</button>
      <button className="ghost" onClick={() => { const id = p.id + 'c'; edit(d => { const q = JSON.parse(JSON.stringify(p)); q.id = id; q.pose.p[0] += 5; q.pose.p[1] += 5; d.parts.push(q); }); }}>复制</button>
      <button className="danger" onClick={removeSel}>删除</button></div>
  </div>);
}
function Issues({ issues }: { issues: ReturnType<typeof erc> }) {
  const set = useP(s => s.set);
  if (!issues.length) return <div className="ok-big">✓ 没发现问题</div>;
  return <ul className="issues">{issues.map((i, k) => <li key={k} className={i.level} onMouseEnter={() => set({ highlight: i.parts })} onMouseLeave={() => set({ highlight: [] })}
    onClick={() => set({ sel: { kind: 'part', id: i.parts[0] } })}><b>{{ err: '错误', warn: '注意', info: '提示' }[i.level]}</b> {i.text}</li>)}</ul>;
}
function CutList() {
  const { doc, lib } = useP(); if (!doc) return null;
  const rows = doc.wires.map(w => ({ w, L: wireLength(doc, lib, w) })).sort((a, b) => a.w.color.localeCompare(b.w.color));
  const label = (e: { part: string; pin: string }) => `${doc.parts.find(p => p.id === e.part)?.label}.${e.pin}`;
  const total = rows.reduce((s, r) => s + (r.L ? Math.ceil(r.L * 1.15 + 6) : 0), 0);
  return (<div className="stack">
    <div className="dim small">照这个剪线：长度 = 3D 里的路径 × 1.15 + 6mm 剥线。总共约 <b>{(total / 1000).toFixed(2)} m</b>。</div>
    <table className="tbl small"><thead><tr><th></th><th>从</th><th>到</th><th>mm</th></tr></thead><tbody>
      {rows.map(({ w, L }) => <tr key={w.id}><td><i className="swatch" style={{ background: w.color }} /></td><td>{label(w.a)}</td><td>{label(w.b)}</td><td className="mono">{L ? Math.ceil(L * 1.15 + 6) : '–'}</td></tr>)}
    </tbody></table>
  </div>);
}
function PinsH() {
  const { doc, lib } = useP(); const [file, setFile] = useState<string | null>(null);
  const t = doc?.firmware.targets[0];
  useEffect(() => { if (t) call('pinsFile', { target: t.target }).then(r => setFile(r.text)).catch(() => {}); }, [t?.target]);
  if (!doc) return null;
  if (!t) return <div className="dim small">这个项目还没选 MCU。加一个 ESP32 零件后在这里设置。<br />{doc.parts.filter(p => lib[p.lib]?.kind === 'mcu').map(p => <button key={p.id} className="ghost" onClick={() => edit(d => { d.firmware.targets = [{ target: lib[p.lib].target!, mcu: p.id }]; })}>用 {p.label}</button>)}</div>;
  const { text, missing } = pinsH(doc, lib, t);
  const same = file === text;
  return (<div className="stack">
    <div className="small">目标 <b className="mono">{t.target}</b> · MCU <b>{doc.parts.find(p => p.id === t.mcu)?.label}</b></div>
    {missing.length > 0 && <div className="warn small">没接到 MCU：{missing.join('、')}（这些用固件默认脚位）</div>}
    <pre className="code">{text}</pre>
    <div className="row">
      <button className="primary" disabled={same} onClick={async () => { const r = await act('savePins', { target: t.target, text }); if (r) { setFile(text); toast(`写好了：${(r as any).file}。去「固件」重新编译`); } }}>{same ? '已经是这个' : `写进 firmware/pins/${t.target}.h`}</button>
      {file && <button className="ghost" onClick={async () => { await act('removePins', { target: t.target }); setFile(null); }}>删掉（用默认脚位）</button>}
    </div>
    <div className="dim small">编译时会把这个文件放进固件，覆盖 rc_car.ino 里的默认脚位。{file == null ? '现在没有，用默认脚位。' : !same ? '和现在的文件不一样（接线改过）。' : ''}</div>
  </div>);
}
function Library() {
  const lib = useP(s => s.lib);
  const [q, setQ] = useState('');
  const items = Object.values(lib).filter(l => !q || (l.name + l.id + l.kind).toLowerCase().includes(q.toLowerCase()));
  return (<div className="stack">
    <input placeholder="搜零件…" value={q} onChange={e => setQ(e.target.value)} />
    <div className="dim small">拖到接线图里，或点「加」。</div>
    <ul className="libl">{items.map(l => <li key={l.id} draggable onDragStart={e => e.dataTransfer.setData('text/rc-part', l.id)}>
      <i className="swatch" style={{ background: l.color }} /><div><b>{l.name}</b><div className="dim small mono">{l.size.join('×')}mm · {l.pins.length} 脚{l.verified ? '' : ' · 未量'}</div></div>
      <button className="ghost xs" onClick={() => addPart(l.id)}>加</button></li>)}</ul>
  </div>);
}
function Bom() {
  const { doc, lib } = useP(); if (!doc) return null;
  return <table className="tbl small"><thead><tr><th>零件</th><th>数量</th><th>价格</th></tr></thead><tbody>
    {bom(doc, lib).map(r => <tr key={r.id}><td>{r.name}{!r.verified && <span className="dim"> · 未量</span>}</td><td className="mono">{r.n}</td><td className="dim">{r.price}</td></tr>)}</tbody></table>;
}
