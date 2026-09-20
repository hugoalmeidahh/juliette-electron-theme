<script setup lang="ts">
import { X } from '@lucide/vue'
import { cn } from '@/lib/utils'

export interface EditorTab {
  id: string
  label: string
  dirty?: boolean
}

const props = defineProps<{ tabs: EditorTab[]; activeId: string | null }>()
const emit = defineEmits<{ select: [id: string]; close: [id: string] }>()
</script>

<template>
  <div v-if="props.tabs.length" class="flex h-9 shrink-0 overflow-x-auto border-b border-separator">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      type="button"
      :class="
        cn(
          'group flex h-full max-w-52 shrink-0 items-center gap-1.5 border-r border-separator px-2.5 text-xs text-muted-foreground hover:bg-control-hover',
          tab.id === props.activeId ? 'bg-surface-editor text-foreground shadow-[inset_0_2px_0_var(--color-accent-folder)]' : '',
        )
      "
      @click="emit('select', tab.id)"
    >
      <span class="min-w-0 flex-1 truncate">{{ tab.label }}<template v-if="tab.dirty"> •</template></span>
      <span
        class="grid h-4 w-4 shrink-0 place-items-center rounded opacity-0 hover:bg-surface-active group-hover:opacity-100"
        @click.stop="emit('close', tab.id)"
      >
        <X class="h-3 w-3" />
      </span>
    </button>
  </div>
</template>
