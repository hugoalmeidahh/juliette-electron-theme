<script setup lang="ts">
import { X } from '@lucide/vue'
import type { MockFile } from '@/lib/mock-data'

defineProps<{ file: MockFile | null }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <aside class="flex w-64 shrink-0 flex-col border-l border-separator bg-surface-list">
    <div class="flex h-9 shrink-0 items-center justify-between border-b border-separator px-3">
      <span class="text-xs font-semibold">Detalhes</span>
      <button type="button" class="grid h-6 w-6 place-items-center rounded hover:bg-control-hover" @click="emit('close')">
        <X class="h-4 w-4" />
      </button>
    </div>
    <div v-if="file" class="flex flex-col gap-3 p-3 text-sm">
      <dl class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-xs">
        <dt class="text-muted-foreground">Nome</dt>
        <dd class="truncate text-right">{{ file.title }}</dd>
        <dt class="text-muted-foreground">Tipo</dt>
        <dd class="truncate text-right uppercase">{{ file.format }}</dd>
        <dt class="text-muted-foreground">Atualizado</dt>
        <dd class="truncate text-right">{{ file.date }}</dd>
      </dl>
    </div>
    <p v-else class="p-3 text-sm text-muted-foreground">Nenhum arquivo selecionado</p>
  </aside>
</template>
