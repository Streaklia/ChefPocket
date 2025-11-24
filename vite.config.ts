import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: './',
  define: {
    // This prevents the app from crashing on mobile when libraries check for process.env
    'process.env': {} 
  }
});