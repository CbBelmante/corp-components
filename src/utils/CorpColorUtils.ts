/**
 * 🎨 CorpColorUtils - Utilitários de Cores Genéricos
 *
 * Biblioteca universal de utilitários para manipulação de cores.
 * Pode ser usada em qualquer projeto (React, Vue, Angular, Vanilla JS).
 *
 * 🔗 DEPENDÊNCIAS EXTERNAS:
 * - ✅ ZERO dependências externas!
 * - Funções 100% puras usando apenas APIs nativas
 *
 * 🔗 DEPENDÊNCIAS INTERNAS:
 * - CorpClientUtils (isClientSide - SSR-safe)
 *
 * @example
 * ```typescript
 * import { hexToRgb, toRgba } from './CorpColorUtils'
 *
 * const rgb = hexToRgb('#FF5733')
 * const rgba = toRgba('#FF5733', 0.5)
 * ```
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============

// ✅ NENHUMA - Funções puras usando apenas APIs nativas!

// ============== DEPENDÊNCIAS INTERNAS ==============

import { isClientSide } from './CorpClientUtils';

// ============== TYPE DEFINITIONS ==============

/**
 * 🎨 Tipos de formato de cor suportados
 */
export type ColorType = 'hex' | 'rgb' | 'rgba' | 'variable' | 'named';

/**
 * 🎨 Objeto RGB com componentes de cor
 */
export interface RgbColor {
  /** Componente vermelho (0-255) */
  r: number;
  /** Componente verde (0-255) */
  g: number;
  /** Componente azul (0-255) */
  b: number;
}

// ============== CORE FUNCTIONS ==============

/**
 * 🔍 Identifica o tipo de formato da cor baseado na string
 *
 * Analisa a string de cor e retorna seu tipo para processamento adequado.
 * Útil para validação e conversão inteligente entre formatos.
 *
 * @param {string} color - String de cor em qualquer formato
 * @returns {ColorType} Tipo identificado da cor
 *
 * @example
 * getColorType('#FF5733')           // 'hex'
 * getColorType('rgb(255, 87, 51)')  // 'rgb'
 * getColorType('var(--primary)')    // 'variable'
 */
export const getColorType = (color: string): ColorType => {
  if (!color) return 'named';
  if (color.startsWith('#')) return 'hex';
  if (color.startsWith('rgb(')) return 'rgb';
  if (color.startsWith('rgba(')) return 'rgba';
  if (color.startsWith('var(')) return 'variable';
  return 'named';
};

/**
 * 🔄 Converte cor hexadecimal para objeto RGB
 *
 * Suporta formato completo (#RRGGBB) e abreviado (#RGB).
 * Formato abreviado é expandido automaticamente.
 *
 * @param {string} hex - Cor hexadecimal (com ou sem #)
 * @returns {RgbColor} Objeto com componentes RGB (0-255)
 *
 * @example
 * hexToRgb('#FF5733')  // { r: 255, g: 87, b: 51 }
 * hexToRgb('#F53')     // { r: 255, g: 85, b: 51 }
 * hexToRgb('FF5733')   // { r: 255, g: 87, b: 51 }
 */
export const hexToRgb = (hex: string): RgbColor => {
  // Remove # se presente
  hex = hex.replace('#', '');

  // Converte abreviações (ex: #03F) para formato completo (#0033FF)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Extrai componentes RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

/**
 * 🎨 Converte qualquer cor para RGBA com opacidade específica (SSR-safe)
 *
 * Suporta múltiplos formatos de entrada: hex, rgb, rgba, variáveis CSS.
 * Para variáveis CSS, tenta resolver o valor computado no browser.
 * Seguro para SSR - retorna fallback quando window não existe.
 *
 * @param {string} color - Cor em qualquer formato suportado
 * @param {number} opacity - Opacidade entre 0 e 1
 * @returns {string} Cor em formato rgba(r, g, b, opacity)
 *
 * @example
 * toRgba('#FF5733', 0.5)              // 'rgba(255, 87, 51, 0.5)'
 * toRgba('rgb(255, 87, 51)', 0.8)     // 'rgba(255, 87, 51, 0.8)'
 * toRgba('var(--primary)', 0.3)       // 'rgba(r, g, b, 0.3)' ou fallback
 */
export const toRgba = (color: string, opacity: number): string => {
  // Se for uma variável CSS
  if (color.startsWith('var(--')) {
    // Extrai o nome da variável
    const varName = color.replace('var(', '').replace(')', '');

    // Tenta obter o valor da variável (SSR-safe)
    if (isClientSide()) {
      const computedStyle = getComputedStyle(document.documentElement);
      const value = computedStyle.getPropertyValue(varName).trim();

      // Se encontrou um valor, processa recursivamente
      if (value) {
        if (value.startsWith('#')) {
          const rgb = hexToRgb(value);
          return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        }
        if (value.startsWith('rgb')) {
          return value.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        }
        if (value.startsWith('var(--')) {
          return toRgba(value, opacity);
        }
      }
    }

    // Fallback para SSR ou valor não encontrado
    return `rgba(var(${varName}), ${opacity})`;
  }

  // Se for HEX
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  }

  // Se for RGB, converte para RGBA
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }

  // Se já for RGBA, ajusta a opacidade
  if (color.startsWith('rgba(')) {
    return color.replace(/,\s*[\d.]+\)$/, `, ${opacity})`);
  }

  // Para outros casos, retorna como está
  return color;
};

// ============== COLOR MANIPULATION ==============

/**
 * 🌑 Escurece uma cor hexadecimal reduzindo brilho
 *
 * Aplica fator multiplicativo aos componentes RGB.
 * Apenas funciona com cores hexadecimais.
 *
 * @param {string} color - Cor em formato hexadecimal
 * @param {number} [percent=20] - Porcentagem de escurecimento (0-100)
 * @returns {string} Cor escurecida em formato hex
 *
 * @example
 * darken('#FF5733', 20)  // '#CC462A' (20% mais escuro)
 * darken('#FF5733', 50)  // '#7F2B19' (50% mais escuro)
 */
export const darken = (color: string, percent: number = 20): string => {
  if (!color.startsWith('#')) return color;

  const factor = 1 - percent / 100;
  const rgb = hexToRgb(color);

  const r = Math.max(0, Math.round(rgb.r * factor));
  const g = Math.max(0, Math.round(rgb.g * factor));
  const b = Math.max(0, Math.round(rgb.b * factor));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * ☀️ Clareia uma cor hexadecimal aumentando brilho
 *
 * Interpola componentes RGB em direção ao branco (255, 255, 255).
 * Apenas funciona com cores hexadecimais.
 *
 * @param {string} color - Cor em formato hexadecimal
 * @param {number} [percent=20] - Porcentagem de clareamento (0-100)
 * @returns {string} Cor clareada em formato hex
 *
 * @example
 * lighten('#FF5733', 20)  // '#FF7D5C' (20% mais claro)
 * lighten('#FF5733', 50)  // '#FFAB99' (50% mais claro)
 */
export const lighten = (color: string, percent: number = 20): string => {
  if (!color.startsWith('#')) return color;

  const factor = percent / 100;
  const rgb = hexToRgb(color);

  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// ============== COLOR RESOLUTION ==============

/**
 * 🎨 Resolve nomes de cores para valores reais (client-side)
 *
 * Converte nomes de cores CSS ou variáveis Tailwind para valores computados.
 * Útil para processar cores antes de manipulações.
 * Evita HSL - retorna sempre RGB ou valores diretos.
 *
 * @param {string} color - Nome da cor ou valor já válido
 * @returns {string} Cor resolvida em formato válido
 *
 * @example
 * resolveColor('primary')           // 'var(--primary)'
 * resolveColor('#FF5733')           // '#FF5733' (passthrough)
 * resolveColor('var(--primary)')    // 'var(--primary)' (passthrough)
 */
export const resolveColor = (color: string): string => {
  const colorType = getColorType(color);

  // Se já é uma cor válida, retorna como está
  if (['hex', 'rgb', 'rgba', 'variable'].includes(colorType)) {
    return color;
  }

  // Mapeamento de nomes comuns para variáveis CSS
  const cssVariables: Record<string, string> = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    destructive: 'var(--destructive)',
    muted: 'var(--muted)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--destructive)',
    background: 'var(--background)',
    foreground: 'var(--foreground)',
  };

  return cssVariables[color] ?? color;
};

/**
 * 🌈 Gera versão mais clara de uma cor (útil para backgrounds)
 *
 * Converte qualquer cor para RGBA com opacidade reduzida.
 * Útil para criar backgrounds sutis de badges, cards, etc.
 *
 * @param {string} color - Cor em qualquer formato
 * @param {number} [opacity=0.15] - Opacidade final (0-1)
 * @returns {string} Cor clareada em formato rgba
 *
 * @example
 * getLighterColor('#FF5733', 0.2)         // 'rgba(255, 87, 51, 0.2)'
 * getLighterColor('var(--primary)', 0.1)  // 'rgba(var(--primary), 0.1)'
 */
export const getLighterColor = (
  color: string,
  opacity: number = 0.15
): string => {
  return toRgba(color, opacity);
};
