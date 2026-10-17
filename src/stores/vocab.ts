import { ref } from 'vue'

/** 全局词条弹窗：任何地方点 [[知识点]] 都打开它 */
export const activeVocabId = ref<string | null>(null)

export function openVocab(id: string) {
  activeVocabId.value = id
}

export function closeVocab() {
  activeVocabId.value = null
}

/** 桌面端悬停轻量气泡状态 */
export interface HoveredVocabState {
  id: string
  x: number
  y: number
  width: number
  height: number
}

export const hoveredVocab = ref<HoveredVocabState | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

export function setHoveredVocab(id: string, el: HTMLElement) {
  if (hoverTimer) clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    const rect = el.getBoundingClientRect()
    hoveredVocab.value = {
      id,
      x: rect.left + rect.width / 2,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    }
  }, 160)
}

export function clearHoveredVocab(immediate = false) {
  if (hoverTimer) clearTimeout(hoverTimer)
  if (immediate) {
    hoveredVocab.value = null
  } else {
    hoverTimer = setTimeout(() => {
      hoveredVocab.value = null
    }, 200)
  }
}

export function keepHoveredVocab() {
  if (hoverTimer) clearTimeout(hoverTimer)
}
