<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import type { MockFile } from '@/lib/mock-data'

defineProps<{ files: MockFile[] }>()
const emit = defineEmits<{ select: [id: string] }>()
const model = defineModel<boolean>('open', { required: true })
</script>

<template>
  <CommandDialog v-model:open="model" title="Buscar" description="Buscar arquivo, pasta ou comando…">
    <CommandInput placeholder="Buscar arquivo, pasta ou comando…" />
    <CommandList>
      <CommandEmpty>Nada encontrado</CommandEmpty>
      <CommandGroup heading="Arquivos">
        <CommandItem v-for="file in files" :key="file.id" :value="file.title" @select="emit('select', file.id)">
          {{ file.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
