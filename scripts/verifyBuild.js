const fs = require('fs');
const path = require('path');

const checks = {
  'Bundle ES': 'dist/corp-components.js',
  'Bundle UMD': 'dist/corp-components.umd.cjs',
  'Styles': 'dist/corp-components.css',
  'Types': 'dist/index.d.ts',
};

console.log('*** Verificando build...\n');

let hasErrors = false;

for (const [name, file] of Object.entries(checks)) {
  const exists = fs.existsSync(file);
  const size = exists ? fs.statSync(file).size : 0;
  const sizeKB = (size / 1024).toFixed(2);

  if (!exists) {
    console.log(`*** ${name}: FALTANDO`);
    hasErrors = true;
  } else if (size < 1000) {
    console.log(`*** ${name}: ${sizeKB}KB (muito pequeno?)`);
  } else {
    console.log(`*** ${name}: ${sizeKB}KB`);
  }
}

if (hasErrors) {
  console.log('\n*** Build INCOMPLETO! Execute: npm run build');
  process.exit(1);
} else {
  console.log('\n*** Build OK! Pode fazer npm link.');
}
