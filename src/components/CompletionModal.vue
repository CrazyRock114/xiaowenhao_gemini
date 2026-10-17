<script setup lang="ts">
import { computed } from 'vue'
import type { Issue } from '../types'
import { useKidsStore } from '../stores/kids'

const props = defineProps<{ issue: Issue }>()
const emit = defineEmits<{ close: [] }>()

const kids = useKidsStore()
const learners = computed(() => (kids.activeKids.length ? kids.activeKids : []))
const names = computed(() => learners.value.map((k) => k.name).join('、'))
const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="emit('close')">
      <div class="certificate" role="dialog" aria-modal="true">
        <div class="ribbon">🎉 恭喜达成 🎉</div>
        <div class="cert-body">
          <div class="avatars">
            <span v-for="kid in learners" :key="kid.id" class="avatar">{{ kid.avatar }}</span>
            <span v-if="!learners.length" class="avatar">🙋</span>
          </div>
          <h2 class="name">{{ learners.length ? names : '小小探索家' }}</h2>
          <p class="line">{{ learners.length > 1 ? '一起成功完成' : '成功完成' }}</p>
          <h3 class="issue-title">{{ issue.emoji }} 《{{ issue.title }}》</h3>
          <div class="rewards">
            <span class="chip">🎖️ 徽章「{{ issue.title }}」</span>
          </div>
          <div class="stars-list">
            <span v-for="kid in learners" :key="kid.id" class="chip chip-star">
              {{ kid.avatar }} ⭐ {{ kids.progress[kid.id]?.stars ?? 0 }}
            </span>
          </div>
          <p class="date">签发日期 · {{ today }}</p>
        </div>
        <div class="actions">
          <RouterLink to="/map" class="btn btn-ghost btn-sm" @click="emit('close')">🗺️ 知识地图</RouterLink>
          <RouterLink to="/ask" class="btn btn-ghost btn-sm" @click="emit('close')">🎁 去提问</RouterLink>
          <button class="btn btn-sm" @click="emit('close')">继续探索</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.certificate {
  background: var(--card);
  border-radius: 24px;
  box-shadow: var(--shadow-lift);
  max-width: 480px;
  width: 100%;
  overflow: hidden;
  animation: pop-in 0.3s ease-out both;
  text-align: center;
}

.ribbon {
  background: linear-gradient(135deg, var(--brand), var(--brand-deep));
  color: #fff;
  font-weight: 800;
  padding: 14px;
  font-size: 18px;
  letter-spacing: 2px;
}

.cert-body {
  padding: 26px 28px 18px;
}

.avatars {
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
}

.avatar {
  font-size: 52px;
  line-height: 1;
}

.avatar + .avatar {
  margin-left: -8px;
}

.name {
  font-size: 24px;
}

.line {
  color: var(--ink-soft);
  margin: 6px 0 10px;
}

.issue-title {
  font-size: 20px;
  color: var(--brand-deep);
  margin-bottom: 16px;
}

.rewards {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.stars-list {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.date {
  color: var(--ink-faint);
  font-size: 12.5px;
  margin: 4px 0 0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0 22px 24px;
  flex-wrap: wrap;
}
</style>
