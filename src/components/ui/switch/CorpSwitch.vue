<script setup lang="ts">
/**
 * 🧩 CorpSwitch - Switch toggle com validação e layout horizontal
 *
 * Manipulação direta do Switch shadcn (reka-ui) com validação própria (useForm)
 * e layout horizontal (switch à esquerda, label e hint à direita).
 *
 * 🔗 DEPENDÊNCIAS:
 * - useFormValidation (inject) - Validação opcional
 * - reka-ui (SwitchRoot, SwitchThumb)
 * - CorpHintLine
 *
 * @example
 * // Básico
 * <CorpSwitch name="isActive" label="Empresa ativa" />
 *
 * // Com hint
 * <CorpSwitch name="isPayer" label="Empresa pagadora" hint="Descrição aqui" />
 *
 * // Com validação (asterisco aparece automaticamente com rules.required)
 * <CorpSwitch name="terms" label="Aceito os termos" :rules="[rules.required]" />
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { computed, watch, ref, inject, type PropType } from 'vue';
import { SwitchRoot, SwitchThumb } from 'reka-ui';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import CorpHintLine from '@/components/forms/CorpHintLine.vue';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import { resolveColor } from '@/utils/CorpColorUtils';
import type { ValidationRule } from '@/validations/rules';
import type { CorpValidationContext } from '@/composables/useForm';
import { SEMANTIC_COLORS } from '@/constants/semanticColors.js';

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

  // Color (semantic OU custom: hex, rgb, var(), etc)
  color: {
    type: String,
    default: 'primary',
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
  debug: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: undefined,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
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

const errorMessages = computed<string[]>(
  () => validation?.errors.value[props.name] ?? []
);

// Converte modelValue para boolean interno (checked state)
const internalValue = ref<boolean>(
  props.modelValue !== undefined ? props.modelValue === props.trueValue : false
);

// Validação progressiva: só valida onChange após primeiro blur
const touched = ref<boolean>(false);

// Estado de foco: esconde erro enquanto usuário interage
const isFocused = ref<boolean>(false);

const hasError = computed<boolean>(() => {
  if (!validation) return false;
  const errors = validation.errors.value[props.name] ?? [];
  return errors.length > 0 && !isFocused.value;
});

// ============== COMPUTED PROPERTIES ==============

const customClass = computed(() => props.class);

const hasRequiredRule = computed(() => {
  return props.rules.some(
    rule => rule.name === 'required' || rule.toString().includes('obrigatório')
  );
});

// Verifica se tem hint ou erros (para ajustar margem do switch)
const hasHintOrError = computed(() => {
  return !!(props.hint || errorMessages.value.length > 0);
});

// Disabled state (disabled OU readonly OU loading)
const isDisabled = computed(() => {
  return props.disabled || props.readonly || props.loading;
});

// Verifica se color é semantic ou custom
const isColorSemantic = computed(() => {
  return SEMANTIC_COLORS.includes(props.color as any);
});

// Style inline para color customizado
const customColorStyle = computed(() => {
  if (isColorSemantic.value || !props.color) return {};

  // Color customizado (não-semantic): aplica via CSS variable
  return {
    '--switch-custom-color': resolveColor(props.color),
  };
});

// Classes de cor (mapeamento fixo para JIT)
const colorClasses = computed(() => {
  if (!isColorSemantic.value) {
    // Custom color: usa CSS variable
    return 'data-[state=checked]:bg-[var(--switch-custom-color)]';
  }

  // Semantic colors: mapeamento fixo
  const colorMap: Record<string, string> = {
    primary: 'data-[state=checked]:bg-primary',
    secondary: 'data-[state=checked]:bg-secondary',
    destructive: 'data-[state=checked]:bg-destructive',
    success: 'data-[state=checked]:bg-success',
    warning: 'data-[state=checked]:bg-warning',
    info: 'data-[state=checked]:bg-info',
  };

  return colorMap[props.color] || 'data-[state=checked]:bg-primary';
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
  emit('update:modelValue', valueToEmit as any);
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

/**
 * Toggle switch quando usuário clica no label
 * Aumenta área clicável para melhor UX
 */
const toggleValue = () => {
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
  <div class="flex items-start space-x-3">
    <!-- Switch -->
    <SwitchRoot
      :name="name"
      :checked="internalValue"
      :disabled="isDisabled"
      @click="handleSwitchClick"
      :style="customColorStyle"
      :class="
        cn(
          'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed data-[state=unchecked]:bg-[var(--switch-unchecked)]',
          colorClasses,
          {
            'border-destructive': hasError,
            'mt-1.5': hasHintOrError,
            'mt-1': !hasHintOrError,
          },
          customClass
        )
      "
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <SwitchThumb
        :class="
          cn(
            'pointer-events-none flex items-center justify-center h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
          )
        "
      >
        <!-- Loading spinner -->
        <CorpIcon
          v-if="loading"
          icon="luc-loader-2"
          :size="10"
          class="animate-spin text-muted-foreground"
        />
      </SwitchThumb>
    </SwitchRoot>

    <!-- Label + Hint/Error container (sempre existe) -->
    <div class="flex-1 space-y-0">
      <Label
        v-if="label"
        :for="name"
        @click="toggleValue"
        :class="{ 'text-destructive': hasError }"
        class="cursor-pointer font-normal"
        style="font-size: var(--label-text-size)"
      >
        {{ label }}
        <span v-if="hasRequiredRule" class="text-destructive">*</span>
      </Label>

      <!-- CorpHintLine controla internamente se mostra ou não -->
      <CorpHintLine
        :error-messages="errorMessages"
        :hint="hint"
        :hide-details="hideDetails"
        :debug="debug"
      />
    </div>
  </div>
</template>

<style scoped>
/* Focus glow na bolinha (thumb) do switch - emanando luz laranja */
:deep(button[role='switch']:focus-visible span) {
  outline: none !important;
  box-shadow:
    0 0 0 var(--ring-width) var(--input-ring),
    0 0 7px 1.5px var(--input-ring) !important;
}

/* Remove ring do botão externo */
:deep(button[role='switch']:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
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
