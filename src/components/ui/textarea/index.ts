import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, InputVariant } from '../_shared';

export { default as CorpTextarea } from './CorpTextarea.vue';

export type { Density as TextareaDensity, InputVariant as TextareaVariant };

// ============== TEXTAREA VARIANTS (CVA) ==============

export const textareaVariants = cva(
  [
    // Base
    'flex w-full rounded-md text-sm shadow-sm transition-colors',
    'bg-[hsl(var(--corp-def-textarea-bg))]',
    'placeholder:text-[hsl(var(--corp-def-textarea-placeholder))]',
    'focus-visible:outline-none focus-visible:ring-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        solo: 'border border-[hsl(var(--corp-def-textarea-border))]',
        filled: 'border-0',
      },
      density: {
        compact: 'min-h-20 px-2 py-1.5 text-sm',
        regular: 'min-h-24 px-3 py-2.5 text-base',
        comfortable: 'min-h-28 px-4 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'solo',
      density: 'regular',
    },
  }
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
