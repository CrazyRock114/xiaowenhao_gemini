<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgePoint } from '../types'
import { domainOf, publishedIssues, domains } from '../data/registry'

const props = defineProps<{ points: KnowledgePoint[]; selectedId: string | null }>()
const emit = defineEmits<{ select: [id: string] }>()

const publishedIds = new Set(publishedIssues.map((i) => i.id))
const isLit = (p: KnowledgePoint) => p.issueIds.some((id) => publishedIds.has(id))

/** 领域星系中心 */
const HUBS: Record<string, { x: number; y: number }> = {
  life: { x: 280, y: 330 },
  matter: { x: 620, y: 160 },
  earth: { x: 580, y: 490 },
  space: { x: 850, y: 330 },
  tech: { x: 150, y: 550 },
}

/** 每个 domain 的螺旋起始角错开，减少相邻簇视觉重叠 */
const HUB_SEED: Record<string, number> = {
  life: 0.7,
  matter: -0.9,
  earth: 4.2,
  space: 5.5,
  tech: 3.3,
}

interface Star {
  p: KnowledgePoint
  x: number
  y: number
  r: number
  lit: boolean
  twinkleDelay: number
}

const stars = computed<Star[]>(() => {
  const counters = new Map<string, number>()
  return props.points.map((p, i) => {
    const hub = HUBS[p.domain] ?? { x: 500, y: 320 }
    const idx = counters.get(p.domain) ?? 0
    counters.set(p.domain, idx + 1)
    const angle = idx * 2.399963 + (HUB_SEED[p.domain] ?? 0)
    const radius = 96 + 44 * Math.sqrt(idx)
    const x = hub.x + radius * Math.cos(angle)
    const y = hub.y + radius * Math.sin(angle) * 0.72
    const r = Math.min(17, 9 + p.relatedIds.length * 1.2 + p.issueIds.length * 1.5)
    return { p, x, y, r, lit: isLit(p), twinkleDelay: (i % 7) * 0.6 }
  })
})

const starById = computed(() => new Map(stars.value.map((s) => [s.p.id, s])))

const edges = computed(() => {
  const seen = new Set<string>()
  const list: { a: Star; b: Star; active: boolean }[] = []
  for (const p of props.points) {
    for (const rid of p.relatedIds) {
      const key = [p.id, rid].sort().join('~')
      if (seen.has(key)) continue
      seen.add(key)
      const a = starById.value.get(p.id)
      const b = starById.value.get(rid)
      if (a && b) list.push({ a, b, active: props.selectedId === p.id || props.selectedId === rid })
    }
  }
  return list
})

const hubList = domains.map((d) => ({
  ...d,
  pos: HUBS[d.id] ?? { x: 500, y: 320 },
  count: props.points.filter((p) => p.domain === d.id).length,
}))
</script>

<template>
  <div class="galaxy-wrap">
    <svg viewBox="0 0 1000 690" class="galaxy" role="img" aria-label="知识地图">
      <!-- 领域星云背景 -->
      <g>
        <circle
          v-for="h in hubList"
          :key="'hub-bg-' + h.id"
          :cx="h.pos.x"
          :cy="h.pos.y"
          :r="h.count ? 165 : 60"
          :fill="h.color"
          opacity="0.06"
        />
        <g v-for="h in hubList" :key="'hub-' + h.id">
          <circle :cx="h.pos.x" :cy="h.pos.y" :r="h.count ? 30 : 24" :fill="h.color" :opacity="h.count ? 0.92 : 0.25" />
          <text :x="h.pos.x" :y="h.pos.y + 8" text-anchor="middle" :font-size="h.count ? 24 : 20" :opacity="h.count ? 1 : 0.55">
            {{ h.emoji }}
          </text>
          <text :x="h.pos.x" :y="h.pos.y + 92" text-anchor="middle" font-size="17" font-weight="700" :fill="h.count ? h.color : '#b3a291'">
            {{ h.name }}{{ h.count ? ` · ${h.count}` : '（虚位以待）' }}
          </text>
        </g>
      </g>

      <!-- 关联连线 -->
      <g>
        <line
          v-for="(e, i) in edges"
          :key="'e' + i"
          :x1="e.a.x"
          :y1="e.a.y"
          :x2="e.b.x"
          :y2="e.b.y"
          :stroke="e.active ? '#ef6c1a' : '#d9c8b2'"
          :stroke-width="e.active ? 3 : 2"
          :stroke-dasharray="e.active ? 'none' : '5 5'"
          :opacity="e.active ? 0.9 : 0.6"
        />
      </g>

      <!-- 知识点星星 -->
      <g
        v-for="s in stars"
        :key="s.p.id"
        class="star"
        :class="{ lit: s.lit, sel: selectedId === s.p.id }"
        @click="emit('select', s.p.id)"
      >
        <circle :cx="s.x" :cy="s.y" :r="s.r * 2.1" :fill="s.lit ? domainOf(s.p.domain).color : '#c9bda9'" :opacity="s.lit ? 0.18 : 0.08" />
        <circle
          :cx="s.x"
          :cy="s.y"
          :r="s.r"
          :fill="s.lit ? domainOf(s.p.domain).color : '#f0eadf'"
          :stroke="s.lit ? '#fff' : '#c9bda9'"
          :stroke-width="s.lit ? 2.5 : 2"
          :stroke-dasharray="s.lit ? 'none' : '4 3'"
          class="star-core"
          :style="{ animationDelay: `${s.twinkleDelay}s` }"
        />
        <text :x="s.x" :y="s.y + s.r * 0.42" text-anchor="middle" :font-size="s.r * 1.05" class="star-emoji" :opacity="s.lit ? 1 : 0.45">
          {{ s.p.emoji }}
        </text>
        <text :x="s.x" :y="s.y + s.r + 17" text-anchor="middle" font-size="15" font-weight="700" :fill="s.lit ? '#3d3229' : '#b3a291'">
          {{ s.p.name }}
        </text>
      </g>
    </svg>

    <div class="legend">
      <span v-for="h in hubList" :key="'lg-' + h.id" class="lg-item" :style="{ '--c': h.color }">
        <i class="dot" /> {{ h.emoji }} {{ h.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.galaxy-wrap {
  width: 100%;
}

.galaxy {
  width: 100%;
  height: auto;
  display: block;
}

.star {
  cursor: pointer;
}

.star-core {
  transition: transform 0.18s;
  transform-box: fill-box;
  transform-origin: center;
}

.star:hover .star-core {
  transform: scale(1.25);
}

.star.sel .star-core {
  transform: scale(1.25);
  stroke: #ef6c1a;
}

.star.lit .star-core {
  animation: twinkle 3.2s ease-in-out infinite;
}

.star-emoji {
  pointer-events: none;
  user-select: none;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  justify-content: center;
  margin-top: 10px;
}

.lg-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink-soft);
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--c);
}
</style>
