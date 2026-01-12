import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, ActionVariant } from '../_shared';

export { default as CorpCheckbox } from './CorpCheckbox.vue';
export { default as Checkbox } from './CorpCheckbox.vue'; // alias

export type { Density as CheckboxDensity, ActionVariant as CheckboxVariant };

// ============== CHECKBOX VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solid: Fundo colorido quando checked, ícone branco
 * - ghost: Fundo sutil (10%) quando checked, borda e ícone coloridos
 * - outline: Apenas ícone colorido quando checked, borda mantém tema
 */
export const checkboxVariants = cva(
  [
    // Base
    'grid place-content-center peer shrink-0 rounded-sm shadow',
    'border-[length:var(--corp-def-checkbox-border-width)]',
    // Focus
    'focus-visible:outline-none focus-visible:ring-1',
    // Disabled
    'disabled:cursor-not-allowed',
    // Unchecked (sempre usa tema)
    'data-[state=unchecked]:border-[var(--checkbox-unchecked-border)]',
  ],
  {
    variants: {
      variant: {
        solid: '',
        ghost: '',
        outline: '',
      },
      density: {
        compact: 'h-4 w-4',
        regular: 'h-[18px] w-[18px]',
        comfortable: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'solid',
      density: 'compact',
    },
  }
);

/**
 * Tamanho dos ícones por density
 */
export const iconSizeMap = {
  compact: 14,
  regular: 16,
  comfortable: 18,
} as const;

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
