// 3D 布局：拖动/旋转零件（和 2D 接线图同一份数据），导线、车壳、禁区、动画都在这里
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { useP, edit } from './pstore';
import { pinWorld, pinLocal } from './geom';
import { sample } from './anim';
import type { LibPart, Part, Doc, Lib } from './model';
import { buildModel } from './models';

const PIN_COL: Record<string, number> = { gnd: 0x444444, power_src: 0xe5484d, power_in: 0xe5484d, power_out: 0xe5484d, gpio: 0xf5d90a, motor_out: 0xff8b3e, motor_in: 0xff8b3e };
const D = Math.PI / 180;

type Node = { g: THREE.Group; yaw: THREE.Group; spin: THREE.Group; lib: string; mats: THREE.MeshStandardMaterial[]; outline: THREE.LineSegments; dims: THREE.Group };
export function View3D({ showShell, showDims }: { showShell: boolean; showDims: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<any>({});
  useEffect(() => {
    const el = host.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0b0b0d);
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
    const cam = new THREE.PerspectiveCamera(40, 1, 0.5, 5000); cam.up.set(0, 0, 1); cam.position.set(160, -220, 180);
    const orbit = new OrbitControls(cam, renderer.domElement); orbit.target.set(0, 0, 10); orbit.enableDamping = true;
    const tc = new TransformControls(cam, renderer.domElement); tc.setTranslationSnap(0.5); tc.setRotationSnap(15 * D); tc.setSize(0.8);
    scene.add(tc);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(80, -120, 200); scene.add(sun);
    const rim = new THREE.DirectionalLight(0x99aaff, 0.6); rim.position.set(-120, 140, 60); scene.add(rim);
    scene.environment = envMap(renderer);
    const grid = new THREE.GridHelper(400, 40, 0x333333, 0x1c1c1c); grid.rotation.x = Math.PI / 2; scene.add(grid);
    const shellG = new THREE.Group(); scene.add(shellG);
    const wiresG = new THREE.Group(); scene.add(wiresG);
    const nodes = new Map<string, Node>();
    const ray = new THREE.Raycaster();

    tc.addEventListener('dragging-changed', (e: any) => { orbit.enabled = !e.value; });
    tc.addEventListener('objectChange', () => {
      const o = tc.object as THREE.Group | undefined; if (!o) return;
      const id = o.userData.id as string;
      const e = new THREE.Euler().setFromQuaternion(o.quaternion, 'ZYX');
      const r = (v: number) => Math.round(v * 2) / 2;
      edit(d => { const p = d.parts.find(x => x.id === id); if (!p) return; p.pose.p = [r(o.position.x), r(o.position.y), r(o.position.z)]; p.pose.r = [Math.round(e.x / D), Math.round(e.y / D), Math.round(e.z / D)]; }, { merge: '3d' + id });
    });
    let downAt: [number, number] | null = null;
    renderer.domElement.addEventListener('pointerdown', e => { downAt = [e.clientX, e.clientY]; });
    renderer.domElement.addEventListener('pointerup', e => {
      if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 4 || (tc as any).dragging) return;
      const r = renderer.domElement.getBoundingClientRect();
      ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), cam);
      const hits = ray.intersectObjects([...nodes.values()].map(n => n.g), true);
      const hit = hits.find(h => { let o: THREE.Object3D | null = h.object; while (o && !o.userData.id) o = o.parent; return !!o; });
      let o: THREE.Object3D | null = hit ? hit.object : null; while (o && !o.userData.id) o = o.parent;
      useP.getState().set({ sel: o ? { kind: 'part', id: o.userData.id } : null });
    });

    function buildPart(p: Part, l: LibPart): Node {
      const g = new THREE.Group(); g.userData.id = p.id;
      const yaw = new THREE.Group(); const spin = new THREE.Group(); g.add(yaw); yaw.add(spin);
      const mat = new THREE.MeshStandardMaterial({ color: l.color, roughness: 0.6, metalness: l.kind === 'motor' ? 0.6 : 0.1 });
      const mats = [mat];
      const [w, d, h] = l.size;
      const outline = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w + 0.6, d + 0.6, h + 0.6)), new THREE.LineBasicMaterial({ color: 0xffb224 }));
      outline.visible = false; g.add(outline);
      const dims = dimsGroup(l.size); dims.visible = false; g.add(dims);
      const real = buildModel(l);
      if (real) {
        spin.add(real);
        for (const pin of l.pins) {   // 针脚标记：小圆点，鼠标看得到接哪
          const v = pinLocal(l, pin.id)!;
          const s = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 6), new THREE.MeshBasicMaterial({ color: PIN_COL[pin.type] ?? 0x8888ff, transparent: true, opacity: 0.9 }));
          s.position.copy(v); g.add(s);
        }
        return { g, yaw, spin, lib: p.lib, mats, outline, dims };
      }
      let mesh: THREE.Mesh;
      if (l.shape === 'cyl') { const geo = new THREE.CylinderGeometry(Math.min(w, d) / 2, Math.min(w, d) / 2, h, 24); geo.rotateX(Math.PI / 2); mesh = new THREE.Mesh(geo, mat); }
      else if (l.shape === 'wheel') {
        const geo = new THREE.CylinderGeometry(d / 2, d / 2, w, 32); geo.rotateZ(Math.PI / 2); mesh = new THREE.Mesh(geo, mat);
        const hubM = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 0.8, roughness: 0.3 }); mats.push(hubM);
        const hub = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, d * 0.5, d * 0.12), hubM); mesh.add(hub);   // 轮毂条：看得出在转
      }
      else if (l.shape === 'motor') {
        const r = Math.min(w, h) / 2; const geo = new THREE.CylinderGeometry(r, r, d * 0.6, 24); mesh = new THREE.Mesh(geo, mat); mesh.position.y = -d * 0.15;
        const gb = new THREE.Mesh(new THREE.BoxGeometry(w, d * 0.32, h), new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.7, roughness: 0.35 })); gb.position.y = d * 0.3; mesh.add(gb);
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 9, 12), new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.9 })); shaft.position.y = d * 0.62; mesh.add(shaft);
      } else {
        mesh = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mat);
        if (l.kind === 'mcu') { const usb = new THREE.Mesh(new THREE.BoxGeometry(9, 7, 3.2), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 })); usb.position.set(0, d / 2 - 2.5, h / 2 + 1.2); mesh.add(usb); }
      }
      spin.add(mesh);
      for (const pin of l.pins) {
        const v = pinLocal(l, pin.id)!;
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 6), new THREE.MeshBasicMaterial({ color: PIN_COL[pin.type] ?? 0x8888ff }));
        s.position.copy(v); g.add(s);
      }
      return { g, yaw, spin, lib: p.lib, mats, outline, dims };
    }
    function sync(doc: Doc, lib: Lib, sel: any, hl: string[]) {
      const seen = new Set<string>();
      for (const p of doc.parts) {
        const l = lib[p.lib]; if (!l) continue; seen.add(p.id);
        let n = nodes.get(p.id);
        if (!n || n.lib !== p.lib) { if (n) scene.remove(n.g); n = buildPart(p, l); nodes.set(p.id, n); scene.add(n.g); }
        if (!(tc as any).dragging || tc.object !== n.g) { n.g.position.set(...p.pose.p); n.g.rotation.set(p.pose.r[0] * D, p.pose.r[1] * D, p.pose.r[2] * D, 'ZYX'); }
        const on = sel?.kind === 'part' && sel.id === p.id;
        n.mats[0].emissive.setHex(on ? 0x553300 : hl.includes(p.id) ? 0x660000 : 0x000000);
        n.outline.visible = on || hl.includes(p.id); (n.outline.material as THREE.LineBasicMaterial).color.setHex(hl.includes(p.id) ? 0xff3b30 : 0xffb224);
        n.dims.visible = on || !!api.current.showDims;
      }
      for (const [id, n] of nodes) if (!seen.has(id)) { scene.remove(n.g); nodes.delete(id); }
      const target = sel?.kind === 'part' ? nodes.get(sel.id)?.g : undefined;
      if (target) { if (tc.object !== target) tc.attach(target); } else tc.detach();
      // 导线：针 A → 拐点（抬高 2mm）→ 针 B
      wiresG.clear();
      for (const w of doc.wires) {
        const a = pinWorld(doc, lib, w.a.part, w.a.pin), b = pinWorld(doc, lib, w.b.part, w.b.pin); if (!a || !b) continue;
        const z = Math.max(a[2], b[2]) + 2;
        const pts = [new THREE.Vector3(...a), new THREE.Vector3(a[0], a[1], z), ...w.pts.map(q => new THREE.Vector3(q[0], q[1], z)), new THREE.Vector3(b[0], b[1], z), new THREE.Vector3(...b)];
        const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.2);
        const on = sel?.kind === 'wire' && sel.id === w.id;
        const m = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(8, pts.length * 8), on ? 0.7 : 0.45, 6), new THREE.MeshStandardMaterial({ color: w.color === '#222222' ? 0x3a3a3a : w.color, emissive: on ? 0x444444 : 0 }));
        wiresG.add(m);
      }
      // 车壳 + 禁区
      shellG.clear();
      const e = doc.enclosure;
      const box = new THREE.Mesh(new THREE.BoxGeometry(...e.size));
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), new THREE.LineBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.5 }));
      edges.position.set(0, 0, e.size[2] / 2); shellG.add(edges);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(e.size[0], e.size[1]), new THREE.MeshStandardMaterial({ color: 0x222226, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
      floor.position.z = e.floor; shellG.add(floor);
      if (api.current.showShell) {
        const body = new THREE.Mesh(carBody(e.size), new THREE.MeshStandardMaterial({ color: 0xc0c0c8, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide, metalness: 0.5, roughness: 0.3 }));
        shellG.add(body);
      }
      if (api.current.showDims) { const dg = dimsGroup(e.size, true); dg.position.z = e.size[2] / 2; shellG.add(dg); }
      for (const k of e.keepOut) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(...k.s), new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.12, depthWrite: false }));
        m.position.set(...k.c); shellG.add(m);
      }
    }
    // 动画：每帧按时间或真车数据转轮子/打方向
    let last = performance.now(); const spinAngle = new Map<string, number>();
    function animate(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const s = useP.getState();
      if (s.doc) {
        let t = s.t;
        if (s.playing) { t = (t + dt) % (s.doc.anim.duration || 8); s.set({ t }); }
        const ch = s.live || { steer: sample(s.doc.anim.channels.steer, t), throttle: sample(s.doc.anim.channels.throttle, t) };
        for (const j of s.doc.rig.joints) {
          const n = nodes.get(j.part); if (!n) continue;
          const v = ch[j.channel];
          if (j.kind === 'yaw') n.yaw.rotation.z = -v * s.doc.rig.steerMaxDeg * D;
          else if (j.kind === 'spin') { const a = (spinAngle.get(j.id) || 0) + v * dt * 25; spinAngle.set(j.id, a); n.spin.rotation.x = a; }
        }
      }
      orbit.update(); renderer.render(scene, cam); raf = requestAnimationFrame(animate);
    }
    let raf = requestAnimationFrame(animate);
    // 镜头对准选中的零件（F 键 / 双击）；没选就看整台车
    let fly: { t0: number; from: [THREE.Vector3, THREE.Vector3]; to: [THREE.Vector3, THREE.Vector3] } | null = null;
    function focusSel() {
      const s = useP.getState(); const n = s.sel?.kind === 'part' ? nodes.get(s.sel.id) : null;
      const b = new THREE.Box3();
      if (n) b.setFromObject(n.spin); else if (s.doc) { const e = s.doc.enclosure.size; b.set(new THREE.Vector3(-e[0] / 2, -e[1] / 2, 0), new THREE.Vector3(e[0] / 2, e[1] / 2, e[2])); }
      const c = b.getCenter(new THREE.Vector3()); const r = Math.max(4, b.getSize(new THREE.Vector3()).length() / 2);
      const dir = cam.position.clone().sub(orbit.target).normalize();
      const dist = r / Math.sin((cam.fov * Math.PI / 180) / 2) * 1.15;
      fly = { t0: performance.now(), from: [cam.position.clone(), orbit.target.clone()], to: [c.clone().add(dir.multiplyScalar(dist)), c] };
    }
    renderer.domElement.addEventListener('dblclick', () => setTimeout(focusSel, 10));
    const tick = () => { if (fly) { const k = Math.min(1, (performance.now() - fly.t0) / 450); const e = 1 - Math.pow(1 - k, 3);
      cam.position.lerpVectors(fly.from[0], fly.to[0], e); orbit.target.lerpVectors(fly.from[1], fly.to[1], e); if (k >= 1) fly = null; } requestAnimationFrame(tick); };
    tick();
    const ro = new ResizeObserver(() => { const r = el.getBoundingClientRect(); renderer.setSize(r.width, r.height); cam.aspect = r.width / Math.max(1, r.height); cam.updateProjectionMatrix(); });
    ro.observe(el);
    api.current = { sync, tc, cam, orbit, showShell, showDims };
    const unsub = useP.subscribe((s, prev) => { if (s.doc !== prev.doc || s.sel !== prev.sel || s.highlight !== prev.highlight || s.lib !== prev.lib) { const st = useP.getState(); if (st.doc) sync(st.doc, st.lib, st.sel, st.highlight); } if (s.gizmo !== prev.gizmo) tc.setMode(s.gizmo); if (s.focus !== prev.focus) focusSel(); });
    const st = useP.getState(); if (st.doc) sync(st.doc, st.lib, st.sel, st.highlight);
    // 视角：看整台车
    const e = st.doc?.enclosure.size; if (e) { const k = Math.max(e[0], e[1]) * 1.3; cam.position.set(k * 0.7, -k, k * 0.8); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); unsub(); tc.dispose(); orbit.dispose(); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, []);
  useEffect(() => { api.current.showShell = showShell; api.current.showDims = showDims; const s = useP.getState(); if (s.doc && api.current.sync) api.current.sync(s.doc, s.lib, s.sel, s.highlight); }, [showShell, showDims]);
  return <div className="v3d" ref={host} />;
}

// 简单参数化车身（看比例用）：侧面轮廓挤出
function carBody(size: [number, number, number]): THREE.BufferGeometry {
  const [w, L, h] = size; const y0 = -L / 2;
  const s = new THREE.Shape();
  const P: [number, number][] = [[0, 0.12], [0.02, 0.4], [0.18, 0.5], [0.38, 0.62], [0.48, 0.98], [0.72, 1.0], [0.9, 0.72], [1, 0.58], [1, 0.12], [0.88, 0.04], [0.12, 0.04]];
  s.moveTo(y0 + P[0][0] * L, P[0][1] * h);
  for (const [a, b] of P.slice(1)) s.lineTo(y0 + a * L, b * h);
  const geo = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: true, bevelSize: Math.min(4, w * 0.08), bevelThickness: Math.min(4, w * 0.08), bevelSegments: 3 });
  // 形状在 XY 平面挤出 Z：转成 x=横向, y=前后, z=高
  geo.translate(0, 0, -w / 2);
  const m = new THREE.Matrix4().set(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1);
  geo.applyMatrix4(m);
  return geo;
}

// 尺寸标注：x（宽）、y（长）、z（高）三条线 + 文字（mm 和 cm）
function dimsGroup(size: [number, number, number], big = false): THREE.Group {
  const g = new THREE.Group(); const [w, d, h] = size; const off = big ? 6 : 2.5;
  const col = big ? 0xff6b61 : 0x7fd3ff;
  const line = (a: THREE.Vector3, b: THREE.Vector3, ext: THREE.Vector3) => {
    const m = new THREE.LineBasicMaterial({ color: col, depthTest: false, transparent: true });
    const pts = [a.clone().sub(ext), a.clone().add(ext.clone().multiplyScalar(0.3)), b.clone().sub(ext), b.clone().add(ext.clone().multiplyScalar(0.3)), a, b];
    const geo = new THREE.BufferGeometry().setFromPoints([pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]]);
    const l = new THREE.LineSegments(geo, m); l.renderOrder = 10; return l;
  };
  const label = (txt: string, at: THREE.Vector3, s: number) => {
    const cv = document.createElement('canvas'); cv.width = 768; cv.height = 128; const c = cv.getContext('2d')!;
    c.fillStyle = 'rgba(10,10,12,0.85)'; c.beginPath(); c.roundRect(4, 14, 760, 100, 30); c.fill();
    c.fillStyle = big ? '#ffb3ae' : '#cdeeff'; c.font = '600 58px ui-monospace, Menlo, monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 384, 66);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), depthTest: false, transparent: true }));
    sp.scale.set(s * 6, s, 1); sp.position.copy(at); sp.renderOrder = 11; return sp;
  };
  const fmt = (v: number) => `${+v.toFixed(1)} mm · ${+(v / 10).toFixed(2)} cm`;
  const s = big ? Math.max(5, Math.max(w, d) * 0.05) : Math.max(1.6, Math.min(4, Math.max(w, d, h) * 0.09));
  const zb = -h / 2;
  g.add(line(new THREE.Vector3(-w / 2, -d / 2 - off, zb), new THREE.Vector3(w / 2, -d / 2 - off, zb), new THREE.Vector3(0, off * 0.6, 0)));
  g.add(label(fmt(w), new THREE.Vector3(0, -d / 2 - off - s * 0.7, zb), s));
  g.add(line(new THREE.Vector3(w / 2 + off, -d / 2, zb), new THREE.Vector3(w / 2 + off, d / 2, zb), new THREE.Vector3(-off * 0.6, 0, 0)));
  g.add(label(fmt(d), new THREE.Vector3(w / 2 + off + s * 3.2, 0, zb), s));
  g.add(line(new THREE.Vector3(-w / 2 - off, -d / 2, -h / 2), new THREE.Vector3(-w / 2 - off, -d / 2, h / 2), new THREE.Vector3(off * 0.6, 0, 0)));
  g.add(label(fmt(h), new THREE.Vector3(-w / 2 - off - s * 3.2, -d / 2, 0), s));
  return g;
}
// 简单的环境光反射（金属件才有质感）
function envMap(renderer: THREE.WebGLRenderer) {
  const pm = new THREE.PMREMGenerator(renderer);
  const sc = new THREE.Scene();
  const geo = new THREE.SphereGeometry(100, 32, 16);
  const cols = new Float32Array(geo.attributes.position.count * 3);
  for (let i = 0; i < geo.attributes.position.count; i++) { const y = geo.attributes.position.getZ(i) / 100; const v = 0.15 + Math.max(0, y) * 0.8; cols.set([v, v, v * 1.05], i * 3); }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  sc.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
  const t = pm.fromScene(sc, 0.04).texture; pm.dispose(); return t;
}
