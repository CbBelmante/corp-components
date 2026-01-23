<script setup lang="ts">
import {
  CorpSidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  type IMenuItem,
} from '@/components/ui/sidebar';
import { CorpIcon } from '@/components/ui/icon';

// ============== MENU DATA ==============

/**
 * Menu básico com grupos e itens
 */
const basicMenuItems: IMenuItem[] = [
  {
    title: 'Navegação',
    items: [
      {
        title: 'Dashboard',
        icon: 'luc-layout-dashboard',
        to: '/dashboard',
      },
      {
        title: 'Pacientes',
        icon: 'luc-users',
        to: '/patients',
      },
      {
        title: 'Agenda',
        icon: 'luc-calendar',
        to: '/schedule',
      },
      {
        title: 'Relatórios',
        icon: 'luc-chart-bar',
        to: '/reports',
      },
    ],
  },
  {
    title: 'Configurações',
    items: [
      {
        title: 'Perfil',
        icon: 'luc-user',
        to: '/profile',
      },
      {
        title: 'Sistema',
        icon: 'luc-settings',
        to: '/settings',
      },
    ],
  },
];

/**
 * Menu com submenus (collapsible)
 */
const submenuItems: IMenuItem[] = [
  {
    title: 'Atendimento',
    items: [
      {
        title: 'Pacientes',
        icon: 'luc-users',
        defaultOpen: true,
        children: [
          {
            title: 'Lista de Pacientes',
            icon: 'luc-list',
            to: '/patients/list',
          },
          {
            title: 'Novo Paciente',
            icon: 'luc-user-plus',
            to: '/patients/new',
          },
          {
            title: 'Prontuários',
            icon: 'luc-file-text',
            to: '/patients/records',
          },
        ],
      },
      {
        title: 'Consultas',
        icon: 'luc-stethoscope',
        children: [
          {
            title: 'Agendadas',
            icon: 'luc-calendar-check',
            to: '/appointments/scheduled',
          },
          {
            title: 'Em Andamento',
            icon: 'luc-clock',
            to: '/appointments/ongoing',
          },
          {
            title: 'Finalizadas',
            icon: 'luc-check-circle',
            to: '/appointments/completed',
          },
        ],
      },
    ],
  },
];

/**
 * Menu com cores customizadas (iconColor)
 */
const coloredMenuItems: IMenuItem[] = [
  {
    title: 'Áreas Clínicas',
    items: [
      {
        title: 'Cardiologia',
        icon: 'luc-heart-pulse',
        iconColor: '#ef4444', // Vermelho
        to: '/cardiology',
      },
      {
        title: 'Neurologia',
        icon: 'luc-brain',
        iconColor: '#8b5cf6', // Roxo
        to: '/neurology',
      },
      {
        title: 'Ortopedia',
        icon: 'luc-bone',
        iconColor: '#f97316', // Laranja
        to: '/orthopedics',
      },
      {
        title: 'Pediatria',
        icon: 'luc-baby',
        iconColor: '#3b82f6', // Azul
        to: '/pediatrics',
      },
    ],
  },
  {
    title: 'Status',
    items: [
      {
        title: 'Emergências',
        icon: 'luc-siren',
        iconColor: 'var(--destructive)', // CSS variable
        to: '/emergency',
      },
      {
        title: 'Urgências',
        icon: 'luc-alert-triangle',
        iconColor: 'var(--warning)', // CSS variable
        to: '/urgent',
      },
      {
        title: 'Rotina',
        icon: 'luc-check-circle',
        iconColor: 'var(--success)', // CSS variable
        to: '/routine',
      },
    ],
  },
];
</script>

<template>
  <div class="max-w-7xl space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">
        Sidebar - Navegação Lateral
      </h1>
      <p class="text-muted-foreground">
        Sidebar responsiva baseado em Shadcn com menu Vuetify-like
      </p>
    </div>

    <!-- EXEMPLO 1: Sidebar Básico -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">1. Sidebar Básico</h2>
        <p class="text-sm text-muted-foreground">
          Menu simples com grupos e ícones
        </p>
      </div>

      <div
        class="h-[500px] border border-border rounded-lg overflow-hidden relative"
      >
        <SidebarProvider>
          <div class="flex h-full w-full absolute inset-0">
            <CorpSidebar
              :items="basicMenuItems"
              app-name="Corp Health"
              app-subtitle="Sistema de Saúde"
              user-name="Dr. Silva"
              background="bg-card"
              contained
            />
            <SidebarInset class="flex-1 overflow-auto">
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <SidebarTrigger />
                  <h3 class="text-lg font-semibold">Conteúdo Principal</h3>
                </div>
                <p class="text-muted-foreground">
                  Clique no ícone para colapsar/expandir o sidebar. Clique nos
                  itens do menu para navegar.
                </p>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </section>

    <!-- EXEMPLO 2: Com Submenus (Collapsible) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          2. Com Submenus (Collapsible)
        </h2>
        <p class="text-sm text-muted-foreground">
          Menus expansíveis com children (Vuetify-like)
        </p>
      </div>

      <div
        class="h-[600px] border border-border rounded-lg overflow-hidden relative"
      >
        <SidebarProvider>
          <div class="flex h-full w-full absolute inset-0">
            <CorpSidebar
              :items="submenuItems"
              app-name="Mnesis"
              app-subtitle="Prontuário Eletrônico"
              user-name="Dr. Fábio"
              background="bg-muted"
              contained
            />
            <SidebarInset class="flex-1 overflow-auto">
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <SidebarTrigger />
                  <h3 class="text-lg font-semibold">Submenus Expansíveis</h3>
                </div>
                <div class="space-y-2 text-sm text-muted-foreground">
                  <p>✅ Clique nos itens com seta para expandir/colapsar</p>
                  <p>
                    ✅ Use
                    <code class="px-1 bg-muted rounded">defaultOpen: true</code>
                    para abrir por padrão
                  </p>
                  <p>✅ Animação suave com @keyframes</p>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </section>

    <!-- EXEMPLO 3: Icon Colors (Cores Customizadas) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          3. Icon Colors (Cores Customizadas)
        </h2>
        <p class="text-sm text-muted-foreground">
          Ícones coloridos com HEX, RGB, CSS variables
        </p>
      </div>

      <div
        class="h-[500px] border border-border rounded-lg overflow-hidden relative"
      >
        <SidebarProvider>
          <div class="flex h-full w-full absolute inset-0">
            <CorpSidebar
              :items="coloredMenuItems"
              app-name="Clínica Multi"
              app-subtitle="Especialidades Médicas"
              user-name="Dr. Carlos"
              background="bg-secondary/10"
              contained
            />
            <SidebarInset class="flex-1 overflow-auto">
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <SidebarTrigger />
                  <h3 class="text-lg font-semibold">Ícones Coloridos</h3>
                </div>
                <div class="space-y-2 text-sm text-muted-foreground">
                  <p>🎨 Suporta múltiplos formatos:</p>
                  <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code class="px-1 bg-muted rounded">#ef4444</code>
                      - HEX
                    </li>
                    <li>
                      <code class="px-1 bg-muted rounded">
                        rgb(139, 69, 19)
                      </code>
                      - RGB
                    </li>
                    <li>
                      <code class="px-1 bg-muted rounded">
                        var(--destructive)
                      </code>
                      - CSS var
                    </li>
                    <li>
                      <code class="px-1 bg-muted rounded">text-blue-500</code>
                      - Tailwind
                    </li>
                  </ul>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </section>

    <!-- EXEMPLO 4: Slots Customizados (Logo + Footer) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          4. Slots Customizados (Logo + Footer)
        </h2>
        <p class="text-sm text-muted-foreground">
          Personalize logo e footer com slots
        </p>
      </div>

      <div
        class="h-[500px] border border-border rounded-lg overflow-hidden relative"
      >
        <SidebarProvider>
          <div class="flex h-full w-full absolute inset-0">
            <CorpSidebar
              :items="basicMenuItems"
              background="bg-primary/5"
              contained
            >
              <!-- Custom Logo -->
              <template #logo>
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                  >
                    <CorpIcon
                      icon="luc-heart-pulse"
                      :size="20"
                      class="text-white"
                    />
                  </div>
                  <div
                    class="flex flex-col group-data-[collapsible=icon]:hidden"
                  >
                    <span class="font-bold text-sm">MedTech</span>
                    <span class="text-xs text-muted-foreground">v2.0</span>
                  </div>
                </div>
              </template>

              <!-- Custom Footer -->
              <template #footer>
                <div
                  class="flex items-center gap-3 p-3 hover:bg-sidebar-accent rounded-lg cursor-pointer transition-colors"
                >
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-xs font-bold text-white">DS</span>
                  </div>
                  <div class="flex-1 group-data-[collapsible=icon]:hidden">
                    <p class="text-sm font-medium">Dr. Silva</p>
                    <p class="text-xs text-muted-foreground">
                      silva@medtech.com
                    </p>
                  </div>
                  <CorpIcon
                    icon="luc-log-out"
                    :size="16"
                    class="group-data-[collapsible=icon]:hidden"
                  />
                </div>
              </template>
            </CorpSidebar>
            <SidebarInset class="flex-1 overflow-auto">
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <SidebarTrigger />
                  <h3 class="text-lg font-semibold">Slots Customizados</h3>
                </div>
                <div class="space-y-2 text-sm text-muted-foreground">
                  <p>
                    ✅
                    <code class="px-1 bg-muted rounded">#logo</code>
                    - Logo customizado
                  </p>
                  <p>
                    ✅
                    <code class="px-1 bg-muted rounded">#footer</code>
                    - Footer customizado
                  </p>
                  <p>
                    ✅
                    <code class="px-1 bg-muted rounded">#prepend</code>
                    - Conteúdo antes do menu
                  </p>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </section>

    <!-- Bizu do Soldado -->
    <section class="p-4 bg-primary/10 border border-primary rounded-lg">
      <h3 class="font-semibold text-foreground mb-2">🔰 Bizu do Soldado</h3>
      <div class="space-y-1 text-sm text-muted-foreground">
        <p>
          ✅
          <strong>SidebarProvider obrigatório</strong>
          : Sempre envolva CorpSidebar + SidebarInset
        </p>
        <p>
          ✅
          <strong>contained prop</strong>
          : Use
          <code class="px-1 bg-muted rounded">contained</code>
          quando sidebar estiver em container limitado (usa absolute)
        </p>
        <p>
          ✅
          <strong>background prop</strong>
          : Use
          <code class="px-1 bg-muted rounded">bg-card</code>
          ,
          <code class="px-1 bg-muted rounded">bg-muted</code>
          ,
          <code class="px-1 bg-muted rounded">bg-primary/10</code>
          etc
        </p>
        <p>
          ✅
          <strong>IMenuItem interface</strong>
          : Use
          <code class="px-1 bg-muted rounded">children</code>
          ou
          <code class="px-1 bg-muted rounded">items</code>
          para submenus
        </p>
        <p>
          ✅
          <strong>defaultOpen</strong>
          : Controla se submenu abre por padrão (
          <code class="px-1 bg-muted rounded">true</code>
          /
          <code class="px-1 bg-muted rounded">false</code>
          )
        </p>
        <p>
          🎨
          <strong>iconColor</strong>
          : Suporta HEX, RGB, CSS var, Tailwind classes
        </p>
        <p>
          🎭
          <strong>Slots customizáveis</strong>
          : logo, footer, prepend
        </p>
      </div>
    </section>

    <!-- Guia de Uso -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">📘 Como Usar</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">1. Estrutura Básica</h3>
          <pre
            class="text-xs bg-muted p-2 rounded overflow-x-auto"
          ><code>&lt;SidebarProvider&gt;
  &lt;CorpSidebar
    :items="menu"
    background="bg-card"
    contained
  /&gt;
  &lt;SidebarInset&gt;
    &lt;SidebarTrigger /&gt;
    &lt;!-- Conteúdo --&gt;
  &lt;/SidebarInset&gt;
&lt;/SidebarProvider&gt;</code></pre>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">2. Menu com Submenu</h3>
          <pre class="text-xs bg-muted p-2 rounded overflow-x-auto"><code>{
  title: 'Grupo',
  items: [{
    title: 'Item',
    icon: 'luc-users',
    children: [{
      title: 'Subitem',
      to: '/path'
    }]
  }]
}</code></pre>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">3. Slots</h3>
          <pre
            class="text-xs bg-muted p-2 rounded overflow-x-auto"
          ><code>&lt;CorpSidebar&gt;
  &lt;template #logo&gt;
    &lt;!-- Custom logo --&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;!-- Custom footer --&gt;
  &lt;/template&gt;
&lt;/CorpSidebar&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>
