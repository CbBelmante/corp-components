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
    // Button semantic colors - garantir que Tailwind gere todas as classes
    {
      pattern: new RegExp(
        `^(bg|text|border|hover:bg|hover:text)-(${SEMANTIC_COLORS.join('|')})(/\\d+)?$`
      ),
    },
    // Custom color arbitrary values - cores customizadas (HEX, RGB, var(), etc)
    'bg-[var(--corp-btn-color)]',
    'hover:bg-[var(--corp-btn-color-hover)]',
    'hover:bg-[var(--corp-btn-color-light)]',
    'text-[var(--corp-btn-color)]',
    'hover:text-[var(--corp-btn-color)]',
    'border-[var(--corp-btn-color)]',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        'button-outline': 'hsl(var(--button-outline))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          soft: 'var(--primary-soft)',
          hover: 'var(--primary-hover)',
          muted: 'var(--primary-muted)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          soft: 'var(--secondary-soft)',
          hover: 'var(--secondary-hover)',
          muted: 'var(--secondary-muted)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        // Semantic status colors
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        info: 'hsl(var(--info))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          soft: 'var(--accent-soft)',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
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
