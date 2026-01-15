# Textarea

O componente `CorpTextarea` é um campo de texto multilinha avançado com validação integrada, auto-grow, sistema de ícones outer e contador de caracteres.

## Uso

Textareas em sua forma mais simples contêm apenas um label e placeholder.

:::corp-code
<CorpTextarea
  v-model="textareaForm.bioUsage"
  name="bioUsage"
  label="Bio"
  placeholder="Conte sobre você..."
/>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const bio = ref('')
</script>

<template>
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Bio"
    placeholder="Conte sobre você..."
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
  <CorpTextarea
    v-model="textareaForm.bio1"
    name="bio1"
    label="Bio"
    placeholder="Conte sobre você..."
  />
  <CorpTextarea
    v-model="textareaForm.description1"
    name="description1"
    label="Descrição do projeto"
    placeholder="Descreva seu projeto..."
    :rows="6"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const bio = ref('')
const description = ref('')
</script>

<template>
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Bio"
    placeholder="Conte sobre você..."
  />

  <CorpTextarea
    v-model="description"
    name="description"
    label="Descrição do projeto"
    placeholder="Descreva seu projeto..."
    :rows="6"
  />
</template>
```
:::

---

## Variant

A prop `variant` define o estilo visual do textarea. Por padrão usa `elevated` (fundo + borda).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.variantElevated"
    name="variantElevated"
    label="Elevated (padrão)"
    variant="elevated"
    placeholder="Fundo + borda"
  />
  <CorpTextarea
    v-model="textareaForm.variantFlat"
    name="variantFlat"
    label="Flat"
    variant="flat"
    placeholder="Só fundo, sem borda"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Elevated: fundo + borda (padrão) -->
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Elevated (padrão)"
    variant="elevated"
  />

  <!-- Flat: só fundo, sem borda -->
  <CorpTextarea
    v-model="description"
    name="description"
    label="Flat"
    variant="flat"
  />
</template>
```
:::

| Variant | Descrição |
|---------|-----------|
| `elevated` | Fundo + borda (padrão) |
| `flat` | Só fundo, sem borda visível |

---

## Density

A prop `density` controla o tamanho (altura mínima) do textarea.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.densityCompact"
    name="densityCompact"
    label="Compact (min-h-20)"
    density="compact"
    placeholder="Compacto"
  />
  <CorpTextarea
    v-model="textareaForm.densityRegular"
    name="densityRegular"
    label="Regular (min-h-24)"
    density="regular"
    placeholder="Regular (padrão)"
  />
  <CorpTextarea
    v-model="textareaForm.densityComfortable"
    name="densityComfortable"
    label="Comfortable (min-h-28)"
    density="comfortable"
    placeholder="Confortável"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpTextarea label="Compact" density="compact" />
  <CorpTextarea label="Regular" density="regular" />
  <CorpTextarea label="Comfortable" density="comfortable" />
</template>
```
:::

| Density | Altura Mínima | Uso |
|---------|---------------|-----|
| `compact` | `min-h-20` (80px) | Interfaces densas, comentários curtos |
| `regular` | `min-h-24` (96px) | Uso geral (padrão) |
| `comfortable` | `min-h-28` (112px) | Textos longos, formulários espaçosos |

---

## Rounded

Use a prop `rounded` para controlar o border-radius. Aceita **8 presets** (otimizados para formulários), classes Tailwind custom, valores CSS, números ou booleanos:

:::corp-code
<div class="space-y-4 max-w-md">
  <!-- Presets -->
  <CorpTextarea v-model="textareaForm.roundedNone" name="roundedNone" label="None (0)" rounded="none" />
  <CorpTextarea v-model="textareaForm.roundedSm" name="roundedSm" label="Small (2px)" rounded="sm" />
  <CorpTextarea v-model="textareaForm.roundedDefault" name="roundedDefault" label="Default (6px)" rounded="default" />
  <CorpTextarea v-model="textareaForm.roundedLg" name="roundedLg" label="Large (8px)" rounded="lg" />
  <CorpTextarea v-model="textareaForm.roundedFull" name="roundedFull" label="Full (9999px)" rounded="full" />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpTextarea name="none" rounded="none" />
  <CorpTextarea name="sm" rounded="sm" />
  <CorpTextarea name="default" rounded="default" />
  <CorpTextarea name="lg" rounded="lg" />
  <CorpTextarea name="full" rounded="full" />
</template>
```
:::

### Rounded Custom

Além dos presets, aceita classes Tailwind, valores CSS, números (px) ou booleanos:

:::corp-code
<div class="space-y-4 max-w-md">
  <!-- Tailwind custom -->
  <CorpTextarea v-model="textareaForm.roundedTailwind" name="roundedTailwind" label="Tailwind custom" rounded="rounded-2xl" />

  <!-- Número (convertido para px) -->
  <CorpTextarea v-model="textareaForm.roundedNumber" name="roundedNumber" label="16px" :rounded="16" />

  <!-- Booleano (true → full, false → none) -->
  <CorpTextarea v-model="textareaForm.roundedBool" name="roundedBool" label="Boolean false" :rounded="false" />

  <!-- CSS value -->
  <CorpTextarea v-model="textareaForm.roundedCss" name="roundedCss" label="CSS 8px 0 0 8px" rounded="8px 0 0 8px" />
</div>

<!-- @disp-code -->
```vue
<template>
  <!-- Tailwind -->
  <CorpTextarea rounded="rounded-2xl" />

  <!-- Number -->
  <CorpTextarea :rounded="16" />

  <!-- Boolean -->
  <CorpTextarea :rounded="false" />

  <!-- CSS -->
  <CorpTextarea rounded="8px 0 0 8px" />
</template>
```
:::

**Presets disponíveis:** `default`, `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`

---

## BorderColor

A prop `borderColor` define a **cor da borda e focus ring** do textarea. Aceita cores semânticas ou customizadas.

### Cores Semânticas

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.bio2"
    name="textareaPrimary"
    label="Primary"
    borderColor="primary"
    placeholder="Cor primary (padrão)"
  />
  <CorpTextarea
    v-model="textareaForm.bio2"
    name="textareaSecondary"
    label="Secondary"
    borderColor="secondary"
    placeholder="Cor secondary"
  />
  <CorpTextarea
    v-model="textareaForm.bio2"
    name="textareaSuccess"
    label="Success"
    borderColor="success"
    placeholder="Cor success"
  />
  <CorpTextarea
    v-model="textareaForm.bio2"
    name="textareaWarning"
    label="Warning"
    borderColor="warning"
    placeholder="Cor warning"
  />
  <CorpTextarea
    v-model="textareaForm.bio2"
    name="textareaInfo"
    label="Info"
    borderColor="info"
    placeholder="Cor info"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const value = ref('')
</script>

<template>
  <CorpTextarea
    v-model="value"
    name="textarea"
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
  <CorpTextarea
    v-model="textareaForm.description2"
    name="textareaPurple"
    label="Marrom (HEX)"
    borderColor="#8B4513"
    placeholder="HEX: #8B4513"
  />
  <CorpTextarea
    v-model="textareaForm.description2"
    name="textareaPink"
    label="Cobre (HEX)"
    borderColor="#B87333"
    placeholder="HEX: #B87333"
  />

  <!-- RGB -->
  <CorpTextarea
    v-model="textareaForm.description2"
    name="textareaRgb"
    label="RGB"
    borderColor="rgb(139, 69, 19)"
    placeholder="RGB: rgb(139, 69, 19)"
  />

  <!-- HSL -->
  <CorpTextarea
    v-model="textareaForm.description2"
    name="textareaHsl"
    label="HSL"
    borderColor="hsl(25, 76%, 31%)"
    placeholder="HSL: hsl(25, 76%, 31%)"
  />

  <!-- Nomes CSS -->
  <CorpTextarea
    v-model="textareaForm.description2"
    name="textareaOlive"
    label="Olive (CSS)"
    borderColor="#6B8E23"
    placeholder="HEX: #6B8E23 (Olive)"
  />
  <CorpTextarea
    v-model="textareaForm.description2"
    name="textareaOrange"
    label="Orange (CSS)"
    borderColor="orange"
    placeholder="Nome CSS: orange"
  />
</div>
:::

> **Suporte universal!** Cores customizadas (HEX, RGB, HSL, var(), nomes CSS) funcionam perfeitamente.

### Disabled + Cores

Textareas disabled mantêm a cor da borda (mais clara) quando têm cor customizada.

:::corp-code
<div class="grid grid-cols-2 gap-4 max-w-2xl">
  <CorpTextarea
    name="disabledPrimary"
    label="Primary"
    borderColor="primary"
    model-value="Disabled primary com múltiplas linhas"
    disabled
  />
  <CorpTextarea
    name="disabledSuccess"
    label="Success"
    borderColor="success"
    model-value="Disabled success com múltiplas linhas"
    disabled
  />
  <CorpTextarea
    name="disabledPurple"
    label="Marrom"
    borderColor="#8B4513"
    model-value="Disabled marrom com múltiplas linhas"
    disabled
  />
  <CorpTextarea
    name="disabledPink"
    label="Cobre"
    borderColor="#B87333"
    model-value="Disabled cobre com múltiplas linhas"
    disabled
  />
</div>
:::

---

## Validação

Use a prop `rules` com validações do `useValidationRules()`. O asterisco (*) aparece automaticamente em campos obrigatórios.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.bio3"
    name="bio3"
    label="Bio"
    :rules="[rules.required, rules.minLength(10)]"
    placeholder="Mínimo 10 caracteres (asterisco automático)"
  />
  <CorpTextarea
    v-model="textareaForm.comments1"
    name="comments1"
    label="Comentários"
    :rules="[rules.required, rules.maxLength(200)]"
    placeholder="Máximo 200 caracteres"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'
import { useForm } from '@/composables/useForm'
import { useValidationRules } from '@/validations/rules'

const { form } = useForm({
  initialValues: {
    bio: '',
    comments: ''
  }
})

const rules = useValidationRules()
</script>

<template>
  <CorpTextarea
    v-model="form.bio"
    name="bio"
    label="Bio"
    :rules="[rules.required, rules.minLength(10)]"
  />

  <CorpTextarea
    v-model="form.comments"
    name="comments"
    label="Comentários"
    :rules="[rules.required, rules.maxLength(200)]"
  />
</template>
```
:::

> ⚠️ **Importante**: Validação requer `useForm()` para injetar o contexto de validação.

| Regra | Descrição |
|-------|-----------|
| `required` | Campo obrigatório |
| `minLength(n)` | Mínimo de caracteres |
| `maxLength(n)` | Máximo de caracteres |
| `email` | Formato de email válido |

---

## Ícones

Textareas suportam apenas **ícones outer** (fora do campo), posicionados nas laterais.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.message1"
    name="message1"
    label="Mensagem"
    prepend-outer-icon="luc-message-square"
    placeholder="Digite sua mensagem..."
  />
  <CorpTextarea
    v-model="textareaForm.notes1"
    name="notes1"
    label="Notas"
    prepend-outer-icon="luc-sticky-note"
    append-outer-icon="luc-save"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const message = ref('')
</script>

<template>
  <CorpTextarea
    v-model="message"
    name="message"
    label="Mensagem"
    prepend-outer-icon="luc-message-square"
  />
</template>
```
:::

> 📌 **Nota**: Diferente de `CorpInput`, textarea só tem ícones **outer** (fora do campo). Ícones inner não são suportados.

| Prop | Descrição |
|------|-----------|
| `prepend-outer-icon` | Ícone à esquerda (fora do campo) |
| `append-outer-icon` | Ícone à direita (fora do campo) |
| `icon-size` | Tamanho dos ícones (padrão: 16) |
| `prepend-outer-icon-color` | Cor do ícone esquerdo |
| `append-outer-icon-color` | Cor do ícone direito |

---

## Clearable

A prop `clearable` adiciona um botão "X" no canto superior direito para limpar o texto.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.feedback1"
    name="feedback1"
    label="Feedback"
    clearable
  />
  <CorpTextarea
    v-model="textareaForm.review1"
    name="review1"
    label="Review"
    prepend-outer-icon="luc-star"
    clearable
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const feedback = ref('')
</script>

<template>
  <CorpTextarea
    v-model="feedback"
    name="feedback"
    label="Feedback"
    clearable
  />
</template>
```
:::

---

## Counter

A prop `counter` exibe um contador de caracteres no canto inferior direito.

:::corp-code
<div class="space-y-4 max-w-md">
  <!-- Counter com limite -->
  <CorpTextarea
    v-model="textareaForm.bio4"
    name="bio4"
    label="Bio (com limite)"
    :counter="200"
    placeholder="Máximo 200 caracteres"
  />

  <!-- Counter simples (sem limite) -->
  <CorpTextarea
    v-model="textareaForm.description3"
    name="description3"
    label="Descrição (contador simples)"
    counter
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const bio = ref('')
</script>

<template>
  <!-- Com limite -->
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Bio"
    :counter="200"
  />

  <!-- Sem limite (só conta) -->
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Bio"
    counter
  />
</template>
```
:::

| Uso | Tipo | Descrição |
|-----|------|-----------|
| `:counter="200"` | `number` | Mostra "X/200" |
| `counter` | `boolean` | Mostra apenas "X" |

---

## Auto-grow

A prop `autoGrow` faz o textarea crescer automaticamente conforme o conteúdo.

:::corp-code
<div class="space-y-4 max-w-md">
  <!-- Auto-grow sem limite -->
  <CorpTextarea
    v-model="textareaForm.bio5"
    name="autoGrow1"
    label="Auto-grow (sem limite)"
    auto-grow
    placeholder="O textarea cresce automaticamente..."
  />

  <!-- Auto-grow com limite de 10 linhas -->
  <CorpTextarea
    v-model="textareaForm.bio6"
    name="autoGrow2"
    label="Auto-grow (máx 10 linhas)"
    auto-grow
    :max-rows="10"
    placeholder="Cresce até 10 linhas..."
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const bio = ref('')
</script>

<template>
  <!-- Sem limite de linhas -->
  <CorpTextarea
    v-model="bio"
    name="bio"
    auto-grow
  />

  <!-- Limite de 10 linhas -->
  <CorpTextarea
    v-model="bio"
    name="bio"
    auto-grow
    :max-rows="10"
  />
</template>
```
:::

| Prop | Tipo | Descrição |
|------|------|-----------|
| `auto-grow` | `boolean` | Cresce com o conteúdo |
| `max-rows` | `number` | Limite de linhas (opcional) |

> 💡 **Dica**: Use `max-rows` para evitar textareas muito grandes em formulários.

---

## Rows

A prop `rows` define o número inicial de linhas visíveis (padrão: 4).

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.description4"
    name="rows2"
    label="2 linhas"
    :rows="2"
    placeholder="Textarea com 2 linhas"
  />
  <CorpTextarea
    v-model="textareaForm.description5"
    name="rows4"
    label="4 linhas (padrão)"
    :rows="4"
    placeholder="Textarea com 4 linhas"
  />
  <CorpTextarea
    v-model="textareaForm.description6"
    name="rows8"
    label="8 linhas"
    :rows="8"
    placeholder="Textarea com 8 linhas"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpTextarea :rows="2" label="2 linhas" />
  <CorpTextarea :rows="4" label="4 linhas (padrão)" />
  <CorpTextarea :rows="8" label="8 linhas" />
</template>
```
:::

---

## No Resize

A prop `noResize` desabilita o redimensionamento manual do textarea.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.description7"
    name="noResize1"
    label="No resize"
    no-resize
    placeholder="Não pode redimensionar manualmente"
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpTextarea
    v-model="description"
    name="description"
    label="No resize"
    no-resize
  />
</template>
```
:::

> 📌 **Nota**: Por padrão, textareas podem ser redimensionados verticalmente. Use `no-resize` para travar o tamanho.

---

## Estados

### Disabled

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    name="disabled1"
    label="Desabilitado"
    model-value="Campo desabilitado com múltiplas
linhas de texto
mostrando o estado readonly."
    disabled
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Desabilitado"
    disabled
  />
</template>
```
:::

### Readonly

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    name="readonly1"
    label="Somente leitura"
    model-value="Campo readonly
com múltiplas linhas."
    readonly
  />
</div>

<!-- @disp-code -->
```vue
<template>
  <CorpTextarea
    v-model="bio"
    name="bio"
    label="Somente leitura"
    readonly
  />
</template>
```
:::

---

## Loading

A prop `loading` exibe um spinner de carregamento no canto superior direito.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.feedback2"
    name="loading1"
    label="Salvando feedback..."
    loading
    placeholder="Estado de carregamento"
  />
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'

const feedback = ref('')
const loading = ref(false)

const save = async () => {
  loading.value = true
  await api.save(feedback.value)
  loading.value = false
}
</script>

<template>
  <CorpTextarea
    v-model="feedback"
    name="feedback"
    label="Feedback"
    :loading="loading"
  />
</template>
```
:::

---

## Exemplo Completo

Formulário completo com validação, counter, clearable e auto-grow.

:::corp-code
<div class="space-y-4 max-w-md">
  <CorpTextarea
    v-model="textareaForm.bioForm"
    name="bioForm"
    label="Bio"
    :rules="[rules.required, rules.minLength(10)]"
    :counter="200"
    clearable
    placeholder="Conte sobre você (mínimo 10 caracteres)..."
  />
  <CorpTextarea
    v-model="textareaForm.feedbackForm"
    name="feedbackForm"
    label="Feedback"
    prepend-outer-icon="luc-message-square"
    :rules="[rules.required, rules.minLength(20)]"
    :counter="500"
    clearable
    placeholder="Seu feedback é importante (mínimo 20 caracteres)..."
  />

  <div class="flex gap-2">
    <CorpButton @click="handleSubmitTextarea">Enviar</CorpButton>
    <CorpButton variant="outline" @click="handleClearTextarea">
      Limpar
    </CorpButton>
  </div>
</div>

<!-- @disp-code -->
```vue
<script setup>
import { ref } from 'vue'
import { CorpTextarea } from 'corp-components'
import { useForm } from '@/composables/useForm'
import { useValidationRules } from '@/validations/rules'

const { form, validateForm } = useForm({
  initialValues: {
    bio: '',
    feedback: ''
  }
})

const rules = useValidationRules()

const handleSubmit = () => {
  const schema = {
    bio: [rules.required, rules.minLength(10)],
    feedback: [rules.required, rules.minLength(20)]
  }

  const isValid = validateForm(schema)
  if (isValid) {
    alert('Formulário válido!')
  }
}
</script>

<template>
  <CorpTextarea
    v-model="form.bio"
    name="bio"
    label="Bio"
    :rules="[rules.required, rules.minLength(10)]"
    :counter="200"
    clearable
  />

  <CorpTextarea
    v-model="form.feedback"
    name="feedback"
    label="Feedback"
    :rules="[rules.required, rules.minLength(20)]"
    :counter="500"
    clearable
  />

  <button @click="handleSubmit">Enviar</button>
</template>
```
:::

---

## API Reference

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `string` | — | Nome do campo (obrigatório) |
| `label` | `string` | `''` | Texto do label |
| `placeholder` | `string` | `''` | Texto placeholder |
| `modelValue` | `string \| number` | `''` | Valor do campo (v-model) |
| `rules` | `ValidationRule[]` | `[]` | Regras de validação |
| `borderColor` | `string` | `undefined` | Cor da borda (semântica ou custom) |
| `disabled` | `boolean` | `false` | Desabilita o campo |
| `readonly` | `boolean` | `false` | Somente leitura |
| `hideDetails` | `boolean` | `false` | Oculta hints e erros |
| `variant` | `'elevated' \| 'flat'` | `'elevated'` | Estilo visual (fundo + borda ou só fundo) |
| `density` | `'compact' \| 'regular' \| 'comfortable'` | `'regular'` | Tamanho do campo |
| `rounded` | `RoundedValue` | `'default'` | **8 presets** (forms): default, none, xs, sm, md, lg, xl, full **OU** Tailwind class **OU** CSS value **OU** number (px) **OU** boolean (true=full, false=none) |
| `rows` | `number` | `4` | Número de linhas visíveis |
| `autoGrow` | `boolean` | `false` | Cresce automaticamente |
| `noResize` | `boolean` | `false` | Desabilita redimensionamento |
| `maxRows` | `number` | `undefined` | Máximo de linhas (com autoGrow) |
| `clearable` | `boolean` | `false` | Botão de limpar |
| `counter` | `boolean \| number` | `false` | Contador de caracteres |
| `loading` | `boolean` | `false` | Estado de carregamento |
| `persistentHint` | `boolean` | `false` | Hint sempre visível |
| `prepend-outer-icon` | `string` | `undefined` | Ícone à esquerda (outer) |
| `append-outer-icon` | `string` | `undefined` | Ícone à direita (outer) |
| `icon-size` | `number` | `16` | Tamanho dos ícones |

### Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Emitido quando valor muda |
| `click:prepend-outer` | — | Clique no ícone esquerdo |
| `click:append-outer` | — | Clique no ícone direito |
| `click:clear` | — | Clique no botão limpar |

---

## Diferenças com Input

| Feature | CorpInput | CorpTextarea |
|---------|-----------|--------------|
| **Variant** (elevated/flat) | ✅ | ✅ |
| **Masks** (CPF, telefone) | ✅ | ❌ |
| **Inner Icons** | ✅ | ❌ |
| **Outer Icons** | ✅ | ✅ |
| **Auto-grow** | ❌ | ✅ |
| **Rows** | ❌ | ✅ |
| **MaxRows** | ❌ | ✅ |
| **No Resize** | ❌ | ✅ |

> 📌 **Resumo**: `CorpTextarea` é otimizado para textos longos com auto-grow, enquanto `CorpInput` é para campos de linha única com máscaras.
