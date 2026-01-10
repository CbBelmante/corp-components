<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { CorpCheckbox } from '@/components/ui/checkbox';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';

// ============== TYPES ==============
interface CheckboxTestForm {
  newsletter: boolean;
  notifications: boolean;
  marketing: boolean;
  terms: boolean;
  privacy: boolean;
  updates: boolean;
  offers: boolean;
}

// ============== VALIDATION ==============
const rules = useValidationRules();

// ============== FORM WITH VALIDATION CONTEXT ==============
const { form: formRaw, validateForm } = useForm({
  initialValues: {
    newsletter: false,
    notifications: true,
    marketing: false,
    terms: false,
    privacy: false,
    updates: true,
    offers: false,
  },
});

// Type-safe form access
const form = formRaw as unknown as Ref<CheckboxTestForm>;

// ============== STATE ==============
const simpleCheckbox = ref(false);
const disabledOff = ref(false);
const disabledOn = ref(true);
const readonlyOff = ref(false);
const readonlyOn = ref(true);
const checkedColor = ref(true);
const indeterminateCheckbox = ref(false);
const statusCheckbox = ref<'yes' | 'no'>('no');
const levelCheckbox = ref<1 | 0>(0);
const externalErrorsExample = ref<string[]>(['Este campo tem erro do backend']);
const showExternalError = ref(true);

// Disabled test states
const disabledPrimaryOn = ref(true);
const disabledSuccessOn = ref(true);
const disabledWarningOn = ref(true);
const disabledInfoOn = ref(true);
const disabledPurpleOn = ref(true);
const disabledPinkOn = ref(true);
const disabledCyanOn = ref(true);
const disabledOrangeOn = ref(true);

// ============== HANDLERS ==============
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
      <h1 class="text-2xl font-bold text-foreground mb-2">Checkbox Test</h1>
      <p class="text-muted-foreground">
        Teste todas as variantes e funcionalidades do CorpCheckbox
      </p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="simpleCheckbox"
          name="simpleCheckbox"
          label="Aceito os termos"
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ simpleCheckbox }}</code>
        </p>
      </div>
    </section>

    <!-- Label e Hint -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Label e Hint</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="form.newsletter"
          name="newsletter"
          label="Receber newsletter"
          hint="Newsletter semanal com novidades e atualizações"
        />
        <CorpCheckbox
          v-model="form.notifications"
          name="notifications"
          label="Notificações por email"
          hint="Receber notificações importantes no seu email"
        />
        <CorpCheckbox
          v-model="form.marketing"
          name="marketing"
          label="Aceito receber conteúdo de marketing"
          hint="Cancelável a qualquer momento"
        />
      </div>
    </section>

    <!-- Teste de Densidade com Hints Longos -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Densidade com Hints Longos
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="checkedColor"
          name="densityCompactHint"
          label="Compact com hint longo"
          hint="Este é um hint bem longo para testar o alinhamento do checkbox em modo compact. Vamos verificar se o texto quebra corretamente e se o checkbox permanece alinhado."
          density="compact"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="densityStandardHint"
          label="Standard com hint longo"
          hint="Este é um hint bem longo para testar o alinhamento do checkbox em modo regular. Vamos verificar se o texto quebra corretamente e se o checkbox permanece alinhado."
          density="regular"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="densityComfortableHint"
          label="Comfortable com hint longo"
          hint="Este é um hint bem longo para testar o alinhamento do checkbox em modo comfortable. Vamos verificar se o texto quebra corretamente e se o checkbox permanece alinhado."
          density="comfortable"
        />
      </div>
    </section>

    <!-- Estados: Disabled -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Disabled</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="disabledOff"
          name="disabledOff"
          label="Disabled desmarcado"
          hint="Este checkbox está desabilitado"
          disabled
        />
        <CorpCheckbox
          v-model="disabledOn"
          name="disabledOn"
          label="Disabled marcado"
          hint="Este checkbox está desabilitado"
          disabled
        />
      </div>
    </section>

    <!-- Disabled + Cores (Runtime) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Disabled + Cores (Runtime Lighten)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <div class="grid grid-cols-2 gap-4">
          <!-- Semantic Colors -->
          <CorpCheckbox
            :model-value="false"
            name="disabled-primary-off"
            label="Primary desmarcado"
            color="primary"
            disabled
          />
          <CorpCheckbox
            v-model="disabledPrimaryOn"
            name="disabled-primary-on"
            label="Primary marcado"
            color="primary"
            disabled
          />

          <CorpCheckbox
            :model-value="false"
            name="disabled-success-off"
            label="Success desmarcado"
            color="success"
            disabled
          />
          <CorpCheckbox
            v-model="disabledSuccessOn"
            name="disabled-success-on"
            label="Success marcado"
            color="success"
            disabled
          />

          <CorpCheckbox
            :model-value="false"
            name="disabled-warning-off"
            label="Warning desmarcado"
            color="warning"
            disabled
          />
          <CorpCheckbox
            v-model="disabledWarningOn"
            name="disabled-warning-on"
            label="Warning marcado"
            color="warning"
            disabled
          />

          <CorpCheckbox
            :model-value="false"
            name="disabled-info-off"
            label="Info desmarcado"
            color="info"
            disabled
          />
          <CorpCheckbox
            v-model="disabledInfoOn"
            name="disabled-info-on"
            label="Info marcado"
            color="info"
            disabled
          />

          <!-- Custom Colors -->
          <CorpCheckbox
            :model-value="false"
            name="disabled-purple-off"
            label="Roxo desmarcado"
            color="#8b5cf6"
            disabled
          />
          <CorpCheckbox
            v-model="disabledPurpleOn"
            name="disabled-purple-on"
            label="Roxo marcado"
            color="#8b5cf6"
            disabled
          />

          <CorpCheckbox
            :model-value="false"
            name="disabled-pink-off"
            label="Rosa desmarcado"
            color="#ec4899"
            disabled
          />
          <CorpCheckbox
            v-model="disabledPinkOn"
            name="disabled-pink-on"
            label="Rosa marcado"
            color="#ec4899"
            disabled
          />

          <CorpCheckbox
            :model-value="false"
            name="disabled-cyan-off"
            label="Cyan desmarcado"
            color="cyan"
            disabled
          />
          <CorpCheckbox
            v-model="disabledCyanOn"
            name="disabled-cyan-on"
            label="Cyan marcado"
            color="cyan"
            disabled
          />

          <CorpCheckbox
            :model-value="false"
            name="disabled-orange-off"
            label="Orange desmarcado"
            color="orange"
            disabled
          />
          <CorpCheckbox
            v-model="disabledOrangeOn"
            name="disabled-orange-on"
            label="Orange marcado"
            color="orange"
            disabled
          />
        </div>
      </div>
    </section>

    <!-- Estados: Readonly -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Readonly</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="readonlyOff"
          name="readonlyOff"
          label="Readonly desmarcado"
          hint="Este checkbox é apenas leitura"
          readonly
        />
        <CorpCheckbox
          v-model="readonlyOn"
          name="readonlyOn"
          label="Readonly marcado"
          hint="Este checkbox é apenas leitura"
          readonly
        />
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="checkedColor"
          name="primary"
          label="Primary (padrão)"
          color="primary"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="secondary"
          label="Secondary"
          color="secondary"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="destructive"
          label="Destructive"
          color="destructive"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="success"
          label="Success"
          color="success"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="warning"
          label="Warning"
          color="warning"
        />
        <CorpCheckbox
          v-model="checkedColor"
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
        <CorpCheckbox
          v-model="checkedColor"
          name="purple"
          label="Roxo (#8b5cf6)"
          color="#8b5cf6"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="pink"
          label="Rosa (#ec4899)"
          color="#ec4899"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="cyan"
          label="Cyan (nome CSS)"
          color="cyan"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="orange"
          label="Orange (nome CSS)"
          color="orange"
        />
      </div>
    </section>

    <!-- Validação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Validação (rules.required)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="form.terms"
          name="terms"
          label="Aceito os termos de uso"
          hint="Obrigatório para continuar"
          :rules="[rules.required]"
        />
        <CorpCheckbox
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

    <!-- Indeterminate (Estado Intermediário) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Indeterminate (Estado Intermediário)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="indeterminateCheckbox"
          name="indeterminate"
          label="Selecionar todos (parcial)"
          hint="Usado quando alguns itens estão selecionados"
          indeterminate
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ indeterminateCheckbox }}</code>
          (indeterminate: true)
        </p>
      </div>
    </section>

    <!-- True/False Values (Valores Customizados) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        True/False Values (Valores Customizados)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="statusCheckbox"
          name="statusYesNo"
          label="Status (yes/no)"
          true-value="yes"
          false-value="no"
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ statusCheckbox }}</code>
          (string)
        </p>

        <CorpCheckbox
          v-model="levelCheckbox"
          name="level"
          label="Nível (1/0)"
          :true-value="1"
          :false-value="0"
        />
        <p class="text-sm text-muted-foreground">
          Valor:
          <code>{{ levelCheckbox }}</code>
          (number)
        </p>
      </div>
    </section>

    <!-- External Errors (Erros Externos/Backend) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        External Errors (Erros do Backend)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="simpleCheckbox"
          name="externalError"
          label="Campo com erro do backend"
          hint="Este erro vem da API"
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

    <!-- Force Error (Forçar Visual de Erro) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Force Error (Forçar Visual)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="simpleCheckbox"
          name="forceError"
          label="Campo com erro forçado"
          hint="Visual de erro sem mensagem"
          force-error
        />
      </div>
    </section>

    <!-- Density (Tamanhos) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Density (Tamanhos)</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="checkedColor"
          name="densityCompact"
          label="Compact (padrão)"
          density="compact"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="densityStandard"
          label="Standard (padrão visual)"
          density="regular"
        />
        <CorpCheckbox
          v-model="checkedColor"
          name="densityComfortable"
          label="Comfortable (espaçoso)"
          density="comfortable"
        />
      </div>
    </section>

    <!-- Label Position (Posição do Label) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Label Position (Posição do Label)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="checkedColor"
          name="labelRight"
          label="Label à direita (padrão)"
          hint="O hint também fica alinhado à esquerda com o label"
          label-position="right"
        />
        <CorpCheckbox
          v-model="checkedColor"
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
        <CorpCheckbox
          v-model="simpleCheckbox"
          name="messages"
          label="Com mensagens genéricas"
          :messages="[
            'Info: Esta é uma mensagem de informação',
            'Warning: Aviso importante',
          ]"
        />
        <CorpCheckbox
          v-model="simpleCheckbox"
          name="maxErrors"
          label="Limitando erros (maxErrors=1)"
          :external-errors="['Erro 1', 'Erro 2', 'Erro 3']"
          :max-errors="1"
        />
      </div>
    </section>

    <!-- Exemplo Real: Preferências de Comunicação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Exemplo Real: Preferências de Comunicação
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpCheckbox
          v-model="form.updates"
          name="updates"
          label="Atualizações do produto"
          hint="Novidades, melhorias e novos recursos"
          color="primary"
        />
        <CorpCheckbox
          v-model="form.offers"
          name="offers"
          label="Ofertas e promoções"
          hint="Descontos exclusivos e ofertas especiais"
          color="success"
        />
        <CorpCheckbox
          v-model="form.newsletter"
          name="newsletterReal"
          label="Newsletter mensal"
          hint="Conteúdo exclusivo e dicas úteis"
          color="info"
        />
        <CorpCheckbox
          v-model="form.marketing"
          name="marketingReal"
          label="Marketing de parceiros"
          hint="Ofertas de empresas parceiras selecionadas"
          color="warning"
        />
      </div>
    </section>
  </div>
</template>
