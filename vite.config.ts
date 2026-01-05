import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Playground como root do dev server
  root: 'playground',

  // Dev server
  server: {
    port: 2223,
    host: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@playground': fileURLToPath(new URL('./playground', import.meta.url)),
      '@docs': fileURLToPath(new URL('./docs', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@base': fileURLToPath(new URL('./src/components/base', import.meta.url)),
      '@shadcn': fileURLToPath(new URL('./src/components/base/shadcn', import.meta.url)),
      '@corp': fileURLToPath(new URL('./src/components/corp', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },

  // Build em library mode
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CorpComponents',
      fileName: 'corp-components',
    },
    rollupOptions: {
      // Dependências externas (não incluir no bundle)
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
