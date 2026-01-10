# 🔧 Refinement Plan - Corp Components

> Plano de padronização e preparação para distribuição npm

---

## 📊 Status Geral

| Fase | Status | Progresso |
|------|--------|-----------|
| 1. CVA Padronização | ✅ Concluído | 7/7 |
| 2. Shared Variants | ⚪ Pendente | 0/3 |
| 3. JSDoc Cleanup | ⚪ Pendente | 0/4 |
| 4. Build & Package | ⚪ Pendente | 0/5 |

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

## 📋 Fase 2: Shared Variants

Centralizar tipos e valores compartilhados entre componentes.

### Estrutura Proposta:
```
src/
  components/
    ui/
      _shared/
        variants.ts      # Tipos e variants compartilhados
        index.ts         # Re-exports
```

### Tarefas:

- [ ] Criar `_shared/variants.ts` com tipos compartilhados
- [ ] Extrair `Density`, `Variant` types
- [ ] Atualizar componentes para usar shared types

### Conteúdo variants.ts:
```typescript
// Tipos compartilhados
export type Density = 'compact' | 'regular' | 'comfortable';

// Variants por tipo de componente
export type ActionVariant = 'solid' | 'ghost' | 'outline';  // Button, Checkbox, Radio, Switch
export type InputVariant = 'solo' | 'filled';               // Input, Select

// Density sizes (compartilhado)
export const densitySizeMap = {
  compact: { box: 'h-4 w-4', icon: 14, indicator: 'h-2 w-2' },
  regular: { box: 'h-[18px] w-[18px]', icon: 16, indicator: 'h-2.5 w-2.5' },
  comfortable: { box: 'h-5 w-5', icon: 18, indicator: 'h-3 w-3' },
} as const;
```

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

### Tarefas:

- [ ] Configurar `vite.config.ts` (library mode)
- [ ] Configurar `package.json` (exports, peerDependencies)
- [ ] Criar `src/index.ts` (entry point com todos exports)
- [ ] Configurar geração de tipos (`vite-plugin-dts`)
- [ ] Criar `tailwind.preset.js` para usuários

### package.json (estrutura):
```json
{
  "name": "corp-components",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.umd.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "vue": "^3.4.0",
    "tailwindcss": "^3.4.0"
  }
}
```

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
export type { Density, Variant } from './components/ui/_shared/variants';
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

*Última atualização*: 10 JAN 2026
*Responsável*: Soldado Claude + CbBelmante
