<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  block: { title?: string; instruction?: string }
  issueId?: string
}>()

const hours = ref(6)
const scaleLevel = ref(2) // 0=洁净无尿垢, 1=轻度尿垢, 2=厚重尿垢
const ventilation = ref<'closed' | 'window' | 'fan'>('closed')
const acidNeutralized = ref(false)

const nh3Index = computed(() => {
  if (acidNeutralized.value) return 8
  const timeFactor = Math.min(1, hours.value / 12)
  const scaleFactor = [0.25, 0.7, 1.15][scaleLevel.value] ?? 0.7
  const ventFactor = ventilation.value === 'closed' ? 1.15 : ventilation.value === 'window' ? 0.6 : 0.25
  return Math.min(100, Math.round(12 + 88 * timeFactor * scaleFactor * ventFactor))
})

const reachMeters = computed(() => {
  if (acidNeutralized.value) return 1
  return Math.max(2, Math.round((nh3Index.value / 100) * 35))
})

const statusInfo = computed(() => {
  if (acidNeutralized.value) {
    return {
      level: 'ok',
      badge: '✅ 酸碱中和生效（NH₃ + H⁺ → NH₄⁺）',
      text: '酸性清洁剂（如柠檬酸）把会乱飞的碱性氨气锁成了不挥发的铵盐，同时溶解了藏菌尿垢，刺鼻味迅速消散！',
    }
  }
  if (nh3Index.value >= 65) {
    return {
      level: 'danger',
      badge: `🚨 浓烈刺鼻！臭味可飘散约 ${reachMeters.value} 米`,
      text: '细菌脲酶正在疯狂把无味尿素剪成氨气（NH₃）。氨气比空气轻（17 vs 29），正向上飘出窗外并顺走廊远扬！',
    }
  }
  if (nh3Index.value >= 30) {
    return {
      level: 'warn',
      badge: `🟡 中等气味，扩散距离约 ${reachMeters.value} 米`,
      text: '氨气持续从尿垢与潮湿地砖水膜中慢释出来。开窗加强对流或彻底清除尿垢能大幅降低浓度。',
    }
  }
  return {
    level: 'ok',
    badge: `🟢 空气清新，影响范围仅 ${reachMeters.value} 米内`,
    text: '新鲜尿液本身几乎无氨味，及时冲水 + 无尿垢 + 强排风让细菌没机会大量制造氨气！',
  }
})

const particleCount = computed(() => Math.max(2, Math.round((nh3Index.value / 100) * 14)))

function applyAcidClean() {
  acidNeutralized.value = true
  scaleLevel.value = 0
}

function resetDirty() {
  acidNeutralized.value = false
  hours.value = 8
  scaleLevel.value = 2
  ventilation.value = 'closed'
}
</script>

<template>
  <section class="card nh3-demo">
    <div class="demo-head">
      <span class="demo-tag">👃 互动气味追踪实验室</span>
      <h3 class="demo-title">{{ block.title || '厕所氨气生成与走廊扩散模拟器' }}</h3>
      <p v-if="block.instruction" class="demo-inst">{{ block.instruction }}</p>
    </div>

    <!-- 动态剖面图 -->
    <div class="scene-box">
      <svg viewBox="0 0 560 205" class="scene-svg" aria-label="尿素水解生成氨气并向走廊扩散示意图">
        <!-- 背景：左厕所，右走廊 -->
        <rect x="8" y="12" width="210" height="176" rx="12" fill="#fef3c7" stroke="#e5d5c3" stroke-width="2" />
        <rect x="224" y="12" width="328" height="176" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />

        <!-- 标题 -->
        <text x="113" y="32" text-anchor="middle" font-size="12.5" fill="#92400e" font-weight="800">🚽 厕所内部（气味源头）</text>
        <text x="388" y="32" text-anchor="middle" font-size="12.5" fill="#334155" font-weight="800">🏫 教学楼走廊（扩散与对流区）</text>

        <!-- 门洞通路 -->
        <rect x="212" y="54" width="18" height="96" fill="#fffbeb" />
        <text x="221" y="166" text-anchor="middle" font-size="10" fill="#64748b">门窗缝</text>

        <!-- 便池与尿垢 -->
        <rect x="34" y="126" width="106" height="46" rx="10" fill="#fff" stroke="#94a3b8" stroke-width="2" />
        <ellipse
          cx="87"
          cy="148"
          rx="36"
          ry="11"
          :fill="scaleLevel === 2 ? '#d97706' : scaleLevel === 1 ? '#fbbf24' : '#bae6fd'"
          opacity="0.75"
        />
        <text x="87" y="152" text-anchor="middle" font-size="10.5" fill="#451a03" font-weight="800">
          {{ scaleLevel === 2 ? '厚尿垢 + 产氨细菌' : scaleLevel === 1 ? '少量尿垢' : '洁净无垢' }}
        </text>

        <!-- 化学反应气泡 -->
        <rect x="24" y="44" width="178" height="36" rx="8" fill="rgba(255,255,255,0.9)" stroke="#fed7aa" />
        <text x="113" y="59" text-anchor="middle" font-size="10.5" fill="#9a3412" font-weight="800">
          {{ acidNeutralized ? 'NH₃ + H⁺ → NH₄⁺（锁死无味）' : '尿素 + 水 —(细菌脲酶)→ 2NH₃↑ + CO₂↑' }}
        </text>
        <text x="113" y="73" text-anchor="middle" font-size="10" fill="#78350f">
          氨气分子量 17 ＜ 空气平均 29（更轻上浮！）
        </text>

        <!-- 飘散的 NH3 分子 -->
        <g v-for="i in particleCount" :key="i">
          <circle
            :cx="95 + ((i * 33) % Math.max(40, reachMeters * 12))"
            :cy="118 - ((i * 19) % 62)"
            r="6.5"
            :fill="acidNeutralized ? '#38bdf8' : '#84cc16'"
            opacity="0.82"
            class="float-mol"
          />
          <text
            :x="95 + ((i * 33) % Math.max(40, reachMeters * 12))"
            :y="121 - ((i * 19) % 62)"
            text-anchor="middle"
            font-size="7"
            fill="#14532d"
            font-weight="800"
          >
            {{ acidNeutralized ? 'NH₄⁺' : 'NH₃' }}
          </text>
        </g>

        <!-- 距离标尺 -->
        <line x1="238" y1="168" x2="536" y2="168" stroke="#94a3b8" stroke-width="2" />
        <text x="245" y="182" font-size="10.5" fill="#475569">5m</text>
        <text x="365" y="182" font-size="10.5" fill="#475569">15m</text>
        <text x="498" y="182" font-size="10.5" fill="#475569">30m+</text>

        <!-- 走廊尽头小同学 -->
        <text x="516" y="132" font-size="28">{{ nh3Index >= 65 ? '🤢' : nh3Index >= 30 ? '😣' : '😄' }}</text>
        <text x="526" y="152" text-anchor="middle" font-size="10" fill="#334155" font-weight="700">走廊同学</text>
      </svg>
    </div>

    <!-- 控制面板 -->
    <div class="controls-grid">
      <div class="ctrl-card">
        <div class="ctrl-top">
          <span>⏱️ 尿液残留时间</span>
          <strong>{{ hours }} 小时</strong>
        </div>
        <input v-model.number="hours" type="range" min="0" max="24" step="1" @input="acidNeutralized = false" />
        <small>0 小时刚排出几乎无氨味；放越久，细菌脲酶分解越多！</small>
      </div>

      <div class="ctrl-card">
        <div class="ctrl-top">
          <span>🧱 瓷砖与便池尿垢</span>
          <strong>{{ ['无尿垢', '轻度尿垢', '厚重尿垢'][scaleLevel] }}</strong>
        </div>
        <div class="pill-row">
          <button
            v-for="(lbl, idx) in ['洁净', '轻度', '厚重']"
            :key="lbl"
            type="button"
            class="mini-btn"
            :class="{ active: scaleLevel === idx && !acidNeutralized }"
            @click="scaleLevel = idx; acidNeutralized = false"
          >
            {{ lbl }}
          </button>
        </div>
      </div>

      <div class="ctrl-card">
        <div class="ctrl-top">
          <span>💨 厕所通风换气</span>
          <strong>{{ ventilation === 'closed' ? '闷热紧闭' : ventilation === 'window' ? '开窗对流' : '强力排风' }}</strong>
        </div>
        <div class="pill-row">
          <button
            type="button"
            class="mini-btn"
            :class="{ active: ventilation === 'closed' }"
            @click="ventilation = 'closed'"
          >紧闭</button>
          <button
            type="button"
            class="mini-btn"
            :class="{ active: ventilation === 'window' }"
            @click="ventilation = 'window'"
          >开窗</button>
          <button
            type="button"
            class="mini-btn"
            :class="{ active: ventilation === 'fan' }"
            @click="ventilation = 'fan'"
          >排风扇</button>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="action-bar">
      <button type="button" class="btn btn-sm" @click="applyAcidClean">🍋 一键柠檬酸中和除臭</button>
      <button type="button" class="btn btn-ghost btn-sm" @click="resetDirty">🔄 还原闷热久未清洁状态</button>
    </div>

    <!-- 状态仪表 -->
    <div class="meter-box" :class="`lvl-${statusInfo.level}`">
      <div class="meter-head">
        <span class="meter-badge">{{ statusInfo.badge }}</span>
        <span class="meter-num">氨气指数：{{ nh3Index }} / 100</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: `${nh3Index}%` }" />
      </div>
      <p class="meter-text">{{ statusInfo.text }}</p>
    </div>
  </section>
</template>

<style scoped>
.nh3-demo {
  border: 2px solid var(--brand-soft);
  background: linear-gradient(180deg, #fff 0%, #fffcf7 100%);
}

.demo-head {
  margin-bottom: 12px;
}

.demo-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.demo-title {
  font-size: 19px;
  color: var(--ink);
}

.demo-inst {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 4px 0 0;
}

.scene-box {
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  padding: 8px;
  margin-bottom: 14px;
}

.scene-svg {
  width: 100%;
  height: auto;
  display: block;
}

.float-mol {
  animation: drift 2.6s ease-in-out infinite alternate;
}

@keyframes drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(6px, -6px); }
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.ctrl-card {
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ctrl-top {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: var(--ink);
}

.ctrl-card input[type='range'] {
  width: 100%;
  padding: 0;
  border: none;
  accent-color: var(--brand-deep);
}

.ctrl-card small {
  font-size: 11px;
  color: var(--ink-soft);
  line-height: 1.4;
}

.pill-row {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.mini-btn {
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #f5efe6;
  border: 1.5px solid var(--line);
  color: var(--ink);
}

.mini-btn.active {
  background: var(--brand-soft);
  border-color: var(--brand-deep);
  color: var(--brand-deep);
}

.action-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.meter-box {
  border-radius: 14px;
  padding: 12px 15px;
  border: 2px solid var(--line);
}

.lvl-ok { background: var(--ok-soft); border-color: #86efac; }
.lvl-warn { background: #fffbeb; border-color: #fcd34d; }
.lvl-danger { background: var(--danger-soft); border-color: #fca5a5; }

.meter-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.meter-badge {
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
}

.meter-num {
  font-size: 12px;
  font-weight: 800;
  color: var(--ink-soft);
}

.bar-track {
  height: 10px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 8px;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
  transition: width 0.25s ease;
}

.meter-text {
  margin: 0;
  font-size: 13.5px;
  color: var(--ink);
  line-height: 1.55;
}

@media (max-width: 720px) {
  .controls-grid {
    grid-template-columns: 1fr;
  }
}
</style>
