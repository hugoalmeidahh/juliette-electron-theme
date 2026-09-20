<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const props = defineProps<{
  title: string
  tabs?: { value: string; label: string }[]
}>()
const model = defineModel<boolean>('open', { required: true })
const tabModel = defineModel<string>('tab', { default: '' })
</script>

<template>
  <Dialog v-model:open="model">
    <DialogContent class="max-h-[80vh] gap-0 overflow-hidden p-0 sm:max-w-xl">
      <DialogHeader class="border-b border-separator px-4 py-3">
        <DialogTitle>{{ props.title }}</DialogTitle>
      </DialogHeader>
      <Tabs v-if="props.tabs?.length" v-model="tabModel" class="border-b border-separator px-4 py-2">
        <TabsList>
          <TabsTrigger v-for="tab in props.tabs" :key="tab.value" :value="tab.value">{{ tab.label }}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div class="max-h-[60vh] overflow-y-auto p-4">
        <slot />
      </div>
    </DialogContent>
  </Dialog>
</template>
