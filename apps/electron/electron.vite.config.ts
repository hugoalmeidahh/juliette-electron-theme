import { resolve, dirname, join } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

const rendererSrc = resolve('src/renderer/src')
const uiSrc = resolve('../../packages/ui/src')

// ponytail: mesmo esquema do apps/web/vite.config.ts — cada pacote resolve "@/" pro
// próprio src. Ver comentário lá se um 3º pacote com "@/" entrar no monorepo.
function perPackageAlias(): Plugin {
  return {
    name: 'per-package-at-alias',
    resolveId(source, importer) {
      if (!source.startsWith('@/') || !importer) return null
      const base = importer.includes('/packages/ui/') ? uiSrc : rendererSrc
      return this.resolve(join(base, source.slice(2)), dirname(importer), { skipSelf: true })
    },
  }
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [perPackageAlias(), vue(), tailwindcss()],
  },
})
