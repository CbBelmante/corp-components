# 🤝 Guia de Contribuição - corp-components

<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-GUIA-orange?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-COMPLETO-green?style=for-the-badge)

</div>

**Guia completo para contribuir com código, documentação e testes no corp-components.**

---

## 📋 Índice

1. [Bem-vindo](#-bem-vindo)
2. [Setup de Desenvolvimento](#-setup-de-desenvolvimento)
3. [Adicionando Componentes](#-adicionando-componentes)
4. [Convenções](#-convenções)
5. [Workflow de Contribuição](#-workflow-de-contribuição)
6. [Pull Requests](#-pull-requests)

---

## 👋 Bem-vindo!

Obrigado por considerar contribuir com **corp-components**!

Este projeto é uma biblioteca de componentes Vue 3 + TypeScript focada em qualidade, type safety e developer experience.

---

## 🚀 Setup de Desenvolvimento

### **Pré-requisitos**

- Node.js 20.19+ ou 22.12+
- Git
- npm ou pnpm

### **Instalação**

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU_USER/corp-components.git
cd corp-components

# 3. Instale dependências
npm install

# 4. Rode ambiente de desenvolvimento (playground + docs)
npm run dev
# Playground: http://localhost:2223
# Showcase: http://localhost:2224

# OU rode separadamente:
npm run devPlayground    # Apenas playground (localhost:2223)
npm run devDocs          # Apenas showcase (localhost:2224)
```

> 📖 **Lista completa de scripts**: Veja [README.md - Scripts Disponíveis](../../README.md#scripts-disponíveis)

### **Estrutura de Branches**

| Branch | Propósito |
|--------|-----------|
| `main` | Código de produção (releases) |
| `develop` | Branch de desenvolvimento |
| `feature/*` | Novas funcionalidades |
| `fix/*` | Correções de bugs |

---

## ➕ Adicionando Componentes

### **Opção 1: Componentes shadcn (Recomendado)**

Para componentes que existem no shadcn-vue:

```bash
# Instalar via CLI
npx shadcn-vue@latest add [component-name]

# Exemplo: instalar Select
npx shadcn-vue@latest add select

# Resultado:
# src/components/ui/select/Select.vue
# src/components/ui/select/SelectContent.vue
# src/components/ui/select/SelectItem.vue
# ...
```

**Próximos passos:**
1. Renomear componentes para prefixo `Corp`
2. Ajustar tipos TypeScript
3. Adicionar à exportação em `src/components/ui/index.ts`
4. Documentar em `docs/public/components/[nome].md`

### **Opção 2: Componentes Customizados**

Para componentes que não existem no shadcn:

```bash
# 1. Criar estrutura
mkdir -p src/components/forms/corp-input
touch src/components/forms/corp-input/CorpInput.vue
touch src/components/forms/corp-input/index.ts

# 2. Implementar componente
```

**Template Base:**

```vue
<script setup lang="ts">
import { computed } from 'vue'

interface CorpInputProps {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

const props = defineProps<CorpInputProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="corp-input">
    <label v-if="label">{{ label }}</label>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
    />
  </div>
</template>
```

**Exportação:**

```typescript
// src/components/forms/corp-input/index.ts
export { default as CorpInput } from './CorpInput.vue'

// src/components/forms/index.ts
export * from './corp-input'
```

### **Opção 3: Documentar Componente**

```bash
# Criar documentação
touch docs/public/components/input.md
```

**Template de Documentação:**

````markdown
# CorpInput

Input de texto com label e validação.

## Uso Básico

```vue
<script setup>
import { CorpInput } from 'corp-components'
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <CorpInput
    v-model="name"
    label="Nome"
    placeholder="Digite seu nome"
  />
</template>
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `string` | `''` | Valor do input |
| `label` | `string` | - | Label do input |
| `placeholder` | `string` | - | Placeholder |
| `disabled` | `boolean` | `false` | Desabilitar input |
````

---

## 📐 Convenções

### **TypeScript**

- ✅ **Sempre** use `interface` para props
- ✅ **Sempre** defina tipos explícitos
- ✅ Evite `any` (use `unknown` se necessário)

```typescript
// ✅ BOM
interface Props {
  variant: 'default' | 'outline'
  size: 'sm' | 'md' | 'lg'
}

// ❌ RUIM
interface Props {
  variant: any
  size: string
}
```

### **Nomenclatura**

| Item | Padrão | Exemplo |
|------|--------|---------|
| **Componentes** | `CorpNome` (PascalCase) | `CorpButton`, `CorpInput` |
| **Composables** | `useNome` (camelCase) | `useLucideIcon` |
| **Utils** | `camelCase` | `formatDate`, `cn` |
| **Arquivos** | `kebab-case` | `corp-button.vue` |
| **Pastas** | `kebab-case` | `corp-button/` |

### **CSS/Tailwind**

- ✅ **Preferir** Tailwind classes
- ✅ Usar CVA (class-variance-authority) para variants
- ❌ **Evitar** CSS inline ou `<style scoped>`

```vue
<!-- ✅ BOM -->
<button :class="cn('px-4 py-2 rounded', className)">
  Click me
</button>

<!-- ❌ RUIM -->
<button style="padding: 16px; background: blue;">
  Click me
</button>
```

### **Commits**

Seguir padrão **Conventional Commits**:

```bash
feat: adiciona CorpInput component
fix: corrige hover state no CorpButton
docs: atualiza README com exemplos
chore: atualiza dependências
refactor: simplifica lógica do CorpIcon
test: adiciona testes para CorpButton
```

---

## 🔄 Workflow de Contribuição

### **1. Criar Issue (Opcional)**

```
Title: Adicionar componente CorpInput

Descrição:
- Implementar input com label
- Suporte a validação
- Documentar no VitePress
```

### **2. Criar Branch**

```bash
# Feature
git checkout -b feature/corp-input

# Fix
git checkout -b fix/button-hover-state
```

### **3. Desenvolver**

```bash
# Trabalhe no código
# Rode ambiente de desenvolvimento completo
npm run dev  # Playground (2223) + Showcase (2224)

# OU rode apenas o necessário
npm run devPlayground    # Apenas playground para testar componentes
npm run devDocs          # Apenas showcase para ver documentação

# Rode type check
npm run typecheck
```

### **4. Commit**

```bash
git add .
git commit -m "feat: adiciona CorpInput component"

# Git hooks automáticos (Husky + lint-staged):
# ✓ ESLint --fix nos arquivos alterados
# ✓ Prettier nos arquivos alterados
# ✓ Commit só prossegue se tudo estiver OK
```

### **5. Push**

```bash
git push origin feature/corp-input
```

---

## 📤 Pull Requests

### **Checklist Antes de Abrir PR**

- [ ] Código compila sem erros (`npm run build`)
- [ ] TypeScript passa (`npm run typecheck`)
- [ ] Componente exportado em `src/components/index.ts`
- [ ] Documentação criada em `docs/public/components/`
- [ ] Commits seguem padrão Conventional Commits

### **Template de PR**

```markdown
## Descrição
Adiciona componente CorpInput com suporte a label e validação.

## Tipo de Mudança
- [ ] Bug fix
- [x] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [x] Build passa
- [x] TypeScript passa
- [x] Documentação criada
- [ ] Testes adicionados (futuro)

## Screenshots
(se aplicável)
```

---

## 🧪 Testes

> **Status:** 🚧 Em desenvolvimento - será implementado na v0.2.0

Futuramente teremos:
- Unit tests com Vitest
- Component tests com @vue/test-utils

---

## ❓ Dúvidas?

- 📖 Leia [Architecture](./architecture.md)
- 💬 Abra uma [Discussion](https://github.com/CbBelmante/corp-components/discussions)
- 🐛 Reporte um [Issue](https://github.com/CbBelmante/corp-components/issues)

---

*📅 Criado em*: 5 JAN 2026
*📅 Última atualização*: 5 JAN 2026
*📋 Versão*: 1.0
*👥 Responsável*: CbBelmante
*🏷️ Tags*: [contributing, guia, desenvolvimento, git]
