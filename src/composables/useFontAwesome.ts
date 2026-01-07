/**
 * useFontAwesome - Sistema de Icones FontAwesome Corp Components
 *
 * Renderizacao de icones FontAwesome via @fortawesome/vue-fontawesome.
 * Suporta solid (fas), regular (far) e brands (fab).
 *
 * DEPENDENCIAS:
 * - @fortawesome/fontawesome-svg-core
 * - @fortawesome/vue-fontawesome
 * - @fortawesome/free-solid-svg-icons
 * - @fortawesome/free-brands-svg-icons
 *
 * OPCIONAL (instale conforme necessidade):
 * - bun add @fortawesome/free-regular-svg-icons
 */

import { h, defineAsyncComponent, type Component } from 'vue';

// ============== TIPOS ==============

export interface IFontAwesomeIconProps {
  prefix: 'fas' | 'far' | 'fab';
  iconName: string;
}

// ============== HELPER FUNCTIONS ==============

/**
 * Parse do nome do icone FontAwesome
 *
 * @example
 * parseFaIcon('fas fa-user')     // { prefix: 'fas', iconName: 'user' }
 * parseFaIcon('far fa-heart')    // { prefix: 'far', iconName: 'heart' }
 * parseFaIcon('fab fa-github')   // { prefix: 'fab', iconName: 'github' }
 * parseFaIcon('fa-user')         // { prefix: 'fas', iconName: 'user' } (default solid)
 */
export const parseFaIcon = (
  iconString: string
): IFontAwesomeIconProps | null => {
  const cleaned = iconString.trim();

  // Formato: "fas fa-user" ou "far fa-heart" ou "fab fa-github"
  const fullMatch = cleaned.match(/^(fas|far|fab)\s+fa-(.+)$/);
  if (fullMatch) {
    return {
      prefix: fullMatch[1] as 'fas' | 'far' | 'fab',
      iconName: fullMatch[2],
    };
  }

  // Formato: "fa-user" (assume solid)
  const shortMatch = cleaned.match(/^fa-(.+)$/);
  if (shortMatch) {
    return {
      prefix: 'fas',
      iconName: shortMatch[1],
    };
  }

  return null;
};

// ============== LAZY IMPORT ==============

let library: any = null;
let faIconsLoaded = false;

/**
 * Carrega FontAwesome dinamicamente (lazy loading)
 */
const loadFontAwesome = async (): Promise<void> => {
  if (faIconsLoaded) return;

  const { library: faLibrary } =
    await import('@fortawesome/fontawesome-svg-core');
  library = faLibrary;

  // Carrega solid icons (fas)
  const { fas } = await import('@fortawesome/free-solid-svg-icons');
  library.add(fas);

  // Carrega brands icons (fab)
  const { fab } = await import('@fortawesome/free-brands-svg-icons');
  library.add(fab);

  faIconsLoaded = true;
};

/**
 * Registra icon packs adicionais (regular)
 * Chamar no main.ts se precisar de far (outline icons)
 *
 * @example
 * // main.ts
 * import { registerFontAwesomePack } from 'corp-components'
 * import { far } from '@fortawesome/free-regular-svg-icons'
 *
 * registerFontAwesomePack(far)
 */
export const registerFontAwesomePack = async (iconPack: any): Promise<void> => {
  if (!library) {
    const { library: faLibrary } =
      await import('@fortawesome/fontawesome-svg-core');
    library = faLibrary;
  }
  library.add(iconPack);
};

// ============== MAIN FUNCTION ==============

/**
 * Retorna um componente async para FontAwesome
 *
 * @example
 * getFontAwesomeIcon('fas fa-user')
 * getFontAwesomeIcon('far fa-heart')
 * getFontAwesomeIcon('fab fa-github')
 */
export const getFontAwesomeIcon = (iconString: string): Component | null => {
  const parsed = parseFaIcon(iconString);
  if (!parsed) return null;

  return defineAsyncComponent({
    loader: async () => {
      await loadFontAwesome();
      const { FontAwesomeIcon } = await import('@fortawesome/vue-fontawesome');

      // Retorna um componente funcional que renderiza o FontAwesomeIcon
      return {
        name: 'FontAwesomeWrapper',
        props: ['style', 'class'],
        setup(props: any) {
          return () =>
            h(FontAwesomeIcon, {
              icon: [parsed.prefix, parsed.iconName],
              style: props.style,
              class: props.class,
            });
        },
      };
    },
    loadingComponent: {
      render: () => h('span', { style: { opacity: 0.3 } }, ''),
    },
    delay: 0,
  });
};

/**
 * Verifica se FontAwesome esta disponivel
 */
export const isFontAwesomeAvailable = async (): Promise<boolean> => {
  try {
    await import('@fortawesome/vue-fontawesome');
    return true;
  } catch {
    return false;
  }
};
