# 📚 Guia de Documentação

<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-GUIA-orange?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-2.0-blue?style=for-the-badge)
![Filosofia](https://img.shields.io/badge/Filosofia-Direto_ao_Ponto-green?style=for-the-badge)

</div>

**Guia prático e direto de como documentar o projeto.**

> **Filosofia**: Documentação útil, não decorativa. Se não agrega valor, não documente.

---

## 📋 Índice

1. [**📂 Estrutura de Pastas**](#-estrutura-de-pastas)
2. [**📝 Nomenclatura**](#-nomenclatura)
3. [**🎨 Badges e Ícones**](#-badges-e-ícones)
4. [**📄 Template de Documento**](#-template-de-documento)
5. [**✅ Checklist Rápido**](#-checklist-rápido)

---

## 📂 Estrutura de Pastas

### **Princípio: Organize por TIPO, não por Feature**

```text
docs/
├── components/          # Componentes Vue
├── composables/         # Composables/Hooks
├── services/           # Services e Classes
├── utils/              # Utilitários puros
├── architecture/       # Decisões arquiteturais
├── guides/             # Guias de uso/desenvolvimento
├── AGENT_RULES.md      # Regras para IA
├── JSDOC_GUIDE.md      # Padrões JSDoc
└── DOCUMENTATION_GUIDE.md  # Este arquivo
```

### **Quando Criar Subpastas**

✅ **Crie subpasta quando:**
- Tem 5+ documentos do mesmo tipo
- Há agrupamento lógico claro
- Facilita navegação

❌ **Não crie quando:**
- Tem apenas 1-2 documentos
- Agrupamento é forçado
- Complica mais que ajuda

### **Exemplos Práticos**

```text
# ✅ BOM - Agrupamento natural
docs/
├── components/
│   ├── crud/
│   │   ├── DataTable_GUIDE.md
│   │   ├── CrudModal_GUIDE.md
│   │   └── FilterPanel_GUIDE.md
│   └── layout/
│       ├── Sidebar_GUIDE.md
│       └── Header_GUIDE.md

# ❌ RUIM - Forçado/Vazio
docs/
├── components/
│   ├── buttons/              # Apenas 1 arquivo
│   │   └── CbButton_GUIDE.md
│   └── inputs/               # Apenas 1 arquivo
│       └── CbInput_GUIDE.md
```

---

## 📝 Nomenclatura

### **Regras Simples**

| Item | Formato | Exemplo |
|------|---------|---------|
| **Pastas** | `camelCase` (inglês) | `components`, `composables`, `utils` |
| **Arquivos** | `PascalCase_GUIDE.md` | `DataTable_GUIDE.md`, `UseAuth_GUIDE.md` |
| **Subpastas** | Prefixo da pasta pai | `Components_Crud_DataTable_GUIDE.md` |

### **Exemplos Rápidos**

```text
# ✅ CORRETO
docs/components/crud/DataTable_GUIDE.md
docs/composables/UseAuth_GUIDE.md
docs/architecture/MultiCompany_GUIDE.md

# ❌ ERRADO
docs/Components/CRUD/data-table-guide.md
docs/composables/use_auth_guide.md
docs/arquitetura/multi_company.md
```

---

## 🎨 Badges e Ícones

### **Badges Obrigatórios (Todo Documento)**

```markdown
<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-[CATEGORIA]-[COR]?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-[X.X]-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-[ESTADO]-[COR]?style=for-the-badge)

</div>
```

### **Cores por Categoria**

| Categoria | Cor | Badge |
|-----------|-----|-------|
| **COMPONENTE** | `green` | ![Tipo](https://img.shields.io/badge/Tipo-COMPONENTE-green?style=for-the-badge) |
| **COMPOSABLE** | `purple` | ![Tipo](https://img.shields.io/badge/Tipo-COMPOSABLE-purple?style=for-the-badge) |
| **SERVICE** | `blue` | ![Tipo](https://img.shields.io/badge/Tipo-SERVICE-blue?style=for-the-badge) |
| **UTIL** | `orange` | ![Tipo](https://img.shields.io/badge/Tipo-UTIL-orange?style=for-the-badge) |
| **ARQUITETURA** | `lightblue` | ![Tipo](https://img.shields.io/badge/Tipo-ARQUITETURA-lightblue?style=for-the-badge) |
| **GUIA** | `red` | ![Tipo](https://img.shields.io/badge/Tipo-GUIA-red?style=for-the-badge) |

### **Status do Documento**

| Status | Cor | Quando Usar |
|--------|-----|-------------|
| **PLANEJADO** | `gray` | Documento ainda não criado |
| **EM_PROGRESSO** | `yellow` | Sendo escrito |
| **COMPLETO** | `green` | Finalizado e revisado |
| **DESATUALIZADO** | `red` | Precisa atualização |

### **Ícones Padrão**

| Ícone | Uso |
|-------|-----|
| 🧩 | Componente |
| 🔧 | Composable/Hook |
| 🏢 | Service/Class |
| 🛠️ | Util/Helper |
| 🏗️ | Arquitetura |
| 📚 | Guia/Tutorial |
| ⚠️ | Aviso/Warning |
| 💡 | Dica/Tip |
| ⚡ | Performance |
| 🔐 | Segurança/Auth |

---

## 📄 Template de Documento

### **Template Universal (Copy-Paste)**

```markdown
# 📚 [Título do Documento]

<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-[CATEGORIA]-[COR]?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-COMPLETO-green?style=for-the-badge)

</div>

**[Descrição em 1-2 linhas do que este documento cobre]**

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Uso Básico](#uso-básico)
3. [Exemplos](#exemplos)
4. [API/Props](#apiprops) (se aplicável)
5. [FAQ](#faq) (se necessário)

---

## 🎯 Visão Geral

[Propósito do componente/composable/service em 2-3 parágrafos máximo]

### **Quando Usar**

✅ **Use quando:**
- [Cenário 1]
- [Cenário 2]

❌ **Não use quando:**
- [Cenário 1]
- [Cenário 2]

---

## 🚀 Uso Básico

### **Exemplo Mínimo**

```typescript
// Código de exemplo simples
```

### **Exemplo Completo**

```typescript
// Código de exemplo com todas as features
```

---

## 📊 API/Props

[Tabela com props/métodos/tipos - apenas se necessário]

---

## 💡 Dicas e Truques

- [Dica 1]
- [Dica 2]

---

## ⚠️ Avisos Importantes

- [Aviso 1]
- [Aviso 2]

---

*📅 Criado em*: [DATA]
*📅 Última atualização*: [DATA]
*📋 Versão*: [X.X]
*👥 Responsável*: [NOME]
*🏷️ Tags*: [tag1, tag2, tag3]
```

---

## ✅ Checklist Rápido

Antes de publicar documentação:

### **Essencial (OBRIGATÓRIO)**

- [ ] Badges no topo (Tipo, Versão, Status)
- [ ] Descrição clara em 1-2 linhas
- [ ] Exemplo de uso básico
- [ ] Metadados no rodapé

### **Qualidade (RECOMENDADO)**

- [ ] Seção "Quando Usar/Não Usar"
- [ ] Exemplo completo funcional
- [ ] Links para documentos relacionados

### **Evite (NÃO FAÇA)**

- [ ] ❌ Documentar o óbvio
- [ ] ❌ Repetir informações do README
- [ ] ❌ Criar docs sem exemplos práticos

---

## 📅 Formato de Data

Use o padrão brasileiro simplificado:

```
DIA MÊS ANO

Exemplos:
- 1º JAN 25
- 15 MAR 25
- 31 MAIO 25
```

**Regras:**
- Dia 1: use `1º`
- Outros: apenas número
- Mês: maiúsculo e abreviado (exceto MAIO)
- Ano: 2 dígitos

---

## 🔗 Links Rápidos

### **Documentação Interna**

- [README Principal](../README.md)
- [Regras para IA](./AGENT_RULES.md)
- [Padrões JSDoc](./JSDOC_GUIDE.md)

### **Referências Externas**

- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Shadcn-vue](https://www.shadcn-vue.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 📊 Exemplos Reais

### **Componente Vue**

```markdown
# 🧩 DataTable - Tabela de Dados CRUD

![Tipo](https://img.shields.io/badge/Tipo-COMPONENTE-green?style=for-the-badge)

Tabela genérica para listagem CRUD com ordenação, filtros e ações.

## 🎯 Visão Geral

Componente principal para exibir dados tabulares com suporte nativo a:
- Ordenação por coluna
- Filtros customizados
- Ações em lote
- Paginação

### Quando Usar

✅ Use para: listagens CRUD, relatórios, dashboards
❌ Não use para: formulários, cards, dados não-tabulares

## 🚀 Uso Básico

```vue
<template>
  <DataTable 
    :data="companies" 
    :columns="columns"
    @row-click="handleEdit"
  />
</template>
```

[... resto do documento]
```

### **Composable**

```markdown
# 🔧 useAuth - Autenticação

![Tipo](https://img.shields.io/badge/Tipo-COMPOSABLE-purple?style=for-the-badge)

Composable para gerenciar autenticação via Supabase.

## 🎯 Visão Geral

Gerencia login, logout e estado de autenticação. 
NÃO verifica permissões (use usePermissions para isso).

## 🚀 Uso Básico

```typescript
const { isAuthenticated, login, logout } = useAuth()

// Login
await login(email, password)

// Verificar auth
if (isAuthenticated.value) {
  // usuário logado
}
```

[... resto do documento]
```

---

## 🎯 Resumo (TL;DR)

### **3 Regras de Ouro**

1. **Badges sempre** (Tipo, Versão, Status)
2. **Descrição curta** (1-2 linhas)
3. **Exemplo prático** (código que funciona)

### **Template Copy-Paste**

```markdown
# 📚 [Título]

![Tipo](https://img.shields.io/badge/Tipo-[CAT]-[COR]?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0-blue?style=for-the-badge)

[Descrição em 1 linha]

## Uso Básico
```code```

---
*Metadados*
```

---

*📅 Criado em*: 20 SET 25  
*📅 Última atualização*: 17 NOV 25  
*📋 Versão*: 2.0 - Direto ao Ponto  
*👥 Responsável*: CbBelmante  
*🏷️ Tags*: [documentação, guia, padrões, markdown, pragmático]