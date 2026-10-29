<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Block } from '../types'
import RichText from '../components/RichText'
import StoryIllustration from './StoryIllustration.vue'
import ImmuneSlideDiagrams from './ImmuneSlideDiagrams.vue'

const props = defineProps<{ block: Extract<Block, { type: 'story' }> }>()

// 幻灯片状态
const currentSlide = ref(0)
const viewMode = ref<'slides' | 'all'>('slides')

const hasSlides = computed(() => Boolean(props.block.slides && props.block.slides.length > 0))
const totalSlides = computed(() => props.block.slides?.length || 0)

const activeSlide = computed(() => {
  if (!hasSlides.value || !props.block.slides) return null
  return props.block.slides[currentSlide.value] || props.block.slides[0]
})

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function nextSlide() {
  if (props.block.slides && currentSlide.value < props.block.slides.length - 1) {
    currentSlide.value++
  }
}

function goToSlide(idx: number) {
  if (props.block.slides && idx >= 0 && idx < props.block.slides.length) {
    currentSlide.value = idx
  }
}
</script>

<template>
  <section class="card story-wrapper">
    <!-- 传统普通故事（向后兼容旧 issue） -->
    <template v-if="!hasSlides">
      <h2 class="heading">{{ block.heading }}</h2>
      <StoryIllustration v-if="block.illustration" :kind="block.illustration" />
      <p v-for="(p, i) in block.paragraphs" :key="i" class="para">
        <RichText :text="p" />
      </p>
    </template>

    <!-- 少儿科学演说 PPT 幻灯片系统 -->
    <template v-else>
      <!-- 演说台顶栏：小讲师身份与模式切换 -->
      <div class="deck-header">
        <div class="speaker-meta">
          <div class="speaker-avatar">
            {{ block.speaker?.avatar || '👦' }}
          </div>
          <div class="speaker-info">
            <div class="speaker-title-row">
              <span class="speaker-badge">🎙️ 演讲 PPT</span>
              <h2 class="deck-title">{{ block.deckTitle || block.heading }}</h2>
            </div>
            <p class="speaker-desc">
              主讲科学家：<strong>{{ block.speaker?.name || '小问号弟弟' }}</strong>
              <span class="speaker-role">· {{ block.speaker?.role || 'Grade 3 少儿科普演说家' }}</span>
            </p>
          </div>
        </div>

        <div class="view-switch">
          <button
            class="switch-btn"
            :class="{ active: viewMode === 'slides' }"
            type="button"
            title="幻灯片演说模式"
            @click="viewMode = 'slides'"
          >
            📽️ 幻灯片
          </button>
          <button
            class="switch-btn"
            :class="{ active: viewMode === 'all' }"
            type="button"
            title="完整讲义模式"
            @click="viewMode = 'all'"
          >
            📑 全景讲义
          </button>
        </div>
      </div>

      <!-- 幻灯片放映模式 -->
      <div v-if="viewMode === 'slides' && activeSlide" class="slide-deck-view">
        <!-- 导航标签栏 -->
        <div class="slide-nav-tabs">
          <button
            v-for="(s, idx) in block.slides"
            :key="idx"
            type="button"
            class="nav-tab-btn"
            :class="{ current: idx === currentSlide }"
            @click="goToSlide(idx)"
          >
            <span class="tab-idx">第 {{ idx + 1 }} 幕</span>
            <span class="tab-tag">{{ s.tag }}</span>
          </button>
        </div>

        <!-- 幻灯片主舞台卡片 -->
        <div class="slide-card">
          <!-- 幻灯片头部 -->
          <div class="slide-card-header">
            <div class="slide-badge-row">
              <span class="slide-badge">{{ activeSlide.tag }}</span>
              <span class="slide-counter">SLIDE {{ currentSlide + 1 }} / {{ totalSlides }}</span>
            </div>
            <h3 class="slide-main-title">{{ activeSlide.title }}</h3>
          </div>

          <!-- 核心金句横幅 (Takeaway Banner) -->
          <div class="takeaway-banner">
            <span class="takeaway-icon">💡</span>
            <div class="takeaway-text">
              <strong>核心演说要点：</strong>
              <span>{{ activeSlide.takeaway }}</span>
            </div>
          </div>

          <!-- 双栏主体：左侧要点卡片 + 右侧科学插图 -->
          <div class="slide-body-grid">
            <!-- 左侧结构化要点 -->
            <div class="slide-points-col">
              <div
                v-for="(pt, pIdx) in activeSlide.points"
                :key="pIdx"
                class="point-item-card"
              >
                <div class="point-icon-box">
                  {{ pt.icon || '🔹' }}
                </div>
                <div class="point-content">
                  <h4 class="point-title">{{ pt.title }}</h4>
                  <div class="point-desc">
                    <RichText :text="pt.desc" />
                  </div>
                  <div v-if="pt.action" class="point-action-pill">
                    <span class="action-icon">🗣️ 演示手势：</span>
                    <span class="action-text">{{ pt.action }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧专属插图与真实显微切片 -->
            <div class="slide-visual-col">
              <ImmuneSlideDiagrams :diagram-key="activeSlide.diagramKey" />

              <!-- 剑桥真题/微观切片真实照片对照 -->
              <div v-if="activeSlide.realPhoto" class="micro-photo-box">
                <img
                  :src="activeSlide.realPhoto.src"
                  :alt="activeSlide.realPhoto.label"
                  class="micro-img"
                  loading="lazy"
                />
                <div class="micro-caption">
                  <span class="micro-tag">🔬 真实显微切片</span>
                  <span class="micro-label">{{ activeSlide.realPhoto.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 演说小贴士 (Speaker Note) -->
          <div v-if="activeSlide.speakerNote" class="speaker-note-box">
            <span class="note-icon">🎙️</span>
            <div class="note-text">
              <strong>小讲师演说秘诀：</strong>
              <span>{{ activeSlide.speakerNote }}</span>
            </div>
          </div>
        </div>

        <!-- 幻灯片翻页控制条 -->
        <div class="deck-controls">
          <button
            class="control-btn prev"
            type="button"
            :disabled="currentSlide === 0"
            @click="prevSlide"
          >
            ◀ 上一幕
          </button>

          <div class="dots-indicator">
            <span
              v-for="(_, dIdx) in block.slides"
              :key="dIdx"
              class="dot"
              :class="{ active: dIdx === currentSlide }"
              @click="goToSlide(dIdx)"
            />
          </div>

          <button
            class="control-btn next"
            type="button"
            :disabled="currentSlide === totalSlides - 1"
            @click="nextSlide"
          >
            下一幕 ▶
          </button>
        </div>
      </div>

      <!-- 全景讲义模式 (全部展开一目了然) -->
      <div v-else-if="viewMode === 'all' && block.slides" class="deck-all-view">
        <article
          v-for="(s, idx) in block.slides"
          :key="idx"
          class="overview-slide-card"
        >
          <div class="slide-card-header">
            <div class="slide-badge-row">
              <span class="slide-badge">第 {{ idx + 1 }} 幕 · {{ s.tag }}</span>
            </div>
            <h3 class="slide-main-title">{{ s.title }}</h3>
          </div>

          <div class="takeaway-banner">
            <span class="takeaway-icon">💡</span>
            <div class="takeaway-text">
              <strong>金句提炼：</strong>{{ s.takeaway }}
            </div>
          </div>

          <div class="slide-body-grid">
            <div class="slide-points-col">
              <div
                v-for="(pt, pIdx) in s.points"
                :key="pIdx"
                class="point-item-card"
              >
                <div class="point-icon-box">{{ pt.icon || '🔹' }}</div>
                <div class="point-content">
                  <h4 class="point-title">{{ pt.title }}</h4>
                  <div class="point-desc">
                    <RichText :text="pt.desc" />
                  </div>
                  <div v-if="pt.action" class="point-action-pill">
                    <span class="action-icon">🗣️ 演示手势：</span>
                    <span class="action-text">{{ pt.action }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="slide-visual-col">
              <ImmuneSlideDiagrams :diagram-key="s.diagramKey" />
              <div v-if="s.realPhoto" class="micro-photo-box">
                <img :src="s.realPhoto.src" :alt="s.realPhoto.label" class="micro-img" loading="lazy" />
                <div class="micro-caption">
                  <span class="micro-tag">🔬 真实显微切片</span>
                  <span class="micro-label">{{ s.realPhoto.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </template>
  </section>
</template>

<style scoped>
.story-wrapper {
  padding: 24px 26px;
  background: #ffffff;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

/* 传统段落样式 */
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
  line-height: 1.7;
}

/* ========== PPT 演说台样式 ========== */
.deck-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--line);
  margin-bottom: 20px;
}

.speaker-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.speaker-avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--brand-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 138, 61, 0.2);
  flex-shrink: 0;
}

.speaker-info {
  display: flex;
  flex-direction: column;
}

.speaker-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.speaker-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.deck-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
}

.speaker-desc {
  font-size: 13px;
  color: var(--ink-soft);
  margin: 2px 0 0;
}

.speaker-role {
  color: var(--ink-faint);
}

.view-switch {
  display: inline-flex;
  padding: 3px;
  border-radius: 999px;
  background: #f4ece4;
  border: 1px solid var(--line);
}

.switch-btn {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  color: var(--ink-soft);
  transition: all 0.15s ease;
}

.switch-btn.active {
  background: #ffffff;
  color: var(--brand-deep);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* 导航标签 */
.slide-nav-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}

.nav-tab-btn {
  flex: 1;
  min-width: 110px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #fbf7f2;
  border: 1px solid #ebd9c8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-tab-btn:hover {
  background: #f7ede2;
  border-color: #dfc3aa;
}

.nav-tab-btn.current {
  background: #ffffff;
  border-color: var(--brand);
  box-shadow: 0 3px 10px rgba(255, 138, 61, 0.18);
}

.tab-idx {
  font-size: 10px;
  font-weight: 700;
  color: var(--ink-faint);
  text-transform: uppercase;
}

.nav-tab-btn.current .tab-idx {
  color: var(--brand-deep);
}

.tab-tag {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
}

/* 幻灯片主卡片 */
.slide-card {
  border-radius: 16px;
  background: #ffffff;
  border: 1.5px solid #ebdccb;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(130, 80, 30, 0.06);
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0.6; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.slide-card-header {
  margin-bottom: 14px;
}

.slide-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.slide-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  background: var(--brand-soft);
  color: var(--brand-deep);
}

.slide-counter {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--ink-faint);
}

.slide-main-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.35;
}

/* 金句横幅 */
.takeaway-banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #fffaf3 0%, #fff2e4 100%);
  border-left: 4px solid var(--brand);
  border-radius: 8px;
  margin-bottom: 18px;
}

.takeaway-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.takeaway-text {
  font-size: 14.5px;
  color: #6d4b24;
  line-height: 1.55;
}

.takeaway-text strong {
  color: #442a10;
}

/* 主内容两栏网格 */
.slide-body-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 20px;
  align-items: start;
}

.slide-points-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.point-item-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: #fbf9f6;
  border: 1px solid #eee4d8;
  border-radius: 12px;
  transition: background 0.15s ease;
}

.point-item-card:hover {
  background: #f6f0e7;
}

.point-icon-box {
  font-size: 20px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}

.point-content {
  flex: 1;
}

.point-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 4px;
}

.point-desc {
  font-size: 13.5px;
  color: #5d4f43;
  line-height: 1.55;
}

.point-action-pill {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: #fef9c3;
  border: 1px dashed #ca8a04;
  font-size: 11.5px;
  color: #854d0e;
}

.action-icon {
  font-weight: 800;
  color: #a16207;
}

.action-text {
  font-weight: 600;
}

/* 视觉列与微观切片 */
.slide-visual-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.micro-photo-box {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2d7cc;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.micro-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.micro-caption {
  padding: 6px 10px;
  background: #faf6f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.micro-tag {
  font-weight: 700;
  color: #2b6cb0;
}

.micro-label {
  color: var(--ink-soft);
}

/* 演讲小贴士 */
.speaker-note-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 8px 14px;
  border-radius: 8px;
  background: #f0f7ff;
  border: 1px solid #cfe2ff;
  font-size: 12.5px;
  color: #1e4a7a;
}

.note-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* 翻页控制器 */
.deck-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 8px;
}

.control-btn {
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background: #ffffff;
  border: 1.5px solid #dcc8b6;
  color: var(--ink);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.15s ease;
  cursor: pointer;
}

.control-btn:hover:not(:disabled) {
  background: var(--brand-soft);
  border-color: var(--brand);
  color: var(--brand-deep);
  transform: translateY(-1px);
}

.control-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
}

.dots-indicator {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #decbbe;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot.active {
  width: 24px;
  border-radius: 5px;
  background: var(--brand);
}

/* 全景模式 */
.deck-all-view {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.overview-slide-card {
  border-radius: 14px;
  background: #ffffff;
  border: 1.5px solid #ebdccb;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(130, 80, 30, 0.05);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .slide-body-grid {
    grid-template-columns: 1fr;
  }
  .slide-main-title {
    font-size: 18px;
  }
  .deck-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .view-switch {
    width: 100%;
    justify-content: center;
  }
  .switch-btn {
    flex: 1;
    text-align: center;
  }
}

@media (max-width: 560px) {
  .story-wrapper {
    padding: 16px 12px;
  }
  .slide-card {
    padding: 16px 12px;
  }
  .deck-title {
    font-size: 16px;
  }
  .slide-main-title {
    font-size: 16.5px;
  }
  .takeaway-banner {
    padding: 10px 12px;
  }
  .takeaway-text {
    font-size: 13.5px;
  }
  .nav-tab-btn {
    min-width: 85px;
    padding: 6px 8px;
  }
  .point-item-card {
    padding: 10px 10px;
    gap: 8px;
  }
  .point-icon-box {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
  .point-title {
    font-size: 13.5px;
  }
  .point-desc {
    font-size: 12.5px;
  }
  .control-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
