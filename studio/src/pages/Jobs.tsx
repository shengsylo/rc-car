import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { act, call } from '../api';
import type { Job } from '../types';

const STATE: Record<string, string> = { running: '进行中', done: '完成', failed: '失败', cancelled: '已取消' };
export function JobList({ kinds, limit = 6 }: { kinds?: string[]; limit?: number }) {
  const jobs = useStore(s => s.st?.jobs ?? []);
  const list = jobs.filter(j => !kinds || kinds.includes(j.kind)).slice(-limit).reverse();
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => { const r = list.find(j => j.state === 'running'); if (r) setOpen(r.id); }, [list.map(j => j.id + j.state).join()]);
  if (!list.length) return <div className="dim small">还没有任务</div>;
  return <div className="jobs">{list.map(j => <JobRow key={j.id} j={j} open={open === j.id} toggle={() => setOpen(open === j.id ? null : j.id)} />)}</div>;
}
function JobRow({ j, open, toggle }: { j: Job; open: boolean; toggle: () => void }) {
  const live = useStore(s => s.logs[j.id]);
  const [old, setOld] = useState<string[] | null>(null);
  const box = useRef<HTMLPreElement>(null);
  useEffect(() => { if (open && !live && !old) call('jobLog', { id: j.id }).then(d => setOld(d.log.split('\n'))).catch(() => {}); }, [open]);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [live?.length, open]);
  const lines = live || old || [];
  const secs = Math.round(((j.ended || Date.now()) - j.started) / 1000);
  return (
    <div className={'job ' + j.state}>
      <div className="job-head" onClick={toggle}>
        <span className="job-title">{j.title}</span>
        <span className="mono dim">{secs}s</span>
        <span className={'tag ' + j.state}>{STATE[j.state]}{j.state === 'running' ? ` ${j.pct}%` : ''}</span>
        {j.state === 'running' && <button className="ghost xs" onClick={e => { e.stopPropagation(); act('cancel', { id: j.id }); }}>取消</button>}
      </div>
      {j.state === 'running' && <div className="bar"><i style={{ width: j.pct + '%' }} /></div>}
      {j.error && <div className="err small">{j.error}</div>}
      {open && <pre ref={box} className="log">{lines.join('\n')}</pre>}
    </div>
  );
}
