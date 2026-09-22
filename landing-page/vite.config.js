import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    port: 3000,
    open: true
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  }
});