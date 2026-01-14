# Radio Group

O componente `CorpRadioGroup` permite seleção única entre opções. Ideal para escolhas exclusivas como planos, métodos de pagamento ou preferências.

## Uso

Radio groups em sua forma mais simples permitem escolher uma opção entre várias.

:::corp-code
<CorpRadioGroup v-model="radioForm.plan" name="planUsage" label="Escolha um plano">
  <CorpRadioGroupItem value="free" label="Free" />
  <CorpRadioGroupItem value="pro" label="Pro" />
  <CorpRadioGroupItem value="enterprise" label="Enterprise" />
</CorpRadioGroup>
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ radioForm.plan || 'nenhum' }}</code>
</p>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpRadioGroup, CorpRadioGroupItem } from 'corp-components'

const plan = ref('')
</script>

<template>
  <CorpRadioGroup v-model="plan" name="plan" label="Escolha um plano">
    <CorpRadioGroupItem value="free" label="Free" />
    <CorpRadioGroupItem value="pro" label="Pro" />
    <CorpRadioGroupItem value="enterprise" label="Enterprise" />
  </CorpRadioGroup>
</template>
```
:::

---

## Props

O `CorpRadioGroup` e `CorpRadioGroupItem` suportam diversas props para customização.

### Label e Hint

Use `label` para texto descritivo e `hint` para informações adicionais.

:::corp-code
<CorpRadioGroup
  v-model="radioForm.notification"
  name="notification"
  label="Como deseja receber notificações?"
  hint="Você pode mudar isso depois nas configurações"
>
  <CorpRadioGroupItem value="email" label="Email" hint="Receber por email" />
  <CorpRadioGroupItem value="sms" label="SMS" hint="Receber por mensagem de texto" />
  <CorpRadioGroupItem value="push" label="Push" hint="Notificações no navegador" />
</CorpRadioGroup>
:::

---

## Variant

A prop `variant` define o estilo visual do radio quando selecionado.

### Solid (padrão)

Fundo colorido quando checked, bolinha branca.

:::corp-code
<CorpRadioGroup v-model="radioForm.variantSolid" name="variantSolid" variant="solid" orientation="horizontal">
  <CorpRadioGroupItem value="solid1" label="Opção 1" />
  <CorpRadioGroupItem value="solid2" label="Opção 2" />
  <CorpRadioGroupItem value="solid3" label="Opção 3" />
</CorpRadioGroup>
:::

### Ghost

Fundo sutil (10%) quando checked, borda e bolinha coloridas.

:::corp-code
<CorpRadioGroup v-model="radioForm.variantGhost" name="variantGhost" variant="ghost" orientation="horizontal">
  <CorpRadioGroupItem value="ghost1" label="Opção 1" />
  <CorpRadioGroupItem value="ghost2" label="Opção 2" />
  <CorpRadioGroupItem value="ghost3" label="Opção 3" />
</CorpRadioGroup>
:::

### Outline

Apenas bolinha colorida quando checked, borda mantém tema.

:::corp-code
<CorpRadioGroup v-model="radioForm.variantOutline" name="variantOutline" variant="outline" orientation="horizontal">
  <CorpRadioGroupItem value="outline1" label="Opção 1" />
  <CorpRadioGroupItem value="outline2" label="Opção 2" />
  <CorpRadioGroupItem value="outline3" label="Opção 3" />
</CorpRadioGroup>
:::

---

## Orientação

Use `orientation` para definir layout vertical ou horizontal.

:::corp-code
<div class="space-y-6">
  <CorpRadioGroup v-model="radioForm.orientationVertical" name="orientationVertical" label="Vertical (padrão)" orientation="vertical">
    <CorpRadioGroupItem value="vert1" label="Opção 1" />
    <CorpRadioGroupItem value="vert2" label="Opção 2" />
    <CorpRadioGroupItem value="vert3" label="Opção 3" />
  </CorpRadioGroup>

  <CorpRadioGroup v-model="radioForm.orientationHorizontal" name="orientationHorizontal" label="Horizontal" orientation="horizontal">
    <CorpRadioGroupItem value="horiz1" label="Opção 1" />
    <CorpRadioGroupItem value="horiz2" label="Opção 2" />
    <CorpRadioGroupItem value="horiz3" label="Opção 3" />
  </CorpRadioGroup>
</div>
:::

---

## Estados

### Disabled

Use `disabled` no grupo para desabilitar todas as opções, ou no item individual.

:::corp-code
<div class="space-y-4">
  <CorpRadioGroup
    v-model="radioForm.disabledGroup"
    name="disabledGroup"
    label="Grupo desabilitado"
    disabled
  >
    <CorpRadioGroupItem value="disGroup1" label="Opção 1" />
    <CorpRadioGroupItem value="disGroup2" label="Opção 2" />
  </CorpRadioGroup>

  <CorpRadioGroup
    v-model="radioForm.disabledItem"
    name="disabledItem"
    label="Item individual desabilitado"
  >
    <CorpRadioGroupItem value="disItem1" label="Opção 1" />
    <CorpRadioGroupItem value="disItem2" label="Opção 2 (disabled)" disabled />
    <CorpRadioGroupItem value="disItem3" label="Opção 3" />
  </CorpRadioGroup>
</div>
:::

### Readonly

Use `readonly` para exibir o estado sem permitir alteração.

:::corp-code
<CorpRadioGroup
  v-model="radioForm.readonlySelection"
  name="readonlyGroup"
  label="Grupo readonly"
  hint="Seleção não pode ser alterada"
  readonly
>
  <CorpRadioGroupItem value="readonly1" label="Opção 1" />
  <CorpRadioGroupItem value="readonly2" label="Opção 2" />
  <CorpRadioGroupItem value="readonly3" label="Opção 3" />
</CorpRadioGroup>
:::

---

## Color

A prop `color` define a cor do radio quando **selecionado**. Aceita cores semânticas ou customizadas.

### Cores Semânticas

:::corp-code
<CorpRadioGroup v-model="radioForm.colorSemantic" name="semanticColors" label="Cores Semânticas">
  <CorpRadioGroupItem value="primary" label="Primary" color="primary" />
  <CorpRadioGroupItem value="secondary" label="Secondary" color="secondary" />
  <CorpRadioGroupItem value="destructive" label="Destructive" color="destructive" />
  <CorpRadioGroupItem value="success" label="Success" color="success" />
  <CorpRadioGroupItem value="warning" label="Warning" color="warning" />
  <CorpRadioGroupItem value="info" label="Info" color="info" />
</CorpRadioGroup>
:::

### Cores Customizadas

Você pode usar **qualquer cor** (HEX, RGB, HSL, variável CSS, nomes CSS):

:::corp-code
<CorpRadioGroup v-model="radioForm.colorCustom" name="customColors" label="Cores Customizadas">
  <CorpRadioGroupItem value="purple" label="Marrom (#8B4513)" color="#8B4513" />
  <CorpRadioGroupItem value="pink" label="Cobre (#B87333)" color="#B87333" />
  <CorpRadioGroupItem value="cyan" label="Olive (nome CSS)" color="#6B8E23" />
  <CorpRadioGroupItem value="orange" label="Orange (nome CSS)" color="orange" />
</CorpRadioGroup>
:::

---

## Density

Controle o tamanho do radio com a prop `density`.

:::corp-code
<div class="space-y-6">
  <CorpRadioGroup v-model="radioForm.densityCompact" name="densityCompact" label="Compact (padrão)" density="compact" orientation="horizontal">
    <CorpRadioGroupItem value="compact1" label="Opção 1" />
    <CorpRadioGroupItem value="compact2" label="Opção 2" />
    <CorpRadioGroupItem value="compact3" label="Opção 3" />
  </CorpRadioGroup>

  <CorpRadioGroup v-model="radioForm.densityRegular" name="densityRegular" label="Regular" density="regular" orientation="horizontal">
    <CorpRadioGroupItem value="regular1" label="Opção 1" />
    <CorpRadioGroupItem value="regular2" label="Opção 2" />
    <CorpRadioGroupItem value="regular3" label="Opção 3" />
  </CorpRadioGroup>

  <CorpRadioGroup v-model="radioForm.densityComfortable" name="densityComfortable" label="Comfortable" density="comfortable" orientation="horizontal">
    <CorpRadioGroupItem value="comfort1" label="Opção 1" />
    <CorpRadioGroupItem value="comfort2" label="Opção 2" />
    <CorpRadioGroupItem value="comfort3" label="Opção 3" />
  </CorpRadioGroup>
</div>
:::

---

## Posição do Label

Use `labelPosition` para alterar a posição do label no item.

:::corp-code
<div class="space-y-4">
  <CorpRadioGroup v-model="radioForm.labelRight" name="labelRight" label="Label à direita (padrão)">
    <CorpRadioGroupItem value="posRight1" label="Radio à esquerda" label-position="right" />
    <CorpRadioGroupItem value="posRight2" label="Opção 2" label-position="right" />
  </CorpRadioGroup>

  <CorpRadioGroup v-model="radioForm.labelLeft" name="labelLeft" label="Label à esquerda">
    <CorpRadioGroupItem value="posLeft1" label="Radio à direita" label-position="left" />
    <CorpRadioGroupItem value="posLeft2" label="Opção 2" label-position="left" />
  </CorpRadioGroup>
</div>
:::

---

## Valores Numéricos

O v-model aceita valores numéricos além de strings.

:::corp-code
<CorpRadioGroup v-model="radioForm.numericSelection" name="numericValues" label="Selecione um nível">
  <CorpRadioGroupItem :value="1" label="Nível 1 (Iniciante)" />
  <CorpRadioGroupItem :value="2" label="Nível 2 (Intermediário)" />
  <CorpRadioGroupItem :value="3" label="Nível 3 (Avançado)" />
</CorpRadioGroup>
<p class="text-sm text-muted-foreground mt-2">
  Valor: <code>{{ radioForm.numericSelection }}</code> (type: {{ typeof radioForm.numericSelection }})
</p>
:::

---

## Validação

O `CorpRadioGroup` integra-se com o sistema de validação `useForm`.

:::corp-code
<CorpRadioGroup
  v-model="radioForm.paymentMethod"
  name="paymentMethod"
  label="Método de pagamento *"
  hint="Campo obrigatório"
  :rules="[rules.required]"
>
  <CorpRadioGroupItem value="credit" label="Cartão de Crédito" />
  <CorpRadioGroupItem value="debit" label="Cartão de Débito" />
  <CorpRadioGroupItem value="pix" label="PIX" />
  <CorpRadioGroupItem value="boleto" label="Boleto" />
</CorpRadioGroup>
:::

---

## Erros Externos

Use `externalErrors` para exibir erros vindos do backend/API.

:::corp-code
<CorpRadioGroup
  v-model="radioForm.plan"
  name="externalError"
  label="Escolha um plano"
  :external-errors="['Plano indisponível para sua região']"
>
  <CorpRadioGroupItem value="free" label="Free" />
  <CorpRadioGroupItem value="pro" label="Pro" />
  <CorpRadioGroupItem value="enterprise" label="Enterprise" />
</CorpRadioGroup>
:::

### Force Error

Use `forceError` para forçar visual de erro (sem mensagem).

:::corp-code
<CorpRadioGroup
  v-model="radioForm.plan"
  name="forceError"
  label="Campo com erro forçado"
  force-error
>
  <CorpRadioGroupItem value="free" label="Free" />
  <CorpRadioGroupItem value="pro" label="Pro" />
</CorpRadioGroup>
:::

---

## Exemplo Real

### Seleção de Plano Empresarial

:::corp-code
<CorpRadioGroup
  v-model="radioForm.companySize"
  name="companySize"
  label="Tamanho da sua empresa"
  hint="Isso nos ajuda a recomendar o melhor plano"
  density="regular"
>
  <CorpRadioGroupItem
    value="small"
    label="Pequena (1-10 funcionários)"
    hint="Ideal para startups e pequenos negócios"
    color="success"
  />
  <CorpRadioGroupItem
    value="medium"
    label="Média (11-50 funcionários)"
    hint="Perfeito para empresas em crescimento"
    color="info"
  />
  <CorpRadioGroupItem
    value="large"
    label="Grande (51-200 funcionários)"
    hint="Para empresas estabelecidas"
    color="warning"
  />
  <CorpRadioGroupItem
    value="enterprise"
    label="Enterprise (200+ funcionários)"
    hint="Soluções customizadas e suporte dedicado"
    color="primary"
  />
</CorpRadioGroup>
<p class="text-sm text-muted-foreground mt-2">
  Selecionado: <code>{{ radioForm.companySize }}</code>
</p>
:::

---

## Acessibilidade

- Suporte a navegação por teclado (Arrow keys, Space)
- Estados ARIA (`aria-checked`, `aria-disabled`)
- Label clicável (aumenta área de interação)
- Focus visible com ring de destaque
- Suporte a leitores de tela

---

## Dicas

- **Composição flexível:** Use CorpRadioGroupItem com qualquer combinação de props
- **Cores universais:** Suporta HEX, RGB, HSL, variáveis CSS e nomes CSS
- **Validação automática:** Use com `useForm` para validação sem boilerplate
- **Orientação responsiva:** Use `orientation="horizontal"` para layouts inline
- **Variant por item:** Cada item pode ter seu próprio variant

---

## API Reference

### CorpRadioGroup Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | *required* | Nome do campo (required) |
| `label` | `string` | `''` | Texto do label do grupo |
| `hint` | `string` | `''` | Texto de ajuda abaixo do grupo |
| `rules` | `ValidationRule[]` | `[]` | Regras de validação |
| `disabled` | `boolean` | `false` | Desabilita todo o grupo |
| `readonly` | `boolean` | `false` | Somente leitura |
| `forceError` | `boolean` | `false` | Força visual de erro |
| `externalErrors` | `string \| string[]` | `''` | Erros externos (backend/API) |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Orientação dos itens |
| `hideDetails` | `boolean` | `false` | Esconde hint/erro |
| `messages` | `string[]` | `[]` | Mensagens genéricas |
| `maxErrors` | `number` | `1` | Limite de erros exibidos |
| `density` | `'compact' \| 'regular' \| 'comfortable'` | `'compact'` | Tamanho dos radios (herdado pelos items) |
| `variant` | `'solid' \| 'ghost' \| 'outline'` | `'solid'` | Estilo visual (herdado pelos items) |
| `modelValue` | `string \| number` | `undefined` | Valor do v-model |

### CorpRadioGroupItem Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `value` | `string \| number` | *required* | Valor do item |
| `label` | `string` | `''` | Texto do label |
| `hint` | `string` | `''` | Texto de ajuda |
| `disabled` | `boolean` | `false` | Desabilita o item |
| `color` | `string` | `'primary'` | Cor semântica ou customizada |
| `hideDetails` | `boolean` | `false` | Esconde hint do item |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posição do label |
| `density` | `'compact' \| 'regular' \| 'comfortable'` | *herda do grupo* | Sobrescreve tamanho do grupo |
| `variant` | `'solid' \| 'ghost' \| 'outline'` | *herda do grupo* | Sobrescreve estilo do grupo |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Emitido ao selecionar uma opção |
