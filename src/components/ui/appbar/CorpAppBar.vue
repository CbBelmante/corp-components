<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { CorpIcon } from '@/components/ui/icon';
import { CorpPopover } from '@/components/ui/popover';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type {
  IMenuItem,
  IAppBarMenuItem,
  IAppBarDropdownConfig,
} from '@/components/ui/types/menu';
import { appBarVariants } from '.';
import { resolveColor } from '@/utils/CorpColorUtils';

// Re-export types
export type { IMenuItem, IAppBarMenuItem, IAppBarDropdownConfig };

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
  flat: {
    type: Boolean,
    default: false,
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
  userName: {
    type: String,
    default: undefined,
  },
  userInitials: {
    type: String,
    default: undefined,
  },
  currentPath: {
    type: String,
    default: undefined,
  },
  // Mobile Menu Configuration
  mobileMode: {
    type: String as PropType<
      'popover' | 'drawer-full' | 'drawer-half' | 'drawer-min'
    >,
    default: 'popover',
    validator: (v: string) =>
      ['popover', 'drawer-full', 'drawer-half', 'drawer-min'].includes(v),
  },
  mobilePosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
    validator: (v: string) => ['left', 'right'].includes(v),
  },
  mobileAnimation: {
    type: String as PropType<'slide' | 'fade'>,
    default: 'slide',
    validator: (v: string) => ['slide', 'fade'].includes(v),
  },
  mobileBackdrop: {
    type: Boolean,
    default: true,
  },
  mobileStartFromTop: {
    type: Boolean,
    default: false,
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits<{
  navigate: [payload: { path: string; item: IAppBarMenuItem }];
  'logo-click': [];
}>();

const router = useRouter();
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

  return styles;
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

// ============== MOBILE MENU COMPUTEDS ==============

const mobileDrawerClasses = computed(() => {
  const classes: string[] = ['mobileDrawer'];

  // Mode
  classes.push(`mode-${props.mobileMode}`);

  // Position
  classes.push(`position-${props.mobilePosition}`);

  // Animation
  classes.push(`animation-${props.mobileAnimation}`);

  // Start from top
  if (props.mobileStartFromTop) {
    classes.push('start-from-top');
  }

  // Active state
  if (isMobileMenuOpen.value) {
    classes.push('active');
  }

  return classes;
});

const mobileDrawerWidth = computed(() => {
  const widthMap: Record<string, string> = {
    popover: '280px',
    'drawer-full': '100%',
    'drawer-half': '50%',
    'drawer-min': '300px',
  };
  return widthMap[props.mobileMode] || '280px';
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

const handleDropdownItemClick = async (item: IMenuItem) => {
  console.log('[CorpAppBar] handleDropdownItemClick:', item);

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

  if (item.action && typeof item.action === 'function') {
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

const isDropdownItemActive = (item: IMenuItem): boolean => {
  if (!item.to) return false;

  // Verifica se o item atual está ativo
  if (isRouteActive(item.to)) return true;

  // Verifica se algum child está ativo
  if (item.children) {
    return item.children.some(child => isRouteActive(child?.to));
  }

  return false;
};

const hasDropdown = (item: IAppBarMenuItem): boolean => {
  const result = !!item.dropdown && !!item.children && item.children.length > 0;
  console.log(
    '[CorpAppBar] hasDropdown:',
    item.label,
    result,
    item.dropdown,
    item.children
  );
  return result;
};

const isMenuItemActive = (item: IAppBarMenuItem): boolean => {
  // Verifica se o próprio item está ativo
  if (item.to && isRouteActive(item.to)) return true;

  // Verifica se algum item do dropdown/children está ativo
  if (item.children) {
    return item.children.some(child => isDropdownItemActive(child));
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
  <div>
    <!-- Spacer: ocupa o espaço no fluxo quando AppBar está fixed/absolute -->
    <div
      v-if="placement === 'fixed' || placement === 'absolute'"
      :style="{ height: appBarHeight }"
      aria-hidden="true"
    />

    <nav
      :class="[appBarVariants(), positionClasses, elevationClass]"
      :style="{
        height: appBarHeight,
        '--appbar-height': appBarHeight,
        ...customColorStyle,
      }"
    >
    <!-- Logo Section -->
    <div v-if="showLogo" class="flex items-center gap-3 flex-shrink-0">
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
      <template v-for="item in menuItems" :key="item.label">
        <!-- Item WITHOUT dropdown -->
        <button
          v-if="!hasDropdown(item)"
          type="button"
          class="menuItem"
          :class="[menuStyleClass, { active: isRouteActive(item.to) }]"
          @click="handleMenuItemClick(item)"
        >
          <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
          {{ item.label }}
        </button>

        <!-- Item WITH dropdown -->
        <div
          v-else
          class="menuItemDropdown"
          @mouseenter="
            handleDropdownMouseEnter(
              item.label,
              item.dropdown?.hoverMode ?? true
            )
          "
          @mouseleave="
            handleDropdownMouseLeave(
              item.label,
              item.dropdown?.hoverMode ?? true
            )
          "
        >
          <button
            type="button"
            class="menuItem"
            :class="[menuStyleClass, { active: isMenuItemActive(item) }]"
            @click="
              toggleDropdown(item.label, item.dropdown?.hoverMode ?? true)
            "
          >
            <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
            {{ item.label }}
            <CorpIcon
              icon="luc-chevron-down"
              :size="14"
              class="ml-1 transition-transform duration-300"
              :class="{ 'rotate-180': isDropdownOpen(item.label) }"
            />
          </button>

          <!-- Dropdown Content (Vertical ou Horizontal sem full-width) -->
          <Transition v-if="!item.dropdown?.fullWidth" name="dropdown-fade">
            <div
              v-if="isDropdownOpen(item.label)"
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
                  item.label,
                  item.dropdown?.hoverMode ?? true
                )
              "
              @mouseleave="
                handleDropdownMouseLeave(
                  item.label,
                  item.dropdown?.hoverMode ?? true
                )
              "
            >
              <button
                v-for="dropItem in item.children"
                :key="dropItem.label"
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
                {{ dropItem.label }}
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
        :key="`fullwidth-${item.label}`"
        name="dropdown-fade"
      >
        <div
          v-if="isDropdownOpen(item.label)"
          class="dropdownContent horizontal full-width"
          :class="[
            `align-${item.dropdown?.alignment || 'center'}`,
            `items-${item.dropdown?.itemsAlignment || 'center'}`,
          ]"
          @mouseenter="
            handleDropdownMouseEnter(
              item.label,
              item.dropdown?.hoverMode ?? true
            )
          "
          @mouseleave="
            handleDropdownMouseLeave(
              item.label,
              item.dropdown?.hoverMode ?? true
            )
          "
        >
          <button
            v-for="dropItem in item.children"
            :key="dropItem.label"
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
            {{ dropItem.label }}
          </button>
        </div>
      </Transition>
    </template>

    <!-- Right Section -->
    <div class="flex items-center gap-4 flex-shrink-0">
      <slot name="actions" />

      <!-- Profile Section -->
      <div v-if="userName || $slots.avatar" class="hidden md:flex items-center">
        <div class="flex items-center gap-2 p-2">
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

      <!-- Mobile Menu: Popover Mode -->
      <CorpPopover
        v-if="mobileMode === 'popover'"
        v-model:open="isMobileMenuOpen"
        class="md:hidden"
        remove-default-padding
      >
        <template #trigger>
          <button type="button" class="p-2 hover:bg-accent rounded-md">
            <CorpIcon
              :icon="isMobileMenuOpen ? 'luc-x' : 'luc-menu'"
              :size="20"
            />
          </button>
        </template>

        <!-- Conteúdo no slot padrão (não #content) -->
        <div class="mobilePopoverContent">
          <!-- User Profile (topo) -->
          <div v-if="userName || $slots.avatar" class="mobileUserProfile">
            <div class="mobileAvatar">
              <slot name="avatar" :initials="userInitials">
                <div
                  class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
                >
                  {{ userInitials }}
                </div>
              </slot>
            </div>
            <span class="mobileUserName">{{ userName }}</span>
          </div>

          <!-- Menu Items -->
          <div class="mobileMenuItems">
            <template v-for="item in menuItems" :key="item.label">
              <!-- Item WITHOUT dropdown -->
              <button
                v-if="!hasDropdown(item)"
                type="button"
                class="mobileMenuItem"
                :class="{ active: isRouteActive(item.to) }"
                @click="handleMenuItemClick(item)"
              >
                <CorpIcon v-if="item.icon" :icon="item.icon" :size="18" />
                {{ item.label }}
              </button>

              <!-- Item WITH dropdown (Collapsible) -->
              <Collapsible v-else v-slot="{ open }" :default-open="false">
                <CollapsibleTrigger as-child>
                  <button
                    type="button"
                    class="mobileMenuItem mobileMenuItemWithDropdown"
                    :class="{ active: isMenuItemActive(item) }"
                  >
                    <span class="flex items-center gap-2 flex-1">
                      <CorpIcon v-if="item.icon" :icon="item.icon" :size="18" />
                      {{ item.label }}
                    </span>
                    <CorpIcon
                      icon="luc-chevron-down"
                      :size="16"
                      class="transition-transform duration-200"
                      :class="{ 'rotate-180': open }"
                    />
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent class="mobileSubmenuItems">
                  <button
                    v-for="dropItem in item.children"
                    :key="dropItem.label"
                    type="button"
                    class="mobileSubmenuItem"
                    :class="{ active: isRouteActive(dropItem.to) }"
                    @click="handleDropdownItemClick(dropItem)"
                  >
                    <CorpIcon
                      v-if="dropItem.icon"
                      :icon="dropItem.icon"
                      :size="16"
                    />
                    {{ dropItem.label }}
                  </button>
                </CollapsibleContent>
              </Collapsible>
            </template>
          </div>
        </div>
      </CorpPopover>

      <!-- Mobile Menu: Drawer Modes (drawer-full, drawer-half, drawer-min) -->
      <button
        v-else
        type="button"
        class="md:hidden p-2 hover:bg-accent rounded-md"
        @click="toggleMobileMenu"
      >
        <CorpIcon :icon="isMobileMenuOpen ? 'luc-x' : 'luc-menu'" :size="20" />
      </button>
    </div>

    <!-- Mobile Backdrop (só para drawer modes) -->
    <div
      v-if="mobileMode !== 'popover' && mobileBackdrop && isMobileMenuOpen"
      class="mobileBackdrop md:hidden"
      :class="{ active: isMobileMenuOpen }"
      @click="toggleMobileMenu"
    />

    <!-- Mobile Drawer (drawer-full, drawer-half, drawer-min) -->
    <div
      v-if="mobileMode !== 'popover'"
      class="md:hidden"
      :class="mobileDrawerClasses"
      :style="{ width: mobileDrawerWidth }"
    >
      <div class="mobileDrawerContent">
        <!-- User Profile (topo) -->
        <div v-if="userName || $slots.avatar" class="mobileUserProfile">
          <div class="mobileAvatar">
            <slot name="avatar" :initials="userInitials">
              <div
                class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
              >
                {{ userInitials }}
              </div>
            </slot>
          </div>
          <span class="mobileUserName">{{ userName }}</span>
        </div>

        <!-- Menu Items -->
        <div class="mobileMenuItems">
          <template v-for="item in menuItems" :key="item.label">
            <!-- Item WITHOUT dropdown -->
            <button
              v-if="!hasDropdown(item)"
              type="button"
              class="mobileMenuItem"
              :class="{ active: isRouteActive(item.to) }"
              @click="handleMenuItemClick(item)"
            >
              <CorpIcon v-if="item.icon" :icon="item.icon" :size="18" />
              {{ item.label }}
            </button>

            <!-- Item WITH dropdown (Collapsible) -->
            <Collapsible v-else v-slot="{ open }" :default-open="false">
              <CollapsibleTrigger as-child>
                <button
                  type="button"
                  class="mobileMenuItem mobileMenuItemWithDropdown"
                  :class="{ active: isMenuItemActive(item) }"
                >
                  <span class="flex items-center gap-2 flex-1">
                    <CorpIcon v-if="item.icon" :icon="item.icon" :size="18" />
                    {{ item.label }}
                  </span>
                  <CorpIcon
                    icon="luc-chevron-down"
                    :size="16"
                    class="transition-transform duration-200"
                    :class="{ 'rotate-180': open }"
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent class="mobileSubmenuItems">
                <button
                  v-for="dropItem in item.children"
                  :key="dropItem.label"
                  type="button"
                  class="mobileSubmenuItem"
                  :class="{ active: isRouteActive(dropItem.to) }"
                  @click="handleDropdownItemClick(dropItem)"
                >
                  <CorpIcon
                    v-if="dropItem.icon"
                    :icon="dropItem.icon"
                    :size="16"
                  />
                  {{ dropItem.label }}
                </button>
              </CollapsibleContent>
            </Collapsible>
          </template>
        </div>
      </div>
    </div>
  </nav>
  </div>
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

/* ============== MOBILE MENU STYLES (Vuetify-like) ============== */

/* Backdrop */
.mobileBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  pointer-events: none;
}

.mobileBackdrop.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* Mobile Drawer */
.mobileDrawer {
  position: fixed;
  top: var(--appbar-height, 64px);
  height: calc(100vh - var(--appbar-height, 64px));
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.3s ease,
    visibility 0.3s ease;
}

/* Start From Top: Drawer ocupa altura total (do topo ao fim) */
.mobileDrawer.start-from-top {
  top: 0 !important;
  height: 100vh !important;
  border-top: none;
}

/* Position: Right (default) */
.mobileDrawer.position-right {
  right: 0;
  border-left: 1px solid hsl(var(--border));
  border-right: none;
}

.mobileDrawer.position-left {
  left: 0;
  border-right: 1px solid hsl(var(--border));
  border-left: none;
}

/* Animation: Slide (default) */
.mobileDrawer.animation-slide.position-right {
  transform: translateX(100%);
}

.mobileDrawer.animation-slide.position-left {
  transform: translateX(-100%);
}

.mobileDrawer.animation-slide.active {
  transform: translateX(0);
}

/* Animation: Fade */
.mobileDrawer.animation-fade {
  transform: none;
}

/* Active state */
.mobileDrawer.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* Modes */
.mobileDrawer.mode-popover {
  position: absolute;
  top: 100%;
  height: auto;
  max-height: 400px;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.mobileDrawer.mode-drawer-min {
  border-top: 1px solid hsl(var(--border));
}

/* Drawer Content */
.mobileDrawerContent {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* User Profile (topo) */
.mobileUserProfile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.3);
  flex-shrink: 0;
}

.mobileAvatar {
  flex-shrink: 0;
}

.mobileUserName {
  font-size: 0.9375rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

/* Menu Items */
.mobileMenuItems {
  flex: 1;
  padding: 0.5rem;
  overflow-y: auto;
}

.mobileMenuItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: hsl(var(--foreground));
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.mobileMenuItem:hover {
  background-color: hsl(var(--accent));
}

.mobileMenuItem.active {
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  font-weight: 600;
}

.mobileMenuItemWithDropdown {
  display: flex;
  justify-content: space-between;
}

/* Submenu Items (indented) */
.mobileSubmenuItems {
  margin-left: 1rem;
  padding-left: 0.5rem;
  border-left: 2px solid hsl(var(--border));
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

.mobileSubmenuItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.625rem 1rem;
  margin-bottom: 0.125rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.mobileSubmenuItem:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--foreground));
}

.mobileSubmenuItem.active {
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  font-weight: 600;
}

/* Profile Actions (footer) */
.mobileProfileActions {
  padding: 0.5rem;
  border-top: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.2);
  flex-shrink: 0;
}

.mobileProfileAction {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--foreground));
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.mobileProfileAction:hover {
  background-color: hsl(var(--accent));
}

.mobileProfileAction.danger {
  color: hsl(var(--destructive));
}

.mobileProfileAction.danger:hover {
  background-color: hsl(var(--destructive) / 0.1);
}

/* Mobile Popover Content (CorpPopover mode) */
.mobilePopoverContent {
  width: 280px;
  max-width: 100%;
  max-height: 400px;
  overflow-y: auto;
}

/* User Profile dentro do popover */
.mobilePopoverContent .mobileUserProfile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid hsl(var(--border));
}

/* Menu Items dentro do popover */
.mobilePopoverContent .mobileMenuItems {
  margin-bottom: 1rem;
}

/* Responsivo: Esconder em desktop */
@media (min-width: 768px) {
  .mobileBackdrop,
  .mobileDrawer {
    display: none !important;
  }
}
</style>
