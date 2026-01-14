import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, ActionVariant } from '../commonStyles';

export { default as CorpRadioGroup } from './CorpRadioGroup.vue';
export { default as CorpRadioGroupItem } from './CorpRadioGroupItem.vue';

export type { Density as RadioDensity, ActionVariant as RadioVariant };

// ============== RADIO GROUP ITEM VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solid: Fundo colorido quando checked, bolinha branca
 * - ghost: Fundo sutil (10%) quando checked, bolinha colorida
 * - outline: Apenas bolinha colorida quando checked, borda mantém
 */
export const radioGroupItemVariants = cva(
  [
    // Base
    'peer aspect-square shrink-0 rounded-full shadow-sm transition-all',
    'border-[length:var(--corp-def-radio-border-width)]',
    // Focus
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    // Disabled
    'disabled:cursor-not-allowed disabled:opacity-50',
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
 * Tamanho do indicador interno (bolinha) por density
 */
export const indicatorSizeMap = {
  compact: 'h-2 w-2',
  regular: 'h-2.5 w-2.5',
  comfortable: 'h-3 w-3',
} as const;

export type RadioGroupItemVariants = VariantProps<
  typeof radioGroupItemVariants
>;
