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

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
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
  labelPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },

  // Density (tamanho)
  density: {
    type: String as PropType<RadioDensity>,
    default: 'compact',
  },

  // Variant (estilo visual)
  variant: {
    type: String as PropType<RadioVariant>,
    default: 'solid',
  },
});

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

  switch (props.variant) {
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
  if (props.variant === 'solid') {
    return 'bg-white';
  }
  // Ghost e Outline: bolinha colorida
  return 'bg-[var(--corp-runtime-radio-color)]';
});

// Tamanho do indicador interno (bolinha)
const indicatorSizes = computed(() => {
  return indicatorSizeMap[props.density];
});

// Classes finais do radio button
const radioClasses = computed(() => {
  return cn(
    radioGroupItemVariants({
      variant: props.variant,
      density: props.density,
    }),
    colorClasses.value,
    focusClasses.value,
    props.class
  );
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
