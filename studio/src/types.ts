export type Car = { id: number; online: boolean; fw: string; ip: string; soc?: string; chip?: string; busy?: string | null; driver?: number | null; driverName?: string | null; fwAvail?: string | null; rssi?: number; batt?: number };
export type Port = { address: string; label: string; vid: string; pid: string; board: string; fqbn: string; guess: string };
export type Target = { name: string; fqbn: string; soc: string; driver: string };
export type Build = { id: string; target: string; fqbn: string; version: string; created: number; note: string; files: Record<string, { size: number; sha256: string }> };
export type Job = { id: string; kind: string; title: string; state: 'running' | 'done' | 'failed' | 'cancelled'; pct: number; started: number; ended: number | null; error: string | null; result: any };
export type Settings = { wifi: Record<string, { ssid: string; pass: string; len: number }>; wifiDefault: string; host: string; ip: string; otaPassword: boolean };
export type ProjectInfo = { id: string; name: string; parts: number; wires: number; updated: number };
export type Status = {
  cars: Car[]; ports: Port[]; portsError: string | null; serialOk: boolean; monitors: string[];
  targets: Record<string, Target>; builds: Build[]; jobs: Job[]; version: string; settings: Settings;
  projects: ProjectInfo[]; driveUrl: string | null; adminUrl: string | null;
};
