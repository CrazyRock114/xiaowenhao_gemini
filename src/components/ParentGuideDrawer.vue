<script setup lang="ts">
import { ref } from 'vue'
import type { ParentGuide } from '../types'
import RichText from './RichText'

defineProps<{
  guide: ParentGuide
  parentMode: boolean
}>()

const emit = defineEmits<{
  'update:parentMode': [value: boolean]
}>()

const open = ref(false)
</script>

<template>
  <section class="card parent-guide">
    <div class="pg-top">
      <div class="pg-title-wrap">
        <span class="pg-badge">👨‍👩‍👧 家长深度解读手册</span>
        <h3 class="pg-title">底层全景原理 · 伴学类比 · 误区纠偏</h3>
      </div>
      <div class="pg-actions">
        <button
          type="button"
          class="mode-toggle"
          :class="{ active: parentMode }"
          @click="emit('update:parentMode', !parentMode)"
        >
          {{ parentMode ? '✅ 问答已切换为家长深度档' : '📖 问答一键切至家长解读档' }}
        </button>
        <button type="button" class="expand-btn" @click="open = !open">
          {{ open ? '收起导读 ▲' : '展开全景导读 ▼' }}
        </button>
      </div>
    </div>

    <div v-if="open" class="pg-body anim-pop">
      <div class="pg-block">
        <h4>🔬 一、底层科学全景（家长先吃透）</h4>
        <p class="pg-text"><RichText :text="guide.corePrinciple" /></p>
      </div>

      <div class="pg-block">
        <h4>🎭 二、怎样给孩子讲最生动形象？</h4>
        <ul class="pg-list">
          <li v-for="(tip, idx) in guide.teachingTips" :key="idx">
            <RichText :text="tip" />
          </li>
        </ul>
      </div>

      <div class="pg-block">
        <h4>⚠️ 三、常见误区与科学纠偏</h4>
        <div class="myth-list">
          <div v-for="(m, idx) in guide.misconceptions" :key="idx" class="myth-item">
            <div class="myth-q">❌ 常见误解：{{ m.myth }}</div>
            <div class="myth-a">✅ 科学真相：<RichText :text="m.truth" /></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.parent-guide {
  border: 2px solid #cbd5e1;
  border-left: 6px solid #334155;
  background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 18px 20px;
}

.pg-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pg-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: #334155;
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 5px;
}

.pg-title {
  font-size: 16.5px;
  color: #0f172a;
}

.pg-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.mode-toggle,
.expand-btn {
  padding: 7px 13px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mode-toggle {
  background: #fff;
  border: 1.5px solid #94a3b8;
  color: #1e293b;
}

.mode-toggle.active {
  background: #1e293b;
  border-color: #1e293b;
  color: #fff;
}

.expand-btn {
  background: #e2e8f0;
  color: #1e293b;
}

.expand-btn:hover {
  background: #cbd5e1;
}

.pg-body {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1.5px dashed #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.pg-block h4 {
  font-size: 14.5px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px;
}

.pg-text {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.75;
  color: #334155;
  white-space: pre-line;
}

.pg-list {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  line-height: 1.65;
  color: #334155;
}

.myth-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.myth-item {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 13px;
  font-size: 13.5px;
  line-height: 1.6;
}

.myth-q {
  font-weight: 700;
  color: #b91c1c;
  margin-bottom: 4px;
}

.myth-a {
  color: #1e293b;
}
</style>
