<script setup lang="ts">
/**
 * 🎯 CorpPopover - Popover com Floating UI
 *
 * Wrapper do Popover shadcn com API estilo Vuetify
 * Usa floating-ui internamente (via reka-ui) para posicionamento otimizado
 *
 * 🎨 FEATURES:
 * - Triggers: click, hover, focus, manual
 * - Posicionamento inteligente (floating-ui)
 * - Portal/Teleport automático (escapa overflow)
 * - BorderColor e Rounded customizados
 * - v-model:open para controle externo
 * - Slots: #trigger e default
 *
 * 🔗 DEPENDÊNCIAS:
 * - reka-ui (PopoverRoot, PopoverContent, PopoverTrigger)
 * - @floating-ui/vue (via reka-ui)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import type { HTMLAttributes, PropType } from 'vue';
import { computed, ref, watch } from 'vue';
import { useElementBounding } from '@vueuse/core';

// ============== DEPENDÊNCIAS INTERNAS ==============
import Popover from './Popover.vue';
import PopoverTrigger from './PopoverTrigger.vue';
import PopoverContent from './PopoverContent.vue';
import { cn } from '@/lib/utils';
import { resolveColor } from '@/utils/CorpColorUtils';
import { resolveRounded, type RoundedValue } from '@commonStyles';

// ============== TYPES ==============

export type PopoverTriggerType = 'click' | 'hover' | 'focus' | 'manual';
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

// ============== PROPS ==============

const props = defineProps({
  // Trigger: como abre o popover
  trigger: {
    type: String as PropType<PopoverTriggerType>,
    default: 'click',
  },

  // Posicionamento
  side: {
    type: String as PropType<PopoverSide>,
    default: 'bottom',
  },
  align: {
    type: String as PropType<PopoverAlign>,
    default: 'start',
  },
  sideOffset: {
    type: Number,
    default: 8,
  },
  alignOffset: {
    type: Number,
    default: 0,
  },

  // v-model:open (controle externo)
  open: {
    type: Boolean,
    default: undefined,
  },

  // Anchor element - elemento HTML de referência para posicionamento
  anchorEl: {
    type: Object as PropType<HTMLElement | null>,
    default: null,
  },

  // Delay para hover (ms)
  delay: {
    type: Number,
    default: 0,
  },

  // Persistent: não fecha ao clicar fora
  persistent: {
    type: Boolean,
    default: false,
  },

  // Modal: bloqueia interações fora do popover (scroll lock, backdrop)
  // Default: false (não bloqueia scroll)
  modal: {
    type: Boolean,
    default: false,
  },

  // Disabled: desabilita o popover
  disabled: {
    type: Boolean,
    default: false,
  },

  // Collision detection
  avoidCollisions: {
    type: Boolean,
    default: true,
  },
  collisionPadding: {
    type: Number,
    default: 8,
  },

  // Dimensionamento
  minWidth: {
    type: [String, Number],
    default: undefined,
  },
  maxWidth: {
    type: [String, Number],
    default: undefined,
  },
  maxHeight: {
    type: [String, Number],
    default: undefined,
  },
  width: {
    type: [String, Number],
    default: undefined,
  },

  // BorderColor - cor da borda (semantic OU custom: hex, rgb, var(), etc)
  borderColor: {
    type: String,
    default: undefined,
  },

  // Rounded (border-radius)
  rounded: {
    type: [String, Number, Boolean] as PropType<RoundedValue>,
    default: 'default',
  },

  // Content class (para estilizar o conteúdo)
  contentClass: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },

  // Z-index
  zIndex: {
    type: Number,
    default: 50,
  },

  // Unstyled: remove TODOS os estilos base (útil quando o conteúdo já tem seus próprios estilos)
  unstyled: {
    type: Boolean,
    default: false,
  },

  // Debug: torna o anchor invisível visível (vermelho) para debug
  debugAnchor: {
    type: Boolean,
    default: false,
  },

  // Block: popover fica com mesma largura do anchor (útil para dropdowns)
  block: {
    type: Boolean,
    default: false,
  },

  // Animation: tipo de animação (scale, dropdown, fade, none)
  animation: {
    type: [String, Boolean] as PropType<
      'scale' | 'dropdown' | 'fade' | 'none' | false
    >,
    default: 'scale',
  },

  // Remove apenas o padding padrão (mantém bg, border, shadow)
  removeDefaultPadding: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  open: [];
  close: [];
}>();

// ============== STATE ==============

const internalOpen = ref(props.open ?? false);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

// Rastreia posição do anchorEl automaticamente (reage a scroll/resize)
const {
  top: anchorTop,
  left: anchorLeft,
  width: anchorWidth,
  height: anchorHeight,
} = useElementBounding(() => props.anchorEl);

// Estilo para posicionar trigger invisível na posição do anchorEl
const anchorTriggerStyle = computed(() => {
  if (!props.anchorEl) return {};

  // Debug mode: torna anchor visível (vermelho)
  if (props.debugAnchor) {
    return {
      position: 'fixed' as const,
      top: `${anchorTop.value}px`,
      left: `${anchorLeft.value}px`,
      width: `${anchorWidth.value}px`,
      height: `${anchorHeight.value}px`,
      pointerEvents: 'none' as const,
      opacity: 0.5,
      zIndex: 9999,
      backgroundColor: 'red',
      border: '2px solid darkred',
    };
  }

  // Normal: invisível
  return {
    position: 'fixed' as const,
    top: `${anchorTop.value}px`,
    left: `${anchorLeft.value}px`,
    width: `${anchorWidth.value}px`,
    height: `${anchorHeight.value}px`,
    pointerEvents: 'none' as const,
    opacity: 0,
    zIndex: -1,
  };
});

// ============== COMPUTED ==============

/**
 * Sincroniza v-model:open
 */
const isOpen = computed({
  get: () => props.open ?? internalOpen.value,
  set: val => {
    internalOpen.value = val;
    emit('update:open', val);
    if (val) {
      emit('open');
    } else {
      emit('close');
    }
  },
});

/**
 * Resolve rounded (preset/class/style)
 */
const rounded = computed(() => resolveRounded(props.rounded));

/**
 * Formata valor CSS
 */
const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

/**
 * Se usa Vue Transition (animation prop customizada)
 */
const usesVueTransition = computed(() => {
  return props.animation && props.animation !== 'none';
});

/**
 * Classes de animação customizada (Vue Transition CSS)
 */
const customAnimationClass = computed(() => {
  if (!usesVueTransition.value) return '';

  const animType = props.animation;
  if (animType === 'scale') return 'corp-anim-scale';
  if (animType === 'dropdown') return 'corp-anim-dropdown';
  if (animType === 'fade') return 'corp-anim-fade';
  return '';
});

/**
 * Classes do PopoverContent
 */
const popoverContentClasses = computed(() => {
  // Animações Tailwind (apenas se NÃO usa Vue Transition)
  const tailwindAnimations = !usesVueTransition.value
    ? [
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      ]
    : [];

  // Se unstyled, remove TODOS os estilos visuais (bg, border, padding, shadow)
  if (props.unstyled) {
    return cn(
      // Remove estilos base do shadcn
      'p-0 bg-transparent border-0 shadow-none w-auto',
      // Animações (Tailwind ou custom)
      ...tailwindAnimations,
      customAnimationClass.value,
      props.contentClass
    );
  }

  // Com estilos base do shadcn
  return cn(
    // Base shadcn (p-4 ou p-0 se removeDefaultPadding)
    'z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
    props.removeDefaultPadding ? 'p-0' : 'p-4',
    // Animações (Tailwind ou custom)
    ...tailwindAnimations,
    customAnimationClass.value,
    // Rounded
    rounded.value.class,
    // User override
    props.contentClass
  );
});

/**
 * Estilos inline do PopoverContent
 */
const popoverContentStyle = computed(() => {
  const styles: Record<string, string> = {};

  // Se unstyled, NÃO aplica dimensionamento no PopoverContent
  // (deixa o conteúdo interno controlar suas próprias dimensões)
  if (props.unstyled) {
    // Block mode: aplica width do anchor mesmo quando unstyled
    if (props.block && props.anchorEl) {
      styles.width = `${anchorWidth.value}px`;
    }

    // Z-index
    styles.zIndex = String(props.zIndex);
    return styles;
  }

  // BorderColor customizado
  if (props.borderColor) {
    styles.borderColor = resolveColor(props.borderColor);
  }

  // Rounded inline
  if (
    rounded.value.style &&
    typeof rounded.value.style === 'object' &&
    'borderRadius' in rounded.value.style &&
    rounded.value.style.borderRadius
  ) {
    styles.borderRadius = rounded.value.style.borderRadius;
  } else if (rounded.value.style && typeof rounded.value.style === 'string') {
    styles.borderRadius = rounded.value.style;
  }

  // Block mode: width do anchor (sobrescreve width/minWidth/maxWidth)
  if (props.block && props.anchorEl) {
    styles.width = `${anchorWidth.value}px`;
  } else {
    // Dimensionamento manual (apenas quando NÃO block)
    if (props.minWidth) {
      styles.minWidth = formatCssValue(props.minWidth);
    }
    if (props.maxWidth) {
      styles.maxWidth = formatCssValue(props.maxWidth);
    }
    if (props.width) {
      styles.width = formatCssValue(props.width);
    }
  }

  // MaxHeight (independente de block)
  if (props.maxHeight) {
    styles.maxHeight = formatCssValue(props.maxHeight);
  }

  // Z-index
  styles.zIndex = String(props.zIndex);

  return styles;
});

// ============== METHODS ==============

const openPopover = () => {
  if (props.disabled) return;

  if (props.delay > 0 && props.trigger === 'hover') {
    hoverTimeout = setTimeout(() => {
      isOpen.value = true;
    }, props.delay);
  } else {
    isOpen.value = true;
  }
};

const closePopover = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  isOpen.value = false;
};

const togglePopover = () => {
  if (isOpen.value) {
    closePopover();
  } else {
    openPopover();
  }
};

// ============== TRIGGER HANDLERS ==============

/**
 * Props para passar ao slot trigger baseado no tipo de trigger
 */
const triggerHandlers = computed(() => {
  if (props.trigger === 'click') {
    return {
      onClick: togglePopover,
    };
  } else if (props.trigger === 'hover') {
    return {
      onMouseenter: openPopover,
      onMouseleave: closePopover,
    };
  } else if (props.trigger === 'focus') {
    return {
      onFocus: openPopover,
      onBlur: closePopover,
    };
  }
  // manual: sem handlers
  return {};
});

// ============== WATCHERS ==============

// Sincroniza prop open com internal
watch(
  () => props.open,
  newVal => {
    if (newVal !== undefined) {
      internalOpen.value = newVal;
    }
  }
);

// ============== EXPOSE ==============

defineExpose({
  open: openPopover,
  close: closePopover,
  toggle: togglePopover,
  isOpen,
});
</script>

<template>
  <Popover :open="isOpen" :modal="modal" @update:open="val => (isOpen = val)">
    <!-- Trigger: usa anchorEl se fornecido, senão usa slot -->
    <PopoverTrigger
      v-if="props.anchorEl || $slots.trigger"
      as-child
      :disabled="disabled"
    >
      <!-- Se tem anchorEl, cria wrapper invisível na mesma posição do elemento externo -->
      <div
        v-if="props.anchorEl"
        :style="anchorTriggerStyle"
        v-bind="triggerHandlers"
      />
      <!-- Senão, usa slot trigger -->
      <div v-else v-bind="triggerHandlers">
        <slot name="trigger" />
      </div>
    </PopoverTrigger>

    <!-- Content (usa Portal internamente) -->
    <PopoverContent
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-padding="collisionPadding"
      :class="popoverContentClasses"
      :style="popoverContentStyle"
      @mouseenter="trigger === 'hover' ? openPopover() : undefined"
      @mouseleave="trigger === 'hover' ? closePopover() : undefined"
      @interact-outside="
        e => {
          if (persistent) {
            e.preventDefault();
          }
        }
      "
    >
      <slot />
    </PopoverContent>
  </Popover>
</template>

<!-- Animações globais (sem scoped) para funcionar com Portal -->
<style>
/* === ANIMATIONS === */

/* Animação scale (zoom) */
.corp-anim-scale {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.corp-anim-scale[data-state='closed'] {
  opacity: 0;
  transform: scale(0.95);
}

.corp-anim-scale[data-state='open'] {
  opacity: 1;
  transform: scale(1);
}

/* Animação dropdown (mnesis-style) */
.corp-anim-dropdown {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.corp-anim-dropdown[data-state='closed'] {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.corp-anim-dropdown[data-state='open'] {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

/* Animação fade (apenas opacidade) */
.corp-anim-fade {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.corp-anim-fade[data-state='closed'] {
  opacity: 0;
}

.corp-anim-fade[data-state='open'] {
  opacity: 1;
}
</style>
