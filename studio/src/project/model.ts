// 项目数据模型（和 lib/projects.js / PLATFORM_DESIGN.md 一致）
export type Vec3 = [number, number, number];
export type PinDef = { id: string; x: number; y: number; type: string; v?: [number, number]; gpio?: number; caps?: string[]; need?: string[]; fw?: string; strap?: string; note?: string; maxmA?: number; wire?: string; ch?: string };
export type LibPart = { id: string; name: string; kind: string; size: Vec3; shape: 'box' | 'cyl' | 'motor' | 'wheel'; color: string; pins: PinDef[]; soc?: string; target?: string; driver?: number; drawmA?: number; stallA?: number; maxA?: number; verified?: boolean; note?: string; price?: string };
export type Part = { id: string; lib: string; label: string; pose: { p: Vec3; r: Vec3 } };
export type End = { part: string; pin: string };
export type Wire = { id: string; a: End; b: End; color: string; pts: [number, number][] };
export type Joint = { id: string; part: string; kind: 'yaw' | 'spin' | 'horn'; channel: 'steer' | 'throttle' };
export type Doc = {
  schema: number; name: string; units: 'mm'; notes?: string;
  enclosure: { size: Vec3; floor: number; keepOut: { name: string; c: Vec3; s: Vec3 }[] };
  parts: Part[]; wires: Wire[];
  rig: { steerMaxDeg: number; joints: Joint[] };
  anim: { duration: number; channels: Record<'steer' | 'throttle', [number, number][]> };
  firmware: { targets: { target: string; mcu: string }[] };
};
export type Lib = Record<string, LibPart>;
