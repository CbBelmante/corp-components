<script setup lang="ts">
/**
 * 🧩 CorpBreadcrumb - Breadcrumb navigation Vuetify-inspired
 *
 * Aceita array de items e renderiza automaticamente.
 * Dividers customizáveis (texto ou ícone lucide).
 *
 * 🔗 DEPENDÊNCIAS:
 * - shadcn-vue Breadcrumb components
 * - CorpIcon (para dividers com ícone)
 */

// ============== DEPENDÊNCIAS INTERNAS ==============
import type { HTMLAttributes } from 'vue';
import { computed, type PropType } from 'vue';
import { cn } from '@/lib/utils';
import BreadcrumbList from './BreadcrumbList.vue';
import BreadcrumbItem from './BreadcrumbItem.vue';
import BreadcrumbLink from './BreadcrumbLink.vue';
import BreadcrumbPage from './BreadcrumbPage.vue';
import BreadcrumbSeparator from './BreadcrumbSeparator.vue';
import CorpIcon from '@/components/ui/icon/CorpIcon.vue';
import { resolveColor } from '@/utils/CorpColorUtils';
import {
  breadcrumbVariants,
  type BreadcrumbDensity,
  type IBreadcrumbItem,
} from '.';

// ============== PROPS ==============

const props = defineProps({
  // Items (array de strings ou objetos)
  items: {
    type: Array as PropType<(string | IBreadcrumbItem)[]>,
    default: () => [],
  },

  // Divider (string ou nome ícone lucide)
  divider: {
    type: String,
    default: '/',
  },

  // ActiveColor (cor do item ativo/último)
  activeColor: {
    type: String,
    default: undefined,
  },

  // Density (espaçamento horizontal entre items)
  density: {
    type: String as PropType<BreadcrumbDensity>,
    default: 'regular',
  },

  // Disabled (desabilita todos os itens)
  disabled: {
    type: Boolean,
    default: false,
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
});

// ============== COMPUTED PROPERTIES ==============

// Normaliza items para sempre ser array de objetos
const normalizedItems = computed<IBreadcrumbItem[]>(() => {
  return props.items.map(item => {
    if (typeof item === 'string') {
      return { title: item };
    }
    return item;
  });
});

// Verifica se divider é ícone (não é caractere único ou operador)
const isDividerIcon = computed(() => {
  const div = props.divider.trim();
  // Se tem mais de 1 caractere e não é um operador simples, é ícone
  // Permite hífens (chevron-right, arrow-right, etc) mas bloqueia operadores
  return (
    div.length > 1 && !['/', '\\', '..', '...', '->', '<-', '=>'].includes(div)
  );
});

// Style inline - activeColor
const activeColorStyle = computed(() => {
  if (!props.activeColor) return {};

  const resolved = resolveColor(props.activeColor);
  return {
    '--corp-runtime-breadcrumb-active': resolved,
  };
});

// Classes da lista (com density para espaçamento horizontal)
const listClasses = computed(() => {
  return cn(
    breadcrumbVariants({
      density: props.density,
    })
  );
});

// Verifica se é último item
const isLastItem = (index: number) =>
  index === normalizedItems.value.length - 1;

// Verifica se deve usar slot (quando não tem items prop)
const useSlot = computed(() => props.items.length === 0);
</script>

<template>
  <nav aria-label="breadcrumb" :class="props.class" :style="activeColorStyle">
    <!-- Slot mode (compatibilidade shadcn) -->
    <slot v-if="useSlot" />

    <!-- Items mode (Vuetify-inspired) -->
    <BreadcrumbList v-else :class="listClasses">
      <!-- Slot prepend -->
      <slot name="prepend" />

      <template v-for="(item, index) in normalizedItems" :key="index">
        <BreadcrumbItem>
          <!-- Último item (página atual) -->
          <BreadcrumbPage
            v-if="isLastItem(index)"
            :class="{
              'text-[var(--corp-runtime-breadcrumb-active)]': activeColor,
              'pointer-events-none opacity-50': disabled || item.disabled,
            }"
          >
            <slot name="item" :item="item" :index="index">
              <CorpIcon
                v-if="item.icon"
                :icon="item.icon"
                :size="14"
                class="mr-1"
              />
              {{ item.title }}
            </slot>
          </BreadcrumbPage>

          <!-- Itens intermediários (com link) -->
          <BreadcrumbLink
            v-else
            :as-child="!!(item.to || item.href)"
            :class="{
              'pointer-events-none opacity-50': disabled || item.disabled,
            }"
          >
            <!-- Link Vue Router (to) -->
            <router-link v-if="item.to" :to="item.to">
              <slot name="item" :item="item" :index="index">
                <CorpIcon
                  v-if="item.icon"
                  :icon="item.icon"
                  :size="14"
                  class="mr-1"
                />
                {{ item.title }}
              </slot>
            </router-link>

            <!-- Link HTML (href) -->
            <a v-else-if="item.href" :href="item.href">
              <slot name="item" :item="item" :index="index">
                <CorpIcon
                  v-if="item.icon"
                  :icon="item.icon"
                  :size="14"
                  class="mr-1"
                />
                {{ item.title }}
              </slot>
            </a>

            <!-- Sem link -->
            <template v-else>
              <slot name="item" :item="item" :index="index">
                <CorpIcon
                  v-if="item.icon"
                  :icon="item.icon"
                  :size="14"
                  class="mr-1"
                />
                {{ item.title }}
              </slot>
            </template>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <!-- Separator (não após último) -->
        <BreadcrumbSeparator v-if="!isLastItem(index)">
          <slot name="divider" :item="item" :index="index">
            <!-- Divider com ícone -->
            <CorpIcon v-if="isDividerIcon" :icon="divider" :size="14" />
            <!-- Divider texto -->
            <span v-else>{{ divider }}</span>
          </slot>
        </BreadcrumbSeparator>
      </template>

      <!-- Slot append -->
      <slot name="append" />
    </BreadcrumbList>
  </nav>
</template>
