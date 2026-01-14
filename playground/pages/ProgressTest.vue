<script setup lang="ts">
import { ref } from 'vue';
import { CorpProgressBar } from '@/components/ui/progress';

// ============== STATE ==============
const progress1 = ref(50);
const progress2 = ref(30);
const clickableProgress = ref(50);
const downloadProgress = ref(55);
const bufferProgress = ref(80);
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Progress Test</h1>
      <p class="text-muted-foreground">Teste todos os estados e features</p>
    </div>

    <!-- Básico -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Básico</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Progresso: {{ progress1 }}%</span>
            <input
              v-model.number="progress1"
              type="range"
              min="0"
              max="100"
              class="ml-4 flex-1"
            />
          </div>
          <CorpProgressBar :model-value="progress1" />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">Valores diferentes</p>
          <CorpProgressBar :model-value="30" />
          <CorpProgressBar :model-value="60" />
          <CorpProgressBar :model-value="100" />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">
            Com max customizado (75/150 = 50%)
          </p>
          <CorpProgressBar :model-value="75" :max="150" />
        </div>
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Primary</p>
          <CorpProgressBar :model-value="60" color="primary" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Success</p>
          <CorpProgressBar :model-value="60" color="success" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Warning</p>
          <CorpProgressBar :model-value="60" color="warning" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Destructive</p>
          <CorpProgressBar :model-value="60" color="destructive" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Info</p>
          <CorpProgressBar :model-value="60" color="info" />
        </div>
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Customizadas</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Marrom (#8B4513)</p>
          <CorpProgressBar :model-value="60" color="#8B4513" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Cobre (#B87333)</p>
          <CorpProgressBar :model-value="60" color="#B87333" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Cyan (#06b6d4)</p>
          <CorpProgressBar :model-value="60" color="#06b6d4" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Orange (#f97316)</p>
          <CorpProgressBar :model-value="60" color="#f97316" />
        </div>
      </div>
    </section>

    <!-- Height -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Height</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Compact (h-1)</p>
          <CorpProgressBar :model-value="60" height="compact" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Regular (h-2) - padrão</p>
          <CorpProgressBar :model-value="60" height="regular" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Comfortable (h-3)</p>
          <CorpProgressBar :model-value="60" height="comfortable" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Custom (8px)</p>
          <CorpProgressBar :model-value="60" :height="8" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Custom (16px)</p>
          <CorpProgressBar :model-value="60" :height="16" />
        </div>
      </div>
    </section>

    <!-- Rounded -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Rounded</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">None</p>
          <CorpProgressBar :model-value="60" rounded="none" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Small</p>
          <CorpProgressBar :model-value="60" rounded="sm" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Medium</p>
          <CorpProgressBar :model-value="60" rounded="md" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Large</p>
          <CorpProgressBar :model-value="60" rounded="lg" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Full (padrão)</p>
          <CorpProgressBar :model-value="60" rounded="full" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Custom (8px)</p>
          <CorpProgressBar :model-value="60" :rounded="8" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Boolean (false = none)</p>
          <CorpProgressBar :model-value="60" :rounded="false" />
        </div>
      </div>
    </section>

    <!-- Animações: Indeterminate -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Animações: Indeterminate
      </h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Indeterminate (loading infinito)</p>
          <CorpProgressBar indeterminate />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Indeterminate - Success</p>
          <CorpProgressBar indeterminate color="success" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Indeterminate - Marrom</p>
          <CorpProgressBar indeterminate color="#8B4513" />
        </div>
      </div>
    </section>

    <!-- Animações: Striped -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Animações: Striped</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Striped - Primary</p>
          <CorpProgressBar :model-value="60" striped />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Striped - Success</p>
          <CorpProgressBar :model-value="60" striped color="success" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Striped - Warning</p>
          <CorpProgressBar :model-value="60" striped color="warning" />
        </div>
      </div>
    </section>

    <!-- Animações: Stream -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Animações: Stream</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Stream - Primary</p>
          <CorpProgressBar :model-value="60" stream />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Stream - Info</p>
          <CorpProgressBar :model-value="60" stream color="info" />
        </div>
      </div>
    </section>

    <!-- Buffer -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Buffer</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between text-sm mb-2">
            <span>Download: {{ downloadProgress }}%</span>
            <span>Buffer: {{ bufferProgress }}%</span>
          </div>
          <div class="space-y-2">
            <input
              v-model.number="downloadProgress"
              type="range"
              min="0"
              max="100"
              class="w-full"
            />
            <input
              v-model.number="bufferProgress"
              type="range"
              min="0"
              max="100"
              class="w-full"
            />
          </div>
          <CorpProgressBar
            :model-value="downloadProgress"
            :buffer-value="bufferProgress"
            stream
            color="info"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Buffer com cor customizada</p>
          <CorpProgressBar
            :model-value="30"
            :buffer-value="60"
            buffer-color="#8B4513"
          />
        </div>
      </div>
    </section>

    <!-- Chunks -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Chunks</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">5 chunks</p>
          <CorpProgressBar :model-value="60" :chunk-count="5" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">10 chunks - Success</p>
          <CorpProgressBar
            :model-value="75"
            :chunk-count="10"
            color="success"
          />
        </div>
        <div class="space-y-2">
          <p class="text-sm">8 chunks com gap customizado (8px)</p>
          <CorpProgressBar :model-value="40" :chunk-count="8" :chunk-gap="8" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">6 chunks com largura customizada (40px)</p>
          <CorpProgressBar
            :model-value="50"
            :chunk-count="6"
            :chunk-width="40"
          />
        </div>
      </div>
    </section>

    <!-- Clickable -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Clickable</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm mb-2">
            Clique na barra para mudar o valor: {{ clickableProgress }}%
          </p>
          <CorpProgressBar v-model="clickableProgress" clickable />
        </div>
        <div class="space-y-2">
          <p class="text-sm mb-2">Clickable com chunks</p>
          <CorpProgressBar
            :model-value="progress2"
            clickable
            :chunk-count="10"
            color="success"
            @update:model-value="val => (progress2 = val)"
          />
        </div>
      </div>
    </section>

    <!-- Opacidades -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Opacidades</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Bar opacity (0.5)</p>
          <CorpProgressBar :model-value="60" :opacity="0.5" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Background opacity (0.1)</p>
          <CorpProgressBar :model-value="60" :bg-opacity="0.1" />
        </div>
        <div class="space-y-2">
          <p class="text-sm">Buffer opacity (0.3)</p>
          <CorpProgressBar
            :model-value="40"
            :buffer-value="70"
            :buffer-opacity="0.3"
          />
        </div>
      </div>
    </section>

    <!-- Slot Default -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Slot Default</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-4">
        <div class="space-y-2">
          <p class="text-sm">Com porcentagem dentro</p>
          <CorpProgressBar :model-value="60" :height="24">
            <template #default="{ value }">
              <div
                class="flex items-center justify-center h-full text-xs font-medium text-white"
              >
                {{ value }}%
              </div>
            </template>
          </CorpProgressBar>
        </div>
        <div class="space-y-2">
          <p class="text-sm">Com texto customizado</p>
          <CorpProgressBar :model-value="75" :height="32" color="success">
            <template #default="{ value }">
              <div
                class="flex items-center justify-center h-full text-sm font-bold text-white"
              >
                Progresso: {{ value }}%
              </div>
            </template>
          </CorpProgressBar>
        </div>
      </div>
    </section>

    <!-- Exemplos Avançados -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Exemplos Avançados</h2>
      <div class="p-4 bg-card border border-border rounded-lg space-y-6">
        <div class="space-y-2">
          <p class="text-sm font-medium mb-2">Upload com porcentagem</p>
          <CorpProgressBar :model-value="45" :height="28" color="success">
            <template #default="{ value }">
              <div
                class="flex items-center justify-center h-full text-xs font-bold text-white"
              >
                {{ value }}% completo
              </div>
            </template>
          </CorpProgressBar>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-medium mb-2">Skill Bars</p>
          <div>
            <p class="text-sm mb-2">Vue.js</p>
            <CorpProgressBar
              :model-value="90"
              :chunk-count="10"
              color="success"
            />
          </div>
          <div>
            <p class="text-sm mb-2">TypeScript</p>
            <CorpProgressBar
              :model-value="80"
              :chunk-count="10"
              color="#3178c6"
            />
          </div>
          <div>
            <p class="text-sm mb-2">Tailwind CSS</p>
            <CorpProgressBar
              :model-value="95"
              :chunk-count="10"
              color="#06b6d4"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Sandbox -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Sandbox</h2>
      <div class="p-4 border border-dashed border-border rounded-lg min-h-32">
        <p class="text-muted-foreground text-sm mb-4">
          Adicione seus testes aqui...
        </p>
        <!-- Adicione componentes para testar -->
      </div>
    </section>
  </div>
</template>
