# 🧪 Testing Guide - corp-components

<div align="center">

![Tipo](https://img.shields.io/badge/Tipo-GUIA-orange?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-PLANEJADO-yellow?style=for-the-badge)

</div>

**Guia de testes para corp-components - planejado para implementação na v0.2.0.**

---

## 📋 Índice

1. [Status Atual](#-status-atual)
2. [Stack Planejada](#-stack-planejada)
3. [Estrutura de Testes](#-estrutura-de-testes)
4. [Exemplo de Teste](#-exemplo-de-teste)
5. [Coverage Goals](#-coverage-goals)

---

## 🚧 Status Atual

> **EM DESENVOLVIMENTO** - Sistema de testes será implementado na **v0.2.0**

### **Atual (v0.1.0)**
- ❌ Sem testes automatizados
- ✅ Testes manuais via playground
- ✅ Type checking com TypeScript

### **Futuro (v0.2.0)**
- ✅ Unit tests (Vitest)
- ✅ Component tests (@vue/test-utils)
- ✅ E2E tests (Playwright) - opcional

---

## 🛠️ Stack Planejada

### **Testing Framework**

| Ferramenta | Propósito | Versão |
|------------|-----------|--------|
| **Vitest** | Unit & integration testing | latest |
| **@vue/test-utils** | Vue component testing | latest |
| **Testing Library** | User-centric testing | latest |
| **Playwright** | E2E testing (opcional) | latest |

### **Por que Vitest?**

- ✅ Mesmo config do Vite (zero config)
- ✅ Extremamente rápido
- ✅ Compatível com Jest API
- ✅ UI mode para debug
- ✅ Coverage nativo

---

## 📂 Estrutura de Testes

```
tests/
├── unit/
│   └── components/
│       ├── CorpButton.test.ts
│       ├── CorpIcon.test.ts
│       └── CorpInput.test.ts
├── integration/
│   └── forms/
│       └── FormValidation.test.ts
└── e2e/
    └── showcase.spec.ts
```

---

## 💡 Exemplo de Teste (Futuro)

### **Unit Test - CorpButton**

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { CorpButton } from '../src/components'

describe('CorpButton', () => {
  it('renders properly', () => {
    const wrapper = mount(CorpButton, {
      props: { variant: 'default' },
      slots: { default: 'Click me' }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(CorpButton)
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(CorpButton, {
      props: { variant: 'destructive' }
    })

    expect(wrapper.classes()).toContain('bg-red-500')
  })

  it('shows loading state', () => {
    const wrapper = mount(CorpButton, {
      props: { loading: true }
    })

    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })
})
```

### **Component Test - CorpInput**

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { CorpInput } from '../src/components'

describe('CorpInput', () => {
  it('updates modelValue on input', async () => {
    const wrapper = mount(CorpInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })

    await wrapper.find('input').setValue('Hello')
    expect(wrapper.props('modelValue')).toBe('Hello')
  })

  it('displays label when provided', () => {
    const wrapper = mount(CorpInput, {
      props: { label: 'Name' }
    })

    expect(wrapper.find('label').text()).toBe('Name')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(CorpInput, {
      props: { disabled: true }
    })

    expect(wrapper.find('input').element.disabled).toBe(true)
  })
})
```

---

## 📊 Scripts (Futuro)

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test"
  }
}
```

### **Uso**

```bash
# Rodar todos os testes
npm test

# Rodar em watch mode
npm test -- --watch

# UI interativa
npm run test:ui

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 🎯 Coverage Goals

| Tipo | Meta de Coverage |
|------|------------------|
| **Unit Tests** | 80%+ |
| **Componentes Públicos** | 100% |
| **Utils Exportados** | 100% |
| **Composables** | 90%+ |

---

## 📝 Convenções de Teste

### **Nomenclatura**

- Arquivos de teste: `*.test.ts` ou `*.spec.ts`
- Localização: Espelhar estrutura de `src/`

### **Estrutura de Describe/It**

```typescript
describe('ComponentName', () => {
  describe('Props', () => {
    it('applies variant correctly', () => {})
    it('handles size prop', () => {})
  })

  describe('Events', () => {
    it('emits click event', () => {})
    it('emits update:modelValue', () => {})
  })

  describe('Slots', () => {
    it('renders default slot', () => {})
  })
})
```

---

## 🔗 Referências

### **Documentação Externa**
- [Vitest](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library](https://testing-library.com/docs/vue-testing-library/intro/)
- [Playwright](https://playwright.dev/)

### **Documentação Interna**
- [Contributing Guide](./contributing.md)
- [Architecture](./architecture.md)

---

*📅 Criado em*: 5 JAN 2026
*📅 Última atualização*: 5 JAN 2026
*📋 Versão*: 1.0
*👥 Responsável*: CbBelmante
*🏷️ Tags*: [testing, vitest, vue-test-utils, planejado]
