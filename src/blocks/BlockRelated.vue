<script setup lang="ts">
import type { Block } from '../types'
import { getPoint, domainOf } from '../data/registry'
import { openVocab } from '../stores/vocab'

defineProps<{ block: Extract<Block, { type: 'related' }> }>()
</script>

<template>
  <section class="card related">
    <h2 class="heading">🧭 这一期的收获</h2>
    <div class="points">
      <button
        v-for="id in block.knowledgeIds ?? []"
        :key="id"
        class="point"
        :style="{ '--c': getPoint(id) ? domainOf(getPoint(id)!.domain).color : '#999', '--soft': getPoint(id) ? domainOf(getPoint(id)!.domain).soft : '#eee' }"
        @click="openVocab(id)"
      >
        <span class="p-emoji">{{ getPoint(id)?.emoji }}</span>
        <span class="p-name">{{ getPoint(id)?.name }}</span>
        <span class="p-dom">{{ getPoint(id) ? domainOf(getPoint(id)!.domain).name : '' }}</span>
      </button>
    </div>
    <p v-if="block.note" class="note">
      <RouterLink to="/map">🗺️ 打开知识地图 →</RouterLink>
      {{ block.note }}
    </p>
  </section>
</template>

<style scoped>
.related {
  padding: 26px 28px;
}

.heading {
  font-size: 21px;
  margin-bottom: 14px;
}

.points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.point {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border-radius: 999px;
  border: 2px solid var(--soft);
  background: var(--soft);
  color: var(--c);
  font-weight: 800;
  font-size: 14px;
  transition: transform 0.15s, box-shadow 0.15s;
}

.point:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.p-emoji {
  font-size: 18px;
}

.note {
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 14.5px;
}

.note a {
  font-weight: 700;
  margin-right: 6px;
}
</style>
