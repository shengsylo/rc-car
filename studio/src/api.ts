import { useStore, upsertJob, toast } from './store';

let ws: WebSocket | null = null;
let rid = 0;
const waiting = new Map<number, { res: (d: any) => void; rej: (e: Error) => void }>();

// 演示版（GitHub Pages）：没有 Mac 服务器，项目/零件库从 ./data/ 读，改动存在这个浏览器里
export const DEMO = !/^(127\.0\.0\.1|localhost|\[::1\])$/.test(location.hostname) || new URLSearchParams(location.search).has('demo');
const LS = 'rc.demo.';
async function getJson(u: string) { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); }
async function demoCall(a: string, args: any): Promise<any> {
  const idx = await ((demoCall as any)._idx ||= getJson('./data/index.json'));
  const local = () => { try { return JSON.parse(localStorage.getItem(LS + 'list') || '[]'); } catch { return []; } };
  switch (a) {
    case 'status': return { cars: [], ports: [], portsError: null, serialOk: true, monitors: [], targets: idx.targets, builds: [], jobs: [], version: idx.version,
      settings: { wifi: {}, wifiDefault: 'home', host: '', ip: '', otaPassword: false }, projects: [...idx.projects, ...local().filter((p: any) => !idx.projects.some((q: any) => q.id === p.id))], drive: null, driveUrl: null, adminUrl: null };
    case 'library': return getJson('./data/library.json');
    case 'projectGet': { try { const v = localStorage.getItem(LS + 'p.' + args.id); if (v) return JSON.parse(v); } catch { } return getJson(`./data/projects/${args.id}.json`); }
    case 'projectSave': try { localStorage.setItem(LS + 'p.' + args.id, JSON.stringify(args.doc)); } catch { } return { ok: true };
    case 'projectCreate': { const doc = args.from ? await demoCall('projectGet', { id: args.from }) : { schema: 1, name: args.name, units: 'mm', enclosure: { size: [60, 140, 40], floor: 3, keepOut: [] }, parts: [], wires: [], rig: { steerMaxDeg: 25, joints: [] }, anim: { duration: 8, channels: { throttle: [], steer: [] } }, firmware: { targets: [] } };
      doc.name = args.name; try { localStorage.setItem(LS + 'p.' + args.id, JSON.stringify(doc)); localStorage.setItem(LS + 'list', JSON.stringify([...local(), { id: args.id, name: args.name, parts: doc.parts.length, wires: doc.wires.length, updated: Date.now() }])); } catch { } return { ok: true }; }
    case 'pinsFile': return { text: null };
    case 'demoReset': try { Object.keys(localStorage).filter(k => k.startsWith(LS)).forEach(k => localStorage.removeItem(k)); } catch { } return { ok: true };
    default: throw new Error('演示版不能做这个：编译/刷机/写文件要在 Mac 上 bash start.sh，打开 http://127.0.0.1:8090');
  }
}

export function connect() {
  if (DEMO) { useStore.getState().set({ connected: true }); demoCall('status', {}).then(d => useStore.getState().set({ st: d })).catch(e => toast('读不到演示数据：' + e.message, true)); return; }
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
      case 'drive': if (s.st) s.set({ st: { ...s.st, drive: m.drive } }); break;
      case 'monitor': refresh(); break;
    }
  };
}
export function call<T = any>(a: string, args: object = {}): Promise<T> {
  if (DEMO) return demoCall(a, args);
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
