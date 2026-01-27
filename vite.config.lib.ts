import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { getAliases, config } from './src/config';

// https://vite.dev/config/
// Library build configuration
export default defineConfig(async () => {
  const aliases = await getAliases(import.meta.url);

  return {
    plugins: [vue()],

    resolve: {
      alias: aliases,
    },

    // Build em library mode
    build: {
      outDir: config.build.outDir,
      minify: false, // Desabilitar minificação - evita bugs de símbolos duplicados
      emptyOutDir: true,
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
