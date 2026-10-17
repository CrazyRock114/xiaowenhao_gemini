import { ref } from 'vue'

/** 全局词条弹窗：任何地方点 [[知识点]] 都打开它 */
export const activeVocabId = ref<string | null>(null)

export function openVocab(id: string) {
  activeVocabId.value = id
}

export function closeVocab() {
  activeVocabId.value = null
}
