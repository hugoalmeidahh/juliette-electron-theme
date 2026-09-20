export interface MockFolder {
  id: string
  name: string
  depth: number
  count: number
}

export interface MockFile {
  id: string
  title: string
  folderId: string
  format: 'md' | 'html' | 'db' | 'draw' | 'txt'
  date: string
  snippet: string
}

export const mockFolders: MockFolder[] = [
  { id: 'projetos', name: 'Projetos', depth: 0, count: 4 },
  { id: 'projetos/pink-brain', name: 'pink-brain', depth: 1, count: 2 },
  { id: 'notas', name: 'Notas', depth: 0, count: 3 },
  { id: 'arquivo', name: 'Arquivo', depth: 0, count: 1 },
]

export const mockFiles: MockFile[] = [
  { id: '1', title: 'Design tokens', folderId: 'projetos/pink-brain', format: 'md', date: 'Hoje', snippet: 'Cores de superfície, radius, tipografia...' },
  { id: '2', title: 'Roadmap Q4', folderId: 'projetos', format: 'md', date: 'Ontem', snippet: 'Prioridades do trimestre e marcos.' },
  { id: '3', title: 'Landing page', folderId: 'projetos', format: 'html', date: '2 dias', snippet: '<section class="hero">...' },
  { id: '4', title: 'Ideias soltas', folderId: 'notas', format: 'txt', date: '3 dias', snippet: 'Lista de ideias para explorar depois.' },
]
