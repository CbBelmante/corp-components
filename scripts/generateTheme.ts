#!/usr/bin/env bun
/**
 * 🎨 THEME GENERATOR
 *
 * Lê src/theme.ts e gera automaticamente em src/generated/:
 * - theme.css (formato HEX legível)
 * - tailwind.css (formato HSL para Tailwind)
 * - themeMetadata.ts (metadados do tema)
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import {
  themeDefinition,
  THEME_COLOR_TYPES,
  type ThemeColorName,
  type ThemeColorType,
} from '../src/theme';
import { hexToHsl } from '../src/utils/CorpColorUtils';

// ==================== THEME.CSS GENERATOR ====================

function generateThemeCss(): string {
  const colorNames = Object.keys(themeDefinition) as ThemeColorName[];

  // Filtrar cores que devem ir para theme.css (BOTH ou ONLY_THEME)
  const themeColors = colorNames.filter(name => {
    const type: ThemeColorType = themeDefinition[name].type;
    return (
      type === THEME_COLOR_TYPES.BOTH || type === THEME_COLOR_TYPES.ONLY_THEME
    );
  });

  let css = `/*
 * ===================================================================
 * 🎨 THEME SYSTEM - GERADO AUTOMATICAMENTE
 * ===================================================================
 *
 * ⚠️ NÃO ADICIONE AQUI! ⚠️
 * Arquivo gerado no build ou via: bun run generateTheme
 *
 * Este arquivo é gerado automaticamente de src/theme.ts
 * Para modificar cores, edite src/theme.ts e rode:
 * \`bun run generateTheme\`
 */

/* ===================================================================
 * LIGHT THEME
 * =================================================================== */

/* Use :where() for zero specificity - user :root always wins regardless of import order */
:where(:root) {\n`;

  // Light mode - apenas theme colors
  for (const name of themeColors) {
    const def = themeDefinition[name];
    css += `  --${name}: ${def.light};\n`;
  }

  css += `}\n\n/* ===================================================================
 * DARK THEME
 * =================================================================== */

:where(.dark) {\n`;

  // Dark mode - apenas theme colors
  for (const name of themeColors) {
    const def = themeDefinition[name];
    css += `  --${name}: ${def.dark};\n`;
  }

  css += `}\n\n/* ===================================================================
 * UTILITY CLASSES
 * =================================================================== */

/* Status colors */
.status-success { color: var(--success); }
.status-warning { color: var(--warning); }
.status-error { color: var(--error); }
.status-info { color: var(--info); }
.status-pending { color: var(--pending); }

/* Links */
.text-link { color: var(--text-link); }
.link-hover:hover { color: var(--text-link); }

/* Backgrounds */
.bg-surface { background-color: var(--surface); }
.bg-surface-elevated { background-color: var(--surface-elevated); }

/* Borders */
.border-default { border-color: var(--border); }
.border-muted { border-color: var(--border-muted); }

/* MultiCompany */
.company-context { border-left: 3px solid var(--company-border); }
.company-indicator { background-color: var(--company-background); }
`;

  return css;
}

// ==================== TAILWIND.CSS GENERATOR ====================

function generateTailwindCss(): string {
  const colorNames = Object.keys(themeDefinition) as ThemeColorName[];

  // Filtrar cores que devem ir para tailwind.css (BOTH ou ONLY_TAILWIND)
  const tailwindColors = colorNames.filter(name => {
    const type: ThemeColorType = themeDefinition[name].type;
    return (
      type === THEME_COLOR_TYPES.BOTH ||
      type === THEME_COLOR_TYPES.ONLY_TAILWIND
    );
  });

  let css = `/**
 * ===================================================================
 * 🎨 TAILWIND CSS VARIABLES - GERADO AUTOMATICAMENTE
 * ===================================================================
 *
 * ⚠️ NÃO ADICIONE AQUI! ⚠️
 * Arquivo gerado no build ou via: bun run generateTheme
 *
 * Este arquivo é gerado automaticamente de src/theme.ts
 * Formato HSL sem hsl() para Tailwind processar opacity modifiers
 *
 * Para modificar cores, edite src/theme.ts e rode:
 * \`bun run generateTheme\`
 */

/* Light Mode */
/* Use :where() for zero specificity - user :root always wins regardless of import order */
:where(:root) {\n`;

  // Light mode - apenas tailwind colors
  for (const name of tailwindColors) {
    const def = themeDefinition[name];

    if (def.light.startsWith('#')) {
      css += `  --${name}: ${hexToHsl(def.light)};\n`;
    } else if (def.light === 'transparent') {
      css += `  --${name}: 0 0% 0% / 0;\n`;
    } else {
      // Mantém valor original (px, rem, rgba, etc)
      css += `  --${name}: ${def.light};\n`;
    }
  }

  css += `}\n\n/* Dark Mode */
:where(.dark) {\n`;

  // Dark mode - apenas tailwind colors
  for (const name of tailwindColors) {
    const def = themeDefinition[name];

    if (def.dark.startsWith('#')) {
      css += `  --${name}: ${hexToHsl(def.dark)};\n`;
    } else if (def.dark === 'transparent') {
      css += `  --${name}: 0 0% 0% / 0;\n`;
    } else {
      // Mantém valor original (px, rem, rgba, etc)
      css += `  --${name}: ${def.dark};\n`;
    }
  }

  css += `}\n`;

  return css;
}

// ==================== THEME METADATA GENERATOR ====================

function generateThemeMetadata(): string {
  const colorNames = Object.keys(themeDefinition) as ThemeColorName[];

  // Separar por tipo (BASEADO NO theme.ts automaticamente!)
  const tailwindVars = colorNames.filter(name => {
    const type: ThemeColorType = themeDefinition[name].type;
    return (
      type === THEME_COLOR_TYPES.BOTH ||
      type === THEME_COLOR_TYPES.ONLY_TAILWIND
    );
  });
  const themeVars = colorNames.filter(name => {
    const type: ThemeColorType = themeDefinition[name].type;
    return type === THEME_COLOR_TYPES.ONLY_THEME;
  });

  // Apenas cores principais para cssVariables (sem sub-variantes)
  const mainColors = colorNames.filter(name => {
    return ![
      '-foreground',
      '-soft',
      '-hover',
      '-muted',
      '-border',
      '-text',
      '-bg',
      '-start',
      '-end',
      '-size',
      '-width',
      '-shadow',
      '-overlay',
    ].some(suffix => name.includes(suffix));
  });

  const cssVarsCode = mainColors
    .map(name => `  '${name}': 'var(--${name})'`)
    .join(',\n');
  const hslVarsCode = tailwindVars.map(name => `'${name}'`).join(', ');
  const hexVarsCode = themeVars.map(name => `'${name}'`).join(', ');

  return `/**
 * 🎨 Theme Metadata - Metadados do Sistema de Cores
 *
 * ⚠️ GERADO AUTOMATICAMENTE - NÃO EDITE! ⚠️
 * Arquivo gerado no build ou via: bun run generateTheme
 *
 * Este arquivo contém metadados gerados automaticamente de src/theme.ts:
 * - CSS_VARIABLES: Mapeamento de nomes para variáveis CSS
 * - HSL_VARIABLES: Cores tipo 'tailwind' (precisam de hsl() wrapper)
 * - HEX_VARIABLES: Cores tipo 'theme' (usam valor direto)
 *
 * Para modificar, edite src/theme.ts e rode: \`bun run generateTheme\`
 */

// ============== COLOR METADATA ==============

/**
 * Mapeamento de cores principais para variáveis CSS
 * Total: ${mainColors.length} variáveis
 */
export const CSS_VARIABLES: Record<string, string> = {
${cssVarsCode}
};

/**
 * Cores tipo 'tailwind' que precisam de hsl() wrapper
 * Total: ${tailwindVars.length} variáveis
 */
export const HSL_VARIABLES = new Set([${hslVarsCode}]);

/**
 * Cores tipo 'theme' que usam valor direto (sem wrapper)
 * Total: ${themeVars.length} variáveis
 */
export const HEX_VARIABLES = new Set([${hexVarsCode}]);
`;
}

// ==================== MAIN ====================

console.log('🎨 Gerando arquivos de tema...\n');

// Criar diretório src/generated se não existir
const generatedDir = join(process.cwd(), 'src/generated');
if (!existsSync(generatedDir)) {
  mkdirSync(generatedDir, { recursive: true });
}

// Gerar theme.css
const themeCss = generateThemeCss();
const themeCssPath = join(generatedDir, 'theme.css');
writeFileSync(themeCssPath, themeCss);
console.log(`✅ theme.css gerado: ${themeCssPath}`);

// Gerar tailwind.css
const tailwindCss = generateTailwindCss();
const tailwindCssPath = join(generatedDir, 'tailwind.css');
writeFileSync(tailwindCssPath, tailwindCss);
console.log(`✅ tailwind.css gerado: ${tailwindCssPath}`);

// Gerar themeMetadata.ts
const themeMetadata = generateThemeMetadata();
const themeMetadataPath = join(generatedDir, 'themeMetadata.ts');
writeFileSync(themeMetadataPath, themeMetadata);
console.log(`✅ themeMetadata.ts gerado: ${themeMetadataPath}`);

console.log('\n🎉 Tema gerado com sucesso!');
console.log(`📊 Total de variáveis: ${Object.keys(themeDefinition).length}`);
