<script setup lang="ts">
import { ref, type Ref } from 'vue';
import {
  CorpRadioGroup,
  CorpRadioGroupItem,
} from '@/components/ui/radio-group';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';

// ============== TYPES ==============
interface RadioGroupTestForm {
  plan: string;
  notification: string;
  size: string;
  paymentMethod: string;
}

// ============== VALIDATION ==============
const rules = useValidationRules();

// ============== FORM WITH VALIDATION CONTEXT ==============
const { form: formRaw, validateForm } = useForm({
  initialValues: {
    plan: '',
    notification: 'email',
    size: 'medium',
    paymentMethod: '',
  },
});

// Type-safe form access
const form = formRaw as unknown as Ref<RadioGroupTestForm>;

// ============== STATE ==============
const simplePlan = ref<string>('');
const variantSelection = ref<string>('option1');
const orientation = ref<string>('option1');
const colorChoice = ref<string>('primary');
const disabledSelection = ref<string>('option1');
const readonlySelection = ref<string>('option2');
const numericSelection = ref<number>(1);
const externalErrorsExample = ref<string[]>(['Plano inválido para sua conta']);
const showExternalError = ref(true);
const densitySelection = ref<string>('compact');
const labelPositionSelection = ref<string>('right');

// ============== HANDLERS ==============
const handleSubmit = () => {
  const schema = {
    plan: [rules.required],
    paymentMethod: [rules.required],
  };

  const isValid = validateForm(schema);

  if (isValid) {
    alert('✅ Formulário válido!');
  } else {
    alert('❌ Você deve selecionar um plano e método de pagamento!');
  }
};
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">RadioGroup Test</h1>
      <p class="text-muted-foreground">
        Teste todas as variantes e funcionalidades do CorpRadioGroup: cores,
        validação, density, labelPosition, messages, forceError e mais
      </p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="simplePlan"
          name="simplePlan"
          label="Escolha um plano"
        >
          <CorpRadioGroupItem value="free" label="Free" />
          <CorpRadioGroupItem value="pro" label="Pro" />
          <CorpRadioGroupItem value="enterprise" label="Enterprise" />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Valor selecionado:
          <code>{{ simplePlan || 'nenhum' }}</code>
        </p>
      </div>
    </section>

    <!-- Variants (solid, ghost, outline) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Variants (solid, ghost, outline)
      </h2>
      <div class="space-y-6 p-4 bg-card border border-border rounded-lg">
        <div>
          <h3 class="text-sm font-medium mb-2">Solid (padrão):</h3>
          <p class="text-xs text-muted-foreground mb-2">
            Fundo colorido quando checked, bolinha branca
          </p>
          <CorpRadioGroup
            v-model="variantSelection"
            name="variantSolid"
            orientation="horizontal"
          >
            <CorpRadioGroupItem
              value="option1"
              label="Opção 1"
              variant="solid"
            />
            <CorpRadioGroupItem
              value="option2"
              label="Opção 2"
              variant="solid"
            />
            <CorpRadioGroupItem
              value="option3"
              label="Opção 3"
              variant="solid"
            />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Ghost:</h3>
          <p class="text-xs text-muted-foreground mb-2">
            Fundo sutil (10%) quando checked, borda e bolinha coloridas
          </p>
          <CorpRadioGroup
            v-model="variantSelection"
            name="variantGhost"
            orientation="horizontal"
          >
            <CorpRadioGroupItem
              value="option1"
              label="Opção 1"
              variant="ghost"
            />
            <CorpRadioGroupItem
              value="option2"
              label="Opção 2"
              variant="ghost"
            />
            <CorpRadioGroupItem
              value="option3"
              label="Opção 3"
              variant="ghost"
            />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Outline:</h3>
          <p class="text-xs text-muted-foreground mb-2">
            Apenas bolinha colorida quando checked, borda mantém tema
          </p>
          <CorpRadioGroup
            v-model="variantSelection"
            name="variantOutline"
            orientation="horizontal"
          >
            <CorpRadioGroupItem
              value="option1"
              label="Opção 1"
              variant="outline"
            />
            <CorpRadioGroupItem
              value="option2"
              label="Opção 2"
              variant="outline"
            />
            <CorpRadioGroupItem
              value="option3"
              label="Opção 3"
              variant="outline"
            />
          </CorpRadioGroup>
        </div>

        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ variantSelection }}</code>
        </p>
      </div>
    </section>

    <!-- Variants + Cores -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Variants + Cores Semânticas
      </h2>
      <div class="space-y-6 p-4 bg-card border border-border rounded-lg">
        <div>
          <h3 class="text-sm font-medium mb-2">Ghost com cores:</h3>
          <CorpRadioGroup
            v-model="colorChoice"
            name="variantGhostColors"
            orientation="horizontal"
          >
            <CorpRadioGroupItem
              value="primary"
              label="Primary"
              variant="ghost"
              color="primary"
            />
            <CorpRadioGroupItem
              value="success"
              label="Success"
              variant="ghost"
              color="success"
            />
            <CorpRadioGroupItem
              value="warning"
              label="Warning"
              variant="ghost"
              color="warning"
            />
            <CorpRadioGroupItem
              value="destructive"
              label="Destructive"
              variant="ghost"
              color="destructive"
            />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Outline com cores:</h3>
          <CorpRadioGroup
            v-model="colorChoice"
            name="variantOutlineColors"
            orientation="horizontal"
          >
            <CorpRadioGroupItem
              value="primary"
              label="Primary"
              variant="outline"
              color="primary"
            />
            <CorpRadioGroupItem
              value="success"
              label="Success"
              variant="outline"
              color="success"
            />
            <CorpRadioGroupItem
              value="info"
              label="Info"
              variant="outline"
              color="info"
            />
            <CorpRadioGroupItem
              value="secondary"
              label="Secondary"
              variant="outline"
              color="secondary"
            />
          </CorpRadioGroup>
        </div>
      </div>
    </section>

    <!-- Label e Hint -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Label e Hint</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="form.notification"
          name="notification"
          label="Como deseja receber notificações?"
          hint="Você pode mudar isso depois nas configurações"
        >
          <CorpRadioGroupItem
            value="email"
            label="Email"
            hint="Receber por email"
          />
          <CorpRadioGroupItem
            value="sms"
            label="SMS"
            hint="Receber por mensagem de texto"
          />
          <CorpRadioGroupItem
            value="push"
            label="Push"
            hint="Notificações no navegador"
          />
          <CorpRadioGroupItem
            value="none"
            label="Nenhum"
            hint="Sem notificações"
          />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ form.notification }}</code>
        </p>
      </div>
    </section>

    <!-- Orientação: Vertical vs Horizontal -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Orientação: Vertical vs Horizontal
      </h2>
      <div class="space-y-6 p-4 bg-card border border-border rounded-lg">
        <div>
          <h3 class="text-sm font-medium mb-2">Vertical (padrão):</h3>
          <CorpRadioGroup
            v-model="orientation"
            name="orientationVertical"
            orientation="vertical"
          >
            <CorpRadioGroupItem value="option1" label="Opção 1" />
            <CorpRadioGroupItem value="option2" label="Opção 2" />
            <CorpRadioGroupItem value="option3" label="Opção 3" />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Horizontal:</h3>
          <CorpRadioGroup
            v-model="orientation"
            name="orientationHorizontal"
            orientation="horizontal"
          >
            <CorpRadioGroupItem value="option1" label="Opção 1" />
            <CorpRadioGroupItem value="option2" label="Opção 2" />
            <CorpRadioGroupItem value="option3" label="Opção 3" />
          </CorpRadioGroup>
        </div>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ orientation }}</code>
        </p>
      </div>
    </section>

    <!-- Estados: Disabled -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Disabled</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="disabledSelection"
          name="disabledGroup"
          label="Grupo desabilitado"
          hint="Todo o grupo está desabilitado"
          disabled
        >
          <CorpRadioGroupItem value="option1" label="Opção 1" />
          <CorpRadioGroupItem value="option2" label="Opção 2" />
          <CorpRadioGroupItem value="option3" label="Opção 3" />
        </CorpRadioGroup>

        <CorpRadioGroup
          v-model="disabledSelection"
          name="disabledItem"
          label="Item individual desabilitado"
          hint="Apenas a Opção 2 está desabilitada"
        >
          <CorpRadioGroupItem value="option1" label="Opção 1" />
          <CorpRadioGroupItem
            value="option2"
            label="Opção 2 (disabled)"
            disabled
          />
          <CorpRadioGroupItem value="option3" label="Opção 3" />
        </CorpRadioGroup>
      </div>
    </section>

    <!-- Estados: Readonly -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados: Readonly</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="readonlySelection"
          name="readonlyGroup"
          label="Grupo readonly"
          hint="Seleção não pode ser alterada"
          readonly
        >
          <CorpRadioGroupItem value="option1" label="Opção 1" />
          <CorpRadioGroupItem value="option2" label="Opção 2" />
          <CorpRadioGroupItem value="option3" label="Opção 3" />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Valor readonly:
          <code>{{ readonlySelection }}</code>
        </p>
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="colorChoice"
          name="semanticColors"
          label="Escolha uma cor semântica"
        >
          <CorpRadioGroupItem value="primary" label="Primary" color="primary" />
          <CorpRadioGroupItem
            value="secondary"
            label="Secondary"
            color="secondary"
          />
          <CorpRadioGroupItem
            value="destructive"
            label="Destructive"
            color="destructive"
          />
          <CorpRadioGroupItem value="success" label="Success" color="success" />
          <CorpRadioGroupItem value="warning" label="Warning" color="warning" />
          <CorpRadioGroupItem value="info" label="Info" color="info" />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ colorChoice }}</code>
        </p>
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Customizadas</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="colorChoice"
          name="customColors"
          label="Cores customizadas (HEX/CSS)"
        >
          <CorpRadioGroupItem
            value="purple"
            label="Roxo (#8b5cf6)"
            color="#8b5cf6"
          />
          <CorpRadioGroupItem
            value="pink"
            label="Rosa (#ec4899)"
            color="#ec4899"
          />
          <CorpRadioGroupItem
            value="cyan"
            label="Cyan (nome CSS)"
            color="cyan"
          />
          <CorpRadioGroupItem
            value="orange"
            label="Orange (nome CSS)"
            color="orange"
          />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ colorChoice }}</code>
        </p>
      </div>
    </section>

    <!-- Validação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Validação (rules.required)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="form.plan"
          name="plan"
          label="Escolha seu plano *"
          hint="Campo obrigatório"
          :rules="[rules.required]"
        >
          <CorpRadioGroupItem value="free" label="Free - $0/mês" />
          <CorpRadioGroupItem value="pro" label="Pro - $29/mês" />
          <CorpRadioGroupItem value="enterprise" label="Enterprise - $99/mês" />
        </CorpRadioGroup>

        <CorpRadioGroup
          v-model="form.paymentMethod"
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

        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Validar Formulário
        </button>
      </div>
    </section>

    <!-- External Errors (Erros Externos/Backend) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        External Errors (Erros do Backend)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="simplePlan"
          name="externalError"
          label="Escolha um plano"
          hint="Este campo tem erro do backend"
          :external-errors="showExternalError ? externalErrorsExample : []"
        >
          <CorpRadioGroupItem value="free" label="Free" />
          <CorpRadioGroupItem value="pro" label="Pro" />
          <CorpRadioGroupItem value="enterprise" label="Enterprise" />
        </CorpRadioGroup>
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
        <CorpRadioGroup
          v-model="simplePlan"
          name="forceError"
          label="Campo com erro forçado"
          hint="Visual de erro sem mensagem"
          force-error
        >
          <CorpRadioGroupItem value="free" label="Free" />
          <CorpRadioGroupItem value="pro" label="Pro" />
          <CorpRadioGroupItem value="enterprise" label="Enterprise" />
        </CorpRadioGroup>
      </div>
    </section>

    <!-- Valores Numéricos -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Valores Numéricos (v-model com number)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="numericSelection"
          name="numericValues"
          label="Selecione um nível"
        >
          <CorpRadioGroupItem :value="1" label="Nível 1 (Iniciante)" />
          <CorpRadioGroupItem :value="2" label="Nível 2 (Intermediário)" />
          <CorpRadioGroupItem :value="3" label="Nível 3 (Avançado)" />
          <CorpRadioGroupItem :value="4" label="Nível 4 (Expert)" />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Valor numérico:
          <code>{{ numericSelection }}</code>
          (type: {{ typeof numericSelection }})
        </p>
      </div>
    </section>

    <!-- Messages e MaxErrors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Messages e MaxErrors
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="simplePlan"
          name="messages"
          label="Com mensagens genéricas"
          :messages="[
            'Info: Escolha o plano mais adequado ao seu uso',
            'Dica: Você pode fazer upgrade depois',
          ]"
        >
          <CorpRadioGroupItem value="free" label="Free" />
          <CorpRadioGroupItem value="pro" label="Pro" />
          <CorpRadioGroupItem value="enterprise" label="Enterprise" />
        </CorpRadioGroup>

        <CorpRadioGroup
          v-model="simplePlan"
          name="maxErrors"
          label="Limitando erros (maxErrors=1)"
          :external-errors="['Erro 1', 'Erro 2', 'Erro 3']"
          :max-errors="1"
        >
          <CorpRadioGroupItem value="free" label="Free" />
          <CorpRadioGroupItem value="pro" label="Pro" />
          <CorpRadioGroupItem value="enterprise" label="Enterprise" />
        </CorpRadioGroup>
      </div>
    </section>

    <!-- Density (Tamanhos) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Density (Tamanhos: compact, regular, comfortable)
      </h2>
      <div class="space-y-6 p-4 bg-card border border-border rounded-lg">
        <div>
          <h3 class="text-sm font-medium mb-2">Compact (padrão):</h3>
          <CorpRadioGroup
            v-model="densitySelection"
            name="densityCompact"
            label="Tamanho Compact"
          >
            <CorpRadioGroupItem
              value="compact"
              label="Compact"
              density="compact"
            />
            <CorpRadioGroupItem
              value="regular"
              label="Standard"
              density="compact"
            />
            <CorpRadioGroupItem
              value="comfortable"
              label="Comfortable"
              density="compact"
            />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Standard:</h3>
          <CorpRadioGroup
            v-model="densitySelection"
            name="densityStandard"
            label="Tamanho Standard"
          >
            <CorpRadioGroupItem
              value="compact"
              label="Compact"
              density="regular"
            />
            <CorpRadioGroupItem
              value="regular"
              label="Standard"
              density="regular"
            />
            <CorpRadioGroupItem
              value="comfortable"
              label="Comfortable"
              density="regular"
            />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Comfortable:</h3>
          <CorpRadioGroup
            v-model="densitySelection"
            name="densityComfortable"
            label="Tamanho Comfortable"
          >
            <CorpRadioGroupItem
              value="compact"
              label="Compact"
              density="comfortable"
            />
            <CorpRadioGroupItem
              value="regular"
              label="Standard"
              density="comfortable"
            />
            <CorpRadioGroupItem
              value="comfortable"
              label="Comfortable"
              density="comfortable"
            />
          </CorpRadioGroup>
        </div>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ densitySelection }}</code>
        </p>
      </div>
    </section>

    <!-- Label Position (Posição do Label) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Label Position (Esquerda vs Direita)
      </h2>
      <div class="space-y-6 p-4 bg-card border border-border rounded-lg">
        <div>
          <h3 class="text-sm font-medium mb-2">Right (padrão):</h3>
          <CorpRadioGroup
            v-model="labelPositionSelection"
            name="labelPositionRight"
            label="Label à direita"
          >
            <CorpRadioGroupItem
              value="right"
              label="Radio à esquerda, Label à direita"
              label-position="right"
            />
            <CorpRadioGroupItem
              value="option2"
              label="Opção 2"
              label-position="right"
            />
            <CorpRadioGroupItem
              value="option3"
              label="Opção 3"
              label-position="right"
            />
          </CorpRadioGroup>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Left:</h3>
          <CorpRadioGroup
            v-model="labelPositionSelection"
            name="labelPositionLeft"
            label="Label à esquerda"
          >
            <CorpRadioGroupItem
              value="left"
              label="Label à esquerda, Radio à direita"
              label-position="left"
            />
            <CorpRadioGroupItem
              value="option2"
              label="Opção 2"
              label-position="left"
            />
            <CorpRadioGroupItem
              value="option3"
              label="Opção 3"
              label-position="left"
            />
          </CorpRadioGroup>
        </div>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ labelPositionSelection }}</code>
        </p>
      </div>
    </section>

    <!-- Combinando Density + LabelPosition + Colors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Combinando: Density + LabelPosition + Colors
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="colorChoice"
          name="combined"
          label="Exemplo Combinado"
          hint="Comfortable + Left + Cores customizadas"
        >
          <CorpRadioGroupItem
            value="option1"
            label="Opção 1 (Comfortable + Left + Purple)"
            density="comfortable"
            label-position="left"
            color="#8b5cf6"
          />
          <CorpRadioGroupItem
            value="option2"
            label="Opção 2 (Standard + Right + Success)"
            density="regular"
            label-position="right"
            color="success"
          />
          <CorpRadioGroupItem
            value="option3"
            label="Opção 3 (Compact + Right + Info)"
            density="compact"
            label-position="right"
            color="info"
          />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Selecionado:
          <code>{{ colorChoice }}</code>
        </p>
      </div>
    </section>

    <!-- Exemplo Real: Seleção de Plano -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Exemplo Real: Seleção de Plano
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpRadioGroup
          v-model="form.size"
          name="size"
          label="Tamanho da sua empresa"
          hint="Isso nos ajuda a recomendar o melhor plano"
        >
          <CorpRadioGroupItem
            value="small"
            label="Pequena (1-10 funcionários)"
            hint="Ideal para startups e pequenos negócios"
            color="success"
            density="regular"
          />
          <CorpRadioGroupItem
            value="medium"
            label="Média (11-50 funcionários)"
            hint="Perfeito para empresas em crescimento"
            color="info"
            density="regular"
          />
          <CorpRadioGroupItem
            value="large"
            label="Grande (51-200 funcionários)"
            hint="Para empresas estabelecidas"
            color="warning"
            density="regular"
          />
          <CorpRadioGroupItem
            value="enterprise"
            label="Enterprise (200+ funcionários)"
            hint="Soluções customizadas e suporte dedicado"
            color="primary"
            density="comfortable"
          />
        </CorpRadioGroup>
        <p class="text-sm text-muted-foreground">
          Tamanho selecionado:
          <code>{{ form.size }}</code>
        </p>
      </div>
    </section>
  </div>
</template>
