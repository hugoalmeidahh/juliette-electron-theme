<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

defineProps<{ options: { value: string; label: string }[] }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <Tabs v-model="model">
    <TabsList>
      <TabsTrigger v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
