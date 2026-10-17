<script setup lang="ts">
import type { Block } from '../types'
import { getPoint, domainOf } from '../data/registry'
import { openVocab } from '../stores/vocab'

defineProps<{ block: Extract<Block, { type: 'vocab' }> }>()
</script>

<template>
  <section class="card vocab-block">
    <h2 class="heading">📖 本期词汇表</h2>
    <p class="sub">点开卡片，看每个词的基础版和进阶版解释。</p>
    <div class="grid">
      <button v-for="id in block.ids" :key="id" class="term" @click="openVocab(id)">
        <span class="t-emoji" :style="{ background: getPoint(id) ? domainOf(getPoint(id)!.domain).soft : '#f3ede4' }">
          {{ getPoint(id)?.emoji ?? '❓' }}
        </span>
        <span class="t-name">{{ getPoint(id)?.name ?? id }}</span>
        <span class="t-dom">{{ getPoint(id) ? domainOf(getPoint(id)!.domain).name : '' }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.vocab-block {
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.term {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 10px 13px;
  border-radius: 14px;
  border: 2px solid var(--line);
  background: #fff;
  transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
}

.term:hover {
  transform: translateY(-3px);
  border-color: var(--brand);
  box-shadow: var(--shadow);
}

.t-emoji {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 24px;
}

.t-name {
  font-weight: 800;
  font-size: 15px;
}

.t-dom {
  font-size: 11.5px;
  color: var(--ink-faint);
}
</style>
