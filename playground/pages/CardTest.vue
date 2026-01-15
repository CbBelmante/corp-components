<script setup lang="ts">
import { ref } from 'vue';
import { CorpCard as Card } from '@/components/ui/card';
import { CorpButton as Button } from '@/components/ui/button';
import { CorpBadge as Badge } from '@/components/ui/badge';

const isLoading = ref(false);

const toggleLoading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="max-w-6xl space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-2">Card Test</h1>
      <p class="text-muted-foreground">
        Teste todas as variantes e recursos do CorpCard
      </p>
    </div>

    <!-- Variantes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Variantes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          variant="elevated"
          title="Elevated"
          subtitle="Com sombra (padrão)"
        >
          <p class="text-sm text-muted-foreground">
            Card com sombra e fundo sólido.
          </p>
        </Card>

        <Card variant="flat" title="Flat" subtitle="Sem sombra">
          <p class="text-sm text-muted-foreground">
            Card sem sombra, fundo sólido.
          </p>
        </Card>

        <Card variant="outlined" title="Outlined" subtitle="Apenas borda">
          <p class="text-sm text-muted-foreground">
            Card só com borda, fundo transparente.
          </p>
        </Card>

        <Card
          variant="tonal"
          color="primary"
          title="Tonal"
          subtitle="Fundo suave"
        >
          <p class="text-sm text-muted-foreground">
            Card com fundo suave da cor.
          </p>
        </Card>
      </div>
    </section>

    <!-- Density -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Density</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card density="compact" title="Compact" subtitle="Padding reduzido">
          <p class="text-sm text-muted-foreground">Conteúdo compacto.</p>
          <template #actions>
            <Button size="sm">Ação</Button>
          </template>
        </Card>

        <Card density="regular" title="Regular" subtitle="Padding padrão">
          <p class="text-sm text-muted-foreground">Conteúdo regular.</p>
          <template #actions>
            <Button size="sm">Ação</Button>
          </template>
        </Card>

        <Card
          density="comfortable"
          title="Comfortable"
          subtitle="Padding maior"
        >
          <p class="text-sm text-muted-foreground">Conteúdo espaçoso.</p>
          <template #actions>
            <Button size="sm">Ação</Button>
          </template>
        </Card>
      </div>
    </section>

    <!-- Elevation -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Elevation</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card elevation="none" title="None">
          <p class="text-xs text-muted-foreground">Sem sombra</p>
        </Card>
        <Card elevation="sm" title="SM">
          <p class="text-xs text-muted-foreground">Sombra pequena</p>
        </Card>
        <Card elevation="md" title="MD">
          <p class="text-xs text-muted-foreground">Sombra média</p>
        </Card>
        <Card elevation="lg" title="LG">
          <p class="text-xs text-muted-foreground">Sombra grande</p>
        </Card>
        <Card elevation="xl" title="XL">
          <p class="text-xs text-muted-foreground">Sombra extra</p>
        </Card>
      </div>
    </section>

    <!-- Cores Semânticas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores (Tonal)</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card variant="tonal" color="primary" title="Primary">
          <p class="text-xs">Cor primária</p>
        </Card>
        <Card variant="tonal" color="secondary" title="Secondary">
          <p class="text-xs">Cor secundária</p>
        </Card>
        <Card variant="tonal" color="success" title="Success">
          <p class="text-xs">Sucesso</p>
        </Card>
        <Card variant="tonal" color="warning" title="Warning">
          <p class="text-xs">Aviso</p>
        </Card>
        <Card variant="tonal" color="destructive" title="Destructive">
          <p class="text-xs">Erro</p>
        </Card>
        <Card variant="tonal" color="info" title="Info">
          <p class="text-xs">Informação</p>
        </Card>
      </div>
    </section>

    <!-- Cores (Outlined) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores (Outlined)</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card variant="outlined" color="primary" title="Primary">
          <p class="text-xs text-muted-foreground">Borda primária</p>
        </Card>
        <Card variant="outlined" color="secondary" title="Secondary">
          <p class="text-xs text-muted-foreground">Borda secundária</p>
        </Card>
        <Card variant="outlined" color="success" title="Success">
          <p class="text-xs text-muted-foreground">Borda sucesso</p>
        </Card>
        <Card variant="outlined" color="warning" title="Warning">
          <p class="text-xs text-muted-foreground">Borda aviso</p>
        </Card>
        <Card variant="outlined" color="destructive" title="Destructive">
          <p class="text-xs text-muted-foreground">Borda erro</p>
        </Card>
        <Card variant="outlined" color="info" title="Info">
          <p class="text-xs text-muted-foreground">Borda info</p>
        </Card>
      </div>
    </section>

    <!-- Cores Customizadas -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Cores Customizadas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="tonal" color="#8B4513" title="HEX Color">
          <p class="text-sm">Cor #8B4513 (marrom)</p>
        </Card>
        <Card variant="outlined" borderColor="#B87333" title="Border Custom">
          <p class="text-sm text-muted-foreground">Borda cobre</p>
        </Card>
        <Card bgColor="#1e293b" textColor="#fbbf24" title="Bg + Text">
          <p class="text-sm">Background e texto customizados</p>
        </Card>
      </div>
    </section>

    <!-- Contraste Automático -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">
        🎯 Contraste Automático
      </h2>
      <p class="text-sm text-muted-foreground">
        Para variants elevated/flat, o texto é calculado automaticamente
        (branco/preto) baseado na luminosidade do fundo.
      </p>

      <!-- Elevated/Flat com cores claras (texto preto) -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Elevated com Cores Claras → Texto Preto
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card variant="elevated" color="yellow" title="Yellow">
            <p class="text-xs">Texto preto automático</p>
          </Card>
          <Card variant="elevated" color="#FFEB3B" title="Amber">
            <p class="text-xs">Texto preto automático</p>
          </Card>
          <Card variant="elevated" color="cyan" title="Cyan">
            <p class="text-xs">Texto preto automático</p>
          </Card>
          <Card variant="elevated" color="#B2FF59" title="Lime">
            <p class="text-xs">Texto preto automático</p>
          </Card>
          <Card variant="elevated" color="pink" title="Pink">
            <p class="text-xs">Texto preto automático</p>
          </Card>
          <Card variant="elevated" color="#E0E0E0" title="Gray">
            <p class="text-xs">Texto preto automático</p>
          </Card>
        </div>
      </div>

      <!-- Elevated/Flat com cores escuras (texto branco) -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Elevated com Cores Escuras → Texto Branco
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card variant="elevated" color="navy" title="Navy">
            <p class="text-xs">Texto branco automático</p>
          </Card>
          <Card variant="elevated" color="#1E3A5F" title="Dark Blue">
            <p class="text-xs">Texto branco automático</p>
          </Card>
          <Card variant="elevated" color="#2E7D32" title="Dark Green">
            <p class="text-xs">Texto branco automático</p>
          </Card>
          <Card variant="elevated" color="maroon" title="Maroon">
            <p class="text-xs">Texto branco automático</p>
          </Card>
          <Card variant="elevated" color="#4A148C" title="Deep Purple">
            <p class="text-xs">Texto branco automático</p>
          </Card>
          <Card variant="elevated" color="black" title="Black">
            <p class="text-xs">Texto branco automático</p>
          </Card>
        </div>
      </div>

      <!-- Comparação: Elevated vs Tonal vs Outlined -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Comparação: Elevated vs Tonal vs Outlined (mesma cor)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="elevated" color="navy" title="Elevated">
            <p class="text-xs">Fundo sólido navy, texto branco (contraste)</p>
          </Card>
          <Card variant="tonal" color="navy" title="Tonal">
            <p class="text-xs">Fundo navy/10%, texto navy</p>
          </Card>
          <Card variant="outlined" color="navy" title="Outlined">
            <p class="text-xs">Borda navy, texto navy</p>
          </Card>
        </div>
      </div>

      <!-- Sem color (usa defaults do tema) -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-muted-foreground">
          Sem color prop → Usa corp-def-card-* do tema
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Default (tema)">
            <p class="text-xs text-muted-foreground">Usa variáveis do tema</p>
          </Card>
          <Card variant="flat" title="Flat Default">
            <p class="text-xs text-muted-foreground">Sem sombra</p>
          </Card>
          <Card variant="outlined" title="Outlined Default">
            <p class="text-xs text-muted-foreground">Apenas borda</p>
          </Card>
          <Card variant="tonal" title="Tonal Default">
            <p class="text-xs text-muted-foreground">Precisa de color prop</p>
          </Card>
        </div>
      </div>
    </section>

    <!-- Hover Effects -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Hover Effects</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover title="Hover Enabled" subtitle="Passe o mouse">
          <p class="text-sm text-muted-foreground">
            Card com efeito hover (levanta e aumenta sombra).
          </p>
        </Card>

        <Card
          hover
          variant="outlined"
          color="primary"
          title="Outlined + Hover"
          subtitle="Combinação"
        >
          <p class="text-sm text-muted-foreground">
            Outlined com hover effect.
          </p>
        </Card>

        <Card
          hover
          variant="tonal"
          color="success"
          title="Tonal + Hover"
          subtitle="Combinação"
        >
          <p class="text-sm text-muted-foreground">Tonal com hover effect.</p>
        </Card>
      </div>
    </section>

    <!-- Estados -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Estados</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Normal" subtitle="Estado padrão">
          <p class="text-sm text-muted-foreground">Card normal.</p>
          <template #actions>
            <Button size="sm">Ação</Button>
          </template>
        </Card>

        <Card disabled title="Disabled" subtitle="Desabilitado">
          <p class="text-sm text-muted-foreground">
            Card desabilitado (opacity + pointer-events).
          </p>
          <template #actions>
            <Button size="sm">Ação</Button>
          </template>
        </Card>

        <Card :loading="isLoading" title="Loading" subtitle="Carregando...">
          <p class="text-sm text-muted-foreground">Card com loading overlay.</p>
          <template #actions>
            <Button size="sm" @click="toggleLoading">
              {{ isLoading ? 'Carregando...' : 'Simular Loading' }}
            </Button>
          </template>
        </Card>
      </div>
    </section>

    <!-- Rounded -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Rounded</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card rounded="none" title="None">
          <p class="text-xs text-muted-foreground">Sem borda</p>
        </Card>
        <Card rounded="sm" title="SM">
          <p class="text-xs text-muted-foreground">Pequena</p>
        </Card>
        <Card rounded="md" title="MD">
          <p class="text-xs text-muted-foreground">Média</p>
        </Card>
        <Card rounded="lg" title="LG">
          <p class="text-xs text-muted-foreground">Grande</p>
        </Card>
        <Card rounded="xl" title="XL (default)">
          <p class="text-xs text-muted-foreground">Extra grande</p>
        </Card>
        <Card rounded="2xl" title="2XL">
          <p class="text-xs text-muted-foreground">2X grande</p>
        </Card>
      </div>
    </section>

    <!-- Props vs Slots -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Props vs Slots</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Via Props -->
        <Card title="Via Props" subtitle="Título e subtítulo via props">
          <p class="text-sm text-muted-foreground">
            Forma rápida: title="..." subtitle="..."
          </p>
          <template #actions>
            <Button size="sm" variant="outline">Cancelar</Button>
            <Button size="sm">Salvar</Button>
          </template>
        </Card>

        <!-- Via Slots -->
        <Card>
          <template #title>
            <h3
              class="font-semibold leading-none tracking-tight flex items-center gap-2"
            >
              Via Slots
              <Badge color="success" content="NEW" />
            </h3>
          </template>
          <template #subtitle>
            <p class="text-sm text-muted-foreground">
              Título customizado com Badge
            </p>
          </template>
          <p class="text-sm text-muted-foreground">
            Forma flexível: usando slots para customização total.
          </p>
          <template #actions>
            <Button size="sm" variant="outline">Cancelar</Button>
            <Button size="sm">Salvar</Button>
          </template>
        </Card>
      </div>
    </section>

    <!-- Slots Avançados -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Slots Avançados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Prepend/Append -->
        <Card title="Com Prepend/Append">
          <template #prepend>
            <div
              class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <span class="text-primary text-xl">👤</span>
            </div>
          </template>
          <template #append>
            <Badge color="success">Online</Badge>
          </template>
          <p class="text-sm text-muted-foreground">
            Card com avatar (prepend) e status (append).
          </p>
        </Card>

        <!-- Image slot -->
        <Card title="Com Imagem" subtitle="Slot #image">
          <template #image>
            <div
              class="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center"
            >
              <span class="text-4xl">🖼️</span>
            </div>
          </template>
          <p class="text-sm text-muted-foreground">
            Imagem ou banner no topo do card.
          </p>
        </Card>
      </div>
    </section>

    <!-- Navegação -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Navegação</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          hover
          href="https://vuejs.org"
          title="Link Externo (href)"
          subtitle="Abre em nova aba"
        >
          <p class="text-sm text-muted-foreground">
            Card como link externo usando href.
          </p>
        </Card>

        <Card
          hover
          :to="{ name: 'home' }"
          title="Link Interno (to)"
          subtitle="Vue Router"
        >
          <p class="text-sm text-muted-foreground">
            Card como link interno usando vue-router.
          </p>
        </Card>
      </div>
    </section>

    <!-- Casos de Uso Reais -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Casos de Uso Reais</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Card de Usuário -->
        <Card>
          <template #prepend>
            <div
              class="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <span class="text-2xl">👨‍💻</span>
            </div>
          </template>
          <template #title>
            <div class="flex items-center gap-2">
              João Silva
              <Badge dot color="success" />
            </div>
          </template>
          <template #subtitle>
            <span>Desenvolvedor Senior</span>
          </template>
          <p class="text-sm text-muted-foreground">
            Frontend • Vue.js • TypeScript
          </p>
          <template #actions>
            <Button size="sm" variant="outline">Mensagem</Button>
            <Button size="sm">Ver Perfil</Button>
          </template>
        </Card>

        <!-- Card de Estatística -->
        <Card variant="tonal" color="success">
          <template #title>
            <span class="text-3xl font-bold">R$ 45.231</span>
          </template>
          <template #subtitle>
            <span class="flex items-center gap-1">
              <Badge color="success" content="+12.5%" />
              vs mês anterior
            </span>
          </template>
          <p class="text-sm">Receita total do mês</p>
        </Card>

        <!-- Card de Ação -->
        <Card hover variant="outlined" color="primary">
          <template #image>
            <div class="h-24 bg-primary/10 flex items-center justify-center">
              <span class="text-4xl">📊</span>
            </div>
          </template>
          <template #title>Relatório Mensal</template>
          <template #subtitle>Clique para visualizar</template>
          <p class="text-sm text-muted-foreground">
            Acesse o relatório completo de vendas.
          </p>
        </Card>
      </div>
    </section>

    <!-- Sandbox -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-foreground">Sandbox</h2>
      <div class="p-4 border border-dashed border-border rounded-lg min-h-32">
        <p class="text-muted-foreground text-sm mb-4">
          Adicione seus testes aqui...
        </p>
      </div>
    </section>
  </div>
</template>
