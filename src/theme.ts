/**
 * 🎨 THEME SYSTEM - Fonte Única de Verdade
 *
 * Este arquivo define TODAS as cores do sistema.
 * Scripts geram automaticamente:
 * - src/generated/theme.css (formato HEX legível)
 * - src/generated/tailwind.css (formato HSL para Tailwind)
 * - src/generated/themeMetadata.ts (mapeamento para CorpColorUtils)
 *
 * Para adicionar uma nova cor:
 * 1. Adicione aqui com light, dark e type
 * 2. Rode: bun run generateTheme
 * 3. Pronto! ✅
 */

/**
 * Tipos de geração da cor CSS (FONTE ÚNICA - sem magic strings!)
 *
 * - BOTH: Gera em AMBOS arquivos (HEX no theme.css + HSL no tailwind.css)
 *         → Suporta uso direto E opacity modifiers do Tailwind (bg-primary/50)
 *         → Use para cores principais usadas em classes Tailwind
 *
 * - ONLY_THEME: Gera APENAS no theme.css (formato HEX)
 *               → Mantém formato original, sem conversão HSL
 *               → Use para cores específicas, overlays, shadows
 *               → NÃO suporta opacity modifiers do Tailwind
 *
 * - ONLY_TAILWIND: (FUTURO) Gera APENAS no tailwind.css (formato HSL)
 *                  → Reservado para uso futuro
 */
export const THEME_COLOR_TYPES = {
  BOTH: 'both',
  ONLY_THEME: 'onlyTheme',
  ONLY_TAILWIND: 'onlyTailwind',
} as const;

/**
 * Type derivado do objeto (type-safe, sem magic strings!)
 */
export type ThemeColorType =
  (typeof THEME_COLOR_TYPES)[keyof typeof THEME_COLOR_TYPES];

export interface ColorDefinition {
  /** Cor no modo light (HEX, RGBA, ou keyword CSS) */
  light: string;
  /** Cor no modo dark (HEX, RGBA, ou keyword CSS) */
  dark: string;
  /** Onde a cor será gerada (both, onlyTheme, onlyTailwind) */
  type: ThemeColorType;
}

export const themeDefinition = {
  // ==================== PRIMARY PALETTE ====================
  primary: { light: '#FF7133', dark: '#FF7133', type: THEME_COLOR_TYPES.BOTH },
  'primary-foreground': {
    light: '#ffffff',
    dark: '#ffffff',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'primary-soft': {
    light: '#FFF4F0',
    dark: '#4A2416',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'primary-hover': {
    light: '#E6641C',
    dark: '#FF854D',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'primary-muted': {
    light: '#FFB399',
    dark: '#A54E24',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== SECONDARY PALETTE ====================
  secondary: {
    light: '#334155',
    dark: '#1e3a5f',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'secondary-foreground': {
    light: '#fafafa',
    dark: '#fafafa',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'secondary-soft': {
    light: '#f1f3f5',
    dark: '#172e47',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'secondary-hover': {
    light: '#001a33',
    dark: '#254670',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'secondary-muted': {
    light: '#cdd1d6',
    dark: '#3a4a5c',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== ACCENT PALETTE ====================
  accent: {
    light: '#7A9AB8',
    dark: '#21262d',
    type: THEME_COLOR_TYPES.ONLY_TAILWIND,
  },
  'accent-foreground': {
    light: '#ffffff',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.ONLY_TAILWIND,
  },
  'accent-soft': {
    light: '#E8F0F7',
    dark: '#161b22',
    type: THEME_COLOR_TYPES.ONLY_TAILWIND,
  },

  // ==================== BACKGROUND & FOREGROUND ====================
  background: {
    light: '#f8fafc',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'background-gradient-start': {
    light: '#f1f5f9',
    dark: '#1C1D23',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'background-gradient-end': {
    light: '#f8fafc',
    dark: '#212229',
    type: THEME_COLOR_TYPES.BOTH,
  },
  foreground: {
    light: '#1e293b',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'container-background': {
    light: 'transparent',
    dark: 'transparent',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== SURFACE ====================
  surface: {
    light: '#ffffff',
    dark: '#22272e',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'surface-elevated': {
    light: '#f5f7f9',
    dark: '#2a2f36',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'surface-muted': {
    light: '#cdd5dc',
    dark: '#0a0e14',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'sidebar-background': {
    light: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.2)',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'sidebar-header': {
    light: 'rgba(0, 0, 0, 0.25)',
    dark: 'rgba(0, 0, 0, 0.25)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== SHADCN COMPATIBILITY ====================
  card: { light: '#ffffff', dark: '#22272e', type: THEME_COLOR_TYPES.BOTH },
  'card-foreground': {
    light: '#050914',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.BOTH,
  },
  popover: {
    light: '#f5f7f9',
    dark: '#2a2f36',
    type: THEME_COLOR_TYPES.ONLY_TAILWIND,
  },
  'popover-foreground': {
    light: '#050914',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.ONLY_TAILWIND,
  },
  muted: { light: '#dae0e6', dark: '#1c2128', type: THEME_COLOR_TYPES.BOTH },
  'muted-foreground': {
    light: '#737373',
    dark: '#7d8590',
    type: THEME_COLOR_TYPES.BOTH,
  },
  destructive: {
    light: '#ef4444',
    dark: '#f85149',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'destructive-foreground': {
    light: '#fafafa',
    dark: '#fafafa',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== INPUT & SELECT SYSTEM ====================
  'input-border': {
    light: '#eef1f4',
    dark: '#191e25',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'input-background': {
    light: '#D1DCE5',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'input-ring': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'ring-width': { light: '2px', dark: '2px', type: THEME_COLOR_TYPES.BOTH },
  'select-border': {
    light: '#eef1f4',
    dark: '#191e25',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'select-background': {
    light: '#D1DCE5',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'select-ring': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== TEXT & BORDERS ====================
  text: { light: '#050914', dark: '#e6edf3', type: THEME_COLOR_TYPES.BOTH },
  'text-muted': {
    light: '#64748b',
    dark: '#7d8590',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'text-accent': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'text-link': {
    light: '#3b82f6',
    dark: '#60a5fa',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  border: { light: '#bac5d0', dark: '#3d444d', type: THEME_COLOR_TYPES.BOTH },
  'border-muted': {
    light: '#c9d2db',
    dark: '#21262d',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== TABLE SYSTEM ====================
  'table-background': {
    light: '#F0F4F7',
    dark: '#1a1f25',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'card-content-background': {
    light: '#F0F4F7',
    dark: '#161B22',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'table-header': {
    light: '#D1DCE5',
    dark: '#1d242d',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-header-text': {
    light: '#111827',
    dark: '#F1F5F9',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-header-border': {
    light: '#BAC5D0',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'table-shadow': {
    light: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
    dark: '0 2px 8px 0 rgba(0, 0, 0, 0.4)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-row-odd': {
    light: '#FFFFFF',
    dark: '#21262d',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-row-even': {
    light: '#F8FAFC',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-row-active': {
    light: '#E0F2FE',
    dark: '#2d333b',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-cell-text': {
    light: '#111827',
    dark: '#F1F5F9',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'table-border': {
    light: '#EEF1F4',
    dark: '#10141B',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'table-cell-border': {
    light: '#E5E7EB',
    dark: '#30363d',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== STATUS COLORS ====================
  success: {
    light: '#16a34a', // Verde mais terroso/floresta (green-600)
    dark: '#22c55e', // Verde suave (green-500)
    type: THEME_COLOR_TYPES.BOTH,
  },
  warning: {
    light: '#d97706', // Laranja/âmbar terroso (amber-600)
    dark: '#f59e0b', // Âmbar médio (amber-500)
    type: THEME_COLOR_TYPES.BOTH,
  },
  info: {
    light: '#0284c7', // Azul sky terroso (sky-600)
    dark: '#0ea5e9', // Azul sky médio (sky-500)
    type: THEME_COLOR_TYPES.BOTH,
  },
  pending: {
    light: '#7c3aed',
    dark: '#8b5cf6',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== INTERACTIVE STATES ====================
  'hover-overlay': {
    light: 'rgba(0, 0, 0, 0.04)',
    dark: 'rgba(255, 255, 255, 0.04)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'active-overlay': {
    light: 'rgba(0, 0, 0, 0.08)',
    dark: 'rgba(255, 255, 255, 0.08)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'focus-ring': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== BUTTON SYSTEM ====================
  'button-outline': {
    light: '#334155',
    dark: '#3d444d',
    type: THEME_COLOR_TYPES.ONLY_TAILWIND,
  },
  'button-translucent': {
    light: 'rgba(0, 0, 0, 0.05)',
    dark: 'rgba(255, 255, 255, 0.08)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-translucent-hover': {
    light: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(255, 255, 255, 0.12)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-translucent-text': {
    light: '#050914',
    dark: '#f3f4f6',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-ghost': {
    light: 'rgba(0, 0, 0, 0.05)',
    dark: 'rgba(255, 255, 255, 0.08)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-ghost-hover': {
    light: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(255, 255, 255, 0.12)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-ghost-text': {
    light: '#050914',
    dark: '#f3f4f6',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-chat-input': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-chat-input-hover': {
    light: '#E6641C',
    dark: '#FF854D',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'button-chat-input-text': {
    light: '#ffffff',
    dark: '#ffffff',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== DISABLED STATES ====================
  'disabled-background': {
    light: '#b8c5d1',
    dark: '#0a0e14',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'disabled-foreground': {
    light: '#64748b',
    dark: '#6e7681',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'disabled-border': {
    light: '#94a3b8',
    dark: '#30363d',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== CHECKBOX & SWITCH ====================
  'checkbox-checked-disabled-bg': {
    light: '#FF9999',
    dark: '#7F3319',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'checkbox-checked-disabled-border': {
    light: '#FFB399',
    dark: '#A54E24',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'checkbox-unchecked': {
    light: '#bac5d0',
    dark: '#3d444d',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'checkbox-unchecked-disabled-bg': {
    light: '#e8ecf0',
    dark: '#0d1117',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'checkbox-unchecked-disabled-border': {
    light: '#c1cdd8',
    dark: '#3d444d',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'checkbox-unchecked-border': {
    light: '#94a3b8',
    dark: '#484f58',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'switch-unchecked': {
    light: '#bac5d0',
    dark: '#3d444d',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'switch-unchecked-disabled-bg': {
    light: '#e8ecf0',
    dark: '#0d1117',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'switch-checked-disabled': {
    light: '#FF9999',
    dark: '#7F3319',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'switch-thumb': {
    light: 'white',
    dark: 'white',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== AUDIO WAVES ====================
  'audio-waves-color': {
    light: '#ffffff',
    dark: '#ffffff',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'audio-waves-progress-played': {
    light: 'rgba(107, 114, 128, 0.35)',
    dark: 'rgba(107, 114, 128, 0.35)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== CODE & HIGHLIGHTS ====================
  'code-background': {
    light: '#f0f4f8',
    dark: '#1a211a',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'code-text': {
    light: '#3b82f6',
    dark: '#60a5fa',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'highlight-admin': {
    light: '#fdf4e2',
    dark: '#422006',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'blockquote-border': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'blockquote-background': {
    light: '#fefce8',
    dark: '#1c1917',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'alert-border': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'alert-background': {
    light: '#fefce8',
    dark: '#1c1917',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== CODE PREVIEW ====================
  'code-preview-border': {
    light: '#D1DCE5',
    dark: '#30363d',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'code-preview-bg': {
    light: '#D1DCE5',
    dark: '#22272e',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-shadow': {
    light: 'none',
    dark: 'none',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-header-bg': {
    light: '#D1DCE5',
    dark: '#22272e',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-title-text': {
    light: '#050914',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-badge-bg': {
    light: '#FFF4F0',
    dark: '#4A2416',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-badge-text': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-preview-bg': {
    light: '#ffffff',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-actions-bg': {
    light: '#E0E8F0',
    dark: '#22272e',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-code-bg': {
    light: '#C5D4E0',
    dark: '#161b22',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-tab-text': {
    light: '#64748b',
    dark: '#7d8590',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-tab-hover-bg': {
    light: '#D1DCE5',
    dark: '#1c2128',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-tab-active-bg': {
    light: '#C5D4E0',
    dark: '#161b22',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-tab-active-text': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-tab-indicator': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-copy-btn-bg': {
    light: '#ffffff',
    dark: '#22272e',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'code-preview-copy-btn-border': {
    light: '#D1DCE5',
    dark: '#30363d',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== TOOLTIPS ====================
  'tooltip-background': {
    light: '#1e293b',
    dark: '#0f0f23',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'tooltip-foreground': {
    light: '#e2e8f0',
    dark: '#f1f5f9',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'tooltip-border': {
    light: '#334155',
    dark: '#1e3a5f',
    type: THEME_COLOR_TYPES.BOTH,
  },

  // ==================== CHAT SYSTEM ====================
  'chat-bubble-user': {
    light: '#F0F4F7',
    dark: '#2A2D31',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-bubble-user-text': {
    light: '#050914',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-bubble-user-hover': {
    light: '#E4EBF2',
    dark: '#353A3F',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-bubble-assistant': {
    light: 'transparent',
    dark: 'transparent',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-bubble-assistant-text': {
    light: '#050914',
    dark: '#e6edf3',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-bubble-hover': {
    light: 'rgba(0, 0, 0, 0.02)',
    dark: 'rgba(255, 255, 255, 0.02)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-input-background': {
    light: '#F0F4F7',
    dark: '#2A2D31',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-input-bottom-background': {
    light: 'rgba(0, 0, 0, 0.05)',
    dark: 'rgba(0, 0, 0, 0.08)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'textarea-background': {
    light: 'transparent',
    dark: 'transparent',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'chat-container-background': {
    light: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.1)',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== MULTICOMPANY ====================
  'company-border': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.BOTH,
  },
  'company-background': {
    light: '#FFF4F0',
    dark: '#4A2416',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'company-indicator': {
    light: '#FF7133',
    dark: '#FF7133',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },

  // ==================== MISC ====================
  radius: {
    light: '0.5rem',
    dark: '0.5rem',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'label-text-size': {
    light: '0.875rem',
    dark: '0.875rem',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'hint-text-size': {
    light: '0.75rem',
    dark: '0.75rem',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
  'error-text-size': {
    light: '0.75rem',
    dark: '0.75rem',
    type: THEME_COLOR_TYPES.ONLY_THEME,
  },
} as const;

// ==================== HELPER TYPES & FUNCTIONS ====================

export type ThemeColorName = keyof typeof themeDefinition;

export const getColorNames = (): ThemeColorName[] => {
  return Object.keys(themeDefinition) as ThemeColorName[];
};

export const getTailwindColors = (): ThemeColorName[] => {
  return getColorNames().filter(name => {
    const type = themeDefinition[name].type;
    return (
      type === THEME_COLOR_TYPES.BOTH ||
      type === THEME_COLOR_TYPES.ONLY_TAILWIND
    );
  });
};

export const getThemeColors = (): ThemeColorName[] => {
  return getColorNames().filter(name => {
    const type = themeDefinition[name].type;
    return type === THEME_COLOR_TYPES.ONLY_THEME;
  });
};
