<script setup lang="ts">
import { Folder, Trash2, LayoutGrid } from '@lucide/vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    name: string
    count?: number
    depth?: number
    active?: boolean
    kind?: 'folder' | 'all' | 'deleted'
  }>(),
  { count: 0, depth: 0, active: false, kind: 'folder' },
)

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    :style="{ paddingLeft: `${4 + props.depth * 12}px` }"
    :class="
      cn(
        'flex h-7 w-full items-center gap-1.5 rounded-md pr-2 text-[13px] hover:bg-surface-hover',
        props.active ? 'bg-surface-active font-medium' : 'text-foreground',
      )
    "
    @click="$emit('click')"
  >
    <Trash2 v-if="props.kind === 'deleted'" class="h-4 w-4 shrink-0 text-muted-foreground" />
    <LayoutGrid v-else-if="props.kind === 'all'" class="h-4 w-4 shrink-0" />
    <Folder v-else class="h-4 w-4 shrink-0 text-accent-folder" />
    <span class="min-w-0 flex-1 truncate text-left">{{ props.name }}</span>
    <span v-if="props.count" class="text-xs text-muted-foreground">{{ props.count }}</span>
  </button>
</template>
