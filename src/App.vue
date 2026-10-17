<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import VocabPopup from './components/VocabPopup.vue'
import HoverPopover from './components/HoverPopover.vue'
import SelectionSearch from './components/SelectionSearch.vue'
</script>

<template>
  <!-- Cambridge IGCSE Science Ecosystem Universal Header Component -->
  <igcse-nav active="why"></igcse-nav>
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

  <!-- 1. 全局词条弹窗（移动端与点击深度展开） -->
  <VocabPopup />

  <!-- 2. 桌面端轻量鼠标悬停浮层（Hover Popover + 读音） -->
  <HoverPopover />

  <!-- 3. 全局智能划词探秘搜索（Selection Search + 兄弟站实操跃迁） -->
  <SelectionSearch />
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
