# juliette-electron-theme

Design system Vue + [shadcn-vue](https://www.shadcn-vue.com/) extraído do layout do app Electron
[tessera-poc](https://github.com), reutilizável nos apps "pink-brain".

Escopo: só o **chrome/layout** (titlebar, toolbar, sidebar de pastas, lista de arquivos, painéis
redimensionáveis, tabs, barra de formatação, modal, command palette, context menu, chat e painel de
detalhes). Sem lógica de app real (sem IA, banco, desenho, grafo ou editor Monaco) — tudo com dados
mock.

## Estrutura

- `packages/ui` — pacote `juliette-ui`: tokens Tailwind v4, primitives shadcn-vue e os componentes
  de chrome (`src/components/chrome`), compostos no template `AppShell.vue`.
- `apps/web` — Vite + Vue puro (sem Electron), consumindo `juliette-ui`. Alterna entre a tela
  "Layout" (o `AppShell` completo) e "Componentes" (catálogo com 1 seção por componente).
- `apps/electron` — electron-vite, mesma `AppShell`, com janela sem frame nativo e IPC de
  minimizar/maximizar/fechar portada do tessera-poc.

## Rodando

```bash
npm install

npm run dev:web       # abre em http://localhost:5173
npm run dev:electron  # abre a janela Electron
```
