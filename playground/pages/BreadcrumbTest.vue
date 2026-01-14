<script setup lang="ts">
import { ref } from 'vue';
import { CorpBreadcrumb } from '@/components/ui/breadcrumb';

// Items simples (strings)
const simpleItems = ref(['Home', 'Usuários', 'Perfil']);

// Items com links
const linkedItems = ref([
  { title: 'Dashboard', to: '/', icon: 'layout-dashboard' },
  { title: 'Usuários', to: '/users', icon: 'users' },
  { title: 'João Silva', icon: 'user' },
]);

// Items longos
const longItems = ref([
  { title: 'Home', to: '/' },
  { title: 'E-commerce', to: '/ecommerce' },
  { title: 'Eletrônicos', to: '/ecommerce/eletronicos' },
  { title: 'Computadores', to: '/ecommerce/eletronicos/computadores' },
  { title: 'Notebooks', to: '/ecommerce/eletronicos/computadores/notebooks' },
  { title: 'MacBook Pro 16"' },
]);
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Breadcrumb Test</h1>
      <p class="text-muted-foreground">Teste todas as variantes e recursos</p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Básico (Array de Strings)
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpBreadcrumb :items="simpleItems" />
      </div>
    </section>

    <!-- Dividers -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Dividers Customizados
      </h2>
      <div class="space-y-3">
        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">Divider: / (padrão)</p>
          <CorpBreadcrumb :items="simpleItems" divider="/" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">Divider: ></p>
          <CorpBreadcrumb :items="simpleItems" divider=">" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">Divider: • (bullet)</p>
          <CorpBreadcrumb :items="simpleItems" divider="•" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">
            Divider: chevron-right (ícone)
          </p>
          <CorpBreadcrumb :items="simpleItems" divider="chevron-right" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">
            Divider: slash (ícone)
          </p>
          <CorpBreadcrumb :items="simpleItems" divider="slash" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">Divider: dot (ícone)</p>
          <CorpBreadcrumb :items="simpleItems" divider="dot" />
        </div>
      </div>
    </section>

    <!-- Com Links e Ícones -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Com Links e Ícones</h2>
      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpBreadcrumb :items="linkedItems" divider="chevron-right" />
      </div>
    </section>

    <!-- ActiveColor -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        ActiveColor (Último Item)
      </h2>
      <div class="space-y-3">
        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">activeColor: primary</p>
          <CorpBreadcrumb :items="simpleItems" active-color="primary" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">activeColor: success</p>
          <CorpBreadcrumb :items="simpleItems" active-color="success" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">activeColor: warning</p>
          <CorpBreadcrumb :items="simpleItems" active-color="warning" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">
            activeColor: #8B4513 (custom HEX)
          </p>
          <CorpBreadcrumb :items="simpleItems" active-color="#8B4513" />
        </div>
      </div>
    </section>

    <!-- Density -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Density (Espaçamento)
      </h2>
      <div class="space-y-3">
        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">density: compact</p>
          <CorpBreadcrumb :items="simpleItems" density="compact" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">
            density: regular (padrão)
          </p>
          <CorpBreadcrumb :items="simpleItems" density="regular" />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">density: comfortable</p>
          <CorpBreadcrumb :items="simpleItems" density="comfortable" />
        </div>
      </div>
    </section>

    <!-- Disabled -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Disabled</h2>
      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpBreadcrumb :items="linkedItems" divider="chevron-right" disabled />
      </div>
    </section>

    <!-- Breadcrumb Longo -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Breadcrumb Longo (E-commerce)
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg">
        <CorpBreadcrumb :items="longItems" divider=">" active-color="primary" />
      </div>
    </section>

    <!-- Combinações Avançadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Combinações Avançadas
      </h2>
      <div class="space-y-3">
        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">
            Com ícones + divider chevron + activeColor success + density compact
          </p>
          <CorpBreadcrumb
            :items="linkedItems"
            divider="chevron-right"
            active-color="success"
            density="compact"
          />
        </div>

        <div class="p-3 bg-card border border-border rounded">
          <p class="text-xs text-muted-foreground mb-2">
            Divider dot + activeColor warning + density comfortable
          </p>
          <CorpBreadcrumb
            :items="linkedItems"
            divider="dot"
            active-color="warning"
            density="comfortable"
          />
        </div>
      </div>
    </section>
  </div>
</template>
