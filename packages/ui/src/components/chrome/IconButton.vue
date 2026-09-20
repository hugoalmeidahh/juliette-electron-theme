<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ title?: string; class?: string }>()
</script>

<template>
  <button
    type="button"
    :title="props.title"
    :class="cn('grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-control-hover hover:text-foreground', props.class)"
  >
    <slot />
  </button>
</template>
