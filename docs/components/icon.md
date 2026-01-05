<script setup>
import { ref } from 'vue'
import { CorpIcon } from '@components/ui/icon'

const clickCount = ref(0)
</script>

# Icon

O componente `CorpIcon` exibe ícones Lucide com controle de tamanho, cor e stroke.

## Uso

<CodePreview>
  <CorpIcon name="luc-home" />
  <CorpIcon name="luc-settings" />
  <CorpIcon name="luc-user" />
  <CorpIcon name="luc-mail" />
  <CorpIcon name="luc-star" />

  <template #code>

```vue
<script setup>
import { CorpIcon } from 'corp-components'
</script>

<template>
  <CorpIcon name="luc-home" />
  <CorpIcon name="luc-settings" />
  <CorpIcon name="luc-user" />
  <CorpIcon name="luc-mail" />
  <CorpIcon name="luc-star" />
</template>
```

  </template>
</CodePreview>

## Formatos de Nome

Aceita múltiplos formatos de nome:

<CodePreview>
  <CorpIcon name="luc-user" />
  <CorpIcon name="user" />
  <CorpIcon name="User" />
  <CorpIcon name="user-plus" />
  <CorpIcon name="UserPlus" />

  <template #code>

```vue
<!-- Todos funcionam: -->
<CorpIcon name="luc-user" />     <!-- Prefixo luc- -->
<CorpIcon name="user" />         <!-- lowercase -->
<CorpIcon name="User" />         <!-- PascalCase -->
<CorpIcon name="user-plus" />    <!-- kebab-case -->
<CorpIcon name="UserPlus" />     <!-- PascalCase -->
```

  </template>
</CodePreview>

## Tamanhos

O tamanho padrão é `1em` (herda do texto). Use `size` para definir:

<CodePreview>
  <CorpIcon name="luc-star" size="12" />
  <CorpIcon name="luc-star" size="16" />
  <CorpIcon name="luc-star" size="24" />
  <CorpIcon name="luc-star" size="32" />
  <CorpIcon name="luc-star" size="2rem" />

  <template #code>

```vue
<CorpIcon name="luc-star" size="12" />     <!-- 12px -->
<CorpIcon name="luc-star" size="16" />     <!-- 16px -->
<CorpIcon name="luc-star" size="24" />     <!-- 24px -->
<CorpIcon name="luc-star" size="32" />     <!-- 32px -->
<CorpIcon name="luc-star" size="2rem" />   <!-- 2rem -->
```

  </template>
</CodePreview>

## Cores

Use `color` para definir a cor. O padrão é `currentColor` (herda do texto):

<CodePreview>
  <CorpIcon name="luc-heart" color="red" />
  <CorpIcon name="luc-check" color="green" />
  <CorpIcon name="luc-alert-circle" color="orange" />
  <CorpIcon name="luc-info" color="blue" />

  <template #code>

```vue
<CorpIcon name="luc-heart" color="red" />
<CorpIcon name="luc-check" color="green" />
<CorpIcon name="luc-alert-circle" color="orange" />
<CorpIcon name="luc-info" color="blue" />
```

  </template>
</CodePreview>

## Stroke Width

Controle a espessura do traço com `stroke-width`:

<CodePreview>
  <CorpIcon name="luc-circle" :stroke-width="1" :size="32" />
  <CorpIcon name="luc-circle" :stroke-width="2" :size="32" />
  <CorpIcon name="luc-circle" :stroke-width="3" :size="32" />

  <template #code>

```vue
<CorpIcon name="luc-circle" :stroke-width="1" />
<CorpIcon name="luc-circle" :stroke-width="2" />  <!-- Default -->
<CorpIcon name="luc-circle" :stroke-width="3" />
```

  </template>
</CodePreview>

## Start / End

Use `start` ou `end` para adicionar margem quando usado junto com texto:

<CodePreview>
  <span><CorpIcon name="luc-mail" start />Enviar email</span>
  <span>Próximo<CorpIcon name="luc-chevron-right" end /></span>

  <template #code>

```vue
<!-- Margem à direita (início do texto) -->
<span><CorpIcon name="luc-mail" start />Enviar email</span>

<!-- Margem à esquerda (fim do texto) -->
<span>Próximo<CorpIcon name="luc-chevron-right" end /></span>
```

  </template>
</CodePreview>

## Clickable

Ícones clicáveis com hover effect:

<CodePreview>
  <CorpIcon name="luc-heart" :size="24" clickable @click="clickCount++" />
  <CorpIcon name="luc-trash" :size="24" clickable color="red" />
  <CorpIcon name="luc-settings" :size="24" clickable />
  <span class="ml-4 text-sm">Cliques: {{ clickCount }}</span>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
const clickCount = ref(0)
</script>

<template>
  <CorpIcon name="luc-heart" clickable @click="clickCount++" />
  <CorpIcon name="luc-trash" clickable color="red" />
  <CorpIcon name="luc-settings" clickable />
</template>
```

  </template>
</CodePreview>

## Tag

Mude o elemento HTML renderizado:

<CodePreview>
  <CorpIcon name="luc-star" tag="i" :size="24" />
  <CorpIcon name="luc-star" tag="span" :size="24" />
  <CorpIcon name="luc-star" tag="div" :size="24" />

  <template #code>

```vue
<CorpIcon name="luc-star" tag="i" />    <!-- Default -->
<CorpIcon name="luc-star" tag="span" />
<CorpIcon name="luc-star" tag="div" />
```

  </template>
</CodePreview>

## Spinners

Ícones de loading giram automaticamente:

<CodePreview>
  <CorpIcon name="luc-loader-2" :size="24" />
  <CorpIcon name="luc-loader" :size="24" />
  <CorpIcon name="luc-refresh-cw" :size="24" />

  <template #code>

```vue
<!-- Giram automaticamente -->
<CorpIcon name="luc-loader-2" />
<CorpIcon name="luc-loader" />
<CorpIcon name="luc-refresh-cw" />
```

  </template>
</CodePreview>

## Disabled

<CodePreview>
  <CorpIcon name="luc-star" :size="24" />
  <CorpIcon name="luc-star" :size="24" disabled />

  <template #code>

```vue
<CorpIcon name="luc-star" />
<CorpIcon name="luc-star" disabled />  <!-- opacity-50 -->
```

  </template>
</CodePreview>

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | **required** | Nome do ícone Lucide |
| `size` | `number \| string` | `'1em'` | Tamanho do ícone |
| `color` | `string` | `'currentColor'` | Cor do ícone |
| `strokeWidth` | `number` | `2` | Espessura do traço |
| `tag` | `'i' \| 'span' \| 'div'` | `'i'` | Elemento HTML |
| `start` | `boolean` | `false` | Margem à direita (início de texto) |
| `end` | `boolean` | `false` | Margem à esquerda (fim de texto) |
| `clickable` | `boolean` | `false` | Cursor pointer + hover effect |
| `disabled` | `boolean` | `false` | Aplica opacity e desabilita clique |

### Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| `click` | `MouseEvent` | Emitido quando `clickable` e clicado |
