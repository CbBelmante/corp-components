<script setup lang="ts">
/**
 * 🧩 CorpTextarea - Textarea com validação, auto-grow e densidade
 *
 * Suporta validação (useForm), auto-grow, clearable, counter e rows configuráveis.
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - reka-ui (validação via inject)
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, watch, ref, nextTick, inject, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import {
  resolveColor,
  darken,
  lighten,
  getComputedColor,
  hexToHslWithWrapper,
} from '@/utils/CorpColorUtils';
import {
  textareaVariants,
  type TextareaVariant,
  type TextareaDensity,
} from '.';
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';

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

  // BorderColor - cor da borda (semantic OU custom: hex, rgb, var(), etc)
  borderColor: {
    type: String,
    default: undefined,
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

  // Ícones (só OUTER)
  prependOuterIcon: {
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
  prependOuterIconColor: {
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
  persistentHint: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },

  // Variant (estilo visual)
  variant: {
    type: String as PropType<TextareaVariant>,
    default: 'solo',
  },

  // Density (tamanho)
  density: {
    type: String as PropType<TextareaDensity>,
    default: 'regular',
  },

  // ESPECÍFICOS TEXTAREA
  rows: {
    type: Number,
    default: 4,
  },
  autoGrow: {
    type: Boolean,
    default: false,
  },
  noResize: {
    type: Boolean,
    default: false,
  },
  maxRows: {
    type: Number,
    default: undefined,
  },
});

// ============== EMITS ==============

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'click:prepend-outer': [];
  'click:append-outer': [];
  'click:clear': [];
}>();

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
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const hasError = computed<boolean>(() => {
  if (!validation) return false;
  const errors = validation.errors.value[props.name] ?? [];
  return errors.length > 0 && !isFocused.value;
});

const hasRequiredRule = computed(() => {
  return props.rules.some(
    rule => rule.name === 'required' || rule.toString().includes('obrigatório')
  );
});

// ============== COMPUTED PROPERTIES ==============

const isDisabled = computed(() => {
  return props.disabled || props.readonly;
});

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
const customColorStyle = computed(() => {
  if (!props.borderColor) return {};

  const resolved = resolveColor(props.borderColor);
  const hexColor = getComputedColor(resolved);

  // ENABLED: borda normal + borda focus escurecida
  const darkenedHex = darken(hexColor);
  const darkenedHsl = hexToHslWithWrapper(darkenedHex);

  // DISABLED: light-dark() automático
  const lightenedDisabledBorderHsl = hexToHslWithWrapper(lighten(hexColor, 50));
  const darkenedDisabledBorderHsl = hexToHslWithWrapper(darken(hexColor, 40));

  return {
    '--corp-runtime-textarea-border': resolved,
    '--corp-runtime-textarea-border-focus': darkenedHsl,
    '--corp-runtime-textarea-focus-ring': resolved,
    '--corp-runtime-textarea-disabled-border-light': lightenedDisabledBorderHsl,
    '--corp-runtime-textarea-disabled-border-dark': darkenedDisabledBorderHsl,
  };
});

// Classes de cor - SEMPRE usa CSS variable
const colorClasses = computed(() => {
  if (isDisabled.value) return '';
  if (props.variant === 'filled') return '';

  if (!props.borderColor)
    return 'focus:border-[hsl(var(--corp-def-textarea-border-focus))]';

  return 'border-[var(--corp-runtime-textarea-border)] focus:border-[var(--corp-runtime-textarea-border-focus)]';
});

// Classes de focus - runtime override ou padrão do tema
const focusClasses = computed(() => {
  if (!props.borderColor)
    return 'focus-visible:ring-[hsl(var(--corp-def-textarea-ring))]';

  return 'focus-visible:ring-[var(--corp-runtime-textarea-focus-ring)]';
});

// Classes finais do textarea (usa CVA)
const textareaClasses = computed(() => {
  return cn(
    textareaVariants({
      variant: props.variant,
      density: props.density,
    }),
    colorClasses.value,
    focusClasses.value,
    {
      'border-destructive': hasError.value,
      'resize-none': props.noResize,
      'resize-y': !props.noResize,
    },
    props.class
  );
});

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

  // Auto-grow
  if (props.autoGrow) {
    nextTick(() => {
      adjustHeight();
    });
  }
});

// ============== METHODS ==============

const adjustHeight = (): void => {
  if (!textareaRef.value || !props.autoGrow) return;

  const textarea = textareaRef.value;

  // Reset height para calcular scrollHeight corretamente
  textarea.style.height = 'auto';

  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
  const maxHeight = props.maxRows
    ? lineHeight * props.maxRows
    : Number.MAX_SAFE_INTEGER;

  const newHeight = Math.min(textarea.scrollHeight, maxHeight);
  textarea.style.height = `${newHeight}px`;
};

const handleInput = (event: Event): void => {
  const target = event.target as HTMLTextAreaElement;
  internalValue.value = target.value;
};

const handleClear = (): void => {
  internalValue.value = '';
  emit('click:clear');
};

const handlePrependOuterClick = (): void => {
  emit('click:prepend-outer');
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

const handleAppendOuterClick = (): void => {
  emit('click:append-outer');
};
</script>

<template>
  <div class="flex flex-col gap-0 w-full" :style="customColorStyle">
    <!-- Label -->
    <Label
      v-if="props.label"
      :for="props.name"
      :class="{ 'text-destructive': hasError }"
      class="mb-2 text-sm font-medium"
      :style="{
        fontSize: 'var(--corp-def-textarea-label-size)',
        color: 'hsl(var(--corp-def-textarea-label-color))',
      }"
    >
      {{ props.label }}
      <span v-if="hasRequiredRule" class="text-destructive">*</span>
    </Label>

    <!-- Textarea + Icons Outer Container -->
    <div class="flex items-start gap-2">
      <!-- Prepend Outer Icon -->
      <CorpIcon
        v-if="props.prependOuterIcon"
        :icon="props.prependOuterIcon"
        :size="props.iconSize"
        :color="props.prependOuterIconColor || 'text-muted-foreground'"
        :clickable="props.prependOuterIconClickable"
        @click="handlePrependOuterClick"
      />

      <!-- Textarea + Clear/Loading Container -->
      <div class="relative flex-1">
        <textarea
          :id="props.name"
          ref="textareaRef"
          :name="props.name"
          :value="internalValue"
          :placeholder="props.placeholder"
          :disabled="isDisabled"
          :readonly="props.readonly"
          :rows="props.rows"
          :class="textareaClasses"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Clear Button (absolute posicionado) -->
        <button
          v-if="showClearButton"
          type="button"
          class="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          @click="handleClear"
        >
          <CorpIcon icon="luc-x" :size="16" />
        </button>

        <!-- Loading Spinner (absolute posicionado) -->
        <div
          v-if="props.loading"
          class="absolute top-2 right-2 text-muted-foreground"
        >
          <CorpIcon icon="luc-loader-2" :size="16" class="animate-spin" />
        </div>
      </div>

      <!-- Append Outer Icon -->
      <CorpIcon
        v-if="props.appendOuterIcon"
        :icon="props.appendOuterIcon"
        :size="props.iconSize"
        :color="props.appendOuterIconColor || 'text-muted-foreground'"
        :clickable="props.appendOuterIconClickable"
        @click="handleAppendOuterClick"
      />
    </div>

    <!-- Hint + Counter -->
    <div class="flex items-center justify-between">
      <CorpHintLine
        :error-messages="errorMessages"
        :hint="props.hint"
        :hide-details="props.hideDetails"
        :debug="props.debug"
        :persistent-hint="props.persistentHint"
      />

      <!-- Counter -->
      <span
        v-if="props.counter"
        class="text-xs text-muted-foreground whitespace-nowrap ml-2"
      >
        {{ counterDisplay }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Disabled border colors (light/dark mode) */
textarea:disabled {
  border-color: var(--corp-runtime-textarea-disabled-border-light) !important;
}

.dark textarea:disabled {
  border-color: var(--corp-runtime-textarea-disabled-border-dark) !important;
}
</style>
