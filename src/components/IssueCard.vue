<script setup lang="ts">
import { computed } from 'vue'
import type { Issue } from '../types'
import { domainOf } from '../data/registry'
import { useKidsStore } from '../stores/kids'

const props = defineProps<{ issue: Issue }>()

const kids = useKidsStore()
const done = computed(() => Boolean(kids.currentProgress?.completedIssues.includes(props.issue.id)))
const dom = computed(() => domainOf(props.issue.domain))
</script>

<template>
  <RouterLink :to="`/issue/${issue.slug}`" class="issue-card" :style="{ '--dom': dom.color, '--dom-soft': dom.soft }">
    <div class="emoji-wrap">
      <span class="emoji">{{ issue.emoji }}</span>
      <span v-if="done" class="done-badge">✓ 学完</span>
    </div>
    <div class="body">
      <div class="meta">
        <span class="chip no">第 {{ issue.no }} 期</span>
        <span class="chip domain">{{ dom.emoji }} {{ dom.name }}</span>
        <span class="date">{{ issue.date }}</span>
      </div>
      <h3 class="title">{{ issue.title }}</h3>
      <p class="subtitle">{{ issue.subtitle }}</p>
    </div>
    <span class="arrow">→</span>
  </RouterLink>
</template>

<style scoped>
.issue-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px 22px;
  color: var(--ink);
  transition: transform 0.18s, box-shadow 0.18s;
}

.issue-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lift);
}

.emoji-wrap {
  position: relative;
  width: 74px;
  height: 74px;
  border-radius: 20px;
  background: var(--dom-soft);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.emoji {
  font-size: 38px;
}

.done-badge {
  position: absolute;
  bottom: -8px;
  right: -10px;
  background: var(--ok);
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.body {
  flex: 1;
  min-width: 0;
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.no {
  background: var(--dom-soft);
  color: var(--dom);
}

.domain {
  background: var(--dom-soft);
  color: var(--dom);
}

.date {
  font-size: 12.5px;
  color: var(--ink-faint);
}

.title {
  font-size: 19px;
  margin-bottom: 4px;
}

.subtitle {
  margin: 0;
  color: var(--ink-soft);
  font-size: 14.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  font-size: 22px;
  color: var(--dom);
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .issue-card {
    padding: 16px;
    gap: 14px;
  }
  .emoji-wrap {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }
  .emoji {
    font-size: 30px;
  }
  .title {
    font-size: 17px;
  }
  .subtitle {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
