/**
 * 🔧 Componentes Playground - Router + Home Config
 *
 * ⚠️ FONTE DA VERDADE: Adicione componentes APENAS AQUI
 *
 * Gera rotas e cards automaticamente. Adicionar componente:
 * 1. Criar playground/pages/NomeTest.vue
 * 2. Adicionar neste array
 * 3. Pronto - router e home atualizam sozinhos
 */

// ============== TYPES ==============

export interface IPlaygroundComponent {
  name: string; // Nome do componente (ex: 'Button')
  path: string; // Path da rota (ex: '/buttons')
  routeName: string; // Nome da rota (ex: 'buttons')
  fileName: string; // Nome do arquivo .vue (ex: 'ButtonTest')
  title: string; // Título do card (ex: 'Buttons')
  description: string; // Descrição do card
  order: number; // Ordem de exibição (menor = primeiro)
}

// ============== COMPONENTES ==============

export const PLAYGROUND_COMPONENTS: IPlaygroundComponent[] = [
  {
    name: 'Badge',
    path: '/badges',
    routeName: 'badges',
    fileName: 'BadgeTest',
    title: 'Badges',
    description: 'Testar variantes de badges',
    order: 1,
  },
  {
    name: 'Breadcrumb',
    path: '/breadcrumbs',
    routeName: 'breadcrumbs',
    fileName: 'BreadcrumbTest',
    title: 'Breadcrumbs',
    description: 'Testar breadcrumbs com dividers, icons e cores',
    order: 2,
  },
  {
    name: 'Button',
    path: '/buttons',
    routeName: 'buttons',
    fileName: 'ButtonTest',
    title: 'Buttons',
    description: 'Testar variantes de botoes',
    order: 3,
  },
  {
    name: 'Checkbox',
    path: '/checkboxes',
    routeName: 'checkboxes',
    fileName: 'CheckboxTest',
    title: 'Checkboxes',
    description: 'Testar checkboxes com cores, estados e validacao',
    order: 4,
  },
  {
    name: 'Input',
    path: '/inputs',
    routeName: 'inputs',
    fileName: 'InputTest',
    title: 'Inputs',
    description: 'Testar inputs com validacao e mascaras',
    order: 5,
  },
  {
    name: 'Progress',
    path: '/progress',
    routeName: 'progress',
    fileName: 'ProgressTest',
    title: 'Progress',
    description: 'Testar progress bars com cores, animacoes e chunks',
    order: 6,
  },
  {
    name: 'RadioGroup',
    path: '/radiogroups',
    routeName: 'radiogroups',
    fileName: 'RadioGroupTest',
    title: 'RadioGroups',
    description: 'Testar radio groups com cores, orientacao e validacao',
    order: 7,
  },
  {
    name: 'Select',
    path: '/selects',
    routeName: 'selects',
    fileName: 'SelectTest',
    title: 'Selects',
    description: 'Testar selects com multiple, chips e validacao',
    order: 8,
  },
  {
    name: 'Switch',
    path: '/switches',
    routeName: 'switches',
    fileName: 'SwitchTest',
    title: 'Switches',
    description: 'Testar switches com cores, estados e validacao',
    order: 9,
  },
  {
    name: 'Textarea',
    path: '/textareas',
    routeName: 'textareas',
    fileName: 'TextareaTest',
    title: 'Textareas',
    description: 'Testar textareas com auto-grow, counter e validacao',
    order: 10,
  },
];

// ============== HELPERS ==============

export const getSortedComponents = (): IPlaygroundComponent[] => {
  return [...PLAYGROUND_COMPONENTS].sort((a, b) => a.order - b.order);
};

// Gera rotas no formato Vue Router
export const getPlaygroundRoutes = (componentMap: Record<string, any>) => {
  return getSortedComponents().map(component => ({
    path: component.path,
    name: component.routeName,
    component: componentMap[component.name],
  }));
};

export const getComponentByName = (
  name: string
): IPlaygroundComponent | undefined => {
  return PLAYGROUND_COMPONENTS.find(c => c.name === name);
};
