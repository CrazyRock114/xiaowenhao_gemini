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
  {
    id: 'hippocampus',
    nameZh: '海马体',
    nameEn: 'Hippocampus',
    ipa: '/ˌhɪpəˈkæmpəs/',
    emoji: '🐴',
    summaryZh: '大脑深处状如海马的结构，是情景记忆编码、学习与空间认知的总调度站。',
    summaryEn: 'A seahorse-shaped structure embedded in the temporal lobe crucial for memory consolidation and spatial mapping.',
    aliases: ['海马体', 'hippocampus', '记忆中心'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 神经系统',
        title: '剑桥边缘系统与短期/长期记忆形成机制',
        desc: '探索海马体长时程增强（LTP）与突触可塑性',
        url: 'https://www.igcse.xyz',
      },
      {
        target: 'sky',
        badge: '🎯 G8 词汇大练兵',
        title: 'G8 记忆与神经调控核心词',
        desc: '60秒极速挑战与突触传导真题',
        url: 'https://sky.igcse.xyz',
      },
    ],
  },
  {
    id: 'amygdala',
    nameZh: '杏仁核',
    nameEn: 'Amygdala',
    ipa: '/əˈmɪɡdələ/',
    emoji: '🚨',
    summaryZh: '大脑的情绪哨兵与威胁警报器，负责恐惧警觉、危险识别和战斗或逃跑预警。',
    summaryEn: 'An almond-shaped nucleus in the temporal lobe essential for threat detection and emotional arousal.',
    aliases: ['杏仁核', 'amygdala', '情绪警报器'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 应急反应',
        title: '交感神经兴奋与肾上腺素激增应激模型',
        desc: '观察心率加快、瞳孔放大与骨骼肌供血增加反应',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'prefrontal-cortex',
    nameZh: '前额叶皮层',
    nameEn: 'Prefrontal Cortex (PFC)',
    ipa: '/ˌpriːˈfrʌntl ˈkɔːrteks/',
    emoji: '🎯',
    summaryZh: '大脑最高决策中心，主管专注力、计划组织、冲动控制和理性思考。',
    summaryEn: 'The cerebral cortex covering the front part of the frontal lobe, managing executive control and impulse inhibition.',
    aliases: ['前额叶', '前额叶皮层', 'pfc', 'prefrontal cortex'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 神经反射',
        title: '条件反射与高级大脑皮层决策过程',
        desc: '对比非条件反射与经过前额叶思考的主动行为',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'broca-area',
    nameZh: '布罗卡区',
    nameEn: "Broca's Area",
    ipa: '/ˈbroʊkəz ˈeəriə/',
    emoji: '🗣️',
    summaryZh: '位于优势半球额叶的运动性语言中枢，专门指挥声带、舌头和嘴唇组织说话。',
    summaryEn: 'A region in the frontal lobe of the dominant hemisphere responsible for motor speech production and articulation.',
    aliases: ['布罗卡区', 'broca', "broca's area", '语言中枢'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 效应器驱动',
        title: '躯体运动皮层支配喉肌与舌肌运动单元',
        desc: '观察动作电位如何支配呼吸肌与发音肌群',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'wernicke-area',
    nameZh: '韦尼克区',
    nameEn: "Wernicke's Area",
    ipa: '/ˈvɜːrnɪkiz ˈeəriə/',
    emoji: '📖',
    summaryZh: '位于颞叶的感觉性语言中枢，像脑海里的大字典，负责理解别人所说的词汇语义。',
    summaryEn: 'A region in the posterior temporal lobe critical for the comprehension of written and spoken language.',
    aliases: ['韦尼克区', 'wernicke', "wernicke's area", '听懂语言'],
    bridges: [
      {
        target: 'sky',
        badge: '🎯 G8 听觉传导',
        title: '声音机械波到脑电语义解析的全程图解',
        desc: '外耳集音到大脑语言区解码',
        url: 'https://sky.igcse.xyz',
      },
    ],
  },
  {
    id: 'action-potential',
    nameZh: '动作电位',
    nameEn: 'Action Potential',
    ipa: '/ˈækʃn pəˈtenʃl/',
    emoji: '⚡',
    summaryZh: '神经纤维上瞬间爆发的毫伏级电脉冲，是神经元之间传递信息的基本密码。',
    summaryEn: 'A rapid, transient electrical membrane depolarization and repolarization propagating along an axon.',
    aliases: ['动作电位', 'action potential', '神经电冲动', '放电'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 神经电传导',
        title: '轴突膜离子通道电压钳与动作电位示波器',
        desc: '观察膜电位由 -70mV 去极化跃升至 +30mV 的微观全过程',
        url: 'https://www.igcse.xyz/practical',
      },
      {
        target: 'zperiod',
        badge: '🧪 3D 周期表微观',
        title: '钠离子 (Na⁺) 与钾离子 (K⁺) 跨膜转运泵',
        desc: '查看 11 号钠与 19 号钾的电子层与离子水合半径',
        url: 'https://zperiod.igcse.xyz',
      },
    ],
  },
  {
    id: 'neurotransmitter',
    nameZh: '神经递质',
    nameEn: 'Neurotransmitter',
    ipa: '/ˌnʊroʊtrænzˈmɪtər/',
    emoji: '💊',
    summaryZh: '突触间隙传递信号的化学信使小渡船（如多巴胺、谷氨酸、GABA 等）。',
    summaryEn: 'Chemical messenger molecules released by axon terminals to transmit signals across synaptic clefts.',
    aliases: ['神经递质', 'neurotransmitter', '多巴胺', '化学信使'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 突触结构',
        title: '突触小泡胞吐释放与突触后膜受体通道开启',
        desc: '单向电-化-电突触信号转导动力学模拟',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'vestibular-system',
    nameZh: '前庭平衡系统',
    nameEn: 'Vestibular System',
    ipa: '/veˈstɪbjələr ˈsɪstəm/',
    emoji: '🧭',
    summaryZh: '内耳深处的三轴陀螺仪与加速度计，哪怕闭上眼也能感知重力方向与旋转运动。',
    summaryEn: 'The inner ear sensory organ detecting spatial orientation, angular rotation, and linear acceleration.',
    aliases: ['前庭系统', '前庭', 'vestibular', '平衡觉', '陀螺仪'],
    bridges: [
      {
        target: 'minimax',
        badge: '⚛️ 0625 惯性与导航',
        title: '航天三轴惯性制导陀螺仪与半规管物理模型比对',
        desc: '探究流体剪切流动与角动量守恒在人体生物陀螺仪中的奇妙应用',
        url: 'https://www.igcse.xyz',
      },
    ],
  },
  {
    id: 'proprioception',
    nameZh: '本体感觉',
    nameEn: 'Proprioception',
    ipa: '/ˌproʊpri.oʊˈsepʃn/',
    emoji: '🤸',
    summaryZh: '肌肉与关节中的隐藏位置雷达，让你闭上眼睛也能清楚知道自己四肢所在的位置。',
    summaryEn: 'The body sense providing awareness of the position and movement of limbs and posture without vision.',
    aliases: ['本体感觉', 'proprioception', '关节感觉'],
    bridges: [
      {
        target: 'minimax',
        badge: '🔬 0610 感觉反馈',
        title: '肌梭与高尔基腱器官牵张反射回路',
        desc: '膝跳反射机制与脊髓神经元快速自动微调',
        url: 'https://www.igcse.xyz',
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
