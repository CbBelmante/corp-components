<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  Command,
  CommandDialog,
  type ICommand,
  type ICommandGroup,
} from '@/components/ui/command';

// Estados
const selectedCommand = ref<ICommand | null>(null);

// Modo inline
const queryInline = ref('');

// Modo inline com input externo (showSearchField=false)
const queryExternal = ref('');

// Modo floating (slash commands)
const inputFloating = ref(''); // Input completo com "/"
const queryFloating = ref(''); // Query extraída (sem "/")
const floatingOpen = ref(false);

// Modo floating (click to open)
const queryFloatingClick = ref('');
const floatingClickOpen = ref(false);

// Modo floating persistent (slash commands - só fecha ao apagar "/")
const inputPersistent = ref('');
const queryPersistent = ref('');
const persistentOpen = ref(false);

// Modo modal
const queryModal = ref('');
const modalOpen = ref(false);

// Casos de uso
const queryCaseUse = ref('');

// Dados de exemplo - Navegação completa
const commands: ICommandGroup[] = [
  {
    id: 'pages',
    title: 'Páginas',
    icon: 'luc-layout-dashboard',
    items: [
      {
        id: 'home',
        value: 'home',
        label: 'Home',
        description: 'Página inicial',
        icon: 'luc-home',
      },
      {
        id: 'dashboard',
        value: 'dashboard',
        label: 'Dashboard',
        description: 'Painel',
        icon: 'luc-chart-bar',
      },
      {
        id: 'settings',
        value: 'settings',
        label: 'Settings',
        description: 'Configurações',
        icon: 'luc-settings',
      },
    ],
  },
  {
    id: 'actions',
    title: 'Ações',
    icon: 'luc-zap',
    items: [
      {
        id: 'new-file',
        value: 'new-file',
        label: 'New File',
        description: 'Criar arquivo',
        icon: 'luc-file-plus',
      },
      {
        id: 'save',
        value: 'save',
        label: 'Save',
        description: 'Salvar',
        icon: 'luc-save',
      },
      {
        id: 'export',
        value: 'export',
        label: 'Export',
        description: 'Exportar',
        icon: 'luc-download',
      },
    ],
  },
];

// Caso de uso: Lista simples de usuários (sem grupos)
const userCommands: ICommand[] = [
  {
    id: 'john',
    value: 'john',
    label: 'John Doe',
    description: 'Developer',
    icon: 'luc-user',
  },
  {
    id: 'jane',
    value: 'jane',
    label: 'Jane Smith',
    description: 'Designer',
    icon: 'luc-user',
  },
  {
    id: 'bob',
    value: 'bob',
    label: 'Bob Johnson',
    description: 'Manager',
    icon: 'luc-user-check',
  },
  {
    id: 'alice',
    value: 'alice',
    label: 'Alice Williams',
    description: 'QA Engineer',
    icon: 'luc-user',
  },
];

// Handlers
const handleSelect = (item: ICommand) => {
  selectedCommand.value = item;
  console.log('Selecionado:', item);
};

/**
 * Floating: Detecta "/" e controla abertura (estilo mnesis)
 *
 * Lógica customizável de abertura:
 * - Abre quando input começa com "/"
 * - Extrai query (texto após "/") para filtrar comandos
 * - Fecha quando remove o "/"
 *
 * Você pode customizar para:
 * - Digitar "@" para mentions
 * - Digitar "#" para hashtags
 * - Qualquer outro trigger
 */
const handleFloatingInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  // Se começa com "/", abre dropdown e extrai query
  if (value.startsWith('/')) {
    const query = value.substring(1); // Remove "/"
    queryFloating.value = query;

    if (!floatingOpen.value) {
      floatingOpen.value = true;
    }
  } else {
    // Não começa com "/" - fecha dropdown
    if (floatingOpen.value) {
      floatingOpen.value = false;
      queryFloating.value = '';
    }
  }
};

/**
 * Floating Persistent: Mesmo comportamento, mas com persistent=true
 * NÃO fecha ao clicar fora - só ao apagar "/"
 */
const handlePersistentInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value.startsWith('/')) {
    const query = value.substring(1);
    queryPersistent.value = query;

    if (!persistentOpen.value) {
      persistentOpen.value = true;
    }
  } else {
    if (persistentOpen.value) {
      persistentOpen.value = false;
      queryPersistent.value = '';
    }
  }
};

// Modal: Keyboard shortcut (Ctrl/Cmd + K)
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    modalOpen.value = !modalOpen.value;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="max-w-6xl space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">
        Command Palette - Testes Completos
      </h1>
      <p class="text-muted-foreground">
        6 Modos de Uso (incluindo Persistent 🔒) + Casos de Uso + Flexibilidade
        Total
      </p>
    </div>

    <!-- Status -->
    <div
      v-if="selectedCommand"
      class="p-4 bg-primary/10 border border-primary rounded-lg"
    >
      <p class="text-sm">
        <span class="font-medium">Selecionado:</span>
        <code class="ml-2 px-2 py-1 bg-primary/20 rounded">
          {{ selectedCommand.label }}
        </code>
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- MODO 1: INLINE (com search interno) -->
      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">
            1. Inline (Search Interno)
          </h2>
          <p class="text-sm text-muted-foreground">
            Componente fixo, sempre renderizado com input de busca
          </p>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <Command
            mode="inline"
            :items="commands"
            :query="queryInline"
            placeholder="Buscar comando..."
            empty-text="Nenhum comando encontrado"
            empty-hint="Tente buscar por 'home' ou 'settings'"
            class="h-[400px] rounded-lg border shadow-md"
            @select="handleSelect"
            @update:query="queryInline = $event"
          />
        </div>
      </section>

      <!-- MODO 2: INLINE (com input externo) -->
      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">
            2. Inline (Input Externo)
          </h2>
          <p class="text-sm text-muted-foreground">
            Command abaixo de input externo (showSearchField=false)
          </p>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg space-y-2">
          <!-- Input externo -->
          <input
            v-model="queryExternal"
            type="text"
            placeholder="Digite para filtrar..."
            class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <!-- Command sem search interno -->
          <Command
            mode="inline"
            :show-search-field="false"
            :items="commands"
            :query="queryExternal"
            class="h-[350px] rounded-lg border shadow-md"
            @select="handleSelect"
            @update:query="queryExternal = $event"
          />

          <p class="text-xs text-muted-foreground">
            💡 Input externo compartilha v-model:query com Command
          </p>
        </div>
      </section>

      <!-- MODO 3: FLOATING (slash commands) -->
      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">
            3. Floating (Slash Commands)
          </h2>
          <p class="text-sm text-muted-foreground">
            Flutua com position absolute, abre ao digitar "/" no input
          </p>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="relative">
            <!-- Input trigger -->
            <input
              v-model="inputFloating"
              type="text"
              placeholder="Digite / para abrir slash commands..."
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              @input="handleFloatingInput"
            />

            <!-- Command Floating (gerencia click outside automaticamente) -->
            <Command
              mode="floating"
              :is-open="floatingOpen"
              :items="commands"
              :query="queryFloating"
              placeholder="Buscar comando..."
              @select="
                item => {
                  handleSelect(item);
                  inputFloating = '';
                  queryFloating = '';
                  floatingOpen = false;
                }
              "
              @update:query="queryFloating = $event"
              @update:isOpen="floatingOpen = $event"
            />
          </div>

          <p class="mt-4 text-xs text-muted-foreground">
            💡 Digite
            <kbd class="px-1 py-0.5 bg-muted rounded text-xs">/</kbd>
            para abrir slash commands
          </p>
        </div>
      </section>

      <!-- MODO 4: FLOATING (click to open) -->
      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">
            4. Floating (Click to Open)
          </h2>
          <p class="text-sm text-muted-foreground">
            Flutua com position absolute, abre com click no input
          </p>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="relative">
            <!-- Input trigger -->
            <input
              v-model="queryFloatingClick"
              type="text"
              placeholder="Clique para ver opções..."
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              @focus="floatingClickOpen = true"
            />

            <!-- Command Floating (gerencia click outside automaticamente) -->
            <Command
              mode="floating"
              :is-open="floatingClickOpen"
              :items="commands"
              :query="queryFloatingClick"
              placeholder="Buscar..."
              @select="
                item => {
                  handleSelect(item);
                  queryFloatingClick = '';
                  floatingClickOpen = false;
                }
              "
              @update:query="queryFloatingClick = $event"
              @update:isOpen="floatingClickOpen = $event"
            />
          </div>

          <p class="mt-4 text-xs text-muted-foreground">
            💡 Click ou foco no input abre automaticamente (fecha ao clicar
            fora)
          </p>
        </div>
      </section>

      <!-- MODO 5: FLOATING PERSISTENT (slash) -->
      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">
            5. Floating Persistent
          </h2>
          <p class="text-sm text-muted-foreground">
            🔒 NÃO fecha ao clicar fora - só ao apagar "/"
          </p>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg">
          <div class="relative">
            <!-- Input trigger -->
            <input
              v-model="inputPersistent"
              type="text"
              placeholder="Digite / - só fecha se apagar o /"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              @input="handlePersistentInput"
            />

            <!-- Command Floating Persistent -->
            <Command
              mode="floating"
              persistent
              :is-open="persistentOpen"
              :items="commands"
              :query="queryPersistent"
              placeholder="Buscar comando..."
              empty-text="Nenhum slash command encontrado"
              empty-hint="Tente digitar '/home' ou '/settings'"
              empty-icon="luc-slash"
              :max-height="200"
              :min-width="400"
              @select="
                item => {
                  handleSelect(item);
                  inputPersistent = '';
                  queryPersistent = '';
                  persistentOpen = false;
                }
              "
              @update:query="queryPersistent = $event"
              @update:isOpen="persistentOpen = $event"
            />
          </div>

          <p class="mt-4 text-xs text-muted-foreground">
            🔒
            <strong>Persistent</strong>
            : Clicar fora NÃO fecha! Só apagando "/"
            <br />
            📏 Exemplo com
            <code class="px-1 bg-muted rounded">maxHeight="200"</code>
            e
            <code class="px-1 bg-muted rounded">minWidth="400"</code>
          </p>
        </div>
      </section>

      <!-- MODO 6: MODAL -->
      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">6. Modal</h2>
          <p class="text-sm text-muted-foreground">
            Dialog mode, fecha com ESC/click fora ou botão X
          </p>
        </div>

        <div class="p-4 bg-card border border-border rounded-lg space-y-4">
          <button
            @click="modalOpen = true"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Abrir Command Palette
          </button>

          <!-- CommandDialog gerencia overlay + ESC + click outside automaticamente -->
          <CommandDialog :open="modalOpen" @update:open="modalOpen = $event">
            <Command
              mode="inline"
              :items="commands"
              :query="queryModal"
              placeholder="Digite um comando..."
              class="border-0"
              @select="
                item => {
                  handleSelect(item);
                  modalOpen = false;
                  queryModal = '';
                }
              "
              @update:query="queryModal = $event"
            />
          </CommandDialog>

          <p class="text-xs text-muted-foreground">
            💡 Pressione
            <kbd class="px-2 py-1 bg-muted rounded text-xs">⌘K</kbd>
            ou
            <kbd class="px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd>
            em qualquer lugar. Fecha com ESC ou clicando fora.
          </p>
        </div>
      </section>
    </div>

    <!-- Casos de Uso -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          Casos de Uso: Flexibilidade
        </h2>
        <p class="text-sm text-muted-foreground">
          Lista simples (sem grupos), loading state, etc
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Lista Simples (sem grupos) -->
        <div class="space-y-2">
          <h3 class="font-medium text-sm">Lista Simples</h3>
          <Command
            :items="userCommands"
            :query="queryCaseUse"
            placeholder="Buscar usuário..."
            empty-text="Nenhum usuário encontrado"
            empty-hint="Digite o nome de um usuário"
            empty-icon="luc-user-x"
            class="rounded-lg border shadow-md h-[300px]"
            @select="handleSelect"
            @update:query="queryCaseUse = $event"
          />
        </div>

        <!-- Loading State -->
        <div class="space-y-2">
          <h3 class="font-medium text-sm">Loading State</h3>
          <Command
            :items="[]"
            loading
            loading-text="Buscando comandos..."
            class="rounded-lg border shadow-md h-[300px]"
          />
        </div>

        <!-- Com Grupos Completo -->
        <div class="space-y-2">
          <h3 class="font-medium text-sm">Grupos + Ícones + Descrição</h3>
          <Command
            :items="commands"
            placeholder="Buscar..."
            class="rounded-lg border shadow-md h-[300px]"
            @select="handleSelect"
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
          <strong>Modo Floating</strong>
          : O componente gerencia click outside automaticamente!
        </p>
        <p>
          ✅
          <strong>Modo Modal</strong>
          : CommandDialog gerencia ESC + click fora automaticamente!
        </p>
        <p>
          🔒
          <strong>Prop persistent</strong>
          : Use para desabilitar auto-close (útil para slash commands que só
          fecham ao apagar "/")
        </p>
        <p>
          📏
          <strong>Props de sizing</strong>
          : maxHeight (default: 300), maxWidth (default: 100%), minWidth
          (default: 320) - especialmente útil para floating mode
        </p>
        <p>
          💡
          <strong>emptyHint</strong>
          : Texto de dica adicional no empty state (ex: "Tente '/ajuda'")
        </p>
        <p>
          🎨
          <strong>emptyIcon</strong>
          : Customize o ícone do empty state (default: "luc-search", ex:
          "luc-user-x", "luc-slash", etc)
        </p>
        <p>
          🎯 Você só controla
          <strong>quando</strong>
          abre (slash "/", click, etc). O resto é automático!
        </p>
      </div>
    </section>

    <!-- Guia -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        📘 Quando usar cada modo?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">1. Inline + Search</h3>
          <ul class="space-y-1 text-xs text-muted-foreground">
            <li>✅ Filtros laterais</li>
            <li>✅ Navegação permanente</li>
            <li>✅ Seleção de configs</li>
          </ul>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">2. Inline (Externo)</h3>
          <ul class="space-y-1 text-xs text-muted-foreground">
            <li>✅ Input customizado</li>
            <li>✅ Multi-input (tags)</li>
            <li>✅ Query compartilhada</li>
          </ul>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">3. Floating (Slash)</h3>
          <ul class="space-y-1 text-xs text-muted-foreground">
            <li>✅ Slash commands (/)</li>
            <li>✅ Fecha ao clicar fora</li>
            <li>✅ Trigger customizado</li>
          </ul>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">4. Floating (Click)</h3>
          <ul class="space-y-1 text-xs text-muted-foreground">
            <li>✅ Autocomplete</li>
            <li>✅ Dropdown select</li>
            <li>✅ Opções contextuais</li>
          </ul>
        </div>
        <div
          class="p-4 bg-card border border-primary/50 rounded-lg bg-primary/5"
        >
          <h3 class="font-medium mb-2 text-sm">5. Floating Persistent 🔒</h3>
          <ul class="space-y-1 text-xs text-muted-foreground">
            <li>✅ Slash (só fecha /)</li>
            <li>✅ Não fecha ao clicar fora</li>
            <li>✅ Controle manual</li>
          </ul>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2 text-sm">6. Modal</h3>
          <ul class="space-y-1 text-xs text-muted-foreground">
            <li>✅ Palette global</li>
            <li>✅ Busca (Ctrl+K)</li>
            <li>✅ Ações app</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
