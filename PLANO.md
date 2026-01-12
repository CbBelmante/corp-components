# 🚀 PLANO DE CRIAÇÃO: corp-components

<div align="center">

![Status](https://img.shields.io/badge/Status-EM_EXECUÇÃO-orange?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0-blue?style=for-the-badge)
![Estimativa](https://img.shields.io/badge/Estimativa-3--4_dias-green?style=for-the-badge)

**Biblioteca de Componentes Vue 3 + TypeScript**

</div>

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [FASE 1: Setup do Repositório](#-fase-1-setup-do-repositório-2-4h)
3. [FASE 2: Configuração de Build](#-fase-2-configuração-de-build-2-3h)
4. [FASE 3: Migração de Componentes](#-fase-3-migração-de-componentes-4-6h)
5. [FASE 4: Migração de Composables](#-fase-4-migração-de-composables-2-3h)
6. [FASE 5: Migração de Utils](#-fase-5-migração-de-utils-2-3h)
7. [FASE 6: Documentação](#-fase-6-documentação-2-3h)
8. [FASE 7: Testes e Publicação](#-fase-7-testes-e-publicação-2-3h)
9. [FASE 8: Integração no CbAdmin](#-fase-8-integração-no-cbadmin-1-2h)
10. [Referências](#-referências)

---

## 🎯 Visão Geral

### Objetivo
Criar biblioteca NPM `corp-components` com componentes Vue 3 reutilizáveis, extraídos do CbAdmin.

### 📍 Organização dos Repositórios

**Este repositório (`corp-components`):**
- 📦 Biblioteca de componentes standalone
- 🏠 Local onde os componentes **vivem e evoluem**
- 📚 Documentação e showcase (VitePress)
- 📤 Publicação no NPM

**Repositório de referência ([CbAdmin](../CbAdmin)):**
- 🔍 Fonte de **referência** dos componentes originais
- 🎯 Aplicação real usando os componentes
- 💡 Local onde surgem novos componentes e melhorias
- 🔄 Componentes são **extraídos** de lá e **migrados** para cá

> **Fluxo:** Componentes são criados/testados no CbAdmin → Extraídos para corp-components → Publicados no NPM → Importados de volta no CbAdmin

### Stack
- **Vue 3.5+** - Composition API
- **TypeScript 5.x** - Type safety 100%
- **Vite** - Build em library mode
- **Tailwind CSS** - Estilos (peer dependency)

### Estrutura Final
```
corp-components/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn (via CLI, base reka-ui)
│   │   │   ├── button/      # ✅ Instalado
│   │   │   │   ├── Button.vue
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── forms/           # Componentes de formulário customizados
│   │   │   └── index.ts
│   │   ├── layout/          # Componentes de layout
│   │   │   └── index.ts
│   │   ├── feedback/        # Componentes de feedback
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts         # cn() para class merging
│   ├── composables/
│   │   └── index.ts
│   ├── assets/
│   │   ├── main.css         # Tailwind + imports
│   │   └── theme.css        # Sistema de temas light/dark
│   └── index.ts
├── components.json          # Config shadcn-vue CLI
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js       # Tailwind v3.4.17
├── postcss.config.js
├── README.md
├── LICENSE
└── .gitignore
```

### Abordagem de Componentes
- **shadcn-vue CLI**: Componentes instalados via `npx shadcn-vue@latest add [component]`
- **Manipulação direta**: Sem wrapper de wrapper, editamos o shadcn direto
- **reka-ui**: Primitivos usados pelo shadcn (base real dos componentes)
- **VitePress**: Para documentação/showcase (como components.volan.com.br)

---

## 📊 Progresso Geral

| Fase | Descrição | Status | Progresso |
|------|-----------|--------|-----------|
| 1 | Setup do Repositório | ✅ Concluído | 7/7 |
| 2 | Configuração de Build | ✅ Concluído | 8/8 |
| 2.5 | Tailwind + shadcn-vue CLI | ✅ Concluído | 5/5 |
| 3 | Componentes UI (v1.0) | 🔄 Em Andamento | 8/15 |
| 4 | Migração de Composables | 🔄 Em Andamento | 1/6 |
| 5 | Migração de Utils | ⬜ Pendente | 0/7 |
| 6 | Documentação (VitePress) | ✅ Concluído | 8/8 |
| 7 | Testes e Publicação | 🔄 Em Andamento | 2/8 |
| 8 | Integração no CbAdmin | ⬜ Pendente | 0/5 |

**Total:** 33/64 tarefas (~52%)

### Componentes Públicos v1.0 (8/15 completos)

| Componente | Props Principais | Status |
|------------|------------------|--------|
| **CorpButton** | variant, size, rounded, block, stacked, loading, icons | ✅ Completo |
| **CorpIcon** | name, size, color, tag, start, end, clickable | ✅ Completo |
| **CorpInput** | variant, density, validation, clearable, masks, icons | ✅ Completo |
| **CorpSelect** | variant, density, validation, clearable, multiple, chips | ✅ Completo |
| **CorpCheckbox** | variant, density, color, validation, indeterminate | ✅ Completo |
| **CorpSwitch** | variant, density, color, validation, loading | ✅ Completo |
| **CorpRadioGroup** | variant, density, color, validation (inclui RadioGroupItem) | ✅ Completo |
| **CorpBadge** | variant, color, bgColor, textColor, icon, animation | ✅ Completo |

### Componentes Internos (não contam no total)

| Componente | Uso |
|------------|-----|
| CorpHintLine | Helper para validação (usado por Input, Select, etc.) |
| CorpThemeToggle | Toggle de tema (uso interno docs/playground) |
| CodePreview | Componente de docs (VitePress) |

### Componentes Pendentes v1.0 (7 restantes)

| Componente | Descrição |
|------------|-----------|
| **CorpAutocomplete** | Input com busca/seleção (combobox) |
| **CorpButtonGroup** | Grupo de botões toggle |
| **CorpTextarea** | Input multilinha |
| **CorpCard** | Container com header/content/footer |
| **CorpTooltip** | Dica flutuante |
| **CorpSlider** | Range input visual |
| **CorpProgress** | Barra de progresso |

---

## 🔧 FASE 1: Setup do Repositório (2-4h)

### Objetivo
Criar repositório GitHub e estrutura inicial do projeto.

### Tarefas

- [x] **1.1** Criar repositório no GitHub ✅ **(FEITO em 03/01/2025)**
  ```bash
  # Via GitHub CLI
  gh repo create corp-components --public --description "Vue 3 Component Library - TypeScript First"

  # OU manualmente em github.com/new
  ```
  > **Nota:** Repositório criado como privado (pode ser alterado depois)

- [x] **1.2** Clonar repositório ✅ **(FEITO em 03/01/2025)**
  ```bash
  cd ~/workspaces
  git clone git@github.com:SEU_USER/corp-components.git
  cd corp-components
  ```
  > **Localização:** `~/workspaces/corp-components`

- [x] **1.3** Inicializar projeto npm ✅ **(FEITO em 04/01/2025)**
  ```bash
  npm init -y
  ```
  > **Resultado:** package.json criado com name: "corp-components"

- [x] **1.4** Criar estrutura de pastas ✅ **(FEITO em 04/01/2025)**
  ```bash
  mkdir -p src/{components/{forms,ui,feedback,layout},composables,utils,types}
  ```
  > **Nota:** Adicionadas pastas `ui/` e `layout/` além do planejado original

- [x] **1.5** Criar .gitignore ✅ **(FEITO em 04/01/2025)**
  ```gitignore
  # Dependencies
  node_modules/

  # Build
  dist/

  # IDE
  .vscode/
  .idea/
  *.swp
  *.swo

  # OS
  .DS_Store
  Thumbs.db

  # Logs
  *.log
  npm-debug.log*

  # Test
  coverage/

  # Env
  .env
  .env.local
  ```

- [x] **1.6** Criar LICENSE (MIT) ✅ **(FEITO em 04/01/2025)**
  ```
  MIT License
  Copyright (c) 2025 CbBelmante
  ```
  > **Nota:** Licença MIT padrão em inglês (padrão internacional)

- [x] **1.7** Commit inicial ✅ **(FEITO em 04/01/2025)**
  ```bash
  git add .
  git commit -m "chore: initial project structure"
  git push origin main
  ```
  > **Nota:** Commit realizado pelo Cabo Belmante

### Critérios de Conclusão
- ✅ Repositório público no GitHub
- ✅ Estrutura de pastas criada
- ✅ .gitignore e LICENSE presentes
- ✅ Commit inicial feito

---

## ⚙️ FASE 2: Configuração de Build (2-3h)

### Objetivo
Configurar Vite em library mode, TypeScript e dependências.

### Tarefas

- [x] **2.1** Instalar dependências de desenvolvimento ✅ **(FEITO em 04/01/2025)**
  > 136 pacotes instalados (vite 7.0.6, vue 3.5.18, typescript 5.8.0)

- [x] **2.2** Instalar dependências de produção ✅ **(FEITO em 04/01/2025)**
  > reka-ui, class-variance-authority, clsx, tailwind-merge, lucide-vue-next

- [x] **2.3** Criar package.json completo ✅ **(FEITO em 04/01/2025)**
  > Configurado com exports, peerDependencies, scripts de build

- [x] **2.4** Criar vite.config.ts ✅ **(FEITO em 04/01/2025)**
  > Porta 2223, aliases (@, @base, @shadcn, @corp, etc.), library mode

- [x] **2.5** Criar tsconfig.json ✅ **(FEITO em 04/01/2025)**
  > Paths configurados, strict mode, declaration para .d.ts

- [x] **2.6** Criar src/index.ts e estrutura ✅ **(FEITO em 04/01/2025)**
  > Estrutura: base/shadcn, base/reka, corp/{forms,ui,feedback,layout}

- [x] **2.7** Testar build ✅ **(FEITO em 04/01/2025)**
  > Build passou! dist/ com corp-components.js, .umd.cjs, *.d.ts
  > **Erros corrigidos:** TS2306 (export {}), ordem do types no exports

- [x] **2.8** Commit de configuração ✅ **(PENDENTE - aguardando Cabo)**

### Critérios de Conclusão
- ✅ `npm run build` executa sem erros
- ✅ Pasta `dist/` gerada com arquivos corretos
- ✅ Types (.d.ts) sendo gerados

---

## 🧩 FASE 3: Migração de Componentes (4-6h)

### Objetivo
Migrar componentes de CbAdmin para corp-components, renomeando prefixo `Cb` → `Corp`.

### Mapeamento de Componentes

#### 🎯 Escopo v1.0 (15 componentes públicos)

| CbAdmin | corp-components | Release | Status |
|---------|---------------|---------|--------|
| Button (shadcn) | CorpButton.vue | 1.0 | ✅ Completo |
| CbIcon.vue | CorpIcon.vue | 1.0 | ✅ Completo |
| CbInput.vue | CorpInput.vue | 1.0 | ✅ Completo |
| CbSelect.vue | CorpSelect.vue | 1.0 | ✅ Completo |
| CbBadge.vue | CorpBadge.vue | 1.0 | ✅ Completo |
| CbCheckbox.vue | CorpCheckbox.vue | 1.0 | ✅ Completo |
| CbSwitch.vue | CorpSwitch.vue | 1.0 | ✅ Completo |
| N/A | CorpRadioGroup.vue | 1.0 | ✅ Completo |
| N/A | **CorpAutocomplete.vue** | 1.0 | ⬜ Pendente |
| CbButtonGroup.vue | **CorpButtonGroup.vue** | 1.0 | ⬜ Pendente |
| N/A | **CorpTextarea.vue** | 1.0 | ⬜ Pendente |
| N/A | **CorpCard.vue** | 1.0 | ⬜ Pendente |
| N/A | **CorpTooltip.vue** | 1.0 | ⬜ Pendente |
| N/A | **CorpSlider.vue** | 1.0 | ⬜ Pendente |
| N/A | **CorpProgress.vue** | 1.0 | ⬜ Pendente |

**v1.0 Status:** 8/15 completos (53%)

#### 🔧 Componentes Internos (não exportados)

| Componente | Uso |
|------------|-----|
| CorpHintLine.vue | Helper de validação (usado internamente) |
| CorpRadioGroupItem.vue | Parte do CorpRadioGroup |
| CorpThemeToggle.vue | Toggle tema (docs/playground) |

#### 📅 Escopo v1.1+ (8 componentes)

| CbAdmin | corp-components | Release | Status |
|---------|---------------|---------|--------|
| CbDate.vue | CorpDate.vue | 1.1 | ⬜ Pendente |
| CbTimeField.vue | CorpTimeField.vue | 1.1 | ⬜ Pendente |
| CbAddress.vue | CorpAddress.vue | 1.1 | ⬜ Pendente |
| CbAddressList.vue | CorpAddressList.vue | 1.1 | ⬜ Pendente |
| CbFileUpload.vue | CorpFileUpload.vue | 1.1 | ⬜ Pendente |
| CbImageUpload.vue | CorpImageUpload.vue | 1.1 | ⬜ Pendente |
| CbLocation.vue | CorpLocation.vue | 1.1 | ⬜ Pendente |
| N/A | CorpDateRange.vue | 1.1 | ⬜ Pendente |

### Tarefas

- [x] **3.1** Migrar CorpInput.vue ✅ **(CONCLUÍDO em 06/01/2025)**
  - Instalado Input shadcn via CLI
  - Renomeado Input.vue → CorpInput.vue
  - Adicionado todas features do CbInput (validation, clearable, masks, icons, counter)
  - Ajustado imports internos

- [x] **3.2** Migrar CorpSelect.vue ✅ **(CONCLUÍDO em 06/01/2025)**
  - Instalado Select shadcn via CLI
  - Renomeado Select.vue → CorpSelect.vue
  - Adicionado features: validation, clearable, **multiple**, **chips**
  - Normalização de items (string[] ou {value, label}[])

- [x] **3.3** Migrar CorpBadge.vue ✅ **(CONCLUÍDO em 06/01/2025, REFATORADO em 09/01/2026)**
  - Instalado Badge shadcn via CLI
  - Renomeado Badge.vue → CorpBadge.vue
  - Features: variant (solid/outline/ghost), color (shortcut), bgColor/textColor (overrides), opacity, icon, animation
  - CVA refatorado (sem cores embedded)
  - corp-def-badge-* defaults criados no theme.ts (SECONDARY colors)
  - Runtime CSS variables para cores customizadas
  - Integração com CorpIcon e CorpColorUtils
  - ⚠️ PENDENTE: Criar documentação Badge.md

- [x] **3.4** Migrar CorpHintLine.vue ✅ **(CONCLUÍDO em 05/01/2025)**
  - Componente auxiliar para mensagens de erro/hint
  - Features: errorMessages, hint, persistentHint, debug, hideDetails

- [x] **3.5** Migrar CorpCheckbox.vue ✅ **(CONCLUÍDO em 06/01/2025)**
  - Instalado Checkbox shadcn via CLI
  - Renomeado Checkbox.vue → CorpCheckbox.vue
  - Features: color (semantic/custom), validation, disabled colors (light/dark), indeterminate, density, trueValue/falseValue
  - Runtime CSS variables para cores e estados disabled

- [x] **3.6** Migrar CorpSwitch.vue ✅ **(CONCLUÍDO em 06/01/2025)**
  - Instalado Switch shadcn via CLI
  - Renomeado Switch.vue → CorpSwitch.vue
  - Features: color (semantic/custom), validation, loading, readonly, trueValue/falseValue
  - Runtime CSS variables para cores

- [ ] **3.7** Migrar CorpDate.vue
  - Copiar e renomear
  - Ajustar imports
  - Verificar dependência do DateUtils

- [ ] **3.6** Migrar CorpTimeField.vue
  - Copiar e renomear
  - Ajustar imports

- [ ] **3.7** Migrar CorpButtonGroup.vue
  - Copiar e renomear
  - Ajustar imports

- [ ] **3.8** Migrar CorpHintLine.vue
  - Copiar e renomear
  - Ajustar imports

- [ ] **3.9** Migrar CorpAddress.vue (se aplicável)
  - Avaliar dependências externas (Leaflet, etc.)
  - Decidir se inclui ou deixa para v2

- [ ] **3.10** Migrar CorpFileUpload.vue (se aplicável)
  - Avaliar dependências externas
  - Decidir se inclui ou deixa para v2

- [ ] **3.11** Migrar CorpImageUpload.vue (se aplicável)
  - Avaliar dependências externas (vue-advanced-cropper)
  - Decidir se inclui ou deixa para v2

- [ ] **3.12** Criar src/components/forms/index.ts
  ```typescript
  export { default as CorpInput } from './CorpInput.vue';
  export { default as CorpSelect } from './CorpSelect.vue';
  export { default as CorpCheckbox } from './CorpCheckbox.vue';
  export { default as CorpSwitch } from './CorpSwitch.vue';
  export { default as CorpDate } from './CorpDate.vue';
  export { default as CorpTimeField } from './CorpTimeField.vue';
  export { default as CorpButtonGroup } from './CorpButtonGroup.vue';
  // ... outros
  ```

- [ ] **3.13** Criar src/components/feedback/index.ts
  ```typescript
  export { default as CorpHintLine } from './CorpHintLine.vue';
  ```

- [ ] **3.14** Criar src/components/index.ts
  ```typescript
  export * from './forms';
  export * from './feedback';
  ```

- [ ] **3.15** Testar build com componentes
  ```bash
  npm run build
  npm run typecheck
  ```

### Critérios de Conclusão
- ✅ Todos os componentes prioritários migrados
- ✅ Build passa sem erros
- ✅ TypeScript sem erros

---

## 🔗 FASE 4: Migração de Composables (2-3h)

### Objetivo
Migrar composables essenciais do CbAdmin.

### Mapeamento

| CbAdmin | corp-components | Prioridade | Status |
|---------|---------------|------------|--------|
| useLucideIcon.ts | useLucideIcon.ts | 🔴 Alta | ✅ Migrado |
| useForm.ts | useForm.ts | 🔴 Alta | ⬜ Pendente |
| useToast.ts | useToast.ts | 🔴 Alta | ⬜ Pendente |
| useTheme.ts | useTheme.ts | 🟡 Média | ⬜ Pendente |

### Tarefas

- [ ] **4.1** Migrar useForm.ts
  - Copiar de `CbAdmin/src/composables/useForm.ts`
  - Ajustar imports internos
  - Remover dependências específicas do CbAdmin

- [ ] **4.2** Migrar useToast.ts
  - Copiar e ajustar
  - Verificar dependência do vue-sonner

- [ ] **4.3** Migrar useTheme.ts
  - Copiar e ajustar
  - Remover dependências localStorage específicas

- [ ] **4.4** Criar src/composables/index.ts
  ```typescript
  export { useForm } from './useForm';
  export { useToast } from './useToast';
  export { useTheme } from './useTheme';
  ```

- [ ] **4.5** Instalar dependências necessárias
  ```bash
  # Se useToast usa vue-sonner
  npm install vue-sonner
  ```

- [ ] **4.6** Testar build
  ```bash
  npm run build
  npm run typecheck
  ```

### Critérios de Conclusão
- ✅ Composables migrados e funcionando
- ✅ Sem dependências circulares
- ✅ Build passa

---

## 🛠️ FASE 5: Migração de Utils (2-3h)

### Objetivo
Migrar utilitários essenciais do CbAdmin.

### Mapeamento

| CbAdmin | corp-components | Prioridade | Status |
|---------|---------------|------------|--------|
| stringUtils.ts | stringUtils.ts | 🔴 Alta | ✅ Migrado |
| CorpLogger.ts | CorpLogger.ts | 🔴 Alta | ✅ Migrado |
| CbColorUtils.ts | CorpColorUtils.ts | 🔴 Alta | ✅ Migrado |
| CbClientUtils.ts | CorpClientUtils.ts | 🔴 Alta | ✅ Migrado |
| DateUtils.ts | dateUtils.ts | 🟡 Média | ⬜ Pendente |
| ValidatorUtils.ts | validators.ts | 🟡 Média | ⬜ Pendente |

### Tarefas

- [x] **5.1** Migrar stringUtils.ts ✅ **(MIGRADO anteriormente)**
  - Utilitários genéricos de string

- [x] **5.2** Migrar CorpLogger.ts ✅ **(MIGRADO anteriormente)**
  - Logger com níveis de log e formatação

- [x] **5.3** Migrar CorpColorUtils.ts ✅ **(CONCLUÍDO em 06/01/2025)**
  - Copiado de `CbAdmin/src/utils/CbColorUtils.ts`
  - Renomeado CbColorUtils → CorpColorUtils
  - Funções: hexToRgb, toRgba, darken, lighten, resolveColor, getLighterColor
  - SSR-safe (usa CorpClientUtils)

- [x] **5.4** Migrar CorpClientUtils.ts ✅ **(CONCLUÍDO em 06/01/2025)**
  - Copiado de `CbAdmin/src/utils/CbClientUtils.ts`
  - Renomeado CbClientUtils → CorpClientUtils
  - Funções SSR-safe: isClientSide, isServerSide, isBrowserAvailable, clientOnly

- [ ] **5.5** Migrar dateUtils.ts
  - Copiar de `CbAdmin/src/utils/DateUtils.ts`
  - Verificar dependência do dayjs
  - Instalar dayjs se necessário

- [ ] **5.6** Migrar validators.ts
  - Copiar validadores de `CbAdmin/src/validations/rules.ts`
  - Adaptar para uso standalone

- [x] **5.7** Atualizar src/utils/index.ts ✅ **(CONCLUÍDO em 06/01/2025)**
  ```typescript
  export * from './stringUtils';
  export * from './CorpLogger';
  export * from './CorpClientUtils';
  export * from './CorpColorUtils';
  // export * from './dateUtils';  // Pendente
  // export * from './validators'; // Pendente
  ```

- [ ] **5.6** Instalar dependências necessárias
  ```bash
  npm install dayjs
  ```

- [ ] **5.7** Testar build
  ```bash
  npm run build
  npm run typecheck
  ```

### Critérios de Conclusão
- ✅ Utils migrados e funcionando
- ✅ Dependências instaladas
- ✅ Build passa

---

## 📚 FASE 6: Documentação (2-3h)

### Objetivo
Criar documentação básica da biblioteca.

### Tarefas

- [ ] **6.1** Criar README.md completo
  ```markdown
  # corp-components

  Vue 3 Component Library - TypeScript First

  ## Installation

  ```bash
  npm install corp-components
  ```

  ## Usage

  ```vue
  <script setup lang="ts">
  import { CorpInput, CorpSelect } from 'corp-components';
  import 'corp-components/style.css';
  </script>

  <template>
    <CorpInput v-model="name" label="Nome" />
    <CorpSelect v-model="country" :options="countries" />
  </template>
  ```

  ## Components

  ### Forms
  - `CorpInput` - Text input with validation
  - `CorpSelect` - Select dropdown
  - `CorpCheckbox` - Checkbox input
  - `CorpSwitch` - Toggle switch
  - `CorpDate` - Date picker
  - `CorpTimeField` - Time input
  - `CorpButtonGroup` - Button group selector

  ### Feedback
  - `CorpHintLine` - Hint/helper text

  ## Composables

  - `useForm` - Form state management
  - `useToast` - Toast notifications
  - `useTheme` - Theme management

  ## License

  MIT
  ```

- [ ] **6.2** Criar CHANGELOG.md
  ```markdown
  # Changelog

  ## [0.1.0] - 2025-XX-XX

  ### Added
  - Initial release
  - Form components (Input, Select, Checkbox, Switch, Date, TimeField, ButtonGroup)
  - Feedback components (HintLine)
  - Composables (useForm, useToast, useTheme)
  - Utility functions (stringUtils, dateUtils, logger, validators)
  ```

- [ ] **6.3** Criar CONTRIBUTING.md
  - Guia básico de contribuição

- [ ] **6.4** Documentar props de cada componente
  - JSDoc em cada componente
  - Tabela de props no README

- [ ] **6.5** Criar exemplos de uso
  - Exemplo básico de form
  - Exemplo com validação
  - Exemplo com tema

- [ ] **6.6** Commit de documentação
  ```bash
  git add .
  git commit -m "docs: add README, CHANGELOG and examples"
  git push origin main
  ```

### Critérios de Conclusão
- ✅ README completo e claro
- ✅ CHANGELOG iniciado
- ✅ Exemplos de uso documentados

---

## 🧪 FASE 7: Testes e Publicação (2-3h)

### Objetivo
Testar localmente e publicar no NPM.

### Tarefas

- [ ] **7.1** Build final
  ```bash
  npm run build
  ```

- [ ] **7.2** Verificar arquivos gerados
  ```bash
  ls -la dist/
  # Deve conter:
  # - corp-components.js
  # - corp-components.umd.cjs
  # - index.d.ts
  # - style.css (se tiver estilos)
  ```

- [ ] **7.3** Testar com npm link
  ```bash
  # No diretório corp-components
  npm link

  # No diretório CbAdmin
  npm link corp-components
  ```

- [ ] **7.4** Testar import no CbAdmin
  ```typescript
  // Em algum componente de teste
  import { CorpInput } from 'corp-components';
  ```

- [x] **7.5** Criar conta NPM (se não tiver) ✅ **(FEITO em 03/01/2025)**
  ```bash
  npm adduser
  ```
  > **Nota:** Login via browser realizado com sucesso

- [x] **7.6** Verificar nome disponível ✅ **(FEITO em 03/01/2025)**
  ```bash
  npm search corp-components
  # Se já existir, escolher outro nome
  ```
  > **Resultado:** Nome `corp-components` DISPONÍVEL no NPM!

- [ ] **7.7** Publicar no NPM
  ```bash
  # Primeira publicação
  npm publish --access public

  # Verificar
  npm info corp-components
  ```

- [ ] **7.8** Criar release no GitHub
  ```bash
  git tag v0.1.0
  git push origin v0.1.0

  # Criar release no GitHub com notas
  gh release create v0.1.0 --notes "Initial release"
  ```

### Critérios de Conclusão
- ✅ Pacote publicado no NPM
- ✅ Release criado no GitHub
- ✅ `npm install corp-components` funciona

---

## 🔄 FASE 8: Integração no CbAdmin (1-2h)

### Objetivo
Substituir CbComponents locais pelo pacote NPM.

### Tarefas

- [ ] **8.1** Remover npm link
  ```bash
  # No CbAdmin
  npm unlink corp-components
  ```

- [ ] **8.2** Instalar via NPM
  ```bash
  npm install corp-components
  ```

- [ ] **8.3** Atualizar imports nos componentes
  ```typescript
  // ANTES
  import CbInput from '@/components/CbComponents/forms/CbInput.vue';

  // DEPOIS
  import { CorpInput } from 'corp-components';
  ```

- [ ] **8.4** Criar alias para compatibilidade (opcional)
  ```typescript
  // src/components/index.ts
  export { CorpInput as CbInput } from 'corp-components';
  export { CorpSelect as CbSelect } from 'corp-components';
  // ... etc
  ```

- [ ] **8.5** Testar aplicação completa
  ```bash
  npm run dev
  npm run build
  npm run typecheck
  ```

### Critérios de Conclusão
- ✅ CbAdmin usando corp-components do NPM
- ✅ Build passa
- ✅ Aplicação funciona normalmente

---

## 📋 Checklist Final

### Antes de Considerar Concluído

- [ ] Repositório GitHub público
- [ ] Pacote publicado no NPM
- [ ] README com instruções claras
- [ ] Todos os componentes prioritários migrados
- [ ] Composables funcionando
- [ ] Utils funcionando
- [ ] CbAdmin usando o pacote
- [ ] Build do CbAdmin passa
- [ ] Documentação atualizada

---

## 🔗 Referências

### Documentação
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Vue 3 SFC](https://vuejs.org/guide/scaling-up/sfc.html)
- [NPM Publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)

### Inspiração
- [Shadcn Vue](https://www.shadcn-vue.com/)
- [Vuetify](https://vuetifyjs.com/)
- [PrimeVue](https://primevue.org/)

### Arquivos Fonte (Repositório de Referência: CbAdmin)

**Localização:** `~/workspaces/CbAdmin/`

Os componentes originais ficam em:
- `CbAdmin/src/components/CbComponents/` - Componentes base (CbInput, CbSelect, etc.)
- `CbAdmin/src/composables/` - Composables (useForm, useToast, etc.)
- `CbAdmin/src/utils/` - Utilitários (stringUtils, dateUtils, etc.)
- `CbAdmin/src/validations/` - Validadores

> **Nota:** Estes arquivos servem como **referência** para extração. Os componentes migrados ficam em `corp-components/src/`.

---

## 📝 Notas de Desenvolvimento

### Decisões Tomadas
- **Prefixo:** `Corp` (CorpInput, CorpSelect, etc.) - de "Corporal" (Cabo em inglês)
- **Estratégia:** Repositório separado (Alpha) - em `~/workspaces/corp-components`
- **Publicação:** NPM (repositório privado no GitHub, pacote público no NPM)
- **Opção aprovada:** BRAVO (Setup Completo) com configurações copiadas do CbAdmin
- **Abordagem shadcn:** Usar CLI diretamente, manipular componentes sem wrapper extra
- **Estrutura:** `ui/` (shadcn), `forms/`, `layout/`, `feedback/` (sem pasta corp/ aninhada)
- **Tailwind:** v3.4.17 (mesma versão do CbAdmin, não v4)
- **Documentação:** VitePress (showcase visual como components.volan.com.br)

### Histórico de Execução
| Data | Ação | Status |
|------|------|--------|
| 03/01/2025 | Login NPM via browser | ✅ |
| 03/01/2025 | Nome `corp-components` verificado disponível | ✅ |
| 03/01/2025 | Repositório criado (privado) | ✅ |
| 03/01/2025 | Início da FASE 1 e 2 | ✅ |
| 04/01/2025 | FASE 1 completa (npm init, estrutura, gitignore, LICENSE) | ✅ |
| 04/01/2025 | Commit inicial realizado | ✅ |
| 04/01/2025 | FASE 2 completa (vite, tsconfig, package.json, build) | ✅ |
| 04/01/2025 | Erros TS2306 e exports corrigidos | ✅ |
| 04/01/2025 | Tailwind v3.4.17 configurado (mesmo do CbAdmin) | ✅ |
| 04/01/2025 | postcss.config.js e tailwind.config.js criados | ✅ |
| 04/01/2025 | shadcn-vue CLI inicializado (new-york style) | ✅ |
| 04/01/2025 | components.json configurado | ✅ |
| 04/01/2025 | Button instalado via `npx shadcn-vue@latest add button` | ✅ |
| 04/01/2025 | Estrutura reorganizada: ui/, forms/, layout/, feedback/ | ✅ |
| 04/01/2025 | Build OK: 77.92 kB (14.55 kB gzip) | ✅ |
| 04/01/2025 | README.md atualizado | ✅ |
| 04/01/2025 | VitePress instalado e configurado | ✅ |
| 04/01/2025 | Estrutura docs/ criada (config.ts, index.md) | ✅ |
| 04/01/2025 | Página do Button documentada | ✅ |
| 04/01/2025 | Scripts docsDev, docsBuild, docsPreview adicionados | ✅ |
| 05/01/2026 | CodePreview component criado (show/hide code toggle) | ✅ |
| 05/01/2026 | Fix: VitePress border reset em buttons | ✅ |
| 05/01/2026 | Button CVA: hover elevation effect adicionado | ✅ |
| 05/01/2026 | Button: prependIcon/appendIcon/loading props | ✅ |
| 05/01/2026 | useLucideIcon.ts migrado do CbAdmin | ✅ |
| 05/01/2026 | CorpIcon.vue criado (baseado no CbIcon) | ✅ |
| 05/01/2026 | Documentação do CorpIcon criada | ✅ |
| 05/01/2026 | Button.md atualizado com exemplos de ícones | ✅ |
| 05/01/2026 | CodePreview: animação expand/collapse suave (CSS Grid) | ✅ |
| 05/01/2026 | CodePreview: botão copiar customizado (CorpButton) | ✅ |
| 05/01/2026 | CodePreview movido para src/components/layout/ | ✅ |
| 05/01/2026 | Button.vue renomeado para CorpButton.vue | ✅ |
| 05/01/2026 | CorpButton: props `block`, `rounded`, `stacked` adicionadas | ✅ |
| 05/01/2026 | Documentação CorpButton atualizada (novos exemplos) | ✅ |
| 05/01/2026 | CorpIcon: props `tag`, `start`, `end`, `clickable` adicionadas | ✅ |
| 05/01/2026 | CorpIcon: emit `@click` para clickable icons | ✅ |
| 05/01/2026 | Documentação CorpIcon atualizada (novos exemplos) | ✅ |
| 05/01/2026 | Removidas referências "Vuetify-like" e "CbAdmin" do código | ✅ |
| 05/01/2026 | src/config.ts criado (centralização de aliases, ports, build config) | ✅ |
| 05/01/2026 | Scripts dev/devDocs/devPlayground/syncAliases criados (camelCase) | ✅ |
| 05/01/2026 | tailwind.config.js convertido para ESM (import ao invés de require) | ✅ |
| 05/01/2026 | Pasta config/ removida (aliases agora em src/config.ts) | ✅ |
| 05/01/2026 | npm run tscw adicionado (TypeScript watch mode) | ✅ |
| 05/01/2026 | PLANO.md copiado do CbAdmin e adaptado ao repositório | ✅ |
| 09/01/2026 | **🎨 Unified Color Architecture** implementada | ✅ |
| 09/01/2026 | Input: `borderColor` prop com runtime CSS vars + disabled colors | ✅ |
| 09/01/2026 | Select: `borderColor` + `chipColor` props com runtime CSS vars | ✅ |
| 09/01/2026 | Badge: refatorado seguindo padrão Button (`color` shortcut + `bgColor`/`textColor` overrides) | ✅ |
| 09/01/2026 | Badge: CVA refatorado (solid/outline/ghost sem cores embedded) | ✅ |
| 09/01/2026 | Badge: corp-def-badge-* defaults criados no theme.ts (SECONDARY colors) | ✅ |
| 09/01/2026 | Button: `bgColor`/`textColor` blocking behavior documentado | ✅ |
| 09/01/2026 | Checkbox: confirmado completo (color/disabled/validation) | ✅ |
| 09/01/2026 | Documentação atualizada: RGB/HEX/HSL/CSS vars em todos componentes | ✅ |
| 09/01/2026 | Playground: BorderColor/ChipColor/Disabled examples para todos | ✅ |

### 🎨 Arquitetura de Cores Unificada

**Implementado em 09/01/2026** - Todos os componentes agora seguem padrão consistente:

#### Padrão por Tipo de Componente:
- **Input/Select**: `borderColor` (controla borda + focus + focus ring)
- **Badge**: `bgColor` + `textColor` (controle independente)
- **Button**: `color` (shortcut) + `bgColor`/`textColor` (overrides com blocking)
- **Checkbox/Switch**: `color` (controla estado checked/on)

#### Runtime CSS Variables:
Todos os componentes usam variáveis CSS injetadas dinamicamente:
```css
--corp-runtime-{component}-{property}
--corp-runtime-{component}-{property}-focus
--corp-runtime-{component}-focus-ring
--corp-runtime-{component}-disabled-{property}-light
--corp-runtime-{component}-disabled-{property}-dark
```

#### Disabled Colors:
Suporte light/dark mode com variáveis separadas:
- Light mode: `lighten()` + `:disabled` CSS
- Dark mode: `darken()` + `.dark :disabled` CSS

#### Resolução de Cores:
`resolveColor()` aceita:
- Semânticas: `primary`, `success`, `destructive`
- HEX: `#8b5cf6`, `#ec4899`
- RGB: `rgb(139, 92, 246)`
- HSL: `hsl(280, 87%, 65%)`
- CSS vars: `var(--accent)`, `var(--info)`
- CSS names: `cyan`, `orange`, `pink`

### Próximos Passos Imediatos (v1.0)
- [x] Instalar VitePress para documentação ✅
- [x] Criar showcase do Button ✅
- [x] Unified Color Architecture ✅
- [x] CorpRadioGroup/CorpRadioGroupItem ✅
- [x] Shared Variants (_shared/variants.ts) ✅
- [ ] **CorpAutocomplete** (combobox)
- [ ] **CorpButtonGroup** (toggle group)
- [ ] **CorpTextarea** (multilinha)
- [ ] **CorpCard** (container)
- [ ] **CorpTooltip** (dica flutuante)
- [ ] **CorpSlider** (range input)
- [ ] **CorpProgress** (barra de progresso)
- [ ] Configurar preview live dos componentes na docs
- [ ] Build & Publicar npm

### Próximas Versões (v1.1+)
- [ ] CorpDate (calendar picker)
- [ ] CorpTimeField
- [ ] CorpDateRange
- [ ] CorpAddress/AddressList (Leaflet)
- [ ] CorpFileUpload/ImageUpload (cropper)
- [ ] CorpLocation
- [ ] Testes unitários (Vitest)
- [ ] CI/CD (GitHub Actions)

---

**Última atualização:** 11 de Janeiro de 2026
**Responsável:** Cabo Belmante + Soldado Claude
**Status:** 🔄 Em Execução (v1.0 - 8/15 componentes públicos - 53%)

---

**SELVA! PANTANAL! BRASIL! 🇧🇷🔰**
