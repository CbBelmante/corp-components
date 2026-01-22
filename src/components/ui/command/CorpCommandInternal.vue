<script setup lang="ts">
/**
 * 🧩 CommandInternal - Template interno compartilhado do Command
 *
 * Componente apresentacional "burro" que apenas renderiza:
 * - Input de busca (condicional)
 * - Lista de comandos (loading, empty, items/grupos)
 * - Footer com dicas de navegação (condicional)
 *
 * Toda a lógica (filtro, handlers, watchers) fica no CorpCommand.vue pai.
 * Este componente apenas recebe props e emite eventos.
 */

import { computed } from 'vue';
import type { PropType } from 'vue';
import {
  ListboxContent,
  ListboxFilter,
  ListboxGroup,
  ListboxItem,
} from 'reka-ui';
import { Search } from 'lucide-vue-next';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import type { ICommand, ICommandGroup } from '.';

// ============== PROPS ==============

const props = defineProps({
  // Search field
  showSearchField: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: 'Digite para buscar...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  internalQuery: {
    type: String,
    default: '',
  },

  // Items
  filteredItems: {
    type: Array as PropType<(ICommand | ICommandGroup)[]>,
    default: () => [],
  },

  // States
  loading: {
    type: Boolean,
    default: false,
  },
  showEmpty: {
    type: Boolean,
    default: false,
  },

  // Texts
  loadingText: {
    type: String,
    default: 'Carregando...',
  },
  emptyText: {
    type: String,
    default: 'Nenhum resultado encontrado.',
  },
  emptyHint: {
    type: String,
    default: '',
  },
  emptyIcon: {
    type: String,
    default: 'luc-search',
  },

  // Footer
  showFooter: {
    type: Boolean,
    default: true,
  },
  footerAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  filteredFooterCommands: {
    type: Array as PropType<{ keys: string; label: string }[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  'update:internalQuery': [value: string];
  select: [item: ICommand];
}>();

// ============== COMPUTED ==============

const queryModel = computed({
  get: () => props.internalQuery,
  set: (value: string) => emit('update:internalQuery', value),
});

// ============== MÉTODOS ==============

const handleSelect = (item: ICommand): void => {
  emit('select', item);
};
</script>

<template>
  <!-- Input integrado (condicional via showSearchField) -->
  <div
    v-if="showSearchField"
    class="flex items-center border-b border-b-[hsl(var(--corp-def-command-divider))] px-3"
    cmdk-input-wrapper
  >
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ListboxFilter
      v-model="queryModel"
      auto-focus
      :placeholder="placeholder"
      :disabled="disabled"
      class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>

  <!-- Lista integrada -->
  <ListboxContent
    class="commandScrollbar flex-1 overflow-y-auto overflow-x-hidden"
  >
    <div role="presentation">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="py-6 text-center text-sm text-muted-foreground"
      >
        {{ loadingText }}
      </div>

      <!-- Empty State -->
      <div
        v-else-if="showEmpty"
        class="flex flex-col items-center justify-center gap-2 py-6 text-center"
      >
        <CorpIcon
          :icon="emptyIcon"
          :size="32"
          class="text-muted-foreground opacity-50"
        />
        <div class="text-sm text-muted-foreground font-medium">
          {{ emptyText }}
        </div>
        <div v-if="emptyHint" class="text-xs text-muted-foreground/70">
          {{ emptyHint }}
        </div>
      </div>

      <!-- Renderiza grupos e items -->
      <template v-else>
        <template v-for="item in filteredItems" :key="item.id">
          <!-- Grupo -->
          <div v-if="'items' in item && item.items" class="commandGroup">
            <!-- Group Header -->
            <div v-if="item.title" class="groupHeader">
              <CorpIcon
                v-if="item.icon"
                :icon="item.icon"
                :size="18"
                class="groupIcon"
              />
              <span class="groupTitle">{{ item.title }}</span>
            </div>

            <!-- Items do grupo -->
            <ListboxGroup :id="item.id">
              <ListboxItem
                v-for="subItem in item.items"
                :key="subItem.id"
                :value="subItem.value"
                :disabled="subItem.disabled"
                class="commandItem"
                @select="handleSelect(subItem)"
              >
                <slot name="item" :item="subItem">
                  <CorpIcon
                    v-if="subItem.icon"
                    :icon="subItem.icon"
                    :size="16"
                    class="commandIcon"
                  />
                  <div class="commandDetails">
                    <span class="commandName">
                      {{ subItem.label || subItem.value }}
                    </span>
                    <span v-if="subItem.description" class="commandDescription">
                      {{ subItem.description }}
                    </span>
                  </div>
                </slot>
              </ListboxItem>
            </ListboxGroup>
          </div>

          <!-- Item simples -->
          <ListboxItem
            v-else
            :value="(item as ICommand).value"
            :disabled="(item as ICommand).disabled"
            class="commandItem"
            @select="handleSelect(item as ICommand)"
          >
            <slot name="item" :item="item">
              <CorpIcon
                v-if="(item as ICommand).icon"
                :icon="(item as ICommand).icon!"
                :size="16"
                class="commandIcon"
              />
              <div class="commandDetails">
                <span class="commandName">
                  {{ (item as ICommand).label || (item as ICommand).value }}
                </span>
                <span
                  v-if="(item as ICommand).description"
                  class="commandDescription"
                >
                  {{ (item as ICommand).description }}
                </span>
              </div>
            </slot>
          </ListboxItem>
        </template>
      </template>
    </div>
  </ListboxContent>

  <!-- Footer (dicas de navegação) - FORA do scroll -->
  <div
    v-if="showFooter"
    class="commandFooter border-t border-t-[hsl(var(--corp-def-command-divider))] p-2"
    :class="[
      {
        'justify-start': footerAlign === 'left',
        'justify-center': footerAlign === 'center',
        'justify-end': footerAlign === 'right',
      },
    ]"
  >
    <slot name="footer">
      <div class="flex items-center gap-4 text-xs text-muted-foreground">
        <div
          v-for="(cmd, index) in filteredFooterCommands"
          :key="index"
          class="flex items-center gap-1.5"
        >
          <kbd class="commandKbd">{{ cmd.keys }}</kbd>
          <span>{{ cmd.label }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped>
/* === SCROLLBAR CUSTOMIZADA (Classe Utilitária) === */
.commandScrollbar {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--primary) / 0.3) transparent;
}

.commandScrollbar::-webkit-scrollbar {
  width: 8px;
}

.commandScrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.commandScrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.3);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.commandScrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.5);
}

/* === GRUPOS DE COMANDOS === */
.commandGroup {
  margin-bottom: 0.75rem;
}

/* Linha divisória ANTES do grupo (exceto primeiro) */
.commandGroup:not(:first-child) {
  padding-top: 0.75rem;
  border-top: 1px solid hsl(var(--corp-def-command-divider));
}

.commandGroup:last-child {
  margin-bottom: 0;
}

.groupHeader {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  margin-bottom: 0.25rem;
}

.groupIcon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(
    --corp-runtime-command-icon-group,
    hsl(var(--corp-def-command-icon-group))
  );
  flex-shrink: 0;
}

.groupTitle {
  font-size: 0.8125rem;
  font-weight: 700;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* === ITENS DE COMANDO === */
.commandItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  cursor: default;
  transition: all 0.15s ease;
  color: hsl(var(--foreground));
  outline: none;
}

/* Items dentro de grupo com indent */
.commandGroup .commandItem {
  padding-left: 1.75rem;
}

.commandItem:hover {
  background-color: hsl(var(--accent));
}

.commandItem[data-highlighted] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.commandItem[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.commandIcon {
  width: 1rem;
  height: 1rem;
  color: var(
    --corp-runtime-command-icon-item,
    hsl(var(--corp-def-command-icon-item))
  );
  flex-shrink: 0;
}

.commandItem[data-highlighted] .commandIcon {
  color: hsl(var(--accent-foreground));
}

.commandDetails {
  display: flex !important;
  flex-direction: column !important;
  flex: 1;
  min-width: 0;
}

.commandName {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  display: block;
}

.commandDescription {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.2;
  margin-top: 0.125rem;
  display: block;
}

.commandItem[data-highlighted] .commandDescription {
  color: hsl(var(--accent-foreground));
  opacity: 0.8;
}

/* === FOOTER === */
.commandFooter {
  display: flex;
  flex-shrink: 0;
  background: hsl(var(--muted) / 0.3);
}

.commandKbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1;
  font-family: ui-monospace, monospace;
  color: hsl(var(--foreground));
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--border));
  border-radius: 0.25rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

/* === RESPONSIVIDADE === */
@media (max-width: 640px) {
  .commandDetails {
    gap: 0.0625rem;
  }

  .commandName {
    font-size: 0.75rem;
  }

  .commandDescription {
    font-size: 0.625rem;
    line-height: 1.1;
  }

  .commandFooter {
    font-size: 0.625rem;
    padding: 0.375rem;
  }

  .commandKbd {
    min-width: 1.25rem;
    height: 1rem;
    font-size: 0.5625rem;
  }
}
</style>
