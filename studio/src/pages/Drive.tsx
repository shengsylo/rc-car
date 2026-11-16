// 驾驶服务器（8080/8443）开关：车和手机连的那个
import React, { useState } from 'react';
import { useStore, toast } from '../store';
import { act } from '../api';

function since(t: number | null) { if (!t) return ''; const s = Math.round((Date.now() - t) / 1000); return s < 60 ? `${s} 秒` : s < 3600 ? `${Math.round(s / 60)} 分钟` : `${(s / 3600).toFixed(1)} 小时`; }
export function DriveCard() {
  const d = useStore(s => s.st?.drive);
  const [busy, setBusy] = useState(false);
  if (!d) return null;
  const toggle = async () => {
    if (d.running && (d.cars || d.phones) && !confirm(`关掉驾驶服务器？${d.cars} 台车、${d.phones} 个手机会断开（车会刹停）。`)) return;
    setBusy(true); const r = await act(d.running ? 'driveStop' : 'driveStart'); setBusy(false);
    if (r) toast(d.running ? '驾驶服务器关了' : '驾驶服务器开了');
  };
  return (
    <div className={'card drive ' + (d.running ? 'on' : 'off')}>
      <div className="drive-row">
        <span className={'lamp' + (d.running ? ' on' : '')} />
        <div className="grow">
          <b>驾驶服务器</b> <span className="mono dim">:{d.port}{d.httpsPort ? ` · https :${d.httpsPort}` : ''}</span>
          <div className="small dim">{d.running ? `开着 ${since(d.since)} · 车 ${d.cars} 台 · 手机 ${d.phones} 个` : '关着：车和手机连不上。编译、刷机、配网、3D 不需要它。'}</div>
        </div>
        <button className={d.running ? 'danger' : 'primary'} disabled={busy} onClick={toggle}>{busy ? '…' : d.running ? '关' : '开'}</button>
      </div>
      {d.error && <div className="err small">{d.error}</div>}
      {d.running && d.urls.length > 0 && <div className="small">手机打开：{d.urls.map(u => <code key={u} className="mono">{u}</code>)}</div>}
      <label className="check small dim"><input type="checkbox" checked={d.autostart} onChange={e => act('driveAutostart', { on: e.target.checked })} />开 RC Studio 时自动开驾驶服务器</label>
    </div>
  );
}
export function DrivePill() {
  const d = useStore(s => s.st?.drive);
  if (!d) return null;
  return <button className={'pill btn ' + (d.running ? 'ok' : 'off')} title="驾驶服务器（车和手机连的那个）"
    onClick={async () => { if (d.running && (d.cars || d.phones) && !confirm('关掉驾驶服务器？车和手机会断开。')) return; await act(d.running ? 'driveStop' : 'driveStart'); }}>
    {d.running ? `● 8080 开着 · 车 ${d.cars}` : '○ 8080 关着 · 点开'}</button>;
}
