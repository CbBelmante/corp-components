<script setup lang="ts">
/**
 * 🧩 CorpIcon - Ícones Lucide com presets de tamanho
 *
 * Suporta size presets (x-small, small, default, large, x-large) ou valores custom.
 *
 * 🔗 DEPENDÊNCIAS:
 * - lucide-vue-next
 * - useLucideIcon (composable)
 */

import { computed, type PropType } from 'vue';
import { getLucideIcon } from '@/composables/useLucideIcon';

// ============== TIPOS ==============

type IconSize =
  | 'x-small'
  | 'small'
  | 'default'
  | 'large'
  | 'x-large'
  | (string & {})
  | number;

// ============== PROPS ==============

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String] as PropType<IconSize>,
    default: 'default',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  strokeWidth: {
    type: Number,
    default: 2,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String as PropType<'i' | 'span' | 'div'>,
    default: 'i',
  },
  start: {
    type: Boolean,
    default: false,
  },
  end: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});

// ============== EMITS ==============

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// ============== SIZE PRESETS ==============

const sizePresets: Record<string, string> = {
  'x-small': '12px',
  small: '16px',
  default: '24px',
  large: '32px',
  'x-large': '40px',
};

// ============== COMPUTED ==============

const iconComponent = computed(() => getLucideIcon(props.name));

const computedSize = computed(() => {
  // Verifica se é um preset
  if (typeof props.size === 'string' && props.size in sizePresets) {
    return sizePresets[props.size];
  }
  // Se for número, converte pra px
  if (typeof props.size === 'number') return `${props.size}px`;
  // Retorna como está (valores custom como '2rem', '1.5em', etc)
  return props.size;
});

const isSpinner = computed(() => {
  const spinnerIcons = [
    'luc-loader-2',
    'luc-loader',
    'luc-refresh-cw',
    'loader-2',
    'loader',
  ];
  return spinnerIcons.includes(props.name);
});

const iconStyles = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
  color: props.color,
  flexShrink: '0',
}));

// ============== METHODS ==============

const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <component
    :is="tag"
    class="corpIcon"
    :class="{
      isStart: start,
      isEnd: end,
      isClickable: clickable && !disabled,
      isDisabled: disabled,
    }"
    @click="handleClick"
  >
    <component
      :is="iconComponent"
      v-if="iconComponent"
      :style="iconStyles"
      :stroke-width="strokeWidth"
      :class="{ 'animate-spin': isSpinner }"
    />
  </component>
</template>

<style scoped>
.corpIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  transition:
    color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.isStart {
  margin-inline-end: 0.5em;
}

.isEnd {
  margin-inline-start: 0.5em;
}

.isClickable {
  cursor: pointer;
  border-radius: 50%;
  padding: 0.25em;
  margin: -0.25em;
}

.isClickable:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.isClickable:active {
  background-color: rgba(0, 0, 0, 0.12);
}

.isDisabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
