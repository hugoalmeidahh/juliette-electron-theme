<script setup lang="ts">
import FileRow from './FileRow.vue'
import type { MockFile } from '@/lib/mock-data'

defineProps<{ files: MockFile[]; activeId: string | null }>()
const emit = defineEmits<{ select: [id: string]; contextmenu: [id: string, event: MouseEvent] }>()
</script>

<template>
  <div class="flex flex-col gap-0.5 p-1.5">
    <FileRow
      v-for="file in files"
      :key="file.id"
      :file="file"
      :active="file.id === activeId"
      @click="emit('select', file.id)"
      @contextmenu="(event) => emit('contextmenu', file.id, event)"
    />
    <p v-if="!files.length" class="p-3 text-center text-sm text-muted-foreground">Nenhum arquivo</p>
  </div>
</template>
