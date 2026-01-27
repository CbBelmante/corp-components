#!/usr/bin/env tsx
/**
 * Build e copia para o projeto Elas no Poder
 *
 * Copia para:
 * 1. node_modules/@corp/components (para imports TS)
 * 2. app/assets/css/ (para CSS funcionar com Vite)
 */

import { execSync } from 'child_process';
import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CORP_ROOT = resolve(__dirname, '..');
const ELAS_ROOT = resolve(CORP_ROOT, '../elas_podem_website');

console.log('🔨 Buildando corp-components...\n');

try {
  // Build do projeto
  execSync('npm run build', {
    cwd: CORP_ROOT,
    stdio: 'inherit'
  });

  console.log('\n📦 Copiando para Elas no Poder...');

  // 1. Copiar para node_modules (para TypeScript)
  const nmTarget = resolve(ELAS_ROOT, 'node_modules/@corp/components');
  if (!existsSync(nmTarget)) {
    mkdirSync(nmTarget, { recursive: true });
  }
  cpSync(resolve(CORP_ROOT, 'dist'), resolve(nmTarget, 'dist'), { recursive: true });
  cpSync(resolve(CORP_ROOT, 'package.json'), resolve(nmTarget, 'package.json'));
  console.log('  ✓ node_modules/@corp/components');

  // 2. Copiar CSS para assets (para Vite)
  cpSync(
    resolve(CORP_ROOT, 'dist/corp-components.css'),
    resolve(ELAS_ROOT, 'app/assets/css/corp-components.css')
  );
  console.log('  ✓ app/assets/css/corp-components.css');

  console.log('\n✅ Build copiado com sucesso!');

} catch (error) {
  console.error('❌ Erro ao buildar/copiar:', error);
  process.exit(1);
}
