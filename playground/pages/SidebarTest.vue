<script setup lang="ts">
import { ref } from 'vue';
import { CorpSidebar, type IMenuItem } from '@/components/ui/sidebar';
import { CorpIcon } from '@/components/ui/icon';

// ============== MENU DATA ==============

/**
 * Menu básico com grupos e itens
 */
const basicMenuItems: IMenuItem[] = [
  {
    label: 'Navegação',
    items: [
      {
        label: 'Dashboard',
        icon: 'luc-layout-dashboard',
        to: '/dashboard',
      },
      {
        label: 'Pacientes',
        icon: 'luc-users',
        to: '/patients',
      },
      {
        label: 'Agenda',
        icon: 'luc-calendar',
        to: '/schedule',
      },
      {
        label: 'Relatórios',
        icon: 'luc-chart-bar',
        to: '/reports',
      },
    ],
  },
  {
    label: 'Configurações',
    items: [
      {
        label: 'Perfil',
        icon: 'luc-user',
        to: '/profile',
      },
      {
        label: 'Sistema',
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
    label: 'Atendimento',
    items: [
      {
        label: 'Pacientes',
        icon: 'luc-users',
        defaultOpen: true,
        children: [
          {
            label: 'Lista de Pacientes',
            icon: 'luc-list',
            to: '/patients/list',
          },
          {
            label: 'Novo Paciente',
            icon: 'luc-user-plus',
            to: '/patients/new',
          },
          {
            label: 'Prontuários',
            icon: 'luc-file-text',
            to: '/patients/records',
          },
        ],
      },
      {
        label: 'Consultas',
        icon: 'luc-stethoscope',
        children: [
          {
            label: 'Agendadas',
            icon: 'luc-calendar-check',
            to: '/appointments/scheduled',
          },
          {
            label: 'Em Andamento',
            icon: 'luc-clock',
            to: '/appointments/ongoing',
          },
          {
            label: 'Finalizadas',
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
    label: 'Áreas Clínicas',
    items: [
      {
        label: 'Cardiologia',
        icon: 'luc-heart-pulse',
        iconColor: '#ef4444', // Vermelho
        to: '/cardiology',
      },
      {
        label: 'Neurologia',
        icon: 'luc-brain',
        iconColor: '#8b5cf6', // Roxo
        to: '/neurology',
      },
      {
        label: 'Ortopedia',
        icon: 'luc-bone',
        iconColor: '#f97316', // Laranja
        to: '/orthopedics',
      },
      {
        label: 'Pediatria',
        icon: 'luc-baby',
        iconColor: '#3b82f6', // Azul
        to: '/pediatrics',
      },
    ],
  },
  {
    label: 'Status',
    items: [
      {
        label: 'Emergências',
        icon: 'luc-siren',
        iconColor: 'var(--destructive)', // CSS variable
        to: '/emergency',
      },
      {
        label: 'Urgências',
        icon: 'luc-alert-triangle',
        iconColor: 'var(--warning)', // CSS variable
        to: '/urgent',
      },
      {
        label: 'Rotina',
        icon: 'luc-check-circle',
        iconColor: 'var(--success)', // CSS variable
        to: '/routine',
      },
    ],
  },
];

// ============== CONTROLLED COMPONENT STATE ==============

// Estados separados para cada exemplo
const currentPath1 = ref('/dashboard');
const currentPath2 = ref('/patients/list');
const currentPath3 = ref('/cardiology');
const currentPath4 = ref('/dashboard');
const currentPath5 = ref('/dashboard');
const currentPath6 = ref('/dashboard');

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
        <div class="flex h-full w-full">
          <CorpSidebar
            :items="basicMenuItems"
            :current-path="currentPath1"
            app-name="Corp Health"
            app-subtitle="Sistema de Saúde"
            user-name="Dr. Silva"
            background="bg-card"
            placement="in-flow"
            @navigate="handleNavigate1"
          />
          <div class="flex-1 overflow-auto p-6">
            <h3 class="text-lg font-semibold mb-4">Conteúdo Principal</h3>
            <p class="text-muted-foreground mb-2">
              Clique no ícone para colapsar/expandir o sidebar. Clique nos itens
              do menu para navegar.
            </p>
            <p class="text-sm text-primary font-medium">
              Página atual: {{ currentPath1 }}
            </p>
          </div>
        </div>
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
        <div class="flex h-full w-full">
          <CorpSidebar
            :items="submenuItems"
            :current-path="currentPath2"
            app-name="Mnesis"
            app-subtitle="Prontuário Eletrônico"
            user-name="Dr. Fábio"
            background="bg-muted"
            placement="in-flow"
            @navigate="handleNavigate2"
          />
          <div class="flex-1 overflow-auto p-6">
            <h3 class="text-lg font-semibold mb-4">Submenus Expansíveis</h3>
            <div class="space-y-2 text-sm text-muted-foreground">
              <p>✅ Clique nos itens com seta para expandir/colapsar</p>
              <p>
                ✅ Use
                <code class="px-1 bg-muted rounded">defaultOpen: true</code>
                para abrir por padrão
              </p>
              <p>✅ Animação suave</p>
            </div>
            <p class="text-sm text-primary font-medium mt-4">
              Página atual: {{ currentPath2 }}
            </p>
          </div>
        </div>
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
        <div class="flex h-full w-full">
          <CorpSidebar
            :items="coloredMenuItems"
            :current-path="currentPath3"
            app-name="Clínica Multi"
            app-subtitle="Especialidades Médicas"
            user-name="Dr. Carlos"
            background="bg-secondary/10"
            placement="in-flow"
            @navigate="handleNavigate3"
          />
          <div class="flex-1 overflow-auto p-6">
            <h3 class="text-lg font-semibold mb-4">Ícones Coloridos</h3>
            <div class="space-y-2 text-sm text-muted-foreground">
              <p>🎨 Suporta múltiplos formatos:</p>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>
                  <code class="px-1 bg-muted rounded">#ef4444</code>
                  - HEX
                </li>
                <li>
                  <code class="px-1 bg-muted rounded">rgb(139, 69, 19)</code>
                  - RGB
                </li>
                <li>
                  <code class="px-1 bg-muted rounded">var(--destructive)</code>
                  - CSS var
                </li>
                <li>
                  <code class="px-1 bg-muted rounded">text-blue-500</code>
                  - Tailwind
                </li>
              </ul>
            </div>
            <p class="text-sm text-primary font-medium mt-4">
              Página atual: {{ currentPath3 }}
            </p>
          </div>
        </div>
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
        <div class="flex h-full w-full">
          <CorpSidebar
            :items="basicMenuItems"
            :current-path="currentPath4"
            background="bg-primary/5"
            placement="in-flow"
            @navigate="handleNavigate4"
          >
            <!-- Custom Logo -->
            <template #logo="{ isCollapsed }">
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
                <div v-if="!isCollapsed" class="flex flex-col">
                  <span class="font-bold text-sm">MedTech</span>
                  <span class="text-xs text-muted-foreground">v2.0</span>
                </div>
              </div>
            </template>

            <!-- Custom Footer -->
            <template #footer="{ isCollapsed }">
              <div
                class="flex items-center gap-3 p-3 hover:bg-sidebar-accent rounded-lg cursor-pointer transition-colors"
              >
                <div
                  class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs font-bold text-white">DS</span>
                </div>
                <div v-if="!isCollapsed" class="flex-1">
                  <p class="text-sm font-medium">Dr. Silva</p>
                  <p class="text-xs text-muted-foreground">silva@medtech.com</p>
                </div>
                <CorpIcon v-if="!isCollapsed" icon="luc-log-out" :size="16" />
              </div>
            </template>
          </CorpSidebar>
          <div class="flex-1 overflow-auto p-6">
            <h3 class="text-lg font-semibold mb-4">Slots Customizados</h3>
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
            <p class="text-sm text-primary font-medium mt-4">
              Página atual: {{ currentPath4 }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 5: Header e Footer Customizados (Props) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          5. Header e Footer com Cores Customizadas
        </h2>
        <p class="text-sm text-muted-foreground">
          Use headerBackground e footerBackground para cores específicas
        </p>
      </div>

      <div
        class="h-[500px] border border-border rounded-lg overflow-hidden relative"
      >
        <div class="flex h-full w-full">
          <CorpSidebar
            :items="basicMenuItems"
            :current-path="currentPath5"
            app-name="Corp System"
            app-subtitle="Admin Panel"
            user-name="Admin User"
            background="bg-card"
            header-background="bg-primary"
            footer-background="bg-secondary"
            placement="in-flow"
            @navigate="handleNavigate5"
          />
          <div class="flex-1 overflow-auto p-6">
            <h3 class="text-lg font-semibold mb-4">Cores Customizadas</h3>
            <div class="space-y-2 text-sm text-muted-foreground">
              <p>
                ✅
                <code class="px-1 bg-muted rounded">
                  headerBackground="bg-primary"
                </code>
                - Header com fundo primary
              </p>
              <p>
                ✅
                <code class="px-1 bg-muted rounded">
                  footerBackground="bg-secondary"
                </code>
                - Footer com fundo secondary (destaque visual)
              </p>
              <p>
                ✅
                <code class="px-1 bg-muted rounded">background="bg-card"</code>
                - Conteúdo com fundo card
              </p>
              <p>💡 Combine com opacity e blur para efeitos glassmorphism</p>
            </div>
            <p class="text-sm text-primary font-medium mt-4">
              Página atual: {{ currentPath5 }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXEMPLO 6: Location Right (Sidebar à Direita) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          6. Location Right (Sidebar à Direita)
        </h2>
        <p class="text-sm text-muted-foreground">
          Sidebar posicionado à direita com location="right"
        </p>
      </div>

      <div
        class="h-[500px] border border-border rounded-lg overflow-hidden relative"
      >
        <div class="flex h-full w-full">
          <div class="flex-1 overflow-auto p-6">
            <h3 class="text-lg font-semibold mb-4">Conteúdo Principal</h3>
            <p class="text-muted-foreground mb-2">
              Sidebar à direita usando
              <code class="px-1 bg-muted rounded">location="right"</code>
            </p>
            <p class="text-sm text-primary font-medium mt-4">
              Página atual: {{ currentPath6 }}
            </p>
          </div>
          <CorpSidebar
            :items="basicMenuItems"
            :current-path="currentPath6"
            app-name="Right Panel"
            app-subtitle="Tools & Settings"
            user-name="Admin"
            background="bg-muted"
            placement="in-flow"
            location="right"
            @navigate="handleNavigate6"
          />
        </div>
      </div>
    </section>

    <!-- Bizu do Soldado -->
    <section class="p-4 bg-primary/10 border border-primary rounded-lg">
      <h3 class="font-semibold text-foreground mb-2">🔰 Bizu do Soldado</h3>
      <div class="space-y-1 text-sm text-muted-foreground">
        <p>
          ✅
          <strong>Sidebar Nativo</strong>
          : Componente standalone, sem dependências externas
        </p>
        <p>
          ✅
          <strong>currentPath prop</strong>
          : Controlled component (passa estado de fora) - Perfeito para testes
        </p>
        <p>
          ✅
          <strong>placement prop</strong>
          : in-flow (dentro do fluxo), fixed (fullscreen), absolute (overlay)
        </p>
        <p>
          ✅
          <strong>location prop</strong>
          : left ou right (Vuetify-like)
        </p>
        <p>
          🎯
          <strong>Nos exemplos</strong>
          : Usando apenas placement="in-flow" (contido) com location left/right
        </p>
        <p>
          ✅
          <strong>background props</strong>
          : Use
          <code class="px-1 bg-muted rounded">background</code>
          (global),
          <code class="px-1 bg-muted rounded">headerBackground</code>
          ,
          <code class="px-1 bg-muted rounded">footerBackground</code>
          para cores específicas
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
        <p>
          🔄
          <strong>Modo Controlado</strong>
          : Use currentPath + @navigate para testes (não navega de verdade)
        </p>
        <p>
          🔄
          <strong>Modo Não-Controlado</strong>
          : Sem currentPath, usa vue-router automaticamente
        </p>
      </div>
    </section>

    <!-- Guia de Uso -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">📘 Como Usar</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">1. Modo Controlado</h3>
          <pre
            class="text-xs bg-muted p-2 rounded overflow-x-auto"
          ><code>&lt;CorpSidebar
  :items="menu"
  :current-path="currentPath"
  @navigate="handleNavigate"
  app-name="App"
  placement="in-flow"
/&gt;</code></pre>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">2. Menu com Submenu</h3>
          <pre class="text-xs bg-muted p-2 rounded overflow-x-auto"><code>{
  label: 'Grupo',
  items: [{
    label: 'Item',
    icon: 'luc-users',
    children: [{
      label: 'Subitem',
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
  &lt;template #logo="{ isCollapsed }"&gt;
    &lt;!-- Custom logo --&gt;
  &lt;/template&gt;
  &lt;template #footer="{ isCollapsed }"&gt;
    &lt;!-- Custom footer --&gt;
  &lt;/template&gt;
&lt;/CorpSidebar&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>
