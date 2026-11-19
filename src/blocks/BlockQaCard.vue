<script setup lang="ts">
import { computed, inject, ref, watch, type Ref } from 'vue'
import type { Block } from '../types'
import RichText from '../components/RichText'
import { useKidsStore } from '../stores/kids'

const props = defineProps<{ block: Extract<Block, { type: 'qa-card' }> }>()

const kids = useKidsStore()
const globalParentMode = inject<Ref<boolean>>('parentMode', ref(false))

type Tier = 'basic' | 'advanced' | 'parent'
const defaultTier = (): Tier => {
  if (globalParentMode.value && props.block.answer.parent) return 'parent'
  return kids.currentKid && !kids.isTwin && kids.currentKid.grade >= 5 ? 'advanced' : 'basic'
}

const revealed = ref(false)
const tier = ref<Tier>(defaultTier())

watch(globalParentMode, (on) => {
  if (on && props.block.answer.parent) {
    revealed.value = true
    tier.value = 'parent'
  } else if (!on && tier.value === 'parent') {
    tier.value = kids.currentKid && !kids.isTwin && kids.currentKid.grade >= 5 ? 'advanced' : 'basic'
  }
})

const answerText = computed(() => {
  if (tier.value === 'parent' && props.block.answer.parent) return props.block.answer.parent
  if (tier.value === 'advanced') return props.block.answer.advanced
  return props.block.answer.basic
})

const qaBridge = computed(() => {
  const q = props.block.question
  if (q.includes('甜') || q.includes('米饭') || q.includes('淀粉') || q.includes('糖化')) {
    return {
      badge: '🔬 母舰硬核实验台',
      title: '剑桥 0610 虚拟生化实验室：淀粉遇碘变蓝黑与水解检验',
      url: 'https://www.igcse.xyz/practical',
    }
  }
  if (q.includes('手套膜') || q.includes('面筋')) {
    return {
      badge: '🔬 0610 蛋白质检测台',
      title: '高年级实操：双缩脲试剂检验纯面筋蛋白质（紫色络合物）',
      url: 'https://www.igcse.xyz/practical',
    }
  }
  if (q.includes('小苏打') || q.includes('泡打粉') || q.includes('膨松')) {
    return {
      badge: '🧪 0620 酸碱工坊',
      title: '碳酸氢钠产气动力学：气体注射器精确测量 CO₂ 析出速率',
      url: 'https://www.igcse.xyz/practical',
    }
  }
  if (q.includes('气孔') || q.includes('气体') || q.includes('氨气') || q.includes('传播')) {
    return {
      badge: '⚛️ 0625 热物理与扩散',
      title: '气体分子动理论：热膨胀与扩散速率模拟器',
      url: 'https://www.igcse.xyz',
    }
  }
  if (q.includes('电解') || q.includes('酸水') || q.includes('晒伤')) {
    return {
      badge: '🧪 0620 电解与 pH 工坊',
      title: '电解池电极半反应与酸碱指示剂实验台',
      url: 'https://www.igcse.xyz/practical',
    }
  }
  if (q.includes('酒') || q.includes('酵母')) {
    return {
      badge: '🎯 G8 科学练兵岛',
      title: 'G8 呼吸与发酵专项挑战：60秒核心考点大冲关',
      url: 'https://sky.igcse.xyz',
    }
  }
  if (q.includes('醋') || q.includes('酸')) {
    return {
      badge: '🧪 0620 化学氧化',
      title: '剑桥 0620 好氧生物氧化与食醋酸度测定实验',
      url: 'https://www.igcse.xyz/practical',
    }
  }
  return {
    badge: '🏛️ 教学主母舰',
    title: '剑桥 IGCSE 0610/0620/0625 全考纲实验与课时',
    url: 'https://www.igcse.xyz',
  }
})
</script>

<template>
  <section class="qa card" :class="{ 'is-parent': revealed && tier === 'parent' }">
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

    <div v-else class="answer anim-pop" :class="{ 'parent-box': tier === 'parent' }">
      <div class="level-tabs">
        <button class="level-tab" :class="{ on: tier === 'basic' }" @click="tier = 'basic'">🌱 基础版（G3 故事启蒙）</button>
        <button class="level-tab" :class="{ on: tier === 'advanced' }" @click="tier = 'advanced'">🚀 进阶版（G5 原理探究）</button>
        <button
          v-if="block.answer.parent"
          class="level-tab parent-tab"
          :class="{ on: tier === 'parent' }"
          @click="tier = 'parent'"
        >
          👨‍👩‍👧 家长深度解读版
        </button>
      </div>
      <div class="a-text"><RichText :text="answerText" /></div>
      <p v-if="tier === 'basic'" class="hint">💡 点击「进阶版」可看科学公式与微观机制；家长伴学可点「家长深度解读版」获取最全面剖析与讲解思路！</p>

      <a
        v-if="tier !== 'basic'"
        :href="qaBridge.url"
        target="_blank"
        rel="noopener noreferrer"
        class="qa-bridge-capsule"
      >
        <div class="capsule-left">
          <span class="bridge-tag">{{ qaBridge.badge }}</span>
          <span class="bridge-desc">{{ qaBridge.title }}</span>
        </div>
        <span class="bridge-action">前往亲手实操 ➔</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.qa {
  border-left: 6px solid var(--brand);
  transition: border-color 0.2s ease;
}

.qa.is-parent {
  border-left-color: #334155;
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

.answer.parent-box {
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
}

.level-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.level-tab {
  padding: 6px 13px;
  border-radius: 999px;
  background: #f0e8db;
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.level-tab.on {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.level-tab.parent-tab {
  background: #e2e8f0;
  color: #334155;
}

.level-tab.parent-tab.on {
  background: #1e293b;
  color: #fff;
}

.a-text {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.72;
  white-space: pre-line;
}

.answer.parent-box .a-text {
  font-size: 14.8px;
  color: #1e293b;
}

.hint {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--ink-faint);
}

.qa-bridge-capsule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  padding: 10px 14px;
  background: #fff;
  border: 1.5px solid #e0d5c5;
  border-left: 4px solid var(--brand-deep);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.qa-bridge-capsule:hover {
  border-color: var(--brand);
  background: var(--brand-soft);
  transform: translateX(2px);
  box-shadow: 0 4px 12px rgba(239, 108, 26, 0.12);
}

.capsule-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.bridge-tag {
  font-size: 11px;
  font-weight: 800;
  color: var(--brand-deep);
}

.bridge-desc {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bridge-action {
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .qa-bridge-capsule {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  .bridge-action {
    align-self: flex-end;
  }
}
</style>
