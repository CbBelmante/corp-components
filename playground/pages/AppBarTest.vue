<script setup lang="ts">
import { ref } from 'vue';
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

// Menu Items com Dropdown Vertical
const menuItemsWithVerticalDropdown: IAppBarMenuItem[] = [
  {
    title: 'Home',
    icon: 'luc-home',
    to: '/dashboard',
  },
  {
    title: 'Products',
    icon: 'luc-package',
    dropdown: {
      mode: 'vertical',
      hoverMode: true,
      arrow: true,
      items: [
        { title: 'All Products', icon: 'luc-grid', to: '/products' },
        { title: 'New Product', icon: 'luc-plus', to: '/products/new' },
        { title: 'Categories', icon: 'luc-folder', to: '/products/categories' },
      ],
    },
  },
  {
    title: 'Reports',
    icon: 'luc-chart-bar',
    to: '/reports',
  },
];

// Menu Items com Dropdown Horizontal
const menuItemsWithHorizontalDropdown: IAppBarMenuItem[] = [
  {
    title: 'Home',
    icon: 'luc-home',
    to: '/dashboard',
  },
  {
    title: 'Categories',
    icon: 'luc-grid',
    dropdown: {
      mode: 'horizontal',
      fullWidth: true,
      alignment: 'center',
      itemsAlignment: 'left',
      hoverMode: true,
      items: [
        {
          title: 'Electronics',
          icon: 'luc-laptop',
          to: '/categories/electronics',
        },
        { title: 'Fashion', icon: 'luc-shirt', to: '/categories/fashion' },
        { title: 'Home', icon: 'luc-home', to: '/categories/home' },
        { title: 'Sports', icon: 'luc-dumbbell', to: '/categories/sports' },
        { title: 'Books', icon: 'luc-book', to: '/categories/books' },
      ],
    },
  },
  {
    title: 'Contact',
    icon: 'luc-mail',
    to: '/contact',
  },
];

// Estados separados para cada exemplo
const currentPath1 = ref('/dashboard');
const currentPath2 = ref('/dashboard');
const currentPath3 = ref('/dashboard');
const currentPath4 = ref('/dashboard');
const currentPath5 = ref('/dashboard');
const currentPath6 = ref('/dashboard');
const currentPath7 = ref('/dashboard');
const currentPath8 = ref('/dashboard');

// Handlers para cada exemplo
const handleNavigate1 = ({ path }: { path: string }) => {
  currentPath1.value = path;
};

const handleNavigate2 = ({ path }: { path: string }) => {
  currentPath2.value = path;
};

const handleNavigate3 = ({ path }: { path: string }) => {
  currentPath3.value = path;
};

const handleNavigate4 = ({ path }: { path: string }) => {
  currentPath4.value = path;
};

const handleNavigate5 = ({ path }: { path: string }) => {
  currentPath5.value = path;
};

const handleNavigate6 = ({ path }: { path: string }) => {
  currentPath6.value = path;
};

const handleNavigate7 = ({ path }: { path: string }) => {
  currentPath7.value = path;
};

const handleNavigate8 = ({ path }: { path: string }) => {
  currentPath8.value = path;
};
</script>

<template>
  <div class="max-w-7xl space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">
        AppBar - Barra de Navegação
      </h1>
      <p class="text-muted-foreground">
        AppBar nativa com 4 estilos de menu (Vuetify-like +
        VLComponents-inspired)
      </p>
    </div>

    <!-- EXEMPLO 1: Folder Style -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          1. Folder Style (Abas)
        </h2>
        <p class="text-sm text-muted-foreground">
          Estilo de abas clássico, similar a navegadores
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItems"
          menu-style="folder"
          :current-path="currentPath1"
          user-name="Dr. Silva"
          user-initials="DS"
          :dropdown-items="dropdownItems"
          placement="in-flow"
          @navigate="handleNavigate1"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon
                icon="luc-heart-pulse"
                :size="24"
                class="text-primary"
              />
              <span class="font-bold text-lg">MedApp</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-muted/30 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Conteúdo Principal</h3>
          <p class="text-muted-foreground mb-2">
            Folder style: Abas arredondadas no topo, item ativo com sombra sutil
          </p>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath1 }}
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
          :current-path="currentPath2"
          user-name="Dr. João"
          user-initials="JM"
          placement="in-flow"
          :elevation="2"
          @navigate="handleNavigate2"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-activity" :size="24" class="text-primary" />
              <span class="font-bold text-lg">HealthPro</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-background min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Conteúdo com Sombra</h3>
          <p class="text-muted-foreground mb-2">
            Underline style: Sliding indicator abaixo do item ativo
            (elevation=2)
          </p>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath2 }}
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
          :current-path="currentPath3"
          user-name="Dra. Maria"
          user-initials="MS"
          :dropdown-items="dropdownItems"
          placement="in-flow"
          color="bg-card"
          @navigate="handleNavigate3"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon
                icon="luc-stethoscope"
                :size="24"
                class="text-primary"
              />
              <span class="font-bold text-lg">CareHub</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-card min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Background Card</h3>
          <p class="text-muted-foreground mb-2">
            Pill style: Item ativo com background primary + texto branco
          </p>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath3 }}
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
          :current-path="currentPath4"
          placement="in-flow"
          :elevation="4"
          @navigate="handleNavigate4"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <CorpIcon icon="luc-zap" :size="16" class="text-white" />
              </div>
              <span class="font-bold text-lg">FastCare</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-accent/20 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Segmented Control</h3>
          <p class="text-muted-foreground mb-2">
            Segmented style: Grupo com border + sliding background indicator
          </p>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath4 }}
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
          :current-path="currentPath5"
          user-name="Admin"
          :dropdown-items="dropdownItems"
          placement="in-flow"
          color="bg-secondary/10"
          @navigate="handleNavigate5"
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
              <span
                class="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"
              />
            </button>
          </template>

          <template #avatar>
            <div
              class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <span class="text-xs font-bold text-white">AD</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-secondary/20 min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Slots Customizados</h3>
          <div class="space-y-2 text-sm text-muted-foreground mb-4">
            <p>
              ✅
              <code class="px-1 bg-muted rounded">#logo</code>
              - Logo customizado
            </p>
            <p>
              ✅
              <code class="px-1 bg-muted rounded">#actions</code>
              - Ações antes do avatar (ex: notificações)
            </p>
            <p>
              ✅
              <code class="px-1 bg-muted rounded">#avatar</code>
              - Avatar customizado
            </p>
          </div>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath5 }}
          </p>
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
          :current-path="currentPath6"
          placement="in-flow"
          flat
          @navigate="handleNavigate6"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-hexagon" :size="24" class="text-primary" />
              <span class="font-bold text-lg">SimpleCare</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-background min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Clean Interface</h3>
          <p class="text-muted-foreground mb-2">
            Sem avatar, sem sombra (flat), foco total no conteúdo
          </p>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath6 }}
          </p>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 7: Dropdown Vertical (Hover Mode) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          7. Dropdown Vertical (Hover Mode)
        </h2>
        <p class="text-sm text-muted-foreground">
          Menu com dropdown vertical que abre ao passar o mouse
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItemsWithVerticalDropdown"
          menu-style="underline"
          :current-path="currentPath7"
          user-name="Dr. Silva"
          user-initials="DS"
          :dropdown-items="dropdownItems"
          placement="in-flow"
          :elevation="2"
          @navigate="handleNavigate7"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon icon="luc-store" :size="24" class="text-primary" />
              <span class="font-bold text-lg">Shop</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-background min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Dropdown Vertical</h3>
          <p class="text-muted-foreground mb-2">
            Passe o mouse sobre "Products" para ver o dropdown vertical
          </p>
          <ul
            class="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4"
          >
            <li>✅ Abre ao passar o mouse (hover mode)</li>
            <li>✅ Fecha com delay de 300ms</li>
            <li>✅ Ícone chevron com rotação</li>
            <li>✅ Detecta rota ativa</li>
          </ul>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath7 }}
          </p>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 8: Dropdown Horizontal Full Width -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          8. Dropdown Horizontal Full Width
        </h2>
        <p class="text-sm text-muted-foreground">
          Menu com dropdown horizontal que ocupa toda a largura da tela
        </p>
      </div>

      <div class="border border-border rounded-lg overflow-hidden">
        <CorpAppBar
          :menu-items="menuItemsWithHorizontalDropdown"
          menu-style="pill"
          :current-path="currentPath8"
          placement="in-flow"
          color="bg-card"
          @navigate="handleNavigate8"
        >
          <template #logo>
            <div class="flex items-center gap-2">
              <CorpIcon
                icon="luc-shopping-cart"
                :size="24"
                class="text-primary"
              />
              <span class="font-bold text-lg">E-Commerce</span>
            </div>
          </template>
        </CorpAppBar>
        <div class="p-6 bg-card min-h-[200px]">
          <h3 class="text-lg font-semibold mb-2">Dropdown Horizontal</h3>
          <p class="text-muted-foreground mb-2">
            Passe o mouse sobre "Categories" para ver o dropdown horizontal
          </p>
          <ul
            class="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4"
          >
            <li>✅ Modo horizontal (linha abaixo)</li>
            <li>✅ Full width (ocupa tela toda)</li>
            <li>✅ alignment: center (container centralizado)</li>
            <li>✅ itemsAlignment: left (labels alinhadas à esquerda)</li>
            <li>✅ Items lado a lado com border-right</li>
            <li>✅ Mobile: vira vertical automaticamente</li>
          </ul>
          <p class="text-sm text-primary font-medium">
            Página atual: {{ currentPath8 }}
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
          <strong>currentPath prop</strong>
          : Controlled component (passa estado de fora) - Perfeito para testes
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
        <p>
          🔽
          <strong>Dropdowns</strong>
          : menuItems com prop dropdown (vertical/horizontal)
        </p>
        <p>
          ➡️
          <strong>Arrow (setinha)</strong>
          : arrow: true para mostrar setinha (tooltip-like)
        </p>
        <p>
          🖱️
          <strong>Hover Mode</strong>
          : Dropdowns abrem ao passar mouse (delay 600ms)
        </p>
        <p>
          📐
          <strong>Dropdown Modes</strong>
          : vertical (tradicional), horizontal (linha abaixo), fullWidth
        </p>
        <p>
          🎯
          <strong>Alinhamentos</strong>
          : alignment (left/center/right), itemsAlignment (left/center/right
          para labels)
        </p>
        <p>
          ✅
          <strong>Active Detection</strong>
          : Detecta rota ativa nos dropdowns automaticamente
        </p>
        <p>
          ⚡
          <strong>Animações</strong>
          : Fade + slide com transform GPU-accelerated
        </p>
      </div>
    </section>

    <!-- Guia de Uso -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">📘 Como Usar</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">1. Básico</h3>
          <pre
            class="text-xs bg-muted p-2 rounded overflow-x-auto"
          ><code>&lt;CorpAppBar
  :menu-items="items"
  :current-path="currentPath"
  menu-style="folder"
  @navigate="handleNav"
/&gt;</code></pre>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">2. Com User</h3>
          <pre
            class="text-xs bg-muted p-2 rounded overflow-x-auto"
          ><code>&lt;CorpAppBar
  :current-path="currentPath"
  user-name="John"
  user-initials="JD"
  :dropdown-items="actions"
  @navigate="handleNav"
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
