import { defineStore } from 'pinia'
import type { Badge, ExpNote, KidProfile, KidProgress } from '../types'

const KIDS_KEY = 'baike.kids.v2'
const KIDS_KEY_V1 = 'baike.kids.v1'
const ACTIVE_KEY = 'baike.active.v1'
const progressKey = (id: string) => `baike.progress.v1.${id}`

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 存储满等异常不阻断使用 */
  }
}

function defaultProgress(): KidProgress {
  return { stars: 0, completedIssues: [], badges: [], quiz: {}, experiments: {}, askedOnce: false }
}

const defaultKids: KidProfile[] = [
  { id: 'kid-a', name: '哥哥', grade: 5, avatar: '🦊' },
  { id: 'kid-b', name: '弟弟', grade: 3, avatar: '🐰' },
]

export const AVATAR_CHOICES = ['🦊', '🐰', '🐼', '🐯', '🦁', '🐨', '🐸', '🐙', '🦄', '🐬', '🦕', '🐝']

/** 加载档案：v2 不存在时从 v1 迁移（妹妹 → 弟弟） */
function loadKids(): KidProfile[] {
  const v2 = localStorage.getItem(KIDS_KEY)
  if (v2) {
    const kids = load(KIDS_KEY, defaultKids)
    return kids.length ? kids : defaultKids
  }
  const v1 = localStorage.getItem(KIDS_KEY_V1)
  if (v1) {
    try {
      const kids = JSON.parse(v1) as KidProfile[]
      for (const k of kids) {
        if (k.id === 'kid-b' && k.name === '妹妹') k.name = '弟弟'
      }
      save(KIDS_KEY, kids)
      return kids.length ? kids : defaultKids
    } catch {
      return defaultKids
    }
  }
  return defaultKids
}

export type ActiveMode = 'single' | 'twin'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export const useKidsStore = defineStore('kids', {
  state: () => {
    const kids = loadKids()
    const progress: Record<string, KidProgress> = {}
    for (const k of kids) progress[k.id] = load(progressKey(k.id), defaultProgress())
    const active = load(ACTIVE_KEY, { mode: 'single' as ActiveMode, ids: [] as string[] })
    return {
      kids,
      mode: active.mode,
      activeIds: active.ids,
      progress,
    }
  },
  getters: {
    /** 当前激活的孩子（单人模式 0/1 个；一起学 2 个） */
    activeKids(state): KidProfile[] {
      return state.activeIds
        .map((id) => state.kids.find((k) => k.id === id))
        .filter((k): k is KidProfile => Boolean(k))
    },
    /** 主操作者：单人即所选孩子；一起学为第一个（默认记录归属） */
    currentKid(): KidProfile | null {
      return this.activeKids[0] ?? null
    },
    isTwin(): boolean {
      return this.mode === 'twin' && this.activeKids.length === 2
    },
    currentProgress(state): KidProgress | null {
      const id = state.activeIds[0]
      return id ? (state.progress[id] ?? null) : null
    },
    totalStars(state): number {
      return Object.values(state.progress).reduce((sum, p) => sum + p.stars, 0)
    },
  },
  actions: {
    persist() {
      save(KIDS_KEY, this.kids)
      save(ACTIVE_KEY, { mode: this.mode, ids: this.activeIds })
      for (const [id, p] of Object.entries(this.progress)) save(progressKey(id), p)
    },
    selectKid(id: string | null) {
      this.mode = 'single'
      this.activeIds = id ? [id] : []
      this.persist()
    },
    /** 一起学：默认前两个档案 */
    selectTwin() {
      this.mode = 'twin'
      this.activeIds = this.kids.slice(0, 2).map((k) => k.id)
      this.persist()
    },
    updateKid(id: string, patch: Partial<Omit<KidProfile, 'id'>>) {
      const kid = this.kids.find((k) => k.id === id)
      if (!kid) return
      Object.assign(kid, patch)
      this.persist()
    },
    addKid() {
      const id = `kid-${Date.now().toString(36)}`
      this.kids.push({ id, name: `小探险家 ${this.kids.length + 1}`, grade: 3, avatar: AVATAR_CHOICES[this.kids.length % AVATAR_CHOICES.length] })
      this.progress[id] = defaultProgress()
      this.persist()
    },
    removeKid(id: string) {
      if (this.kids.length <= 1) return
      this.kids = this.kids.filter((k) => k.id !== id)
      delete this.progress[id]
      this.activeIds = this.activeIds.filter((x) => x !== id)
      if (this.mode === 'twin' && this.activeIds.length < 2) this.mode = 'single'
      this.persist()
    },

    progressFor(kidId: string): KidProgress | null {
      return this.progress[kidId] ?? null
    },

    /** 答对一道题 +1 星（每题每孩子只加一次）。返回是否真的加了星。 */
    recordQuizAnswerFor(kidId: string, issueId: string, questionId: string): boolean {
      const prog = this.progress[kidId]
      if (!prog) return false
      prog.quiz[issueId] ??= {}
      if (prog.quiz[issueId][questionId]) return false
      prog.quiz[issueId][questionId] = true
      prog.stars += 1
      this.persist()
      return true
    },
    hasQuizAnswerFor(kidId: string, issueId: string, questionId: string): boolean {
      return Boolean(this.progress[kidId]?.quiz[issueId]?.[questionId])
    },

    /** 完成一期：激活的所有孩子各自 +5 星 + 徽章。任一人首次完成返回 true。 */
    completeIssueForActive(issueId: string, badge: Omit<Badge, 'date'>): boolean {
      let anyNew = false
      for (const kid of this.activeKids) {
        const prog = this.progress[kid.id]
        if (!prog || prog.completedIssues.includes(issueId)) continue
        prog.completedIssues.push(issueId)
        prog.stars += 5
        prog.badges.push({ ...badge, date: today() })
        anyNew = true
      }
      if (anyNew) this.persist()
      return anyNew
    },
    completeIssue(issueId: string, badge: Omit<Badge, 'date'>): boolean {
      const prog = this.currentProgress
      if (!prog || this.currentKid == null) return false
      if (prog.completedIssues.includes(issueId)) return false
      prog.completedIssues.push(issueId)
      prog.stars += 5
      prog.badges.push({ ...badge, date: today() })
      this.persist()
      return true
    },

    toggleExpStepFor(kidId: string, expId: string, stepIdx: number) {
      const prog = this.progress[kidId]
      if (!prog) return
      prog.experiments[expId] ??= { steps: [], notes: [] }
      const steps = prog.experiments[expId].steps
      const i = steps.indexOf(stepIdx)
      if (i >= 0) steps.splice(i, 1)
      else steps.push(stepIdx)
      this.persist()
    },
    expStateFor(kidId: string, expId: string): { steps: number[]; notes: ExpNote[] } {
      return this.progress[kidId]?.experiments[expId] ?? { steps: [], notes: [] }
    },
    addExpNoteFor(kidId: string, expId: string, text: string) {
      const prog = this.progress[kidId]
      if (!prog || !text.trim()) return
      prog.experiments[expId] ??= { steps: [], notes: [] }
      prog.experiments[expId].notes.unshift({ date: today(), text: text.trim() })
      this.persist()
    },
    removeExpNoteFor(kidId: string, expId: string, index: number) {
      this.progress[kidId]?.experiments[expId]?.notes.splice(index, 1)
      this.persist()
    },

    /** 第一次提问：+2 星 + 徽章。返回徽章（用于庆祝），否则 null。 */
    markAskedFor(kidId: string): Badge | null {
      const prog = this.progress[kidId]
      if (!prog || prog.askedOnce) return null
      prog.askedOnce = true
      prog.stars += 2
      const badge: Badge = { id: 'first-question', label: '提问小达人', emoji: '🎁', date: today() }
      prog.badges.push(badge)
      this.persist()
      return badge
    },

    // ---- 兼容旧调用的"主操作者"代理 ----
    recordQuizAnswer(issueId: string, questionId: string): boolean {
      return this.currentKid ? this.recordQuizAnswerFor(this.currentKid.id, issueId, questionId) : false
    },
    hasQuizAnswer(issueId: string, questionId: string): boolean {
      return this.currentKid ? this.hasQuizAnswerFor(this.currentKid.id, issueId, questionId) : false
    },
    toggleExpStep(expId: string, stepIdx: number) {
      if (this.currentKid) this.toggleExpStepFor(this.currentKid.id, expId, stepIdx)
    },
    expState(expId: string) {
      return this.currentKid ? this.expStateFor(this.currentKid.id, expId) : { steps: [], notes: [] }
    },
    addExpNote(expId: string, text: string) {
      if (this.currentKid) this.addExpNoteFor(this.currentKid.id, expId, text)
    },
    removeExpNote(expId: string, index: number) {
      if (this.currentKid) this.removeExpNoteFor(this.currentKid.id, expId, index)
    },
    markAsked(): Badge | null {
      return this.currentKid ? this.markAskedFor(this.currentKid.id) : null
    },
  },
})
