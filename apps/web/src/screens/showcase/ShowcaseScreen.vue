<script setup lang="ts">
import { ref } from 'vue'
import { Star } from '@lucide/vue'
import {
  IconButton,
  ResizeHandle,
  SearchField,
  TitleBar,
  FolderItem,
  FolderTree,
  SidebarSection,
  FileList,
  EditorTabs,
  FormattingToolbar,
  NewFileSplitButton,
  SegmentedControl,
  AppModal,
  CommandPalette,
  FileContextMenu,
  ChatBubble,
  DetailsPanel,
  mockFolders,
  mockFiles,
} from 'juliette-ui'
import ShowcaseSection from './ShowcaseSection.vue'

const search = ref('')
const tabs = ref([
  { id: '1', label: 'Design tokens' },
  { id: '2', label: 'Roadmap Q4', dirty: true },
])
const activeTab = ref('1')
const segment = ref('edit')
const modalOpen = ref(false)
const paletteOpen = ref(false)
const chatDraft = ref('')
</script>

<template>
  <div class="flex flex-col">
    <ShowcaseSection
      title="IconButton"
      description="Botão quadrado 28x28 para ações de ícone na toolbar."
      usage='<IconButton title="Favoritar"><Star class="h-4 w-4" /></IconButton>'
    >
      <IconButton title="Favoritar"><Star class="h-4 w-4" /></IconButton>
    </ShowcaseSection>

    <ShowcaseSection
      title="ResizeHandle"
      description="Gutter arrastável (pointer events) entre painéis."
      usage="<ResizeHandle @resize=&quot;(deltaX) => ...&quot; />"
    >
      <div class="flex h-16 w-40 items-stretch bg-surface-editor">
        <div class="flex-1" />
        <ResizeHandle @resize="() => {}" />
        <div class="flex-1" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="SearchField"
      description="Campo de busca com ícone, usado na toolbar e sidebar."
      usage='<SearchField v-model="query" placeholder="Buscar no cofre" />'
    >
      <SearchField v-model="search" placeholder="Buscar no cofre" class="w-56" />
    </ShowcaseSection>

    <ShowcaseSection
      title="TitleBar"
      description="Barra de título custom do Electron (min/max/close + drag region)."
      usage='<TitleBar is-electron :is-mac="false" title="Arquivos" @minimize="..." @close="..." />'
    >
      <div class="w-full overflow-hidden rounded-md border border-separator">
        <TitleBar is-electron :is-mac="false" title="Arquivos" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="FolderItem / FolderTree"
      description="Item de pasta e árvore completa da sidebar."
      usage='<FolderTree :folders="mockFolders" active-id="all" @select="..." />'
    >
      <div class="w-56">
        <FolderTree :folders="mockFolders" active-id="all" @select="() => {}" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="SidebarSection"
      description="Cabeçalho de seção da sidebar com slot de ação."
      usage='<SidebarSection label="Pastas"><FolderTree ... /></SidebarSection>'
    >
      <div class="w-56">
        <SidebarSection label="Pastas">
          <FolderItem name="Notas" :count="3" />
        </SidebarSection>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="FileRow / FileList"
      description="Linha de arquivo e lista completa, agrupável por pasta."
      usage='<FileList :files="mockFiles" :active-id="null" @select="..." />'
    >
      <div class="w-72">
        <FileList :files="mockFiles" active-id="1" @select="() => {}" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="EditorTabs"
      description="Tira de abas de arquivos abertos no editor."
      usage='<EditorTabs :tabs="tabs" :active-id="activeTab" @select="..." @close="..." />'
    >
      <div class="w-96">
        <EditorTabs :tabs="tabs" :active-id="activeTab" @select="(id) => (activeTab = id)" @close="() => {}" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="FormattingToolbar"
      description="Barra de formatação do editor (títulos, negrito, listas...)."
      usage="<FormattingToolbar />"
    >
      <div class="w-96">
        <FormattingToolbar />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="NewFileSplitButton"
      description="Botão + / dropdown para escolher o formato do novo arquivo."
      usage='<NewFileSplitButton @create="(format) => ..." @import="..." />'
    >
      <NewFileSplitButton @create="() => {}" @import="() => {}" />
    </ShowcaseSection>

    <ShowcaseSection
      title="SegmentedControl"
      description="Wrapper sobre Tabs para alternância curta (Editar/Preview)."
      usage="&lt;SegmentedControl v-model=&quot;view&quot; :options=&quot;options&quot; /&gt;"
    >
      <SegmentedControl
        v-model="segment"
        :options="[
          { value: 'edit', label: 'Editar' },
          { value: 'preview', label: 'Preview' },
        ]"
      />
    </ShowcaseSection>

    <ShowcaseSection
      title="AppModal"
      description="Wrapper sobre Dialog com header + tabs opcionais."
      usage='<AppModal v-model:open="open" title="Configurações" :tabs="[...]" />'
    >
      <IconButton title="Abrir modal" @click="modalOpen = true">⚙</IconButton>
      <AppModal v-model:open="modalOpen" title="Configurações de exemplo">
        <p class="text-sm text-muted-foreground">Conteúdo de exemplo.</p>
      </AppModal>
    </ShowcaseSection>

    <ShowcaseSection
      title="CommandPalette"
      description="Wrapper sobre Command para busca rápida (Ctrl/Cmd+K)."
      usage='<CommandPalette v-model:open="open" :files="mockFiles" @select="..." />'
    >
      <IconButton title="Abrir palette" @click="paletteOpen = true">⌘K</IconButton>
      <CommandPalette v-model:open="paletteOpen" :files="mockFiles" @select="() => (paletteOpen = false)" />
    </ShowcaseSection>

    <ShowcaseSection
      title="FileContextMenu"
      description="Wrapper sobre ContextMenu para ações de arquivo (clique-direito)."
      usage='<FileContextMenu @rename="..." @reveal="..." @trash="..."><FileRow ... /></FileContextMenu>'
    >
      <FileContextMenu>
        <div class="w-56 rounded-md border border-dashed border-separator p-3 text-xs text-muted-foreground">
          Clique com o botão direito aqui
        </div>
      </FileContextMenu>
    </ShowcaseSection>

    <ShowcaseSection
      title="ChatBubble / ChatPanel"
      description="Casca visual do chat com IA (sem lógica real)."
      usage='<ChatBubble role="assistant" text="Olá!" />'
    >
      <div class="flex w-72 flex-col gap-2">
        <ChatBubble role="assistant" text="Olá! Como posso ajudar?" />
        <ChatBubble role="user" text="Explica esse arquivo." />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="DetailsPanel"
      description="Painel lateral com metadados do arquivo ativo."
      usage='<DetailsPanel :file="activeFile" @close="..." />'
    >
      <div class="h-64 w-64 overflow-hidden rounded-md border border-separator">
        <DetailsPanel :file="mockFiles[0]" @close="() => {}" />
      </div>
    </ShowcaseSection>
  </div>
</template>
