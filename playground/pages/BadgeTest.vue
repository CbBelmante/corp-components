<script setup lang="ts">
import { ref } from 'vue';
import { CorpBadge as Badge } from '@/components/ui/badge';

const counter = ref(42);
const maxValue = ref(99);
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Badge Test</h1>
      <p class="text-muted-foreground">Teste todas as variantes e recursos</p>
    </div>

    <!-- Variantes (Estilos Visuais) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Variantes (Estilos)</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Badge variant="solid">Solid (Default)</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Semânticas</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="destructive">Destructive</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="info">Info</Badge>
      </div>
    </section>

    <!-- Variantes + Cores -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Combinações Variant + Color
      </h2>
      <div class="space-y-3">
        <!-- Solid -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Solid</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge variant="solid" color="success">Ativo</Badge>
            <Badge variant="solid" color="destructive">Deletado</Badge>
            <Badge variant="solid" color="warning">Pendente</Badge>
            <Badge variant="solid" color="info">Info</Badge>
          </div>
        </div>

        <!-- Outline -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Outline</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge variant="outline" color="primary">Novo</Badge>
            <Badge variant="outline" color="secondary">Arquivado</Badge>
            <Badge variant="outline" color="destructive">Erro</Badge>
            <Badge variant="outline" color="success">Aprovado</Badge>
          </div>
        </div>

        <!-- Ghost -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Ghost</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge variant="ghost" color="info">Beta</Badge>
            <Badge variant="ghost" color="warning">Experimental</Badge>
            <Badge variant="ghost" color="primary">Destacado</Badge>
          </div>
        </div>
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Cores Customizadas com Hover
      </h2>

      <!-- HEX -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">HEX Colors</h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Badge color="#8B4513" variant="solid">HEX Solid</Badge>
          <Badge color="#8B4513" variant="outline">HEX Outline (hover!)</Badge>
          <Badge color="#8B4513" variant="ghost">HEX Ghost (hover!)</Badge>
          <Badge color="#B87333" variant="ghost">Cobre Ghost</Badge>
        </div>
      </div>

      <!-- RGB -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">RGB Colors</h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Badge color="rgb(139, 69, 19)" variant="solid">RGB Solid</Badge>
          <Badge color="rgb(139, 69, 19)" variant="outline">
            RGB Outline (hover!)
          </Badge>
          <Badge color="rgb(139, 69, 19)" variant="ghost">
            RGB Ghost (hover!)
          </Badge>
        </div>
      </div>

      <!-- CSS Variables -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">CSS Variables</h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Badge color="var(--info)" variant="solid">var(--info) Solid</Badge>
          <Badge color="var(--info)" variant="outline">
            var(--info) Outline (hover!)
          </Badge>
          <Badge color="var(--info)" variant="ghost">
            var(--info) Ghost (hover!)
          </Badge>
          <Badge color="var(--success)" variant="ghost">
            var(--success) Ghost
          </Badge>
        </div>
      </div>

      <!-- CSS Named Colors -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          CSS Named Colors
        </h3>
        <div
          class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
        >
          <Badge color="#6B8E23" variant="solid">Olive Solid</Badge>
          <Badge color="#6B8E23" variant="outline">
            Olive Outline (hover!)
          </Badge>
          <Badge color="#6B8E23" variant="ghost">Olive Ghost (hover!)</Badge>
          <Badge color="pink" variant="ghost">Pink Ghost</Badge>
          <Badge color="orange" variant="ghost">Orange Ghost</Badge>
          <Badge color="teal" variant="outline">Teal Outline</Badge>
        </div>
      </div>

      <!-- bgColor/contentColor Override -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          color vs bgColor/contentColor (Override)
        </h3>
        <div class="p-4 bg-card border border-border rounded-lg space-y-4">
          <!-- Exemplo 1: Hover bloqueado -->
          <div class="space-y-2">
            <p class="text-xs text-muted-foreground">
              ✅ color gera hover | ❌ bgColor bloqueia hover
            </p>
            <div class="flex flex-wrap gap-4">
              <Badge color="#8B4513" variant="solid">Color com hover ✅</Badge>
              <Badge color="#8B4513" bgColor="#8B4513" variant="solid">
                bgColor bloqueia ❌
              </Badge>
              <Badge bgColor="#8B4513" contentColor="white" variant="solid">
                bgColor manual
              </Badge>
            </div>
          </div>

          <!-- Exemplo 2: Ghost variant -->
          <div class="space-y-2">
            <p class="text-xs text-muted-foreground">Ghost variant</p>
            <div class="flex flex-wrap gap-4">
              <Badge color="success" variant="ghost">
                Hover verde automático ✅
              </Badge>
              <Badge
                bgColor="transparent"
                contentColor="#22c55e"
                variant="ghost"
              >
                Sem hover (manual)
              </Badge>
            </div>
          </div>

          <!-- Exemplo 3: Combinando props -->
          <div class="space-y-2">
            <p class="text-xs text-muted-foreground">
              Combinando color + contentColor
            </p>
            <div class="flex flex-wrap gap-4">
              <Badge color="primary" contentColor="yellow" variant="solid">
                Bg laranja, texto amarelo
              </Badge>
              <Badge color="#1e293b" contentColor="#fbbf24" variant="solid">
                Contraste customizado
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contraste Automático -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        🎯 Contraste Automático
      </h2>
      <p class="text-sm text-muted-foreground">
        O texto é calculado automaticamente (branco/preto) baseado na
        luminosidade do fundo usando a fórmula YIQ.
      </p>

      <!-- Cores Claras (texto preto) -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Cores Claras → Texto Preto
        </h3>
        <div
          class="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-lg"
        >
          <Badge color="yellow">Yellow</Badge>
          <Badge color="#FFEB3B">Amber</Badge>
          <Badge color="#E0E0E0">Gray Light</Badge>
          <Badge color="cyan">Cyan</Badge>
          <Badge color="#B2FF59">Lime</Badge>
          <Badge color="pink">Pink</Badge>
        </div>
      </div>

      <!-- Cores Escuras (texto branco) -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Cores Escuras → Texto Branco
        </h3>
        <div
          class="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-lg"
        >
          <Badge color="navy">Navy</Badge>
          <Badge color="#1E3A5F">Dark Blue</Badge>
          <Badge color="#2E7D32">Dark Green</Badge>
          <Badge color="maroon">Maroon</Badge>
          <Badge color="#4A148C">Deep Purple</Badge>
          <Badge color="black">Black</Badge>
        </div>
      </div>

      <!-- Sem color (usa defaults do tema) -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Sem color prop → Usa corp-def-badge-* do tema
        </h3>
        <div
          class="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-lg"
        >
          <Badge>Default (tema)</Badge>
          <Badge variant="outline">Outline Default</Badge>
          <Badge variant="ghost">Ghost Default</Badge>
        </div>
      </div>
    </section>

    <!-- Rounded (Border Radius) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Rounded (Border Radius)
      </h2>
      <div class="space-y-3">
        <!-- Presets -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Presets</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge rounded="none" color="primary">none</Badge>
            <Badge rounded="sm" color="primary">sm</Badge>
            <Badge rounded="default" color="primary">default (md)</Badge>
            <Badge rounded="lg" color="primary">lg</Badge>
            <Badge rounded="xl" color="primary">xl</Badge>
            <Badge rounded="full" color="primary">full</Badge>
          </div>
        </div>

        <!-- Custom Tailwind Classes -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Custom Tailwind Classes
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge rounded="rounded-none" color="success">rounded-none</Badge>
            <Badge rounded="rounded-3xl" color="success">rounded-3xl</Badge>
            <Badge rounded="rounded-full" color="success">rounded-full</Badge>
          </div>
        </div>

        <!-- Custom CSS Values -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Custom CSS Values
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge rounded="4px 16px" color="warning">Mixed</Badge>
            <Badge rounded="20px 20px 0 0" color="destructive">Top</Badge>
            <Badge rounded="0 20px 20px 0" color="secondary">Right</Badge>
          </div>
        </div>

        <!-- Exemplos Criativos -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Exemplos Criativos
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge rounded="rounded-r-full" color="primary" variant="outline">
              Tag Style
            </Badge>
            <Badge
              rounded="rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-none"
              color="success"
            >
              Ribbon
            </Badge>
            <Badge rounded="16px 16px 16px 2px" color="info">Message</Badge>
            <Badge
              rounded="2px 16px 16px 2px"
              color="warning"
              variant="outline"
            >
              Ticket
            </Badge>
            <Badge rounded="rounded-3xl" color="destructive" icon="Star">
              Sticker
            </Badge>
            <Badge
              rounded="rounded-l-full rounded-r-md"
              :content="99"
              :max="99"
              color="destructive"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Content: Slot vs Prop -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Content: Slot vs Prop
      </h2>
      <div class="space-y-3">
        <!-- Slot (default) -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Via Slot (default)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge color="primary">Badge via Slot</Badge>
            <Badge color="success">Ativo</Badge>
            <Badge color="warning">Pendente</Badge>
          </div>
        </div>

        <!-- Content Prop -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Via Prop</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge content="Badge via Prop" color="primary" />
            <Badge content="NEW" color="info" />
            <Badge :content="42" color="destructive" />
            <Badge :content="counter" color="success" />
          </div>
        </div>

        <!-- Prioridade: content prop > slot -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Prioridade: content prop > slot
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge content="Content Prop" color="primary">Slot Ignorado</Badge>
            <Badge :content="99" color="success">Slot Ignorado</Badge>
          </div>
        </div>
      </div>
    </section>

    <!-- Max (Contador 99+) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Max (Contador 99+)</h2>
      <div class="space-y-3">
        <!-- Sem max -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Sem max (mostra valor completo)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge :content="5" color="primary" />
            <Badge :content="42" color="success" />
            <Badge :content="142" color="destructive" />
            <Badge :content="999" color="warning" />
          </div>
        </div>

        <!-- Com max -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Com max (limita em 99+)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge :content="5" :max="99" color="primary" />
            <Badge :content="42" :max="99" color="success" />
            <Badge :content="99" :max="99" color="info" />
            <Badge :content="100" :max="99" color="destructive" />
            <Badge :content="142" :max="99" color="destructive" />
            <Badge :content="999" :max="99" color="warning" />
          </div>
        </div>

        <!-- Max customizado -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Max customizado (9+, 50+, etc)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge :content="5" :max="9" color="primary" />
            <Badge :content="10" :max="9" color="primary" />
            <Badge :content="42" :max="50" color="success" />
            <Badge :content="51" :max="50" color="success" />
            <Badge :content="100" :max="999" color="info" />
            <Badge :content="1000" :max="999" color="info" />
          </div>
        </div>

        <!-- Interativo -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Interativo</p>
          <div
            class="flex flex-wrap items-center gap-3 p-3 bg-card border border-border rounded"
          >
            <Badge :content="counter" :max="maxValue" color="primary" />
            <button
              @click="counter++"
              class="px-3 py-1 text-xs bg-primary text-white rounded hover:opacity-90"
            >
              Incrementar ({{ counter }})
            </button>
            <button
              @click="counter = 0"
              class="px-3 py-1 text-xs bg-secondary text-white rounded hover:opacity-90"
            >
              Reset
            </button>
            <span class="text-xs text-muted-foreground">
              (max={{ maxValue }})
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Dot (Mini Badge 9x9px) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        Dot (Mini Badge 9x9px)
      </h2>
      <div class="space-y-3">
        <!-- Básico -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Dot básico</p>
          <div
            class="flex flex-wrap items-center gap-3 p-3 bg-card border border-border rounded"
          >
            <Badge dot color="primary" />
            <Badge dot color="secondary" />
            <Badge dot color="success" />
            <Badge dot color="warning" />
            <Badge dot color="destructive" />
            <Badge dot color="info" />
          </div>
        </div>

        <!-- Com label (uso real) -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Dot com label (uso real)
          </p>
          <div class="p-3 bg-card border border-border rounded space-y-2">
            <div class="flex items-center gap-2">
              <Badge dot color="success" />
              <span class="text-sm">Online</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge dot color="warning" />
              <span class="text-sm">Ausente</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge dot color="destructive" />
              <span class="text-sm">Offline</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge dot color="info" />
              <span class="text-sm">Em reunião</span>
            </div>
          </div>
        </div>

        <!-- Dot com animação -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Dot com animação
          </p>
          <div
            class="flex flex-wrap items-center gap-3 p-3 bg-card border border-border rounded"
          >
            <Badge dot color="success" animation="pulse" />
            <Badge dot color="warning" animation="ping" />
            <Badge dot color="destructive" animation="pulse" />
            <Badge dot color="info" animation="ping" animationSpeed="slow" />
          </div>
        </div>
      </div>
    </section>

    <!-- Icon -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Ícones</h2>
      <div class="space-y-3">
        <!-- Icon Left (default) -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Icon Left (default)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge icon="Check" color="success">Aprovado</Badge>
            <Badge icon="X" color="destructive">Rejeitado</Badge>
            <Badge icon="Clock" color="warning">Pendente</Badge>
            <Badge icon="Info" color="info">Informação</Badge>
            <Badge icon="Star" color="primary">Destaque</Badge>
          </div>
        </div>

        <!-- Icon Right -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Icon Right</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge icon="Check" iconPosition="right" color="success">
              Aprovado
            </Badge>
            <Badge icon="X" iconPosition="right" color="destructive">
              Rejeitado
            </Badge>
            <Badge icon="ArrowRight" iconPosition="right" color="primary">
              Próximo
            </Badge>
          </div>
        </div>

        <!-- Icon Size -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Icon Size</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge icon="Star" :iconSize="12" color="primary">
              Small (12px)
            </Badge>
            <Badge icon="Star" :iconSize="14" color="primary">
              Default (14px)
            </Badge>
            <Badge icon="Star" :iconSize="16" color="primary">
              Large (16px)
            </Badge>
          </div>
        </div>

        <!-- Icon Only (sem texto) -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Icon Only (sem texto)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge icon="Check" color="success" />
            <Badge icon="X" color="destructive" />
            <Badge icon="AlertTriangle" color="warning" />
            <Badge icon="Info" color="info" />
          </div>
        </div>
      </div>
    </section>

    <!-- Opacity -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Opacity</h2>
      <div
        class="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-lg"
      >
        <Badge color="primary" :opacity="100">100%</Badge>
        <Badge color="primary" :opacity="90">90% (default)</Badge>
        <Badge color="primary" :opacity="75">75%</Badge>
        <Badge color="primary" :opacity="50">50%</Badge>
        <Badge color="primary" :opacity="25">25%</Badge>
        <Badge color="success" :opacity="80">Success 80%</Badge>
        <Badge color="destructive" :opacity="60">Destructive 60%</Badge>
      </div>
    </section>

    <!-- Animações -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Animações</h2>
      <div class="space-y-3">
        <!-- Tipos de animação -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Tipos (velocidade normal)
          </p>
          <div
            class="flex flex-wrap gap-3 p-3 bg-card border border-border rounded"
          >
            <Badge animation="pulse" color="primary">Pulse</Badge>
            <Badge animation="bounce" color="success">Bounce</Badge>
            <Badge animation="spin" color="info">Spin</Badge>
            <Badge animation="ping" color="warning">Ping</Badge>
          </div>
        </div>

        <!-- Velocidades -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Velocidades</p>
          <div
            class="flex flex-wrap gap-3 p-3 bg-card border border-border rounded"
          >
            <Badge animation="pulse" animationSpeed="slow" color="primary">
              Pulse Slow
            </Badge>
            <Badge animation="pulse" animationSpeed="normal" color="primary">
              Pulse Normal
            </Badge>
            <Badge animation="pulse" animationSpeed="fast" color="primary">
              Pulse Fast
            </Badge>
          </div>
        </div>

        <!-- Uso real: Status indicators -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Uso real: Status indicators
          </p>
          <div class="p-3 bg-card border border-border rounded space-y-2">
            <div class="flex items-center gap-2">
              <Badge
                dot
                color="success"
                animation="pulse"
                animationSpeed="slow"
              />
              <span class="text-sm">Online</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge
                animation="ping"
                color="warning"
                content="3"
                :max="9"
                rounded="full"
              />
              <span class="text-sm">Notificações</span>
            </div>
            <div class="flex items-center gap-2">
              <Badge
                icon="AlertTriangle"
                animation="bounce"
                color="destructive"
              >
                Erro Crítico
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos de Uso Reais -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Casos de Uso Reais</h2>
      <div class="space-y-3">
        <!-- Status de pedido -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Status de Pedido
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge icon="Clock" color="warning">Pendente</Badge>
            <Badge icon="Package" color="info">Em Separação</Badge>
            <Badge icon="Truck" color="primary">Em Trânsito</Badge>
            <Badge icon="Check" color="success">Entregue</Badge>
            <Badge icon="X" color="destructive">Cancelado</Badge>
          </div>
        </div>

        <!-- Categorias -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Categorias</p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge variant="outline" color="primary">JavaScript</Badge>
            <Badge variant="outline" color="success">Vue.js</Badge>
            <Badge variant="outline" color="info">TypeScript</Badge>
            <Badge variant="outline" color="warning">CSS</Badge>
            <Badge variant="outline" color="secondary">HTML</Badge>
          </div>
        </div>

        <!-- Notificações -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">Notificações</p>
          <div class="p-3 bg-card border border-border rounded space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm">Mensagens</span>
              <Badge :content="5" color="primary" rounded="full" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Notificações</span>
              <Badge
                :content="142"
                :max="99"
                color="destructive"
                rounded="full"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Atualizações</span>
              <Badge content="NEW" color="success" animation="pulse" />
            </div>
          </div>
        </div>

        <!-- Chips removíveis (Select) -->
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground font-medium">
            Chips Removíveis (Select)
          </p>
          <div
            class="flex flex-wrap gap-2 p-3 bg-card border border-border rounded"
          >
            <Badge variant="solid" :opacity="85" color="primary" class="gap-1">
              JavaScript
              <button class="hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
            <Badge variant="solid" :opacity="85" color="success" class="gap-1">
              Vue.js
              <button class="hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
            <Badge variant="solid" :opacity="85" color="info" class="gap-1">
              TypeScript
              <button class="hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
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
