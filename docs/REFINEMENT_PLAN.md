# 🔧 Refinement Plan - Corp Components

> Plano de padronização e preparação para distribuição npm

---

## 📊 Status Geral

| Fase | Status | Progresso |
|------|--------|-----------|
| 1. CVA Padronização | 🟡 Em andamento | 2/4 |
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
- [ ] **Checkbox** - Implementar prop `variant` (solid/ghost/outline)
- [ ] **Switch** - Verificar se precisa `variant`

### Detalhes Checkbox:
```
Problemas:
- checkboxVariants no index.ts é CÓDIGO MORTO
- Componente não tem prop variant
- Só funciona como "solid" hardcoded

Solução:
- Adicionar prop variant ao CorpCheckbox.vue
- Implementar switch(variant) igual ao radio
- Usar checkboxVariants do index.ts
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
export type Density = 'compact' | 'standard' | 'comfortable';
export type Variant = 'solid' | 'ghost' | 'outline';

// Density sizes (compartilhado)
export const densitySizeMap = {
  compact: { box: 'h-4 w-4', icon: 14, indicator: 'h-2 w-2' },
  standard: { box: 'h-[18px] w-[18px]', icon: 16, indicator: 'h-2.5 w-2.5' },
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

---

*Última atualização*: 10 JAN 2026
*Responsável*: Soldado Claude + CbBelmante
