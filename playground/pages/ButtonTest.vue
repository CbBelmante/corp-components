<script setup lang="ts">
import { ref } from 'vue';
import { CorpButton as Button } from '@/components/ui/button';

const clickCount = ref(0);
const loading = ref(false);

const simulateLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Button Test</h1>
      <p class="text-muted-foreground">Teste todas as variantes e estados</p>
    </div>

    <!-- Variantes (Estilos Visuais) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Variantes (Estilos)</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button variant="solid">Solid (Default)</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="destructive">Destructive</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
        <Button color="info">Info</Button>
      </div>
    </section>

    <!-- Variantes + Cores -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Combinações Variant + Color</h2>
      <div class="space-y-3">
        <!-- Solid -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Solid</p>
          <div class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded">
            <Button variant="solid" color="success">Salvar</Button>
            <Button variant="solid" color="destructive">Deletar</Button>
            <Button variant="solid" color="warning">Aviso</Button>
            <Button variant="solid" color="info">Info</Button>
          </div>
        </div>

        <!-- Outline -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Outline</p>
          <div class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded">
            <Button variant="outline" color="primary">Editar</Button>
            <Button variant="outline" color="secondary">Cancelar</Button>
            <Button variant="outline" color="destructive">Remover</Button>
            <Button variant="outline" color="success">Aprovar</Button>
          </div>
        </div>

        <!-- Ghost -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Ghost</p>
          <div class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded">
            <Button variant="ghost" color="info">Detalhes</Button>
            <Button variant="ghost" color="warning">Atenção</Button>
            <Button variant="ghost" color="error">Fechar</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Customizadas (HEX)</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button color="#8b5cf6" variant="solid">Roxo</Button>
        <Button color="#ec4899" variant="outline">Rosa</Button>
        <Button color="#06b6d4" variant="ghost">Ciano</Button>
        <Button bgColor="#22c55e" textColor="white">Custom BG</Button>
      </div>
    </section>

    <!-- Tamanhos -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Tamanhos</h2>
      <div
        class="flex flex-wrap items-center gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">X</Button>
      </div>
    </section>

    <!-- Estados -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button disabled>Disabled</Button>
        <Button :disabled="loading" @click="simulateLoading">
          {{ loading ? 'Loading...' : 'Click to Load' }}
        </Button>
      </div>
    </section>

    <!-- Interatividade -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Interatividade</h2>
      <div
        class="flex flex-wrap items-center gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button @click="clickCount++">Clicado {{ clickCount }}x</Button>
        <Button variant="outline" color="secondary" @click="clickCount = 0">Reset</Button>
      </div>
    </section>

    <!-- Polimorfismo (as="a") -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Polimorfismo (as="a")
      </h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button as="a" href="https://github.com" target="_blank" color="primary">
          GitHub (Link)
        </Button>
        <Button
          as="a"
          href="https://vuejs.org"
          target="_blank"
          variant="outline"
          color="success"
        >
          Vue.js (Link)
        </Button>
        <Button
          as="a"
          href="https://vitejs.dev"
          target="_blank"
          color="secondary"
        >
          Vite (Link)
        </Button>
      </div>
      <p class="text-xs text-muted-foreground">
        Botões renderizados como &lt;a&gt; devem ter cor normal (não laranja de
        link)
      </p>
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
