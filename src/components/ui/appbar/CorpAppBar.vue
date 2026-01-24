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
}

export interface IAppBarDropdownItem {
  title: string;
  icon?: string;
  action: () => void | Promise<void>;
  variant?: 'default' | 'danger';
}

const props = defineProps({
  menuItems: {
    type: Array as PropType<IAppBarMenuItem[]>,
    default: () => [],
  },
  menuStyle: {
    type: String as PropType<'folder' | 'underline' | 'pill' | 'segmented'>,
    default: 'folder',
    validator: (v: string) => ['folder', 'underline', 'pill', 'segmented'].includes(v),
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
    Math.abs(curr - props.elevation) < Math.abs(prev - props.elevation) ? curr : prev
  );

  return shadowMap[closestElevation] || 'shadow';
});

const menuStyleClass = computed(() => `menu-item-${props.menuStyle}`);

const isRouteActive = (path?: string): boolean => {
  if (!path) return false;
  try {
    return router.currentRoute.value.path === path;
  } catch {
    return false;
  }
};

const handleMenuItemClick = (item: IAppBarMenuItem) => {
  if (!item.to) return;
  isMobileMenuOpen.value = false;
  router.push(item.to);
  emit('navigate', { path: item.to, item });
};

const handleLogoClick = () => {
  emit('logo-click');
};

const handleDropdownItemClick = async (item: IAppBarDropdownItem) => {
  isProfileDropdownOpen.value = false;
  await item.action();
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const updateIndicator = () => {
  if (!menuItemsContainer.value) return;
  if (props.menuStyle !== 'underline' && props.menuStyle !== 'segmented') return;

  const container = menuItemsContainer.value;
  const activeItem = container.querySelector('.menu-item.active') as HTMLElement;

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

watch(() => [props.menuItems, props.menuStyle], () => {
  nextTick(() => updateIndicator());
}, { deep: true });

onMounted(() => {
  nextTick(() => updateIndicator());
  window.addEventListener('resize', updateIndicator);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator);
});
</script>

<template>
  <nav
    class="flex items-center justify-between px-6 border-b border-border transition-all duration-200"
    :class="[positionClasses, color, elevationClass]"
    :style="{ height: appBarHeight }"
  >
    <!-- Logo Section -->
    <div class="flex items-center gap-3 flex-shrink-0">
      <button
        type="button"
        class="flex items-center"
        @click="handleLogoClick"
      >
        <slot name="logo">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <CorpIcon icon="luc-box" :size="20" />
          </div>
        </slot>
      </button>
    </div>

    <!-- Desktop Menu -->
    <div ref="menuItemsContainer" class="hidden md:flex items-center gap-1 relative">
      <!-- Sliding indicator for underline -->
      <span
        v-if="menuStyle === 'underline' && indicatorVisible"
        class="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
        :style="{ left: indicatorStyle.left, width: indicatorStyle.width }"
      />

      <!-- Sliding indicator for segmented -->
      <span
        v-if="menuStyle === 'segmented' && indicatorVisible"
        class="absolute top-1 bottom-1 bg-primary/10 rounded-md transition-all duration-300 ease-out"
        :style="{ left: indicatorStyle.left, width: indicatorStyle.width }"
      />

      <button
        v-for="item in menuItems"
        :key="item.title"
        type="button"
        :class="[
          'menu-item',
          menuStyleClass,
          { active: isRouteActive(item.to) }
        ]"
        @click="handleMenuItemClick(item)"
      >
        <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
        {{ item.title }}
      </button>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-4 flex-shrink-0">
      <slot name="actions" />

      <!-- Profile Section -->
      <div v-if="userName || $slots.avatar" class="hidden md:flex items-center">
        <CorpPopover v-if="dropdownItems.length > 0" v-model:open="isProfileDropdownOpen">
          <template #trigger>
            <button
              type="button"
              class="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <slot name="avatar" :initials="userInitials">
                <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {{ userInitials }}
                </div>
              </slot>
              <span v-if="userName" class="text-sm font-medium">{{ userName }}</span>
            </button>
          </template>

          <template #content>
            <div class="min-w-[200px] p-1">
              <button
                v-for="item in dropdownItems"
                :key="item.title"
                type="button"
                :class="[
                  'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left',
                  { 'text-destructive': item.variant === 'danger' }
                ]"
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
            <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              {{ userInitials }}
            </div>
          </slot>
          <span v-if="userName" class="text-sm font-medium">{{ userName }}</span>
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
          :class="[
            'w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left',
            { 'bg-accent': isRouteActive(item.to) }
          ]"
          @click="handleMenuItemClick(item)"
        >
          <CorpIcon v-if="item.icon" :icon="item.icon" :size="16" />
          {{ item.title }}
        </button>

        <div v-if="dropdownItems.length > 0" class="pt-2 mt-2 border-t border-border">
          <button
            v-for="item in dropdownItems"
            :key="item.title"
            type="button"
            :class="[
              'w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left',
              { 'text-destructive': item.variant === 'danger' }
            ]"
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
.menu-item {
  @apply flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 relative;
}

/* Folder style */
.menu-item-folder {
  @apply rounded-t-lg bg-transparent;
}

.menu-item-folder:hover {
  @apply bg-accent/50;
}

.menu-item-folder.active {
  @apply bg-background shadow-sm;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

/* Underline style */
.menu-item-underline {
  @apply bg-transparent;
}

.menu-item-underline:hover {
  @apply text-foreground;
}

.menu-item-underline.active {
  @apply text-primary font-semibold;
}

/* Pill style */
.menu-item-pill {
  @apply rounded-full bg-transparent;
}

.menu-item-pill:hover {
  @apply bg-accent;
}

.menu-item-pill.active {
  @apply bg-primary text-primary-foreground;
}

/* Segmented style */
.menu-item-segmented {
  @apply rounded-md bg-transparent relative z-10;
}

.menu-item-segmented:hover {
  @apply text-foreground;
}

.menu-item-segmented.active {
  @apply text-primary font-semibold;
}
</style>
