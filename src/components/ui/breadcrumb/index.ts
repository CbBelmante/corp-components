import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density } from '../commonStyles';

// ============== EXPORTS ==============

export { default as CorpBreadcrumb } from './CorpBreadcrumb.vue';

// Componentes internos (shadcn) - NÃO exportados
// BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage,
// BreadcrumbSeparator, BreadcrumbEllipsis são usados internamente

// ============== TYPES ==============

export type BreadcrumbDensity = Density;

export interface IBreadcrumbItem {
  title: string;
  to?: string | { name: string; params?: any };
  href?: string;
  disabled?: boolean;
  icon?: string;
}

// ============== BREADCRUMB VARIANTS (CVA) ==============

/**
 * CVA para CorpBreadcrumb
 *
 * - density: Controla espaçamento vertical (gap entre items)
 */
export const breadcrumbVariants = cva('flex items-center', {
  variants: {
    density: {
      compact: '!gap-1',
      regular: '!gap-2',
      comfortable: '!gap-3',
    },
  },
  defaultVariants: {
    density: 'regular',
  },
});

export type BreadcrumbVariants = VariantProps<typeof breadcrumbVariants>;
