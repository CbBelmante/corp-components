# Switch

O componente `CorpSwitch` é um toggle switch com validação integrada e layout horizontal. Perfeito para ativar/desativar configurações, aceitar termos, ou qualquer escolha binária.

## Uso

Switches em sua forma mais simples alternam entre dois estados (on/off).

:::corp-code
<CorpSwitch name="active" label="Empresa ativa" v-model="switchForm.active" />
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ switchForm.active }}</code>
</p>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpSwitch } from 'corp-components'

const active = ref(false)
</script>

<template>
  <CorpSwitch name="active" label="Empresa ativa" v-model="active" />
  <p class="text-sm text-muted-foreground mt-2">
    Valor: <code>{{ active }}</code>
  </p>
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
<CorpSwitch name="disabled1" label="Disabled desligado" disabled />
<CorpSwitch name="disabled2" label="Disabled ligado" disabled model-value />
:::

### Disabled + Cores

Switches disabled mantêm a cor (mais clara) quando ligados.

:::corp-code
<div class="grid grid-cols-2 gap-4">
  <CorpSwitch name="dis-primary-off" label="Primary OFF" color="primary" disabled />
  <CorpSwitch name="dis-primary-on" label="Primary ON" color="primary" disabled model-value />

  <CorpSwitch name="dis-success-off" label="Success OFF" color="success" disabled />
  <CorpSwitch name="dis-success-on" label="Success ON" color="success" disabled model-value />

  <CorpSwitch name="dis-warning-off" label="Warning OFF" color="warning" disabled />
  <CorpSwitch name="dis-warning-on" label="Warning ON" color="warning" disabled model-value />

  <CorpSwitch name="dis-info-off" label="Info OFF" color="info" disabled />
  <CorpSwitch name="dis-info-on" label="Info ON" color="info" disabled model-value />
</div>
:::

### Disabled + Cores Customizadas

Cores customizadas também funcionam em estado disabled.

:::corp-code
<div class="grid grid-cols-2 gap-4">
  <CorpSwitch name="dis-purple-off" label="Roxo OFF" color="#8b5cf6" disabled />
  <CorpSwitch name="dis-purple-on" label="Roxo ON" color="#8b5cf6" disabled model-value />

  <CorpSwitch name="dis-pink-off" label="Rosa OFF" color="#ec4899" disabled />
  <CorpSwitch name="dis-pink-on" label="Rosa ON" color="#ec4899" disabled model-value />

  <CorpSwitch name="dis-cyan-off" label="Cyan OFF" color="cyan" disabled />
  <CorpSwitch name="dis-cyan-on" label="Cyan ON" color="cyan" disabled model-value />
</div>
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
  v-model="switchForm.status"
  name="status"
  label="Status da empresa"
  :true-value="'active'"
  :false-value="'inactive'"
/>
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ switchForm.status }}</code> (string)
</p>

<!-- Number: 1 / 0 -->
<CorpSwitch
  v-model="switchForm.nivel"
  name="nivel"
  label="Nível de acesso"
  :true-value="1"
  :false-value="0"
/>
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ switchForm.nivel }}</code> (number)
</p>
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

## Densidade (Density)

Controle o tamanho do switch com a prop `density`.

:::corp-code
<CorpSwitch name="compact" label="Compact (padrão)" density="compact" model-value />
<CorpSwitch name="standard" label="Standard" density="standard" model-value />
<CorpSwitch name="comfortable" label="Comfortable" density="comfortable" model-value />
:::

### Densidade com Hints Longos

Teste de alinhamento com textos longos.

:::corp-code
<CorpSwitch
  name="compactHint"
  label="Compact com hint longo"
  hint="Este é um hint bem longo para testar o alinhamento do switch em modo compact. Vamos verificar se o texto quebra corretamente."
  density="compact"
  model-value
/>

<CorpSwitch
  name="standardHint"
  label="Standard com hint longo"
  hint="Este é um hint bem longo para testar o alinhamento do switch em modo standard. Vamos verificar se o texto quebra corretamente."
  density="standard"
  model-value
/>

<CorpSwitch
  name="comfortableHint"
  label="Comfortable com hint longo"
  hint="Este é um hint bem longo para testar o alinhamento do switch em modo comfortable. Vamos verificar se o texto quebra corretamente."
  density="comfortable"
  model-value
/>
:::

---

## Posição do Label

Use `labelPosition` para alterar a posição do label.

:::corp-code
<CorpSwitch
  name="right"
  label="Label à direita (padrão)"
  hint="O hint também fica alinhado à esquerda com o label"
  label-position="right"
  model-value
/>

<CorpSwitch
  name="left"
  label="Label à esquerda"
  hint="O hint fica alinhado à direita quando label está à esquerda"
  label-position="left"
  model-value
/>
:::

---

## Erros Externos

Use `externalErrors` para exibir erros vindos do backend/API.

:::corp-code
<CorpSwitch
  name="external"
  label="Campo com erro do backend"
  :external-errors="['Este campo tem erro do servidor']"
/>
:::

### Force Error

Use `forceError` para forçar visual de erro (sem mensagem).

:::corp-code
<CorpSwitch
  name="forceError"
  label="Campo com erro forçado"
  hint="Visual de erro sem mensagem"
  force-error
/>
:::

### Messages e MaxErrors

:::corp-code
<CorpSwitch
  name="messages"
  label="Com mensagens genéricas"
  :messages="['Info: Esta é uma mensagem de informação', 'Warning: Aviso importante']"
/>

<CorpSwitch
  name="maxErrors"
  label="Limitando erros (maxErrors=1)"
  :external-errors="['Erro 1', 'Erro 2', 'Erro 3']"
  :max-errors="1"
/>
:::

---

## Estado Indeterminado

Use `indeterminate` para estado intermediário (útil em seleções parciais).

:::corp-code
<CorpSwitch
  name="indeterminate"
  label="Estado intermediário"
  indeterminate
/>
:::

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
    name="emailNotificationsAdvanced"
    label="Notificações por Email"
    hint="Receber atualizações importantes por email"
    color="primary"
    v-model="switchForm.emailNotifications"
  />

  <CorpSwitch
    name="pushNotificationsAdvanced"
    label="Notificações Push"
    hint="Notificações no navegador e dispositivo móvel"
    color="info"
    v-model="switchForm.pushNotifications"
  />

  <CorpSwitch
    name="smsNotificationsAdvanced"
    label="Notificações SMS"
    hint="Apenas para alertas críticos (taxas podem ser aplicadas)"
    color="warning"
    v-model="switchForm.smsNotifications"
  />

  <CorpSwitch
    name="twoFactorAdvanced"
    label="Autenticação de dois fatores"
    hint="Adiciona camada extra de segurança"
    color="success"
    v-model="switchForm.twoFactor"
  />
</div>
:::

---

## Dicas

💡 **Label clicável:** Toda a área do label é clicável, melhorando a UX
💡 **Validação automática:** Use com `useForm` para validação sem boilerplate
💡 **Cores universais:** Suporta HEX, RGB, HSL, variáveis CSS e nomes CSS
💡 **Valores customizados:** Use `trueValue`/`falseValue` para APIs específicas
💡 **Loading state:** Mostre feedback visual durante operações assíncronas
💡 **Densidade:** Ajuste o tamanho com `density` (compact/standard/comfortable)
💡 **Erros externos:** Use `externalErrors` para erros de backend/API

---

## API Reference

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
| `indeterminate` | `boolean` | `false` | Estado intermediário |
| `trueValue` | `boolean \| string \| number` | `true` | Valor quando ligado |
| `falseValue` | `boolean \| string \| number` | `false` | Valor quando desligado |
| `forceError` | `boolean` | `false` | Força visual de erro |
| `externalErrors` | `string \| string[]` | `''` | Erros externos (backend/API) |
| `messages` | `string[]` | `[]` | Mensagens genéricas (info/warning) |
| `maxErrors` | `number` | `1` | Limite de erros exibidos |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'compact'` | Tamanho do switch |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posição do label |
| `rules` | `ValidationRule[]` | `[]` | Regras de validação |
| `hideDetails` | `boolean` | `false` | Esconde hint/erro |
| `debug` | `boolean` | `false` | Exibe áreas reservadas |
| `class` | `string \| object \| array` | `''` | Classes CSS customizadas |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean \| string \| number` | Emitido ao alterar o valor |
