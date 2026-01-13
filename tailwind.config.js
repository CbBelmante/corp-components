import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './playground/**/*.{vue,js,ts,tsx,html}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.{md,vue}',
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  safelist: [
    // ==================== ARQUITETURA UNIFICADA ====================
    // Todos os componentes (Button, Switch, Checkbox) usam CSS variables
    // em runtime. Não precisamos mais de patterns para SEMANTIC_COLORS
    // pois resolveColor() + getComputedColor() tratam qualquer cor.

    // ==================== BUTTON (Runtime CSS Variables) ====================
    'bg-[var(--corp-runtime-btn-color)]',
    'hover:bg-[var(--corp-runtime-btn-color-hover)]',
    'hover:bg-[var(--corp-runtime-btn-color-light)]',
    'text-[var(--corp-runtime-btn-color)]',
    'hover:text-[var(--corp-runtime-btn-color)]',
    'border-[var(--corp-runtime-btn-color)]',
    // Button - Focus ring (runtime override)
    'focus-visible:ring-[var(--corp-runtime-btn-focus-ring)]',
    // Button - Border color (theme.ts corp-def-button-*)
    'border-[var(--corp-def-button-border-color)]',

    // ==================== SWITCH ====================
    // Switch - Solid variant (fundo colorido)
    'data-[state=checked]:bg-[var(--corp-runtime-switch-color)]',
    // Switch - Ghost variant (fundo sutil + borda colorida)
    'data-[state=checked]:bg-[var(--corp-runtime-switch-color-light)]',
    'data-[state=checked]:border-[var(--corp-runtime-switch-color)]',
    // Switch - Unchecked state (theme.ts)
    'data-[state=unchecked]:bg-[var(--switch-unchecked)]',
    // Switch - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[var(--switch-ring)]',
    'focus-visible:ring-[var(--corp-runtime-switch-track-focus)]',

    // ==================== CHECKBOX ====================
    // Checkbox - Solid variant (fundo colorido + borda escurecida)
    'data-[state=checked]:bg-[var(--corp-runtime-checkbox-checked-color)]',
    'data-[state=checked]:border-[var(--corp-runtime-checkbox-checked-border)]',
    // Checkbox - Ghost variant (fundo sutil + borda colorida)
    'data-[state=checked]:bg-[var(--corp-runtime-checkbox-color-light)]',
    // Checkbox - Unchecked state (theme.ts)
    'data-[state=unchecked]:border-[var(--checkbox-unchecked-border)]',
    // Checkbox - Ícone colorido (ghost/outline)
    'text-[var(--corp-runtime-checkbox-checked-color)]',
    // Checkbox - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[var(--checkbox-ring)]',
    'focus-visible:ring-[var(--corp-runtime-checkbox-focus-ring)]',

    // ==================== RADIO GROUP ====================
    // RadioGroup - Checked state por variant (runtime custom color)
    // Solid: fundo colorido
    'data-[state=checked]:bg-[var(--corp-runtime-radio-color)]',
    // Ghost: fundo sutil + borda colorida
    'data-[state=checked]:bg-[var(--corp-runtime-radio-color-light)]',
    'data-[state=checked]:border-[var(--corp-runtime-radio-color)]',
    // Indicador (bolinha) - ghost/outline
    'bg-[var(--corp-runtime-radio-color)]',
    // RadioGroup - Focus ring (runtime custom color)
    'focus-visible:ring-[var(--corp-runtime-radio-ring)]',

    // ==================== INPUT ====================
    // Input - Border focus (colorClasses runtime)
    'focus:border-[hsl(var(--corp-def-input-border-focus))]',
    'border-[var(--corp-runtime-input-border)]',
    'focus:border-[var(--corp-runtime-input-border-focus)]',
    // Input - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[hsl(var(--corp-def-input-ring))]',
    'focus-visible:ring-[var(--corp-runtime-input-focus-ring)]',
    // Input - Base classes agora no CVA (border, placeholder)

    // ==================== BADGE ====================
    // Badge - Default colors (theme.ts corp-def-badge-* - HSL com wrapper)
    'bg-[hsl(var(--corp-def-badge-bg))]',
    'text-[hsl(var(--corp-def-badge-text))]',
    'border-[hsl(var(--corp-def-badge-border))]',
    // Badge - Border color (theme.ts corp-def-badge-*)
    'border-[var(--corp-def-badge-border-color)]',
    // Badge - Runtime custom color (via prop color)
    'bg-[var(--corp-runtime-badge-color)]',
    'hover:bg-[var(--corp-runtime-badge-color-hover)]',
    'hover:bg-[var(--corp-runtime-badge-color-light)]',
    'text-[var(--corp-runtime-badge-color)]',
    'border-[var(--corp-runtime-badge-color)]',
    // Badge - Dot mode (mini badge 9x9px)
    '!min-w-[9px]',
    '!w-[9px]',
    '!h-[9px]',
    '!p-0',
    // Badge - Rounded presets (via CVA)
    'rounded-md',
    'rounded-none',
    'rounded-sm',
    'rounded-lg',
    'rounded-xl',
    'rounded-full',

    // ==================== SELECT ====================
    // Select - Border focus (colorClasses runtime)
    'focus:border-[hsl(var(--corp-def-select-border-focus))]',
    'border-[var(--corp-runtime-select-border)]',
    'focus:border-[var(--corp-runtime-select-border-focus)]',
    // Select - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[hsl(var(--corp-def-select-ring))]',
    'focus-visible:ring-[var(--corp-runtime-select-focus-ring)]',
    // Select - Base classes agora no CVA (bg, border)

    // ==================== TEXTAREA ====================
    // Textarea - Border focus (colorClasses runtime)
    'focus:border-[hsl(var(--corp-def-textarea-border-focus))]',
    'border-[var(--corp-runtime-textarea-border)]',
    'focus:border-[var(--corp-runtime-textarea-border-focus)]',
    // Textarea - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[hsl(var(--corp-def-textarea-ring))]',
    'focus-visible:ring-[var(--corp-runtime-textarea-focus-ring)]',
    // Textarea - Base classes agora no CVA (bg, border, placeholder)
  ],
  theme: {
    extend: {
      colors: {
        // ==================== BASE ====================
        border: 'hsl(var(--border))',
        input: 'hsl(var(--corp-def-input-border))', // Input border default
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // ==================== PRIMARY PALETTE ====================
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          soft: 'var(--primary-soft)',
          hover: 'var(--primary-hover)',
          muted: 'var(--primary-muted)',
        },

        // ==================== SECONDARY PALETTE ====================
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          soft: 'var(--secondary-soft)',
          hover: 'var(--secondary-hover)',
          muted: 'var(--secondary-muted)',
        },

        // ==================== ACCENT PALETTE ====================
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          soft: 'var(--accent-soft)',
        },

        // ==================== STATUS COLORS ====================
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        info: 'hsl(var(--info))',

        // ==================== MUTED ====================
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // ==================== SHADCN COMPONENTS ====================
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        // ==================== BUTTON ====================
        'button-outline': 'hsl(var(--button-outline))',

        // ==================== CHARTS ====================
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};
