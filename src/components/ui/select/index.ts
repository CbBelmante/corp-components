import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density, InputVariant } from '../_shared';

export { default as CorpSelect } from './CorpSelect.vue';

export type { Density as SelectDensity, InputVariant as SelectVariant };
export { default as Select } from './Select.vue';
export { default as SelectContent } from './SelectContent.vue';
export { default as SelectGroup } from './SelectGroup.vue';
export { default as SelectItem } from './SelectItem.vue';
export { default as SelectItemText } from './SelectItemText.vue';
export { default as SelectLabel } from './SelectLabel.vue';
export { default as SelectScrollDownButton } from './SelectScrollDownButton.vue';
export { default as SelectScrollUpButton } from './SelectScrollUpButton.vue';
export { default as SelectSeparator } from './SelectSeparator.vue';
export { default as SelectTrigger } from './SelectTrigger.vue';
export { default as SelectValue } from './SelectValue.vue';

// ============== SELECT VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * - solo: Fundo + borda (padrão)
 * - filled: Só fundo, sem borda visível
 */
export const selectVariants = cva(
  [
    // Base
    'flex w-full items-center justify-between rounded-md px-3 text-sm shadow-sm transition-colors',
    'bg-[hsl(var(--corp-def-select-bg))]',
    // Focus
    'focus:outline-none focus:ring-1 focus:ring-[length:var(--ring-width)]',
    // Placeholder
    'data-[placeholder]:text-muted-foreground',
    // Disabled
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        solo: 'border border-[hsl(var(--corp-def-select-border))]',
        filled: 'border-0',
      },
      density: {
        compact: 'h-8',
        regular: 'h-9',
        comfortable: 'h-10',
      },
    },
    defaultVariants: {
      variant: 'solo',
      density: 'regular',
    },
  }
);

export type SelectVariants = VariantProps<typeof selectVariants>;
