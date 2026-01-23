<script setup lang="ts">
/**
 * 🎯 CorpPopover - Popover Genérico Flutuante
 *
 * Componente base para floating elements (tooltips, dropdowns, menus, etc)
 * Inspirado no v-menu do Vuetify com melhorias modernas.
 *
 * 🎨 FEATURES:
 * - Triggers: click, hover, focus, manual
 * - Posicionamento inteligente: top, bottom, left, right, auto
 * - Alinhamento: start, center, end
 * - Delay configurável (hover)
 * - Click outside automático
 * - Scroll handling
 * - Transitions suaves
 * - Slots: activator + default
 */

import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { onClickOutside } from '@vueuse/core';

// ============== TYPES ==============

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverTransition =
  | 'scale'
  | 'dropdown'
  | 'fade'
  | 'slide'
  | 'none';

// ============== PROPS ==============

const props = defineProps({
  // Trigger: como abre o popover
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click',
  },

  // Posicionamento: lado do trigger
  side: {
    type: String as PropType<PopoverSide>,
    default: 'bottom',
  },

  // Alinhamento: onde alinha no lado escolhido
  align: {
    type: String as PropType<PopoverAlign>,
    default: 'start',
  },

  // Controle manual de abertura (v-model)
  modelValue: {
    type: Boolean,
    default: false,
  },

  // Delay para abrir/fechar (apenas hover)
  delay: {
    type: Number,
    default: 0,
  },

  // Offset: distância do elemento trigger (em pixels)
  offset: {
    type: Number,
    default: 8,
  },

  // Persistent: não fecha ao clicar fora
  persistent: {
    type: Boolean,
    default: false,
  },

  // Disabled: desabilita o popover
  disabled: {
    type: Boolean,
    default: false,
  },

  // Transition: nome da transição ou 'none' para desabilitar
  transition: {
    type: String as PropType<PopoverTransition>,
    default: 'scale',
  },

  // Dimensionamento
  minWidth: {
    type: [String, Number],
    default: 200,
  },
  maxWidth: {
    type: [String, Number],
    default: '100%',
  },
  maxHeight: {
    type: [String, Number],
    default: 400,
  },

  // Z-index
  zIndex: {
    type: Number,
    default: 20,
  },

  // Define qual elemento usar como âncora para posicionamento (quando trigger='manual')
  // 'sibling': Elemento irmão anterior (ex: input antes do popover)
  // 'parent': Elemento pai (container)
  // 'auto': Tenta sibling, se não existir usa parent (padrão)
  anchorTo: {
    type: String as PropType<'sibling' | 'parent' | 'auto'>,
    default: 'auto',
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  open: [];
  close: [];
}>();

// ============== STATE ==============

const isOpen = ref(props.modelValue);
const activatorRef = ref<HTMLElement | null>(null);
const popoverRef = ref<HTMLElement | null>(null);
const popoverWrapperRef = ref<HTMLElement | null>(null);
const positionTrigger = ref(0);

let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

// ============== COMPUTED ==============

/**
 * Nome da transição
 */
const transitionName = computed(() => {
  if (props.transition === 'none') return '';
  return props.transition;
});

/**
 * Formata valores CSS
 */
const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

/**
 * Calcula estilos do popover baseado na posição
 */
const popoverStyles = computed(() => {
  // Força recálculo quando positionTrigger muda
  void positionTrigger.value;

  const styles: Record<string, string> = {
    minWidth: formatCssValue(props.minWidth),
    maxWidth: formatCssValue(props.maxWidth),
    maxHeight: formatCssValue(props.maxHeight),
    zIndex: String(props.zIndex),
  };

  if (!isOpen.value) {
    return styles;
  }

  // Determina elemento de referência para posicionamento
  let anchorElement: HTMLElement | null = null;

  // Modo manual com anchorTo: busca sibling/parent
  if (props.trigger === 'manual' && popoverWrapperRef.value) {
    if (props.anchorTo === 'sibling') {
      anchorElement = popoverWrapperRef.value
        .previousElementSibling as HTMLElement;
    } else if (props.anchorTo === 'parent') {
      anchorElement = popoverWrapperRef.value.parentElement;
    } else {
      // auto: tenta sibling, fallback para parent
      anchorElement =
        (popoverWrapperRef.value.previousElementSibling as HTMLElement) ||
        popoverWrapperRef.value.parentElement;
    }
  } else {
    // Modo normal: usa activatorRef
    anchorElement = activatorRef.value;
  }

  if (!anchorElement) {
    return styles;
  }

  const rect = anchorElement.getBoundingClientRect();
  const { side, align, offset } = props;

  // Calcula posição baseada no side
  switch (side) {
    case 'bottom':
    case 'auto': // default = bottom
      styles.top = `${rect.bottom + offset}px`;
      break;
    case 'top':
      styles.bottom = `${window.innerHeight - rect.top + offset}px`;
      break;
    case 'left':
      styles.right = `${window.innerWidth - rect.left + offset}px`;
      break;
    case 'right':
      styles.left = `${rect.right + offset}px`;
      break;
  }

  // Calcula alinhamento
  if (side === 'bottom' || side === 'top' || side === 'auto') {
    // Horizontal alignment
    switch (align) {
      case 'start':
        styles.left = `${rect.left}px`;
        break;
      case 'center':
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
        break;
      case 'end':
        styles.right = `${window.innerWidth - rect.right}px`;
        break;
    }
  } else {
    // Vertical alignment
    switch (align) {
      case 'start':
        styles.top = `${rect.top}px`;
        break;
      case 'center':
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
        break;
      case 'end':
        styles.bottom = `${window.innerHeight - rect.bottom}px`;
        break;
    }
  }

  return styles;
});

// ============== METHODS ==============

/**
 * Abre o popover
 */
const open = () => {
  if (props.disabled) return;

  if (props.delay > 0 && props.trigger === 'hover') {
    hoverTimeout = setTimeout(() => {
      isOpen.value = true;
      emit('update:modelValue', true);
      emit('open');
    }, props.delay);
  } else {
    isOpen.value = true;
    emit('update:modelValue', true);
    emit('open');

    // Recalcula posição no próximo tick
    nextTick(() => {
      positionTrigger.value++;
    });
  }
};

/**
 * Fecha o popover
 */
const close = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }

  isOpen.value = false;
  emit('update:modelValue', false);
  emit('close');
};

/**
 * Toggle
 */
const toggle = () => {
  if (isOpen.value) {
    close();
  } else {
    open();
  }
};

// ============== WATCHERS ==============

watch(
  () => props.modelValue,
  newVal => {
    isOpen.value = newVal;
  }
);

// Recalcula posição durante scroll
watch(isOpen, newIsOpen => {
  if (newIsOpen) {
    const handleScroll = () => {
      positionTrigger.value++;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }
});

// ============== CLICK OUTSIDE ==============

onClickOutside(popoverRef, () => {
  if (!props.persistent && props.trigger !== 'hover') {
    close();
  }
});

// ============== ACTIVATOR PROPS ==============

/**
 * Props para passar ao slot activator
 */
const activatorProps = computed(() => {
  const handlers: Record<string, unknown> = {
    ref: activatorRef,
  };

  if (props.trigger === 'click') {
    handlers.onClick = toggle;
  } else if (props.trigger === 'hover') {
    handlers.onMouseenter = open;
    handlers.onMouseleave = close;
  } else if (props.trigger === 'focus') {
    handlers.onFocus = open;
    handlers.onBlur = close;
  }

  return handlers;
});

// ============== LIFECYCLE ==============

onMounted(() => {
  // Se já está aberto, calcula posição
  if (isOpen.value) {
    nextTick(() => {
      positionTrigger.value++;
    });
  }
});

onUnmounted(() => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }
});

// ============== EXPOSE ==============

defineExpose({
  open,
  close,
  toggle,
  isOpen,
});
</script>

<template>
  <div ref="popoverWrapperRef" class="corpPopover">
    <!-- Slot Activator (Trigger) -->
    <slot name="activator" :props="activatorProps" />

    <!-- Popover Content -->
    <Transition :name="transitionName" appear>
      <div
        v-if="isOpen"
        ref="popoverRef"
        class="corpPopoverContent"
        :style="popoverStyles"
        @mouseenter="trigger === 'hover' ? open() : undefined"
        @mouseleave="trigger === 'hover' ? close() : undefined"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* === POPOVER WRAPPER === */
.corpPopover {
  display: inline-block;
  position: relative;
}

/* === POPOVER CONTENT === */
.corpPopoverContent {
  position: fixed;
  border-radius: 0.5rem;
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  border: 1px solid hsl(var(--border));
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: top center;
}

/* === ANIMATIONS === */

/* Transição scale (zoom) */
.scale-enter-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Transição dropdown (mnesis-style) */
.dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

/* Scrollbar customizada */
.corpPopoverContent::-webkit-scrollbar {
  width: 8px;
}

.corpPopoverContent::-webkit-scrollbar-track {
  background: transparent;
}

.corpPopoverContent::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.3);
  border-radius: 4px;
}

.corpPopoverContent::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.5);
}
</style>
