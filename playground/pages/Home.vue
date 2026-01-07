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

      <RouterLink
        to="/inputs"
        class="p-6 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-colors"
      >
        <h3 class="font-semibold text-foreground mb-1">Inputs</h3>
        <p class="text-sm text-muted-foreground">
          Testar inputs com validacao e mascaras
        </p>
      </RouterLink>

      <RouterLink
        to="/selects"
        class="p-6 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-colors"
      >
        <h3 class="font-semibold text-foreground mb-1">Selects</h3>
        <p class="text-sm text-muted-foreground">
          Testar selects com multiple, chips e validacao
        </p>
      </RouterLink>
    </div>
  </div>
</template>
