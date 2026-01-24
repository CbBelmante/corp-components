/**
 * ⚙️ config - Configuração centralizada type-safe
 *
 * Sistema único de configuração para corp-components com aliases,
 * ports, paths e metadados de package. Gerencia 2 ambientes (dev, prod).
 *
 * 🔗 DEPENDÊNCIAS:
 * - Vite (import.meta.env)
 */

// ============== TYPES & INTERFACES ==============

export type Environment = 'development' | 'production';

export interface IPackageConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  repository: string;
}

export interface IDevServerConfig {
  playgroundPort: number;
  docsPort: number;
  playgroundUrl: string;
  docsUrl: string;
}

export interface IBuildConfig {
  outDir: string;
  libName: string;
  libFileName: string;
}

export interface IFeaturesConfig {
  enableDebugLogs: boolean;
  enableHMR: boolean;
  enableSourceMaps: boolean;
}

export interface ILinksConfig {
  github?: string;
  npm?: string;
  docs?: string;
  issues?: string;
}

export interface ICorpComponentsConfig {
  environment: Environment;
  configId: string;
  isDevelopment: boolean;
  isProduction: boolean;
  package: IPackageConfig;
  devServer: IDevServerConfig;
  build: IBuildConfig;
  features: IFeaturesConfig;
  links: ILinksConfig;
  aliases: Record<string, string>;
}

// ============== ALIASES DEFINITIONS ==============

/**
 * Definição centralizada de path aliases (FONTE ÚNICA)
 *
 * ⚠️ IMPORTANTE: Ao adicionar/remover alias aqui, execute:
 *    npm run syncAliases
 *
 * Isso sincroniza automaticamente o tsconfig.json
 */
const ALIAS_DEFINITIONS = {
  '@': './src',
  '@playground': './playground',
  '@docs': './docs',
  '@scripts': './scripts',
  '@assets': './src/assets',
  '@generated': './src/generated',
  '@components': './src/components',
  '@base': './src/components/base',
  '@shadcn': './src/components/base/shadcn',
  '@corp': './src/components/corp',
  '@commonStyles': './src/components/ui/commonStyles/index.ts',
  '@composables': './src/composables',
  '@utils': './src/utils',
  '@types': './src/types',
  '@locales': './src/locales/index.ts',
} as const;

// ============== CONSTANTES COMPARTILHADAS ==============

/**
 * Versão da aplicação (sincronizada com package.json)
 */
const PACKAGE_VERSION = '0.1.0';

/**
 * Ports dos servidores de desenvolvimento
 */
const PORTS = {
  development: {
    playground: 2223,
    docs: 2224,
  },
  production: {
    playground: 2223,
    docs: 2224,
  },
} as const;

// ============== CONFIGURAÇÕES POR AMBIENTE ==============

const developmentConfig: ICorpComponentsConfig = {
  environment: 'development',
  configId: 'corp-components-dev',
  isDevelopment: true,
  isProduction: false,

  package: {
    name: '@corp/components',
    version: PACKAGE_VERSION,
    description: 'Vue 3 Component Library - TypeScript First',
    author: 'CbBelmante',
    license: 'MIT',
    repository: 'https://github.com/CbBelmante/corp-components',
  },

  devServer: {
    playgroundPort: PORTS.development.playground,
    docsPort: PORTS.development.docs,
    playgroundUrl: `http://localhost:${PORTS.development.playground}`,
    docsUrl: `http://localhost:${PORTS.development.docs}`,
  },

  build: {
    outDir: 'dist',
    libName: 'CorpComponents',
    libFileName: 'corp-components',
  },

  features: {
    enableDebugLogs: true,
    enableHMR: true,
    enableSourceMaps: true,
  },

  links: {
    github: 'https://github.com/CbBelmante/corp-components',
    npm: 'https://www.npmjs.com/package/@corp/components',
    docs: 'http://localhost:2224',
    issues: 'https://github.com/CbBelmante/corp-components/issues',
  },

  aliases: ALIAS_DEFINITIONS,
};

const productionConfig: ICorpComponentsConfig = {
  environment: 'production',
  configId: 'corp-components-prod',
  isDevelopment: false,
  isProduction: true,

  package: {
    name: '@corp/components',
    version: PACKAGE_VERSION,
    description: 'Vue 3 Component Library - TypeScript First',
    author: 'CbBelmante',
    license: 'MIT',
    repository: 'https://github.com/CbBelmante/corp-components',
  },

  devServer: {
    playgroundPort: PORTS.production.playground,
    docsPort: PORTS.production.docs,
    playgroundUrl: `http://localhost:${PORTS.production.playground}`,
    docsUrl: 'https://corp-components.dev', // URL de produção futura
  },

  build: {
    outDir: 'dist',
    libName: 'CorpComponents',
    libFileName: 'corp-components',
  },

  features: {
    enableDebugLogs: false,
    enableHMR: false,
    enableSourceMaps: false,
  },

  links: {
    github: 'https://github.com/CbBelmante/corp-components',
    npm: 'https://www.npmjs.com/package/@corp/components',
    docs: 'https://corp-components.dev',
    issues: 'https://github.com/CbBelmante/corp-components/issues',
  },

  aliases: ALIAS_DEFINITIONS,
};

// ============== MAPA DE AMBIENTES ==============

const environments: Record<Environment, ICorpComponentsConfig> = {
  development: developmentConfig,
  production: productionConfig,
};

// ============== SELEÇÃO DE AMBIENTE ==============

/**
 * Detecta o ambiente atual baseado em variáveis de ambiente
 *
 * @returns Environment atual ('development' | 'production')
 */
function getCurrentEnvironment(): Environment {
  // Quando executado em Node.js (scripts), import.meta.env pode não existir
  const env =
    (typeof import.meta.env !== 'undefined'
      ? import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE
      : process.env.VITE_ENVIRONMENT || process.env.NODE_ENV) || 'development';

  switch (env) {
    case 'production':
    case 'prod':
      return 'production';
    default:
      return 'development';
  }
}

const currentEnvironment = getCurrentEnvironment();

export const config: Readonly<ICorpComponentsConfig> =
  environments[currentEnvironment] || environments.development;

// ============== HELPERS DE ALIASES ==============

/**
 * Converte definições de aliases para formato Vite/VitePress
 *
 * ⚠️ IMPORTANTE: Apenas para uso em arquivos de config (Vite/VitePress)
 * Não é incluído no bundle da biblioteca (tree-shaking).
 *
 * @param baseUrl - URL base do projeto (import.meta.url)
 * @returns Objeto com aliases resolvidos como paths absolutos
 */
export async function getAliases(
  baseUrl: string | URL
): Promise<Record<string, string>> {
  // Import dinâmico apenas quando função é chamada
  const { fileURLToPath } = await import('node:url');

  const aliases: Record<string, string> = {};

  for (const [alias, path] of Object.entries(config.aliases)) {
    aliases[alias] = fileURLToPath(new URL(path, baseUrl));
  }

  return aliases;
}

/**
 * Retorna definições brutas de aliases para uso em scripts de build
 * (sync-aliases.ts usa isso para gerar tsconfig.json paths)
 *
 * @returns Record de aliases no formato { '@alias': './path' }
 */
export function getAliasDefinitions(): Record<string, string> {
  return { ...config.aliases };
}

// ============== LOGS DE STARTUP ==============

// Apenas mostra logs quando executado em contexto Vite (não em scripts Node.js)
if (config.isDevelopment && typeof import.meta.env !== 'undefined') {
  console.log('🎨 corp-components Configuration Loaded:');
  console.log(`   Environment: ${config.environment}`);
  console.log(`   Version: ${config.package.version}`);
  console.log(`   Playground: ${config.devServer.playgroundUrl}`);
  console.log(`   Docs: ${config.devServer.docsUrl}`);
  console.log(
    `   Debug Logs: ${config.features.enableDebugLogs ? '✅' : '❌'}`
  );
  console.log(`   HMR: ${config.features.enableHMR ? '✅' : '❌'}`);
}

// ============== EXPORTS ==============

export { environments, currentEnvironment, ALIAS_DEFINITIONS };
export const isDevelopment = config.isDevelopment;
export const isProduction = config.isProduction;
export default config;
