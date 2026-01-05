<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ChevronRight, Mail, Loader2 } from 'lucide-vue-next'

const loading = ref(false)

const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

# Button

Exibe um botão ou componente que se parece com um botão.

## Uso

<CodePreview>
  <Button>Button</Button>

  <template #code>

```vue
<script setup>
import { Button } from 'corp-components'
</script>

<template>
  <Button>Button</Button>
</template>
```

  </template>
</CodePreview>

## Variantes

<CodePreview>
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>

  <template #code>

```vue
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

  </template>
</CodePreview>

## Tamanhos

<CodePreview>
  <Button size="xs">Extra Small</Button>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>

  <template #code>

```vue
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

  </template>
</CodePreview>

## Icon

<CodePreview>
  <Button size="icon-sm" variant="outline"><ChevronRight class="h-4 w-4" /></Button>
  <Button size="icon" variant="outline"><ChevronRight class="h-4 w-4" /></Button>
  <Button size="icon-lg" variant="outline"><ChevronRight class="h-4 w-4" /></Button>

  <template #code>

```vue
<script setup>
import { ChevronRight } from 'lucide-vue-next'
</script>

<template>
  <Button size="icon-sm" variant="outline"><ChevronRight class="h-4 w-4" /></Button>
  <Button size="icon" variant="outline"><ChevronRight class="h-4 w-4" /></Button>
  <Button size="icon-lg" variant="outline"><ChevronRight class="h-4 w-4" /></Button>
</template>
```

  </template>
</CodePreview>

## Com Ícone

<CodePreview>
  <Button><Mail class="mr-2 h-4 w-4" /> Login com Email</Button>
  <Button variant="secondary">Próximo <ChevronRight class="ml-2 h-4 w-4" /></Button>

  <template #code>

```vue
<script setup>
import { Mail, ChevronRight } from 'lucide-vue-next'
</script>

<template>
  <Button><Mail class="mr-2 h-4 w-4" /> Login com Email</Button>
  <Button variant="secondary">Próximo <ChevronRight class="ml-2 h-4 w-4" /></Button>
</template>
```

  </template>
</CodePreview>

## Disabled

<CodePreview>
  <Button disabled>Default</Button>
  <Button variant="secondary" disabled>Secondary</Button>
  <Button variant="destructive" disabled>Destructive</Button>
  <Button variant="outline" disabled>Outline</Button>
  <Button variant="ghost" disabled>Ghost</Button>

  <template #code>

```vue
<Button disabled>Default</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="destructive" disabled>Destructive</Button>
<Button variant="outline" disabled>Outline</Button>
<Button variant="ghost" disabled>Ghost</Button>
```

  </template>
</CodePreview>

## Loading

<CodePreview>
  <Button :disabled="loading" @click="simulateLoading">
    <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
    {{ loading ? 'Aguarde...' : 'Clique aqui' }}
  </Button>

  <template #code>

```vue
<script setup>
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</script>

<template>
  <Button :disabled="loading" @click="handleClick">
    <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
    {{ loading ? 'Aguarde...' : 'Clique aqui' }}
  </Button>
</template>
```

  </template>
</CodePreview>

## Como Link

<CodePreview>
  <Button as="a" href="https://github.com" target="_blank">GitHub</Button>
  <Button as="a" href="https://vuejs.org" target="_blank" variant="outline">Vue.js</Button>

  <template #code>

```vue
<Button as="a" href="https://github.com" target="_blank">GitHub</Button>
<Button as="a" href="https://vuejs.org" target="_blank" variant="outline">Vue.js</Button>
```

  </template>
</CodePreview>

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Estilo visual do botão |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xs' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Tamanho do botão |
| `as` | `string` | `'button'` | Elemento HTML a ser renderizado |
| `asChild` | `boolean` | `false` | Mescla props com elemento filho |
| `disabled` | `boolean` | `false` | Desabilita o botão |
