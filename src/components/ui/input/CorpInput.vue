<script setup lang="ts">
/**
 * 🧩 CorpInput - Input com validação, máscaras e sistema de slots/ícones
 *
 * Input avançado com validação (useForm), máscaras BR (CPF, CNPJ, phone, CEP),
 * 4 slots (prepend, prepend-inner, append-inner, append), clearable e counter.
 *
 * 🔗 DEPENDÊNCIAS:
 * - CorpIcon - Sistema de ícones
 * - CorpHintLine - Mensagens de erro/hint
 * - useForm (inject) - Validação opcional
 * - stringUtils - Máscaras brasileiras
 *
 * @example
 * // Básico com validação (asterisco aparece automaticamente com rules.required)
 * <CorpInput name="name" label="Nome" :rules="[rules.required]" />
 *
 * // Com máscara e regras
 * <CorpInput name="cpf" label="CPF" mask="cpf" :rules="[rules.required, rules.cpf]" />
 *
 * // Com ícones + clearable
 * <CorpInput name="search" prepend-icon="Search" clearable />
 *
 * // Com contador e limite
 * <CorpInput name="bio" label="Bio" :counter="200" />
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import type { HTMLAttributes, PropType } from 'vue';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, watch, ref, useSlots, inject } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';
import {
  applyCPFMask,
  applyCNPJMask,
  applyPhoneMask,
  applyCEPMask,
} from '@/utils/stringUtils';

// ============== PROPS ==============

const props = defineProps({
  // Básicos
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: undefined,
  },

  // Validação
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

  // Display
  hideDetails: {
    type: Boolean,
    default: false,
  },
  debug: {
    type: Boolean,
    default: false,
  },

  // Máscaras
  mask: {
    type: [String, Function] as PropType<string | ((value: string) => string)>,
    default: undefined,
  },

  // Ícones
  prependOuterIcon: {
    type: String,
    default: undefined,
  },
  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  appendOuterIcon: {
    type: String,
    default: undefined,
  },
  iconSize: {
    type: Number,
    default: 16,
  },
  iconColor: {
    type: String,
    default: 'text-muted-foreground',
  },
  prependOuterIconColor: {
    type: String,
    default: undefined,
  },
  prependIconColor: {
    type: String,
    default: undefined,
  },
  appendIconColor: {
    type: String,
    default: undefined,
  },
  appendOuterIconColor: {
    type: String,
    default: undefined,
  },

  // Clickable flags
  prependOuterIconClickable: {
    type: Boolean,
    default: true,
  },
  prependIconClickable: {
    type: Boolean,
    default: false,
  },
  appendIconClickable: {
    type: Boolean,
    default: true,
  },
  appendOuterIconClickable: {
    type: Boolean,
    default: true,
  },

  // Features avançadas
  clearable: {
    type: Boolean,
    default: false,
  },
  counter: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: false,
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
});

// ============== EMITS ==============

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'click:prepend-outer': [];
  'click:prepend': [];
  'click:append': [];
  'click:append-outer': [];
  'click:clear': [];
}>();

// ============== SLOTS ==============

const slots = useSlots();

// ============== VALIDATION ==============

const validation = inject<CorpValidationContext | undefined>(
  'corpValidation',
  undefined
);

const errorMessages = computed<string[]>(
  () => validation?.errors.value[props.name] ?? []
);

const internalValue = ref<string | number>(props.modelValue ?? '');
const touched = ref<boolean>(false);
const isFocused = ref<boolean>(false);

const hasError = computed<boolean>(() => {
  if (!validation) return false;
  const errors = validation.errors.value[props.name] ?? [];
  return errors.length > 0 && !isFocused.value;
});

/**
 * Detecta se há rule required no array de rules
 * Testa cada rule com valor vazio - se alguma falhar, considera como required
 */
const hasRequiredRule = computed<boolean>(() => {
  return props.rules.some(rule => {
    const result = rule('');
    return result !== true;
  });
});

// ============== MÁSCARAS ==============

const maskFunctions: Record<string, (value: string) => string> = {
  cpf: applyCPFMask,
  cnpj: applyCNPJMask,
  phone: applyPhoneMask,
  cep: applyCEPMask,
};

const applyMask = (value: string): string => {
  if (
    props.mask === undefined ||
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return value;
  }

  if (typeof props.mask === 'function') {
    return props.mask(value);
  }

  const maskFn = maskFunctions[props.mask.toLowerCase()];
  if (maskFn !== undefined) {
    return maskFn(value);
  }

  return value;
};

// ============== WATCHERS ==============

watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== undefined && newVal !== internalValue.value) {
      internalValue.value = newVal;
    }
  }
);

watch(internalValue, newVal => {
  emit('update:modelValue', newVal);
});

// ============== HANDLERS ==============

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const rawValue = target.value;
  const maskedValue = applyMask(rawValue);

  if (maskedValue !== internalValue.value) {
    internalValue.value = maskedValue;
    target.value = maskedValue;
  }
};

const handleClear = (): void => {
  internalValue.value = '';
  emit('click:clear');
};

const handlePrependOuterClick = (): void => {
  emit('click:prepend-outer');
};

const handlePrependClick = (): void => {
  emit('click:prepend');
};

const handleFocus = (): void => {
  isFocused.value = true;
};

const handleBlur = (): void => {
  isFocused.value = false;
  touched.value = true;

  if (validation && props.rules && props.rules.length > 0) {
    validation.validateField(props.name, internalValue.value, props.rules);
  }
};

const handleAppendClick = (): void => {
  emit('click:append');
};

const handleAppendOuterClick = (): void => {
  emit('click:append-outer');
};

// ============== COMPUTED ==============

const showClearButton = computed(() => {
  return (
    props.clearable &&
    internalValue.value !== '' &&
    internalValue.value !== null &&
    internalValue.value !== undefined
  );
});

const counterDisplay = computed(() => {
  const length = String(internalValue.value ?? '').length;
  if (typeof props.counter === 'number') {
    return `${length}/${props.counter}`;
  }
  return String(length);
});

const inputPaddingClasses = computed(() => {
  const hasPrependIcon = !!props.prependIcon;
  const hasPrependSlot = !!slots['prepend-inner'];
  const hasAppendIcon = !!props.appendIcon;
  const hasAppendSlot = !!slots['append-inner'];
  const hasBothAppendIcons = showClearButton.value && hasAppendIcon;

  return {
    'pl-10': hasPrependIcon && !hasPrependSlot,
    'pl-16': hasPrependSlot,
    'pr-10':
      (hasAppendIcon || showClearButton.value) &&
      !hasBothAppendIcons &&
      !hasAppendSlot,
    'pr-16': hasBothAppendIcons || hasAppendSlot,
  };
});
</script>

<template>
  <div>
    <Label
      v-if="label"
      :for="name"
      :class="{ 'text-destructive': hasError }"
      style="font-size: var(--label-text-size)"
    >
      {{ label }}
      <span v-if="hasRequiredRule" class="text-destructive">*</span>
    </Label>

    <div class="flex items-center gap-2">
      <!-- Prepend Outer -->
      <button
        v-if="!$slots.prepend && prependOuterIcon && prependOuterIconClickable"
        type="button"
        class="corp-icon-button corp-icon-wrapper flex-shrink-0 cursor-pointer hover:bg-accent"
        :disabled="disabled"
        @click="handlePrependOuterClick"
      >
        <CorpIcon
          :name="prependOuterIcon"
          :size="iconSize"
          :class="prependOuterIconColor || iconColor"
          :disabled="disabled"
        />
      </button>

      <div
        v-else-if="
          !$slots.prepend && prependOuterIcon && !prependOuterIconClickable
        "
        class="corp-icon-wrapper flex-shrink-0"
      >
        <CorpIcon
          :name="prependOuterIcon"
          :size="iconSize"
          :class="prependOuterIconColor || iconColor"
          :disabled="disabled"
        />
      </div>

      <!-- Slot Prepend -->
      <div v-if="$slots.prepend" class="flex-shrink-0">
        <slot name="prepend" />
      </div>

      <!-- Container Input -->
      <div class="relative w-full flex-1">
        <!-- Prepend Inner -->
        <div
          v-if="$slots['prepend-inner']"
          class="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center"
        >
          <slot name="prepend-inner" />
        </div>

        <!-- Prepend Icon -->
        <button
          v-if="prependIcon && prependIconClickable"
          type="button"
          class="corp-icon-button corp-icon-wrapper absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:bg-accent"
          :disabled="disabled"
          @click="handlePrependClick"
        >
          <CorpIcon
            :name="prependIcon"
            :size="iconSize"
            :class="prependIconColor || iconColor"
            :disabled="disabled || readonly"
          />
        </button>

        <div
          v-else-if="prependIcon && !prependIconClickable"
          class="corp-icon-wrapper absolute left-2 top-1/2 -translate-y-1/2 z-10"
        >
          <CorpIcon
            :name="prependIcon"
            :size="iconSize"
            :class="prependIconColor || iconColor"
            :disabled="disabled || readonly"
          />
        </div>

        <!-- Input -->
        <input
          :id="name"
          v-model="internalValue"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="
            cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-destructive': hasError,
                ...inputPaddingClasses,
              },
              props.class
            )
          "
          style="background-color: var(--input-background)"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Append Inner -->
        <div
          v-if="$slots['append-inner']"
          class="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1"
        >
          <slot name="append-inner" />
        </div>

        <!-- Clear + Append Icon -->
        <div
          v-else-if="showClearButton || appendIcon"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1"
        >
          <button
            v-if="showClearButton"
            type="button"
            class="corp-icon-button corp-icon-wrapper cursor-pointer hover:bg-accent"
            :disabled="disabled"
            :aria-label="'Limpar ' + label"
            @click="handleClear"
          >
            <CorpIcon
              name="X"
              :size="iconSize"
              :class="iconColor"
              :disabled="disabled || readonly"
            />
          </button>

          <button
            v-if="appendIcon && appendIconClickable"
            type="button"
            class="corp-icon-button corp-icon-wrapper cursor-pointer hover:bg-accent"
            :disabled="disabled"
            @click="handleAppendClick"
          >
            <CorpIcon
              :name="appendIcon"
              :size="iconSize"
              :class="appendIconColor || iconColor"
              :disabled="disabled || readonly"
            />
          </button>

          <div
            v-else-if="appendIcon && !appendIconClickable"
            class="corp-icon-wrapper"
          >
            <CorpIcon
              :name="appendIcon"
              :size="iconSize"
              :class="appendIconColor || iconColor"
              :disabled="disabled || readonly"
            />
          </div>
        </div>
      </div>

      <!-- Slot Append -->
      <div v-if="$slots.append" class="flex-shrink-0">
        <slot name="append" />
      </div>

      <!-- Append Outer -->
      <button
        v-if="appendOuterIcon && appendOuterIconClickable"
        type="button"
        class="corp-icon-button corp-icon-wrapper flex-shrink-0 cursor-pointer hover:bg-accent"
        :disabled="disabled"
        @click="handleAppendOuterClick"
      >
        <CorpIcon
          :name="appendOuterIcon"
          :size="iconSize"
          :class="appendOuterIconColor || iconColor"
          :disabled="disabled"
        />
      </button>

      <div
        v-else-if="appendOuterIcon && !appendOuterIconClickable"
        class="corp-icon-wrapper flex-shrink-0"
      >
        <CorpIcon
          :name="appendOuterIcon"
          :size="iconSize"
          :class="appendOuterIconColor || iconColor"
          :disabled="disabled"
        />
      </div>
    </div>

    <!-- Hint/Error/Counter -->
    <div v-if="!hideDetails || counter" class="min-h-[20px] space-y-1">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1">
          <CorpHintLine
            :error-messages="errorMessages"
            :hint="hint"
            :hide-details="hideDetails"
            :debug="debug"
          />
        </div>

        <p
          v-if="counter"
          class="text-sm text-muted-foreground flex-shrink-0"
          :class="{
            'text-destructive':
              typeof counter === 'number' &&
              String(internalValue ?? '').length > counter,
          }"
        >
          {{ counterDisplay }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.corp-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 0.5rem;
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.corp-icon-button:hover {
  filter: none !important;
}

.corp-icon-button.cursor-pointer:hover {
  background-color: var(--accent) !important;
}
</style>
