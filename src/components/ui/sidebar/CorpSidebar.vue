<script setup lang="ts">
/**
 * 🧩 CorpSidebar - Navegação Lateral Corp Components
 *
 * Sidebar responsiva e collapsible com header próprio e menu Shadcn.
 * Código funcional e escalável.
 *
 * 🔗 DEPENDÊNCIAS EXTERNAS:
 * - Vue 3 (ref, computed)
 * - Vue Router (useRouter)
 *
 * 🔗 DEPENDÊNCIAS INTERNAS:
 * - Shadcn Sidebar components (menu, collapsible)
 * - CorpIcon
 * - Collapsible (shadcn)
 *
 * @example
 * ```vue
 * <CorpSidebar :items="menuItems" />
 * <CorpSidebar :items="menuItems" :opacity="0.9" :blur="8" />
 * <CorpSidebar :items="menuItems" background="bg-card" />
 * ```
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import type { PropType } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
  useSidebar,
} from './';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { CorpIcon } from '@/components/ui/icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getColorType } from '@/utils/CorpColorUtils';
import { SIDEBAR_WIDTH_ICON } from './constants';

// ============== PROPS ==============

const props = defineProps({
  /**
   * Altura do header quando sidebar expandida (default: 65px)
   */
  headerHeight: {
    type: [Number, String],
    default: 65,
  },

  /**
   * Altura do header quando sidebar colapsada (default: 49px)
   */
  headerHeightCollapsed: {
    type: [Number, String],
    default: 49,
  },

  /**
   * Largura quando expandido (default: 280px)
   */
  width: {
    type: [Number, String],
    default: 280,
  },

  /**
   * Modo rail (colapsado com ícones)
   */
  rail: {
    type: Boolean,
    default: false,
  },

  /**
   * Largura no modo rail (default: 3.5rem = 56px)
   */
  railWidth: {
    type: [Number, String],
    default: SIDEBAR_WIDTH_ICON,
  },

  /**
   * Sempre visível (desktop)
   */
  permanent: {
    type: Boolean,
    default: true,
  },

  /**
   * Modo overlay (mobile)
   */
  temporary: {
    type: Boolean,
    default: false,
  },

  /**
   * Expande ao passar mouse (funciona com rail)
   */
  expandOnHover: {
    type: Boolean,
    default: false,
  },

  /**
   * Menu items externos (estrutura Vuetify-like)
   * OBRIGATÓRIO - componente genérico sem fallback
   */
  items: {
    type: Array as PropType<IMenuItem[]>,
    required: true,
  },

  /**
   * Nome da aplicação (header)
   */
  appName: {
    type: String,
    default: undefined,
  },

  /**
   * Subtítulo da aplicação (header)
   */
  appSubtitle: {
    type: String,
    default: 'Prontuário Eletrônico',
  },

  /**
   * Nome do usuário logado (footer)
   */
  userName: {
    type: String,
    default: 'Dr. Fábio',
  },

  // ========== VISUAL EFFECTS ==========

  /**
   * Opacidade do background (0-1, default: 1 = totalmente opaco)
   */
  opacity: {
    type: Number,
    default: 1,
    validator: (v: number) => v >= 0 && v <= 1,
  },

  /**
   * Blur do backdrop em pixels (0 = sem blur, default: 0)
   */
  blur: {
    type: Number,
    default: 0,
  },

  /** Classe de background (default: bg-sidebar) */
  background: {
    type: String,
    default: 'bg-sidebar',
  },

  /**
   * Modo contained (absolute ao invés de fixed)
   * Use quando sidebar estiver dentro de container limitado
   */
  contained: {
    type: Boolean,
    default: false,
  },
});

// ============== UTILS ==============

/**
 * Formata valor CSS (adiciona 'px' se for número)
 */
const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

// ============== TYPES ==============

/**
 * Interface de item de menu (Vuetify-like)
 * Suporta submenus via `items` ou `children` (aliases)
 */
export interface IMenuItem {
  title: string;
  icon?: string;
  iconColor?: string; // 🎨 NEW: Tailwind class, CSS var, hex, rgb, rgba
  to?: string;
  routeName?: string;
  action?: string;
  tooltip?: string;
  items?: IMenuItem[]; // Suporte a submenus
  children?: IMenuItem[]; // Alias para items
  defaultOpen?: boolean; // Controle de expansão (true = aberto por padrão)
}

// ============== COMPOSABLES ==============

/**
 * 🎯 Estado do sidebar para altura dinâmica
 *
 * Escuta quando sidebar colapsa/expande para ajustar altura do header.
 */
const { state: sidebarState } = useSidebar();

// ============== COMPUTED ==============

/**
 * 🎯 Altura do header em pixels (dinâmica)
 *
 * Muda automaticamente entre altura expandida e colapsada
 * baseado no estado do sidebar.
 *
 * @returns {string} Altura em pixels (ex: "65px" ou "49px")
 */
const headerHeightPx = computed(() => {
  // Escolher altura baseada no estado do sidebar
  const height =
    sidebarState.value === 'collapsed'
      ? props.headerHeightCollapsed
      : props.headerHeight;

  if (typeof height === 'number') {
    return `${height}px`;
  }
  return height;
});

/**
 * 🎯 Classes de background (opacity + blur)
 */
const bgClasses = computed(() => [
  props.opacity < 1
    ? `${props.background}/${Math.round(props.opacity * 100)}`
    : props.background,
  props.blur > 0 ? `backdrop-blur-[${props.blur}px]` : '',
]);

// ============== ROUTER ==============
const router = useRouter();

// ============== MENU DATA ==============
/**
 * 🎯 Menu items (obrigatório via props)
 */
const menuItems = computed(() => props.items);

// ============== METHODS ==============

/**
 * 🎯 Normaliza items/children (aliases)
 */
const getItemChildren = (item: IMenuItem) => {
  return item.children ?? item.items ?? [];
};

/**
 * 🎯 Verifica se item tem filhos
 */
const hasChildren = (item: IMenuItem) => {
  const children = getItemChildren(item);
  return children && children.length > 0;
};

/**
 * 🎨 Aplica cor ao ícone detectando formato automaticamente
 *
 * Suporta Tailwind classes, CSS variables, hex, rgb, rgba.
 * Usa CbColorUtils para detecção inteligente.
 *
 * @param {string} iconColor - Cor do ícone (opcional)
 * @returns {{ class: string, style: object }} Props de cor para aplicar
 */
const getIconColorProps = (iconColor?: string) => {
  if (!iconColor) {
    return { class: '', style: {} };
  }

  // Se é classe Tailwind (começa com text-, bg-, border-, etc)
  if (
    iconColor.startsWith('text-') ||
    iconColor.startsWith('bg-') ||
    iconColor.startsWith('border-')
  ) {
    return { class: iconColor, style: {} };
  }

  // Detectar tipo usando CbColorUtils
  const colorType = getColorType(iconColor);

  // Se é CSS variable, hex, rgb, rgba → usar style inline
  if (['variable', 'hex', 'rgb', 'rgba'].includes(colorType)) {
    return { class: '', style: { color: iconColor } };
  }

  // Fallback para named colors (blue, red, etc)
  if (colorType === 'named') {
    return { class: '', style: { color: iconColor } };
  }

  return { class: '', style: {} };
};

/**
 * 🎯 Gerencia ações dos itens do menu (genérico)
 * Suporta navegação via `to` ou ação via `action`
 */
const handleMenuAction = (item: IMenuItem) => {
  // Navegação automática via `to`
  if (item.to) {
    router.push(item.to);
    return;
  }

  // Ação customizada via `action` - componente pai deve tratar via emit
  if (item.action) {
    console.log('[CorpSidebar] Action triggered:', item.action);
  }
};
</script>

<template>
  <Sidebar
    variant="sidebar"
    collapsible="icon"
    :contained="contained"
    :class="bgClasses"
    :style="{ '--sidebar-width-icon': formatCssValue(railWidth) }"
  >
    <!-- Header da Sidebar -->
    <div
      class="flex items-center gap-3 px-3 border-b border-sidebar-border"
      :class="bgClasses"
      :style="{ height: headerHeightPx }"
    >
      <!-- Logo slot (customizável) -->
      <slot name="logo">
        <div
          class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <CorpIcon icon="luc-box" :size="16" />
        </div>
      </slot>

      <!-- App name e subtitle -->
      <div
        class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden"
      >
        <span class="truncate font-semibold">{{ appName }}</span>
        <span class="truncate text-xs text-sidebar-foreground/70">
          {{ appSubtitle }}
        </span>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <SidebarContent :class="bgClasses">
      <!-- Slot para conteúdo customizado (ex: seletor de pacientes) -->
      <slot name="prepend" />

      <!-- Menu Groups -->
      <SidebarGroup v-for="group in menuItems" :key="group.title">
        <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <template v-for="item in group.items">
              <!-- Item SEM children: botão simples -->
              <SidebarMenuItem v-if="!hasChildren(item)" :key="item.title">
                <SidebarMenuButton @click="handleMenuAction(item)">
                  <CorpIcon
                    v-if="item.icon"
                    :icon="item.icon"
                    :class="getIconColorProps(item.iconColor).class"
                    :style="getIconColorProps(item.iconColor).style"
                  />
                  <span>{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <!-- Item COM children: collapsible -->
              <Collapsible
                v-else
                v-slot="{ open }"
                :key="item.title"
                :default-open="item.defaultOpen !== false"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton>
                      <CorpIcon
                        v-if="item.icon"
                        :icon="item.icon"
                        :class="getIconColorProps(item.iconColor).class"
                        :style="getIconColorProps(item.iconColor).style"
                      />
                      <span>{{ item.title }}</span>
                      <CorpIcon
                        icon="luc-chevron-down"
                        class="ml-auto transition-transform duration-200"
                        :class="{ 'rotate-180': open }"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent class="collapsibleContent">
                    <SidebarMenuSub>
                      <SidebarMenuSubItem
                        v-for="child in getItemChildren(item)"
                        :key="child.title"
                      >
                        <SidebarMenuSubButton @click="handleMenuAction(child)">
                          <CorpIcon
                            v-if="child.icon"
                            :icon="child.icon"
                            :class="getIconColorProps(child.iconColor).class"
                            :style="getIconColorProps(child.iconColor).style"
                          />
                          <span>{{ child.title }}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <!-- Footer da Sidebar -->
    <SidebarFooter class="border-t border-sidebar-border" :class="bgClasses">
      <slot name="footer">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <CorpIcon icon="luc-user" />
              <span>{{ userName }}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </slot>
    </SidebarFooter>

    <!-- Rail para toggle lateral -->
    <SidebarRail />
  </Sidebar>
</template>

<style>
/* 🔧 FORÇAR transparência no div interno do shadcn */
[data-sidebar='sidebar'] {
  background: transparent !important;
}

/* Submenu styles */
[data-sidebar='menu-sub-button'] {
  cursor: pointer !important;
  color: var(--sidebar-menu-sub-foreground) !important;
}

[data-sidebar='menu-sub-button']:hover {
  color: var(--sidebar-menu-sub-hover-foreground) !important;
}

/* 🎨 Animação suave para Collapsible (técnica CbPopover com @keyframes) */
.collapsibleContent {
  overflow: hidden;
}

/* Estado fechado: aplicar animação de saída */
.collapsibleContent[data-state='closed'] {
  animation: collapsibleExit 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

/* Estado aberto: aplicar animação de entrada */
.collapsibleContent[data-state='open'] {
  animation: collapsibleEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

/* Keyframe de entrada (expandir + fade-in) */
@keyframes collapsibleEnter {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px; /* Altura máxima para 10+ subitens */
    opacity: 1;
  }
}

/* Keyframe de saída (colapsar + fade-out) */
@keyframes collapsibleExit {
  from {
    max-height: 500px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
}
</style>
