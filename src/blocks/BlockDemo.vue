<script setup lang="ts">
import { computed } from 'vue'
import FermentationDemo from './FermentationDemo.vue'
import BrainExplorerDemo from './BrainExplorerDemo.vue'
import ImmuneDefenseDemo from './ImmuneDefenseDemo.vue'

const props = defineProps<{
  block: any
  issueId?: string
}>()

const isBrain = computed(() => props.block?.demo === 'brain-explorer')
const isImmune = computed(() => props.block?.demo === 'immune-defense')
</script>

<template>
  <ImmuneDefenseDemo v-if="isImmune" :block="block" :issue-id="issueId" />
  <BrainExplorerDemo v-else-if="isBrain" :block="block" :issue-id="issueId" />
  <FermentationDemo v-else :block="block" :issue-id="issueId" />
</template>
