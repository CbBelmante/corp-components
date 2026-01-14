<script setup lang="ts">
/**
 * 🧩 CorpSelect - Select com validação e normalização de items
 *
 * Aceita arrays de strings ou objetos {value, label}.
 * Suporta clearable, multiple e chips.
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - reka-ui (SelectRoot, SelectTrigger, etc)
 * - useForm (inject pattern)
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, watch, ref, inject, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import Select from './Select.vue';
import SelectTrigger from './SelectTrigger.vue';
import SelectContent from './SelectContent.vue';
import SelectItem from './SelectItem.vue';
import SelectValue from './SelectValue.vue';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import { CorpBadge } from '@/components/ui/badge';
import {
  resolveColor,
  darken,
  getComputedColor,
  hexToHslWithWrapper,
} from '@/utils/CorpColorUtils';
import {
  resolveRounded,
  getDisabledColors,
  type RoundedValue,
} from '@commonStyles';
import { selectVariants, type SelectVariant, type SelectDensity } from '.';
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';

// ============== TYPES ==============

interface SelectItemNormalized {
  value: string | number;
  label: string;
}

// ============== PROPS ==============

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<(string | SelectItemNormalized)[]>,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Selecione...',
  },
  hint: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, Array] as PropType<
      string | number | (string | number)[] | undefined
    >,
    default: undefined,
  },
  rules: {
    type: Array as PropType<ValidationRule[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  debug: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
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
  multiple: {
    type: Boolean,
    default: false,
  },
  chips: {
    type: Boolean,
    default: false,
  },

  // BorderColor - cor da borda (semantic OU custom: hex, rgb, var(), etc)
  borderColor: {
    type: String,
    default: undefined,
  },
  // ChipColor - cor dos chips no multiple (semantic OU custom: hex, rgb, var(), etc)
  chipColor: {
    type: String,
    default: undefined, // undefined = usa secondary (padrão do Badge)
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },

  // Variant (estilo visual)
  variant: {
    type: String as PropType<SelectVariant>,
    default: 'solo',
  },

  // Density (tamanho)
  density: {
    type: String as PropType<SelectDensity>,
    default: 'regular',
  },

  // Rounded (border-radius)
  rounded: {
    type: [String, Number, Boolean] as PropType<RoundedValue>,
    default: 'default',
  },
});

const emit = defineEmits<{
  'update:modelValue': [
    value: string | number | (string | number)[] | undefined,
  ];
}>();

// ============== VALIDATION ==============

const validation = inject<CorpValidationContext | undefined>(
  'corpValidation',
  undefined
);

const errorMessages = computed<string[]>(
  () => validation?.errors.value[props.name] ?? []
);

const internalValue = ref<string | number | (string | number)[] | undefined>(
  props.modelValue
);

const touched = ref<boolean>(false);
const isFocused = ref<boolean>(false);

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

const normalizedItems = computed<SelectItemNormalized[]>(() => {
  return props.items.map(item => {
    if (typeof item === 'string') {
      return { value: item, label: item };
    }
    return item as SelectItemNormalized;
  });
});

const hasValue = computed(() => {
  if (props.multiple && Array.isArray(internalValue.value)) {
    return internalValue.value.length > 0;
  }
  return (
    internalValue.value !== null &&
    internalValue.value !== undefined &&
    internalValue.value !== ''
  );
});

const selectedItems = computed<SelectItemNormalized[]>(() => {
  if (!props.multiple || !Array.isArray(internalValue.value)) {
    return [];
  }

  return (internalValue.value as (string | number)[])
    .map(val => {
      const found = normalizedItems.value.find(item => item.value === val);
      return found ?? { value: val, label: String(val) };
    })
    .filter(Boolean);
});

// Style inline - só injeta cor quando borderColor é passado
const customColorStyle = computed(() => {
  if (!props.borderColor) return {};

  const resolved = resolveColor(props.borderColor);
  const hexColor = getComputedColor(resolved);

  const darkenedHsl = hexToHslWithWrapper(darken(hexColor));
  const disabled = getDisabledColors(hexColor, { borderOnly: true });

  return {
    '--corp-runtime-select-border': resolved,
    '--corp-runtime-select-border-focus': darkenedHsl,
    '--corp-runtime-select-focus-ring': resolved,
    '--corp-runtime-select-disabled-border-light': disabled.light.border,
    '--corp-runtime-select-disabled-border-dark': disabled.dark.border,
  };
});

// Classes de cor - usa runtime só quando borderColor é passado
const colorClasses = computed(() => {
  if (props.borderColor) {
    return 'border-[var(--corp-runtime-select-border)] focus:border-[var(--corp-runtime-select-border-focus)]';
  }
  return '';
});

// Classes de focus - SEMPRE usa runtime
const focusClasses = computed(() => {
  return 'focus-visible:ring-[var(--corp-runtime-select-focus-ring)]';
});

// Resolve rounded (preset/class/style)
const rounded = computed(() => resolveRounded(props.rounded));

// Combina custom rounded + custom color styles
const selectStyle = computed(() => {
  return {
    ...rounded.value.style,
    ...customColorStyle.value,
  };
});

// Classes finais do select trigger (usa CVA)
const selectClasses = computed(() => {
  return cn(
    selectVariants({
      variant: props.variant,
      density: props.density,
      rounded: rounded.value.preset,
    }),
    rounded.value.class,
    colorClasses.value,
    focusClasses.value,
    {
      'border-destructive': hasError.value,
      'pr-10':
        props.clearable && hasValue.value && !props.disabled && !props.readonly,
      'h-auto min-h-10':
        props.multiple && props.chips && selectedItems.value.length > 0,
    },
    props.class
  );
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
  if (validation && props.rules && props.rules.length > 0) {
    validation.validateField(props.name, newVal, props.rules);
  }
});

// ============== METHODS ==============

const handleChange = (
  value: string | number | (string | number)[] | undefined
): void => {
  internalValue.value = value;
  emit('update:modelValue', value);
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

const handleOpenChange = (open: boolean): void => {
  if (open) {
    isFocused.value = true;
  } else {
    isFocused.value = false;
    touched.value = true;

    if (validation && props.rules && props.rules.length > 0) {
      validation.validateField(props.name, internalValue.value, props.rules);
    }
  }
};

const clearValue = (): void => {
  const newValue = props.multiple ? [] : undefined;
  internalValue.value = newValue;
  emit('update:modelValue', newValue);
};

const removeChip = (value: string | number): void => {
  if (!props.multiple || !Array.isArray(internalValue.value)) return;

  const currentValues = [...internalValue.value];
  const index = currentValues.indexOf(value);

  if (index >= 0) {
    currentValues.splice(index, 1);
    internalValue.value = currentValues;
    emit('update:modelValue', currentValues);
  }
};
</script>

<template>
  <div>
    <!-- Label -->
    <Label
      v-if="label"
      :for="name"
      :class="{ 'text-destructive': hasError }"
      style="
        font-size: var(--corp-def-select-label-size);
        color: hsl(var(--corp-def-select-label-color));
      "
    >
      {{ label }}
      <span v-if="hasRequiredRule" class="text-destructive">*</span>
    </Label>

    <!-- Select Container -->
    <div class="relative">
      <Select
        :modelValue="internalValue"
        @update:modelValue="handleChange"
        :name="name"
        :disabled="disabled || readonly"
        :multiple="multiple"
        @update:open="handleOpenChange"
      >
        <SelectTrigger
          class="corpSelectTrigger"
          :class="selectClasses"
          :style="selectStyle"
          @focus="handleFocus"
          @blur="handleBlur"
        >
          <!-- Chips container (multiple + chips) -->
          <div
            v-if="multiple && chips && selectedItems.length > 0"
            class="flex items-center gap-1 flex-wrap flex-1"
          >
            <CorpBadge
              v-for="item in selectedItems"
              :key="String(item.value)"
              variant="solid"
              :opacity="85"
              :color="chipColor"
              class="gap-1 flex items-center"
            >
              {{ item.label }}
              <button
                v-if="!disabled && !readonly"
                @pointerdown.prevent.stop="removeChip(item.value)"
                type="button"
                class="ml-1 hover:bg-muted-foreground/20 rounded-sm pointer-events-auto"
                :aria-label="`Remover ${item.label}`"
              >
                <CorpIcon icon="luc-x" :size="12" />
              </button>
            </CorpBadge>
          </div>

          <!-- SelectValue (single ou multiple sem chips) -->
          <SelectValue
            v-if="!(multiple && chips && selectedItems.length > 0)"
            :placeholder="placeholder"
          />
        </SelectTrigger>

        <!-- Botão clearable (X) - FORA do SelectTrigger -->
        <button
          v-if="clearable && hasValue && !disabled && !readonly"
          @click.stop="clearValue"
          type="button"
          class="absolute right-1 top-1/2 -translate-y-1/2 z-10 corpIconButton corpIconContainer cursor-pointer hover:bg-accent"
          :disabled="disabled"
          aria-label="Limpar seleção"
        >
          <CorpIcon
            icon="luc-x"
            :size="16"
            class="text-muted-foreground"
            :disabled="disabled || readonly"
          />
        </button>

        <SelectContent>
          <!-- Se não tem items -->
          <div
            v-if="normalizedItems.length === 0"
            class="py-6 text-center text-sm text-muted-foreground"
          >
            Nenhum item disponível
          </div>

          <!-- Items normalizados -->
          <SelectItem
            v-for="item in normalizedItems"
            :key="String(item.value)"
            :value="item.value"
          >
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Área de hint e erro -->
    <CorpHintLine
      :error-messages="errorMessages"
      :hint="hint"
      :hide-details="hideDetails"
      :debug="debug"
      :persistent-hint="persistentHint"
    />
  </div>
</template>

<style scoped>
/* Wrapper padrão para ícones (botão clearable) */
.corpIconContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem; /* h-8 */
  width: 2rem; /* w-8 */
  border-radius: 0.5rem; /* rounded-lg */
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Remove efeito hover global de botões de ícone */
.corpIconButton:hover {
  filter: none !important;
}

/* Base - transition aplicada aqui para funcionar nos dois sentidos */
.corpSelectTrigger {
  transition: background-color 0.2s ease;
}

/* Light theme - escurece 7% */
.corpSelectTrigger:hover:not(:disabled) {
  background-color: color-mix(
    in srgb,
    hsl(var(--corp-def-select-bg)) 93%,
    black 7%
  );
}

/* Dark theme - clareia 3% (mais sutil) */
.dark .corpSelectTrigger:hover:not(:disabled) {
  background-color: color-mix(
    in srgb,
    hsl(var(--corp-def-select-bg)) 97%,
    white 3%
  );
}

/* Disabled: light mode (default) */
.corpSelectTrigger:disabled {
  border-color: var(--corp-runtime-select-disabled-border-light) !important;
}

/* Disabled: dark mode */
.dark .corpSelectTrigger:disabled {
  border-color: var(--corp-runtime-select-disabled-border-dark) !important;
}
</style>
