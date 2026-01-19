<script setup lang="ts">
/**
 * 🧩 Command - Command Palette com filtro e navegação
 *
 * Aceita arrays de comandos ou grupos de comandos.
 * Suporta filtro com deburr (busca sem acentos), navegação por teclado.
 * Renderiza automaticamente input, lista, empty state e grupos.
 *
 * 🎯 MODOS:
 * - inline: Componente fixo, sempre renderizado
 * - floating: Popover flutuante (fecha ao clicar fora automaticamente)
 * - modal: Usar com <CommandDialog> (gerencia overlay + ESC)
 *
 * 🔒 MODO PERSISTENT:
 * - persistent=true: Desabilita auto-close ao clicar fora (floating) ou ESC (modal)
 * - Útil para slash commands que só fecham ao apagar "/"
 * - Componente pai controla fechamento manualmente via isOpen
 *
 * 🎨 CUSTOMIZAÇÃO:
 * - emptyIcon: Customiza ícone do empty state (default: 'luc-search')
 * - emptyHint: Texto de dica adicional no empty state
 * - maxHeight, maxWidth, minWidth: Dimensionamento (especial para floating)
 *
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - reka-ui (ListboxRoot, ListboxFilter, etc)
 * - @vueuse/core (onClickOutside para modo floating)
 * - deburr (normalização de acentos)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { onClickOutside } from '@vueuse/core';

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { ListboxRootEmits } from 'reka-ui';
import type { HTMLAttributes, PropType } from 'vue';
import { computed, reactive, ref, watch } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  ListboxRoot,
  ListboxFilter,
  ListboxContent,
  ListboxGroup,
  ListboxItem,
  useForwardPropsEmits,
} from 'reka-ui';
import { Search } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { deburr } from '@/utils/stringUtils';
import { provideCommandContext, type ICommand, type ICommandGroup } from '.';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';

// ============== PROPS ==============

const props = defineProps({
  // Básicos
  modelValue: {
    type: String,
    default: '',
  },
  items: {
    type: Array as PropType<(ICommand | ICommandGroup)[]>,
    default: () => [],
  },

  // Filtro
  query: {
    type: String,
    default: '',
  },

  // Textos
  placeholder: {
    type: String,
    default: 'Digite para buscar...',
  },
  emptyText: {
    type: String,
    default: 'Nenhum resultado encontrado.',
  },
  loadingText: {
    type: String,
    default: 'Carregando...',
  },

  // Estados
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },

  // Modo de exibição
  mode: {
    type: String as PropType<'inline' | 'floating' | 'modal'>,
    default: 'inline',
  },
  isOpen: {
    type: Boolean,
    default: true,
  },

  // Controla se mostra o input de busca interno
  showSearchField: {
    type: Boolean,
    default: true,
  },

  // Modo persistente: não fecha ao clicar fora (floating) ou ESC (modal via Dialog)
  persistent: {
    type: Boolean,
    default: false,
  },

  // Dimensionamento (APENAS para modo 'floating')
  // NOTA: No modo 'inline', controle a altura via class no container pai
  // Exemplo inline: <Command mode="inline" class="h-[400px]" />
  // Exemplo floating: <Command mode="floating" :max-height="200" />
  maxHeight: {
    type: [String, Number],
    default: 300,
  },
  maxWidth: {
    type: [String, Number],
    default: '100%',
  },
  minWidth: {
    type: [String, Number],
    default: 320,
  },

  // Hint para empty state
  emptyHint: {
    type: String,
    default: '',
  },

  // Ícone do empty state (default: luc-search)
  emptyIcon: {
    type: String,
    default: 'luc-search',
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
});

const emits = defineEmits<
  ListboxRootEmits & {
    'update:query': [value: string];
    'update:isOpen': [value: boolean];
    select: [item: ICommand];
    close: [];
  }
>();

// ============== ESTADO INTERNO ==============

const delegatedProps = reactiveOmit(
  props,
  'class',
  'items',
  'query',
  'placeholder',
  'emptyText',
  'loadingText',
  'loading'
);
const forwarded = useForwardPropsEmits(delegatedProps, emits);

// Refs para elementos
const floatingContainerRef = ref<HTMLElement | null>(null);

// Estado de busca interno
const internalQuery = ref<string>(props.query);

// Reka UI filter context (manter compatibilidade)
const allItems = ref<Map<string, string>>(new Map());
const allGroups = ref<Map<string, Set<string>>>(new Map());

const filterState = reactive({
  search: '',
  filtered: {
    count: 0,
    items: new Map() as Map<string, number>,
    groups: new Set() as Set<string>,
  },
});

// ============== UTILS ==============

/**
 * Formata valor para CSS (adiciona 'px' se for número)
 */
const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

// ============== COMPUTED PROPERTIES ==============

/**
 * Estilos dinâmicos do floating dropdown
 */
const floatingStyles = computed(() => ({
  maxHeight: formatCssValue(props.maxHeight),
  maxWidth: formatCssValue(props.maxWidth),
  minWidth: formatCssValue(props.minWidth),
}));

/**
 * Filtra items baseado na query (com deburr para acentos)
 *
 * Normaliza acentos: "médico" encontra "medico"
 */
const filteredItems = computed(() => {
  if (!internalQuery.value) return props.items;

  const normalizedQuery = deburr(internalQuery.value);
  const result: (ICommand | ICommandGroup)[] = [];

  for (const item of props.items) {
    // Se é grupo
    if ('items' in item && item.items) {
      const filteredGroupItems = item.items.filter(
        subItem =>
          deburr(subItem.label || '').includes(normalizedQuery) ||
          deburr(subItem.description || '').includes(normalizedQuery) ||
          deburr(subItem.value || '').includes(normalizedQuery)
      );

      if (filteredGroupItems.length > 0) {
        result.push({
          ...item,
          items: filteredGroupItems,
        });
      }
    } else {
      // Se é item simples
      const cmd = item as ICommand;
      if (
        deburr(cmd.label || '').includes(normalizedQuery) ||
        deburr(cmd.description || '').includes(normalizedQuery) ||
        deburr(cmd.value || '').includes(normalizedQuery)
      ) {
        result.push(cmd);
      }
    }
  }

  return result;
});

/**
 * Verifica se deve mostrar empty state
 */
const showEmpty = computed(() => {
  return (
    !props.loading && filteredItems.value.length === 0 && internalQuery.value
  );
});

// ============== WATCHERS ==============

watch(
  () => props.query,
  newVal => {
    if (newVal !== internalQuery.value) {
      internalQuery.value = newVal;
    }
  }
);

watch(internalQuery, newVal => {
  emits('update:query', newVal);
  filterState.search = newVal;
});

// Provê contexto para compatibilidade com componentes antigos
provideCommandContext({
  allItems,
  allGroups,
  filterState,
});

// ============== CLICK OUTSIDE (modo floating) ==============

/**
 * Fecha automaticamente o floating ao clicar fora
 *
 * O componente pai não precisa gerenciar isso!
 * Apenas escute @update:isOpen ou @close para sincronizar estado se necessário.
 *
 * Modo modal: CommandDialog já gerencia via Dialog overlay
 *
 * 🔒 MODO PERSISTENT:
 * Se persistent=true, NÃO fecha ao clicar fora.
 * Útil para slash commands que só fecham ao apagar "/".
 */
onClickOutside(floatingContainerRef, () => {
  // Não fecha se for persistent
  if (props.persistent) return;

  if (props.mode === 'floating' && props.isOpen) {
    emits('update:isOpen', false);
    emits('close');
  }
});

// ============== MÉTODOS ==============

const handleSelect = (item: ICommand): void => {
  emits('select', item);
  // Limpa query após seleção
  internalQuery.value = '';
  // Fecha floating/modal após seleção
  if (props.mode === 'floating' || props.mode === 'modal') {
    emits('update:isOpen', false);
    emits('close');
  }
};
</script>

<template>
  <!-- MODO INLINE: componente fixo, sempre renderizado -->
  <ListboxRoot
    v-if="mode === 'inline'"
    v-bind="forwarded"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border border-[hsl(var(--corp-def-command-border))]',
        props.class
      )
    "
  >
    <!-- Input integrado (condicional via showSearchField) -->
    <div
      v-if="showSearchField"
      class="flex items-center border-b border-b-[hsl(var(--corp-def-command-divider))] px-3"
      cmdk-input-wrapper
    >
      <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <ListboxFilter
        v-model="internalQuery"
        auto-focus
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>

    <!-- Lista integrada -->
    <ListboxContent
      class="commandScrollbar h-full overflow-y-auto overflow-x-hidden"
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
                      <span
                        v-if="subItem.description"
                        class="commandDescription"
                      >
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
  </ListboxRoot>

  <!-- MODO FLOATING: popover flutuante (position absolute) -->
  <div
    v-else-if="mode === 'floating' && isOpen"
    ref="floatingContainerRef"
    class="commandFloating"
    :style="floatingStyles"
  >
    <ListboxRoot
      v-bind="forwarded"
      :class="
        cn(
          'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border border-[hsl(var(--corp-def-command-border))]',
          props.class
        )
      "
    >
      <!-- Input integrado (condicional via showSearchField) -->
      <div
        v-if="showSearchField"
        class="flex items-center border-b border-b-[hsl(var(--corp-def-command-divider))] px-3"
        cmdk-input-wrapper
      >
        <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <ListboxFilter
          v-model="internalQuery"
          auto-focus
          :placeholder="placeholder"
          :disabled="disabled"
          class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <!-- Lista integrada -->
      <ListboxContent
        class="commandScrollbar max-h-[300px] overflow-y-auto overflow-x-hidden"
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
                        <span
                          v-if="subItem.description"
                          class="commandDescription"
                        >
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
    </ListboxRoot>
  </div>
</template>

<style scoped>
/* === TESTE: Variável temporária VERDE === */
:root {
  --corp-command-border-test: #00ff00; /* Verde neon - TESTE */
}

/* === SCROLLBAR CUSTOMIZADA (Classe Utilitária) === */
.commandScrollbar {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--primary) / 0.3) transparent;
  padding: 8px 4px 8px 0; /* Afasta conteúdo das bordas */
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

/* === MODO FLOATING === */
.commandFloating {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform-origin: top center;

  /* max-height, max-width, min-width controlados via :style */
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
  /* border-bottom removido - separação agora é antes do grupo */
}

.groupIcon {
  width: 1.125rem;
  height: 1.125rem;
  color: hsl(var(--primary));
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
  color: hsl(var(--primary));
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

/* === RESPONSIVIDADE === */
@media (max-width: 640px) {
  .commandFloating {
    max-width: 100vw !important;
    min-width: auto !important;
  }

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
}
</style>
