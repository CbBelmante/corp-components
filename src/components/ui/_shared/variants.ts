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

/** Input, Select */
export type InputVariant = 'solo' | 'filled';

// ============== MAPS ==============

/** Tamanhos de box/icon/indicator por density (Checkbox, Radio, Switch) */
export const densitySizeMap = {
  compact: { box: 'h-4 w-4', icon: 14, indicator: 'h-2 w-2' },
  regular: { box: 'h-[18px] w-[18px]', icon: 16, indicator: 'h-2.5 w-2.5' },
  comfortable: { box: 'h-5 w-5', icon: 18, indicator: 'h-3 w-3' },
} as const;

export type DensitySizeMap = typeof densitySizeMap;
