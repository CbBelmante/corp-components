# Breadcrumb

O componente `CorpBreadcrumb` exibe a localização atual do usuário dentro da hierarquia de navegação de um site. Aceita array de items e renderiza automaticamente, com dividers customizáveis (texto ou ícones).

## Uso

Breadcrumbs em sua forma mais simples contêm uma lista de links separados por divisores, indicando a hierarquia de navegação.

:::corp-code
<CorpBreadcrumb :items="['Home', 'Usuários', 'Perfil']" />
:::

---

## Props

Uma ampla variedade de props pode ser empregada para modificar a aparência e funcionalidade do `CorpBreadcrumb`. Props como `items`, `divider` e `activeColor` oferecem uma abordagem direta para personalizar a navegação.

### Items (Array Mode)

A prop `items` aceita **array de strings** ou **array de objetos** com propriedades `title`, `to`, `href`, `icon` e `disabled`.

:::corp-code
<!-- Array de strings (simples) -->
<CorpBreadcrumb :items="['Home', 'Biblioteca', 'Dados']" />

<!-- Array de objetos (com links) -->
<CorpBreadcrumb :items="[
  { title: 'Home', to: '/' },
  { title: 'Usuários', to: '/users' },
  { title: 'João Silva' }
]" />

<!-- @disp-code -->
```vue
<script setup>
import { CorpBreadcrumb } from 'corp-components'

const breadcrumbItems = [
  { title: 'Home', to: '/' },
  { title: 'Usuários', to: '/users' },
  { title: 'João Silva' } // último item (página atual)
]
</script>

<template>
  <CorpBreadcrumb :items="breadcrumbItems" />
</template>
```
:::

**Propriedades do objeto item:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `title` | `string` | Texto do item (obrigatório) |
| `to` | `string \| object` | Rota Vue Router (ex: "/users" ou { name: "users", params: { id: 1 } }) |
| `href` | `string` | Link HTML (ex: "https://example.com") |
| `icon` | `string` | Nome do ícone Lucide (ex: "home", "users") |
| `disabled` | `boolean` | Desabilita o item (opacidade reduzida) |

### Divider

A prop `divider` define o **separador** entre os itens. Aceita **texto** (como `/`, `>`, `•`) ou **nome de ícone Lucide** (como `chevron-right`, `slash`, `dot`).

:::corp-code
<!-- Dividers com texto -->
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" divider="/" />
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" divider=">" />
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" divider="•" />

<!-- Dividers com ícones Lucide -->
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" divider="chevron-right" />
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" divider="slash" />
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" divider="dot" />
:::

> **Auto-detecção:** O componente detecta automaticamente se o `divider` é um ícone (se tiver mais de 1 caractere e não for `/`, `\`, `.` ou `-`). Para forçar texto, use o slot `divider`.

### Items com Ícones

Adicione ícones Lucide aos items usando a propriedade `icon`:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Home', to: '/', icon: 'home' },
  { title: 'Documentos', to: '/docs', icon: 'file-text' },
  { title: 'Relatório.pdf', icon: 'file' }
]" />

<!-- @disp-code -->
```vue
<script setup>
import { CorpBreadcrumb } from 'corp-components'

const items = [
  { title: 'Home', to: '/', icon: 'home' },
  { title: 'Documentos', to: '/docs', icon: 'file-text' },
  { title: 'Relatório.pdf', icon: 'file' }
]
</script>

<template>
  <CorpBreadcrumb :items="items" />
</template>
```
:::

### Items com Links

Use `to` para **Vue Router** ou `href` para **links HTML**:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Home', to: '/' },
  { title: 'GitHub', href: 'https://github.com' },
  { title: 'Documentação', to: { name: 'docs' } },
  { title: 'Página Atual' }
]" />

<!-- @disp-code -->
```vue
<script setup>
import { CorpBreadcrumb } from 'corp-components'

const items = [
  { title: 'Home', to: '/' }, // Vue Router
  { title: 'GitHub', href: 'https://github.com' }, // Link HTML
  { title: 'Docs', to: { name: 'docs' } }, // Named route
  { title: 'Página Atual' } // Sem link (último item)
]
</script>

<template>
  <CorpBreadcrumb :items="items" />
</template>
```
:::

### ActiveColor

A prop `activeColor` define a **cor do último item** (página atual). Aceita cores semânticas, HEX, RGB, HSL ou variáveis CSS:

:::corp-code
<!-- Cores semânticas -->
<CorpBreadcrumb :items="['Home', 'Usuários', 'Perfil']" active-color="primary" />
<CorpBreadcrumb :items="['Home', 'Config', 'Segurança']" active-color="success" />
<CorpBreadcrumb :items="['Home', 'Admin', 'Logs']" active-color="warning" />

<!-- Cores customizadas -->
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']" active-color="#8B4513" />
<CorpBreadcrumb :items="['Home', 'Blog', 'Artigo']" active-color="rgb(139, 69, 19)" />
<CorpBreadcrumb :items="['Home', 'Docs', 'API']" active-color="var(--info)" />
:::

### Density

A prop `density` controla o **espaçamento horizontal** entre os items. Aceita `compact`, `regular` ou `comfortable`:

:::corp-code
<CorpBreadcrumb :items="['Home', 'Usuários', 'Perfil']" density="compact" />
<CorpBreadcrumb :items="['Home', 'Usuários', 'Perfil']" density="regular" />
<CorpBreadcrumb :items="['Home', 'Usuários', 'Perfil']" density="comfortable" />
:::

| Density | Espaçamento | Uso recomendado |
|---------|-------------|-----------------|
| `compact` | `gap-1` (4px) | Toolbars, espaços limitados |
| `regular` | `gap-2` (8px) | Uso geral (padrão) |
| `comfortable` | `gap-3` (12px) | Páginas amplas, dashboards |

### Disabled

Desabilita todos os itens do breadcrumb (opacidade reduzida, sem interação):

:::corp-code
<CorpBreadcrumb :items="['Home', 'Usuários', 'Perfil']" disabled />

<!-- Ou desabilitar item individual -->
<CorpBreadcrumb :items="[
  { title: 'Home', to: '/' },
  { title: 'Admin', disabled: true },
  { title: 'Logs' }
]" />
:::

---

## Slots

O componente `CorpBreadcrumb` fornece slots que permitem customizar o conteúdo criado por suas props ou adicionar conteúdo adicional.

| Slot | Descrição | Scoped Props |
|------|-----------|--------------|
| **prepend** | Conteúdo antes do primeiro item | - |
| **append** | Conteúdo após o último item | - |
| **item** | Customiza renderização de cada item | `{ item, index }` |
| **divider** | Customiza renderização do separador | `{ item, index }` |

### Slot Prepend

Use o slot `prepend` para adicionar conteúdo antes do primeiro item:

:::corp-code
<CorpBreadcrumb :items="['Usuários', 'Perfil']">
  <template #prepend>
    <CorpIcon name="home" :size="16" class="mr-2" />
  </template>
</CorpBreadcrumb>
:::

### Slot Append

Use o slot `append` para adicionar conteúdo após o último item:

:::corp-code
<CorpBreadcrumb :items="['Home', 'Usuários']">
  <template #append>
    <CorpBadge variant="soft" color="primary" class="ml-2">Novo</CorpBadge>
  </template>
</CorpBreadcrumb>
:::

### Slot Item

Use o slot `item` para customizar a renderização de cada item:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Home', to: '/' },
  { title: 'Usuários', to: '/users' },
  { title: 'João Silva' }
]">
  <template #item="{ item, index }">
    <span class="uppercase text-xs font-bold">{{ item.title }}</span>
  </template>
</CorpBreadcrumb>

<!-- @disp-code -->
```vue
<script setup>
import { CorpBreadcrumb } from 'corp-components'

const items = [
  { title: 'Home', to: '/' },
  { title: 'Usuários', to: '/users' },
  { title: 'João Silva' }
]
</script>

<template>
  <CorpBreadcrumb :items="items">
    <template #item="{ item, index }">
      <span class="uppercase text-xs font-bold">
        {{ item.title }}
      </span>
    </template>
  </CorpBreadcrumb>
</template>
```
:::

### Slot Divider

Use o slot `divider` para customizar o separador:

:::corp-code
<CorpBreadcrumb :items="['Home', 'Produtos', 'Detalhes']">
  <template #divider>
    <span class="mx-2 text-primary">•</span>
  </template>
</CorpBreadcrumb>
:::

---

## Acessibilidade

O componente `CorpBreadcrumb` segue as diretrizes WAI-ARIA para breadcrumbs e suporta todos os recursos de acessibilidade esperados.

### Atributos ARIA

Por padrão, o componente inclui:

- **`aria-label="breadcrumb"`**: Indica o propósito da navegação para tecnologias assistivas
- **`<nav>` element**: Envolve o breadcrumb para identificá-lo como uma região de navegação
- **Links semânticos**: Usa `<a>` ou `<router-link>` com `href`/`to` adequados

### Navegação por Teclado

O componente é nativamente acessível via teclado:

- **Tab**: Move o foco para o próximo link
- **Shift + Tab**: Move o foco para o link anterior
- **Enter**: Ativa o link focado

### Indicação de Página Atual

O último item (página atual) usa `<BreadcrumbPage>` que renderiza um `<span>` (não link), indicando que é a localização atual.

### Estrutura Semântica

A estrutura HTML gerada é semanticamente correta:

```html
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="/users">Usuários</a></li>
    <li aria-hidden="true">/</li>
    <li><span>Perfil</span></li>
  </ol>
</nav>
```

---

## Exemplos

### Navegação de Dashboard

Breadcrumb típico de dashboard com ícones e links:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Dashboard', to: '/dashboard', icon: 'layout-dashboard' },
  { title: 'Usuários', to: '/dashboard/users', icon: 'users' },
  { title: 'João Silva', icon: 'user' }
]" divider="chevron-right" active-color="primary" />
:::

### E-commerce (Categorias)

Breadcrumb de navegação por categorias de produtos:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Home', to: '/' },
  { title: 'Eletrônicos', to: '/eletronicos' },
  { title: 'Computadores', to: '/eletronicos/computadores' },
  { title: 'Notebooks', to: '/eletronicos/computadores/notebooks' },
  { title: 'MacBook Pro 16"' }
]" divider=">" />
:::

### Documentação (Multi-nível)

Breadcrumb para navegação em documentação técnica:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Docs', to: '/docs', icon: 'book-open' },
  { title: 'Components', to: '/docs/components' },
  { title: 'Navigation', to: '/docs/components/navigation' },
  { title: 'Breadcrumb' }
]" divider="slash" active-color="success" density="compact" />
:::

### Admin Panel (Permissões)

Breadcrumb com item desabilitado (sem permissão):

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Admin', to: '/admin', icon: 'shield' },
  { title: 'Configurações', to: '/admin/config', disabled: true },
  { title: 'Usuários' }
]" divider="dot" active-color="warning" />
:::

### Breadcrumb com Badge

Combinando breadcrumb com badge no slot append:

:::corp-code
<CorpBreadcrumb :items="[
  { title: 'Inbox', to: '/inbox', icon: 'inbox' },
  { title: 'Mensagens não lidas' }
]">
  <template #append>
    <CorpBadge color="destructive" class="ml-2">3</CorpBadge>
  </template>
</CorpBreadcrumb>
:::

### Breadcrumb Compacto (Mobile)

Para mobile, use density compact e divider simples:

:::corp-code
<CorpBreadcrumb
  :items="['Home', 'Produtos', 'Detalhes']"
  divider=">"
  density="compact"
  active-color="primary"
/>
:::

---

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `items` | `Array<string \| IBreadcrumbItem>` | `[]` | **Array de strings** (ex: `['Home', 'Usuários']`) **OU** array de objetos com `{ title, to, href, icon, disabled }` |
| `divider` | `string` | `'/'` | **Separador** entre items. Aceita texto (`/`, `>`, `•`) **OU** nome de ícone Lucide (`chevron-right`, `slash`, `dot`) |
| `activeColor` | `string` | `undefined` | **Cor do último item** (página atual). Aceita cores semânticas (`primary`, `success`), HEX (`#FF7133`), RGB, HSL ou variáveis CSS (`var(--info)`) |
| `density` | `'compact' \| 'regular' \| 'comfortable'` | `'regular'` | **Espaçamento horizontal** entre items (compact=gap-1/4px, regular=gap-2/8px, comfortable=gap-3/12px) |
| `disabled` | `boolean` | `false` | **Desabilita todos os items** (opacidade reduzida, sem interação) |
| `class` | `string \| object \| array` | `undefined` | Classes CSS adicionais para o container |

### IBreadcrumbItem

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `title` | `string` | Texto do item (obrigatório) |
| `to` | `string \| object` | Rota Vue Router (ex: "/users" ou { name: "users", params: { id: 1 } }) |
| `href` | `string` | Link HTML (ex: "https://example.com") |
| `icon` | `string` | Nome do ícone Lucide (ex: "home", "users") |
| `disabled` | `boolean` | Desabilita o item (opacidade reduzida) |
