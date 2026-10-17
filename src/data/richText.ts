export type RichToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'vocab'; id: string; label: string }

const VOCAB_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g
const BOLD_RE = /\*\*([^*]+)\*\*/g

/**
 * 解析内容富文本：
 *   **加粗**        → bold
 *   [[id|显示词]]   → 知识点词条按钮（显示词可省略，默认用知识点名）
 */
export function parseRich(input: string, labelOf: (id: string) => string | undefined): RichToken[] {
  const tokens: RichToken[] = []
  let last = 0
  for (const m of input.matchAll(VOCAB_RE)) {
    const idx = m.index ?? 0
    pushBolded(tokens, input.slice(last, idx))
    tokens.push({ type: 'vocab', id: m[1], label: m[2] ?? labelOf(m[1]) ?? m[1] })
    last = idx + m[0].length
  }
  pushBolded(tokens, input.slice(last))
  return tokens
}

function pushBolded(tokens: RichToken[], s: string) {
  let last = 0
  for (const m of s.matchAll(BOLD_RE)) {
    const idx = m.index ?? 0
    if (idx > last) tokens.push({ type: 'text', text: s.slice(last, idx) })
    tokens.push({ type: 'bold', text: m[1] })
    last = idx + m[0].length
  }
  if (last < s.length) tokens.push({ type: 'text', text: s.slice(last) })
}
