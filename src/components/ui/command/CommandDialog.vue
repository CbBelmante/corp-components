<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Command from './Command.vue';

interface CommandDialogProps extends DialogRootProps {
  /**
   * Modo persistente: não fecha ao clicar no overlay ou pressionar ESC
   * Útil quando só quer permitir fechar via botão X ou ação explícita
   */
  persistent?: boolean;
}

const props = withDefaults(defineProps<CommandDialogProps>(), {
  persistent: false,
  modal: true,
});
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <!--
    Se persistent=true, passa modal=false para Dialog
    Isso faz com que NÃO feche ao clicar fora ou pressionar ESC
  -->
  <Dialog v-bind="forwarded" :modal="!persistent">
    <DialogContent class="overflow-hidden p-0 shadow-lg">
      <Command
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
      >
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
