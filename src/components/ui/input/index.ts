import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, InputVariant, FormRoundedPreset } from '../commonStyles';

export { default as CorpInput } from './CorpInput.vue';

export type { Density as InputDensity, InputVariant, FormRoundedPreset };

// ============== INPUT VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solo: Fundo + borda (padrão)
 * - filled: Só fundo, sem borda visível
 */
export const inputVariants = cva(
  [
    // Base
    'flex w-full px-3 text-sm shadow-sm transition-colors',
    'bg-[hsl(var(--corp-def-input-bg))]',
    // Placeholder
    'placeholder:text-[var(--corp-def-input-placeholder)]',
    // Focus
    'focus-visible:outline-none focus-visible:ring-1',
    // File input
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    // Disabled
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        solo: 'border border-[hsl(var(--corp-def-input-border))]',
        filled: 'border-0',
      },
      density: {
        compact: 'h-8 py-1',
        regular: 'h-9 py-1',
        comfortable: 'h-10 py-2',
      },
      rounded: {
        default: 'rounded-md',
        none: 'rounded-none',
        xs: 'rounded-[2px]',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'solo',
      density: 'regular',
      rounded: 'default',
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
