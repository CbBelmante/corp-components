<script setup lang="ts">
/**
 * 🧩 CodePreview - Preview de Componentes com Código
 *
 * Componente moderno para exibir exemplos de código com tabs, preview e copy.
 * Suporta múltiplos arquivos, package managers, e SFC separado.
 *
 * 🔗 DEPENDÊNCIAS:
 * - CorpButton
 * - CorpIcon
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { ref, computed, type PropType } from 'vue';

// ============== DEPENDÊNCIAS INTERNAS ==============
import { CorpButton } from '@components/ui/corpbutton';
import { CorpIcon } from '@components/ui/icon';

// ============== TIPOS ==============

interface ICodeTab {
  name: string; // Nome da tab
  icon?: string; // Ícone lucide (opcional)
  language?: string; // Linguagem do código (opcional)
}

interface ICodePreviewConfig {
  preview?: boolean; // Mostrar preview (default: true)
  tabs?: string[] | ICodeTab[]; // Tabs de código
  language?: string; // Language badge global
  copyable?: boolean; // Botão copy (default: true)
  title?: string; // Título opcional
  defaultTab?: number; // Index da tab inicial (default: 0)
  hideHeader?: boolean; // Forçar esconder header (default: false)
}

// ============== PROPS ==============

const props = defineProps({
  config: {
    type: Object as PropType<ICodePreviewConfig>,
    default: () => ({}),
  },
});

// ============== STATE ==============

const showCode = ref(false);
const activeTab = ref(0);
const prevTab = ref(0); // Para determinar direção da animação
const copied = ref(false);
const codeAreaRef = ref<HTMLElement>();

// ============== COMPUTED ==============

// Merge com defaults
const cfg = computed<Required<ICodePreviewConfig> & { tabs: ICodeTab[] }>(
  () => ({
    preview: props.config?.preview ?? true,
    tabs: normalizedTabs.value,
    language: props.config?.language ?? '',
    copyable: props.config?.copyable ?? true,
    title: props.config?.title ?? '',
    defaultTab: props.config?.defaultTab ?? 0,
    hideHeader: props.config?.hideHeader ?? false,
  })
);

// Determinar se header deve aparecer
const showHeader = computed(() => {
  if (cfg.value.hideHeader) return false;
  return !!(cfg.value.title || cfg.value.language);
});

// Direção da animação (next = avançar, prev = voltar)
const slideDirection = computed(() => {
  return activeTab.value > prevTab.value ? 'next' : 'prev';
});

// Normalizar tabs para ICodeTab[]
const normalizedTabs = computed<ICodeTab[]>(() => {
  const tabs = props.config?.tabs ?? [];
  if (!tabs.length) return [];

  return tabs.map(tab => {
    if (typeof tab === 'string') {
      return {
        name: tab,
        icon: undefined,
        language: undefined,
      };
    }
    return tab;
  });
});

// ============== MÉTODOS ==============

const switchTab = (idx: number) => {
  prevTab.value = activeTab.value;
  activeTab.value = idx;
};

const copyCode = async () => {
  let codeEl: Element | null | undefined;

  if (cfg.value.tabs.length > 0) {
    // Com tabs: copiar tab ativa
    const tabSlots = codeAreaRef.value?.querySelectorAll('[data-tab-content]');
    codeEl = tabSlots?.[activeTab.value]?.querySelector('pre code');
  } else {
    // Sem tabs: copiar código único
    codeEl = codeAreaRef.value?.querySelector('pre code');
  }

  if (!codeEl?.textContent) return;

  await navigator.clipboard.writeText(codeEl.textContent);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

// ============== LIFECYCLE ==============

// Setar tab padrão ao montar
if (props.config?.defaultTab !== undefined) {
  activeTab.value = props.config.defaultTab;
}
</script>

<template>
  <div class="codePreview">
    <!-- Header com título e language badge -->
    <div v-if="showHeader" class="previewHeader">
      <span v-if="cfg.title" class="previewTitle">{{ cfg.title }}</span>
      <span v-if="cfg.language" class="languageBadge">{{ cfg.language }}</span>
    </div>

    <!-- Preview Area -->
    <div v-if="cfg.preview" class="previewArea">
      <slot />
    </div>

    <!-- Actions -->
    <div class="previewActions">
      <CorpButton
        variant="ghost"
        size="icon-sm"
        prepend-icon="luc-code"
        @click="showCode = !showCode"
      />
    </div>

    <!-- Code Area -->
    <div class="codeAreaWrapper" :class="{ expanded: showCode }">
      <div ref="codeAreaRef" class="codeArea">
        <!-- Tabs (se houver) -->
        <div v-if="cfg.tabs.length > 0" class="codeTabs">
          <button
            v-for="(tab, idx) in cfg.tabs"
            :key="idx"
            class="codeTab"
            :class="{ active: activeTab === idx }"
            @click="switchTab(idx)"
          >
            <CorpIcon v-if="tab.icon" :name="tab.icon" size="small" start />
            <span>{{ tab.name }}</span>
          </button>
        </div>

        <!-- Copy Button -->
        <CorpButton
          v-if="cfg.copyable"
          class="copyBtn"
          variant="ghost"
          size="icon-sm"
          :prepend-icon="copied ? 'luc-check' : 'luc-copy'"
          @click="copyCode"
        />

        <!-- Code Content -->
        <div v-if="cfg.tabs.length > 0" class="codeContent">
          <TransitionGroup
            :name="`slide-${slideDirection}`"
            mode="out-in"
            tag="div"
            class="codeTransition"
          >
            <div
              v-for="(tab, idx) in cfg.tabs"
              v-show="activeTab === idx"
              :key="idx"
              data-tab-content
              class="tabContent"
            >
              <slot :name="`code-${tab.name}`" />
            </div>
          </TransitionGroup>
        </div>
        <div v-else class="codeContent">
          <slot name="code" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.codePreview {
  border: 1px solid var(--code-preview-border);
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
  background: var(--code-preview-bg);
  box-shadow: var(--code-preview-shadow);
}

/* Header */
.previewHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: var(--code-preview-header-bg);
  border-bottom: 1px solid var(--code-preview-border);
}

.previewTitle {
  font-size: 14px;
  font-weight: 600;
  color: var(--code-preview-title-text);
}

.languageBadge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--code-preview-badge-bg);
  color: var(--code-preview-badge-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Preview Area */
.previewArea {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 24px;
  background: var(--code-preview-preview-bg);
  border-bottom: 1px solid var(--code-preview-border);
}

/* Actions */
.previewActions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 16px;
  background: var(--code-preview-actions-bg);
}

/* Code Area Wrapper - Animação */
.codeAreaWrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
  background: var(--code-preview-preview-bg);
}

.codeAreaWrapper.expanded {
  grid-template-rows: 1fr;
}

.codeArea {
  overflow: hidden;
  position: relative;
}

/* Tabs */
.codeTabs {
  display: flex;
  gap: 2px;
  padding: 12px 16px 0 16px;
  background: transparent;
  overflow-x: auto;
  scrollbar-width: none;
}

.codeTabs::-webkit-scrollbar {
  display: none;
}

.codeTab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--code-preview-tab-text);
  background: transparent;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
}

.codeTab:hover {
  background: var(--code-preview-tab-hover-bg);
  color: var(--code-preview-title-text);
}

.codeTab.active {
  background: var(--code-preview-tab-active-bg);
  color: var(--code-preview-tab-active-text);
  font-weight: 600;
}

.codeTab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--code-preview-tab-indicator);
  border-radius: 2px 2px 0 0;
}

/* Code Content */
.codeContent {
  background: var(--code-preview-code-bg);
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

.codeContent :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  background: var(--code-preview-code-bg) !important;
}

.codeContent :deep(pre) {
  margin: 0;
  border-radius: 0;
  padding: 20px !important;
}

/* Esconde botão nativo do VitePress */
.codeContent :deep(button.copy) {
  display: none;
}

/* Copy Button */
.copyBtn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s;
  background: var(--code-preview-copy-btn-bg) !important;
  border: 1px solid var(--code-preview-copy-btn-border) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.codeArea:hover .copyBtn {
  opacity: 1;
}

/* Quando há tabs, ajustar posição do copy button */
.codeTabs ~ .copyBtn {
  top: 56px;
}

/* Code Transition Wrapper */
.codeTransition {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.tabContent {
  width: 100%;
}

/* Animações - Slide Next (avançar: direita → esquerda) */
.slide-next-enter-active,
.slide-next-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.25s ease-out;
}

.slide-next-enter-active {
  position: relative;
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Animações - Slide Prev (voltar: esquerda → direita) */
.slide-prev-enter-active,
.slide-prev-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.25s ease-out;
}

.slide-prev-enter-active {
  position: relative;
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
