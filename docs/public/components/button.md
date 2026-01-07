# Button

O componente `CorpButton` substitui o botão HTML padrão com um design consistente e uma infinidade de opções. Qualquer variante pode ser combinada com tamanhos, ícones e estados de loading.

## Uso

Botões em sua forma mais simples contêm texto, uma leve elevação no hover e efeito de transição ao clicar.

:::corp-code
<CorpButton>Button</CorpButton>
:::

---

## Props

Uma ampla variedade de props pode ser empregada para modificar a aparência e funcionalidade do `CorpButton`. Props como `prepend-icon` e `append-icon` oferecem uma abordagem direta para incorporar ícones, enquanto `block` e `stacked` são utilizadas para gerenciar a forma do componente.

### Variant

A prop `variant` dá acesso fácil a vários estilos de botão diferentes.

:::corp-code
<CorpButton>Default</CorpButton>
<CorpButton variant="secondary">Secondary</CorpButton>
<CorpButton variant="destructive">Destructive</CorpButton>
<CorpButton variant="outline">Outline</CorpButton>
<CorpButton variant="ghost">Ghost</CorpButton>
<CorpButton variant="link">Link</CorpButton>
:::

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

:::corp-code
<CorpButton size="xs">Extra Small</CorpButton>
<CorpButton size="sm">Small</CorpButton>
<CorpButton size="default">Default</CorpButton>
<CorpButton size="lg">Large</CorpButton>
:::

| Size | Altura | Uso recomendado |
|------|--------|-----------------|
| `xs` | 28px | Ações inline, tabelas compactas |
| `sm` | 36px | Formulários compactos, sidebars |
| `default` | 40px | Uso geral |
| `lg` | 44px | CTAs, ações principais |

### Block

Botões block estendem toda a largura disponível do seu container. Útil para criar botões que abrangem toda a largura de um card ou dialog.

:::corp-code
<div class="w-full space-y-2">
  <CorpButton block>Block Button</CorpButton>
  <CorpButton block variant="outline">Block Outline</CorpButton>
</div>
:::

> **Nota:** Block aplica `width: 100%` o que pode causar problemas de overflow dentro de um flex container com espaço limitado.

### Rounded

Use a prop `rounded` para controlar o border radius. Aceita presets ou valores custom:

:::corp-code
<CorpButton rounded="none">None</CorpButton>
<CorpButton rounded="sm">Small</CorpButton>
<CorpButton rounded="default">Default</CorpButton>
<CorpButton rounded="lg">Large</CorpButton>
<CorpButton rounded="xl">XL</CorpButton>
<CorpButton rounded="full">Full (Pill)</CorpButton>
:::

#### Rounded Custom

Também aceita classes Tailwind ou valores CSS:

:::corp-code
<CorpButton rounded="rounded-3xl">Tailwind</CorpButton>
<CorpButton rounded="rounded-tl-xl rounded-br-xl">Corners</CorpButton>
<CorpButton rounded="20px">20px</CorpButton>
<CorpButton rounded="50% 0">50% 0</CorpButton>
:::

### Stacked

Ícone acima do texto (layout vertical). Útil para navegação bottom ou ações com ícones proeminentes.

:::corp-code
<CorpButton stacked prepend-icon="luc-home">Home</CorpButton>
<CorpButton stacked prepend-icon="luc-settings" variant="outline">Config</CorpButton>
<CorpButton stacked prepend-icon="luc-user" variant="secondary">Perfil</CorpButton>
<CorpButton stacked prepend-icon="luc-mail" variant="ghost">Email</CorpButton>
:::

### Icons

Use `prepend-icon` e `append-icon` para adicionar ícones Lucide ao botão. Os ícones são automaticamente dimensionados e posicionados.

:::corp-code
<CorpButton prepend-icon="luc-mail">Login com Email</CorpButton>
<CorpButton variant="secondary" append-icon="luc-chevron-right">Próximo</CorpButton>
<CorpButton variant="outline" prepend-icon="luc-download" append-icon="luc-external-link">Download</CorpButton>
:::

### Icon Buttons

Ícones podem ser usados como conteúdo principal de um botão. Use os tamanhos `icon-sm`, `icon` ou `icon-lg`:

:::corp-code
<CorpButton size="icon-sm" variant="outline" prepend-icon="luc-settings" />
<CorpButton size="icon" variant="outline" prepend-icon="luc-chevron-right" />
<CorpButton size="icon-lg" variant="outline" prepend-icon="luc-mail" />
:::

Icon buttons são comumente usados em toolbars, cards e ações inline.

### Icon Colors

Personalize a cor dos ícones usando `p-icon-color` (prepend) e `ap-icon-color` (append). Aceita cores CSS ou classes Tailwind.

:::corp-code
<CorpButton prepend-icon="luc-star" p-icon-color="text-yellow-500">Favorito</CorpButton>
<CorpButton variant="secondary" prepend-icon="luc-heart" p-icon-color="#ef4444">Curtir</CorpButton>
<CorpButton variant="outline" prepend-icon="luc-check" p-icon-color="text-green-500" append-icon="luc-arrow-right" ap-icon-color="text-blue-500">Confirmar</CorpButton>

<!-- @disp-code -->
```vue
<script setup>
import { CorpButton } from 'corp-components'
</script>

<template>
  <!-- Cor Tailwind CSS -->
  <CorpButton
    prepend-icon="luc-star"
    p-icon-color="text-yellow-500"
  >
    Favorito
  </CorpButton>

  <!-- Cor HEX -->
  <CorpButton
    variant="secondary"
    prepend-icon="luc-heart"
    p-icon-color="#ef4444"
  >
    Curtir
  </CorpButton>

  <!-- Múltiplas cores -->
  <CorpButton
    variant="outline"
    prepend-icon="luc-check"
    p-icon-color="text-green-500"
    append-icon="luc-arrow-right"
    ap-icon-color="text-blue-500"
  >
    Confirmar
  </CorpButton>
</template>
```
:::

::: tip Cores suportadas
- Classes Tailwind: `text-red-500`, `text-primary`, etc
- HEX: `#ef4444`, `#3b82f6`
- RGB: `rgb(239, 68, 68)`
- HSL: `hsl(0, 84%, 60%)`
- Nomes CSS: `red`, `blue`, `currentColor`
:::

### Loading

Usando a prop `loading`, você pode notificar o usuário que há processamento ocorrendo. Um spinner substitui automaticamente o `prepend-icon` quando ativo.

:::corp-code
<CorpButton :loading="loadingButton" @click="simulateLoadingButton">
  {{ loadingButton ? 'Aguarde...' : 'Clique aqui' }}
</CorpButton>
<CorpButton :loading="loadingButton" prepend-icon="luc-mail" @click="simulateLoadingButton">
  {{ loadingButton ? 'Enviando...' : 'Enviar Email' }}
</CorpButton>

<!-- @disp-code -->
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
:::

### Disabled

Botões desabilitados não respondem a interações e têm aparência reduzida.

:::corp-code
<CorpButton disabled>Default</CorpButton>
<CorpButton variant="secondary" disabled>Secondary</CorpButton>
<CorpButton variant="destructive" disabled>Destructive</CorpButton>
<CorpButton variant="outline" disabled>Outline</CorpButton>
<CorpButton variant="ghost" disabled>Ghost</CorpButton>
:::

### As (Polimorfismo)

Use a prop `as` para renderizar o botão como outro elemento HTML, como `<a>` para links:

:::corp-code
<CorpButton as="a" href="https://github.com" target="_blank">GitHub</CorpButton>
<CorpButton as="a" href="https://vuejs.org" target="_blank" variant="outline">Vue.js</CorpButton>
:::

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

:::corp-code
<CorpButton>
  <template #prepend>
    <span class="text-xs bg-white/20 px-1 rounded">NEW</span>
  </template>
  Funcionalidade
</CorpButton>
:::

### Slot Append

Use o slot `append` para conteúdo customizado após o texto:

:::corp-code
<CorpButton variant="outline">
  Notificações
  <template #append>
    <span class="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">5</span>
  </template>
</CorpButton>
:::

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

:::corp-code{no-preview}
<CorpButton
  size="icon"
  variant="ghost"
  prepend-icon="luc-trash"
  aria-label="Excluir item"
/>
:::

### Tamanho da Área de Toque

Certifique-se de que seus botões tenham um tamanho de área de toque adequado, especialmente em dispositivos touch. Uma área de toque maior melhora a usabilidade:

:::corp-code{no-preview}
<!-- Mínimo recomendado: 44x44px -->
<CorpButton size="lg">Large Button</CorpButton>

<!-- Para mobile, considere block -->
<CorpButton block size="lg">Full Width Button</CorpButton>
:::

### Estados Visuais

O componente fornece estados visuais claros para:

- **Hover**: Mudança de cor/elevação
- **Focus**: Anel de foco visível (`focus-visible:ring`)
- **Active**: Feedback visual ao pressionar
- **Disabled**: Aparência reduzida e `pointer-events: none`

### Botões de Loading

Quando um botão está em estado de loading, considere:

:::corp-code{no-preview}
<CorpButton
  :loading="isLoading"
  :disabled="isLoading"
  aria-busy="true"
>
  {{ isLoading ? 'Processando...' : 'Enviar' }}
</CorpButton>
:::

---

## Exemplos

### Combinações Comuns

Exemplos de combinações frequentes de props:

:::corp-code
<CorpButton prepend-icon="luc-plus">Adicionar Item</CorpButton>
<CorpButton variant="destructive" prepend-icon="luc-trash">Excluir</CorpButton>
<CorpButton variant="outline" append-icon="luc-external-link">Ver mais</CorpButton>
<CorpButton variant="ghost" size="sm" prepend-icon="luc-edit">Editar</CorpButton>
:::

### Ações de Dialog

Botões são frequentemente usados em dialogs para confirmar ou cancelar ações:

:::corp-code
<div class="flex gap-2">
  <CorpButton variant="outline">Cancelar</CorpButton>
  <CorpButton>Confirmar</CorpButton>
</div>
:::

### Ações Destrutivas

Para ações perigosas, combine `variant="destructive"` com confirmação:

:::corp-code
<div class="flex gap-2">
  <CorpButton variant="ghost">Cancelar</CorpButton>
  <CorpButton variant="destructive" prepend-icon="luc-trash">Excluir Permanentemente</CorpButton>
</div>
:::

### Formulário de Login

Exemplo de botão em contexto de formulário com ícones FontAwesome:

:::corp-code
<div class="w-64 space-y-3">
  <CorpButton block prepend-icon="luc-mail">Continuar com Email</CorpButton>
  <CorpButton block variant="outline" prepend-icon="fa-fab fa-github">Continuar com GitHub</CorpButton>
  <CorpButton block variant="outline" prepend-icon="fa-fab fa-google" style="--tw-text-opacity: 1; color: rgb(219 68 55);">Continuar com Google</CorpButton>
  <CorpButton block variant="outline" prepend-icon="fa-fab fa-discord" style="color: #5865F2;">Continuar com Discord</CorpButton>
</div>
:::

### Social Buttons

Botões com ícones de redes sociais usando FontAwesome Brands:

:::corp-code
<CorpButton variant="outline" prepend-icon="fa-fab fa-twitter" />
<CorpButton variant="outline" prepend-icon="fa-fab fa-facebook" />
<CorpButton variant="outline" prepend-icon="fa-fab fa-instagram" />
<CorpButton variant="outline" prepend-icon="fa-fab fa-linkedin" />
<CorpButton variant="outline" prepend-icon="fa-fab fa-youtube" />
<CorpButton variant="outline" prepend-icon="fa-fab fa-twitch" />
:::

### Bottom Navigation

Use `stacked` para criar navegação com ícones e labels:

:::corp-code
<div class="flex gap-1 p-2 bg-muted rounded-lg">
  <CorpButton stacked variant="ghost" prepend-icon="luc-home" class="flex-1">Home</CorpButton>
  <CorpButton stacked variant="ghost" prepend-icon="luc-search" class="flex-1">Buscar</CorpButton>
  <CorpButton stacked variant="ghost" prepend-icon="luc-bell" class="flex-1">Alertas</CorpButton>
  <CorpButton stacked variant="ghost" prepend-icon="luc-user" class="flex-1">Perfil</CorpButton>
</div>
:::

### Toolbar Actions

Icon buttons em uma toolbar:

:::corp-code
<div class="flex items-center gap-1 p-2 bg-muted rounded-lg">
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-bold" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-italic" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-underline" />
  <div class="w-px h-6 bg-border mx-1" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-left" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-center" />
  <CorpButton size="icon" variant="ghost" prepend-icon="luc-align-right" />
</div>
:::

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
| `prependIcon` | `string` | `undefined` | Nome do ícone à esquerda |
| `appendIcon` | `string` | `undefined` | Nome do ícone à direita |
| `iconSize` | `number \| string` | `'1em'` | Tamanho dos ícones |
| `pIconColor` | `string` | `'currentColor'` | Cor do prepend-icon (Tailwind, HEX, RGB, HSL ou CSS) |
| `apIconColor` | `string` | `'currentColor'` | Cor do append-icon (Tailwind, HEX, RGB, HSL ou CSS) |
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
