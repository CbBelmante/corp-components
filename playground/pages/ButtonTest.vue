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

    <!-- Variantes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Variantes</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
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
        <Button variant="outline" @click="clickCount = 0">Reset</Button>
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
        <Button as="a" href="https://github.com" target="_blank">
          GitHub (Link)
        </Button>
        <Button
          as="a"
          href="https://vuejs.org"
          target="_blank"
          variant="outline"
        >
          Vue.js (Link)
        </Button>
        <Button
          as="a"
          href="https://vitejs.dev"
          target="_blank"
          variant="secondary"
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
