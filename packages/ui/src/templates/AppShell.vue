<script setup lang="ts">
import { computed, ref } from 'vue'
import { MessageSquare, Info, PanelLeft, Settings } from '@lucide/vue'
import TitleBar from '@/components/chrome/TitleBar.vue'
import IconButton from '@/components/chrome/IconButton.vue'
import SearchField from '@/components/chrome/SearchField.vue'
import FolderTree from '@/components/chrome/FolderTree.vue'
import SidebarSection from '@/components/chrome/SidebarSection.vue'
import FileList from '@/components/chrome/FileList.vue'
import EditorTabs, { type EditorTab } from '@/components/chrome/EditorTabs.vue'
import FormattingToolbar from '@/components/chrome/FormattingToolbar.vue'
import NewFileSplitButton from '@/components/chrome/NewFileSplitButton.vue'
import SegmentedControl from '@/components/chrome/SegmentedControl.vue'
import ResizeHandle from '@/components/chrome/ResizeHandle.vue'
import ChatPanel, { type ChatMessage } from '@/components/chrome/ChatPanel.vue'
import DetailsPanel from '@/components/chrome/DetailsPanel.vue'
import CommandPalette from '@/components/chrome/CommandPalette.vue'
import AppModal from '@/components/chrome/AppModal.vue'
import { mockFolders, mockFiles } from '@/lib/mock-data'

withDefaults(defineProps<{ platform?: string; isElectron?: boolean; isMaximized?: boolean }>(), {
  platform: 'linux',
  isElectron: false,
  isMaximized: false,
})
defineEmits<{ minimize: []; 'toggle-maximize': []; close: [] }>()

const sidebarWidth = ref(220)
const listWidth = ref(268)
const activeFolderId = ref('all')
const query = ref('')
const activeFileId = ref<string | null>(mockFiles[0]?.id ?? null)
const tabs = ref<EditorTab[]>(mockFiles[0] ? [{ id: mockFiles[0].id, label: mockFiles[0].title }] : [])
const view = ref('edit')
const chatOpen = ref(false)
const detailsOpen = ref(false)
const paletteOpen = ref(false)
const settingsOpen = ref(false)
const settingsTab = ref('vaults')

const draft = ref('')
const messages = ref<ChatMessage[]>([{ id: '1', role: 'assistant', text: 'Olá! Como posso ajudar?' }])

const filteredFiles = computed(() => {
  const byFolder = activeFolderId.value === 'all' ? mockFiles : mockFiles.filter((f) => f.folderId === activeFolderId.value)
  if (!query.value) return byFolder
  return byFolder.filter((f) => f.title.toLowerCase().includes(query.value.toLowerCase()))
})

const activeFile = computed(() => mockFiles.find((f) => f.id === activeFileId.value) ?? null)

function openFile(id: string) {
  activeFileId.value = id
  if (!tabs.value.some((t) => t.id === id)) {
    const file = mockFiles.find((f) => f.id === id)
    if (file) tabs.value.push({ id: file.id, label: file.title })
  }
}

function closeTab(id: string) {
  tabs.value = tabs.value.filter((t) => t.id !== id)
  if (activeFileId.value === id) activeFileId.value = tabs.value.at(-1)?.id ?? null
}

function sendMessage() {
  const text = draft.value.trim()
  if (!text) return
  messages.value.push({ id: crypto.randomUUID(), role: 'user', text })
  draft.value = ''
}
</script>

<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-surface-editor text-foreground">
    <TitleBar
      :is-electron="isElectron"
      :is-maximized="isMaximized"
      :is-mac="platform === 'darwin'"
      title="Arquivos"
      @minimize="$emit('minimize')"
      @toggle-maximize="$emit('toggle-maximize')"
      @close="$emit('close')"
      @search="paletteOpen = true"
    />

    <header class="flex h-[52px] shrink-0 items-center border-b border-separator bg-surface-sidebar">
      <div class="flex items-center gap-1 px-2.5" :style="{ width: `${sidebarWidth}px` }">
        <IconButton title="Ocultar pastas"><PanelLeft class="h-4 w-4" /></IconButton>
      </div>
      <ResizeHandle @resize="(d) => (sidebarWidth = Math.min(360, Math.max(148, sidebarWidth + d)))" />
      <div class="flex flex-1 items-center gap-2 px-2.5" :style="{ width: `${listWidth}px` }">
        <span class="flex-1 truncate text-[13px] font-semibold">Todos Arquivos</span>
        <SearchField v-model="query" placeholder="Buscar no cofre" class="max-w-[140px]" />
        <NewFileSplitButton @create="() => {}" @import="() => {}" />
      </div>
      <ResizeHandle @resize="(d) => (listWidth = Math.min(480, Math.max(180, listWidth + d)))" />
      <div class="flex flex-1 items-center justify-between gap-2 px-2.5">
        <SegmentedControl v-model="view" :options="[{ value: 'edit', label: 'Editar' }, { value: 'preview', label: 'Preview' }]" />
        <div class="flex items-center gap-1">
          <IconButton title="Chat com IA" @click="chatOpen = !chatOpen"><MessageSquare class="h-4 w-4" /></IconButton>
          <IconButton title="Detalhes do arquivo" @click="detailsOpen = !detailsOpen"><Info class="h-4 w-4" /></IconButton>
          <IconButton title="Configurações" @click="settingsOpen = true"><Settings class="h-4 w-4" /></IconButton>
        </div>
      </div>
    </header>

    <div class="flex min-h-0 flex-1">
      <aside class="flex shrink-0 flex-col gap-3 overflow-y-auto bg-surface-sidebar p-2.5" :style="{ width: `${sidebarWidth}px` }">
        <SidebarSection label="Pastas">
          <FolderTree :folders="mockFolders" :active-id="activeFolderId" @select="(id) => (activeFolderId = id)" />
        </SidebarSection>
      </aside>
      <ResizeHandle @resize="(d) => (sidebarWidth = Math.min(360, Math.max(148, sidebarWidth + d)))" />

      <section class="flex shrink-0 flex-col overflow-hidden bg-surface-list" :style="{ width: `${listWidth}px` }">
        <FileList :files="filteredFiles" :active-id="activeFileId" @select="openFile" />
      </section>
      <ResizeHandle @resize="(d) => (listWidth = Math.min(480, Math.max(180, listWidth + d)))" />

      <main class="flex min-w-0 flex-1 flex-col overflow-hidden">
        <EditorTabs :tabs="tabs" :active-id="activeFileId" @select="openFile" @close="closeTab" />
        <FormattingToolbar v-if="activeFile" />
        <div class="flex-1 overflow-y-auto p-6">
          <p v-if="!activeFile" class="text-center text-sm text-muted-foreground">Nenhum arquivo selecionado</p>
          <div v-else class="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {{ activeFile.snippet }}
          </div>
        </div>
      </main>

      <DetailsPanel v-if="detailsOpen" :file="activeFile" @close="detailsOpen = false" />
      <ChatPanel v-if="chatOpen" v-model:draft="draft" :messages="messages" @send="sendMessage" @close="chatOpen = false" />
    </div>

    <CommandPalette v-model:open="paletteOpen" :files="mockFiles" @select="(id) => { openFile(id); paletteOpen = false }" />

    <AppModal
      v-model:open="settingsOpen"
      v-model:tab="settingsTab"
      title="Configurações"
      :tabs="[
        { value: 'vaults', label: 'Cofres' },
        { value: 'preview', label: 'Preview e CSP' },
        { value: 'llm', label: 'IA / LLM' },
      ]"
    >
      <p class="text-sm text-muted-foreground">Conteúdo de exemplo para a aba "{{ settingsTab }}".</p>
    </AppModal>
  </div>
</template>
