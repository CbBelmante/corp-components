#!/usr/bin/env tsx
/**
 * 🎮 devPlayground - Script para rodar apenas Playground
 *
 * Inicia Vite playground usando porta centralizada do config.ts.
 *
 * 🔗 DEPENDÊNCIAS:
 * - src/config.ts (portas)
 */

import { spawn } from 'child_process';
import { config } from '../src/config.js';

const playgroundPort = config.devServer.playgroundPort;

console.log(`🎮 Starting Playground on port ${playgroundPort}...`);

const child = spawn('vite', ['--port', String(playgroundPort)], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', code => {
  process.exit(code || 0);
});
