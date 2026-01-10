import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as CorpBadge } from './CorpBadge.vue';

// ============== BADGE VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solid: Fundo colorido, texto branco
 * - outline: Borda colorida, fundo transparente
 * - ghost: Sem borda, fundo transparente
 */
export const badgeVariants = cva(
  [
    // Base
    'inline-flex gap-1 items-center px-2.5 py-0.5 text-xs font-semibold transition-colors',
    'border-[length:var(--corp-def-badge-border-width)] border-[var(--corp-def-badge-border-color)]',
    // Focus
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        solid: 'shadow',
        outline: 'bg-transparent',
        ghost: 'bg-transparent border-transparent',
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
export type BadgeVariant = 'solid' | 'outline' | 'ghost';
export type BadgeRounded = 'default' | 'none' | 'sm' | 'lg' | 'xl' | 'full';
