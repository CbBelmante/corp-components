<script setup>
import { ref } from 'vue'
import { CorpButton } from '@components/ui/corpbutton'

const loading = ref(false)

const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

# Button

O componente `CorpButton` exibe um botão ou elemento clicável.

## Uso

<CodePreview>
  <CorpButton>Button</CorpButton>

  <template #code>

```vue
<script setup>
import { CorpButton } from 'corp-components'
</script>

<template>
  <CorpButton>Button</CorpButton>
</template>
```

  </template>
</CodePreview>

## Variantes

<CodePreview>
  <CorpButton>Default</CorpButton>
  <CorpButton variant="secondary">Secondary</CorpButton>
  <CorpButton variant="destructive">Destructive</CorpButton>
  <CorpButton variant="outline">Outline</CorpButton>
  <CorpButton variant="ghost">Ghost</CorpButton>
  <CorpButton variant="link">Link</CorpButton>

  <template #code>

```vue
<CorpButton>Default</CorpButton>
<CorpButton variant="secondary">Secondary</CorpButton>
<CorpButton variant="destructive">Destructive</CorpButton>
<CorpButton variant="outline">Outline</CorpButton>
<CorpButton variant="ghost">Ghost</CorpButton>
<CorpButton variant="link">Link</CorpButton>
```

  </template>
</CodePreview>

## Tamanhos

<CodePreview>
  <CorpButton size="xs">Extra Small</CorpButton>
  <CorpButton size="sm">Small</CorpButton>
  <CorpButton size="default">Default</CorpButton>
  <CorpButton size="lg">Large</CorpButton>

  <template #code>

```vue
<CorpButton size="xs">Extra Small</CorpButton>
<CorpButton size="sm">Small</CorpButton>
<CorpButton size="default">Default</CorpButton>
<CorpButton size="lg">Large</CorpButton>
```

  </template>
</CodePreview>

## Rounded

Controle o arredondamento das bordas:

<CodePreview>
  <CorpButton rounded="none">None</CorpButton>
  <CorpButton rounded="sm">Small</CorpButton>
  <CorpButton rounded="default">Default</CorpButton>
  <CorpButton rounded="lg">Large</CorpButton>
  <CorpButton rounded="xl">XL</CorpButton>
  <CorpButton rounded="full">Full (Pill)</CorpButton>

  <template #code>

```vue
<CorpButton rounded="none">None</CorpButton>
<CorpButton rounded="sm">Small</CorpButton>
<CorpButton rounded="default">Default</CorpButton>
<CorpButton rounded="lg">Large</CorpButton>
<CorpButton rounded="xl">XL</CorpButton>
<CorpButton rounded="full">Full (Pill)</CorpButton>
```

  </template>
</CodePreview>

## Block

Botão com largura total:

<CodePreview>
  <div class="w-full space-y-2">
    <CorpButton block>Block Button</CorpButton>
    <CorpButton block variant="outline">Block Outline</CorpButton>
  </div>

  <template #code>

```vue
<CorpButton block>Block Button</CorpButton>
<CorpButton block variant="outline">Block Outline</CorpButton>
```

  </template>
</CodePreview>

## Stacked

Ícone acima do texto (layout vertical):

<CodePreview>
  <CorpButton stacked prepend-icon="luc-home">Home</CorpButton>
  <CorpButton stacked prepend-icon="luc-settings" variant="outline">Config</CorpButton>
  <CorpButton stacked prepend-icon="luc-user" variant="secondary">Perfil</CorpButton>
  <CorpButton stacked prepend-icon="luc-mail" variant="ghost">Email</CorpButton>

  <template #code>

```vue
<CorpButton stacked prepend-icon="luc-home">Home</CorpButton>
<CorpButton stacked prepend-icon="luc-settings" variant="outline">Config</CorpButton>
<CorpButton stacked prepend-icon="luc-user" variant="secondary">Perfil</CorpButton>
<CorpButton stacked prepend-icon="luc-mail" variant="ghost">Email</CorpButton>
```

  </template>
</CodePreview>

## Com Ícone

Use `prepend-icon` e `append-icon` com nomes de ícones Lucide:

<CodePreview>
  <CorpButton prepend-icon="luc-mail">Login com Email</CorpButton>
  <CorpButton variant="secondary" append-icon="luc-chevron-right">Próximo</CorpButton>
  <CorpButton variant="outline" prepend-icon="luc-download" append-icon="luc-external-link">Download</CorpButton>

  <template #code>

```vue
<CorpButton prepend-icon="luc-mail">Login com Email</CorpButton>
<CorpButton variant="secondary" append-icon="luc-chevron-right">Próximo</CorpButton>
<CorpButton variant="outline" prepend-icon="luc-download" append-icon="luc-external-link">
  Download
</CorpButton>
```

  </template>
</CodePreview>

## Icon Button

<CodePreview>
  <CorpButton size="icon-sm" variant="outline" prepend-icon="luc-settings" />
  <CorpButton size="icon" variant="outline" prepend-icon="luc-chevron-right" />
  <CorpButton size="icon-lg" variant="outline" prepend-icon="luc-mail" />

  <template #code>

```vue
<CorpButton size="icon-sm" variant="outline" prepend-icon="luc-settings" />
<CorpButton size="icon" variant="outline" prepend-icon="luc-chevron-right" />
<CorpButton size="icon-lg" variant="outline" prepend-icon="luc-mail" />
```

  </template>
</CodePreview>

## Loading

Use a prop `loading` para exibir um spinner automaticamente:

<CodePreview>
  <CorpButton :loading="loading" @click="simulateLoading">
    {{ loading ? 'Aguarde...' : 'Clique aqui' }}
  </CorpButton>
  <CorpButton :loading="loading" prepend-icon="luc-mail" @click="simulateLoading">
    {{ loading ? 'Enviando...' : 'Enviar Email' }}
  </CorpButton>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</script>

<template>
  <CorpButton :loading="loading" @click="handleClick">
    {{ loading ? 'Aguarde...' : 'Clique aqui' }}
  </CorpButton>

  <!-- Loading substitui o prependIcon automaticamente -->
  <CorpButton :loading="loading" prepend-icon="luc-mail" @click="handleClick">
    {{ loading ? 'Enviando...' : 'Enviar Email' }}
  </CorpButton>
</template>
```

  </template>
</CodePreview>

## Disabled

<CodePreview>
  <CorpButton disabled>Default</CorpButton>
  <CorpButton variant="secondary" disabled>Secondary</CorpButton>
  <CorpButton variant="destructive" disabled>Destructive</CorpButton>
  <CorpButton variant="outline" disabled>Outline</CorpButton>
  <CorpButton variant="ghost" disabled>Ghost</CorpButton>

  <template #code>

```vue
<CorpButton disabled>Default</CorpButton>
<CorpButton variant="secondary" disabled>Secondary</CorpButton>
<CorpButton variant="destructive" disabled>Destructive</CorpButton>
<CorpButton variant="outline" disabled>Outline</CorpButton>
<CorpButton variant="ghost" disabled>Ghost</CorpButton>
```

  </template>
</CodePreview>

## Como Link

<CodePreview>
  <CorpButton as="a" href="https://github.com" target="_blank">GitHub</CorpButton>
  <CorpButton as="a" href="https://vuejs.org" target="_blank" variant="outline">Vue.js</CorpButton>

  <template #code>

```vue
<CorpButton as="a" href="https://github.com" target="_blank">GitHub</CorpButton>
<CorpButton as="a" href="https://vuejs.org" target="_blank" variant="outline">Vue.js</CorpButton>
```

  </template>
</CodePreview>

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Estilo visual do botão |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xs' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Tamanho do botão |
| `rounded` | `'default' \| 'none' \| 'sm' \| 'lg' \| 'xl' \| 'full'` | `'default'` | Arredondamento das bordas |
| `block` | `boolean` | `false` | Largura total (100%) |
| `stacked` | `boolean` | `false` | Layout vertical (ícone acima do texto) |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `loading` | `boolean` | `false` | Exibe spinner e desabilita o botão |
| `prependIcon` | `string` | `undefined` | Nome do ícone Lucide à esquerda |
| `appendIcon` | `string` | `undefined` | Nome do ícone Lucide à direita |
| `iconSize` | `number \| string` | `'1em'` | Tamanho do ícone |
| `as` | `string` | `'button'` | Elemento HTML a ser renderizado |
| `asChild` | `boolean` | `false` | Mescla props com elemento filho |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML do botão |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo principal do botão |
| `prepend` | Conteúdo à esquerda (sobrescreve `prependIcon` e `loading`) |
| `append` | Conteúdo à direita (sobrescreve `appendIcon`) |
