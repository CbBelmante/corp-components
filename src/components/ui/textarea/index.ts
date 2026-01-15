import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, InputVariant, FormRoundedPreset } from '../commonStyles';

export { default as CorpTextarea } from './CorpTextarea.vue';

export type {
  Density as TextareaDensity,
  InputVariant as TextareaVariant,
  FormRoundedPreset,
};

// ============== TEXTAREA VARIANTS (CVA) ==============

export const textareaVariants = cva(
  [
    // Base
    'flex w-full text-sm shadow-sm transition-colors',
    'bg-[hsl(var(--corp-def-textarea-bg))]',
    'placeholder:text-[hsl(var(--corp-def-textarea-placeholder))]',
    'focus-visible:outline-none focus-visible:ring-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        elevated: 'border border-[hsl(var(--corp-def-textarea-border))]',
        flat: 'border-0',
      },
      density: {
        compact: 'min-h-20 px-2 py-1.5 text-sm',
        regular: 'min-h-24 px-3 py-2.5 text-base',
        comfortable: 'min-h-28 px-4 py-3.5 text-base',
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
      variant: 'elevated',
      density: 'regular',
      rounded: 'default',
    },
  }
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
