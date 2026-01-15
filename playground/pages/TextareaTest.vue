<script setup lang="ts">
import { CorpTextarea } from '@/components/ui/textarea';
import { CorpButton } from '@/components/ui/button';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';
import { type Ref } from 'vue';

// ============== TYPES ==============
interface TextareaTestForm {
  bio1: string;
  bio2: string;
  bio3: string;
  description1: string;
  description2: string;
  comments1: string;
  message1: string;
  notes1: string;
  feedback1: string;
  review1: string;
  bio4: string;
  description3: string;
  bio5: string;
  bio6: string;
  bioForm: string;
  feedbackForm: string;
}

// ============== VALIDATION ==============
const rules = useValidationRules();

// ============== FORM WITH VALIDATION CONTEXT ==============
const { form: formRaw, validateForm } = useForm({
  initialValues: {
    bio1: '',
    bio2: '',
    bio3: '',
    description1: '',
    description2: '',
    comments1: '',
    message1: '',
    notes1: '',
    feedback1: '',
    review1: '',
    bio4: '',
    description3: '',
    bio5: 'Campo desabilitado com múltiplas\nlinhas de texto\nmostrando o estado readonly.',
    bio6: 'Campo readonly\ncom múltiplas linhas.',
    bioForm: '',
    feedbackForm: '',
  },
  formName: 'TextareaTestForm',
});

// Type-safe form access
const form = formRaw as unknown as Ref<TextareaTestForm>;

const handleSubmit = () => {
  const schema = {
    bioForm: [rules.required, rules.minLength(10)],
    feedbackForm: [rules.required, rules.minLength(20)],
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
      <h1 class="text-2xl font-bold text-foreground mb-2">Textarea Test</h1>
      <p class="text-muted-foreground">Teste todos os estados e features</p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.bio1"
          name="bio1"
          label="Bio"
          placeholder="Conte sobre você..."
        />
        <CorpTextarea
          v-model="form.bio2"
          name="bio2"
          label="Descrição"
          placeholder="Descreva seu projeto..."
          :rows="6"
        />
      </div>
    </section>

    <!-- Variant (elevated/flat) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Variant (elevated/flat)
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          name="variantElevated"
          label="Elevated (padrão)"
          variant="elevated"
          placeholder="Fundo + borda"
        />
        <CorpTextarea
          name="variantFlat"
          label="Flat"
          variant="flat"
          placeholder="Só fundo, sem borda"
        />
      </div>
    </section>

    <!-- Density (compact/regular/comfortable) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Density (compact/regular/comfortable)
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          name="densityCompact"
          label="Compact (min-h-20)"
          density="compact"
          placeholder="Compacto"
        />
        <CorpTextarea
          name="densityRegular"
          label="Regular (min-h-24)"
          density="regular"
          placeholder="Regular (padrão)"
        />
        <CorpTextarea
          name="densityComfortable"
          label="Comfortable (min-h-28)"
          density="comfortable"
          placeholder="Confortável"
        />
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.bio3"
          name="colorPrimary"
          label="Primary"
          border-color="primary"
          placeholder="Cor primary (padrão)"
        />
        <CorpTextarea
          v-model="form.bio3"
          name="colorSecondary"
          label="Secondary"
          border-color="secondary"
          placeholder="Cor secondary"
        />
        <CorpTextarea
          v-model="form.bio3"
          name="colorSuccess"
          label="Success"
          border-color="success"
          placeholder="Cor success"
        />
        <CorpTextarea
          v-model="form.bio3"
          name="colorWarning"
          label="Warning"
          border-color="warning"
          placeholder="Cor warning"
        />
        <CorpTextarea
          v-model="form.bio3"
          name="colorInfo"
          label="Info"
          border-color="info"
          placeholder="Cor info"
        />
        <CorpTextarea
          v-model="form.bio3"
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
        <CorpTextarea
          v-model="form.description1"
          name="colorPurple"
          label="Marrom (#8B4513)"
          border-color="#8B4513"
          placeholder="Cor HEX"
        />
        <CorpTextarea
          v-model="form.description1"
          name="colorPink"
          label="Cobre (#B87333)"
          border-color="#B87333"
          placeholder="Cor HEX"
        />
        <CorpTextarea
          v-model="form.description1"
          name="colorCyan"
          label="Olive (#6B8E23)"
          border-color="#6B8E23"
          placeholder="Nome CSS"
        />
        <CorpTextarea
          v-model="form.description1"
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
          <CorpTextarea
            name="disabledPrimary"
            label="Primary"
            border-color="primary"
            model-value="Disabled primary com múltiplas linhas"
            disabled
          />
          <CorpTextarea
            name="disabledSuccess"
            label="Success"
            border-color="success"
            model-value="Disabled success com múltiplas linhas"
            disabled
          />
          <CorpTextarea
            name="disabledPurple"
            label="Marrom"
            border-color="#8B4513"
            model-value="Disabled purple com múltiplas linhas"
            disabled
          />
          <CorpTextarea
            name="disabledPink"
            label="Cobre"
            border-color="#B87333"
            model-value="Disabled pink com múltiplas linhas"
            disabled
          />
        </div>
      </div>
    </section>

    <!-- Validação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Validação</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.description2"
          name="description2"
          label="Descrição"
          :rules="[rules.required, rules.minLength(10)]"
          placeholder="Mínimo 10 caracteres (asterisco automático)"
        />
        <CorpTextarea
          v-model="form.comments1"
          name="comments1"
          label="Comentários"
          :rules="[rules.required, rules.maxLength(200)]"
          placeholder="Máximo 200 caracteres"
        />
      </div>
    </section>

    <!-- Ícones Outer -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Ícones Outer</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.message1"
          name="message1"
          label="Mensagem"
          prepend-outer-icon="luc-message-square"
          placeholder="Digite sua mensagem..."
        />
        <CorpTextarea
          v-model="form.notes1"
          name="notes1"
          label="Notas"
          prepend-outer-icon="luc-sticky-note"
          append-outer-icon="luc-save"
        />
      </div>
    </section>

    <!-- Clearable -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Clearable</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.feedback1"
          name="feedback1"
          label="Feedback"
          clearable
        />
        <CorpTextarea
          v-model="form.review1"
          name="review1"
          label="Review"
          prepend-outer-icon="luc-star"
          clearable
        />
      </div>
    </section>

    <!-- Counter -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Counter</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.bio4"
          name="bio4"
          label="Bio (com limite)"
          :counter="200"
          placeholder="Máximo 200 caracteres"
        />
        <CorpTextarea
          v-model="form.description3"
          name="description3"
          label="Descrição (contador simples)"
          counter
        />
      </div>
    </section>

    <!-- Auto-grow -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Auto-grow</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.bio1"
          name="autoGrow1"
          label="Auto-grow (sem limite)"
          auto-grow
          placeholder="O textarea cresce automaticamente..."
        />
        <CorpTextarea
          v-model="form.bio2"
          name="autoGrow2"
          label="Auto-grow (máx 10 linhas)"
          auto-grow
          :max-rows="10"
          placeholder="Cresce até 10 linhas..."
        />
      </div>
    </section>

    <!-- No Resize -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">No Resize</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.description1"
          name="noResize1"
          label="No resize"
          no-resize
          placeholder="Não pode redimensionar manualmente"
        />
      </div>
    </section>

    <!-- Estados -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.bio5"
          name="bio5"
          label="Desabilitado"
          disabled
        />
        <CorpTextarea
          v-model="form.bio6"
          name="bio6"
          label="Somente leitura"
          readonly
        />
      </div>
    </section>

    <!-- Loading -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Loading</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.feedback1"
          name="loading1"
          label="Salvando feedback..."
          loading
          placeholder="Estado de carregamento"
        />
      </div>
    </section>

    <!-- Formulário Completo -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Formulário Completo com Submit
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <CorpTextarea
          v-model="form.bioForm"
          name="bioForm"
          label="Bio"
          :rules="[rules.required, rules.minLength(10)]"
          :counter="200"
          clearable
          placeholder="Conte sobre você (mínimo 10 caracteres)..."
        />
        <CorpTextarea
          v-model="form.feedbackForm"
          name="feedbackForm"
          label="Feedback"
          prepend-outer-icon="luc-message-square"
          :rules="[rules.required, rules.minLength(20)]"
          :counter="500"
          clearable
          placeholder="Seu feedback é importante (mínimo 20 caracteres)..."
        />

        <div class="flex gap-2 pt-2">
          <CorpButton @click="handleSubmit">Enviar</CorpButton>
          <CorpButton
            variant="outline"
            @click="
              form.bioForm = '';
              form.feedbackForm = '';
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
