<script setup lang="ts">
/**
 * 🧩 CorpHintLine - Linha de hint/erro para componentes de formulário
 *
 * Exibe mensagens de erro (vermelho), hints (cinza) ou área debug (amarelo).
 * Usado por todos os componentes CbForm* para consistência visual.
 *
 * 🔗 DEPENDÊNCIAS:
 * - ✅ ZERO (apenas TailwindCSS)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { computed, type PropType } from 'vue';

// ============== PROPS ==============
const props = defineProps({
  errorMessages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  hint: {
    type: String,
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
  persistentHint: {
    type: Boolean,
    default: false,
  },
  maxErrors: {
    type: Number,
    default: 1,
  },
  messages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

// ============== COMPUTED ==============
const hasError = computed(() => props.errorMessages.length > 0);

// Limita erros ao maxErrors
const limitedErrors = computed(() => {
  return props.errorMessages.slice(0, props.maxErrors);
});

const hasMessages = computed(() => props.messages.length > 0);
</script>

<template>
  <!-- Área de detalhes (hint/error/messages) -->
  <div
    v-if="!hideDetails || debug"
    class="min-h-5 text-xs"
    :class="{
      'bg-yellow-50 border border-yellow-200 p-1': debug,
    }"
  >
    <!-- Error messages (limitado ao maxErrors) -->
    <div v-if="hasError" class="text-red-500">
      {{ limitedErrors.join(', ') }}
    </div>

    <!-- Messages (genérico - aparecem quando não há erro) -->
    <div v-else-if="hasMessages" class="text-muted-foreground">
      {{ messages.join(', ') }}
    </div>

    <!-- Hint (sempre visível se persistentHint=true, senão só quando não tem erro) -->
    <div
      v-if="hint && (persistentHint || !hasError)"
      class="text-muted-foreground"
      :class="{ 'mt-1': hasError && persistentHint }"
    >
      {{ hint }}
    </div>

    <!-- Debug mode -->
    <div
      v-else-if="debug && !hint && !hasError && !hasMessages"
      class="text-gray-400 italic"
    >
      [Área reservada para hint/error/messages]
    </div>
  </div>
</template>
