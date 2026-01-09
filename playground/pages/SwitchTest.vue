<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { CorpSwitch } from '@/components/ui/switch';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';

// ============== TYPES ==============
interface SwitchTestForm {
  active: boolean;
  notifications: boolean;
  newsletter: boolean;
  darkMode: boolean;
  emailNotif: boolean;
  pushNotif: boolean;
  smsNotif: boolean;
  twoFactor: boolean;
  terms: boolean;
  privacy: boolean;
  status: string;
  nivel: number;
}

// ============== VALIDATION ==============
const rules = useValidationRules();

// ============== FORM WITH VALIDATION CONTEXT ==============
const { form: formRaw, validateForm } = useForm({
  initialValues: {
    active: false,
    notifications: true,
    newsletter: false,
    darkMode: false,
    emailNotif: true,
    pushNotif: false,
    smsNotif: false,
    twoFactor: false,
    terms: false,
    privacy: false,
    status: 'inactive',
    nivel: 0,
  },
});

// Type-safe form access
const form = formRaw as unknown as Ref<SwitchTestForm>;

// ============== STATE ==============
const simpleSwitch = ref(false);
const loadingSwitch = ref(false);
const disabledOff = ref(false);
const disabledOn = ref(true);
const readonlyOff = ref(false);
const readonlyOn = ref(true);
const indeterminateSwitch = ref(false);
const externalErrorsExample = ref<string[]>(['Erro do servidor ao salvar']);
const showExternalError = ref(true);

// ============== HANDLERS ==============
const simulateLoading = () => {
  loadingSwitch.value = true;
  setTimeout(() => {
    loadingSwitch.value = false;
  }, 2000);
};

const handleSubmit = () => {
  const schema = {
    terms: [rules.required],
    privacy: [rules.required],
  };

  const isValid = validateForm(schema);

  if (isValid) {
    alert('✅ Formulário válido!');
  } else {
    alert('❌ Você deve aceitar os termos e a política de privacidade!');
  }
};
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Switch Test</h1>
      <p class="text-muted-foreground">
        Teste todas as variantes e funcionalidades do CorpSwitch
      </p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="simpleSwitch"
          name="simpleSwitch"
          label="Empresa ativa"
        />
      </div>
    </section>

    <!-- Label e Hint -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Label e Hint</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.notifications"
          name="notifications"
          label="Notificações"
          hint="Receber notificações por email"
        />
        <CorpSwitch
          v-model="form.newsletter"
          name="newsletter"
          label="Newsletter"
          hint="Newsletter semanal com novidades"
        />
      </div>
    </section>

    <!-- Teste de Densidade com Hints Longos -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Densidade com Hints Longos
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="densityCompactHint"
          label="Compact com hint longo"
          hint="Este é um hint bem longo para testar o alinhamento do switch em modo compact. Vamos verificar se o texto quebra corretamente e se o switch permanece alinhado."
          density="compact"
        />
        <CorpSwitch
          v-model="form.active"
          name="densityStandardHint"
          label="Standard com hint longo"
          hint="Este é um hint bem longo para testar o alinhamento do switch em modo standard. Vamos verificar se o texto quebra corretamente e se o switch permanece alinhado."
          density="standard"
        />
        <CorpSwitch
          v-model="form.active"
          name="densityComfortableHint"
          label="Comfortable com hint longo"
          hint="Este é um hint bem longo para testar o alinhamento do switch em modo comfortable. Vamos verificar se o texto quebra corretamente e se o switch permanece alinhado."
          density="comfortable"
        />
      </div>
    </section>

    <!-- Estados: Disabled -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Disabled</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="disabledOff"
          name="disabledOff"
          label="Disabled OFF"
          disabled
        />
        <CorpSwitch
          v-model="disabledOn"
          name="disabledOn"
          label="Disabled ON"
          disabled
        />
      </div>
    </section>

    <!-- Estados: Readonly -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Readonly</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="readonlyOff"
          name="readonlyOff"
          label="Readonly OFF"
          readonly
        />
        <CorpSwitch
          v-model="readonlyOn"
          name="readonlyOn"
          label="Readonly ON"
          readonly
        />
      </div>
    </section>

    <!-- Estados: Loading -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Loading</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="loadingSwitch"
          name="loadingSwitch"
          label="Salvando configuração..."
          loading
        />
        <button
          @click="simulateLoading"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Simular Loading (2s)
        </button>
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="primary"
          label="Primary (padrão)"
          color="primary"
        />
        <CorpSwitch
          v-model="form.active"
          name="secondary"
          label="Secondary"
          color="secondary"
        />
        <CorpSwitch
          v-model="form.active"
          name="destructive"
          label="Destructive"
          color="destructive"
        />
        <CorpSwitch
          v-model="form.active"
          name="success"
          label="Success"
          color="success"
        />
        <CorpSwitch
          v-model="form.active"
          name="warning"
          label="Warning"
          color="warning"
        />
        <CorpSwitch
          v-model="form.active"
          name="info"
          label="Info"
          color="info"
        />
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Customizadas</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="purple"
          label="Roxo (#8b5cf6)"
          color="#8b5cf6"
        />
        <CorpSwitch
          v-model="form.active"
          name="pink"
          label="Rosa (#ec4899)"
          color="#ec4899"
        />
        <CorpSwitch
          v-model="form.active"
          name="cyan"
          label="Cyan (nome CSS)"
          color="cyan"
        />
        <CorpSwitch
          v-model="form.active"
          name="orange"
          label="Orange (nome CSS)"
          color="orange"
        />
      </div>
    </section>

    <!-- Valores Customizados: trueValue / falseValue -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Valores Customizados (trueValue / falseValue)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <!-- String: 'active' / 'inactive' -->
        <CorpSwitch
          v-model="form.status"
          name="status"
          label="Status da empresa"
          :true-value="'active'"
          :false-value="'inactive'"
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ form.status }}</code>
          (string)
        </p>

        <!-- Number: 1 / 0 -->
        <CorpSwitch
          v-model="form.nivel"
          name="nivel"
          label="Nível de acesso"
          :true-value="1"
          :false-value="0"
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ form.nivel }}</code>
          (number)
        </p>
      </div>
    </section>

    <!-- Validação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Validação (rules.required)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.terms"
          name="terms"
          label="Aceito os termos de uso"
          hint="Obrigatório para continuar"
          :rules="[rules.required]"
        />
        <CorpSwitch
          v-model="form.privacy"
          name="privacy"
          label="Aceito a política de privacidade"
          hint="Obrigatório para continuar"
          :rules="[rules.required]"
        />
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Validar Formulário
        </button>
      </div>
    </section>

    <!-- Configurações de Notificação (Exemplo Real) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Exemplo Real: Configurações de Notificação
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.emailNotif"
          name="emailNotif"
          label="Notificações por Email"
          hint="Receber atualizações importantes por email"
          color="primary"
        />
        <CorpSwitch
          v-model="form.pushNotif"
          name="pushNotif"
          label="Notificações Push"
          hint="Notificações no navegador e dispositivo móvel"
          color="info"
        />
        <CorpSwitch
          v-model="form.smsNotif"
          name="smsNotif"
          label="Notificações SMS"
          hint="Apenas para alertas críticos (taxas podem ser aplicadas)"
          color="warning"
        />
        <CorpSwitch
          v-model="form.twoFactor"
          name="twoFactor"
          label="Autenticação de dois fatores"
          hint="Adiciona camada extra de segurança"
          color="success"
        />
      </div>
    </section>

    <!-- Indeterminate (Estado Intermediário) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Indeterminate (Estado Intermediário)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="indeterminateSwitch"
          name="indeterminateSwitch"
          label="Estado intermediário"
          hint="Usado quando o estado é desconhecido ou parcial"
          indeterminate
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ indeterminateSwitch }}</code>
          (indeterminate: true)
        </p>
      </div>
    </section>

    <!-- External Errors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        External Errors (Erros Externos)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="externalError"
          label="Campo com erro do backend"
          hint="Erro vindo da API"
          :external-errors="showExternalError ? externalErrorsExample : []"
        />
        <button
          @click="showExternalError = !showExternalError"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          {{ showExternalError ? 'Remover Erro' : 'Mostrar Erro' }}
        </button>
      </div>
    </section>

    <!-- Force Error -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Force Error (Forçar Visual)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="forceError"
          label="Erro forçado"
          hint="Visual de erro sem mensagem"
          force-error
        />
      </div>
    </section>

    <!-- Density -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Density (Tamanhos)</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="densityCompact"
          label="Compact (padrão)"
          density="compact"
        />
        <CorpSwitch
          v-model="form.active"
          name="densityStandard"
          label="Standard (padrão visual)"
          density="standard"
        />
        <CorpSwitch
          v-model="form.active"
          name="densityComfortable"
          label="Comfortable (espaçoso)"
          density="comfortable"
        />
      </div>
    </section>

    <!-- Label Position -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Label Position (Posição do Label)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="labelRight"
          label="Label à direita (padrão)"
          hint="O hint também fica alinhado à esquerda com o label"
          label-position="right"
        />
        <CorpSwitch
          v-model="form.active"
          name="labelLeft"
          label="Label à esquerda"
          hint="O hint fica alinhado à direita quando label está à esquerda"
          label-position="left"
        />
      </div>
    </section>

    <!-- Messages e MaxErrors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Messages e MaxErrors
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSwitch
          v-model="form.active"
          name="messages"
          label="Com mensagens genéricas"
          :messages="[
            'Info: Configuração recomendada',
            'Warning: Pode afetar performance',
          ]"
        />
        <CorpSwitch
          v-model="form.active"
          name="maxErrors"
          label="Limitando erros (maxErrors=1)"
          :external-errors="['Erro 1', 'Erro 2', 'Erro 3']"
          :max-errors="1"
        />
      </div>
    </section>
  </div>
</template>
