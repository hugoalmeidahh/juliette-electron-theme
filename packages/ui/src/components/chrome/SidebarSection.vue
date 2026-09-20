<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex items-center justify-between px-1">
      <span class="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{{ label }}</span>
      <slot name="action" />
    </div>
    <slot />
  </div>
</template>
