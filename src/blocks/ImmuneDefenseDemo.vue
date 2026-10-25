<script setup lang="ts">
import { ref, computed } from 'vue'
import { speakWord } from '../utils/speech'

defineProps<{
  block?: { title?: string; instruction?: string }
  issueId?: string
}>()

// 适龄阅读轨：'basic' (弟弟/城堡启蒙) | 'advanced' (哥哥/严谨微观生物学)
const level = ref<'basic' | 'advanced'>('basic')

// 4 大沙盘关卡切换
// 1: 血管游出 (Diapedesis) | 2: 吞噬与自爆 (Macrophage & Neutrophil) | 3: T细胞戳破 (Killer T) | 4: B细胞糖葫芦 (Antibody)
const activeScene = ref<1 | 2 | 3 | 4>(1)

// ==========================================
// 关卡 1：血管游出 (Diapedesis) 状态
// ==========================================
const skinBroken = ref(false)
const chemoSignal = ref(false)
const wbSqueezing = ref(false)
const wbArrived = ref(false)

function triggerCut() {
  skinBroken.value = true
  setTimeout(() => {
    chemoSignal.value = true
  }, 400)
}

function triggerDiapedesis() {
  if (!skinBroken.value) return
  wbSqueezing.value = true
  setTimeout(() => {
    wbArrived.value = true
    wbSqueezing.value = false
  }, 1200)
}

function resetScene1() {
  skinBroken.value = false
  chemoSignal.value = false
  wbSqueezing.value = false
  wbArrived.value = false
}

// ==========================================
// 关卡 2：巨噬细胞吃豆人 & 中性粒细胞同归于尽
// ==========================================
interface Bacteria {
  id: number
  x: number
  y: number
  eaten: boolean
  trapped: boolean
}

const bacteriaList = ref<Bacteria[]>([
  { id: 1, x: 20, y: 30, eaten: false, trapped: false },
  { id: 2, x: 50, y: 25, eaten: false, trapped: false },
  { id: 3, x: 80, y: 35, eaten: false, trapped: false },
  { id: 4, x: 30, y: 70, eaten: false, trapped: false },
  { id: 5, x: 65, y: 65, eaten: false, trapped: false },
  { id: 6, x: 85, y: 75, eaten: false, trapped: false },
])

const eatenCount = ref(0)
const netExploded = ref(false)
const pusFormed = ref(false)

function eatBacteria(b: Bacteria) {
  if (b.eaten || b.trapped) return
  b.eaten = true
  eatenCount.value++
  speakWord('Phagocytosis')
}

function triggerNeutrophilExplosion() {
  if (netExploded.value) return
  netExploded.value = true
  speakWord('Neutrophil')
  // 将剩余未被吞噬的细菌全部被网缠住并消灭
  bacteriaList.value.forEach((b) => {
    if (!b.eaten) b.trapped = true
  })
  setTimeout(() => {
    pusFormed.value = true
  }, 600)
}

function resetScene2() {
  bacteriaList.value.forEach((b) => {
    b.eaten = false
    b.trapped = false
  })
  eatenCount.value = 0
  netExploded.value = false
  pusFormed.value = false
}

// ==========================================
// 关卡 3：杀伤 T 细胞穿孔素戳破病毒老巢
// ==========================================
interface HostCell {
  id: number
  infected: boolean
  scanned: boolean
  popped: boolean
}

const hostCells = ref<HostCell[]>([
  { id: 1, infected: false, scanned: false, popped: false },
  { id: 2, infected: true, scanned: false, popped: false }, // 被病毒潜伏的细胞
  { id: 3, infected: false, scanned: false, popped: false },
  { id: 4, infected: false, scanned: false, popped: false },
])

const isScanning = ref(false)
const infectedFound = ref(false)
const isPopping = ref(false)

function scanForInfected() {
  isScanning.value = true
  setTimeout(() => {
    isScanning.value = false
    hostCells.value.forEach((c) => (c.scanned = true))
    infectedFound.value = true
    speakWord('Cytotoxic T Cell')
  }, 1000)
}

function popCell(c: HostCell) {
  if (!c.infected || c.popped) return
  isPopping.value = true
  speakWord('Perforin')
  setTimeout(() => {
    c.popped = true
    isPopping.value = false
  }, 800)
}

function resetScene3() {
  hostCells.value.forEach((c) => {
    c.scanned = false
    c.popped = false
  })
  isScanning.value = false
  infectedFound.value = false
  isPopping.value = false
}

// ==========================================
// 关卡 4：B 细胞 Y 型抗体导弹与糖葫芦网络
// ==========================================
const antibodiesFired = ref(false)
const taggedCount = ref(0)
const agglutinated = ref(false)

function fireAntibodies() {
  if (antibodiesFired.value) return
  antibodiesFired.value = true
  speakWord('Antibody')
  setTimeout(() => {
    taggedCount.value = 6
  }, 800)
  setTimeout(() => {
    agglutinated.value = true
    speakWord('Agglutination')
  }, 1600)
}

function resetScene4() {
  antibodiesFired.value = false
  taggedCount.value = 0
  agglutinated.value = false
}
</script>

<template>
  <div class="immune-cockpit card">
    <!-- 顶栏：荣誉主讲人与双轨切换 -->
    <div class="cockpit-top">
      <div class="top-title-group">
        <div class="badge-speaker-row">
          <span class="cyber-badge">🛡️ 人体城堡微观防御沙盘</span>
          <span class="speaker-tag">🎤 本期少儿主讲：弟弟 (Sky G3)</span>
        </div>
        <h3 class="cockpit-title">我的身体城堡保卫战：四大防线互动演示</h3>
      </div>

      <div class="top-actions">
        <!-- 跨站母舰直通胶囊 -->
        <a
          href="https://www.igcse.xyz/lessons/0610/10-1-disease-immunity"
          target="_blank"
          rel="noopener noreferrer"
          class="ship-link-btn"
          title="跳转至 IGCSE 教学母舰 0610 免疫章节"
        >
          <span>🏛️</span>
          <span>母舰 0610 免疫考点 ➔</span>
        </a>

        <!-- 双轨阅读切换 -->
        <div class="level-pills">
          <button
            type="button"
            class="lvl-btn"
            :class="{ active: level === 'basic' }"
            @click="level = 'basic'"
          >
            🚀 弟弟轨 (G3 城堡启蒙)
          </button>
          <button
            type="button"
            class="lvl-btn"
            :class="{ active: level === 'advanced' }"
            @click="level = 'advanced'"
          >
            🔬 哥哥轨 (G5 微观机制)
          </button>
        </div>
      </div>
    </div>

    <!-- 4 大战役关卡标签导航 -->
    <div class="scene-tabs">
      <button
        type="button"
        class="sc-tab-btn"
        :class="{ active: activeScene === 1 }"
        @click="activeScene = 1"
      >
        <span class="tab-emoji">🏰</span>
        <span class="tab-text">第一幕：城门破防与血管游出</span>
      </button>
      <button
        type="button"
        class="sc-tab-btn"
        :class="{ active: activeScene === 2 }"
        @click="activeScene = 2"
      >
        <span class="tab-emoji">👾</span>
        <span class="tab-text">第二幕：吃豆人与敢死队同归于尽</span>
      </button>
      <button
        type="button"
        class="sc-tab-btn"
        :class="{ active: activeScene === 3 }"
        @click="activeScene = 3"
      >
        <span class="tab-emoji">🗡️</span>
        <span class="tab-text">第三幕：杀伤 T 细胞特工戳破病毒老巢</span>
      </button>
      <button
        type="button"
        class="sc-tab-btn"
        :class="{ active: activeScene === 4 }"
        @click="activeScene = 4"
      >
        <span class="tab-emoji">🚀</span>
        <span class="tab-text">第四幕：B 细胞 Y 导弹与糖葫芦网络</span>
      </button>
    </div>

    <!-- ═══════════════════════════════════════════════
         第一幕：城门破防与白细胞血管游出 (Diapedesis)
         ═══════════════════════════════════════════════ -->
    <div v-if="activeScene === 1" class="scene-box anim-fade">
      <div class="scene-intro">
        <div class="scene-header-row">
          <h4 class="scene-title">🏰 第一道防线破防 ➔ 巡逻警车跨越血管缝隙游出！</h4>
          <span class="term-pill" @click="speakWord('Diapedesis')">🔊 Diapedesis (白细胞游出)</span>
        </div>
        <p class="scene-desc">
          {{
            level === 'basic'
              ? '弟弟访谈解密：“白细胞平时在血管马路上像警车一样巡逻，皮肤破损有细菌时，它们会从血管细胞的小缝隙硬挤出去！”'
              : '剑桥 0610 核心机制：当第一道物理屏障（角质层）受损，组织释放化学引诱素（Chemokines），血管内皮间隙增宽，白细胞通过滚动、粘附与变形游出（Diapedesis）穿透毛细血管。'
          }}
        </p>
      </div>

      <!-- 交互控制条 -->
      <div class="scene-controls">
        <button
          v-if="!skinBroken"
          type="button"
          class="action-btn danger"
          @click="triggerCut"
        >
          💥 点击模拟：不小心摔破皮肤 (细菌入侵！)
        </button>
        <button
          v-else-if="!wbArrived"
          type="button"
          class="action-btn primary"
          :disabled="wbSqueezing"
          @click="triggerDiapedesis"
        >
          🚓 命令白细胞警车：变形挤出血管壁缝隙！
        </button>
        <button
          v-else
          type="button"
          class="action-btn success"
          @click="resetScene1"
        >
          🔄 重新体验破防与游出
        </button>
      </div>

      <!-- 动画画布 -->
      <div class="stage-canvas canvas-scene1">
        <!-- 上层：皮肤角质层城墙 -->
        <div class="layer-skin" :class="{ broken: skinBroken }">
          <div class="skin-wall-left">🧱 皮肤坚固城墙 (表皮角质层)</div>
          <div v-if="skinBroken" class="skin-gap">
            <span class="gap-label">⚠️ 破损伤口！</span>
            <div class="invading-germs">
              <span class="germ-icon">🦠</span>
              <span class="germ-icon">🦠</span>
              <span class="germ-icon">🦠</span>
            </div>
          </div>
          <div class="skin-wall-right">🧱 皮肤坚固城墙</div>
        </div>

        <!-- 中间：组织空隙 (战场) -->
        <div class="layer-tissue">
          <span v-if="chemoSignal && !wbArrived" class="chemo-waves">
            🚨 组织释放化学求救信号：哔卟哔卟！快来支援！
          </span>
          <div v-if="wbArrived" class="hero-arrived anim-pop">
            <span class="big-wb">🛡️ 白细胞大军成功空降战场！</span>
            <small>阿米巴变形游出完成，立刻展开围剿！</small>
          </div>
        </div>

        <!-- 下层：毛细血管马路 -->
        <div class="layer-blood-vessel">
          <div class="vessel-wall-top">
            <span class="vessel-cell">内皮细胞</span>
            <span class="vessel-cell">内皮细胞</span>
            <span class="vessel-slit" :class="{ open: skinBroken }">
              {{ skinBroken ? '缝隙张开 ➔' : '紧密缝隙' }}
            </span>
            <span class="vessel-cell">内皮细胞</span>
            <span class="vessel-cell">内皮细胞</span>
          </div>

          <div class="blood-stream">
            <span class="vessel-title">🩸 毛细血管高速大马路 (血液流速 0.5 mm/s)</span>
            <div class="flowing-cells">
              <span class="rbc">🔴 红细胞</span>
              <span class="rbc">🔴 红细胞</span>
              <div
                class="patrol-wb"
                :class="{
                  braking: skinBroken && !wbSqueezing && !wbArrived,
                  squeezing: wbSqueezing,
                  gone: wbArrived,
                }"
              >
                🚓 白细胞巡警
              </div>
              <span class="rbc">🔴 红细胞</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         第二幕：吃豆人巨噬细胞 & 敢死队同归于尽 (Phagocytosis & NETosis)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeScene === 2" class="scene-box anim-fade">
      <div class="scene-intro">
        <div class="scene-header-row">
          <h4 class="scene-title">👾 第二道防线：大胃王巨噬吃豆人与中性粒细胞同归于尽！</h4>
          <span class="term-pill" @click="speakWord('Phagocytosis')">🔊 Phagocytosis (吞噬作用)</span>
        </div>
        <p class="scene-desc">
          {{
            level === 'basic'
              ? '弟弟金句：“巨噬细胞像吃豆人把细菌嗷呜吃掉；中性粒细胞更英勇，会跟细菌同归于尽！伤口的白脓就是它们牺牲的勋章！”'
              : '微观机制：巨噬细胞通过伪足包裹病原体形成吞噬溶酶体水解；中性粒细胞寿命极短，启动自杀式 NETosis 释放染色质诱捕网困杀敌人，死亡残骸形成化脓性脓液（Pus）。'
          }}
        </p>
      </div>

      <div class="scene-controls">
        <span class="counter-badge">
          🍴 已吞噬细菌：<strong>{{ eatenCount }} / {{ bacteriaList.length }}</strong>
        </span>
        <button
          type="button"
          class="action-btn danger"
          :disabled="netExploded"
          @click="triggerNeutrophilExplosion"
        >
          💥 命令中性粒细胞敢死队：自爆释放诱捕网，同归于尽！
        </button>
        <button
          type="button"
          class="action-btn secondary"
          @click="resetScene2"
        >
          🔄 重置战场
        </button>
      </div>

      <div class="stage-canvas canvas-scene2">
        <div class="game-hint">
          💡 点击任意一只绿色的<strong>细菌小怪兽</strong>，让大胃王巨噬细胞一口吞掉它！
        </div>

        <div class="battlefield-area">
          <!-- 细菌分布 -->
          <div
            v-for="b in bacteriaList"
            :key="b.id"
            class="bacteria-node"
            :class="{ eaten: b.eaten, trapped: b.trapped }"
            :style="{ left: `${b.x}%`, top: `${b.y}%` }"
            @click="eatBacteria(b)"
          >
            <span class="bact-emoji">🦠</span>
            <span class="bact-label">{{ b.eaten ? '已消化' : b.trapped ? '被网锁死' : '细菌怪兽' }}</span>
          </div>

          <!-- 巨噬细胞大吃豆人 -->
          <div class="macrophage-mascot">
            <span class="m-emoji">👾</span>
            <div class="m-text">
              <strong>巨噬吃豆人</strong>
              <small>已吞吃 {{ eatenCount }} 只</small>
            </div>
          </div>

          <!-- 中性粒细胞敢死队自爆效果 -->
          <div v-if="netExploded" class="net-trap-overlay anim-fade">
            <div class="net-mesh">🕸️🕸️🕸️ 中性粒细胞 DNA 诱捕网自爆展开！🕸️🕸️🕸️</div>
            <div v-if="pusFormed" class="pus-badge anim-pop">
              🏆 英雄勋章：中性粒细胞壮烈牺牲，转化为伤口白脓（Pus）锁死战场！
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         第三幕：杀伤 T 细胞特工戳破病毒老巢 (Perforin)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeScene === 3" class="scene-box anim-fade">
      <div class="scene-intro">
        <div class="scene-header-row">
          <h4 class="scene-title">🗡️ 第三道防线：杀伤 T 细胞特工把病毒老巢给“戳破”！</h4>
          <span class="term-pill" @click="speakWord('Perforin')">🔊 Perforin (穿孔素)</span>
        </div>
        <p class="scene-desc">
          {{
            level === 'basic'
              ? '弟弟敏锐直觉：“如果病毒溜进我们自己的细胞里繁殖，杀伤 T 细胞发现了就会拿出针头把那个细胞给戳破！”'
              : '剑桥 0610 细胞免疫：受病毒感染的宿主细胞表面呈现异常抗原多肽。CD8+ 杀伤 T 细胞识别后极化释放穿孔素（Perforin）在靶细胞膜打孔，诱导其渗透性裂解，消灭病毒繁衍温床。'
          }}
        </p>
      </div>

      <div class="scene-controls">
        <button
          type="button"
          class="action-btn primary"
          :disabled="isScanning || infectedFound"
          @click="scanForInfected"
        >
          🔍 启动特工雷达：扫描谁被病毒暗中占领？
        </button>
        <button
          type="button"
          class="action-btn secondary"
          @click="resetScene3"
        >
          🔄 重新扫描
        </button>
      </div>

      <div class="stage-canvas canvas-scene3">
        <div class="cells-grid">
          <div
            v-for="c in hostCells"
            :key="c.id"
            class="host-cell-card"
            :class="{
              infected: c.infected && c.scanned,
              popped: c.popped,
              scanning: isScanning,
            }"
            @click="popCell(c)"
          >
            <div class="cell-status-bar">
              <span>细胞 #0{{ c.id }}</span>
              <span v-if="c.scanned">
                {{ c.infected ? '🚨 被病毒潜伏！' : '✅ 健康正常' }}
              </span>
            </div>

            <div class="cell-body">
              <span class="cell-emoji">
                {{ c.popped ? '💥' : c.infected && c.scanned ? '🤢' : '🧫' }}
              </span>
              <p class="cell-note">
                {{
                  c.popped
                    ? '已被穿孔素戳破裂解！病毒失去老巢彻底消亡！'
                    : c.infected && c.scanned
                    ? '点击此处：派杀伤 T 细胞拿出穿孔素将其戳破！'
                    : '健康呼吸代谢中'
                }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="infectedFound && !hostCells[1].popped" class="agent-t-hint anim-pop">
          🗡️ 杀伤 T 细胞特工已就位！请点击上方那个泛绿的 2 号感染细胞，一枪把它戳破！
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         第四幕：B 细胞 Y 导弹与糖葫芦网络 (Antibody Agglutination)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeScene === 4" class="scene-box anim-fade">
      <div class="scene-intro">
        <div class="scene-header-row">
          <h4 class="scene-title">🚀 第四道防线：B 细胞制造 Y 型导弹，贴吃我标签串糖葫芦！</h4>
          <span class="term-pill" @click="speakWord('Antibody')">🔊 Antibody (抗体)</span>
        </div>
        <p class="scene-desc">
          {{
            level === 'basic'
              ? '弟弟科学纠偏：“抗体不是锁死，而是给坏蛋贴上‘这是坏人’标签，而且双手抓牢把细菌像串糖葫芦一样团团围住！”'
              : '剑桥 0610 体液免疫：浆细胞分泌 Y 型抗体分子。双价 Fab 端特异性交联多个抗原发生凝集反应（Agglutination）；Fc 端向外暴露介导巨噬细胞调理吞噬（Opsonization）。'
          }}
        </p>
      </div>

      <div class="scene-controls">
        <button
          type="button"
          class="action-btn success"
          :disabled="antibodiesFired"
          @click="fireAntibodies"
        >
          🚀 B 细胞军工厂开火：发射 Y 字形追踪小夹子！
        </button>
        <button
          type="button"
          class="action-btn secondary"
          @click="resetScene4"
        >
          🔄 重新发射导弹
        </button>
      </div>

      <div class="stage-canvas canvas-scene4">
        <div class="factory-b-row">
          <div class="b-cell-unit">
            <span class="b-icon">🏭</span>
            <strong>B 细胞兵工厂</strong>
            <small>每秒喷射 2,000 枚抗体</small>
          </div>

          <div v-if="antibodiesFired" class="missile-stream anim-fade">
            <span class="y-missile">Y</span>
            <span class="y-missile">Y</span>
            <span class="y-missile">Y</span>
            <span class="y-missile">Y</span>
            <span class="y-missile">Y</span>
            <span class="stream-text">🚀 Y 字形追踪小夹子高速扑向战场...</span>
          </div>
        </div>

        <div class="tanghulu-arena" :class="{ clustered: agglutinated }">
          <div v-if="!antibodiesFired" class="free-germs">
            <span class="f-germ">🦠 (到处乱窜)</span>
            <span class="f-germ">🦠 (分散游荡)</span>
            <span class="f-germ">🦠 (准备逃跑)</span>
          </div>

          <div v-else class="tanghulu-cluster anim-pop">
            <div class="cluster-title">
              🍡 经典糖葫芦凝集态 (Agglutination Cluster)！
            </div>
            <div class="skewered-germs">
              <div class="skewer-node">
                <span class="y-tag">🏷️ 坏蛋标签</span>
                <span class="germ-body">🦠 Y 🦠 Y 🦠 Y 🦠</span>
              </div>
            </div>
            <p class="cluster-desc">
              两端双手死死钳住！细菌被连环锁死动弹不得，巨噬吃豆人顺着红灯标签一口全吞！
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.immune-cockpit {
  background: #ffffff;
  border: 2px solid var(--line);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(61, 50, 41, 0.08);
}

.cockpit-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 20px;
}

.badge-speaker-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.cyber-badge {
  font-size: 11.5px;
  font-weight: 800;
  color: #0284c7;
  background: #e0f2fe;
  border: 1px solid #bae6fd;
  padding: 3px 9px;
  border-radius: 999px;
}

.speaker-tag {
  font-size: 11.5px;
  font-weight: 800;
  color: #d97706;
  background: #fef3c7;
  border: 1px solid #fde68a;
  padding: 3px 9px;
  border-radius: 999px;
}

.cockpit-title {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: var(--ink);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ship-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #0369a1;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  padding: 5px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.ship-link-btn:hover {
  background: #e0f2fe;
  transform: translateY(-1px);
}

.level-pills {
  display: flex;
  background: #f1ede4;
  border-radius: 999px;
  padding: 3px;
  gap: 4px;
}

.lvl-btn {
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-soft);
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lvl-btn.active {
  background: #ffffff;
  color: var(--ink);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 4 大场景标签 */
.scene-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.sc-tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fbf7f0;
  border: 1.5px solid var(--line);
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.sc-tab-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);
}

.tab-emoji {
  font-size: 18px;
}

.tab-text {
  font-size: 12.5px;
  font-weight: 800;
  line-height: 1.3;
}

/* 场景内容容器 */
.scene-box {
  background: #faf8f5;
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 20px;
}

.scene-intro {
  margin-bottom: 16px;
}

.scene-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.scene-title {
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  color: var(--ink);
}

.term-pill {
  font-size: 11.5px;
  font-weight: 700;
  color: #4338ca;
  background: #e0e7ff;
  border: 1px solid #c7d2fe;
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
}

.scene-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: #475569;
}

.scene-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.action-btn {
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.action-btn.danger {
  background: #ef4444;
  color: #ffffff;
}

.action-btn.danger:hover {
  background: #dc2626;
}

.action-btn.primary {
  background: #0284c7;
  color: #ffffff;
}

.action-btn.primary:hover {
  background: #0369a1;
}

.action-btn.success {
  background: #16a34a;
  color: #ffffff;
}

.action-btn.success:hover {
  background: #15803d;
}

.action-btn.secondary {
  background: #e2e8f0;
  color: #334155;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter-badge {
  font-size: 13px;
  background: #ffffff;
  border: 1px solid var(--line);
  padding: 6px 12px;
  border-radius: 8px;
}

/* 关卡 1 动画画布 */
.stage-canvas {
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}

.canvas-scene1 {
  display: flex;
  flex-direction: column;
}

.layer-skin {
  display: flex;
  background: #fde047;
  border-bottom: 3px solid #eab308;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 800;
  color: #713f12;
  transition: all 0.3s ease;
}

.skin-wall-left,
.skin-wall-right {
  flex: 1;
  text-align: center;
}

.skin-gap {
  background: #f87171;
  color: #ffffff;
  padding: 4px 14px;
  border-radius: 6px;
  text-align: center;
  animation: shake 0.4s ease;
}

.invading-germs {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 2px;
}

.layer-tissue {
  height: 90px;
  background: #fef2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chemo-waves {
  font-size: 12px;
  font-weight: 800;
  color: #dc2626;
  background: #fee2e2;
  padding: 4px 12px;
  border-radius: 999px;
  animation: pulse 1s infinite;
}

.hero-arrived {
  background: #dcfce7;
  border: 1px solid #86efac;
  color: #15803d;
  padding: 8px 16px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.big-wb {
  font-size: 14px;
  font-weight: 900;
}

.layer-blood-vessel {
  background: #ffe4e6;
  border-top: 2px dashed #fda4af;
  padding: 12px;
}

.vessel-wall-top {
  display: flex;
  justify-content: space-around;
  font-size: 11px;
  color: #9f1239;
  font-weight: 700;
  margin-bottom: 8px;
}

.vessel-slit {
  background: #fda4af;
  padding: 1px 6px;
  border-radius: 4px;
}

.vessel-slit.open {
  background: #fb7185;
  color: #ffffff;
  font-weight: 900;
}

.blood-stream {
  background: #f43f5e;
  border-radius: 8px;
  padding: 10px;
  color: #ffffff;
}

.vessel-title {
  font-size: 11px;
  opacity: 0.9;
  display: block;
  margin-bottom: 6px;
}

.flowing-cells {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  font-weight: 700;
}

.patrol-wb {
  background: #ffffff;
  color: #0284c7;
  padding: 4px 10px;
  border-radius: 999px;
  border: 2px solid #38bdf8;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.patrol-wb.braking {
  transform: translateY(-8px) scale(1.1);
  box-shadow: 0 0 12px #ffffff;
}

.patrol-wb.squeezing {
  transform: translateY(-38px) scale(0.7, 1.4);
  background: #38bdf8;
  color: #ffffff;
}

.patrol-wb.gone {
  opacity: 0;
}

/* 关卡 2 画布 */
.canvas-scene2 {
  padding: 16px;
}

.game-hint {
  font-size: 12.5px;
  color: #475569;
  margin-bottom: 12px;
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 6px;
}

.battlefield-area {
  position: relative;
  height: 220px;
  background: #f8fafc;
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  overflow: hidden;
}

.bacteria-node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bacteria-node:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

.bact-emoji {
  font-size: 26px;
}

.bact-label {
  font-size: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 1px 4px;
  border-radius: 4px;
  white-space: nowrap;
}

.bacteria-node.eaten {
  opacity: 0.15;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.4);
}

.bacteria-node.trapped {
  filter: hue-rotate(90deg);
  opacity: 0.6;
}

.macrophage-mascot {
  position: absolute;
  bottom: 12px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 2px solid #a855f7;
  padding: 6px 12px;
  border-radius: 12px;
}

.m-emoji {
  font-size: 28px;
}

.m-text strong {
  display: block;
  font-size: 12px;
  color: #7e22ce;
}

.m-text small {
  font-size: 11px;
  color: #64748b;
}

.net-trap-overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 132, 199, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  backdrop-filter: blur(2px);
}

.net-mesh {
  font-size: 14px;
  font-weight: 900;
  color: #0369a1;
  background: #ffffff;
  padding: 8px 16px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pus-badge {
  font-size: 13px;
  font-weight: 800;
  color: #854d0e;
  background: #fef08a;
  border: 1px solid #facc15;
  padding: 6px 14px;
  border-radius: 8px;
}

/* 关卡 3 画布 */
.canvas-scene3 {
  padding: 16px;
}

.cells-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.host-cell-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.host-cell-card.scanning {
  animation: pulse 0.5s infinite alternate;
}

.host-cell-card.infected {
  border-color: #ef4444;
  background: #fef2f2;
  cursor: pointer;
}

.host-cell-card.popped {
  border-color: #cbd5e1;
  background: #f1f5f9;
  opacity: 0.6;
}

.cell-status-bar {
  font-size: 10.5px;
  font-weight: 800;
  color: #64748b;
  margin-bottom: 6px;
}

.cell-emoji {
  font-size: 32px;
  display: block;
  margin-bottom: 6px;
}

.cell-note {
  margin: 0;
  font-size: 11px;
  line-height: 1.35;
  color: #475569;
}

.agent-t-hint {
  background: #fef3c7;
  border: 1px solid #fde68a;
  color: #92400e;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 800;
  text-align: center;
}

/* 关卡 4 画布 */
.canvas-scene4 {
  padding: 16px;
}

.factory-b-row {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.b-cell-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.b-icon {
  font-size: 32px;
}

.b-cell-unit strong {
  font-size: 12.5px;
  color: #166534;
}

.b-cell-unit small {
  font-size: 10.5px;
  color: #4b5563;
}

.missile-stream {
  display: flex;
  align-items: center;
  gap: 8px;
}

.y-missile {
  display: inline-block;
  font-size: 18px;
  font-weight: 900;
  color: #0284c7;
  background: #e0f2fe;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  animation: fly 0.6s infinite alternate;
}

.tanghulu-arena {
  background: #f8fafc;
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  padding: 24px;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.free-germs {
  display: flex;
  gap: 20px;
  font-size: 13px;
  font-weight: 700;
  color: #dc2626;
}

.tanghulu-cluster {
  text-align: center;
}

.cluster-title {
  font-size: 14px;
  font-weight: 900;
  color: #0284c7;
  margin-bottom: 10px;
}

.skewer-node {
  background: #ffffff;
  border: 2px solid #38bdf8;
  padding: 8px 18px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.y-tag {
  font-size: 11px;
  font-weight: 800;
  background: #fee2e2;
  color: #ef4444;
  padding: 2px 6px;
  border-radius: 4px;
}

.germ-body {
  font-size: 16px;
  font-weight: 900;
  color: #0369a1;
  letter-spacing: 2px;
}

.cluster-desc {
  margin: 10px 0 0;
  font-size: 12px;
  color: #64748b;
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.03); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

@keyframes fly {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}

.anim-fade {
  animation: fadeIn 0.25s ease-out;
}

.anim-pop {
  animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
