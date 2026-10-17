<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Block, QuizQuestion } from '../types'
import { useKidsStore } from '../stores/kids'

const props = defineProps<{ block: Extract<Block, { type: 'quiz' }>; issueId: string }>()

const kids = useKidsStore()
const GUEST = 'guest'

/** 本期作答者：一起学 = 两人各答各的；单人 = 当前孩子；未选 = 游客（不记星） */
const answererIds = computed<string[]>(() =>
  kids.isTwin ? kids.activeIds : kids.activeIds[0] ? [kids.activeIds[0]] : [GUEST],
)

function kidOf(id: string) {
  return kids.kids.find((k) => k.id === id)
}
function kidName(id: string) {
  return kidOf(id)?.name ?? '小客人'
}
function kidAvatar(id: string) {
  return kidOf(id)?.avatar ?? '🙋'
}

interface KidState {
  picked: number | null
  correct: boolean
  starEarned: boolean
}
interface QState {
  kids: Record<string, KidState>
  shaking: boolean
}

const states = reactive<Record<string, QState>>({})
for (const q of props.block.questions) {
  const perKid: Record<string, KidState> = {}
  for (const id of answererIds.value) {
    perKid[id] = { picked: null, correct: kids.hasQuizAnswerFor(id, props.issueId, q.id), starEarned: false }
  }
  states[q.id] = { kids: perKid, shaking: false }
}

/** 当前轮到谁：第一个还没答对的人（一起学自动轮流） */
function currentTurn(q: QState): string | null {
  return answererIds.value.find((id) => !q.kids[id]?.correct) ?? null
}

function allSolved(q: QState): boolean {
  return answererIds.value.every((id) => q.kids[id]?.correct)
}

function whoPicked(q: QState, optionIdx: number): string[] {
  return answererIds.value.filter((id) => q.kids[id]?.picked === optionIdx)
}

function pick(qq: QuizQuestion, q: QState, idx: number) {
  const turn = currentTurn(q)
  if (!turn) return
  const st = q.kids[turn]
  if (st.correct) return
  st.picked = idx
  if (idx === qq.answer) {
    st.correct = true
    if (turn !== GUEST && kids.recordQuizAnswerFor(turn, props.issueId, qq.id)) st.starEarned = true
  } else {
    q.shaking = true
    setTimeout(() => (q.shaking = false), 350)
  }
}

const solvedLine = computed(() => {
  if (!kids.isTwin) {
    const id = answererIds.value[0]
    const n = props.block.questions.filter((q) => states[q.id].kids[id]?.correct).length
    return `已答对 ${n} / ${props.block.questions.length} 题`
  }
  return kids.activeKids
    .map((kid) => {
      const n = props.block.questions.filter((q) => states[q.id].kids[kid.id]?.correct).length
      return `${kid.avatar} ${kid.name} ${n}/${props.block.questions.length}`
    })
    .join(' · ')
})
</script>

<template>
  <section class="card quiz">
    <h2 class="heading">🎯 考考你</h2>
    <p class="sub">
      <template v-if="kids.isTwin">哥哥弟弟各选各的答案，答对各自得 ⭐！</template>
      <template v-else>答对一题得一颗 ⭐，答错可以再想想！</template>
    </p>

    <div v-for="(q, qi) in block.questions" :key="q.id" class="question" :class="{ solved: allSolved(states[q.id]) }">
      <div class="q-head">
        <span class="q-no">第 {{ qi + 1 }} 题</span>
        <span v-if="q.level === 'advanced'" class="chip adv">🚀 进阶题</span>

        <!-- 一起学：回合提示 -->
        <span v-if="kids.isTwin && !allSolved(states[q.id])" class="turn">
          {{ kidAvatar(currentTurn(states[q.id])!) }} {{ kidName(currentTurn(states[q.id])!) }}的回合
        </span>
        <span v-if="kids.isTwin && allSolved(states[q.id])" class="turn done">两人都答对啦 🎉</span>

        <!-- 得星提示 -->
        <template v-for="id in answererIds" :key="id">
          <span v-if="states[q.id].kids[id]?.starEarned" class="star-float" :style="{ right: `${answererIds.indexOf(id) * 26}px` }">
            {{ kidAvatar(id) }}⭐
          </span>
        </template>
        <span v-if="!kids.isTwin && answererIds[0] !== GUEST && states[q.id].kids[answererIds[0]]?.correct" class="chip chip-ok collected">✓ 已收集</span>
      </div>
      <p class="q-text">{{ q.question }}</p>
      <div class="options">
        <button
          v-for="(opt, oi) in q.options"
          :key="oi"
          class="option"
          :class="{
            right: allSolved(states[q.id]) && oi === q.answer,
            wrong: states[q.id].shaking && whoPicked(states[q.id], oi).includes(currentTurn(states[q.id]) ?? ''),
            dim: allSolved(states[q.id]) && oi !== q.answer,
          }"
          :disabled="allSolved(states[q.id])"
          @click="pick(q, states[q.id], oi)"
        >
          <span class="opt-key">{{ String.fromCharCode(65 + oi) }}</span>
          <span class="opt-text">{{ opt }}</span>
          <template v-if="allSolved(states[q.id]) && oi === q.answer">
            <span class="opt-mark">✓</span>
          </template>
          <template v-else>
            <span
              v-for="pid in whoPicked(states[q.id], oi)"
              :key="pid"
              class="picker-badge"
              :title="kidName(pid)"
            >{{ kidAvatar(pid) }}</span>
          </template>
        </button>
      </div>
      <div v-if="allSolved(states[q.id])" class="explain anim-pop">
        <p class="explain-text">
          <strong>💡 {{ q.explain.basic }}</strong>
          <span class="explain-adv">🔍 {{ q.explain.advanced }}</span>
        </p>
      </div>
    </div>

    <p class="progress">{{ solvedLine }}</p>
  </section>
</template>

<style scoped>
.quiz {
  padding: 26px 28px;
}

.heading {
  font-size: 21px;
}

.sub {
  color: var(--ink-soft);
  font-size: 14.5px;
  margin: 6px 0 4px;
}

.question {
  border: 2px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 16px 18px;
  margin-top: 16px;
  transition: border-color 0.2s;
}

.question.solved {
  border-color: #bfe6cc;
  background: var(--ok-soft);
}

.q-head {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  flex-wrap: wrap;
}

.q-no {
  font-size: 12.5px;
  font-weight: 800;
  color: var(--ink-soft);
}

.adv {
  background: #eee9fc;
  color: #6a52d9;
}

.turn {
  font-size: 12.5px;
  font-weight: 800;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 3px 11px;
  border-radius: 999px;
  animation: pop-in 0.25s ease-out;
}

.turn.done {
  background: var(--ok-soft);
  color: var(--ok);
}

.star-float {
  position: absolute;
  right: 0;
  top: -8px;
  font-size: 20px;
  animation: float-up 1.2s ease-out forwards;
  pointer-events: none;
  white-space: nowrap;
}

.collected {
  margin-left: auto;
}

.q-text {
  font-weight: 700;
  font-size: 16px;
  margin: 8px 0 12px;
}

.options {
  display: grid;
  gap: 9px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--line);
  background: #fff;
  font-size: 15px;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
}

.option:not(:disabled):hover {
  border-color: var(--brand);
}

.option:not(:disabled):active {
  transform: scale(0.99);
}

.option.right {
  border-color: var(--ok);
  background: var(--ok-soft);
  font-weight: 700;
}

.option.wrong {
  border-color: var(--danger);
  background: var(--danger-soft);
  animation: shake 0.3s ease-in-out;
}

.option.dim {
  opacity: 0.55;
}

.option:disabled {
  cursor: default;
}

.opt-key {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #f3ede4;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.option.right .opt-key {
  background: var(--ok);
  color: #fff;
}

.opt-mark {
  margin-left: auto;
  font-weight: 800;
}

.picker-badge {
  margin-left: auto;
  display: inline-flex;
  gap: 2px;
  font-size: 17px;
  animation: pop-in 0.25s ease-out;
}

.explain {
  margin-top: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px 14px;
}

.explain-text {
  margin: 0;
  font-size: 14.5px;
}

.explain-adv {
  display: block;
  margin-top: 8px;
  color: var(--ink-soft);
  font-size: 13.5px;
  border-top: 1px dashed var(--line);
  padding-top: 8px;
}

.progress {
  text-align: center;
  color: var(--ink-soft);
  font-weight: 700;
  margin: 18px 0 0;
  font-size: 14.5px;
}
</style>
