<script setup lang="ts">
/**
 * 🧩 CorpIcon - Ícones Multi-Library (Lucide + FontAwesome)
 *
 * Suporta múltiplas bibliotecas de ícones via prefixos:
 * - `luc:home` ou `Home` → Lucide Icons
 * - `fa:fas fa-user` → FontAwesome Solid
 * - `fa:far fa-heart` → FontAwesome Regular
 * - `fa:fab fa-github` → FontAwesome Brands
 *
 * 🔗 DEPENDÊNCIAS:
 * - lucide-vue-next
 * - @fortawesome/* (opcional, para ícones FA)
 */

import { computed, type PropType } from 'vue';
import { getLucideIcon } from '@/composables/useLucideIcon';
import { getFontAwesomeIcon } from '@/composables/useFontAwesome';
import { resolveColor } from '@/utils/CorpColorUtils';

// ============== TIPOS ==============

type IIconSize =
  | 'x-small'
  | 'small'
  | 'default'
  | 'large'
  | 'x-large'
  | (string & {})
  | number;

type IIconLibrary = 'lucide' | 'fontawesome';

// ============== PROPS ==============

const props = defineProps({
  /**
   * Nome/identificador do ícone
   *
   * Formatos suportados:
   * - Lucide: `Home`, `luc:home`, `luc-home`
   * - FontAwesome: `fa:fas fa-user`, `fa:far fa-heart`, `fa:fab fa-github`
   */
  icon: {
    type: String,
    required: true,
  },
  /**
   * @deprecated Use `icon` instead
   */
  name: {
    type: String,
    default: undefined,
  },
  size: {
    type: [Number, String] as PropType<IIconSize>,
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

/**
 * Resolve o nome do ícone (suporta prop legacy `name`)
 */
const resolvedIcon = computed(() => props.icon || props.name || '');

/**
 * Detecta qual biblioteca usar baseado no prefixo
 * Suporta: fa: ou fa- para FontAwesome, luc: ou luc- para Lucide
 */
const iconLibrary = computed((): IIconLibrary => {
  const iconName = resolvedIcon.value;

  // Prefixo FontAwesome: fa: ou fa-
  if (iconName.startsWith('fa:') || iconName.startsWith('fa-')) {
    return 'fontawesome';
  }

  return 'lucide';
});

/**
 * Nome do ícone sem o prefixo da biblioteca
 * Suporta: fa: fa- luc: luc-
 */
const iconNameClean = computed(() => {
  const iconName = resolvedIcon.value;

  // FontAwesome: fa: ou fa-
  if (iconName.startsWith('fa:')) {
    return iconName.slice(3); // Remove 'fa:'
  }
  if (iconName.startsWith('fa-')) {
    return iconName.slice(3); // Remove 'fa-'
  }

  // Lucide: luc: ou luc-
  if (iconName.startsWith('luc:')) {
    return iconName.slice(4); // Remove 'luc:'
  }
  if (iconName.startsWith('luc-')) {
    return iconName.slice(4); // Remove 'luc-'
  }

  return iconName;
});

/**
 * Componente do ícone baseado na biblioteca
 */
const iconComponent = computed(() => {
  if (iconLibrary.value === 'fontawesome') {
    return getFontAwesomeIcon(iconNameClean.value);
  }

  return getLucideIcon(iconNameClean.value);
});

const computedSize = computed(() => {
  if (typeof props.size === 'string' && props.size in sizePresets) {
    return sizePresets[props.size];
  }
  if (typeof props.size === 'number') return `${props.size}px`;
  return props.size;
});

const isSpinner = computed(() => {
  const spinnerIcons = [
    'luc-loader-2',
    'luc-loader',
    'luc-refresh-cw',
    'loader-2',
    'loader',
    'fa:fas fa-spinner',
    'fa:fas fa-circle-notch',
  ];
  return spinnerIcons.includes(resolvedIcon.value);
});

/**
 * Resolve a cor do ícone (suporta nomes, hex, rgb, variáveis CSS)
 */
const resolvedColor = computed(() => {
  if (!props.color || props.color === 'currentColor') return 'currentColor';
  return resolveColor(props.color);
});

const iconStyles = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
  color: resolvedColor.value,
  flexShrink: '0',
}));

/**
 * Props específicas para cada biblioteca
 */
const iconProps = computed(() => {
  if (iconLibrary.value === 'fontawesome') {
    return {
      style: iconStyles.value,
      class: { 'animate-spin': isSpinner.value },
    };
  }

  // Lucide
  return {
    style: iconStyles.value,
    'stroke-width': props.strokeWidth,
    class: { 'animate-spin': isSpinner.value },
  };
});

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
    <component :is="iconComponent" v-if="iconComponent" v-bind="iconProps" />
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
