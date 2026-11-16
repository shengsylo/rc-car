import * as THREE from 'three';
import type { Doc, Lib } from './model';
import { partBox } from './geom';
import type { Issue } from './erc';

// 穿模：两个零件包围盒重叠超过 0.5mm；超出车壳；挡到轮子活动范围
export function collisions(doc: Doc, lib: Lib): Issue[] {
  const I: Issue[] = [];
  const boxes = doc.parts.filter(p => lib[p.lib]).map(p => ({ p, b: partBox(p, lib[p.lib]).expandByScalar(-0.25), k: lib[p.lib].kind }));
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const A = boxes[i], B = boxes[j];
    if (A.b.intersectsBox(B.b)) I.push({ level: 'warn', text: `${A.p.label} 和 ${B.p.label} 撞在一起（3D）`, parts: [A.p.id, B.p.id] });
  }
  const e = doc.enclosure;
  const shell = new THREE.Box3(new THREE.Vector3(-e.size[0] / 2, -e.size[1] / 2, 0), new THREE.Vector3(e.size[0] / 2, e.size[1] / 2, e.size[2]));
  for (const { p, b, k } of boxes) {
    if (k === 'wheel') continue;
    if (!shell.containsBox(b)) I.push({ level: 'warn', text: `${p.label} 超出车壳`, parts: [p.id] });
    if (b.min.z < e.floor - 0.3) I.push({ level: 'warn', text: `${p.label} 低过底盘（离地 ${e.floor}mm）`, parts: [p.id] });
    for (const ko of e.keepOut) {
      const kb = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(...ko.c), new THREE.Vector3(...ko.s));
      if (kb.intersectsBox(b)) I.push({ level: 'warn', text: `${p.label} 挡到「${ko.name}」`, parts: [p.id] });
    }
  }
  return I;
}
