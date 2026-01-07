<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { CorpSelect } from '@/components/ui/select';
import { useForm } from '@/composables/useForm';
import { useValidationRules } from '@/validations/rules';

// ============== TYPES ==============
interface SelectTestForm {
  framework: string;
  state: string;
  status: string;
  tags: (string | number)[];
  skills: (string | number)[];
  frameworkClear: string;
  skillsClear: (string | number)[];
  country: string;
  languages: (string | number)[];
}

// ============== VALIDATION ==============
const rules = useValidationRules();

// ============== FORM WITH VALIDATION CONTEXT ==============
const { form: formRaw, validateForm } = useForm({
  initialValues: {
    framework: '',
    state: '',
    status: '',
    tags: [],
    skills: [],
    frameworkClear: '',
    skillsClear: [],
    country: '',
    languages: [],
  },
});

// Type-safe form access
const form = formRaw as unknown as Ref<SelectTestForm>;

// ============== STATE ==============
const simpleSelect = ref('');
const multipleSelect = ref([]);
const chipsSelect = ref([]);

// ============== DATA ==============
const frameworks = ['Vue', 'React', 'Angular', 'Svelte', 'Solid'];

const states = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'ba', label: 'Bahia' },
  { value: 'pr', label: 'Paraná' },
  { value: 'sc', label: 'Santa Catarina' },
];

const statusOptions = ['Ativo', 'Inativo', 'Pendente', 'Arquivado'];

const skills = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java'];

const countries = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'de', label: 'Alemanha' },
  { value: 'fr', label: 'França' },
];

const languages = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'de', label: 'Alemão' },
  { value: 'fr', label: 'Francês' },
];

// ============== HANDLERS ==============
const handleSubmit = () => {
  const schema = {
    country: [rules.required],
    languages: [rules.required],
  };

  const isValid = validateForm(schema);

  if (isValid) {
    alert(
      `Formulário válido!\nPaís: ${form.value.country}\nIdiomas: ${form.value.languages.join(', ')}`
    );
  } else {
    alert('Formulário inválido! Verifique os campos.');
  }
};

const handleClear = () => {
  form.value.country = '';
  form.value.languages = [];
};
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Select Test</h1>
      <p class="text-muted-foreground">
        Teste todas as variantes e funcionalidades do CorpSelect
      </p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSelect
          v-model="simpleSelect"
          name="simpleSelect"
          :items="frameworks"
          label="Framework"
          placeholder="Escolha um framework"
        />
        <p class="text-sm text-muted-foreground">
          Valor selecionado:
          <code>{{ simpleSelect || 'nenhum' }}</code>
        </p>
      </div>
    </section>

    <!-- Items: string[] vs {value, label}[] -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Items: string[] vs {value, label}[]
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Array de strings -->
        <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
          <CorpSelect
            v-model="form.status"
            name="status"
            :items="statusOptions"
            label="Status (array simples)"
            placeholder="Selecione o status"
          />
          <p class="text-sm text-muted-foreground">
            Valor:
            <code>{{ form.status || 'nenhum' }}</code>
          </p>
        </div>

        <!-- Array de objetos -->
        <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
          <CorpSelect
            v-model="form.state"
            name="state"
            :items="states"
            label="Estado (array de objetos)"
            placeholder="Selecione o estado"
          />
          <p class="text-sm text-muted-foreground">
            Valor:
            <code>{{ form.state || 'nenhum' }}</code>
          </p>
        </div>
      </div>
    </section>

    <!-- Multiple sem chips -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Multiple sem chips</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSelect
          v-model="multipleSelect"
          name="multipleSelect"
          :items="frameworks"
          label="Frameworks (seleção múltipla)"
          placeholder="Selecione múltiplos frameworks"
          multiple
        />
        <p class="text-sm text-muted-foreground">
          Valores:
          <code>{{ multipleSelect.join(', ') || 'nenhum' }}</code>
        </p>
      </div>
    </section>

    <!-- Multiple com chips -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Multiple com chips</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSelect
          v-model="chipsSelect"
          name="chipsSelect"
          :items="skills"
          label="Skills (multiple com chips)"
          placeholder="Selecione suas habilidades"
          multiple
          chips
        />
        <p class="text-sm text-muted-foreground">
          Selecionados ({{ chipsSelect.length }}):
          <code>{{ chipsSelect.join(', ') || 'nenhum' }}</code>
        </p>
      </div>
    </section>

    <!-- Clearable -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Clearable</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Single clearable -->
        <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
          <CorpSelect
            v-model="form.frameworkClear"
            name="frameworkClear"
            :items="frameworks"
            label="Framework (clearable)"
            placeholder="Escolha um framework"
            clearable
          />
          <p class="text-sm text-muted-foreground">
            Valor:
            <code>{{ form.frameworkClear || 'nenhum' }}</code>
          </p>
        </div>

        <!-- Multiple clearable -->
        <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
          <CorpSelect
            v-model="form.skillsClear"
            name="skillsClear"
            :items="skills"
            label="Skills (multiple + clearable)"
            placeholder="Selecione habilidades"
            multiple
            chips
            clearable
          />
          <p class="text-sm text-muted-foreground">
            Valores:
            <code>{{ form.skillsClear.join(', ') || 'nenhum' }}</code>
          </p>
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Validation</h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSelect
          v-model="form.country"
          name="country"
          :items="countries"
          label="País"
          :rules="[rules.required]"
          placeholder="Selecione seu país"
          hint="Campo obrigatório com validação"
          clearable
        />
        <CorpSelect
          v-model="form.languages"
          name="languages"
          :items="languages"
          label="Idiomas"
          :rules="[rules.required]"
          placeholder="Selecione os idiomas"
          hint="Selecione pelo menos um idioma"
          multiple
          chips
          clearable
        />
        <div class="flex gap-2">
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Validar
          </button>
          <button
            @click="handleClear"
            class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          >
            Limpar
          </button>
        </div>
      </div>
    </section>

    <!-- Disabled & Readonly -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Disabled & Readonly</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Disabled -->
        <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
          <CorpSelect
            name="frameworkDisabled"
            :items="frameworks"
            label="Disabled"
            modelValue="Vue"
            disabled
          />
          <p class="text-sm text-muted-foreground">
            Estado:
            <span class="text-destructive">Desabilitado</span>
          </p>
        </div>

        <!-- Readonly -->
        <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
          <CorpSelect
            name="frameworkReadonly"
            :items="frameworks"
            label="Readonly"
            modelValue="React"
            readonly
          />
          <p class="text-sm text-muted-foreground">
            Estado:
            <span class="text-blue-500">Somente leitura</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Exemplo Completo -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Exemplo Completo (All features)
      </h2>
      <div class="space-y-4 p-4 bg-card border border-border rounded-lg">
        <CorpSelect
          v-model="form.tags"
          name="tags"
          :items="[
            { value: 'vue', label: 'Vue.js' },
            { value: 'react', label: 'React' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'solid', label: 'Solid' },
            { value: 'qwik', label: 'Qwik' },
          ]"
          label="Frameworks favoritos"
          :rules="[rules.required]"
          placeholder="Selecione seus frameworks favoritos"
          hint="Combo: validation + multiple + chips + clearable"
          multiple
          chips
          clearable
          persistentHint
        />
        <div
          v-if="form.tags.length > 0"
          class="p-3 bg-primary/10 border border-primary/20 rounded-md"
        >
          <p class="text-sm font-medium text-foreground mb-1">
            Você selecionou {{ form.tags.length }} framework(s):
          </p>
          <p class="text-sm text-muted-foreground">
            <code>{{ form.tags.join(', ') }}</code>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
