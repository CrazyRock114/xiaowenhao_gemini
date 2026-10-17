<script setup lang="ts">
/** 故事块的简单插画（纯 SVG，三种场景） */
defineProps<{ kind: 'jars' | 'microscope' | 'flow' }>()
</script>

<template>
  <svg v-if="kind === 'jars'" viewBox="0 0 320 150" class="illus" role="img" aria-label="陶坛与酒酿">
    <!-- 坛子 -->
    <path d="M60 70 Q55 55 75 52 L165 52 Q185 55 180 70 L188 120 Q190 138 165 138 L75 138 Q50 138 52 120 Z" fill="#c97b4a" />
    <path d="M60 70 Q55 55 75 52 L165 52 Q185 55 180 70 L182 82 L58 82 Z" fill="#b3653a" />
    <rect x="70" y="40" width="100" height="14" rx="6" fill="#8a5230" />
    <!-- 米粒 -->
    <ellipse cx="98" cy="108" rx="9" ry="5" fill="#fff" opacity=".9" transform="rotate(-18 98 108)" />
    <ellipse cx="122" cy="116" rx="9" ry="5" fill="#fff" opacity=".8" transform="rotate(14 122 116)" />
    <ellipse cx="146" cy="106" rx="9" ry="5" fill="#fff" opacity=".9" transform="rotate(-6 146 106)" />
    <!-- 香气 -->
    <path d="M108 34 q6 -8 0 -14 q-6 -6 0 -12" stroke="#ffb066" stroke-width="3.5" fill="none" stroke-linecap="round" class="steam s1" />
    <path d="M132 38 q6 -8 0 -14 q-6 -6 0 -12" stroke="#ffb066" stroke-width="3.5" fill="none" stroke-linecap="round" class="steam s2" />
    <!-- 小碗 -->
    <path d="M232 96 L312 96 Q308 122 272 122 Q236 122 232 96 Z" fill="#7bb2e8" />
    <ellipse cx="272" cy="96" rx="40" ry="8" fill="#a8cdf0" />
    <ellipse cx="272" cy="95" rx="30" ry="5.5" fill="#fdf6ec" />
    <circle cx="258" cy="92" r="2.4" fill="#fff" opacity=".9" class="bub1" />
    <circle cx="276" cy="90" r="2" fill="#fff" opacity=".9" class="bub2" />
    <circle cx="288" cy="93" r="1.7" fill="#fff" opacity=".9" class="bub3" />
    <text x="272" y="144" text-anchor="middle" font-size="12" fill="#8a7666">甜滋滋，冒泡泡</text>
  </svg>

  <svg v-else-if="kind === 'microscope'" viewBox="0 0 320 150" class="illus" role="img" aria-label="显微镜下的微生物">
    <!-- 载玻片 -->
    <rect x="176" y="96" width="120" height="16" rx="4" fill="#dfeefc" transform="skewX(-12)" />
    <!-- 显微镜 -->
    <path d="M60 132 L104 132 L96 100 L84 100 Z" fill="#6f7ba8" />
    <path d="M70 100 L94 100 L88 62 L76 62 Z" fill="#8d99c4" />
    <rect x="74" y="30" width="16" height="34" rx="6" fill="#6f7ba8" transform="rotate(18 82 47)" />
    <circle cx="70" cy="66" r="9" fill="#5d6894" />
    <circle cx="112" cy="118" r="12" fill="#4d587f" />
    <!-- 微生物们 -->
    <g class="cell">
      <circle cx="196" cy="72" r="13" fill="#ffd9b8" stroke="#ef8a3d" stroke-width="2.5" />
      <circle cx="192" cy="69" r="3" fill="#ef6c1a" opacity=".7" />
      <circle cx="201" cy="76" r="2.4" fill="#ef6c1a" opacity=".55" />
    </g>
    <g class="cell c2">
      <ellipse cx="242" cy="98" rx="15" ry="10" fill="#e6f0fe" stroke="#4c9ef8" stroke-width="2.5" />
      <circle cx="238" cy="96" r="2.6" fill="#4c9ef8" opacity=".6" />
    </g>
    <g class="cell c3">
      <rect x="252" y="48" width="26" height="14" rx="7" fill="#e6f5ea" stroke="#4caf6d" stroke-width="2.5" transform="rotate(-14 265 55)" />
      <circle cx="260" cy="52" r="2.2" fill="#4caf6d" opacity=".6" />
    </g>
    <circle cx="216" cy="40" r="7" fill="#f3e6fb" stroke="#8b72e9" stroke-width="2.2" class="cell c4" />
    <text x="212" y="138" text-anchor="middle" font-size="12" fill="#8a7666">显微镜下的小工人</text>
  </svg>

  <svg v-else viewBox="0 0 340 150" class="illus flow" role="img" aria-label="糖化、酒化、酸化三步">
    <g v-for="(step, i) in [
      { x: 30, emoji: '🍬', label: '① 糖化', sub: '淀粉 → 糖', color: '#4c9ef8' },
      { x: 130, emoji: '🍶', label: '② 酒化', sub: '糖 → 酒精', color: '#4caf6d' },
      { x: 230, emoji: '🧴', label: '③ 酸化', sub: '酒精 → 醋酸', color: '#ff8a3d' },
    ]" :key="i" :transform="`translate(${step.x}, 20)`">
      <rect x="0" y="0" width="84" height="96" rx="14" :fill="step.color" opacity="0.1" />
      <text x="42" y="46" text-anchor="middle" font-size="30">{{ step.emoji }}</text>
      <text x="42" y="70" text-anchor="middle" font-size="13" font-weight="700" :fill="step.color">{{ step.label }}</text>
      <text x="42" y="88" text-anchor="middle" font-size="11" fill="#8a7666">{{ step.sub }}</text>
    </g>
    <path d="M112 66 L128 66" stroke="#b3a291" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)" />
    <path d="M212 66 L228 66" stroke="#b3a291" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)" />
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0 0 L8 4 L0 8 Z" fill="#b3a291" />
      </marker>
    </defs>
    <text x="170" y="142" text-anchor="middle" font-size="12" fill="#8a7666">一粒米的三步旅行</text>
  </svg>
</template>

<style scoped>
.illus {
  width: 100%;
  max-width: 360px;
  height: auto;
  display: block;
  margin: 6px auto 2px;
}

.steam {
  animation: steam 2.4s ease-in-out infinite;
}

.s2 { animation-delay: 0.8s; }

@keyframes steam {
  0%, 100% { opacity: 0.35; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-4px); }
}

.bub1 { animation: pop-bub 1.6s ease-in-out infinite; }
.bub2 { animation: pop-bub 1.9s ease-in-out infinite 0.4s; }
.bub3 { animation: pop-bub 2.2s ease-in-out infinite 0.8s; }

@keyframes pop-bub {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.cell {
  animation: cell-float 3s ease-in-out infinite;
}

.c2 { animation-delay: 0.7s; }
.c3 { animation-delay: 1.4s; }
.c4 { animation-delay: 2s; }

@keyframes cell-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
