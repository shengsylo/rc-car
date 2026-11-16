import * as THREE from 'three';
import type { Part, LibPart, Vec3, Doc, Lib } from './model';

const D = Math.PI / 180;
export function partMatrix(p: Part): THREE.Matrix4 {
  const m = new THREE.Matrix4();
  m.compose(new THREE.Vector3(...p.pose.p), new THREE.Quaternion().setFromEuler(new THREE.Euler(p.pose.r[0] * D, p.pose.r[1] * D, p.pose.r[2] * D, 'ZYX')), new THREE.Vector3(1, 1, 1));
  return m;
}
// 针脚在零件顶面（局部 z = 高/2）
export function pinLocal(lib: LibPart, pinId: string): THREE.Vector3 | null {
  const pin = lib.pins.find(x => x.id === pinId); if (!pin) return null;
  // 针脚高度：pin.z（从底部量）> lib.pinZ > 顶面
  const z = (pin as any).z != null ? -lib.size[2] / 2 + (pin as any).z : (lib as any).pinZ != null ? -lib.size[2] / 2 + (lib as any).pinZ : lib.size[2] / 2;
  return new THREE.Vector3(pin.x, pin.y, z);
}
export function pinWorld(doc: Doc, lib: Lib, partId: string, pinId: string): Vec3 | null {
  const p = doc.parts.find(x => x.id === partId); if (!p) return null;
  const l = lib[p.lib]; if (!l) return null;
  const v = pinLocal(l, pinId); if (!v) return null;
  v.applyMatrix4(partMatrix(p));
  return [v.x, v.y, v.z];
}
// 世界坐标的包围盒（旋转后的 AABB）
export function partBox(p: Part, l: LibPart): THREE.Box3 {
  const b = new THREE.Box3(new THREE.Vector3(-l.size[0] / 2, -l.size[1] / 2, -l.size[2] / 2), new THREE.Vector3(l.size[0] / 2, l.size[1] / 2, l.size[2] / 2));
  return b.applyMatrix4(partMatrix(p));
}
// 导线长度：针 A → 拐点（在针的平均高度）→ 针 B，再加 15% 余量（走线不会是直线）
export function wireLength(doc: Doc, lib: Lib, w: Doc['wires'][number]): number | null {
  const a = pinWorld(doc, lib, w.a.part, w.a.pin), b = pinWorld(doc, lib, w.b.part, w.b.pin);
  if (!a || !b) return null;
  const z = (a[2] + b[2]) / 2;
  const pts: Vec3[] = [a, ...w.pts.map(q => [q[0], q[1], z] as Vec3), b];
  let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]);
  return L;
}
