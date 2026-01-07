import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { SEMANTIC_COLORS as SEMANTIC_COLORS_RAW } from '@/constants/semanticColors.js';

export { default as CorpButton } from './CorpButton.vue';
export { default as Button } from './CorpButton.vue'; // alias

// ============== CONSTANTS ==============

/**
 * Cores semânticas disponíveis no sistema
 * Importadas de /src/constants/semanticColors.js (compartilhado com tailwind.config.js)
 */
export const SEMANTIC_COLORS = SEMANTIC_COLORS_RAW;

export type SemanticColor = (typeof SEMANTIC_COLORS)[number];

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

    // SVG handling
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      // Variant = Estilo visual (não define cor!)
      variant: {
        solid: 'shadow',
        outline: 'border-2 bg-transparent shadow-sm',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
      },
      // Color = Cor semântica
      color: {
        primary: '',
        secondary: '',
        destructive: '',
        success: '',
        warning: '',
        info: '',
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
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
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
    compoundVariants: [
      // ========== SOLID VARIANTS ==========
      {
        variant: 'solid',
        color: 'primary',
        class: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        variant: 'solid',
        color: 'secondary',
        class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      {
        variant: 'solid',
        color: 'destructive',
        class:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      {
        variant: 'solid',
        color: 'success',
        class: 'bg-success text-white hover:bg-success/90',
      },
      {
        variant: 'solid',
        color: 'warning',
        class: 'bg-warning text-white hover:bg-warning/90',
      },
      {
        variant: 'solid',
        color: 'info',
        class: 'bg-info text-white hover:bg-info/90',
      },

      // ========== OUTLINE VARIANTS ==========
      {
        variant: 'outline',
        color: 'primary',
        class: 'border-primary text-primary hover:bg-primary/10',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class: 'border-secondary text-secondary hover:bg-secondary/10',
      },
      {
        variant: 'outline',
        color: 'destructive',
        class: 'border-destructive text-destructive hover:bg-destructive/10',
      },
      {
        variant: 'outline',
        color: 'success',
        class: 'border-success text-success hover:bg-success/10',
      },
      {
        variant: 'outline',
        color: 'warning',
        class: 'border-warning text-warning hover:bg-warning/10',
      },
      {
        variant: 'outline',
        color: 'info',
        class: 'border-info text-info hover:bg-info/10',
      },

      // ========== GHOST VARIANTS ==========
      {
        variant: 'ghost',
        color: 'primary',
        class: 'hover:bg-primary/10 hover:text-primary',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class: 'hover:bg-secondary/10 hover:text-secondary',
      },
      {
        variant: 'ghost',
        color: 'destructive',
        class: 'hover:bg-destructive/10 hover:text-destructive',
      },
      {
        variant: 'ghost',
        color: 'success',
        class: 'hover:bg-success/10 hover:text-success',
      },
      {
        variant: 'ghost',
        color: 'warning',
        class: 'hover:bg-warning/10 hover:text-warning',
      },
      {
        variant: 'ghost',
        color: 'info',
        class: 'hover:bg-info/10 hover:text-info',
      },

      // ========== LINK VARIANTS ==========
      {
        variant: 'link',
        color: 'primary',
        class: 'text-primary',
      },
      {
        variant: 'link',
        color: 'secondary',
        class: 'text-secondary',
      },
      {
        variant: 'link',
        color: 'destructive',
        class: 'text-destructive',
      },
      {
        variant: 'link',
        color: 'success',
        class: 'text-success',
      },
      {
        variant: 'link',
        color: 'warning',
        class: 'text-warning',
      },
      {
        variant: 'link',
        color: 'info',
        class: 'text-info',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'default',
      rounded: 'default',
      block: false,
      stacked: false,
      elevated: undefined,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
