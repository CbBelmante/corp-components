import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, SwitchVariant } from '../commonStyles';

export { default as CorpSwitch } from './CorpSwitch.vue';

export type { Density as SwitchDensity, SwitchVariant };

// ============== SWITCH VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solid: Fundo colorido quando checked, bolinha branca
 * - ghost: Fundo sutil (10%) quando checked, borda colorida
 */
export const switchVariants = cva(
  [
    // Base
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full shadow-sm transition-colors',
    'border-[length:var(--corp-def-switch-border-width)] border-transparent',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    // Disabled
    'disabled:cursor-not-allowed',
    // Unchecked (sempre usa tema)
    'data-[state=unchecked]:bg-[var(--switch-unchecked)]',
  ],
  {
    variants: {
      variant: {
        solid: '',
        ghost: '',
      },
      density: {
        compact: 'h-5 w-9',
        regular: 'h-5 w-10',
        comfortable: 'h-6 w-12',
      },
    },
    defaultVariants: {
      variant: 'solid',
      density: 'compact',
    },
  }
);

/**
 * Tamanho do thumb (bolinha) por density
 */
export const thumbSizeMap = {
  compact: 'h-4 w-4',
  regular: 'h-4 w-4',
  comfortable: 'h-5 w-5',
} as const;

/**
 * Translação do thumb quando checked por density
 */
export const thumbTranslateMap = {
  compact: 'data-[state=checked]:translate-x-4',
  regular: 'data-[state=checked]:translate-x-5',
  comfortable: 'data-[state=checked]:translate-x-6',
} as const;

export type SwitchVariants = VariantProps<typeof switchVariants>;
