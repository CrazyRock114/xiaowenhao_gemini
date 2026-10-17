<script setup lang="ts">
import type { Block } from '../types'
import RichText from '../components/RichText'
import StoryIllustration from './StoryIllustration.vue'

defineProps<{ block: Extract<Block, { type: 'story' }> }>()
</script>

<template>
  <section class="card story">
    <h2 class="heading">{{ block.heading }}</h2>
    <StoryIllustration v-if="block.illustration" :kind="block.illustration" />
    <p v-for="(p, i) in block.paragraphs" :key="i" class="para">
      <RichText :text="p" />
    </p>
  </section>
</template>

<style scoped>
.story {
  padding: 26px 28px;
}

.heading {
  font-size: 21px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.heading::before {
  content: '';
  width: 6px;
  height: 24px;
  border-radius: 3px;
  background: linear-gradient(var(--brand), var(--brand-deep));
  flex-shrink: 0;
}

.para {
  font-size: 16px;
  margin: 12px 0;
  color: #4d4136;
}

@media (max-width: 560px) {
  .story {
    padding: 20px 18px;
  }
}
</style>
