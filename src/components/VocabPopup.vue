<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { activeVocabId, closeVocab } from '../stores/vocab'
import { getPoint, domainOf } from '../data/registry'
import { useKidsStore } from '../stores/kids'
import { speakWord } from '../utils/speech'

const kids = useKidsStore()
// 默认难度档跟随当前孩子的年级（一起学模式默认基础档）
const defaultAdvanced = () => (kids.currentKid && !kids.isTwin ? kids.currentKid.grade >= 5 : false)
const showAdvanced = ref(defaultAdvanced())
const showEnglish = ref(true)

const point = computed(() => (activeVocabId.value ? getPoint(activeVocabId.value) : null))

watch(activeVocabId, () => {
  showAdvanced.value = defaultAdvanced()
})

function relatedName(id: string) {
  return getPoint(id)
}

function onSpeak() {
  if (point.value?.en) {
    speakWord(point.value.en)
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="point" class="overlay" @click.self="closeVocab()">
      <div class="modal vocab-modal" role="dialog" aria-modal="true">
        <div class="head">
          <span class="emoji" :style="{ background: domainOf(point.domain).soft }">{{ point.emoji }}</span>
          <div class="title-wrap">
            <div class="en-row">
              <h3 class="title-en">{{ point.en || point.name }}</h3>
              <button v-if="point.en" type="button" class="speak-btn" title="点击朗读发音" @click="onSpeak">
                🔊
              </button>
            </div>
            <div class="zh-row">
              <span class="title-zh">{{ point.name }}</span>
              <span v-if="point.ipa" class="ipa">{{ point.ipa }}</span>
              <span class="chip domain-chip" :style="{ background: domainOf(point.domain).soft, color: domainOf(point.domain).color }">
                {{ domainOf(point.domain).emoji }} {{ domainOf(point.domain).name }}
              </span>
            </div>
          </div>
          <button class="close" aria-label="关闭" @click="closeVocab()">✕</button>
        </div>

        <p class="summary">{{ point.summary }}</p>
        <p v-if="point.summaryEn" class="summary-en">{{ point.summaryEn }}</p>

        <div class="level-tabs" role="tablist">
          <button
            class="level-tab"
            :class="{ on: !showAdvanced }"
            @click="showAdvanced = false"
          >
            🌱 基础版（弟弟 G3 启蒙轨）
          </button>
          <button
            class="level-tab"
            :class="{ on: showAdvanced }"
            @click="showAdvanced = true"
          >
            🚀 进阶版（哥哥 G5 探究轨）
          </button>
        </div>

        <div class="explain-box">
          <p class="explain-zh">{{ showAdvanced ? point.explain.advanced : point.explain.basic }}</p>
          <p v-if="point.explainEn && (showAdvanced ? point.explainEn.advanced : point.explainEn.basic)" class="explain-en">
            {{ showAdvanced ? point.explainEn.advanced : point.explainEn.basic }}
          </p>
        </div>

        <p v-if="!showAdvanced && kids.currentKid && kids.currentKid.grade >= 5" class="hint">
          💡 哥哥读五年级啦，点「进阶版」能看到微观反应方程与分子图景哦！
        </p>

        <!-- 兄弟系统深度探秘与实验实操 (Bridging Capsules) -->
        <div v-if="point.bridges && point.bridges.length" class="bridges-section">
          <h4 class="section-title">🚀 兄弟子系统硬核探秘与实验传送门</h4>
          <div class="bridges-grid">
            <a
              v-for="b in point.bridges"
              :key="b.url"
              :href="b.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bridge-card"
            >
              <div class="b-badge">{{ b.badge }}</div>
              <div class="b-title">{{ b.title }}</div>
              <div class="b-desc">{{ b.desc }}</div>
              <span class="b-go">前往沉浸实操 ➔</span>
            </a>
          </div>
        </div>

        <div v-if="point.relatedIds.length" class="related">
          <h4 class="related-title">手拉手的知识点</h4>
          <div class="related-list">
            <button
              v-for="rid in point.relatedIds"
              :key="rid"
              class="related-item"
              @click="activeVocabId = rid"
            >
              {{ relatedName(rid)?.emoji }} {{ relatedName(rid)?.name }}
            </button>
          </div>
        </div>

        <RouterLink to="/map" class="map-link" @click="closeVocab()">
          🗺️ 去知识地图看它住在哪里 →
        </RouterLink>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.vocab-modal {
  padding: 26px 26px 22px;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
}

.head {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.emoji {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 30px;
  flex-shrink: 0;
}

.title-wrap {
  flex: 1;
}

.en-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-en {
  font-size: 21px;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
  line-height: 1.2;
}

.speak-btn {
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 6px;
  background: #f4eee6;
  cursor: pointer;
  transition: transform 0.1s, background 0.15s;
}

.speak-btn:hover {
  background: var(--brand-soft);
  transform: scale(1.1);
}

.zh-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.title-zh {
  font-size: 16px;
  font-weight: 700;
  color: var(--brand-deep);
}

.ipa {
  font-size: 13px;
  color: var(--ink-faint);
}

.domain-chip {
  font-size: 11.5px;
  padding: 2px 8px;
}

.close {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f3ede4;
  color: var(--ink-soft);
  font-size: 15px;
  flex-shrink: 0;
  cursor: pointer;
}

.close:hover {
  background: var(--line);
}

.summary {
  margin: 14px 0 2px;
  font-weight: 600;
  font-size: 15px;
  color: var(--ink);
}

.summary-en {
  margin: 0 0 10px;
  font-size: 13px;
  color: var(--ink-soft);
  font-style: italic;
}

.level-tabs {
  display: flex;
  gap: 8px;
  margin: 14px 0 10px;
}

.level-tab {
  padding: 7px 15px;
  border-radius: 999px;
  background: #f3ede4;
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
}

.level-tab.on {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.explain-box {
  background: #fbf6ee;
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  border: 1px solid var(--line);
}

.explain-zh {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
}

.explain-en {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-soft);
  font-style: italic;
  border-top: 1px dashed rgba(180, 150, 120, 0.25);
  padding-top: 8px;
}

.hint {
  font-size: 13px;
  color: var(--ink-faint);
  margin: 8px 0 0;
}

.bridges-section {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1.5px dashed var(--line);
}

.section-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--brand-deep);
  margin: 0 0 10px;
}

.bridges-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.bridge-card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 14px;
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.bridge-card:hover {
  border-color: var(--brand);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 14px rgba(239, 108, 26, 0.14);
}

.b-badge {
  font-size: 11px;
  font-weight: 800;
  color: var(--brand-deep);
}

.b-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
}

.b-desc {
  font-size: 12px;
  color: var(--ink-soft);
}

.b-go {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  text-align: right;
}

.related {
  margin-top: 18px;
}

.related-title {
  font-size: 14px;
  color: var(--ink-soft);
  margin-bottom: 8px;
}

.related-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.related-item {
  padding: 7px 13px;
  border-radius: 999px;
  border: 2px solid var(--line);
  background: #fff;
  font-weight: 600;
  font-size: 14px;
  transition: border-color 0.15s, transform 0.15s;
  cursor: pointer;
}

.related-item:hover {
  border-color: var(--brand);
  transform: translateY(-1px);
}

.map-link {
  display: inline-block;
  margin-top: 18px;
  font-weight: 700;
  font-size: 14px;
}
</style>
