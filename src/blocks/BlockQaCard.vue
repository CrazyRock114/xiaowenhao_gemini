<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Block } from '../types'
import RichText from '../components/RichText'
import { useKidsStore } from '../stores/kids'

const props = defineProps<{ block: Extract<Block, { type: 'qa-card' }> }>()

const kids = useKidsStore()
// 默认难度档跟随当前孩子的年级（一起学模式默认基础档）
const defaultAdvanced = () => (kids.currentKid && !kids.isTwin ? kids.currentKid.grade >= 5 : false)
const revealed = ref(false)
const showAdvanced = ref(defaultAdvanced())

const answerText = computed(() =>
  showAdvanced.value ? props.block.answer.advanced : props.block.answer.basic,
)
</script>

<template>
  <section class="qa card">
    <div class="q-row">
      <span v-if="block.emoji" class="emoji">{{ block.emoji }}</span>
      <div class="q-wrap">
        <span class="q-label">小问号</span>
        <h3 class="q-text">{{ block.question }}</h3>
      </div>
    </div>

    <button v-if="!revealed" class="btn reveal-btn" @click="revealed = true">
      ✨ 点我揭晓答案
    </button>

    <div v-else class="answer anim-pop">
      <div class="level-tabs">
        <button class="level-tab" :class="{ on: !showAdvanced }" @click="showAdvanced = false">🌱 基础版</button>
        <button class="level-tab" :class="{ on: showAdvanced }" @click="showAdvanced = true">🚀 进阶版</button>
      </div>
      <p class="a-text"><RichText :text="answerText" /></p>
      <p v-if="!showAdvanced" class="hint">💡 点「进阶版」可以看到更深一步的解释哦！</p>
    </div>
  </section>
</template>

<style scoped>
.qa {
  border-left: 6px solid var(--brand);
}

.q-row {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.emoji {
  font-size: 34px;
  flex-shrink: 0;
}

.q-label {
  font-size: 12.5px;
  font-weight: 800;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 2px 10px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 6px;
}

.q-text {
  font-size: 17.5px;
  line-height: 1.5;
}

.reveal-btn {
  width: 100%;
}

.answer {
  background: #fdf9f2;
  border-radius: var(--radius-sm);
  padding: 16px 18px;
}

.level-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.level-tab {
  padding: 6px 13px;
  border-radius: 999px;
  background: #f0e8db;
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 13.5px;
}

.level-tab.on {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.a-text {
  margin: 0;
  font-size: 15.5px;
}

.hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--ink-faint);
}
</style>
