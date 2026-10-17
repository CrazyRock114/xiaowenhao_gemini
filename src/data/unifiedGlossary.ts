import type { BridgingCapsule } from '../types'
import pointsData from '../../content/knowledge/points.json'

export interface GlossaryEntry {
  id: string
  nameZh: string
  nameEn: string
  ipa?: string
  emoji: string
  summaryZh: string
  summaryEn: string
  aliases: string[]
  bridges?: BridgingCapsule[]
}

// 1. 从 points.json 载入本站 11 个核心知识点
const pointsEntries: GlossaryEntry[] = (pointsData.points as any[]).map((p) => ({
  id: p.id,
  nameZh: p.name,
  nameEn: p.en || p.name,
  ipa: p.ipa,
  emoji: p.emoji,
  summaryZh: p.summary,
  summaryEn: p.summaryEn || '',
  aliases: [p.name, p.en, p.id].filter(Boolean),
  bridges: p.bridges || [],
}))

// 2. 融入 SciencePre, IGCSE_miniMax 及 sky_science_game 常见的高频科学词
const ecosystemEntries: GlossaryEntry[] = [
  {
    id: 'amylase',
    nameZh: '淀粉酶',
    nameEn: 'Amylase',
    ipa: '/ˈæmɪleɪz/',
    emoji: '✂️',
    summaryZh: '由唾液、胰腺或曲霉分泌的消化水解酶，像分子小剪刀一样把长链淀粉切成麦芽糖。',
    summaryEn: 'An enzyme found in saliva and fermenters that catalyses the hydrolysis of starch into sugars.',
    aliases: ['淀粉酶', 'amylase', '酶'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 食物营养检测',
        title: '剑桥 0610 虚拟食物营养检测实验台',
        desc: '滴加碘液观察淀粉变蓝黑，加入淀粉酶水解后褪色变糖',
        url: 'https://www.igcse.xyz/practical',
      },
      {
        target: 'sky',
        badge: '🎯 G8 词汇大练兵',
        title: 'G8 消化与酶核心词挑战',
        desc: '掌握酶的锁钥模型与活性温度',
        url: 'https://sky.igcse.xyz',
      },
    ],
  },
  {
    id: 'glucose',
    nameZh: '葡萄糖',
    nameEn: 'Glucose',
    ipa: '/ˈɡluːkoʊs/',
    emoji: '🍬',
    summaryZh: '六碳单糖分子（C₆H₁₂O₆），是生物体呼吸作用与发酵过程中最核心的即时能量源。',
    summaryEn: 'A simple hexose sugar (C₆H₁₂O₆) acting as the primary fuel for cellular respiration and fermentation.',
    aliases: ['葡萄糖', 'glucose', '单糖'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 还原糖检测',
        title: '斐林试剂/本尼迪特试剂水浴加热',
        desc: '亲手在试管中测试葡萄糖生成砖红色沉淀',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'maltose',
    nameZh: '麦芽糖',
    nameEn: 'Maltose',
    ipa: '/ˈmɔːltoʊs/',
    emoji: '🍯',
    summaryZh: '由两个葡萄糖分子缩合而成的二糖（C₁₂H₂₂O₁₁），米饭糖化过程产生的清甜物质。',
    summaryEn: 'A disaccharide (C₁₂H₂₂O₁₁) formed by two units of glucose, produced during starch hydrolysis.',
    aliases: ['麦芽糖', 'maltose', '二糖'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 酶水解机制',
        title: '淀粉酶水解淀粉为麦芽糖动力学',
        desc: '观察底物浓度与产物生成速率曲线',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'starch',
    nameZh: '淀粉',
    nameEn: 'Starch',
    ipa: '/stɑːrtʃ/',
    emoji: '🍚',
    summaryZh: '植物储存能量的高分子多糖 (C₆H₁₀O₅)ₙ，遇碘液会产生特征性的蓝黑色复合物。',
    summaryEn: 'A polymeric carbohydrate consisting of numerous glucose units joined by glycosidic bonds.',
    aliases: ['淀粉', 'starch', '多糖'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 碘液实验',
        title: '碘液检测叶片与食物中的淀粉',
        desc: '经典实验：酒精脱色后滴碘观察蓝黑变化',
        url: 'https://www.igcse.xyz/practical',
      },
      {
        target: 'pre',
        badge: '🌱 自然启蒙工坊',
        title: '叶片微观厨房的光合作用产物',
        desc: '阳光照耀下植物怎么烘焙能量饼干',
        url: 'https://pre.igcse.xyz/plants/',
      },
    ],
  },
  {
    id: 'protein',
    nameZh: '蛋白质',
    nameEn: 'Protein',
    ipa: '/ˈproʊtiːn/',
    emoji: '🥩',
    summaryZh: '由氨基酸脱水缩合而成的大分子，构成生命的骨架与催化酶，遇双缩脲试剂变紫色。',
    summaryEn: 'Large biological molecules consisting of amino acid chains, vital for tissue structure and enzymatic catalysis.',
    aliases: ['蛋白质', 'protein', '面筋蛋白'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 生化检测',
        title: '双缩脲试剂（Biuret Test）蛋白质检测',
        desc: '亲自滴加硫酸铜与氢氧化钠检验紫色络合物',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'carbon-dioxide',
    nameZh: '二氧化碳',
    nameEn: 'Carbon Dioxide',
    ipa: '/ˈkɑːrbən daɪˈɑːksaɪd/',
    emoji: '🫧',
    summaryZh: '无色无味的气体分子（CO₂），能使澄清石灰水变浑浊，是发酵让面包膨胀的关键气体。',
    summaryEn: 'A colourless gas (CO₂) produced during cellular respiration and fermentation, turning limewater cloudy.',
    aliases: ['二氧化碳', 'carbon dioxide', 'co2', 'CO2'],
    bridges: [
      {
        target: 'zperiod',
        badge: '🧪 3D 周期表微观',
        title: '碳 (C) 与氧 (O) 分子键结构模型',
        desc: '观察共用电子对与极性共价键 3D 排布',
        url: 'https://zperiod.igcse.xyz',
      },
      {
        target: 'minimax',
        badge: '🔬 0620 气体检验',
        title: '气体发生与收集检验虚拟台',
        desc: '检验 CO₂ 使澄清石灰水变浑浊的沉淀实验',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'photosynthesis',
    nameZh: '光合作用',
    nameEn: 'Photosynthesis',
    ipa: '/ˌfoʊtoʊˈsɪnθəsɪs/',
    emoji: '☀️',
    summaryZh: '绿色植物利用叶绿素吸收光能，把二氧化碳和水合成为葡萄糖并释放氧气的生命奇迹。',
    summaryEn: 'The biological process by which green plants synthesize glucose from carbon dioxide and water using light energy.',
    aliases: ['光合作用', 'photosynthesis'],
    bridges: [
      {
        target: 'pre',
        badge: '🌱 自然启蒙微观厨房',
        title: '阳光厨房与光合作用互动实验器',
        desc: '调节光照、水分和 CO₂，看金鱼藻实时冒气泡',
        url: 'https://pre.igcse.xyz/plants/',
      },
      {
        target: 'minimax',
        badge: '🔬 0610 限制因子',
        title: '0610 光照强度与速率限制因子模拟器',
        desc: '探究光源距离与气泡生成速率关系的数学拟合',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'chloroplast',
    nameZh: '叶绿体',
    nameEn: 'Chloroplast',
    ipa: '/ˈklɔːrəplæst/',
    emoji: '🍃',
    summaryZh: '植物细胞内含有叶绿素的微型绿色加工厂，专门负责捕捉阳光进行光合作用。',
    summaryEn: 'Plant cell organelles that conduct photosynthesis using green chlorophyll pigment.',
    aliases: ['叶绿体', 'chloroplast', '叶绿素'],
    bridges: [
      {
        target: 'pre',
        badge: '🌱 3D 细胞积木',
        title: '植物细胞 3D 奇幻积木与叶绿体剖面',
        desc: '旋转 3D 细胞观察叶绿体的双层膜与类囊体',
        url: 'https://pre.igcse.xyz',
      },
      {
        target: 'minimax',
        badge: '🔬 0610 显微切片',
        title: '栅栏叶肉细胞显微镜实拍观测',
        desc: '观察排列整齐、富含叶绿体的栅栏组织',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'cell-wall',
    nameZh: '细胞壁',
    nameEn: 'Cell Wall',
    ipa: '/sel wɔːl/',
    emoji: '🏰',
    summaryZh: '由纤维素编织而成的坚固外壳，保护植物细胞并维持坚挺形态，防止吸水涨破。',
    summaryEn: 'A rigid outer cellulose layer supporting and protecting plant cells from osmotic bursting.',
    aliases: ['细胞壁', 'cell wall', '纤维素'],
    bridges: [
      {
        target: 'pre',
        badge: '🌱 绿色防弹城堡',
        title: '植物为何没有骨骼也能顶天立地？',
        desc: '探索高耐压纤维素网络与植物支持力学',
        url: 'https://pre.igcse.xyz',
      },
      {
        target: 'minimax',
        badge: '🔬 0610 渗透吸水',
        title: '植物细胞质壁分离与复原模拟',
        desc: '高浓度盐水下原生质体与细胞壁分离现象',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'xylem',
    nameZh: '导管（木质部）',
    nameEn: 'Xylem',
    ipa: '/ˈzaɪləm/',
    emoji: '🚀',
    summaryZh: '由中空的死细胞首尾相连构成的单向水流升降机，把根部吸收的水和无机盐送往高空叶片。',
    summaryEn: 'Non-living vascular tissue in plants transporting water and dissolved minerals upwards from roots.',
    aliases: ['导管', '木质部', 'xylem'],
    bridges: [
      {
        target: 'pre',
        badge: '🌱 动感管道模拟',
        title: '水流直达梯：50米大树如何喝到地下水？',
        desc: '蒸腾拉力驱动水流像微型火箭一样冲向树顶',
        url: 'https://pre.igcse.xyz/plants/',
      },
      {
        target: 'minimax',
        badge: '🔬 0610 蒸腾计实验',
        title: '气泡式蒸腾计测量植物吸水速率',
        desc: '探究风速、温度与湿度对木质部水流速率的影响',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'phloem',
    nameZh: '筛管（韧皮部）',
    nameEn: 'Phloem',
    ipa: '/ˈfloʊem/',
    emoji: '🚚',
    summaryZh: '活细胞构成的双向营养快车道，把叶片光合作用制造的蔗糖和氨基酸输送至果实、根部。',
    summaryEn: 'Living plant vascular tissue responsible for the bidirectional translocation of sucrose and amino acids.',
    aliases: ['筛管', '韧皮部', 'phloem'],
    bridges: [
      {
        target: 'pre',
        badge: '🌱 甜蜜双向快递',
        title: '筛管双向穿梭列车互动演示',
        desc: '观察从叶片源端流向根部库端的物质转运',
        url: 'https://pre.igcse.xyz/plants/',
      },
    ],
  },
  {
    id: 'stomata',
    nameZh: '气孔',
    nameEn: 'Stomata',
    ipa: '/ˈstoʊmətə/',
    emoji: '🚪',
    summaryZh: '叶片表皮上由一对保卫细胞守卫的微孔，是植物呼出水蒸气、吸入二氧化碳的气体门卫。',
    summaryEn: 'Microscopic pores on leaf surfaces regulated by guard cells for gas exchange and transpiration.',
    aliases: ['气孔', 'stomata', '保卫细胞'],
    bridges: [
      {
        target: 'pre',
        badge: '🌱 微观门卫工坊',
        title: '保卫细胞膨胀与气孔开合微观机制',
        desc: '观察吸水膨胀外凸与缺水萎蔫关闭',
        url: 'https://pre.igcse.xyz/plants/',
      },
      {
        target: 'minimax',
        badge: '🔬 0610 显微镜制片',
        title: '鸭跖草下表皮气孔显微镜涂片制作',
        desc: '高倍镜下统计上下表皮气孔密度分布差异',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'respiration',
    nameZh: '呼吸作用',
    nameEn: 'Respiration',
    ipa: '/ˌrespəˈreɪʃn/',
    emoji: '🫁',
    summaryZh: '细胞在线粒体内氧化分解有机营养物释放 ATP 生命能量的生化过程，分有氧与无氧两种。',
    summaryEn: 'Cellular biochemical pathway oxidizing glucose to release usable ATP energy, aerobically or anaerobically.',
    aliases: ['呼吸作用', 'respiration', '有氧呼吸', '无氧呼吸'],
    bridges: [
      {
        target: 'sky',
        badge: '🎯 G8 动画展示',
        title: '人体呼吸运动与胸廓容积变化动画',
        desc: '膈肌收缩下降、肺内气压减小完成吸气',
        url: 'https://sky.igcse.xyz',
      },
      {
        target: 'minimax',
        badge: '🔬 0610 核心考纲',
        title: '0610 Chapter 12: 呼吸作用与能量转换',
        desc: '有氧呼吸 30+ ATP 与无氧呼吸 2 ATP 能量差异推导',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'diffusion',
    nameZh: '扩散',
    nameEn: 'Diffusion',
    ipa: '/dɪˈfjuːʒn/',
    emoji: '💨',
    summaryZh: '分子或离子顺着浓度梯度，从高浓度区域向低浓度区域进行的净随机热运动。',
    summaryEn: 'Net movement of particles from a region of higher concentration to lower concentration down a gradient.',
    aliases: ['扩散', 'diffusion'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 核心实验',
        title: '高锰酸钾在冷热水中扩散速率对比模拟',
        desc: '探究温度与分子动能对扩散平衡时间的影响',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
  {
    id: 'osmosis',
    nameZh: '渗透作用',
    nameEn: 'Osmosis',
    ipa: '/ɒzˈmoʊsɪs/',
    emoji: '💧',
    summaryZh: '水分子穿过半透膜（部分透性膜），顺着水势梯度从高水势溶液向低水势溶液扩散的过程。',
    summaryEn: 'The net movement of water molecules from a region of higher water potential to lower water potential through a partially permeable membrane.',
    aliases: ['渗透作用', 'osmosis', '水势'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 必考经典实验',
        title: '土豆条在不同浓度蔗糖溶液中的质量与长度变化',
        desc: '绘制高渗、低渗与等渗溶液水分子进出平衡图',
        url: 'https://www.igcse.xyz/practical',
      },
    ],
  },
]

// 组合构建全域大词典
export const ALL_GLOSSARY: GlossaryEntry[] = [...pointsEntries, ...ecosystemEntries]

/**
 * 智能查词函数：支持中英文、别名、模糊匹配
 */
export function lookupTerm(query: string): GlossaryEntry | null {
  if (!query || typeof query !== 'string') return null
  const q = query.trim().toLowerCase()
  if (!q) return null

  // 1. 完全精确匹配 id、nameEn、nameZh
  let match = ALL_GLOSSARY.find(
    (e) =>
      e.id.toLowerCase() === q ||
      e.nameEn.toLowerCase() === q ||
      e.nameZh.toLowerCase() === q ||
      e.aliases.some((a) => a.toLowerCase() === q),
  )
  if (match) return match

  // 2. 包含匹配（若用户划选了“淀粉酶的小剪刀”，或者划选了“yeast cells”）
  match = ALL_GLOSSARY.find(
    (e) =>
      q.includes(e.nameZh.toLowerCase()) ||
      (e.nameEn && q.includes(e.nameEn.toLowerCase())) ||
      e.aliases.some((a) => q.includes(a.toLowerCase())),
  )
  if (match) return match

  // 3. 反向包含（用户划选了单个词，而词典条目名称包含它）
  if (q.length >= 2) {
    match = ALL_GLOSSARY.find(
      (e) =>
        e.nameZh.toLowerCase().includes(q) ||
        (e.nameEn && e.nameEn.toLowerCase().includes(q)),
    )
  }

  return match || null
}
