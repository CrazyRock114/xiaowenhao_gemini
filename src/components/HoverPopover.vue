<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { hoveredVocab, clearHoveredVocab, keepHoveredVocab, openVocab } from '../stores/vocab'
import { getPoint, domainOf } from '../data/registry'
import { speakWord } from '../utils/speech'

const point = computed(() => (hoveredVocab.value ? getPoint(hoveredVocab.value.id) : null))

const popoverRef = ref<HTMLElement | null>(null)
const pos = computed(() => {
  if (!hoveredVocab.value) return { top: 0, left: 0, placeBelow: false }
  const isTooHigh = hoveredVocab.value.y < 180
  return {
    top: isTooHigh
      ? hoveredVocab.value.y + hoveredVocab.value.height + 8
      : hoveredVocab.value.y - 8,
    left: Math.max(160, Math.min(window.innerWidth - 160, hoveredVocab.value.x)),
    placeBelow: isTooHigh,
  }
})

function onSpeak(e: Event) {
  e.stopPropagation()
  if (point.value?.en) {
    speakWord(point.value.en)
  }
}

function onClickFull() {
  if (point.value) {
    const id = point.value.id
    clearHoveredVocab(true)
    openVocab(id)
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="hoveredVocab && point"
      ref="popoverRef"
      class="hover-popover anim-pop"
      :class="{ 'place-below': pos.placeBelow }"
      :style="{
        top: `${pos.top}px`,
        left: `${pos.left}px`,
      }"
      @mouseenter="keepHoveredVocab"
      @mouseleave="clearHoveredVocab(false)"
    >
      <div class="pop-header">
        <span class="pop-emoji" :style="{ background: domainOf(point.domain).soft }">
          {{ point.emoji }}
        </span>
        <div class="pop-titles">
          <div class="pop-en-row">
            <h4 class="pop-en">{{ point.en || point.name }}</h4>
            <button
              v-if="point.en"
              type="button"
              class="speak-btn"
              title="点击发音"
              @click="onSpeak"
            >
              🔊
            </button>
          </div>
          <div class="pop-zh-row">
            <span class="pop-zh">{{ point.name }}</span>
            <span v-if="point.ipa" class="pop-ipa">{{ point.ipa }}</span>
          </div>
        </div>
      </div>

      <p class="pop-summary">{{ point.summary }}</p>
      <p v-if="point.summaryEn" class="pop-summary-en">{{ point.summaryEn }}</p>

      <!-- 兄弟系统深度探秘胶囊 -->
      <div v-if="point.bridges && point.bridges.length" class="pop-bridges">
        <a
          v-for="b in point.bridges.slice(0, 2)"
          :key="b.url"
          :href="b.url"
          target="_blank"
          rel="noopener noreferrer"
          class="pop-bridge-pill"
          :title="b.desc"
          @click.stop
        >
          <span class="bridge-badge">{{ b.badge }}</span>
          <span class="bridge-title">{{ b.title }}</span>
          <span class="bridge-arrow">↗</span>
        </a>
      </div>

      <div class="pop-footer">
        <button type="button" class="expand-btn" @click="onClickFull">
          📖 查看双轨深度探究与知识地图 →
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.hover-popover {
  position: fixed;
  z-index: 9999;
  transform: translate(-50%, -100%);
  width: 320px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  border: 1.5px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(61, 50, 41, 0.16);
  padding: 14px 16px;
  pointer-events: auto;
  user-select: text;
}

.hover-popover.place-below {
  transform: translate(-50%, 0);
}

.pop-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pop-emoji {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 22px;
  flex-shrink: 0;
}

.pop-titles {
  flex: 1;
  min-width: 0;
}

.pop-en-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pop-en {
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
  line-height: 1.2;
}

.speak-btn {
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 6px;
  cursor: pointer;
  background: #f4eee6;
  transition: transform 0.1s, background 0.15s;
}

.speak-btn:hover {
  background: var(--brand-soft);
  transform: scale(1.1);
}

.pop-zh-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 2px;
}

.pop-zh {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--brand-deep);
}

.pop-ipa {
  font-size: 12px;
  color: var(--ink-faint);
  font-family: var(--font);
}

.pop-summary {
  margin: 10px 0 4px;
  font-size: 13px;
  color: var(--ink);
  line-height: 1.5;
}

.pop-summary-en {
  margin: 0 0 10px;
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.4;
  font-style: italic;
}

.pop-bridges {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--line);
}

.pop-bridge-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 8px;
  background: #fbf7f0;
  border: 1px solid var(--line);
  font-size: 12px;
  color: var(--ink);
  text-decoration: none;
  transition: all 0.15s ease;
}

.pop-bridge-pill:hover {
  background: var(--brand-soft);
  border-color: var(--brand);
  transform: translateX(2px);
}

.bridge-badge {
  font-weight: 700;
  font-size: 11px;
  color: var(--brand-deep);
}

.bridge-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bridge-arrow {
  font-weight: 800;
  color: var(--brand);
}

.pop-footer {
  margin-top: 10px;
  text-align: right;
}

.expand-btn {
  font-size: 12px;
  font-weight: 700;
  color: var(--brand-deep);
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 6px;
}

.expand-btn:hover {
  background: var(--brand-soft);
}
</style>
