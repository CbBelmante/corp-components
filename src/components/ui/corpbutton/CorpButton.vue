<script setup lang="ts">
/**
 * 🧩 CorpButton - Botão com ícones e loading
 *
 * Props declarativas para ícones (prependIcon/appendIcon) e loading state.
 *
 * 🔗 DEPENDÊNCIAS:
 * - CorpIcon
 * - reka-ui Primitive
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { Primitive } from "reka-ui"

// ============== DEPENDÊNCIAS INTERNAS ==============
import { computed, useSlots, type PropType } from "vue"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariants } from "."
import CorpIcon from "@components/ui/icon/CorpIcon.vue"

// ============== TIPOS ==============

type RoundedPreset = 'default' | 'none' | 'sm' | 'lg' | 'xl' | 'full'
const roundedPresets: RoundedPreset[] = ['default', 'none', 'sm', 'lg', 'xl', 'full']

// ============== PROPS ==============

const props = defineProps({
  // CVA Variants
  variant: {
    type: String as PropType<ButtonVariants["variant"]>,
    default: "default",
  },
  size: {
    type: String as PropType<ButtonVariants["size"]>,
    default: "default",
  },
  rounded: {
    // Aceita presets (default, none, sm, lg, xl, full) OU valores custom (rounded-3xl, 10px, etc)
    type: String,
    default: "default",
  },

  // Layout Props
  block: {
    type: Boolean,
    default: false,
  },
  stacked: {
    type: Boolean,
    default: false,
  },

  // Primitive Props
  as: {
    type: [String, Object] as PropType<string | object>,
    default: "button",
  },
  asChild: {
    type: Boolean,
    default: false,
  },

  // Estados
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  // ============== PROPS DE ÍCONES ==============

  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  iconSize: {
    // Override do tamanho automático (herda do texto por default)
    type: [Number, String],
    default: undefined,
  },

  // HTML
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },

  // Class override
  class: {
    type: [String, Object, Array] as PropType<string | object | unknown[]>,
    default: undefined,
  },
})

// ============== SLOTS ==============

const slots = useSlots()

// ============== COMPUTED ==============

const isDisabled = computed(() => props.disabled || props.loading)

const showPrependSlot = computed(() => !!slots.prepend)
const showPrependIcon = computed(() => {
  if (showPrependSlot.value) return false
  return props.loading || !!props.prependIcon
})

const showAppendSlot = computed(() => !!slots.append)
const showAppendIcon = computed(() => {
  if (showAppendSlot.value) return false
  if (props.loading) return false
  return !!props.appendIcon
})

const currentPrependIcon = computed(() => {
  if (props.loading) return "luc-loader-2"
  return props.prependIcon
})

// Verifica se rounded é preset ou custom
const isRoundedPreset = computed(() => roundedPresets.includes(props.rounded as RoundedPreset))

// Classes custom de rounded (quando não é preset)
const customRoundedClass = computed(() => {
  if (isRoundedPreset.value) return ''
  // Se começa com "rounded", é classe Tailwind
  if (props.rounded.startsWith('rounded')) return props.rounded
  // Senão, assume que é valor CSS (será aplicado via style)
  return ''
})

// Style custom de rounded (quando é valor CSS tipo "10px", "1rem")
const customRoundedStyle = computed(() => {
  if (isRoundedPreset.value) return {}
  if (props.rounded.startsWith('rounded')) return {}
  return { borderRadius: props.rounded }
})

const buttonClasses = computed(() => {
  return cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
      rounded: isRoundedPreset.value ? props.rounded as RoundedPreset : undefined,
      block: props.block,
      stacked: props.stacked,
    }),
    customRoundedClass.value,
    props.class
  )
})

// Tamanho do ícone: prop > default (1em herda do texto)
const computedIconSize = computed(() => props.iconSize || "1em")
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :type="type"
    :disabled="isDisabled"
    :class="buttonClasses"
    :style="customRoundedStyle"
  >
    <!-- Prepend: Slot > Loading/Icon -->
    <slot name="prepend">
      <CorpIcon
        v-if="showPrependIcon && currentPrependIcon"
        :name="currentPrependIcon"
        :size="computedIconSize"
      />
    </slot>

    <!-- Conteúdo principal -->
    <slot />

    <!-- Append: Slot > Icon -->
    <slot name="append">
      <CorpIcon
        v-if="showAppendIcon && appendIcon"
        :name="appendIcon"
        :size="computedIconSize"
      />
    </slot>
  </Primitive>
</template>
