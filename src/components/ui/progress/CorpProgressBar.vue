<script setup lang="ts">
/**
 * 🧩 CorpProgressBar - Barra de progresso com cores customizáveis
 *
 * Suporta cores customizadas (semantic ou hex/rgb).
 * Disabled state derivado da cor escolhida (seguindo padrão Checkbox/Button).
 *
 * FEATURES:
 * - Hierarquia de cores: color (semântico) → barColor/trackColor (overrides)
 * - Animações: indeterminate, striped, stream
 * - Chunks (barra dividida) e buffer (barra secundária)
 * - Clickable para interação
 * - Disabled com cor derivada (light mode: lighten, dark mode: darken)
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - CorpColorUtils (resolveColor, lighten, darken)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
// Nenhuma

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, ref, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import {
  progressVariants,
  getProgressColors,
  type ProgressHeight,
  type ProgressVariants,
} from '.';
import { resolveColor, getComputedColor, darken } from '@/utils/CorpColorUtils';
import { resolveRounded, type RoundedValue } from '@commonStyles';

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
  barColor: {
    type: String,
    default: undefined,
  },
  trackColor: {
    type: String,
    default: undefined,
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
  trackOpacity: {
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
    type: [String, Number, Boolean] as PropType<RoundedValue>,
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

// ============== CONSTANTES DE ANIMAÇÃO ==============
const ANIMATION_DURATIONS = {
  STRIPED: '2s',
  INDETERMINATE: '2.2s',
  STREAM: '1.5s',
} as const;

const STRIPED_PATTERN_SIZE = '20px';

// ============== REFS ==============

const progressRoot = ref<HTMLDivElement | null>(null);

// ============== COMPUTED PROPERTIES ==============

// Resolve rounded (preset/class/style)
const rounded = computed(() => resolveRounded(props.rounded));

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
// resolveColor() trata: 'primary' → hsl(var(--primary)), '#FF0000' → #FF0000, 'red' → red
const customColorStyle = computed(() => {
  const styles: Record<string, string> = {};

  const finalBarColor = props.barColor || props.color || 'primary';
  const resolved = resolveColor(finalBarColor);
  const hexColor = getComputedColor(resolved);
  const progressColors = getProgressColors(hexColor);

  // ENABLED
  styles['--corp-runtime-progress-bar'] = resolved;
  styles['--corp-runtime-progress-bar-hex'] = hexColor;

  // DISABLED
  styles['--corp-runtime-progress-bar-disabled-light'] =
    progressColors.disabled.bar.light;
  styles['--corp-runtime-progress-bar-disabled-dark'] =
    progressColors.disabled.bar.dark;
  styles['--corp-runtime-progress-track-disabled-light'] =
    progressColors.disabled.track.light;
  styles['--corp-runtime-progress-track-disabled-dark'] =
    progressColors.disabled.track.dark;

  // Track color
  if (props.trackColor) {
    styles['--corp-runtime-progress-bar-track'] = resolveColor(
      props.trackColor
    );
  } else {
    styles['--corp-runtime-progress-bar-track'] = darken(hexColor, 40);
  }

  // Buffer color
  if (props.bufferColor) {
    styles['--corp-runtime-progress-buffer'] = resolveColor(props.bufferColor);
  } else {
    styles['--corp-runtime-progress-buffer'] = progressColors.buffer;
  }

  // Opacities
  if (props.opacity !== undefined) {
    styles['--corp-runtime-progress-opacity'] = String(props.opacity);
  }
  if (props.trackOpacity !== undefined) {
    styles['--corp-runtime-progress-bar-track-opacity'] = String(
      props.trackOpacity
    );
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

  return styles;
});

// Classes de cor - SEMPRE usa runtime (track deriva da barra)
const colorClasses = computed(() => {
  // Track sempre usa runtime (derivada ou override) - nunca mais usa default do tema
  return ['bg-[var(--corp-runtime-progress-bar-track)]'];
});

// Combina custom rounded + custom color + custom height styles
const progressStyle = computed(() => {
  return {
    ...rounded.value.style,
    ...customColorStyle.value,
  };
});

// Classes do container (CVA)
const progressClasses = computed(() => {
  return cn(
    progressVariants({
      rounded: rounded.value.preset,
      height: normalizedHeight.value as ProgressVariants['height'],
    }),
    rounded.value.class,
    colorClasses.value,
    {
      // Track opacity override
      'opacity-[var(--corp-runtime-progress-bar-track-opacity)]':
        props.trackOpacity !== undefined,
      // Custom height via CSS var
      'h-[var(--corp-runtime-progress-height)]':
        typeof props.height === 'number',
      // Active (hide)
      'h-0': !props.active,
      // Disabled state (seguindo padrão Checkbox)
      'corp-progress-disabled': !props.active,
      // Clickable
      'cursor-pointer': props.clickable,
    },
    props.class
  );
});

// Classes da barra
const barClasses = computed(() => {
  return cn('relative z-10 h-full transition-all', {
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

// Classes do buffer - sempre usa runtime (derivado da cor da barra)
const bufferClasses = computed(() => {
  return cn('absolute inset-0 h-full transition-all', {
    'bg-[var(--corp-runtime-progress-buffer)]': true,
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
    :style="{ ...progressStyle, ...chunkStyle }"
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

    <!-- Slot overlay: conteúdo sobre toda a barra (centralizado em 100% da largura) -->
    <div
      v-if="$slots.overlay"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <slot
        name="overlay"
        :value="props.modelValue"
        :buffer="props.bufferValue"
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
  background-size: v-bind(STRIPED_PATTERN_SIZE) v-bind(STRIPED_PATTERN_SIZE);
}

@keyframes striped {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: v-bind(STRIPED_PATTERN_SIZE)
      v-bind(STRIPED_PATTERN_SIZE);
  }
}

.animateStriped {
  animation: striped v-bind('ANIMATION_DURATIONS.STRIPED') linear infinite;
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
  animation: indeterminate v-bind('ANIMATION_DURATIONS.INDETERMINATE')
    cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
  animation: stream v-bind('ANIMATION_DURATIONS.STREAM') linear infinite;
}
</style>

<style>
/*
 * FORÇA cores disabled com !important (seguindo padrão Checkbox)
 * Usa classes customizadas para aplicar cores derivadas da prop color
 */

/* Disabled track: light mode (default) */
.corp-progress-disabled {
  background-color: var(
    --corp-runtime-progress-track-disabled-light
  ) !important;
}

/* Disabled track: dark mode */
.dark .corp-progress-disabled {
  background-color: var(--corp-runtime-progress-track-disabled-dark) !important;
}

/* Disabled bar: light mode */
.corp-progress-disabled .bg-\[var\(--corp-runtime-progress-bar\)\] {
  background-color: var(--corp-runtime-progress-bar-disabled-light) !important;
}

/* Disabled bar: dark mode */
.dark .corp-progress-disabled .bg-\[var\(--corp-runtime-progress-bar\)\] {
  background-color: var(--corp-runtime-progress-bar-disabled-dark) !important;
}
</style>
