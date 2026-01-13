# Progress

O componente `CorpProgress` é uma barra de progresso avançada com suporte a cores customizadas, animações, chunks, buffer e interatividade.

## Uso

Progress bars em sua forma mais simples mostram o progresso de uma operação.

:::corp-code
<CorpProgress :model-value="50" />

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgress } from 'corp-components'

const progress = ref(50)
</script>

<template>
  <CorpProgress :model-value="progress" />
</template>
```
:::

---

## Props

### ModelValue & Max

Use `model-value` para definir o valor atual (0-100 por padrão) e `max` para o valor máximo.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="30" />
  <CorpProgress :model-value="60" />
  <CorpProgress :model-value="100" />
  <CorpProgress :model-value="75" :max="150" />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpProgress :model-value="30" />
  <CorpProgress :model-value="60" />
  <CorpProgress :model-value="100" />

  <!-- Com max customizado (75/150 = 50%) -->
  <CorpProgress :model-value="75" :max="150" />
</template>
```
:::

---

### Color

Use `color` para definir a cor da barra. Aceita cores semânticas ou customizadas (HEX, RGB, HSL).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" color="primary" />
  <CorpProgress :model-value="60" color="success" />
  <CorpProgress :model-value="60" color="warning" />
  <CorpProgress :model-value="60" color="destructive" />
  <CorpProgress :model-value="60" color="#8b5cf6" />
  <CorpProgress :model-value="60" color="#ec4899" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Cores semânticas -->
  <CorpProgress :model-value="60" color="primary" />
  <CorpProgress :model-value="60" color="success" />
  <CorpProgress :model-value="60" color="warning" />

  <!-- Cores customizadas (HEX) -->
  <CorpProgress :model-value="60" color="#8b5cf6" />
  <CorpProgress :model-value="60" color="#ec4899" />
</template>
```
:::

---

### Height

Use `height` para controlar a altura da barra. Aceita presets (`compact`, `regular`, `comfortable`) ou número em pixels.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" height="compact" />
  <CorpProgress :model-value="60" height="regular" />
  <CorpProgress :model-value="60" height="comfortable" />
  <CorpProgress :model-value="60" :height="8" />
  <CorpProgress :model-value="60" :height="16" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Presets -->
  <CorpProgress :model-value="60" height="compact" />
  <CorpProgress :model-value="60" height="regular" />
  <CorpProgress :model-value="60" height="comfortable" />

  <!-- Altura customizada (px) -->
  <CorpProgress :model-value="60" :height="8" />
  <CorpProgress :model-value="60" :height="16" />
</template>
```
:::

---

### Rounded

Use `rounded` para controlar o arredondamento. Aceita presets Vuetify-like (`none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`, `pill`, `circle`, `shaped`) ou número em pixels, ou boolean.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" rounded="none" />
  <CorpProgress :model-value="60" rounded="sm" />
  <CorpProgress :model-value="60" rounded="md" />
  <CorpProgress :model-value="60" rounded="lg" />
  <CorpProgress :model-value="60" rounded="full" />
  <CorpProgress :model-value="60" :rounded="8" />
  <CorpProgress :model-value="60" :rounded="false" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Presets -->
  <CorpProgress :model-value="60" rounded="none" />
  <CorpProgress :model-value="60" rounded="sm" />
  <CorpProgress :model-value="60" rounded="full" />

  <!-- Número (px) -->
  <CorpProgress :model-value="60" :rounded="8" />

  <!-- Boolean (true = full, false = none) -->
  <CorpProgress :model-value="60" :rounded="false" />
</template>
```
:::

---

## Animações

### Indeterminate

Use `indeterminate` para mostrar um loading infinito quando o progresso é desconhecido.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress indeterminate />
  <CorpProgress indeterminate color="success" />
  <CorpProgress indeterminate color="#8b5cf6" />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpProgress indeterminate />
  <CorpProgress indeterminate color="success" />
  <CorpProgress indeterminate color="#8b5cf6" />
</template>
```
:::

---

### Striped

Use `striped` para adicionar um padrão listrado animado.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" striped />
  <CorpProgress :model-value="60" striped color="success" />
  <CorpProgress :model-value="60" striped color="warning" />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpProgress :model-value="60" striped />
  <CorpProgress :model-value="60" striped color="success" />
  <CorpProgress :model-value="60" striped color="warning" />
</template>
```
:::

---

### Stream

Use `stream` para uma animação contínua e suave.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" stream />
  <CorpProgress :model-value="60" stream color="info" />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpProgress :model-value="60" stream />
  <CorpProgress :model-value="60" stream color="info" />
</template>
```
:::

---

## Buffer

Use `buffer-value` para mostrar uma barra secundária de buffer (útil para streaming/download).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="40" :buffer-value="70" />
  <CorpProgress :model-value="60" :buffer-value="85" color="success" />
  <CorpProgress :model-value="30" :buffer-value="60" buffer-color="#8b5cf6" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Buffer padrão -->
  <CorpProgress :model-value="40" :buffer-value="70" />

  <!-- Buffer com cor customizada -->
  <CorpProgress :model-value="60" :buffer-value="85" color="success" />
  <CorpProgress :model-value="30" :buffer-value="60" buffer-color="#8b5cf6" />
</template>
```
:::

---

## Chunks

Use `chunk-count` para dividir a barra em pedaços discretos.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" :chunk-count="5" />
  <CorpProgress :model-value="75" :chunk-count="10" color="success" />
  <CorpProgress :model-value="40" :chunk-count="8" :chunk-gap="8" />
  <CorpProgress :model-value="50" :chunk-count="6" :chunk-width="40" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- 5 chunks -->
  <CorpProgress :model-value="60" :chunk-count="5" />

  <!-- 10 chunks -->
  <CorpProgress :model-value="75" :chunk-count="10" color="success" />

  <!-- Custom gap entre chunks -->
  <CorpProgress :model-value="40" :chunk-count="8" :chunk-gap="8" />

  <!-- Custom largura dos chunks -->
  <CorpProgress :model-value="50" :chunk-count="6" :chunk-width="40" />
</template>
```
:::

---

## Clickable

Use `clickable` para permitir que o usuário clique na barra para setar o valor.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="50" clickable @update:model-value="val => console.log('Novo valor:', val)" />
  <p class="text-sm text-muted-foreground">Clique na barra acima para mudar o valor</p>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgress } from 'corp-components'

const progress = ref(50)
</script>

<template>
  <CorpProgress
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
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" :opacity="0.5" />
  <CorpProgress :model-value="60" :bg-opacity="0.1" />
  <CorpProgress :model-value="40" :buffer-value="70" :buffer-opacity="0.3" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Bar opacity -->
  <CorpProgress :model-value="60" :opacity="0.5" />

  <!-- Background opacity -->
  <CorpProgress :model-value="60" :bg-opacity="0.1" />

  <!-- Buffer opacity -->
  <CorpProgress :model-value="40" :buffer-value="70" :buffer-opacity="0.3" />
</template>
```
:::

---

## Slot Default

Use o slot default para adicionar conteúdo dentro da barra (porcentagem, texto, etc).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="60" :height="24">
    <template #default="{ value }">
      <div class="flex items-center justify-center h-full text-xs font-medium text-white">
        {{ value }}%
      </div>
    </template>
  </CorpProgress>

  <CorpProgress :model-value="75" :height="32" color="success">
    <template #default="{ value }">
      <div class="flex items-center justify-center h-full text-sm font-bold text-white">
        Progresso: {{ value }}%
      </div>
    </template>
  </CorpProgress>
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpProgress :model-value="60" :height="24">
    <template #default="{ value }">
      <div class="text-xs text-white font-medium">
        {{ value }}%
      </div>
    </template>
  </CorpProgress>
</template>
```
:::

---

## API Reference

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `model-value` | `number` | `0` | Valor atual do progresso |
| `max` | `number` | `100` | Valor máximo |
| `color` | `string` | `'primary'` | Cor da barra (semantic ou HEX/RGB/HSL) |
| `buffer-color` | `string` | `undefined` | Cor da barra de buffer |
| `opacity` | `number` | `undefined` | Opacidade da barra (0-1) |
| `bg-opacity` | `number` | `undefined` | Opacidade do background (0-1) |
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

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:model-value` | `number` | Emitido quando o valor muda (clickable) |

### Slots

| Slot | Props | Descrição |
|------|-------|-----------|
| `default` | `{ value: number, buffer: number }` | Conteúdo dentro da barra |

---

## Exemplos Avançados

### Progress com Porcentagem

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress :model-value="45" :height="28" color="success">
    <template #default="{ value }">
      <div class="flex items-center justify-center h-full text-xs font-bold text-white">
        {{ value }}% completo
      </div>
    </template>
  </CorpProgress>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpProgress } from 'corp-components'

const uploadProgress = ref(45)
</script>

<template>
  <CorpProgress :model-value="uploadProgress" :height="28" color="success">
    <template #default="{ value }">
      <div class="text-xs font-bold text-white">
        {{ value }}% completo
      </div>
    </template>
  </CorpProgress>
</template>
```
:::

---

### Download com Buffer

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpProgress
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
import { CorpProgress } from 'corp-components'

const downloaded = ref(55)
const buffered = ref(80)
</script>

<template>
  <CorpProgress
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
    <CorpProgress :model-value="90" :chunk-count="10" color="success" />
  </div>
  <div>
    <p class="text-sm font-medium mb-2">TypeScript</p>
    <CorpProgress :model-value="80" :chunk-count="10" color="#3178c6" />
  </div>
  <div>
    <p class="text-sm font-medium mb-2">Tailwind CSS</p>
    <CorpProgress :model-value="95" :chunk-count="10" color="#06b6d4" />
  </div>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { CorpProgress } from 'corp-components'
</script>

<template>
  <div>
    <p class="font-medium mb-2">Vue.js</p>
    <CorpProgress :model-value="90" :chunk-count="10" color="success" />
  </div>

  <div>
    <p class="font-medium mb-2">TypeScript</p>
    <CorpProgress :model-value="80" :chunk-count="10" color="#3178c6" />
  </div>
</template>
```
:::
