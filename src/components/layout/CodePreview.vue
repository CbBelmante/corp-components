<script setup lang="ts">
/**
 * 🧩 CodePreview - Preview de Componentes com Código
 *
 * Exibe componentes com toggle para mostrar/esconder código fonte.
 * Animação suave de expand/collapse.
 */
import { ref } from 'vue'
import { CorpButton } from '@components/ui/corpbutton'

const showCode = ref(false)
const copied = ref(false)
const codeAreaRef = ref<HTMLElement>()

const copyCode = async () => {
  const codeEl = codeAreaRef.value?.querySelector('pre code')
  if (!codeEl) return

  await navigator.clipboard.writeText(codeEl.textContent || '')
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="codePreview">
    <div class="previewArea">
      <slot />
    </div>

    <div class="previewActions">
      <CorpButton
        variant="ghost"
        size="sm"
        prepend-icon="luc-code"
        @click="showCode = !showCode"
      >
        {{ showCode ? 'Esconder Código' : 'Mostrar Código' }}
      </CorpButton>
    </div>

    <div class="codeAreaWrapper" :class="{ expanded: showCode }">
      <div ref="codeAreaRef" class="codeArea">
        <CorpButton
          class="copyBtn"
          variant="ghost"
          size="icon-sm"
          :prepend-icon="copied ? 'luc-check' : 'luc-copy'"
          @click="copyCode"
        />
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.codePreview {
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}

.previewArea {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: var(--vp-c-bg, #fff);
}

.previewActions {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft, #f8fafc);
  border-top: 1px solid var(--vp-c-divider, #e2e8f0);
}

/* Animação suave de expand/collapse */
.codeAreaWrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.codeAreaWrapper.expanded {
  grid-template-rows: 1fr;
}

.codeArea {
  overflow: hidden;
  position: relative;
  border-top: 1px solid var(--vp-c-divider, #e2e8f0);
}

.codeArea :deep(div[class*="language-"]) {
  margin: 0;
  border-radius: 0;
}

.codeArea :deep(pre) {
  margin: 0;
  border-radius: 0;
}

/* Esconde botão nativo do VitePress */
.codeArea :deep(button.copy) {
  display: none;
}

/* Nosso botão de copiar */
.copyBtn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s;
}

.codeArea:hover .copyBtn {
  opacity: 1;
}
</style>
