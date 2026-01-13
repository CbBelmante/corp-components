<script setup lang="ts">
/**
 * CorpThemeToggle - Alternador de Tema Dark/Light
 *
 * Componente para alternar entre tema escuro e claro do sistema.
 * Utiliza o composable useTheme para gerenciar o estado do tema
 * e persiste a preferência do usuário no localStorage.
 *
 * @component
 *
 * @example
 * <CorpThemeToggle />
 */

import { useTheme } from '@/composables/useTheme';
import { CorpButton } from '@/components/ui/button';
import { CorpIcon } from '@/components/ui/icon';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <CorpButton
    variant="ghost"
    size="icon"
    class="h-8 w-8 transition-colors"
    :class="isDark ? 'text-blue-400' : 'text-yellow-500'"
    :title="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
    @click="toggleTheme"
  >
    <CorpIcon :icon="isDark ? 'luc-moon' : 'luc-sun'" :size="16" />
  </CorpButton>
</template>
