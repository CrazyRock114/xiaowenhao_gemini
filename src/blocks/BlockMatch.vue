<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Block } from '../types'

const props = defineProps<{ block: Extract<Block, { type: 'match' }> }>()

interface Item {
  key: string
  text: string
  emoji?: string
  pairIdx: number
}

/** 固定种子的洗牌，保证刷新后顺序稳定（避免每次刷新都不同导致困惑） */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const lefts: Item[] = props.block.pairs.map((p, i) => ({ key: `L${i}`, text: p.left, emoji: p.emoji, pairIdx: i }))
const rights: Item[] = seededShuffle(
  props.block.pairs.map((p, i) => ({ key: `R${i}`, text: p.right, pairIdx: i })),
  props.block.pairs.length * 7919 + 13,
)

const state = reactive({
  selectedLeft: null as string | null,
  matched: new Set<number>(),
  wrongRight: null as string | null,
})

const allDone = computed(() => state.matched.size === props.block.pairs.length)

function clickLeft(item: Item) {
  if (state.matched.has(item.pairIdx)) return
  state.selectedLeft = state.selectedLeft === item.key ? null : item.key
}

function clickRight(item: Item) {
  if (state.matched.has(item.pairIdx)) return
  if (!state.selectedLeft) return
  const left = lefts.find((l) => l.key === state.selectedLeft)
  if (!left) return
  if (left.pairIdx === item.pairIdx) {
    state.matched.add(item.pairIdx)
    state.selectedLeft = null
  } else {
    state.wrongRight = item.key
    setTimeout(() => (state.wrongRight = null), 400)
  }
}

function reset() {
  state.matched.clear()
  state.selectedLeft = null
}
</script>

<template>
  <section class="card match">
    <h2 class="heading">🧩 {{ block.title }}</h2>
    <p v-if="block.instruction" class="sub">{{ block.instruction }}</p>

    <div class="cols">
      <div class="col">
        <button
          v-for="item in lefts"
          :key="item.key"
          class="tile left"
          :class="{
            selected: state.selectedLeft === item.key,
            locked: state.matched.has(item.pairIdx),
          }"
          @click="clickLeft(item)"
        >
          <span v-if="item.emoji" class="t-emoji">{{ item.emoji }}</span>
          {{ item.text }}
          <span v-if="state.matched.has(item.pairIdx)" class="lock">✓</span>
        </button>
      </div>
      <div class="col">
        <button
          v-for="item in rights"
          :key="item.key"
          class="tile right"
          :class="{
            locked: state.matched.has(item.pairIdx),
            wrong: state.wrongRight === item.key,
          }"
          @click="clickRight(item)"
        >
          {{ item.text }}
        </button>
      </div>
    </div>

    <div v-if="allDone" class="done anim-pop">🎉 全部配对成功！小工人们各就各位！</div>
    <div v-else class="foot">
      <span class="count">已配对 {{ state.matched.size }} / {{ block.pairs.length }}</span>
      <button class="retry" @click="reset()">↺ 重来</button>
    </div>
  </section>
</template>

<style scoped>
.match {
  padding: 26px 28px;
}

.heading {
  font-size: 21px;
}

.sub {
  color: var(--ink-soft);
  font-size: 14.5px;
  margin: 6px 0 16px;
}

.cols {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--line);
  background: #fff;
  text-align: left;
  font-size: 14.5px;
  font-weight: 600;
  transition: border-color 0.15s, background 0.15s, opacity 0.2s;
  min-height: 52px;
}

.tile.left.selected {
  border-color: var(--brand);
  background: var(--brand-soft);
  box-shadow: 0 0 0 3px rgba(255, 138, 61, 0.18);
}

.tile.locked {
  border-color: var(--ok);
  background: var(--ok-soft);
  opacity: 0.75;
  cursor: default;
}

.tile.right.wrong {
  animation: shake 0.3s ease-in-out;
  border-color: var(--danger);
  background: var(--danger-soft);
}

.t-emoji {
  font-size: 20px;
  flex-shrink: 0;
}

.lock {
  margin-left: auto;
  color: var(--ok);
  font-weight: 800;
}

.done {
  margin-top: 16px;
  text-align: center;
  background: var(--ok-soft);
  color: var(--ok);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-weight: 800;
}

.foot {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.count {
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 14px;
}

.retry {
  color: var(--ink-faint);
  font-size: 14px;
}

.retry:hover {
  color: var(--ink-soft);
}

@media (max-width: 560px) {
  .cols {
    grid-template-columns: 1fr;
  }
  .tile.right {
    margin-left: 22px;
  }
}
</style>
