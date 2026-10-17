<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import VocabPopup from './components/VocabPopup.vue'
</script>

<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <footer class="app-footer">
    <div class="container">
      <p>🌱 小问号百科 · 用问题点亮世界</p>
      <RouterLink to="/parent" class="parent-link">家长入口</RouterLink>
    </div>
  </footer>
  <VocabPopup />
</template>

<style scoped>
.app-footer {
  margin-top: 56px;
  padding: 26px 0 34px;
  border-top: 1px solid var(--line);
  text-align: center;
  color: var(--ink-faint);
  font-size: 14px;
}

.app-footer p {
  margin: 0 0 6px;
}

.parent-link {
  color: var(--ink-faint);
  font-size: 13px;
  border-bottom: 1px dashed var(--ink-faint);
}

.parent-link:hover {
  color: var(--ink-soft);
}
</style>
