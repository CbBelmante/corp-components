import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';
import { SEMANTIC_COLORS } from './src/constants/semanticColors.js';

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
    // ==================== SEMANTIC COLORS (Patterns) ====================
    // Button semantic colors - garantir que Tailwind gere todas as classes
    {
      pattern: new RegExp(
        `^(bg|text|border|hover:bg|hover:text)-(${SEMANTIC_COLORS.join('|')})(/\\d+)?$`
      ),
    },
    // Switch semantic colors - data-[state=checked]:bg-{color} + focus:ring-{color}
    {
      pattern: new RegExp(
        `^(data-\\[state=checked\\]:bg|focus-visible:ring)-(${SEMANTIC_COLORS.join('|')})$`
      ),
    },
    // Checkbox semantic colors - data-[state=checked]:bg-{color} e border-{color}
    {
      pattern: new RegExp(
        `^data-\\[state=checked\\]:(bg|border)-(${SEMANTIC_COLORS.join('|')})$`
      ),
    },

    // ==================== BUTTON (Runtime Custom Colors) ====================
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
    // Checkbox - Disabled checked (runtime: lighten no mesmo tom)
    'data-[state=checked]:disabled:bg-[var(--corp-runtime-checkbox-checked-disabled-bg)]',
    'data-[state=checked]:disabled:border-[var(--corp-runtime-checkbox-checked-disabled-border)]',
    'data-[state=checked]:disabled:text-[var(--corp-runtime-checkbox-checked-disabled-border)]',
    // Checkbox - Disabled unchecked (theme.ts: cinza neutro)
    'data-[state=unchecked]:disabled:bg-[var(--checkbox-unchecked-disabled-bg)]',
    'data-[state=unchecked]:disabled:border-[var(--checkbox-unchecked-disabled-border)]',
    // Checkbox - Focus ring (theme.ts default + runtime override)
    'focus-visible:ring-[var(--checkbox-ring)]',
    'focus-visible:ring-[var(--corp-runtime-checkbox-focus-ring)]',
  ],
  theme: {
    extend: {
      colors: {
        // ==================== BASE ====================
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
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
