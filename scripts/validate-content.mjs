#!/usr/bin/env node
/**
 * 内容校验：所有 content/ 下的 JSON 必须通过 Schema + 交叉引用检查。
 * 用法: npm run validate:content
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ajv = new Ajv({ allErrors: true, strict: false })

const problems = []
const fail = (msg) => problems.push(msg)
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

// ---------- Schema 校验 ----------
const issueSchema = readJson(join(root, 'content/schema/issue.schema.json'))
const knowledgeSchema = readJson(join(root, 'content/schema/knowledge.schema.json'))
const validateIssue = ajv.compile(issueSchema)
const validateKnowledge = ajv.compile(knowledgeSchema)

// ---------- 知识点库 ----------
const knowledgePath = join(root, 'content/knowledge/points.json')
if (!existsSync(knowledgePath)) {
  fail(`缺少知识点库: content/knowledge/points.json`)
} else {
  const data = readJson(knowledgePath)
  if (!validateKnowledge(data)) {
    fail(`points.json 未通过 Schema:\n${ajv.errorsText(validateKnowledge.errors)}`)
  }
}

const pointIds = new Set((knowledgePath && existsSync(knowledgePath) ? readJson(knowledgePath).points ?? [] : []).map((p) => p.id))

// ---------- 各期 ----------
const issuesDir = join(root, 'content/issues')
const issueIds = new Set()
const slugs = new Set()
const issues = []

if (existsSync(issuesDir)) {
  for (const dir of readdirSync(issuesDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    const p = join(issuesDir, dir.name, 'index.json')
    if (!existsSync(p)) continue
    const issue = readJson(p)
    issues.push({ dir: dir.name, issue })

    if (!validateIssue(issue)) {
      fail(`${dir.name}/index.json 未通过 Schema:\n${ajv.errorsText(validateIssue.errors)}`)
      continue
    }
    if (issueIds.has(issue.id)) fail(`期 id 重复: ${issue.id}`)
    if (slugs.has(issue.slug)) fail(`期 slug 重复: ${issue.slug}`)
    issueIds.add(issue.id)
    slugs.add(issue.slug)

    // 块 id 唯一
    const blockIds = new Set()
    for (const b of issue.blocks) {
      if (blockIds.has(b.id)) fail(`${issue.id}: 块 id 重复 ${b.id}`)
      blockIds.add(b.id)
    }
    // 测验题 id 唯一、答案索引合法
    for (const b of issue.blocks) {
      if (b.type === 'quiz') {
        const qids = new Set()
        for (const q of b.questions) {
          if (qids.has(q.id)) fail(`${issue.id}: 测验题 id 重复 ${q.id}`)
          qids.add(q.id)
          if (q.answer >= q.options.length) fail(`${issue.id}/${q.id}: answer 索引越界`)
        }
      }
    }
    // 富文本中的 [[vocabId]] 引用必须存在于知识点库
    const text = JSON.stringify(issue.blocks)
    for (const m of text.matchAll(/\[\[([a-z0-9-]+)(?:\|[^\]]*)?\]\]/g)) {
      if (!pointIds.has(m[1])) fail(`${issue.id}: 富文本引用了不存在的知识点 [[${m[1]}]]`)
    }
    if (issue.status === 'published') {
      for (const kid of issue.knowledgeIds) {
        if (!pointIds.has(kid)) fail(`${issue.id}: knowledgeIds 引用了不存在的知识点 ${kid}`)
      }
    }
  }
  if (issues.length === 0) fail('content/issues/ 下没有任何期')
} else {
  fail('缺少目录: content/issues/')
}

// ---------- 知识点 → 期 的反向引用 ----------
if (existsSync(knowledgePath)) {
  for (const p of readJson(knowledgePath).points ?? []) {
    for (const iid of p.issueIds) {
      if (!issueIds.has(iid)) fail(`知识点 ${p.id}: issueIds 引用了不存在的期 ${iid}`)
    }
    for (const rid of p.relatedIds) {
      if (!pointIds.has(rid)) fail(`知识点 ${p.id}: relatedIds 引用了不存在的知识点 ${rid}`)
    }
  }
}

// ---------- 输出 ----------
if (problems.length) {
  console.error(`\n❌ 内容校验未通过（${problems.length} 个问题）:\n`)
  for (const p of problems) console.error(`  • ${p}`)
  console.error()
  process.exit(1)
} else {
  const nIssues = issues.length
  const nPoints = pointIds.size
  console.log(`✅ 内容校验通过: ${nIssues} 期 · ${nPoints} 个知识点`)
}
