import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
// ORDEM IMPORTANTE: tailwind.css por último para variáveis shadcn terem precedência
import './custom.css'    // 1º - variáveis VitePress (--vp-*)
import './tailwind.css'  // 2º - importa main.css com variáveis shadcn (--primary, --border, etc)

// Componentes globais para docs
import CodePreview from './components/CodePreview.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview)
  }
} satisfies Theme
