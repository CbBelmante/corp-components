<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-foreground mb-2">Corp Components</h1>
    <p class="text-muted-foreground mb-8">
      Playground de desenvolvimento - teste seus componentes aqui
    </p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <RouterLink
        to="/buttons"
        class="p-6 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-colors"
      >
        <h3 class="font-semibold text-foreground mb-1">Buttons</h3>
        <p class="text-sm text-muted-foreground">Testar variantes de botoes</p>
      </RouterLink>

      <!-- Adicione mais cards conforme criar componentes -->
      <div class="p-6 border border-dashed border-border rounded-lg opacity-50">
        <h3 class="font-semibold text-foreground mb-1">Input</h3>
        <p class="text-sm text-muted-foreground">Em breve...</p>
      </div>

      <div class="p-6 border border-dashed border-border rounded-lg opacity-50">
        <h3 class="font-semibold text-foreground mb-1">Select</h3>
        <p class="text-sm text-muted-foreground">Em breve...</p>
      </div>
    </div>
  </div>
</template>
