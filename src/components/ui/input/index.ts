import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, InputVariant } from '../_shared';

export { default as CorpInput } from './CorpInput.vue';

export type { Density as InputDensity, InputVariant };

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
    'flex w-full rounded-md px-3 text-sm shadow-sm transition-colors',
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
    },
    defaultVariants: {
      variant: 'solo',
      density: 'regular',
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
