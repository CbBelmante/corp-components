# 🏗️ Arquitetura - corp-components

<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-ARQUITETURA-lightblue?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-COMPLETO-green?style=for-the-badge)

</div>

**Visão geral da arquitetura técnica, decisões de design e estrutura do projeto corp-components.**

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Stack Tecnológica](#-stack-tecnológica)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Build System](#-build-system)
5. [Componentes](#-componentes)
6. [Documentação](#-documentação)

---

## 🎯 Visão Geral

corp-components é uma **biblioteca Vue 3** construída com **TypeScript** e **Vite** em library mode.

### **Princípios Fundamentais**

- ✅ **TypeScript First** - Type safety em 100% do código
- ✅ **shadcn-vue** - Componentes instalados via CLI (não wrappers)
- ✅ **Tailwind CSS** - Styling utility-first
- ✅ **Vite Library Mode** - Build otimizado para distribuição NPM

---

## 🛠️ Stack Tecnológica

### **Core**

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Vue 3** | 3.5+ | Framework principal |
| **TypeScript** | 5.8 | Type safety |
| **Vite** | 7.x | Build tool (library mode) |
| **Tailwind CSS** | 3.4.19 | Styling |

### **Componentes**

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **shadcn-vue** | latest | Componentes base (via CLI) |
| **reka-ui** | 2.7.0 | Primitivos headless |
| **class-variance-authority** | 0.7.1 | Variants pattern |
| **lucide-vue-next** | 0.544.0 | Ícones |

### **Dev Tools**

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **VitePress** | 1.6.4 | Documentação/showcase |
| **vue-tsc** | 3.0.4 | Type checking |
| **concurrently** | 9.2.1 | Scripts paralelos |

---

## 📂 Estrutura do Projeto

```
corp-components/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes shadcn (via CLI)
│   │   ├── forms/        # Componentes de formulário
│   │   ├── layout/       # Componentes de layout
│   │   └── feedback/     # Componentes de feedback
│   ├── composables/      # Vue composables
│   ├── utils/            # Funções utilitárias
│   ├── lib/              # Helpers (cn, etc)
│   └── types/            # TypeScript types
├── docs/
│   ├── public/           # Showcase VitePress (usuários)
│   └── dev/              # Docs técnicas (desenvolvedores)
├── playground/           # App de desenvolvimento/testes
└── dist/                 # Build output (gerado)
```

### **Convenções de Nomenclatura**

| Item | Padrão | Exemplo |
|------|--------|---------|
| **Componentes** | `CorpNome.vue` | `CorpButton.vue`, `CorpIcon.vue` |
| **Composables** | `useNome.ts` | `useLucideIcon.ts` |
| **Utils** | `camelCase.ts` | `stringUtils.ts` |
| **Pastas** | `kebab-case` | `corp-button/`, `icon/` |

---

## ⚙️ Build System

### **Vite Library Mode**

```typescript
// vite.config.ts (simplificado)
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CorpComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `corp-components.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
})
```

### **Package Exports**

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/corp-components.js",
      "require": "./dist/corp-components.umd.cjs"
    },
    "./style.css": "./dist/style.css"
  }
}
```

### **Scripts Principais**

```bash
# Desenvolvimento
npm run devPlayground    # Playground em localhost:5173
npm run devDocs         # Docs em localhost:5174

# Build
npm run build           # Build da biblioteca
npm run buildDocs       # Build da documentação

# Qualidade
npm run typecheck       # Verificar tipos TypeScript
```

---

## 🧩 Componentes

### **Abordagem shadcn-vue**

Usamos **shadcn-vue CLI** para instalar componentes base:

```bash
# Instalar componente
npx shadcn-vue@latest add button

# Resultado:
# src/components/ui/button/Button.vue (editável)
# src/components/ui/button/index.ts
```

**Filosofia:**
- ❌ **Não são wrappers** - código é copiado para o projeto
- ✅ **Totalmente editável** - você possui o código
- ✅ **Base reka-ui** - primitivos headless robustos

### **Estrutura de um Componente**

```
src/components/ui/button/
├── CorpButton.vue      # Componente principal
├── index.ts            # Exportação
└── button.styles.ts    # CVA variants (opcional)
```

### **Exportação**

```typescript
// src/components/ui/index.ts
export { default as CorpButton } from './button/CorpButton.vue'
export { default as CorpIcon } from './icon/CorpIcon.vue'
```

---

## 📚 Documentação

### **Dois Tipos de Documentação**

#### **1. Public (`docs/public/`)** - VitePress
- **Público-alvo**: Usuários finais (devs que vão usar a lib)
- **Conteúdo**: Exemplos de uso, props, demos
- **Tecnologia**: VitePress
- **URL**: `npm run devDocs` → http://localhost:5174

#### **2. Dev (`docs/dev/`)** - Markdown
- **Público-alvo**: Contribuidores (devs que vão mexer no código)
- **Conteúdo**: Arquitetura, guias técnicos, decisões
- **Tecnologia**: Markdown puro
- **Localização**: `docs/dev/`

### **Padrão de Documentação**

Todos os docs técnicos seguem estrutura padronizada:
- ✅ Badges (Tipo, Versão, Status)
- ✅ Descrição curta (1-2 linhas)
- ✅ Índice
- ✅ Rodapé com metadados

---

## 🔗 Referências

### **Documentação Interna**
- [Contributing Guide](./contributing.md)
- [Testing Guide](./testing.md)
- [Showcase Público](../public/)

### **Documentação Externa**
- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [reka-ui](https://reka-ui.com/)

---

*📅 Criado em*: 5 JAN 2026
*📅 Última atualização*: 5 JAN 2026
*📋 Versão*: 1.0
*👥 Responsável*: CbBelmante
*🏷️ Tags*: [arquitetura, vue3, typescript, vite, shadcn-vue]
