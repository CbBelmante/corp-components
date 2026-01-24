/**
 * 🎯 Interface UNIFICADA para Menu Items
 * Usada em: CorpSidebar, CorpAppBar
 */

export interface IMenuItem {
  label: string;
  icon?: string;
  iconColor?: string;
  to?: string;
  routeName?: string;
  action?: string | (() => void | Promise<void>);
  tooltip?: string;
  variant?: 'default' | 'danger';
  children?: IMenuItem[];
  items?: IMenuItem[]; // Alias para children (aceita ambos)
  defaultOpen?: boolean;
}

/**
 * 🎯 Config de Dropdown (específico AppBar)
 */
export interface IAppBarDropdownConfig {
  mode?: 'vertical' | 'horizontal';
  fullWidth?: boolean;
  alignment?: 'left' | 'center' | 'right';
  itemsAlignment?: 'left' | 'center' | 'right';
  hoverMode?: boolean;
  arrow?: boolean;
}

/**
 * 🎯 Menu Item específico do AppBar (com dropdown config)
 */
export interface IAppBarMenuItem extends IMenuItem {
  dropdown?: IAppBarDropdownConfig;
}
