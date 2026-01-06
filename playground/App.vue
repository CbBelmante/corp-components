<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b border-border bg-card">
      <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center gap-6">
          <h1 class="text-xl font-bold text-foreground">Playground</h1>
          <nav class="flex gap-4">
            <RouterLink
              to="/"
              class="text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-primary font-medium"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/buttons"
              class="text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-primary font-medium"
            >
              Buttons
            </RouterLink>
            <RouterLink
              to="/inputs"
              class="text-muted-foreground hover:text-foreground transition-colors"
              active-class="text-primary font-medium"
            >
              Inputs
            </RouterLink>
          </nav>
        </div>
        <a
          href="http://localhost:5174"
          target="_blank"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Docs
        </a>
      </div>
    </header>

    <!-- Content -->
    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>
