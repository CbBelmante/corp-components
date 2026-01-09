<script setup lang="ts">
import { CorpInput } from '@/components/ui/input';
import { CorpButton } from '@/components/ui/button';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';
import { type Ref } from 'vue';

// ============== TYPES ==============
interface InputTestForm {
  name1: string;
  email1: string;
  name2: string;
  email2: string;
  cpf: string;
  phone: string;
  email3: string;
  search: string;
  password1: string;
  name3: string;
  email4: string;
  bio: string;
  name4: string;
  name5: string;
  email5: string;
  website: string;
  domain: string;
  nameForm: string;
  emailForm: string;
  passwordForm: string;
}

// ============== VALIDATION ==============
const rules = useValidationRules();

// ============== FORM WITH VALIDATION CONTEXT ==============
const { form: formRaw, validateForm } = useForm({
  initialValues: {
    name1: '',
    email1: '',
    name2: '',
    email2: '',
    cpf: '',
    phone: '',
    email3: '',
    search: '',
    password1: '',
    name3: '',
    email4: '',
    bio: '',
    name4: '',
    name5: 'Campo desabilitado',
    email5: 'campo@readonly.com',
    website: '',
    domain: '',
    nameForm: '',
    emailForm: '',
    passwordForm: '',
  },
  formName: 'InputTestForm',
});

// Type-safe form access
const form = formRaw as unknown as Ref<InputTestForm>;

const handleSubmit = () => {
  const schema = {
    nameForm: [rules.required, rules.minLength(3)],
    emailForm: [rules.required, rules.email],
    passwordForm: [rules.required, rules.minLength(6)],
  };

  const isValid = validateForm(schema);
  if (isValid) {
    alert('Formulário válido e enviado!');
  } else {
    alert('Formulário inválido! Verifique os campos.');
  }
};
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Input Test</h1>
      <p class="text-muted-foreground">Teste todos os estados e máscaras</p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.name1"
          name="name1"
          label="Nome"
          placeholder="Digite seu nome"
        />
        <CorpInput
          v-model="form.email1"
          name="email1"
          label="Email"
          type="email"
          placeholder="seu@email.com"
        />
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.name1"
          name="colorPrimary"
          label="Primary"
          border-color="primary"
          placeholder="Cor primary (padrão)"
        />
        <CorpInput
          v-model="form.name1"
          name="colorSecondary"
          label="Secondary"
          border-color="secondary"
          placeholder="Cor secondary"
        />
        <CorpInput
          v-model="form.name1"
          name="colorSuccess"
          label="Success"
          border-color="success"
          placeholder="Cor success"
        />
        <CorpInput
          v-model="form.name1"
          name="colorWarning"
          label="Warning"
          border-color="warning"
          placeholder="Cor warning"
        />
        <CorpInput
          v-model="form.name1"
          name="colorInfo"
          label="Info"
          border-color="info"
          placeholder="Cor info"
        />
        <CorpInput
          v-model="form.name1"
          name="colorDestructive"
          label="Destructive"
          border-color="destructive"
          placeholder="Cor destructive"
        />
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Customizadas</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.name1"
          name="colorPurple"
          label="Roxo (#8b5cf6)"
          border-color="#8b5cf6"
          placeholder="Cor HEX"
        />
        <CorpInput
          v-model="form.name1"
          name="colorPink"
          label="Rosa (#ec4899)"
          border-color="#ec4899"
          placeholder="Cor HEX"
        />
        <CorpInput
          v-model="form.name1"
          name="colorCyan"
          label="Cyan (nome CSS)"
          border-color="cyan"
          placeholder="Nome CSS"
        />
        <CorpInput
          v-model="form.name1"
          name="colorOrange"
          label="Orange (nome CSS)"
          border-color="orange"
          placeholder="Nome CSS"
        />
      </div>
    </section>

    <!-- Disabled + Cores -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Disabled + Cores</h2>
      <div class="p-4 bg-card border border-border rounded-lg">
        <div class="grid grid-cols-2 gap-4">
          <CorpInput
            name="disabledPrimary"
            label="Primary"
            border-color="primary"
            model-value="Disabled primary"
            disabled
          />
          <CorpInput
            name="disabledSuccess"
            label="Success"
            border-color="success"
            model-value="Disabled success"
            disabled
          />
          <CorpInput
            name="disabledPurple"
            label="Roxo"
            border-color="#8b5cf6"
            model-value="Disabled purple"
            disabled
          />
          <CorpInput
            name="disabledPink"
            label="Rosa"
            border-color="#ec4899"
            model-value="Disabled pink"
            disabled
          />
        </div>
      </div>
    </section>

    <!-- Validação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Validação</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.name2"
          name="name2"
          label="Nome"
          :rules="[rules.required, rules.minLength(3)]"
          placeholder="Campo obrigatório (asterisco automático)"
        />
        <CorpInput
          v-model="form.email2"
          name="email2"
          label="Email"
          type="email"
          :rules="[rules.required, rules.email]"
          placeholder="email@example.com"
        />
      </div>
    </section>

    <!-- Máscaras -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Máscaras</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.cpf"
          name="cpf"
          label="CPF"
          mask="cpf"
          placeholder="000.000.000-00"
        />
        <CorpInput
          v-model="form.phone"
          name="phone"
          label="Telefone"
          mask="phone"
          placeholder="(00) 00000-0000"
        />
      </div>
    </section>

    <!-- Ícones -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Ícones</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.email3"
          name="email3"
          label="Email"
          prepend-icon="luc-mail"
          placeholder="seu@email.com"
        />
        <CorpInput
          v-model="form.search"
          name="search"
          label="Buscar"
          prepend-icon="luc-search"
          append-icon="luc-sliders-horizontal"
        />
        <CorpInput
          v-model="form.password1"
          name="password1"
          label="Senha"
          type="password"
          prepend-icon="luc-lock"
        />
      </div>
    </section>

    <!-- Clearable -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Clearable</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput v-model="form.name3" name="name3" label="Nome" clearable />
        <CorpInput
          v-model="form.email4"
          name="email4"
          label="Email"
          prepend-icon="luc-mail"
          clearable
        />
      </div>
    </section>

    <!-- Counter -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Counter</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.bio"
          name="bio"
          label="Bio"
          :counter="200"
          placeholder="Conte sobre você..."
        />
        <CorpInput v-model="form.name4" name="name4" label="Nome" counter />
      </div>
    </section>

    <!-- Estados -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput
          v-model="form.name5"
          name="name5"
          label="Desabilitado"
          disabled
        />
        <CorpInput
          v-model="form.email5"
          name="email5"
          label="Somente leitura"
          readonly
        />
      </div>
    </section>

    <!-- Slots -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Slots</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpInput v-model="form.website" name="website" label="Website">
          <template #prepend-inner>
            <span class="text-xs text-muted-foreground">https://</span>
          </template>
        </CorpInput>
        <CorpInput v-model="form.domain" name="domain" label="Domínio">
          <template #append-inner>
            <span class="text-xs text-muted-foreground">.com.br</span>
          </template>
        </CorpInput>
      </div>
    </section>

    <!-- Formulário Completo -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Formulário Completo com Submit
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
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

        <div class="flex gap-2 pt-2">
          <CorpButton @click="handleSubmit">Enviar</CorpButton>
          <CorpButton
            variant="outline"
            @click="
              form.nameForm = '';
              form.emailForm = '';
              form.passwordForm = '';
            "
          >
            Limpar
          </CorpButton>
        </div>
      </div>
    </section>

    <!-- Sandbox -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Sandbox</h2>
      <div class="p-4 border border-dashed border-border rounded-lg min-h-32">
        <p class="text-muted-foreground text-sm mb-4">
          Adicione seus testes aqui...
        </p>
        <!-- Adicione componentes para testar -->
      </div>
    </section>
  </div>
</template>
