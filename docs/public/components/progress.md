# Progress

O componente `CorpProgressBar` é uma barra de progresso avançada com suporte a cores customizadas, animações, chunks, buffer e interatividade.

## Uso

Progress bars em sua forma mais simples mostram o progresso de uma operação.

:::corp-code
<CorpProgressBar :model-value="50" />

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgressBar } from 'corp-components'

const progress = ref(50)
</script>

<template>
  <CorpProgressBar :model-value="progress" />
</template>
```
:::

---

## Props

### ModelValue & Max

Use `model-value` para definir o valor atual (0-100 por padrão) e `max` para o valor máximo.

:::corp-code
<CorpProgressBar :model-value="30" class="mb-4" />
<CorpProgressBar :model-value="60" class="mb-4" />
<CorpProgressBar :model-value="100" class="mb-4" />
<CorpProgressBar :model-value="75" :max="150" />
:::

---

### Color

Use `color` para definir a cor da barra **e do fundo** (track deriva automaticamente com lighten 60%). Aceita cores semânticas ou customizadas (HEX, RGB, HSL).

:::corp-code
<CorpProgressBar :model-value="60" color="primary" class="mb-4" />
<CorpProgressBar :model-value="60" color="success" class="mb-4" />
<CorpProgressBar :model-value="60" color="warning" class="mb-4" />
<CorpProgressBar :model-value="60" color="destructive" class="mb-4" />
<CorpProgressBar :model-value="60" color="#8b5cf6" class="mb-4" />
<CorpProgressBar :model-value="60" color="#ec4899" />
:::

---

### Bar Color & Track Color

Use `barColor` para override da barra e `trackColor` para override do fundo. **Hierarquia**: `color` (semântico) → `barColor`/`trackColor` (overrides).

:::corp-code
<CorpProgressBar :model-value="60" bar-color="#10b981" class="mb-4" />
<CorpProgressBar :model-value="60" track-color="#fbbf24" class="mb-4" />
<CorpProgressBar :model-value="60" bar-color="#ef4444" track-color="#fecaca" />
:::

---

### Height

Use `height` para controlar a altura da barra. Aceita presets (`compact`, `regular`, `comfortable`) ou número em pixels.

:::corp-code
<CorpProgressBar :model-value="60" height="compact" class="mb-4" />
<CorpProgressBar :model-value="60" height="regular" class="mb-4" />
<CorpProgressBar :model-value="60" height="comfortable" class="mb-4" />
<CorpProgressBar :model-value="60" :height="8" class="mb-4" />
<CorpProgressBar :model-value="60" :height="16" />
:::

---

### Rounded

Use a prop `rounded` para controlar o border-radius. Aceita **13 presets**, classes Tailwind custom, valores CSS, números ou booleanos:

:::corp-code
<!-- Presets básicos -->
<CorpProgressBar :model-value="60" rounded="none" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="xs" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="sm" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="default" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="md" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="lg" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="xl" class="mb-4" />

<!-- Presets grandes -->
<CorpProgressBar :model-value="60" rounded="2xl" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="3xl" class="mb-4" />

<!-- Presets especiais -->
<CorpProgressBar :model-value="60" rounded="full" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="pill" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="circle" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="shaped" class="mb-4" />
:::

#### Rounded Custom (Classes Tailwind e CSS)

Além dos presets, aceita classes Tailwind, valores CSS, números (px) ou booleanos:

:::corp-code
<!-- Tailwind custom -->
<CorpProgressBar :model-value="60" rounded="rounded-2xl" class="mb-4" />

<!-- Número (convertido para px) -->
<CorpProgressBar :model-value="60" :rounded="16" class="mb-4" />
<CorpProgressBar :model-value="60" :rounded="0" class="mb-4" />

<!-- Booleano (true → full, false → none) -->
<CorpProgressBar :model-value="60" :rounded="true" class="mb-4" />
<CorpProgressBar :model-value="60" :rounded="false" class="mb-4" />

<!-- CSS value -->
<CorpProgressBar :model-value="60" rounded="8px" />
:::

---

## Animações

### Indeterminate

Use `indeterminate` para mostrar um loading infinito quando o progresso é desconhecido.

:::corp-code
<CorpProgressBar indeterminate class="mb-4" />
<CorpProgressBar indeterminate color="success" class="mb-4" />
<CorpProgressBar indeterminate color="#8b5cf6" />
:::

---

### Striped

Use `striped` para adicionar um padrão listrado animado.

:::corp-code
<CorpProgressBar :model-value="60" striped class="mb-4" />
<CorpProgressBar :model-value="60" striped color="success" class="mb-4" />
<CorpProgressBar :model-value="60" striped color="warning" />
:::

---

### Stream

Use `stream` para uma animação contínua e suave.

:::corp-code
<CorpProgressBar :model-value="60" stream class="mb-4" />
<CorpProgressBar :model-value="60" stream color="info" />
:::

---

## Buffer

Use `buffer-value` para mostrar uma barra secundária de buffer (útil para streaming/download).

:::corp-code
<CorpProgressBar :model-value="40" :buffer-value="70" class="mb-4" />
<CorpProgressBar :model-value="60" :buffer-value="85" color="success" class="mb-4" />
<CorpProgressBar :model-value="30" :buffer-value="60" buffer-color="#8b5cf6" />
:::

---

## Chunks

Use `chunk-count` para dividir a barra em pedaços discretos.

:::corp-code
<CorpProgressBar :model-value="60" :chunk-count="5" class="mb-4" />
<CorpProgressBar :model-value="75" :chunk-count="10" color="success" class="mb-4" />
<CorpProgressBar :model-value="40" :chunk-count="8" :chunk-gap="8" class="mb-4" />
<CorpProgressBar :model-value="50" :chunk-count="6" :chunk-width="40" />
:::

---

## Clickable

Use `clickable` para permitir que o usuário clique na barra para setar o valor.

:::corp-code
<CorpProgressBar :model-value="50" clickable @update:model-value="val => console.log('Novo valor:', val)" />
<p class="text-sm text-muted-foreground mt-2">Clique na barra acima para mudar o valor</p>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgressBar } from 'corp-components'

const progress = ref(50)
</script>

<template>
  <CorpProgressBar
    v-model="progress"
    clickable
  />
  <p>Valor: {{ progress }}%</p>
</template>
```
:::

---

## Opacidades

Use `opacity`, `bg-opacity` e `buffer-opacity` para controlar transparências.

:::corp-code
<CorpProgressBar :model-value="60" :opacity="0.5" class="mb-4" />
<CorpProgressBar :model-value="60" :bg-opacity="0.1" class="mb-4" />
<CorpProgressBar :model-value="40" :buffer-value="70" :buffer-opacity="0.3" />
:::

---

## Slot Default

Use o slot default para adicionar conteúdo dentro da barra (porcentagem, texto, etc).

:::corp-code
<CorpProgressBar :model-value="60" :height="24" class="mb-4">
  <template #default="{ value }">
    <div class="flex items-center justify-center h-full text-xs font-medium text-white">
      {{ value }}%
    </div>
  </template>
</CorpProgressBar>

<CorpProgressBar :model-value="75" :height="32" color="success">
  <template #default="{ value }">
    <div class="flex items-center justify-center h-full text-sm font-bold text-white">
      Progresso: {{ value }}%
    </div>
  </template>
</CorpProgressBar>
:::

---

## Slot Default + Overlay

Use ambos os slots juntos para ter texto na parte preenchida E centralizado na barra toda.

:::corp-code
<CorpProgressBar :model-value="35" :height="32">
  <template #default="{ value }">
    <div class="flex items-center justify-center h-full text-xs font-bold text-white">
      Preenchido: {{ value }}%
    </div>
  </template>
  <template #overlay="{ value }">
    <div class="text-sm font-bold text-foreground drop-shadow-lg">
      Total: {{ value }}%
    </div>
  </template>
</CorpProgressBar>
:::

---

## API Reference

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `model-value` | `number` | `0` | Valor atual do progresso |
| `max` | `number` | `100` | Valor máximo |
| `color` | `string` | `'primary'` | Cor da barra E track (track deriva com lighten 60%). Aceita semantic, HEX, RGB, HSL |
| `bar-color` | `string` | `undefined` | Override da barra. Aceita semantic, HEX, RGB, HSL |
| `track-color` | `string` | `undefined` | Override do track. Aceita semantic, HEX, RGB, HSL |
| `buffer-color` | `string` | `undefined` | Cor do buffer. Aceita semantic, HEX, RGB, HSL |
| `opacity` | `number` | `undefined` | Opacidade da barra (0-1) |
| `track-opacity` | `number` | `undefined` | Opacidade do track/fundo (0-1) |
| `buffer-opacity` | `number` | `undefined` | Opacidade do buffer (0-1) |
| `height` | `'compact'` \| `'regular'` \| `'comfortable'` \| `number` | `'regular'` | Altura da barra |
| `rounded` | `'none'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'full'` \| `'pill'` \| `'circle'` \| `'shaped'` \| `number` \| `boolean` | `'full'` | Arredondamento |
| `rounded-bar` | `boolean` | `false` | Arredonda a barra interna (não o container) |
| `indeterminate` | `boolean` | `false` | Loading infinito |
| `striped` | `boolean` | `false` | Padrão listrado animado |
| `stream` | `boolean` | `false` | Animação contínua |
| `reverse` | `boolean` | `false` | Inverte a direção |
| `buffer-value` | `number` | `0` | Valor da barra de buffer |
| `chunk-count` | `number` | `0` | Divide em N pedaços |
| `chunk-gap` | `number` | `4` | Espaço entre chunks (px) |
| `chunk-width` | `number` | `undefined` | Largura de cada chunk (px) |
| `clickable` | `boolean` | `false` | Permite clicar para setar valor |
| `active` | `boolean` | `true` | Mostra/esconde a barra (height: 0) |
| `class` | `string` | `undefined` | Classes CSS customizadas |

### Slots

| Slot | Props | Descrição |
|------|-------|-----------|
| `default` | `{ value: number, buffer: number }` | Conteúdo dentro da barra preenchida |
| `overlay` | `{ value: number, buffer: number }` | Conteúdo sobre toda a barra (centralizado em 100% da largura) |

### Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| `update:model-value` | `number` | Emitido quando o valor muda (clickable) |

---

## Exemplos Avançados

### Progress com Porcentagem

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgressBar :model-value="45" :height="28" color="success">
    <template #default="{ value }">
      <div class="flex items-center justify-center h-full text-xs font-bold text-white">
        {{ value }}% completo
      </div>
    </template>
  </CorpProgressBar>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgressBar } from 'corp-components'

const uploadProgress = ref(45)
</script>

<template>
  <CorpProgressBar :model-value="uploadProgress" :height="28" color="success">
    <template #default="{ value }">
      <div class="text-xs font-bold text-white">
        {{ value }}% completo
      </div>
    </template>
  </CorpProgressBar>
</template>
```
:::

---

### Download com Buffer

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgressBar
    :model-value="55"
    :buffer-value="80"
    stream
    color="info"
  />
  <p class="text-xs text-muted-foreground">Download: 55% | Buffer: 80%</p>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgressBar } from 'corp-components'

const downloaded = ref(55)
const buffered = ref(80)
</script>

<template>
  <CorpProgressBar
    :model-value="downloaded"
    :buffer-value="buffered"
    stream
    color="info"
  />
</template>
```
:::

---

### Skill Bars com Chunks

:::corp-code
<div class="space-y-4 max-w-md">
  <div>
    <p class="text-sm font-medium mb-2">Vue.js</p>
    <CorpProgressBar :model-value="90" :chunk-count="10" color="success" />
  </div>
  <div>
    <p class="text-sm font-medium mb-2">TypeScript</p>
    <CorpProgressBar :model-value="80" :chunk-count="10" color="#3178c6" />
  </div>
  <div>
    <p class="text-sm font-medium mb-2">Tailwind CSS</p>
    <CorpProgressBar :model-value="95" :chunk-count="10" color="#06b6d4" />
  </div>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { CorpProgressBar } from 'corp-components'
</script>

<template>
  <div>
    <p class="font-medium mb-2">Vue.js</p>
    <CorpProgressBar :model-value="90" :chunk-count="10" color="success" />
  </div>

  <div>
    <p class="font-medium mb-2">TypeScript</p>
    <CorpProgressBar :model-value="80" :chunk-count="10" color="#3178c6" />
  </div>
</template>
```
:::
