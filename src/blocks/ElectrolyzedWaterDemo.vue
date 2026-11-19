<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  block: { title?: string; instruction?: string }
  issueId?: string
}>()

type WaterModeId = 'weak-acid' | 'strong-acid' | 'carbonated' | 'neutral' | 'alkaline-soap'
type SkinSceneId = 'healthy' | 'mild-sunburn' | 'blister-sunburn' | 'acne'

interface WaterMode {
  id: WaterModeId
  label: string
  emoji: string
  ph: number
  phColor: string
  bubbleGas: string
  keySpecies: string
  drinkable: boolean
  principle: string
}

const waterModes: WaterMode[] = [
  {
    id: 'weak-acid',
    label: '弱酸性电解水',
    emoji: '💧',
    ph: 5.5,
    phColor: '#84cc16',
    bubbleGas: '微量氧气 (O₂) 细泡',
    keySpecies: 'H⁺ 略多（贴合皮肤天然 pH 5.5）',
    drinkable: false,
    principle: '电解槽阳极氧化水产生少量 H⁺ 与 O₂ 气泡，pH 约 5.5，刚好与健康皮肤皮脂膜酸碱度一致。',
  },
  {
    id: 'strong-acid',
    label: '强酸性/次氯酸水',
    emoji: '🧪',
    ph: 2.7,
    phColor: '#ef4444',
    bubbleGas: 'O₂ 气泡 + 微量次氯酸 (HOCl)',
    keySpecies: '大量 H⁺ + 次氯酸 (HOCl，强抑菌)',
    drinkable: false,
    principle: '水中含微量氯离子时，阳极会生成次氯酸（HOCl）并使 pH 降至 2.5~3.0。抑菌力强但刺激性高，严禁饮用！',
  },
  {
    id: 'carbonated',
    label: '气泡碳酸水',
    emoji: '🫧',
    ph: 4.5,
    phColor: '#f59e0b',
    bubbleGas: '大量二氧化碳 (CO₂) 气泡',
    keySpecies: '碳酸 (H₂CO₃) 弱酸',
    drinkable: true,
    principle: '把 CO₂ 气体加压压入水中生成碳酸（H₂O + CO₂ ⇌ H₂CO₃）。开盖放久后 CO₂ 跑光，酸味和气泡都会消失！',
  },
  {
    id: 'neutral',
    label: '普通凉白开',
    emoji: '🚰',
    ph: 7.0,
    phColor: '#22c55e',
    bubbleGas: '无明显气泡',
    keySpecies: '中性水分子 (H₂O)',
    drinkable: true,
    principle: '酸碱中性（pH ≈ 7.0），温和无刺激，晒后发烫时直接冷敷降温安全又有效。',
  },
  {
    id: 'alkaline-soap',
    label: '强碱性肥皂水',
    emoji: '🧼',
    ph: 9.5,
    phColor: '#6366f1',
    bubbleGas: '肥皂泡沫',
    keySpecies: 'OH⁻ 氢氧根离子偏多',
    drinkable: false,
    principle: '去油力强，但频繁用来洗脸会冲走弱酸性皮脂膜，让皮肤紧绷干燥、屏障受损。',
  },
]

const skinScenes: { id: SkinSceneId; label: string; emoji: string; desc: string }[] = [
  { id: 'healthy', label: '健康皮肤', emoji: '😊', desc: '表面有完整弱酸性保护膜（pH 4.5~5.5）' },
  { id: 'mild-sunburn', label: '轻度晒红发烫', emoji: '🥵', desc: '紫外线引发轻度炎症，表皮完整无破口' },
  { id: 'blister-sunburn', label: '起泡/破皮晒伤', emoji: '🩹', desc: '皮肤屏障已破损，神经末梢暴露' },
  { id: 'acne', label: '出油长青春痘', emoji: '🔴', desc: '毛孔堵塞发炎，痤疮丙酸杆菌繁殖' },
]

const selectedWater = ref<WaterModeId>('weak-acid')
const selectedSkin = ref<SkinSceneId>('mild-sunburn')

const water = computed(() => waterModes.find((m) => m.id === selectedWater.value) ?? waterModes[0])

const phPercent = computed(() => Math.min(100, Math.max(0, (water.value.ph / 14) * 100)))

const outcome = computed(() => {
  const w = selectedWater.value
  const s = selectedSkin.value

  if (s === 'blister-sunburn') {
    if (w === 'neutral') {
      return {
        level: 'ok',
        badge: '✅ 相对安全（需轻柔冷敷）',
        title: '干净凉水轻敷可降温，切勿戳破水泡',
        detail: '破皮或起水泡属于中重度晒伤！应先温和降温，保持清洁并及时请家长带去医院皮肤科处理。',
      }
    }
    return {
      level: 'danger',
      badge: '🚨 严禁涂抹！会刺痛加重损伤',
      title: '破损皮肤不能涂酸水、碳酸水或肥皂水',
      detail: '皮肤屏障已经破洞，酸性/次氯酸或碱性液体会直接刺激暴露的真皮组织，引起剧痛甚至二次化学刺激！',
    }
  }

  if (s === 'mild-sunburn') {
    if (w === 'weak-acid' || w === 'neutral') {
      return {
        level: 'ok',
        badge: '🟡 仅能温和冷敷舒缓，不能“治好”晒伤',
        title: '舒服是因为“凉水降温 + pH 温和”',
        detail: '水分蒸发带走热量能缓解发烫，弱酸 pH 5.5 也不刺激完好皮肤；但修复紫外线损伤仍需保湿乳（如芦荟胶/凡士林）与严格防晒。',
      }
    }
    if (w === 'strong-acid') {
      return {
        level: 'danger',
        badge: '⚠️ 酸性过强（pH 2.7），不建议敷晒红皮肤',
        title: '晒后皮肤非常脆弱，强酸易引发刺痛脱皮',
        detail: '强酸性电解水更适合器具表面消毒，直接湿敷晒红发炎的脸部容易破坏角质层屏障。',
      }
    }
    if (w === 'carbonated') {
      return {
        level: 'warn',
        badge: '🟡 冰凉感明显，但无治疗晒伤作用',
        title: 'CO₂ 气泡不会修复被紫外线照伤的细胞',
        detail: '碳酸水冰凉清爽，但对晒后泛红的修复效果不如干净冷毛巾 + 温和保湿霜。',
      }
    }
    return {
      level: 'danger',
      badge: '❌ 不推荐',
      title: '强碱性肥皂会进一步破坏晒后脆弱屏障',
      detail: '洗掉天然油脂后皮肤会更干更紧绷，加重晒后脱皮。',
    }
  }

  if (s === 'acne') {
    if (w === 'weak-acid') {
      return {
        level: 'ok',
        badge: '🟢 温和洁面友好，但不能替代治痘',
        title: '贴合皮肤弱酸保护膜，减少洗脸刺激',
        detail: '弱酸性水（pH 5.5）不会像强碱肥皂那样过度脱脂；但青春痘根源在油脂分泌与毛囊堵塞发炎，不能靠酸水根治。',
      }
    }
    if (w === 'strong-acid') {
      return {
        level: 'warn',
        badge: '🟡 微量次氯酸有表面抑菌力，但易刺激皮肤',
        title: '可短暂抑制表层细菌，切忌当特效药狂敷',
        detail: '次氯酸（HOCl）确实能杀灭部分表面细菌，但 pH 过低且无法疏通毛囊深处堵塞，频繁使用易导致皮肤干燥脱屑。',
      }
    }
    if (w === 'carbonated') {
      return {
        level: 'warn',
        badge: '🟡 仅有短暂清爽感，抑痘证据不足',
        title: '碳酸气泡洗脸无法杀灭毛囊里的痤疮杆菌',
        detail: '二氧化碳气泡在皮肤表面瞬间散逸，对青春痘没有治疗作用。',
      }
    }
    if (w === 'neutral') {
      return {
        level: 'ok',
        badge: '🟢 日常温和清洁基础',
        title: '温水配合温和洁面，规律作息、少挤痘',
        detail: '如果青春痘红肿严重，应前往皮肤科使用经过临床验证的规范外用药。',
      }
    }
    return {
      level: 'danger',
      badge: '❌ 越洗越容易爆痘',
      title: '强碱过度去油会破坏弱酸膜、加重炎症',
      detail: '健康皮肤怕强碱，破坏 pH 5.5 保护膜反而让有害细菌更容易趁虚而入。',
    }
  }

  // healthy skin
  if (w === 'weak-acid' || w === 'neutral') {
    return {
      level: 'ok',
      badge: '🟢 温和友好',
      title: '与健康皮肤的弱酸性保护膜和平共处',
      detail: '健康皮肤表面天然维持在 pH 4.5~5.5，弱酸性水或清水冲洗都非常温和。',
    }
  }
  if (w === 'carbonated') {
    return {
      level: 'ok',
      badge: '🟢 偶尔洗脸清爽，可正常饮用',
      title: '无糖气泡水可饮用，但并非护肤神水',
      detail: '碳酸水微酸清爽，但注意饮用过多含糖碳酸饮料会腐蚀牙齿珐琅质哦！',
    }
  }
  if (w === 'strong-acid') {
    return {
      level: 'warn',
      badge: '⚠️ 仅限外用清洁，严禁入口饮用',
      title: '次氯酸电解水适合桌面/瓜果表面消毒',
      detail: '酸性较强且含氧化性成分，不宜长期直接湿敷娇嫩的儿童面部皮肤。',
    }
  }
  return {
    level: 'warn',
    badge: '🟡 偶尔洗手去油可以，洗脸容易拔干',
    title: '碱性肥皂会暂时拉高皮肤表面 pH',
    detail: '去污力强但容易带走保护皮肤的天然皮脂膜。',
  }
})
</script>

<template>
  <section class="card ew-demo">
    <div class="demo-head">
      <span class="demo-tag">🧪 互动科学实验台</span>
      <h3 class="demo-title">{{ block.title || '电解酸碱水与皮肤 pH 实验室' }}</h3>
      <p v-if="block.instruction" class="demo-inst">{{ block.instruction }}</p>
    </div>

    <!-- 1. 选水模式 -->
    <div class="control-group">
      <div class="ctrl-label">① 切换饮水机 / 水源模式：</div>
      <div class="btn-row">
        <button
          v-for="m in waterModes"
          :key="m.id"
          type="button"
          class="mode-btn"
          :class="{ active: selectedWater === m.id }"
          @click="selectedWater = m.id"
        >
          <span>{{ m.emoji }}</span>
          <span>{{ m.label }}</span>
        </button>
      </div>
    </div>

    <!-- 2. 可视化装置 + pH 标尺 -->
    <div class="lab-stage">
      <div class="chamber-box">
        <svg viewBox="0 0 340 175" class="chamber-svg" aria-label="电解与气泡生成示意图">
          <defs>
            <linearGradient id="acidBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="water.ph < 6.5 ? '#fef3c7' : water.ph > 7.5 ? '#e0e7ff' : '#dcfce7'" />
              <stop offset="100%" :stop-color="water.ph < 6.5 ? '#fde68a' : water.ph > 7.5 ? '#c7d2fe' : '#bbf7d0'" />
            </linearGradient>
          </defs>

          <!-- 容器外壳 -->
          <rect x="20" y="16" width="300" height="142" rx="16" fill="url(#acidBg)" stroke="#d6c5b3" stroke-width="2.5" />

          <!-- 电解槽模式（弱酸/强酸） -->
          <template v-if="selectedWater === 'weak-acid' || selectedWater === 'strong-acid'">
            <!-- 隔膜 -->
            <line x1="170" y1="24" x2="170" y2="152" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6 4" />
            <text x="170" y="169" text-anchor="middle" font-size="11" fill="#64748b" font-weight="700">离子交换膜</text>

            <!-- 左：阳极（酸性侧） -->
            <rect x="46" y="42" width="14" height="92" rx="4" fill="#ef4444" />
            <text x="53" y="34" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="800">阳极 (+)</text>
            <text x="112" y="54" text-anchor="middle" font-size="12" fill="#b45309" font-weight="800">酸性出水口</text>
            <text x="112" y="74" text-anchor="middle" font-size="11" fill="#78350f">H⁺ 富集 · 冒 O₂ 泡</text>
            <text v-if="selectedWater === 'strong-acid'" x="112" y="92" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="700">+ 微量 HOCl 次氯酸</text>
            <circle cx="72" cy="118" r="5" fill="#fff" opacity="0.85" class="bub b1" />
            <circle cx="84" cy="96" r="4" fill="#fff" opacity="0.85" class="bub b2" />
            <circle cx="66" cy="82" r="3.5" fill="#fff" opacity="0.85" class="bub b3" />

            <!-- 右：阴极（碱性侧） -->
            <rect x="280" y="42" width="14" height="92" rx="4" fill="#3b82f6" />
            <text x="287" y="34" text-anchor="middle" font-size="12" fill="#2563eb" font-weight="800">阴极 (-)</text>
            <text x="226" y="54" text-anchor="middle" font-size="12" fill="#1d4ed8" font-weight="800">碱性出水口</text>
            <text x="226" y="74" text-anchor="middle" font-size="11" fill="#1e3a8a">OH⁻ 富集 · 冒 H₂ 泡</text>
            <circle cx="264" cy="116" r="4.5" fill="#fff" opacity="0.8" class="bub b2" />
            <circle cx="256" cy="90" r="3.5" fill="#fff" opacity="0.8" class="bub b1" />
          </template>

          <!-- 碳酸水模式 -->
          <template v-else-if="selectedWater === 'carbonated'">
            <rect x="148" y="10" width="44" height="24" rx="6" fill="#475569" />
            <text x="170" y="26" text-anchor="middle" font-size="11" fill="#fff" font-weight="800">CO₂ 气阀</text>
            <text x="170" y="64" text-anchor="middle" font-size="13" fill="#92400e" font-weight="800">H₂O + CO₂ ⇌ H₂CO₃（碳酸）</text>
            <text x="170" y="86" text-anchor="middle" font-size="11.5" fill="#78350f">高压压入大量二氧化碳气泡，开盖后逐渐逃逸</text>
            <circle cx="95" cy="130" r="6" fill="#fff" opacity="0.9" class="bub b1" />
            <circle cx="140" cy="118" r="5" fill="#fff" opacity="0.9" class="bub b2" />
            <circle cx="185" cy="134" r="6.5" fill="#fff" opacity="0.9" class="bub b3" />
            <circle cx="235" cy="120" r="4.5" fill="#fff" opacity="0.9" class="bub b1" />
            <circle cx="265" cy="136" r="5" fill="#fff" opacity="0.9" class="bub b2" />
          </template>

          <!-- 中性/碱性模式 -->
          <template v-else>
            <text x="170" y="76" text-anchor="middle" font-size="15" fill="#334155" font-weight="800">
              {{ selectedWater === 'neutral' ? '💧 纯净中性水（H⁺ 与 OH⁻ 平衡）' : '🧼 肥皂碱性溶液（OH⁻ 氢氧根占优）' }}
            </text>
            <text x="170" y="102" text-anchor="middle" font-size="12" fill="#475569">
              {{ selectedWater === 'neutral' ? 'pH = 7.0 · 温和无刺激 · 可安全饮用或冷敷' : 'pH = 9.5 · 去油力强 · 容易洗掉皮肤弱酸保护膜' }}
            </text>
          </template>
        </svg>

        <!-- pH 标尺 -->
        <div class="ph-meter">
          <div class="ph-top">
            <span class="ph-label">pH 酸碱试纸读数</span>
            <span class="ph-val" :style="{ background: water.phColor }">pH {{ water.ph.toFixed(1) }}</span>
          </div>
          <div class="ph-bar">
            <div class="ph-pointer" :style="{ left: `${phPercent}%` }" />
          </div>
          <div class="ph-ticks">
            <span>0 强酸</span>
            <span class="skin-zone">4.5~5.5 皮肤区</span>
            <span>7 中性</span>
            <span>14 强碱</span>
          </div>
        </div>
      </div>

      <div class="info-box">
        <div class="info-row">
          <span class="info-k">🫧 气泡成分</span>
          <span class="info-v">{{ water.bubbleGas }}</span>
        </div>
        <div class="info-row">
          <span class="info-k">⚗️ 核心微粒</span>
          <span class="info-v">{{ water.keySpecies }}</span>
        </div>
        <div class="info-row">
          <span class="info-k">🥤 能否饮用</span>
          <span class="info-v" :class="water.drinkable ? 'txt-ok' : 'txt-danger'">
            {{ water.drinkable ? '✅ 可正常饮用' : '🚫 不可直接饮用（外用/清洁）' }}
          </span>
        </div>
        <p class="principle-text">{{ water.principle }}</p>
      </div>
    </div>

    <!-- 3. 皮肤场景测试 -->
    <div class="control-group mt-14">
      <div class="ctrl-label">② 把这种水涂到不同皮肤上试试看：</div>
      <div class="btn-row">
        <button
          v-for="s in skinScenes"
          :key="s.id"
          type="button"
          class="skin-btn"
          :class="{ active: selectedSkin === s.id }"
          @click="selectedSkin = s.id"
        >
          <span>{{ s.emoji }}</span>
          <span>{{ s.label }}</span>
        </button>
      </div>
    </div>

    <!-- 4. 科学结论反馈 -->
    <div class="outcome-card" :class="`lvl-${outcome.level}`">
      <div class="out-badge">{{ outcome.badge }}</div>
      <h4 class="out-title">{{ outcome.title }}</h4>
      <p class="out-detail">{{ outcome.detail }}</p>
    </div>
  </section>
</template>

<style scoped>
.ew-demo {
  border: 2px solid var(--brand-soft);
  background: linear-gradient(180deg, #fff 0%, #fffcf7 100%);
}

.demo-head {
  margin-bottom: 14px;
}

.demo-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.demo-title {
  font-size: 19px;
  color: var(--ink);
}

.demo-inst {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 4px 0 0;
}

.control-group {
  margin-bottom: 14px;
}

.mt-14 {
  margin-top: 16px;
}

.ctrl-label {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mode-btn,
.skin-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 999px;
  background: #f7f1e8;
  border: 1.5px solid var(--line);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  transition: all 0.15s ease;
}

.mode-btn:hover,
.skin-btn:hover {
  border-color: var(--brand);
  background: #fff;
}

.mode-btn.active,
.skin-btn.active {
  background: var(--brand-soft);
  border-color: var(--brand-deep);
  color: var(--brand-deep);
}

.lab-stage {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 14px;
  align-items: stretch;
}

.chamber-box,
.info-box {
  background: #fff;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  padding: 12px;
}

.chamber-svg {
  width: 100%;
  height: auto;
  display: block;
}

.bub {
  animation: rise 2.2s ease-in infinite;
}
.b2 { animation-delay: 0.7s; }
.b3 { animation-delay: 1.3s; }

@keyframes rise {
  0% { transform: translateY(0); opacity: 0.9; }
  100% { transform: translateY(-34px); opacity: 0; }
}

.ph-meter {
  margin-top: 8px;
}

.ph-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.ph-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-soft);
}

.ph-val {
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  padding: 2px 9px;
  border-radius: 999px;
}

.ph-bar {
  position: relative;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #84cc16 39%, #22c55e 50%, #3b82f6 75%, #7c3aed 100%);
}

.ph-pointer {
  position: absolute;
  top: -4px;
  width: 6px;
  height: 20px;
  background: #1e293b;
  border: 2px solid #fff;
  border-radius: 4px;
  transform: translateX(-50%);
  transition: left 0.25s ease;
}

.ph-ticks {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-soft);
  margin-top: 5px;
}

.skin-zone {
  color: #4d7c0f;
  font-weight: 700;
}

.info-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--line);
}

.info-k {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink-soft);
}

.info-v {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}

.txt-ok { color: var(--ok); }
.txt-danger { color: var(--danger); }

.principle-text {
  font-size: 12.5px;
  color: var(--ink-soft);
  line-height: 1.55;
  margin: 2px 0 0;
}

.outcome-card {
  border-radius: 14px;
  padding: 14px 16px;
  border: 2px solid var(--line);
}

.lvl-ok {
  background: var(--ok-soft);
  border-color: #86efac;
}

.lvl-warn {
  background: #fffbeb;
  border-color: #fcd34d;
}

.lvl-danger {
  background: var(--danger-soft);
  border-color: #fca5a5;
}

.out-badge {
  font-size: 12.5px;
  font-weight: 800;
  margin-bottom: 4px;
}

.out-title {
  font-size: 15.5px;
  color: var(--ink);
  margin: 0 0 4px;
}

.out-detail {
  font-size: 13.5px;
  color: var(--ink);
  margin: 0;
  line-height: 1.55;
}

@media (max-width: 640px) {
  .lab-stage {
    grid-template-columns: 1fr;
  }
}
</style>
