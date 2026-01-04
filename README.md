# corp-components

Biblioteca de componentes Vue 3 para projetos corporativos.

## Estrutura

```
src/
├── components/
│   ├── ui/           # Componentes shadcn (base reka-ui)
│   │   └── button/   # Button com variants
│   ├── forms/        # Componentes de formulario
│   ├── layout/       # Componentes de layout
│   └── feedback/     # Toasts, alerts, etc
├── lib/
│   └── utils.ts      # Utilitarios (cn, etc)
└── assets/
    ├── main.css      # CSS principal com Tailwind
    └── theme.css     # Sistema de temas light/dark
```

## Instalacao

```bash
npm install corp-components
```

## Uso

```vue
<script setup>
import { Button } from 'corp-components'
</script>

<template>
  <Button variant="default">Click me</Button>
</template>
```

## Tecnologias

- Vue 3 + TypeScript
- Vite (library mode)
- Tailwind CSS v3.4
- shadcn-vue (new-york style)
- reka-ui (primitives)
- class-variance-authority (variants)

## Desenvolvimento

```bash
# Instalar dependencias
npm install

# Build
npm run build

# Type check
npm run type-check
```

## Componentes Disponiveis

### UI (shadcn)
- [x] Button

### Forms
- [ ] Input
- [ ] Select
- [ ] Checkbox

### Layout
- [ ] Card
- [ ] Sidebar

### Feedback
- [ ] Toast
- [ ] Alert

## Proximos Passos

- [ ] VitePress para documentacao
- [ ] Showcase de componentes
- [ ] Publicar no NPM
