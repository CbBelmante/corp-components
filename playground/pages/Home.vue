<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { PLAYGROUND_COMPONENTS } from '../config/autoComponents';

const components = PLAYGROUND_COMPONENTS;
</script>

<template>
  <div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-foreground mb-2">Corp Components</h1>
    <p class="text-muted-foreground mb-8">
      Playground de desenvolvimento - teste seus componentes aqui
    </p>

    <!-- ✅ Cards gerados automaticamente via auto-discovery -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <RouterLink
        v-for="component in components"
        :key="component.name"
        :to="component.path"
        class="p-6 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-colors"
      >
        <h3 class="font-semibold text-foreground mb-1">
          {{ component.title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ component.description }}</p>
      </RouterLink>
    </div>
  </div>
</template>
