/**
 * 📘 Shared Variants - Tipos e valores compartilhados entre componentes
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
// Nenhuma

// ============== DEPENDÊNCIAS INTERNAS ==============
// Nenhuma

// ============== TYPES ==============

export type Density = 'compact' | 'regular' | 'comfortable';

/** Checkbox, Radio (3 opções) */
export type ActionVariant = 'solid' | 'ghost' | 'outline';

/** Switch (2 opções - sem outline) */
export type SwitchVariant = 'solid' | 'ghost';

/** Button (4 opções - com link) */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

/** Input, Select, Textarea */
export type InputVariant = 'elevated' | 'flat';

// ============== ROUNDED ==============

/**
 * Presets de border-radius compartilhados
 *
 * - default: Padrão do componente (geralmente md)
 * - none: Sem border-radius (0px)
 * - xs: Extra pequeno (2px)
 * - sm: Pequeno (0.125rem / 2px)
 * - md: Médio (0.375rem / 6px)
 * - lg: Grande (0.5rem / 8px)
 * - xl: Extra grande (0.75rem / 12px)
 * - 2xl: 2x extra grande (1rem / 16px)
 * - 3xl: 3x extra grande (1.5rem / 24px)
 * - full: Totalmente arredondado (9999px)
 * - pill: Formato de pílula (full)
 * - circle: Formato de círculo (full)
 * - shaped: Com forma (lg)
 */
export type RoundedPreset =
  | 'default'
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full'
  | 'pill'
  | 'circle'
  | 'shaped';

/**
 * Valor universal de rounded (Button, Badge, ProgressBar, etc)
 *
 * Aceita:
 * - Presets (RoundedPreset)
 * - Tailwind custom: 'rounded-3xl', 'rounded-[32px]'
 * - CSS values: '10px', '1rem', '50%'
 * - Number: 10 → vira '10px'
 * - Boolean: true → 'full', false → 'none'
 */
export type RoundedValue = RoundedPreset | string | number | boolean;

/**
 * Presets de border-radius específicos para formulários (Input, Select, Textarea)
 *
 * Subconjunto filtrado do RoundedPreset com apenas os valores sensatos para forms.
 * Exclui: 2xl, 3xl, pill, circle, shaped (não fazem sentido em campos de formulário)
 */
export type FormRoundedPreset =
  | 'default'
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

/**
 * Array com todos os presets válidos de border-radius
 * Sincronizado com RoundedPreset
 */
export const ROUNDED_PRESETS: RoundedPreset[] = [
  'default',
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'full',
  'pill',
  'circle',
  'shaped',
];

// ============== MAPS ==============

/** Tamanhos de box/icon/indicator por density (Checkbox, Radio, Switch) */
export const densitySizeMap = {
  compact: { box: 'h-4 w-4', icon: 14, indicator: 'h-2 w-2' },
  regular: { box: 'h-[18px] w-[18px]', icon: 16, indicator: 'h-2.5 w-2.5' },
  comfortable: { box: 'h-5 w-5', icon: 18, indicator: 'h-3 w-3' },
} as const;

export type DensitySizeMap = typeof densitySizeMap;
