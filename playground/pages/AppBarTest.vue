<script setup lang="ts">
import {
  CorpAppBar,
  type IAppBarMenuItem,
  type IAppBarDropdownItem,
} from '@/components/ui/appbar';
import { CorpIcon } from '@/components/ui/icon';

const menuItems: IAppBarMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'luc-layout-dashboard',
    to: '/dashboard',
  },
  {
    title: 'Patients',
    icon: 'luc-users',
    to: '/patients',
  },
  {
    title: 'Reports',
    icon: 'luc-chart-bar',
    to: '/reports',
  },
  {
    title: 'Settings',
    icon: 'luc-settings',
    to: '/settings',
  },
];

const dropdownItems: IAppBarDropdownItem[] = [
  {
    title: 'Profile',
    icon: 'luc-user',
    action: () => console.log('Profile clicked'),
  },
  {
    title: 'Settings',
    icon: 'luc-settings',
    action: () => console.log('Settings clicked'),
  },
  {
    title: 'Logout',
    icon: 'luc-log-out',
    variant: 'danger',
    action: () => console.log('Logout clicked'),
  },
];
</script>

<template>
  <div class="max-w-7xl space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">
        AppBar - Barra de Navegação
      </h1>
      <p class="text-muted-foreground">
        AppBar nativa com 4 estilos de menu (Vuetify-like + VLComponents-inspired)
      </p>
    </div>

    <!-- EXEMPLO 1: Folder Style -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">1. Folder Style (Abas)</h2>
        <p class="text-sm text-muted-foreground">
          Estilo de abas clássico, similar a navegadores
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="folder"
          user-name="Dr. Silva"
          user-initials="DS"
          :dropdown-items="dropdownItems"
          placement="in-flow"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-heart-pulse" :size="24" class="text-primary" />
              <span class="font-bold text-lg">MedApp</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Conteúdo Principal</h3>
          <p class="text-muted-foreground">
            Folder style: Abas arredondadas no topo, item ativo com sombra sutil
          </p>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 2: Underline Style -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          2. Underline Style (Linha Animada)
        </h2>
        <p class="text-sm text-muted-foreground">
          Linha embaixo do item ativo com animação suave
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="underline"
          user-name="Dr. João"
          user-initials="JM"
          placement="in-flow"
          elevation="2"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-activity" :size="24" class="text-primary" />
              <span class="font-bold text-lg">HealthPro</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Conteúdo com Sombra</h3>
          <p class="text-muted-foreground">
            Underline style: Sliding indicator abaixo do item ativo (elevation=2)
          </p>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 3: Pill Style -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          3. Pill Style (Botões Arredondados)
        </h2>
        <p class="text-sm text-muted-foreground">
          Botões arredondados, item ativo com background primary
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="pill"
          user-name="Dra. Maria"
          user-initials="MS"
          :dropdown-items="dropdownItems"
          placement="in-flow"
          color="bg-card"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-stethoscope" :size="24" class="text-primary" />
              <span class="font-bold text-lg">CareHub</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Background Card</h3>
          <p class="text-muted-foreground">
            Pill style: Item ativo com background primary + texto branco
          </p>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 4: Segmented Style -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          4. Segmented Style (iOS-like)
        </h2>
        <p class="text-sm text-muted-foreground">
          Estilo segmentado com sliding background (inspired by iOS)
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="segmented"
          placement="in-flow"
          elevation="4"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CorpIcon icon="luc-zap" :size="16" class="text-white" />
              </div>
              <span class="font-bold text-lg">FastCare</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Segmented Control</h3>
          <p class="text-muted-foreground">
            Segmented style: Grupo com border + sliding background indicator
          </p>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 5: Avatar Customizado -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          5. Avatar Customizado + Actions
        </h2>
        <p class="text-sm text-muted-foreground">
          Slot avatar customizado + slot actions
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="underline"
          user-name="Admin"
          :dropdown-items="dropdownItems"
          placement="in-flow"
          color="bg-secondary/10"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-shield" :size="24" class="text-primary" />
              <span class="font-bold text-lg">AdminPanel</span>
            </div>
          </template>

          <template #actions>
            <button class="p-2 hover:bg-accent rounded-md relative">
              <CorpIcon icon="luc-bell" :size="20" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
          </template>

          <template #avatar>
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span class="text-xs font-bold text-white">AD</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Slots Customizados</h3>
          <div class="space-y-2 text-sm text-muted-foreground">
            <p>
              ✅ <code class="px-1 bg-muted rounded">#logo</code> - Logo customizado
            </p>
            <p>
              ✅ <code class="px-1 bg-muted rounded">#actions</code> - Ações antes do avatar (ex: notificações)
            </p>
            <p>
              ✅ <code class="px-1 bg-muted rounded">#avatar</code> - Avatar customizado
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 6: Sem Avatar (Minimalista) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          6. Sem Avatar (Minimalista)
        </h2>
        <p class="text-sm text-muted-foreground">
          AppBar clean sem perfil de usuário
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="pill"
          placement="in-flow"
          flat
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-hexagon" :size="24" class="text-primary" />
              <span class="font-bold text-lg">SimpleCare</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Clean Interface</h3>
          <p class="text-muted-foreground">
            Sem avatar, sem sombra (flat), foco total no conteúdo
          </p>
        </div>
      </div>
    </section>

    <!-- Bizu do Soldado -->
    <section class="p-4 bg-primary/10 border border-primary rounded-lg">
      <h3 class="font-semibold text-foreground mb-2">🔰 Bizu do Soldado</h3>
      <div class="space-y-1 text-sm text-muted-foreground">
        <p>
          ✅
          <strong>AppBar Nativo</strong>
          : Sem shadcn, só usa CorpPopover
        </p>
        <p>
          ✅
          <strong>menuStyle prop</strong>
          : folder (abas), underline (linha), pill (botões), segmented (iOS)
        </p>
        <p>
          ✅
          <strong>placement prop</strong>
          : in-flow (demo), fixed (sticky top), absolute (overlay)
        </p>
        <p>
          ✅
          <strong>elevation prop</strong>
          : 0-24 (0 = sem sombra, 4 = padrão)
        </p>
        <p>
          🎯
          <strong>Sliding indicator</strong>
          : Animação suave nos estilos underline e segmented
        </p>
        <p>
          📱
          <strong>Mobile responsive</strong>
          : Hamburger menu automático em telas pequenas
        </p>
        <p>
          🎨
          <strong>Slots</strong>
          : logo, avatar, actions (customizáveis)
        </p>
      </div>
    </section>

    <!-- Guia de Uso -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">📘 Como Usar</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">1. Básico</h3>
          <pre class="text-xs bg-muted p-2 rounded overflow-x-auto"><code>&lt;CorpAppBar
  :menu-items="items"
  menu-style="folder"
  placement="in-flow"
/&gt;</code></pre>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">2. Com User</h3>
          <pre class="text-xs bg-muted p-2 rounded overflow-x-auto"><code>&lt;CorpAppBar
  user-name="John"
  user-initials="JD"
  :dropdown-items="actions"
/&gt;</code></pre>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">3. Menu Item</h3>
          <pre class="text-xs bg-muted p-2 rounded overflow-x-auto"><code>{
  title: 'Dashboard',
  icon: 'luc-home',
  to: '/dashboard'
}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>
