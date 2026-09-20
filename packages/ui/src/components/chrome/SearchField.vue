<script setup lang="ts">
import { Search } from '@lucide/vue'

const model = defineModel<string>({ default: '' })
defineProps<{ placeholder?: string }>()
</script>

<template>
  <label class="flex h-7 flex-1 items-center gap-1.5 rounded-md bg-control-hover px-2 text-muted-foreground">
    <Search class="h-3.5 w-3.5 shrink-0" />
    <input
      v-model="model"
      type="search"
      :placeholder="placeholder"
      autocomplete="off"
      class="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
    />
  </label>
</template>
