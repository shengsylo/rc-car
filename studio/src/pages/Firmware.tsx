import React from 'react';
import { useStore } from '../store';
import { act } from '../api';
import { JobList } from './Jobs';

export function Firmware() {
  const st = useStore(s => s.st)!;
  return (
    <div className="page">
      <header className="ph"><h1>固件</h1><p className="dim">源码 <code>rc_car.ino</code> 版本 <b className="mono">{st.version}</b>。每次编译都存一份（<code>builds/</code>），可以随时刷回旧版。固件里<b>没有</b> WiFi 密码，密码在刷机后经 USB 写进车里。</p></header>
      <section>
        <h2>编译</h2>
        <div className="grid">
          {Object.entries(st.targets).map(([k, t]) => {
            const last = st.builds.find(b => b.target === k);
            const running = st.jobs.some(j => j.state === 'running' && j.title === `编译 ${k}`);
            return (
              <div key={k} className="card">
                <div className="car-top"><b>{t.name}</b></div>
                <dl className="kv"><dt>板子</dt><dd className="mono small">{t.fqbn}</dd><dt>驱动</dt><dd>{t.driver}</dd><dt>最新</dt><dd className="mono">{last ? last.id : '–'}</dd></dl>
                <button className="primary" disabled={running} onClick={() => act('build', { target: k })}>{running ? '编译中…' : `编译 ${st.version}`}</button>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <h2>版本 <span className="count">{st.builds.length}</span></h2>
        {st.builds.length === 0 ? <div className="card empty-card">还没编译过。</div> :
          <table className="tbl">
            <thead><tr><th>版本</th><th>型号</th><th>大小</th><th>时间</th><th>sha256</th></tr></thead>
            <tbody>{st.builds.map(b => <tr key={b.id}>
              <td className="mono">{b.id}</td><td>{st.targets[b.target]?.name || b.target}</td>
              <td className="mono">{Math.round(b.files['app.bin'].size / 1024)} KB</td>
              <td className="mono dim">{new Date(b.created).toLocaleString()}</td>
              <td className="mono dim small">{b.files['app.bin'].sha256.slice(0, 12)}</td>
            </tr>)}</tbody>
          </table>}
      </section>
      <section><h2>编译记录</h2><JobList kinds={['build', 'setup']} /></section>
    </div>
  );
}
