import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: ['zepplinium.com', 'localhost', 'your-other-allowed-hosts.com'],
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['vue'],
  },
});
