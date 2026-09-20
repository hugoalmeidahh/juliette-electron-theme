<script setup lang="ts">
import FolderItem from './FolderItem.vue'
import type { MockFolder } from '@/lib/mock-data'

defineProps<{
  folders: MockFolder[]
  activeId: string
}>()
const emit = defineEmits<{ select: [id: string] }>()
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <FolderItem name="Todos Arquivos" kind="all" :active="activeId === 'all'" @click="emit('select', 'all')" />
    <FolderItem
      v-for="folder in folders"
      :key="folder.id"
      :name="folder.name"
      :depth="folder.depth"
      :count="folder.count"
      :active="activeId === folder.id"
      @click="emit('select', folder.id)"
    />
    <div class="my-1.5 h-px" />
    <FolderItem name="Apagadas recentemente" kind="deleted" :active="activeId === 'deleted'" @click="emit('select', 'deleted')" />
  </div>
</template>
