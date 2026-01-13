<script setup lang="ts">
/**
 * 🎨 CorpProgress - Barra de progresso inspirada no Vuetify
 *
 * Features:
 * - Cores customizáveis (semantic ou custom hex/rgb/hsl)
 * - Indeterminate (loading infinito)
 * - Striped (padrão listrado)
 * - Stream (animação contínua)
 * - Chunks (barra dividida em pedaços)
 * - Buffer (barra secundária)
 * - Clickable (clicar seta valor)
 * - Rounded Vuetify-like (none, xs, sm, md, lg, xl, full, pill, circle, shaped, number, boolean)
 * - Height customizável (preset ou number)
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, ref, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import {
  progressVariants,
  type ProgressRounded,
  type ProgressHeight,
  type ProgressVariants,
} from '.';
import { resolveColor, getComputedColor } from '@/utils/CorpColorUtils';

// ============== PROPS ==============

const props = defineProps({
  // Básicos
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },

  // Cores
  color: {
    type: String,
    default: 'primary',
  },
  bufferColor: {
    type: String,
    default: undefined,
  },

  // Opacidades
  opacity: {
    type: Number,
    default: undefined,
  },
  bgOpacity: {
    type: Number,
    default: undefined,
  },
  bufferOpacity: {
    type: Number,
    default: undefined,
  },

  // Visual
  height: {
    type: [String, Number] as PropType<ProgressHeight | number>,
    default: 'regular',
  },
  rounded: {
    type: [String, Number, Boolean] as PropType<ProgressRounded>,
    default: 'full',
  },
  roundedBar: {
    type: Boolean,
    default: false,
  },

  // Animações
  indeterminate: {
    type: Boolean,
    default: false,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  stream: {
    type: Boolean,
    default: false,
  },
  reverse: {
    type: Boolean,
    default: false,
  },

  // Buffer
  bufferValue: {
    type: Number,
    default: 0,
  },

  // Chunks
  chunkCount: {
    type: Number,
    default: 0,
  },
  chunkGap: {
    type: Number,
    default: 4,
  },
  chunkWidth: {
    type: Number,
    default: undefined,
  },

  // Interação
  clickable: {
    type: Boolean,
    default: false,
  },

  // Estados
  active: {
    type: Boolean,
    default: true,
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
});

// ============== EMITS ==============

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

// ============== REFS ==============

const progressRoot = ref<HTMLDivElement | null>(null);

// ============== COMPUTED PROPERTIES ==============

// Normalized rounded (boolean → string, number → px)
const normalizedRounded = computed<string>(() => {
  if (typeof props.rounded === 'boolean') {
    return props.rounded ? 'full' : 'none';
  }
  if (typeof props.rounded === 'number') {
    return props.rounded === 0 ? 'none' : 'custom';
  }
  return props.rounded;
});

// Normalized height (number → px)
const normalizedHeight = computed<string>(() => {
  if (typeof props.height === 'number') {
    return 'custom';
  }
  return props.height;
});

// Percentage calculation
const percentage = computed<number>(() => {
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100));
});

const bufferPercentage = computed<number>(() => {
  return Math.min(100, Math.max(0, (props.bufferValue / props.max) * 100));
});

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
const customColorStyle = computed(() => {
  const resolved = resolveColor(props.color);
  const hexColor = getComputedColor(resolved);

  const styles: Record<string, string> = {
    '--corp-runtime-progress-bar': resolved,
    '--corp-runtime-progress-bar-hex': hexColor,
  };

  // Buffer color
  if (props.bufferColor) {
    const resolvedBuffer = resolveColor(props.bufferColor);
    styles['--corp-runtime-progress-buffer'] = resolvedBuffer;
  }

  // Opacities
  if (props.opacity !== undefined) {
    styles['--corp-runtime-progress-opacity'] = String(props.opacity);
  }
  if (props.bgOpacity !== undefined) {
    styles['--corp-runtime-progress-bg-opacity'] = String(props.bgOpacity);
  }
  if (props.bufferOpacity !== undefined) {
    styles['--corp-runtime-progress-buffer-opacity'] = String(
      props.bufferOpacity
    );
  }

  // Custom height (number)
  if (typeof props.height === 'number') {
    styles['--corp-runtime-progress-height'] = `${props.height}px`;
  }

  // Custom rounded (number)
  if (typeof props.rounded === 'number' && props.rounded > 0) {
    styles['--corp-runtime-progress-rounded'] = `${props.rounded}px`;
  }

  return styles;
});

// Classes do container (CVA)
const progressClasses = computed(() => {
  return cn(
    progressVariants({
      rounded: normalizedRounded.value as ProgressVariants['rounded'],
      height: normalizedHeight.value as ProgressVariants['height'],
    }),
    {
      // Custom height/rounded via CSS var
      'h-[var(--corp-runtime-progress-height)]':
        typeof props.height === 'number',
      'rounded-[var(--corp-runtime-progress-rounded)]':
        typeof props.rounded === 'number' && props.rounded > 0,
      // Active (hide)
      'h-0': !props.active,
      // Clickable
      'cursor-pointer': props.clickable,
    },
    props.class
  );
});

// Classes da barra
const barClasses = computed(() => {
  return cn('h-full transition-all', {
    // Cor
    'bg-[var(--corp-runtime-progress-bar)]': true,
    // Opacity
    'opacity-[var(--corp-runtime-progress-opacity)]':
      props.opacity !== undefined,
    // Striped
    bgStriped: props.striped,
    animateStriped: props.striped,
    // Stream
    animateStream: props.stream,
    // Rounded bar
    'rounded-[inherit]': props.roundedBar,
    // Indeterminate
    animateIndeterminate: props.indeterminate,
    // Reverse
    'origin-right': props.reverse,
  });
});

// Classes do buffer
const bufferClasses = computed(() => {
  return cn('absolute inset-0 h-full transition-all', {
    'bg-[var(--corp-runtime-progress-buffer)]': props.bufferColor,
    'bg-[hsl(var(--corp-def-progress-buffer))]': !props.bufferColor,
    'opacity-[var(--corp-runtime-progress-buffer-opacity)]':
      props.bufferOpacity !== undefined,
  });
});

// Chunk style
const chunkStyle = computed(() => {
  if (props.chunkCount === 0) return {};

  return {
    '--chunk-count': String(props.chunkCount),
    '--chunk-gap': `${props.chunkGap}px`,
    '--chunk-width': props.chunkWidth ? `${props.chunkWidth}px` : 'auto',
  };
});

// ============== METHODS ==============

const handleClick = (event: MouseEvent): void => {
  if (!props.clickable || !progressRoot.value) return;

  const rect = progressRoot.value.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = (clickX / rect.width) * 100;
  const newValue = Math.min(
    props.max,
    Math.max(0, (percentage / 100) * props.max)
  );

  emit('update:modelValue', Math.round(newValue));
};
</script>

<template>
  <div
    ref="progressRoot"
    :class="progressClasses"
    :style="{ ...customColorStyle, ...chunkStyle }"
    @click="handleClick"
  >
    <!-- Buffer bar (se bufferValue > 0) -->
    <div
      v-if="props.bufferValue > 0 && !props.indeterminate"
      :class="bufferClasses"
      :style="{ width: `${bufferPercentage}%` }"
    />

    <!-- Progress bar -->
    <div
      v-if="!props.chunkCount"
      :class="barClasses"
      :style="props.indeterminate ? {} : { width: `${percentage}%` }"
    >
      <!-- Slot default (content inside bar) -->
      <slot :value="props.modelValue" :buffer="props.bufferValue" />
    </div>

    <!-- Chunks mode -->
    <div
      v-else
      class="flex h-full"
      :style="{
        gap: `${props.chunkGap}px`,
      }"
    >
      <div
        v-for="i in props.chunkCount"
        :key="i"
        :class="barClasses"
        :style="{
          flex: props.chunkWidth ? 'none' : '1',
          width: props.chunkWidth ? `${props.chunkWidth}px` : 'auto',
          opacity: i <= (percentage / 100) * props.chunkCount ? 1 : 0.2,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
/* Striped pattern */
.bgStriped {
  background-image: linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.25) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.25) 0,
    hsla(0, 0%, 100%, 0.25) 75%,
    transparent 0,
    transparent
  );
  background-size: 40px 40px;
}

@keyframes striped {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

.animateStriped {
  animation: striped 1s linear infinite;
}

/* Indeterminate animation */
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animateIndeterminate {
  width: 25% !important;
  animation: indeterminate 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Stream animation */
@keyframes stream {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.animateStream {
  animation: stream 0.25s linear infinite;
}
</style>
