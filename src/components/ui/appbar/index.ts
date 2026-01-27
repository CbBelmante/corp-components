import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as CorpAppBar } from './CorpAppBar.vue';
export type {
  IMenuItem,
  IAppBarMenuItem,
  IAppBarDropdownConfig,
} from '@/components/ui/types/menu';

// ============== APPBAR VARIANTS (CVA) ==============

/**
 * CVA do AppBar - background vem do theme
 */
export const appBarVariants = cva([
  // Base
  'flex items-center justify-between px-6 border-b border-border transition-all duration-200',
  // Background padrão do theme
  'bg-[hsl(var(--corp-def-appbar-bg))]',
]);

export type AppBarVariants = VariantProps<typeof appBarVariants>;
