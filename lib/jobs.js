// JobRunner：编译/刷机/配网这些慢活排队跑，日志写 logs/jobs/<id>.log，进度推给 Studio
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class JobRunner extends EventEmitter {
  constructor(root) {
    super();
    this.dir = path.join(root, 'logs', 'jobs');
    fs.mkdirSync(this.dir, { recursive: true });
    this.jobs = new Map();   // id -> job
    this.seq = 0;
    this.locks = new Map();  // 资源（串口、'compile'）-> jobId
  }
  list() { return [...this.jobs.values()].slice(-50).map(j => this.view(j)); }
  view(j) { return { id: j.id, kind: j.kind, title: j.title, state: j.state, pct: j.pct, started: j.started, ended: j.ended, error: j.error, result: j.result, locks: j.locks }; }
  get(id) { return this.jobs.get(id); }
  log(id) { try { return fs.readFileSync(path.join(this.dir, id + '.log'), 'utf8'); } catch { return ''; } }
  isLocked(res) { return this.locks.has(res); }

  // fn(ctx) 是 async；ctx.run(cmd,args) 跑子进程，ctx.line(text) 写日志，ctx.progress(pct)
  start({ kind, title, locks = [] }, fn) {
    for (const r of locks) if (this.locks.has(r)) throw new Error(`${r} 正被任务 ${this.locks.get(r)} 占用`);
    const id = `${Date.now().toString(36)}-${++this.seq}`;
    const file = fs.createWriteStream(path.join(this.dir, id + '.log'));
    const job = { id, kind, title, state: 'running', pct: 0, started: Date.now(), ended: null, error: null, result: null, locks, procs: new Set(), cancelled: false };
    this.jobs.set(id, job);
    for (const r of locks) this.locks.set(r, id);
    const line = t => { const s = String(t).replace(/\r/g, ''); file.write(s + '\n'); this.emit('log', { id, text: s }); };
    const ctx = {
      id, line,
      progress: pct => { job.pct = Math.max(0, Math.min(100, Math.round(pct))); this.emit('job', this.view(job)); },
      cancelled: () => job.cancelled,
      run: (cmd, args, opt = {}) => new Promise((resolve, reject) => {
        if (job.cancelled) return reject(new Error('已取消'));
        line(`$ ${cmd} ${args.join(' ')}`);
        const p = spawn(cmd, args, { cwd: opt.cwd, env: { ...process.env, ...(opt.env || {}) } });   // 数组参数，不经过 shell
        job.procs.add(p);
        let out = '';
        const onData = d => { const s = d.toString(); out += s; for (const l of s.split('\n')) if (l.trim()) { line(l); if (opt.onLine) opt.onLine(l); } };
        p.stdout.on('data', onData); p.stderr.on('data', onData);
        p.on('error', e => { job.procs.delete(p); reject(new Error(e.code === 'ENOENT' ? `找不到 ${cmd}（装了吗？）` : e.message)); });
        p.on('close', code => { job.procs.delete(p); code === 0 ? resolve(out) : reject(Object.assign(new Error(`${path.basename(cmd)} 失败（退出码 ${code}）`), { out })); });
      }),
    };
    this.emit('job', this.view(job));
    Promise.resolve().then(() => fn(ctx)).then(result => {
      job.state = 'done'; job.pct = 100; job.result = result || null;
    }, err => {
      job.state = job.cancelled ? 'cancelled' : 'failed'; job.error = err.message;
      line('✗ ' + err.message);
    }).finally(() => {
      job.ended = Date.now();
      for (const r of job.locks) if (this.locks.get(r) === id) this.locks.delete(r);
      file.end();
      this.emit('job', this.view(job));
    });
    return job;
  }
  cancel(id) {
    const j = this.jobs.get(id);
    if (!j || j.state !== 'running') return false;
    j.cancelled = true;
    for (const p of j.procs) try { p.kill('SIGTERM'); } catch { }
    return true;
  }
}
module.exports = { JobRunner };
