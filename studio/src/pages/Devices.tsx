import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { act } from '../api';
import { JobList } from './Jobs';
import { DriveCard } from './Drive';
import type { Port, Car, Build } from '../types';

export function Devices() {
  const st = useStore(s => s.st)!;
  const cars = [...st.cars].sort((a, b) => Number(b.online) - Number(a.online) || a.id - b.id);
  return (
    <div className="page">
      <header className="ph"><h1>设备</h1><p className="dim">插 USB 的板子在下面；连上 WiFi 的车在上面。第一次装车：选型号 → 车号 → <b>一键装车</b>（编译 → 刷机 → 写 WiFi）。</p></header>

      <DriveCard />

      <section>
        <h2>在线的车 <span className="count">{st.cars.filter(c => c.online).length}</span></h2>
        {cars.length === 0 ? <div className="card empty-card">还没有车连上服务器。车开机后 5–10 秒会出现在这里。</div> :
          <div className="grid">{cars.map(c => <CarCard key={c.id} c={c} builds={st.builds} />)}</div>}
      </section>

      <section>
        <h2>USB 串口 <span className="count">{st.ports.length}</span> <button className="ghost xs" onClick={() => act('scan')}>重新扫描</button></h2>
        {st.portsError && <div className="card warn">{st.portsError}：flash.sh 第一次跑会自动装 arduino-cli（或 <code>brew install arduino-cli</code>）。</div>}
        {!st.serialOk && <div className="card warn">串口库没装，不能配网/看串口：在 rc-car 文件夹跑 <code>npm install</code>。</div>}
        {st.ports.length === 0 ? <div className="card empty-card">没插 USB。用<b>能传数据</b>的线插 ESP32（有些线只能充电）。</div> :
          <div className="grid">{st.ports.map(p => <PortCard key={p.address} p={p} />)}</div>}
      </section>

      <section>
        <h2>任务</h2>
        <JobList kinds={['setup', 'flash', 'provision', 'info', 'build']} limit={8} />
      </section>
    </div>
  );
}

function CarCard({ c, builds }: { c: Car; builds: Build[] }) {
  const targets = useStore(s => s.st!.targets);
  const ok = builds.filter(b => !c.soc || targets[b.target]?.soc === c.soc);
  const [sel, setSel] = useState(ok[0]?.id || '');
  useEffect(() => { if (!ok.find(b => b.id === sel)) setSel(ok[0]?.id || ''); }, [ok.map(b => b.id).join()]);
  const state = !c.online ? '离线' : c.busy ? { ota: '升级中', selftest: '自检中', calib: '校准中' }[c.busy] || c.busy : c.driver ? `${c.driverName || '有人'} 在开` : '空闲';
  return (
    <div className={'card car' + (c.online ? '' : ' off')}>
      <div className="car-top"><span className="carno">#{c.id}</span><span className={'tag ' + (c.online ? (c.busy || c.driver ? 'running' : 'done') : 'cancelled')}>{state}</span></div>
      <dl className="kv">
        <dt>固件</dt><dd className="mono">{c.fw || '–'}</dd>
        <dt>芯片</dt><dd className="mono">{c.soc || '旧固件'}</dd>
        <dt>IP</dt><dd className="mono">{c.ip || '–'}</dd>
        <dt>陀螺仪</dt><dd>{c.chip || '没有'}</dd>
      </dl>
      {c.online && <div className="row">
        <select value={sel} onChange={e => setSel(e.target.value)}>
          {ok.length === 0 && <option value="">先去「固件」编译</option>}
          {ok.map(b => <option key={b.id} value={b.id}>{b.id}{b.version === c.fw ? '（同版本）' : ''}</option>)}
        </select>
        <button disabled={!sel || !!c.busy || !!c.driver} onClick={() => act('ota', { car: c.id, build: sel })}>无线升级</button>
        <button className="ghost" disabled={!!c.busy || !!c.driver} onClick={() => act('selftest', { car: c.id })}>自检</button>
      </div>}
    </div>
  );
}

function PortCard({ p }: { p: Port }) {
  const st = useStore(s => s.st)!;
  const lines = useStore(s => s.serial[p.address]);
  const guessT = p.vid.toLowerCase().includes('303a') ? 'c3' : 'esp32';
  const [target, setTarget] = useState(guessT);
  const [car, setCar] = useState(String(Math.max(0, ...st.cars.map(c => c.id)) + 1));
  const latest = st.builds.find(b => b.target === target);
  const monitoring = st.monitors.includes(p.address);
  const busy = st.jobs.some(j => j.state === 'running' && j.title.includes(p.address));
  const [cmd, setCmd] = useState('');
  const box = useRef<HTMLPreElement>(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [lines?.length]);
  const noWifi = Object.keys(st.settings.wifi).length === 0;
  return (
    <div className="card port">
      <div className="car-top"><span className="mono">{p.address.replace('/dev/', '')}</span>{busy && <span className="tag running">忙</span>}</div>
      <div className="small dim">{p.board || p.guess || '不认识的板子'} {p.vid && <span className="mono">{p.vid}:{p.pid}</span>}</div>
      <div className="form">
        <label>型号<select value={target} onChange={e => setTarget(e.target.value)}>{Object.entries(st.targets).map(([k, t]) => <option key={k} value={k}>{t.name}</option>)}</select></label>
        <label>车号<input type="number" min={1} max={99} value={car} onChange={e => setCar(e.target.value)} /></label>
      </div>
      {noWifi && <div className="warn small">先去「设置」填 WiFi，配网要用</div>}
      <div className="row wrap">
        <button className="primary" disabled={busy || noWifi} onClick={() => act('setup', { target, port: p.address, car: Number(car) })}>一键装车</button>
        <button className="ghost" disabled={busy || !latest} title={latest ? latest.id : '先编译'} onClick={() => act('flash', { build: latest!.id, port: p.address })}>只刷机{latest ? ` ${latest.version}+` : ''}</button>
        <button className="ghost" disabled={busy || noWifi} onClick={() => act('provision', { port: p.address, car: Number(car) })}>只配网</button>
        <button className="ghost" disabled={busy} onClick={() => act('info', { port: p.address })}>读车信息</button>
        <button className={monitoring ? '' : 'ghost'} disabled={busy} onClick={() => act('monitor', { port: p.address, open: !monitoring })}>{monitoring ? '关串口' : '看串口'}</button>
      </div>
      {monitoring && <>
        <pre ref={box} className="log serial">{(lines || []).join('\n')}</pre>
        <form className="row" onSubmit={e => { e.preventDefault(); if (cmd) act('serialWrite', { port: p.address, text: cmd }); setCmd(''); }}>
          <input className="mono grow" placeholder='{"t":"info"}' value={cmd} onChange={e => setCmd(e.target.value)} /><button className="ghost">发送</button>
        </form>
      </>}
    </div>
  );
}
