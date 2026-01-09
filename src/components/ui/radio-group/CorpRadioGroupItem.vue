<script setup lang="ts">
/**
 * 🎯 CorpRadioGroupItem - Item individual de Radio Button
 *
 * Radio button com suporte a:
 * - Cores semânticas e customizadas (HEX, RGB, var(), etc)
 * - Label + hint integrados
 * - Disabled individual
 * - Runtime CSS variables para cores
 *
 * 🔗 DEPENDÊNCIAS:
 * - reka-ui (RadioGroupItem, RadioGroupIndicator)
 * - CorpColorUtils (resolução de cores)
 *
 * @example
 * <CorpRadioGroup v-model="selected">
 *   <CorpRadioGroupItem value="opt1" label="Opção 1" />
 *   <CorpRadioGroupItem value="opt2" label="Opção 2" color="success" />
 *   <CorpRadioGroupItem value="opt3" label="Opção 3" disabled />
 * </CorpRadioGroup>
 */

import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui';
import { computed, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { resolveColor } from '@/utils/CorpColorUtils';

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
  labelPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },

  // Density (tamanho)
  density: {
    type: String as PropType<'compact' | 'standard' | 'comfortable'>,
    default: 'compact',
  },
});

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
// resolveColor() trata: 'primary' → hsl(var(--primary)), '#FF0000' → #FF0000, 'red' → red
// NOTA: Unchecked usa theme.ts (igual Input/Select), só checked usa runtime
const customColorStyle = computed(() => {
  const resolved = resolveColor(props.color);
  return {
    '--corp-runtime-radio-color': resolved,
    '--corp-runtime-radio-ring': resolved,
  };
});

// Classes de cor - SEMPRE usa CSS variable (funciona pra qualquer cor)
const colorClasses = computed(() => {
  return [
    // Unchecked: usa tema padrão (igual Input/Select)
    'data-[state=unchecked]:border-[var(--radio-unchecked-border)]',
    // Checked: usa cor customizada
    'data-[state=checked]:bg-[var(--corp-runtime-radio-color)]',
    'data-[state=checked]:border-[var(--corp-runtime-radio-color)]',
  ];
});

// Classes de focus - runtime override ou padrão do tema
const focusClasses = computed(() => {
  // Se não tem cor customizada, usa padrão do tema (radio-ring = primary)
  if (!props.color || props.color === 'primary') {
    return 'focus-visible:ring-[var(--radio-ring)]';
  }
  // Cor customizada: usa variável runtime
  return 'focus-visible:ring-[var(--corp-runtime-radio-ring)]';
});

// Classes de density (tamanho)
const densityClasses = computed(() => {
  const map = {
    compact: 'h-4 w-4',
    standard: 'h-[18px] w-[18px]',
    comfortable: 'h-5 w-5',
  };
  return map[props.density];
});

// Tamanho do indicador interno (bolinha branca)
const indicatorSizes = computed(() => {
  const map = {
    compact: 'h-2 w-2',
    standard: 'h-2.5 w-2.5',
    comfortable: 'h-3 w-3',
  };
  return map[props.density];
});
</script>

<template>
  <div class="flex flex-col gap-0 w-full" :style="customColorStyle">
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
        :value="props.value"
        :disabled="props.disabled"
        :class="
          cn(
            'peer aspect-square shrink-0 rounded-full border-[length:var(--corp-def-radio-border-width)] shadow-sm transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:border-0',
            densityClasses,
            colorClasses,
            focusClasses,
            props.class
          )
        "
      >
        <RadioGroupIndicator class="flex items-center justify-center">
          <div :class="cn('rounded-full bg-white', indicatorSizes)" />
        </RadioGroupIndicator>
      </RadioGroupItem>

      <!-- Label -->
      <Label
        v-if="props.label"
        class="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {{ props.label }}
      </Label>

      <!-- Slot para conteúdo customizado (ao lado) -->
      <slot v-if="$slots.default" />
    </div>

    <!-- Hint (separado, alinhado com label) -->
    <div
      v-if="props.hint"
      :class="
        cn({
          'pl-7': props.labelPosition === 'right',
          'pr-7 text-right': props.labelPosition === 'left',
        })
      "
    >
      <p class="text-xs text-muted-foreground">
        {{ props.hint }}
      </p>
    </div>
  </div>
</template>
