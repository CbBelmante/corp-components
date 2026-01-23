# Command

O componente `CorpCommand` é um command palette avançado com filtro inteligente (deburr), navegação por teclado, suporte a grupos de comandos e 3 modos de exibição (inline, floating, dialog).

## Uso

Command palettes em sua forma mais simples contêm uma lista de comandos navegáveis.

:::corp-code
<CorpCommand
  v-model:query="queryCommandInline"
  :items="commandItems"
  placeholder="Buscar comando..."
  class="h-[400px] rounded-lg border shadow-md"
  @select="handleCommandSelect"
/>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpCommand } from 'corp-components'

const query = ref('')
const commands = [
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
        description: 'Painel de controle',
        icon: 'luc-chart-bar',
      },
    ],
  },
]

const handleSelect = (item) => {
  console.log('Selecionado:', item)
}
</script>

<template>
  <CorpCommand
    v-model:query="query"
    :items="commands"
    placeholder="Buscar comando..."
    class="h-[400px]"
    @select="handleSelect"
  />
</template>
```
:::

---

## Modos de Exibição

O `CorpCommand` possui 3 modos: **inline** (padrão), **floating** (popover) e **dialog** (modal).

### Inline

Componente fixo, sempre renderizado. Ideal para sidebars, painéis laterais.

:::corp-code
<CorpCommand
  mode="inline"
  v-model:query="queryCommandInline"
  :items="commandItems"
  placeholder="Buscar comando..."
  class="h-[350px] rounded-lg border shadow-md"
  @select="handleCommandSelect"
/>

<!-- @disp-code -->
```vue
<template>
  <CorpCommand
    mode="inline"
    v-model:query="query"
    :items="commands"
    class="h-[400px]"
  />
</template>
```
:::

### Floating

Popover flutuante ancorado a um elemento. Ideal para autocomplete, slash commands.

:::corp-code
<div class="p-4 bg-card border border-border rounded-lg overflow-visible">
  <div class="relative overflow-visible">
    <!-- Input trigger -->
    <input
      ref="floatingInputRef1"
      v-model="inputCommandFloating1"
      type="text"
      placeholder="Digite / para abrir comandos..."
      class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      @input="handleCommandFloating1Input"
    />

    <!-- Command Floating (fecha ao clicar fora automaticamente) -->
    <CorpCommand
      mode="floating"
      v-model:open="floatingCommandOpen1"
      :anchor-el="floatingInputRef1"
      :show-search-field="false"
      :items="commandItems"
      :query="queryCommandFloating1"
      @select="item => {
        handleCommandSelect(item);
        inputCommandFloating1 = '';
        queryCommandFloating1 = '';
        floatingCommandOpen1 = false;
      }"
      @update:open="val => {
        if (!val) {
          inputCommandFloating1 = '';
          queryCommandFloating1 = '';
        }
      }"
      @update:query="queryCommandFloating1 = $event"
    />
  </div>

  <p class="mt-4 text-xs text-muted-foreground">
    Digite <kbd class="px-1 py-0.5 bg-muted rounded text-xs">/</kbd> para abrir
  </p>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const inputText = ref('')
const query = ref('')
const isOpen = ref(false)

const handleInput = (event) => {
  const value = event.target.value

  if (value.startsWith('/')) {
    query.value = value.substring(1)
    isOpen.value = true
  } else {
    isOpen.value = false
    query.value = ''
  }
}
</script>

<template>
  <div class="relative">
    <input
      ref="inputRef"
      v-model="inputText"
      @input="handleInput"
      placeholder="Digite / para comandos..."
    />

    <CorpCommand
      mode="floating"
      v-model:open="isOpen"
      :anchor-el="inputRef"
      :show-search-field="false"
      :items="commands"
      :query="query"
      @select="handleSelect"
      @update:open="val => {
        if (!val) {
          inputText = '';
          query = '';
        }
      }"
    />
  </div>
</template>
```
:::

### Dialog

Modal com overlay. Ideal para command palette global (Cmd+K).

:::corp-code
<div>
  <CorpButton @click="modalCommandOpen = true">
    Abrir Command Palette
    <kbd class="ml-2 px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd>
  </CorpButton>

  <CorpCommand
    mode="dialog"
    v-model:open="modalCommandOpen"
    :items="commandItems"
    :query="queryCommandModal"
    placeholder="Digite um comando..."
    @select="item => {
      handleCommandSelect(item);
      modalCommandOpen = false;
      queryCommandModal = '';
    }"
    @update:query="queryCommandModal = $event"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const query = ref('')

// Atalho Cmd+K ou Ctrl+K
const handleKeyDown = (e) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <CorpCommand
    mode="dialog"
    v-model:open="isOpen"
    :items="commands"
    v-model:query="query"
  />
</template>
```
:::

---

## Props

### Items

A prop `items` aceita dois formatos:

| Formato | Descrição | Exemplo |
|---------|-----------|---------|
| **Comandos Simples** | Array de objetos `ICommand` | `[{id, value, label, icon, description}]` |
| **Grupos de Comandos** | Array de objetos `ICommandGroup` | `[{id, title, icon, items: ICommand[]}]` |

#### Comandos Simples

:::corp-code
<CorpCommand
  v-model:query="queryCommandInline"
  :items="simpleCommandItems"
  placeholder="Ações rápidas..."
  class="h-[300px] rounded-lg border shadow-md"
  @select="handleCommandSelect"
/>

<!-- @disp-code -->
```vue
<script setup>
const commands = [
  {
    id: 'copy',
    value: 'copy',
    label: 'Copiar',
    description: 'Copiar para área de transferência',
    icon: 'luc-copy',
  },
  {
    id: 'paste',
    value: 'paste',
    label: 'Colar',
    description: 'Colar da área de transferência',
    icon: 'luc-clipboard',
  },
]
</script>

<template>
  <CorpCommand :items="commands" />
</template>
```
:::

#### Grupos de Comandos

:::corp-code
<CorpCommand
  v-model:query="queryCommandInline"
  :items="commandItems"
  placeholder="Buscar em grupos..."
  class="h-[400px] rounded-lg border shadow-md"
  @select="handleCommandSelect"
/>

<!-- @disp-code -->
```vue
<script setup>
const commands = [
  {
    id: 'pages',
    title: 'Páginas',
    icon: 'luc-layout-dashboard',
    items: [
      { id: 'home', value: 'home', label: 'Home', icon: 'luc-home' },
      { id: 'settings', value: 'settings', label: 'Configurações', icon: 'luc-settings' },
    ],
  },
  {
    id: 'actions',
    title: 'Ações',
    icon: 'luc-zap',
    items: [
      { id: 'save', value: 'save', label: 'Salvar', icon: 'luc-save' },
      { id: 'export', value: 'export', label: 'Exportar', icon: 'luc-download' },
    ],
  },
]
</script>

<template>
  <CorpCommand :items="commands" />
</template>
```
:::

### Show Search Field

Use `:show-search-field="false"` para ocultar o input interno. Útil quando há um input externo.

:::corp-code
<div class="space-y-2 max-w-md">
  <!-- Input externo -->
  <input
    v-model="queryCommandExternal"
    type="text"
    placeholder="Filtrar comandos externamente..."
    class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <!-- Command sem input interno -->
  <CorpCommand
    mode="inline"
    :show-search-field="false"
    :items="commandItems"
    :query="queryCommandExternal"
    class="h-[300px] rounded-lg border shadow-md"
    @select="handleCommandSelect"
    @update:query="queryCommandExternal = $event"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'

const query = ref('')
</script>

<template>
  <input v-model="query" placeholder="Filtrar..." />

  <CorpCommand
    :show-search-field="false"
    :items="commands"
    :query="query"
  />
</template>
```
:::

### Empty State

Customize o estado vazio com `empty-text`, `empty-hint` e `empty-icon`.

:::corp-code
<CorpCommand
  v-model:query="queryCommandInline"
  :items="[]"
  placeholder="Buscar..."
  empty-text="Nenhum comando disponível"
  empty-hint="Tente novamente mais tarde"
  empty-icon="luc-inbox"
  class="h-[300px] rounded-lg border shadow-md"
/>

<!-- @disp-code -->
```vue
<template>
  <CorpCommand
    :items="[]"
    empty-text="Nenhum resultado"
    empty-hint="Refine sua busca"
    empty-icon="luc-search-x"
  />
</template>
```
:::

### Persistent Mode

Use `persistent` para desabilitar auto-close ao clicar fora (floating) ou ESC (dialog).

:::corp-code
<div class="p-4 bg-card border border-border rounded-lg overflow-visible">
  <div class="relative overflow-visible">
    <input
      ref="floatingInputRef2"
      v-model="inputCommandFloating2"
      type="text"
      placeholder="Digite / - só fecha ao apagar o /"
      class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      @input="handleCommandFloating2Input"
    />

    <CorpCommand
      mode="floating"
      persistent
      v-model:open="floatingCommandOpen2"
      :anchor-el="floatingInputRef2"
      :show-search-field="false"
      :items="commandItems"
      :query="queryCommandFloating2"
      @select="item => {
        handleCommandSelect(item);
        inputCommandFloating2 = '';
        queryCommandFloating2 = '';
        floatingCommandOpen2 = false;
      }"
      @update:query="queryCommandFloating2 = $event"
    />
  </div>

  <p class="mt-4 text-xs text-muted-foreground">
    🔒 <strong>Persistent:</strong> Clicar fora NÃO fecha! Só apagando "/"
  </p>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const isOpen = ref(false)
</script>

<template>
  <input ref="inputRef" />

  <CorpCommand
    mode="floating"
    persistent
    v-model:open="isOpen"
    :anchor-el="inputRef"
    :items="commands"
  />
</template>
```
:::

---

## Block e Align (Floating)

### Block Mode

Use `block` para fazer o popover ter a mesma largura do elemento anchor.

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const isOpen = ref(false)
</script>

<template>
  <input
    ref="inputRef"
    @focus="isOpen = true"
    class="w-[500px]"
  />

  <CorpCommand
    mode="floating"
    v-model:open="isOpen"
    :anchor-el="inputRef"
    block
    :items="commands"
  />
</template>
```
:::

### Align

Controle o alinhamento do popover em relação ao anchor: `start` (padrão), `center` ou `end`.

```vue
<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const isOpen = ref(false)
</script>

<template>
  <input
    ref="inputRef"
    @focus="isOpen = true"
  />

  <CorpCommand
    mode="floating"
    v-model:open="isOpen"
    :anchor-el="inputRef"
    align="end"
    :items="commands"
  />
</template>
```

---

## Dimensionamento

### Modo Inline

No modo `inline`, controle a altura via classes CSS no componente pai:

```vue
<CorpCommand
  mode="inline"
  class="h-[400px]"  <!-- altura via class -->
  :items="commands"
/>
```

### Modo Floating

No modo `floating`, use props `max-height`, `max-width` e `min-width`:

```vue
<script setup>
import { ref } from 'vue'

const inputRef = ref(null)
const isOpen = ref(false)
</script>

<template>
  <input
    ref="inputRef"
    @focus="isOpen = true"
  />

  <CorpCommand
    mode="floating"
    v-model:open="isOpen"
    :anchor-el="inputRef"
    :max-height="200"
    :max-width="500"
    :min-width="400"
    :items="commands"
  />
</template>
```

> **Padrão Floating:** `maxHeight: 300px`, `maxWidth: 100%`, `minWidth: 320px`

---

## Footer

O footer mostra dicas de navegação por teclado. Use `show-footer` e `footer-align`.

:::corp-code
<CorpCommand
  v-model:query="queryCommandInline"
  :items="commandItems"
  placeholder="Navegue com teclado..."
  :show-footer="true"
  footer-align="center"
  class="h-[350px] rounded-lg border shadow-md"
  @select="handleCommandSelect"
/>

<!-- @disp-code -->
```vue
<template>
  <CorpCommand
    :items="commands"
    :show-footer="true"
    footer-align="center"  <!-- left | center | right -->
  />
</template>
```
:::

---

## Cores Customizadas

Use `border-color` e `icon-color` para customizar cores dinamicamente.

:::corp-code
<div class="space-y-4">
  <CorpCommand
    v-model:query="queryCommandInline"
    :items="commandItems"
    placeholder="Borda roxa customizada..."
    border-color="purple"
    icon-color="purple"
    class="h-[300px] rounded-lg shadow-md"
    @select="handleCommandSelect"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Cores semânticas -->
  <CorpCommand
    border-color="primary"
    icon-color="primary"
    :items="commands"
  />

  <!-- Cores customizadas -->
  <CorpCommand
    border-color="#9333ea"
    icon-color="purple"
    :items="commands"
  />
</template>
```
:::

---

## Eventos

### @select

Emitido quando um item é selecionado.

```vue
<CorpCommand
  :items="commands"
  @select="(item) => console.log('Selecionado:', item)"
/>
```

### @update:query

Emitido quando o filtro de busca muda. Use com `v-model:query`.

```vue
<CorpCommand
  v-model:query="query"
  :items="commands"
  @update:query="(newQuery) => console.log('Query:', newQuery)"
/>
```

### @update:open

Emitido quando o estado de abertura muda (floating/dialog). Use com `v-model:open`.

```vue
<CorpCommand
  mode="floating"
  v-model:open="isOpen"
  @update:open="(newState) => console.log('Open:', newState)"
/>
```

### @close

Emitido quando o command fecha (após seleção ou click outside).

```vue
<CorpCommand
  mode="dialog"
  v-model:open="isOpen"
  @close="() => console.log('Fechado!')"
/>
```

---

## API Completa

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `mode` | `'inline' \| 'floating' \| 'dialog'` | `'inline'` | Modo de exibição |
| `items` | `(ICommand \| ICommandGroup)[]` | `[]` | Lista de comandos ou grupos |
| `query` | `string` | `''` | Query de filtro (v-model:query) |
| `open` | `boolean` | `true` | Estado de abertura (v-model:open) |
| `anchor-el` | `HTMLElement \| null` | `null` | Elemento âncora (floating mode) |
| `show-search-field` | `boolean` | `true` | Mostra input interno |
| `placeholder` | `string` | `'Digite para buscar...'` | Placeholder do input |
| `empty-text` | `string` | `'Nenhum resultado encontrado.'` | Texto do empty state |
| `empty-hint` | `string` | `''` | Dica adicional do empty state |
| `empty-icon` | `string` | `'luc-search'` | Ícone do empty state |
| `loading` | `boolean` | `false` | Estado de loading |
| `loading-text` | `string` | `'Carregando...'` | Texto do loading |
| `disabled` | `boolean` | `false` | Desabilita input |
| `persistent` | `boolean` | `false` | Desabilita auto-close |
| `max-height` | `string \| number` | `300` | Altura máxima (floating) |
| `max-width` | `string \| number` | `'100%'` | Largura máxima (floating) |
| `min-width` | `string \| number` | `320` | Largura mínima (floating) |
| `block` | `boolean` | `false` | Popover com largura do anchor (floating) |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alinhamento do popover (floating) |
| `animation` | `'scale' \| 'dropdown' \| 'fade' \| 'none' \| false` | `'dropdown'` | Tipo de animação (floating) |
| `debug-anchor` | `boolean` | `false` | Mostra anchor visível para debug (floating) |
| `border-color` | `string` | `undefined` | Cor da borda customizada |
| `icon-color` | `string` | `undefined` | Cor dos ícones |
| `density` | `'compact' \| 'regular' \| 'comfortable'` | `'regular'` | Espaçamento dos itens |
| `rounded` | `RoundedValue` | `'default'` | Border radius |
| `show-footer` | `boolean` | `true` | Mostra footer com dicas |
| `footer-align` | `'left' \| 'center' \| 'right'` | `'center'` | Alinhamento do footer |
| `footer-commands` | `{keys: string, label: string}[]` | `[{keys: '↑↓', label: 'Navegar'}, ...]` | Comandos customizados do footer |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `@select` | `ICommand` | Item selecionado |
| `@update:query` | `string` | Query alterada |
| `@update:open` | `boolean` | Estado de abertura alterado |
| `@close` | - | Command fechado |

### Types

```typescript
interface ICommand {
  id: string
  value: string
  label: string
  description?: string
  icon?: string
  disabled?: boolean
}

interface ICommandGroup {
  id: string
  title: string
  icon?: string
  items: ICommand[]
}
```

---

## Filtro Inteligente (Deburr)

O `CorpCommand` usa normalização automática de acentos (deburr) no filtro:

- Busca por **"medico"** encontra **"Médico"**
- Busca por **"configuracao"** encontra **"Configuração"**
- Case-insensitive por padrão

```vue
<CorpCommand
  :items="[
    { id: '1', value: 'medico', label: 'Médico', icon: 'luc-stethoscope' },
    { id: '2', value: 'cafe', label: 'Café', icon: 'luc-coffee' },
  ]"
/>
<!-- Buscar "medico" ou "cafe" (sem acentos) funciona! -->
```
