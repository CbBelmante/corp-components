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
      <h2 class="text-lg font-semibold text-foreground">
        Combinações Variant + Color
      </h2>
      <div class="space-y-3">
        <!-- Solid -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Solid</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Button variant="solid" color="success">Salvar</Button>
            <Button variant="solid" color="destructive">Deletar</Button>
            <Button variant="solid" color="warning">Aviso</Button>
            <Button variant="solid" color="info">Info</Button>
          </div>
        </div>

        <!-- Outline -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Outline</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Button variant="outline" color="primary">Editar</Button>
            <Button variant="outline" color="secondary">Cancelar</Button>
            <Button variant="outline" color="destructive">Remover</Button>
            <Button variant="outline" color="success">Aprovar</Button>
          </div>
        </div>

        <!-- Ghost -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Ghost</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Button variant="ghost" color="info">Detalhes</Button>
            <Button variant="ghost" color="warning">Atenção</Button>
            <Button variant="ghost" color="error">Fechar</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Cores Customizadas com Hover
      </h2>

      <!-- HEX -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">HEX Colors</h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Button color="#8b5cf6" variant="solid">HEX Solid</Button>
          <Button color="#8b5cf6" variant="outline">
            HEX Outline (hover!)
          </Button>
          <Button color="#8b5cf6" variant="ghost">HEX Ghost (hover!)</Button>
          <Button color="#ec4899" variant="ghost">Rosa Ghost</Button>
        </div>
      </div>

      <!-- RGB -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">RGB Colors</h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Button color="rgb(139, 92, 246)" variant="solid">RGB Solid</Button>
          <Button color="rgb(139, 92, 246)" variant="outline">
            RGB Outline (hover!)
          </Button>
          <Button color="rgb(139, 92, 246)" variant="ghost">
            RGB Ghost (hover!)
          </Button>
        </div>
      </div>

      <!-- CSS Variables -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">CSS Variables</h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Button color="var(--info)" variant="solid">var(--info) Solid</Button>
          <Button color="var(--info)" variant="outline">
            var(--info) Outline (hover!)
          </Button>
          <Button color="var(--info)" variant="ghost">
            var(--info) Ghost (hover!)
          </Button>
          <Button color="var(--success)" variant="ghost">
            var(--success) Ghost
          </Button>
        </div>
      </div>

      <!-- CSS Named Colors -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          CSS Named Colors
        </h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Button color="cyan" variant="solid">Cyan Solid</Button>
          <Button color="cyan" variant="outline">Cyan Outline (hover!)</Button>
          <Button color="cyan" variant="ghost">Cyan Ghost (hover!)</Button>
          <Button color="pink" variant="ghost">Pink Ghost</Button>
          <Button color="orange" variant="ghost">Orange Ghost</Button>
          <Button color="teal" variant="outline">Teal Outline</Button>
        </div>
      </div>

      <!-- bgColor/textColor Override -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          color vs bgColor/textColor (Override)
        </h3>
        <div class="p-4 bg-card border border-border rounded-lg space-y-4">
          <!-- Exemplo 1: Hover bloqueado -->
          <div class="space-y-2">
            <p class="text-xs text-muted-foreground">
              ✅ color gera hover | ❌ bgColor bloqueia hover
            </p>
            <div class="flex flex-wrap gap-4">
              <Button color="#8b5cf6" variant="solid"
                >Color com hover ✅</Button
              >
              <Button color="#8b5cf6" bgColor="#8b5cf6" variant="solid"
                >bgColor bloqueia ❌</Button
              >
              <Button bgColor="#8b5cf6" textColor="white" variant="solid"
                >bgColor manual</Button
              >
            </div>
          </div>

          <!-- Exemplo 2: Ghost variant -->
          <div class="space-y-2">
            <p class="text-xs text-muted-foreground">Ghost variant</p>
            <div class="flex flex-wrap gap-4">
              <Button color="success" variant="ghost"
                >Hover verde automático ✅</Button
              >
              <Button bgColor="transparent" textColor="#22c55e" variant="ghost"
                >Sem hover (manual)</Button
              >
            </div>
          </div>

          <!-- Exemplo 3: Combinando props -->
          <div class="space-y-2">
            <p class="text-xs text-muted-foreground">
              Combinando color + textColor
            </p>
            <div class="flex flex-wrap gap-4">
              <Button color="primary" textColor="yellow" variant="solid"
                >Bg laranja, texto amarelo</Button
              >
              <Button color="#1e293b" textColor="#fbbf24" variant="solid"
                >Contraste customizado</Button
              >
            </div>
          </div>
        </div>
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
        <Button variant="outline" color="secondary" @click="clickCount = 0">
          Reset
        </Button>
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
        <Button
          as="a"
          href="https://github.com"
          target="_blank"
          color="primary"
        >
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
