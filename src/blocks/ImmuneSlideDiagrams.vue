<script setup lang="ts">
defineProps<{
  diagramKey: string
}>()
</script>

<template>
  <div class="deck-diagram-theater">
    <!-- ══════════════════════════════════════════════════════════════════════
         Scene 1: 身体的三道神仙装备全景 (保鲜膜 + 捕蝇胶 + 消毒池)
         ══════════════════════════════════════════════════════════════════════ -->
    <svg
      v-if="diagramKey === 'body-castle-overview'"
      viewBox="0 0 600 360"
      class="diagram-stage-svg"
      role="img"
      aria-label="身体的三道神仙防御大剧场"
    >
      <defs>
        <!-- 护盾光芒渐变 -->
        <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.9" />
          <stop offset="70%" stop-color="#fef3c7" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.15" />
        </radialGradient>
        <linearGradient id="bodySkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffedd5" />
          <stop offset="100%" stop-color="#fed7aa" />
        </linearGradient>
      </defs>

      <!-- 舞台底衬 -->
      <rect x="10" y="10" width="580" height="340" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

      <!-- 中央舞台：健康人体与发光保鲜膜金钟罩 -->
      <g transform="translate(160, 40)">
        <!-- 金色保鲜膜护盾圆弧 -->
        <ellipse cx="140" cy="140" rx="130" ry="135" fill="url(#shieldGlow)" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8 4" />
        
        <!-- 盾牌标牌 -->
        <rect x="65" y="10" width="150" height="26" rx="13" fill="#f59e0b" />
        <text x="140" y="27" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">🛡️ 天然坚韧“保鲜膜”</text>

        <!-- 人体轮廓示意 (头部与身体) -->
        <circle cx="140" cy="75" r="32" fill="url(#bodySkinGrad)" stroke="#f97316" stroke-width="2" />
        <!-- 笑脸 -->
        <circle cx="130" cy="70" r="3.5" fill="#431407" />
        <circle cx="150" cy="70" r="3.5" fill="#431407" />
        <path d="M 132,82 Q 140,90 148,82" stroke="#431407" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <!-- 身体躯干与双臂护胸 -->
        <path d="M 105,120 Q 140,110 175,120 L 185,220 Q 140,230 95,220 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2" />
        <text x="140" y="165" text-anchor="middle" fill="#0369a1" font-size="13" font-weight="800">身体健康城堡</text>
        <text x="140" y="185" text-anchor="middle" fill="#0c4a6e" font-size="11">内部有精锐特警日夜站岗</text>
      </g>

      <!-- 护盾外围：被弹飞的细菌小怪兽们 (左侧与右侧) -->
      <!-- 细菌 1 撞得头晕眼花 (左) -->
      <g transform="translate(45, 80)">
        <ellipse cx="30" cy="30" rx="22" ry="18" fill="#86efac" stroke="#16a34a" stroke-width="2.5" />
        <!-- 螺旋晕眼 -->
        <text x="22" y="28" font-size="14">😵</text>
        <text x="38" y="24" font-size="10">💫</text>
        <!-- 弹飞冲击波线条 -->
        <path d="M 60,30 Q 75,30 90,20" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 3" />
        <text x="30" y="65" text-anchor="middle" fill="#15803d" font-size="11" font-weight="700">撞在保鲜膜上！</text>
        <text x="30" y="78" text-anchor="middle" fill="#64748b" font-size="10">弹飞眼冒金星</text>
      </g>

      <!-- 细菌 2 举着小叉子钻不动 (左下) -->
      <g transform="translate(50, 190)">
        <ellipse cx="28" cy="28" rx="20" ry="16" fill="#fca5a5" stroke="#dc2626" stroke-width="2.5" />
        <!-- 气急败坏表情 -->
        <circle cx="20" cy="24" r="3" fill="#7f1d1d" />
        <circle cx="34" cy="24" r="3" fill="#7f1d1d" />
        <path d="M 22,34 Q 27,28 32,34" stroke="#7f1d1d" stroke-width="2" fill="none" />
        <!-- 弯掉的钻头小叉子 -->
        <path d="M 48,28 L 65,28 L 60,35" stroke="#7f1d1d" stroke-width="2.5" stroke-linecap="round" />
        <text x="30" y="62" text-anchor="middle" fill="#b91c1c" font-size="11" font-weight="700">小钻头钻弯了！</text>
      </g>

      <!-- 右侧两大装备卡片：捕蝇胶与强酸池 -->
      <g transform="translate(435, 45)">
        <!-- 装备 2：鼻腔捕蝇板 -->
        <rect x="0" y="0" width="135" height="110" rx="12" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
        <rect x="10" y="10" width="115" height="22" rx="6" fill="#3b82f6" />
        <text x="67" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🍯 强力捕蝇胶 (鼻涕)</text>
        <!-- 被粘住的细菌 -->
        <g transform="translate(25, 45)">
          <rect x="0" y="0" width="85" height="16" rx="4" fill="#93c5fd" />
          <text x="42" y="12" text-anchor="middle" fill="#1e40af" font-size="9" font-weight="700">超强黏胶板</text>
          <circle cx="20" cy="8" r="5" fill="#ef4444" />
          <circle cx="50" cy="8" r="5" fill="#10b981" />
          <!-- 挣扎眼泪 -->
          <text x="65" y="12" font-size="9">💦 动不了</text>
          <text x="42" y="32" text-anchor="middle" fill="#1e3a8a" font-size="10">小刷子一刷 ➔ 阿嚏！</text>
        </g>
      </g>

      <g transform="translate(435, 175)">
        <!-- 装备 3：胃酸超级消毒池 -->
        <rect x="0" y="0" width="135" height="110" rx="12" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5" />
        <rect x="10" y="10" width="115" height="22" rx="6" fill="#16a34a" />
        <text x="67" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🧪 浓缩消毒水 (胃酸)</text>
        <g transform="translate(20, 45)">
          <path d="M 0,15 Q 25,5 50,15 T 95,15 L 95,35 L 0,35 Z" fill="#86efac" opacity="0.6" />
          <circle cx="20" cy="20" r="3" fill="#15803d" />
          <circle cx="60" cy="18" r="4" fill="#15803d" />
          <text x="47" y="32" text-anchor="middle" fill="#14532d" font-size="10" font-weight="800">掉进去化成渣渣！</text>
        </g>
      </g>

      <!-- 底部大横幅总结 -->
      <rect x="30" y="300" width="540" height="38" rx="10" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5" />
      <text x="300" y="324" text-anchor="middle" fill="#9a3412" font-size="13" font-weight="800">
        💡 演讲第一声吼：只要皮肤保鲜膜不划破，99% 的细菌连身体大门都摸不着！
      </text>
    </svg>

    <!-- ══════════════════════════════════════════════════════════════════════
         Scene 2: 皮肤保鲜膜细节 (手背防弹保鲜膜 vs 鼻涕捕蝇草)
         ══════════════════════════════════════════════════════════════════════ -->
    <svg
      v-else-if="diagramKey === 'skin-barrier-defense'"
      viewBox="0 0 600 360"
      class="diagram-stage-svg"
      role="img"
      aria-label="第一道防线生活三件套"
    >
      <rect x="10" y="10" width="580" height="340" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />

      <!-- 左半区: 手背上的防弹保鲜膜 (巨大视觉) -->
      <g transform="translate(35, 30)">
        <rect x="0" y="0" width="250" height="260" rx="16" fill="#fff7ed" stroke="#fdba74" stroke-width="2" />
        <rect x="20" y="15" width="130" height="26" rx="8" fill="#ea580c" />
        <text x="85" y="32" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">① 全身天然保鲜膜</text>

        <!-- 显微镜下的致密保鲜膜切面 -->
        <g transform="translate(20, 60)">
          <!-- 砖墙保鲜膜层 -->
          <g v-for="row in 4" :key="row">
            <rect
              v-for="col in 5"
              :key="col"
              :x="(col - 1) * 42 + ((row % 2) * 20) - 10"
              :y="(row - 1) * 22"
              width="38"
              height="18"
              rx="4"
              fill="#fed7aa"
              stroke="#ea580c"
              stroke-width="1.5"
            />
          </g>
          <text x="105" y="110" text-anchor="middle" fill="#7c2d12" font-size="11" font-weight="700">死角质层：比城墙砖头还要严丝合缝！</text>

          <!-- 细菌撞在保鲜膜上弹飞 -->
          <g transform="translate(60, -35)">
            <ellipse cx="25" cy="15" rx="14" ry="10" fill="#86efac" stroke="#16a34a" stroke-width="2" />
            <text x="25" y="19" text-anchor="middle" font-size="11">😵</text>
            <path d="M 25,2 L 25,-12 M 15,-6 L 35,-6" stroke="#ea580c" stroke-width="2" stroke-linecap="round" />
            <text x="25" y="-16" text-anchor="middle" fill="#c2410c" font-size="11" font-weight="800">Duang！弹开！</text>
          </g>

          <!-- 说明提示 -->
          <rect x="5" y="125" width="200" height="55" rx="8" fill="#ffffff" stroke="#fed7aa" />
          <text x="15" y="145" fill="#431407" font-size="11" font-weight="700">✋ 现场互动动作：</text>
          <text x="15" y="165" fill="#7c2d12" font-size="11">用手指捏捏手背皮肤：“看！这就是保鲜膜！”</text>
        </g>
      </g>

      <!-- 右半区上: 呼吸道强力苍蝇胶 + 扫地小毛刷 -->
      <g transform="translate(315, 30)">
        <rect x="0" y="0" width="250" height="120" rx="16" fill="#eff6ff" stroke="#93c5fd" stroke-width="2" />
        <rect x="15" y="12" width="130" height="24" rx="6" fill="#2563eb" />
        <text x="80" y="28" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">② 捕蝇胶 + 扫地机</text>

        <g transform="translate(20, 50)">
          <!-- 黏稠鼻涕黏液层 -->
          <rect x="0" y="0" width="210" height="16" rx="4" fill="#60a5fa" opacity="0.6" />
          <text x="105" y="12" text-anchor="middle" fill="#1e3a8a" font-size="10" font-weight="700">粘糊糊的鼻涕黏液（像苍蝇胶板）</text>
          
          <!-- 一排金色纤毛小刷子，向右上方整齐刷动 -->
          <path
            v-for="i in 10"
            :key="i"
            :d="`M ${(i-1)*20 + 15},40 Q ${(i-1)*20 + 25},25 ${(i-1)*20 + 18},16`"
            stroke="#f59e0b"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          />
          <text x="105" y="55" text-anchor="middle" fill="#b45309" font-size="10" font-weight="700">小毛刷一齐往外刷 ➔ “阿嚏！”</text>
        </g>
      </g>

      <!-- 右半区下: 胃酸大熔炉 -->
      <g transform="translate(315, 170)">
        <rect x="0" y="0" width="250" height="120" rx="16" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
        <rect x="15" y="12" width="130" height="24" rx="6" fill="#16a34a" />
        <text x="80" y="28" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">③ 胃里浓缩消毒水</text>

        <g transform="translate(20, 48)">
          <path d="M 0,20 Q 50,8 105,20 T 210,20 L 210,48 L 0,48 Z" fill="#4ade80" opacity="0.5" />
          <circle cx="40" cy="28" r="4" fill="#15803d" />
          <circle cx="120" cy="24" r="5" fill="#15803d" />
          <text x="105" y="38" text-anchor="middle" fill="#14532d" font-size="11" font-weight="800">pH 1.5 强酸：吃进肚子的细菌秒变泡泡！</text>
        </g>
      </g>

      <!-- 底部生活真相 -->
      <text x="300" y="325" text-anchor="middle" fill="#475569" font-size="12" font-weight="700">
        🧼 为什么饭前要用肥皂洗手？肥皂水能直接把病毒外面的脂肪小皮衣彻底撕碎融化！
      </text>
    </svg>

    <!-- ══════════════════════════════════════════════════════════════════════
         Scene 3: 第二道防线 (挤牙膏穿墙 + 大胃王吃豆人 + 白脓英雄纪念碑)
         ══════════════════════════════════════════════════════════════════════ -->
    <svg
      v-else-if="diagramKey === 'patrol-phagocytosis-net'"
      viewBox="0 0 600 360"
      class="diagram-stage-svg"
      role="img"
      aria-label="白细胞挤牙膏出击与自爆成白脓"
    >
      <rect x="10" y="10" width="580" height="340" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />

      <!-- 上半区：神奇穿墙术 (挤牙膏从血管缝隙挤出) -->
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="540" height="135" rx="14" fill="#fff1f2" stroke="#fecdd3" stroke-width="1.5" />
        <rect x="15" y="10" width="180" height="24" rx="6" fill="#e11d48" />
        <text x="105" y="26" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">🚓 穿墙术：像挤牙膏一样钻缝隙！</text>

        <!-- 血管剖面结构 -->
        <g transform="translate(20, 42)">
          <!-- 血管上管壁 -->
          <rect v-for="i in 8" :key="i" :x="(i-1)*62" y="0" width="56" height="12" rx="4" fill="#fb7185" />
          
          <!-- 血管内部血流：红细胞顺流 -->
          <ellipse cx="60" cy="24" rx="14" ry="7" fill="#e11d48" />
          <ellipse cx="140" cy="22" rx="14" ry="7" fill="#e11d48" />
          <text x="70" y="26" fill="#881337" font-size="10" font-weight="700">血液高速马路 ➔ ➔</text>

          <!-- 血管下管壁 (中间裂开发丝级小缝！) -->
          <rect x="0" y="34" width="220" height="12" rx="4" fill="#fb7185" />
          <!-- 缝隙就在 220 ~ 255 之间 -->
          <rect x="255" y="34" width="245" height="12" rx="4" fill="#fb7185" />

          <!-- 白细胞像牙膏/软泥一样从缝隙挤出！ -->
          <!-- 血管内圆球、缝隙处极细、组织外大水滴形 -->
          <path
            d="M 230,18 C 220,24 232,36 235,46 C 238,58 225,72 238,78 C 252,78 248,58 242,46 C 240,36 250,24 240,18 Z"
            fill="#ffffff"
            stroke="#334155"
            stroke-width="2.5"
          />
          <!-- 两个小黑眼珠 -->
          <circle cx="236" cy="62" r="2.5" fill="#0f172a" />
          <circle cx="244" cy="62" r="2.5" fill="#0f172a" />
          <!-- 旁边动态箭头与标语 -->
          <text x="270" y="55" fill="#be123c" font-size="12" font-weight="800">噗溜！</text>
          <text x="270" y="70" fill="#4c0519" font-size="11" font-weight="600">闻到求救气味，软泥白细胞从细缝硬挤出去！</text>
        </g>
      </g>

      <!-- 左下区：大胃王吃豆人 (巨噬细胞) -->
      <g transform="translate(30, 175)">
        <rect x="0" y="0" width="255" height="155" rx="14" fill="#fefce8" stroke="#fef08a" stroke-width="2" />
        <rect x="15" y="12" width="130" height="22" rx="6" fill="#ca8a04" />
        <text x="80" y="27" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">👾 大胃王吃豆人</text>

        <g transform="translate(25, 45)">
          <!-- 吃豆人大嘴巴 -->
          <path d="M 50,45 L 85,25 A 40 40 0 1 0 85,65 Z" fill="#fde047" stroke="#ca8a04" stroke-width="3" />
          <!-- 呆萌大眼睛 -->
          <circle cx="45" cy="25" r="5" fill="#713f12" />
          <circle cx="47" cy="24" r="1.8" fill="#ffffff" />
          <!-- 惊恐逃窜的小绿细菌 -->
          <ellipse cx="105" cy="40" rx="9" ry="6" fill="#86efac" stroke="#16a34a" stroke-width="1.5" />
          <ellipse cx="120" cy="22" rx="8" ry="5" fill="#86efac" stroke="#16a34a" stroke-width="1.5" />
          <text x="135" y="45" fill="#854d0e" font-size="11" font-weight="800">嗷呜生吞！</text>
          <text x="85" y="92" text-anchor="middle" fill="#713f12" font-size="11">个头大 10 倍，连嚼都不嚼整只活吞！</text>
        </g>
      </g>

      <!-- 右下区：自爆敢死队 ➔ 震撼真相：白脓是英雄勋章！ -->
      <g transform="translate(315, 175)">
        <rect x="0" y="0" width="255" height="155" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
        <rect x="15" y="12" width="145" height="22" rx="6" fill="#475569" />
        <text x="87" y="27" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">💥 抱团自爆 ➔ 白脓真相</text>

        <g transform="translate(20, 45)">
          <!-- 炸开的蜘蛛大网 (DNA 捕鱼网) -->
          <path d="M 10,15 L 75,55 M 20,5 L 80,45 M 5,35 L 75,15 M 15,55 L 70,5" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="4 2" />
          <text x="45" y="25" font-size="14">🕸️</text>
          <!-- 伤口与白脓真实示意 -->
          <g transform="translate(100, 10)">
            <rect x="0" y="0" width="125" height="70" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5" />
            <!-- 皮肤伤口结痂与白脓水滴 -->
            <ellipse cx="40" cy="35" rx="20" ry="12" fill="#fda4af" />
            <ellipse cx="40" cy="35" rx="10" ry="7" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
            <text x="60" y="32" fill="#e11d48" font-size="11" font-weight="800">这就是白脓！</text>
            <text x="60" y="48" fill="#475569" font-size="10">自爆白细胞的</text>
            <text x="60" y="60" fill="#be123c" font-size="10" font-weight="800">英雄烈士遗体！</text>
          </g>
          <text x="110" y="95" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="700">
            全场震撼点：不要嫌白脓脏，那是英雄！
          </text>
        </g>
      </g>
    </svg>

    <!-- ══════════════════════════════════════════════════════════════════════
         Scene 4: 第三道防线 (特工电钻拆作坊 + 连环衣夹子手铐糖葫芦 + 通缉令)
         ══════════════════════════════════════════════════════════════════════ -->
    <svg
      v-else-if="diagramKey === 'killer-t-antibody-missile'"
      viewBox="0 0 600 360"
      class="diagram-stage-svg"
      role="img"
      aria-label="特工拆迁与连环衣夹子糖葫芦"
    >
      <rect x="10" y="10" width="580" height="340" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />

      <!-- 左半区: 拆迁特警 T 细胞 (电钻戳破病毒黑作坊) -->
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="255" height="245" rx="16" fill="#faf5ff" stroke="#d8b4fe" stroke-width="2" />
        <rect x="15" y="12" width="145" height="24" rx="6" fill="#9333ea" />
        <text x="87" y="28" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">🗡️ 特工电钻戳破老巢</text>

        <g transform="translate(20, 50)">
          <!-- 杀伤 T 细胞 (戴墨镜帅气特工) -->
          <circle cx="45" cy="45" r="32" fill="#e9d8fd" stroke="#7e22ce" stroke-width="3" />
          <!-- 帅气特工墨镜 -->
          <rect x="30" y="32" width="13" height="8" rx="2" fill="#3b0764" />
          <rect x="47" y="32" width="13" height="8" rx="2" fill="#3b0764" />
          <line x1="43" y1="36" x2="47" y2="36" stroke="#3b0764" stroke-width="2" />
          <text x="45" y="60" text-anchor="middle" fill="#581c87" font-size="10" font-weight="800">杀伤 T 细胞</text>

          <!-- 穿孔素特制小电钻 -->
          <line x1="75" y1="45" x2="105" y2="45" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="106" cy="45" r="3" fill="#dc2626" />
          <text x="90" y="38" fill="#dc2626" font-size="10" font-weight="800">钻孔！</text>

          <!-- 藏满病毒的倒霉细胞 (黑作坊被戳破炸毁) -->
          <g transform="translate(120, 10)">
            <circle cx="40" cy="40" r="34" fill="#fee2e2" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6 3" />
            <!-- 里面的小坏蛋惊恐冒出 -->
            <circle cx="30" cy="30" r="5" fill="#991b1b" />
            <circle cx="48" cy="45" r="5" fill="#991b1b" />
            <text x="40" y="88" text-anchor="middle" fill="#b91c1c" font-size="12" font-weight="800">💥 老巢炸毁！</text>
          </g>
          <text x="105" y="125" text-anchor="middle" fill="#6b21a8" font-size="11" font-weight="700">
            水灌进小孔 ➔ 整个病毒黑作坊被冲垮！
          </text>
        </g>
      </g>

      <!-- 右半区: B 细胞与连环衣夹子手铐 (串成死结大糖葫芦) -->
      <g transform="translate(315, 25)">
        <rect x="0" y="0" width="255" height="245" rx="16" fill="#f0fdfa" stroke="#99f6e4" stroke-width="2" />
        <rect x="15" y="12" width="155" height="24" rx="6" fill="#0d9488" />
        <text x="92" y="28" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">🚀 连环衣夹子串糖葫芦</text>

        <g transform="translate(25, 45)">
          <!-- 糖葫芦细菌网络 -->
          <!-- 细菌 1 -->
          <ellipse cx="30" cy="25" rx="16" ry="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
          <text x="30" y="28" text-anchor="middle" font-size="9" font-weight="700">细菌A</text>

          <!-- Y型衣夹子 1 (两只大手紧紧拷住) -->
          <g transform="translate(48, 15)">
            <path d="M 0,5 L 12,14 L 12,28 M 24,5 L 12,14" stroke="#0f766e" stroke-width="4" fill="none" stroke-linecap="round" />
            <!-- 尾巴大红灯 -->
            <circle cx="12" cy="29" r="4.5" fill="#ef4444" />
          </g>

          <!-- 细菌 2 -->
          <ellipse cx="95" cy="25" rx="16" ry="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
          <text x="95" y="28" text-anchor="middle" font-size="9" font-weight="700">细菌B</text>

          <!-- Y型衣夹子 2 往下拷住细菌 3 -->
          <g transform="translate(80, 42)">
            <path d="M 5,0 L 14,12 L 14,26 M 23,0 L 14,12" stroke="#0f766e" stroke-width="4" fill="none" stroke-linecap="round" />
            <circle cx="14" cy="27" r="4.5" fill="#ef4444" />
          </g>

          <!-- 细菌 3 -->
          <ellipse cx="70" cy="85" rx="16" ry="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
          <text x="70" y="88" text-anchor="middle" font-size="9" font-weight="700">细菌C</text>

          <!-- 糖葫芦结论标签 -->
          <rect x="15" y="115" width="175" height="32" rx="8" fill="#ffffff" stroke="#5eead4" />
          <text x="102" y="130" text-anchor="middle" fill="#134e4a" font-size="11" font-weight="800">🍡 拷成死结 · 动弹不得！</text>
          <text x="102" y="142" text-anchor="middle" fill="#042f2e" font-size="9">红灯大喊：“快来吃！这里有坏蛋！”</text>
        </g>
      </g>

      <!-- 底部终身通缉令与打疫苗大揭秘 -->
      <g transform="translate(30, 285)">
        <rect x="0" y="0" width="540" height="52" rx="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
        <text x="25" y="23" fill="#0f172a" font-size="12" font-weight="800">📸 记忆细胞与打疫苗的真相：</text>
        <text x="25" y="42" fill="#334155" font-size="11">
          打疫苗不是真生病，而是把拔了牙的假病毒送进来搞一次<strong>“军事大演习”</strong>，让老侦探提前画好通缉令，从此终身不怕它！
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.deck-diagram-theater {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
  background: #fbfbfd;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.diagram-stage-svg {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
}
</style>
