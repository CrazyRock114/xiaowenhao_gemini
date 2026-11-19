<script setup lang="ts">
import { computed } from 'vue'
import FermentationDemo from './FermentationDemo.vue'
import BrainExplorerDemo from './BrainExplorerDemo.vue'
import ImmuneDefenseDemo from './ImmuneDefenseDemo.vue'
import ElectrolyzedWaterDemo from './ElectrolyzedWaterDemo.vue'
import AmmoniaDiffusionDemo from './AmmoniaDiffusionDemo.vue'

const props = defineProps<{
  block: any
  issueId?: string
}>()

const demoName = computed(() => props.block?.demo)
</script>

<template>
  <ImmuneDefenseDemo v-if="demoName === 'immune-defense'" :block="block" :issue-id="issueId" />
  <BrainExplorerDemo v-else-if="demoName === 'brain-explorer'" :block="block" :issue-id="issueId" />
  <ElectrolyzedWaterDemo v-else-if="demoName === 'electrolyzed-water'" :block="block" :issue-id="issueId" />
  <AmmoniaDiffusionDemo v-else-if="demoName === 'ammonia-diffusion'" :block="block" :issue-id="issueId" />
  <FermentationDemo v-else :block="block" :issue-id="issueId" />
</template>
