# Icon

O componente `CorpIcon` suporta duas bibliotecas de icones:

- **[Lucide Icons](https://lucide.dev/icons/)** - Padrao, +1400 icones SVG
- **[FontAwesome](https://fontawesome.com/icons/)** - Opcional, via prefixo `fa-`

## Uso

Use a prop `icon` para especificar o icone:

:::corp-code{lang=vue no-preview}
<!-- Lucide (padrao) -->
<CorpIcon icon="luc-home" />

<!-- FontAwesome -->
<CorpIcon icon="fa-fas fa-user" />
<CorpIcon icon="fa-fab fa-github" />
:::

### Tamanhos

Os icones vem em cinco tamanhos predefinidos:

- `x-small` (12px)
- `small` (16px)
- `default` (24px) - padrao
- `large` (32px)
- `x-large` (40px)

:::corp-code
<CorpIcon icon="luc-home" />
:::

---

## Bibliotecas de Icones

### Lucide Icons (Padrao)

[Lucide](https://lucide.dev/) e a biblioteca padrao com +1400 icones SVG otimizados.

**Formatos aceitos:**

:::corp-code
<CorpIcon icon="luc-user" />
<CorpIcon icon="user" />
<CorpIcon icon="User" />
<CorpIcon icon="user-plus" />
<CorpIcon icon="UserPlus" />
:::

> **Recomendacao:** Use o prefixo `luc-` para clareza no codigo.

### FontAwesome (Opcional)

Para usar FontAwesome, instale as dependencias base:

:::corp-code{tabs no-preview}
```bash [bun]
bun add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```

```bash [npm]
npm install @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```

```bash [yarn]
yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```
:::

Os icones **solid (fas)** e **brands (fab)** funcionam automaticamente apos instalacao.

#### Pacote Adicional (Regular)

Para usar icones **regular (far)**, instale e registre manualmente:

:::corp-code{tabs no-preview}
```bash [bun]
bun add @fortawesome/free-regular-svg-icons
```

```bash [npm]
npm install @fortawesome/free-regular-svg-icons
```

```bash [yarn]
yarn add @fortawesome/free-regular-svg-icons
```
:::

:::corp-code{lang=ts no-preview}
// main.ts
import { registerFontAwesomePack } from 'corp-components'
import { far } from '@fortawesome/free-regular-svg-icons'

registerFontAwesomePack(far)
:::

#### Uso com prefixo `fa-`

:::corp-code
<CorpIcon icon="fa-fas fa-user" />
<CorpIcon icon="fa-fas fa-heart" />
<CorpIcon icon="fa-fas fa-star" />
:::

---

## Props

### Size

Use a prop `size` para controlar o tamanho:

:::corp-code
<CorpIcon icon="luc-star" size="x-small" />
<CorpIcon icon="luc-star" size="small" />
<CorpIcon icon="luc-star" size="default" />
<CorpIcon icon="luc-star" size="large" />
<CorpIcon icon="luc-star" size="x-large" />
:::

### Color

Use a prop `color` para alterar a cor. Aceita **cores CSS**, **HEX**, **RGB** e **nomes do tema**:

:::corp-code
<!-- Cores CSS nomeadas -->
<CorpIcon icon="luc-heart" color="crimson" />
<CorpIcon icon="luc-check" color="seagreen" />

<!-- HEX -->
<CorpIcon icon="luc-star" color="#8b5cf6" />
<CorpIcon icon="luc-mail" color="#ec4899" />

<!-- RGB -->
<CorpIcon icon="luc-bell" color="rgb(6, 182, 212)" />
<CorpIcon icon="luc-settings" color="rgb(245, 158, 11)" />
:::

#### Cores do Tema

Use nomes do sistema de cores para consistência:

:::corp-code
<CorpIcon icon="luc-check" color="success" />
<CorpIcon icon="luc-alert-triangle" color="warning" />
<CorpIcon icon="luc-x" color="error" />
<CorpIcon icon="luc-info" color="info" />
<CorpIcon icon="luc-home" color="primary" />
<CorpIcon icon="luc-user" color="secondary" />
:::

| Nome | Cor Light | Cor Dark |
|------|-----------|----------|
| `primary` | Laranja (#FF7133) | Laranja (#FF7133) |
| `secondary` | Escuro (#001121) | Azul escuro (#1e3a5f) |
| `accent` | Azul médio (#7A9AB8) | Cinza (#21262d) |
| `success` | Verde (#22c55e) | Verde claro (#4ade80) |
| `warning` | Amarelo (#eab308) | Amarelo claro (#fbbf24) |
| `error` | Vermelho (#ef4444) | Vermelho claro (#f87171) |
| `info` | Azul (#3b82f6) | Azul claro (#60a5fa) |

#### Variáveis CSS e HSL

Também aceita variáveis CSS customizadas e formato HSL:

:::corp-code
<CorpIcon icon="luc-star" color="var(--accent)" />
<CorpIcon icon="luc-star" color="var(--primary)" />
<CorpIcon icon="luc-circle" color="hsl(18, 100%, 60%)" />
<CorpIcon icon="luc-square" color="hsl(142, 71%, 45%)" />
:::

### Stroke Width

Controle a espessura do traco (apenas Lucide). Padrao e `2`:

:::corp-code
<CorpIcon icon="luc-circle" :stroke-width="1" size="large" />
<CorpIcon icon="luc-circle" :stroke-width="2" size="large" />
<CorpIcon icon="luc-circle" :stroke-width="3" size="large" />
:::

### Start / End

Adiciona margem quando usado com texto:

:::corp-code
<span class="flex items-center"><CorpIcon icon="luc-mail" start />Enviar email</span>
<span class="flex items-center">Proximo<CorpIcon icon="luc-chevron-right" end /></span>
:::

### Clickable

Icones clicaveis ganham cursor pointer e hover effect:

:::corp-code
<CorpIcon icon="luc-heart" clickable @click="incrementCount" />
<CorpIcon icon="luc-trash" clickable color="red" />
<CorpIcon icon="luc-settings" clickable />
<span class="ml-4 text-sm text-muted-foreground">Cliques: {{ clickCount }}</span>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
const clickCount = ref(0)
</script>

<template>
  <CorpIcon icon="luc-heart" clickable @click="clickCount++" />
  <CorpIcon icon="luc-trash" clickable color="red" />
  <CorpIcon icon="luc-settings" clickable />
</template>
```
:::

### Disabled

Aplica `opacity: 0.5` e desabilita interacoes:

:::corp-code
<CorpIcon icon="luc-star" />
<CorpIcon icon="luc-star" disabled />
:::

### Tag

Muda o elemento HTML. Padrao e `<i>`:

:::corp-code
<CorpIcon icon="luc-star" tag="i" />
<CorpIcon icon="luc-star" tag="span" />
<CorpIcon icon="luc-star" tag="div" />
:::

---

## Exemplos

### Icones em Botoes

:::corp-code
<CorpButton prepend-icon="luc-mail">Enviar</CorpButton>
<CorpButton variant="secondary" append-icon="luc-chevron-right">Proximo</CorpButton>
<CorpButton variant="outline" prepend-icon="luc-download">Download</CorpButton>
:::

### Icon Buttons

:::corp-code
<CorpButton size="icon-sm" variant="outline" prepend-icon="luc-settings" />
<CorpButton size="icon" variant="outline" prepend-icon="luc-plus" />
<CorpButton size="icon-lg" variant="outline" prepend-icon="luc-trash" />
:::

### Spinners

Alguns icones de loading giram automaticamente:

:::corp-code
<CorpIcon icon="luc-loader-2" />
<CorpIcon icon="luc-loader" />
<CorpIcon icon="fa-fas fa-spinner" />
:::

### Icones de Tecnologias

Icones de tecnologias usando FontAwesome Brands:

:::corp-code
<CorpIcon icon="fa-fab fa-npm" size="large" color="#CB3837" />
<CorpIcon icon="fa-fab fa-js" size="large" color="#F7DF1E" />
<CorpIcon icon="fa-fab fa-vuejs" size="large" color="#4FC08D" />
<CorpIcon icon="fa-fab fa-react" size="large" color="#61DAFB" />
<CorpIcon icon="fa-fab fa-css3-alt" size="large" color="#1572B6" />
<CorpIcon icon="fa-fab fa-html5" size="large" color="#E34F26" />
<CorpIcon icon="fa-fab fa-node-js" size="large" color="#339933" />
<CorpIcon icon="fa-fab fa-github" size="large" />
<CorpIcon icon="fa-fab fa-docker" size="large" color="#2496ED" />
<CorpIcon icon="fa-fab fa-python" size="large" color="#3776AB" />
:::

### Comparando Bibliotecas

:::corp-code
<div class="flex gap-4 items-center">
  <div class="text-center">
    <CorpIcon icon="luc-home" size="large" />
    <p class="text-xs mt-1">Lucide</p>
  </div>
  <div class="text-center">
    <CorpIcon icon="fa-fas fa-home" size="large" />
    <p class="text-xs mt-1">FontAwesome</p>
  </div>
</div>
:::

---

## API Reference

### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `icon` | `string` | **required** | Identificador do icone |
| `size` | `'x-small' \| 'small' \| 'default' \| 'large' \| 'x-large' \| number \| string` | `'default'` | Tamanho |
| `color` | `string` | `'currentColor'` | Cor do icone |
| `strokeWidth` | `number` | `2` | Espessura do traco (Lucide) |
| `tag` | `'i' \| 'span' \| 'div'` | `'i'` | Elemento HTML |
| `start` | `boolean` | `false` | Margem a direita |
| `end` | `boolean` | `false` | Margem a esquerda |
| `clickable` | `boolean` | `false` | Habilita clique |
| `disabled` | `boolean` | `false` | Desabilita |

### Events

| Event | Payload | Descricao |
|-------|---------|-----------|
| `click` | `MouseEvent` | Emitido quando clicavel |

### Prefixos

| Prefixo | Biblioteca | Exemplo |
|---------|------------|---------|
| `luc-` | Lucide | `luc-home` |
| `fa-` | FontAwesome | `fa-fas fa-user` |

### FontAwesome Sets

| Set | Prefixo | Pacote |
|-----|---------|--------|
| Solid | `fas` | `@fortawesome/free-solid-svg-icons` |
| Regular | `far` | `@fortawesome/free-regular-svg-icons` |
| Brands | `fab` | `@fortawesome/free-brands-svg-icons` |
