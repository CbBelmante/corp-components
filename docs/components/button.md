<script setup>
import { Button } from '@/components/ui/button'
</script>

# Button

Componente de botao com variantes e tamanhos.

## Preview

<div class="componentPreview">
  <Button>Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>

## Uso

```vue
<script setup>
import { Button } from 'corp-components'
</script>

<template>
  <Button>Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</template>
```

## Tamanhos

<div class="componentPreview items-center">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</div>

```vue
<template>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</template>
```

## Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| variant | string | 'default' | Estilo do botao |
| size | string | 'default' | Tamanho do botao |
| as | string | 'button' | Elemento HTML |
| asChild | boolean | false | Renderiza como filho |

## Variants

- `default` - Botao primario
- `destructive` - Acao destrutiva (vermelho)
- `outline` - Apenas borda
- `secondary` - Estilo secundario
- `ghost` - Sem fundo
- `link` - Estilo de link
