<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Block } from '../types'

const props = defineProps<{ block: Extract<Block, { type: 'sort' }> }>()

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

const items = computed(() =>
  seededShuffle(
    props.block.items.map((text, idx) => ({ text, idx })),
    props.block.items.length * 104729 + 7,
  ),
)

const order = ref<number[]>([])
const checked = ref(false)
const allRight = computed(() => order.value.length === props.block.items.length && order.value.every((v, i) => v === i))
const hasWrong = computed(() => checked.value && !allRight.value)

function click(idx: number) {
  checked.value = false
  const at = order.value.indexOf(idx)
  if (at >= 0) {
    order.value = order.value.filter((v) => v !== idx)
  } else if (order.value.length < props.block.items.length) {
    order.value.push(idx)
  }
}

function reset() {
  order.value = []
  checked.value = false
}

function check() {
  checked.value = true
}

function statusOf(idx: number): 'none' | 'right' | 'wrong' | 'pending' {
  const at = order.value.indexOf(idx)
  if (at < 0) return 'none'
  if (!checked.value) return 'pending'
  return at === idx ? 'right' : 'wrong'
}
</script>

<template>
  <section class="card sort">
    <h2 class="heading">🔢 {{ block.title }}</h2>
    <p v-if="block.instruction" class="sub">{{ block.instruction }}</p>

    <div class="list">
      <button
        v-for="item in items"
        :key="item.idx"
        class="item"
        :class="statusOf(item.idx)"
        @click="click(item.idx)"
      >
        <span class="badge">{{ order.indexOf(item.idx) >= 0 ? order.indexOf(item.idx) + 1 : '·' }}</span>
        <span class="text">{{ item.text }}</span>
      </button>
    </div>

    <div class="actions">
      <button class="btn btn-ghost btn-sm" @click="reset()">↺ 重来</button>
      <button class="btn btn-sm" :disabled="order.length !== block.items.length" @click="check()">
        检查顺序
      </button>
    </div>

    <p v-if="checked && allRight" class="result ok anim-pop">🎉 排对啦！{{ block.goal }}</p>
    <p v-else-if="hasWrong" class="result bad anim-pop">有红色的步骤站错位置了，点它取下来再试试！</p>
  </section>
</template>

<style scoped>
.sort {
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

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--line);
  background: #fff;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  transition: border-color 0.15s, background 0.15s;
}

.item:hover {
  border-color: var(--brand);
}

.item.pending {
  border-color: var(--brand);
  background: var(--brand-soft);
}

.item.right {
  border-color: var(--ok);
  background: var(--ok-soft);
}

.item.wrong {
  border-color: var(--danger);
  background: var(--danger-soft);
  animation: shake 0.3s ease-in-out;
}

.badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f3ede4;
  color: var(--ink-soft);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
}

.item.pending .badge {
  background: var(--brand);
  color: #fff;
}

.item.right .badge {
  background: var(--ok);
  color: #fff;
}

.item.wrong .badge {
  background: var(--danger);
  color: #fff;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.result {
  margin: 14px 0 0;
  text-align: center;
  padding: 11px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 14.5px;
}

.result.ok {
  background: var(--ok-soft);
  color: var(--ok);
}

.result.bad {
  background: var(--danger-soft);
  color: var(--danger);
}
</style>
