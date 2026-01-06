import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { getAliases, config } from './src/config';

// https://vite.dev/config/
export default defineConfig(async () => {
  const aliases = await getAliases(import.meta.url);

  return {
    plugins: [vue()],

    // Playground como root do dev server
    root: 'playground',

    // Dev server
    server: {
      port: config.devServer.playgroundPort,
      host: true,
    },

    resolve: {
      alias: aliases,
    },

    // Build em library mode
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: config.build.libName,
        fileName: config.build.libFileName,
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
  };
});
