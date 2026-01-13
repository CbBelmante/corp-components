/**
 * 🔧 Componentes Docs - Sidebar Config
 *
 * ⚠️ FONTE DA VERDADE: Adicione componentes APENAS AQUI
 *
 * Gera sidebar automaticamente. Adicionar componente:
 * 1. Criar docs/public/components/nome.md
 * 2. Adicionar neste array
 * 3. Pronto - sidebar atualiza sozinho
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
// Nenhuma

// ============== DEPENDÊNCIAS INTERNAS ==============
// Nenhuma

// ============== TYPES ==============

export interface IDocsComponent {
  name: string;   // Nome do arquivo .md (sem extensão)
  label: string;  // Texto do sidebar
  order: number;  // Ordem de exibição (menor = primeiro)
}

// ============== COMPONENTES ==============

export const DOCS_COMPONENTS: IDocsComponent[] = [
  { name: 'badge', label: 'Badge', order: 1 },
  { name: 'button', label: 'Button', order: 2 },
  { name: 'checkbox', label: 'Checkbox', order: 3 },
  { name: 'icon', label: 'Icon', order: 4 },
  { name: 'input', label: 'Input', order: 5 },
  { name: 'radio-group', label: 'Radio Group', order: 6 },
  { name: 'select', label: 'Select', order: 7 },
  { name: 'switch', label: 'Switch', order: 8 },
  { name: 'textarea', label: 'Textarea', order: 9 },
];

// ============== HELPERS ==============

export const getSortedComponents = (): IDocsComponent[] => {
  return [...DOCS_COMPONENTS].sort((a, b) => a.order - b.order);
};

// Gera items no formato VitePress
export const getDocsSidebarItems = () => {
  return getSortedComponents().map(c => ({
    text: c.label,
    link: `/components/${c.name}`,
  }));
};

export const getComponentByName = (name: string): IDocsComponent | undefined => {
  return DOCS_COMPONENTS.find(c => c.name === name);
};
