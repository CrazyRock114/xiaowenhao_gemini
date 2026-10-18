<script setup lang="ts">
import { computed } from 'vue'
import FermentationDemo from './FermentationDemo.vue'
import BrainExplorerDemo from './BrainExplorerDemo.vue'

const props = defineProps<{
  block: any
  issueId?: string
}>()

const isBrain = computed(() => props.block?.demo === 'brain-explorer')
</script>

<template>
  <BrainExplorerDemo v-if="isBrain" :block="block" :issue-id="issueId" />
  <FermentationDemo v-else :block="block" :issue-id="issueId" />
</template>
