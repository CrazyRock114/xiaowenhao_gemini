import pointsData from '../../content/knowledge/points.json'
import type { DomainId, Issue, KnowledgePoint } from '../types'

const issueModules = import.meta.glob('../../content/issues/*/index.json', { eager: true }) as Record<
  string,
  { default: Issue }
>

export const allIssues: Issue[] = Object.values(issueModules)
  .map((m) => m.default)
  .sort((a, b) => a.no - b.no)

export const publishedIssues = allIssues.filter((i) => i.status === 'published')

export function getIssueBySlug(slug: string): Issue | undefined {
  return allIssues.find((i) => i.slug === slug)
}

export const knowledgePoints: KnowledgePoint[] = (pointsData as { points: KnowledgePoint[] }).points
const pointMap = new Map(knowledgePoints.map((p) => [p.id, p]))

export function getPoint(id: string): KnowledgePoint | undefined {
  return pointMap.get(id)
}

export interface DomainMeta {
  id: DomainId
  name: string
  emoji: string
  color: string
  soft: string
}

export const domains: DomainMeta[] = [
  { id: 'life', name: '生命科学', emoji: '🌿', color: '#4CAF6D', soft: '#E6F5EA' },
  { id: 'matter', name: '物质科学', emoji: '🧪', color: '#4C9EF8', soft: '#E6F0FE' },
  { id: 'earth', name: '地球科学', emoji: '🌍', color: '#2BB3A3', soft: '#E0F5F2' },
  { id: 'space', name: '宇宙科学', emoji: '🔭', color: '#8B72E9', soft: '#EEE9FC' },
  { id: 'tech', name: '技术工程', emoji: '🔧', color: '#FF8A3D', soft: '#FEEFE3' },
]

const domainMap = new Map(domains.map((d) => [d.id, d]))
export function domainOf(id: DomainId): DomainMeta {
  return domainMap.get(id) ?? domains[0]
}

export function levelLabel(grade: number): 'basic' | 'advanced' {
  return grade >= 5 ? 'advanced' : 'basic'
}
