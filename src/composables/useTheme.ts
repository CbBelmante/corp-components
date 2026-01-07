/**
 * useTheme - Gerenciamento de Tema (Light/Dark/System)
 *
 * Estado global compartilhado para tema da aplicação.
 * Suporta dark mode, light mode, preferência do sistema e persistência.
 *
 * REGRAS:
 * - light/dark: tema fixo escolhido pelo usuário
 * - system: segue preferência do SO (auto-atualiza)
 * - browser: segue preferência do navegador
 *
 * ⚠️ SIDE-EFFECTS:
 * - Modifica localStorage ao trocar tema
 * - Adiciona/remove classes 'dark'/'light' no document.documentElement
 * - Adiciona listener em window.matchMedia (watch system changes)
 * - SSR-safe: retorna valores seguros no servidor
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - CorpClientUtils (SSR detection)
 */

import { ref, computed, readonly, type Ref } from 'vue';

import { isClientSide } from '@/utils/CorpClientUtils';

export type ThemeMode = 'light' | 'dark' | 'browser' | 'system';
export type ThemeValue = 'light' | 'dark';

// ============== CONSTANTS ==============

export const defaultTheme: ThemeMode = 'light';

// 🌐 SSR-SAFE: Retorna defaultTheme no servidor
export const getSavedTheme = (): ThemeMode => {
  if (isClientSide()) {
    return (localStorage.getItem('theme') as ThemeMode) || defaultTheme;
  }
  return defaultTheme;
};

export const getSystemTheme = (): ThemeValue => {
  if (isClientSide()) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return defaultTheme as ThemeValue;
};

export const getBrowserTheme = (): ThemeValue => {
  if (isClientSide()) {
    const browserPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const browserPrefersLight = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    if (browserPrefersDark) return 'dark';
    if (browserPrefersLight) return 'light';
  }
  return defaultTheme as ThemeValue;
};

/**
 * Prioridade:
 * 1. localStorage
 * 2. Browser (se mode = 'browser')
 * 3. System (se mode = 'system')
 * 4. Default
 */
export const getCurrentTheme = (): ThemeValue => {
  if (isClientSide()) {
    const savedTheme = getSavedTheme();

    if (savedTheme === 'browser') {
      return getBrowserTheme();
    }
    if (savedTheme === 'system') {
      return getSystemTheme();
    }
    return savedTheme as ThemeValue;
  }
  return defaultTheme as ThemeValue;
};

// ============== REACTIVE STATE GLOBAL ==============

const globalThemeMode = ref<ThemeMode>(defaultTheme);
const globalThemeValue = ref<ThemeValue>('light');

// ============== AUX METHODS ==============

/**
 * ⚠️ SIDE-EFFECTS:
 * - Modifica localStorage
 * - Adiciona/remove classes 'dark'/'light' no document.documentElement
 */
const _applyTheme = (
  theme: ThemeMode,
  themeMode: Ref<ThemeMode>,
  themeValue: Ref<ThemeValue>
): void => {
  if (isClientSide()) {
    localStorage.setItem('theme', theme);
    themeMode.value = theme;

    const finalTheme = getCurrentTheme();
    themeValue.value = finalTheme;

    const html = document.documentElement;
    if (finalTheme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  }
};

/**
 * ⚠️ SIDE-EFFECT: Adiciona listener em window.matchMedia
 * Auto-atualiza tema quando SO muda preferência (apenas se mode = 'system')
 */
const _watchSystemTheme = (
  callback: (theme: ThemeValue) => void,
  themeMode: Ref<ThemeMode>,
  themeValue: Ref<ThemeValue>
): void => {
  if (isClientSide()) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      callback(systemTheme);

      if (themeMode.value === 'system') {
        _applyTheme('system', themeMode, themeValue);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
  }
};

// ============== PUBLIC METHODS ==============

export const useTheme = () => {
  const initTheme = () => {
    if (isClientSide()) {
      const savedTheme = getSavedTheme();
      _applyTheme(savedTheme, globalThemeMode, globalThemeValue);

      _watchSystemTheme(
        () => {
          if (globalThemeMode.value === 'system') {
            _applyTheme('system', globalThemeMode, globalThemeValue);
          }
        },
        globalThemeMode,
        globalThemeValue
      );
    }
  };

  const toggleTheme = () => {
    const newTheme = globalThemeValue.value === 'light' ? 'dark' : 'light';
    _applyTheme(newTheme, globalThemeMode, globalThemeValue);
  };

  const setTheme = (theme: ThemeMode) => {
    _applyTheme(theme, globalThemeMode, globalThemeValue);
  };

  return {
    currentThemeMode: readonly(globalThemeMode),
    currentThemeValue: readonly(globalThemeValue),
    isDark: computed(() => globalThemeValue.value === 'dark'),

    initTheme,
    toggleTheme,
    setTheme,

    getSavedTheme,
    getSystemTheme,
    getBrowserTheme,
    getCurrentTheme,
  };
};
