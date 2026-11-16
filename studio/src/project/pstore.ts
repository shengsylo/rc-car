import { create } from 'zustand';
import type { Doc, Lib, Part, Wire, End } from './model';
import { call } from '../api';
import { toast } from '../store';

type Tool = 'select' | 'wire' | 'cut';
type PS = {
  id: string | null; doc: Doc | null; lib: Lib; sel: { kind: 'part' | 'wire'; id: string } | null;
  tool: Tool; gizmo: 'translate' | 'rotate'; dirty: boolean; past: string[]; future: string[];
  pending: End | null;                     // 拉线时第一个针
  hoverPart: string | null; highlight: string[];
  t: number; playing: boolean; live: { steer: number; throttle: number } | null;
  set: (p: Partial<PS>) => void;
};
export const useP = create<PS>(set => ({
  id: null, doc: null, lib: {}, sel: null, tool: 'select', gizmo: 'translate', dirty: false, past: [], future: [], pending: null,
  hoverPart: null, highlight: [], t: 0, playing: false, live: null, set: p => set(p),
}));

// 改文档：记一步撤销
export function edit(fn: (d: Doc) => void, opts: { merge?: string } = {}) {
  const s = useP.getState(); if (!s.doc) return;
  const before = JSON.stringify(s.doc);
  const d: Doc = JSON.parse(before); fn(d);
  // 连续拖动合并成一步
  const past = opts.merge && (edit as any)._last === opts.merge && Date.now() - (edit as any)._at < 800 ? s.past : s.past.concat(before).slice(-100);
  (edit as any)._last = opts.merge; (edit as any)._at = Date.now();
  s.set({ doc: d, dirty: true, past, future: [] });
  autosave();
}
export function undo() { const s = useP.getState(); if (!s.doc || !s.past.length) return; const prev = s.past[s.past.length - 1]; s.set({ doc: JSON.parse(prev), past: s.past.slice(0, -1), future: [JSON.stringify(s.doc), ...s.future], dirty: true }); autosave(); }
export function redo() { const s = useP.getState(); if (!s.doc || !s.future.length) return; const nx = s.future[0]; s.set({ doc: JSON.parse(nx), future: s.future.slice(1), past: s.past.concat(JSON.stringify(s.doc)), dirty: true }); autosave(); }

let timer: any;
function autosave() { clearTimeout(timer); timer = setTimeout(save, 1500); }
export async function save() {
  const s = useP.getState(); if (!s.doc || !s.id || !s.dirty) return;
  try { await call('projectSave', { id: s.id, doc: s.doc }); useP.getState().set({ dirty: false }); } catch (e: any) { toast('保存失败：' + e.message, true); }
}
export async function load(id: string) {
  await save();
  const [doc, lib] = await Promise.all([call<Doc>('projectGet', { id }), call<Lib>('library')]);
  useP.getState().set({ id, doc, lib, sel: null, past: [], future: [], dirty: false, pending: null, t: 0, playing: false });
  try { localStorage.setItem('rc.project', id); } catch { }
}
export function partById(id: string): Part | undefined { return useP.getState().doc?.parts.find(p => p.id === id); }
export function nextId(prefix: string, used: string[]) { let i = 1; while (used.includes(prefix + i)) i++; return prefix + i; }

const KIND_PREFIX: Record<string, string> = { mcu: 'u', driver: 'u', motor: 'm', servo: 's', battery: 'b', sensor: 'i', io: 'k', passive: 'r', video: 'v', wheel: 'w' };
export function addPart(libId: string, at: [number, number] = [0, 0]) {
  const s = useP.getState(); const l = s.lib[libId]; if (!l || !s.doc) return;
  const id = nextId(KIND_PREFIX[l.kind] || 'p', s.doc.parts.map(p => p.id));
  edit(d => d.parts.push({ id, lib: libId, label: l.name.split(/[ （(]/)[0], pose: { p: [Math.round(at[0]), Math.round(at[1]), d.enclosure.floor + l.size[2] / 2], r: [0, 0, 0] } }));
  useP.getState().set({ sel: { kind: 'part', id } });
}
export function removeSel() {
  const s = useP.getState(); if (!s.sel) return;
  const { kind, id } = s.sel;
  edit(d => {
    if (kind === 'part') { d.parts = d.parts.filter(p => p.id !== id); d.wires = d.wires.filter(w => w.a.part !== id && w.b.part !== id); d.rig.joints = d.rig.joints.filter(j => j.part !== id); }
    else d.wires = d.wires.filter(w => w.id !== id);
  });
  useP.getState().set({ sel: null });
}
const COLORS: Record<string, string> = { power_src: '#e5484d', power_out: '#e5484d', power_in: '#e5484d', gnd: '#222222', motor_out: '#ff8b3e', motor_in: '#ff8b3e', analog_out: '#30a46c' };
export function clickPin(e: End) {
  const s = useP.getState(); if (!s.doc) return;
  if (s.tool !== 'wire') { s.set({ tool: 'wire', pending: e }); return; }
  if (!s.pending) { s.set({ pending: e }); return; }
  if (s.pending.part === e.part && s.pending.pin === e.pin) { s.set({ pending: null }); return; }
  const a = s.pending;
  const pa = s.doc.parts.find(p => p.id === a.part)!; const def = s.lib[pa.lib]?.pins.find(x => x.id === a.pin);
  const pb = s.doc.parts.find(p => p.id === e.part)!; const defb = s.lib[pb.lib]?.pins.find(x => x.id === e.pin);
  const color = COLORS[def?.type || ''] || COLORS[defb?.type || ''] || (/(SDA|SCL)/.test(a.pin + e.pin) ? '#3e9bff' : '#f5d90a');
  const id = nextId('w', s.doc.wires.map(w => w.id));
  edit(d => d.wires.push({ id, a, b: e, color, pts: [] } as Wire));
  useP.getState().set({ pending: null, sel: { kind: 'wire', id } });
}
