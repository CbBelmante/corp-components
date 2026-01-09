import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as CorpBadge } from './CorpBadge.vue';

export const badgeVariants = cva(
  'inline-flex gap-1 items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-[length:var(--corp-def-badge-border-width)] border-[var(--corp-def-badge-border-color)]',
  {
    variants: {
      variant: {
        solid: 'shadow',
        outline: 'bg-transparent',
        ghost: 'bg-transparent',
      },
      rounded: {
        default: 'rounded-md',
        none: 'rounded-none',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      rounded: 'default',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
