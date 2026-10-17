<script setup lang="ts">
import { computed, ref } from 'vue'
import { knowledgePoints, domainOf } from '../data/registry'
import { useKidsStore } from '../stores/kids'
import { useQuestionsStore } from '../stores/questions'
import GalaxyMap from '../map/GalaxyMap.vue'

const kids = useKidsStore()
const questions = useQuestionsStore()

const selectedId = ref<string | null>(null)
const showAdvanced = ref(false)

const selected = computed(() => knowledgePoints.find((p) => p.id === selectedId.value) ?? null)

const litCount = computed(() => knowledgePoints.length)

function select(id: string) {
  selectedId.value = id
  showAdvanced.value = false
}

function relatedName(id: string) {
  return knowledgePoints.find((p) => p.id === id)
}

function selectRelated(id: string) {
  select(id)
}

const explainText = computed(() => {
  if (!selected.value) return ''
  const adv = showAdvanced.value
  return adv ? selected.value.explain.advanced : selected.value.explain.basic
})
</script>

<template>
  <div class="container-wide map-page">
    <section class="head card">
      <div>
        <h1 class="title">🗺️ 我的知识地图</h1>
        <p class="sub">每学完一期，就会点亮一批新星星。星星之间的连线，是它们手拉手的关系。</p>
      </div>
      <div class="stats">
        <span class="chip">⭐ {{ kids.totalStars }} 颗星星</span>
        <span class="chip chip-gray">📖 {{ litCount }} 个知识点</span>
        <span class="chip chip-gray">🎁 {{ questions.questions.length }} 个问题</span>
      </div>
    </section>

    <div class="body">
      <section class="map-card card">
        <GalaxyMap :points="knowledgePoints" :selected-id="selectedId" @select="select" />
      </section>

      <!-- 详情面板 -->
      <aside v-if="selected" class="detail card anim-pop">
        <button class="close" aria-label="关闭" @click="selectedId = null">✕</button>
        <div class="d-head">
          <span class="d-emoji" :style="{ background: domainOf(selected.domain).soft }">{{ selected.emoji }}</span>
          <div>
            <h3 class="d-name">{{ selected.name }}</h3>
            <span class="chip" :style="{ background: domainOf(selected.domain).soft, color: domainOf(selected.domain).color }">
              {{ domainOf(selected.domain).emoji }} {{ domainOf(selected.domain).name }}
            </span>
          </div>
        </div>
        <p class="d-summary">{{ selected.summary }}</p>

        <div class="level-tabs">
          <button class="level-tab" :class="{ on: !showAdvanced }" @click="showAdvanced = false">🌱 基础版</button>
          <button class="level-tab" :class="{ on: showAdvanced }" @click="showAdvanced = true">🚀 进阶版</button>
        </div>
        <p class="d-explain">{{ explainText }}</p>

        <div v-if="selected.issueIds.length" class="d-sec">
          <h4 class="d-label">📚 在哪学的</h4>
          <div class="chips">
            <RouterLink v-for="iid in selected.issueIds" :key="iid" to="/" class="chip">{{ iid === 'issue-001' ? '第 1 期 · 酿酒和酿醋的秘密' : iid }}</RouterLink>
          </div>
        </div>

        <div v-if="selected.relatedIds.length" class="d-sec">
          <h4 class="d-label">🤝 手拉手</h4>
          <div class="chips">
            <button v-for="rid in selected.relatedIds" :key="rid" class="chip rel" @click="selectRelated(rid)">
              {{ relatedName(rid)?.emoji }} {{ relatedName(rid)?.name }}
            </button>
          </div>
        </div>
      </aside>

      <aside v-else class="detail hint-card card">
        <span class="hint-emoji">👆</span>
        <p class="hint-text">点击地图上的星星，看看它是什么意思、在哪学的、和谁手拉手！</p>
        <p v-if="kids.currentKid" class="hint-level">默认显示「{{ kids.currentKid.grade >= 5 ? '进阶' : '基础' }}版」解释，可以随时切换。</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  padding-top: 22px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  flex-wrap: wrap;
}

.title {
  font-size: 23px;
}

.sub {
  color: var(--ink-soft);
  font-size: 14px;
  margin: 4px 0 0;
}

.stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.body {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 16px;
  margin-top: 16px;
  align-items: start;
}

.map-card {
  padding: 12px;
}

.detail {
  position: relative;
  padding: 22px;
}

.close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3ede4;
  color: var(--ink-soft);
  font-size: 14px;
}

.d-head {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.d-emoji {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 28px;
  flex-shrink: 0;
}

.d-name {
  font-size: 20px;
  margin-bottom: 5px;
}

.d-summary {
  font-weight: 600;
  color: var(--ink-soft);
  font-size: 14.5px;
  margin: 0 0 12px;
}

.level-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.level-tab {
  padding: 6px 13px;
  border-radius: 999px;
  background: #f3ede4;
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 13.5px;
}

.level-tab.on {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.d-explain {
  background: #fbf6ee;
  border-radius: var(--radius-sm);
  padding: 13px 15px;
  font-size: 14.5px;
  margin: 0;
}

.d-sec {
  margin-top: 16px;
}

.d-label {
  font-size: 13.5px;
  color: var(--ink-soft);
  margin-bottom: 8px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip.rel {
  cursor: pointer;
  transition: transform 0.12s;
}

.chip.rel:hover {
  transform: translateY(-1px);
}

.hint-card {
  text-align: center;
  color: var(--ink-soft);
}

.hint-emoji {
  font-size: 34px;
  display: block;
  margin-bottom: 8px;
}

.hint-text {
  font-size: 14.5px;
  margin: 0 0 8px;
}

.hint-level {
  font-size: 12.5px;
  color: var(--ink-faint);
  margin: 0;
}

@media (max-width: 900px) {
  .body {
    grid-template-columns: 1fr;
  }
  .detail {
    order: -1;
  }
}
</style>
