<script setup lang="ts">
import { X } from '@lucide/vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ChatBubble from './ChatBubble.vue'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

defineProps<{ messages: ChatMessage[] }>()
const draft = defineModel<string>('draft', { default: '' })
const emit = defineEmits<{ send: []; close: [] }>()
</script>

<template>
  <aside class="flex w-[340px] shrink-0 flex-col border-l border-separator bg-surface-list">
    <div class="flex h-9 shrink-0 items-center justify-between border-b border-separator px-3">
      <span class="text-xs font-semibold">IA local</span>
      <button type="button" class="grid h-6 w-6 place-items-center rounded hover:bg-control-hover" @click="emit('close')">
        <X class="h-4 w-4" />
      </button>
    </div>
    <ScrollArea class="flex-1 p-3">
      <div class="flex flex-col gap-3">
        <ChatBubble v-for="message in messages" :key="message.id" :role="message.role" :text="message.text" />
      </div>
    </ScrollArea>
    <form class="flex shrink-0 gap-1.5 border-t border-separator p-2" @submit.prevent="emit('send')">
      <Input v-model="draft" placeholder="Pergunte sobre este arquivo…" />
      <Button type="submit" size="icon">↑</Button>
    </form>
  </aside>
</template>
