<script setup lang="ts">
import { ref } from 'vue'
import { SegmentedControl } from 'juliette-ui'
import LayoutScreen from './screens/layout/LayoutScreen.vue'
import ShowcaseScreen from './screens/showcase/ShowcaseScreen.vue'

const view = ref('layout')
</script>

<template>
  <div class="flex h-screen w-full flex-col">
    <div class="flex shrink-0 justify-center border-b border-separator bg-surface-sidebar p-2">
      <SegmentedControl
        v-model="view"
        :options="[
          { value: 'layout', label: 'Layout' },
          { value: 'componentes', label: 'Componentes' },
        ]"
      />
    </div>
    <LayoutScreen v-if="view === 'layout'" class="min-h-0 flex-1" />
    <ShowcaseScreen v-else class="min-h-0 flex-1 overflow-y-auto" />
  </div>
</template>
