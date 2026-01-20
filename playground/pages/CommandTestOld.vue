<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  CorpCommand,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

// Estados
const selectedCommand = ref('');
const openDialog = ref(false);
const loading = ref(false);

// Dropdown state (como ChatInput)
const dropdownOpen = ref(false);
const dropdownQuery = ref('');
const dropdownContainer = ref<HTMLElement | null>(null);

// Dados de exemplo
const pages = [
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'dashboard', label: 'Dashboard', icon: '📊' },
  { value: 'settings', label: 'Settings', icon: '⚙️' },
  { value: 'profile', label: 'Profile', icon: '👤' },
];

const actions = [
  { value: 'new-file', label: 'New File', icon: '📄', shortcut: '⌘N' },
  { value: 'new-folder', label: 'New Folder', icon: '📁', shortcut: '⌘⇧N' },
  { value: 'save', label: 'Save', icon: '💾', shortcut: '⌘S' },
  { value: 'export', label: 'Export', icon: '📤', shortcut: '⌘E' },
];

const team = [
  { value: 'john', label: 'John Doe', role: 'Developer' },
  { value: 'jane', label: 'Jane Smith', role: 'Designer' },
  { value: 'bob', label: 'Bob Johnson', role: 'Manager' },
];

// Handlers
const handleSelect = (value: string) => {
  selectedCommand.value = value;
  console.log('Selecionado:', value);
};

const handleDialogSelect = (value: string) => {
  selectedCommand.value = value;
  openDialog.value = false;
};

const handleDropdownSelect = (value: string) => {
  selectedCommand.value = value;
  dropdownOpen.value = false;
  dropdownQuery.value = '';
};

const handleInputFocus = () => {
  dropdownOpen.value = true;
};

// Click fora fecha o dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target as Node)
  ) {
    dropdownOpen.value = false;
  }
};

// Keyboard shortcut (Ctrl/Cmd + K)
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    openDialog.value = !openDialog.value;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="max-w-6xl space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Command Palette</h1>
      <p class="text-muted-foreground">
        Exemplos de uso do Command Palette com busca e navegação por teclado
      </p>
    </div>

    <!-- Status -->
    <div
      v-if="selectedCommand"
      class="p-4 bg-primary/10 border border-primary rounded-lg"
    >
      <p class="text-sm">
        <span class="font-medium">Último comando:</span>
        <code class="ml-2 px-2 py-1 bg-primary/20 rounded">
          {{ selectedCommand }}
        </code>
      </p>
    </div>

    <!-- 1. Command Básico -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">1. Command Básico</h2>
        <p class="text-sm text-muted-foreground">
          Command inline simples com busca
        </p>
      </div>

      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpCommand class="rounded-lg border shadow-md">
          <CorpCommandInput placeholder="Digite para buscar..." />
          <CorpCommandList>
            <CorpCommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CorpCommandGroup heading="Páginas">
              <CorpCommandItem
                v-for="page in pages"
                :key="page.value"
                :value="page.value"
                @select="handleSelect"
              >
                <span class="mr-2">{{ page.icon }}</span>
                <span>{{ page.label }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CorpCommand>
      </div>
    </section>

    <!-- 2. Command com Múltiplos Grupos -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          2. Command com Múltiplos Grupos
        </h2>
        <p class="text-sm text-muted-foreground">
          Grupos separados com separadores visuais
        </p>
      </div>

      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpCommand class="rounded-lg border shadow-md">
          <CorpCommandInput placeholder="Buscar páginas ou ações..." />
          <CorpCommandList>
            <CorpCommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

            <CorpCommandGroup heading="Páginas">
              <CorpCommandItem
                v-for="page in pages"
                :key="page.value"
                :value="page.value"
                @select="handleSelect"
              >
                <span class="mr-2">{{ page.icon }}</span>
                <span>{{ page.label }}</span>
              </CommandItem>
            </CommandGroup>

            <CorpCommandSeparator />

            <CorpCommandGroup heading="Ações">
              <CorpCommandItem
                v-for="action in actions"
                :key="action.value"
                :value="action.value"
                @select="handleSelect"
              >
                <span class="mr-2">{{ action.icon }}</span>
                <span>{{ action.label }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CorpCommand>
      </div>
    </section>

    <!-- 3. Command com Shortcuts -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          3. Command com Keyboard Shortcuts
        </h2>
        <p class="text-sm text-muted-foreground">
          Mostra atalhos de teclado ao lado dos comandos
        </p>
      </div>

      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpCommand class="rounded-lg border shadow-md">
          <CorpCommandInput placeholder="Buscar ações..." />
          <CorpCommandList>
            <CorpCommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CorpCommandGroup heading="Ações">
              <CorpCommandItem
                v-for="action in actions"
                :key="action.value"
                :value="action.value"
                @select="handleSelect"
              >
                <span class="mr-2">{{ action.icon }}</span>
                <span class="flex-1">{{ action.label }}</span>
                <CorpCommandShortcut>{{ action.shortcut }}</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CorpCommand>
      </div>
    </section>

    <!-- 4. Command Dropdown (Posicionado) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          4. Command Dropdown (Posicionado)
        </h2>
        <p class="text-sm text-muted-foreground">
          Command que abre como dropdown abaixo do input (estilo ChatInput)
        </p>
      </div>

      <div class="p-4 bg-card border border-border rounded-lg">
        <div ref="dropdownContainer" class="relative max-w-md">
          <!-- Input trigger -->
          <input
            v-model="dropdownQuery"
            type="text"
            placeholder="Digite / para ver comandos..."
            class="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            @focus="handleInputFocus"
            @input="dropdownOpen = true"
          />

          <!-- Dropdown absoluto -->
          <div
            v-if="dropdownOpen"
            class="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <CorpCommand class="rounded-lg border shadow-lg bg-popover">
              <CorpCommandList>
                <CorpCommandEmpty>Digite para buscar...</CommandEmpty>

                <CorpCommandGroup heading="Navegação">
                  <CorpCommandItem
                    v-for="page in pages"
                    :key="page.value"
                    :value="page.value"
                    @select="handleDropdownSelect"
                  >
                    <span class="mr-2">{{ page.icon }}</span>
                    <span>{{ page.label }}</span>
                  </CommandItem>
                </CommandGroup>

                <CorpCommandSeparator />

                <CorpCommandGroup heading="Ações">
                  <CorpCommandItem
                    v-for="action in actions.slice(0, 3)"
                    :key="action.value"
                    :value="action.value"
                    @select="handleDropdownSelect"
                  >
                    <span class="mr-2">{{ action.icon }}</span>
                    <span>{{ action.label }}</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CorpCommand>
          </div>
        </div>

        <p class="mt-4 text-xs text-muted-foreground">
          💡 Clique no input ou digite para abrir o dropdown
        </p>
      </div>
    </section>

    <!-- 5. Command Dialog (Modal) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          5. Command Dialog (Modal)
        </h2>
        <p class="text-sm text-muted-foreground">
          Command palette em modal - Pressione
          <kbd class="px-2 py-1 bg-muted rounded text-xs">⌘K</kbd>
          ou
          <kbd class="px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd>
        </p>
      </div>

      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <button
          @click="openDialog = true"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Abrir Command Palette
        </button>

        <CommandDialog :open="openDialog" @update:open="openDialog = $event">
          <CorpCommandInput placeholder="Digite um comando ou busca..." />
          <CorpCommandList>
            <CorpCommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

            <CorpCommandGroup heading="Navegação">
              <CorpCommandItem
                v-for="page in pages"
                :key="page.value"
                :value="page.value"
                @select="handleDialogSelect"
              >
                <span class="mr-2">{{ page.icon }}</span>
                <span>{{ page.label }}</span>
              </CommandItem>
            </CommandGroup>

            <CorpCommandSeparator />

            <CorpCommandGroup heading="Ações">
              <CorpCommandItem
                v-for="action in actions"
                :key="action.value"
                :value="action.value"
                @select="handleDialogSelect"
              >
                <span class="mr-2">{{ action.icon }}</span>
                <span class="flex-1">{{ action.label }}</span>
                <CorpCommandShortcut>{{ action.shortcut }}</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </section>

    <!-- 6. Command com Descrições -->
    <section class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          6. Command com Descrições
        </h2>
        <p class="text-sm text-muted-foreground">
          Items com título e descrição secundária
        </p>
      </div>

      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpCommand class="rounded-lg border shadow-md">
          <CorpCommandInput placeholder="Buscar membros do time..." />
          <CorpCommandList>
            <CorpCommandEmpty>Nenhum membro encontrado.</CommandEmpty>
            <CorpCommandGroup heading="Time">
              <CorpCommandItem
                v-for="member in team"
                :key="member.value"
                :value="member.value"
                @select="handleSelect"
              >
                <div class="flex flex-col">
                  <span class="font-medium">{{ member.label }}</span>
                  <span class="text-xs text-muted-foreground">
                    {{ member.role }}
                  </span>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CorpCommand>
      </div>
    </section>

    <!-- Features -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">✨ Features</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2">Navegação</h3>
          <ul class="space-y-1 text-sm text-muted-foreground">
            <li>↑↓ Navegar items</li>
            <li>Enter Selecionar</li>
            <li>Esc Fechar</li>
            <li>⌘K Abrir dialog</li>
          </ul>
        </div>
        <div class="p-4 bg-card border border-border rounded-lg">
          <h3 class="font-medium mb-2">Funcionalidades</h3>
          <ul class="space-y-1 text-sm text-muted-foreground">
            <li>✅ Busca em tempo real</li>
            <li>✅ Grupos organizados</li>
            <li>✅ Keyboard shortcuts</li>
            <li>✅ ARIA compliant</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
