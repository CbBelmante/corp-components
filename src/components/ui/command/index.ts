import type { Ref } from 'vue';
import { createContext } from 'reka-ui';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { Density } from '../commonStyles';
export { default as CorpCommand } from './CorpCommand.vue';
export { default as CorpCommandInternal } from './CorpCommandInternal.vue';
export { default as CommandEmpty } from './CommandEmpty.vue';
export { default as CommandGroup } from './CommandGroup.vue';
export { default as CommandInput } from './CommandInput.vue';
export { default as CommandItem } from './CommandItem.vue';
export { default as CommandList } from './CommandList.vue';
export { default as CommandSeparator } from './CommandSeparator.vue';
export { default as CommandShortcut } from './CommandShortcut.vue';

export type { Density as CommandDensity };

export type CommandRoundedPreset =
  | 'default'
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

// ============== COMMAND VARIANTS (CVA) ==============

/**
 * CVA define estrutura, cores tratadas no componente via CSS variables
 *
 * Command não tem variant visual (sempre elevated com borda)
 * Apenas density e rounded são configuráveis
 */
export const commandVariants = cva(
  [
    // Base
    'flex h-full w-full flex-col overflow-hidden rounded-md',
    'bg-popover text-popover-foreground',
    'border border-[hsl(var(--corp-def-command-border))]',
  ],
  {
    variants: {
      density: {
        compact:
          '[&_.commandItem]:py-1.5 [&_.commandItem]:text-xs [&_.commandItem]:px-2',
        regular:
          '[&_.commandItem]:py-2.5 [&_.commandItem]:text-sm [&_.commandItem]:px-3',
        comfortable:
          '[&_.commandItem]:py-3.5 [&_.commandItem]:text-base [&_.commandItem]:px-4',
      },
      rounded: {
        default: 'rounded-md',
        none: 'rounded-none',
        xs: 'rounded-[2px]',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      density: 'regular',
      rounded: 'default',
    },
  }
);

export type CommandVariants = VariantProps<typeof commandVariants>;

export const [useCommand, provideCommandContext] = createContext<{
  allItems: Ref<Map<string, string>>;
  allGroups: Ref<Map<string, Set<string>>>;
  filterState: {
    search: string;
    filtered: {
      count: number;
      items: Map<string, number>;
      groups: Set<string>;
    };
  };
}>('Command');

export const [useCommandGroup, provideCommandGroupContext] = createContext<{
  id?: string;
}>('CommandGroup');

// Types
export interface ICommand {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface ICommandGroup {
  id: string;
  title: string;
  icon?: string;
  items: ICommand[];
}
