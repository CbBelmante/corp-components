<script setup lang="ts">
/**
 * 🖼️ CorpImage - Componente de Imagem com Lazy Loading
 *
 * Wrapper nativo (sem reka-ui) com API estilo Vuetify v-img
 *
 * 🎨 FEATURES:
 * - Lazy loading (IntersectionObserver)
 * - Aspect ratio (previne CLS)
 * - Object-fit e object-position
 * - Shapes: square, rounded, circle
 * - BorderColor customizado (Corp color system)
 * - Placeholder durante carregamento
 * - Responsive (srcset/sizes)
 * - Events: @load, @error
 *
 * 🔗 DEPENDÊNCIAS:
 * - 100% nativo (Vue 3 + HTML <img>)
 * - CVA para variants
 * - Corp color system
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import type { HTMLAttributes, PropType } from 'vue';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { cn } from '@/lib/utils';
import {
  imageVariants,
  type ImageVariants,
  type ImageSize,
  type ImageShape,
  type ImageFit,
  type ImagePosition,
} from '.';
import { resolveColor } from '@/utils/CorpColorUtils';
import { resolveRounded, type RoundedValue } from '@commonStyles';

// ============== PROPS ==============

const props = defineProps({
  // Obrigatórios
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },

  // CVA Variants
  size: {
    type: String as PropType<ImageSize>,
    default: 'regular',
  },
  shape: {
    type: String as PropType<ImageShape>,
    default: 'square',
  },
  fit: {
    type: String as PropType<ImageFit>,
    default: 'cover',
  },
  position: {
    type: String as PropType<ImagePosition>,
    default: 'center',
  },

  // Efeitos visuais
  shadow: {
    type: Boolean,
    default: false,
  },
  grayscale: {
    type: Boolean,
    default: false,
  },

  // BorderColor - cor da borda (semantic OU custom: hex, rgb, var(), etc)
  borderColor: {
    type: String,
    default: undefined,
  },

  // BorderWidth - largura da borda (px, rem, etc)
  borderWidth: {
    type: [String, Number],
    default: undefined,
  },

  // Rounded (border-radius)
  rounded: {
    type: [String, Number, Boolean] as PropType<RoundedValue>,
    default: undefined, // usa shape por padrão
  },

  // Layout - Custom Dimensions (sobrescreve size)
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  aspectRatio: {
    type: [String, Number],
    default: undefined, // ex: '16/9', 1.77, '4:3'
  },

  // Lazy loading
  lazy: {
    type: Boolean,
    default: true,
  },

  // Placeholder durante carregamento
  placeholder: {
    type: String,
    default: undefined, // URL de imagem placeholder
  },

  // Responsive (srcset/sizes)
  srcset: {
    type: String,
    default: undefined, // ex: 'img-400.jpg 400w, img-800.jpg 800w'
  },
  sizes: {
    type: String,
    default: undefined, // ex: '(max-width: 600px) 400px, 800px'
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },

  // Eager loading (desabilita lazy)
  eager: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  load: [event: Event];
  error: [event: Event];
}>();

// ============== STATE ==============

const imgRef = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);
const hasError = ref(false);
const isIntersecting = ref(false);

let observer: IntersectionObserver | null = null;

// ============== COMPUTED ==============

/**
 * Determina se deve usar lazy loading
 */
const shouldLazy = computed(() => props.lazy && !props.eager);

/**
 * Src efetiva da imagem (placeholder ou real)
 */
const effectiveSrc = computed(() => {
  if (shouldLazy.value && !isIntersecting.value) {
    return props.placeholder || '';
  }
  return props.src;
});

/**
 * Resolve rounded (preset/class/style)
 * Se não fornecido, usa shape (square='', rounded='rounded-md', circle='rounded-full')
 */
const roundedResolved = computed(() => {
  if (props.rounded !== undefined) {
    return resolveRounded(props.rounded);
  }
  // Usa shape padrão (já aplicado via CVA)
  return { class: '', style: {}, preset: 'default' as const };
});

/**
 * Formata valor CSS
 */
const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

/**
 * Normaliza aspectRatio (converte '16:9' → '16/9')
 */
const normalizedAspectRatio = computed(() => {
  if (!props.aspectRatio) return undefined;

  const ratio = String(props.aspectRatio);
  // Converte '16:9' → '16/9' (CSS aspect-ratio aceita ambos, mas / é padrão)
  return ratio.replace(':', '/');
});

/**
 * Style inline - injeta cor + dimensões
 */
const customStyle = computed(() => {
  const styles: Record<string, string> = {};

  // BorderColor customizado
  if (props.borderColor) {
    styles['--corp-runtime-image-border'] = resolveColor(props.borderColor);
  }

  // BorderWidth customizado
  if (props.borderWidth) {
    styles['--corp-runtime-image-border-width'] = formatCssValue(
      props.borderWidth
    );
  }

  // Custom dimensions (sobrescreve size do CVA)
  if (props.width) {
    styles.width = formatCssValue(props.width);
  }
  if (props.height) {
    styles.height = formatCssValue(props.height);
  }

  // Aspect Ratio (previne CLS - Cumulative Layout Shift)
  if (normalizedAspectRatio.value) {
    styles.aspectRatio = normalizedAspectRatio.value;
  }

  // Rounded inline (se fornecido)
  if (roundedResolved.value.style) {
    if (
      typeof roundedResolved.value.style === 'object' &&
      'borderRadius' in roundedResolved.value.style &&
      roundedResolved.value.style.borderRadius
    ) {
      styles.borderRadius = roundedResolved.value.style.borderRadius;
    } else if (typeof roundedResolved.value.style === 'string') {
      styles.borderRadius = roundedResolved.value.style;
    }
  }

  return styles;
});

/**
 * Classes finais da imagem (CVA + rounded + custom)
 */
const imageClasses = computed(() => {
  return cn(
    imageVariants({
      size: props.size as ImageVariants['size'],
      shape: props.shape as ImageVariants['shape'],
      fit: props.fit as ImageVariants['fit'],
      position: props.position as ImageVariants['position'],
      shadow: props.shadow,
      grayscale: props.grayscale,
    }),
    roundedResolved.value.class,
    {
      'opacity-0': shouldLazy.value && !isLoaded.value && !hasError.value,
      'opacity-100': isLoaded.value || hasError.value || !shouldLazy.value,
    },
    props.class
  );
});

// ============== METHODS ==============

const handleLoad = (event: Event): void => {
  isLoaded.value = true;
  hasError.value = false;
  emit('load', event);
};

const handleError = (event: Event): void => {
  hasError.value = true;
  isLoaded.value = false;
  emit('error', event);
};

// ============== LIFECYCLE ==============

onMounted(() => {
  if (!shouldLazy.value || !imgRef.value) return;

  // IntersectionObserver para lazy loading
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isIntersecting.value = true;
          // Desconecta observer após primeira interseção
          if (observer && imgRef.value) {
            observer.unobserve(imgRef.value);
          }
        }
      });
    },
    {
      rootMargin: '50px', // Começa a carregar 50px antes de aparecer
      threshold: 0.01,
    }
  );

  observer.observe(imgRef.value);
});

onBeforeUnmount(() => {
  if (observer && imgRef.value) {
    observer.unobserve(imgRef.value);
    observer.disconnect();
  }
});

// ============== EXPOSE ==============

defineExpose({
  isLoaded,
  hasError,
  reload: () => {
    if (imgRef.value) {
      imgRef.value.src = '';
      imgRef.value.src = props.src;
    }
  },
});
</script>

<template>
  <img
    ref="imgRef"
    v-bind="$attrs"
    :src="effectiveSrc"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :class="imageClasses"
    :style="customStyle"
    :loading="eager ? 'eager' : 'lazy'"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<style scoped>
/* Transition suave de opacidade ao carregar */
img {
  transition: opacity 0.3s ease-in-out;
}
</style>
