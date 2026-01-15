# Badge

O componente `CorpBadge` é um badge inline customizável com suporte a contadores (99+), mini badge (dot), ícones, cores e animações. Ideal para tags, status indicators, notificações e labels.

## Uso

Badges em sua forma mais simples contêm texto e uma cor de fundo. Você pode passar o conteúdo via **slot** (default) ou via prop **content**.

:::corp-code
<!-- Via slot (default) -->
<CorpBadge>Badge</CorpBadge>
<CorpBadge color="success">Success</CorpBadge>
<CorpBadge color="warning">Warning</CorpBadge>

<!-- Via prop content -->
<CorpBadge content="NEW" />
<CorpBadge content="Active" color="success" />
<CorpBadge :content="42" color="destructive" />
:::

---

## Props

### Variant

A prop `variant` define o **estilo visual** do badge (sólido, outline, ghost).

:::corp-code
<CorpBadge variant="solid">Solid (Default)</CorpBadge>
<CorpBadge variant="outline">Outline</CorpBadge>
<CorpBadge variant="ghost">Ghost</CorpBadge>
:::

| Variant | Descrição |
|---------|-----------|
| `solid` | Fundo sólido com sombra (padrão) |
| `outline` | Borda com fundo transparente |
| `ghost` | Sem fundo/borda, hover sutil |

### Color

A prop `color` é um **atalho semântico** que define cor do background, texto, hover e borda automaticamente.

:::corp-code
<CorpBadge color="primary">Primary</CorpBadge>
<CorpBadge color="secondary">Secondary</CorpBadge>
<CorpBadge color="destructive">Destructive</CorpBadge>
<CorpBadge color="success">Success</CorpBadge>
<CorpBadge color="warning">Warning</CorpBadge>
<CorpBadge color="info">Info</CorpBadge>
:::

| Color | Descrição | Cor |
|-------|-----------|-----|
| `primary` | Cor principal (padrão) | Laranja `#FF7133` |
| `secondary` | Cor secundária | Azul acinzentado |
| `destructive` | Ação destrutiva/perigo | Vermelho |
| `success` | Sucesso/confirmação | Verde |
| `warning` | Aviso/atenção | Amarelo |
| `info` | Informação | Azul |

#### Combinando Variant + Color

Você pode combinar **qualquer variant** com **qualquer color**:

:::corp-code
<!-- Solid + cores -->
<CorpBadge variant="solid" color="success">Active</CorpBadge>
<CorpBadge variant="solid" color="destructive">Error</CorpBadge>

<!-- Outline + cores -->
<CorpBadge variant="outline" color="primary">Draft</CorpBadge>
<CorpBadge variant="outline" color="warning">Pending</CorpBadge>

<!-- Ghost + cores -->
<CorpBadge variant="ghost" color="info">Info</CorpBadge>
<CorpBadge variant="ghost" color="destructive">Deleted</CorpBadge>
:::

#### Cores Customizadas

Você pode usar **qualquer cor** (HEX, RGB, HSL, variável CSS, nomes CSS):

:::corp-code
<!-- HEX -->
<CorpBadge color="#8B4513">Marrom (HEX)</CorpBadge>
<CorpBadge color="#B87333" variant="outline">Cobre (HEX)</CorpBadge>

<!-- RGB -->
<CorpBadge color="rgb(139, 69, 19)">RGB</CorpBadge>

<!-- HSL -->
<CorpBadge color="hsl(25, 76%, 31%)" variant="outline">HSL</CorpBadge>

<!-- Nomes CSS -->
<CorpBadge color="#6B8E23">Olive (CSS)</CorpBadge>
<CorpBadge color="orange">Orange (CSS)</CorpBadge>
:::

> **Hover funciona!** Cores customizadas (HEX, RGB, HSL, var(), nomes CSS) suportam hover automático.

#### Contraste Automático

O texto do badge (variant `solid`) é calculado **automaticamente** baseado na luminosidade da cor de fundo. Cores claras recebem texto preto, cores escuras recebem texto branco.

:::corp-code
<!-- Cores claras → texto PRETO automático -->
<CorpBadge color="yellow">Yellow</CorpBadge>
<CorpBadge color="cyan">Cyan</CorpBadge>
<CorpBadge color="pink">Pink</CorpBadge>
<CorpBadge color="#B2FF59">Lime</CorpBadge>

<!-- Cores escuras → texto BRANCO automático -->
<CorpBadge color="navy">Navy</CorpBadge>
<CorpBadge color="maroon">Maroon</CorpBadge>
<CorpBadge color="#4A148C">Deep Purple</CorpBadge>
<CorpBadge color="black">Black</CorpBadge>
:::

> **Como funciona:** Usa a fórmula YIQ de luminância percebida (WCAG 2.0) para determinar o contraste ideal. O cálculo acontece em runtime via `getContrastColor()`.

#### bgColor e contentColor (Overrides)

Para controle total e granular, use `bgColor` e `contentColor` que **sobrescrevem** a prop `color`:

:::corp-code
<CorpBadge bgColor="#22c55e" contentColor="white">Custom Background</CorpBadge>
<CorpBadge variant="outline" bgColor="transparent" contentColor="#f59e0b">Custom Outline</CorpBadge>
:::

**Hierarquia de prioridade:**
1. `bgColor` → **Override total do background** - bloqueia background e hover do `color`
2. `contentColor` → **Override total do texto** - bloqueia cor do texto do `color`
3. `color` → Atalho semântico (gera background, texto, hover e borda automaticamente)

---

### Content e Max

A prop `content` é uma **alternativa ao slot** para passar o conteúdo do badge. Combine com `max` para criar contadores com limite (99+).

:::corp-code
<!-- Content básico -->
<CorpBadge :content="5" />
<CorpBadge content="NEW" />

<!-- Max (contador 99+) -->
<CorpBadge :content="142" :max="99" color="destructive" />  <!-- 99+ -->
<CorpBadge :content="50" :max="99" color="primary" />  <!-- 50 -->

<!-- Slot tradicional (continua funcionando) -->
<CorpBadge>Via slot</CorpBadge>
:::

**Lógica do `max`:**
- Se `content` for **número** e **> max** → renderiza `"max+"`
- Se `content` for **texto** → renderiza direto (ignora max)
- Se `content` for **número** e **≤ max** → renderiza o número

---

### Dot

A prop `dot` transforma o badge em um **mini badge** (9x9px ponto colorido) - ideal para status indicators.

:::corp-code
<CorpBadge dot color="success" />
<CorpBadge dot color="warning" />
<CorpBadge dot color="destructive" />
<CorpBadge dot color="info" />

<!-- Dot com variants -->
<CorpBadge dot variant="solid" color="primary" />
<CorpBadge dot variant="outline" color="secondary" />
:::

> **Nota:** Quando `dot` está ativo, **conteúdo e ícones são ocultados**.

---

### Rounded

Use a prop `rounded` para controlar o border radius. Aceita **13 presets**, classes Tailwind custom, valores CSS, números ou booleanos:

:::corp-code
<!-- Presets básicos -->
<CorpBadge rounded="none">None (0)</CorpBadge>
<CorpBadge rounded="xs">XS (2px)</CorpBadge>
<CorpBadge rounded="sm">Small (2px)</CorpBadge>
<CorpBadge rounded="default">Default (6px)</CorpBadge>
<CorpBadge rounded="md">Medium (6px)</CorpBadge>
<CorpBadge rounded="lg">Large (8px)</CorpBadge>
<CorpBadge rounded="xl">XL (12px)</CorpBadge>

<!-- Presets grandes -->
<CorpBadge rounded="2xl">2XL (16px)</CorpBadge>
<CorpBadge rounded="3xl">3XL (24px)</CorpBadge>

<!-- Presets especiais -->
<CorpBadge rounded="full">Full (9999px)</CorpBadge>
<CorpBadge rounded="pill">Pill (9999px)</CorpBadge>
<CorpBadge rounded="circle">Circle (9999px)</CorpBadge>
<CorpBadge rounded="shaped">Shaped (8px)</CorpBadge>
:::

#### Rounded Custom (Classes Tailwind e CSS)

Além dos presets, aceita classes Tailwind, valores CSS, números (px) ou booleanos:

:::corp-code
<!-- Classes Tailwind custom -->
<CorpBadge rounded="rounded-3xl" color="primary">Ultra Rounded</CorpBadge>
<CorpBadge rounded="rounded-tl-3xl rounded-br-3xl" color="success">Diagonal Cut</CorpBadge>
<CorpBadge rounded="rounded-l-full rounded-r-sm" color="info">Asymmetric</CorpBadge>

<!-- Número (convertido para px) -->
<CorpBadge :rounded="16" color="warning">16px</CorpBadge>
<CorpBadge :rounded="0" color="destructive">0px (none)</CorpBadge>

<!-- Booleano (true → full, false → none) -->
<CorpBadge :rounded="true" color="success">Boolean true (full)</CorpBadge>
<CorpBadge :rounded="false" color="secondary">Boolean false (none)</CorpBadge>

<!-- Valores CSS -->
<CorpBadge rounded="4px 16px" color="warning">Mixed Radius</CorpBadge>
<CorpBadge rounded="20px 20px 0 0" color="destructive">Top Rounded</CorpBadge>
<CorpBadge rounded="0 20px 20px 0" color="secondary">Right Rounded</CorpBadge>
:::

**Exemplos Criativos:**

:::corp-code
<!-- Badge tipo "Tag" (canto cortado) -->
<CorpBadge rounded="rounded-r-full" color="primary" variant="outline">Tag Style</CorpBadge>

<!-- Badge tipo "Ribbon" -->
<CorpBadge rounded="rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-none" color="success">Ribbon</CorpBadge>

<!-- Badge tipo "Speech Bubble" (pontinha) -->
<CorpBadge rounded="16px 16px 16px 2px" color="info">Message</CorpBadge>

<!-- Badge tipo "Ticket" (furos laterais) -->
<CorpBadge rounded="2px 16px 16px 2px" color="warning" variant="outline">Ticket</CorpBadge>

<!-- Badge tipo "Sticker" (muito arredondado) -->
<CorpBadge rounded="rounded-3xl" color="destructive" icon="Star">Sticker</CorpBadge>

<!-- Badge tipo "Notificação" (assimétrico) -->
<CorpBadge rounded="rounded-l-full rounded-r-md" :content="99" :max="99" color="destructive" />
:::

---

### Icon

A prop `icon` adiciona um **ícone Lucide** ao badge.

:::corp-code
<!-- Ícone esquerda (default) -->
<CorpBadge icon="Check" color="success">Aprovado</CorpBadge>
<CorpBadge icon="AlertTriangle" color="warning">Atenção</CorpBadge>

<!-- Ícone direita -->
<CorpBadge icon="ChevronRight" iconPosition="right" color="primary">Próximo</CorpBadge>

<!-- Tamanho customizado -->
<CorpBadge icon="Star" :iconSize="16" color="warning">VIP</CorpBadge>
:::

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `icon` | `string` | `''` | Nome do ícone Lucide (sem prefixo `luc-`) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posição do ícone |
| `iconSize` | `number` | `14` | Tamanho do ícone em pixels |

> **Lista completa de ícones:** [lucide.dev/icons](https://lucide.dev/icons)

---

### Opacity

A prop `opacity` controla a **opacidade** do badge (0-100).

:::corp-code
<CorpBadge :opacity="100" color="primary">100% (opaco)</CorpBadge>
<CorpBadge :opacity="90" color="success">90% (padrão)</CorpBadge>
<CorpBadge :opacity="70" color="warning">70%</CorpBadge>
<CorpBadge :opacity="50" color="destructive">50%</CorpBadge>
<CorpBadge :opacity="30" color="info">30%</CorpBadge>
:::

> **Padrão:** `90` (90% de opacidade)

---

### Animation

A prop `animation` adiciona **animações CSS** ao badge.

:::corp-code
<CorpBadge animation="pulse" color="destructive">Pulse</CorpBadge>
<CorpBadge animation="bounce" color="warning">Bounce</CorpBadge>
<CorpBadge animation="spin" color="primary">Spin</CorpBadge>
<CorpBadge animation="ping" color="success">Ping</CorpBadge>
:::

#### Velocidade da Animação

Use `animationSpeed` para controlar a velocidade (`slow`, `normal`, `fast`):

:::corp-code
<CorpBadge animation="pulse" animationSpeed="slow">Slow (3s)</CorpBadge>
<CorpBadge animation="pulse" animationSpeed="normal">Normal (1.5s)</CorpBadge>
<CorpBadge animation="pulse" animationSpeed="fast">Fast (0.5s)</CorpBadge>
:::

| Animation | Descrição |
|-----------|-----------|
| `pulse` | Pulsação de opacidade |
| `bounce` | Pulo vertical |
| `spin` | Rotação 360° |
| `ping` | Expansão com fade |

---

## Exemplos Avançados

### Contador de Notificações

:::corp-code
<div class="flex items-center gap-3">
  <span>Mensagens</span>
  <CorpBadge :content="142" :max="99" color="destructive" rounded="full" />
</div>

<div class="flex items-center gap-3">
  <span>Tarefas</span>
  <CorpBadge :content="5" color="primary" rounded="full" />
</div>
:::

### Status Indicators (Dot)

:::corp-code
<div class="flex flex-col gap-2">
  <div class="flex items-center gap-2">
    <CorpBadge dot color="success" />
    <span>Online</span>
  </div>
  <div class="flex items-center gap-2">
    <CorpBadge dot color="warning" />
    <span>Ausente</span>
  </div>
  <div class="flex items-center gap-2">
    <CorpBadge dot color="destructive" />
    <span>Offline</span>
  </div>
</div>
:::

### Tags com Ícones

:::corp-code
<CorpBadge icon="Star" color="warning">VIP</CorpBadge>
<CorpBadge icon="Zap" color="primary" rounded="full">Premium</CorpBadge>
<CorpBadge icon="Crown" color="#FFD700" contentColor="white">Gold</CorpBadge>
:::

### Badges Animados

:::corp-code
<CorpBadge animation="pulse" color="destructive">Live</CorpBadge>
<CorpBadge animation="ping" color="success" :opacity="85">New</CorpBadge>
<CorpBadge animation="bounce" color="warning">Hot</CorpBadge>
:::

---

## API Reference

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Estilo visual do badge |
| `color` | `string` | `undefined` | Atalho semântico de cor (primary, success, HEX, RGB, HSL, var(), nomes CSS) |
| `bgColor` | `string` | `undefined` | Override do background (bloqueia hover automático do `color`) |
| `contentColor` | `string` | `undefined` | Override da cor do texto |
| `content` | `string \| number` | `undefined` | Conteúdo do badge (alternativa ao slot) |
| `max` | `string \| number` | `undefined` | Máximo para números (ex: 99+ quando content > max) |
| `dot` | `boolean` | `false` | Mini badge (9x9px ponto colorido) - esconde conteúdo e ícones |
| `rounded` | `RoundedValue` | `'default'` | **13 presets**: default, none, xs, sm, md, lg, xl, 2xl, 3xl, full, pill, circle, shaped **OU** Tailwind class **OU** CSS value **OU** number (px) **OU** boolean (true=full, false=none) |
| `icon` | `string` | `''` | Nome do ícone Lucide (sem prefixo `luc-`) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posição do ícone |
| `iconSize` | `number` | `14` | Tamanho do ícone em pixels |
| `opacity` | `number` | `90` | Opacidade do badge (0-100) |
| `animation` | `'pulse' \| 'bounce' \| 'spin' \| 'ping' \| ''` | `''` | Animação CSS |
| `animationSpeed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Velocidade da animação |
| `class` | `string` | `''` | Classes CSS customizadas |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do badge (alternativa à prop `content`) |

### Hierarquia de Cores

1. **`bgColor`** - Override total do background (bloqueia bg/hover do `color`)
2. **`contentColor`** - Override total do texto (bloqueia texto do `color`)
3. **`color`** - Atalho semântico (gera bg, texto, hover, borda automaticamente)
4. **Defaults** - Se nenhuma cor especificada, usa `corp-def-badge-*` do theme

### Lógica do Content + Max

- `content` **não definido** → renderiza slot
- `content` **texto** → renderiza texto (ignora `max`)
- `content` **número** e **≤ max** → renderiza número
- `content` **número** e **> max** → renderiza `"max+"`

### Lógica do Dot

- `dot` **ativo** → badge vira 9x9px ponto colorido
- `dot` **ativo** → esconde `content`, slot e `icon`
- `dot` **inativo** → badge normal
