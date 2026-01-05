#!/usr/bin/env tsx
/**
 * 🔧 sync-aliases - Sincroniza aliases do config para tsconfig.json
 *
 * Lê ALIAS_DEFINITIONS de src/config.ts e atualiza automaticamente
 * a seção "paths" do tsconfig.json, mantendo comentários e formatação.
 *
 * 🔗 DEPENDÊNCIAS:
 * - src/config.ts (ALIAS_DEFINITIONS)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { ALIAS_DEFINITIONS, config } from '../src/config.js';

// Converte para formato tsconfig paths
const tsconfigPaths: Record<string, string[]> = {};
for (const [alias, path] of Object.entries(ALIAS_DEFINITIONS)) {
  tsconfigPaths[`${alias}/*`] = [`${path}/*`];
}

// Lê tsconfig.json usando regex para substituir apenas a seção paths
const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');
const tsconfigContent = readFileSync(tsconfigPath, 'utf-8');

// Gera a nova seção paths formatada
const pathsJson = JSON.stringify(tsconfigPaths, null, 6).replace(/^/gm, '    ');

// Substitui a seção paths existente
const updatedContent = tsconfigContent.replace(
  /"paths":\s*\{[^}]*\}/s,
  `"paths": ${pathsJson.trim()}`
);

// Salva tsconfig.json
writeFileSync(tsconfigPath, updatedContent);

console.log('✅ tsconfig.json paths sincronizado com sucesso!');
console.log(`📝 ${Object.keys(tsconfigPaths).length} alias configurados`);

// Exemplo de uso do config.isDevelopment no script
if (config.isDevelopment) {
  console.log(`🔧 [DEV] Environment: ${config.environment}`);
  console.log(`🔧 [DEV] Version: ${config.package.version}`);
}
