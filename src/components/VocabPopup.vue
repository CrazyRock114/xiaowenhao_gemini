<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { activeVocabId, closeVocab } from '../stores/vocab'
import { getPoint, domainOf } from '../data/registry'
import { useKidsStore } from '../stores/kids'

const kids = useKidsStore()
// 默认难度档跟随当前孩子的年级（一起学模式默认基础档）
const defaultAdvanced = () => (kids.currentKid && !kids.isTwin ? kids.currentKid.grade >= 5 : false)
const showAdvanced = ref(defaultAdvanced())

const point = computed(() => (activeVocabId.value ? getPoint(activeVocabId.value) : null))

watch(activeVocabId, () => {
  showAdvanced.value = defaultAdvanced()
})

function relatedName(id: string) {
  return getPoint(id)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="point" class="overlay" @click.self="closeVocab()">
      <div class="modal vocab-modal" role="dialog" aria-modal="true">
        <div class="head">
          <span class="emoji" :style="{ background: domainOf(point.domain).soft }">{{ point.emoji }}</span>
          <div class="title-wrap">
            <h3 class="title">{{ point.name }}</h3>
            <span class="chip" :style="{ background: domainOf(point.domain).soft, color: domainOf(point.domain).color }">
              {{ domainOf(point.domain).emoji }} {{ domainOf(point.domain).name }}
            </span>
          </div>
          <button class="close" aria-label="关闭" @click="closeVocab()">✕</button>
        </div>

        <p class="summary">{{ point.summary }}</p>

        <div class="level-tabs" role="tablist">
          <button
            class="level-tab"
            :class="{ on: !showAdvanced }"
            @click="showAdvanced = false"
          >
            🌱 基础版
          </button>
          <button
            class="level-tab"
            :class="{ on: showAdvanced }"
            @click="showAdvanced = true"
          >
            🚀 进阶版
          </button>
        </div>
        <p class="explain">{{ showAdvanced ? point.explain.advanced : point.explain.basic }}</p>
        <p v-if="!showAdvanced && kids.currentKid && kids.currentKid.grade >= 5" class="hint">
          💡 你是五年级的大孩子，试试点「进阶版」看看更深的原理！
        </p>

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

.title {
  font-size: 22px;
  margin-bottom: 6px;
}

.close {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f3ede4;
  color: var(--ink-soft);
  font-size: 15px;
  flex-shrink: 0;
}

.close:hover {
  background: var(--line);
}

.summary {
  margin: 14px 0 4px;
  font-weight: 600;
  color: var(--ink-soft);
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
  font-size: 14px;
}

.level-tab.on {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.explain {
  background: #fbf6ee;
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  margin: 0;
  font-size: 15.5px;
}

.hint {
  font-size: 13.5px;
  color: var(--ink-faint);
  margin: 8px 0 0;
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
}

.related-item:hover {
  border-color: var(--brand);
  transform: translateY(-1px);
}

.map-link {
  display: inline-block;
  margin-top: 18px;
  font-weight: 700;
  font-size: 14.5px;
}
</style>
