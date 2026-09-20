import { fileURLToPath, URL } from 'node:url'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const webSrc = fileURLToPath(new URL('./src', import.meta.url))
const uiSrc = fileURLToPath(new URL('../../packages/ui/src', import.meta.url))

// ponytail: cada pacote (apps/web, packages/ui) usa "@/" apontando pro seu próprio src.
// Resolve por diretório do importer em vez de depender de tsconfig por pacote. Se um 3º
// pacote com "@/" entrar no monorepo, trocar por vite-tsconfig-paths.
function perPackageAlias(): Plugin {
  return {
    name: 'per-package-at-alias',
    resolveId(source, importer) {
      if (!source.startsWith('@/') || !importer) return null
      const base = importer.includes('/packages/ui/') ? uiSrc : webSrc
      return this.resolve(join(base, source.slice(2)), dirname(importer), { skipSelf: true })
    },
  }
}

export default defineConfig({
  plugins: [perPackageAlias(), vue(), tailwindcss()],
})
