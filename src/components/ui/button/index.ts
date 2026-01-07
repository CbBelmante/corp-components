import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as CorpButton } from './CorpButton.vue';
export { default as Button } from './CorpButton.vue'; // alias

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

    // Hover Elevation Effect
    'hover:enabled:-translate-y-px hover:enabled:shadow-md',
    'active:enabled:translate-y-0 active:enabled:shadow-sm',

    // SVG handling
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border-2 border-button-outline bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
      block: false,
      stacked: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
