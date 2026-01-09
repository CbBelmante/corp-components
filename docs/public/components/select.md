# Select

O componente `CorpSelect` é um select avançado com validação integrada, seleção múltipla com chips, normalização automática de items e sistema de clearable.

## Uso

Selects em sua forma mais simples contêm um label e uma lista de opções.

:::corp-code
<CorpSelect
  v-model="selectForm.frameworkUsage"
  name="frameworkUsage"
  :items="['Vue', 'React', 'Angular', 'Svelte']"
  label="Framework"
  placeholder="Escolha um framework"
/>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpSelect } from 'corp-components'

const framework = ref('')
</script>

<template>
  <CorpSelect
    v-model="framework"
    name="framework"
    :items="['Vue', 'React', 'Angular', 'Svelte']"
    label="Framework"
    placeholder="Escolha um framework"
  />
</template>
```
:::

---

## Props

### Items

A prop `items` aceita dois formatos: **array de strings** ou **array de objetos** com `{value, label}`.

:::corp-code
<CorpSelect
  v-model="selectForm.status"
  name="status"
  :items="['Ativo', 'Inativo', 'Pendente']"
  label="Status (array simples)"
  placeholder="Selecione o status"
  class="max-w-md"
/>

<!-- @disp-code -->
```vue
<script setup>
const statusOptions = ['Ativo', 'Inativo', 'Pendente']
const stateOptions = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' }
]
</script>

<template>
  <!-- Array de strings -->
  <CorpSelect
    v-model="status"
    name="status"
    :items="statusOptions"
    label="Status"
  />

  <!-- Array de objetos -->
  <CorpSelect
    v-model="state"
    name="state"
    :items="stateOptions"
    label="Estado"
  />
</template>
```
:::

| Formato | Exemplo | v-model |
|---------|---------|---------|
| `string[]` | `['Vue', 'React']` | `'Vue'` |
| `{value, label}[]` | `[{value: 'vue', label: 'Vue'}]` | `'vue'` |

> **Normalização Automática:** Internamente, arrays simples são convertidos para `{value, label}` automaticamente.

### Multiple

Use `multiple` para habilitar seleção múltipla. O `v-model` passa a ser um array.

:::corp-code
<CorpSelect
  v-model="selectForm.multipleFrameworks"
  name="multipleFrameworks"
  :items="['Vue', 'React', 'Angular', 'Svelte', 'Solid']"
  label="Frameworks (seleção múltipla)"
  placeholder="Selecione múltiplos frameworks"
  multiple
  class="max-w-md"
/>

<!-- @disp-code -->
```vue
<script setup>
const frameworks = ['Vue', 'React', 'Angular', 'Svelte', 'Solid']
</script>

<template>
  <CorpSelect
    v-model="selectedFrameworks"
    name="frameworks"
    :items="frameworks"
    label="Frameworks"
    placeholder="Selecione múltiplos"
    multiple
  />
</template>
```
:::

> **Nota:** Com `multiple`, o valor do `v-model` é um array de strings/numbers.

### Chips

Combine `multiple` com `chips` para exibir os itens selecionados como badges removíveis.

:::corp-code
<CorpSelect
  v-model="selectForm.skills"
  name="skills"
  :items="['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java']"
  label="Skills (multiple com chips)"
  placeholder="Selecione suas habilidades"
  multiple
  chips
  class="max-w-md"
/>

<!-- @disp-code -->
```vue
<script setup>
const skills = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust']
</script>

<template>
  <CorpSelect
    v-model="selectedSkills"
    name="skills"
    :items="skills"
    label="Skills"
    placeholder="Selecione suas habilidades"
    multiple
    chips
  />
</template>
```
:::

> **Interatividade:** Cada chip possui um botão X para remover o item individualmente.

### Clearable

Adiciona botão (X) para limpar a seleção rapidamente.

:::corp-code
<CorpSelect
  v-model="selectForm.frameworkClear"
  name="frameworkClear"
  :items="['Vue', 'React', 'Angular', 'Svelte']"
  label="Framework (clearable)"
  placeholder="Escolha um framework"
  clearable
  class="max-w-md"
/>

<!-- @disp-code -->
```vue
<template>
  <!-- Single select clearable -->
  <CorpSelect
    v-model="framework"
    name="framework"
    :items="['Vue', 'React', 'Angular']"
    label="Framework"
    clearable
  />

  <!-- Multiple clearable -->
  <CorpSelect
    v-model="skills"
    name="skills"
    :items="['TypeScript', 'JavaScript', 'Python']"
    label="Skills"
    multiple
    chips
    clearable
  />
</template>
```
:::

> **Comportamento:** No single-select, limpa para `undefined`. No multiple, limpa para `[]`.

### Disabled & Readonly

Estados de desabilitado e somente leitura.

:::corp-code
<CorpSelect
  name="frameworkDisabled"
  :items="['Vue', 'React', 'Angular']"
  label="Disabled"
  modelValue="Vue"
  disabled
  class="max-w-md"
/>

<!-- @disp-code -->
```vue
<template>
  <CorpSelect
    v-model="framework"
    name="framework"
    :items="['Vue', 'React', 'Angular']"
    label="Disabled"
    disabled
  />

  <CorpSelect
    v-model="framework"
    name="framework"
    :items="['Vue', 'React', 'Angular']"
    label="Readonly"
    readonly
  />
</template>
```
:::

| Estado | Descrição |
|--------|-----------|
| `disabled` | Desabilita completamente (cinza, não clicável) |
| `readonly` | Somente leitura (não editável, mas mantém estilo normal) |

---


### Validation

Integração automática com `useForm` para validação. Detecta automaticamente se `rules` contém `required`.

:::corp-code
<CorpSelect
  v-model="selectForm.country"
  name="country"
  :items="[
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'uk', label: 'Reino Unido' }
  ]"
  label="País"
  :rules="[rules.required]"
  placeholder="Selecione seu país"
  hint="Campo obrigatório com validação"
  clearable
  class="max-w-md"
/>

<!-- @disp-code -->
```vue
<script setup>
const countries = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' }
]
</script>

<template>
  <CorpSelect
    v-model="country"
    name="country"
    :items="countries"
    label="País"
    :rules="[rules.required]"
    hint="Campo obrigatório"
    clearable
  />

  <CorpSelect
    v-model="languages"
    name="languages"
    :items="[
      { value: 'pt', label: 'Português' },
      { value: 'en', label: 'Inglês' }
    ]"
    label="Idiomas"
    :rules="[rules.required]"
    multiple
    chips
    clearable
  />
</template>
```
:::

> **Auto-detect Required:** Se `rules` contém `required`, adiciona `*` vermelho no label automaticamente.

---

## BorderColor

A prop `borderColor` define a cor da borda do select. Aceita cores semânticas ou customizadas.

### Cores Semânticas

:::corp-code
<CorpSelect name="primary" label="Primary" :items="['Vue', 'React']" borderColor="primary" />
<CorpSelect name="secondary" label="Secondary" :items="['Vue', 'React']" borderColor="secondary" />
<CorpSelect name="success" label="Success" :items="['Vue', 'React']" borderColor="success" />
<CorpSelect name="warning" label="Warning" :items="['Vue', 'React']" borderColor="warning" />
<CorpSelect name="info" label="Info" :items="['Vue', 'React']" borderColor="info" />
<CorpSelect name="destructive" label="Destructive" :items="['Vue', 'React']" borderColor="destructive" />
:::

### Cores Customizadas

Você pode usar **qualquer cor** (HEX, RGB, HSL, variável CSS, nomes CSS):

:::corp-code
<!-- HEX -->
<CorpSelect name="purple" label="Roxo (HEX)" :items="['Vue', 'React']" borderColor="#8b5cf6" />
<CorpSelect name="pink" label="Rosa (HEX)" :items="['Vue', 'React']" borderColor="#ec4899" />

<!-- RGB -->
<CorpSelect name="rgb" label="RGB" :items="['Vue', 'React']" borderColor="rgb(139, 92, 246)" />

<!-- HSL -->
<CorpSelect name="hsl" label="HSL" :items="['Vue', 'React']" borderColor="hsl(280, 87%, 65%)" />

<!-- Nomes CSS -->
<CorpSelect name="cyan" label="Cyan (CSS)" :items="['Vue', 'React']" borderColor="cyan" />
<CorpSelect name="orange" label="Orange (CSS)" :items="['Vue', 'React']" borderColor="orange" />
:::

---

## ChipColor

A prop `chipColor` define a cor dos chips quando `multiple` e `chips` estão ativos.

:::corp-code
<!-- Semântica -->
<CorpSelect name="chipsSuccess" label="Success (semântica)" :items="['TS', 'JS', 'Go']" chipColor="success" multiple chips />

<!-- HEX -->
<CorpSelect name="chipsPurple" label="Roxo (HEX)" :items="['TS', 'JS', 'Go']" chipColor="#8b5cf6" multiple chips />
<CorpSelect name="chipsPink" label="Rosa (HEX)" :items="['TS', 'JS', 'Go']" chipColor="#ec4899" multiple chips />

<!-- RGB -->
<CorpSelect name="chipsRgb" label="RGB" :items="['TS', 'JS', 'Go']" chipColor="rgb(236, 72, 153)" multiple chips />

<!-- Nome CSS -->
<CorpSelect name="chipsOrange" label="Orange (CSS)" :items="['TS', 'JS', 'Go']" chipColor="orange" multiple chips />
:::

---

## Disabled + Cores

Selects disabled mantêm a cor (mais clara) quando têm `borderColor` customizado.

:::corp-code
<div class="grid grid-cols-2 gap-4">
  <CorpSelect name="dis1" label="Primary" :items="['Vue']" borderColor="primary" modelValue="Vue" disabled />
  <CorpSelect name="dis2" label="Success" :items="['Vue']" borderColor="success" modelValue="Vue" disabled />
  <CorpSelect name="dis3" label="Roxo" :items="['Vue']" borderColor="#8b5cf6" modelValue="Vue" disabled />
  <CorpSelect name="dis4" label="Rosa" :items="['Vue']" borderColor="#ec4899" modelValue="Vue" disabled />
</div>
:::

---

## Acessibilidade

O `CorpSelect` usa os primitivos do **reka-ui** que seguem as especificações **WAI-ARIA** para selects:

- Navegação por teclado (Arrow Up/Down, Enter, Escape)
- `aria-label` e `aria-describedby` aplicados automaticamente
- Estado de erro indicado via `aria-invalid`
- Foco visível com ring do Tailwind
- Label associado corretamente com `for` + `id`
