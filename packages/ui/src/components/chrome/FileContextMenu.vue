<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

defineEmits<{ rename: []; reveal: []; trash: [] }>()
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem @click="$emit('rename')">Renomear</ContextMenuItem>
      <ContextMenuItem @click="$emit('reveal')">Abrir no gerenciador de arquivos</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive" @click="$emit('trash')">Mover para a lixeira</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
