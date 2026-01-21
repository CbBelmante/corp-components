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
    status: 'inactive',
    nivel: 0,
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

// ============== CHECKBOX.MD - Estados ==============
const { form: checkboxForm } = useForm({
  initialValues: {
    // Uso básico
    newsletter: false,
    notifications: false,
    marketing: false,
    // Cores semânticas
    primary: true,
    secondary: true,
    destructive: true,
    success: true,
    warning: true,
    info: true,
    // Cores customizadas
    purple: true,
    pink: true,
    cyan: true,
    orange: true,
    // Valores customizados
    statusYesNo: 'no',
    nivel: 0,
    // Validação
    terms: false,
    // Exemplos avançados
    updates: true,
    offers: false,
  },
  formName: 'CheckboxForm',
});

// ============== RADIO-GROUP.MD - Estados ==============
const { form: radioForm, validateForm: validateRadioForm } = useForm({
  initialValues: {
    // Uso básico
    plan: '',
    notification: 'email',
    // Cores
    colorSemantic: 'primary',
    colorCustom: 'purple',
    // Orientação
    orientationVertical: 'vert1',
    orientationHorizontal: 'horiz1',
    // Estados
    disabledGroup: 'disGroup1',
    disabledItem: 'disItem1',
    readonlySelection: 'readonly2',
    // Valores numéricos
    numericSelection: 1,
    // Density
    densityCompact: 'compact1',
    densityRegular: 'regular1',
    densityComfortable: 'comfort1',
    // Label Position
    labelRight: 'posRight1',
    labelLeft: 'posLeft1',
    // Variant
    variantSolid: 'solid1',
    variantGhost: 'ghost1',
    variantOutline: 'outline1',
    // Exemplo real
    companySize: 'medium',
    paymentMethod: '',
  },
  formName: 'RadioForm',
});

// ============== PROGRESS.MD - Estados ==============
const progress1 = ref(50);
const progress2 = ref(60);
const progress3 = ref(75);
const clickableProgress = ref(50);
const downloadProgress = ref(55);
const bufferProgress = ref(80);

// ============== TEXTAREA.MD - Estados ==============
const { form: textareaForm, validateForm: validateTextareaForm } = useForm({
  initialValues: {
    // Uso básico
    bioUsage: '',
    bio1: '',
    description1: '',
    // Variant
    variantSolo: '',
    variantFilled: '',
    // Density
    densityCompact: '',
    densityRegular: '',
    densityComfortable: '',
    // BorderColor
    bio2: '',
    description2: '',
    // Validação
    bio3: '',
    comments1: '',
    // Ícones
    message1: '',
    notes1: '',
    // Clearable
    feedback1: '',
    review1: '',
    // Counter
    bio4: '',
    description3: '',
    // Auto-grow
    bio5: '',
    bio6: '',
    // Rows
    description4: '',
    description5: '',
    description6: '',
    // No resize
    description7: '',
    // Loading
    feedback2: '',
    // Formulário completo
    bioForm: '',
    feedbackForm: '',
  },
  formName: 'TextareaForm',
});

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

// ============== TEXTAREA.MD - Handlers ==============
const handleSubmitTextarea = () => {
  const schema = {
    bioForm: [rules.required, rules.minLength(10)],
    feedbackForm: [rules.required, rules.minLength(20)],
  };

  const isValid = validateTextareaForm(schema);

  if (isValid) {
    alert('✅ Formulário válido e enviado!');
  } else {
    alert('❌ Formulário inválido! Verifique os campos.');
  }
};

const handleClearTextarea = () => {
  textareaForm.bioForm = '';
  textareaForm.feedbackForm = '';
};

// ============== COMMAND.MD - Estados ==============
const queryCommandInline = ref('');
const queryCommandExternal = ref('');
const queryCommandFloating = ref('');
const queryCommandModal = ref('');
const selectedCommand = ref(null);

// Floating states
const inputCommandFloating = ref('');
const floatingCommandOpen = ref(false);
const modalCommandOpen = ref(false);

// Comandos de exemplo
const commandItems = [
  {
    id: 'pages',
    title: 'Páginas',
    icon: 'luc-layout-dashboard',
    items: [
      {
        id: 'home',
        value: 'home',
        label: 'Home',
        description: 'Página inicial',
        icon: 'luc-home',
      },
      {
        id: 'dashboard',
        value: 'dashboard',
        label: 'Dashboard',
        description: 'Painel de controle',
        icon: 'luc-chart-bar',
      },
      {
        id: 'settings',
        value: 'settings',
        label: 'Configurações',
        description: 'Ajustes do sistema',
        icon: 'luc-settings',
      },
    ],
  },
  {
    id: 'actions',
    title: 'Ações',
    icon: 'luc-zap',
    items: [
      {
        id: 'new-file',
        value: 'new-file',
        label: 'Novo Arquivo',
        description: 'Criar novo arquivo',
        icon: 'luc-file-plus',
      },
      {
        id: 'save',
        value: 'save',
        label: 'Salvar',
        description: 'Salvar alterações',
        icon: 'luc-save',
      },
      {
        id: 'export',
        value: 'export',
        label: 'Exportar',
        description: 'Exportar dados',
        icon: 'luc-download',
      },
    ],
  },
];

// Comandos simples (sem grupos)
const simpleCommandItems = [
  {
    id: 'copy',
    value: 'copy',
    label: 'Copiar',
    description: 'Copiar para área de transferência',
    icon: 'luc-copy',
  },
  {
    id: 'paste',
    value: 'paste',
    label: 'Colar',
    description: 'Colar da área de transferência',
    icon: 'luc-clipboard',
  },
  {
    id: 'cut',
    value: 'cut',
    label: 'Recortar',
    description: 'Recortar seleção',
    icon: 'luc-scissors',
  },
];

// ============== COMMAND.MD - Handlers ==============
const handleCommandSelect = item => {
  selectedCommand.value = item;
  console.log('Comando selecionado:', item);
};

const handleCommandFloatingInput = event => {
  const target = event.target;
  const value = target.value;

  if (value.startsWith('/')) {
    const query = value.substring(1);
    queryCommandFloating.value = query;

    if (!floatingCommandOpen.value) {
      floatingCommandOpen.value = true;
    }
  } else {
    if (floatingCommandOpen.value) {
      floatingCommandOpen.value = false;
      queryCommandFloating.value = '';
    }
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

  // Checkbox.md
  checkboxForm,

  // Radio-group.md
  radioForm,
  validateRadioForm,

  // Textarea.md
  textareaForm,
  validateTextareaForm,
  handleSubmitTextarea,
  handleClearTextarea,

  // Progress.md
  progress1,
  progress2,
  progress3,
  clickableProgress,
  downloadProgress,
  bufferProgress,

  // Command.md
  queryCommandInline,
  queryCommandExternal,
  queryCommandFloating,
  queryCommandModal,
  selectedCommand,
  inputCommandFloating,
  floatingCommandOpen,
  modalCommandOpen,
  commandItems,
  simpleCommandItems,
  handleCommandSelect,
  handleCommandFloatingInput,
});
</script>

<template>
  <!-- Renderiza layout padrão do VitePress com contexto injetado -->
  <DefaultTheme.Layout />
</template>
