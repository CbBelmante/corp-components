# Input

O componente `CorpInput` é um campo de entrada de texto avançado com validação integrada, máscaras brasileiras (CPF, CNPJ, telefone, CEP), sistema de ícones e slots flexíveis.

## Uso

Inputs em sua forma mais simples contêm apenas um label e placeholder.

:::corp-code
<CorpInput
  v-model="form.nameUsage"
  name="nameUsage"
  label="Nome"
  placeholder="Digite seu nome"
/>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const name = ref('')
</script>

<template>
  <CorpInput
    v-model="name"
    name="name"
    label="Nome"
    placeholder="Digite seu nome"
  />
</template>
```
:::

---

## Props

### Label & Placeholder

Use `label` para o texto descritivo e `placeholder` para dicas dentro do campo.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.name1"
    name="name1"
    label="Nome completo"
    placeholder="Ex: João da Silva"
  />
  <CorpInput
    v-model="form.email1"
    name="email1"
    label="Email"
    prepend-icon="luc-mail"
    placeholder="seu@email.com"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const name = ref('')
const email = ref('')
</script>

<template>
  <CorpInput
    v-model="name"
    name="name"
    label="Nome completo"
    placeholder="Ex: João da Silva"
  />

  <CorpInput
    v-model="email"
    name="email"
    label="Email"
    prepend-icon="luc-mail"
    placeholder="seu@email.com"
  />
</template>
```
:::

---

## Variant

A prop `variant` define o estilo visual do input. Por padrão usa `solo` (fundo + borda).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.variantSolo"
    name="variantSolo"
    label="Solo (padrão)"
    variant="solo"
    placeholder="Fundo + borda"
  />
  <CorpInput
    v-model="form.variantFilled"
    name="variantFilled"
    label="Filled"
    variant="filled"
    placeholder="Só fundo, sem borda"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Solo: fundo + borda (padrão) -->
  <CorpInput
    v-model="name"
    name="name"
    label="Solo (padrão)"
    variant="solo"
  />

  <!-- Filled: só fundo, sem borda -->
  <CorpInput
    v-model="email"
    name="email"
    label="Filled"
    variant="filled"
  />
</template>
```
:::

| Variant | Descrição |
|---------|-----------|
| `solo` | Fundo + borda (padrão) |
| `filled` | Só fundo, sem borda visível |

---

## Density

A prop `density` controla o tamanho (altura) do input.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.densityCompact"
    name="densityCompact"
    label="Compact (h-8)"
    density="compact"
    placeholder="Compacto"
  />
  <CorpInput
    v-model="form.densityRegular"
    name="densityRegular"
    label="Regular (h-9)"
    density="regular"
    placeholder="Regular (padrão)"
  />
  <CorpInput
    v-model="form.densityComfortable"
    name="densityComfortable"
    label="Comfortable (h-10)"
    density="comfortable"
    placeholder="Confortável"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpInput label="Compact" density="compact" />
  <CorpInput label="Regular" density="regular" />
  <CorpInput label="Comfortable" density="comfortable" />
</template>
```
:::

| Density | Altura | Uso |
|---------|--------|-----|
| `compact` | `h-8` (32px) | Interfaces densas, tabelas |
| `regular` | `h-9` (36px) | Uso geral (padrão) |
| `comfortable` | `h-10` (40px) | Formulários espaçosos |

---

## Rounded

Use a prop `rounded` para controlar o border-radius. Aceita **8 presets** (otimizados para formulários), classes Tailwind custom, valores CSS, números ou booleanos:

:::corp-code
<div class="space-y-4 max-w-md">
  <!-- Presets -->
  <CorpInput v-model="form.roundedNone" name="roundedNone" label="None (0)" rounded="none" />
  <CorpInput v-model="form.roundedSm" name="roundedSm" label="Small (2px)" rounded="sm" />
  <CorpInput v-model="form.roundedDefault" name="roundedDefault" label="Default (6px)" rounded="default" />
  <CorpInput v-model="form.roundedLg" name="roundedLg" label="Large (8px)" rounded="lg" />
  <CorpInput v-model="form.roundedFull" name="roundedFull" label="Full (9999px)" rounded="full" />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpInput name="none" rounded="none" />
  <CorpInput name="sm" rounded="sm" />
  <CorpInput name="default" rounded="default" />
  <CorpInput name="lg" rounded="lg" />
  <CorpInput name="full" rounded="full" />
</template>
```
:::

### Rounded Custom

Além dos presets, aceita classes Tailwind, valores CSS, números (px) ou booleanos:

:::corp-code
<div class="space-y-4 max-w-md">
  <!-- Tailwind custom -->
  <CorpInput v-model="form.roundedTailwind" name="roundedTailwind" label="Tailwind custom" rounded="rounded-2xl" />

  <!-- Número (convertido para px) -->
  <CorpInput v-model="form.roundedNumber" name="roundedNumber" label="16px" :rounded="16" />

  <!-- Booleano (true → full, false → none) -->
  <CorpInput v-model="form.roundedBool" name="roundedBool" label="Boolean false" :rounded="false" />

  <!-- CSS value -->
  <CorpInput v-model="form.roundedCss" name="roundedCss" label="CSS 8px 0 0 8px" rounded="8px 0 0 8px" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Tailwind -->
  <CorpInput rounded="rounded-2xl" />

  <!-- Number -->
  <CorpInput :rounded="16" />

  <!-- Boolean -->
  <CorpInput :rounded="false" />

  <!-- CSS -->
  <CorpInput rounded="8px 0 0 8px" />
</template>
```
:::

**Presets disponíveis:** `default`, `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`

---

## BorderColor

A prop `borderColor` define a **cor da borda e focus ring** do input. Aceita cores semânticas ou customizadas.

### Cores Semânticas

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.name1"
    name="inputPrimary"
    label="Primary"
    borderColor="primary"
    placeholder="Cor primary (padrão)"
  />
  <CorpInput
    v-model="form.name1"
    name="inputSecondary"
    label="Secondary"
    borderColor="secondary"
    placeholder="Cor secondary"
  />
  <CorpInput
    v-model="form.name1"
    name="inputSuccess"
    label="Success"
    borderColor="success"
    placeholder="Cor success"
  />
  <CorpInput
    v-model="form.name1"
    name="inputWarning"
    label="Warning"
    borderColor="warning"
    placeholder="Cor warning"
  />
  <CorpInput
    v-model="form.name1"
    name="inputInfo"
    label="Info"
    borderColor="info"
    placeholder="Cor info"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const value = ref('')
</script>

<template>
  <CorpInput
    v-model="value"
    name="input"
    label="Success"
    borderColor="success"
    placeholder="Digite algo..."
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
<div class="space-y-4 max-w-md">
  <!-- HEX -->
  <CorpInput
    v-model="form.name1"
    name="inputPurple"
    label="Marrom (HEX)"
    borderColor="#8B4513"
    placeholder="HEX: #8B4513"
  />
  <CorpInput
    v-model="form.name1"
    name="inputPink"
    label="Cobre (HEX)"
    borderColor="#B87333"
    placeholder="HEX: #B87333"
  />

  <!-- RGB -->
  <CorpInput
    v-model="form.name1"
    name="inputRgb"
    label="RGB"
    borderColor="rgb(139, 69, 19)"
    placeholder="RGB: rgb(139, 69, 19)"
  />

  <!-- HSL -->
  <CorpInput
    v-model="form.name1"
    name="inputHsl"
    label="HSL"
    borderColor="hsl(25, 76%, 31%)"
    placeholder="HSL: hsl(25, 76%, 31%)"
  />

  <!-- Nomes CSS -->
  <CorpInput
    v-model="form.name1"
    name="inputOlive"
    label="Olive (CSS)"
    borderColor="#6B8E23"
    placeholder="HEX: #6B8E23 (Olive)"
  />
  <CorpInput
    v-model="form.name1"
    name="inputOrange"
    label="Orange (CSS)"
    borderColor="orange"
    placeholder="Nome CSS: orange"
  />
</div>
:::

> **Suporte universal!** Cores customizadas (HEX, RGB, HSL, var(), nomes CSS) funcionam perfeitamente.

### Disabled + Cores

Inputs disabled mantêm a cor da borda (mais clara) quando têm cor customizada.

:::corp-code
<div class="grid grid-cols-2 gap-4 max-w-2xl">
  <CorpInput
    name="disabledPrimary"
    label="Primary"
    borderColor="primary"
    model-value="Disabled primary"
    disabled
  />
  <CorpInput
    name="disabledSuccess"
    label="Success"
    borderColor="success"
    model-value="Disabled success"
    disabled
  />
  <CorpInput
    name="disabledPurple"
    label="Marrom"
    borderColor="#8B4513"
    model-value="Disabled marrom"
    disabled
  />
  <CorpInput
    name="disabledPink"
    label="Cobre"
    borderColor="#B87333"
    model-value="Disabled cobre"
    disabled
  />
</div>
:::

---

### Masks

Máscaras brasileiras aplicadas automaticamente durante digitação.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.cpf2"
    name="cpf2"
    label="CPF"
    mask="cpf"
    placeholder="000.000.000-00"
  />
  <CorpInput
    v-model="form.phone1"
    name="phone1"
    label="Telefone"
    mask="phone"
    placeholder="(00) 00000-0000"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const cpf = ref('')
const phone = ref('')
</script>

<template>
  <CorpInput
    v-model="cpf"
    name="cpf"
    label="CPF"
    mask="cpf"
    placeholder="000.000.000-00"
  />

  <CorpInput
    v-model="phone"
    name="phone"
    label="Telefone"
    mask="phone"
    placeholder="(00) 00000-0000"
  />
</template>
```
:::

| Máscara | Formato | Uso |
|---------|---------|-----|
| `cpf` | 000.000.000-00 | CPF brasileiro |
| `cnpj` | 00.000.000/0000-00 | CNPJ brasileiro |
| `phone` | (00) 00000-0000 | Celular/telefone |
| `cep` | 00000-000 | CEP brasileiro |

### Icons

Sistema de 4 posições para ícones:
- `prepend-outer-icon`: Ícone externo à esquerda (fora da borda) - **clicável por padrão**
- `prepend-icon`: Ícone interno à esquerda (dentro da borda) - **não clicável por padrão** (decorativo)
- `append-icon`: Ícone interno à direita (dentro da borda) - **clicável por padrão**
- `append-outer-icon`: Ícone externo à direita (fora da borda) - **clicável por padrão**

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.email4"
    name="email4"
    label="Ícone interno decorativo (não clicável)"
    prepend-icon="luc-mail"
    placeholder="seu@email.com"
  />
  <CorpInput
    v-model="form.search1"
    name="search1"
    label="Ícones clicáveis"
    prepend-outer-icon="luc-search"
    append-icon="luc-sliders-horizontal"
    @click:prepend-outer="() => alert('Buscar clicado')"
    @click:append="() => alert('Filtros clicado')"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const email = ref('')
const search = ref('')
</script>

<template>
  <!-- Ícone decorativo (prepend-icon não é clicável por padrão) -->
  <CorpInput
    v-model="email"
    name="email"
    label="Email"
    prepend-icon="luc-mail"
    placeholder="seu@email.com"
  />

  <!-- Ícones clicáveis com eventos -->
  <CorpInput
    v-model="search"
    name="search"
    label="Buscar"
    prepend-outer-icon="luc-search"
    append-icon="luc-sliders-horizontal"
    @click:prepend-outer="handleSearch"
    @click:append="openFilters"
  />
</template>
```
:::

**Controle de clicabilidade:**

Use as props `*IconClickable` para controlar se um ícone é clicável:

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.name6"
    name="clickable1"
    label="Prepend-icon clicável (padrão é false)"
    prepend-icon="luc-user"
    :prepend-icon-clickable="true"
    @click:prepend="() => alert('Prepend clicado!')"
  />
  <CorpInput
    v-model="form.name7"
    name="clickable2"
    label="Append-icon não clicável (padrão é true)"
    append-icon="luc-info"
    :append-icon-clickable="false"
  />
</div>

<!-- @disp-code -->
```vue
<!-- Tornar prepend-icon clicável -->
<CorpInput
  prepend-icon="luc-user"
  :prepend-icon-clickable="true"
  @click:prepend="selectUser"
/>

<!-- Desabilitar clique em append-icon -->
<CorpInput
  append-icon="luc-info"
  :append-icon-clickable="false"
/>
```
:::

**Cores dos ícones:**

Personalize a cor de cada ícone individualmente. Todas as props de cor suportam classes Tailwind CSS.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.name8"
    name="iconColors1"
    label="Ícone com cor customizada"
    prepend-icon="luc-star"
    prepend-iconColor="text-yellow-500"
    placeholder="Favoritos"
  />
  <CorpInput
    v-model="form.name9"
    name="iconColors2"
    label="Múltiplos ícones com cores diferentes"
    prepend-outer-icon="luc-search"
    prepend-outer-iconColor="text-blue-500"
    append-icon="luc-check"
    append-iconColor="text-green-500"
    @click:prepend-outer="() => alert('Buscar')"
    @click:append="() => alert('Confirmar')"
  />
  <CorpInput
    v-model="form.name10"
    name="iconColors3"
    label="Cor padrão customizada"
    prepend-icon="luc-user"
    append-icon="luc-settings"
    iconColor="text-amber-700"
    hint="Todos os ícones herdam a cor padrão"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const favorite = ref('')
const search = ref('')
const user = ref('')
</script>

<template>
  <!-- Ícone prepend com cor amarela -->
  <CorpInput
    v-model="favorite"
    name="favorite"
    label="Favoritos"
    prepend-icon="luc-star"
    prepend-iconColor="text-yellow-500"
  />

  <!-- Múltiplos ícones com cores diferentes -->
  <CorpInput
    v-model="search"
    name="search"
    label="Buscar"
    prepend-outer-icon="luc-search"
    prepend-outer-iconColor="text-blue-500"
    append-icon="luc-check"
    append-iconColor="text-green-500"
  />

  <!-- Cor padrão para todos os ícones -->
  <CorpInput
    v-model="user"
    name="user"
    label="Usuário"
    prepend-icon="luc-user"
    append-icon="luc-settings"
    iconColor="text-amber-700"
  />
</template>
```
:::

::: tip Hierarquia de Cores
As props específicas (`prependIconColor`, `appendIconColor`, etc) **sobrescrevem** a prop `iconColor`. Se não especificadas, usam o valor padrão `text-muted-foreground`.
:::

### Clearable

Botão "X" para limpar o campo rapidamente.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.name3"
    name="name3"
    label="Nome"
    clearable
  />
  <CorpInput
    v-model="form.email5"
    name="email5"
    label="Email"
    prepend-icon="luc-mail"
    clearable
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const name = ref('')
const email = ref('')
</script>

<template>
  <CorpInput
    v-model="name"
    name="name"
    label="Nome"
    clearable
  />

  <CorpInput
    v-model="email"
    name="email"
    label="Email"
    prepend-icon="luc-mail"
    clearable
  />
</template>
```
:::

### Counter

Contador de caracteres, com ou sem limite.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.bio"
    name="bio1"
    label="Bio"
    :counter="200"
    placeholder="Conte sobre você..."
  />
  <CorpInput
    v-model="form.name4"
    name="name4"
    label="Nome"
    counter
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const bio = ref('')
const name = ref('')
</script>

<template>
  <!-- Counter com limite (200 caracteres) -->
  <CorpInput
    v-model="bio"
    name="bio"
    label="Bio"
    :counter="200"
    placeholder="Conte sobre você..."
  />

  <!-- Counter sem limite (apenas mostra quantidade) -->
  <CorpInput
    v-model="name"
    name="name"
    label="Nome"
    counter
  />
</template>
```
:::

### Prefix e Suffix

Adicione texto fixo antes (prefix) ou depois (suffix) do valor digitado. Ideal para unidades monetárias, domínios, etc.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.price"
    name="price"
    label="Preço"
    prefix="R$"
    placeholder="0,00"
  />
  <CorpInput
    v-model="form.weight"
    name="weight"
    label="Peso"
    suffix="kg"
    placeholder="0"
  />
  <CorpInput
    v-model="form.domain"
    name="domain"
    label="Domínio"
    prefix="https://"
    suffix=".com.br"
    placeholder="meusite"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const price = ref('')
const weight = ref('')
const domain = ref('')
</script>

<template>
  <!-- Prefix: mostra "R$" antes do valor -->
  <CorpInput
    v-model="price"
    name="price"
    label="Preço"
    prefix="R$"
    placeholder="0,00"
  />

  <!-- Suffix: mostra "kg" depois do valor -->
  <CorpInput
    v-model="weight"
    name="weight"
    label="Peso"
    suffix="kg"
    placeholder="0"
  />

  <!-- Prefix + Suffix juntos -->
  <CorpInput
    v-model="domain"
    name="domain"
    label="Domínio"
    prefix="https://"
    suffix=".com.br"
    placeholder="meusite"
  />
</template>
```
:::

::: tip Compatibilidade com Slots
As props `prefix` e `suffix` só funcionam se **não houver** slots `prepend-inner` e `append-inner`. Os slots têm prioridade sobre as props.
:::

### Persistent Hint

Por padrão, o hint só aparece quando não há erro. Com `persistent-hint`, o hint permanece visível mesmo quando há erro.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.username"
    name="username"
    label="Username (Hint Normal)"
    hint="Mínimo 3 caracteres"
    :rules="[rules.required, rules.minLength(3)]"
  />
  <CorpInput
    v-model="form.username2"
    name="username2"
    label="Username (Persistent Hint)"
    hint="Mínimo 3 caracteres"
    :rules="[rules.required, rules.minLength(3)]"
    persistent-hint
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'
import { useValidationRules } from 'corp-components/validations'

const username = ref('')
const username2 = ref('')
const rules = useValidationRules()
</script>

<template>
  <!-- Hint desaparece quando há erro -->
  <CorpInput
    v-model="username"
    name="username"
    label="Username (Hint Normal)"
    hint="Mínimo 3 caracteres"
    :rules="[rules.required, rules.minLength(3)]"
  />

  <!-- Hint permanece visível mesmo com erro -->
  <CorpInput
    v-model="username2"
    name="username2"
    label="Username (Persistent Hint)"
    hint="Mínimo 3 caracteres"
    :rules="[rules.required, rules.minLength(3)]"
    persistent-hint
  />
</template>
```
:::

### Loading

Exibe um spinner animado durante operações assíncronas (validação, busca em API, etc).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.cep"
    name="cep"
    label="CEP"
    mask="cep"
    :loading="loadingInput"
    append-icon="luc-search"
    @click:append="simulateLoadingInput"
    hint="Clique na lupa para buscar"
  />
  <CorpInput
    v-model="form.email8"
    name="email8"
    label="Email"
    :loading="loadingInput"
    prefix="@"
    hint="Validando disponibilidade..."
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const cep = ref('')
const email = ref('')
const loading = ref(false)

const buscarCep = () => {
  loading.value = true
  // Simula busca em API
  setTimeout(() => {
    loading.value = false
    alert('CEP encontrado!')
  }, 2000)
}
</script>

<template>
  <!-- Loading com append-icon: spinner substitui o ícone -->
  <CorpInput
    v-model="cep"
    name="cep"
    label="CEP"
    mask="cep"
    :loading="loading"
    append-icon="luc-search"
    @click:append="buscarCep"
    hint="Clique na lupa para buscar"
  />

  <!-- Loading com prefix -->
  <CorpInput
    v-model="email"
    name="email"
    label="Email"
    :loading="loading"
    prefix="@"
    hint="Validando disponibilidade..."
  />
</template>
```
:::

::: tip Comportamento do Loading
O spinner **substitui** o `append-icon` quando `loading=true`. Pode ser combinado com `clearable`, `prefix` e `suffix`.
:::

### Password

Use `type="password"` para campos de senha.

:::corp-code
<div class="max-w-md">
  <CorpInput
    v-model="form.password1"
    name="password1"
    label="Senha"
    type="password"
    prepend-icon="luc-lock"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const password = ref('')
</script>

<template>
  <CorpInput
    v-model="password"
    name="password"
    label="Senha"
    type="password"
    prepend-icon="luc-lock"
  />
</template>
```
:::

### States

Estados de `disabled` e `readonly`.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.name5"
    name="name5"
    label="Desabilitado"
    disabled
    model-value="Campo desabilitado"
  />
  <CorpInput
    v-model="form.email6"
    name="email6"
    label="Somente leitura"
    readonly
    model-value="campo@readonly.com"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const name = ref('Campo desabilitado')
const email = ref('campo@readonly.com')
</script>

<template>
  <CorpInput
    v-model="name"
    name="name"
    label="Desabilitado"
    disabled
  />

  <CorpInput
    v-model="email"
    name="email"
    label="Somente leitura"
    readonly
  />
</template>
```
:::

### Hint

Mensagens de ajuda abaixo do input.

:::corp-code
<div class="max-w-md">
  <CorpInput
    v-model="form.password2"
    name="password2"
    label="Senha"
    type="password"
    hint="isso é um hint"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const password = ref('')
</script>

<template>
  <CorpInput
    v-model="password"
    name="password"
    label="Senha"
    type="password"
    hint="Mínimo 8 caracteres, 1 maiúscula e 1 número"
  />
</template>
```
:::

### Validation

Integração completa com `useForm` e validação reativa. Erros aparecem após blur. O asterisco vermelho (\*) aparece automaticamente quando você usa `rules.required`.

:::warning ⚠️ IMPORTANTE: `useForm()` é OBRIGATÓRIO para validação funcionar!
O `CorpInput` usa `inject('corpValidation')` para acessar o contexto de validação.
Sem `useForm()` no componente pai, as `:rules` NÃO funcionam!
:::

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpInput
    v-model="form.email3"
    name="email3"
    label="Email"
    :rules="[rules.required, rules.email]"
  />
  <CorpInput
    v-model="form.cpf1"
    name="cpf1"
    label="CPF"
    :rules="[rules.required, rules.cpf]"
    mask="cpf"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { CorpInput } from 'corp-components'
import { useForm } from '@/composables/useForm'
import { useValidationRules } from '@/validations/rules'

// useForm() fornece contexto de validação (OBRIGATÓRIO!)
const { form } = useForm({
  initialValues: {
    email: '',
    cpf: '',
  },
  formName: 'ValidationExample',
})

const rules = useValidationRules()
</script>

<template>
  <CorpInput
    v-model="form.email"
    name="email"
    label="Email"
    :rules="[rules.required, rules.email]"
  />

  <CorpInput
    v-model="form.cpf"
    name="cpf"
    label="CPF"
    :rules="[rules.required, rules.cpf]"
    mask="cpf"
  />
</template>
```
:::

#### Regras de Validação Disponíveis

O `useValidationRules()` fornece regras prontas para uso. Uma **rule** é uma função que retorna `true` (válido) ou uma `string` com mensagem de erro.

**Regras Básicas:**
- `rules.required` - Campo obrigatório
- `rules.email` - Email válido
- `rules.url` - URL válida
- `rules.integer` - Número inteiro
- `rules.positive` - Número positivo

**Regras com Parâmetros:**
- `rules.minLength(n)` - Mínimo de caracteres
- `rules.maxLength(n)` - Máximo de caracteres
- `rules.min(n)` - Valor mínimo
- `rules.max(n)` - Valor máximo

**Regras Brasileiras:**
- `rules.cpf` - CPF válido
- `rules.cnpj` - CNPJ válido
- `rules.cep` - CEP válido
- `rules.phone` - Telefone válido

**Regras de Data:**
- `rules.date` - Data válida
- `rules.dateMin(date)` - Data mínima
- `rules.dateMax(date)` - Data máxima

#### Regras Customizadas

Você pode criar suas próprias regras. Uma rule é uma função que retorna `true` ou `string`:

```vue
<script setup>
import { CorpInput } from 'corp-components'
import { useForm } from '@/composables/useForm'

const { form } = useForm({
  initialValues: { username: '' },
  formName: 'CustomRulesExample',
})

// Rule customizada: usuário deve começar com @
const startsWithAt = (value: string) => {
  if (!value) return true // Permite vazio (use required separadamente)
  return value.startsWith('@') || 'Usuário deve começar com @'
}

// Rule customizada: apenas letras minúsculas
const onlyLowercase = (value: string) => {
  if (!value) return true
  return value === value.toLowerCase() || 'Apenas letras minúsculas'
}

// Combinando múltiplas rules
const usernameRules = [startsWithAt, onlyLowercase]
</script>

<template>
  <CorpInput
    v-model="form.username"
    name="username"
    label="Username"
    :rules="usernameRules"
    hint="Deve começar com @ e ser minúsculo"
  />
</template>
```

#### Validação Assíncrona

Para validações que precisam consultar API (ex: verificar se email existe):

```vue
<script setup>
import { CorpInput } from 'corp-components'
import { useForm } from '@/composables/useForm'

const { form } = useForm({
  initialValues: { email: '' },
  formName: 'AsyncValidation',
})

// Rule assíncrona
const emailAvailable = async (value: string) => {
  if (!value) return true

  const response = await fetch(`/api/check-email?email=${value}`)
  const { available } = await response.json()

  return available || 'Email já cadastrado'
}
</script>

<template>
  <CorpInput
    v-model="form.email"
    name="email"
    label="Email"
    :rules="[emailAvailable]"
  />
</template>
```

---

## Slots

O componente `CorpInput` oferece 4 slots para customização total.

| Slot | Descrição |
|------|-----------|
| **prepend** | Conteúdo externo à esquerda do input (fora da borda) |
| **prepend-inner** | Conteúdo interno à esquerda (dentro da borda) |
| **append-inner** | Conteúdo interno à direita (dentro da borda) |
| **append** | Conteúdo externo à direita do input (fora da borda) |

### Slot Prepend Inner

Use para adicionar conteúdo customizado dentro do input à esquerda.

:::corp-code
<div class="max-w-md">
  <CorpInput
    v-model="form.website"
    name="website"
    label="Website"
  >
    <template #prepend-inner>
      <span class="text-xs text-muted-foreground">https://</span>
    </template>
  </CorpInput>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const website = ref('')
</script>

<template>
  <CorpInput
    v-model="website"
    name="website"
    label="Website"
  >
    <template #prepend-inner>
      <span class="text-xs text-muted-foreground">https://</span>
    </template>
  </CorpInput>
</template>
```
:::

### Slot Append Inner

Use para adicionar conteúdo customizado dentro do input à direita.

:::corp-code
<div class="max-w-md">
  <CorpInput
    v-model="form.domainSlot"
    name="domainSlot"
    label="Domínio"
  >
    <template #append-inner>
      <span class="text-xs text-muted-foreground">.com.br</span>
    </template>
  </CorpInput>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const domain = ref('')
</script>

<template>
  <CorpInput
    v-model="domain"
    name="domainSlot"
    label="Domínio"
  >
    <template #append-inner>
      <span class="text-xs text-muted-foreground">.com.br</span>
    </template>
  </CorpInput>
</template>
```
:::

---

## Acessibilidade

O componente `CorpInput` segue as melhores práticas de acessibilidade.

### Labels Acessíveis

Sempre forneça um `label` ou `aria-label` para leitores de tela:

```vue
<!-- Com label visível (recomendado) -->
<CorpInput
  v-model="form.name1"
  name="name"
  label="Nome completo"
/>

<!-- Sem label visível (usar aria-label) -->
<CorpInput
  v-model="search"
  name="search"
  aria-label="Buscar no site"
  placeholder="Buscar..."
/>
```

### Campos Obrigatórios

Use `rules.required` para indicar campos obrigatórios (o asterisco aparece automaticamente):

```vue
<CorpInput
  v-model="form.email1"
  name="email"
  label="Email"
  :rules="[rules.required]"
  aria-required="true"
/>
```

### Mensagens de Erro

Erros são automaticamente associados ao input via `aria-describedby`:

```vue
<CorpInput
  v-model="form.email1"
  name="email"
  label="Email"
  :rules="[rules.required, rules.email]"
  hint="Digite um email válido"
/>
<!-- aria-describedby é automaticamente adicionado quando há erro -->
```

### Navegação por Teclado

O componente suporta navegação completa por teclado:

- **Tab**: Move foco para o input
- **Shift + Tab**: Move foco para elemento anterior
- **Esc**: Limpa o campo (se `clearable`)

---

## Exemplos

### Formulário com Máscaras

Campos com máscaras brasileiras e validação.

:::corp-code
<div class="max-w-md space-y-4">
  <CorpInput
    v-model="form.cpf3"
    name="cpf3"
    label="CPF"
    mask="cpf"
    :rules="[rules.required, rules.cpf]"
    clearable
  />
  <CorpInput
    v-model="form.phone2"
    name="phone2"
    label="Celular"
    mask="phone"
    :rules="[rules.required]"
    clearable
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { CorpInput } from 'corp-components'
import { useForm } from '@/composables/useForm'
import { useValidationRules } from '@/validations/rules'

// useForm() necessário para validação funcionar
const { form } = useForm({
  initialValues: {
    cpf: '',
    phone: '',
  },
  formName: 'MasksForm',
})

const rules = useValidationRules()
</script>

<template>
  <div class="max-w-md space-y-4">
    <CorpInput
      v-model="form.cpf"
      name="cpf"
      label="CPF"
      mask="cpf"
      :rules="[rules.required, rules.cpf]"
      clearable
    />
    <CorpInput
      v-model="form.phone"
      name="phone"
      label="Celular"
      mask="phone"
      :rules="[rules.required]"
      clearable
    />
  </div>
</template>
```
:::

### Campo de Busca

Input com ícones e clearable para busca.

:::corp-code
<div class="max-w-md">
  <CorpInput
    v-model="form.search2"
    name="search2"
    placeholder="Buscar produtos, categorias..."
    prepend-icon="luc-search"
    clearable
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpInput } from 'corp-components'

const search = ref('')
</script>

<template>
  <CorpInput
    v-model="search"
    name="search"
    placeholder="Buscar produtos, categorias..."
    prepend-icon="luc-search"
    clearable
  />
</template>
```
:::

### Formulário Completo com Submit

Exemplo completo de formulário com validação, submit e botões de ação.

:::corp-code
<div class="max-w-md space-y-4">
  <CorpInput
    v-model="form.nameForm"
    name="nameForm"
    label="Nome completo"
    :rules="[rules.required, rules.minLength(3)]"
    clearable
  />
  <CorpInput
    v-model="form.emailForm"
    name="emailForm"
    label="Email"
    type="email"
    prepend-icon="luc-mail"
    :rules="[rules.required, rules.email]"
    clearable
  />
  <CorpInput
    v-model="form.passwordForm"
    name="passwordForm"
    label="Senha"
    type="password"
    prepend-icon="luc-lock"
    :rules="[rules.required, rules.minLength(6)]"
  />
  <div class="flex gap-2 justify-center">
    <CorpButton @click="handleSubmit">Enviar</CorpButton>
    <CorpButton variant="outline" @click="handleClear">Limpar</CorpButton>
  </div>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { CorpInput } from 'corp-components'
import { CorpButton } from 'corp-components'
import { useForm } from '@/composables/useForm'
import { useValidationRules } from '@/validations/rules'

const { form, validateForm } = useForm({
  initialValues: {
    nameForm: '',
    emailForm: '',
    passwordForm: '',
  },
  formName: 'CompleteForm',
})

const rules = useValidationRules()

const handleSubmit = () => {
  const schema = {
    nameForm: [rules.required, rules.minLength(3)],
    emailForm: [rules.required, rules.email],
    passwordForm: [rules.required, rules.minLength(6)],
  }

  const isValid = validateForm(schema)

  if (isValid) {
    alert('Formulário válido e enviado!')
  } else {
    alert('Formulário inválido! Verifique os campos.')
  }
}

const handleClear = () => {
  form.nameForm = ''
  form.emailForm = ''
  form.passwordForm = ''
}
</script>

<template>
  <div class="max-w-md space-y-4">
    <CorpInput
      v-model="form.nameForm"
      name="nameForm"
      label="Nome completo"
      :rules="[rules.required, rules.minLength(3)]"
      clearable
    />
    <CorpInput
      v-model="form.emailForm"
      name="emailForm"
      label="Email"
      type="email"
      prepend-icon="luc-mail"
      :rules="[rules.required, rules.email]"
      clearable
    />
    <CorpInput
      v-model="form.passwordForm"
      name="passwordForm"
      label="Senha"
      type="password"
      prepend-icon="luc-lock"
      :rules="[rules.required, rules.minLength(6)]"
    />

    <div class="flex gap-2 justify-center">
      <CorpButton @click="handleSubmit">Enviar</CorpButton>
      <CorpButton variant="outline" @click="handleClear">Limpar</CorpButton>
    </div>
  </div>
</template>
```
:::

---

## API Reference

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | **required** | Nome do campo (identificador único) |
| `label` | `string` | `''` | Label acima do input |
| `modelValue` | `string \| number` | `undefined` | Valor do input (v-model) |
| `variant` | `'solo' \| 'filled'` | `'solo'` | Estilo visual (solo = fundo + borda, filled = só fundo) |
| `density` | `'compact' \| 'regular' \| 'comfortable'` | `'regular'` | Tamanho/altura do input |
| `rounded` | `RoundedValue` | `'default'` | **8 presets** (forms): default, none, xs, sm, md, lg, xl, full **OU** Tailwind class **OU** CSS value **OU** number (px) **OU** boolean (true=full, false=none) |
| `type` | `string` | `'text'` | Tipo HTML do input (text, password, email, etc) |
| `placeholder` | `string` | `''` | Texto de placeholder |
| `hint` | `string` | `''` | Mensagem de ajuda abaixo do input |
| `rules` | `ValidationRule[]` | `[]` | Array de regras de validação (asterisco aparece automaticamente com `rules.required`) |
| `disabled` | `boolean` | `false` | Desabilita o input |
| `readonly` | `boolean` | `false` | Input somente leitura |
| `mask` | `'cpf' \| 'cnpj' \| 'phone' \| 'cep' \| Function` | `undefined` | Máscara a ser aplicada |
| `prependOuterIcon` | `string` | `undefined` | Ícone externo à esquerda (fora da borda) |
| `prependIcon` | `string` | `undefined` | Ícone interno à esquerda (dentro da borda) |
| `appendIcon` | `string` | `undefined` | Ícone interno à direita (dentro da borda) |
| `appendOuterIcon` | `string` | `undefined` | Ícone externo à direita (fora da borda) |
| `prependOuterIconClickable` | `boolean` | `true` | Se ícone prepend-outer é clicável |
| `prependIconClickable` | `boolean` | `false` | Se ícone prepend é clicável |
| `appendIconClickable` | `boolean` | `true` | Se ícone append é clicável |
| `appendOuterIconClickable` | `boolean` | `true` | Se ícone append-outer é clicável |
| `iconColor` | `string` | `'text-muted-foreground'` | Cor padrão de todos os ícones (classes Tailwind CSS) |
| `prependOuterIconColor` | `string` | `undefined` | Cor específica do prepend-outer-icon (sobrescreve iconColor) |
| `prependIconColor` | `string` | `undefined` | Cor específica do prepend-icon (sobrescreve iconColor) |
| `appendIconColor` | `string` | `undefined` | Cor específica do append-icon (sobrescreve iconColor) |
| `appendOuterIconColor` | `string` | `undefined` | Cor específica do append-outer-icon (sobrescreve iconColor) |
| `clearable` | `boolean` | `false` | Mostra botão para limpar campo |
| `counter` | `boolean \| number` | `false` | Contador de caracteres (true = apenas mostra, number = limite) |
| `prefix` | `string` | `undefined` | Texto fixo antes do valor (ex: "R$", "https://") |
| `suffix` | `string` | `undefined` | Texto fixo depois do valor (ex: "kg", ".com") |
| `persistentHint` | `boolean` | `false` | Mantém hint visível mesmo quando há erro |
| `loading` | `boolean` | `false` | Exibe spinner animado (substitui append-icon) |
| `hideDetails` | `boolean` | `false` | Oculta hint/error/counter |
| `iconSize` | `number` | `16` | Tamanho dos ícones em pixels |

### Slots

| Slot | Descrição |
|------|-----------|
| `prepend` | Conteúdo externo à esquerda (fora da borda) |
| `prepend-inner` | Conteúdo interno à esquerda (dentro da borda) |
| `append-inner` | Conteúdo interno à direita (dentro da borda) |
| `append` | Conteúdo externo à direita (fora da borda) |

### Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| `update:modelValue` | `string \| number` | Emitido quando o valor muda |
| `click:prepend-outer` | - | Clique no ícone prepend-outer (se clickable) |
| `click:prepend` | - | Clique no ícone prepend |
| `click:append` | - | Clique no ícone append |
| `click:append-outer` | - | Clique no ícone append-outer (se clickable) |
| `click:clear` | - | Clique no botão clear |
