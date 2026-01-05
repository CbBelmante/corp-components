#!/usr/bin/env tsx
/**
 * 📚 devDocs - Script para rodar apenas VitePress
 *
 * Inicia VitePress usando porta centralizada do config.ts.
 *
 * 🔗 DEPENDÊNCIAS:
 * - src/config.ts (portas)
 */

import { spawn } from 'child_process';
import { config } from '../src/config.js';

const docsPort = config.devServer.docsPort;

console.log(`📚 Starting VitePress on port ${docsPort}...`);

const child = spawn(
  'vitepress',
  ['dev', 'docs/public', '--port', String(docsPort)],
  {
    stdio: 'inherit',
    shell: true,
  }
);

child.on('exit', code => {
  process.exit(code || 0);
});
