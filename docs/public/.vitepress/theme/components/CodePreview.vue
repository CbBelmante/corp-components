<script setup lang="ts">
import { ref } from 'vue';

const showCode = ref(false);
</script>

<template>
  <div class="codePreview">
    <div class="previewArea">
      <slot />
    </div>

    <div class="previewActions">
      <button class="toggleCodeBtn" @click="showCode = !showCode">
        <svg
          v-if="!showCode"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        {{ showCode ? 'Esconder Código' : 'Mostrar Código' }}
      </button>
    </div>

    <div v-show="showCode" class="codeArea">
      <slot name="code" />
    </div>
  </div>
</template>

<style scoped>
.codePreview {
  border: 1px solid var(--vp-c-divider);
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
  background: var(--vp-component-preview-bg);
}

.previewActions {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.toggleCodeBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.toggleCodeBtn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
}

.codeArea {
  border-top: 1px solid var(--vp-c-divider);
}

.codeArea :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}

.codeArea :deep(pre) {
  margin: 0;
  border-radius: 0;
}
</style>
