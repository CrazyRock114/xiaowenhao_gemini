<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getIssueBySlug, publishedIssues } from '../data/registry'
import { useKidsStore } from '../stores/kids'
import { blockComponents } from '../blocks'
import BlockHero from '../blocks/BlockHero.vue'
import BlockOpenQuestion from '../blocks/BlockOpenQuestion.vue'
import CompletionModal from '../components/CompletionModal.vue'
import EcosystemBridge from '../components/EcosystemBridge.vue'

const route = useRoute()
const kids = useKidsStore()

const issue = computed(() => getIssueBySlug(route.params.slug as string))

const others = computed(() =>
  issue.value ? publishedIssues.filter((i) => i.id !== issue.value!.id) : [],
)

const done = computed(() =>
  Boolean(issue.value && kids.currentProgress?.completedIssues.includes(issue.value.id)),
)

// 阅读进度（滚动）
const scrollPct = ref(0)
function onScroll() {
  const el = document.documentElement
  const total = el.scrollHeight - el.clientHeight
  scrollPct.value = total > 0 ? Math.min(100, Math.round((el.scrollTop / total) * 100)) : 0
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const showCert = ref(false)
const justCompleted = ref(false)

function finish() {
  if (!issue.value) return
  const isNew = kids.completeIssueForActive(issue.value.id, { id: issue.value.id, label: issue.value.title, emoji: issue.value.emoji })
  justCompleted.value = isNew
  showCert.value = true
}
</script>

<template>
  <div v-if="issue" class="issue-page">
    <div class="scroll-bar" :style="{ width: `${scrollPct}%` }" />

    <div class="container">
      <template v-for="(block, i) in issue.blocks" :key="block.id">
        <BlockHero v-if="block.type === 'hero'" :issue="issue" />
        <BlockOpenQuestion v-else-if="block.type === 'open-question'" :block="block" :issue-id="issue.id" class="mt" />
        <component
          :is="blockComponents[block.type]"
          v-else
          class="mt"
          :block="block"
          :issue-id="issue.id"
        />
        <div v-if="i === 0" class="hero-gap" />
      </template>

      <!-- 走出小问号，穿梭全域科学宇宙传送门 -->
      <EcosystemBridge :issue-id="issue.id" />

      <!-- 结业区 -->
      <section class="finish card">
        <div class="finish-text">
          <h3 class="finish-title">{{ done ? '✅ 你已完成这一期' : '🏆 学完这一期了？' }}</h3>
          <p class="finish-sub">{{ done ? '随时可以点开证书再看一遍。' : (kids.isTwin ? '两个人一起领取结业证书，星星分别入账！' : '领取你的结业证书和星星！') }}</p>
        </div>
        <button class="btn" @click="finish">{{ done ? '查看证书' : (kids.isTwin ? '我们学完啦 🎉' : '我学完啦 🎉') }}</button>
        <p v-if="!kids.activeKids.length" class="finish-hint">💡 选一个小主人才能领星星哦。</p>
      </section>

      <!-- 其他期导航 -->
      <section v-if="others.length" class="others">
        <h4 class="others-title">继续探索</h4>
        <div class="others-list">
          <RouterLink v-for="o in others" :key="o.id" :to="`/issue/${o.slug}`" class="other">
            <span class="o-emoji">{{ o.emoji }}</span>
            <span class="o-text">
              <strong>{{ o.title }}</strong>
              <small>{{ o.subtitle }}</small>
            </span>
          </RouterLink>
        </div>
      </section>
    </div>

    <CompletionModal v-if="showCert && issue" :issue="issue" @close="showCert = false" />
  </div>

  <div v-else class="container not-found">
    <p class="nf-emoji">🤔</p>
    <h2>没有找到这一期</h2>
    <RouterLink to="/" class="btn">回首页</RouterLink>
  </div>
</template>

<style scoped>
.issue-page {
  position: relative;
}

.scroll-bar {
  position: sticky;
  top: 60px;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--brand), var(--star));
  border-radius: 0 3px 3px 0;
  transition: width 0.1s linear;
  z-index: 40;
}

.mt {
  margin-top: 18px;
}

.hero-gap {
  height: 6px;
}

.finish {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background: linear-gradient(135deg, #fff, var(--brand-soft));
  border: 2px solid var(--brand-soft);
}

.finish-text {
  flex: 1;
  min-width: 200px;
}

.finish-title {
  font-size: 18px;
}

.finish-sub {
  color: var(--ink-soft);
  font-size: 14px;
  margin: 4px 0 0;
}

.finish-hint {
  width: 100%;
  font-size: 13px;
  color: var(--ink-faint);
  margin: 0;
}

.others {
  margin-top: 28px;
}

.others-title {
  color: var(--ink-soft);
  font-size: 14px;
  margin-bottom: 10px;
}

.others-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.other {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card);
  border-radius: 14px;
  padding: 13px 16px;
  box-shadow: var(--shadow);
  color: var(--ink);
  transition: transform 0.15s;
}

.other:hover {
  transform: translateX(4px);
}

.o-emoji {
  font-size: 26px;
}

.o-text {
  display: flex;
  flex-direction: column;
}

.o-text small {
  color: var(--ink-soft);
}

.not-found {
  text-align: center;
  padding: 80px 0;
}

.nf-emoji {
  font-size: 52px;
}

.not-found h2 {
  margin: 10px 0 22px;
}
</style>
