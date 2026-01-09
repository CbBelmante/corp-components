<script setup lang="ts">
/**
 * 🧩 CorpSelect - Select com validação e normalização de items
 *
 * Select avançado com validação (useForm), aceita arrays de strings ou objetos
 * {value, label}, clearable, multiple e chips.
 *
 * 🔗 DEPENDÊNCIAS:
 * - SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectValue (reka-ui)
 * - CorpHintLine - Mensagens de erro/hint
 * - CorpBadge - Chips para seleção múltipla
 * - useForm (inject) - Validação opcional
 *
 * @example
 * // Array de objetos
 * <CorpSelect name="state" :items="states" label="Estado" :rules="[rules.required]" />
 *
 * // Array simples
 * <CorpSelect name="status" :items="['active', 'inactive']" label="Status" />
 *
 * // Com clearable
 * <CorpSelect name="filter" :items="filters" clearable />
 *
 * // Múltipla seleção com chips
 * <CorpSelect name="tags" :items="tags" label="Tags" multiple chips />
 */

import type { HTMLAttributes, PropType } from 'vue';
import { computed, watch, ref, inject } from 'vue';
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
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';
import {
  resolveColor,
  darken,
  lighten,
  getComputedColor,
  hexToHslWithWrapper,
} from '@/utils/CorpColorUtils';

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

// ============== COMPUTED ==============

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

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
// resolveColor() trata: 'primary' → hsl(var(--primary)), '#FF0000' → #FF0000, 'red' → red
const customColorStyle = computed(() => {
  if (!props.borderColor) return {};

  const resolved = resolveColor(props.borderColor);
  const hexColor = getComputedColor(resolved);

  // ENABLED: borda normal + borda focus escurecida
  const darkenedHex = darken(hexColor);
  const darkenedHsl = hexToHslWithWrapper(darkenedHex);

  // DISABLED: light-dark() automático (lighten no light, darken no dark)
  const lightenedDisabledBorderHsl = hexToHslWithWrapper(lighten(hexColor, 50));
  const darkenedDisabledBorderHsl = hexToHslWithWrapper(darken(hexColor, 40));

  return {
    '--corp-runtime-select-border': resolved,
    '--corp-runtime-select-border-focus': darkenedHsl,
    '--corp-runtime-select-focus-ring': resolved,
    '--corp-runtime-select-disabled-border-light': lightenedDisabledBorderHsl,
    '--corp-runtime-select-disabled-border-dark': darkenedDisabledBorderHsl,
  };
});

// Classes de cor - SEMPRE usa CSS variable (funciona pra qualquer cor)
const colorClasses = computed(() => {
  if (!props.borderColor) return 'focus:border-primary';
  return 'border-[var(--corp-runtime-select-border)] focus:border-[var(--corp-runtime-select-border-focus)]';
});

// Classes de focus - runtime override ou padrão do tema
const focusClasses = computed(() => {
  if (!props.borderColor) return 'focus-visible:ring-[var(--select-ring)]';
  return 'focus-visible:ring-[var(--corp-runtime-select-focus-ring)]';
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
      style="font-size: var(--label-text-size)"
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
          class="corpSelectTrigger bg-[hsl(var(--select-background))] focus:ring-[length:var(--ring-width)]"
          :class="
            cn(
              {
                'border-destructive': hasError,
                'pr-10': clearable && hasValue && !disabled && !readonly,
                'h-auto min-h-10':
                  multiple && chips && selectedItems.length > 0,
              },
              colorClasses,
              focusClasses
            )
          "
          :style="customColorStyle"
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
              variant="secondary"
              :opacity="85"
              :bgColor="chipColor"
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
    hsl(var(--select-background)) 93%,
    black 7%
  );
}

/* Dark theme - clareia 3% (mais sutil) */
.dark .corpSelectTrigger:hover:not(:disabled) {
  background-color: color-mix(
    in srgb,
    hsl(var(--select-background)) 97%,
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
