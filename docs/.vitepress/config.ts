import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  title: 'Corp Components',
  description: 'Biblioteca de componentes Vue 3 para projetos corporativos',

  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
        '@docs': fileURLToPath(new URL('../../docs', import.meta.url)),
        '@assets': fileURLToPath(new URL('../../src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('../../src/components', import.meta.url))
      }
    }
  },
  
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Buscar',
            buttonAriaLabel: 'Buscar'
          },
          modal: {
            noResultsText: 'Nenhum resultado para',
            resetButtonTitle: 'Limpar busca',
            footer: {
              selectText: 'selecionar',
              navigateText: 'navegar',
              closeText: 'fechar'
            }
          }
        }
      }
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Componentes', link: '/components/button' },
    ],

    sidebar: [
      {
        text: 'Introducao',
        items: [
          { text: 'Instalacao', link: '/getting-started' },
        ]
      },
      {
        text: 'UI Components',
        items: [
          { text: 'Button', link: '/components/button' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CbBelmante/corp-components' }
    ]
  }
})
