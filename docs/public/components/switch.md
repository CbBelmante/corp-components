# Switch

O componente `CorpSwitch` é um toggle switch com validação integrada e layout horizontal. Perfeito para ativar/desativar configurações, aceitar termos, ou qualquer escolha binária.

## Uso

Switches em sua forma mais simples alternam entre dois estados (on/off).

:::corp-code
<CorpSwitch name="active" label="Empresa ativa" v-model="switchForm.active" />

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpSwitch } from 'corp-components'

const active = ref(false)
</script>

<template>
  <CorpSwitch name="active" label="Empresa ativa" v-model="active" />
</template>
```
:::

---

## Props

O `CorpSwitch` suporta diversas props para customização de cor, estados (disabled, readonly, loading), validação e valores customizados.

### Label e Hint

Use `label` para texto descritivo e `hint` para informações adicionais.

:::corp-code
<CorpSwitch
  name="notifications"
  label="Notificações"
  hint="Receber notificações por email"
  v-model="switchForm.notifications"
/>

<CorpSwitch
  name="newsletter"
  label="Newsletter"
  hint="Newsletter semanal com novidades"
  v-model="switchForm.newsletter"
/>
:::

---

## Estados

### Disabled

Use `disabled` para desabilitar a interação.

:::corp-code
<CorpSwitch name="disabled1" label="Disabled OFF" disabled />
<CorpSwitch name="disabled2" label="Disabled ON" disabled model-value />
:::

### Readonly

Use `readonly` para exibir o estado sem permitir alteração.

:::corp-code
<CorpSwitch name="readonly1" label="Readonly OFF" readonly />
<CorpSwitch name="readonly2" label="Readonly ON" readonly model-value />
:::

### Loading

Use `loading` para indicar processamento assíncrono.

:::corp-code
<div class="space-y-4">
  <CorpSwitch
    name="saveConfigEnabled"
    :label="loadingSwitch ? 'Salvando...' : 'Salvar configurações'"
    v-model="switchForm.saveConfigEnabled"
    :loading="loadingSwitch"
  />

  <CorpButton
    @click="simulateLoadingSwitch"
    :disabled="!switchForm.saveConfigEnabled || loadingSwitch"
  >
    Simular Loading (2s)
  </CorpButton>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpSwitch, CorpButton } from 'corp-components'

const loading = ref(false)
const saveConfig = ref(false)

const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="space-y-4">
    <CorpSwitch
      name="saveConfig"
      :label="loading ? 'Salvando...' : 'Salvar configurações'"
      v-model="saveConfig"
      :loading="loading"
    />

    <CorpButton
      @click="simulateLoading"
      :disabled="!saveConfig || loading"
    >
      Simular Loading (2s)
    </CorpButton>
  </div>
</template>
```
:::

---

## Color

A prop `color` define a cor do switch quando **ligado** (checked). Aceita cores semânticas ou customizadas.

### Cores Semânticas

:::corp-code
<CorpSwitch name="primary" label="Primary" color="primary" model-value />
<CorpSwitch name="secondary" label="Secondary" color="secondary" model-value />
<CorpSwitch name="destructive" label="Destructive" color="destructive" model-value />
<CorpSwitch name="success" label="Success" color="success" model-value />
<CorpSwitch name="warning" label="Warning" color="warning" model-value />
<CorpSwitch name="info" label="Info" color="info" model-value />

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpSwitch } from 'corp-components'

const success = ref(true)
</script>

<template>
  <CorpSwitch
    name="success"
    label="Success"
    color="success"
    v-model="success"
  />
</template>
```
:::

| Color | Descrição | Cor |
|-------|-----------|-----|
| `primary` | Cor principal (padrão) | Laranja `#FF7133` |
| `secondary` | Cor secundária | Azul acinzentado |
| `destructive` | Ação destrutiva/perigo | Vermelho |
| `success` | Sucesso/confirmação | Verde |
| `warning` | Aviso/atenção | Amarelo |
| `info` | Informação | Azul |

### Cores Customizadas

Você pode usar **qualquer cor** (HEX, RGB, HSL, variável CSS, nomes CSS):

:::corp-code
<!-- Cor HEX -->
<CorpSwitch name="purple" label="Roxo" color="#8b5cf6" model-value />
<CorpSwitch name="pink" label="Rosa" color="#ec4899" model-value />

<!-- Nomes CSS -->
<CorpSwitch name="cyan" label="Cyan" color="cyan" model-value />
<CorpSwitch name="orange" label="Orange" color="orange" model-value />
:::

> **Suporte universal!** Cores customizadas (HEX, RGB, HSL, var(), nomes CSS) funcionam perfeitamente.

---

## Valores Customizados

### trueValue e falseValue

Por padrão, o switch emite `true`/`false`. Use `trueValue` e `falseValue` para valores customizados.

:::corp-code
<!-- String: 'active' / 'inactive' -->
<CorpSwitch
  name="status"
  label="Status da empresa"
  model-value="active"
  :true-value="'active'"
  :false-value="'inactive'"
/>

<!-- Number: 1 / 0 -->
<CorpSwitch
  name="nivel"
  label="Nível de acesso"
  :model-value="1"
  :true-value="1"
  :false-value="0"
/>
:::

> **Útil para:** APIs que esperam strings (`'yes'`/`'no'`), números (`1`/`0`), ou status específicos.

---

## Validação

O `CorpSwitch` integra-se com o sistema de validação `useForm`. O asterisco (*) aparece automaticamente quando há `rules.required`.

:::corp-code
<CorpSwitch
  name="terms"
  label="Aceito os termos de uso"
  hint="Obrigatório para continuar"
/>
:::

> **Nota:** O exemplo acima mostra o layout. Para validação funcional, use dentro de um formulário com `useForm`.

---

## API

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | *required* | Nome do campo (required) |
| `label` | `string` | `''` | Texto do label |
| `hint` | `string` | `''` | Texto de ajuda abaixo do switch |
| `modelValue` | `boolean \| string \| number` | `undefined` | Valor do v-model |
| `color` | `string` | `'primary'` | Cor semântica ou customizada |
| `disabled` | `boolean` | `false` | Desabilita o switch |
| `readonly` | `boolean` | `false` | Somente leitura |
| `loading` | `boolean` | `false` | Estado de loading (spinner) |
| `trueValue` | `boolean \| string \| number` | `true` | Valor quando ligado |
| `falseValue` | `boolean \| string \| number` | `false` | Valor quando desligado |
| `rules` | `ValidationRule[]` | `[]` | Regras de validação |
| `hideDetails` | `boolean` | `false` | Esconde hint/erro |
| `debug` | `boolean` | `false` | Exibe áreas reservadas |
| `class` | `string \| object \| array` | `''` | Classes CSS customizadas |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean \| string \| number` | Emitido ao alterar o valor |

---

## Acessibilidade

- ✅ Suporte a navegação por teclado (Space, Enter)
- ✅ Estados ARIA (`aria-checked`, `aria-disabled`)
- ✅ Label clicável (aumenta área de interação)
- ✅ Focus visible com ring de destaque
- ✅ Suporte a leitores de tela

---

## Exemplos Avançados

### Configurações de Notificação

:::corp-code
<div class="space-y-4">
  <CorpSwitch
    name="email"
    label="Notificações por Email"
    hint="Receber atualizações importantes por email"
    color="primary"
    model-value
  />

  <CorpSwitch
    name="push"
    label="Notificações Push"
    hint="Notificações no navegador e dispositivo móvel"
    color="info"
  />

  <CorpSwitch
    name="sms"
    label="Notificações SMS"
    hint="Apenas para alertas críticos (taxas podem ser aplicadas)"
    color="warning"
  />
</div>
:::

### Configuração com Loading

:::corp-code
<CorpSwitch
  name="twoFactor"
  label="Autenticação de dois fatores"
  hint="Adiciona camada extra de segurança"
  color="success"
  loading
  model-value
/>
:::

---

## Dicas

💡 **Label clicável:** Toda a área do label é clicável, melhorando a UX
💡 **Validação automática:** Use com `useForm` para validação sem boilerplate
💡 **Cores universais:** Suporta HEX, RGB, HSL, variáveis CSS e nomes CSS
💡 **Valores customizados:** Use `trueValue`/`falseValue` para APIs específicas
💡 **Loading state:** Mostre feedback visual durante operações assíncronas
