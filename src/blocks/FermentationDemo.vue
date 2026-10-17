<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * 发酵模拟器：两阶段连续体验。
 * ① 酿酒吧：调温度/糖量/时间 → 酵母菌产气（气球鼓起）+ 酒精累积
 * ② 变醋吧：继承①产出的酒精，敞口 vs 密封 → 醋酸菌是否工作
 * 所有数值为教学演示用的简化模型，非真实配方。
 */
defineProps<{ block?: { title?: string; instruction?: string } }>()

const stage = ref<'wine' | 'vinegar'>('wine')
const temp = ref(30)
const sugar = ref(5)
const hours1 = ref(24)
const hours2 = ref(24)
const sealed = ref(false)

// ---------- 简化模型 ----------
const dead = computed(() => temp.value > 50)

const yeastActivity = computed(() => {
  const t = temp.value
  if (t < 5) return 0
  if (t <= 30) return (t - 5) / 25
  if (t <= 40) return 1 - (t - 30) * 0.04
  if (t <= 50) return 0.6 - (t - 40) * 0.06
  return 0
})

const sugarFactor = computed(() => (sugar.value <= 0 ? 0 : 0.35 + 0.065 * Math.min(sugar.value, 10)))

const gasRate = computed(() => (dead.value ? 0 : Math.min(1, yeastActivity.value * sugarFactor.value)))

const alcohol = computed(() => Math.min(sugar.value * 0.9, gasRate.value * hours1.value * 0.12))

const balloonScale = computed(() => 0.45 + Math.min(1.35, (gasRate.value * hours1.value / 72) * 1.6))

const coldSleep = computed(() => temp.value < 5)

const aceticTempFactor = computed(() => {
  const t = temp.value
  if (t < 10 || t > 50) return 0
  if (t >= 20 && t <= 42) return 1
  return 0.5
})

const vinegar = computed(() => {
  if (sealed.value || alcohol.value <= 0) return 0
  return Math.min(alcohol.value, hours2.value * 0.09 * aceticTempFactor.value)
})

// ---------- 视觉 ----------
const bubbleCount = computed(() => (stage.value === 'wine' ? Math.round(gasRate.value * 7) : 0))

const workers = computed(() => {
  if (stage.value === 'wine') {
    if (dead.value || gasRate.value === 0) return 0
    return Math.max(1, Math.round(gasRate.value * 5))
  }
  if (sealed.value || alcohol.value <= 0 || aceticTempFactor.value === 0) return 0
  return 3
})

const filmOpacity = computed(() => (stage.value === 'vinegar' && vinegar.value > 0.2 ? Math.min(0.95, vinegar.value / 1.5) : 0))

const wineColor = computed(() => (stage.value === 'vinegar' ? '#e3bd5c' : '#f6d98a'))

// ---------- 文案 ----------
const message = computed(() => {
  if (stage.value === 'wine') {
    if (dead.value) return '😵 哎呀，太烫了（>50°C）！酵母菌酶变性失活被烫死了，快降温！'
    if (coldSleep.value) return '❄️ 太冷了（<5°C），小工人在休眠。快把它们挪到温暖处～'
    if (sugarFactor.value === 0) return '🍬 糖量为 0，小工人没饭吃！加点糖（想想：米饭的糖从哪来？）'
    const r = gasRate.value
    if (r < 0.3) return '🐌 偶尔冒个小泡，小工人们慢吞吞的。'
    if (r < 0.7) return '😊 咕嘟咕嘟～小工人们干劲不错，正在大量产气！'
    return '🔥 哇！气球鼓得圆溜溜的，酵母菌大军在 30°C 黄金温度下热火朝天！'
  }
  if (alcohol.value <= 0) return '🤔 坛子里还没有酒精！先回「酿酒吧」做出酒精，醋酸菌才有口粮。'
  if (sealed.value) return '🛑 密封状态：缺氧！醋酸菌罢工了。（科学铁律：酿醋必须敞口富氧！）'
  if (aceticTempFactor.value === 0) return '🥶 这个温度偏离适宜区，醋酸菌氧化酶活力很低。'
  if (vinegar.value >= alcohol.value - 0.01) return '🎉 酒精已充分氧化！一坛酸香扑鼻的老陈醋出炉～'
  return '✨ 敞口通风中：酸味逐渐加浓，液面白色醋酸菌膜正在蔓延开工！'
})

const gasLabel = computed(() => {
  const r = gasRate.value
  if (dead.value) return '停止 ❌'
  if (r === 0) return '静悄悄 💤'
  if (r < 0.3) return '偶尔冒泡 🫧'
  if (r < 0.7) return '咕嘟咕嘟 🫧🫧'
  return '咕嘟咕嘟咕嘟 🚀'
})

const oxygenLabel = computed(() => (sealed.value ? '被密封缺氧 🛑' : '空气流通富氧 💨'))

const workerEmojis = computed(() => (stage.value === 'wine' ? '🍄' : '🦠'))
</script>

<template>
  <section class="card demo">
    <h2 class="heading">🧪 发酵模拟器：亲手「酿」一次</h2>
    <p class="sub">滑动调节或点击快捷档位：两个阶段是接力赛，先把糖酿成酒，再把酒变成醋！</p>

    <!-- 阶段切换 -->
    <div class="stages">
      <button class="stage-tab" :class="{ on: stage === 'wine' }" @click="stage = 'wine'">
        ① 酿酒吧 🍶 <small>酵母菌吃糖产酒</small>
      </button>
      <button class="stage-tab" :class="{ on: stage === 'vinegar' }" @click="stage = 'vinegar'">
        ② 变醋吧 🧴 <small>醋酸菌好氧接班</small>
      </button>
    </div>

    <div class="scene-wrap">
      <svg viewBox="0 0 220 250" class="scene" role="img" :aria-label="message">
        <!-- 气球（缩放以瓶口为锚点） -->
        <g :transform="`translate(${110 * (1 - balloonScale)}, ${96 * (1 - balloonScale)}) scale(${balloonScale})`" class="balloon">
          <path d="M110 30 C 84 30 74 52 78 72 C 81 88 96 96 110 96 C 124 96 139 88 142 72 C 146 52 136 30 110 30 Z" fill="#ff8a9b" opacity="0.92" />
          <ellipse cx="98" cy="50" rx="7" ry="11" fill="#ffc2cc" opacity="0.8" transform="rotate(-24 98 50)" />
          <path d="M104 95 L116 95 L112 102 L108 102 Z" fill="#e05a72" />
        </g>
        <!-- 瓶口木塞 -->
        <rect x="98" y="96" width="24" height="10" rx="3" fill="#8a5230" />
        <!-- 瓶身 -->
        <path d="M78 106 L142 106 L150 128 L150 222 Q150 236 134 236 L86 236 Q70 236 70 222 L70 128 Z" fill="#dfeefc" opacity="0.9" />
        <!-- 液体 -->
        <path d="M74 150 L146 150 L146 222 Q146 232 134 232 L86 232 Q74 232 74 222 Z" :fill="wineColor" />
        <ellipse cx="110" cy="150" rx="36" ry="7" :fill="wineColor" style="filter: brightness(1.12)" />
        <!-- 醋酸菌白膜 -->
        <ellipse v-if="filmOpacity > 0" cx="110" cy="149" rx="30" ry="5" fill="#fdfdf5" :opacity="filmOpacity" />
        <!-- 气泡 -->
        <circle
          v-for="n in bubbleCount"
          :key="n"
          :cx="88 + ((n * 13) % 44)"
          :cy="210 - ((n * 17) % 40)"
          :r="2.5 + (n % 3)"
          fill="#fff"
          opacity="0.85"
          class="bub"
          :style="{ animationDuration: `${1.4 + (n % 4) * 0.35}s`, animationDelay: `${n * 0.22}s` }"
        />
        <!-- 桌面 -->
        <rect x="40" y="236" width="140" height="6" rx="3" fill="#e8d9c4" />
      </svg>

      <!-- 漂浮的小工人 -->
      <div class="workers" aria-hidden="true">
        <span
          v-for="n in workers"
          :key="n"
          class="worker"
          :style="{ left: `${12 + n * 16}%`, animationDelay: `${n * 0.5}s`, animationDuration: `${2.2 + (n % 3) * 0.5}s` }"
        >{{ workerEmojis }}</span>
      </div>

      <div class="readouts">
        <template v-if="stage === 'wine'">
          <span class="readout" :class="{ bad: dead || coldSleep }">🌡️ 温度 {{ temp }}°C</span>
          <span class="readout">🫧 产气速率：{{ gasLabel }}</span>
          <span class="readout" :class="{ ok: alcohol > 0.1 }">🍶 酒精积累 {{ alcohol.toFixed(1) }}°</span>
        </template>
        <template v-else>
          <span class="readout" :class="{ bad: sealed }">💨 环境氧气：{{ oxygenLabel }}</span>
          <span class="readout">🍶 剩余酒精 {{ Math.max(0, alcohol - vinegar).toFixed(1) }}°</span>
          <span class="readout" :class="{ ok: vinegar > 0.1 }">🧴 醋酸转化 {{ vinegar.toFixed(1) }}°</span>
        </template>
      </div>

      <p class="message" :class="{ warn: dead || sealed && stage === 'vinegar' }">{{ message }}</p>
    </div>

    <!-- 控制面板 -->
    <div class="controls">
      <!-- 温度控制 -->
      <div class="ctrl">
        <div class="ctrl-header">
          <span class="ctrl-name">🌡️ 探究自变量：发酵温度 <em>{{ temp }}°C</em></span>
          <span class="ctrl-hint">黄金适宜区 25~35°C</span>
        </div>
        <div class="slider-row">
          <button type="button" class="step-btn" title="降低 1°C" @click="temp = Math.max(0, temp - 1)">−</button>
          <input v-model.number="temp" type="range" min="0" max="60" step="1" aria-label="温度调节" />
          <button type="button" class="step-btn" title="升高 1°C" @click="temp = Math.min(60, temp + 1)">+</button>
        </div>
        <div class="preset-row">
          <button type="button" class="preset-chip" :class="{ active: temp === 0 }" @click="temp = 0">❄️ 0°C 冬眠</button>
          <button type="button" class="preset-chip" :class="{ active: temp === 20 }" @click="temp = 20">🌱 20°C 常温</button>
          <button type="button" class="preset-chip" :class="{ active: temp === 30 }" @click="temp = 30">✨ 30°C 黄金适宜</button>
          <button type="button" class="preset-chip" :class="{ active: temp === 55 }" @click="temp = 55">🔥 55°C 烫死失活</button>
        </div>
      </div>

      <!-- 糖量控制（阶段 1） -->
      <div v-if="stage === 'wine'" class="ctrl">
        <div class="ctrl-header">
          <span class="ctrl-name">🍬 培养碳源：加糖量 <em>{{ sugar }} 勺</em></span>
          <span class="ctrl-hint">糖是小工人的能量基质</span>
        </div>
        <div class="slider-row">
          <button type="button" class="step-btn" title="减少 1 勺" @click="sugar = Math.max(0, sugar - 1)">−</button>
          <input v-model.number="sugar" type="range" min="0" max="10" step="1" aria-label="糖量调节" />
          <button type="button" class="step-btn" title="增加 1 勺" @click="sugar = Math.min(10, sugar + 1)">+</button>
        </div>
        <div class="preset-row">
          <button type="button" class="preset-chip" :class="{ active: sugar === 0 }" @click="sugar = 0">0 勺 没饭吃</button>
          <button type="button" class="preset-chip" :class="{ active: sugar === 3 }" @click="sugar = 3">3 勺 少量</button>
          <button type="button" class="preset-chip" :class="{ active: sugar === 5 }" @click="sugar = 5">5 勺 适量</button>
          <button type="button" class="preset-chip" :class="{ active: sugar === 10 }" @click="sugar = 10">10 勺 甜度爆棚</button>
        </div>
      </div>

      <!-- 发酵时长（阶段 1） -->
      <div v-if="stage === 'wine'" class="ctrl">
        <div class="ctrl-header">
          <span class="ctrl-name">⏰ 发酵时间 <em>{{ hours1 }} 小时</em></span>
          <span class="ctrl-hint">时间累积酒精与气球膨胀</span>
        </div>
        <div class="slider-row">
          <button type="button" class="step-btn" title="减少 6 小时" @click="hours1 = Math.max(0, hours1 - 6)">−</button>
          <input v-model.number="hours1" type="range" min="0" max="72" step="1" aria-label="发酵时间调节" />
          <button type="button" class="step-btn" title="增加 6 小时" @click="hours1 = Math.min(72, hours1 + 6)">+</button>
        </div>
        <div class="preset-row">
          <button type="button" class="preset-chip" :class="{ active: hours1 === 12 }" @click="hours1 = 12">12h 初步起泡</button>
          <button type="button" class="preset-chip" :class="{ active: hours1 === 24 }" @click="hours1 = 24">24h 产气高峰</button>
          <button type="button" class="preset-chip" :class="{ active: hours1 === 48 }" @click="hours1 = 48">48h 酒度成熟</button>
          <button type="button" class="preset-chip" :class="{ active: hours1 === 72 }" @click="hours1 = 72">72h 充分发酵</button>
        </div>
      </div>

      <!-- 醋化时长（阶段 2） -->
      <div v-if="stage === 'vinegar'" class="ctrl">
        <div class="ctrl-header">
          <span class="ctrl-name">⏰ 醋化时间 <em>{{ hours2 }} 小时</em></span>
          <span class="ctrl-hint">继承阶段①产出的 {{ alcohol.toFixed(1) }}° 酒精口粮</span>
        </div>
        <div class="slider-row">
          <button type="button" class="step-btn" title="减少 6 小时" @click="hours2 = Math.max(0, hours2 - 6)">−</button>
          <input v-model.number="hours2" type="range" min="0" max="72" step="1" aria-label="醋化时间调节" />
          <button type="button" class="step-btn" title="增加 6 小时" @click="hours2 = Math.min(72, hours2 + 6)">+</button>
        </div>
        <div class="preset-row">
          <button type="button" class="preset-chip" :class="{ active: hours2 === 12 }" @click="hours2 = 12">12h 微酸起膜</button>
          <button type="button" class="preset-chip" :class="{ active: hours2 === 24 }" @click="hours2 = 24">24h 菌膜增厚</button>
          <button type="button" class="preset-chip" :class="{ active: hours2 === 48 }" @click="hours2 = 48">48h 酸味浓烈</button>
          <button type="button" class="preset-chip" :class="{ active: hours2 === 72 }" @click="hours2 = 72">72h 彻底陈化</button>
        </div>
      </div>

      <!-- 坛口开关（阶段 2） -->
      <div v-if="stage === 'vinegar'" class="seal-section">
        <div class="ctrl-header">
          <span class="ctrl-name">🏺 核心自变量：坛口氧气状态</span>
          <span class="ctrl-hint">好氧 vs 厌氧分界点</span>
        </div>
        <div class="seal-toggle">
          <button type="button" class="seal-btn" :class="{ on: !sealed }" @click="sealed = false">
            🍃 敞口通气（富氧，醋酸菌开工）
          </button>
          <button type="button" class="seal-btn" :class="{ on: sealed }" @click="sealed = true">
            🛑 严密加盖（缺氧，醋酸菌罢工）
          </button>
        </div>
      </div>
    </div>

    <div class="tips">
      <strong>🔬 科学对照探究：</strong>
      ① 点击「🔥 55°C」看看气球为什么立刻瘪掉？② 把糖量减到 0，观察没有原料时会产酒吗？③ 切到「变醋吧」，在有酒精的前提下，点击「🛑 严密加盖」，观察醋酸菌读数是否立刻停止变化？体验「酿酒密封、酿醋敞口」的生化本质！
    </div>
  </section>
</template>

<style scoped>
.demo {
  padding: 26px 28px;
  background: linear-gradient(160deg, #fff 0%, #fff4e4 100%);
  user-select: none;
}

.heading {
  font-size: 21px;
}

.sub {
  color: var(--ink-soft);
  font-size: 14.5px;
  margin: 6px 0 16px;
}

.stages {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

.stage-tab {
  min-height: 56px;
  padding: 12px 10px;
  border-radius: 14px;
  border: 2px solid var(--line);
  background: #fff;
  font-weight: 800;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: manipulation;
  transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.stage-tab small {
  font-weight: 600;
  font-size: 11.5px;
  color: var(--ink-faint);
}

.stage-tab:active {
  transform: scale(0.98);
}

.stage-tab.on {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-deep);
  box-shadow: 0 4px 14px rgba(239, 108, 26, 0.12);
}

.stage-tab.on small {
  color: var(--brand-deep);
}

.scene-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scene {
  width: 200px;
  height: auto;
}

.balloon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bub {
  animation-name: rise;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
}

@keyframes rise {
  0% { transform: translateY(0); opacity: 0.9; }
  100% { transform: translateY(-55px); opacity: 0; }
}

.workers {
  position: relative;
  width: 200px;
  height: 0;
}

.worker {
  position: absolute;
  top: -170px;
  font-size: 22px;
  animation: floaty ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

@keyframes floaty {
  0%, 100% { transform: translateY(0) rotate(-8deg); }
  50% { transform: translateY(-10px) rotate(8deg); }
}

.readouts {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 14px;
}

.readout {
  padding: 6px 13px;
  border-radius: 999px;
  background: #fff;
  border: 2px solid var(--line);
  font-weight: 700;
  font-size: 13.5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.readout.ok {
  border-color: #bfe6cc;
  background: var(--ok-soft);
  color: var(--ok);
}

.readout.bad {
  border-color: #f3c1c3;
  background: var(--danger-soft);
  color: var(--danger);
}

.message {
  margin: 14px 0 0;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  background: #fff;
  border-radius: 14px;
  padding: 11px 18px;
  box-shadow: var(--shadow);
  max-width: 520px;
  line-height: 1.5;
  border: 1px solid var(--line);
}

.message.warn {
  background: var(--danger-soft);
  border-color: #f6c8c9;
  color: var(--danger);
}

.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: var(--shadow);
}

.ctrl {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ctrl-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
}

.ctrl-name {
  font-weight: 700;
  font-size: 14.5px;
  color: var(--ink);
}

.ctrl-name em {
  font-style: normal;
  color: var(--brand-deep);
  font-weight: 800;
}

.ctrl-hint {
  font-size: 12.5px;
  color: var(--ink-faint);
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
  touch-action: pan-y;
}

.step-btn {
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  border-radius: 50%;
  border: 2px solid var(--line);
  background: #faf6f0;
  color: var(--ink);
  font-size: 20px;
  font-weight: 800;
  display: grid;
  place-items: center;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: transform 0.1s, background 0.15s, border-color 0.15s;
}

.step-btn:hover {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.step-btn:active {
  transform: scale(0.92);
  background: var(--brand);
  color: #fff;
}

.ctrl input[type='range'] {
  flex: 1;
  width: 100%;
  accent-color: var(--brand);
  height: 30px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  touch-action: pan-y;
}

.ctrl input[type='range']::-webkit-slider-thumb {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--brand);
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
  cursor: grab;
}

.ctrl input[type='range']::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.15);
}

.ctrl input[type='range']::-moz-range-thumb {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--brand);
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
  cursor: grab;
}

.preset-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.preset-chip {
  padding: 5px 11px;
  border-radius: 999px;
  background: #f7efe4;
  border: 1px solid transparent;
  color: var(--ink-soft);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: all 0.15s ease;
}

.preset-chip:hover {
  background: #ede1d3;
  color: var(--ink);
}

.preset-chip:active {
  transform: scale(0.95);
}

.preset-chip.active {
  background: var(--brand-soft);
  border-color: var(--brand);
  color: var(--brand-deep);
  font-weight: 800;
}

.seal-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.seal-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.seal-btn {
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 2px solid var(--line);
  background: #faf6f0;
  font-weight: 700;
  font-size: 13.5px;
  color: var(--ink-soft);
  cursor: pointer;
  touch-action: manipulation;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.seal-btn:active {
  transform: scale(0.98);
}

.seal-btn.on {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-deep);
  box-shadow: 0 2px 8px rgba(239, 108, 26, 0.12);
}

.tips {
  margin-top: 16px;
  font-size: 13.5px;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.82);
  border-radius: 14px;
  padding: 12px 16px;
  line-height: 1.7;
  border: 1px dashed var(--line);
}

@media (max-width: 560px) {
  .demo {
    padding: 20px 14px;
  }
  .scene {
    width: 170px;
  }
  .seal-toggle {
    grid-template-columns: 1fr;
  }
  .ctrl-header {
    flex-direction: column;
    gap: 2px;
  }
}
</style>
