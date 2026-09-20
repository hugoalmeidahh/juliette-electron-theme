<script setup lang="ts">
import { Heading1, Heading2, Heading3, Bold, Italic, Strikethrough, Code, List, ListOrdered, CheckSquare, Quote, Link, Table, Minus } from '@lucide/vue'

const TOOLS = [
  { icon: Heading1, title: 'Título 1' },
  { icon: Heading2, title: 'Título 2' },
  { icon: Heading3, title: 'Título 3' },
  { sep: true },
  { icon: Bold, title: 'Negrito' },
  { icon: Italic, title: 'Itálico' },
  { icon: Strikethrough, title: 'Riscado' },
  { icon: Code, title: 'Código' },
  { sep: true },
  { icon: List, title: 'Lista' },
  { icon: ListOrdered, title: 'Lista numerada' },
  { icon: CheckSquare, title: 'Checklist' },
  { icon: Quote, title: 'Citação' },
  { sep: true },
  { icon: Link, title: 'Link' },
  { icon: Table, title: 'Tabela' },
  { icon: Minus, title: 'Divisor' },
] as const
</script>

<template>
  <div class="flex h-9 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-separator px-2">
    <template v-for="(tool, i) in TOOLS" :key="i">
      <span v-if="'sep' in tool" class="mx-1 h-4 w-px shrink-0 bg-separator" />
      <button v-else type="button" :title="tool.title" class="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-control-hover hover:text-foreground">
        <component :is="tool.icon" class="h-3.5 w-3.5" />
      </button>
    </template>
  </div>
</template>
