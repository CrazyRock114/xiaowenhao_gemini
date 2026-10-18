<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { speakWord } from '../utils/speech'

export interface ModelPart {
  id: string
  nameZh: string
  nameEn: string
  desc?: string
  color?: string
  pos?: [number, number, number]
}

const props = withDefaults(
  defineProps<{
    modelUrl: string
    title?: string
    subtitle?: string
    autoRotate?: boolean
    height?: number
    parts?: ModelPart[]
    selectedPartId?: string | null
    bridgeLink?: string
    bridgeText?: string
  }>(),
  {
    title: '',
    subtitle: '',
    autoRotate: true,
    height: 480,
    parts: () => [],
    selectedPartId: null,
    bridgeLink: 'https://www.igcse.xyz/anatomy/0610/14-1-nervous-system',
    bridgeText: '母舰 3D 全屏解剖台 ➔',
  }
)

const emit = defineEmits<{
  (e: 'selectPart', id: string): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const loading = ref(true)
const loadProgress = ref(0)
const isAutoRotating = ref(props.autoRotate)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let currentModel: THREE.Group | null = null
let animFrameId: number | null = null

const activePart = computed(() => {
  if (!props.parts || !props.selectedPartId) return null
  return props.parts.find((p) => p.id === props.selectedPartId) || null
})

function initThree() {
  const container = containerRef.value
  if (!container) return

  const width = container.clientWidth || 600
  const height = props.height || 480

  // 1. Scene
  scene = new THREE.Scene()

  // 2. Camera
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
  camera.position.set(0, 0.4, 3.2)

  // 3. Renderer with Filmic tone mapping
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.appendChild(renderer.domElement)

  // 4. Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.autoRotate = isAutoRotating.value
  controls.autoRotateSpeed = 1.0
  controls.minDistance = 1.0
  controls.maxDistance = 6.0

  // 5. Lighting Setup (Master Ship 4-light standard for warm biological realism)
  const hemiLight = new THREE.HemisphereLight(0xfff4e6, 0xdbeafe, 0.7)
  scene.add(hemiLight)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1)
  scene.add(ambientLight)

  const dirKeyLight = new THREE.DirectionalLight(0xfff4e6, 1.8)
  dirKeyLight.position.set(3, 4, 2)
  scene.add(dirKeyLight)

  const dirFillLight = new THREE.DirectionalLight(0xdbeafe, 0.85)
  dirFillLight.position.set(-3, -1, -2)
  scene.add(dirFillLight)

  const dirRimLight = new THREE.DirectionalLight(0xffffff, 0.7)
  dirRimLight.position.set(0, 2, -3)
  scene.add(dirRimLight)

  // 6. Load Model
  loadModel(props.modelUrl)

  // 7. Animation Loop
  function animate() {
    animFrameId = requestAnimationFrame(animate)
    if (controls) controls.update()
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }
  animate()

  // 8. Resize Listener
  window.addEventListener('resize', onResize)
}

function loadModel(url: string) {
  if (!scene) return
  loading.value = true
  loadProgress.value = 0

  if (currentModel) {
    scene.remove(currentModel)
    currentModel.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh
        m.geometry.dispose()
        if (Array.isArray(m.material)) {
          m.material.forEach((mat) => mat.dispose())
        } else {
          m.material.dispose()
        }
      }
    })
    currentModel = null
  }

  const loader = new GLTFLoader()
  loader.load(
    url,
    (gltf) => {
      const model = gltf.scene
      currentModel = model

      // Center and normalize model size to fit viewport nicely
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())

      model.position.x += model.position.x - center.x
      model.position.y += model.position.y - center.y
      model.position.z += model.position.z - center.z

      const maxDim = Math.max(size.x, size.y, size.z)
      if (maxDim > 0) {
        const scale = 1.65 / maxDim
        model.scale.set(scale, scale, scale)
      }

      // Slightly tune materials for smooth organic biological look
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial
            if (mat.roughness !== undefined) {
              mat.roughness = THREE.MathUtils.clamp(mat.roughness, 0.4, 0.75)
            }
          }
        }
      })

      scene?.add(model)
      loading.value = false
    },
    (xhr) => {
      if (xhr.total > 0) {
        loadProgress.value = Math.round((xhr.loaded / xhr.total) * 100)
      }
    },
    (err) => {
      console.error('Failed to load 3D model:', err)
      loading.value = false
    }
  )
}

function onResize() {
  const container = containerRef.value
  if (!container || !renderer || !camera) return
  const width = container.clientWidth
  const height = props.height || 480
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function toggleAutoRotate() {
  isAutoRotating.value = !isAutoRotating.value
  if (controls) {
    controls.autoRotate = isAutoRotating.value
  }
}

function resetView() {
  if (!camera || !controls) return
  camera.position.set(0, 0.4, 3.2)
  controls.target.set(0, 0, 0)
  controls.update()
}

function handlePartClick(p: ModelPart) {
  emit('selectPart', p.id)
  if (p.nameEn) {
    speakWord(p.nameEn)
  }
}

watch(
  () => props.modelUrl,
  (newUrl) => {
    if (newUrl) loadModel(newUrl)
  }
)

onMounted(() => {
  initThree()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (animFrameId) cancelAnimationFrame(animFrameId)
  if (controls) controls.dispose()
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
})
</script>

<template>
  <div class="model-viewer-wrapper">
    <!-- 顶部状态栏 -->
    <div class="viewer-topbar">
      <div class="viewer-title">
        <span class="v-badge">🧊 3D WebGL 交互</span>
        <div class="title-text-group">
          <strong>{{ title || '3D 生物解剖观察器' }}</strong>
          <small v-if="subtitle" class="title-sub">{{ subtitle }}</small>
        </div>
      </div>

      <div class="viewer-actions">
        <!-- 直通母舰全屏解剖实验室胶囊 -->
        <a
          v-if="bridgeLink"
          :href="bridgeLink"
          target="_blank"
          rel="noopener noreferrer"
          class="ship-bridge-btn"
          title="跳转至 IGCSE 教学母舰全屏 3D 解剖实验室"
        >
          <span>🏛️</span>
          <span>{{ bridgeText }}</span>
        </a>

        <button
          type="button"
          class="action-btn"
          :class="{ active: isAutoRotating }"
          :title="isAutoRotating ? '暂停自动旋转' : '开启自动旋转'"
          @click="toggleAutoRotate"
        >
          {{ isAutoRotating ? '⏸ 旋转' : '▶ 旋转' }}
        </button>
        <button
          type="button"
          class="action-btn"
          title="重置居中视角"
          @click="resetView"
        >
          🔄 重置
        </button>
      </div>
    </div>

    <!-- 3D Canvas 容器 -->
    <div
      ref="containerRef"
      class="canvas-box"
      :style="{ height: `${height}px` }"
    >
      <!-- 加载提示 -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p class="loading-text">正在从教学母舰加载高精度 3D 解剖模型...</p>
        <div v-if="loadProgress > 0" class="progress-bar">
          <div class="progress-fill" :style="{ width: `${loadProgress}%` }"></div>
        </div>
      </div>

      <!-- 操作手势提示遮罩 -->
      <div class="gesture-hint">
        <span>🖱️ 拖拽按住可 360° 任意旋转 · 滚轮缩放大小</span>
      </div>

      <!-- 部件聚焦浮动解说卡片 (当选中某个部件时在画布右上角展示) -->
      <div v-if="activePart" class="part-float-card anim-pop">
        <div class="part-card-head">
          <div class="part-name-row">
            <span class="part-name-zh">{{ activePart.nameZh }}</span>
            <span class="part-name-en">{{ activePart.nameEn }}</span>
            <button
              type="button"
              class="speak-btn"
              title="英文发音"
              @click="speakWord(activePart.nameEn)"
            >
              🔊
            </button>
          </div>
          <span class="part-live-tag">当前聚焦部件</span>
        </div>
        <p v-if="activePart.desc" class="part-desc-text">
          {{ activePart.desc }}
        </p>
      </div>
    </div>

    <!-- 底部结构部件选择药丸 -->
    <div v-if="parts && parts.length" class="parts-pills-bar">
      <span class="pills-title">解剖部件聚焦：</span>
      <div class="pills-scroll">
        <button
          v-for="p in parts"
          :key="p.id"
          type="button"
          class="part-pill"
          :class="{ active: selectedPartId === p.id }"
          @click="handlePartClick(p)"
        >
          <span class="p-zh">{{ p.nameZh }}</span>
          <span class="p-en">{{ p.nameEn }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.model-viewer-wrapper {
  background: #090d14;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

.viewer-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(18, 24, 38, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  flex-wrap: wrap;
  gap: 10px;
}

.viewer-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #f1ece4;
}

.v-badge {
  font-size: 11px;
  font-weight: 800;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.5px;
}

.title-text-group {
  display: flex;
  flex-direction: column;
}

.title-text-group strong {
  font-size: 13.5px;
  color: #f8fafc;
}

.title-sub {
  font-size: 11px;
  color: #94a3b8;
}

.viewer-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ship-bridge-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(99, 102, 241, 0.25) 100%);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #7dd3fc;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.ship-bridge-btn:hover {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(99, 102, 241, 0.4) 100%);
  border-color: #38bdf8;
  color: #ffffff;
  transform: translateY(-1px);
}

.action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

.action-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #38bdf8;
}

.canvas-box {
  position: relative;
  width: 100%;
  background: radial-gradient(circle at 50% 50%, #172133 0%, #080b10 100%);
  cursor: grab;
}

.canvas-box:active {
  cursor: grabbing;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(9, 13, 20, 0.88);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  gap: 12px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(56, 189, 248, 0.2);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 12.5px;
  color: #94a3b8;
  font-weight: 600;
}

.progress-bar {
  width: 180px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #38bdf8;
  transition: width 0.2s ease;
}

.gesture-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  backdrop-filter: blur(8px);
  z-index: 5;
  white-space: nowrap;
}

/* 浮动卡片 */
.part-float-card {
  position: absolute;
  top: 14px;
  right: 14px;
  max-width: 320px;
  background: rgba(15, 23, 42, 0.92);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 12px;
  padding: 12px 14px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 8;
}

.part-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  gap: 8px;
}

.part-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.part-name-zh {
  font-size: 14px;
  font-weight: 800;
  color: #38bdf8;
}

.part-name-en {
  font-size: 12px;
  color: #cbd5e1;
}

.speak-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  opacity: 0.8;
}

.speak-btn:hover {
  opacity: 1;
}

.part-live-tag {
  font-size: 9.5px;
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 1px 6px;
  border-radius: 999px;
  font-weight: 700;
}

.part-desc-text {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: #e2e8f0;
}

/* 底部药丸 */
.parts-pills-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
}

.pills-title {
  font-size: 11.5px;
  color: #94a3b8;
  font-weight: 700;
  white-space: nowrap;
}

.pills-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.part-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 5px 11px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.part-pill:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.part-pill.active {
  background: #0284c7;
  border-color: #38bdf8;
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
}

.p-en {
  font-size: 10.5px;
  opacity: 0.8;
}

.anim-pop {
  animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
