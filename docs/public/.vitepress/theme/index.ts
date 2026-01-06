import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
// ORDEM IMPORTANTE: tailwind.css por último para variáveis shadcn terem precedência
import './custom.css'; // 1º - variáveis VitePress (--vp-*)
import './tailwind.css'; // 2º - importa main.css com variáveis shadcn (--primary, --border, etc)

// Layout customizado
import DocsLayout from '../core/DocsLayout.vue';

// Componentes globais para docs
import { CodePreview } from '@components/layout';
import { CorpButton } from '@components/ui/corpbutton';
import { CorpInput } from '@components/ui/input';
import { CorpIcon } from '@components/ui/icon';

// i18n centralizado (igual playground)
import { i18n } from '@locales';

export default {
  extends: DefaultTheme,
  // Layout customizado que fornece contexto (form, rules, loading)
  Layout: DocsLayout,
  enhanceApp({ app }) {
    // ============== COMPONENTES GLOBAIS ==============
    // Registra componentes para uso direto nos .md (sem imports)
    app.component('CodePreview', CodePreview);
    app.component('CorpButton', CorpButton);
    app.component('CorpInput', CorpInput);
    app.component('CorpIcon', CorpIcon);

    // ============== PLUGINS ==============
    app.use(i18n);
  },
} satisfies Theme;
