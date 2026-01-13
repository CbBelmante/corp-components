import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
// ORDEM IMPORTANTE: tailwind.css por último para variáveis shadcn terem precedência
import './custom.css'; // 1º - variáveis VitePress (--vp-*)
import './tailwind.css'; // 2º - importa main.css com variáveis shadcn (--primary, --border, etc)

// Layout customizado
import DocsLayout from '../core/DocsLayout.vue';

// Componentes globais para docs
import { CorpCode } from '@components/layout';
import { CorpBadge } from '@components/ui/badge';
import { CorpButton } from '@components/ui/button';
import { CorpCheckbox } from '@components/ui/checkbox';
import { CorpIcon } from '@components/ui/icon';
import { CorpInput } from '@components/ui/input';
import { CorpProgress } from '@components/ui/progress';
import { CorpRadioGroup, CorpRadioGroupItem } from '@components/ui/radio-group';
import { CorpSelect } from '@components/ui/select';
import { CorpSwitch } from '@components/ui/switch';
import { CorpTextarea } from '@components/ui/textarea';

// i18n centralizado (igual playground)
import { i18n } from '@locales';

export default {
  extends: DefaultTheme,
  // Layout customizado que fornece contexto (form, rules, loading)
  Layout: DocsLayout,
  enhanceApp({ app }) {
    // ============== COMPONENTES GLOBAIS ==============
    // Registra componentes para uso direto nos .md (sem imports)
    app.component('CorpCode', CorpCode);
    app.component('CodePreview', CorpCode); // Alias para compatibilidade
    app.component('CorpBadge', CorpBadge);
    app.component('CorpButton', CorpButton);
    app.component('CorpCheckbox', CorpCheckbox);
    app.component('CorpIcon', CorpIcon);
    app.component('CorpInput', CorpInput);
    app.component('CorpProgress', CorpProgress);
    app.component('CorpRadioGroup', CorpRadioGroup);
    app.component('CorpRadioGroupItem', CorpRadioGroupItem);
    app.component('CorpSelect', CorpSelect);
    app.component('CorpSwitch', CorpSwitch);
    app.component('CorpTextarea', CorpTextarea);

    // ============== PLUGINS ==============
    app.use(i18n);
  },
} satisfies Theme;
