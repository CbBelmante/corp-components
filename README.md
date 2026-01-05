# 🎨 corp-components - Vue 3 Component Library

Biblioteca de componentes Vue 3 TypeScript-first construída sobre shadcn-vue, reka-ui e Tailwind CSS.

## 📖 Sobre o Projeto

**corp-components** é uma biblioteca moderna de componentes Vue 3 projetada para projetos corporativos. Oferece componentes totalmente customizáveis, type-safe e acessíveis, construídos com as melhores práticas da comunidade.

> 💡 **Filosofia**: Você **possui** o código dos componentes. Não são wrappers - são instalados via CLI e ficam editáveis no seu projeto.

## 🎯 Visão Geral

Este projeto visa fornecer componentes reutilizáveis de alta qualidade com foco em:

- **🔒 TypeScript First** - Type safety em 100% do código
- **🎨 Customizável** - Componentes totalmente editáveis via shadcn-vue
- **♿ Acessível** - Primitivos reka-ui com suporte ARIA completo
- **⚡ Performático** - Vite library mode + tree-shaking otimizado
- **🎭 Themeable** - Sistema de temas dark/light com CSS variables
- **📦 Zero Config** - Import direto, funciona out-of-the-box


## ✨ Features Principais

- ✅ **TypeScript First** - Type safety completo
- ✅ **shadcn-vue Architecture** - Componentes editáveis (não wrappers)
- ✅ **Vite Library Mode** - Build otimizado para NPM
- ✅ **Dual Documentation** - Showcase (users) + Technical (contributors)
- ✅ **Theme System** - Dark/light mode com CSS variables
- 🔄 **80%+ Test Coverage** - Planejado para v0.2.0
- 🔄 **Storybook** - Planejado para v0.3.0
- 📦 **Tree-shakeable** - Import apenas o que você usa
- ♿ **Accessible** - ARIA compliant via reka-ui
- 📱 **Responsive** - Mobile-first design

## 🛠️ Stack Tecnológica

### Core

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Vue 3** | 3.5.18 | Framework principal |
| **TypeScript** | 5.8.0 | Type safety |
| **Vite** | 7.x | Build tool (library mode) |
| **Tailwind CSS** | 3.4.19 | Styling utility-first |

### Componentes

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **shadcn-vue** | latest | Componentes base (via CLI) |
| **reka-ui** | 2.7.0 | Primitivos headless |
| **class-variance-authority** | 0.7.1 | Variants pattern |
| **lucide-vue-next** | 0.544.0 | Sistema de ícones |

### Dev Tools

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **VitePress** | 1.6.4 | Documentação showcase |
| **vue-tsc** | 3.0.4 | Type checking |
| **Vitest** | - | Testing (planejado v0.2.0) |
| **@vue/test-utils** | - | Component tests (v0.2.0) |

## 📂 Estrutura do Projeto

```
corp-components/
├── src/                      # 🏗️ CÓDIGO FONTE
│   ├── components/           # 🧩 COMPONENTES VUE
│   │   ├── ui/               # Componentes shadcn-vue
│   │   │   ├── corpbutton/   # CorpButton (variants: default, destructive, outline, etc)
│   │   │   ├── icon/         # CorpIcon (lucide wrapper)
│   │   │   └── code-preview/ # CodePreview (syntax highlighting)
│   │   ├── forms/            # 🚧 Componentes de formulário (planejado)
│   │   ├── layout/           # 🚧 Componentes de layout (planejado)
│   │   └── feedback/         # 🚧 Toasts, alerts (planejado)
│   ├── composables/          # 🟩 COMPOSABLES VUE
│   │   └── useLucideIcon.ts  # Composable para ícones type-safe
│   ├── lib/                  # 📚 UTILITÁRIOS
│   │   └── utils.ts          # cn() - Tailwind merge utility
│   ├── types/                # 🔒 TIPOS TYPESCRIPT
│   │   └── index.ts          # Exports de tipos
│   ├── assets/               # 🎨 ASSETS
│   │   ├── main.css          # CSS principal + Tailwind imports
│   │   └── theme.css         # CSS Variables para temas
│   └── index.ts              # Entry point da biblioteca
├── docs/                     # 📚 DOCUMENTAÇÃO
│   ├── public/               # 📖 Showcase VitePress (usuários)
│   │   ├── .vitepress/       # Configuração VitePress
│   │   ├── components/       # Docs de componentes
│   │   └── index.md          # Home do showcase
│   └── dev/                  # 🛠️ Documentação técnica (contribuidores)
│       ├── index.md          # Índice da documentação técnica
│       ├── architecture.md   # Arquitetura do projeto
│       ├── contributing.md   # Guia de contribuição
│       └── testing.md        # Estratégia de testes
├── playground/               # 🎮 PLAYGROUND DE DESENVOLVIMENTO
│   ├── src/                  # App de teste local
│   └── index.html            # HTML do playground
├── dist/                     # 🔧 Build output (auto-gerado)
├── package.json              # 📦 Dependências e scripts
├── vite.config.ts            # ⚙️ Configuração Vite (library mode)
├── tailwind.config.js        # 🎨 Configuração Tailwind
├── tsconfig.json             # 🔒 Configuração TypeScript
├── components.json           # 🔧 Configuração shadcn-vue CLI
└── README.md                 # 📖 Este arquivo
```

## ⚙️ Como Começar

### Requisitos

- Node.js 20.19+ ou 22.12+
- npm ou pnpm

### Instalação (Futura - após NPM publish)

```bash
# Instalar via npm
npm install corp-components

# Importar CSS (necessário)
import 'corp-components/style.css'
```

### Uso Básico

```vue
<script setup lang="ts">
import { CorpButton, CorpIcon } from 'corp-components'
import 'corp-components/style.css'
</script>

<template>
  <CorpButton variant="default">
    <CorpIcon name="Plus" class="mr-2" />
    Adicionar Item
  </CorpButton>
</template>
```

### Desenvolvimento Local

```bash
git clone https://github.com/CbBelmante/corp-components.git
cd corp-components
npm install
npm run dev  # Playground (2223) + Showcase (2224)
```

> 📖 **Guia completo**: Veja [Contributing Guide](docs/dev/contributing.md) para setup detalhado e workflow de contribuição.

### Scripts Principais

```bash
npm run dev         # Desenvolvimento (playground + showcase)
npm run build       # Build da biblioteca
npm run typecheck   # Verificar tipos TypeScript
```

> 📖 **Todos os scripts**: Veja [Contributing Guide](docs/dev/contributing.md#scripts)

## 📚 Documentação

**Dois tipos de documentação:**

- **📖 Showcase** (`docs/public/`) - Exemplos interativos de componentes
- **🛠️ Technical** (`docs/dev/`) - [Arquitetura](docs/dev/architecture.md), [Contribuição](docs/dev/contributing.md), [Testes](docs/dev/testing.md)

```bash
npm run dev       # Acessa ambos: localhost:2223 (playground) + 2224 (showcase)
```

## 🎨 Customização & Theming

Personalize temas via CSS variables e extenda variants com CVA (class-variance-authority).

> 📖 **Guia completo**: Veja [Architecture](docs/dev/architecture.md#theming)

## 🧪 Testing (Planejado v0.2.0)

Stack planejada: **Vitest** + **@vue/test-utils** + **Playwright** (opcional)
Meta: **80%+ coverage** geral, **100%** componentes públicos

> 📖 **Guia completo**: Veja [Testing Guide](docs/dev/testing.md)

## 📦 Build & Distribution

Suporte: **ESM**, **UMD**, **TypeScript** (type definitions), **Tree-shaking**

> 📖 **Detalhes**: Veja [Architecture](docs/dev/architecture.md#build-system)

## 🤝 Contribuindo

Contribuições são bem-vindas!

```bash
git checkout -b feature/amazing-component
npm run dev
git commit -m "feat: adiciona componente X"
```

> 📖 **Guia completo**: [Contributing Guide](docs/dev/contributing.md)
> - Workflow detalhado (fork, branch, commit, PR)
> - Como adicionar componentes (shadcn-vue CLI ou custom)
> - Padrões e convenções do projeto

## 📝 Convenções

**Git Commits (Conventional Commits):**
`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

> 📖 **Guia completo**: Veja [Contributing Guide](docs/dev/contributing.md#convenções)

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- 🐛 Issues: [GitHub Issues](https://github.com/CbBelmante/corp-components/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/CbBelmante/corp-components/discussions)
- 📧 Email: support@corp-components.dev

## 🙏 Agradecimentos

Construído com ❤️ usando:

- [Vue 3](https://vuejs.org) - Framework progressivo
- [Vite](https://vite.dev) - Build tool super rápido
- [shadcn-vue](https://www.shadcn-vue.com) - Componentes editáveis
- [reka-ui](https://reka-ui.com) - Primitivos headless
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [lucide-vue-next](https://lucide.dev) - Beautiful icons

---

*📅 Criado em*: 18 JAN 2025  
*📅 Última atualização*: 17 NOV 2025  
*📋 Versão*: 4.0 - Pragmático (Menos é Mais)  
*👥 Responsável*: CbBelmante  
*🏷️ Tags*: [vue3, typescript, component-library, shadcn-vue, vite]

