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
 * - dialog: Modal com overlay (gerencia ESC, fullscreen mobile)
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
 * - CorpPopover (modo floating delegado para popover genérico)
 * - deburr (normalização de acentos)
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes, PropType } from 'vue';
import type { ListboxRootEmits } from 'reka-ui';
import { computed, reactive, ref, watch } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ListboxRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';
import { deburr } from '@/utils/stringUtils';
import {
  provideCommandContext,
  commandVariants,
  type ICommand,
  type ICommandGroup,
  type CommandDensity,
  type CommandRoundedPreset,
} from '.';
import { resolveColor } from '@/utils/CorpColorUtils';
import { resolveRounded, type RoundedValue } from '@commonStyles';
import CorpCommandInternal from './CorpCommandInternal.vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CorpPopover } from '@/components/ui/popover';
import type { PopoverTransition } from '@/components/ui/popover';

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
    type: String as PropType<'inline' | 'floating' | 'dialog'>,
    default: 'inline',
  },

  // v-model:open support
  open: {
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

  // Fecha floating ao scrollar (opcional)
  closeOnScroll: {
    type: Boolean,
    default: false,
  },

  // Controla animação de entrada/saída (apenas modo floating)
  transition: {
    type: String as PropType<PopoverTransition>,
    default: 'dropdown',
  },

  // Define qual elemento usar como âncora para posicionamento (apenas floating)
  // 'sibling': Elemento irmão anterior (ex: input antes do command)
  // 'parent': Elemento pai (container)
  // 'auto': Tenta sibling, se não existir usa parent (padrão)
  anchorTo: {
    type: String as PropType<'sibling' | 'parent' | 'auto'>,
    default: 'auto',
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

  // BorderColor - cor da borda (semantic OU custom: hex, rgb, var(), etc)
  borderColor: {
    type: String,
    default: undefined,
  },

  // IconColor - cor dos ícones (grupos e itens)
  iconColor: {
    type: String,
    default: undefined,
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },

  // Density (tamanho dos itens)
  density: {
    type: String as PropType<CommandDensity>,
    default: 'regular',
  },

  // Rounded (border-radius)
  rounded: {
    type: [String, Number, Boolean] as PropType<RoundedValue>,
    default: 'default',
  },

  // Footer com dicas de navegação
  showFooter: {
    type: Boolean,
    default: true,
  },

  // Alinhamento do footer (left, center, right)
  footerAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },

  // Comandos customizados para o footer (se não passar, usa os defaults)
  footerCommands: {
    type: Array as PropType<{ keys: string; label: string }[]>,
    default: () => [
      { keys: '↑↓', label: 'Navegar' },
      { keys: '↵', label: 'Selecionar' },
      { keys: 'Esc', label: 'Fechar' },
    ],
  },
});

const emit = defineEmits<
  ListboxRootEmits & {
    'update:query': [value: string];
    'update:open': [value: boolean];
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
const forwarded = useForwardPropsEmits(delegatedProps, emit);

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

// ============== COMPUTED PROPERTIES ==============

/**
 * Resolve rounded (preset/class/style)
 */
const rounded = computed(() => resolveRounded(props.rounded));

/**
 * Style inline - só injeta cor quando borderColor ou iconColor é passado
 */
const customColorStyle = computed(() => {
  const styles: Record<string, string> = {};

  // Border color runtime
  if (props.borderColor) {
    const resolved = resolveColor(props.borderColor);
    styles['--corp-runtime-command-border'] = resolved;
  }

  // Icon color runtime (aplica para ícones de grupo e item)
  if (props.iconColor) {
    const resolved = resolveColor(props.iconColor);
    styles['--corp-runtime-command-icon-group'] = resolved;
    styles['--corp-runtime-command-icon-item'] = resolved;
  }

  return styles;
});

/**
 * Classes de cor - usa runtime só quando borderColor é passado
 */
const colorClasses = computed(() => {
  // Se tem borderColor custom, usa runtime
  if (props.borderColor) {
    return 'border-[var(--corp-runtime-command-border)]';
  }

  // Senão, usa padrão do tema (já está no CVA)
  return '';
});

/**
 * Combina custom rounded + custom color styles
 */
const commandStyle = computed(() => {
  return {
    ...rounded.value.style,
    ...customColorStyle.value,
  };
});

/**
 * Classes finais do command (usa CVA)
 */
const commandClasses = computed(() => {
  return cn(
    commandVariants({
      density: props.density,
      rounded: rounded.value.preset as CommandRoundedPreset,
    }),
    rounded.value.class,
    colorClasses.value,
    props.class
  );
});

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

/**
 * Comandos do footer filtrados por modo
 * No modo inline, não mostra "Esc Fechar"
 */
const filteredFooterCommands = computed(() => {
  if (props.mode === 'inline') {
    return props.footerCommands.filter(cmd => cmd.keys !== 'Esc');
  }
  return props.footerCommands;
});

/**
 * Props que serão passadas para o CorpCommandInternal
 */
const internalProps = computed(() => ({
  showSearchField: props.showSearchField,
  placeholder: props.placeholder,
  disabled: props.disabled,
  internalQuery: internalQuery.value,
  filteredItems: filteredItems.value as (ICommand | ICommandGroup)[],
  loading: props.loading,
  showEmpty: !!showEmpty.value,
  loadingText: props.loadingText,
  emptyText: props.emptyText,
  emptyHint: props.emptyHint,
  emptyIcon: props.emptyIcon,
  showFooter: props.showFooter,
  footerAlign: props.footerAlign,
  filteredFooterCommands: filteredFooterCommands.value,
}));

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
  emit('update:query', newVal);
  filterState.search = newVal;
});

// Provê contexto para compatibilidade com componentes antigos
provideCommandContext({
  allItems,
  allGroups,
  filterState,
});

// ============== MÉTODOS ==============

const handleSelect = (item: ICommand): void => {
  emit('select', item);
  // Limpa query após seleção
  internalQuery.value = '';
  // Fecha floating/dialog após seleção
  if (props.mode === 'floating' || props.mode === 'dialog') {
    emit('update:open', false);
    emit('close');
  }
};
</script>

<template>
  <!-- MODO INLINE: componente fixo, sempre renderizado -->
  <ListboxRoot
    v-if="mode === 'inline'"
    v-bind="forwarded"
    :class="commandClasses"
    :style="commandStyle"
  >
    <CorpCommandInternal
      v-bind="internalProps"
      @update:internal-query="internalQuery = $event"
      @select="handleSelect"
    >
      <template #item="{ item }">
        <slot name="item" :item="item" />
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </CorpCommandInternal>
  </ListboxRoot>

  <!-- MODO FLOATING: popover flutuante via CorpPopover -->
  <CorpPopover
    v-else-if="mode === 'floating'"
    :model-value="open"
    trigger="manual"
    side="bottom"
    align="start"
    :offset="8"
    :anchor-to="anchorTo"
    :persistent="persistent"
    :transition="transition"
    :min-width="minWidth"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :z-index="20"
    @update:model-value="emit('update:open', $event)"
  >
    <!-- Activator slot: vazio, posição controlada pelo pai via anchorTo -->
    <template #activator />

    <!-- Popover content: o command palette -->
    <ListboxRoot
      v-bind="forwarded"
      :class="commandClasses"
      :style="commandStyle"
    >
      <CorpCommandInternal
        v-bind="internalProps"
        @update:internal-query="internalQuery = $event"
        @select="handleSelect"
      >
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
        <template #footer>
          <slot name="footer" />
        </template>
      </CorpCommandInternal>
    </ListboxRoot>
  </CorpPopover>

  <!-- MODO DIALOG: modal com overlay -->
  <Dialog
    v-else-if="mode === 'dialog'"
    :open="open"
    :modal="!persistent"
    @update:open="emit('update:open', $event)"
  >
    <DialogContent
      class="overflow-hidden p-0 shadow-lg border-[hsl(var(--corp-def-command-border))]"
    >
      <ListboxRoot
        v-bind="forwarded"
        :class="commandClasses"
        :style="commandStyle"
      >
        <CorpCommandInternal
          v-bind="internalProps"
          @update:internal-query="internalQuery = $event"
          @select="handleSelect"
        >
          <template #item="{ item }">
            <slot name="item" :item="item" />
          </template>
          <template #footer>
            <slot name="footer" />
          </template>
        </CorpCommandInternal>
      </ListboxRoot>
    </DialogContent>
  </Dialog>
</template>
