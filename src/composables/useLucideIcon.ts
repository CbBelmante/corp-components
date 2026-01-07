/**
 * 🔧 useLucideIcon - Sistema de Ícones Lucide Corp Components
 *
 * Import dinâmico lazy de ícones Lucide Vue Next.
 * ZERO MANUTENÇÃO: Aceita qualquer ícone do lucide-vue-next automaticamente.
 *
 * 🔗 DEPENDÊNCIAS:
 * - lucide-vue-next
 */

import { h, type Component, defineAsyncComponent } from 'vue';

// ============== TIPOS ==============

type ILucideIconModule = Record<string, Component>;

// ============== CACHE ==============

let lucideIcons: ILucideIconModule | null = null;
let loadPromise: Promise<ILucideIconModule> | null = null;

// ============== HELPER FUNCTIONS ==============

/**
 * Converte string para PascalCase
 */
const toPascalCase = (str: string): string => {
  if (!/[-_\s]/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str
    .split(/[-_\s]/)
    .map(word => {
      if (/^\d+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

// ============== LAZY LOADING ==============

/**
 * Carrega Lucide icons sob demanda (lazy)
 */
const loadLucideIcons = async (): Promise<ILucideIconModule> => {
  if (lucideIcons) return lucideIcons;

  if (!loadPromise) {
    loadPromise = import('lucide-vue-next').then(module => {
      lucideIcons = module as unknown as ILucideIconModule;
      return lucideIcons;
    });
  }

  return loadPromise;
};

// ============== MAIN FUNCTION ==============

/**
 * Retorna componente Lucide por nome dinâmico (lazy loaded)
 *
 * @example
 * getLucideIcon('User')        // PascalCase
 * getLucideIcon('luc-user')    // Com prefixo
 * getLucideIcon('user-plus')   // kebab-case
 */
export const getLucideIcon = (iconName: string): Component => {
  const cleanName = iconName.replace(/^luc-/, '');
  const pascalName = toPascalCase(cleanName);

  // Retorna AsyncComponent que carrega Lucide sob demanda
  return defineAsyncComponent({
    loader: async () => {
      const icons = await loadLucideIcons();
      const IconComponent = icons[pascalName];

      if (!IconComponent) {
        // Fallback para Search se não encontrar
        return (
          icons['Search'] || {
            render: () => h('span', '?'),
          }
        );
      }

      return IconComponent;
    },
    loadingComponent: {
      render: () => h('span', { style: { opacity: 0.3 } }, '...'),
    },
    delay: 0,
  });
};

/**
 * Pré-carrega os ícones Lucide (opcional, para evitar flash)
 */
export const preloadLucideIcons = (): Promise<ILucideIconModule> => {
  return loadLucideIcons();
};
