<script setup lang="ts">
import { computed, ref } from 'vue'
import { useKidsStore } from '../stores/kids'
import { useQuestionsStore } from '../stores/questions'
import { knowledgePoints, domainOf, domains } from '../data/registry'
import { remoteEnabled } from '../questionBox/adapters'

const PIN_KEY = 'baike.parentPin.v1'
const SESSION_KEY = 'baike.parentSession'

const kids = useKidsStore()
const questions = useQuestionsStore()

const unlocked = ref(sessionStorage.getItem(SESSION_KEY) === '1')
const pin = ref('')
const pinError = ref(false)

function tryUnlock() {
  const stored = localStorage.getItem(PIN_KEY) ?? '2026'
  if (pin.value === stored) {
    unlocked.value = true
    sessionStorage.setItem(SESSION_KEY, '1')
  } else {
    pinError.value = true
    setTimeout(() => (pinError.value = false), 600)
  }
}

const tab = ref<'box' | 'points' | 'guide'>('box')

const sortedQuestions = computed(() => [...questions.questions].sort((a, b) => b.date.localeCompare(a.date)))

const draftAnswers = ref<Record<string, string>>({})

function saveAnswer(id: string) {
  const v = draftAnswers.value[id]
  if (v === undefined) return
  questions.setAnswer(id, v)
}

function removeQ(id: string) {
  if (confirm('确定删除这条提问？此操作不可恢复。')) questions.remove(id)
}

function exportTxt() {
  const blob = new Blob([questions.exportText()], { type: 'text/markdown;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `提问箱导出-${new Date().toISOString().slice(0, 10)}.md`
  a.click()
  URL.revokeObjectURL(a.href)
}

const pointsByDomain = domains.map((d) => ({
  ...d,
  points: knowledgePoints.filter((p) => p.domain === d.id),
}))

const guideSteps = [
  ['1️⃣ 选题', '从提问箱挑一个有潜力的主题（或直接指定）。孩子的问题被采纳，是最强的动机燃料。'],
  ['2️⃣ 写内容', '复制 content/issues/ 里最近一期做模板，按 content/schema/issue.schema.json 的块类型（story / qa-card / quiz / match / sort / experiment / demo / vocab / open-question / related）组织内容。也可以直接让 AI 按模板起草，再人工审校。'],
  ['3️⃣ 校验', '运行 npm run validate:content，Schema 与引用错误会被全部指出，改到全绿。'],
  ['4️⃣ 预览审校', 'npm run dev 本地预览，重点检查：科学准确性、适龄性、安全提示、实验可操作性。'],
  ['5️⃣ 沉淀知识点', '把本期核心概念写入 content/knowledge/points.json（含基础/进阶双档解释与关联），并登记进期的 knowledgeIds。'],
  ['6️⃣ 发布', '提交代码推送后自动构建部署（Cloudflare Pages 等）。孩子刷新页面就能看到新一期。'],
]
</script>

<template>
  <div class="container parent-page">
    <template v-if="!unlocked">
      <div class="card gate" :class="{ shake: pinError }">
        <p class="g-emoji">🔐</p>
        <h2>家长入口</h2>
        <p class="g-sub">这里管理提问箱和内容，孩子们不需要进来。</p>
        <input v-model="pin" type="password" inputmode="numeric" placeholder="输入家长口令（初始 2026）" @keyup.enter="tryUnlock" />
        <button class="btn" @click="tryUnlock">解锁</button>
        <p v-if="pinError" class="g-err">口令不对，再想想～</p>
        <p class="g-tip">💡 修改口令：浏览器控制台执行 localStorage.setItem('baike.parentPin.v1', '新口令')</p>
      </div>
    </template>

    <template v-else>
      <section class="head card">
        <h1 class="title">🧑‍🏫 家长工作台</h1>
        <div class="tabs">
          <button class="tab" :class="{ on: tab === 'box' }" @click="tab = 'box'">🎁 问题箱 ({{ questions.questions.length }})</button>
          <button class="tab" :class="{ on: tab === 'points' }" @click="tab = 'points'">📖 知识点库 ({{ knowledgePoints.length }})</button>
          <button class="tab" :class="{ on: tab === 'guide' }" @click="tab = 'guide'">🛠️ 制作下一期</button>
        </div>
      </section>

      <!-- 问题箱 -->
      <section v-if="tab === 'box'" class="panel">
        <div class="toolbar card">
          <span class="chip" :class="remoteEnabled ? 'chip-ok' : 'chip-gray'">
            {{ remoteEnabled ? '☁️ 远程备份已开启（新提问会同步到 Supabase）' : '💾 未配置远程备份（可在 .env 配置 Supabase，见 README）' }}
          </span>
          <button class="btn btn-ghost btn-sm" :disabled="!questions.questions.length" @click="exportTxt">⬇️ 导出全部提问</button>
        </div>

        <p v-if="!sortedQuestions.length" class="empty card">问题箱还是空的。等孩子投进第一个「为什么」吧！</p>

        <div v-for="q in sortedQuestions" :key="q.id" class="q card">
          <div class="q-head">
            <span class="q-kid">{{ q.kid }}</span>
            <span class="q-date">{{ q.date.slice(0, 10) }}</span>
            <span v-if="q.sourceIssue" class="chip chip-gray">{{ q.sourceIssue === 'issue-001' ? '来自第 1 期' : q.sourceIssue }}</span>
            <select class="status-select" :value="q.status" @change="questions.setStatus(q.id, ($event.target as HTMLSelectElement).value as any)">
              <option value="new">等待整理</option>
              <option value="answered">已解答</option>
              <option value="planned">列入下期</option>
            </select>
            <button class="del" title="删除" @click="removeQ(q.id)">🗑️</button>
          </div>
          <p class="q-text">{{ q.text }}</p>
          <div class="answer-row">
            <textarea
              :value="draftAnswers[q.id] ?? q.answer ?? ''"
              placeholder="写个简短回答（会显示在孩子的提问记录里）"
              @input="draftAnswers[q.id] = ($event.target as HTMLTextAreaElement).value"
            />
            <button class="btn btn-ghost btn-sm" @click="saveAnswer(q.id)">保存回答</button>
          </div>
        </div>
      </section>

      <!-- 知识点库 -->
      <section v-else-if="tab === 'points'" class="panel">
        <div v-for="d in pointsByDomain" :key="d.id" class="domain card">
          <h3 class="d-title" :style="{ color: d.color }">{{ d.emoji }} {{ d.name }} · {{ d.points.length }}</h3>
          <p v-if="!d.points.length" class="d-empty">还没有知识点，等第一期主题涉及这个领域时会点亮。</p>
          <div class="p-list">
            <div v-for="p in d.points" :key="p.id" class="p-item">
              <span class="p-emoji">{{ p.emoji }}</span>
              <div class="p-body">
                <strong>{{ p.name }}</strong>
                <small>{{ p.summary }}</small>
              </div>
              <span class="chip chip-gray">{{ p.issueIds.length }} 期</span>
            </div>
          </div>
        </div>
        <p class="edit-hint card">✏️ 知识点在 <code>content/knowledge/points.json</code> 中维护，改完跑 <code>npm run validate:content</code> 校验。</p>
      </section>

      <!-- 制作下一期 -->
      <section v-else class="panel">
        <div class="card">
          <h3 class="g-title">🛠️ 下一期制作流程</h3>
          <ol class="guide">
            <li v-for="[t, desc] in guideSteps" :key="t">
              <strong>{{ t }}</strong>
              <p>{{ desc }}</p>
            </li>
          </ol>
        </div>
        <div class="card">
          <h3 class="g-title">📊 快速统计</h3>
          <div class="stat-grid">
            <div class="stat"><strong>{{ kids.kids.length }}</strong><span>小主人</span></div>
            <div class="stat"><strong>{{ questions.questions.length }}</strong><span>收到提问</span></div>
            <div class="stat"><strong>{{ knowledgePoints.length }}</strong><span>知识点</span></div>
            <div class="stat"><strong>{{ kids.totalStars }}</strong><span>全家星星</span></div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.parent-page {
  padding-top: 22px;
  padding-bottom: 30px;
}

.gate {
  max-width: 460px;
  margin: 40px auto;
  text-align: center;
  padding: 36px 30px;
}

.gate.shake {
  animation: shake 0.35s ease-in-out;
}

.g-emoji {
  font-size: 42px;
  margin-bottom: 4px;
}

.g-sub {
  color: var(--ink-soft);
  margin: 6px 0 18px;
}

.gate input {
  width: 100%;
  margin-bottom: 12px;
  text-align: center;
}

.g-err {
  color: var(--danger);
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0 0;
}

.g-tip {
  font-size: 12px;
  color: var(--ink-faint);
  margin: 16px 0 0;
}

.head {
  padding: 20px 24px;
}

.title {
  font-size: 22px;
  margin-bottom: 12px;
}

.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab {
  padding: 9px 16px;
  border-radius: 999px;
  background: #f3ede4;
  color: var(--ink-soft);
  font-weight: 700;
  font-size: 14px;
}

.tab.on {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.panel {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  flex-wrap: wrap;
}

.empty {
  text-align: center;
  color: var(--ink-soft);
}

.q {
  padding: 18px 20px;
}

.q-head {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.q-kid {
  font-weight: 800;
}

.q-date {
  font-size: 12.5px;
  color: var(--ink-faint);
}

.status-select {
  margin-left: auto;
  padding: 5px 8px;
  font-size: 13px;
}

.del {
  font-size: 16px;
  opacity: 0.6;
}

.del:hover {
  opacity: 1;
}

.q-text {
  font-weight: 700;
  font-size: 15.5px;
  margin: 0 0 10px;
}

.answer-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.answer-row textarea {
  flex: 1;
  min-height: 56px;
  font-size: 14px;
}

.domain {
  padding: 18px 22px;
}

.d-title {
  font-size: 16.5px;
  margin-bottom: 10px;
}

.d-empty {
  color: var(--ink-faint);
  font-size: 14px;
  margin: 0;
}

.p-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.p-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  background: #fbf6ee;
  border-radius: 10px;
}

.p-emoji {
  font-size: 20px;
}

.p-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.p-body small {
  color: var(--ink-soft);
  font-size: 12.5px;
}

.edit-hint {
  font-size: 13.5px;
  color: var(--ink-soft);
}

.edit-hint code {
  background: #f3ede4;
  padding: 1px 7px;
  border-radius: 6px;
  font-size: 12.5px;
}

.g-title {
  font-size: 17px;
  margin-bottom: 12px;
}

.guide {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide strong {
  font-size: 15px;
}

.guide p {
  margin: 3px 0 0;
  font-size: 14px;
  color: var(--ink-soft);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 10px;
}

.stat {
  background: #fbf6ee;
  border-radius: 12px;
  padding: 14px;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 24px;
  color: var(--brand-deep);
}

.stat span {
  font-size: 12.5px;
  color: var(--ink-soft);
}
</style>
