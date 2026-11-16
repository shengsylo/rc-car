import { useStore, upsertJob, toast } from './store';

let ws: WebSocket | null = null;
let rid = 0;
const waiting = new Map<number, { res: (d: any) => void; rej: (e: Error) => void }>();

export function connect() {
  ws = new WebSocket(`ws://${location.host}/admin`);
  ws.onopen = () => useStore.getState().set({ connected: true });
  ws.onclose = () => { useStore.getState().set({ connected: false }); setTimeout(connect, 1500); };
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    const s = useStore.getState();
    switch (m.t) {
      case 'status': s.set({ st: m.data }); break;
      case 'reply': { const w = waiting.get(m.rid); if (w) { waiting.delete(m.rid); m.ok ? w.res(m.data) : w.rej(new Error(m.error)); } break; }
      case 'job': upsertJob(m.job); if (m.job.state === 'done' || m.job.state === 'failed') refresh(); if (m.job.state === 'failed') toast(`${m.job.title} 失败：${m.job.error}`, true); if (m.job.state === 'done') toast(`${m.job.title} ✓`); break;
      case 'log': { const L = { ...s.logs }; L[m.id] = (L[m.id] || []).concat(m.text).slice(-2000); s.set({ logs: L }); break; }
      case 'serial': { const L = { ...s.serial }; L[m.port] = (L[m.port] || []).concat(m.line).slice(-1000); s.set({ serial: L }); break; }
      case 'ports': if (s.st) s.set({ st: { ...s.st, ports: m.ports } }); break;
      case 'cars': if (s.st) s.set({ st: { ...s.st, cars: m.cars } }); break;
      case 'monitor': refresh(); break;
    }
  };
}
export function call<T = any>(a: string, args: object = {}): Promise<T> {
  return new Promise((res, rej) => {
    if (!ws || ws.readyState !== 1) return rej(new Error('没连上服务器（node server.js 开着吗？）'));
    const id = ++rid; waiting.set(id, { res, rej });
    ws.send(JSON.stringify({ a, args, rid: id }));
  });
}
// 调用 + 出错弹提示
export async function act<T = any>(a: string, args: object = {}): Promise<T | undefined> {
  try { return await call<T>(a, args); } catch (e: any) { toast(e.message, true); return undefined; }
}
export async function refresh() { const d = await call('status').catch(() => null); if (d) useStore.getState().set({ st: d }); }
