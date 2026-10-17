<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Block } from '../types'
import RichText from '../components/RichText'
import KidPickerChips from '../components/KidPickerChips.vue'
import { useKidsStore } from '../stores/kids'

const props = defineProps<{ block: Extract<Block, { type: 'experiment' }> }>()

const kids = useKidsStore()
/** 一起学模式：这份实验记录记到谁名下 */
const recorder = ref(kids.activeKids[0]?.id ?? '')

const exp = computed(() => kids.expStateFor(recorder.value || 'none', props.block.id))
const noteText = ref('')
const showNoteForm = ref(false)

function toggleStep(i: number) {
  kids.toggleExpStepFor(recorder.value, props.block.id, i)
}

function addNote() {
  if (!noteText.value.trim() || !recorder.value) return
  kids.addExpNoteFor(recorder.value, props.block.id, noteText.value)
  noteText.value = ''
  showNoteForm.value = false
}

const doneSteps = computed(() => exp.value.steps.length)
</script>

<template>
  <section class="card experiment">
    <div class="head">
      <span class="emoji">{{ block.emoji ?? '🧪' }}</span>
      <div class="head-text">
        <h3 class="title">{{ block.title }}</h3>
        <div class="meta">
          <span class="chip chip-gray">⏱ {{ block.time }}</span>
          <span class="chip" :class="{ 'chip-ok': !block.adultHelp.includes('不需要') }">
            {{ block.adultHelp.includes('不需要') ? '🙋 独立完成' : '👨‍👩‍👧 ' + block.adultHelp }}
          </span>
        </div>
      </div>
      <div class="progress-ring" :title="`${doneSteps}/${block.steps.length} 步`">
        {{ doneSteps }}/{{ block.steps.length }}
      </div>
    </div>

    <div class="section">
      <h4 class="label">🛒 材料清单</h4>
      <ul class="materials">
        <li v-for="(m, i) in block.materials" :key="i">{{ m }}</li>
      </ul>
    </div>

    <div class="section">
      <h4 class="label">🧾 步骤（做完一步勾一步）</h4>
      <label v-for="(s, i) in block.steps" :key="i" class="step" :class="{ done: exp.steps.includes(i) }">
        <input type="checkbox" :checked="exp.steps.includes(i)" @change="toggleStep(i)" />
        <span class="step-no">{{ i + 1 }}</span>
        <span class="step-text"><RichText :text="s" /></span>
      </label>
    </div>

    <div class="safety">
      <h4 class="label">⚠️ 安全提示</h4>
      <ul>
        <li v-for="(s, i) in block.safety" :key="i">{{ s }}</li>
      </ul>
    </div>

    <div class="section">
      <h4 class="label">👀 观察任务</h4>
      <ul class="observe">
        <li v-for="(o, i) in block.observe" :key="i">{{ o }}</li>
      </ul>
    </div>

    <div class="notes">
      <div class="notes-head">
        <h4 class="label">📝 我的观察记录</h4>
        <KidPickerChips v-model="recorder" label="记到谁名下：" />
        <button class="btn btn-ghost btn-sm" @click="showNoteForm = !showNoteForm">
          {{ showNoteForm ? '收起' : '＋ 记一笔' }}
        </button>
      </div>
      <div v-if="showNoteForm" class="note-form">
        <textarea v-model="noteText" placeholder="今天我发现了……" />
        <button class="btn btn-sm" @click="addNote">保存记录</button>
      </div>
      <p v-if="!kids.activeKids.length" class="login-hint">💡 选一个小主人，记录才会保存下来哦。</p>
      <ul v-if="exp.notes.length" class="note-list">
        <li v-for="(n, i) in exp.notes" :key="i" class="note">
          <span class="note-date">{{ n.date }}</span>
          <span class="note-text">{{ n.text }}</span>
          <button class="note-del" title="删除" @click="kids.removeExpNote(block.id, i)">✕</button>
        </li>
      </ul>
      <p v-else-if="!showNoteForm" class="empty">还没有记录，做完实验来写第一条吧！</p>
    </div>
  </section>
</template>

<style scoped>
.experiment {
  border-top: 6px solid var(--tech);
}

.head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.emoji {
  font-size: 38px;
  flex-shrink: 0;
}

.head-text {
  flex: 1;
  min-width: 0;
}

.title {
  font-size: 19px;
  margin-bottom: 7px;
}

.meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.progress-ring {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand-deep);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
  flex-shrink: 0;
}

.section {
  margin-top: 16px;
}

.label {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink-soft);
  margin-bottom: 8px;
}

.materials {
  margin: 0;
  padding: 12px 16px 12px 30px;
  background: #fbf6ee;
  border-radius: var(--radius-sm);
  font-size: 15px;
}

.materials li {
  margin: 3px 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s;
}

.step:hover {
  background: #fbf6ee;
}

.step.done {
  opacity: 0.65;
}

.step.done .step-text {
  text-decoration: line-through;
}

.step input {
  width: 20px;
  height: 20px;
  accent-color: var(--brand);
  margin-top: 3px;
  flex-shrink: 0;
}

.step-no {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: #f3ede4;
  color: var(--ink-soft);
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 2px;
}

.step.done .step-no {
  background: var(--ok);
  color: #fff;
}

.step-text {
  font-size: 15px;
}

.safety {
  margin-top: 16px;
  background: var(--danger-soft);
  border-radius: var(--radius-sm);
  padding: 13px 16px;
}

.safety .label {
  color: var(--danger);
}

.safety ul {
  margin: 0;
  padding-left: 22px;
  font-size: 14.5px;
}

.safety li {
  margin: 3px 0;
}

.observe {
  margin: 0;
  padding-left: 22px;
  font-size: 15px;
}

.observe li {
  margin: 4px 0;
}

.notes {
  margin-top: 20px;
  border-top: 2px dashed var(--line);
  padding-top: 14px;
}

.notes-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.note-form {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.note-form textarea {
  flex: 1;
  min-height: 64px;
}

.login-hint,
.empty {
  font-size: 13.5px;
  color: var(--ink-faint);
  margin: 10px 0 0;
}

.note-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #fbf6ee;
  border-radius: 10px;
  padding: 10px 13px;
  font-size: 14.5px;
}

.note-date {
  color: var(--ink-faint);
  font-size: 12.5px;
  flex-shrink: 0;
  margin-top: 2px;
}

.note-text {
  flex: 1;
}

.note-del {
  color: var(--ink-faint);
  font-size: 13px;
}

.note-del:hover {
  color: var(--danger);
}
</style>
