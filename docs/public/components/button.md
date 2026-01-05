<script setup>
import { ref } from 'vue'
import { CorpButton } from '@components/ui/corpbutton'
import { CorpIcon } from '@components/ui/icon'

const loading = ref(false)
const clickCount = ref(0)

const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

# Button

O componente `CorpButton` substitui o botão HTML padrão com um design consistente e uma infinidade de opções. Qualquer variante pode ser combinada com tamanhos, ícones e estados de loading.

## Uso

Botões em sua forma mais simples contêm texto, uma leve elevação no hover e efeito de transição ao clicar.

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

---

## API

### CorpButton

Componente principal para renderização de botões.

---

## Anatomia

O posicionamento recomendado de elementos dentro do `CorpButton` é:

- Coloque o texto no centro
- Coloque conteúdo visual (ícones) ao redor do texto

| Elemento | Descrição |
|----------|-----------|
| **Container** | Além do texto, o container do Button tipicamente contém ícones via props ou slots |
| **Prepend** (opcional) | Área de conteúdo antes do texto, ideal para ícones de contexto |
| **Text** | Área de conteúdo principal para texto e elementos inline |
| **Append** (opcional) | Área de conteúdo após o texto, ideal para setas ou indicadores |

---

## Guia

O componente `CorpButton` é essencial para qualquer aplicação. É usado para tudo, desde navegação até submissão de formulários, e pode ser estilizado de várias maneiras através de props.

```vue
<CorpButton>Button</CorpButton>
```

---

## Props

Uma ampla variedade de props pode ser empregada para modificar a aparência e funcionalidade do `CorpButton`. Props como `prepend-icon` e `append-icon` oferecem uma abordagem direta para incorporar ícones, enquanto `block` e `stacked` são utilizadas para gerenciar a forma do componente.

### Variant

A prop `variant` dá acesso fácil a vários estilos de botão diferentes.

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

| Variant | Descrição |
|---------|-----------|
| `default` | Cor primária com fundo sólido e texto contrastante |
| `secondary` | Cor secundária, menos proeminente que o default |
| `destructive` | Vermelho/perigo, para ações destrutivas como deletar |
| `outline` | Borda fina sem fundo, hover revela preenchimento |
| `ghost` | Sem fundo ou borda, apenas texto com hover sutil |
| `link` | Estilo de link com underline no hover |

### Size

A prop `size` controla o tamanho do botão. O tamanho padrão é `default`.

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

| Size | Altura | Uso recomendado |
|------|--------|-----------------|
| `xs` | 28px | Ações inline, tabelas compactas |
| `sm` | 36px | Formulários compactos, sidebars |
| `default` | 40px | Uso geral |
| `lg` | 44px | CTAs, ações principais |

### Block

Botões block estendem toda a largura disponível do seu container. Útil para criar botões que abrangem toda a largura de um card ou dialog.

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

> **Nota:** Block aplica `width: 100%` o que pode causar problemas de overflow dentro de um flex container com espaço limitado.

### Rounded

Use a prop `rounded` para controlar o border radius. Aceita presets ou valores custom:

<CodePreview>
  <CorpButton rounded="none">None</CorpButton>
  <CorpButton rounded="sm">Small</CorpButton>
  <CorpButton rounded="default">Default</CorpButton>
  <CorpButton rounded="lg">Large</CorpButton>
  <CorpButton rounded="xl">XL</CorpButton>
  <CorpButton rounded="full">Full (Pill)</CorpButton>

  <template #code>

```vue
<!-- Presets -->
<CorpButton rounded="none">None</CorpButton>
<CorpButton rounded="sm">Small</CorpButton>
<CorpButton rounded="default">Default</CorpButton>
<CorpButton rounded="lg">Large</CorpButton>
<CorpButton rounded="xl">XL</CorpButton>
<CorpButton rounded="full">Full (Pill)</CorpButton>
```

  </template>
</CodePreview>

#### Rounded Custom

Também aceita classes Tailwind ou valores CSS:

<CodePreview>
  <CorpButton rounded="rounded-3xl">Tailwind</CorpButton>
  <CorpButton rounded="rounded-tl-xl rounded-br-xl">Corners</CorpButton>
  <CorpButton rounded="20px">20px</CorpButton>
  <CorpButton rounded="50% 0">50% 0</CorpButton>

  <template #code>

```vue
<!-- Classes Tailwind -->
<CorpButton rounded="rounded-3xl">Tailwind</CorpButton>
<CorpButton rounded="rounded-tl-xl rounded-br-xl">Corners</CorpButton>

<!-- Valores CSS -->
<CorpButton rounded="20px">20px</CorpButton>
<CorpButton rounded="50% 0">50% 0</CorpButton>
```

  </template>
</CodePreview>

### Stacked

Ícone acima do texto (layout vertical). Útil para navegação bottom ou ações com ícones proeminentes.

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

### Icons

Use `prepend-icon` e `append-icon` para adicionar ícones Lucide ao botão. Os ícones são automaticamente dimensionados e posicionados.

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

### Icon Buttons

Ícones podem ser usados como conteúdo principal de um botão. Use os tamanhos `icon-sm`, `icon` ou `icon-lg`:

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

Icon buttons são comumente usados em toolbars, cards e ações inline.

### Loading

Usando a prop `loading`, você pode notificar o usuário que há processamento ocorrendo. Um spinner substitui automaticamente o `prepend-icon` quando ativo.

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

### Disabled

Botões desabilitados não respondem a interações e têm aparência reduzida.

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

### As (Polimorfismo)

Use a prop `as` para renderizar o botão como outro elemento HTML, como `<a>` para links:

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

---

## Slots

O componente `CorpButton` fornece slots que permitem customizar o conteúdo criado por suas props ou adicionar conteúdo adicional.

| Slot | Descrição |
|------|-----------|
| **default** | Conteúdo principal do botão (texto) |
| **prepend** | Área antes do texto (sobrescreve `prependIcon` e `loading`) |
| **append** | Área após o texto (sobrescreve `appendIcon`) |

Slots dão maior controle para customizar o conteúdo do `CorpButton` enquanto ainda aproveitam as props fáceis de usar.

### Slot Prepend

Use o slot `prepend` para conteúdo customizado antes do texto:

<CodePreview>
  <CorpButton>
    <template #prepend>
      <span class="text-xs bg-white/20 px-1 rounded">NEW</span>
    </template>
    Funcionalidade
  </CorpButton>

  <template #code>

```vue
<CorpButton>
  <template #prepend>
    <span class="text-xs bg-white/20 px-1 rounded">NEW</span>
  </template>
  Funcionalidade
</CorpButton>
```

  </template>
</CodePreview>

### Slot Append

Use o slot `append` para conteúdo customizado após o texto:

<CodePreview>
  <CorpButton variant="outline">
    Notificações
    <template #append>
      <span class="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">5</span>
    </template>
  </CorpButton>

  <template #code>

```vue
<CorpButton variant="outline">
  Notificações
  <template #append>
    <span class="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
      5
    </span>
  </template>
</CorpButton>
```

  </template>
</CodePreview>

---

## Exemplos

### Combinações Comuns

Exemplos de combinações frequentes de props:

<CodePreview>
  <CorpButton prepend-icon="luc-plus">Adicionar Item</CorpButton>
  <CorpButton variant="destructive" prepend-icon="luc-trash">Excluir</CorpButton>
  <CorpButton variant="outline" append-icon="luc-external-link">Ver mais</CorpButton>
  <CorpButton variant="ghost" size="sm" prepend-icon="luc-edit">Editar</CorpButton>

  <template #code>

```vue
<CorpButton prepend-icon="luc-plus">Adicionar Item</CorpButton>
<CorpButton variant="destructive" prepend-icon="luc-trash">Excluir</CorpButton>
<CorpButton variant="outline" append-icon="luc-external-link">Ver mais</CorpButton>
<CorpButton variant="ghost" size="sm" prepend-icon="luc-edit">Editar</CorpButton>
```

  </template>
</CodePreview>

### Ações de Dialog

Botões são frequentemente usados em dialogs para confirmar ou cancelar ações:

<CodePreview>
  <div class="flex gap-2">
    <CorpButton variant="outline">Cancelar</CorpButton>
    <CorpButton>Confirmar</CorpButton>
  </div>

  <template #code>

```vue
<div class="flex gap-2">
  <CorpButton variant="outline">Cancelar</CorpButton>
  <CorpButton>Confirmar</CorpButton>
</div>
```

  </template>
</CodePreview>

### Ações Destrutivas

Para ações perigosas, combine `variant="destructive"` com confirmação:

<CodePreview>
  <div class="flex gap-2">
    <CorpButton variant="ghost">Cancelar</CorpButton>
    <CorpButton variant="destructive" prepend-icon="luc-trash">Excluir Permanentemente</CorpButton>
  </div>

  <template #code>

```vue
<div class="flex gap-2">
  <CorpButton variant="ghost">Cancelar</CorpButton>
  <CorpButton variant="destructive" prepend-icon="luc-trash">
    Excluir Permanentemente
  </CorpButton>
</div>
```

  </template>
</CodePreview>

### Formulário de Login

Exemplo de botão em contexto de formulário:

<CodePreview>
  <div class="w-64 space-y-3">
    <CorpButton block prepend-icon="luc-mail">Continuar com Email</CorpButton>
    <CorpButton block variant="outline" prepend-icon="luc-github">Continuar com GitHub</CorpButton>
  </div>

  <template #code>

```vue
<div class="w-64 space-y-3">
  <CorpButton block prepend-icon="luc-mail">Continuar com Email</CorpButton>
  <CorpButton block variant="outline" prepend-icon="luc-github">
    Continuar com GitHub
  </CorpButton>
</div>
```

  </template>
</CodePreview>

### Bottom Navigation

Use `stacked` para criar navegação com ícones e labels:

<CodePreview>
  <div class="flex gap-1 p-2 bg-muted rounded-lg">
    <CorpButton stacked variant="ghost" prepend-icon="luc-home" class="flex-1">Home</CorpButton>
    <CorpButton stacked variant="ghost" prepend-icon="luc-search" class="flex-1">Buscar</CorpButton>
    <CorpButton stacked variant="ghost" prepend-icon="luc-bell" class="flex-1">Alertas</CorpButton>
    <CorpButton stacked variant="ghost" prepend-icon="luc-user" class="flex-1">Perfil</CorpButton>
  </div>

  <template #code>

```vue
<div class="flex gap-1 p-2 bg-muted rounded-lg">
  <CorpButton stacked variant="ghost" prepend-icon="luc-home" class="flex-1">Home</CorpButton>
  <CorpButton stacked variant="ghost" prepend-icon="luc-search" class="flex-1">Buscar</CorpButton>
  <CorpButton stacked variant="ghost" prepend-icon="luc-bell" class="flex-1">Alertas</CorpButton>
  <CorpButton stacked variant="ghost" prepend-icon="luc-user" class="flex-1">Perfil</CorpButton>
</div>
```

  </template>
</CodePreview>

### Toolbar Actions

Icon buttons em uma toolbar:

<CodePreview>
  <div class="flex items-center gap-1 p-2 bg-muted rounded-lg">
    <CorpButton size="icon" variant="ghost" prepend-icon="luc-bold" />
    <CorpButton size="icon" variant="ghost" prepend-icon="luc-italic" />
    <CorpButton size="icon" variant="ghost" prepend-icon="luc-underline" />
    <div class="w-px h-6 bg-border mx-1" />
    <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-left" />
    <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-center" />
    <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-right" />
  </div>

  <template #code>

```vue
<div class="flex items-center gap-1 p-2 bg-muted rounded-lg">
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-bold" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-italic" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-underline" />
  <div class="w-px h-6 bg-border mx-1" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-left" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-center" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-right" />
</div>
```

  </template>
</CodePreview>

---

## Acessibilidade

O componente `CorpButton` é uma extensão do elemento button nativo e suporta todos os mesmos recursos de acessibilidade.

### Atributos ARIA

Por padrão, o componente inclui atributos WAI-ARIA relevantes. O componente é automaticamente atribuído com `type="button"`, que indica seu propósito para tecnologias assistivas.

### Navegação por Teclado

O componente é nativamente focável e responde a eventos de teclado:

- **Enter** ou **Space**: Dispara a ação do botão
- **Tab**: Move o foco para o próximo elemento focável

### Labels Acessíveis

Ao usar icon buttons (botões apenas com ícone), é essencial fornecer uma alternativa de texto para usuários de leitores de tela. Adicione um atributo `aria-label`:

```vue
<CorpButton
  size="icon"
  variant="ghost"
  prepend-icon="luc-trash"
  aria-label="Excluir item"
/>
```

### Tamanho da Área de Toque

Certifique-se de que seus botões tenham um tamanho de área de toque adequado, especialmente em dispositivos touch. Uma área de toque maior melhora a usabilidade:

```vue
<!-- Mínimo recomendado: 44x44px -->
<CorpButton size="lg">Large Button</CorpButton>

<!-- Para mobile, considere block -->
<CorpButton block size="lg">Full Width Button</CorpButton>
```

### Estados Visuais

O componente fornece estados visuais claros para:

- **Hover**: Mudança de cor/elevação
- **Focus**: Anel de foco visível (`focus-visible:ring`)
- **Active**: Feedback visual ao pressionar
- **Disabled**: Aparência reduzida e `pointer-events: none`

### Botões de Loading

Quando um botão está em estado de loading, considere:

```vue
<CorpButton
  :loading="isLoading"
  :disabled="isLoading"
  aria-busy="true"
>
  {{ isLoading ? 'Processando...' : 'Enviar' }}
</CorpButton>
```

---

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Estilo visual do botão |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xs' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Tamanho do botão |
| `rounded` | `'default' \| 'none' \| 'sm' \| 'lg' \| 'xl' \| 'full' \| string` | `'default'` | Preset ou valor custom (Tailwind class ou CSS) |
| `block` | `boolean` | `false` | Largura total (100%) |
| `stacked` | `boolean` | `false` | Layout vertical (ícone acima do texto) |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `loading` | `boolean` | `false` | Exibe spinner e desabilita o botão |
| `prependIcon` | `string` | `undefined` | Nome do ícone Lucide à esquerda |
| `appendIcon` | `string` | `undefined` | Nome do ícone Lucide à direita |
| `iconSize` | `number \| string` | `'1em'` | Tamanho dos ícones |
| `as` | `string` | `'button'` | Elemento HTML a ser renderizado |
| `asChild` | `boolean` | `false` | Mescla props com elemento filho |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML do botão |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo principal do botão |
| `prepend` | Conteúdo à esquerda (sobrescreve `prependIcon` e `loading`) |
| `append` | Conteúdo à direita (sobrescreve `appendIcon`) |

### Events

O componente emite todos os eventos nativos do elemento button, incluindo:

| Event | Descrição |
|-------|-----------|
| `click` | Emitido quando o botão é clicado |
| `focus` | Emitido quando o botão recebe foco |
| `blur` | Emitido quando o botão perde foco |
