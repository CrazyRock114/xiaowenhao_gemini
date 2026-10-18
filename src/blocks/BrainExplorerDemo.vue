<script setup lang="ts">
import { ref, computed } from 'vue'
import { speakWord } from '../utils/speech'

const props = defineProps<{
  block?: any
  issueId?: string
}>()

// 模式：basic（弟弟-飞船模式） | advanced（哥哥-解剖与网络模式）
const mode = ref<'basic' | 'advanced'>('basic')

// 当前激活选中的脑区
const activeRegion = ref<string>('frontal')

// 协同网络激活状态：null 或 'language' | 'memory' | 'attention' | 'emotion'
const activeNetwork = ref<string | null>(null)

// 8 大感官选中项
const activeSense = ref<string | null>(null)

// 神经反应时间测试游戏状态
const gameState = ref<'idle' | 'waiting' | 'ready' | 'clicked' | 'early'>('idle')
const startTime = ref<number>(0)
const reactionTime = ref<number>(0)
let timerId: any = null

interface RegionInfo {
  id: string
  nameZh: string
  nameEn: string
  ipa: string
  color: string
  emoji: string
  shipRole: string
  kidsDesc: string
  scienceDesc: string
  keyStats: string
}

const regions: Record<string, RegionInfo> = {
  frontal: {
    id: 'frontal',
    nameZh: '额叶',
    nameEn: 'Frontal Lobe',
    ipa: '/ˈfrʌntl loʊb/',
    color: '#E5484D',
    emoji: '👑',
    shipRole: '飞船总舰长',
    kidsDesc: '住在你脑门正后方。当你克制住不吃零食先写作业、耐心排队，或者动脑筋想策略时，全靠总舰长发号施令！',
    scienceDesc: '前额叶皮层（PFC）主管执行功能、工作记忆与冲动抑制；后部运动带指挥全身骨骼肌随意运动，布罗卡区掌管言语组织。',
    keyStats: '人类最聪明脑区 · 20多岁才彻底发育成熟',
  },
  parietal: {
    id: 'parietal',
    nameZh: '顶叶',
    nameEn: 'Parietal Lobe',
    ipa: '/pəˈraɪətl loʊb/',
    color: '#3B82F6',
    emoji: '📡',
    shipRole: '空间感知雷达站',
    kidsDesc: '长在头顶偏后。让你闭着眼睛也能摸到鼻子、伸手能准确接住篮球，摸到热水知道缩手！',
    scienceDesc: '初级躯体感觉皮层（S1）整合触觉、冷热痛温与本体感觉；顶叶联合区（IPS）构建三维空间坐标系指导手眼抓握协调。',
    keyStats: '两点辨别觉最灵敏区在指尖与嘴唇',
  },
  occipital: {
    id: 'occipital',
    nameZh: '枕叶',
    nameEn: 'Occipital Lobe',
    ipa: '/ɑːkˈsɪpɪtl loʊb/',
    color: '#10B981',
    emoji: '🖥️',
    shipRole: '超高清动态显示屏',
    kidsDesc: '虽然眼睛在前面，但看懂世界的屏幕却在后脑勺！把眼睛收到的光线翻译成全彩 3D 动画。',
    scienceDesc: '初级视皮层（V1）抽取朝向与线条，通过腹侧流（辨识物体）与背侧流（辨识运动轨迹）完成多级视觉重构。',
    keyStats: '40~60 亿神经元组成视觉处理流水线',
  },
  temporal: {
    id: 'temporal',
    nameZh: '颞叶',
    nameEn: 'Temporal Lobe',
    ipa: '/ˈtempərəl loʊb/',
    color: '#F59E0B',
    emoji: '📻',
    shipRole: '电台通信与记忆相册',
    kidsDesc: '就在两只耳朵边。不仅听清音乐和笑声，深处的海马体小管家还帮你把开心的事存进回忆相册。',
    scienceDesc: '初级听觉皮层解析声波频率，韦尼克区理解语言语义，内侧海马体主导情景记忆编码与空间地图构建。',
    keyStats: '海马体外形像小海马 · 睡觉时整理白天记忆',
  },
  cerebellum: {
    id: 'cerebellum',
    nameZh: '小脑',
    nameEn: 'Cerebellum',
    ipa: '/ˌserəˈbeləm/',
    color: '#8B5CF6',
    emoji: '🎪',
    shipRole: '自动平衡陀螺仪',
    kidsDesc: '挂在后脑勺下方，是个不知疲倦的杂技师！学骑车、滑板练熟后的「肌肉记忆」全由它自动驾驶。',
    scienceDesc: '密集容纳约 690 亿神经元（占全脑近 80%），结合内耳前庭三轴陀螺仪信号与肌梭反馈，实时修正运动误差。',
    keyStats: '容纳 690 亿个神经元 · 航天飞机陀螺仪原型',
  },
  brainstem: {
    id: 'brainstem',
    nameZh: '脑干',
    nameEn: 'Brainstem',
    ipa: '/ˈbreɪnstəm/',
    color: '#D97706',
    emoji: '⚡',
    shipRole: '永不停歇发动机底座',
    kidsDesc: '连接身体的生命大支柱。就算你睡得再沉，它也一秒不停地指挥心脏跳动和肺部呼吸。',
    scienceDesc: '由中脑、脑桥、延髓构成，包含自主心血管中枢、呼吸节律驱动复合体与维持大脑清醒的网状激活系统。',
    keyStats: '生命中枢 · 掌管心跳、血压与自主呼吸',
  },
}

const currentRegion = computed(() => regions[activeRegion.value] || regions.frontal)

function selectRegion(id: string) {
  activeRegion.value = id
  activeNetwork.value = null
  const reg = regions[id]
  if (reg?.nameEn) {
    speakWord(reg.nameEn)
  }
}

// 协同网络定义
interface NetworkInfo {
  id: string
  nameZh: string
  emoji: string
  steps: { region: string; text: string }[]
  descBasic: string
  descAdv: string
}

const networks: Record<string, NetworkInfo> = {
  language: {
    id: 'language',
    nameZh: '🗣️ 语言流水线（听懂并回答）',
    emoji: '🗣️',
    steps: [
      { region: 'temporal', text: '1. 颞叶听觉皮层接收语音信号，韦尼克区查字典理解意思' },
      { region: 'parietal', text: '2. 顶叶中继白质纤维束（弓状束）高速传输' },
      { region: 'frontal', text: '3. 额叶布罗卡区组织词句语法，运动皮层指挥嘴唇舌头发音' },
    ],
    descBasic: '你说一句话只需要半秒钟，但耳朵、电台（颞叶）、雷达（顶叶）和舰长（额叶）已经完美开了个碰头会！',
    descAdv: '外侧裂语言环路：听觉皮层声学提取 ➔ 韦尼克区语义加工 ➔ 弓状束白质纤维 ➔ 布罗卡区言语规划 ➔ 运动皮层驱动发音。',
  },
  memory: {
    id: 'memory',
    nameZh: '🧠 记忆存取网络（记住新知识）',
    emoji: '🧠',
    steps: [
      { region: 'temporal', text: '1. 颞叶深处的海马体接收新鲜经历，打上时间地点标签（临时缓存）' },
      { region: 'frontal', text: '2. 额叶进行主动回想和工作记忆提取' },
      { region: 'occipital', text: '3. 夜间深睡时，海马体将记忆像电影一样回放，永久固化到大脑皮层' },
    ],
    descBasic: '白天海马体小管家把好玩的事情写在便签条上，晚上睡觉时再整齐贴进全脑大相册里！',
    descAdv: '突触长时程增强（LTP）首先在海马 CA3/CA1 区诱导，慢波睡眠（SWS）期间通过海马尖波波纹（SWRs）向大脑新皮层转运固化。',
  },
  attention: {
    id: 'attention',
    nameZh: '🎯 专注力与执行网络（专心致志）',
    emoji: '🎯',
    steps: [
      { region: 'frontal', text: '1. 前额叶设定目标（比如：认真做完这道科学题）' },
      { region: 'parietal', text: '2. 顶叶雷达站拉高专注度，主动把窗外的吵闹声和杂音屏蔽在外' },
    ],
    descBasic: '前额叶舰长紧盯终点线，顶叶雷达开启静音防护罩，让你像神箭手一样聚精会神！',
    descAdv: '背外侧前额叶（DLPFC）与后顶叶皮层（IPS）组成的额顶网络（FPN），执行自上而下的注意定向和抗干扰抑制。',
  },
  emotion: {
    id: 'emotion',
    nameZh: '❤️ 情绪急刹车网络（平复心情）',
    emoji: '❤️',
    steps: [
      { region: 'temporal', text: '1. 颞叶底部的杏仁核嗅到危险或挫折，瞬间拉响红色警报' },
      { region: 'frontal', text: '2. 前额叶皮层深呼吸，快速分析情况并下令：「别慌，没危险，踩刹车！」' },
      { region: 'brainstem', text: '3. 脑干减缓心跳与呼吸，身体迅速重归平静' },
    ],
    descBasic: '吓一跳时杏仁核拉响警报，但深呼吸三秒钟，额叶舰长就会走过来轻轻拍拍它：「安全啦，放松！」',
    descAdv: '边缘系统杏仁核驱动自主应激（交感激活），腹内侧前额叶（vmPFC）通过抑制性 GABA 能中间神经元下调杏仁核增益，实现情绪自控。',
  },
}

function selectNetwork(key: string) {
  if (activeNetwork.value === key) {
    activeNetwork.value = null
  } else {
    activeNetwork.value = key
    const net = networks[key]
    if (net.steps[0]) {
      activeRegion.value = net.steps[0].region
    }
  }
}

// 8 大感官
const senses = [
  { id: 'sight', name: '视觉 Sight', icon: '👁️', region: 'occipital', note: '1.25 亿视杆细胞 + 600 万视锥细胞，全彩 3D' },
  { id: 'hearing', name: '听觉 Hearing', icon: '👂', region: 'temporal', note: '耳蜗 15,500 根毛细胞，能分辨琴键音调' },
  { id: 'touch', name: '触觉 Touch', icon: '✋', region: 'parietal', note: '每平方厘米皮肤多达 200 个痛点与触觉小体' },
  { id: 'taste', name: '味觉 Taste', icon: '👅', region: 'parietal', note: '舌头约 9,000 个味蕾，分辨甜酸苦咸鲜' },
  { id: 'smell', name: '嗅觉 Smell', icon: '👃', region: 'temporal', note: '1200 万嗅觉受体细胞，直通海马体唤醒记忆' },
  { id: 'vestibular', name: '前庭平衡 Balance', icon: '🧭', region: 'cerebellum', note: '内耳三轴半规管陀螺仪，闭眼知晓加速与旋转' },
  { id: 'proprioception', name: '本体感觉 Joint', icon: '🤸', region: 'parietal', note: '肌肉与关节肌梭传感器，闭眼准确摸到鼻尖' },
  { id: 'face', name: '面部表情 Expressions', icon: '😊', region: 'frontal', note: '自动解读 6 种主要表情，镜像神经元激发共情' },
]

function selectSense(s: any) {
  activeSense.value = s.id
  activeRegion.value = s.region
  speakWord(s.name.split(' ')[1] || s.name)
}

// 反应速度游戏逻辑
function startGame() {
  gameState.value = 'waiting'
  const waitMs = Math.floor(Math.random() * 2500) + 1500
  if (timerId) clearTimeout(timerId)
  timerId = setTimeout(() => {
    gameState.value = 'ready'
    startTime.value = Date.now()
  }, waitMs)
}

function handleGameClick() {
  if (gameState.value === 'waiting') {
    clearTimeout(timerId)
    gameState.value = 'early'
  } else if (gameState.value === 'ready') {
    const elapsed = Date.now() - startTime.value
    reactionTime.value = elapsed
    gameState.value = 'clicked'
  }
}
</script>

<template>
  <div class="brain-demo card">
    <!-- 顶栏标题与角色模式切换 -->
    <div class="demo-head">
      <div class="demo-title-wrap">
        <span class="demo-badge">🚀 互动飞船中控台</span>
        <h3 class="demo-title">大脑功能分区与协同网络探秘</h3>
      </div>
      <div class="mode-switcher">
        <button
          type="button"
          class="mode-btn"
          :class="{ active: mode === 'basic' }"
          @click="mode = 'basic'"
        >
          🚀 弟弟模式 (飞船部门)
        </button>
        <button
          type="button"
          class="mode-btn"
          :class="{ active: mode === 'advanced' }"
          @click="mode = 'advanced'"
        >
          🔬 哥哥模式 (解剖网络)
        </button>
      </div>
    </div>

    <!-- 主展示区：左侧交互脑图，右侧动态详情 -->
    <div class="demo-grid">
      <!-- 左：SVG 彩色大脑示意图 -->
      <div class="brain-visual-card">
        <div class="visual-tips">
          💡 点击彩色脑区高亮探秘 · 观察神经信号流动
        </div>
        <div class="svg-container">
          <svg viewBox="0 0 500 360" class="brain-svg">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- 1. 额叶 Frontal Lobe (红/粉) -->
            <path
              id="part-frontal"
              d="M 120 220 C 80 180 80 110 130 60 C 180 20 240 20 270 45 C 290 60 280 130 250 180 C 220 230 150 240 120 220 Z"
              :class="['brain-part', { active: activeRegion === 'frontal' }]"
              fill="#E5484D"
              @click="selectRegion('frontal')"
            />
            <text x="170" y="115" class="svg-lbl">
              {{ mode === 'basic' ? '👑 额叶(总舰长)' : '额叶 (Frontal)' }}
            </text>

            <!-- 2. 顶叶 Parietal Lobe (蓝) -->
            <path
              id="part-parietal"
              d="M 270 45 C 330 35 380 65 400 110 C 420 150 390 190 350 190 C 310 190 285 140 270 45 Z"
              :class="['brain-part', { active: activeRegion === 'parietal' }]"
              fill="#3B82F6"
              @click="selectRegion('parietal')"
            />
            <text x="330" y="115" class="svg-lbl">
              {{ mode === 'basic' ? '📡 顶叶(雷达站)' : '顶叶 (Parietal)' }}
            </text>

            <!-- 3. 枕叶 Occipital Lobe (绿) -->
            <path
              id="part-occipital"
              d="M 400 110 C 440 140 450 190 430 230 C 410 260 370 250 350 220 C 360 180 380 150 400 110 Z"
              :class="['brain-part', { active: activeRegion === 'occipital' }]"
              fill="#10B981"
              @click="selectRegion('occipital')"
            />
            <text x="400" y="200" class="svg-lbl">
              {{ mode === 'basic' ? '🖥️ 枕叶' : '枕叶 (Occipital)' }}
            </text>

            <!-- 4. 颞叶 Temporal Lobe (黄) -->
            <path
              id="part-temporal"
              d="M 170 200 C 240 170 320 180 340 230 C 350 260 280 290 220 280 C 180 270 150 240 170 200 Z"
              :class="['brain-part', { active: activeRegion === 'temporal' }]"
              fill="#F59E0B"
              @click="selectRegion('temporal')"
            />
            <text x="245" y="240" class="svg-lbl">
              {{ mode === 'basic' ? '📻 颞叶(相册)' : '颞叶 (Temporal)' }}
            </text>

            <!-- 5. 小脑 Cerebellum (紫) -->
            <path
              id="part-cerebellum"
              d="M 330 260 C 380 250 430 270 430 310 C 410 350 350 350 310 320 C 310 290 320 270 330 260 Z"
              :class="['brain-part', { active: activeRegion === 'cerebellum' }]"
              fill="#8B5CF6"
              @click="selectRegion('cerebellum')"
            />
            <text x="365" y="315" class="svg-lbl">
              {{ mode === 'basic' ? '🎪 小脑' : '小脑 (Cerebellum)' }}
            </text>

            <!-- 6. 脑干 Brainstem (棕) -->
            <path
              id="part-brainstem"
              d="M 260 280 C 290 280 300 340 280 355 C 260 355 245 330 250 290 Z"
              :class="['brain-part', { active: activeRegion === 'brainstem' }]"
              fill="#D97706"
              @click="selectRegion('brainstem')"
            />
            <text x="268" y="325" class="svg-lbl" font-size="11">脑干</text>

            <!-- 内部边缘标记：海马体与杏仁核 -->
            <g class="sub-points" transform="translate(0, 0)">
              <circle cx="270" cy="225" r="9" class="pulse-dot" fill="#EC4899" />
              <text x="285" y="228" font-size="11" font-weight="bold" fill="#EC4899">
                海马体(记忆)
              </text>
            </g>

            <!-- 动态协同光流连线（如果激活了网络） -->
            <g v-if="activeNetwork" class="network-flows">
              <path
                v-if="activeNetwork === 'language'"
                d="M 245 240 Q 300 150 170 115"
                class="flow-line"
              />
              <path
                v-if="activeNetwork === 'memory'"
                d="M 270 225 Q 220 140 170 115"
                class="flow-line"
              />
              <path
                v-if="activeNetwork === 'attention'"
                d="M 170 115 L 330 115"
                class="flow-line"
              />
              <path
                v-if="activeNetwork === 'emotion'"
                d="M 260 230 L 170 115 L 268 325"
                class="flow-line"
              />
            </g>
          </svg>
        </div>

        <!-- 脑区快捷切换芯片 -->
        <div class="region-chips">
          <button
            v-for="(reg, k) in regions"
            :key="k"
            type="button"
            class="chip-btn"
            :class="{ active: activeRegion === k }"
            :style="{ '--c': reg.color }"
            @click="selectRegion(k)"
          >
            <span>{{ reg.emoji }}</span>
            <span>{{ mode === 'basic' ? reg.shipRole : reg.nameZh }}</span>
          </button>
        </div>
      </div>

      <!-- 右：当前选中脑区详情面板 -->
      <div class="brain-info-card">
        <div class="info-head">
          <span class="info-emoji" :style="{ background: currentRegion.color + '22' }">
            {{ currentRegion.emoji }}
          </span>
          <div class="info-title-group">
            <div class="info-en-row">
              <h4 class="info-en">{{ currentRegion.nameEn }}</h4>
              <button
                type="button"
                class="speak-btn"
                title="朗读发音"
                @click="speakWord(currentRegion.nameEn)"
              >
                🔊
              </button>
            </div>
            <div class="info-zh-row">
              <span class="info-zh">{{ currentRegion.nameZh }}</span>
              <span class="info-role">【{{ currentRegion.shipRole }}】</span>
              <span class="info-ipa">{{ currentRegion.ipa }}</span>
            </div>
          </div>
        </div>

        <div class="info-body">
          <div class="info-badge">
            ⚡ {{ currentRegion.keyStats }}
          </div>
          <p class="info-text">
            {{ mode === 'basic' ? currentRegion.kidsDesc : currentRegion.scienceDesc }}
          </p>
        </div>

        <!-- 四大协同功能网络触发器 -->
        <div class="network-section">
          <div class="network-title">
            <span>🌐 协同功能网络（打破单脑区孤岛）：</span>
          </div>
          <div class="network-chips">
            <button
              v-for="(net, nk) in networks"
              :key="nk"
              type="button"
              class="net-chip"
              :class="{ active: activeNetwork === nk }"
              @click="selectNetwork(nk)"
            >
              {{ net.nameZh.split('（')[0] }}
            </button>
          </div>

          <!-- 展开当前激活的网络解释 -->
          <div v-if="activeNetwork && networks[activeNetwork]" class="net-detail anim-pop">
            <h5 class="net-h5">{{ networks[activeNetwork].nameZh }}</h5>
            <p class="net-desc">
              {{ mode === 'basic' ? networks[activeNetwork].descBasic : networks[activeNetwork].descAdv }}
            </p>
            <div class="net-steps">
              <div
                v-for="(st, idx) in networks[activeNetwork].steps"
                :key="idx"
                class="step-item"
              >
                {{ st.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部功能扩展栏：8 大感官雷达 & 极速反应测试器 -->
    <div class="demo-foot">
      <!-- 8 大感官雷达 -->
      <div class="sense-radar-card">
        <h4 class="foot-title">
          <span>📡 追踪 8 大感官输入（Follow the 8 Sensory Inputs）：</span>
        </h4>
        <div class="sense-grid">
          <div
            v-for="s in senses"
            :key="s.id"
            class="sense-item"
            :class="{ active: activeSense === s.id }"
            @click="selectSense(s)"
          >
            <span class="s-icon">{{ s.icon }}</span>
            <div class="s-info">
              <strong class="s-name">{{ s.name }}</strong>
              <small class="s-note">{{ s.note }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- 极速反应时间测试小游戏 -->
      <div class="game-card">
        <h4 class="foot-title">
          <span>⚡ 神经电脉冲速度测试（你有多快？）：</span>
        </h4>
        <div
          class="game-board"
          :class="gameState"
          @click="handleGameClick"
        >
          <template v-if="gameState === 'idle'">
            <div class="game-content">
              <span class="game-icon">⏱️</span>
              <strong>点击开始测试反应时间</strong>
              <small>当屏幕从红变绿时，用最快速度点它！</small>
              <button type="button" class="game-btn" @click.stop="startGame">开始测试</button>
            </div>
          </template>

          <template v-else-if="gameState === 'waiting'">
            <div class="game-content">
              <span class="game-icon">🔴</span>
              <strong>凝神屏息……等待变绿……</strong>
              <small>千万别手抖提前按哦！</small>
            </div>
          </template>

          <template v-else-if="gameState === 'ready'">
            <div class="game-content">
              <span class="game-icon">🟢</span>
              <strong class="hit-now">就是现在！快点！！！</strong>
            </div>
          </template>

          <template v-else-if="gameState === 'clicked'">
            <div class="game-content">
              <span class="game-icon">🎉</span>
              <strong>耗时：{{ reactionTime }} 毫秒 (ms)！</strong>
              <small>
                光线到达视网膜 ➔ 枕叶 ➔ 额叶 ➔ 脊髓 ➔ 指尖肌肉，一路狂奔完成！
              </small>
              <button type="button" class="game-btn" @click.stop="startGame">再测一次</button>
            </div>
          </template>

          <template v-else-if="gameState === 'early'">
            <div class="game-content">
              <span class="game-icon">⚠️</span>
              <strong>哎呀！按早了，还没变绿呢！</strong>
              <small>前额叶总舰长要学会先踩住刹车哦~</small>
              <button type="button" class="game-btn" @click.stop="startGame">重新开始</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brain-demo {
  background: linear-gradient(175deg, #ffffff 0%, #faf6f0 100%);
  border: 2px solid var(--line);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 36px rgba(61, 50, 41, 0.08);
}

.demo-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.demo-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.demo-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--ink);
  margin: 0;
}

.mode-switcher {
  display: inline-flex;
  background: #ede6dc;
  padding: 4px;
  border-radius: 999px;
  gap: 4px;
}

.mode-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink-soft);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn.active {
  background: #ffffff;
  color: var(--brand-deep);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 20px;
}

@media (max-width: 860px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.brain-visual-card {
  background: #fdfaf6;
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.visual-tips {
  font-size: 12px;
  color: var(--ink-faint);
  margin-bottom: 8px;
}

.svg-container {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 500 / 360;
}

.brain-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.brain-part {
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.88;
  stroke: #ffffff;
  stroke-width: 2.5;
}

.brain-part:hover {
  opacity: 1;
  filter: url(#glow);
  transform-origin: center;
}

.brain-part.active {
  opacity: 1;
  stroke: #ffffff;
  stroke-width: 4;
  filter: drop-shadow(0 0 10px rgba(239, 108, 26, 0.7));
}

.svg-lbl {
  font-size: 12.5px;
  font-weight: 800;
  fill: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  pointer-events: none;
  user-select: none;
}

.pulse-dot {
  animation: pulse-ring 2s infinite ease-out;
}

@keyframes pulse-ring {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

.flow-line {
  fill: none;
  stroke: #ec4899;
  stroke-width: 4;
  stroke-dasharray: 8 6;
  animation: dash-anim 1.2s linear infinite;
}

@keyframes dash-anim {
  to { stroke-dashoffset: -28; }
}

.region-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
  justify-content: center;
}

.chip-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: #ffffff;
  border: 1.5px solid var(--line);
  color: var(--ink);
  cursor: pointer;
  transition: all 0.15s ease;
}

.chip-btn:hover {
  border-color: var(--c);
  transform: translateY(-1px);
}

.chip-btn.active {
  background: var(--c);
  border-color: var(--c);
  color: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.brain-info-card {
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.info-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--line);
}

.info-emoji {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 28px;
  flex-shrink: 0;
}

.info-title-group {
  flex: 1;
}

.info-en-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-en {
  font-size: 19px;
  font-weight: 900;
  color: var(--ink);
  margin: 0;
}

.speak-btn {
  background: #f4eee6;
  border: none;
  font-size: 14px;
  padding: 3px 7px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s;
}

.speak-btn:hover {
  transform: scale(1.15);
}

.info-zh-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 4px;
}

.info-zh {
  font-size: 15px;
  font-weight: 800;
  color: var(--brand-deep);
}

.info-role {
  font-size: 12px;
  font-weight: 700;
  color: var(--brand);
}

.info-ipa {
  font-size: 11.5px;
  color: var(--ink-faint);
}

.info-body {
  margin-top: 14px;
  flex: 1;
}

.info-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #b45309;
  background: #fef3c7;
  padding: 4px 10px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.info-text {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink);
  margin: 0;
}

.network-section {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.network-title {
  font-size: 12.5px;
  font-weight: 800;
  color: var(--brand-deep);
  margin-bottom: 8px;
}

.network-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.net-chip {
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  background: #f5efe6;
  border: 1px solid var(--line);
  color: var(--ink);
  cursor: pointer;
  transition: all 0.15s ease;
}

.net-chip:hover {
  background: var(--brand-soft);
}

.net-chip.active {
  background: var(--brand-deep);
  color: #ffffff;
  border-color: var(--brand-deep);
}

.net-detail {
  background: #fbf8f3;
  border: 1.5px solid var(--brand-soft);
  border-radius: 12px;
  padding: 12px;
  margin-top: 10px;
}

.net-h5 {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--brand-deep);
  margin: 0 0 4px;
}

.net-desc {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0 0 8px;
}

.net-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-item {
  font-size: 12px;
  line-height: 1.4;
  color: var(--ink);
  background: #ffffff;
  padding: 6px 9px;
  border-radius: 6px;
  border-left: 3px solid var(--brand);
}

.demo-foot {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}

@media (max-width: 860px) {
  .demo-foot {
    grid-template-columns: 1fr;
  }
}

.foot-title {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--ink);
  margin: 0 0 10px;
}

.sense-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.sense-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sense-item:hover,
.sense-item.active {
  border-color: var(--brand);
  background: #fff8f2;
  transform: translateY(-1px);
}

.s-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.s-info {
  min-width: 0;
}

.s-name {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: var(--ink);
}

.s-note {
  display: block;
  font-size: 10.5px;
  color: var(--ink-faint);
  line-height: 1.3;
}

.game-board {
  min-height: 180px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  padding: 20px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  border: 2px dashed #d1c7bc;
}

.game-board.idle {
  background: #fdfaf5;
}

.game-board.waiting {
  background: #fee2e2;
  border-color: #ef4444;
}

.game-board.ready {
  background: #dcfce7;
  border-color: #22c55e;
  border-style: solid;
}

.game-board.clicked {
  background: #fef3c7;
  border-color: #f59e0b;
}

.game-board.early {
  background: #fef2f2;
  border-color: #dc2626;
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.game-icon {
  font-size: 32px;
}

.hit-now {
  font-size: 22px;
  color: #15803d;
  font-weight: 900;
  animation: shake 0.2s infinite;
}

@keyframes shake {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.game-btn {
  margin-top: 8px;
  padding: 7px 18px;
  border-radius: 999px;
  background: var(--brand-deep);
  color: #ffffff;
  border: none;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}
</style>
