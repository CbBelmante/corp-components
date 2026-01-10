<script setup lang="ts">
/**
 * 🧩 CorpBadge - Badge com ícones, cores e contadores
 *
 * Suporta cores customizadas (semantic ou hex/rgb), ícones,
 * contadores (max 99+), mini badge (dot) e animações.
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - CorpColorUtils (resolução de cores runtime)
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import { resolveColor, toRgba, getComputedColor } from '@/utils/CorpColorUtils';
import { badgeVariants, type BadgeVariant, type BadgeRounded } from '.';

// ============== PROPS ==============

const props = defineProps({
  variant: {
    type: String as PropType<BadgeVariant>,
    default: 'solid',
  },
  // Color shortcut (gera bg/text/hover/border automaticamente)
  color: {
    type: String,
    default: undefined,
  },
  // Color overrides (bloqueiam automático do color)
  bgColor: {
    type: String,
    default: undefined,
  },
  contentColor: {
    type: String,
    default: undefined,
  },
  // Conteúdo (alternativa ao slot)
  content: {
    type: [String, Number],
    default: undefined,
  },
  // Máximo para números (ex: 99+ quando content > max)
  max: {
    type: [String, Number],
    default: undefined,
  },
  // Mini badge (9x9px ponto colorido)
  dot: {
    type: Boolean,
    default: false,
  },
  // Border-radius (presets OU custom: rounded-3xl, 10px)
  rounded: {
    type: String as PropType<BadgeRounded | string>,
    default: 'default',
  },
  icon: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
  iconSize: {
    type: Number,
    default: 14,
  },
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: '',
  },
  /** Opacidade do badge (0-100) */
  opacity: {
    type: Number,
    default: 90, // Opacidade suave por padrão (90%)
    validator: (value: number) => value >= 0 && value <= 100,
  },
  /** Animação CSS (pulse, bounce, spin, ping) */
  animation: {
    type: String,
    default: '',
    validator: (value: string) =>
      ['', 'pulse', 'bounce', 'spin', 'ping'].includes(value),
  },
  /** Velocidade da animação (slow, normal, fast) */
  animationSpeed: {
    type: String,
    default: 'normal',
    validator: (value: string) => ['slow', 'normal', 'fast'].includes(value),
  },
});

// ============== COMPUTED PROPERTIES ==============

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
// resolveColor() trata: 'primary' → hsl(var(--primary)), '#FF0000' → #FF0000, 'red' → red
const customColorStyle = computed(() => {
  const styles: Record<string, string> = {};

  // bgColor tem prioridade sobre color
  if (props.bgColor) {
    styles.backgroundColor = resolveColor(props.bgColor);
  } else if (props.color) {
    const resolved = resolveColor(props.color);
    const hex = getComputedColor(resolved);

    styles['--corp-runtime-badge-color'] = resolved;
    styles['--corp-runtime-badge-color-hover'] = toRgba(hex, 0.9);
    styles['--corp-runtime-badge-color-light'] = toRgba(hex, 0.1);
  }

  // contentColor tem prioridade final
  if (props.contentColor) {
    styles.color = resolveColor(props.contentColor);
  }

  // Adiciona opacidade
  styles.opacity = (props.opacity / 100).toString();

  return styles;
});

// Classes de cor - SEMPRE usa CSS variables (funciona pra qualquer cor)
// bgColor/contentColor têm prioridade (bloqueiam classes de bg/text respectivamente)
const colorClasses = computed(() => {
  const hasBgOverride = !!props.bgColor;
  const hasContentOverride = !!props.contentColor;

  // Se não tem color, usa defaults do theme (corp-def-badge-*)
  if (!props.color) {
    if (props.variant === 'solid') {
      const classes: string[] = [];
      if (!hasBgOverride)
        classes.push('bg-[hsl(var(--corp-def-badge-bg))]', 'hover:opacity-90');
      if (!hasContentOverride)
        classes.push('text-[hsl(var(--corp-def-badge-text))]');
      classes.push('border-[hsl(var(--corp-def-badge-border))]');
      return classes;
    } else if (props.variant === 'outline') {
      const classes: string[] = [];
      if (!hasBgOverride) classes.push('hover:bg-muted');
      if (!hasContentOverride) classes.push('text-foreground');
      classes.push('border-[hsl(var(--corp-def-badge-border))]');
      return classes;
    } else if (props.variant === 'ghost') {
      const classes: string[] = [];
      if (!hasBgOverride) classes.push('hover:bg-muted');
      if (!hasContentOverride) classes.push('text-foreground');
      return classes;
    }
    return [];
  }

  // Se tem color, usa runtime CSS vars
  const color = 'var(--corp-runtime-badge-color)';
  const colorHover = 'var(--corp-runtime-badge-color-hover)';
  const colorLight = 'var(--corp-runtime-badge-color-light)';

  if (props.variant === 'solid') {
    const classes: string[] = [];
    if (!hasBgOverride)
      classes.push(`bg-[${color}]`, `hover:bg-[${colorHover}]`);
    if (!hasContentOverride) classes.push('text-white');
    classes.push(`border-[${color}]`);
    return classes;
  } else if (props.variant === 'outline') {
    const classes: string[] = [];
    if (!hasBgOverride) classes.push(`hover:bg-[${colorLight}]`);
    if (!hasContentOverride) classes.push(`text-[${color}]`);
    classes.push(`border-[${color}]`);
    return classes;
  } else if (props.variant === 'ghost') {
    const classes: string[] = [];
    if (!hasBgOverride) classes.push(`hover:bg-[${colorLight}]`);
    if (!hasContentOverride) classes.push(`text-[${color}]`);
    return classes;
  }

  return [];
});

// Lógica do content com max (99+)
const displayContent = computed(() => {
  if (props.dot) return ''; // Dot não mostra conteúdo
  if (!props.content) return null;

  // Se não tem max, retorna content direto
  if (props.max === undefined) return String(props.content);

  // Se content não é número, retorna direto
  const contentNum = Number(props.content);
  if (isNaN(contentNum)) return String(props.content);

  // Se content <= max, retorna content
  const maxNum = Number(props.max);
  if (contentNum <= maxNum) return String(props.content);

  // Se content > max, retorna "max+"
  return `${maxNum}+`;
});

// Verifica se rounded é preset ou custom
const roundedPresets: RoundedPreset[] = [
  'default',
  'none',
  'sm',
  'lg',
  'xl',
  'full',
];
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

// Combina custom rounded + custom color styles
const badgeStyle = computed(() => {
  return {
    ...customRoundedStyle.value,
    ...customColorStyle.value,
  };
});

// Rounded para CVA (só quando é preset)
const roundedForCVA = computed(() => {
  if (!isRoundedPreset.value) return undefined;
  return props.rounded as RoundedPreset;
});

const computedClasses = computed(() => {
  const classes = [];

  // Adiciona classes customizadas do prop
  if (props.class) {
    classes.push(props.class);
  }

  // Dot mode (mini badge 9x9px)
  if (props.dot) {
    classes.push('!min-w-[9px] !w-[9px] !h-[9px] !p-0');
  }

  // Rounded (custom class OU preset via CVA)
  if (customRoundedClass.value) {
    classes.push(customRoundedClass.value);
  }

  // Adiciona animação com velocidade
  if (props.animation) {
    if (props.animationSpeed === 'normal') {
      classes.push(`animate-${props.animation}`);
    } else {
      classes.push(`animate-${props.animation}-${props.animationSpeed}`);
    }
  }

  return classes;
});
</script>

<template>
  <div
    :class="
      cn(
        badgeVariants({
          variant,
          rounded: roundedForCVA,
        }),
        colorClasses,
        computedClasses
      )
    "
    :style="badgeStyle"
  >
    <!-- Ícone esquerda (esconde no dot mode) -->
    <CorpIcon
      v-if="!dot && icon && iconPosition === 'left'"
      :icon="icon"
      :size="iconSize"
      class="mr-1"
    />

    <!-- Content prop (tem prioridade sobre slot) -->
    <span v-if="displayContent">{{ displayContent }}</span>

    <!-- Slot (fallback quando não tem content) -->
    <slot v-else-if="!dot" />

    <!-- Ícone direita (esconde no dot mode) -->
    <CorpIcon
      v-if="!dot && icon && iconPosition === 'right'"
      :icon="icon"
      :size="iconSize"
      class="ml-1"
    />
  </div>
</template>

<style scoped>
/* Animações com velocidades customizadas */

/* Pulse Slow - 3s */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Pulse Fast - 0.5s */
@keyframes pulse-fast {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-fast {
  animation: pulse-fast 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Bounce Slow - 2s */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}

/* Bounce Fast - 0.5s */
@keyframes bounce-fast {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce-fast {
  animation: bounce-fast 0.5s infinite;
}

/* Spin Slow - 2s */
.animate-spin-slow {
  animation: spin 2s linear infinite;
}

/* Spin Fast - 0.5s */
.animate-spin-fast {
  animation: spin 0.5s linear infinite;
}

/* Ping Slow - 2s */
.animate-ping-slow {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Ping Fast - 0.5s */
.animate-ping-fast {
  animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
