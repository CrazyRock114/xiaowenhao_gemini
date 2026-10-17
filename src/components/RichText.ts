import { defineComponent, h, type PropType } from 'vue'
import { parseRich } from '../data/richText'
import { getPoint } from '../data/registry'
import { openVocab, setHoveredVocab, clearHoveredVocab } from '../stores/vocab'

/** 渲染内容富文本：**加粗** 与 [[知识点id|显示词]] */
export default defineComponent({
  name: 'RichText',
  props: {
    text: { type: String as PropType<string>, required: true },
  },
  setup(props) {
    return () => {
      const tokens = parseRich(props.text, (id) => getPoint(id)?.name)
      const children = tokens.map((t) => {
        if (t.type === 'text') return t.text
        if (t.type === 'bold') return h('strong', t.text)
        return h(
          'button',
          {
            class: 'vocab-chip',
            type: 'button',
            title: '悬停预览 · 点击看深度解释',
            onClick: () => {
              clearHoveredVocab(true)
              openVocab(t.id)
            },
            onMouseenter: (e: MouseEvent) => {
              setHoveredVocab(t.id, e.currentTarget as HTMLElement)
            },
            onMouseleave: () => {
              clearHoveredVocab()
            },
          },
          `📖 ${t.label}`,
        )
      })
      return h('span', { class: 'rich' }, children)
    }
  },
})
