<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "../../../lib/utils"
import { CorpInput } from '../input'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CorpInput
    name="sidebar-input"
    data-sidebar="input"
    :class="cn(
      'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
      props.class,
    )"
  />
</template>
