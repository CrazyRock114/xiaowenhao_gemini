<script setup lang="ts">
import { useKidsStore } from '../stores/kids'

/** 一起学模式下的小归属切换器：这次操作/提问记到谁名下 */
const props = defineProps<{ modelValue: string; label?: string }>()
const kids = useKidsStore()

const emit = defineEmits<{ 'update:modelValue': [id: string] }>()

function pick(id: string) {
  emit('update:modelValue', id)
}

if (!props.modelValue && kids.activeKids[0]) {
  emit('update:modelValue', kids.activeKids[0].id)
}
</script>

<template>
  <div v-if="kids.isTwin" class="recorder">
    <span v-if="label" class="r-label">{{ label }}</span>
    <button
      v-for="kid in kids.activeKids"
      :key="kid.id"
      type="button"
      class="r-chip"
      :class="{ on: modelValue === kid.id }"
      @click="pick(kid.id)"
    >
      {{ kid.avatar }} {{ kid.name }}
    </button>
  </div>
</template>

<style scoped>
.recorder {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.r-label {
  font-size: 12.5px;
  color: var(--ink-faint);
  font-weight: 600;
}

.r-chip {
  padding: 5px 12px;
  border-radius: 999px;
  border: 2px solid var(--line);
  background: #fff;
  font-weight: 700;
  font-size: 13.5px;
  color: var(--ink-soft);
  transition: all 0.15s;
}

.r-chip.on {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand-deep);
}
</style>
