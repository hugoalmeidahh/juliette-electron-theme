import { onBeforeUnmount } from 'vue'

/**
 * Arraste horizontal de um gutter para redimensionar um painel vizinho.
 * Extraído de tessera-poc/renderer.js:2580-2605 (setupGutters) — aqui emite
 * apenas o delta de movimento; quem chama soma ao próprio estado de largura
 * e aplica os limites min/max.
 */
export function useResizablePane(onDelta: (deltaX: number) => void) {
  let onMove: ((event: PointerEvent) => void) | null = null
  let onUp: (() => void) | null = null

  function startDrag(event: PointerEvent) {
    event.preventDefault()
    let lastX = event.clientX

    onMove = (moveEvent: PointerEvent) => {
      onDelta(moveEvent.clientX - lastX)
      lastX = moveEvent.clientX
    }
    onUp = () => {
      if (onMove) window.removeEventListener('pointermove', onMove)
      if (onUp) window.removeEventListener('pointerup', onUp)
      onMove = null
      onUp = null
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  onBeforeUnmount(() => {
    if (onMove) window.removeEventListener('pointermove', onMove)
    if (onUp) window.removeEventListener('pointerup', onUp)
  })

  return { startDrag }
}
