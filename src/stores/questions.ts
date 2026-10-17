import { defineStore } from 'pinia'
import type { BoxQuestion, QuestionStatus } from '../types'
import { remoteEnabled, sendToRemote } from '../questionBox/adapters'

const LOCAL_KEY = 'baike.questions.v1'

function load(): BoxQuestion[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? (JSON.parse(raw) as BoxQuestion[]) : []
  } catch {
    return []
  }
}

function uid() {
  return `q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    questions: load(),
    lastSubmitted: null as BoxQuestion | null,
  }),
  getters: {
    byKid(state) {
      return (kidId?: string) => state.questions.filter((q) => q.kidId === kidId)
    },
    statusLabel() {
      return (s: QuestionStatus) => (s === 'new' ? '等待整理' : s === 'answered' ? '已解答' : '列入下期')
    },
  },
  actions: {
    persist() {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.questions))
    },
    async submit(input: { text: string; kid: string; kidId?: string; sourceIssue?: string }) {
      const q: BoxQuestion = {
        id: uid(),
        text: input.text.trim(),
        kid: input.kid,
        kidId: input.kidId,
        date: new Date().toISOString(),
        sourceIssue: input.sourceIssue,
        status: 'new',
      }
      this.questions.unshift(q)
      this.lastSubmitted = q
      this.persist()
      if (remoteEnabled) void sendToRemote({ text: q.text, kid: q.kid, source_issue: q.sourceIssue ?? null, created_at: q.date })
      return q
    },
    setStatus(id: string, status: QuestionStatus) {
      const q = this.questions.find((x) => x.id === id)
      if (!q) return
      q.status = status
      this.persist()
    },
    setAnswer(id: string, answer: string) {
      const q = this.questions.find((x) => x.id === id)
      if (!q) return
      q.answer = answer
      if (answer.trim() && q.status === 'new') q.status = 'answered'
      this.persist()
    },
    remove(id: string) {
      this.questions = this.questions.filter((x) => x.id !== id)
      this.persist()
    },
    exportText(): string {
      const lines = ['# 提问箱导出', '']
      for (const q of [...this.questions].sort((a, b) => a.date.localeCompare(b.date))) {
        const status = q.status === 'new' ? '等待整理' : q.status === 'answered' ? '已解答' : '列入下期'
        lines.push(`## ${q.text}`)
        lines.push(`- 提问: ${q.kid} · ${q.date.slice(0, 10)} · 状态: ${status}`)
        if (q.sourceIssue) lines.push(`- 来源期: ${q.sourceIssue}`)
        if (q.answer) lines.push(`- 解答: ${q.answer}`)
        lines.push('')
      }
      return lines.join('\n')
    },
  },
})
