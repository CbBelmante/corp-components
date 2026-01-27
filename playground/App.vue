<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { CorpAppBar } from '@/components/ui/appbar';
import { CorpSidebar, type IMenuItem } from '@/components/ui/sidebar';
import { CorpThemeToggle, CorpButton } from '@/components/ui';
import { PLAYGROUND_COMPONENTS } from './config/autoComponents';

const route = useRoute();

const menuItems = computed<IMenuItem[]>(() => {
  const categories = {
    Formulários: {
      names: [
        'Input',
        'Select',
        'Textarea',
        'Checkbox',
        'Switch',
        'RadioGroup',
      ],
      icon: 'luc-square-check-big',
    },
    Layout: {
      names: ['AppBar', 'Sidebar', 'Card', 'Breadcrumb', 'Collapsible'],
      icon: 'luc-layout-dashboard',
    },
    Navegação: {
      names: ['Command', 'Popover'],
      icon: 'luc-map',
    },
    Feedback: {
      names: ['Badge', 'Progress'],
      icon: 'luc-bell',
    },
    Controles: {
      names: ['Button'],
      icon: 'luc-mouse-pointer-click',
    },
    Mídia: {
      names: ['Image'],
      icon: 'luc-image',
    },
  };

  const groups = [];

  for (const [label, config] of Object.entries(categories)) {
    const items = PLAYGROUND_COMPONENTS.filter(comp =>
      config.names.includes(comp.name)
    ).map(comp => ({
      label: comp.title,
      to: comp.path,
      icon: config.icon,
    }));

    if (items.length > 0) {
      groups.push({ label, items });
    }
  }

  return groups;
});

const currentTitle = computed(() => {
  const current = PLAYGROUND_COMPONENTS.find(c => c.path === route.path);
  return current?.title || 'Playground';
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Sidebar -->
    <CorpSidebar
      :items="menuItems"
      app-name="Corp Components"
      app-subtitle="Playground"
      :width="280"
      :rail="false"
      :show-header="false"
      placement="fixed"
      :offset-top="64"
    >
      <template #footer="{ isCollapsed }">
        <CorpButton
          as="a"
          href="http://localhost:5174"
          target="_blank"
          variant="solid"
          color="primary"
          :prepend-icon="isCollapsed ? undefined : 'luc-book-open'"
          :icon="isCollapsed ? 'luc-book-open' : undefined"
          block
          class="w-full"
        >
          <template v-if="!isCollapsed">Documentação</template>
        </CorpButton>
      </template>
    </CorpSidebar>

    <!-- Main Content Area (compensando Sidebar fixo com ml-[280px]) -->
    <div class="flex-1 flex flex-col overflow-hidden ml-[280px]">
      <!-- AppBar -->
      <CorpAppBar :title="currentTitle" placement="fixed">
        <template #actions>
          <CorpThemeToggle />
        </template>
      </CorpAppBar>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
