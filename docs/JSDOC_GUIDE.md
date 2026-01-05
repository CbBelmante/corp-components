# 📚 JSDoc Guide

<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-GUIA-orange?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-4.0_Pragmático-blue?style=for-the-badge)
![Filosofia](https://img.shields.io/badge/Filosofia-Menos_é_Mais-green?style=for-the-badge)

</div>

## 🎯 Filosofia Core

> **"Documente apenas o que NÃO É ÓBVIO. Se o código fala por si, deixe-o falar."**

### **Regra de Ouro Expandida**

```
📖 DOCUMENTE: Propósito, regras de negócio, side-effects, comportamentos especiais
❌ NÃO DOCUMENTE: Sintaxe óbvia, padrões do projeto, implementações triviais
```

---

## 🚫 O Que NUNCA Documentar (Zero Tolerância para Redundância)

### **1. Informações Globais do Projeto**

❌ **NUNCA repita isso em cada arquivo:**

```typescript
// ❌ ERRADO - Poluição repetitiva
/**
 * @description Componente usando Vue 3 Composition API
 * @framework Vue 3
 * @language TypeScript
 * @architecture Composition API
 */

// ❌ ERRADO - Óbvio demais
/**
 * 🔗 DEPENDÊNCIAS:
 * - Vue 3 Composition API
 * - TypeScript
 * - Vite
 * - CbLogger (usado em todo projeto)
 */
```

✅ **CORRETO - Documente UMA VEZ no README do projeto:**

```markdown
# Stack Técnico Global

**Framework:** Vue 3 (Composition API) + TypeScript
**Build Tool:** Vite
**UI Base:** Shadcn Vue + TailwindCSS
**Logging:** CbLogger (padrão em todo projeto)
**State:** Pinia Stores
**Forms:** Vee-Validate + Zod
```

### **2. Props e Emits Óbvios**

❌ **NUNCA documente props triviais:**

```vue
<script setup lang="ts">
// ❌ POLUIÇÃO DESNECESSÁRIA
/**
 * @prop {string} title - O título do componente
 * @prop {boolean} disabled - Se está desabilitado
 * @prop {string} placeholder - Placeholder do input
 */
defineProps<{
  title?: string
  disabled?: boolean
  placeholder?: string
}>()
</script>
```

✅ **CORRETO - TypeScript já documenta:**

```vue
<script setup lang="ts">
// Props auto-documentadas por TypeScript
defineProps<{
  title?: string
  disabled?: boolean
  placeholder?: string
}>()

// OU se precisar comentar algo especial:
defineProps<{
  title?: string
  disabled?: boolean
  /** Máximo 50 caracteres - validado no backend */
  placeholder?: string
}>()
</script>
```

### **3. Funções Óbvias**

❌ **JSDoc pesado para função simples:**

```typescript
/**
 * Retorna o nome completo do usuário
 * 
 * @param firstName - Primeiro nome do usuário
 * @param lastName - Último nome do usuário
 * @returns O nome completo concatenado
 * 
 * @example
 * ```ts
 * getFullName('John', 'Doe') // 'John Doe'
 * ```
 */
export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`
}
```

✅ **CORRETO - Comentário inline ou nada:**

```typescript
// Retorna nome completo
export const getFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`

// OU simplesmente (tipos já explicam):
export const getFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`
```

### **4. Imports Padrão do Projeto**

❌ **NUNCA liste imports óbvios:**

```typescript
// ❌ POLUIÇÃO
// ============== DEPENDÊNCIAS EXTERNAS ==============
import { ref, computed, watch } from 'vue' // Vue 3 Composition API
import { Button } from '@/components/shadcn/button' // Shadcn Button
import { Card } from '@/components/shadcn/card' // Shadcn Card
```

✅ **CORRETO - Liste apenas bibliotecas especiais:**

```typescript
// ============== DEPENDÊNCIAS EXTERNAS ==============
import Leaflet from 'leaflet' // Mapas interativos
import { createClient } from '@supabase/supabase-js' // Auth backend

// ============== DEPENDÊNCIAS INTERNAS ==============
import { ref, computed } from 'vue'
import { Button, Card } from '@/components/shadcn'
```

---

## ✅ O Que SIM Documentar (Apenas o Não-Óbvio)

### **1. Cabeçalho de Arquivo - Apenas para Arquivos Complexos**

✅ **Use APENAS quando o arquivo tem:**
- Lógica de negócio complexa
- Múltiplas responsabilidades
- Dependências externas especiais
- Comportamentos não-óbvios

```typescript
/**
 * 🛡️ useAuth - Autenticação + Isolamento MultiCompany
 * 
 * REGRAS DE NEGÓCIO:
 * - SUPERADMIN: acesso total (todas empresas)
 * - ADMIN: apenas empresas vinculadas
 * - USER: apenas empresa ativa
 * 
 * ⚠️ SIDE-EFFECTS:
 * - Modifica globalStore ao fazer login/logout
 * - SSR-safe: retorna valores seguros no servidor
 * 
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - Supabase Auth (autenticação real)
 * - useGlobalStore (fonte da verdade)
 */
```

❌ **NÃO use cabeçalho para arquivos simples:**

```typescript
// ❌ DESNECESSÁRIO
/**
 * 🛠️ stringUtils - Utilitários de String
 * 
 * Funções utilitárias para manipulação de strings.
 * Todas as funções são puras (sem side-effects).
 */

// ✅ CORRETO - Nada! O nome do arquivo já explica
```

### **2. Funções com Regras de Negócio**

✅ **Documente regras não-óbvias:**

```typescript
/**
 * Valida CNPJ com regra especial: matriz deve ter /0001, filial /0002+
 */
export const validateCNPJ = (cnpj: string, isMatriz: boolean): boolean => {
  const suffix = cnpj.slice(-4, -2)
  return isMatriz ? suffix === '00' : parseInt(suffix) > 0
}
```

### **3. Side-Effects e Mutações**

✅ **Sempre avise sobre efeitos colaterais:**

```typescript
/**
 * ⚠️ SIDE-EFFECT: Atualiza globalStore.currentCompany
 */
export const switchCompany = (companyId: string) => {
  const store = useGlobalStore()
  store.setCurrentCompany(companyId)
  
  // Recarrega dados da nova empresa
  window.location.reload()
}
```

### **4. Comportamento SSR Diferente**

✅ **Documente diferenças cliente/servidor:**

```typescript
/**
 * 🌐 SSR-SAFE: Retorna false no servidor, verifica no cliente
 */
export const hasLocalStorage = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.localStorage !== undefined
}
```

---

## 📋 Níveis de Documentação (Pragmático)

### **Nível 0: Zero Documentação (Código Auto-Explicativo)**

```typescript
// ✅ PERFEITO - Não precisa de nada
export const sum = (a: number, b: number) => a + b
export const isEven = (n: number) => n % 2 === 0
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
```

### **Nível 1: Comentário Inline (Contexto Mínimo)**

```typescript
// Formata CPF: 12345678900 → 123.456.789-00
export const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Valida email (RFC 5322 simplificado)
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
```

### **Nível 2: JSDoc Mínimo (Regra de Negócio)**

```typescript
/**
 * Calcula desconto progressivo:
 * - 0-10 itens: 0%
 * - 11-50 itens: 5%
 * - 51+ itens: 10%
 */
export const calculateDiscount = (quantity: number, unitPrice: number): number => {
  let discount = 0
  if (quantity > 50) discount = 0.10
  else if (quantity > 10) discount = 0.05
  
  return unitPrice * quantity * (1 - discount)
}
```

### **Nível 3: JSDoc Completo (Complexidade Alta)**

```typescript
/**
 * 🔐 Verifica permissão com isolamento MultiCompany
 * 
 * REGRAS:
 * - SUPERADMIN: sempre true
 * - ADMIN: true se permission in user.permissions && company in user.companies
 * - USER: false (sem permissões administrativas)
 * 
 * ⚠️ SIDE-EFFECTS:
 * - Consulta globalStore (não é função pura)
 * - SSR-safe: retorna false no servidor
 * 
 * @param permission - Nome da permissão (ex: 'users.delete')
 * @param companyId - ID da empresa para verificar isolamento
 * @returns True se usuário tem permissão na empresa
 * 
 * @example
 * ```ts
 * if (checkPermission('users.delete', currentCompanyId)) {
 *   await deleteUser(userId)
 * }
 * ```
 */
export const checkPermission = (permission: string, companyId: string): boolean => {
  // ... implementação complexa
}
```

---

## 🎨 Organização de Código (Seções Opcionais)

### **Use APENAS quando necessário**

```typescript
/**
 * 🧩 CbComplexComponent - [Descrição se necessário]
 */

// ============== DEPENDÊNCIAS EXTERNAS ============== (se houver libs especiais)
import Leaflet from 'leaflet'

// ============== DEPENDÊNCIAS INTERNAS ============== (sempre, mas sem comentários óbvios)
import { ref, computed } from 'vue'
import { useSomething } from '@/composables'

// ============== TYPES ============== (se tiver tipos locais)
interface LocalState {
  // ...
}

// ============== ESTADO REATIVO ============== (opcional - use se ajudar legibilidade)
const count = ref(0)
const items = ref<Item[]>([])

// ============== COMPUTED ============== (opcional)
const total = computed(() => items.value.length)

// ============== MÉTODOS ============== (opcional)
const addItem = () => { /* ... */ }
const removeItem = () => { /* ... */ }

// ============== LIFECYCLE ============== (sempre último)
onMounted(() => { /* ... */ })
```

❌ **NÃO crie seções para 1-2 linhas:**

```typescript
// ❌ EXAGERO
// ============== CONSTANTES ==============
const MAX_ITEMS = 10

// ============== COMPUTED ==============
const hasItems = computed(() => items.value.length > 0)
```

✅ **CORRETO - Natural:**

```typescript
// Configuração
const MAX_ITEMS = 10

// Estado
const items = ref<Item[]>([])
const hasItems = computed(() => items.value.length > 0)
```

---

## 🧩 Templates Práticos (Use com Bom Senso)

### **Componente Simples (SEM cabeçalho)**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/shadcn/button'

// Props (TypeScript já documenta)
defineProps<{
  title: string
  disabled?: boolean
}>()

// Emits (se não-óbvio, comente)
const emit = defineEmits<{
  submit: [data: FormData] // Emitido ao submeter form válido
}>()

// Estado
const isLoading = ref(false)

// Métodos
const handleSubmit = () => {
  isLoading.value = true
  // ...
}
</script>
```

### **Componente Complexo (COM cabeçalho seletivo)**

```vue
<script setup lang="ts">
/**
 * 🧩 CbAddressList - Gerenciador de Múltiplos Endereços
 * 
 * FEATURES:
 * - Accordion pattern (apenas 1 aberto por vez)
 * - Auto-expande novo endereço ao adicionar
 * - Validação individual por endereço
 * 
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - CbExpansionPanels (inject/provide pattern)
 * - ViaCEP API (busca automática de endereço)
 */

import { ref, nextTick } from 'vue'
import CbExpansionPanels from './CbExpansionPanels.vue'
import CbAddress from './CbAddress.vue'

// ... resto do código
</script>
```

### **Composable Simples (SEM cabeçalho)**

```typescript
import { ref } from 'vue'

export function useToggle(initialValue = false) {
  const value = ref(initialValue)
  const toggle = () => value.value = !value.value
  const setTrue = () => value.value = true
  const setFalse = () => value.value = false
  
  return { value, toggle, setTrue, setFalse }
}
```

### **Composable Complexo (COM cabeçalho seletivo)**

```typescript
/**
 * 🔐 useAuth - Autenticação PURA (sem autorização)
 * 
 * RESPONSABILIDADES:
 * - Login/Logout via Supabase
 * - Restaurar sessão
 * - Verificar autenticação (boolean)
 * 
 * NÃO FAZ:
 * - Verificar roles/permissions (isso é nos guards!)
 * - Lógica de MultiCompany (isso é no useCompany!)
 * 
 * 🔗 DEPENDÊNCIAS ESPECIAIS:
 * - Supabase Auth
 * - useGlobalStore (fonte da verdade)
 */

import { computed } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useGlobalStore } from '@/stores/global'

export function useAuth() {
  // ... implementação
}
```

---

## 🎯 Checklist Final (Antes de Commitar)

### **Perguntas para Fazer:**

1. **Este JSDoc adiciona informação não-óbvia?**
   - ❌ Não → DELETE
   - ✅ Sim → MANTENHA

2. **Estou repetindo informação global do projeto?**
   - ❌ Sim → DELETE (deve estar no README)
   - ✅ Não → MANTENHA

3. **A função é auto-explicativa pelo nome + tipos?**
   - ❌ Não → ADICIONE comentário/JSDoc
   - ✅ Sim → NÃO DOCUMENTE

4. **Há side-effects, SSR, ou regras de negócio?**
   - ✅ Sim → DOCUMENTE OBRIGATORIAMENTE
   - ❌ Não → Avalie se precisa documentar

5. **Props/Emits são triviais?**
   - ✅ Sim → TypeScript já documenta
   - ❌ Não → Comente inline apenas o especial

### **Checklist Rápido:**

```
[ ] Removi JSDoc de funções óbvias
[ ] Removi menções a "Vue 3", "TypeScript", "CbLogger" (info global)
[ ] Removi seções de dependências com imports padrão
[ ] Documentei apenas side-effects e regras de negócio
[ ] Usei comentários inline para props/emits simples
[ ] Cabeçalho de arquivo apenas se complexo
[ ] Zero @since, @author, @deprecated desnecessários
[ ] Sem console.log (usar logger estruturado)
```

---

## 📊 Antes e Depois (Exemplos Reais)

### **Exemplo 1: Função Óbvia**

#### ❌ ANTES (Poluído)

```typescript
/**
 * Formata duração em segundos para formato MM:SS
 * 
 * @description Esta função recebe um número de segundos e retorna
 * uma string formatada no padrão de minutos e segundos (MM:SS).
 * Os valores são preenchidos com zero à esquerda quando necessário.
 * 
 * @param {number} seconds - O número de segundos para formatar
 * @returns {string} A duração formatada no padrão MM:SS
 * 
 * @example
 * ```typescript
 * formatDuration(125) // Retorna "02:05"
 * formatDuration(59)  // Retorna "00:59"
 * formatDuration(3600) // Retorna "60:00"
 * ```
 * 
 * @since 1.0.0
 * @author John Doe
 */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
```

#### ✅ DEPOIS (Limpo)

```typescript
// Formata segundos para MM:SS
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
```

---

### **Exemplo 2: Componente com Props Óbvios**

#### ❌ ANTES (Poluído)

```vue
<script setup lang="ts">
/**
 * 🧩 CbButton - Componente de Botão Customizado
 * 
 * @description Componente wrapper do Shadcn Button com props customizadas
 * para o projeto.
 * 
 * @framework Vue 3 Composition API
 * @language TypeScript
 * @architecture Composition API
 * 
 * 🔗 DEPENDÊNCIAS:
 * - Vue 3 Composition API
 * - Shadcn Button
 * - TailwindCSS
 * - TypeScript
 * 
 * @since 1.0.0
 * @author John Doe
 */

/**
 * Props do componente CbButton
 * 
 * @prop {string} label - O texto a ser exibido no botão
 * @prop {'primary'|'secondary'|'danger'} variant - A variante de cor do botão
 * @prop {boolean} disabled - Se o botão está desabilitado
 * @prop {boolean} loading - Se o botão está em estado de loading
 * @prop {'small'|'medium'|'large'} size - O tamanho do botão
 */
defineProps<{
  label?: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
}>()

/**
 * Eventos emitidos pelo componente
 * 
 * @event click - Emitido quando o botão é clicado
 */
defineEmits<{
  click: []
}>()
</script>
```

#### ✅ DEPOIS (Limpo)

```vue
<script setup lang="ts">
import { Button } from '@/components/shadcn/button'

// Props auto-documentadas por TypeScript
defineProps<{
  label?: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
}>()

defineEmits<{
  click: []
}>()
</script>
```

---

### **Exemplo 3: Função com Regra de Negócio**

#### ❌ ANTES (Pouco Documentado)

```typescript
export const checkCompanyAccess = (companyId: string): boolean => {
  if (typeof window === 'undefined') return false
  
  const global = useGlobalStore()
  
  if (global.$currentUser?.role === 'SUPERADMIN') return true
  
  return global.$currentUser?.companies?.includes(companyId) || false
}
```

#### ✅ DEPOIS (Bem Documentado)

```typescript
/**
 * 🛡️ Verifica acesso MultiCompany com SSR-safe
 * 
 * REGRAS:
 * - SUPERADMIN: acesso a todas empresas
 * - ADMIN/USER: apenas empresas vinculadas
 * 
 * ⚠️ SIDE-EFFECTS:
 * - Consulta globalStore (não é função pura)
 * - SSR-safe: retorna false no servidor
 */
export const checkCompanyAccess = (companyId: string): boolean => {
  if (typeof window === 'undefined') return false
  
  const global = useGlobalStore()
  
  if (global.$currentUser?.role === 'SUPERADMIN') return true
  
  return global.$currentUser?.companies?.includes(companyId) || false
}
```

---

## 📝 Resumo Executivo (TL;DR)

### **👍 FAÇA:**

1. ✅ Documente regras de negócio não-óbvias
2. ✅ Sempre avise sobre side-effects
3. ✅ Mencione comportamento SSR diferente
4. ✅ Use comentários inline para props/emits simples
5. ✅ Liste apenas dependências externas especiais
6. ✅ Pergunte: "Isso adiciona valor não-óbvio?" antes de documentar

### **👎 NÃO FAÇA:**

1. ❌ Não repita "Vue 3", "TypeScript", "CbLogger" em cada arquivo
2. ❌ Não documente funções auto-explicativas
3. ❌ Não use JSDoc para props/emits triviais
4. ❌ Não liste imports padrão como dependências
5. ❌ Não crie cabeçalhos para arquivos simples
6. ❌ Não use @since, @author, @deprecated desnecessariamente

### **🎯 Mantra:**

> **"Se TypeScript + Nome da Função já explicam, não documente. Se há regra de negócio ou side-effect, documente MUITO BEM."**

---

## 🔗 Referências

- [JSDoc Official](https://jsdoc.app/)
- [TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [Vue 3 Style Guide](https://vuejs.org/style-guide/)

---

*📅 Criado em*: 18 JAN 2025  
*📅 Última atualização*: 17 NOV 2025  
*📋 Versão*: 4.0 - Pragmático (Menos é Mais)  
*👥 Responsável*: CbBelmante  
*🏷️ Tags*: [documentação, jsdoc, vue3, typescript, pragmático, clean-code]