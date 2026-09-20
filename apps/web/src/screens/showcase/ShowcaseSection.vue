<script setup lang="ts">
defineProps<{ title: string; description: string; usage: string }>()
</script>

<template>
  <section class="flex flex-col gap-3 border-b border-separator p-6">
    <div>
      <h2 class="text-sm font-semibold">{{ title }}</h2>
      <p class="text-xs text-muted-foreground">{{ description }}</p>
    </div>
    <div class="flex flex-wrap items-start gap-4 rounded-lg border border-separator bg-surface-list p-4">
      <slot />
    </div>
    <pre class="overflow-x-auto rounded-lg bg-surface-sidebar p-3 text-xs"><code>{{ usage }}</code></pre>
  </section>
</template>
