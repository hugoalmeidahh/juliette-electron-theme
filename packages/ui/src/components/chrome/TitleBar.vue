<script setup lang="ts">
import { Search, Minus, Square, X } from '@lucide/vue'

withDefaults(
  defineProps<{
    title?: string
    isElectron?: boolean
    isMaximized?: boolean
    isMac?: boolean
  }>(),
  { title: 'Arquivos', isElectron: false, isMaximized: false, isMac: false },
)

const emit = defineEmits<{
  minimize: []
  'toggle-maximize': []
  close: []
  search: []
}>()
</script>

<template>
  <header
    v-if="isElectron"
    class="flex h-9 shrink-0 items-center border-b border-separator bg-surface-sidebar text-muted-foreground"
    style="-webkit-app-region: drag"
    @dblclick="emit('toggle-maximize')"
  >
    <div class="min-w-0 flex-1 px-3" :class="isMac ? 'pl-20' : ''">
      <span class="truncate text-xs font-semibold">{{ title }}</span>
    </div>
    <div class="flex-1" />
    <button
      type="button"
      title="Buscar arquivo (Ctrl+P)"
      class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-control-hover"
      style="-webkit-app-region: no-drag"
      @click="emit('search')"
    >
      <Search class="h-3.5 w-3.5" />
      {{ title }}
    </button>
    <div class="flex-1" />
    <div v-if="!isMac" class="flex shrink-0 items-center" style="-webkit-app-region: no-drag">
      <button type="button" title="Minimizar" class="grid h-9 w-11 place-items-center hover:bg-control-hover" @click="emit('minimize')">
        <Minus class="h-3 w-3" />
      </button>
      <button type="button" title="Maximizar" class="grid h-9 w-11 place-items-center hover:bg-control-hover" @click="emit('toggle-maximize')">
        <Square class="h-2.5 w-2.5" />
      </button>
      <button
        type="button"
        title="Fechar"
        class="grid h-9 w-11 place-items-center hover:bg-red-600 hover:text-white"
        @click="emit('close')"
      >
        <X class="h-3.5 w-3.5" />
      </button>
    </div>
  </header>
</template>
