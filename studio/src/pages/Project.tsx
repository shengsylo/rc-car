import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { act } from '../api';
import { useP, load, save, undo, redo, removeSel, edit } from '../project/pstore';
import { View3D } from '../project/View3D';
import { Wiring } from '../project/Wiring';
import { Timeline } from '../project/Timeline';
import { Inspector } from '../project/Inspector';

export function Project() {
  const projects = useStore(s => s.st!.projects);
  const { id, doc, tool, gizmo, dirty, past, future, set } = useP();
  const [shell, setShell] = useState(true);
  const [split, setSplit] = useState<'both' | '3d' | '2d'>('both');
  useEffect(() => {
    if (id) return;
    let want = ''; try { want = localStorage.getItem('rc.project') || ''; } catch { }
    const first = projects.find(p => p.id === want) || projects[0];
    if (first) load(first.id);
  }, [projects.length]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input,textarea,select')) return;
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      else if ((e.metaKey || e.ctrlKey) && k === 's') { e.preventDefault(); save(); }
      else if (k === 'delete' || k === 'backspace') removeSel();
      else if (k === 'escape') set({ tool: 'select', pending: null, sel: null });
      else if (k === 'w') set({ gizmo: 'translate' });
      else if (k === 'e') set({ gizmo: 'rotate' });
      else if (k === 'l') set({ tool: 'wire' });
      else if (k === 'x') set({ tool: 'cut' });
      else if (k === 'v') set({ tool: 'select' });
      else if (k === ' ') { e.preventDefault(); set({ playing: !useP.getState().playing }); }
      else if (k === 'r') { const s = useP.getState().sel; if (s?.kind === 'part') edit(d => { const p = d.parts.find(x => x.id === s.id)!; p.pose.r[2] = (p.pose.r[2] + 90) % 360; }); }
    };
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { const f = () => { save(); }; addEventListener('beforeunload', f); return () => { removeEventListener('beforeunload', f); save(); }; }, []);
  const newProject = async () => {
    const name = prompt('项目名字（例如：保时捷二号）'); if (!name) return;
    const pid = (name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'p') + '-' + Date.now().toString(36).slice(-4);
    const from = confirm('复制现在这个项目当起点？（取消 = 空白项目）') ? id : null;
    if (await act('projectCreate', { id: pid, name, from })) { await act('status').then(() => {}); useStore.getState().set({ st: { ...useStore.getState().st!, projects: [...projects, { id: pid, name, parts: 0, wires: 0, updated: Date.now() }] } }); load(pid); }
  };
  if (!projects.length) return <div className="empty">没有项目。<button className="primary" onClick={newProject}>新建项目</button></div>;
  return (
    <div className="proj">
      <div className="ptool">
        <select value={id || ''} onChange={e => load(e.target.value)}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        <button className="ghost xs" onClick={newProject}>新建</button>
        <span className="sep" />
        <div className="seg">
          {([['select', '选择 V'], ['wire', '拉线 L'], ['cut', '剪刀 X']] as const).map(([t, l]) => <button key={t} className={tool === t ? 'on' : ''} onClick={() => set({ tool: t, pending: null })}>{l}</button>)}
        </div>
        <div className="seg">
          {([['translate', '移动 W'], ['rotate', '旋转 E']] as const).map(([t, l]) => <button key={t} className={gizmo === t ? 'on' : ''} onClick={() => set({ gizmo: t })}>{l}</button>)}
        </div>
        <button className="ghost xs" disabled={!past.length} onClick={undo}>撤销</button>
        <button className="ghost xs" disabled={!future.length} onClick={redo}>重做</button>
        <span className="sep" />
        <div className="seg">{([['both', '3D + 接线'], ['3d', '3D'], ['2d', '接线']] as const).map(([v, l]) => <button key={v} className={split === v ? 'on' : ''} onClick={() => setSplit(v)}>{l}</button>)}</div>
        <label className="check small"><input type="checkbox" checked={shell} onChange={e => setShell(e.target.checked)} />车壳</label>
        <span className="grow" />
        <span className={'mono small ' + (dirty ? 'dim' : 'okc')}>{dirty ? '未保存…' : '已保存'}</span>
      </div>
      {doc ? <div className="pbody">
        <div className={'views ' + split}>
          {split !== '2d' && <div className="pane"><div className="pane-t">3D 布局</div><View3D showShell={shell} /></div>}
          {split !== '3d' && <div className="pane"><div className="pane-t">接线图（俯视 · 真实尺寸）</div><Wiring /></div>}
        </div>
        <Inspector />
        <Timeline />
      </div> : <div className="empty">加载中…</div>}
    </div>
  );
}
