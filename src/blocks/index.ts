import type { Component } from 'vue'
import type { Block } from '../types'
import BlockHero from './BlockHero.vue'
import BlockStory from './BlockStory.vue'
import BlockQaCard from './BlockQaCard.vue'
import BlockQuiz from './BlockQuiz.vue'
import BlockMatch from './BlockMatch.vue'
import BlockSort from './BlockSort.vue'
import BlockVocab from './BlockVocab.vue'
import BlockExperiment from './BlockExperiment.vue'
import BlockOpenQuestion from './BlockOpenQuestion.vue'
import BlockRelated from './BlockRelated.vue'
import FermentationDemo from './FermentationDemo.vue'

/** 内容块类型 → 渲染组件。新增块类型只需在此注册。 */
export const blockComponents: Record<Block['type'], Component> = {
  hero: BlockHero,
  story: BlockStory,
  'qa-card': BlockQaCard,
  quiz: BlockQuiz,
  match: BlockMatch,
  sort: BlockSort,
  vocab: BlockVocab,
  experiment: BlockExperiment,
  demo: FermentationDemo,
  'open-question': BlockOpenQuestion,
  related: BlockRelated,
}
