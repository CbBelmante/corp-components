<script setup lang="ts">
/**
 * 🧩 CorpRadioGroupItem - Item individual de Radio Button
 *
 * Radio button com suporte a:
 * - Cores semânticas e customizadas (HEX, RGB, var(), etc)
 * - Label + hint integrados
 * - Disabled individual
 * - Runtime CSS variables para cores
 * - Herda density/variant do CorpRadioGroup pai
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - reka-ui (RadioGroupItem, RadioGroupIndicator)
 * - CorpColorUtils (resolução de cores)
 * - CorpRadioGroup (inject pattern)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, inject, type PropType, type ComputedRef } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import { resolveColor, toRgba, getComputedColor } from '@/utils/CorpColorUtils';
import {
  radioGroupItemVariants,
  indicatorSizeMap,
  type RadioVariant,
  type RadioDensity,
} from '.';

// ============== PROPS ==============

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },

  // Estados
  disabled: {
    type: Boolean,
    default: false,
  },

  // Color (semantic OU custom: hex, rgb, var(), etc)
  color: {
    type: String,
    default: 'primary',
  },

  // Display
  class: {
    type: String,
    default: '',
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  labelPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },

  // Density (tamanho) - pode sobrescrever o do grupo
  density: {
    type: String as PropType<RadioDensity>,
    default: undefined,
  },

  // Variant (estilo visual) - pode sobrescrever o do grupo
  variant: {
    type: String as PropType<RadioVariant>,
    default: undefined,
  },
});

// ============== INJECT (herda do grupo) ==============

const injectedDensity = inject<ComputedRef<RadioDensity>>(
  'corpRadioGroupDensity',
  computed(() => 'compact')
);

const injectedVariant = inject<ComputedRef<RadioVariant>>(
  'corpRadioGroupVariant',
  computed(() => 'solid')
);

// Props locais têm prioridade sobre valores injetados
const effectiveDensity = computed(() => props.density ?? injectedDensity.value);
const effectiveVariant = computed(() => props.variant ?? injectedVariant.value);

// ============== COMPUTED PROPERTIES ==============

// Style inline - injeta variáveis CSS para cores runtime
const customColorStyle = computed(() => {
  const resolved = resolveColor(props.color);
  const hex = getComputedColor(resolved);

  return {
    '--corp-runtime-radio-color': resolved,
    '--corp-runtime-radio-ring': resolved,
    '--corp-runtime-radio-color-light': toRgba(hex, 0.1),
  };
});

// Classes de cor baseadas na variant
const colorClasses = computed(() => {
  const classes: string[] = [
    // Unchecked: sempre usa tema padrão
    'data-[state=unchecked]:border-[var(--radio-unchecked-border)]',
  ];

  switch (effectiveVariant.value) {
    case 'solid':
      // Solid: fundo colorido quando checked, sem borda visível
      classes.push(
        'data-[state=checked]:bg-[var(--corp-runtime-radio-color)]',
        'data-[state=checked]:border-transparent'
      );
      break;

    case 'ghost':
      // Ghost: fundo sutil (10%) + borda colorida quando checked
      classes.push(
        'data-[state=checked]:bg-[var(--corp-runtime-radio-color-light)]',
        'data-[state=checked]:border-[var(--corp-runtime-radio-color)]'
      );
      break;

    case 'outline':
      // Outline: borda mantém tema, sem fundo
      classes.push(
        'data-[state=checked]:border-[var(--radio-unchecked-border)]'
      );
      break;
  }

  return classes;
});

// Classes de focus
const focusClasses = computed(() => {
  if (!props.color || props.color === 'primary') {
    return 'focus-visible:ring-[var(--radio-ring)]';
  }
  return 'focus-visible:ring-[var(--corp-runtime-radio-ring)]';
});

// Cor da bolinha interna (branca para solid, colorida para ghost/outline)
const indicatorColorClass = computed(() => {
  if (effectiveVariant.value === 'solid') {
    return 'bg-white';
  }
  // Ghost e Outline: bolinha colorida
  return 'bg-[var(--corp-runtime-radio-color)]';
});

// Tamanho do indicador interno (bolinha)
const indicatorSizes = computed(() => {
  return indicatorSizeMap[effectiveDensity.value];
});

// Classes finais do radio button
const radioClasses = computed(() => {
  return cn(
    radioGroupItemVariants({
      variant: effectiveVariant.value,
      density: effectiveDensity.value,
    }),
    colorClasses.value,
    focusClasses.value,
    props.class
  );
});
</script>

<template>
  <div class="flex flex-col gap-0" :style="customColorStyle">
    <!-- Radio Button + Label alinhados -->
    <div
      :class="
        cn('flex items-center space-x-3', {
          'flex-row-reverse space-x-reverse': props.labelPosition === 'left',
          'cursor-not-allowed opacity-60': props.disabled,
          'cursor-pointer': !props.disabled,
        })
      "
    >
      <!-- Radio Button -->
      <RadioGroupItem
        :id="`radio-${props.value}`"
        :value="props.value"
        :disabled="props.disabled"
        :class="radioClasses"
      >
        <RadioGroupIndicator class="flex items-center justify-center">
          <div
            :class="cn('rounded-full', indicatorColorClass, indicatorSizes)"
          />
        </RadioGroupIndicator>
      </RadioGroupItem>

      <!-- Label -->
      <Label
        v-if="props.label"
        :for="`radio-${props.value}`"
        class="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {{ props.label }}
      </Label>

      <!-- Slot para conteúdo customizado (ao lado) -->
      <slot v-if="$slots.default" />
    </div>

    <!-- Área de hint (separada, alinhada com label) -->
    <div
      :class="
        cn({
          'pl-8': props.labelPosition === 'right',
          'pr-8 text-right': props.labelPosition === 'left',
        })
      "
    >
      <CorpHintLine :hint="props.hint" :hide-details="props.hideDetails" />
    </div>
  </div>
</template>
