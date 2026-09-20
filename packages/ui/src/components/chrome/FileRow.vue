<script setup lang="ts">
import { FileText, Code, Database, PenTool, File } from '@lucide/vue'
import { cn } from '@/lib/utils'
import type { MockFile } from '@/lib/mock-data'

const ICONS = { md: FileText, html: Code, db: Database, draw: PenTool, txt: File } as const

const props = defineProps<{ file: MockFile; active?: boolean }>()
defineEmits<{ click: []; contextmenu: [event: MouseEvent] }>()
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'flex w-full flex-col gap-1 rounded-md px-2.5 py-2 text-left hover:bg-surface-hover',
        props.active ? 'bg-surface-active' : '',
      )
    "
    @click="$emit('click')"
    @contextmenu.prevent="$emit('contextmenu', $event)"
  >
    <span class="flex items-center gap-1.5">
      <component :is="ICONS[props.file.format]" class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span class="min-w-0 flex-1 truncate text-[13px] font-semibold">{{ props.file.title }}</span>
      <span class="shrink-0 text-xs text-muted-foreground">{{ props.file.date }}</span>
    </span>
    <span class="flex items-baseline gap-1.5 text-xs text-muted-foreground">
      <span class="min-w-0 flex-1 truncate">{{ props.file.snippet }}</span>
      <span class="shrink-0 text-[10px] uppercase text-muted-foreground/80">{{ props.file.format }}</span>
    </span>
  </button>
</template>
