import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Important for Electron relative paths
  root: path.join(__dirname, 'src/ui'),
  build: {
    outDir: path.join(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  }
});
