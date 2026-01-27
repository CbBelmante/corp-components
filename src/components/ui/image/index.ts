import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { RoundedPreset } from '../commonStyles';

export { default as CorpImage } from './CorpImage.vue';
export type { RoundedPreset };

// ============== TYPE EXPORTS ==============

export type ImageSize = 'small' | 'regular' | 'large' | 'auto';
export type ImageShape = 'square' | 'rounded' | 'circle';
export type ImageFit = 'cover' | 'contain' | 'fill';
export type ImagePosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

// ============== CVA VARIANTS ==============

export const imageVariants = cva(
  [
    'block',
    'transition-all duration-200',
    'border-[length:var(--corp-runtime-image-border-width,var(--corp-def-image-border-width))]',
    'border-[color:var(--corp-runtime-image-border,var(--corp-def-image-border-color))]',
  ],
  {
    variants: {
      size: {
        small: 'w-24 h-24',
        regular: 'w-40 h-40',
        large: 'w-64 h-64',
        auto: 'w-auto h-auto',
      },
      shape: {
        square: '',
        rounded: 'rounded-md',
        circle: 'rounded-full aspect-square',
      },
      fit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
      },
      position: {
        center: 'object-center',
        top: 'object-top',
        bottom: 'object-bottom',
        left: 'object-left',
        right: 'object-right',
        'top-left': 'object-left-top',
        'top-right': 'object-right-top',
        'bottom-left': 'object-left-bottom',
        'bottom-right': 'object-right-bottom',
      },
      shadow: {
        true: 'shadow-md',
        false: '',
      },
      grayscale: {
        true: 'grayscale',
        false: '',
      },
    },
    defaultVariants: {
      size: 'regular',
      shape: 'square',
      fit: 'cover',
      position: 'center',
      shadow: false,
      grayscale: false,
    },
  }
);

export type ImageVariants = VariantProps<typeof imageVariants>;
