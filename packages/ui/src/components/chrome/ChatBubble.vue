<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const props = defineProps<{ role: 'user' | 'assistant'; text: string }>()
</script>

<template>
  <div :class="cn('flex items-start gap-2', props.role === 'user' ? 'flex-row-reverse' : '')">
    <Avatar>{{ props.role === 'user' ? 'EU' : 'IA' }}</Avatar>
    <div
      :class="
        cn(
          'max-w-[75%] rounded-xl px-2.5 py-1.5 text-[13px] leading-snug',
          props.role === 'user' ? 'bg-accent-soft text-foreground' : 'bg-surface-editor',
        )
      "
    >
      {{ props.text }}
    </div>
  </div>
</template>
