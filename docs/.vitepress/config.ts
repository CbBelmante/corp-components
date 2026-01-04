import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Corp Components',
  description: 'Biblioteca de componentes Vue 3 para projetos corporativos',
  
  themeConfig: {
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
      { icon: 'github', link: 'https://github.com/user/corp-components' }
    ]
  }
})
