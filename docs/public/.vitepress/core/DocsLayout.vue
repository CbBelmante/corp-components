<script setup lang="ts">
/**
 * 📚 DocsLayout - Layout Customizado para Documentação
 *
 * Envolve todas as páginas .md e fornece contexto global.
 * Permite uso de composables Vue (useForm, useValidationRules) corretamente
 * dentro de setup(), resolvendo erro "Must be called at the top of a setup function".
 *
 * Estratégia:
 * 1. Cria estados reativos com composables (useForm funciona aqui!)
 * 2. Injeta em app.config.globalProperties via docsPlugin
 * 3. Arquivos .md acessam direto (loading, form, rules) SEM script setup!
 *
 * Localização: /core (lógica de negócio) NÃO /theme (apenas visual)!
 */

import { ref } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';
import { injectDocsContext } from './docsPlugin';

// ============== BUTTON.MD - Estados ==============
const loadingButton = ref(false);
const clickCount = ref(0);

const simulateLoadingButton = () => {
  loadingButton.value = true;
  setTimeout(() => {
    loadingButton.value = false;
  }, 2000);
};

const incrementCount = () => {
  clickCount.value++;
};

// ============== INPUT.MD - Loading State ==============
const loadingInput = ref(false);

const simulateLoadingInput = () => {
  loadingInput.value = true;
  setTimeout(() => {
    loadingInput.value = false;
  }, 2000);
};

// ============== INPUT.MD - Estados ==============
// ✅ AQUI FUNCIONA! Estamos dentro de <script setup> real
// useForm() faz provide('corpValidation') automaticamente para CorpInput funcionar!
const { form, validateForm } = useForm({
  initialValues: {
    // Uso básico
    nameUsage: '',
    name1: '',
    email1: '',

    // Validação
    name2: '',
    email2: '',

    // Máscaras
    cpf1: '',
    cpf2: '',
    cpf3: '',
    phone1: '',
    phone2: '',

    // Ícones
    email3: '',
    search1: '',
    password1: '',

    // Clearable
    name3: '',
    email4: '',

    // Counter
    bio: '',
    name4: '',

    // Prefix/Suffix
    price: '',
    weight: '',
    domain: '',

    // Persistent Hint
    username: '',
    username2: '',

    // Loading
    cep: '',
    email8: '',

    // Estados
    name5: '',
    email5: '',

    // Slots
    website: '',
    domainSlot: '',

    // Outros
    email6: '',
    search2: '',
    password2: '',
    name6: '',
    name7: '',
    email7: '',
    password3: '',

    // Formulário completo
    nameForm: '',
    emailForm: '',
    passwordForm: '',
  },
  formName: 'VitePressDocsForm',
});

const rules = useValidationRules();

// ============== INPUT.MD - Handlers ==============
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

const handleClear = () => {
  form.nameForm = '';
  form.emailForm = '';
  form.passwordForm = '';
};

// ============== SELECT.MD - Estados e Handlers ==============
const { form: selectForm, validateForm: validateSelectFormFn } = useForm({
  initialValues: {
    framework: '',
    frameworkUsage: '',
    state: '',
    status: '',
    tags: [],
    multipleFrameworks: [],
    skills: [],
    frameworkClear: '',
    country: '',
  },
  formName: 'SelectForm',
});

// ============== SWITCH.MD - Estados ==============
const { form: switchForm } = useForm({
  initialValues: {
    active: false,
    notifications: true,
    newsletter: false,
    disabled1: false,
    disabled2: true,
    readonly1: false,
    readonly2: true,
    saveConfigEnabled: false,
    loading2: true,
    primary: true,
    secondary: true,
    destructive: true,
    success: true,
    warning: true,
    info: true,
    purple: true,
    pink: true,
    cyan: true,
    orange: true,
    status: 'active',
    nivel: 1,
    terms: false,
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    twoFactor: false,
  },
  formName: 'SwitchForm',
});

// ============== SWITCH.MD - Loading State ==============
const loadingSwitch = ref(false);

const simulateLoadingSwitch = () => {
  loadingSwitch.value = true;
  setTimeout(() => {
    loadingSwitch.value = false;
  }, 2000);
};

const validationRules = [
  rules.required,
  (value: string[] | undefined) =>
    (Array.isArray(value) && value.length >= 2) ||
    'Selecione pelo menos 2 frameworks',
];

const validateSelectForm = () => {
  const schema = {
    tags: validationRules,
  };

  const isValid = validateSelectFormFn(schema);

  if (isValid) {
    alert('✅ Formulário válido! Frameworks: ' + selectForm.tags.join(', '));
  } else {
    alert('❌ Selecione pelo menos 2 frameworks!');
  }
};

// ============== INJETAR EM GLOBALPROPERTIES ==============
// Torna estados acessíveis nos .md SEM script setup!
// Arquivos .md podem usar: {{ loadingButton }}, v-model="form.name", :rules="[rules.required]"
injectDocsContext({
  // Button.md
  loadingButton,
  clickCount,
  simulateLoadingButton,
  incrementCount,

  // Input.md
  loadingInput,
  simulateLoadingInput,
  form,
  rules,
  validateForm,
  handleSubmit,
  handleClear,

  // Select.md
  selectForm,
  validationRules,
  validateSelectForm,

  // Switch.md
  switchForm,
  loadingSwitch,
  simulateLoadingSwitch,
});
</script>

<template>
  <!-- Renderiza layout padrão do VitePress com contexto injetado -->
  <DefaultTheme.Layout />
</template>
