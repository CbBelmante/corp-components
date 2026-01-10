<script setup lang="ts">
/**
 * 🧩 CorpSwitch - Switch toggle com validação e layout horizontal
 *
 * Layout horizontal (switch à esquerda, label e hint à direita).
 * Integra com useForm (inject) para validação opcional.
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - reka-ui (SwitchRoot, SwitchThumb)
 * - useFormValidation (inject pattern)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { SwitchRoot, SwitchThumb } from 'reka-ui';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, watch, ref, inject, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import {
  resolveColor,
  getComputedColor,
  toRgba,
} from '@/utils/CorpColorUtils';
import {
  switchVariants,
  thumbSizeMap,
  thumbTranslateMap,
  type SwitchVariant,
  type SwitchDensity,
} from '.';
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
  loading: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  forceError: {
    type: Boolean,
    default: false,
  },

  // Color (semantic OU custom: hex, rgb, var(), etc)
  color: {
    type: String,
    default: 'primary',
  },

  // Validação direta (erros externos - backend/API)
  externalErrors: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },

  // Valores customizados (permite String, Number, etc ao invés de apenas Boolean)
  trueValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true,
  },
  falseValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false,
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
    type: String as PropType<SwitchDensity>,
    default: 'compact',
  },

  // Variant (estilo visual)
  variant: {
    type: String as PropType<SwitchVariant>,
    default: 'solid',
  },

  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: undefined,
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

// Converte modelValue para boolean interno (checked state)
const internalValue = ref<boolean>(
  props.modelValue !== undefined ? props.modelValue === props.trueValue : false
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

const hasRequiredRule = computed(() => {
  return props.rules.some(
    rule => rule.name === 'required' || rule.toString().includes('obrigatório')
  );
});

// Disabled state (disabled OU readonly OU loading)
const isDisabled = computed(() => {
  return props.disabled || props.readonly || props.loading;
});

// Style inline - SEMPRE injeta cor (sem branching semantic/custom)
// resolveColor() trata: 'primary' → hsl(var(--primary)), '#FF0000' → #FF0000, 'red' → red
const customColorStyle = computed(() => {
  if (!props.color) return {};

  const resolved = resolveColor(props.color);
  const hexColor = getComputedColor(resolved);

  return {
    '--corp-runtime-switch-color': resolved,
    '--corp-runtime-switch-color-light': toRgba(hexColor, 0.15), // Para ghost variant
    '--corp-runtime-switch-track-focus': resolved,
    '--corp-runtime-switch-thumb-focus': resolved,
  };
});

// Classes de cor baseadas na variant
const colorClasses = computed(() => {
  if (isDisabled.value) return [];

  const classes: string[] = [];

  switch (props.variant) {
    case 'solid':
      // Solid: fundo colorido quando checked
      classes.push('data-[state=checked]:bg-[var(--corp-runtime-switch-color)]');
      break;

    case 'ghost':
      // Ghost: fundo sutil (15%) + borda colorida quando checked
      classes.push(
        'data-[state=checked]:bg-[var(--corp-runtime-switch-color-light)]',
        'data-[state=checked]:border-[var(--corp-runtime-switch-color)]'
      );
      break;
  }

  return classes;
});

// Classes de focus - runtime override ou padrão do tema
const focusClasses = computed(() => {
  // Se não tem cor, usa padrão do tema (switch-ring = primary)
  if (!props.color) return 'focus-visible:ring-[var(--switch-ring)]';

  // TODAS as cores (semantic E custom) usam variável runtime do TRILHO
  return 'focus-visible:ring-[var(--corp-runtime-switch-track-focus)]';
});

// Classes finais do switch (usa CVA)
const switchClasses = computed(() => {
  return cn(
    switchVariants({
      variant: props.variant,
      density: props.density,
    }),
    colorClasses.value,
    focusClasses.value,
    {
      'border-destructive': hasError.value,
    },
    props.class
  );
});

// Classes do thumb (bolinha)
const thumbClasses = computed(() => {
  return cn(
    'pointer-events-none flex items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform',
    'data-[state=unchecked]:translate-x-0',
    thumbSizeMap[props.density],
    thumbTranslateMap[props.density]
  );
});

// ============== WATCHERS ==============

/**
 * Watch: Props.modelValue → internalValue (sincronização externa → interna)
 * Converte valor customizado para boolean
 */
watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== undefined) {
      const newBooleanValue = newVal === props.trueValue;
      if (newBooleanValue !== internalValue.value) {
        internalValue.value = newBooleanValue;
      }
    }
  }
);

/**
 * Watch: internalValue → emit (sincronização interna → externa)
 * Converte boolean para valor customizado (trueValue/falseValue)
 */
watch(internalValue, newVal => {
  const valueToEmit = newVal ? props.trueValue : props.falseValue;
  emit('update:modelValue', valueToEmit);
});

// ============== METHODS ==============

/**
 * Handler do click no switch - toggle manual
 */
const handleSwitchClick = () => {
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
  <div class="flex flex-col gap-0 w-full">
    <!-- Switch + Label alinhados -->
    <div
      :class="
        cn('flex items-center space-x-3', {
          'flex-row-reverse space-x-reverse': labelPosition === 'left',
        })
      "
    >
      <!-- Switch -->
      <SwitchRoot
        :id="name"
        :name="name"
        :checked="indeterminate ? 'indeterminate' : internalValue"
        :disabled="isDisabled"
        @click="handleSwitchClick"
        @focus="handleFocus"
        @blur="handleBlur"
        :style="customColorStyle"
        :class="switchClasses"
      >
        <SwitchThumb :class="thumbClasses">
          <!-- Loading spinner -->
          <CorpIcon
            v-if="loading"
            icon="luc-loader-2"
            :size="10"
            class="animate-spin text-muted-foreground"
          />
        </SwitchThumb>
      </SwitchRoot>

      <!-- Label -->
      <Label
        v-if="label"
        :for="name"
        :class="
          cn('cursor-pointer font-normal', { 'text-destructive': hasError })
        "
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
          'pl-12': labelPosition === 'right',
          'pr-12 text-right': labelPosition === 'left',
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

<style scoped>
/* Focus glow na bolinha (thumb) do switch - emanando luz */
:deep(button[role='switch']:focus-visible span) {
  outline: none !important;
  box-shadow:
    0 0 0 var(--ring-width)
      var(--corp-runtime-switch-thumb-focus, var(--switch-ring)),
    0 0 7px 1.5px var(--corp-runtime-switch-thumb-focus, var(--switch-ring)) !important;
}

/* Normal unchecked - usa variável do theme */
:deep(button[data-state='unchecked']:not(:disabled)) {
  background-color: var(--switch-unchecked) !important;
}

/* Dark mode - checked disabled - IGUAL CHECKBOX */
.dark :deep(button[data-state='checked']:disabled) {
  background-color: var(--checkbox-checked-disabled-bg) !important;
  opacity: 1 !important;
}

/* Light mode - checked disabled - IGUAL CHECKBOX */
:deep(button[data-state='checked']:disabled) {
  background-color: var(--checkbox-checked-disabled-bg) !important;
  opacity: 1 !important;
}

/* Unchecked disabled - IGUAL checkbox */
:deep(button[data-state='unchecked']:disabled) {
  background-color: var(--switch-unchecked-disabled-bg) !important;
  opacity: 1 !important;
}

/* Dark mode - unchecked disabled - IGUAL checkbox */
.dark :deep(button[data-state='unchecked']:disabled) {
  background-color: var(--switch-unchecked-disabled-bg) !important;
  opacity: 1 !important;
}

/* Thumb - usa variável do theme */
:deep(button span) {
  background-color: var(--switch-thumb) !important;
}

/* Hover disabled - mantém cores iguais ao estado normal */
.dark :deep(button[data-state='checked']:disabled:hover) {
  background-color: var(--checkbox-checked-disabled-bg) !important;
  filter: none !important;
}

:deep(button[data-state='checked']:disabled:hover) {
  background-color: var(--checkbox-checked-disabled-bg) !important;
  filter: none !important;
}

/* Unchecked disabled hover - mantém cor igual ao estado normal */
:deep(button[data-state='unchecked']:disabled:hover) {
  background-color: var(--switch-unchecked-disabled-bg) !important;
  filter: none !important;
}

.dark :deep(button[data-state='unchecked']:disabled:hover) {
  background-color: var(--switch-unchecked-disabled-bg) !important;
  filter: none !important;
}

/* Thumb no hover disabled - mantém branco */
:deep(button:disabled:hover span) {
  background-color: var(--switch-thumb) !important;
  filter: none !important;
}
</style>
