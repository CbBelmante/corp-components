import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as CorpProgress } from './CorpProgress.vue';

// ============== TYPES ==============

// Vuetify-like: aceita string, number, boolean
export type ProgressRounded =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'
  | 'pill'
  | 'circle'
  | 'shaped'
  | number
  | boolean;

export type ProgressHeight = 'compact' | 'regular' | 'comfortable' | number;

// ============== PROGRESS VARIANTS (CVA) ==============

export const progressVariants = cva(
  [
    // Base
    'relative w-full overflow-hidden transition-all',
    'bg-[hsl(var(--corp-def-progress-bg))]',
  ],
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        xs: 'rounded-[2px]',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
        pill: 'rounded-full',
        circle: 'rounded-full',
        shaped: 'rounded-lg',
      },
      height: {
        compact: 'h-1',
        regular: 'h-2',
        comfortable: 'h-3',
      },
    },
    defaultVariants: {
      rounded: 'full',
      height: 'regular',
    },
  }
);

export type ProgressVariants = VariantProps<typeof progressVariants>;
