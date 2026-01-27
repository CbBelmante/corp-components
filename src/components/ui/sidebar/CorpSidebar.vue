<script setup lang="ts">
/**
 * 🧩 CorpSidebarNative - Sidebar NATIVO sem dependências shadcn internas
 *
 * API IDÊNTICA ao CorpSidebar original
 */

import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { CorpIcon } from '@/components/ui/icon';
import { getColorType, resolveColor } from '@/utils/CorpColorUtils';
import { SIDEBAR_WIDTH_ICON } from './constants';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { IMenuItem } from '@/components/ui/types/menu';
import { corpSidebarVariants } from '.';

// ============== TYPES ==============

export type { IMenuItem };

// ============== PROPS ==============

const props = defineProps({
  headerHeight: {
    type: [Number, String],
    default: 65,
  },
  headerHeightCollapsed: {
    type: [Number, String],
    default: 49,
  },
  width: {
    type: [Number, String],
    default: 280,
  },
  rail: {
    type: Boolean,
    default: false,
  },
  railWidth: {
    type: [Number, String],
    default: SIDEBAR_WIDTH_ICON,
  },
  items: {
    type: Array as PropType<IMenuItem[]>,
    required: true,
  },
  appName: {
    type: String,
    default: undefined,
  },
  appSubtitle: {
    type: String,
    default: 'Prontuário Eletrônico',
  },
  userName: {
    type: String,
    default: 'Dr. Fábio',
  },
  opacity: {
    type: Number,
    default: 1,
    validator: (v: number) => v >= 0 && v <= 1,
  },
  blur: {
    type: Number,
    default: 0,
  },

  // Custom color overrides
  bgColor: {
    type: String,
    default: undefined,
  },
  textColor: {
    type: String,
    default: undefined,
  },

  headerBackground: {
    type: String,
    default: undefined,
  },
  footerBackground: {
    type: String,
    default: undefined,
  },
  placement: {
    type: String as PropType<'in-flow' | 'fixed' | 'absolute'>,
    default: 'in-flow',
    validator: (v: string) => ['in-flow', 'fixed', 'absolute'].includes(v),
  },
  location: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
    validator: (v: string) => ['left', 'right'].includes(v),
  },
  currentPath: {
    type: String,
    default: undefined,
  },
  expandOnBorderClick: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  offsetTop: {
    type: [Number, String],
    default: 0,
  },
});

// ============== EMITS ==============

const emit = defineEmits<{
  navigate: [payload: { path: string; item: IMenuItem }];
}>();

// ============== STATE ==============

const isCollapsed = ref(false);

// ============== COMPUTED ==============

const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const headerHeightPx = computed(() => {
  const height = isCollapsed.value
    ? props.headerHeightCollapsed
    : props.headerHeight;
  return formatCssValue(height);
});

// Custom color styles
const customColorStyle = computed(() => {
  const styles: Record<string, string> = {};

  // bgColor sobrescreve background
  if (props.bgColor) {
    styles.backgroundColor = resolveColor(props.bgColor);
  }

  // textColor sobrescreve cor do texto
  if (props.textColor) {
    styles.color = resolveColor(props.textColor);
  }

  // Opacity (aplicado via CSS)
  if (props.opacity < 1) {
    styles.opacity = String(props.opacity);
  }

  // Blur (aplicado via backdrop-filter)
  if (props.blur > 0) {
    styles.backdropFilter = `blur(${props.blur}px)`;
  }

  return styles;
});

const headerClasses = computed(() => {
  const classes: string[] = [];
  if (props.headerBackground) {
    classes.push(
      props.opacity < 1
        ? `${props.headerBackground}/${Math.round(props.opacity * 100)}`
        : props.headerBackground
    );
  }
  if (props.blur > 0) {
    classes.push(`backdrop-blur-[${props.blur}px]`);
  }
  return classes;
});

const footerClasses = computed(() => {
  const classes: string[] = [];
  if (props.footerBackground) {
    classes.push(
      props.opacity < 1
        ? `${props.footerBackground}/${Math.round(props.opacity * 100)}`
        : props.footerBackground
    );
  }
  if (props.blur > 0) {
    classes.push(`backdrop-blur-[${props.blur}px]`);
  }
  return classes;
});

const sidebarWidth = computed(() =>
  isCollapsed.value
    ? formatCssValue(props.railWidth)
    : formatCssValue(props.width)
);

const positionClasses = computed(() => {
  const classes: string[] = [];

  if (props.placement === 'in-flow') {
    classes.push('relative');
  } else if (props.placement === 'fixed') {
    classes.push('fixed');
    // Se tem offsetTop, não usa inset-y-0 (será aplicado via style)
    if (!props.offsetTop) {
      classes.push('inset-y-0');
    } else {
      classes.push('bottom-0');
    }
    classes.push(props.location === 'left' ? 'left-0' : 'right-0');
  } else if (props.placement === 'absolute') {
    classes.push('absolute');
    // Se tem offsetTop, não usa inset-y-0 (será aplicado via style)
    if (!props.offsetTop) {
      classes.push('inset-y-0');
    } else {
      classes.push('bottom-0');
    }
    classes.push(props.location === 'left' ? 'left-0' : 'right-0');
  }

  return classes;
});

const sidebarStyle = computed(() => {
  const styles: Record<string, string> = {
    width: sidebarWidth.value,
  };

  // Aplica offsetTop quando placement é fixed/absolute
  if (
    (props.placement === 'fixed' || props.placement === 'absolute') &&
    props.offsetTop
  ) {
    styles.top = formatCssValue(props.offsetTop);
  }

  return styles;
});

const toggleIcon = computed(() => {
  if (props.location === 'left') {
    return isCollapsed.value ? 'luc-chevron-right' : 'luc-chevron-left';
  } else {
    return isCollapsed.value ? 'luc-chevron-left' : 'luc-chevron-right';
  }
});

// ============== ROUTER ==============
const router = useRouter();

const menuItems = computed(() => props.items);

// ============== METHODS ==============

const getItemChildren = (item: IMenuItem) => {
  return item.children ?? item.items ?? [];
};

const hasChildren = (item: IMenuItem) => {
  const children = getItemChildren(item);
  return children && children.length > 0;
};

const getIconColorProps = (iconColor?: string) => {
  if (!iconColor) {
    return { class: '', style: {} };
  }

  if (
    iconColor.startsWith('text-') ||
    iconColor.startsWith('bg-') ||
    iconColor.startsWith('border-')
  ) {
    return { class: iconColor, style: {} };
  }

  const colorType = getColorType(iconColor);

  if (['variable', 'hex', 'rgb', 'rgba'].includes(colorType)) {
    return { class: '', style: { color: iconColor } };
  }

  if (colorType === 'named') {
    return { class: '', style: { color: iconColor } };
  }

  return { class: '', style: {} };
};

const isRouteActive = (path?: string): boolean => {
  if (!path) return false;

  // Se currentPath fornecido, usa ele (controlled component)
  if (props.currentPath !== undefined) {
    return props.currentPath === path;
  }

  // Senão, usa router (uncontrolled component)
  try {
    return router.currentRoute.value.path === path;
  } catch {
    return false;
  }
};

const handleMenuAction = (item: IMenuItem) => {
  if (!item.to) {
    if (item.action) {
      console.log('[CorpSidebar] Action triggered:', item.action);
    }
    return;
  }

  // Se currentPath fornecido (controlled), só emite evento
  // Se não, navega com router (uncontrolled)
  if (props.currentPath === undefined) {
    router.push(item.to);
  }

  emit('navigate', { path: item.to, item });
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <div
    :class="[corpSidebarVariants(), positionClasses]"
    :style="{ ...sidebarStyle, ...customColorStyle }"
  >
    <!-- Header -->
    <div
      v-if="showHeader"
      class="flex items-center gap-3 px-3 border-b border-sidebar-border flex-shrink-0"
      :class="headerClasses"
      :style="{ height: headerHeightPx }"
    >
      <!-- Toggle button ESQUERDA (só quando location=right expandido) -->
      <button
        v-if="location === 'right' && !isCollapsed"
        @click="toggleSidebar"
        class="p-2 hover:bg-sidebar-accent rounded-md flex-shrink-0 order-first"
      >
        <CorpIcon :icon="toggleIcon" :size="16" />
      </button>

      <slot name="logo" :is-collapsed="isCollapsed">
        <div
          class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <CorpIcon icon="luc-box" :size="16" />
        </div>
      </slot>

      <div
        v-if="!isCollapsed"
        class="grid flex-1 text-left text-sm leading-tight"
      >
        <span class="truncate font-semibold">{{ appName }}</span>
        <span class="truncate text-xs text-sidebar-foreground/70">
          {{ appSubtitle }}
        </span>
      </div>

      <!-- Toggle button DIREITA (location=left sempre, OU collapsed sempre) -->
      <button
        v-if="location === 'left' || (location === 'right' && isCollapsed)"
        @click="toggleSidebar"
        class="p-2 hover:bg-sidebar-accent rounded-md flex-shrink-0"
        :class="{ 'ml-auto': location === 'left' && !isCollapsed }"
      >
        <CorpIcon :icon="toggleIcon" :size="16" />
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto min-h-0">
      <slot name="prepend" />

      <!-- Menu Groups -->
      <div
        v-for="group in menuItems"
        :key="group.label"
        :class="isCollapsed ? 'p-1' : 'p-2'"
      >
        <div
          v-if="!isCollapsed"
          class="px-2 py-1.5 text-xs font-semibold text-sidebar-foreground/70"
        >
          {{ group.label }}
        </div>

        <div class="space-y-1">
          <div v-for="item in group.items" :key="item.label">
            <!-- Item SEM children -->
            <button
              v-if="!hasChildren(item)"
              @click="handleMenuAction(item)"
              class="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent transition-colors"
              :class="{
                'justify-center': isCollapsed,
                'bg-sidebar-accent': isRouteActive(item.to),
              }"
            >
              <CorpIcon
                v-if="item.icon"
                :icon="item.icon"
                :size="16"
                :class="getIconColorProps(item.iconColor).class"
                :style="getIconColorProps(item.iconColor).style"
              />
              <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
            </button>

            <!-- Item COM children -->
            <Collapsible
              v-else
              v-slot="{ open }"
              :default-open="item.defaultOpen !== false"
            >
              <CollapsibleTrigger as-child>
                <button
                  class="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent transition-colors"
                  :class="{ 'justify-center': isCollapsed }"
                >
                  <CorpIcon
                    v-if="item.icon"
                    :icon="item.icon"
                    :size="16"
                    :class="getIconColorProps(item.iconColor).class"
                    :style="getIconColorProps(item.iconColor).style"
                  />
                  <span v-if="!isCollapsed" class="truncate flex-1">
                    {{ item.label }}
                  </span>
                  <CorpIcon
                    v-if="!isCollapsed"
                    icon="luc-chevron-down"
                    :size="16"
                    class="ml-auto transition-transform duration-200"
                    :class="{ 'rotate-180': open }"
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent
                v-if="!isCollapsed"
                class="ml-4 mt-1 space-y-1"
              >
                <button
                  v-for="child in getItemChildren(item)"
                  :key="child.label"
                  @click="handleMenuAction(child)"
                  class="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent transition-colors"
                  :class="{ 'bg-sidebar-accent': isRouteActive(child.to) }"
                >
                  <CorpIcon
                    v-if="child.icon"
                    :icon="child.icon"
                    :size="16"
                    :class="getIconColorProps(child.iconColor).class"
                    :style="getIconColorProps(child.iconColor).style"
                  />
                  <span class="truncate">{{ child.label }}</span>
                </button>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="border-t border-sidebar-border p-2 flex-shrink-0"
      :class="footerClasses"
    >
      <slot name="footer" :is-collapsed="isCollapsed">
        <button
          class="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent transition-colors"
          :class="{ 'justify-center': isCollapsed }"
        >
          <CorpIcon icon="luc-user" :size="16" />
          <span v-if="!isCollapsed">{{ userName }}</span>
        </button>
      </slot>
    </div>

    <!-- Borda clicável para expandir/colapsar -->
    <div
      v-if="expandOnBorderClick"
      @click="toggleSidebar"
      class="absolute top-0 right-0 h-full w-[2px] cursor-ew-resize bg-border hover:bg-primary/20 transition-colors group z-10"
      title="Clique para expandir/colapsar"
    >
      <div
        class="absolute top-1/2 -translate-y-1/2 -right-[1px] w-[3px] h-10 bg-primary/60 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
    <!-- Borda normal (quando expandOnBorderClick=false) -->
    <div v-else class="absolute top-0 right-0 h-full w-[2px] bg-border" />
  </div>
</template>
