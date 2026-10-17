import { defineComponent, h, type PropType } from 'vue'
import { parseRich } from '../data/richText'
import { getPoint } from '../data/registry'
import { openVocab } from '../stores/vocab'

/** 渲染内容富文本：**加粗** 与 [[知识点id|显示词]] */
export default defineComponent({
  name: 'RichText',
  props: {
    text: { type: String as PropType<string>, required: true },
  },
  setup(props) {
    return () => {
      const tokens = parseRich(props.text, (id) => getPoint(id)?.name)
      const children = tokens.map((t, i) => {
        if (t.type === 'text') return t.text
        if (t.type === 'bold') return h('strong', t.text)
        return h(
          'button',
          {
            class: 'vocab-chip',
            type: 'button',
            title: '点我看解释',
            onClick: () => openVocab(t.id),
          },
          `📖 ${t.label}`,
        )
      })
      return h('span', { class: 'rich' }, children)
    }
  },
})
