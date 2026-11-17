// 真实零件 3D 模型（程序生成，按毫米）：PCB 板厚、阻焊颜色、丝印字、排针、芯片、USB-C、按键、电容、电线……
// 局部坐标：x = 宽，y = 长（板子「上方」= +y），z = 高；包围盒中心在原点，跟 part.json 的 size 对齐。
import * as THREE from 'three';
import type { LibPart, PinDef } from './model';

// ---------- 材质 ----------
const M = {
  gold: new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.25 }),
  tin: new THREE.MeshStandardMaterial({ color: 0xc8c8cc, metalness: 1, roughness: 0.3 }),
  steel: new THREE.MeshStandardMaterial({ color: 0xb8bcc2, metalness: 0.9, roughness: 0.35 }),
  brass: new THREE.MeshStandardMaterial({ color: 0xc9a54a, metalness: 0.95, roughness: 0.3 }),
  copper: new THREE.MeshStandardMaterial({ color: 0xc87533, metalness: 0.9, roughness: 0.35 }),
  black: new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.7 }),
  plasticBlack: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.55 }),
  chip: new THREE.MeshStandardMaterial({ color: 0x1c1c1e, roughness: 0.45 }),
  white: new THREE.MeshStandardMaterial({ color: 0xf2f2f0, roughness: 0.5 }),
  ceramic: new THREE.MeshStandardMaterial({ color: 0xc9b38a, roughness: 0.6 }),
  blueTerm: new THREE.MeshStandardMaterial({ color: 0x2a6fd6, roughness: 0.5 }),
  alu: new THREE.MeshStandardMaterial({ color: 0x9aa0a8, metalness: 0.8, roughness: 0.4 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.95 }),
  red: new THREE.MeshStandardMaterial({ color: 0xd8302a, roughness: 0.5 }),
  ledRed: new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0x661010, roughness: 0.3 }),
  ledBlue: new THREE.MeshStandardMaterial({ color: 0x3e9bff, emissive: 0x0a2a66, roughness: 0.3 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x0a1020, metalness: 0.2, roughness: 0.05 }),
};
const WIRE: Record<string, number> = { 红: 0xd8302a, 黑: 0x1e1e1e, 白: 0xeeeeee, 蓝: 0x2a6fd6, 绿: 0x2fa04a, 黄: 0xf2c200, 棕: 0x6b3d1e, 橙: 0xff8b3e };
const matCache = new Map<string, THREE.MeshStandardMaterial>();
function mat(color: string | number, o: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  const k = String(color) + JSON.stringify(o);
  if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial({ color, roughness: 0.6, ...o }));
  return matCache.get(k)!;
}
function box(w: number, d: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m); o.position.set(x, y, z); return o;
}
function cyl(r: number, h: number, m: THREE.Material, axis: 'x' | 'y' | 'z' = 'z', seg = 24) {
  const g = new THREE.CylinderGeometry(r, r, h, seg);
  if (axis === 'z') g.rotateX(Math.PI / 2); else if (axis === 'x') g.rotateZ(Math.PI / 2);
  return new THREE.Mesh(g, m);
}

// ---------- 丝印 / 标签贴图 ----------
type Txt = { t: string; x: number; y: number; size?: number; rot?: number; color?: string; bold?: boolean; align?: CanvasTextAlign };
function labelTexture(w: number, d: number, bg: string, texts: Txt[], extra?: (c: CanvasRenderingContext2D, k: number) => void) {
  const k = 24;   // 像素/毫米
  const cv = document.createElement('canvas'); cv.width = Math.ceil(w * k); cv.height = Math.ceil(d * k);
  const c = cv.getContext('2d')!;
  c.fillStyle = bg; c.fillRect(0, 0, cv.width, cv.height);
  if (extra) extra(c, k);
  for (const t of texts) {
    c.save(); c.translate((t.x + w / 2) * k, (d / 2 - t.y) * k); if (t.rot) c.rotate(-t.rot * Math.PI / 180);
    c.fillStyle = t.color || '#f4f4f0'; c.font = `${t.bold ? '700 ' : ''}${(t.size || 0.9) * k}px ui-monospace, Menlo, monospace`;
    c.textAlign = t.align || 'center'; c.textBaseline = 'middle'; c.fillText(t.t, 0, 0); c.restore();
  }
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return tex;
}

// ---------- PCB ----------
// 圆角板 + 顶面丝印贴图；holes = 过孔/排针孔（镀锡圆环）
function pcb(w: number, d: number, t: number, color: string, silk: Txt[], holes: { x: number; y: number; r?: number }[] = [], opt: { corner?: number; mount?: { x: number; y: number; r: number }[] } = {}) {
  const g = new THREE.Group();
  const r = opt.corner ?? 0.8;
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -d / 2); s.lineTo(w / 2 - r, -d / 2); s.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
  s.lineTo(w / 2, d / 2 - r); s.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2); s.lineTo(-w / 2 + r, d / 2);
  s.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r); s.lineTo(-w / 2, -d / 2 + r); s.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  for (const h of [...holes.map(h => ({ ...h, r: (h.r ?? 0.5) })), ...(opt.mount || [])]) { const p = new THREE.Path(); p.absarc(h.x, h.y, h.r!, 0, Math.PI * 2, true); s.holes.push(p); }
  const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 12 });
  const edge = mat('#c9c18a', { roughness: 0.8 });   // FR4 侧边
  const tex = labelTexture(w, d, color, silk, (c, k) => {
    // 镀锡焊盘环
    c.fillStyle = '#d8d8dc';
    for (const h of holes) { c.beginPath(); c.arc((h.x + w / 2) * k, (d / 2 - h.y) * k, (h.r ?? 0.5) * 1.9 * k, 0, Math.PI * 2); c.fill(); }
    c.fillStyle = '#000';
    for (const h of holes) { c.beginPath(); c.arc((h.x + w / 2) * k, (d / 2 - h.y) * k, (h.r ?? 0.5) * k, 0, Math.PI * 2); c.fill(); }
    for (const h of opt.mount || []) { c.strokeStyle = '#d8d8dc'; c.lineWidth = 0.5 * k; c.beginPath(); c.arc((h.x + w / 2) * k, (d / 2 - h.y) * k, (h.r + 0.4) * k, 0, Math.PI * 2); c.stroke(); }
  });
  const top = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 });
  // ExtrudeGeometry 的 UV 是毫米坐标：转换成 0..1
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) + w / 2) / w, (uv.getY(i) + d / 2) / d);
  const m = new THREE.Mesh(geo, [top, edge]); g.add(m);
  return g;   // 板底在 z=0，顶在 z=t
}

// ---------- 排针 ----------
function header(n: number, pitch: number, opt: { up?: number; down?: number; plastic?: boolean; dir?: 'y' | 'x' } = {}) {
  const g = new THREE.Group();
  const up = opt.up ?? 0, down = opt.down ?? 6, plastic = opt.plastic ?? true;
  const len = n * pitch;
  if (plastic) { const p = box(opt.dir === 'x' ? len : 2.5, opt.dir === 'x' ? 2.5 : len, 2.5, M.plasticBlack); p.position.z = -1.25; g.add(p); }
  const pinGeo = new THREE.BoxGeometry(0.64, 0.64, up + down + (plastic ? 2.5 : 0));
  const inst = new THREE.InstancedMesh(pinGeo, M.gold, n);
  const mtx = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * pitch;
    mtx.makeTranslation(opt.dir === 'x' ? o : 0, opt.dir === 'x' ? 0 : o, (up - down - (plastic ? 2.5 : 0)) / 2);
    inst.setMatrixAt(i, mtx);
  }
  g.add(inst);
  return g;   // z=0 = 板底面（塑料在板下）
}
// ---------- 芯片 ----------
function qfn(s: number, h: number, label: string[], pinsPerSide = 0) {
  const g = new THREE.Group();
  const tex = labelTexture(s, s, '#1c1c1e', label.map((t, i) => ({ t, x: 0, y: (label.length - 1) / 2 * s * 0.18 - i * s * 0.18, size: s * 0.13, color: '#b9b9bd' })), (c, k) => { c.fillStyle = '#555'; c.beginPath(); c.arc(s * 0.15 * k, s * 0.15 * k, s * 0.05 * k, 0, 7); c.fill(); });
  const body = new THREE.Mesh(new THREE.BoxGeometry(s, s, h), [M.chip, M.chip, M.chip, M.chip, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45 }), M.chip]);
  body.position.z = h / 2; g.add(body);
  if (pinsPerSide) {   // QFN 侧面露出的焊脚
    const geo = new THREE.BoxGeometry(0.25, 0.3, 0.2); const inst = new THREE.InstancedMesh(geo, M.tin, pinsPerSide * 4); const mt = new THREE.Matrix4(); let k = 0;
    for (let side = 0; side < 4; side++) for (let i = 0; i < pinsPerSide; i++) {
      const o = (i - (pinsPerSide - 1) / 2) * (s * 0.8 / pinsPerSide);
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), side * Math.PI / 2);
      const p = new THREE.Vector3(o, -s / 2 - 0.05, 0.1).applyQuaternion(q);
      mt.compose(p, q, new THREE.Vector3(1, 1, 1)); inst.setMatrixAt(k++, mt);
    }
    g.add(inst);
  }
  return g;
}
function soic(w: number, d: number, h: number, nPerSide: number, label: string[], pitch = 0.65) {
  const g = new THREE.Group();
  const tex = labelTexture(w, d, '#1c1c1e', label.map((t, i) => ({ t, x: 0, y: (label.length - 1) / 2 * 0.9 - i * 0.9, size: 0.7, color: '#b9b9bd' })));
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), [M.chip, M.chip, M.chip, M.chip, new THREE.MeshStandardMaterial({ map: tex }), M.chip]);
  body.position.z = h / 2 + 0.1; g.add(body);
  const geo = new THREE.BoxGeometry(1.0, 0.25, 0.15); const inst = new THREE.InstancedMesh(geo, M.tin, nPerSide * 2); const mt = new THREE.Matrix4(); let k = 0;
  for (const sx of [-1, 1]) for (let i = 0; i < nPerSide; i++) { mt.makeTranslation(sx * (w / 2 + 0.35), (i - (nPerSide - 1) / 2) * pitch, 0.1); inst.setMatrixAt(k++, mt); }
  g.add(inst);
  return g;
}
function smd(w: number, d: number, h: number, body: THREE.Material, x: number, y: number, rot = 0) {   // 0603/0805 电阻电容（两端镀锡）
  const g = new THREE.Group();
  g.add(box(w * 0.7, d, h, body, 0, 0, h / 2));
  g.add(box(w * 0.18, d, h, M.tin, -w * 0.41, 0, h / 2)); g.add(box(w * 0.18, d, h, M.tin, w * 0.41, 0, h / 2));
  g.position.set(x, y, 0); g.rotation.z = rot * Math.PI / 180; return g;
}
function usbC() {   // 8.94 × 7.35 × 3.16 mm 母座
  const g = new THREE.Group();
  const s = new THREE.Shape(); const W = 8.94, H = 3.16, r = H / 2;
  s.moveTo(-W / 2 + r, -H / 2); s.lineTo(W / 2 - r, -H / 2); s.absarc(W / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2, false); s.lineTo(-W / 2 + r, H / 2); s.absarc(-W / 2 + r, 0, r, Math.PI / 2, Math.PI * 1.5, false);
  const hole = new THREE.Path(); const w2 = 8.34, h2 = 2.56, r2 = h2 / 2;
  hole.moveTo(-w2 / 2 + r2, -h2 / 2); hole.lineTo(w2 / 2 - r2, -h2 / 2); hole.absarc(w2 / 2 - r2, 0, r2, -Math.PI / 2, Math.PI / 2, false); hole.lineTo(-w2 / 2 + r2, h2 / 2); hole.absarc(-w2 / 2 + r2, 0, r2, Math.PI / 2, Math.PI * 1.5, false);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 7.35, bevelEnabled: false, curveSegments: 16 });
  geo.rotateX(Math.PI / 2); geo.translate(0, 7.35 / 2, H / 2);
  g.add(new THREE.Mesh(geo, M.steel));
  g.add(box(6.6, 6.8, 0.7, M.plasticBlack, 0, 0, H / 2));   // 中间舌片
  return g;   // 口朝 +y
}
function tact(x: number, y: number, size = 3, label = '') {
  const g = new THREE.Group();
  g.add(box(size + 1, size, 1.2, M.steel, 0, 0, 0.6));
  const cap = cyl(size * 0.3, 0.6, M.black); cap.position.z = 1.5; g.add(cap);
  g.position.set(x, y, 0); g.userData.label = label; return g;
}
function led(x: number, y: number, m: THREE.Material) { const g = new THREE.Group(); g.add(box(1.6, 0.8, 0.55, m, 0, 0, 0.28)); g.add(box(0.25, 0.8, 0.5, M.tin, -0.75, 0, 0.25)); g.add(box(0.25, 0.8, 0.5, M.tin, 0.75, 0, 0.25)); g.position.set(x, y, 0); return g; }
function ecap(r: number, h: number, sleeve = 0x1d2b4f, label = '') {
  const g = new THREE.Group();
  const tex = labelTexture(Math.PI * 2 * r, h, '#' + sleeve.toString(16).padStart(6, '0'), [{ t: label, x: 0, y: 0, size: Math.min(h * 0.18, 1.6), color: '#e8e8ee', rot: 90 }], (c, k) => { c.fillStyle = '#c9ccd6'; c.fillRect(0, 0, r * 1.2 * k, h * k); c.fillStyle = '#1d2b4f'; c.font = `${r * 0.9 * k}px sans-serif`; c.textAlign = 'center'; for (let i = 1; i < 5; i++) c.fillText('−', r * 0.6 * k, h * k * i / 5); });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32, 1, true), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35, metalness: 0.2 }));
  body.geometry.rotateX(Math.PI / 2); body.position.z = h / 2; g.add(body);
  const top = new THREE.Mesh(new THREE.CircleGeometry(r, 32), M.alu); top.position.z = h; g.add(top);
  const cross = box(r * 1.4, 0.15, 0.05, M.black, 0, 0, h + 0.02); g.add(cross); const c2 = cross.clone(); c2.rotation.z = Math.PI / 2; g.add(c2);
  return g;
}
// 一根柔软的电线（硅胶线）：points 是局部坐标，radius 由 AWG 决定
export function wireTube(points: THREE.Vector3[], color: number, awg = 26) {
  const od = { 22: 1.6, 24: 1.4, 26: 1.2, 28: 1.0, 30: 0.8 }[awg] || 1.2;
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.3);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(12, points.length * 10), od / 2, 8), mat(color, { roughness: 0.5 }));
}
function leads(from: [number, number, number], dir: [number, number, number], colors: number[], len: number, gap: number, awg = 26, flat = false) {
  const g = new THREE.Group();
  colors.forEach((c, i) => {
    const off = (i - (colors.length - 1) / 2) * gap;
    const a = new THREE.Vector3(from[0] + off, from[1], from[2]);
    const pts = [a, a.clone().add(new THREE.Vector3(dir[0] * len * 0.3, dir[1] * len * 0.3, dir[2] * len * 0.3)),
      a.clone().add(new THREE.Vector3(dir[0] * len * 0.7 + (flat ? 0 : off * 0.6), dir[1] * len * 0.7, dir[2] * len * 0.7 - 1)),
      a.clone().add(new THREE.Vector3(dir[0] * len + (flat ? 0 : off), dir[1] * len, dir[2] * len - 1.5))];
    g.add(wireTube(pts, c, awg));
  });
  return g;
}
function jstHousing(n: number, pitch: number, color = 0xf2f2ee) { return box(n * pitch + 1, 3.5, 4.5, mat(color, { roughness: 0.6 })); }

// =====================================================================
// 各零件
// =====================================================================
function pinHoles(l: LibPart, filter?: (p: PinDef) => boolean) { return l.pins.filter(p => !filter || filter(p)).map(p => ({ x: p.x, y: p.y, r: 0.5 })); }

function esp32c3(l: LibPart) {
  const [w, d, h] = l.size; const t = 1.0; const g = new THREE.Group();
  const silk: Txt[] = l.pins.map(p => ({ t: p.id.replace('GPIO', ''), x: p.x + (p.x < 0 ? 2.1 : -2.1), y: p.y, size: 0.85, align: 'center' as CanvasTextAlign }));
  silk.push({ t: 'ESP32C3', x: 0, y: -5.5, size: 1.0, bold: true }, { t: 'SuperMini', x: 0, y: -6.8, size: 0.85 }, { t: 'BOOT', x: -3.2, y: 4.5, size: 0.6 }, { t: 'RST', x: 3.2, y: 4.5, size: 0.6 });
  const board = pcb(w, d, t, '#1d3f73', silk, pinHoles(l)); g.add(board);
  const top = new THREE.Group(); top.position.z = t; g.add(top);
  const usb = usbC(); usb.position.set(0, d / 2 - 7.35 / 2 + 0.6, 0); top.add(usb);   // USB-C 稍微伸出板边
  const ic = qfn(5, 0.85, ['ESP32-C3', 'FH4']); ic.position.set(0, -0.2, 0); top.add(ic);
  const ant = box(3.2, 1.6, 1.1, M.ceramic, 0, -d / 2 + 1.6, 0.55); top.add(ant);   // 陶瓷天线
  top.add(box(3.2, 1.6, 0.05, M.tin, 0, -d / 2 + 1.6, 1.12));
  const xtal = box(2.0, 1.6, 0.5, M.steel, 3.2, -2.6, 0.25); top.add(xtal);
  top.add(tact(-3.2, 3.0, 3, 'BOOT')); top.add(tact(3.2, 3.0, 3, 'RST'));
  top.add(led(-3.0, -3.6, M.ledRed)); top.add(led(3.0, -3.6, M.ledBlue));
  const ldo = soic(1.6, 2.9, 1.1, 3, [], 0.95); ldo.position.set(-3.6, -1.2, 0); ldo.rotation.z = Math.PI / 2; top.add(ldo);   // SOT-23-5 LDO
  for (const [x, y, r] of [[2.3, 2.6, 0], [2.3, -3.2, 90], [-2.4, 1.8, 0], [4.0, 0.2, 90], [-4.0, 1.0, 90]] as const) top.add(smd(1.6, 0.8, 0.45, mat('#7a6a50'), x, y, r));
  // 边缘半孔（城堡孔）
  for (const p of l.pins) { const c = cyl(0.55, t + 0.02, M.tin, 'z', 12); c.position.set(p.x, p.y, t / 2); g.add(c); }
  g.position.z = -h / 2;
  return g;
}
function devkit(l: LibPart) {
  const [w, d, h] = l.size; const t = 1.6; const g = new THREE.Group();
  const silk: Txt[] = l.pins.map(p => ({ t: p.id.replace('GPIO', 'D').replace('GND2', 'GND'), x: p.x + (p.x < 0 ? 2.4 : -2.4), y: p.y, size: 0.8 }));
  silk.push({ t: 'ESP32 DEVKIT V1', x: 0, y: -16, size: 1.3, bold: true }, { t: 'EN', x: -9, y: -22.5, size: 0.9 }, { t: 'BOOT', x: 9, y: -22.5, size: 0.9 });
  g.add(pcb(w, d, t, '#14202c', silk, pinHoles(l), { mount: [{ x: -w / 2 + 2, y: d / 2 - 2, r: 1.5 }, { x: w / 2 - 2, y: d / 2 - 2, r: 1.5 }, { x: -w / 2 + 2, y: -d / 2 + 2, r: 1.5 }, { x: w / 2 - 2, y: -d / 2 + 2, r: 1.5 }] }));
  const top = new THREE.Group(); top.position.z = t; g.add(top);
  // ESP-WROOM-32 模组：18 × 25.5 × 3.1，金属屏蔽罩 + PCB 天线
  const modTex = labelTexture(16, 17, '#c8c8cc', [{ t: 'ESP-WROOM-32', x: 0, y: 3, size: 1.4, color: '#333', bold: true }, { t: 'ESPRESSIF', x: 0, y: 0.6, size: 1.0, color: '#555' }, { t: 'FCC ID: 2AC7Z-ESPWROOM32', x: 0, y: -2, size: 0.7, color: '#555' }]);
  const mod = new THREE.Group(); mod.position.set(0, 7.5, 0); top.add(mod);
  mod.add(box(18, 25.5, 0.8, mat('#1a1a1a'), 0, 0, 0.4));
  const shield = new THREE.Mesh(new THREE.BoxGeometry(16, 17, 2.3), [M.steel, M.steel, M.steel, M.steel, new THREE.MeshStandardMaterial({ map: modTex, metalness: 0.7, roughness: 0.4 }), M.steel]);
  shield.position.set(0, -3.4, 0.8 + 1.15); mod.add(shield);
  const antTex = labelTexture(18, 6, '#1a1a1a', [], (c, k) => { c.strokeStyle = '#c8a24a'; c.lineWidth = 0.4 * k; c.beginPath(); let x = 1; c.moveTo(1 * k, 5 * k); for (let i = 0; i < 7; i++) { c.lineTo(x * k, 1 * k); x += 1.1; c.lineTo(x * k, 1 * k); c.lineTo(x * k, 5 * k); x += 1.1; c.lineTo(x * k, 5 * k); } c.stroke(); });
  const ant = new THREE.Mesh(new THREE.PlaneGeometry(18, 6), new THREE.MeshStandardMaterial({ map: antTex })); ant.position.set(0, 25.5 / 2 - 3, 0.81); mod.add(ant);
  const usb = box(7.5, 5.5, 2.7, M.steel, 0, -d / 2 + 2.5, 1.35); top.add(usb);   // micro-USB
  top.add(tact(-9, -21, 3.5, 'EN')); top.add(tact(9, -21, 3.5, 'BOOT'));
  const ams = soic(6.5, 3.5, 1.6, 0, ['AMS1117', '3.3']); ams.position.set(-6, -10, 0); top.add(ams); top.add(box(3, 1, 0.4, M.tin, -6, -12.2, 0.2));
  const cp = qfn(4, 0.9, ['CP2102']); cp.position.set(5, -11, 0); top.add(cp);
  top.add(led(-3, -18, M.ledRed)); top.add(led(3, -18, M.ledBlue));
  // 排针焊好在下面
  for (const sx of [-1, 1]) { const hd = header(15, 2.54, { up: 1.5, down: 6 }); hd.position.set(sx * 12.7, 0, 0); g.add(hd); }
  g.position.z = -h / 2; return g;
}
function drv8833(l: LibPart) {
  const [w, d, h] = l.size; const t = 1.2; const g = new THREE.Group();
  const silk: Txt[] = l.pins.map(p => ({ t: p.id, x: p.x + (p.x < 0 ? 2.3 : -2.3), y: p.y, size: 0.75 }));
  silk.push({ t: 'DRV8833', x: 0, y: d / 2 - 1.4, size: 0.9, bold: true });
  g.add(pcb(w, d, t, '#4a1f78', silk, pinHoles(l), { mount: [{ x: 0, y: -d / 2 + 2.2, r: 1.0 }] }));
  const top = new THREE.Group(); top.position.z = t; g.add(top);
  const ic = soic(4.4, 5.0, 1.0, 8, ['DRV8833', 'TI'], 0.65); ic.position.set(0, 1.5, 0); top.add(ic);   // HTSSOP-16
  for (const [x, y, r] of [[-1.8, -3.2, 90], [1.8, -3.2, 90], [0, -1.6, 0]] as const) top.add(smd(2.0, 1.25, 0.8, mat('#a8906a'), x, y, r));
  top.add(led(0, d / 2 - 3, M.ledRed));
  g.position.z = -h / 2; return g;
}
function l298n(l: LibPart) {
  const [w, d, h] = l.size; const t = 1.6; const g = new THREE.Group();
  const silk: Txt[] = l.pins.map(p => ({ t: p.id, x: p.x, y: p.y + (p.y > 0 ? -2.6 : 2.6), size: 1.0, rot: p.y > 10 ? 90 : 0 }));
  silk.push({ t: 'L298N', x: 0, y: -8, size: 1.6, bold: true }, { t: 'MOTOR A', x: -14, y: 13, size: 1.0 }, { t: 'MOTOR B', x: 14, y: 13, size: 1.0 }, { t: '5V-EN', x: 12, y: -13, size: 0.9 });
  g.add(pcb(w, d, t, '#b3261e', silk, l.pins.filter(p => /^(ENA|ENB|IN\d)$/.test(p.id)).map(p => ({ x: p.x, y: p.y })), { corner: 1.5, mount: [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => ({ x: sx * 18.5, y: sy * 18.5, r: 1.5 })) }));
  const top = new THREE.Group(); top.position.z = t; g.add(top);
  // 散热片（23 × 15 × 25，带鳍片）+ L298N 芯片 Multiwatt15
  const hs = new THREE.Group(); hs.position.set(0, 4, 0); top.add(hs);
  hs.add(box(23, 3, 25, M.black, 0, 4.5, 12.5));
  for (let i = 0; i < 7; i++) hs.add(box(1.2, 9, 25, M.black, -10.5 + i * 3.5, 0, 12.5));
  const chip = box(19.6, 4.5, 10, M.chip, 0, -6.5, 8); top.add(chip);
  const chipLabel = labelTexture(19.6, 10, '#1c1c1e', [{ t: 'L298N', x: 0, y: 1.5, size: 2, color: '#bbb', bold: true }, { t: 'ST', x: 0, y: -1.8, size: 1.5, color: '#999' }]);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(19.6, 10), new THREE.MeshStandardMaterial({ map: chipLabel })); face.rotation.x = Math.PI / 2; face.position.set(0, -8.76, 8); top.add(face);
  // 蓝色接线端子（2 + 2 + 3 位），带螺丝
  const term = (n: number, x: number, y: number, rot: number) => {
    const tg = new THREE.Group(); tg.position.set(x, y, 0); tg.rotation.z = rot;
    tg.add(box(n * 5.08, 7.5, 10, M.blueTerm, 0, 0, 5));
    for (let i = 0; i < n; i++) { const sc = cyl(1.4, 0.6, M.steel); sc.position.set((i - (n - 1) / 2) * 5.08, -1, 10.1); tg.add(sc); tg.add(box(2.2, 0.35, 0.3, M.black, (i - (n - 1) / 2) * 5.08, -1, 10.45)); tg.add(box(3.2, 1, 3, M.black, (i - (n - 1) / 2) * 5.08, 3.8, 4)); }
    top.add(tg);
  };
  term(2, -17.5, 1.5, Math.PI / 2); term(2, 17.5, 1.5, -Math.PI / 2); term(3, -1, -17.5, 0);
  // 两个 220µF 电解电容 + 78M05 稳压 + 跳线帽
  const c1 = ecap(3.2, 11, 0x1d2b4f, '220µF 35V'); c1.position.set(-13, -11, 0); top.add(c1);
  const c2 = ecap(3.2, 11, 0x1d2b4f, '220µF 35V'); c2.position.set(13, -8, 0); top.add(c2);
  const reg = soic(6.5, 6, 2.3, 0, ['78M05']); reg.position.set(8, -13, 0); top.add(reg);
  top.add(box(2.5, 5, 6, M.black, 12, -15.5, 3));
  const hd = header(6, 2.54, { up: 6, down: 1, dir: 'x' }); hd.position.set(0, 19, 0); top.add(hd);
  for (const x of [-6.35, 6.35]) top.add(box(2.4, 2.4, 6, M.black, x, 21.6, 3));   // ENA/ENB 旁边的 5V 跳线帽
  for (let i = 0; i < 8; i++) top.add(box(1.5, 3.3, 1.8, M.black, -9 + i * 2.5, 9.5, 0.9));   // 二极管
  g.position.z = -h / 2; return g;
}
function n20(l: LibPart) {
  // 沿 y 轴：+y 是输出轴，-y 是编码器。尺寸按 N20 标准：机身 Ø12（两边削平到 10），电机 15mm，齿轮箱 9mm，轴 Ø3 × 10（D 型 2.5）
  const [w, d, h] = l.size; const g = new THREE.Group();
  const y0 = -d / 2;
  const enc = 8, motor = 15, gb = 9, shaftL = (l as any).shaft?.len ?? 10;
  // 编码器 PCB + 磁环 + 6pin 座
  const pcbM = new THREE.Group(); pcbM.position.y = y0 + 1; g.add(pcbM);
  pcbM.add(box(w + 3, 1.2, h + 4, mat('#1f3a5f'), 0, 0, 1));
  const ring = cyl(4.5, 1.6, mat('#333'), 'y'); ring.position.y = 2.4; pcbM.add(ring);
  const hall = box(1.5, 0.8, 1.5, M.chip, 3.5, 1, 2.5); pcbM.add(hall);
  const con = box(9, 4.5, 3.5, mat('#f2f2ee'), 0, -2.6, h / 2 + 2); pcbM.add(con);
  // 机身（金属罐，侧面削平）
  const canShape = new THREE.Shape(); const R = 6;
  const a = Math.asin(5 / R);
  canShape.absarc(0, 0, R, -Math.PI / 2 + Math.acos(5 / R), Math.PI / 2 - Math.acos(5 / R), false);
  canShape.absarc(0, 0, R, Math.PI / 2 + Math.acos(5 / R), Math.PI * 1.5 - Math.acos(5 / R), false);
  void a;
  const can = new THREE.ExtrudeGeometry(canShape, { depth: motor, bevelEnabled: false, curveSegments: 24 });
  can.rotateZ(Math.PI / 2); can.rotateX(-Math.PI / 2); can.translate(0, y0 + enc, 0);
  const canM = new THREE.Mesh(can, M.steel); g.add(canM);
  // 后盖（黑色塑料端盖，电机两个焊片）
  const cap = box(10, 1.5, 10, M.plasticBlack, 0, y0 + enc + 0.75, 0); g.add(cap);
  for (const x of [-3, 3]) g.add(box(1.4, 2.5, 0.3, M.copper, x, y0 + enc - 0.6, -h / 2 + 2));
  // 齿轮箱：金色铜板 + 白钢夹板 + 齿轮层
  const gy = y0 + enc + motor;
  g.add(box(12, 1, 10, M.brass, 0, gy + 0.5, 0));
  for (let i = 0; i < 3; i++) { const gear = cyl(4.2 - i * 0.6, 1.4, M.brass, 'y', 20); gear.position.set(i % 2 ? 1.5 : -1.5, gy + 2 + i * 2.3, i % 2 ? -1 : 1); g.add(gear); }
  g.add(box(12, gb - 1, 0.6, M.steel, 0, gy + gb / 2 + 0.5, 4.7)); g.add(box(12, gb - 1, 0.6, M.steel, 0, gy + gb / 2 + 0.5, -4.7));
  g.add(box(12, 1, 10, M.brass, 0, gy + gb - 0.5, 0));
  for (const x of [-4.5, 4.5]) { const sc = cyl(0.8, 0.5, M.steel, 'y', 12); sc.position.set(x, gy + gb + 0.1, 0); g.add(sc); }   // M1.6 螺丝孔距 9mm
  // 输出轴：Ø3 D 型
  const shaft = new THREE.Shape(); shaft.absarc(0, 0, 1.5, Math.acos(1 / 1.5), Math.PI * 2 - Math.acos(1 / 1.5), false); shaft.lineTo(1, Math.sqrt(1.5 * 1.5 - 1));
  const sg = new THREE.ExtrudeGeometry(shaft, { depth: shaftL, bevelEnabled: false, curveSegments: 16 }); sg.rotateX(-Math.PI / 2); sg.translate(0, gy + gb, 0);
  g.add(new THREE.Mesh(sg, M.steel));
  const bush = cyl(2, 1, M.brass, 'y'); bush.position.y = gy + gb + 0.5; g.add(bush);
  // 6 根线（红 白 黑 蓝 绿 黄）
  const cols = ['红', '白', '黑', '蓝', '绿', '黄'].map(c => WIRE[c]);
  g.add(leads([0, y0 - 1.5, h / 2 + 2], [0, -1, 0], cols, 18, 1.25, 30, true));
  return g;
}
function m130(l: LibPart) {
  const [w, d, h] = l.size; const g = new THREE.Group();
  const s = new THREE.Shape(); const R = w / 2; const fl = h / 2;
  s.absarc(0, 0, R, -Math.PI / 2 + Math.acos(fl / R), Math.PI / 2 - Math.acos(fl / R), false);
  s.absarc(0, 0, R, Math.PI / 2 + Math.acos(fl / R), Math.PI * 1.5 - Math.acos(fl / R), false);
  const geo = new THREE.ExtrudeGeometry(s, { depth: d - 3, bevelEnabled: false, curveSegments: 24 }); geo.rotateZ(Math.PI / 2); geo.rotateX(-Math.PI / 2); geo.translate(0, -d / 2 + 3, 0);
  g.add(new THREE.Mesh(geo, M.steel));
  g.add(box(w * 0.8, 3, h * 0.9, mat('#e8e8e2'), 0, -d / 2 + 1.5, 0));
  for (const x of [-3, 3]) g.add(box(1.6, 3, 0.3, M.copper, x, -d / 2 - 0.5, h / 2 - 2));
  const sh = cyl(1, 8, M.steel, 'y'); sh.position.y = d / 2 + 4; g.add(sh);
  const bush = cyl(3, 1.5, M.brass, 'y'); bush.position.y = d / 2 + 0.2; g.add(bush);
  return g;
}
function servo(l: LibPart) {
  // 3.7g 舵机：机身 20.2 × 8.5 × 18.2，两边固定耳（带孔），顶部输出齿轴 + 舵臂，3 根线（棕 红 黄）
  const [w, d, h] = l.size; const g = new THREE.Group();
  const body = box(w, d - 0, h - 4, mat('#222226', { roughness: 0.4 }), 0, 0, -2); g.add(body);
  const tex = labelTexture(d, h - 4, '#222226', [{ t: 'MITOOT', x: 0, y: 2, size: 1.6, color: '#ddd', bold: true, rot: 0 }, { t: '3.7g', x: 0, y: -1, size: 1.4, color: '#aaa' }]);
  const side = new THREE.Mesh(new THREE.PlaneGeometry(d, h - 4), new THREE.MeshStandardMaterial({ map: tex })); side.rotation.set(Math.PI / 2, -Math.PI / 2, 0); side.position.set(w / 2 + 0.01, 0, -2); g.add(side);
  // 耳朵（沿 y 方向伸出 4.5mm，带 Ø1.4 孔）
  for (const sy of [-1, 1]) { const ear = new THREE.Shape(); ear.moveTo(-w / 2, 0); ear.lineTo(w / 2, 0); ear.lineTo(w / 2, 4.5); ear.lineTo(-w / 2, 4.5); const hole = new THREE.Path(); hole.absarc(0, 2.6, 0.7, 0, Math.PI * 2, true); ear.holes.push(hole);
    const eg = new THREE.ExtrudeGeometry(ear, { depth: 1, bevelEnabled: false }); const em = new THREE.Mesh(eg, mat('#222226')); em.position.set(0, sy * d / 2, h / 2 - 7); if (sy < 0) em.rotation.z = Math.PI; g.add(em); }
  // 顶盖 + 输出轴 + 舵臂
  g.add(box(w - 0.4, d - 0.4, 2, mat('#2a2a2e'), 0, 0, h / 2 - 3));
  const oy = d / 2 - 5;   // 输出轴偏在一头
  const boss = cyl(2.6, 1.5, mat('#2a2a2e')); boss.position.set(0, oy, h / 2 - 1.2); g.add(boss);
  const spline = cyl(1.2, 1.4, M.white); spline.position.set(0, oy, h / 2 - 0.2); g.add(spline);
  const horn = box(2.2, 13, 1, M.white, 0, oy - 4.5, h / 2 + 0.3); g.add(horn);
  for (let i = 0; i < 4; i++) { const ho = cyl(0.35, 1.05, M.black, 'z', 8); ho.position.set(0, oy - 2 - i * 2, h / 2 + 0.3); g.add(ho); }
  g.add(leads([0, -d / 2, -h / 2 + 3], [0, -1, 0], [WIRE['棕'], WIRE['红'], WIRE['黄']], 20, 0.95, 30, true));
  return g;
}
function lipo(l: LibPart) {
  // 软包电池：热缩膜 + 标签 + 引线 + BT2.0 插头
  const [w, d, h] = l.size; const g = new THREE.Group();
  const r = Math.min(h / 2, 2.5);
  const s = new THREE.Shape(); s.moveTo(-w / 2 + r, -h / 2); s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); s.lineTo(-w / 2 + r, h / 2); s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const geo = new THREE.ExtrudeGeometry(s, { depth: d - 3, bevelEnabled: false, curveSegments: 8 }); geo.rotateX(-Math.PI / 2); geo.translate(0, -d / 2 + 3, 0);
  const isLava = l.id.includes('lava');
  // 标签画在顶面：画布横向 = 电池宽，纵向 = 电池长，字旋转 90°
  const tex = labelTexture(w, d, isLava ? '#e8a500' : '#2c5', [
    { t: isLava ? 'LAVA II' : '2S LiPo', x: -w * 0.12, y: -d * 0.12, size: w * 0.3, color: '#111', bold: true, rot: -90 },
    { t: isLava ? '1S 580mAh 95C  HV 4.35V' : '7.4V', x: w * 0.25, y: -d * 0.05, size: w * 0.13, color: '#111', rot: -90 },
    { t: isLava ? 'BETAFPV' : '', x: 0, y: d * 0.3, size: w * 0.2, color: '#111', bold: true, rot: -90 }]);
  const body = new THREE.Mesh(geo, [mat(isLava ? '#c88d00' : '#1a4', { roughness: 0.3 }), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3 })]);   // 0 = 两端，1 = 四周（顶面贴标签）
  // ExtrudeGeometry 侧面 UV：重新按顶面投影
  const pos = geo.attributes.position as THREE.BufferAttribute; const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + d / 2) / d);
  g.add(body);
  // 引线（红黑）+ BT2.0 插头
  g.add(box(w * 0.8, 3, h * 0.7, mat('#ddd', { roughness: 0.3, transparent: true, opacity: 0.85 }), 0, -d / 2 + 1.5, 0));
  for (const [x, c] of [[-2.5, WIRE['红']], [2.5, WIRE['黑']]] as const) g.add(wireTube([new THREE.Vector3(x, -d / 2, 0), new THREE.Vector3(x, -d / 2 - 6, 0), new THREE.Vector3(x * 0.6, -d / 2 - 14, 0.5), new THREE.Vector3(x * 0.4, -d / 2 - 20, 0.5)], c, 22));
  const bt = new THREE.Group(); bt.position.set(0, -d / 2 - 24, 0.5); g.add(bt);
  bt.add(box(6.6, 8, 4.4, mat('#e8e2d0', { roughness: 0.5 })));
  bt.add(box(5.5, 0.6, 3.2, mat('#d33', { roughness: 0.4 }), 0, -4.1, 0));
  return g;
}
function mpu6050(l: LibPart) {
  const [w, d, h] = l.size; const t = 1.6; const g = new THREE.Group();
  const silk: Txt[] = l.pins.map(p => ({ t: p.id.replace('AD0', 'AD0'), x: p.x, y: p.y + 2.2, size: 0.7, rot: 90 }));
  silk.push({ t: 'GY-521', x: 2, y: 3.5, size: 1.2, bold: true }, { t: 'X→  Y↑', x: -5, y: 3.5, size: 0.8 });
  g.add(pcb(w, d, t, '#1d3f8f', silk, pinHoles(l), { mount: [{ x: -w / 2 + 2.2, y: d / 2 - 2.2, r: 1.5 }, { x: w / 2 - 2.2, y: d / 2 - 2.2, r: 1.5 }] }));
  const top = new THREE.Group(); top.position.z = t; g.add(top);
  const ic = qfn(4, 0.9, ['MPU-6050'], 6); ic.position.set(0, 1, 0); top.add(ic);
  const ldo = soic(1.6, 2.9, 1.1, 3, [], 0.95); ldo.position.set(-5.5, 0.5, 0); top.add(ldo);
  for (const [x, y, r] of [[4, 2, 90], [4, -0.5, 90], [-3, -1.8, 0], [2.6, -2.2, 0], [-7.2, 2.8, 0]] as const) top.add(smd(1.6, 0.8, 0.45, mat('#7a6a50'), x, y, r));
  top.add(led(6.5, 3, M.ledRed));
  g.position.z = -h / 2; return g;
}
function tx06(l: LibPart) {
  // 一体摄像头：方形机身 + 镜头筒 + 镜片 + 铜管天线（35mm）+ 2pin 电源线
  const [w, d, h] = l.size; const g = new THREE.Group();
  g.add(box(w, d - 3, h, mat('#222226', { roughness: 0.4 }), 0, -1.5, 0));
  const lens = cyl(4.5, 4, mat('#111'), 'y', 32); lens.position.set(0, d / 2 - 2, 1); g.add(lens);
  const glass = new THREE.Mesh(new THREE.CircleGeometry(3.3, 32), M.glass); glass.rotation.x = -Math.PI / 2; glass.position.set(0, d / 2 + 0.01, 1); glass.rotation.set(-Math.PI / 2, 0, 0); g.add(glass);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.35, 8, 32), M.steel); ring.position.set(0, d / 2, 1); ring.rotation.x = Math.PI / 2; g.add(ring);
  const vtx = labelTexture(w, d - 3, '#1a1a1a', [{ t: 'TX06', x: 0, y: 1, size: 2, color: '#ddd', bold: true }, { t: '5.8G 48CH', x: 0, y: -2, size: 1, color: '#aaa' }]);
  const topL = new THREE.Mesh(new THREE.PlaneGeometry(w, d - 3), new THREE.MeshStandardMaterial({ map: vtx })); topL.position.set(0, -1.5, h / 2 + 0.01); g.add(topL);
  const ant = (l as any).antenna || { len: 35, d: 4.2 };
  const a = cyl(ant.d / 2, ant.len, M.brass, 'z', 16); a.position.set(-w / 2 + 2.5, -d / 2 + 2.5, h / 2 + ant.len / 2); g.add(a);
  const shrink = cyl(ant.d / 2 + 0.3, 8, mat('#111'), 'z', 16); shrink.position.set(-w / 2 + 2.5, -d / 2 + 2.5, h / 2 + 4); g.add(shrink);
  g.add(leads([2, -d / 2, -h / 2 + 2], [0, -1, 0], [WIRE['红'], WIRE['黑']], 15, 1.2, 28, true));
  return g;
}
function buzzer(l: LibPart) {
  const [w, , h] = l.size; const g = new THREE.Group();
  const b = cyl(w / 2, h, M.black, 'z', 32); g.add(b);
  const top = new THREE.Mesh(new THREE.RingGeometry(0.8, w / 2, 32), mat('#0c0c0c')); top.position.z = h / 2 + 0.01; g.add(top);
  const tex = labelTexture(w, w, '#00000000', [{ t: '+', x: -2.5, y: 2.5, size: 2, color: '#fff' }]);
  const lbl = new THREE.Mesh(new THREE.CircleGeometry(w / 2, 32), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); lbl.position.z = h / 2 + 0.02; g.add(lbl);
  for (const x of [-3, 3]) { const leg = cyl(0.3, 4, M.tin, 'z', 8); leg.position.set(x, 0, -h / 2 - 2); g.add(leg); }
  return g;
}
function ecapPart(l: LibPart) {
  const [w, , h] = l.size; const g = ecap(w / 2, h, 0x1d2b4f, '470µF 16V');
  g.position.z = -h / 2;
  for (const x of [-1.75, 1.75]) { const leg = cyl(0.3, 3, M.tin, 'z', 8); leg.position.set(x, 0, -1.5); g.add(leg); }
  const wrap = new THREE.Group(); wrap.add(g); return wrap;
}
function divider(l: LibPart) {
  // 两个 1/4W 色环电阻
  const [, d, h] = l.size; const g = new THREE.Group();
  for (const [x, bands] of [[-1.5, ['#6b3d1e', '#111', '#f2c200']], [1.5, ['#6b3d1e', '#111', '#f2c200']]] as const) {
    const r = cyl(0.9, 6, mat('#d8c39a'), 'y', 16); r.position.set(x, 0, 0); g.add(r);
    bands.forEach((c, i) => { const b = cyl(0.95, 0.5, mat(c), 'y', 16); b.position.set(x, -1.8 + i * 1.1, 0); g.add(b); });
    const gb = cyl(0.95, 0.5, M.gold, 'y', 16); gb.position.set(x, 2, 0); g.add(gb);
    for (const sy of [-1, 1]) { const leg = cyl(0.25, 2, M.tin, 'y', 8); leg.position.set(x, sy * 4, 0); g.add(leg); }
  }
  void d; void h;
  return g;
}
function switchPart(l: LibPart) {
  const [w, d, h] = l.size; const g = new THREE.Group();
  g.add(box(w, d, h, M.steel, 0, 0, 0));
  g.add(box(1.5, 1.5, 3, M.plasticBlack, -0.8, 0, h / 2 + 1.5));
  for (const x of [-2.54, 0, 2.54]) { const leg = box(0.5, 0.3, 3, M.tin, x, 0, -h / 2 - 1.5); g.add(leg); }
  return g;
}
function wheel(l: LibPart) {
  // 轮胎（带胎纹）+ 轮毂（5 辐）——轴向 x
  const [w, d] = l.size; const R = d / 2; const g = new THREE.Group();
  const tread = new THREE.CylinderGeometry(R, R, w, 48, 1, true); tread.rotateZ(Math.PI / 2);
  const tTex = labelTexture(48, 10, '#1b1b1b', [], (c, k) => { c.fillStyle = '#0e0e0e'; for (let i = 0; i < 48; i += 2) { c.fillRect(i * k, 0, k, 4 * k); c.fillRect((i + 1) * k, 6 * k, k, 4 * k); } });
  g.add(new THREE.Mesh(tread, new THREE.MeshStandardMaterial({ map: tTex, roughness: 0.95 })));
  for (const sx of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.RingGeometry(R * 0.62, R, 48), M.rubber); side.rotation.y = sx * Math.PI / 2; side.position.x = sx * w / 2; g.add(side);
    const hub = new THREE.Mesh(new THREE.CircleGeometry(R * 0.62, 32), M.alu); hub.rotation.y = sx * Math.PI / 2; hub.position.x = sx * (w / 2 - 0.6); g.add(hub);
    for (let i = 0; i < 5; i++) { const sp = box(0.6, R * 1.1, R * 0.16, mat('#5c6068', { metalness: 0.7 }), sx * (w / 2 - 0.4), 0, 0); sp.rotation.x = i * Math.PI * 2 / 5; sp.geometry.translate(0, R * 0.3, 0); g.add(sp); }
    const nut = cyl(R * 0.14, 1, M.steel, 'x', 6); nut.position.x = sx * (w / 2 - 0.2); g.add(nut);
  }
  return g;
}

const BUILDERS: Record<string, (l: LibPart) => THREE.Group> = {
  c3: esp32c3, devkit, drv8833, l298n, n20, m130, servo, lipo, mpu6050, tx06, buzzer, ecap: ecapPart, divider, switch: switchPart, wheel,
};
export function hasModel(l: LibPart) { return !!BUILDERS[(l as any).model]; }
export function buildModel(l: LibPart): THREE.Group | null {
  const f = BUILDERS[(l as any).model]; if (!f) return null;
  try { return f(l); } catch (e) { console.error('模型出错', l.id, e); return null; }
}
