<script setup lang="ts">
import { Plus, FileText, Code, Database, PenTool, Import } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const emit = defineEmits<{ create: [format: 'md' | 'txt' | 'html' | 'db' | 'draw']; import: [] }>()
</script>

<template>
  <div class="flex items-center">
    <Button variant="ghost" size="icon" class="h-7 w-7" title="Novo arquivo Markdown" @click="emit('create', 'md')">
      <Plus class="h-4 w-4" />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" class="h-7 w-4" title="Tipo de arquivo">
          <span class="text-[10px]">▾</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="emit('create', 'md')"><FileText class="h-4 w-4" /> Markdown (.md)</DropdownMenuItem>
        <DropdownMenuItem @click="emit('create', 'txt')"><FileText class="h-4 w-4" /> Texto (.txt)</DropdownMenuItem>
        <DropdownMenuItem @click="emit('create', 'html')"><Code class="h-4 w-4" /> HTML (.html)</DropdownMenuItem>
        <DropdownMenuItem @click="emit('create', 'db')"><Database class="h-4 w-4" /> Base de dados</DropdownMenuItem>
        <DropdownMenuItem @click="emit('create', 'draw')"><PenTool class="h-4 w-4" /> Desenho</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="emit('import')"><Import class="h-4 w-4" /> Importar arquivos…</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
