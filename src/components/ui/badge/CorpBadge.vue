<script setup lang="ts">
/**
 * 🧩 CorpBadge - Badge customizável com ícones e cores
 *
 * Badge com suporte a cores customizadas, ícones opcionais, opacity e animações.
 *
 * 🔗 DEPENDÊNCIAS:
 * - badgeVariants - Variantes do shadcn badge
 * - CorpIcon - Ícones Lucide
 * - CorpColorUtils - Resolução de cores
 *
 * @example
 * // Básico
 * <CorpBadge variant="secondary">Badge</CorpBadge>
 *
 * // Com ícone e cor customizada
 * <CorpBadge variant="outline" icon="Check" bg="success" :opacity="85">Approved</CorpBadge>
 *
 * // Com animação
 * <CorpBadge variant="destructive" animation="pulse">Alert</CorpBadge>
 */

import type { HTMLAttributes, PropType } from 'vue';
import type { BadgeVariants } from '.';
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { badgeVariants } from '.';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import { resolveColor } from '@/utils/CorpColorUtils';

// ============== PROPS ==============

const props = defineProps({
  variant: {
    type: String as () => BadgeVariants['variant'],
    default: 'default',
  },
  bg: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
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

// ============== COMPUTED ==============

const computedStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.bg) {
    style.backgroundColor = resolveColor(props.bg);
  }

  if (props.color) {
    style.color = resolveColor(props.color);
  }

  // Adiciona opacidade suave
  style.opacity = (props.opacity / 100).toString();

  return style;
});

const computedClasses = computed(() => {
  const classes = [];

  // Adiciona classes customizadas do prop
  if (props.class) {
    classes.push(props.class);
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
    :class="cn(badgeVariants({ variant }), computedClasses)"
    :style="computedStyle"
  >
    <CorpIcon
      v-if="icon && iconPosition === 'left'"
      :name="icon"
      :size="iconSize"
      class="mr-1"
    />

    <slot />

    <CorpIcon
      v-if="icon && iconPosition === 'right'"
      :name="icon"
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
