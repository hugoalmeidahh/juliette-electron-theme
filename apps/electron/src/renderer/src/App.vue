<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { AppShell } from 'juliette-ui'

const isMaximized = ref(false)
let unsubscribe: (() => void) | undefined

onMounted(async () => {
  isMaximized.value = await window.api.window.isMaximized()
  unsubscribe = window.api.window.onState((state) => (isMaximized.value = state.isMaximized))
})
onUnmounted(() => unsubscribe?.())
</script>

<template>
  <AppShell
    is-electron
    :is-maximized="isMaximized"
    :platform="window.api.platform"
    @minimize="window.api.window.minimize()"
    @toggle-maximize="window.api.window.toggleMaximize()"
    @close="window.api.window.close()"
  />
</template>
