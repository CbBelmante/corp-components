import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { RoundedPreset } from '../_shared';

export { default as CorpProgressBar } from './CorpProgressBar.vue';
export type { RoundedPreset };

export type ProgressHeight = 'compact' | 'regular' | 'comfortable' | number;

// ============== PROGRESS VARIANTS (CVA) ==============

export const progressVariants = cva(
  [
    // Base
    'relative w-full overflow-hidden transition-all',
    'bg-[hsl(var(--corp-def-progress-bar-track))]',
  ],
  {
    variants: {
      rounded: {
        default: 'rounded-full',
        none: 'rounded-none',
        xs: 'rounded-[2px]',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
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
