<script setup>
import { ref } from 'vue'
import { CorpIcon } from '@components/ui/icon'
import { CorpButton } from '@components/ui/button'

const clickCount = ref(0)
</script>

# Icon

O componente `CorpIcon` fornece um grande conjunto de ícones [Lucide](https://lucide.dev/icons/) para dar contexto a vários aspectos da sua aplicação. Para uma lista de todos os ícones disponíveis, visite a [página oficial do Lucide Icons](https://lucide.dev/icons/). Para usar qualquer um desses ícones, simplesmente use o prefixo `luc-` seguido do nome do ícone.

## Uso

Os ícones vêm em cinco tamanhos diferentes:

- `x-small` (12px)
- `small` (16px)
- `default` (24px) - padrão
- `large` (32px)
- `x-large` (40px)

### Configuração

| Propriedade | Descrição |
|-------------|-----------|
| `size` | Define o tamanho do ícone (preset ou valor custom) |
| `color` | Define a cor do ícone |
| `name` | Nome do ícone Lucide a ser exibido |

<CodePreview>
  <CorpIcon name="luc-home" />

  <template #code>

```vue
<script setup>
import { CorpIcon } from 'corp-components'
</script>

<template>
  <CorpIcon name="luc-home" />
</template>
```

  </template>
</CodePreview>

---

## Props

### Size

Use a prop `size` para controlar o tamanho. Aceita presets ou valores custom:

<CodePreview>
  <CorpIcon name="luc-star" size="x-small" />
  <CorpIcon name="luc-star" size="small" />
  <CorpIcon name="luc-star" size="default" />
  <CorpIcon name="luc-star" size="large" />
  <CorpIcon name="luc-star" size="x-large" />

  <template #code>

```vue
<!-- Presets -->
<CorpIcon name="luc-star" size="x-small" />   <!-- 12px -->
<CorpIcon name="luc-star" size="small" />     <!-- 16px -->
<CorpIcon name="luc-star" size="default" />   <!-- 24px -->
<CorpIcon name="luc-star" size="large" />     <!-- 32px -->
<CorpIcon name="luc-star" size="x-large" />   <!-- 40px -->

<!-- Valores custom -->
<CorpIcon name="luc-star" :size="20" />       <!-- 20px -->
<CorpIcon name="luc-star" size="1.5rem" />    <!-- 1.5rem -->
```

  </template>
</CodePreview>

### Color

Usando a prop `color` você pode alterar a cor de um ícone. O padrão é `currentColor` (herda do texto pai).

<CodePreview>
  <CorpIcon name="luc-heart" color="red" />
  <CorpIcon name="luc-check" color="green" />
  <CorpIcon name="luc-alert-circle" color="orange" />
  <CorpIcon name="luc-info" color="blue" />
  <CorpIcon name="luc-star" color="hsl(var(--primary))" />

  <template #code>

```vue
<CorpIcon name="luc-heart" color="red" />
<CorpIcon name="luc-check" color="green" />
<CorpIcon name="luc-alert-circle" color="orange" />
<CorpIcon name="luc-info" color="blue" />
<CorpIcon name="luc-star" color="hsl(var(--primary))" />
```

  </template>
</CodePreview>

### Stroke Width

Controle a espessura do traço do ícone com `stroke-width`. O padrão é `2`.

<CodePreview>
  <CorpIcon name="luc-circle" :stroke-width="1" size="large" />
  <CorpIcon name="luc-circle" :stroke-width="2" size="large" />
  <CorpIcon name="luc-circle" :stroke-width="3" size="large" />

  <template #code>

```vue
<CorpIcon name="luc-circle" :stroke-width="1" />
<CorpIcon name="luc-circle" :stroke-width="2" />  <!-- Default -->
<CorpIcon name="luc-circle" :stroke-width="3" />
```

  </template>
</CodePreview>

### Start / End

Use `start` ou `end` para adicionar margem quando o ícone é usado junto com texto. Útil para botões e labels.

<CodePreview>
  <span class="flex items-center"><CorpIcon name="luc-mail" start />Enviar email</span>
  <span class="flex items-center">Próximo<CorpIcon name="luc-chevron-right" end /></span>

  <template #code>

```vue
<!-- Margem à direita (início do texto) -->
<span><CorpIcon name="luc-mail" start />Enviar email</span>

<!-- Margem à esquerda (fim do texto) -->
<span>Próximo<CorpIcon name="luc-chevron-right" end /></span>
```

  </template>
</CodePreview>

### Clickable

Ícones clicáveis ganham cursor pointer e hover effect. Emite evento `@click`.

<CodePreview>
  <CorpIcon name="luc-heart" clickable @click="clickCount++" />
  <CorpIcon name="luc-trash" clickable color="red" />
  <CorpIcon name="luc-settings" clickable />
  <span class="ml-4 text-sm text-muted-foreground">Cliques: {{ clickCount }}</span>

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

### Disabled

Aplica `opacity: 0.5` e desabilita interações.

<CodePreview>
  <CorpIcon name="luc-star" />
  <CorpIcon name="luc-star" disabled />

  <template #code>

```vue
<CorpIcon name="luc-star" />
<CorpIcon name="luc-star" disabled />
```

  </template>
</CodePreview>

### Tag

Mude o elemento HTML renderizado. O padrão é `<i>`.

<CodePreview>
  <CorpIcon name="luc-star" tag="i" />
  <CorpIcon name="luc-star" tag="span" />
  <CorpIcon name="luc-star" tag="div" />

  <template #code>

```vue
<CorpIcon name="luc-star" tag="i" />    <!-- Default -->
<CorpIcon name="luc-star" tag="span" />
<CorpIcon name="luc-star" tag="div" />
```

  </template>
</CodePreview>

---

## Acessibilidade

Ícones podem transmitir todos os tipos de informações significativas, então é importante que eles alcancem o maior número possível de pessoas. Existem dois casos de uso a considerar:

### Ícones Decorativos

Se seus ícones são puramente decorativos, o componente já adiciona `aria-hidden="true"` automaticamente através do elemento wrapper.

```vue
<!-- Decorativo - aria-hidden é aplicado automaticamente -->
<CorpIcon name="luc-star" />
```

### Ícones Semânticos

Se seus ícones têm significado semântico, adicione `aria-label` ao elemento pai ou use um `<span>` com texto alternativo:

```vue
<!-- Opção 1: aria-label no botão pai -->
<button aria-label="Favoritar item">
  <CorpIcon name="luc-heart" />
</button>

<!-- Opção 2: Texto visualmente escondido -->
<button>
  <CorpIcon name="luc-heart" />
  <span class="sr-only">Favoritar item</span>
</button>
```

### Ícones Clicáveis

Para ícones `clickable` que funcionam como botões, sempre forneça contexto:

```vue
<CorpIcon
  name="luc-trash"
  clickable
  @click="deleteItem"
  aria-label="Excluir item"
  role="button"
/>
```

---

## Exemplos

### Ícones em Botões

Ícones podem ser usados dentro de botões para adicionar ênfase à ação. Use as props `prepend-icon` e `append-icon` do `CorpButton`:

<CodePreview>
  <CorpButton prepend-icon="luc-mail">Enviar</CorpButton>
  <CorpButton variant="secondary" append-icon="luc-chevron-right">Próximo</CorpButton>
  <CorpButton variant="outline" prepend-icon="luc-download" append-icon="luc-external-link">Download</CorpButton>

  <template #code>

```vue
<CorpButton prepend-icon="luc-mail">Enviar</CorpButton>
<CorpButton variant="secondary" append-icon="luc-chevron-right">Próximo</CorpButton>
<CorpButton variant="outline" prepend-icon="luc-download" append-icon="luc-external-link">
  Download
</CorpButton>
```

  </template>
</CodePreview>

### Icon Buttons

Botões apenas com ícone usando `size="icon"`:

<CodePreview>
  <CorpButton size="icon-sm" variant="outline" prepend-icon="luc-settings" />
  <CorpButton size="icon" variant="outline" prepend-icon="luc-plus" />
  <CorpButton size="icon-lg" variant="outline" prepend-icon="luc-trash" />

  <template #code>

```vue
<CorpButton size="icon-sm" variant="outline" prepend-icon="luc-settings" />
<CorpButton size="icon" variant="outline" prepend-icon="luc-plus" />
<CorpButton size="icon-lg" variant="outline" prepend-icon="luc-trash" />
```

  </template>
</CodePreview>

### Spinners

Alguns ícones de loading giram automaticamente:

<CodePreview>
  <CorpIcon name="luc-loader-2" />
  <CorpIcon name="luc-loader" />
  <CorpIcon name="luc-refresh-cw" />

  <template #code>

```vue
<!-- Giram automaticamente -->
<CorpIcon name="luc-loader-2" />
<CorpIcon name="luc-loader" />
<CorpIcon name="luc-refresh-cw" />
```

  </template>
</CodePreview>

### Formatos de Nome

O `CorpIcon` aceita múltiplos formatos de nome para flexibilidade:

<CodePreview>
  <CorpIcon name="luc-user" />
  <CorpIcon name="user" />
  <CorpIcon name="User" />
  <CorpIcon name="user-plus" />
  <CorpIcon name="UserPlus" />

  <template #code>

```vue
<!-- Todos funcionam: -->
<CorpIcon name="luc-user" />     <!-- Prefixo luc- (recomendado) -->
<CorpIcon name="user" />         <!-- lowercase -->
<CorpIcon name="User" />         <!-- PascalCase -->
<CorpIcon name="user-plus" />    <!-- kebab-case -->
<CorpIcon name="UserPlus" />     <!-- PascalCase composto -->
```

  </template>
</CodePreview>

> **Recomendação:** Use o prefixo `luc-` para consistência e clareza no código.

### Lucide Icons

O `CorpIcon` usa [Lucide](https://lucide.dev/) como biblioteca de ícones. Lucide é um fork do Feather Icons com mais de 1400 ícones.

**Por que Lucide?**

- **Leve:** Ícones SVG otimizados
- **Consistente:** Todos os ícones seguem o mesmo estilo
- **Acessível:** Projetado com acessibilidade em mente
- **Tree-shakeable:** Apenas os ícones usados são incluídos no bundle

**Encontrando Ícones:**

Visite [lucide.dev/icons](https://lucide.dev/icons/) para buscar e visualizar todos os ícones disponíveis.

---

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | **required** | Nome do ícone Lucide (ex: `luc-home`, `user`, `UserPlus`) |
| `size` | `'x-small' \| 'small' \| 'default' \| 'large' \| 'x-large' \| number \| string` | `'default'` | Preset (12/16/24/32/40px) ou valor custom |
| `color` | `string` | `'currentColor'` | Cor do ícone (CSS color) |
| `strokeWidth` | `number` | `2` | Espessura do traço SVG |
| `tag` | `'i' \| 'span' \| 'div'` | `'i'` | Elemento HTML wrapper |
| `start` | `boolean` | `false` | Adiciona margem à direita (para início de texto) |
| `end` | `boolean` | `false` | Adiciona margem à esquerda (para fim de texto) |
| `clickable` | `boolean` | `false` | Habilita cursor pointer e hover effect |
| `disabled` | `boolean` | `false` | Aplica opacity 0.5 e desabilita interações |

### Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| `click` | `MouseEvent` | Emitido quando `clickable` está ativo e o ícone é clicado |
