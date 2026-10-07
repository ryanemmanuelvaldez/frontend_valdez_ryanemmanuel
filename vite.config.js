import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      '/index.php': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: false,
      },
    },
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        admin: resolve(import.meta.dirname, 'index.html'),
        account: resolve(import.meta.dirname, 'account/index.html'),
      },
    },
  },
});
