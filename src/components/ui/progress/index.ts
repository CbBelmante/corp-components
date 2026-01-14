import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { RoundedPreset } from '../commonStyles';
import { getDisabledColors } from '../commonStyles';
import {
  lighten,
  desaturate,
  hexToHslWithWrapper,
} from '@/utils/CorpColorUtils';

export { default as CorpProgressBar } from './CorpProgressBar.vue';
export type { RoundedPreset };

// ============== PROGRESS COLORS ==============

export interface IProgressColors {
  disabled: {
    bar: { light: string; dark: string };
    track: { light: string; dark: string };
  };
  buffer: string;
}

export function getProgressColors(hexColor: string): IProgressColors {
  const disabled = getDisabledColors(hexColor);

  return {
    disabled: {
      bar: { light: disabled.light.bg, dark: disabled.dark.bg },
      track: {
        light: hexToHslWithWrapper(lighten(hexColor, 80)),
        dark: disabled.dark.border,
      },
    },
    buffer: desaturate(lighten(hexColor, 40), 40),
  };
}

export type ProgressHeight = 'compact' | 'regular' | 'comfortable' | number;

// ============== PROGRESS VARIANTS (CVA) ==============

export const progressVariants = cva(
  [
    // Base - background vem do runtime (colorClasses) que deriva da cor da barra
    'relative w-full overflow-hidden transition-all',
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
