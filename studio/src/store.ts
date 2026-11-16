import { create } from 'zustand';
import type { Status, Job } from './types';

type S = {
  connected: boolean;
  st: Status | null;
  logs: Record<string, string[]>;        // jobId -> lines
  serial: Record<string, string[]>;      // port -> lines
  toast: { text: string; bad?: boolean } | null;
  set: (p: Partial<S>) => void;
};
export const useStore = create<S>(set => ({ connected: false, st: null, logs: {}, serial: {}, toast: null, set: p => set(p) }));

export function upsertJob(j: Job) {
  const s = useStore.getState(); if (!s.st) return;
  const jobs = s.st.jobs.filter(x => x.id !== j.id).concat(j).slice(-50);
  s.set({ st: { ...s.st, jobs } });
}
export function toast(text: string, bad = false) {
  useStore.getState().set({ toast: { text, bad } });
  clearTimeout((toast as any)._t); (toast as any)._t = setTimeout(() => useStore.getState().set({ toast: null }), bad ? 6000 : 3000);
}
