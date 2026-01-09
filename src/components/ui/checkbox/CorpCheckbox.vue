<script setup lang="ts">
/**
 * 🧩 CorpCheckbox - Checkbox com validação, cores e layout horizontal
 *
 * Layout horizontal (checkbox à esquerda, label e hint à direita).
 * Suporta cores customizadas (semantic ou hex/rgb).
 * Integra com useForm (inject) para validação opcional.
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - reka-ui (CheckboxRoot, CheckboxIndicator)
 * - useForm (inject pattern)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, watch, ref, inject, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import {
  resolveColor,
  darken,
  lighten,
  getComputedColor,
  hexToHslWithWrapper,
} from '@/utils/CorpColorUtils';
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';

// ============== PROPS ==============

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
  indeterminate: {
    type: Boolean,
    default: false,
  },
  error: {
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
    type: [String, Object, Array],
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

  modelValue: {
    type: [Boolean, String, Number],
    default: undefined,
  },

  // Valores customizados
  trueValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  falseValue: {
    type: [Boolean, String, Number],
    default: false,
  },

  // Validação direta (erros externos - backend/API)
  forceError: {
    type: Boolean,
    default: false,
  },
  externalErrors: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
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

  // Density (tamanho)
  density: {
    type: String as PropType<'compact' | 'standard' | 'comfortable'>,
    default: 'compact',
  },

  // Debug
  debug: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number];
}>();

// ============== VALIDATION ==============

/**
 * Contexto de validação do formulário pai (opcional).
 * Se não houver, componente funciona sem validação.
 */
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

// Internal value: boolean (checked/unchecked)
const internalValue = ref<boolean>(
  props.modelValue === props.trueValue || props.modelValue === true
);

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

const customClass = computed(() => props.class);

const hasRequiredRule = computed(() => {
  return props.rules.some(
    rule => rule.name === 'required' || rule.toString().includes('obrigatório')
  );
});

// Disabled state (disabled OU readonly)
const isDisabled = computed(() => {
  return props.disabled || props.readonly;
});

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
// resolveColor() trata: 'primary' → hsl(var(--primary)), '#FF0000' → #FF0000, 'red' → red
// NOTA: Unchecked usa theme.ts, só checked usa runtime (por isso "checked" no nome)
const customColorStyle = computed(() => {
  if (!props.color) return {};

  const resolved = resolveColor(props.color);
  // getComputedColor resolve CSS vars em runtime pra poder usar com darken/lighten
  const hexColor = getComputedColor(resolved);

  // ENABLED: cor normal + borda escurecida
  const darkenedHex = darken(hexColor); // HEX 20% mais escuro
  const darkenedHsl = hexToHslWithWrapper(darkenedHex);

  // DISABLED CHECKED: light-dark() automático (lighten no light, darken no dark)
  // Light mode: lighten (bem claro/lavado)
  const lightenedDisabledBgHsl = hexToHslWithWrapper(lighten(hexColor, 70));
  const lightenedDisabledBorderHsl = hexToHslWithWrapper(lighten(hexColor, 50));

  // Dark mode: darken (menos apagado para testar)
  const darkenedDisabledBgHsl = hexToHslWithWrapper(darken(hexColor, 25));
  const darkenedDisabledBorderHsl = hexToHslWithWrapper(darken(hexColor, 40));

  return {
    // Enabled checked
    '--corp-runtime-checkbox-checked-color': resolved,
    '--corp-runtime-checkbox-checked-border': darkenedHsl,
    // Focus ring (usa cor base)
    '--corp-runtime-checkbox-focus-ring': resolved,
    // Disabled checked (2 variáveis: light e dark)
    '--corp-runtime-checkbox-checked-disabled-bg-light': lightenedDisabledBgHsl,
    '--corp-runtime-checkbox-checked-disabled-bg-dark': darkenedDisabledBgHsl,
    '--corp-runtime-checkbox-checked-disabled-border-light':
      lightenedDisabledBorderHsl,
    '--corp-runtime-checkbox-checked-disabled-border-dark':
      darkenedDisabledBorderHsl,
  };
});

// Classes de cor - SEMPRE usa CSS variable (funciona pra qualquer cor)
const colorClasses = computed(() => {
  // NÃO aplica quando disabled (disabled tem suas próprias classes)
  if (isDisabled.value) return '';

  // Usa variáveis injetadas dinamicamente (bg + border mais escura com darken)
  return 'data-[state=checked]:bg-[var(--corp-runtime-checkbox-checked-color)] data-[state=checked]:border-[var(--corp-runtime-checkbox-checked-border)]';
});

// Classes de focus - runtime override ou padrão do tema
const focusClasses = computed(() => {
  // Se não tem cor customizada, usa padrão do tema (checkbox-ring = primary)
  if (!props.color) return 'focus-visible:ring-[var(--checkbox-ring)]';

  // Cor customizada: usa variável runtime
  return 'focus-visible:ring-[var(--corp-runtime-checkbox-focus-ring)]';
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

// Tamanhos dos ícones por density
const iconSizes = computed(() => {
  const map = {
    compact: 14,
    standard: 16,
    comfortable: 18,
  };
  return map[props.density];
});

// Classes de estado disabled removidas - agora usa CSS global (estilo não-scoped)

// ============== WATCHERS ==============

/**
 * Watch: Props.modelValue → internalValue (sincronização externa → interna)
 * Converte valor customizado para boolean
 */
watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== undefined) {
      const newBoolValue = newVal === props.trueValue;
      if (newBoolValue !== internalValue.value) {
        internalValue.value = newBoolValue;
      }
    }
  }
);

/**
 * Watch: internalValue → emit (sincronização interna → externa)
 * Converte boolean para trueValue/falseValue
 */
watch(internalValue, newVal => {
  const emitValue = newVal ? props.trueValue : props.falseValue;
  emit('update:modelValue', emitValue);
});

// ============== METHODS ==============

/**
 * Handler do @click - único evento que funciona no CheckboxRoot
 */
const handleCheckboxClick = (): void => {
  if (!isDisabled.value) {
    internalValue.value = !internalValue.value;
  }
};

const handleFocus = (): void => {
  isFocused.value = true;
};

// Marca campo como touched e valida no blur
const handleBlur = (): void => {
  isFocused.value = false;
  touched.value = true;

  if (validation && props.rules && props.rules.length > 0) {
    validation.validateField(props.name, internalValue.value, props.rules);
  }
};
</script>

<template>
  <div class="space-y-1 w-full">
    <!-- Checkbox + Label alinhados -->
    <div
      :class="
        cn('flex items-center space-x-3', {
          'flex-row-reverse space-x-reverse': labelPosition === 'left',
        })
      "
    >
      <!-- Checkbox -->
      <CheckboxRoot
        :id="name"
        :name="name"
        :checked="internalValue"
        :disabled="isDisabled"
        @click="handleCheckboxClick"
        @focus="handleFocus"
        @blur="handleBlur"
        :style="customColorStyle"
        :class="
          cn(
            'grid place-content-center peer shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed data-[state=checked]:text-primary-foreground data-[state=unchecked]:border-[var(--checkbox-unchecked-border)]',
            densityClasses,
            colorClasses,
            focusClasses,
            {
              'border-destructive': hasError,
              'corp-checkbox-checked': internalValue,
              'corp-checkbox-unchecked': !internalValue,
            },
            customClass
          )
        "
      >
        <!-- Forçar ícone quando disabled (reka-ui não renderiza CheckboxIndicator corretamente) -->
        <template v-if="isDisabled && internalValue">
          <CorpIcon v-if="indeterminate" icon="luc-minus" :size="iconSizes" />
          <CorpIcon v-else icon="luc-check" :size="iconSizes" />
        </template>

        <!-- Normal: usa CheckboxIndicator -->
        <CheckboxIndicator
          v-else
          class="grid place-content-center text-current"
        >
          <!-- Indeterminate: ícone Minus -->
          <CorpIcon v-if="indeterminate" icon="luc-minus" :size="iconSizes" />
          <!-- Checked: ícone Check -->
          <CorpIcon v-else icon="luc-check" :size="iconSizes" />
        </CheckboxIndicator>
      </CheckboxRoot>

      <!-- Label -->
      <Label
        v-if="label"
        :for="name"
        :class="{ 'text-destructive': hasError }"
        class="cursor-pointer font-normal"
        style="font-size: var(--label-text-size)"
      >
        {{ label }}
        <span v-if="hasRequiredRule" class="text-destructive">*</span>
      </Label>
    </div>

    <!-- Área de hint e erro (separada) -->
    <div
      :class="
        cn({
          'pl-8': labelPosition === 'right',
          'pr-8 text-right': labelPosition === 'left',
        })
      "
    >
      <CorpHintLine
        :error-messages="errorMessages"
        :hint="hint"
        :hide-details="hideDetails"
        :debug="debug"
        :messages="messages"
        :max-errors="maxErrors"
      />
    </div>
  </div>
</template>

<style>
/*
 * FORÇA cores disabled com !important para contornar bug do reka-ui
 * que não seta data-state/aria-checked corretamente quando disabled
 * Usa classes customizadas controladas pelo internalValue
 */

/* Checked disabled: light mode (default) */
button.corp-checkbox-checked:disabled {
  background-color: var(
    --corp-runtime-checkbox-checked-disabled-bg-light
  ) !important;
  border-color: var(
    --corp-runtime-checkbox-checked-disabled-border-light
  ) !important;
  color: var(--corp-runtime-checkbox-checked-disabled-border-light) !important;
}

/* Checked disabled: dark mode */
.dark button.corp-checkbox-checked:disabled {
  background-color: var(
    --corp-runtime-checkbox-checked-disabled-bg-dark
  ) !important;
  border-color: var(
    --corp-runtime-checkbox-checked-disabled-border-dark
  ) !important;
  color: var(--corp-runtime-checkbox-checked-disabled-border-dark) !important;
}

/* Unchecked disabled: usa theme.ts (cinza neutro) */
button.corp-checkbox-unchecked:disabled {
  background-color: var(--checkbox-unchecked-disabled-bg) !important;
  border-color: var(--checkbox-unchecked-disabled-border) !important;
}
</style>
