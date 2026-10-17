<script setup lang="ts">
import { computed } from 'vue'
import { publishedIssues } from '../data/registry'
import { useKidsStore } from '../stores/kids'
import { useQuestionsStore } from '../stores/questions'
import IssueCard from '../components/IssueCard.vue'
import KidAvatarPicker from '../components/KidAvatarPicker.vue'

const kids = useKidsStore()
const questions = useQuestionsStore()

const activeKids = computed(() => kids.activeKids)
const isTwin = computed(() => kids.isTwin)
const names = computed(() => activeKids.value.map((k) => k.name).join('、'))
const myQuestions = computed(() =>
  activeKids.value.length ? questions.questions.filter((q) => q.kidId && activeKids.value.some((k) => k.id === q.kidId)) : [],
)
const myBadges = computed(() =>
  activeKids.value.map((kid) => ({ kid, badges: kids.progress[kid.id]?.badges ?? [] })),
)
</script>

<template>
  <div class="container home">
    <KidAvatarPicker v-if="!activeKids.length" />

    <template v-else>
      <!-- 小主人问候条 -->
      <section class="greeting card anim-slide-up">
        <button class="avatar-big" title="切换小主人" @click="kids.selectKid(null)">
          <span v-for="kid in activeKids" :key="kid.id" class="avatar-one">{{ kid.avatar }}</span>
        </button>
        <div class="hello">
          <h1 class="hello-title">嗨，{{ names }}！</h1>
          <p class="hello-sub">
            <template v-if="isTwin">一起学模式 · 记录会分别记在两人名下</template>
            <template v-else>{{ activeKids[0].grade }} 年级 · 一起去找新问题吧！</template>
          </p>
        </div>
        <div class="greet-stats">
          <span v-for="kid in activeKids" :key="kid.id" class="chip chip-star">
            {{ kid.avatar }} ⭐ {{ kids.progress[kid.id]?.stars ?? 0 }}
          </span>
          <span class="chip chip-gray">🎁 {{ myQuestions.length }} 个问题</span>
        </div>
      </section>

      <!-- 徽章墙 -->
      <section v-if="myBadges.some((b) => b.badges.length)" class="badges card">
        <h3 class="sec-title">🎖️ 我们的徽章墙</h3>
        <div v-for="entry in myBadges" :key="entry.kid.id" class="badge-row">
          <span v-if="isTwin" class="badge-kid">{{ entry.kid.avatar }} {{ entry.kid.name }}</span>
          <div class="badge-list">
            <span v-for="b in entry.badges" :key="b.id + b.date" class="badge-item" :title="b.date">
              {{ b.emoji }} {{ b.label }}
            </span>
            <span v-if="!entry.badges.length" class="badge-empty">还没有徽章，加油！</span>
          </div>
        </div>
      </section>

      <!-- 期列表 -->
      <section class="issues">
        <div class="sec-head">
          <h2 class="sec-title">📚 每期主题</h2>
          <span class="count">已上线 {{ publishedIssues.length }} 期</span>
        </div>
        <div class="issue-list">
          <IssueCard v-for="issue in publishedIssues" :key="issue.id" :issue="issue" />
        </div>
      </section>

      <!-- 入口卡片 -->
      <section class="entries">
        <RouterLink to="/map" class="entry map">
          <span class="e-emoji">🗺️</span>
          <span class="e-title">知识地图</span>
          <span class="e-sub">看看你点亮了多少颗知识星星</span>
        </RouterLink>
        <RouterLink to="/ask" class="entry ask">
          <span class="e-emoji">🎁</span>
          <span class="e-title">提问箱</span>
          <span class="e-sub">你的问题可能成为下一期主题！</span>
        </RouterLink>
      </section>
    </template>
  </div>
</template>

<style scoped>
.home {
  padding-top: 22px;
  padding-bottom: 20px;
}

.greeting {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
}

.avatar-big {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.avatar-big:hover {
  transform: scale(1.06) rotate(-4deg);
}

.avatar-one {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--brand-soft);
  border: 3px solid #fff;
  font-size: 30px;
  display: grid;
  place-items: center;
}

.avatar-one + .avatar-one {
  margin-left: -12px;
}

.hello {
  flex: 1;
  min-width: 0;
}

.hello-title {
  font-size: 22px;
}

.hello-sub {
  color: var(--ink-soft);
  font-size: 14px;
  margin: 2px 0 0;
}

.greet-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}

.badges {
  margin-top: 14px;
  padding: 16px 20px;
}

.sec-title {
  font-size: 16.5px;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge-row + .badge-row {
  margin-top: 6px;
}

.badge-kid {
  font-weight: 800;
  font-size: 14px;
  color: var(--ink-soft);
  flex-shrink: 0;
}

.badge-empty {
  font-size: 13px;
  color: var(--ink-faint);
}

.badge-item {
  padding: 7px 14px;
  border-radius: 999px;
  background: #fff3d6;
  color: #a06e00;
  font-weight: 700;
  font-size: 13.5px;
}

.issues {
  margin-top: 26px;
}

.sec-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
  padding: 0 4px;
}

.sec-head .sec-title {
  font-size: 20px;
}

.count {
  font-size: 13px;
  color: var(--ink-faint);
  font-weight: 600;
}

.issue-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.entries {
  margin-top: 26px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.entry {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: var(--shadow);
  color: var(--ink);
  transition: transform 0.15s, box-shadow 0.15s;
}

.entry:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lift);
}

.e-emoji {
  font-size: 32px;
  margin-bottom: 4px;
}

.e-title {
  font-weight: 800;
  font-size: 17px;
}

.e-sub {
  font-size: 13px;
  color: var(--ink-soft);
}

.entry.map {
  border-top: 5px solid var(--space);
}

.entry.ask {
  border-top: 5px solid var(--brand);
}

@media (max-width: 560px) {
  .greet-stats {
    display: none;
  }
  .entries {
    grid-template-columns: 1fr;
  }
}
</style>
