<script setup lang="ts">
/**
 * 🧩 CorpButton - Botão com ícones e loading
 *
 * Props declarativas para ícones (prependIcon/appendIcon) e loading state.
 *
 * 🔗 DEPENDÊNCIAS:
 * - CorpIcon
 * - reka-ui Primitive
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { Primitive } from 'reka-ui';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, useSlots, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants, SEMANTIC_COLORS } from '.';
import CorpIcon from '@components/ui/icon/CorpIcon.vue';
import { resolveColor } from '@/utils/CorpColorUtils';

// ============== TIPOS ==============

type RoundedPreset = 'default' | 'none' | 'sm' | 'lg' | 'xl' | 'full';
type ElevatedPreset = 0 | 1 | 2 | 3 | 4 | 6;

// ============== PROPS ==============

const props = defineProps({
  // CVA Variants
  variant: {
    type: String as PropType<ButtonVariants['variant']>,
    default: 'solid',
  },
  color: {
    type: String as PropType<ButtonVariants['color'] | string>,
    default: 'primary',
  },
  size: {
    type: String as PropType<ButtonVariants['size']>,
    default: 'default',
  },

  // Custom color overrides
  bgColor: {
    type: String,
    default: undefined,
  },
  textColor: {
    type: String,
    default: undefined,
  },
  rounded: {
    // Aceita presets (default, none, sm, lg, xl, full) OU valores custom (rounded-3xl, 10px, etc)
    type: String,
    default: 'default',
  },
  elevated: {
    // Aceita presets (0, 1, 2, 3, 4, 6) OU classes Tailwind custom (shadow-2xl, shadow-[...])
    type: [Number, String],
    default: undefined,
  },

  // Layout Props
  block: {
    type: Boolean,
    default: false,
  },
  stacked: {
    type: Boolean,
    default: false,
  },

  // Primitive Props
  as: {
    type: [String, Object] as PropType<string | object>,
    default: 'button',
  },
  asChild: {
    type: Boolean,
    default: false,
  },

  // Estados
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  // ============== PROPS DE ÍCONES ==============

  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  iconSize: {
    // Override do tamanho automático (herda do texto por default)
    type: [Number, String],
    default: undefined,
  },
  /** Cor do ícone prepend (aceita: hex, rgb, 'primary', 'var(--accent)', etc) */
  pIconColor: {
    type: String,
    default: undefined,
  },
  /** Cor do ícone append (aceita: hex, rgb, 'primary', 'var(--accent)', etc) */
  apIconColor: {
    type: String,
    default: undefined,
  },

  // HTML
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<string | object | unknown[]>,
    default: undefined,
  },
});

const roundedPresets: RoundedPreset[] = [
  'default',
  'none',
  'sm',
  'lg',
  'xl',
  'full',
];

const elevatedPresets: ElevatedPreset[] = [0, 1, 2, 3, 4, 6];

// ============== SLOTS ==============

const slots = useSlots();

// ============== COMPUTED ==============

const isDisabled = computed(() => props.disabled || props.loading);

const showPrependSlot = computed(() => !!slots.prepend);
const showPrependIcon = computed(() => {
  if (showPrependSlot.value) return false;
  return props.loading || !!props.prependIcon;
});

const showAppendSlot = computed(() => !!slots.append);
const showAppendIcon = computed(() => {
  if (showAppendSlot.value) return false;
  if (props.loading) return false;
  return !!props.appendIcon;
});

const currentPrependIcon = computed(() => {
  if (props.loading) return 'luc-loader-2';
  return props.prependIcon;
});

// Verifica se rounded é preset ou custom
const isRoundedPreset = computed(() =>
  roundedPresets.includes(props.rounded as RoundedPreset)
);

// Classes custom de rounded (quando não é preset)
const customRoundedClass = computed(() => {
  if (isRoundedPreset.value) return '';
  // Se começa com "rounded", é classe Tailwind
  if (props.rounded.startsWith('rounded')) return props.rounded;
  // Senão, assume que é valor CSS (será aplicado via style)
  return '';
});

// Style custom de rounded (quando é valor CSS tipo "10px", "1rem")
const customRoundedStyle = computed(() => {
  if (isRoundedPreset.value) return {};
  if (props.rounded.startsWith('rounded')) return {};
  return { borderRadius: props.rounded };
});

// Verifica se elevated é preset ou custom
const isElevatedPreset = computed(() => {
  if (props.elevated === undefined) return false;
  const numValue =
    typeof props.elevated === 'string'
      ? parseInt(props.elevated)
      : props.elevated;
  return elevatedPresets.includes(numValue as ElevatedPreset);
});

// Classes custom de elevated (quando não é preset)
const customElevatedClass = computed(() => {
  if (!props.elevated || isElevatedPreset.value) return '';
  // Se começa com "shadow", é classe Tailwind
  if (String(props.elevated).startsWith('shadow'))
    return String(props.elevated);
  return '';
});

// Verifica se color é preset (semântico) ou custom
const isColorPreset = computed(() => {
  return SEMANTIC_COLORS.includes(props.color as any);
});

// Custom color styles (bgColor/textColor overrides OU color não-preset)
const customColorStyle = computed(() => {
  const styles: Record<string, string> = {};

  // bgColor tem prioridade sobre color
  if (props.bgColor) {
    styles.backgroundColor = resolveColor(props.bgColor);
  } else if (!isColorPreset.value && props.color) {
    // Color customizado (não-preset) - aplica conforme variant
    const resolvedColor = resolveColor(props.color);

    if (props.variant === 'solid') {
      styles.backgroundColor = resolvedColor;
      styles.color = 'white'; // texto branco em fundo colorido
    } else if (props.variant === 'outline') {
      styles.borderColor = resolvedColor;
      styles.color = resolvedColor;
    } else if (props.variant === 'ghost' || props.variant === 'link') {
      styles.color = resolvedColor;
    }
  }

  // textColor tem prioridade final
  if (props.textColor) {
    styles.color = resolveColor(props.textColor);
  }

  return styles;
});

// Combina custom rounded + custom color styles
const buttonStyle = computed(() => {
  return {
    ...customRoundedStyle.value,
    ...customColorStyle.value,
  };
});

const buttonClasses = computed(() => {
  return cn(
    buttonVariants({
      variant: props.variant,
      color: isColorPreset.value ? (props.color as ButtonVariants['color']) : undefined,
      size: props.size,
      rounded: isRoundedPreset.value
        ? (props.rounded as RoundedPreset)
        : undefined,
      elevated: isElevatedPreset.value
        ? (props.elevated as ElevatedPreset)
        : undefined,
      block: props.block,
      stacked: props.stacked,
    }),
    customRoundedClass.value,
    customElevatedClass.value,
    props.class
  );
});

// Tamanho do ícone: prop > default (1em herda do texto)
const computedIconSize = computed(() => props.iconSize || '1em');

// Cores resolvidas dos ícones (suporta nomes, hex, rgb, variáveis CSS)
const resolvedPrependIconColor = computed(() =>
  props.pIconColor ? resolveColor(props.pIconColor) : 'currentColor'
);

const resolvedAppendIconColor = computed(() =>
  props.apIconColor ? resolveColor(props.apIconColor) : 'currentColor'
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :type="type"
    :disabled="isDisabled"
    :class="buttonClasses"
    :style="buttonStyle"
  >
    <!-- Prepend: Slot > Loading/Icon -->
    <slot name="prepend">
      <CorpIcon
        v-if="showPrependIcon && currentPrependIcon"
        :icon="currentPrependIcon"
        :size="computedIconSize"
        :color="resolvedPrependIconColor"
      />
    </slot>

    <!-- Conteúdo principal -->
    <slot />

    <!-- Append: Slot > Icon -->
    <slot name="append">
      <CorpIcon
        v-if="showAppendIcon && appendIcon"
        :icon="appendIcon"
        :size="computedIconSize"
        :color="resolvedAppendIconColor"
      />
    </slot>
  </Primitive>
</template>
