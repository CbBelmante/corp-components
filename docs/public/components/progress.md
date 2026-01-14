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
<CorpProgressBar :model-value="60" color="#8B4513" class="mb-4" />
<CorpProgressBar :model-value="60" color="#B87333" />
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

Use a prop `rounded` para controlar o border-radius. Aceita presets, classes Tailwind, valores CSS ou números:

:::corp-code
<!-- De reto a arredondado -->
<CorpProgressBar :model-value="50" rounded="none" color="#B7410E" class="mb-4" />
<CorpProgressBar :model-value="55" rounded="sm" color="#CD853F" class="mb-4" />
<CorpProgressBar :model-value="60" rounded="md" color="#6B8E23" class="mb-4" />
<CorpProgressBar :model-value="65" rounded="lg" color="#B87333" class="mb-4" />
<CorpProgressBar :model-value="70" rounded="xl" color="#8B4513" class="mb-4" />
<CorpProgressBar :model-value="75" rounded="full" color="#A0522D" />
:::

#### Rounded Custom

Aceita classes Tailwind, valores CSS, números (px) ou booleanos:

:::corp-code
<CorpProgressBar :model-value="60" :rounded="0" color="#CD5C5C" class="mb-4" />
<CorpProgressBar :model-value="65" :rounded="8" color="#D2691E" class="mb-4" />
<CorpProgressBar :model-value="70" rounded="12px" color="#556B2F" class="mb-4" />
<CorpProgressBar :model-value="75" :rounded="true" color="#8B6914" />
:::

#### Rounded Assimétrico

Use classes Tailwind para arredondamentos diferentes em cada lado:

:::corp-code
<CorpProgressBar :model-value="60" :height="10" color="#6B8E23" rounded="rounded-l-none rounded-r-full" class="mb-4" />
<CorpProgressBar :model-value="65" :height="10" color="#B87333" rounded="rounded-l-full rounded-r-none" class="mb-4" />
<CorpProgressBar :model-value="70" :height="10" color="#A0522D" rounded="rounded-l-sm rounded-r-xl" />
:::

---

## Animações

### Indeterminate

Use `indeterminate` para mostrar um loading infinito quando o progresso é desconhecido.

:::corp-code
<CorpProgressBar indeterminate class="mb-4" />
<CorpProgressBar indeterminate color="success" class="mb-4" />
<CorpProgressBar indeterminate color="#8B4513" />
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
<CorpProgressBar :model-value="30" :buffer-value="60" buffer-color="#8B4513" />
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
| `rounded` | `RoundedValue` | `'full'` | **13 presets**: default, none, xs, sm, md, lg, xl, 2xl, 3xl, full, pill, circle, shaped **OU** Tailwind class **OU** CSS value **OU** number (px) **OU** boolean (true=full, false=none) |
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

### Download com Buffer

:::corp-code
<div class="space-y-4">
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
<div class="space-y-4">
  <div>
    <p class="text-sm font-medium mb-2">Vue.js</p>
    <CorpProgressBar :model-value="90" :chunk-count="10" :chunk-width="40" color="success" />
  </div>
  <div>
    <p class="text-sm font-medium mb-2">TypeScript</p>
    <CorpProgressBar :model-value="80" :chunk-count="10" :chunk-width="40" color="#3178c6" />
  </div>
  <div>
    <p class="text-sm font-medium mb-2">Tailwind CSS</p>
    <CorpProgressBar :model-value="95" :chunk-count="10" :chunk-width="40" color="#06b6d4" />
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
