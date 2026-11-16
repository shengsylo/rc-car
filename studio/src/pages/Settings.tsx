import React, { useState } from 'react';
import { useStore, toast } from '../store';
import { act } from '../api';

export function Settings() {
  const st = useStore(s => s.st)!;
  const cur = st.settings.wifi[st.settings.wifiDefault];
  const [ssid, setSsid] = useState(cur?.ssid || '');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div className="page">
      <header className="ph"><h1>设置</h1><p className="dim">这些只存在这台 Mac 的 <code>~/.rcstudio/secrets.json</code>，不进 git、不进固件、不进项目文件。</p></header>
      <section>
        <h2>车用的 WiFi</h2>
        <div className="card narrow">
          <p className="small dim">必须是 2.4GHz。配网时经 USB 写进车里。{cur && <>现在：<b>{cur.ssid}</b>，密码 <span className="mono">{cur.pass}</span>（{cur.len} 位）</>}</p>
          <form className="form" onSubmit={async e => { e.preventDefault(); const r = await act('setWifi', { name: st.settings.wifiDefault, ssid, pass }); if (r) { setPass(''); toast('WiFi 存好了'); act('status'); } }}>
            <label>名称<input value={ssid} onChange={e => setSsid(e.target.value)} autoComplete="off" /></label>
            <label>密码<input type={show ? 'text' : 'password'} value={pass} placeholder={cur ? '不改就留空' : ''} onChange={e => setPass(e.target.value)} autoComplete="new-password" /></label>
            <label className="check"><input type="checkbox" checked={show} onChange={e => setShow(e.target.checked)} />显示</label>
            <button className="primary">保存</button>
          </form>
        </div>
      </section>
      <section>
        <h2>服务器</h2>
        <div className="card narrow">
          <dl className="kv">
            <dt>Mac 名字</dt><dd className="mono">{st.settings.host}.local</dd>
            <dt>Mac IP</dt><dd className="mono">{st.settings.ip || '–'}</dd>
            <dt>驾驶网页</dt><dd className="mono">{st.driveUrl || '–'}</dd>
            <dt>OTA 密码</dt><dd>{st.settings.otaPassword ? '已生成（配网时写进车）' : '–'}</dd>
          </dl>
        </div>
      </section>
      <section>
        <h2>手机管理链接</h2>
        <div className="card narrow">
          <p className="small dim">手机用这个链接打开一次，之后就能在驾驶页做校准/自检/升级。别发给别人（谁有它谁就能刷你的车）。</p>
          {st.adminUrl ? <div className="row"><code className="grow mono small break">{st.adminUrl.replace(/admin=.*/, 'admin=••••••')}</code><button className="ghost" onClick={() => { navigator.clipboard.writeText(st.adminUrl!); toast('复制了'); }}>复制</button></div> : <div className="dim">没有局域网 IP</div>}
        </div>
      </section>
    </div>
  );
}
