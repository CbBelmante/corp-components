# 🔧 Refinement Plan - Corp Components

> Plano de padronização e preparação para distribuição npm

---

## 📊 Status Geral

| Fase | Status | Progresso |
|------|--------|-----------|
| 1. CVA Padronização | ✅ Concluído | 7/7 |
| 2. Shared Variants | ✅ Concluído | 3/3 |
| 3. JSDoc Cleanup | ⚪ Pendente | 0/4 |
| 4. Build & Package | 🔄 Em Andamento | 2/8 |

---

## 📋 Fase 1: CVA Padronização

Garantir que todos os componentes sigam o mesmo padrão arquitetural.

### Padrão Definido:
- CVA define **estrutura** (variant, density, size)
- Componente trata **cores** via CSS variables runtime
- JSDoc explica variants no topo do CVA

### Tarefas:

- [x] **Button** - Limpar compoundVariants mortos (235→87 linhas)
- [x] **Radio** - Já estava ok, ajustado JSDoc
- [x] **Checkbox** - Implementado prop `variant` (solid/ghost/outline)
- [x] **Switch** - Implementado CVA com `variant` (solid/ghost) e `density`
- [x] **Badge** - Ajustado JSDoc + tipos explícitos no CVA
- [x] **Input** - Implementado CVA com `variant` (solo/filled) e `density`
- [x] **Select** - Implementado CVA com `variant` (solo/filled) e `density`

### Detalhes Checkbox (✅ CONCLUÍDO):
```
Implementado:
- Prop variant (solid/ghost/outline)
- Import de checkboxVariants, iconSizeMap do index.ts
- CSS variable --corp-runtime-checkbox-color-light (ghost)
- colorClasses com switch(variant)
- iconColorClass (branco para solid, colorido para ghost/outline)
- checkboxClasses usando CVA
- Template atualizado com checkboxClasses e iconColorClass
```

---

## 📋 Fase 2: Shared Variants (✅ CONCLUÍDO)

Centralizar tipos e valores compartilhados entre componentes.

### Estrutura Implementada:
```
src/components/ui/_shared/
  ├── variants.ts    # Tipos centralizados
  └── index.ts       # Re-exports
```

### Tarefas:

- [x] Criar `_shared/variants.ts` com tipos compartilhados
- [x] Extrair `Density`, `Variant` types
- [x] Atualizar componentes para usar shared types

### Tipos Centralizados:
```typescript
// _shared/variants.ts
export type Density = 'compact' | 'regular' | 'comfortable';
export type ActionVariant = 'solid' | 'ghost' | 'outline';  // Checkbox, Radio
export type SwitchVariant = 'solid' | 'ghost';              // Switch (sem outline)
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'; // Button (com link)
export type InputVariant = 'solo' | 'filled';               // Input, Select
export const densitySizeMap = { ... } as const;
```

### Componentes Atualizados:
| Componente | Imports de _shared |
|------------|-------------------|
| Checkbox | `Density`, `ActionVariant` |
| Radio | `Density`, `ActionVariant` |
| Switch | `Density`, `SwitchVariant` |
| Button | `ButtonVariant` |
| Input | `Density`, `InputVariant` |
| Select | `Density`, `InputVariant` |

---

## 📋 Fase 3: JSDoc Cleanup

Padronizar documentação seguindo JSDOC_GUIDE.md

### Padrão Definido:
- Mínimo necessário
- Sem info global (Vue, TypeScript)
- Explicar apenas não-óbvio
- DEPENDÊNCIAS ESPECIAIS apenas para libs externas especiais

### Tarefas:

- [ ] **Button** - Revisar JSDoc do componente
- [ ] **Radio** - Remover @example, limpar header
- [ ] **Checkbox** - Padronizar igual aos outros
- [ ] **Switch** - Padronizar igual aos outros

---

## 📋 Fase 4: Build & Package (npm)

Preparar para distribuição como biblioteca npm.

### Status package.json (Análise 11 JAN 2026):

| Campo | Status | Observação |
|-------|--------|------------|
| `name`, `version`, `type` | ✅ OK | `corp-components`, `0.1.0`, `module` |
| `main`, `module`, `types` | ✅ OK | Paths corretos para dist/ |
| `exports` | ✅ OK | types, import, require, style.css |
| `files` | ✅ OK | `["dist"]` |
| `peerDependencies` | ✅ OK | vue ^3.4.0 + FontAwesome (optional) |
| `prepublishOnly` | ✅ OK | `npm run build` |
| `keywords/repo/license` | ✅ OK | Metadados completos |

### Tarefas Pendentes:

- [x] ~~Configurar `vite.config.ts` (library mode)~~ → Já configurado
- [x] ~~Configurar `package.json` (exports, peerDependencies)~~ → Já configurado
- [ ] Verificar `src/index.ts` (entry point exporta todos componentes e tipos?)
- [ ] Adicionar `tailwindcss` como peerDependency (avaliar necessidade)
- [ ] Criar `tailwind.preset.js` para usuários
- [ ] Testar build final (`npm run build`)
- [ ] Testar instalação local (`npm link` ou `npm pack`)
- [ ] Publicar no npm (`npm publish --access public`)

### src/index.ts (entry point):
```typescript
// Componentes
export { CorpButton } from './components/ui/button';
export { CorpCheckbox } from './components/ui/checkbox';
export { CorpSwitch } from './components/ui/switch';
export { CorpRadioGroup, CorpRadioGroupItem } from './components/ui/radio-group';
export { CorpInput } from './components/ui/input';
export { CorpSelect } from './components/ui/select';

// Composables
export { useForm } from './composables/useForm';

// Utils
export { resolveColor, getComputedColor } from './utils/CorpColorUtils';

// Types
export type {
  Density,
  ActionVariant,
  SwitchVariant,
  ButtonVariant,
  InputVariant,
} from './components/ui/_shared';
```

---

## 🎯 Ordem de Execução

```
1. Fase 1: CVA Padronização
   └─ Checkbox (adicionar variant)
   └─ Switch (verificar)

2. Fase 2: Shared Variants
   └─ Criar _shared/variants.ts
   └─ Atualizar imports nos componentes

3. Fase 3: JSDoc Cleanup
   └─ Revisar todos os componentes

4. Fase 4: Build & Package
   └─ Configurar vite library mode
   └─ Configurar package.json
   └─ Criar entry point
   └─ Testar build
   └─ Publicar npm
```

---

## 📝 Notas

### Arquitetura de Cores (Definida)
```
resolveColor()      → Normaliza input (semantic → var(), hex → hex)
getComputedColor()  → Resolve CSS vars em runtime via DOM
CSS Variables       → --corp-runtime-{component}-{property}
```

### Componentes com Cores Runtime
- CorpButton ✅
- CorpCheckbox ✅
- CorpSwitch ✅
- CorpRadioGroupItem ✅
- CorpInput ✅
- CorpSelect ✅

### Arquitetura de Variants (Definida)
```
Componentes de AÇÃO/ESTADO (solid/ghost/outline):
- Button, Checkbox, Radio, Switch

Componentes de ENTRADA (solo/filled):
- Input, Select
  - solo: fundo + borda (padrão)
  - filled: só fundo, sem borda
```

### Arquitetura de Density (Definida)
```
Todos os componentes usam:
- compact: menor (h-8 para inputs)
- regular: meio-termo (h-9 para inputs) - PADRÃO
- comfortable: maior (h-10 para inputs)

Nota: "standard" foi renomeado para "regular"
```

### Documentação & Playground (✅ Atualizado)
```
Arquivos atualizados com novas props (variant, density):

Docs:
- docs/public/components/input.md (seções Variant, Density, API Reference)
- docs/public/components/select.md (seções Variant, Density, API Reference)
- docs/public/components/checkbox.md (density: regular)
- docs/public/components/switch.md (density: regular)

Playground:
- playground/pages/InputTest.vue (seções Variant, Density)
- playground/pages/SelectTest.vue (seções Variant, Density)
- playground/pages/CheckboxTest.vue (density: regular)
- playground/pages/SwitchTest.vue (density: regular)
- playground/pages/RadioGroupTest.vue (density: regular)
```

---

*Última atualização*: 11 JAN 2026
*Responsável*: Soldado Claude + CbBelmante
