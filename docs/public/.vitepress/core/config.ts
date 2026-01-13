/**
 * 📝 VitePress Configuration
 *
 * Configuração centralizada do VitePress (documentação).
 * Localização: /core para melhor organização (configurações centralizadas)
 */

import { defineConfig } from 'vitepress';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { getAliases } from '../../../../src/config';
import { corpCodePlugin } from './corpCodePlugin';

export default defineConfig(async () => {
  const aliases = await getAliases(new URL('../../../../', import.meta.url));

  return {
    title: 'Corp Components',
    description: 'Biblioteca de componentes Vue 3 para projetos corporativos',

    markdown: {
      config: (md: any) => {
        md.use(corpCodePlugin);
      },
    },

    vite: {
      css: {
        postcss: {
          plugins: [tailwindcss(), autoprefixer()],
        },
      },
      resolve: {
        alias: aliases,
      },
    },

    themeConfig: {
      outline: {
        level: [2, 3],
        label: 'Nesta página',
      },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: 'Buscar',
              buttonAriaLabel: 'Buscar',
            },
            modal: {
              noResultsText: 'Nenhum resultado para',
              resetButtonTitle: 'Limpar busca',
              footer: {
                selectText: 'selecionar',
                navigateText: 'navegar',
                closeText: 'fechar',
              },
            },
          },
        },
      },

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Componentes', link: '/components/button' },
      ],

      sidebar: [
        {
          text: 'Introducao',
          items: [{ text: 'Instalacao', link: '/gettingStarted' }],
        },
        {
          text: 'UI Components',
          items: [
            { text: 'Badge', link: '/components/badge' },
            { text: 'Button', link: '/components/button' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Icon', link: '/components/icon' },
            { text: 'Input', link: '/components/input' },
            { text: 'Radio Group', link: '/components/radio-group' },
            { text: 'Select', link: '/components/select' },
            { text: 'Switch', link: '/components/switch' },
          ],
        },
      ],

      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/CbBelmante/corp-components',
        },
      ],
    },
  };
});
