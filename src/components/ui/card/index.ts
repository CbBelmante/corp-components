import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, RoundedPreset } from '../commonStyles';

export { default as CorpCard } from './CorpCard.vue';
export { default as Card } from './CorpCard.vue';
export { default as CardHeader } from './CardHeader.vue';
export { default as CardTitle } from './CardTitle.vue';
export { default as CardDescription } from './CardDescription.vue';
export { default as CardContent } from './CardContent.vue';
export { default as CardFooter } from './CardFooter.vue';

export type { Density as CardDensity, RoundedPreset };

// ============== TYPES ==============

export type CardVariant = 'elevated' | 'flat' | 'outlined' | 'tonal';
export type CardElevation = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Presets de rounded para Card
 * Exclui: full, pill, circle, shaped (não fazem sentido em cards)
 */
export type CardRoundedPreset =
  | 'default'
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export interface ICardProps {
  title?: string;
  subtitle?: string;
  to?: string | { name: string; params?: Record<string, unknown> };
  href?: string;
  disabled?: boolean;
}

// ============== CARD VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - elevated: Sombra + fundo sólido (padrão)
 * - flat: Sem sombra, fundo sólido
 * - outlined: Só borda, fundo transparente
 * - tonal: Fundo suave/transparente da cor
 */
export const cardVariants = cva(
  [
    // Base
    'relative overflow-hidden',
    'text-[hsl(var(--corp-def-card-text))]',
    // Border width from theme
    'border-[length:var(--corp-def-card-border-width)]',
    // Transitions
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      variant: {
        elevated:
          'bg-[hsl(var(--corp-def-card-bg))] border-transparent shadow-[var(--corp-def-card-shadow)]',
        flat: 'bg-[hsl(var(--corp-def-card-bg))] border-transparent shadow-none',
        outlined:
          'bg-transparent border-[hsl(var(--corp-def-card-border))] shadow-none',
        tonal: 'border-transparent shadow-none',
      },
      density: {
        compact: '',
        regular: '',
        comfortable: '',
      },
      elevation: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      },
      rounded: {
        default: 'rounded-xl',
        none: 'rounded-none',
        xs: 'rounded-[2px]',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
      },
      hover: {
        true: 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer',
        false: '',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      density: 'regular',
      rounded: 'default',
      hover: false,
      disabled: false,
      clickable: false,
    },
  }
);

// ============== DENSITY MAPS ==============

/**
 * Padding do header por density
 */
export const cardHeaderDensityMap = {
  compact: 'p-4 pb-2',
  regular: 'p-6 pb-3',
  comfortable: 'p-8 pb-4',
} as const;

/**
 * Padding do content por density
 */
export const cardContentDensityMap = {
  compact: 'p-4 pt-0',
  regular: 'p-6 pt-0',
  comfortable: 'p-8 pt-0',
} as const;

/**
 * Padding do footer por density
 */
export const cardFooterDensityMap = {
  compact: 'p-4 pt-2',
  regular: 'p-6 pt-3',
  comfortable: 'p-8 pt-4',
} as const;

export type CardVariants = VariantProps<typeof cardVariants>;
