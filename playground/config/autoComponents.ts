/**
 * 🤖 Auto-Discovery de Componentes do Playground
 *
 * Sistema 100% automático:
 * 1. Adicione *Test.vue em pages/
 * 2. Exporte playgroundMeta no arquivo
 * 3. Pronto! Aparece automaticamente
 */

// Descobre todos os *Test.vue automaticamente
const modules = import.meta.glob('../pages/*Test.vue', { eager: true });
// Descobre metadados (se existir)
const metaModules = import.meta.glob('../pages/*Test.meta.ts', { eager: true });

export interface IPlaygroundMeta {
  title: string;
  description: string;
  order: number;
  path?: string; // Opcional: path customizado (ex: '/command')
}

export interface IPlaygroundComponent {
  name: string;
  path: string;
  routeName: string;
  fileName: string;
  title: string;
  description: string;
  order: number;
  component: any;
}

// Extrai informações do arquivo
function extractComponentInfo(
  filePath: string,
  module: any
): IPlaygroundComponent | null {
  // Extrai nome do arquivo: "../pages/CommandTest.vue" -> "CommandTest"
  const match = filePath.match(/\/([A-Z][a-zA-Z]+)Test\.vue$/);
  if (!match) return null;

  const name = match[1]; // "Command"
  const fileName = `${name}Test`; // "CommandTest"

  // Busca metadados do arquivo .meta.ts (se existir)
  const metaPath = filePath.replace('.vue', '.meta.ts');
  const metaModule = metaModules[metaPath];
  const customMeta = metaModule?.default;

  // Metadados (usa .meta.ts ou gera automaticamente)
  const meta: IPlaygroundMeta = customMeta || {
    title: name,
    description: `Testar componente ${name}`,
    order: 999, // Sem ordem = vai pro final
  };

  // Gera path e routeName (usa custom ou gera automaticamente)
  const path = meta.path || `/${name.toLowerCase()}s`;
  const routeName = meta.path?.slice(1) || `${name.toLowerCase()}s`;

  return {
    name,
    path,
    routeName,
    fileName,
    title: meta.title,
    description: meta.description,
    order: meta.order,
    component: module.default,
  };
}

// Processa todos os módulos descobertos
const components: IPlaygroundComponent[] = [];
for (const [filePath, module] of Object.entries(modules)) {
  const info = extractComponentInfo(filePath, module);
  if (info) {
    components.push(info);
  }
}

// Ordena por order
export const PLAYGROUND_COMPONENTS = components.sort(
  (a, b) => a.order - b.order
);

// Helper: Rotas para Vue Router
export const getPlaygroundRoutes = () => {
  return PLAYGROUND_COMPONENTS.map(c => ({
    path: c.path,
    name: c.routeName,
    component: c.component,
  }));
};

// Helper: Buscar por nome
export const getComponentByName = (name: string) => {
  return PLAYGROUND_COMPONENTS.find(c => c.name === name);
};
