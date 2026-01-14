import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ButtonVariant, RoundedPreset } from '../_shared';

export { default as CorpButton } from './CorpButton.vue';
export { default as Button } from './CorpButton.vue'; // alias

export type { ButtonVariant, RoundedPreset };

// ============== BUTTON VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solid: Fundo colorido, texto branco
 * - outline: Borda colorida, fundo transparente
 * - ghost: Sem borda/fundo, hover sutil
 * - link: Estilo de link com underline
 */
export const buttonVariants = cva(
  [
    // Layout
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'text-sm font-medium',
    // Transitions
    'transition-all duration-200 ease-out',
    // Focus
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    // Disabled
    'disabled:pointer-events-none disabled:opacity-50',
    // SVG
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    // Border
    'border-[length:var(--corp-def-button-border-width)] border-[var(--corp-def-button-border-color)]',
  ],
  {
    variants: {
      variant: {
        solid: 'shadow',
        outline: 'bg-transparent shadow-sm',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-7 px-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
      rounded: {
        default: 'rounded-md',
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
      block: {
        true: 'w-full',
        false: '',
      },
      stacked: {
        true: 'flex-col gap-1 h-auto py-2',
        false: '',
      },
      // Elevation (Material Design inspired)
      elevated: {
        0: 'shadow-none hover:enabled:shadow-none',
        1: 'shadow-sm hover:enabled:shadow hover:enabled:-translate-y-0.5 active:enabled:translate-y-0',
        2: 'shadow hover:enabled:shadow-md hover:enabled:-translate-y-px active:enabled:translate-y-0',
        3: 'shadow-md hover:enabled:shadow-lg hover:enabled:-translate-y-px active:enabled:translate-y-0',
        4: 'shadow-lg hover:enabled:shadow-xl hover:enabled:-translate-y-0.5 active:enabled:translate-y-0',
        6: 'shadow-xl hover:enabled:shadow-2xl hover:enabled:-translate-y-1 active:enabled:translate-y-0',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
      rounded: 'default',
      block: false,
      stacked: false,
      elevated: undefined,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonSize =
  | 'default'
  | 'xs'
  | 'sm'
  | 'lg'
  | 'icon'
  | 'icon-sm'
  | 'icon-lg';
