<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { CorpIcon } from '@/components/ui/icon';
import { CorpPopover } from '@/components/ui/popover';

export interface IAppBarMenuItem {
  title: string;
  icon?: string;
  to?: string;
  action?: string;
  children?: IAppBarMenuItem[];
  dropdown?: IAppBarDropdownConfig;
}

export interface IAppBarDropdownConfig {
  items: IAppBarDropdownItem[];
  mode?: 'vertical' | 'horizontal';
  fullWidth?: boolean;
  alignment?: 'left' | 'center' | 'right';
  itemsAlignment?: 'left' | 'center' | 'right';
  hoverMode?: boolean;
  arrow?: boolean;
}

export interface IAppBarDropdownItem {
  title: string;
  icon?: string;
  to?: string;
  action?: () => void | Promise<void>;
  variant?: 'default' | 'danger';
  mode?: 'vertical' | 'horizontal';
  fullWidth?: boolean;
  alignment?: 'left' | 'center' | 'right';
  hoverMode?: boolean;
  children?: IAppBarDropdownItem[];
}

const props = defineProps({
  menuItems: {
    type: Array as PropType<IAppBarMenuItem[]>,
    default: () => [],
  },
  menuStyle: {
    type: String as PropType<'folder' | 'underline' | 'pill' | 'segmented'>,
    default: 'folder',
    validator: (v: string) =>
      ['folder', 'underline', 'pill', 'segmented'].includes(v),
  },
  placement: {
    type: String as PropType<'in-flow' | 'fixed' | 'absolute'>,
    default: 'in-flow',
    validator: (v: string) => ['in-flow', 'fixed', 'absolute'].includes(v),
  },
  height: {
    type: [Number, String],
    default: 64,
  },
  elevation: {
    type: Number,
    default: 0,
    validator: (v: number) => v >= 0 && v <= 24,
  },
  color: {
    type: String,
    default: 'bg-background',
  },
  flat: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    default: undefined,
  },
  userInitials: {
    type: String,
    default: undefined,
  },
  dropdownItems: {
    type: Array as PropType<IAppBarDropdownItem[]>,
    default: () => [],
  },
  currentPath: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits<{
  navigate: [payload: { path: string; item: IAppBarMenuItem }];
  'logo-click': [];
}>();

const router = useRouter();
const isProfileDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);
const menuItemsContainer = ref<HTMLElement | null>(null);
const indicatorStyle = ref({ left: '0px', width: '0px' });
const indicatorVisible = ref(false);
const openDropdowns = ref<Set<string>>(new Set());
const closeTimeouts = ref<Map<string, number>>(new Map());

// Constante de delay para fechar dropdowns (em ms)
const DROPDOWN_CLOSE_DELAY = 350;

const formatCssValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const appBarHeight = computed(() => formatCssValue(props.height));

const positionClasses = computed(() => {
  const classes: string[] = [];

  if (props.placement === 'in-flow') {
    classes.push('relative');
  } else if (props.placement === 'fixed') {
    classes.push('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  } else if (props.placement === 'absolute') {
    classes.push('absolute', 'top-0', 'left-0', 'right-0', 'z-50');
  }

  return classes;
});

const elevationClass = computed(() => {
  if (props.flat || props.elevation === 0) return '';

  const shadowMap: Record<number, string> = {
    1: 'shadow-sm',
    2: 'shadow',
    3: 'shadow-md',
    4: 'shadow-lg',
    8: 'shadow-xl',
    12: 'shadow-2xl',
  };

  const closestElevation = [1, 2, 3, 4, 8, 12].reduce((prev, curr) =>
    Math.abs(curr - props.elevation) < Math.abs(prev - props.elevation)
      ? curr
      : prev
  );

  return shadowMap[closestElevation] || 'shadow';
});

const menuStyleClass = computed(() => {
  const styleMap: Record<string, string> = {
    folder: 'menuItemFolder',
    underline: 'menuItemUnderline',
    pill: 'menuItemPill',
    segmented: 'menuItemSegmented',
  };
  return styleMap[props.menuStyle] || 'menuItemFolder';
});

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

const handleMenuItemClick = (item: IAppBarMenuItem) => {
  if (!item.to) return;
  isMobileMenuOpen.value = false;

  // Se currentPath fornecido (controlled), só emite evento
  // Se não, navega com router (uncontrolled)
  if (props.currentPath === undefined) {
    router.push(item.to);
  }

  emit('navigate', { path: item.to, item });
};

const handleLogoClick = () => {
  emit('logo-click');
};

const handleDropdownItemClick = async (item: IAppBarDropdownItem) => {
  console.log('[CorpAppBar] handleDropdownItemClick:', item);

  isProfileDropdownOpen.value = false;

  if (item.to) {
    // Se currentPath fornecido (controlled), só emite evento
    // Se não, navega com router (uncontrolled)
    if (props.currentPath === undefined) {
      router.push(item.to);
    }

    // IMPORTANTE: Emitir evento navigate para o pai atualizar
    emit('navigate', { path: item.to, item: item as IAppBarMenuItem });

    // Fechar dropdown após navegação
    openDropdowns.value.clear();
  }

  if (item.action) {
    await item.action();
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const isDropdownOpen = (itemTitle: string): boolean => {
  return openDropdowns.value.has(itemTitle);
};

const toggleDropdown = (itemTitle: string, hoverMode: boolean = false) => {
  console.log(
    '[CorpAppBar] toggleDropdown:',
    itemTitle,
    'hoverMode:',
    hoverMode,
    'isOpen:',
    isDropdownOpen(itemTitle)
  );

  if (hoverMode && isDropdownOpen(itemTitle)) {
    return; // No hover mode, se já está aberto, não fecha no click
  }

  if (isDropdownOpen(itemTitle)) {
    openDropdowns.value.delete(itemTitle);
  } else {
    openDropdowns.value.add(itemTitle);
  }

  console.log('[CorpAppBar] toggleDropdown after:', openDropdowns.value);
};

const handleDropdownMouseEnter = (
  itemTitle: string,
  hoverMode: boolean = true
) => {
  console.log('[CorpAppBar] mouseEnter:', itemTitle, 'hoverMode:', hoverMode);

  // Cancelar timeout de fechamento se existir
  const timeout = closeTimeouts.value.get(itemTitle);
  if (timeout) {
    window.clearTimeout(timeout);
    closeTimeouts.value.delete(itemTitle);
  }

  // Só abre no hover se hoverMode estiver ativo
  if (hoverMode) {
    openDropdowns.value.add(itemTitle);
    console.log('[CorpAppBar] mouseEnter opened:', openDropdowns.value);
  }
};

const handleDropdownMouseLeave = (
  itemTitle: string,
  hoverMode: boolean = true
) => {
  console.log('[CorpAppBar] mouseLeave:', itemTitle, 'hoverMode:', hoverMode);

  const timeout = window.setTimeout(() => {
    console.log('[CorpAppBar] mouseLeave timeout close:', itemTitle);
    openDropdowns.value.delete(itemTitle);
    closeTimeouts.value.delete(itemTitle);
  }, DROPDOWN_CLOSE_DELAY);

  closeTimeouts.value.set(itemTitle, timeout);
};

const isDropdownItemActive = (item: IAppBarDropdownItem): boolean => {
  if (!item.to) return false;

  // Verifica se o item atual está ativo
  if (isRouteActive(item.to)) return true;

  // Verifica se algum child está ativo
  if (item.children) {
    return item.children.some(child => isRouteActive(child.to));
  }

  return false;
};

const hasDropdown = (item: IAppBarMenuItem): boolean => {
  const result = !!item.dropdown && item.dropdown.items.length > 0;
  console.log('[CorpAppBar] hasDropdown:', item.title, result, item.dropdown);
  return result;
};

const isMenuItemActive = (item: IAppBarMenuItem): boolean => {
  // Verifica se o próprio item está ativo
  if (item.to && isRouteActive(item.to)) return true;

  // Verifica se algum item do dropdown está ativo
  if (item.dropdown) {
    return item.dropdown.items.some(dropItem => isDropdownItemActive(dropItem));
  }

  return false;
};

const updateIndicator = () => {
  if (!menuItemsContainer.value) return;
  if (props.menuStyle !== 'underline' && props.menuStyle !== 'segmented')
    return;

  const container = menuItemsContainer.value;
  const activeItem = container.querySelector('.menuItem.active') as HTMLElement;

  if (activeItem) {
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    indicatorStyle.value = {
      left: `${itemRect.left - containerRect.left}px`,
      width: `${itemRect.width}px`,
    };
    indicatorVisible.value = true;
  } else {
    indicatorVisible.value = false;
  }
};

watch(
  () => [props.menuItems, props.menuStyle, props.currentPath],
  () => {
    nextTick(() => updateIndicator());
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => updateIndicator());
  window.addEventListener('resize', updateIndicator);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator);

  // Limpar todos os timeouts pendentes
  closeTimeouts.value.forEach(timeout => {
    window.clearTimeout(timeout);
  });
  closeTimeouts.value.clear();
});
</script>

<template>
  <nav
    class="flex items-center justify-between px-6 border-b border-border transition-all duration-200"
    :class="[positionClasses, color, elevationClass]"
    :style="{
      height: appBarHeight,
      '--appbar-height': appBarHeight,
    }"
  >
    <!-- Logo Section -->
    <div class="flex items-center gap-3 flex-shrink-0">
      <button type="button" class="flex items-center" @click="handleLogoClick">
        <slot name="logo">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground"
          >
            <CorpIcon icon="luc-box" :size="20" />
          </div>
        </slot>
      </button>
    </div>

    <!-- Desktop Menu -->
    <div
      ref="menuItemsContainer"
      class="menuContainer"
      :class="[{ segmentedContainer: menuStyle === 'segmented' }]"
    >
      <!-- Sliding indicator for underline -->
      <span
        v-if="menuStyle === 'underline' && indicatorVisible"
        class="underlineIndicator"
        :style="{ left: indicatorStyle.left, width: indicatorStyle.width }"
      />

      <!-- Sliding indicator for segmented -->
      <span
        v-if="menuStyle === 'segmented' && indicatorVisible"
        class="segmentedIndicator"
        :style="{ left: indicatorStyle.left, width: indicatorStyle.width }"
      />

      <!-- Menu Items (Simple or with Dropdown) -->
      <template v-for="item in menuItems" :key="item.title">
        <!-- Item WITHOUT dropdown -->
        <button
          v-if="!hasDropdown(item)"
          type="button"
          class="menuItem"
          :class="[menuStyleClass, { active: isRouteActive(item.to) }]"
          @click="handleMenuItemClick(item)"
        >
          <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
          {{ item.title }}
        </button>

        <!-- Item WITH dropdown -->
        <div
          v-else
          class="menuItemDropdown"
          @mouseenter="
            handleDropdownMouseEnter(
              item.title,
              item.dropdown?.hoverMode ?? true
            )
          "
          @mouseleave="
            handleDropdownMouseLeave(
              item.title,
              item.dropdown?.hoverMode ?? true
            )
          "
        >
          <button
            type="button"
            class="menuItem"
            :class="[menuStyleClass, { active: isMenuItemActive(item) }]"
            @click="
              toggleDropdown(item.title, item.dropdown?.hoverMode ?? true)
            "
          >
            <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
            {{ item.title }}
            <CorpIcon
              icon="luc-chevron-down"
              :size="14"
              class="ml-1 transition-transform duration-300"
              :class="{ 'rotate-180': isDropdownOpen(item.title) }"
            />
          </button>

          <!-- Dropdown Content (Vertical ou Horizontal sem full-width) -->
          <Transition v-if="!item.dropdown?.fullWidth" name="dropdown-fade">
            <div
              v-if="isDropdownOpen(item.title)"
              class="dropdownContent"
              :class="[
                item.dropdown?.mode === 'horizontal'
                  ? 'horizontal'
                  : 'vertical',
                {
                  [`align-${item.dropdown?.alignment || 'center'}`]:
                    item.dropdown?.mode === 'horizontal',
                  [`items-${item.dropdown?.itemsAlignment || 'center'}`]: true,
                },
              ]"
              :data-arrow="item.dropdown?.arrow ? 'true' : 'false'"
              @mouseenter="
                handleDropdownMouseEnter(
                  item.title,
                  item.dropdown?.hoverMode ?? true
                )
              "
              @mouseleave="
                handleDropdownMouseLeave(
                  item.title,
                  item.dropdown?.hoverMode ?? true
                )
              "
            >
              <button
                v-for="dropItem in item.dropdown?.items"
                :key="dropItem.title"
                type="button"
                class="dropdownItem"
                :class="[
                  {
                    'text-destructive': dropItem.variant === 'danger',
                    active: isDropdownItemActive(dropItem),
                  },
                ]"
                @click="handleDropdownItemClick(dropItem)"
              >
                <CorpIcon
                  v-if="dropItem.icon"
                  :icon="dropItem.icon"
                  :size="16"
                />
                {{ dropItem.title }}
              </button>
            </div>
          </Transition>
        </div>
      </template>
    </div>

    <!-- Dropdowns Horizontal Full-Width (fora do menuContainer) -->
    <template v-for="item in menuItems">
      <Transition
        v-if="hasDropdown(item) && item.dropdown?.fullWidth"
        :key="`fullwidth-${item.title}`"
        name="dropdown-fade"
      >
        <div
          v-if="isDropdownOpen(item.title)"
          class="dropdownContent horizontal full-width"
          :class="[
            `align-${item.dropdown?.alignment || 'center'}`,
            `items-${item.dropdown?.itemsAlignment || 'center'}`,
          ]"
          @mouseenter="
            handleDropdownMouseEnter(
              item.title,
              item.dropdown?.hoverMode ?? true
            )
          "
          @mouseleave="
            handleDropdownMouseLeave(
              item.title,
              item.dropdown?.hoverMode ?? true
            )
          "
        >
          <button
            v-for="dropItem in item.dropdown?.items"
            :key="dropItem.title"
            type="button"
            class="dropdownItem"
            :class="[
              {
                'text-destructive': dropItem.variant === 'danger',
                active: isDropdownItemActive(dropItem),
              },
            ]"
            @click="handleDropdownItemClick(dropItem)"
          >
            <CorpIcon v-if="dropItem.icon" :icon="dropItem.icon" :size="16" />
            {{ dropItem.title }}
          </button>
        </div>
      </Transition>
    </template>

    <!-- Right Section -->
    <div class="flex items-center gap-4 flex-shrink-0">
      <slot name="actions" />

      <!-- Profile Section -->
      <div v-if="userName || $slots.avatar" class="hidden md:flex items-center">
        <CorpPopover
          v-if="dropdownItems.length > 0"
          v-model:open="isProfileDropdownOpen"
        >
          <template #trigger>
            <button
              type="button"
              class="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <slot name="avatar" :initials="userInitials">
                <div
                  class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
                >
                  {{ userInitials }}
                </div>
              </slot>
              <span v-if="userName" class="text-sm font-medium">
                {{ userName }}
              </span>
            </button>
          </template>

          <template #content>
            <div class="min-w-[200px] p-1">
              <button
                v-for="item in dropdownItems"
                :key="item.title"
                type="button"
                class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left"
                :class="[{ 'text-destructive': item.variant === 'danger' }]"
                @click="handleDropdownItemClick(item)"
              >
                <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
                {{ item.title }}
              </button>
            </div>
          </template>
        </CorpPopover>

        <div v-else class="flex items-center gap-2 p-2">
          <slot name="avatar" :initials="userInitials">
            <div
              class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
            >
              {{ userInitials }}
            </div>
          </slot>
          <span v-if="userName" class="text-sm font-medium">
            {{ userName }}
          </span>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="md:hidden p-2 hover:bg-accent rounded-md"
        @click="toggleMobileMenu"
      >
        <CorpIcon :icon="isMobileMenuOpen ? 'luc-x' : 'luc-menu'" :size="20" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg max-h-96 overflow-y-auto"
    >
      <div class="p-4 space-y-2">
        <button
          v-for="item in menuItems"
          :key="item.title"
          type="button"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left"
          :class="[{ 'bg-accent': isRouteActive(item.to) }]"
          @click="handleMenuItemClick(item)"
        >
          <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
          {{ item.title }}
        </button>

        <div
          v-if="dropdownItems.length > 0"
          class="pt-2 mt-2 border-t border-border"
        >
          <button
            v-for="item in dropdownItems"
            :key="item.title"
            type="button"
            class="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left"
            :class="[{ 'text-destructive': item.variant === 'danger' }]"
            @click="handleDropdownItemClick(item)"
          >
            <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
            {{ item.title }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.menuContainer {
  display: none;
  align-items: flex-end;
  gap: 0.25rem;
  position: relative;
  height: 100%;
}

@media (min-width: 768px) {
  .menuContainer {
    display: flex;
  }
}

/* Container segmented com fundo cinza */
.menuContainer.segmentedContainer {
  background-color: hsl(var(--muted) / 0.3);
  border-radius: 0.5rem;
  padding: 0.25rem;
  align-items: center;
  height: auto;
}

.underlineIndicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: hsl(var(--primary));
  transition:
    left 300ms ease-out,
    width 300ms ease-out;
  pointer-events: none;
  z-index: 2;
}

.segmentedIndicator {
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  background-color: hsl(var(--background));
  border-radius: 0.375rem;
  transition:
    left 300ms ease-out,
    width 300ms ease-out;
  pointer-events: none;
  z-index: 1;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.menuItem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 200ms;
  position: relative;
}

/* Folder style */
.menuItemFolder {
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition:
    background-color 200ms,
    border-bottom-color 200ms,
    box-shadow 200ms,
    transform 200ms;
}

.menuItemFolder:hover {
  background-color: hsl(var(--accent) / 0.5);
}

.menuItemFolder.active {
  background-color: hsl(var(--muted));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-bottom-color: hsl(var(--muted));
  position: relative;
  z-index: 1;
}

/* Underline style */
.menuItemUnderline {
  background-color: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  position: relative;
}

.menuItemUnderline:hover {
  color: hsl(var(--foreground));
  border-bottom-color: hsl(var(--primary) / 0.3);
  z-index: 2;
}

.menuItemUnderline.active {
  color: hsl(var(--primary));
  font-weight: 600;
}

/* Pill style */
.menuItemPill {
  border-radius: 9999px;
  background-color: transparent;
  align-self: center;
}

.menuItemPill:hover {
  background-color: hsl(var(--accent));
}

.menuItemPill.active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* Segmented style */
.menuItemSegmented {
  border-radius: 0.375rem;
  background-color: transparent;
  position: relative;
  z-index: 2;
  align-self: center;
}

.menuItemSegmented:hover {
  color: hsl(var(--foreground));
}

.menuItemSegmented.active {
  color: hsl(var(--foreground));
  font-weight: 600;
}

/* ============== DROPDOWN STYLES ============== */

.menuItemDropdown {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
}

/* Mantém centralizado para pill/segmented */
.menuItemDropdown .menuItemPill,
.menuItemDropdown .menuItemSegmented {
  align-self: center !important;
}

.dropdownContent {
  position: absolute;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Modo Vertical (dropdown tradicional) */
.dropdownContent.vertical {
  top: 100%;
  left: 0;
  min-width: 200px;
  border-radius: 0.375rem;
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
}

/* Arrow (setinha) para dropdown vertical */
.dropdownContent.vertical[data-arrow='true']::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid hsl(var(--border));
  z-index: 1;
}

.dropdownContent.vertical[data-arrow='true']::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 21px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid hsl(var(--background));
  z-index: 2;
}

.dropdownContent.vertical .dropdownItem {
  padding: 0.5rem 1rem;
  text-align: left;
  border-bottom: 1px solid hsl(var(--border) / 0.5);
}

.dropdownContent.vertical .dropdownItem:last-child {
  border-bottom: none;
}

/* Modo Horizontal (linha abaixo do header) */
.dropdownContent.horizontal {
  top: calc(100% + 1px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  min-width: max-content;
  border-radius: 0.375rem;
}

/* Ponte invisível para dropdown horizontal (não full-width) */
.dropdownContent.horizontal:not(.full-width)::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: transparent;
}

.dropdownContent.horizontal.full-width {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  transform: none;
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
}

.dropdownContent.horizontal .dropdownItem {
  padding: 0.75rem 1.5rem;
  text-align: center;
  border-right: 1px solid hsl(var(--border) / 0.5);
  white-space: nowrap;
}

.dropdownContent.horizontal .dropdownItem:last-child {
  border-right: none;
}

/* Alinhamentos do container (posição dos items no espaço disponível) */
.dropdownContent.horizontal.full-width.align-left {
  justify-content: flex-start;
  padding-left: 2rem;
}

.dropdownContent.horizontal.full-width.align-center {
  justify-content: center;
}

.dropdownContent.horizontal.full-width.align-right {
  justify-content: flex-end;
  padding-right: 2rem;
}

/* Alinhamento interno dos items (texto + ícone dentro do botão) */
.dropdownContent.items-left .dropdownItem {
  justify-content: flex-start;
  text-align: left;
}

.dropdownContent.items-center .dropdownItem {
  justify-content: center;
  text-align: center;
}

.dropdownContent.items-right .dropdownItem {
  justify-content: flex-end;
  text-align: right;
}

/* Dropdown Item Styles */
.dropdownItem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  transition:
    background-color 200ms,
    color 200ms;
  width: 100%;
}

.dropdownItem:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--foreground));
}

.dropdownItem.active {
  background-color: hsl(var(--accent));
  color: hsl(var(--primary));
  font-weight: 600;
}

/* Animação dropdown-fade (só opacity, sem transform para evitar perda de hover) */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 300ms ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .dropdownContent.horizontal {
    flex-direction: column;
    position: static;
    transform: none;
    border-radius: 0;
    margin-top: 0;
    border-left: none;
    border-right: none;
  }

  .dropdownContent.horizontal .dropdownItem {
    border-right: none;
    border-bottom: 1px solid hsl(var(--border) / 0.5);
    text-align: left;
    padding-left: 2rem;
  }

  .dropdownContent.horizontal .dropdownItem:last-child {
    border-bottom: none;
  }
}
</style>
