import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 开发：npm run dev（5173，代理到 127.0.0.1:8090）；正式：npm run build → dist/，由 admin.js 提供
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { '/api': 'http://127.0.0.1:8090', '/files': 'http://127.0.0.1:8090', '/admin': { target: 'ws://127.0.0.1:8090', ws: true } } },
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 1500 },
});
