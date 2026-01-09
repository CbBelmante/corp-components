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

    // ==================== SWITCH ====================
    // Switch - Checked state (runtime custom color)
    'data-[state=checked]:bg-[var(--corp-runtime-switch-color)]',
    // Switch - Unchecked state (theme.ts)
    'data-[state=unchecked]:bg-[var(--switch-unchecked)]',
    // Switch - Focus ring trilho (theme.ts default + runtime override)
    'focus-visible:ring-[var(--switch-ring)]',
    'focus-visible:ring-[var(--corp-runtime-switch-track-focus)]',
    // Switch - Focus ring bolinha (CSS, não precisa safelist, mas documentado aqui)
    // 'var(--corp-runtime-switch-thumb-focus)' usado em CSS :deep()

    // ==================== CHECKBOX ====================
    // Checkbox - Checked state (runtime custom color + border darkened)
    'data-[state=checked]:bg-[var(--corp-runtime-checkbox-checked-color)]',
    'data-[state=checked]:border-[var(--corp-runtime-checkbox-checked-border)]',
    // Checkbox - Unchecked state (theme.ts)
    'data-[state=unchecked]:border-[var(--checkbox-unchecked-border)]',
    // Checkbox - Disabled states: tratados via CSS <style> block com !important
    // (não precisam de safelist - variáveis -light/-dark resolvidas no CSS)
    // Checkbox - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[var(--checkbox-ring)]',
    'focus-visible:ring-[var(--corp-runtime-checkbox-focus-ring)]',

    // ==================== INPUT ====================
    // Input - Border (runtime custom color)
    'border-[var(--corp-runtime-input-border)]',
    'focus:border-[var(--corp-runtime-input-border-focus)]',
    // Input - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[var(--input-ring)]',
    'focus-visible:ring-[var(--corp-runtime-input-focus-ring)]',
    // Input - Disabled: tratados via CSS <style> block com !important
    // (não precisam de safelist - variáveis -light/-dark resolvidas no CSS)

    // ==================== BADGE ====================
    // Badge - Background (runtime custom color)
    'bg-[var(--corp-runtime-badge-bg)]',
    // Badge - Text color (runtime custom color)
    'text-[var(--corp-runtime-badge-color)]',

    // ==================== SELECT ====================
    // Select - Border (runtime custom color)
    'border-[var(--corp-runtime-select-border)]',
    'focus:border-[var(--corp-runtime-select-border-focus)]',
    // Select - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[var(--select-ring)]',
    'focus-visible:ring-[var(--corp-runtime-select-focus-ring)]',
  ],
  theme: {
    extend: {
      colors: {
        // ==================== BASE ====================
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input-border))',
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
