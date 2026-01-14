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

A prop `variant` define o **estilo visual** do botão (sólido, outline, ghost, link).

:::corp-code
<CorpButton variant="solid">Solid (Default)</CorpButton>
<CorpButton variant="outline">Outline</CorpButton>
<CorpButton variant="ghost">Ghost</CorpButton>
<CorpButton variant="link">Link</CorpButton>
:::

| Variant | Descrição |
|---------|-----------|
| `solid` | Fundo sólido com sombra (padrão) |
| `outline` | Borda com fundo transparente |
| `ghost` | Sem fundo/borda, hover sutil |
| `link` | Estilo de link com underline |

### Color

A prop `color` é um **atalho semântico** que define cor do background, texto, hover e focus automaticamente. Pode ser combinada com qualquer `variant`.

> **Nota:** `color` funciona para **todos os variants** (solid, outline, ghost, link). Para controle total, use `bgColor`/`textColor` (veja seção abaixo).

:::corp-code
<CorpButton color="primary">Primary</CorpButton>
<CorpButton color="secondary">Secondary</CorpButton>
<CorpButton color="destructive">Destructive</CorpButton>
<CorpButton color="success">Success</CorpButton>
<CorpButton color="warning">Warning</CorpButton>
<CorpButton color="info">Info</CorpButton>
:::

| Color | Descrição | Cor |
|-------|-----------|-----|
| `primary` | Cor principal (padrão) | Laranja `#FF7133` |
| `secondary` | Cor secundária | Azul acinzentado |
| `destructive` | Ação destrutiva/perigo | Vermelho |
| `success` | Sucesso/confirmação | Verde |
| `warning` | Aviso/atenção | Amarelo |
| `info` | Informação | Azul |

#### Combinando Variant + Color

Você pode combinar **qualquer variant** com **qualquer color**:

:::corp-code
<!-- Solid + cores -->
<CorpButton variant="solid" color="success">Salvar</CorpButton>
<CorpButton variant="solid" color="destructive">Deletar</CorpButton>

<!-- Outline + cores -->
<CorpButton variant="outline" color="primary">Editar</CorpButton>
<CorpButton variant="outline" color="warning">Atenção</CorpButton>

<!-- Ghost + cores -->
<CorpButton variant="ghost" color="info">Info</CorpButton>
<CorpButton variant="ghost" color="destructive">Cancelar</CorpButton>
:::

#### Cores Customizadas

Você pode usar **qualquer cor** (HEX, RGB, HSL, variável CSS, nomes CSS):

:::corp-code
<!-- HEX -->
<CorpButton color="#8b5cf6" variant="solid">Roxo (HEX)</CorpButton>
<CorpButton color="#ec4899" variant="outline">Rosa (HEX)</CorpButton>

<!-- RGB -->
<CorpButton color="rgb(139, 92, 246)" variant="solid">RGB</CorpButton>

<!-- HSL -->
<CorpButton color="hsl(280, 87%, 65%)" variant="outline">HSL</CorpButton>

<!-- Variável CSS -->
<CorpButton color="var(--info)" variant="ghost">Variável CSS</CorpButton>

<!-- Nomes CSS -->
<CorpButton color="cyan" variant="ghost">Cyan (CSS)</CorpButton>
<CorpButton color="orange" variant="solid">Orange (CSS)</CorpButton>
:::

> **Hover funciona!** Cores customizadas (HEX, RGB, HSL, var(), nomes CSS) suportam hover/focus. Nomes CSS são convertidos automaticamente usando Canvas API.

#### bgColor e textColor (Overrides)

Para controle total e granular, use `bgColor` e `textColor` que **sobrescrevem** a prop `color`:

:::corp-code
<CorpButton bgColor="#22c55e" textColor="white">Custom Background</CorpButton>
<CorpButton variant="outline" bgColor="transparent" textColor="#f59e0b">Custom Outline</CorpButton>
<CorpButton variant="ghost" bgColor="transparent" textColor="#8b5cf6">Ghost Custom</CorpButton>
:::

**Hierarquia de prioridade:**
1. `bgColor` → **Override total do background** - bloqueia background e hover do `color`
2. `textColor` → **Override total do texto** - bloqueia cor do texto do `color`
3. `color` → Atalho semântico (gera background, texto, hover e focus automaticamente)

**Comportamento:**
- **`color`**: Gera bg, texto, hover e focus automáticos (variants: solid, outline, ghost, link)
- **`bgColor`**: Sobrescreve background **e bloqueia hover** (você controla o hover manualmente)
- **`textColor`**: Sobrescreve texto **e bloqueia classes de texto** (você controla a cor do texto)

**Quando usar:**
- **`color`**: Para cores semânticas ou customizadas com hover/focus automático ✅
- **`bgColor`/`textColor`**: Para controle manual total - gradientes, transparência, hover customizado

#### Exemplos Comparativos

**Exemplo 1: `color` vs `bgColor` (hover bloqueado)**

:::corp-code
<!-- COM hover automático (color) -->
<CorpButton color="#8b5cf6" variant="solid">Color com hover ✅</CorpButton>

<!-- SEM hover automático (bgColor bloqueia) -->
<CorpButton color="#8b5cf6" bgColor="#8b5cf6" variant="solid">bgColor bloqueia hover ❌</CorpButton>

<!-- Controle manual do hover (você controla) -->
<CorpButton bgColor="#8b5cf6" textColor="white" variant="solid">bgColor manual</CorpButton>
:::

**Exemplo 2: Ghost variant com override**

:::corp-code
<!-- Ghost com hover automático -->
<CorpButton color="success" variant="ghost">Hover verde automático ✅</CorpButton>

<!-- Ghost com bgColor (você controla hover) -->
<CorpButton bgColor="transparent" textColor="#22c55e" variant="ghost">Sem hover (manual)</CorpButton>
:::

**Exemplo 3: Combinando color + textColor**

:::corp-code
<!-- color gera bg+hover, textColor sobrescreve texto -->
<CorpButton color="primary" textColor="yellow" variant="solid">Bg laranja, texto amarelo</CorpButton>

<!-- Útil para ajustar contraste -->
<CorpButton color="#1e293b" textColor="#fbbf24" variant="solid">Contraste customizado</CorpButton>
:::

---

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

Use a prop `rounded` para controlar o border radius. Aceita **13 presets**, classes Tailwind custom, valores CSS, números ou booleanos:

:::corp-code
<!-- Presets básicos -->
<CorpButton rounded="none">None (0)</CorpButton>
<CorpButton rounded="xs">XS (2px)</CorpButton>
<CorpButton rounded="sm">Small (2px)</CorpButton>
<CorpButton rounded="default">Default (6px)</CorpButton>
<CorpButton rounded="md">Medium (6px)</CorpButton>
<CorpButton rounded="lg">Large (8px)</CorpButton>
<CorpButton rounded="xl">XL (12px)</CorpButton>

<!-- Presets grandes -->
<CorpButton rounded="2xl">2XL (16px)</CorpButton>
<CorpButton rounded="3xl">3XL (24px)</CorpButton>

<!-- Presets especiais -->
<CorpButton rounded="full">Full (9999px)</CorpButton>
<CorpButton rounded="pill">Pill (9999px)</CorpButton>
<CorpButton rounded="circle">Circle (9999px)</CorpButton>
<CorpButton rounded="shaped">Shaped (8px)</CorpButton>
:::

#### Rounded Custom (Classes Tailwind e CSS)

Além dos presets, aceita classes Tailwind, valores CSS, números (px) ou booleanos:

:::corp-code
<!-- Classes Tailwind custom -->
<CorpButton rounded="rounded-3xl" color="primary">Ultra Rounded</CorpButton>
<CorpButton rounded="rounded-tl-3xl rounded-br-3xl" color="success">Diagonal Cut</CorpButton>
<CorpButton rounded="rounded-l-full rounded-r-sm" color="info">Asymmetric</CorpButton>

<!-- Número (convertido para px) -->
<CorpButton :rounded="20" color="warning">20px</CorpButton>
<CorpButton :rounded="0" color="destructive">0px (none)</CorpButton>

<!-- Booleano (true → full, false → none) -->
<CorpButton :rounded="true" color="success">Boolean true (full)</CorpButton>
<CorpButton :rounded="false" color="secondary">Boolean false (none)</CorpButton>

<!-- Valores CSS -->
<CorpButton rounded="8px 24px" color="warning">Mixed Radius</CorpButton>
<CorpButton rounded="24px 24px 0 0" color="destructive">Top Rounded</CorpButton>
<CorpButton rounded="0 24px 24px 0" color="secondary">Right Rounded</CorpButton>
:::

**Exemplos Criativos:**

:::corp-code
<!-- Botão tipo "Tag" (canto esquerdo reto) -->
<CorpButton rounded="rounded-r-full" color="primary" prepend-icon="luc-tag">Tag Style</CorpButton>

<!-- Botão tipo "Arrow" (pontinha direita) -->
<CorpButton rounded="16px 24px 24px 16px" color="success" append-icon="luc-arrow-right">Next</CorpButton>

<!-- Botão tipo "Speech" (speech bubble) -->
<CorpButton rounded="20px 20px 20px 4px" color="info" prepend-icon="luc-message-circle">Chat</CorpButton>

<!-- Botão tipo "Ticket" -->
<CorpButton rounded="4px 20px 20px 4px" variant="outline" color="warning">Download Ticket</CorpButton>

<!-- Botão tipo "Capsule" (pill assimétrica) -->
<CorpButton rounded="rounded-l-full rounded-r-lg" color="destructive" prepend-icon="luc-trash">Delete</CorpButton>

<!-- Botão tipo "Modern Card" -->
<CorpButton rounded="rounded-2xl" variant="outline" color="secondary" size="lg">Modern Action</CorpButton>
:::

**Combinações com Variants:**

:::corp-code
<!-- Solid + Custom Rounded -->
<CorpButton variant="solid" rounded="rounded-tl-2xl rounded-br-2xl" color="primary">Solid Diagonal</CorpButton>

<!-- Outline + Asymmetric -->
<CorpButton variant="outline" rounded="rounded-l-full rounded-r-md" color="success">Outline Asymmetric</CorpButton>

<!-- Ghost + Ultra Rounded -->
<CorpButton variant="ghost" rounded="rounded-3xl" color="info">Ghost Ultra</CorpButton>
:::

### Stacked

Ícone acima do texto (layout vertical). Útil para navegação bottom ou ações com ícones proeminentes.

:::corp-code
<CorpButton stacked prepend-icon="luc-home">Home</CorpButton>
<CorpButton stacked prepend-icon="luc-settings" variant="outline">Config</CorpButton>
<CorpButton stacked prepend-icon="luc-user" color="secondary">Perfil</CorpButton>
<CorpButton stacked prepend-icon="luc-mail" variant="ghost">Email</CorpButton>
:::

### Icons

Use `prepend-icon` e `append-icon` para adicionar ícones Lucide ao botão. Os ícones são automaticamente dimensionados e posicionados.

:::corp-code
<CorpButton prepend-icon="luc-mail">Login com Email</CorpButton>
<CorpButton color="secondary" append-icon="luc-chevron-right">Próximo</CorpButton>
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
<CorpButton color="secondary" prepend-icon="luc-heart" p-icon-color="#ef4444">Curtir</CorpButton>
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
    color="secondary"
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
<CorpButton disabled>Primary</CorpButton>
<CorpButton color="secondary" disabled>Secondary</CorpButton>
<CorpButton color="destructive" disabled>Destructive</CorpButton>
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
<CorpButton color="destructive" prepend-icon="luc-trash">Excluir</CorpButton>
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

Para ações perigosas, combine `color="destructive"` com confirmação:

:::corp-code
<div class="flex gap-2">
  <CorpButton variant="ghost">Cancelar</CorpButton>
  <CorpButton color="destructive" prepend-icon="luc-trash">Excluir Permanentemente</CorpButton>

  <!-- Ghost com hover vermelho tonalizado (background 10% + texto 100%) -->
  <CorpButton variant="ghost" color="destructive" prepend-icon="luc-trash">Remover</CorpButton>
  <CorpButton variant="ghost" color="destructive" prepend-icon="luc-ban">Bloquear</CorpButton>
</div>
:::

### Formulário de Login

Exemplo de botão em contexto de formulário com ícones FontAwesome:

:::corp-code
<div class="w-64 space-y-3">
  <CorpButton block prepend-icon="luc-mail">Continuar com Email</CorpButton>

  <!-- Variável CSS do tema (se adapta ao light/dark) -->
  <CorpButton block variant="outline" prepend-icon="fa-fab fa-github" p-icon-color="var(--foreground)" text-color="var(--foreground)">Continuar com GitHub</CorpButton>

  <!-- RGB para ícone, HEX para texto -->
  <CorpButton block variant="outline" prepend-icon="fa-fab fa-google" p-icon-color="rgb(219, 68, 55)" text-color="#db4437">Continuar com Google</CorpButton>

  <!-- Nome CSS para ícone, variável CSS para texto -->
  <CorpButton block variant="outline" prepend-icon="fa-fab fa-discord" p-icon-color="#5865F2" text-color="var(--info)">Continuar com Discord</CorpButton>
</div>
:::

### Social Buttons

Botões com ícones de redes sociais usando FontAwesome Brands e cores oficiais:

:::corp-code
<!-- HEX -->
<CorpButton variant="outline" prepend-icon="fa-fab fa-twitter" p-icon-color="#1DA1F2" />

<!-- RGBA com opacidade -->
<CorpButton variant="outline" prepend-icon="fa-fab fa-facebook" p-icon-color="rgba(24, 119, 242, 0.9)" />

<!-- HSL -->
<CorpButton variant="outline" prepend-icon="fa-fab fa-instagram" p-icon-color="hsl(329, 70%, 58%)" />

<!-- Variável CSS do tema -->
<CorpButton variant="outline" prepend-icon="fa-fab fa-linkedin" p-icon-color="var(--info)" />

<!-- RGB -->
<CorpButton variant="outline" prepend-icon="fa-fab fa-youtube" p-icon-color="rgb(255, 0, 0)" />

<!-- Nome de cor CSS -->
<CorpButton variant="outline" prepend-icon="fa-fab fa-twitch" p-icon-color="purple" />
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
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link'` | `'solid'` | Estilo visual do botão |
| `color` | `'primary' \| 'secondary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| string` | `'primary'` | **Atalho semântico** que gera bg, texto, hover e focus automaticamente (HEX, RGB, HSL, CSS) |
| `bgColor` | `string` | `undefined` | **Override total** do background - sobrescreve `color` **e bloqueia hover automático** |
| `textColor` | `string` | `undefined` | **Override total** do texto - sobrescreve `color` **e bloqueia classes de texto** |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xs' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Tamanho do botão |
| `rounded` | `RoundedValue` | `'default'` | **13 presets**: default, none, xs, sm, md, lg, xl, 2xl, 3xl, full, pill, circle, shaped **OU** Tailwind class **OU** CSS value **OU** number (px) **OU** boolean (true=full, false=none) |
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

> **Hierarquia de cores:** `color` → `bgColor` (bloqueia bg+hover) → `textColor` (bloqueia texto). Use `color` para atalho semântico com hover/focus automático. Use `bgColor`/`textColor` para override total e controle manual.

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
