# Checkbox

O componente `CorpCheckbox` é um checkbox com validação integrada e layout horizontal. Perfeito para seleções múltiplas, aceitar termos, ou qualquer escolha binária.

## Uso

Checkboxes em sua forma mais simples alternam entre dois estados (checked/unchecked).

:::corp-code
<CorpCheckbox name="newsletter" label="Receber newsletter" v-model="checkboxForm.newsletter" />
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ checkboxForm.newsletter }}</code>
</p>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpCheckbox } from 'corp-components'

const newsletter = ref(false)
</script>

<template>
  <CorpCheckbox name="newsletter" label="Receber newsletter" v-model="newsletter" />
  <p class="text-sm text-muted-foreground mt-2">
    Valor: <code>{{ newsletter }}</code>
  </p>
</template>
```
:::

---

## Props

O `CorpCheckbox` suporta diversas props para customização de cor, estados (disabled, readonly), validação e valores customizados.

### Label e Hint

Use `label` para texto descritivo e `hint` para informações adicionais.

:::corp-code
<CorpCheckbox
  name="notifications"
  label="Notificações por email"
  hint="Receber notificações importantes no seu email"
  v-model="checkboxForm.notifications"
/>

<CorpCheckbox
  name="marketing"
  label="Aceito receber conteúdo de marketing"
  hint="Cancelável a qualquer momento"
  v-model="checkboxForm.marketing"
/>
:::

---

## Estados

### Disabled

Use `disabled` para desabilitar a interação.

:::corp-code
<CorpCheckbox name="disabled1" label="Disabled desmarcado" disabled />
<CorpCheckbox name="disabled2" label="Disabled marcado" disabled model-value />
:::

### Disabled + Cores

Checkboxes disabled mantêm a cor (mais clara) quando marcados.

:::corp-code
<div class="grid grid-cols-2 gap-4">
  <CorpCheckbox name="dis-primary-off" label="Primary OFF" color="primary" disabled />
  <CorpCheckbox name="dis-primary-on" label="Primary ON" color="primary" disabled model-value />

  <CorpCheckbox name="dis-success-off" label="Success OFF" color="success" disabled />
  <CorpCheckbox name="dis-success-on" label="Success ON" color="success" disabled model-value />

  <CorpCheckbox name="dis-warning-off" label="Warning OFF" color="warning" disabled />
  <CorpCheckbox name="dis-warning-on" label="Warning ON" color="warning" disabled model-value />

  <CorpCheckbox name="dis-info-off" label="Info OFF" color="info" disabled />
  <CorpCheckbox name="dis-info-on" label="Info ON" color="info" disabled model-value />
</div>
:::

### Disabled + Cores Customizadas

Cores customizadas também funcionam em estado disabled.

:::corp-code
<div class="grid grid-cols-2 gap-4">
  <CorpCheckbox name="dis-purple-off" label="Roxo OFF" color="#8b5cf6" disabled />
  <CorpCheckbox name="dis-purple-on" label="Roxo ON" color="#8b5cf6" disabled model-value />

  <CorpCheckbox name="dis-pink-off" label="Rosa OFF" color="#ec4899" disabled />
  <CorpCheckbox name="dis-pink-on" label="Rosa ON" color="#ec4899" disabled model-value />

  <CorpCheckbox name="dis-cyan-off" label="Cyan OFF" color="cyan" disabled />
  <CorpCheckbox name="dis-cyan-on" label="Cyan ON" color="cyan" disabled model-value />
</div>
:::

### Readonly

Use `readonly` para exibir o estado sem permitir alteração.

:::corp-code
<CorpCheckbox name="readonly1" label="Readonly desmarcado" readonly />
<CorpCheckbox name="readonly2" label="Readonly marcado" readonly model-value />
:::

---

## Color

A prop `color` define a cor do checkbox quando **marcado** (checked). Aceita cores semânticas ou customizadas.

### Cores Semânticas

:::corp-code
<CorpCheckbox name="primary" label="Primary" color="primary" model-value />
<CorpCheckbox name="secondary" label="Secondary" color="secondary" model-value />
<CorpCheckbox name="destructive" label="Destructive" color="destructive" model-value />
<CorpCheckbox name="success" label="Success" color="success" model-value />
<CorpCheckbox name="warning" label="Warning" color="warning" model-value />
<CorpCheckbox name="info" label="Info" color="info" model-value />

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpCheckbox } from 'corp-components'

const success = ref(true)
</script>

<template>
  <CorpCheckbox
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
<CorpCheckbox name="purple" label="Roxo" color="#8b5cf6" model-value />
<CorpCheckbox name="pink" label="Rosa" color="#ec4899" model-value />

<!-- Nomes CSS -->
<CorpCheckbox name="cyan" label="Cyan" color="cyan" model-value />
<CorpCheckbox name="orange" label="Orange" color="orange" model-value />
:::

> **Suporte universal!** Cores customizadas (HEX, RGB, HSL, var(), nomes CSS) funcionam perfeitamente.

---

## Densidade (Density)

Controle o tamanho do checkbox com a prop `density`.

:::corp-code
<CorpCheckbox name="compact" label="Compact (padrão)" density="compact" model-value />
<CorpCheckbox name="standard" label="Standard" density="standard" model-value />
<CorpCheckbox name="comfortable" label="Comfortable" density="comfortable" model-value />
:::

### Densidade com Hints Longos

Teste de alinhamento com textos longos.

:::corp-code
<CorpCheckbox
  name="compactHint"
  label="Compact com hint longo"
  hint="Este é um hint bem longo para testar o alinhamento do checkbox em modo compact. Vamos verificar se o texto quebra corretamente."
  density="compact"
  model-value
/>

<CorpCheckbox
  name="standardHint"
  label="Standard com hint longo"
  hint="Este é um hint bem longo para testar o alinhamento do checkbox em modo standard. Vamos verificar se o texto quebra corretamente."
  density="standard"
  model-value
/>

<CorpCheckbox
  name="comfortableHint"
  label="Comfortable com hint longo"
  hint="Este é um hint bem longo para testar o alinhamento do checkbox em modo comfortable. Vamos verificar se o texto quebra corretamente."
  density="comfortable"
  model-value
/>
:::

---

## Posição do Label

Use `labelPosition` para alterar a posição do label.

:::corp-code
<CorpCheckbox
  name="right"
  label="Label à direita (padrão)"
  hint="O hint também fica alinhado à esquerda com o label"
  label-position="right"
  model-value
/>

<CorpCheckbox
  name="left"
  label="Label à esquerda"
  hint="O hint fica alinhado à direita quando label está à esquerda"
  label-position="left"
  model-value
/>
:::

---

## Valores Customizados

### trueValue e falseValue

Por padrão, o checkbox emite `true`/`false`. Use `trueValue` e `falseValue` para valores customizados.

:::corp-code
<!-- String: 'yes' / 'no' -->
<CorpCheckbox
  v-model="checkboxForm.statusYesNo"
  name="statusYesNo"
  label="Status (yes/no)"
  true-value="yes"
  false-value="no"
/>
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ checkboxForm.statusYesNo }}</code> (string)
</p>

<!-- Number: 1 / 0 -->
<CorpCheckbox
  v-model="checkboxForm.nivel"
  name="nivel"
  label="Nível (1/0)"
  :true-value="1"
  :false-value="0"
/>
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ checkboxForm.nivel }}</code> (number)
</p>
:::

> **Útil para:** APIs que esperam strings (`'yes'`/`'no'`), números (`1`/`0`), ou status específicos.

---

## Validação

O `CorpCheckbox` integra-se com o sistema de validação `useForm`. O asterisco (*) aparece automaticamente quando há `rules.required`.

:::corp-code
<CorpCheckbox
  name="terms"
  label="Aceito os termos de uso"
  hint="Obrigatório para continuar"
/>
:::

> **Nota:** O exemplo acima mostra o layout. Para validação funcional, use dentro de um formulário com `useForm`.

---

## Erros Externos

Use `externalErrors` para exibir erros vindos do backend/API.

:::corp-code
<CorpCheckbox
  name="external"
  label="Campo com erro do backend"
  :external-errors="['Este campo tem erro do servidor']"
/>
:::

### Force Error

Use `forceError` para forçar visual de erro (sem mensagem).

:::corp-code
<CorpCheckbox
  name="forceError"
  label="Campo com erro forçado"
  hint="Visual de erro sem mensagem"
  force-error
/>
:::

### Messages e MaxErrors

:::corp-code
<CorpCheckbox
  name="messages"
  label="Com mensagens genéricas"
  :messages="['Info: Esta é uma mensagem de informação', 'Warning: Aviso importante']"
/>

<CorpCheckbox
  name="maxErrors"
  label="Limitando erros (maxErrors=1)"
  :external-errors="['Erro 1', 'Erro 2', 'Erro 3']"
  :max-errors="1"
/>
:::

---

## Estado Indeterminado

Use `indeterminate` para estado intermediário (útil quando alguns itens estão selecionados).

:::corp-code
<CorpCheckbox
  name="indeterminate"
  label="Selecionar todos (parcial)"
  hint="Usado quando alguns itens estão selecionados"
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

### Preferências de Comunicação

:::corp-code
<div class="space-y-4">
  <CorpCheckbox
    name="updatesAdvanced"
    label="Atualizações do produto"
    hint="Novidades, melhorias e novos recursos"
    color="primary"
    v-model="checkboxForm.updates"
  />

  <CorpCheckbox
    name="offersAdvanced"
    label="Ofertas e promoções"
    hint="Descontos exclusivos e ofertas especiais"
    color="success"
    v-model="checkboxForm.offers"
  />

  <CorpCheckbox
    name="newsletterAdvanced"
    label="Newsletter mensal"
    hint="Conteúdo exclusivo e dicas úteis"
    color="info"
    v-model="checkboxForm.newsletter"
  />

  <CorpCheckbox
    name="marketingAdvanced"
    label="Marketing de parceiros"
    hint="Ofertas de empresas parceiras selecionadas"
    color="warning"
    v-model="checkboxForm.marketing"
  />
</div>
:::

---

## Dicas

💡 **Label clicável:** Toda a área do label é clicável, melhorando a UX
💡 **Validação automática:** Use com `useForm` para validação sem boilerplate
💡 **Cores universais:** Suporta HEX, RGB, HSL, variáveis CSS e nomes CSS
💡 **Valores customizados:** Use `trueValue`/`falseValue` para APIs específicas
💡 **Estado indeterminado:** Perfeito para "select all" parcial
💡 **Disabled com cores:** Checkboxes disabled mantêm a cor (mais clara) do tema

---

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | *required* | Nome do campo (required) |
| `label` | `string` | `''` | Texto do label |
| `hint` | `string` | `''` | Texto de ajuda abaixo do checkbox |
| `modelValue` | `boolean \| string \| number` | `undefined` | Valor do v-model |
| `color` | `string` | `'primary'` | Cor semântica ou customizada |
| `disabled` | `boolean` | `false` | Desabilita o checkbox |
| `readonly` | `boolean` | `false` | Somente leitura |
| `indeterminate` | `boolean` | `false` | Estado intermediário |
| `trueValue` | `boolean \| string \| number` | `true` | Valor quando marcado |
| `falseValue` | `boolean \| string \| number` | `false` | Valor quando desmarcado |
| `forceError` | `boolean` | `false` | Força visual de erro |
| `externalErrors` | `string \| string[]` | `''` | Erros externos (backend/API) |
| `messages` | `string[]` | `[]` | Mensagens genéricas (info/warning) |
| `maxErrors` | `number` | `1` | Limite de erros exibidos |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'compact'` | Tamanho do checkbox |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posição do label |
| `rules` | `ValidationRule[]` | `[]` | Regras de validação |
| `hideDetails` | `boolean` | `false` | Esconde hint/erro |
| `debug` | `boolean` | `false` | Exibe áreas reservadas |
| `class` | `string \| object \| array` | `''` | Classes CSS customizadas |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean \| string \| number` | Emitido ao alterar o valor |
