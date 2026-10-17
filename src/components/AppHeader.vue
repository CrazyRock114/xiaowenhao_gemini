<script setup lang="ts">
import { useKidsStore } from '../stores/kids'

const kids = useKidsStore()
</script>

<template>
  <header class="app-header">
    <div class="inner container-wide">
      <RouterLink to="/" class="logo">
        <span class="logo-mark">🌱</span>
        <span class="logo-text">小问号百科</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link" exact-active-class="active">
          <span class="nav-emoji">🏠</span><span class="nav-label">首页</span>
        </RouterLink>
        <RouterLink to="/map" class="nav-link" active-class="active">
          <span class="nav-emoji">🗺️</span><span class="nav-label">知识地图</span>
        </RouterLink>
        <RouterLink to="/ask" class="nav-link" active-class="active">
          <span class="nav-emoji">🎁</span><span class="nav-label">提问箱</span>
        </RouterLink>
      </nav>

      <div class="right">
        <template v-if="kids.activeKids.length">
          <span
            v-for="kid in kids.activeKids"
            :key="kid.id"
            class="chip chip-star"
            :title="`${kid.name}的星星`"
          >
            {{ kid.avatar }} ⭐ {{ kids.progress[kid.id]?.stars ?? 0 }}
          </span>
        </template>
        <RouterLink v-if="kids.activeKids.length" to="/" class="kid-chip" title="切换小主人">
          <span class="kid-avatar multi">{{ kids.activeKids.map((k) => k.avatar).join('') }}</span>
          <span class="kid-name">{{ kids.isTwin ? '一起学' : kids.activeKids[0].name }}</span>
        </RouterLink>
        <RouterLink v-else to="/" class="kid-chip ghost">
          <span class="kid-avatar">🙋</span>
          <span class="kid-name">选小主人</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 246, 234, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.inner {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 19px;
  color: var(--ink);
}

.logo-mark {
  font-size: 24px;
}

.nav {
  display: flex;
  gap: 4px;
  margin-left: 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14.5px;
  color: var(--ink-soft);
  transition: background 0.15s, color 0.15s;
}

.nav-link:hover {
  background: #fff;
}

.nav-link.active {
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.kid-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px 5px 6px;
  border-radius: 999px;
  background: #fff;
  border: 2px solid var(--line);
  font-weight: 700;
  color: var(--ink);
  transition: border-color 0.15s;
}

.kid-chip:hover {
  border-color: var(--brand);
}

.kid-chip.ghost {
  border-style: dashed;
  color: var(--ink-soft);
}

.kid-avatar {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  background: var(--brand-soft);
  border-radius: 50%;
  font-size: 17px;
}

@media (max-width: 640px) {
  .nav-label {
    display: none;
  }
  .nav {
    gap: 2px;
  }
  .nav-link {
    padding: 7px 11px;
  }
  .logo-text {
    font-size: 17px;
  }
  .kid-name {
    display: none;
  }
}
</style>
