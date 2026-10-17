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
    if (dead.value) return '😵 哎呀，太烫了！酵母菌全被烫死了，赶紧把温度调回来。'
    if (coldSleep.value) return '❄️ 太冷了，小工人们在冬眠。把它们挪到温暖的地方吧！'
    if (sugarFactor.value === 0) return '🍬 没有糖，小工人们没饭吃。加点糖（或想想：米饭里的糖从哪来？）'
    const r = gasRate.value
    if (r < 0.3) return '🐌 偶尔冒个小泡，小工人们慢吞吞的。'
    if (r < 0.7) return '😊 咕嘟咕嘟～小工人们干劲不错！'
    return '🔥 哇！气球都快吹飞啦，酵母菌大军干得热火朝天！'
  }
  if (alcohol.value <= 0) return '🤔 坛子里还没有酒！先回「酿酒吧」做出一点酒精，醋酸菌才有饭吃。'
  if (sealed.value) return '🛑 密封状态：没有氧气，醋酸菌罢工了。（记住：酿醋要敞口！）'
  if (aceticTempFactor.value === 0) return '🥶 这个温度醋酸菌不喜欢，酸味几乎不增加。'
  if (vinegar.value >= alcohol.value - 0.01) return '🎉 酒全部变身成功！酸溜溜的老陈醋出炉～'
  return '✨ 酸味正在变浓，液面浮起一层白膜——那是醋酸菌大军在开工！'
})

const gasLabel = computed(() => {
  const r = gasRate.value
  if (dead.value) return '停止'
  if (r === 0) return '静悄悄'
  if (r < 0.3) return '偶尔冒泡'
  if (r < 0.7) return '咕嘟咕嘟'
  return '咕嘟咕嘟咕嘟！'
})

const oxygenLabel = computed(() => (sealed.value ? '被密封 🛑' : '充足 💨'))

const workerEmojis = computed(() => (stage.value === 'wine' ? '🍄' : '🦠'))
</script>

<template>
  <section class="card demo">
    <h2 class="heading">🧪 发酵模拟器：亲手「酿」一次</h2>
    <p class="sub">拖动滑块做实验：两个阶段是接力的，先把糖酿成酒，再把酒变成醋！</p>

    <!-- 阶段切换 -->
    <div class="stages">
      <button class="stage-tab" :class="{ on: stage === 'wine' }" @click="stage = 'wine'">
        ① 酿酒吧 🍶 <small>酵母菌吃糖</small>
      </button>
      <button class="stage-tab" :class="{ on: stage === 'vinegar' }" @click="stage = 'vinegar'">
        ② 变醋吧 🧴 <small>醋酸菌接班</small>
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
          <span class="readout" :class="{ bad: dead || coldSleep }">🌡️ {{ temp }}°C</span>
          <span class="readout">🫧 产气：{{ gasLabel }}</span>
          <span class="readout" :class="{ ok: alcohol > 0.1 }">🍶 酒精 {{ alcohol.toFixed(1) }}°</span>
        </template>
        <template v-else>
          <span class="readout" :class="{ bad: sealed }">💨 氧气：{{ oxygenLabel }}</span>
          <span class="readout">🍶 剩余酒精 {{ Math.max(0, alcohol - vinegar).toFixed(1) }}°</span>
          <span class="readout" :class="{ ok: vinegar > 0.1 }">🧴 醋酸 {{ vinegar.toFixed(1) }}°</span>
        </template>
      </div>

      <p class="message" :class="{ warn: dead || sealed && stage === 'vinegar' }">{{ message }}</p>
    </div>

    <!-- 控制面板 -->
    <div class="controls">
      <label class="ctrl">
        <span class="ctrl-name">🌡️ 温度 <em>{{ temp }}°C</em></span>
        <input v-model.number="temp" type="range" min="0" max="60" step="1" />
        <span class="ctrl-hint">小工人最喜欢 25~35°C</span>
      </label>

      <label v-if="stage === 'wine'" class="ctrl">
        <span class="ctrl-name">🍬 糖量 <em>{{ sugar }} 勺</em></span>
        <input v-model.number="sugar" type="range" min="0" max="10" step="1" />
        <span class="ctrl-hint">糖是小工人们的饭</span>
      </label>

      <label v-if="stage === 'wine'" class="ctrl">
        <span class="ctrl-name">⏰ 发酵时间 <em>{{ hours1 }} 小时</em></span>
        <input v-model.number="hours1" type="range" min="0" max="72" step="1" />
        <span class="ctrl-hint">时间越长，产出的酒精越多</span>
      </label>

      <label v-if="stage === 'vinegar'" class="ctrl">
        <span class="ctrl-name">⏰ 醋化时间 <em>{{ hours2 }} 小时</em></span>
        <input v-model.number="hours2" type="range" min="0" max="72" step="1" />
        <span class="ctrl-hint">继承酿酒吧做出的 {{ alcohol.toFixed(1) }}° 酒精</span>
      </label>

      <div v-if="stage === 'vinegar'" class="seal-toggle">
        <span class="ctrl-name">🏺 坛口：</span>
        <button class="seal-btn" :class="{ on: !sealed }" @click="sealed = false">敞口（透气）</button>
        <button class="seal-btn" :class="{ on: sealed }" @click="sealed = true">密封</button>
      </div>
    </div>

    <div class="tips">
      <strong>🔬 试试看：</strong>
      把温度拉到 55°C 会发生什么？把糖减到 0 呢？切到「变醋吧」，先选密封、再选敞口，读数有什么不同？
    </div>
  </section>
</template>

<style scoped>
.demo {
  padding: 26px 28px;
  background: linear-gradient(160deg, #fff 0%, #fff4e4 100%);
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
  gap: 10px;
  margin-bottom: 18px;
}

.stage-tab {
  padding: 12px 10px;
  border-radius: 14px;
  border: 2px solid var(--line);
  background: #fff;
  font-weight: 800;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  transition: all 0.15s;
}

.stage-tab small {
  font-weight: 600;
  font-size: 11.5px;
  color: var(--ink-faint);
}

.stage-tab.on {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-deep);
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
  transition: transform 0.4s ease;
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
  font-size: 21px;
  animation: floaty ease-in-out infinite;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.12));
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
  padding: 5px 12px;
  border-radius: 999px;
  background: #fff;
  border: 2px solid var(--line);
  font-weight: 700;
  font-size: 13.5px;
}

.readout.ok {
  border-color: #bfe6cc;
  color: var(--ok);
}

.readout.bad {
  border-color: #f3c1c3;
  color: var(--danger);
}

.message {
  margin: 14px 0 0;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  background: #fff;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: var(--shadow);
  max-width: 460px;
}

.message.warn {
  background: var(--danger-soft);
}

.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #fff;
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: var(--shadow);
}

.ctrl {
  display: block;
}

.ctrl-name {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14.5px;
  margin-bottom: 4px;
}

.ctrl-name em {
  font-style: normal;
  color: var(--brand-deep);
}

.ctrl input[type='range'] {
  width: 100%;
  accent-color: var(--brand);
  height: 26px;
  padding: 0;
  border: none;
  background: transparent;
}

.ctrl-hint {
  font-size: 12.5px;
  color: var(--ink-faint);
}

.seal-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.seal-btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: 2px solid var(--line);
  background: #fff;
  font-weight: 700;
  font-size: 14px;
}

.seal-btn.on {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.tips {
  margin-top: 16px;
  font-size: 13.5px;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  padding: 11px 14px;
  line-height: 1.7;
}

@media (max-width: 560px) {
  .demo {
    padding: 20px 16px;
  }
  .scene {
    width: 170px;
  }
}
</style>
