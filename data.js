// Mesmos dados mock de packages/ui/src/lib/mock-data.ts, em JS puro.
const mockFolders = [
  { id: 'projetos', name: 'Projetos', depth: 0, count: 4 },
  { id: 'projetos/pink-brain', name: 'pink-brain', depth: 1, count: 2 },
  { id: 'notas', name: 'Notas', depth: 0, count: 3 },
  { id: 'arquivo', name: 'Arquivo', depth: 0, count: 1 },
]

const mockFiles = [
  { id: '1', title: 'Design tokens', folderId: 'projetos/pink-brain', format: 'md', date: 'Hoje', snippet: 'Cores de superfície, radius, tipografia...' },
  { id: '2', title: 'Roadmap Q4', folderId: 'projetos', format: 'md', date: 'Ontem', snippet: 'Prioridades do trimestre e marcos.' },
  { id: '3', title: 'Landing page', folderId: 'projetos', format: 'html', date: '2 dias', snippet: '<section class="hero">...' },
  { id: '4', title: 'Ideias soltas', folderId: 'notas', format: 'txt', date: '3 dias', snippet: 'Lista de ideias para explorar depois.' },
]

const FORMAT_ICON = { md: '📄', html: '</>', db: '🗄', draw: '✎', txt: '📄' }

const FORMATTING_TOOLS = [
  { icon: 'H1', title: 'Título 1' },
  { icon: 'H2', title: 'Título 2' },
  { icon: 'H3', title: 'Título 3' },
  { sep: true },
  { icon: 'B', title: 'Negrito' },
  { icon: 'I', title: 'Itálico' },
  { icon: 'S', title: 'Riscado' },
  { icon: '<>', title: 'Código' },
  { sep: true },
  { icon: '•', title: 'Lista' },
  { icon: '1.', title: 'Lista numerada' },
  { icon: '☑', title: 'Checklist' },
  { icon: '"', title: 'Citação' },
  { sep: true },
  { icon: '🔗', title: 'Link' },
  { icon: '▦', title: 'Tabela' },
  { icon: '—', title: 'Divisor' },
]
