/**
 * 🎯 CorpStyleUtils - Helpers de estilo compartilhados
 *
 * Funções utilitárias para processar props de estilo (rounded, elevated, etc)
 * usadas por Button, Badge, ProgressBar, e outros componentes.
 *
 * 🔗 DEPENDÊNCIAS:
 * - ✅ ZERO dependências externas - funções puras
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
// Nenhuma - funções puras usando apenas APIs nativas

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { RoundedPreset, RoundedValue } from '@/components/ui/_shared';
import { ROUNDED_PRESETS } from '@/components/ui/_shared';

// ============== ROUNDED HELPERS (INTERNOS) ==============

// Normaliza boolean/number para string
function normalizeRounded(value: RoundedValue): string {
  if (typeof value === 'boolean') {
    return value ? 'full' : 'none';
  }
  if (typeof value === 'number') {
    return value === 0 ? 'none' : String(value);
  }
  return value;
}

// Verifica se é preset válido
function isRoundedPreset(normalized: string): boolean {
  return ROUNDED_PRESETS.includes(normalized as RoundedPreset);
}

// Verifica se é classe Tailwind custom
function isTailwindRounded(normalized: string): boolean {
  return normalized.startsWith('rounded');
}

// ============== ROUNDED RESOLVER (PÚBLICO) ==============

/**
 * Resolve prop rounded e retorna preset/class/style
 *
 * REGRAS:
 * - Preset ('sm', 'lg', etc) → preset para CVA
 * - Tailwind ('rounded-3xl') → class custom
 * - CSS ('10px', '1rem') → style inline
 * - Number (10) → style inline '10px'
 * - Boolean (true/false) → 'full'/'none'
 */
export function resolveRounded(value: RoundedValue) {
  const normalized = normalizeRounded(value);
  const isPreset = isRoundedPreset(normalized);
  const isTailwind = isTailwindRounded(normalized);

  // Caso 1: Preset → CVA
  if (isPreset) {
    return {
      preset: normalized as RoundedPreset,
      class: '',
      style: {},
    };
  }

  // Caso 2: Tailwind class → class custom
  if (isTailwind) {
    return {
      preset: undefined,
      class: normalized,
      style: {},
    };
  }

  // Caso 3: CSS value ou Number → style inline
  const borderRadius = !isNaN(Number(normalized))
    ? `${normalized}px`
    : normalized;

  return {
    preset: undefined,
    class: '',
    style: { borderRadius },
  };
}
