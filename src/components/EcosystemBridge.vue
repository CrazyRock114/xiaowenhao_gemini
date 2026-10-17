<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  issueId: string
}>()

const portals = [
  {
    target: 'minimax',
    name: '🏛️ IGCSE 教学主母舰',
    sub: '剑桥 0610 / 0620 / 0625 全考纲',
    desc: 'Paper 5/6 权威虚拟实验台 · 淀粉/糖/蛋白质检测 · 3D 人体解剖与 DNA 螺旋',
    url: 'https://www.igcse.xyz/practical',
    badge: '母舰硬核实操',
    color: '#0ea5e9',
  },
  {
    target: 'pre',
    name: '🌱 小学双语科学启蒙营',
    sub: 'SciencePre 平行宇宙',
    desc: '叶片阳光微观厨房 · 光合作用实验器 · 水流电梯与坚固细胞壁城堡',
    url: 'https://pre.igcse.xyz/plants/',
    badge: '低龄启蒙母体',
    color: '#10b981',
  },
  {
    target: 'sky',
    name: '🎯 G8 词汇与真题大练兵',
    sub: 'sky_science_game 攻坚岛',
    desc: '初中科学 180 核心词汇 · 6 款沉浸游戏 · 呼吸/循环微观动效与 267 真题',
    url: 'https://sky.igcse.xyz',
    badge: '微观练兵场',
    color: '#f59e0b',
  },
  {
    target: 'zperiod',
    name: '🧪 3D 周期表与微观化学',
    sub: 'zperiod 化学工坊',
    desc: '118 个元素微观 3D 电子排布 · 玻尔模型 · 碳酸氢根与水分子配平引擎',
    url: 'https://zperiod.igcse.xyz',
    badge: '化学微观工坊',
    color: '#8b5cf6',
  },
]
</script>

<template>
  <section class="card eco-bridge">
    <div class="bridge-header">
      <div class="badge-title">
        <span class="pill-badge">🚀 全域生态互通</span>
        <h3 class="eco-title">走出小问号，穿梭剑桥科学矩阵</h3>
      </div>
      <p class="eco-intro">
        在这里产生的好奇心，可以在我们的兄弟教学矩阵中亲手实验、通关大练兵！点击直接穿梭到对应实验台与挑战岛：
      </p>
    </div>

    <div class="portals-grid">
      <a
        v-for="p in portals"
        :key="p.target"
        :href="p.url"
        target="_blank"
        rel="noopener noreferrer"
        class="portal-card"
        :style="{ '--portal-color': p.color }"
      >
        <div class="p-top">
          <span class="p-badge">{{ p.badge }}</span>
          <span class="p-arrow">↗</span>
        </div>
        <h4 class="p-name">{{ p.name }}</h4>
        <div class="p-sub">{{ p.sub }}</div>
        <p class="p-desc">{{ p.desc }}</p>
        <span class="p-cta">进入探索 ➔</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.eco-bridge {
  padding: 24px 26px;
  background: linear-gradient(145deg, #ffffff 0%, #fffbf5 100%);
  border: 2px solid var(--brand-soft);
  margin-top: 24px;
}

.bridge-header {
  margin-bottom: 18px;
}

.badge-title {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.pill-badge {
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%);
  padding: 3px 10px;
  border-radius: 999px;
}

.eco-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
}

.eco-intro {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 0;
  line-height: 1.55;
}

.portals-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.portal-card {
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.portal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5px;
  background: var(--portal-color);
}

.portal-card:hover {
  transform: translateY(-3px);
  border-color: var(--portal-color);
  box-shadow: 0 8px 24px rgba(61, 50, 41, 0.12);
}

.p-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.p-badge {
  font-size: 11px;
  font-weight: 800;
  color: var(--portal-color);
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 8px;
  border-radius: 6px;
}

.p-arrow {
  font-size: 14px;
  font-weight: 800;
  color: var(--portal-color);
}

.p-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 2px;
}

.p-sub {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-soft);
  margin-bottom: 6px;
}

.p-desc {
  font-size: 12.5px;
  color: var(--ink);
  line-height: 1.5;
  margin: 0 0 10px;
  flex: 1;
}

.p-cta {
  font-size: 12px;
  font-weight: 800;
  color: var(--portal-color);
  align-self: flex-end;
}

@media (max-width: 600px) {
  .portals-grid {
    grid-template-columns: 1fr;
  }
}
</style>
