<script setup lang="ts">
defineProps<{
  diagramKey: string
}>()
</script>

<template>
  <div class="deck-diagram">
    <!-- Diagram 1: 城堡总体三道防线战术概览 -->
    <svg
      v-if="diagramKey === 'body-castle-overview'"
      viewBox="0 0 540 320"
      class="diagram-svg"
      role="img"
      aria-label="人体城堡三道防线战术概览"
    >
      <defs>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4a90e2" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#2c5282" stop-opacity="0.05" />
        </linearGradient>
        <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fc8181" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#e53e3e" stop-opacity="0.1" />
        </linearGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      <!-- 背景城堡层次示意 -->
      <rect x="20" y="20" width="500" height="280" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />

      <!-- 第 1 防线区：城门防护层 -->
      <g class="tier-1">
        <rect x="35" y="35" width="470" height="70" rx="10" fill="url(#wallGrad)" stroke="#3182ce" stroke-width="1.5" stroke-dasharray="4 2" />
        <rect x="45" y="45" width="130" height="24" rx="6" fill="#3182ce" />
        <text x="110" y="61" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">第 1 道防线 · 钢铁城门</text>
        <text x="190" y="61" fill="#2b6cb0" font-size="12" font-weight="600">皮肤铠甲 + 黏膜胶水 + 胃酸护城河</text>

        <!-- 砖墙微观小方块 -->
        <g transform="translate(45, 78)">
          <rect v-for="n in 12" :key="n" :x="(n-1)*38" y="0" width="34" height="16" rx="3" fill="#ebf8ff" stroke="#bee3f8" stroke-width="1" />
          <text x="235" y="12" text-anchor="middle" fill="#4a5568" font-size="10">严丝合缝角质层 · 阻挡 99% 隐形小坏蛋</text>
        </g>
      </g>

      <!-- 第 2 防线区：巡警血管通道与先锋吞噬 -->
      <g class="tier-2" transform="translate(0, 85)">
        <rect x="35" y="35" width="470" height="75" rx="10" fill="url(#vesselGrad)" stroke="#e53e3e" stroke-width="1.5" />
        <rect x="45" y="45" width="130" height="24" rx="6" fill="#e53e3e" />
        <text x="110" y="61" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">第 2 道防线 · 巡警先锋</text>
        <text x="190" y="61" fill="#c53030" font-size="12" font-weight="600">白细胞钻缝游出 + 吃豆人巨噬细胞 + 中性粒自爆</text>

        <!-- 巡警与吞噬微标 -->
        <g transform="translate(50, 78)">
          <!-- 巡警车/白细胞变形 -->
          <circle cx="30" cy="16" r="14" fill="#fed7d7" stroke="#e53e3e" stroke-width="2" />
          <circle cx="28" cy="14" r="5" fill="#c53030" />
          <text x="55" y="19" fill="#2d3748" font-size="11" font-weight="600">软糖变身钻缝隙</text>

          <!-- 吃豆人大嘴 -->
          <path d="M 210,16 L 230,6 A 14 14 0 1 0 230,26 Z" fill="#f6ad55" stroke="#dd6b20" stroke-width="2" />
          <circle cx="218" cy="10" r="2.5" fill="#7b341e" />
          <text x="240" y="19" fill="#2d3748" font-size="11" font-weight="600">吃豆人嗷呜生吞</text>

          <!-- 英雄白脓徽章 -->
          <circle cx="395" cy="16" r="12" fill="#fffaf0" stroke="#d69e2e" stroke-width="2" />
          <text x="395" y="20" text-anchor="middle" font-size="12">🎖️</text>
          <text x="415" y="19" fill="#2d3748" font-size="11" font-weight="600">自爆白脓英雄勋章</text>
        </g>
      </g>

      <!-- 第 3 防线区：皇家特种刺客与兵工厂导弹 -->
      <g class="tier-3" transform="translate(0, 175)">
        <rect x="35" y="35" width="470" height="75" rx="10" fill="#faf5ff" stroke="#805ad5" stroke-width="1.5" />
        <rect x="45" y="45" width="130" height="24" rx="6" fill="#805ad5" />
        <text x="110" y="61" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">第 3 道防线 · 皇家特战</text>
        <text x="190" y="61" fill="#6b46c1" font-size="12" font-weight="600">杀伤T细胞戳破老巢 + B细胞Y型导弹串糖葫芦</text>

        <g transform="translate(50, 78)">
          <!-- T细胞刺客生化针 -->
          <circle cx="30" cy="16" r="14" fill="#e9d8fd" stroke="#805ad5" stroke-width="2" />
          <line x1="38" y1="22" x2="52" y2="30" stroke="#805ad5" stroke-width="3" stroke-linecap="round" />
          <text x="65" y="19" fill="#2d3748" font-size="11" font-weight="600">特工刺客戳破老巢</text>

          <!-- B细胞与Y型抗体 -->
          <g transform="translate(240, 6)">
            <path d="M 0,0 L 8,12 L 8,22 M 16,0 L 8,12" stroke="#319795" stroke-width="3" fill="none" stroke-linecap="round" />
          </g>
          <text x="265" y="19" fill="#2d3748" font-size="11" font-weight="600">Y型追踪导弹锁死</text>

          <!-- 终身通缉相册 -->
          <rect x="390" y="6" width="22" height="20" rx="3" fill="#ffffff" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="401" cy="14" r="4" fill="#cbd5e0" />
          <text x="420" y="19" fill="#2d3748" font-size="11" font-weight="600">通缉相册终身免疫</text>
        </g>
      </g>

      <!-- 底部总结标语 -->
      <text x="270" y="304" text-anchor="middle" fill="#718096" font-size="11">
        🏰 身体城堡三层递进：外阻 (物理化学) ➔ 中清 (先锋吞噬) ➔ 深歼 (特异特种)
      </text>
    </svg>

    <!-- Diagram 2: 第 1 道防线细解 (皮肤砖墙 + 纤毛胶水 + 胃酸) -->
    <svg
      v-else-if="diagramKey === 'skin-barrier-defense'"
      viewBox="0 0 540 320"
      class="diagram-svg"
      role="img"
      aria-label="第一道防线：皮肤、黏膜与化学屏障解剖"
    >
      <rect x="20" y="20" width="500" height="280" rx="16" fill="#ffffff" stroke="#cbd5e0" stroke-width="1.5" />

      <!-- 分区 1: 皮肤砖墙 (左半区) -->
      <g transform="translate(35, 35)">
        <rect x="0" y="0" width="225" height="240" rx="12" fill="#fffaf0" stroke="#fbd38d" stroke-width="1.5" />
        <rect x="15" y="15" width="110" height="24" rx="6" fill="#dd6b20" />
        <text x="70" y="31" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🧱 皮肤砖墙结构</text>
        <text x="15" y="56" fill="#744210" font-size="11">角质死细胞致密相扣，细菌撞在玻璃上</text>

        <!-- 砖墙图 -->
        <g transform="translate(15, 68)">
          <!-- 第一层砖 -->
          <rect x="0" y="0" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <rect x="50" y="0" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <rect x="100" y="0" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <rect x="150" y="0" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <!-- 第二层错位砖 -->
          <rect x="25" y="20" width="45" height="16" rx="3" fill="#feebc8" stroke="#c05621" stroke-width="1" />
          <rect x="75" y="20" width="45" height="16" rx="3" fill="#feebc8" stroke="#c05621" stroke-width="1" />
          <rect x="125" y="20" width="45" height="16" rx="3" fill="#feebc8" stroke="#c05621" stroke-width="1" />
          <!-- 第三层砖 -->
          <rect x="0" y="40" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <rect x="50" y="40" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <rect x="100" y="40" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />
          <rect x="150" y="40" width="45" height="16" rx="3" fill="#fbd38d" stroke="#c05621" stroke-width="1" />

          <!-- 外界细菌弹开轨迹 -->
          <g transform="translate(30, -18)">
            <ellipse cx="20" cy="0" rx="8" ry="4" fill="#fc8181" stroke="#e53e3e" stroke-width="1.5" />
            <path d="M 20,-8 L 30,-22 M 25,-15 L 35,-15" stroke="#e53e3e" stroke-width="1.5" stroke-linecap="round" />
            <text x="45" y="-14" fill="#e53e3e" font-size="10" font-weight="700">🚫 无法穿透！</text>
          </g>

          <!-- 砖缝脂质水泥标注 -->
          <rect x="10" y="70" width="175" height="30" rx="6" fill="#ffffff" stroke="#e2e8f0" />
          <text x="97" y="85" text-anchor="middle" fill="#4a5568" font-size="10" font-weight="600">脂质细胞间质（天然防水胶水）</text>
          <text x="97" y="96" text-anchor="middle" fill="#718096" font-size="9">干燥微酸环境抑制菌群滋生</text>
        </g>
      </g>

      <!-- 分区 2: 气管黏液与纤毛 (右上) -->
      <g transform="translate(280, 35)">
        <rect x="0" y="0" width="225" height="112" rx="12" fill="#ebf8ff" stroke="#90cdf4" stroke-width="1.5" />
        <rect x="15" y="12" width="115" height="22" rx="6" fill="#3182ce" />
        <text x="72" y="27" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🍯 呼吸道黏液纤毛</text>
        <!-- 纤毛摆动图示 -->
        <g transform="translate(20, 48)">
          <!-- 黏液层 -->
          <rect x="0" y="0" width="185" height="14" rx="4" fill="#bee3f8" />
          <text x="92" y="10" text-anchor="middle" fill="#2b6cb0" font-size="9">粘稠鼻涕/黏液（黏住细菌尘埃）</text>
          <!-- 向上摆动的纤毛 -->
          <path v-for="i in 9" :key="i" :d="`M ${(i-1)*20+15},35 Q ${(i-1)*20+22},24 ${(i-1)*20+12},14`" stroke="#3182ce" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <!-- 细胞基底 -->
          <rect x="0" y="35" width="185" height="18" fill="#e2e8f0" rx="3" />
          <text x="92" y="48" text-anchor="middle" fill="#4a5568" font-size="9">纤毛传送带：节律向上刷向喉咙吞下</text>
        </g>
      </g>

      <!-- 分区 3: 胃酸超级护城河 (右下) -->
      <g transform="translate(280, 163)">
        <rect x="0" y="0" width="225" height="112" rx="12" fill="#f0fff4" stroke="#9ae6b4" stroke-width="1.5" />
        <rect x="15" y="12" width="125" height="22" rx="6" fill="#38a169" />
        <text x="77" y="27" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🧪 胃酸化学护城河</text>
        <g transform="translate(20, 45)">
          <path d="M 0,20 Q 45,5 90,20 T 185,20 L 185,50 L 0,50 Z" fill="#c6f6d5" />
          <circle cx="45" cy="28" r="4" fill="#38a169" opacity="0.6" />
          <circle cx="110" cy="24" r="3" fill="#38a169" opacity="0.5" />
          <circle cx="140" cy="32" r="5" fill="#38a169" opacity="0.7" />
          <text x="92" y="42" text-anchor="middle" fill="#22543d" font-size="10" font-weight="700">pH 1.5~2 强酸强力熔解细菌外壳！</text>
        </g>
      </g>
    </svg>

    <!-- Diagram 3: 第 2 道防线 (钻缝游出 + 巨噬吃豆 + 中性粒自爆) -->
    <svg
      v-else-if="diagramKey === 'patrol-phagocytosis-net'"
      viewBox="0 0 540 320"
      class="diagram-svg"
      role="img"
      aria-label="第二道防线：白细胞游出、巨噬吞噬与中性粒细胞诱捕网"
    >
      <rect x="20" y="20" width="500" height="280" rx="16" fill="#ffffff" stroke="#cbd5e0" stroke-width="1.5" />

      <!-- 场景 A: 毛细血管壁与白细胞橡皮泥游出 (上部) -->
      <g transform="translate(35, 30)">
        <rect x="0" y="0" width="470" height="115" rx="10" fill="#fff5f5" stroke="#feb2b2" stroke-width="1.2" />
        <rect x="15" y="10" width="165" height="22" rx="5" fill="#e53e3e" />
        <text x="97" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🚓 白细胞血管游出 (Diapedesis)</text>

        <!-- 血管上下管壁 -->
        <g transform="translate(15, 40)">
          <!-- 血管上壁（内皮细胞排成行） -->
          <rect v-for="i in 7" :key="i" :x="(i-1)*62" y="0" width="56" height="12" rx="4" fill="#fc8181" />
          <!-- 血管腔 (血流方向箭头) -->
          <path d="M 30,22 L 400,22" stroke="#feb2b2" stroke-width="2" stroke-dasharray="8 6" marker-end="url(#arrowRed)" />
          <text x="50" y="20" fill="#9b2c2c" font-size="9">血液大马路高速巡逻 ➔</text>
          <!-- 红细胞 -->
          <ellipse cx="140" cy="22" rx="10" ry="6" fill="#e53e3e" />
          <ellipse cx="260" cy="20" rx="10" ry="6" fill="#e53e3e" />

          <!-- 血管下壁（中间留出发丝级缝隙！） -->
          <rect x="0" y="32" width="170" height="12" rx="4" fill="#fc8181" />
          <!-- 留出缝隙 x=170~195 -->
          <rect x="200" y="32" width="240" height="12" rx="4" fill="#fc8181" />

          <!-- 变身橡皮泥钻过缝隙的白细胞 -->
          <path
            d="M 175,20 C 170,24 165,36 175,44 C 185,52 195,50 195,36 C 195,26 185,16 175,20 Z"
            fill="#edf2f7"
            stroke="#4a5568"
            stroke-width="2"
          />
          <circle cx="182" cy="35" r="4" fill="#a0aec0" />
          <text x="210" y="55" fill="#c53030" font-size="10" font-weight="700">闻到求救气味，像软糖挤过发丝小缝！</text>
        </g>
      </g>

      <!-- 场景 B: 巨噬细胞吃豆人 (左下) -->
      <g transform="translate(35, 160)">
        <rect x="0" y="0" width="225" height="125" rx="10" fill="#fffaf0" stroke="#fbd38d" stroke-width="1.2" />
        <rect x="12" y="10" width="135" height="20" rx="5" fill="#dd6b20" />
        <text x="79" y="24" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">👾 巨噬吃豆人大胃王</text>

        <!-- 伸出伪足包围细菌 -->
        <g transform="translate(20, 38)">
          <!-- 巨噬细胞大嘴阿米巴形态 -->
          <path
            d="M 10,40 C 5,15 35,5 60,15 C 80,25 90,10 100,20 C 105,30 95,45 80,45 C 95,55 85,75 65,70 C 40,75 10,65 10,40 Z"
            fill="#fefcbf"
            stroke="#d69e2e"
            stroke-width="2"
          />
          <!-- 细胞核 -->
          <path d="M 35,35 Q 40,25 50,30 Q 55,42 45,48 Z" fill="#b7791f" opacity="0.6" />
          <!-- 即将被吞掉的小细菌 -->
          <ellipse cx="88" cy="22" rx="7" ry="4" fill="#fc8181" stroke="#e53e3e" stroke-width="1.5" />
          <ellipse cx="80" cy="52" rx="6" ry="3.5" fill="#fc8181" stroke="#e53e3e" stroke-width="1.5" />
          <text x="105" y="65" fill="#744210" font-size="10" font-weight="700">嗷呜生吞！</text>
        </g>
      </g>

      <!-- 场景 C: 中性粒细胞敢死队与白脓勋章 (右下) -->
      <g transform="translate(280, 160)">
        <rect x="0" y="0" width="225" height="125" rx="10" fill="#f7fafc" stroke="#cbd5e0" stroke-width="1.2" />
        <rect x="12" y="10" width="145" height="20" rx="5" fill="#4a5568" />
        <text x="84" y="24" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">💥 中性粒敢死队与白脓</text>

        <!-- 吐出大网同归于尽 -->
        <g transform="translate(20, 40)">
          <!-- 诱捕大网 (NETs) 线条 -->
          <path d="M 10,15 L 75,55 M 25,10 L 85,45 M 5,35 L 80,20 M 15,55 L 75,10" stroke="#718096" stroke-width="1.5" stroke-dasharray="3 3" />
          <!-- 网住的细菌死伤枕藉 -->
          <ellipse cx="35" cy="25" rx="6" ry="3" fill="#cbd5e0" />
          <ellipse cx="55" cy="35" rx="5" ry="3" fill="#cbd5e0" />
          <text x="95" y="25" fill="#2d3748" font-size="10" font-weight="700">释放 DNA 诱捕网</text>
          <text x="95" y="42" fill="#e53e3e" font-size="11" font-weight="800">🎖️ 白脓 = 英雄勋章</text>
          <text x="95" y="56" fill="#718096" font-size="9">同归于尽保护伤口</text>
        </g>
      </g>
    </svg>

    <!-- Diagram 4: 第 3 道防线 (杀伤T细胞戳破老巢 + B细胞抗体糖葫芦) -->
    <svg
      v-else-if="diagramKey === 'killer-t-antibody-missile'"
      viewBox="0 0 540 320"
      class="diagram-svg"
      role="img"
      aria-label="第三道防线：特异性T细胞生化穿孔与B细胞Y型抗体凝集"
    >
      <rect x="20" y="20" width="500" height="280" rx="16" fill="#ffffff" stroke="#cbd5e0" stroke-width="1.5" />

      <!-- 左半区: 杀伤T细胞生化针头戳破老巢 -->
      <g transform="translate(35, 35)">
        <rect x="0" y="0" width="225" height="240" rx="12" fill="#faf5ff" stroke="#d6bcfa" stroke-width="1.5" />
        <rect x="15" y="15" width="135" height="24" rx="6" fill="#805ad5" />
        <text x="82" y="31" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🗡️ 杀伤T细胞戳破老巢</text>

        <!-- 刺客对接与穿孔素孔道 -->
        <g transform="translate(15, 55)">
          <!-- 杀伤T细胞 (墨镜特工) -->
          <circle cx="50" cy="50" r="34" fill="#e9d8fd" stroke="#805ad5" stroke-width="2.5" />
          <!-- 特工墨镜 -->
          <rect x="35" y="36" width="14" height="8" rx="2" fill="#44337a" />
          <rect x="52" y="36" width="14" height="8" rx="2" fill="#44337a" />
          <line x1="48" y1="40" x2="53" y2="40" stroke="#44337a" stroke-width="2" />
          <text x="50" y="62" text-anchor="middle" fill="#6b46c1" font-size="10" font-weight="700">杀伤T细胞</text>

          <!-- 生化穿孔素针头注射 -->
          <g transform="translate(80, 48)">
            <line x1="0" y1="0" x2="25" y2="0" stroke="#e53e3e" stroke-width="3" stroke-linecap="round" />
            <circle cx="26" cy="0" r="3" fill="#e53e3e" />
          </g>

          <!-- 藏有病毒的被感染细胞 (老巢被戳破爆裂) -->
          <g transform="translate(115, 15)">
            <path
              d="M 20,10 C 40,5 65,15 70,35 C 75,55 55,75 35,70 C 15,65 5,50 5,30 C 5,15 15,10 20,10 Z"
              fill="#fed7d7"
              stroke="#e53e3e"
              stroke-width="2"
              stroke-dasharray="4 2"
            />
            <!-- 病毒坏蛋惊恐四散 -->
            <circle cx="28" cy="32" r="5" fill="#9b2c2c" />
            <circle cx="48" cy="45" r="5" fill="#9b2c2c" />
            <!-- 穿孔爆裂小火花 -->
            <text x="35" y="88" text-anchor="middle" fill="#c53030" font-size="10" font-weight="700">💥 穿孔素戳破！</text>
            <text x="35" y="100" text-anchor="middle" fill="#742a2a" font-size="9">老巢炸毁，病毒无处可藏</text>
          </g>
        </g>
      </g>

      <!-- 右半区: B细胞Y型导弹与串糖葫芦 (凝集反应) -->
      <g transform="translate(280, 35)">
        <rect x="0" y="0" width="225" height="240" rx="12" fill="#e6fffa" stroke="#81e6d9" stroke-width="1.5" />
        <rect x="15" y="15" width="145" height="24" rx="6" fill="#319795" />
        <text x="87" y="31" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">🚀 Y型导弹串糖葫芦</text>

        <!-- Y型抗体夹住两只细菌并交联成串 -->
        <g transform="translate(20, 55)">
          <!-- 糖葫芦竹签与串联网络 -->
          <g transform="translate(25, 20)">
            <!-- 细菌 1 -->
            <ellipse cx="25" cy="20" rx="15" ry="9" fill="#feebc8" stroke="#dd6b20" stroke-width="1.5" />
            <text x="25" y="23" text-anchor="middle" fill="#7b341e" font-size="9">细菌A</text>

            <!-- Y型抗体 1 连接细菌A和细菌B -->
            <g transform="translate(42, 10)">
              <path d="M 0,5 L 10,12 L 10,24 M 20,5 L 10,12" stroke="#319795" stroke-width="3.5" fill="none" stroke-linecap="round" />
              <!-- 尾巴标签 -->
              <circle cx="10" cy="25" r="3.5" fill="#e53e3e" />
            </g>

            <!-- 细菌 2 -->
            <ellipse cx="80" cy="20" rx="15" ry="9" fill="#feebc8" stroke="#dd6b20" stroke-width="1.5" />
            <text x="80" y="23" text-anchor="middle" fill="#7b341e" font-size="9">细菌B</text>

            <!-- Y型抗体 2 往下连接细菌C -->
            <g transform="translate(68, 30)">
              <path d="M 5,0 L 12,10 L 12,22 M 20,0 L 12,10" stroke="#319795" stroke-width="3.5" fill="none" stroke-linecap="round" />
              <circle cx="12" cy="23" r="3.5" fill="#e53e3e" />
            </g>

            <!-- 细菌 3 -->
            <ellipse cx="60" cy="65" rx="15" ry="9" fill="#feebc8" stroke="#dd6b20" stroke-width="1.5" />
            <text x="60" y="68" text-anchor="middle" fill="#7b341e" font-size="9">细菌C</text>
          </g>

          <rect x="10" y="115" width="170" height="36" rx="6" fill="#ffffff" stroke="#cbd5e0" />
          <text x="95" y="130" text-anchor="middle" fill="#234e52" font-size="10" font-weight="700">🍡 凝集成团 · 动弹不得！</text>
          <text x="95" y="143" text-anchor="middle" fill="#4a5568" font-size="9">Y尾部红灯：“快来吃我”标签</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.deck-diagram {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  background: #fbfbfd;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.diagram-svg {
  width: 100%;
  max-width: 540px;
  height: auto;
  display: block;
}
</style>
