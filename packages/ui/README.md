# juliette-ui

Pacote de design system compartilhado entre `apps/web` e `apps/electron`.

- `src/styles/tokens.css` — tokens Tailwind v4 (cores shadcn + superfícies de 3 painéis do
  tessera-poc: sidebar/lista/editor, separadores, cor de pasta).
- `src/components/ui` — primitives geradas via `npx shadcn-vue@latest add ...`.
- `src/components/chrome` — componentes compostos do layout (titlebar, sidebar, lista de arquivos,
  tabs de editor, modal, command palette, context menu, chat, painel de detalhes).
- `src/templates/AppShell.vue` — composição completa do layout, com estado mock interno. Recebe
  `platform`/`isElectron`/`isMaximized` e emite `minimize`/`toggle-maximize`/`close`.
- `src/composables/useResizablePane.ts` — lógica do gutter arrastável (Pointer Events), portada do
  `setupGutters` do tessera-poc.

Cada app que consumir este pacote precisa declarar, antes do `@import 'tailwindcss'` no seu CSS:

```css
@source "../../../packages/ui/src";
```

para que o content-scan do Tailwind v4 capture as classes usadas dentro do pacote (que vive em
`node_modules` via symlink de workspace).
