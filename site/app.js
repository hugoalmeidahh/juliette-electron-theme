// AppShell "vanilla": mesma composição do packages/ui/src/templates/AppShell.vue,
// portada pra HTML/JS puro (sem build, sem framework) pra virar a versão GitHub Pages.
const state = {
  sidebarWidth: 220,
  listWidth: 268,
  activeFolderId: 'all',
  query: '',
  activeFileId: mockFiles[0].id,
  tabs: [{ id: mockFiles[0].id, label: mockFiles[0].title }],
  chatOpen: false,
  detailsOpen: false,
  messages: [{ id: 'seed', role: 'assistant', text: 'Olá! Como posso ajudar?' }],
}

const $ = (sel) => document.querySelector(sel)
const el = (tag, cls) => {
  const node = document.createElement(tag)
  if (cls) node.className = cls
  return node
}

function filteredFiles() {
  const byFolder =
    state.activeFolderId === 'all' ? mockFiles : mockFiles.filter((f) => f.folderId === state.activeFolderId)
  if (!state.query) return byFolder
  return byFolder.filter((f) => f.title.toLowerCase().includes(state.query.toLowerCase()))
}

function activeFile() {
  return mockFiles.find((f) => f.id === state.activeFileId) || null
}

function openFile(id) {
  state.activeFileId = id
  if (!state.tabs.some((t) => t.id === id)) {
    const file = mockFiles.find((f) => f.id === id)
    if (file) state.tabs.push({ id: file.id, label: file.title })
  }
  renderAll()
}

function closeTab(id) {
  state.tabs = state.tabs.filter((t) => t.id !== id)
  if (state.activeFileId === id) state.activeFileId = state.tabs.at(-1)?.id ?? null
  renderAll()
}

// ---- Renderers ----

function renderFolderTree() {
  const root = $('#folder-tree')
  root.innerHTML = ''

  const makeItem = (name, opts = {}) => {
    const btn = el('button', 'folder-item' + (opts.active ? ' active' : ''))
    btn.style.paddingLeft = `${8 + (opts.depth || 0) * 12}px`
    const icon = el('span', 'icon')
    icon.textContent = opts.icon || '📁'
    const nameEl = el('span', 'name')
    nameEl.textContent = name
    btn.append(icon, nameEl)
    if (opts.count) {
      const count = el('span', 'count')
      count.textContent = opts.count
      btn.append(count)
    }
    btn.addEventListener('click', () => {
      state.activeFolderId = opts.id
      renderAll()
    })
    return btn
  }

  root.append(makeItem('Todos Arquivos', { id: 'all', icon: '▦', active: state.activeFolderId === 'all' }))
  mockFolders.forEach((folder) => {
    root.append(
      makeItem(folder.name, {
        id: folder.id,
        depth: folder.depth,
        count: folder.count,
        active: state.activeFolderId === folder.id,
      }),
    )
  })
  root.append(el('div', 'folder-divider'))
  root.append(
    makeItem('Apagadas recentemente', { id: 'deleted', icon: '🗑', active: state.activeFolderId === 'deleted' }),
  )
}

function renderFileList() {
  const root = $('#file-list')
  root.innerHTML = ''
  const files = filteredFiles()

  if (!files.length) {
    const empty = el('p', 'empty-state')
    empty.textContent = 'Nenhum arquivo'
    root.append(empty)
    return
  }

  files.forEach((file) => {
    const row = el('button', 'file-row' + (file.id === state.activeFileId ? ' active' : ''))
    const top = el('span', 'file-row-top')
    top.innerHTML = `<span>${FORMAT_ICON[file.format]}</span><span class="title">${file.title}</span><span class="date">${file.date}</span>`
    const bottom = el('span', 'file-row-bottom')
    bottom.innerHTML = `<span class="snippet">${file.snippet}</span><span class="format">${file.format}</span>`
    row.append(top, bottom)
    row.addEventListener('click', () => openFile(file.id))
    row.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      showContextMenu(event.clientX, event.clientY)
    })
    root.append(row)
  })
}

function renderEditorTabs() {
  const root = $('#editor-tabs')
  root.innerHTML = ''
  state.tabs.forEach((tab) => {
    const btn = el('button', 'editor-tab' + (tab.id === state.activeFileId ? ' active' : ''))
    const label = el('span', 'label')
    label.textContent = tab.label
    const close = el('button', 'close')
    close.textContent = '✕'
    close.addEventListener('click', (e) => {
      e.stopPropagation()
      closeTab(tab.id)
    })
    btn.append(label, close)
    btn.addEventListener('click', () => openFile(tab.id))
    root.append(btn)
  })
}

function renderFormattingToolbar() {
  const root = $('#formatting-toolbar')
  root.innerHTML = ''
  if (!activeFile()) return
  FORMATTING_TOOLS.forEach((tool) => {
    if (tool.sep) {
      root.append(el('span', 'sep'))
      return
    }
    const btn = el('button', 'icon-btn')
    btn.title = tool.title
    btn.textContent = tool.icon
    root.append(btn)
  })
}

function renderEditorContent() {
  const root = $('#editor-content')
  const file = activeFile()
  root.innerHTML = ''
  if (!file) {
    const empty = el('p', 'empty-state')
    empty.textContent = 'Nenhum arquivo selecionado'
    root.append(empty)
    return
  }
  const p = el('p', 'snippet-text')
  p.textContent = file.snippet
  root.append(p)
}

function renderDetails() {
  const root = $('#details-content')
  const file = activeFile()
  root.innerHTML = ''
  if (!file) {
    root.innerHTML = '<p class="empty-state">Nenhum arquivo selecionado</p>'
    return
  }
  const rows = [
    ['Nome', file.title],
    ['Tipo', file.format.toUpperCase()],
    ['Atualizado', file.date],
  ]
  rows.forEach(([k, v]) => {
    const dt = el('dt')
    dt.textContent = k
    const dd = el('dd')
    dd.textContent = v
    root.append(dt, dd)
  })
}

function renderChat() {
  const root = $('#chat-messages')
  root.innerHTML = ''
  state.messages.forEach((msg) => {
    const bubble = el('div', `chat-bubble ${msg.role}`)
    bubble.innerHTML = `<span class="avatar">${msg.role === 'user' ? 'EU' : 'IA'}</span><span class="bubble">${msg.text}</span>`
    root.append(bubble)
  })
  root.scrollTop = root.scrollHeight
}

function renderAll() {
  renderFolderTree()
  renderFileList()
  renderEditorTabs()
  renderFormattingToolbar()
  renderEditorContent()
  renderDetails()
}

// ---- Resize handles (pointer events, mesma lógica do useResizablePane) ----

function setupResize(handleEls, getWidth, setWidth, min, max, paneEls) {
  handleEls.forEach((handle) => {
    handle.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      let lastX = event.clientX
      const onMove = (moveEvent) => {
        const delta = moveEvent.clientX - lastX
        lastX = moveEvent.clientX
        const next = Math.min(max, Math.max(min, getWidth() + delta))
        setWidth(next)
        paneEls.forEach((p) => (p.style.width = `${next}px`))
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    })
  })
}

// ---- Context menu ----

function showContextMenu(x, y) {
  const menu = $('#context-menu')
  menu.style.left = `${x}px`
  menu.style.top = `${y}px`
  menu.classList.remove('hidden')
}
function hideContextMenu() {
  $('#context-menu').classList.add('hidden')
}

// ---- Command palette ----

function renderPaletteResults(query) {
  const root = $('#palette-results')
  root.innerHTML = ''
  const files = mockFiles.filter((f) => f.title.toLowerCase().includes(query.toLowerCase()))
  if (!files.length) {
    root.innerHTML = '<p class="empty">Nada encontrado</p>'
    return
  }
  files.forEach((file) => {
    const btn = el('button')
    btn.textContent = file.title
    btn.addEventListener('click', () => {
      openFile(file.id)
      $('#palette-overlay').classList.add('hidden')
    })
    root.append(btn)
  })
}

// ---- Wire everything up ----

function init() {
  renderAll()

  // Titlebar (window controls no-op fora do Electron — mesma UX de "preview no navegador")
  $('#open-palette').addEventListener('click', () => {
    $('#palette-overlay').classList.remove('hidden')
    $('#palette-input').value = ''
    renderPaletteResults('')
    $('#palette-input').focus()
  })
  ;['#btn-min', '#btn-max', '#btn-close'].forEach((sel) => {
    $(sel).addEventListener('click', () => {
      console.log(`${sel} clicado — sem IPC nesta versão web/estática`)
    })
  })

  // Search
  $('#search-input').addEventListener('input', (e) => {
    state.query = e.target.value
    renderFileList()
  })

  // New file split button
  $('#new-file-caret').addEventListener('click', (e) => {
    e.stopPropagation()
    $('#new-file-menu').classList.toggle('hidden')
  })
  document.addEventListener('click', () => $('#new-file-menu').classList.add('hidden'))
  $('#new-file-menu').addEventListener('click', (e) => e.stopPropagation())

  // Segmented control (Editar/Preview) — visual apenas
  $('#segmented').addEventListener('click', (e) => {
    const btn = e.target.closest('.segmented-item')
    if (!btn) return
    $('#segmented').querySelectorAll('.segmented-item').forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
  })

  // Chat / details toggles
  $('#toggle-chat').addEventListener('click', () => {
    state.chatOpen = !state.chatOpen
    $('#pane-chat').classList.toggle('hidden', !state.chatOpen)
  })
  $('#close-chat').addEventListener('click', () => {
    state.chatOpen = false
    $('#pane-chat').classList.add('hidden')
  })
  $('#toggle-details').addEventListener('click', () => {
    state.detailsOpen = !state.detailsOpen
    $('#pane-details').classList.toggle('hidden', !state.detailsOpen)
  })
  $('#close-details').addEventListener('click', () => {
    state.detailsOpen = false
    $('#pane-details').classList.add('hidden')
  })

  // Chat form
  renderChat()
  $('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = $('#chat-input')
    const text = input.value.trim()
    if (!text) return
    state.messages.push({ id: String(Date.now()), role: 'user', text })
    input.value = ''
    renderChat()
  })

  // Context menu
  document.addEventListener('click', hideContextMenu)
  $('#context-menu').addEventListener('click', (e) => e.stopPropagation())

  // Command palette
  $('#palette-input').addEventListener('input', (e) => renderPaletteResults(e.target.value))
  $('#palette-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'palette-overlay') e.target.classList.add('hidden')
  })
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      $('#palette-overlay').classList.remove('hidden')
      $('#palette-input').value = ''
      renderPaletteResults('')
      $('#palette-input').focus()
    }
    if (e.key === 'Escape') {
      $('#palette-overlay').classList.add('hidden')
      $('#settings-overlay').classList.add('hidden')
    }
  })

  // Settings modal
  $('#open-settings').addEventListener('click', () => $('#settings-overlay').classList.remove('hidden'))
  $('#settings-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'settings-overlay') e.target.classList.add('hidden')
  })
  $('#settings-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.segmented-item')
    if (!btn) return
    $('#settings-tabs').querySelectorAll('.segmented-item').forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    $('#settings-body').textContent = `Conteúdo de exemplo para a aba "${btn.textContent}".`
  })

  // Resize handles
  const sidebarHandles = document.querySelectorAll('[data-resize="sidebar"]')
  const listHandles = document.querySelectorAll('[data-resize="list"]')
  setupResize(
    sidebarHandles,
    () => state.sidebarWidth,
    (w) => (state.sidebarWidth = w),
    148,
    360,
    [$('#pane-sidebar'), $('#toolbar-sidebar-cell')],
  )
  setupResize(
    listHandles,
    () => state.listWidth,
    (w) => (state.listWidth = w),
    180,
    480,
    [$('#pane-list'), $('#toolbar-list-cell')],
  )
}

init()
