import React, { useState, useEffect } from 'react';
import { useStore } from './store';
import { Devices } from './pages/Devices';
import { Firmware } from './pages/Firmware';
import { Settings } from './pages/Settings';
import { Project } from './pages/Project';

const TABS = [
  { id: 'devices', label: '设备', sub: '车 · USB · 刷机' },
  { id: 'firmware', label: '固件', sub: '编译 · 版本' },
  { id: 'project', label: '项目', sub: '3D · 接线 · 动画' },
  { id: 'settings', label: '设置', sub: 'WiFi · 手机' },
] as const;
type Tab = typeof TABS[number]['id'];

export function App() {
  const [tab, setTab] = useState<Tab>(() => (location.hash.slice(1) as Tab) || 'devices');
  useEffect(() => { location.hash = tab; }, [tab]);
  useEffect(() => { const f = () => { const h = location.hash.slice(1) as Tab; if (TABS.some(t => t.id === h)) setTab(h); }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  const { connected, st, toast } = useStore();
  const online = st?.cars.filter(c => c.online).length ?? 0;
  const running = st?.jobs.filter(j => j.state === 'running').length ?? 0;
  return (
    <div className="shell">
      <nav className="side">
        <div className="brand"><span className="dot" />RC STUDIO</div>
        {TABS.map(t => (
          <button key={t.id} className={'tab' + (tab === t.id ? ' on' : '')} onClick={() => setTab(t.id)}>
            <b>{t.label}</b><small>{t.sub}</small>
          </button>
        ))}
        <div className="side-foot">
          <div className={'pill ' + (connected ? 'ok' : 'bad')}>{connected ? '服务器在线' : '连不上服务器'}</div>
          <div className="mono dim">车在线 {online} · 任务 {running}</div>
          <div className="mono dim">固件源码 {st?.version ?? '–'}</div>
        </div>
      </nav>
      <main className={'main' + (tab === 'project' ? ' full' : '')}>
        {!st ? <div className="empty">{connected ? '加载中…' : '等服务器… 在 rc-car 文件夹跑 bash start.sh'}</div> :
          tab === 'devices' ? <Devices /> : tab === 'firmware' ? <Firmware /> : tab === 'project' ? <Project /> : <Settings />}
      </main>
      {toast && <div className={'toast' + (toast.bad ? ' bad' : '')}>{toast.text}</div>}
    </div>
  );
}
