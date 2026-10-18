export type Level = 'basic' | 'advanced'
export type DomainId = 'life' | 'matter' | 'earth' | 'space' | 'tech'

export interface QuizQuestion {
  id: string
  level: Level
  question: string
  options: string[]
  answer: number
  explain: { basic: string; advanced: string }
}

export type Block =
  | { id: string; type: 'hero' }
  | { id: string; type: 'story'; heading: string; paragraphs: string[]; illustration?: 'jars' | 'microscope' | 'flow' }
  | { id: string; type: 'qa-card'; question: string; emoji?: string; answer: { basic: string; advanced: string } }
  | { id: string; type: 'quiz'; questions: QuizQuestion[] }
  | { id: string; type: 'match'; title: string; instruction?: string; pairs: { left: string; right: string; emoji?: string }[] }
  | { id: string; type: 'sort'; title: string; instruction?: string; goal?: string; items: string[] }
  | { id: string; type: 'vocab'; ids: string[] }
  | {
      id: string
      type: 'experiment'
      title: string
      emoji?: string
      time?: string
      adultHelp: string
      materials: string[]
      steps: string[]
      safety: string[]
      observe: string[]
    }
  | { id: string; type: 'demo'; demo: 'fermentation' | 'brain-explorer'; title?: string; instruction?: string }
  | { id: string; type: 'open-question'; heading: string; text?: string; suggestions?: string[] }
  | { id: string; type: 'related'; knowledgeIds?: string[]; note?: string }

export interface Issue {
  id: string
  no: number
  slug: string
  title: string
  subtitle: string
  domain: DomainId
  date: string
  emoji: string
  status: 'published' | 'draft'
  intro: string
  knowledgeIds: string[]
  blocks: Block[]
}

export interface BridgingCapsule {
  target: 'minimax' | 'sky' | 'pre' | 'zperiod'
  badge: string
  title: string
  desc: string
  url: string
}

export interface KnowledgePoint {
  id: string
  name: string
  en?: string
  ipa?: string
  emoji: string
  domain: DomainId
  summary: string
  summaryEn?: string
  explain: { basic: string; advanced: string }
  explainEn?: { basic: string; advanced: string }
  relatedIds: string[]
  issueIds: string[]
  bridges?: BridgingCapsule[]
}

export interface KidProfile {
  id: string
  name: string
  grade: number
  avatar: string
}

export interface Badge {
  id: string
  label: string
  emoji: string
  date: string
}

export interface ExpNote {
  date: string
  text: string
}

export interface KidProgress {
  stars: number
  completedIssues: string[]
  badges: Badge[]
  /** issueId -> qid -> 已答对 */
  quiz: Record<string, Record<string, boolean>>
  experiments: Record<string, { steps: number[]; notes: ExpNote[] }>
  askedOnce: boolean
}

export type QuestionStatus = 'new' | 'answered' | 'planned'

export interface BoxQuestion {
  id: string
  text: string
  kid: string
  kidId?: string
  date: string
  sourceIssue?: string
  status: QuestionStatus
  answer?: string
}
