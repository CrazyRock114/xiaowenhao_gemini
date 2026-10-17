<script setup lang="ts">
import type { Issue } from '../types'
import { domainOf } from '../data/registry'

const props = defineProps<{ issue: Issue }>()
const dom = domainOf(props.issue.domain)
</script>

<template>
  <section class="hero" :style="{ background: `linear-gradient(135deg, ${dom.soft} 0%, #fff 70%)` }">
    <div class="inner">
      <div class="badges">
        <span class="chip no">第 {{ issue.no }} 期</span>
        <span class="chip" :style="{ background: dom.soft, color: dom.color }">{{ dom.emoji }} {{ dom.name }}</span>
        <span class="chip chip-gray">{{ issue.date }}</span>
      </div>
      <div class="title-row">
        <span class="big-emoji">{{ issue.emoji }}</span>
        <div>
          <h1 class="title">{{ issue.title }}</h1>
          <p class="subtitle">{{ issue.subtitle }}</p>
        </div>
      </div>
      <p class="intro">{{ issue.intro }}</p>
    </div>
    <div class="bubbles" aria-hidden="true">
      <span v-for="n in 6" :key="n" class="bub" :style="{ left: `${8 + n * 14}%`, animationDelay: `${n * 1.3}s`, animationDuration: `${5 + (n % 3)}s` }" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  border-radius: 24px;
  box-shadow: var(--shadow);
  padding: 34px 30px 30px;
  position: relative;
  overflow: hidden;
  margin-top: 22px;
}

.inner {
  position: relative;
  z-index: 1;
}

.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.no {
  background: #fff;
  box-shadow: inset 0 0 0 2px var(--brand-soft);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 14px;
}

.big-emoji {
  font-size: 64px;
  filter: drop-shadow(0 6px 10px rgba(120, 78, 30, 0.18));
}

.title {
  font-size: clamp(24px, 4.5vw, 34px);
  margin-bottom: 6px;
}

.subtitle {
  color: var(--ink-soft);
  font-size: 16.5px;
  margin: 0;
  font-weight: 600;
}

.intro {
  color: var(--ink-soft);
  font-size: 15.5px;
  max-width: 620px;
}

.bubbles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bub {
  position: absolute;
  bottom: -16px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  border: 2px solid rgba(255, 138, 61, 0.35);
  animation: bubble-rise 6s ease-in infinite;
}

@media (max-width: 560px) {
  .hero {
    padding: 24px 20px;
  }
  .big-emoji {
    font-size: 46px;
  }
}
</style>
