<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const modalImgSrc = ref('')
const modalTitle = ref('')

function openImage(src: string, title: string) {
  modalImgSrc.value = src
  modalTitle.value = title
  showModal.value = true
}

const agents = [
  {
    id: 'doubao21pro',
    name: '豆包 2.1 Pro 版',
    badge: '互动模拟与按图索骥',
    color: '#E5484D',
    summary: '单文件完整打包，内置放电公式滑动条模拟器与原海报 33 个热点导航定位，附带详实的自审说明。',
    path: '/agents-showcase/doubao21pro/',
    tags: ['单文件HTML', '33个热点', '电位模拟器'],
  },
  {
    id: 'glm53flash',
    name: 'GLM 5.3 Flash 版',
    badge: '中英双语切换',
    color: '#3B82F6',
    summary: '支持双语/中文/EN三态一键切换，对 8 大感觉输入、视觉识别流水线及神经元数字进行清单式呈现。',
    path: '/agents-showcase/glm53flash/',
    tags: ['双语/中文/EN', '视觉流水线', '高保真'],
  },
  {
    id: 'argon',
    name: 'Argon 版',
    badge: '学术审校之王',
    color: '#8B5CF6',
    summary: '学术严谨度极高！详尽剖析了动作电位相对去极化阈值与绝对膜电位差异，对原海报作者的宗教/哲学词汇进行了认知神经科学映射。',
    path: '/agents-showcase/argon/',
    tags: ['学术深度审校', '数据解耦', '专业级'],
  },
  {
    id: 'm31flash',
    name: 'M3.1 Flash 版',
    badge: '高保真海报对照',
    color: '#10B981',
    summary: '采用黑金科幻视觉，对原海报所有版块、引文墙和脑区标注进行了严谨的中英双语逐句对照。',
    path: '/agents-showcase/m31flash/',
    tags: ['黑金科幻风', '逐句双语对照', '完整引文'],
  },
]
</script>

<template>
  <section class="showcase-section card">
    <div class="showcase-head">
      <div class="showcase-title-row">
        <span class="showcase-badge">🤖 多 Agent 脑科学原版展廊</span>
        <h3 class="showcase-title">探索不同 AI Agent 的硬核原版作品</h3>
      </div>
      <p class="showcase-desc">
        在小问号百科为孩子做童趣与双轨降维转化之前，四位 AI 专家 Agent 分别基于原版航天工程师海报制作了各自的硬核科普站。点击即可直接原样打开浏览！
      </p>
    </div>

    <!-- ChatGPT 全景图特置卡片 -->
    <div class="chatgpt-card">
      <div class="chatgpt-thumb-wrap" @click="openImage('/assets/brain-diagram-overview.jpg', 'ChatGPT：更细化的大脑结构与功能全景图')">
        <img src="/assets/brain-diagram-overview.jpg" alt="ChatGPT 大脑全景图" class="chatgpt-thumb" />
        <span class="zoom-pill">🔍 点击放大全景图</span>
      </div>
      <div class="chatgpt-info">
        <div class="cg-badge">🎨 ChatGPT 核心参考全景图</div>
        <h4 class="cg-title">《更细化的大脑结构与功能示意图》</h4>
        <p class="cg-text">
          系统梳理了四大脑叶（额/顶/枕/颞）、小脑、脑干以及边缘系统（丘脑、下丘脑、海马体、杏仁核），并首次明确提出了语言、记忆、注意执行、情绪调节四大协同网络。
        </p>
        <div class="cg-actions">
          <a
            href="/assets/brain-diagram-overview.jpg"
            target="_blank"
            rel="noopener noreferrer"
            class="cg-btn"
          >
            新窗口查看超清原图 ➔
          </a>
        </div>
      </div>
    </div>

    <!-- 4 大 Agent 作品卡片网格 -->
    <div class="agents-grid">
      <div
        v-for="ag in agents"
        :key="ag.id"
        class="agent-card"
        :style="{ '--ag-c': ag.color }"
      >
        <div class="agent-top">
          <span class="agent-tag">{{ ag.badge }}</span>
          <h4 class="agent-name">{{ ag.name }}</h4>
        </div>
        <p class="agent-summary">{{ ag.summary }}</p>
        <div class="agent-chips">
          <span v-for="t in ag.tags" :key="t" class="tag-pill">{{ t }}</span>
        </div>
        <div class="agent-bottom">
          <a
            :href="ag.path"
            target="_blank"
            rel="noopener noreferrer"
            class="agent-link"
          >
            原样在线体验 ➔
          </a>
        </div>
      </div>
    </div>

    <!-- 全景图模态弹窗 -->
    <Teleport to="body">
      <div v-if="showModal" class="img-modal-backdrop" @click="showModal = false">
        <div class="img-modal-content" @click.stop>
          <div class="modal-head">
            <span class="modal-title">{{ modalTitle }}</span>
            <button type="button" class="modal-close" @click="showModal = false">✕</button>
          </div>
          <div class="modal-body">
            <img :src="modalImgSrc" alt="全景图大图" class="modal-img" />
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.showcase-section {
  background: #fbf8f3;
  border: 2px dashed #ded4c5;
  border-radius: 20px;
  padding: 24px;
  margin-top: 28px;
}

.showcase-head {
  margin-bottom: 20px;
}

.showcase-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #8b5cf6;
  background: #f3e8ff;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.showcase-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--ink);
  margin: 0;
}

.showcase-desc {
  font-size: 13.5px;
  color: var(--ink-soft);
  line-height: 1.55;
  margin: 8px 0 0;
  max-width: 800px;
}

.chatgpt-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

@media (max-width: 720px) {
  .chatgpt-card {
    flex-direction: column;
    align-items: flex-start;
  }
}

.chatgpt-thumb-wrap {
  position: relative;
  width: 220px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  border: 1px solid var(--line);
}

.chatgpt-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.chatgpt-thumb-wrap:hover .chatgpt-thumb {
  transform: scale(1.05);
}

.zoom-pill {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}

.chatgpt-info {
  flex: 1;
}

.cg-badge {
  font-size: 11.5px;
  font-weight: 800;
  color: #0284c7;
}

.cg-title {
  font-size: 17px;
  font-weight: 900;
  color: var(--ink);
  margin: 4px 0 6px;
}

.cg-text {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0 0 12px;
}

.cg-btn {
  display: inline-block;
  padding: 6px 14px;
  background: #0284c7;
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 800;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s ease;
}

.cg-btn:hover {
  background: #0369a1;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.agent-card {
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-top: 4px solid var(--ag-c);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.agent-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.agent-tag {
  font-size: 11px;
  font-weight: 800;
  color: var(--ag-c);
}

.agent-name {
  font-size: 16px;
  font-weight: 900;
  color: var(--ink);
  margin: 2px 0 8px;
}

.agent-summary {
  font-size: 12.5px;
  color: var(--ink);
  line-height: 1.5;
  margin: 0 0 12px;
  flex: 1;
}

.agent-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 14px;
}

.tag-pill {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink-faint);
  background: #f5efe6;
  padding: 2px 7px;
  border-radius: 6px;
}

.agent-link {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 8px 0;
  background: #faf6f0;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  color: var(--ink);
  font-size: 12.5px;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.15s ease;
}

.agent-link:hover {
  background: var(--ag-c);
  color: #ffffff;
  border-color: var(--ag-c);
}

.img-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 100000;
  display: grid;
  place-items: center;
  padding: 20px;
}

.img-modal-content {
  background: #ffffff;
  border-radius: 16px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #f7f4ee;
  border-bottom: 1px solid var(--line);
}

.modal-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}

.modal-body {
  overflow: auto;
  padding: 10px;
  display: grid;
  place-items: center;
}

.modal-img {
  max-width: 100%;
  max-height: calc(85vh - 60px);
  object-fit: contain;
}
</style>
