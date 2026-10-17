<script setup lang="ts">
import { ref } from 'vue'
import type { Block } from '../types'
import KidPickerChips from '../components/KidPickerChips.vue'
import { useKidsStore } from '../stores/kids'
import { useQuestionsStore } from '../stores/questions'

const props = defineProps<{ block: Extract<Block, { type: 'open-question' }>; issueId?: string }>()

const kids = useKidsStore()
const questions = useQuestionsStore()

const text = ref('')
const chosen = ref<string | null>(null)
const sent = ref(false)
const newBadge = ref<string | null>(null)
/** 一起学模式：这个问题是谁问的 */
const recorder = ref(kids.activeKids[0]?.id ?? '')

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
