<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Block } from '../types'
import KidPickerChips from '../components/KidPickerChips.vue'
import RichText from '../components/RichText'
import { useKidsStore } from '../stores/kids'
import { useQuestionsStore } from '../stores/questions'

const props = defineProps<{ block: Extract<Block, { type: 'open-question' }>; issueId?: string }>()

const kids = useKidsStore()
const questions = useQuestionsStore()

const text = ref('')
const chosen = ref<string | null>(null)
const sent = ref(false)
const newBadge = ref<string | null>(null)
const recorder = ref(kids.activeKids[0]?.id ?? '')

const openDives = reactive<Record<number, boolean>>({})

function toggleDive(idx: number) {
  openDives[idx] = !openDives[idx]
}

function fill(s: string) {
  chosen.value = s
  text.value = s
  sent.value = false
}

async function send() {
  const kid = kids.kids.find((k) => k.id === recorder.value)
  if (!text.value.trim() || !kid) return
  await questions.submit({
    text: text.value,
    kid: kid.name,
    kidId: kid.id,
    sourceIssue: props.issueId,
  })
  const badge = kids.markAskedFor(kid.id)
  if (badge) newBadge.value = `${badge.emoji} ${kid.name}获得徽章「${badge.label}」+2 ⭐`
  sent.value = true
  text.value = ''
  chosen.value = null
}
</script>

<template>
  <section class="open-q card">
    <!-- 延伸追问与进一步深挖 -->
    <div v-if="block.deepDives?.length" class="dives-section">
      <div class="dives-head">
        <span class="dives-badge">🔎 延伸追问 · 进一步深挖</span>
        <h3 class="dives-title">学完这一期，爱动脑筋的同学还会追问：</h3>
      </div>
      <div class="dives-list">
        <div v-for="(d, idx) in block.deepDives" :key="idx" class="dive-card" :class="{ open: openDives[idx] }">
          <button type="button" class="dive-trigger" @click="toggleDive(idx)">
            <span class="dive-q">❓ {{ d.question }}</span>
            <span class="dive-arrow">{{ openDives[idx] ? '收起 ▲' : '点开深挖 ▼' }}</span>
          </button>
          <div v-if="openDives[idx]" class="dive-body anim-pop">
            <div class="dive-kid">
              <span class="tag-kid">🌱 生动秒懂</span>
              <div class="dive-text"><RichText :text="d.kidAnswer" /></div>
            </div>
            <div class="dive-parent">
              <span class="tag-parent">👨‍👩‍👧 家长硬核延展</span>
              <div class="dive-text"><RichText :text="d.parentInsight" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="heading">💭 {{ block.heading }}</h2>
    <p v-if="block.text" class="text">{{ block.text }}</p>

    <div v-if="block.suggestions?.length" class="sugs">
      <button v-for="s in block.suggestions" :key="s" class="sug" :class="{ on: chosen === s }" @click="fill(s)">
        {{ s }}
      </button>
    </div>

    <div v-if="kids.activeKids.length" class="form">
      <KidPickerChips v-if="kids.isTwin" v-model="recorder" label="这个问题谁问的？" />
      <textarea v-model="text" placeholder="把你的小问号写在这里，比如：为什么……？" />
      <button class="btn" :disabled="!text.trim()" @click="send()">📮 投进提问箱</button>
    </div>
    <p v-else class="no-kid">
      <RouterLink to="/">选一个小主人 →</RouterLink>，就能把问题投进提问箱啦！
    </p>

    <div v-if="sent" class="sent anim-pop">
      ✅ 投进去了！好问题可能会变成下一期的主题哦。
      <p v-if="newBadge" class="badge-line">{{ newBadge }}</p>
    </div>
  </section>
</template>

<style scoped>
.open-q {
  background: linear-gradient(135deg, #fff 0%, var(--brand-soft) 130%);
  border: 2px solid var(--brand-soft);
}

.dives-section {
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1.5px dashed rgba(239, 108, 26, 0.3);
}

.dives-head {
  margin-bottom: 12px;
}

.dives-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #0f766e, #0d9488);
  padding: 2px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.dives-title {
  font-size: 17px;
  color: var(--ink);
}

.dives-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dive-card {
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.15s ease;
}

.dive-card.open {
  border-color: #0d9488;
}

.dive-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px;
  text-align: left;
  font-weight: 700;
  font-size: 15px;
  color: var(--ink);
}

.dive-trigger:hover {
  background: #faf6f0;
}

.dive-arrow {
  font-size: 12px;
  font-weight: 800;
  color: #0f766e;
  white-space: nowrap;
  flex-shrink: 0;
}

.dive-body {
  padding: 0 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dive-kid,
.dive-parent {
  border-radius: 10px;
  padding: 11px 13px;
}

.dive-kid {
  background: #fffaf2;
  border: 1px solid #f5e2c8;
}

.dive-parent {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
}

.tag-kid,
.tag-parent {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.tag-kid {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.tag-parent {
  background: #334155;
  color: #fff;
}

.dive-text {
  font-size: 14.2px;
  line-height: 1.68;
  color: var(--ink);
  white-space: pre-line;
}

.heading {
  font-size: 21px;
}

.text {
  color: var(--ink-soft);
  font-size: 15px;
  margin: 8px 0 14px;
}

.sugs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.sug {
  text-align: left;
  padding: 11px 15px;
  border-radius: var(--radius-sm);
  border: 2px dashed var(--brand);
  background: rgba(255, 255, 255, 0.7);
  font-size: 14.5px;
  font-weight: 600;
  color: var(--ink);
  transition: background 0.15s, transform 0.15s;
}

.sug:hover {
  background: #fff;
  transform: translateX(3px);
}

.sug.on {
  background: #fff;
  border-style: solid;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form .btn {
  align-self: flex-end;
}

.no-kid {
  font-size: 15px;
  color: var(--ink-soft);
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
</style>
