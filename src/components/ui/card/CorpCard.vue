<script setup lang="ts">
/**
 * 🧩 CorpCard - Card com variantes, cores e links
 *
 * Suporta variantes (elevated, flat, outlined, tonal),
 * cores customizadas, density, hover effects e navegação.
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - CorpColorUtils (resolução de cores runtime)
 * - vue-router (opcional, para prop 'to')
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, useSlots, type PropType } from 'vue';
import { useRouter, type RouteLocationRaw } from 'vue-router';
import { cn } from '@/lib/utils';
import {
  cardVariants,
  cardHeaderDensityMap,
  cardContentDensityMap,
  cardFooterDensityMap,
  type CardVariant,
  type CardElevation,
  type CardRoundedPreset,
} from '.';
import {
  resolveColor,
  toRgba,
  getComputedColor,
  getContrastColor,
} from '@/utils/CorpColorUtils';
import { resolveRounded } from '@/components/ui/commonStyles';
import type { Density, RoundedValue } from '@/components/ui/commonStyles';

// ============== PROPS ==============

const props = defineProps({
  // CVA Variants
  variant: {
    type: String as PropType<CardVariant>,
    default: 'elevated',
  },
  density: {
    type: String as PropType<Density>,
    default: 'regular',
  },
  elevation: {
    type: String as PropType<CardElevation>,
    default: undefined,
  },
  rounded: {
    type: [String, Number, Boolean] as PropType<RoundedValue>,
    default: 'default',
  },

  // Color
  color: {
    type: String,
    default: undefined,
  },
  bgColor: {
    type: String,
    default: undefined,
  },
  textColor: {
    type: String,
    default: undefined,
  },
  borderColor: {
    type: String,
    default: undefined,
  },

  // Content shortcuts
  title: {
    type: String,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: undefined,
  },

  // Estados
  hover: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  // Navegação
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
});

// ============== EMITS ==============

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// ============== SLOTS ==============

const slots = useSlots();

// ============== ROUTER ==============

const router = useRouter();

// ============== COMPUTED ==============

// Detecta se é clicável (tem link ou hover)
const isClickable = computed(() => {
  return !!(props.to || props.href || props.hover);
});

// Tag do elemento (a se href, div se não)
const tag = computed(() => {
  if (props.href) return 'a';
  return 'div';
});

// Resolve rounded
const rounded = computed(() => resolveRounded(props.rounded));

// Custom color styles
const customColorStyle = computed(() => {
  const styles: Record<string, string> = {};

  // bgColor tem prioridade
  if (props.bgColor) {
    const resolved = resolveColor(props.bgColor);
    styles.backgroundColor = resolved;
    // Calcula contraste para bgColor
    styles['--corp-runtime-card-contrast'] = getContrastColor(resolved);
  } else if (props.color) {
    const resolved = resolveColor(props.color);
    const hex = getComputedColor(resolved);
    styles['--corp-runtime-card-color'] = resolved;

    if (props.variant === 'tonal') {
      // Tonal: usa cor com opacidade baixa, texto na cor
      styles.backgroundColor = toRgba(hex, 0.1);
    } else if (props.variant === 'elevated' || props.variant === 'flat') {
      // Elevated/Flat: fundo sólido na cor, texto com contraste
      styles.backgroundColor = resolved;
      styles['--corp-runtime-card-contrast'] = getContrastColor(hex);
    }
    // Outlined: não altera background
  }

  // textColor tem prioridade final
  if (props.textColor) {
    styles.color = resolveColor(props.textColor);
  }

  // borderColor
  if (props.borderColor) {
    styles.borderColor = resolveColor(props.borderColor);
  } else if (props.color && props.variant === 'outlined') {
    styles.borderColor = 'var(--corp-runtime-card-color)';
  }

  return styles;
});

// Classes de cor
const colorClasses = computed(() => {
  if (!props.color && !props.bgColor) return [];

  const classes: string[] = [];
  const hasTextOverride = !!props.textColor;

  // Elevated/Flat com cor: usa contraste calculado
  if (
    (props.variant === 'elevated' || props.variant === 'flat') &&
    (props.color || props.bgColor) &&
    !hasTextOverride
  ) {
    classes.push('text-[var(--corp-runtime-card-contrast)]');
  }

  // Tonal: texto na cor (bg já é transparente)
  if (props.variant === 'tonal' && props.color && !hasTextOverride) {
    classes.push('text-[var(--corp-runtime-card-color)]');
  }

  // Outlined com cor: texto na cor
  if (props.variant === 'outlined' && props.color && !hasTextOverride) {
    classes.push('text-[var(--corp-runtime-card-color)]');
  }

  return classes;
});

// Cor do título (contraste quando tem cor, senão default do tema)
const titleColor = computed(() => {
  const hasColorOverride =
    (props.color || props.bgColor) &&
    (props.variant === 'elevated' || props.variant === 'flat');
  if (hasColorOverride && !props.textColor) {
    return 'var(--corp-runtime-card-contrast)';
  }
  if (props.variant === 'tonal' && props.color && !props.textColor) {
    return 'var(--corp-runtime-card-color)';
  }
  if (props.variant === 'outlined' && props.color && !props.textColor) {
    return 'var(--corp-runtime-card-color)';
  }
  return 'hsl(var(--corp-def-card-title-color))';
});

// Cor do subtítulo (contraste com opacidade ou default do tema)
const subtitleColor = computed(() => {
  const hasColorOverride =
    (props.color || props.bgColor) &&
    (props.variant === 'elevated' || props.variant === 'flat');
  if (hasColorOverride && !props.textColor) {
    // Subtítulo usa mesma cor mas com opacidade menor (mais suave)
    return 'var(--corp-runtime-card-contrast)';
  }
  if (props.variant === 'tonal' && props.color && !props.textColor) {
    return 'var(--corp-runtime-card-color)';
  }
  if (props.variant === 'outlined' && props.color && !props.textColor) {
    return 'hsl(var(--corp-def-card-subtitle-color))';
  }
  return 'hsl(var(--corp-def-card-subtitle-color))';
});

// Density classes para header
const headerDensityClass = computed(() => {
  return cardHeaderDensityMap[props.density];
});

// Density classes para content
const contentDensityClass = computed(() => {
  return cardContentDensityMap[props.density];
});

// Density classes para footer
const footerDensityClass = computed(() => {
  return cardFooterDensityMap[props.density];
});

// Verifica se tem header (title/subtitle props ou slot)
const hasHeader = computed(() => {
  return !!(props.title || props.subtitle || slots.title || slots.subtitle);
});

// Verifica se tem footer (actions slot)
const hasFooter = computed(() => {
  return !!slots.actions;
});

// Card classes finais
const cardClasses = computed(() => {
  return cn(
    cardVariants({
      variant: props.variant,
      density: props.density,
      elevation: props.elevation,
      rounded: rounded.value.preset as CardRoundedPreset,
      hover: props.hover,
      disabled: props.disabled,
      clickable: isClickable.value,
    }),
    rounded.value.class,
    colorClasses.value,
    props.class
  );
});

// Combina styles
const cardStyle = computed(() => {
  return {
    ...rounded.value.style,
    ...customColorStyle.value,
  };
});

// ============== MÉTODOS ==============

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;

  emit('click', event);

  // Navegação via vue-router
  if (props.to) {
    router.push(props.to);
  }
};
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :class="cardClasses"
    :style="cardStyle"
    @click="handleClick"
  >
    <!-- Loading overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 z-10 flex items-center justify-center bg-background/50"
    >
      <div
        class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
      />
    </div>

    <!-- Image slot -->
    <slot name="image" />

    <!-- Header (slot ou props) -->
    <template v-if="hasHeader">
      <slot name="header">
        <div :class="cn('flex flex-col gap-y-1.5', headerDensityClass)">
          <!-- Prepend -->
          <div v-if="slots.prepend" class="mb-2">
            <slot name="prepend" />
          </div>

          <!-- Title -->
          <slot name="title">
            <h3
              v-if="title"
              class="font-semibold leading-none tracking-tight"
              :style="{ color: titleColor }"
            >
              {{ title }}
            </h3>
          </slot>

          <!-- Subtitle -->
          <slot name="subtitle">
            <p
              v-if="subtitle"
              class="text-sm opacity-80"
              :style="{ color: subtitleColor }"
            >
              {{ subtitle }}
            </p>
          </slot>

          <!-- Append (header) -->
          <div v-if="slots.append" class="mt-2">
            <slot name="append" />
          </div>
        </div>
      </slot>
    </template>

    <!-- Content -->
    <div v-if="slots.default" :class="contentDensityClass">
      <slot />
    </div>

    <!-- Footer / Actions -->
    <template v-if="hasFooter">
      <slot name="footer">
        <div :class="cn('flex items-center gap-2', footerDensityClass)">
          <slot name="actions" />
        </div>
      </slot>
    </template>
  </component>
</template>
