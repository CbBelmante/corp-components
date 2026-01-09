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
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { resolveColor } from '@/utils/CorpColorUtils';

const props = defineProps({
  // Value único deste radio
  value: {
    type: [String, Number],
    required: true,
  },

  // Label do radio
  label: {
    type: String,
    default: '',
  },

  // Hint abaixo do label
  hint: {
    type: String,
    default: '',
  },

  // Color (semantic OU custom: hex, rgb, var(), etc)
  color: {
    type: String,
    default: 'primary',
  },

  // Estados
  disabled: {
    type: Boolean,
    default: false,
  },

  // Classes customizadas
  class: {
    type: String,
    default: '',
  },
});

// Style inline com cor customizada
const customColorStyle = computed(() => {
  const resolved = resolveColor(props.color);
  return {
    '--corp-runtime-radio-color': resolved,
  };
});

// Classes de cor
const colorClasses = computed(() => {
  return [
    'border-[var(--corp-runtime-radio-color)]',
    'data-[state=checked]:bg-[var(--corp-runtime-radio-color)]',
    'data-[state=checked]:border-[var(--corp-runtime-radio-color)]',
    'focus-visible:ring-[var(--corp-runtime-radio-color)]',
  ];
});
</script>

<template>
  <div
    :class="
      cn(
        'flex items-start gap-3',
        props.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        props.class
      )
    "
    :style="customColorStyle"
  >
    <!-- Radio Button -->
    <RadioGroupItem
      :value="props.value"
      :disabled="props.disabled"
      :class="
        cn(
          'peer mt-0.5 aspect-square h-4 w-4 shrink-0 rounded-full border-2 shadow-sm transition-all',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:border-0',
          colorClasses
        )
      "
    >
      <RadioGroupIndicator class="flex items-center justify-center">
        <div class="h-2 w-2 rounded-full bg-white" />
      </RadioGroupIndicator>
    </RadioGroupItem>

    <!-- Label + Hint -->
    <div v-if="props.label || $slots.default" class="flex flex-col gap-1">
      <Label
        v-if="props.label"
        class="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {{ props.label }}
      </Label>

      <!-- Slot para conteúdo customizado -->
      <slot v-if="$slots.default" />

      <!-- Hint -->
      <p v-if="props.hint" class="text-xs text-muted-foreground">
        {{ props.hint }}
      </p>
    </div>
  </div>
</template>
