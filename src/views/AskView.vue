<script setup lang="ts">
import { computed, ref } from 'vue'
import { publishedIssues } from '../data/registry'
import { useKidsStore } from '../stores/kids'
import { useQuestionsStore } from '../stores/questions'
import { remoteEnabled } from '../questionBox/adapters'
import KidPickerChips from '../components/KidPickerChips.vue'

const kids = useKidsStore()
const questions = useQuestionsStore()

const activeKids = computed(() => kids.activeKids)
const names = computed(() => activeKids.value.map((k) => k.name).join('、'))
const text = ref('')
const relatedIssue = ref('')
const sent = ref(false)
const newBadge = ref<string | null>(null)
/** 一起学模式：这个问题是谁问的 */
const recorder = ref(kids.activeKids[0]?.id ?? '')

const myQuestions = computed(() =>
  activeKids.value.length ? questions.questions.filter((q) => q.kidId && activeKids.value.some((k) => k.id === q.kidId)) : [],
)

async function send() {
  const kid = kids.kids.find((k) => k.id === recorder.value)
  if (!text.value.trim() || !kid) return
  await questions.submit({
    text: text.value,
    kid: kid.name,
    kidId: kid.id,
    sourceIssue: relatedIssue.value || undefined,
  })
  const badge = kids.markAskedFor(kid.id)
  if (badge) newBadge.value = `🎁 ${kid.name}获得徽章「${badge.label}」 +2 ⭐`
  sent.value = true
  text.value = ''
  relatedIssue.value = ''
}

function statusClass(s: string) {
  return s === 'new' ? 'st-new' : s === 'answered' ? 'st-answered' : 'st-planned'
}
</script>

<template>
  <div class="container ask-page">
    <template v-if="!activeKids.length">
      <div class="card no-kid">
        <p class="nk-emoji">🙋</p>
        <h2>先选一个小主人</h2>
        <p class="nk-sub">提问箱会记住每个小主人问过的问题。</p>
        <RouterLink to="/" class="btn">去选小主人 →</RouterLink>
      </div>
    </template>

    <template v-else>
      <section class="head card">
        <h1 class="title">🎁 提问箱</h1>
        <p class="sub">
          任何「为什么」都可以投进来！好问题可能会变成下一期的主题哦。
          <span class="remote" :class="{ on: remoteEnabled }">{{ remoteEnabled ? '☁️ 远程备份已开启' : '💾 本地保存模式' }}</span>
        </p>
      </section>

      <section class="form card">
        <div class="kid-row">
          <span v-for="kid in activeKids" :key="kid.id" class="kid-avatar">{{ kid.avatar }}</span>
          <strong>{{ names }}</strong> 正在提问…
        </div>
        <KidPickerChips v-if="kids.isTwin" v-model="recorder" label="这个问题谁问的？" />
        <textarea v-model="text" maxlength="200" placeholder="写下你的小问号，比如：为什么天是蓝色的？蜜蜂怎么找到家？" />
        <div class="form-foot">
          <label class="related">
            和哪一期有关？（可选）
            <select v-model="relatedIssue">
              <option value="">不选</option>
              <option v-for="i in publishedIssues" :key="i.id" :value="i.id">第 {{ i.no }} 期 · {{ i.title }}</option>
            </select>
          </label>
          <span class="count">{{ text.length }}/200</span>
          <button class="btn" :disabled="!text.trim()" @click="send()">📮 投进去！</button>
        </div>

        <div v-if="sent" class="sent anim-pop">
          ✅ 投进去了！爸爸妈妈整理问题时会看到它。
          <p v-if="newBadge" class="badge-line">{{ newBadge }}</p>
        </div>
      </section>

      <section class="mine">
        <h2 class="sec-title">🔍 {{ names }}问过的问题</h2>
        <p v-if="!myQuestions.length" class="empty card">还没有提问记录。世界上有那么多为什么，快去问第一个吧！🚀</p>
        <div v-else class="q-list">
          <div v-for="q in myQuestions" :key="q.id" class="q card">
            <div class="q-head">
              <span v-if="kids.isTwin" class="q-kid">{{ q.kid }}</span>
              <span class="q-date">{{ q.date.slice(0, 10) }}</span>
              <span v-if="q.sourceIssue" class="chip chip-gray">来自 {{ q.sourceIssue === 'issue-001' ? '第 1 期' : q.sourceIssue }}</span>
              <span class="chip status" :class="statusClass(q.status)">{{ questions.statusLabel(q.status) }}</span>
            </div>
            <p class="q-text">{{ q.text }}</p>
            <div v-if="q.answer" class="q-answer">
              <strong>💬 大人的回答：</strong>{{ q.answer }}
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.ask-page {
  padding-top: 22px;
}

.no-kid {
  text-align: center;
  padding: 44px 24px;
}

.nk-emoji {
  font-size: 48px;
  margin-bottom: 8px;
}

.no-kid h2 {
  margin-bottom: 6px;
}

.nk-sub {
  color: var(--ink-soft);
  margin-bottom: 20px;
}

.head {
  padding: 20px 24px;
}

.title {
  font-size: 23px;
}

.sub {
  color: var(--ink-soft);
  font-size: 14.5px;
  margin: 6px 0 0;
}

.remote {
  display: inline-block;
  margin-left: 8px;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink-faint);
}

.remote.on {
  color: var(--ok);
}

.form {
  margin-top: 16px;
}

.kid-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: var(--ink-soft);
  font-size: 14.5px;
}

.kid-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--brand-soft);
  display: grid;
  place-items: center;
  font-size: 18px;
}

.form-foot {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.related {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--ink-soft);
  flex: 1;
  min-width: 180px;
}

.count {
  font-size: 12.5px;
  color: var(--ink-faint);
}

.sent {
  margin-top: 14px;
  background: var(--ok-soft);
  color: var(--ok);
  border-radius: var(--radius-sm);
  padding: 12px 15px;
  font-weight: 700;
  font-size: 14.5px;
}

.badge-line {
  margin: 6px 0 0;
  font-size: 13.5px;
  color: #c98a00;
}

.mine {
  margin-top: 26px;
}

.sec-title {
  font-size: 19px;
  margin-bottom: 12px;
  padding: 0 4px;
}

.empty {
  text-align: center;
  color: var(--ink-soft);
}

.q-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.q {
  padding: 16px 20px;
}

.q-head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.q-date {
  font-size: 12.5px;
  color: var(--ink-faint);
}

.q-kid {
  font-weight: 800;
  font-size: 13.5px;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 2px 10px;
  border-radius: 999px;
}

.status.st-new {
  background: #fff3d6;
  color: #c98a00;
}

.status.st-answered {
  background: var(--ok-soft);
  color: var(--ok);
}

.status.st-planned {
  background: #eee9fc;
  color: #6a52d9;
}

.q-text {
  font-weight: 700;
  font-size: 15.5px;
  margin: 0;
}

.q-answer {
  margin-top: 10px;
  background: var(--ok-soft);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14.5px;
}
</style>
