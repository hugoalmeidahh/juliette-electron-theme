<script setup lang="ts">
import { useResizablePane } from '@/composables/useResizablePane'

const emit = defineEmits<{ resize: [deltaX: number] }>()
const { startDrag } = useResizablePane((deltaX) => emit('resize', deltaX))
</script>

<template>
  <div
    class="w-px shrink-0 cursor-col-resize bg-separator hover:w-0.5 hover:bg-muted-foreground/40"
    @pointerdown="startDrag"
  />
</template>
