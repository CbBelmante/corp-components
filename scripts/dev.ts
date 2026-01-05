#!/usr/bin/env tsx
/**
 * 🚀 dev - Script de desenvolvimento com portas do config
 *
 * Inicia Vite + VitePress usando portas centralizadas do config.ts.
 *
 * 🔗 DEPENDÊNCIAS:
 * - src/config.ts (portas)
 * - concurrently
 */

import { spawn } from 'child_process';
import { config } from '../src/config.js';

const playgroundPort = config.devServer.playgroundPort;
const docsPort = config.devServer.docsPort;

console.log('🚀 Starting development servers...');
console.log(`   Playground: http://localhost:${playgroundPort}`);
console.log(`   Docs: http://localhost:${docsPort}`);
console.log('');

// Executa ambos os servidores em paralelo
const child = spawn(
  'npx',
  [
    'concurrently',
    `"vite --port ${playgroundPort}"`,
    `"vitepress dev docs/public --port ${docsPort}"`,
  ],
  {
    stdio: 'inherit',
    shell: true,
  }
);

child.on('exit', code => {
  process.exit(code || 0);
});
