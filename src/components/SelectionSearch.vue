<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { lookupTerm, type GlossaryEntry } from '../data/unifiedGlossary'
import { speakWord } from '../utils/speech'

const pillVisible = ref(false)
const pillPos = ref({ top: 0, left: 0 })
const selectedText = ref('')

const cardVisible = ref(false)
const cardPos = ref({ top: 0, left: 0 })
const currentEntry = ref<GlossaryEntry | null>(null)

function onSelectionEnd(e: MouseEvent | TouchEvent) {
  // 避免在卡片内部划词触发循环弹窗
  const target = e.target as HTMLElement
  if (target?.closest('.selection-card') || target?.closest('.selection-pill')) {
    return
  }

  // 延迟 50ms 确保浏览器选区完成更新
  setTimeout(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) {
      pillVisible.value = false
      return
    }

    const text = sel.toString().trim()
    if (!text || text.length > 40 || text.includes('\n')) {
      pillVisible.value = false
      return
    }

    try {
      const range = sel.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        pillVisible.value = false
        return
      }

      selectedText.value = text
      pillPos.value = {
        top: Math.max(10, rect.top - 42),
        left: Math.max(70, Math.min(window.innerWidth - 70, rect.left + rect.width / 2)),
      }
      pillVisible.value = true
    } catch {
      pillVisible.value = false
    }
  }, 50)
}

function onOpenLookup(e: Event) {
  e.stopPropagation()
  pillVisible.value = false

  const text = selectedText.value
  const entry = lookupTerm(text)
  currentEntry.value = entry

  // 卡片显示在屏幕视觉居中或选区附近
  const targetX = pillPos.value.left
  const targetY = pillPos.value.top + 50

  cardPos.value = {
    top: Math.min(window.innerHeight - 380, Math.max(60, targetY)),
    left: Math.max(180, Math.min(window.innerWidth - 180, targetX)),
  }
  cardVisible.value = true

  // 自动发音英文（若有）
  if (entry?.nameEn) {
    speakWord(entry.nameEn)
  }
}

function closeCard() {
  cardVisible.value = false
  currentEntry.value = null
}

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target?.closest('.selection-card') && !target?.closest('.selection-pill')) {
    pillVisible.value = false
    cardVisible.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    pillVisible.value = false
    cardVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('mouseup', onSelectionEnd)
  document.addEventListener('touchend', onSelectionEnd)
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', onSelectionEnd)
  document.removeEventListener('touchend', onSelectionEnd)
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <!-- 1. 划选文本后出现的灵动胶囊 -->
    <div
      v-if="pillVisible"
      class="selection-pill anim-pop"
      :style="{ top: `${pillPos.top}px`, left: `${pillPos.left}px` }"
      @mousedown.prevent
      @click="onOpenLookup"
    >
      <span class="pill-icon">🔍</span>
      <span class="pill-text">探秘词典 · {{ selectedText.slice(0, 8) }}...</span>
    </div>

    <!-- 2. 点击胶囊就地展开的生态深度双语弹窗 -->
    <div
      v-if="cardVisible"
      class="selection-card anim-pop"
      :style="{ top: `${cardPos.top}px`, left: `${cardPos.left}px` }"
      @click.stop
    >
      <div class="card-head">
        <span class="card-emoji">{{ currentEntry?.emoji || '🔬' }}</span>
        <div class="card-titles">
          <div class="card-en-row">
            <h3 class="card-en">{{ currentEntry?.nameEn || selectedText }}</h3>
            <button
              type="button"
              class="speak-btn"
              title="朗读发音"
              @click="speakWord(currentEntry?.nameEn || selectedText)"
            >
              🔊
            </button>
          </div>
          <div class="card-zh-row">
            <span class="card-zh">{{ currentEntry?.nameZh || '探索新发现' }}</span>
            <span v-if="currentEntry?.ipa" class="card-ipa">{{ currentEntry.ipa }}</span>
          </div>
        </div>
        <button class="card-close" aria-label="关闭" @click="closeCard">✕</button>
      </div>

      <!-- 释义区 -->
      <div class="card-body">
        <template v-if="currentEntry">
          <p class="card-summary">{{ currentEntry.summaryZh }}</p>
          <p v-if="currentEntry.summaryEn" class="card-summary-en">{{ currentEntry.summaryEn }}</p>
        </template>
        <template v-else>
          <p class="card-summary">
            已捕获词汇「<strong>{{ selectedText }}</strong>」！在我们的剑桥 IGCSE 科学母舰中，它属于探索微观生命与物理世界的重要密码。
          </p>
        </template>

        <!-- 兄弟系统深度探秘胶囊 -->
        <div class="card-bridges">
          <div class="bridges-label">🚀 兄弟子系统硬核探秘与实验实操：</div>
          <template v-if="currentEntry?.bridges && currentEntry.bridges.length">
            <a
              v-for="b in currentEntry.bridges"
              :key="b.url"
              :href="b.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bridge-item"
            >
              <div class="bridge-left">
                <span class="bridge-tag">{{ b.badge }}</span>
                <span class="bridge-name">{{ b.title }}</span>
                <span class="bridge-sub">{{ b.desc }}</span>
              </div>
              <span class="bridge-btn">前往实操 ➔</span>
            </a>
          </template>
          <template v-else>
            <!-- 默认生态快捷通道 -->
            <a
              href="https://www.igcse.xyz/practical"
              target="_blank"
              rel="noopener noreferrer"
              class="bridge-item"
            >
              <div class="bridge-left">
                <span class="bridge-tag">🔬 教学主母舰</span>
                <span class="bridge-name">剑桥 IGCSE 虚拟生化与物理实验台</span>
                <span class="bridge-sub">营养检测 / 显微镜制片 / 气体化学反应</span>
              </div>
              <span class="bridge-btn">去母舰 ➔</span>
            </a>
            <a
              href="https://sky.igcse.xyz"
              target="_blank"
              rel="noopener noreferrer"
              class="bridge-item"
            >
              <div class="bridge-left">
                <span class="bridge-tag">🎯 G8 词汇岛</span>
                <span class="bridge-name">Sky G8 180 核心考点词挑战营</span>
                <span class="bridge-sub">趣味单词消消乐与 60 秒极速闯关</span>
              </div>
              <span class="bridge-btn">去练兵 ➔</span>
            </a>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.selection-pill {
  position: fixed;
  z-index: 10000;
  transform: translate(-50%, -100%);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%);
  color: #fff;
  font-weight: 800;
  font-size: 13.5px;
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(239, 108, 26, 0.35);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.selection-pill:hover {
  transform: translate(-50%, -105%) scale(1.04);
  box-shadow: 0 6px 20px rgba(239, 108, 26, 0.45);
}

.selection-card {
  position: fixed;
  z-index: 10001;
  transform: translate(-50%, 0);
  width: 350px;
  max-width: calc(100vw - 32px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 2px solid var(--brand-soft);
  border-radius: 20px;
  box-shadow: 0 16px 44px rgba(61, 50, 41, 0.22);
  padding: 18px 20px;
  user-select: text;
}

.card-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.card-emoji {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-soft);
  display: grid;
  place-items: center;
  font-size: 26px;
  flex-shrink: 0;
}

.card-titles {
  flex: 1;
  min-width: 0;
}

.card-en-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-en {
  font-size: 18px;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
  line-height: 1.2;
}

.speak-btn {
  font-size: 14px;
  padding: 3px 6px;
  border-radius: 6px;
  cursor: pointer;
  background: #f4eee6;
  transition: transform 0.1s, background 0.15s;
}

.speak-btn:hover {
  background: var(--brand-soft);
  transform: scale(1.1);
}

.card-zh-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 3px;
}

.card-zh {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--brand-deep);
}

.card-ipa {
  font-size: 12px;
  color: var(--ink-faint);
}

.card-close {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f3ede4;
  color: var(--ink-soft);
  font-size: 13px;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.card-close:hover {
  background: var(--line);
}

.card-body {
  margin-top: 12px;
}

.card-summary {
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink);
  margin: 0 0 4px;
}

.card-summary-en {
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--ink-soft);
  margin: 0 0 12px;
  font-style: italic;
}

.card-bridges {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed var(--line);
}

.bridges-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  margin-bottom: 8px;
}

.bridge-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 12px;
  background: #fbf7f0;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  text-decoration: none;
  margin-bottom: 6px;
  transition: all 0.15s ease;
}

.bridge-item:hover {
  background: #fff;
  border-color: var(--brand);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 12px rgba(239, 108, 26, 0.12);
}

.bridge-left {
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

.bridge-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bridge-sub {
  font-size: 11px;
  color: var(--ink-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bridge-btn {
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
