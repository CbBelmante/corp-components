<script setup lang="ts">
/**
 * 🎯 CorpRadioGroup - Container para Radio Buttons com validação
 *
 * Container que gerencia múltiplos CorpRadioGroupItem com suporte a:
 * - v-model (string/number)
 * - Validação (rules + externalErrors)
 * - Orientação (vertical/horizontal)
 * - Integração com useForm (inject pattern)
 * - CorpHintLine para hints e erros
 *
 * 🔗 DEPENDÊNCIAS:
 * - reka-ui (RadioGroupRoot)
 * - CorpRadioGroupItem (itens individuais)
 * - useFormValidation (inject pattern)
 *
 * @example
 * <CorpRadioGroup v-model="selected" name="plan" label="Escolha um plano">
 *   <CorpRadioGroupItem value="free" label="Free" />
 *   <CorpRadioGroupItem value="pro" label="Pro" />
 * </CorpRadioGroup>
 */

import { RadioGroupRoot } from 'reka-ui';
import { computed, inject, ref, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';

const props = defineProps({
  name: {
    type: String,
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
  rules: {
    type: Array as PropType<ValidationRule[]>,
    default: () => [],
  },

  // Estados
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  forceError: {
    type: Boolean,
    default: false,
  },

  // Validação direta (erros externos - backend/API)
  externalErrors: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },

  orientation: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
    validator: (value: string) => ['vertical', 'horizontal'].includes(value),
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

  // Mensagens genéricas (info, warning, etc)
  messages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  maxErrors: {
    type: Number,
    default: 1,
  },

  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

// ============== VALIDATION ==============

const validation = inject<CorpValidationContext | undefined>(
  'corpValidation',
  undefined
);

// Combina erros de validação (rules) + erros externos (prop)
const errorMessages = computed<string[]>(() => {
  const validationErrors = validation?.errors.value[props.name] ?? [];
  const external = Array.isArray(props.externalErrors)
    ? props.externalErrors
    : props.externalErrors
      ? [props.externalErrors]
      : [];
  return [...validationErrors, ...external];
});

// Validação progressiva: só valida onChange após primeiro blur
const touched = ref<boolean>(false);

// Estado de foco: esconde erro enquanto usuário interage
const isFocused = ref<boolean>(false);

const hasError = computed<boolean>(() => {
  // forceError sempre mostra erro (mesmo focado)
  if (props.forceError) return true;

  // Erros normais (esconde enquanto focado)
  return errorMessages.value.length > 0 && !isFocused.value;
});

// ============== COMPUTED PROPERTIES ==============

const hasRequiredRule = computed(() => {
  return props.rules.some(
    rule => rule.name === 'required' || rule.toString().includes('obrigatório')
  );
});

// ============== METHODS ==============

const handleUpdate = (value: string | number) => {
  emit('update:modelValue', value);
};

const handleFocus = (): void => {
  isFocused.value = true;
};

// Marca campo como touched e valida no blur
const handleBlur = (): void => {
  isFocused.value = false;
  touched.value = true;

  if (validation && props.rules && props.rules.length > 0) {
    validation.validateField(props.name, props.modelValue, props.rules);
  }
};
</script>

<template>
  <div class="space-y-1 w-full">
    <!-- Label principal -->
    <Label
      v-if="props.label"
      :class="{ 'text-destructive': hasError }"
      class="text-sm font-medium"
    >
      {{ props.label }}
      <span v-if="hasRequiredRule" class="text-destructive">*</span>
    </Label>

    <!-- Radio Group -->
    <RadioGroupRoot
      :model-value="props.modelValue"
      @update:model-value="handleUpdate"
      :disabled="props.disabled || props.readonly"
      @focusin="handleFocus"
      @focusout="handleBlur"
      :class="
        cn(
          'flex',
          props.orientation === 'vertical'
            ? 'flex-col gap-2'
            : 'flex-row gap-4',
          props.class
        )
      "
    >
      <slot />
    </RadioGroupRoot>

    <!-- Hint/Erro -->
    <CorpHintLine
      v-if="!props.hideDetails"
      :hint="props.hint"
      :error-messages="errorMessages"
      :messages="props.messages"
      :max-errors="props.maxErrors"
    />
  </div>
</template>
