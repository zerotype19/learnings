import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  ssr: { target: 'webworker', noExternal: true },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    ssr: 'src/server/worker.tsx', outDir: 'dist', emptyOutDir: false,
    rollupOptions: { output: { entryFileNames: '_worker.js', inlineDynamicImports: true } }
  }
});
