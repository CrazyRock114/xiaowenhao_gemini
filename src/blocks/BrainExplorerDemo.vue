<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { speakWord } from '../utils/speech'

const props = defineProps<{
  block?: any
  issueId?: string
}>()

// 主标签页切换：'map' (全景脑图) | 'action-potential' (动作电位) | 'vision' (视觉流水线) | 'senses' (8大感官) | 'networks' (协同网络)
const activeTab = ref<'map' | 'action-potential' | 'vision' | 'senses' | 'networks'>('map')

// 适龄阅读分轨：'basic' (弟弟/生活趣味) | 'advanced' (哥哥/严谨神经生物学)
const level = ref<'basic' | 'advanced'>('basic')

// 底图模式：'overview' (ChatGPT全景图) | 'poster' (原海报)
const mapSource = ref<'overview' | 'poster'>('overview')

// 脑区数据定义
interface RegionDetail {
  id: string
  nameZh: string
  nameEn: string
  ipa: string
  emoji: string
  color: string
  overviewCoords: { top: string; left: string }
  summaryZh: string
  summaryEn: string
  hardwareNum: string
  basicDesc: string
  advDesc: string
  clinicalNote: string
}

const regions: Record<string, RegionDetail> = {
  frontal: {
    id: 'frontal',
    nameZh: '额叶',
    nameEn: 'Frontal Lobe',
    ipa: '/ˈfrʌntl loʊb/',
    emoji: '👑',
    color: '#E5484D',
    overviewCoords: { top: '22%', left: '33%' },
    summaryZh: '大脑飞船的总指挥舰长，掌管计划、决策、冲动自控与随意运动。',
    summaryEn: 'Executive control hub for planning, decision-making, impulse regulation, and motor output.',
    hardwareNum: '人类最发达脑区 · 占皮层总面积约1/3 · 20多岁才发育成熟',
    basicDesc: '位于你的脑门正后方。当你克制住不吃零食先写完作业、当你耐心排队等待，或者认真思考棋步时，全靠额叶总舰长在沉着下达命令。它的后部还指挥着嘴巴说话（布罗卡区）和双手双脚的主动动作。',
    advDesc: '包含前额叶皮层（PFC，背外侧与腹内侧构成自上而下执行控制系统）、初级运动皮层（M1，按运动小人身体映射支配骨骼肌）与布罗卡区（Broca\'s Area，负责运动语言规划与句法组织）。前额叶与边缘系统构成动态负反馈，抑制即时欲望。',
    clinicalNote: '若布罗卡区受损会引发运动性失语症（心中有数却说不出口）；前额叶受损常导致冲动失控与注意力涣散。',
  },
  parietal: {
    id: 'parietal',
    nameZh: '顶叶',
    nameEn: 'Parietal Lobe',
    ipa: '/pəˈraɪətl loʊb/',
    color: '#3B82F6',
    emoji: '📡',
    overviewCoords: { top: '24%', left: '57%' },
    summaryZh: '身体空间雷达与触觉整合中枢，负责温度、痛感与三维位置导航。',
    summaryEn: 'Integrates somatosensory inputs and constructs egocentric 3D spatial coordinate maps.',
    hardwareNum: '两点辨别觉最高分辨率在手指与唇部 · 顶内沟高密度多模态神经元',
    basicDesc: '位于头顶偏后位置。当你闭上眼睛也能一口气准确摸到自己的鼻子、当你伸手接住高速飞来的皮球、当你摸到冰水觉得凉飕飕时，全靠顶叶雷达站帮你感知身体并计算距离。',
    advDesc: '前部为初级躯体感觉皮层（S1），接收对侧皮肤机械感受器、冷热与伤害性痛觉投射；后部顶叶联合区与顶内沟（IPS）将视网膜视觉信号与关节本体感觉融合成统一的三维空间坐标系，指导视向引导抓握（Visually Guided Grasping）。',
    clinicalNote: '顶叶受损常导致空间忽略综合征（如画钟表漏画半边）或不能正确感知自己肢体位置。',
  },
  occipital: {
    id: 'occipital',
    nameZh: '枕叶',
    nameEn: 'Occipital Lobe',
    ipa: '/ɑːkˈsɪpɪtl loʊb/',
    color: '#10B981',
    emoji: '🖥️',
    overviewCoords: { top: '42%', left: '72%' },
    summaryZh: '超高清动态视觉超级GPU，把双眼采集的光信号分级渲染成全彩世界。',
    summaryEn: 'Primary and extrastriate visual processing cortex for contours, motion, and color.',
    hardwareNum: '40~60 亿专用神经元 · 接收双眼视神经 100 万轴突高速光缆',
    basicDesc: '虽然眼睛长在脸庞前方，但真正「看懂」世界的超级计算机却在后脑勺！双眼拍下的光信号像光纤通信一样送到后脑勺的枕叶，经过一连串流水线加工：先挑出线条、再涂上颜色、最后拼成活灵活现的立体电影。',
    advDesc: '初级视皮层（V1/纹状皮层）以超柱为单位提取朝向、空间频率与双眼视差；随后向外纹状皮层拓展：腹侧流（V4h/颞叶下回，识别物体形状与颜色）和背侧流（V3/MT/V6/V7，追踪速度方向并指导动作空间拦截）。',
    clinicalNote: '若枕叶皮层受损可能导致皮层盲（眼睛结构完好却什么都看不见）或失去颜色感知。',
  },
  temporal: {
    id: 'temporal',
    nameZh: '颞叶',
    nameEn: 'Temporal Lobe',
    ipa: '/ˈtempərəl loʊb/',
    color: '#F59E0B',
    emoji: '📻',
    overviewCoords: { top: '48%', left: '46%' },
    summaryZh: '电台通信与记忆大相册，负责听懂语言、品味音乐以及把经历存入记忆。',
    summaryEn: 'Processes auditory signals, decodes language semantics, and forms episodic memories.',
    hardwareNum: '初级听觉中枢 · 容纳海马体（情景记忆）与杏仁核（情绪警觉）',
    basicDesc: '位于双耳内侧。它不仅能让你听清优美的音乐和爸爸妈妈的声音，还藏着理解语言的超级字典（韦尼克区）。在它的深处还住着形似小海马的「海马体」，负责把今天发生的好玩事情盖章打包，存进一辈子的记忆相册。',
    advDesc: '外侧部包含初级听觉皮层与感觉性言语中枢韦尼克区（Wernicke\'s Area，负责语义解码与语音映射）；内侧颞叶边缘叶（MTL）包含海马体（Hippocampus）与内嗅皮层，主导情景记忆编码与网格细胞空间导航系统。',
    clinicalNote: '韦尼克区受损会导致感觉性失语症（患者语速流利但前言不搭后语，听不懂别人说话）。',
  },
  cerebellum: {
    id: 'cerebellum',
    nameZh: '小脑',
    nameEn: 'Cerebellum',
    ipa: '/ˌserəˈbeləm/',
    color: '#8B5CF6',
    emoji: '🎪',
    overviewCoords: { top: '65%', left: '66%' },
    summaryZh: '身体的超级陀螺仪与杂技师，容纳全脑大半神经元，精细调控平衡与肌肉记忆。',
    summaryEn: 'Houses ~69 billion neurons for fine motor coordination, posture balance, and skill learning.',
    hardwareNum: '整整 690 亿个神经元（占全脑近 80%） · 航天级三轴加速度计与陀螺仪原型',
    basicDesc: '悬挂在大脑后下方。个头不大却拥有全脑绝大多数的神经元！它是身体不知疲倦的杂技师：学骑车、滑冰、踢足球或者弹钢琴时，练习练熟后的「肌肉记忆」就储存在这里，让你不用低头想也能动作行云流水、站得稳稳当当。',
    advDesc: '后颅窝致密微型晶体回路（分子层、普肯野细胞层、颗粒层），以惊人的神经元密度容纳约 690 亿神经元。它接收内耳前庭半规管三轴角速度与耳石重力加速度信号，实时比对前向动力学模型（Forward Model），毫秒级抹除运动误差。',
    clinicalNote: '小脑受损会导致共济失调（走路摇晃如醉酒、手指无法准确点中指尖）。',
  },
  brainstem: {
    id: 'brainstem',
    nameZh: '脑干',
    nameEn: 'Brainstem',
    ipa: '/ˈbreɪnstəm/',
    color: '#D97706',
    emoji: '⚡',
    overviewCoords: { top: '68%', left: '50%' },
    summaryZh: '永不停歇的生命发动机底座，自主掌管呼吸节律、心跳、血压与睡眠觉醒。',
    summaryEn: 'Autonomic life support stalk controlling respiration pacemaking, cardiac rate, and arousal.',
    hardwareNum: '中脑、脑桥、延髓三级架构 · 迷走神经内脏控制中枢',
    basicDesc: '连接大脑与脊髓的粗壮生命主轴。即使在你熟睡、完全忘记操心呼吸和心跳时，脑干也一秒不停地在站岗。它自动检测血液里的氧气含量，指挥心脏有节律地泵血、肺部平稳地吸气，是人体最原始、最不可或缺的「生命守护神」。',
    advDesc: '由中脑、脑桥、延髓三部分构成，是颅脑与脊髓的上下行传导束交通要道。网状结构上行激动系统维持大脑皮层的觉醒意识；延髓的心血管运动中枢与孤束核通过迷走神经调控窦房结心率；延髓前包钦格复合体作为自主呼吸起搏器节律驱动隔肌呼吸。',
    clinicalNote: '脑干是不可替代的生命中枢，一旦遭受重创可能导致呼吸心跳瞬间衰竭，危及生命。',
  },
  hippocampus: {
    id: 'hippocampus',
    nameZh: '海马体',
    nameEn: 'Hippocampus',
    ipa: '/ˌhɪpəˈkæmpəs/',
    color: '#EC4899',
    emoji: '🐴',
    overviewCoords: { top: '50%', left: '55%' },
    summaryZh: '边缘系统深处的记忆调度官，外形如海马，主管短期记忆向长期记忆的固化。',
    summaryEn: 'Seahorse-shaped archicortex crucial for episodic memory consolidation and spatial cognitive maps.',
    hardwareNum: '具有高密度突触长时程增强（LTP）能力 · 成年大脑神经发生少数发生地之一',
    basicDesc: '在大脑深处长得像一只弯弯的海马。每当你今天学到一个新单词、认识一位新朋友，海马体就会把这些新鲜画面先临时记在草稿纸上。等到了夜晚你进入香甜深睡时，它再把便签一张张转移到大脑大皮层中永久收藏！',
    advDesc: '属于边缘系统古皮层，包含齿状回（DG）、CA3、CA1 等亚区。通过突触长时程增强（LTP）快速记录情景记忆，并在非快速眼动（NREM）睡眠期间通过尖波波纹（SWRs）与大脑新皮层发生慢波锁相同步，实现系统级记忆转存（Systems Consolidation）。',
    clinicalNote: '著名病例 H.M. 双侧海马体切除后丧失了形成新长期记忆的能力（顺行性遗忘）。',
  },
  amygdala: {
    id: 'amygdala',
    nameZh: '杏仁核',
    nameEn: 'Amygdala',
    ipa: '/əˈmɪɡdələ/',
    color: '#F43F5E',
    emoji: '🚨',
    overviewCoords: { top: '56%', left: '50%' },
    summaryZh: '边缘系统的情绪警报哨兵，负责危险检测、恐惧记忆与应急快速反应。',
    summaryEn: 'Almond-shaped nucleus in temporal lobe mediating threat detection and emotional conditioning.',
    hardwareNum: '毫秒级感知外界潜在危险 · 战斗或逃跑（Fight-or-Flight）触发源',
    basicDesc: '外形像一颗小小的杏仁。当突然听到一声惊雷或踩到类似蛇的树枝时，杏仁核在 0.05 秒内就会拉响全脑红色警报，让你汗毛竖起、心跳加快，瞬间做好躲避危险的准备！',
    advDesc: '基底外侧核群（BLA）接收丘脑快速粗糙的感觉刺激和皮层精细输入，输出至中央核（CeA）驱动下丘脑-垂体-肾上腺轴（HPA）及交感神经激增，迅速释放去甲肾上腺素与皮质醇。前额叶皮层对杏仁核实施自上而下的抑制调控。',
    clinicalNote: '杏仁核过度亢进常引发焦虑与惊恐障碍；双侧病变则导致危险感知钝化。',
  },
}

const activeRegionKey = ref<string>('frontal')
const activeRegion = computed(() => regions[activeRegionKey.value] || regions.frontal)

function pickRegion(k: string) {
  activeRegionKey.value = k
  speakWord(regions[k].nameEn)
}

// -------------------------------------------------------------
// 舱位二：动作电位电生理示波器 (Action Potential Simulator)
// -------------------------------------------------------------
const glutamate = ref<number>(18) // 兴奋性输入 (+0 ~ +40 mV)
const gaba = ref<number>(6)        // 抑制性输入 (0 ~ 30 mV)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 静息电位为 -70 mV，去极化阈值为 -50 mV (即相对增加 +20 mV)
const netDeltaV = computed(() => glutamate.value - gaba.value)
const calculatedVm = computed(() => -70 + netDeltaV.value)
const willFire = computed(() => netDeltaV.value >= 20)

function drawWaveform() {
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d')
  if (!ctx) return

  const W = cvs.width
  const H = cvs.height

  ctx.clearRect(0, 0, W, H)

  // 背景网格与标尺
  ctx.strokeStyle = '#273248'
  ctx.lineWidth = 1
  for (let y = 30; y < H; y += 40) {
    ctx.beginPath()
    ctx.moveTo(40, y)
    ctx.lineTo(W - 10, y)
    ctx.stroke()
  }

  // 标尺文字
  ctx.fillStyle = '#8E97AB'
  ctx.font = '11px monospace'
  ctx.fillText('+40 mV', 2, 40)
  ctx.fillText('  0 mV', 2, 80)
  ctx.fillText('-50 mV (阈值)', 2, 130)
  ctx.fillText('-70 mV (静息)', 2, 150)
  ctx.fillText('-90 mV', 2, 170)

  // 阈值参考虚线 (-50mV)
  ctx.strokeStyle = 'rgba(240, 169, 73, 0.6)'
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(40, 130)
  ctx.lineTo(W - 10, 130)
  ctx.stroke()
  ctx.setLineDash([])

  // 绘制动作电位波形曲线
  ctx.beginPath()
  ctx.lineWidth = 3

  if (willFire.value) {
    // 触发动作电位：静息 -> 去极化超阈值 -> Na+爆发上冲至 +35mV -> K+外流快速复极 -> 超极化后回稳
    ctx.strokeStyle = '#E5484D'
    ctx.moveTo(45, 150)
    ctx.lineTo(100, 150)
    ctx.lineTo(140, 130)
    ctx.quadraticCurveTo(160, 20, 175, 30) // 爆发峰值 +35mV
    ctx.lineTo(210, 170) // 超极化 -85mV
    ctx.quadraticCurveTo(250, 155, 300, 150) // 钠钾泵恢复 -70mV
    ctx.lineTo(W - 10, 150)
    ctx.stroke()

    // 绘制高亮闪光点
    ctx.fillStyle = '#F59E0B'
    ctx.beginPath()
    ctx.arc(175, 30, 6, 0, Math.PI * 2)
    ctx.fill()
  } else {
    // 未达阈值：微弱局部去极化或超极化波形
    const localVmY = 150 - (netDeltaV.value * 1.0)
    ctx.strokeStyle = '#4C8DFF'
    ctx.moveTo(45, 150)
    ctx.lineTo(100, 150)
    ctx.quadraticCurveTo(150, localVmY, 200, localVmY)
    ctx.quadraticCurveTo(240, 150, 280, 150)
    ctx.lineTo(W - 10, 150)
    ctx.stroke()
  }
}

// -------------------------------------------------------------
// 舱位三：视觉流水线 (Visual Processing System V1~V7)
// -------------------------------------------------------------
const visualStep = ref<number>(0)
const visualSteps = [
  {
    code: 'Retina',
    title: '视网膜感光转换 (Retinal Sensors)',
    cells: '1.25 亿视杆细胞 + 600 万视锥细胞',
    desc: '中心凹（Fovea）高密度集成视锥细胞负责全彩细节；外周视杆细胞极度敏感，专门捕捉弱光与边缘晃动。',
    highlight: '光子撞击视紫红质，光能瞬间转化为微伏级电化学冲动。',
  },
  {
    code: 'Optic Nerve',
    title: '视神经高清光缆 (1M Axons)',
    cells: '单眼 1,000,000 条轴突纤维',
    desc: '感光细胞海量信号在视网膜双极细胞与神经节细胞中前置压缩，经视交叉沿视神经高速直插大脑深处。',
    highlight: '视神经穿出眼球处的「视神经盘」完全没有感光细胞，形成生理盲点！',
  },
  {
    code: 'V1',
    title: '初级视皮层：线条与朝向 (Primary Visual Cortex)',
    cells: '距状裂双侧 · Brodmann 17 区',
    desc: '视觉世界被拆解成最纯粹的像素线段！V1 的简单细胞只对特定倾斜角度（如横线、斜线、竖线）起反应。',
    highlight: '诺贝尔奖 Hubel & Wiesel 经典发现：大脑看世界是从最基本的朝向线条起步的。',
  },
  {
    code: 'V2a / V2b',
    title: '几何形态与立体视差 (Shape & Stereo Depth)',
    cells: '外纹状皮层区域',
    desc: '对比双眼微小的角度差异（视差），拼装出物体的几何轮廓与深度立体感，看清物体的凹凸起伏。',
    highlight: '立体 3D 电影的奥秘就在于给两眼微小视差，骗过 V2 脑区合成深度。',
  },
  {
    code: 'V3-5 / MT',
    title: '运动速度与轨迹捕手 (Motion & Speed)',
    cells: '中颞区 (MT) · 40~60 亿视觉神经元中枢',
    desc: '专门捕捉移动物体！飞来的足球、奔跑的动物、汽车刹车，MT 区神经元对速度和矢量方向极度兴奋。',
    highlight: '若 MT 区损伤会导致「运动失认症」：看汽车流动如同看一张张幻灯片定格跳帧！',
  },
  {
    code: 'V4h',
    title: '色彩恒常与华丽着色 (Color & Hue)',
    cells: '舌回与梭状回皮层',
    desc: '为黑白世界赋予绚烂色彩。无论在金色黄昏还是蓝色阴天，V4h 都能校准光照阴影，让你认出苹果是红色的。',
    highlight: '色彩是大脑皮层的奇妙赋能，大自然本身只有不同波长的电磁波。',
  },
  {
    code: 'V6 & V7 / IPS',
    title: '三维手眼拦截与空间动作 (Visuomotor Coordination)',
    cells: '背侧流顶叶联合区',
    desc: '海报剪影中的棒球击球手、足球门将、高尔夫挥杆！精准计算飞来物体的空间距离，指导小手稳稳抓住。',
    highlight: '航天工程师感叹：这就是生物级高精度导弹拦截追踪导引头！',
  },
]

// -------------------------------------------------------------
// 舱位四：8 大感官通道硬核对比 (8 Sensory Inputs)
// -------------------------------------------------------------
const sensesData = [
  {
    id: 'sight',
    nameZh: '视觉',
    nameEn: 'Sight',
    icon: '👁️',
    stat: '1.25 亿视杆 + 600 万视锥',
    detail: '全彩动态 3D 解析，占据大脑皮层将近 1/3 的计算资源。100 万轴突视神经压缩传输，中心凹直径仅 1.5mm 却拥有超高分辨率。',
    animalCompare: '人类具有三色视觉；鹰的视网膜感光细胞密度是人类的 5 倍，能在千米高空俯瞰草地里的老鼠。',
  },
  {
    id: 'hearing',
    nameZh: '听觉',
    nameEn: 'Hearing',
    icon: '👂',
    stat: '15,500 根耳蜗毛细胞',
    detail: '耳蜗基底膜按频率高低像钢琴键一样展开（20Hz~20000Hz），30,000 条听神经传入脑干与颞叶，分辨八度音程。',
    animalCompare: '蝙蝠可听见 100,000 Hz 超声波用于回声定位；人类则专精于人声语音频率范围。',
  },
  {
    id: 'smell',
    nameZh: '嗅觉',
    nameEn: 'Smell',
    icon: '👃',
    stat: '1200 万嗅觉受体细胞',
    detail: '嗅神经是唯一不经过丘脑中继、直通边缘系统海马体与杏仁核的感官通道！这就是为什么一种熟悉的香气瞬间能唤起童年最深的回忆。',
    animalCompare: '人类 1200 万 vs 普通家犬 10 亿 vs 寻血猎犬 50 亿！狗的嗅觉敏锐度是人类的数万倍以上。',
  },
  {
    id: 'taste',
    nameZh: '味觉',
    nameEn: 'Taste',
    icon: '👅',
    stat: '9,000 个味蕾 (每个50~150受体细胞)',
    detail: '分布在舌乳头、软腭与咽部，识别甜（能量糖）、咸（电解质钠）、酸（维生素/变质腐败）、苦（天然生物碱毒素警告）、鲜（蛋白质氨基酸）。',
    animalCompare: '鲶鱼全身皮肤覆盖超过 100,000 个味觉感受器，等于一条「游动的舌头」。',
  },
  {
    id: 'touch',
    nameZh: '触觉与温痛觉',
    nameEn: 'Touch',
    icon: '✋',
    stat: '每平方厘米多达 200 个痛点',
    detail: '包含迈斯纳小体（轻触动态）、帕西尼小体（高频震动）、默克尔盘（静态压感）、鲁菲尼小体（皮肤牵拉），以及 15 个冷感受器与 1 个温感受器。',
    animalCompare: '指尖与嘴唇的感觉小人投射面积极大；后背两点辨别阈值可达 40mm，而指尖只需 2mm。',
  },
  {
    id: 'balance',
    nameZh: '前庭三轴平衡与加速度',
    nameEn: 'Balance & Vestibular',
    icon: '🧭',
    stat: '三轴空间正交半规管 + 椭圆囊/球囊',
    detail: '内耳流体动力学传感器，检测三维角速度与重力直线加速度。前庭眼动反射（VOR）在奔跑时毫秒级反向转动眼球，视野清晰不晃动。',
    animalCompare: '原海报航天工程师力证：航天飞机惯性制导三轴陀螺仪，在动物内耳中已完美演化数亿年！',
  },
  {
    id: 'proprioception',
    nameZh: '关节与本体位置觉',
    nameEn: 'Proprioception',
    icon: '🤸',
    stat: '肌梭与高尔基腱器官',
    detail: '深埋在肌纤维与肌腱中的张力传感器。闭上眼睛，你依然能清楚知道双臂抬起到什么角度，指导肢体不用肉眼观察也能精准抓握。',
    animalCompare: '猫咪在空中翻身四脚平稳着地，正是前庭觉与强大本体感觉协同调控的奇迹。',
  },
  {
    id: 'face',
    nameZh: '面部表情与共情镜像',
    nameEn: 'Facial Expressions',
    icon: '😊',
    stat: '6 种普遍情绪解码 (喜/悲/怒/惧/厌/惊)',
    detail: '梭状回面孔区与镜像神经元系统协作，能在 100 毫秒内识别对方神态并自动产生共情反射，维系人类复杂的社会合作。',
    animalCompare: '灵长类动物通过面部表情与梳理毛发形成紧密部落社群，表情是大脑高级情感的外化窗口。',
  },
]

// -------------------------------------------------------------
// 舱位五：四大协同网络演示 (Collaborative Networks)
// -------------------------------------------------------------
const activeNetKey = ref<'lang' | 'mem' | 'exec' | 'emot'>('lang')
const nets = {
  lang: {
    title: '🗣️ 语言协同网络 (Language Network)',
    flow: '听觉信号 ➔ 颞叶韦尼克区(理解) ➔ 弓状束白质光缆 ➔ 额叶布罗卡区(语法编码) ➔ 初级运动皮层驱动发音肌群',
    desc: '从听到妈妈说话到开口回答，全脑外侧裂周环路在半秒内完成声学抽取、语义查表、语法组织与数十块喉舌肌肉的精细协调。',
  },
  mem: {
    title: '🧠 记忆编码与长期转存网络 (Memory Network)',
    flow: '海马体CA3/CA1瞬时编码(LTP) ➔ 慢波深度睡眠(SWS) ➔ 尖波波纹锁相振荡 ➔ 额叶与新皮层永久固化',
    desc: '白天海马体快速打上情景时间戳，夜间深睡期大脑皮层与海马体共振放映「无声电影」，将记忆转化为长久相册。',
  },
  exec: {
    title: '🎯 额顶控制与专注力网络 (Fronto-Parietal Network)',
    flow: '背外侧前额叶(DLPFC设定目标) ➔ 顶内沟(IPS空间聚焦) ➔ 扣带回冲突监控 ➔ 压制无关噪声干扰',
    desc: '当你要聚精会神读一本科学书时，前额叶开启航向灯，顶叶拉起屏蔽力场，将窗外电视与跑跳声彻底过滤在外。',
  },
  emot: {
    title: '❤️ 边缘系统与情绪急刹车网络 (Limbic-Prefrontal Circuit)',
    flow: '突发威胁 ➔ 杏仁核瞬时红色警报 ➔ 腹内侧前额叶(vmPFC)深呼吸评估 ➔ 释放GABA抑制性信使平复心跳',
    desc: '被突如其来的声音吓一跳时杏仁核拉响警报；经过深呼吸理性思考，前额叶果断踩下刹车，恢复从容冷静。',
  },
}

onMounted(() => {
  nextTick(() => {
    drawWaveform()
  })
})
</script>

<template>
  <div class="brain-cockpit card">
    <!-- 顶栏：沉浸式导航与双轨切换 -->
    <div class="cockpit-header">
      <div class="cockpit-title-wrap">
        <span class="cyber-badge">🧠 脑科学全景互动探索舱</span>
        <h3 class="cockpit-title">860 亿神经元的大脑地图与感官流水线</h3>
      </div>
      <div class="cockpit-controls">
        <div class="level-pills">
          <button
            type="button"
            class="lvl-btn"
            :class="{ active: level === 'basic' }"
            @click="level = 'basic'"
          >
            🚀 弟弟轨 (G3 启蒙)
          </button>
          <button
            type="button"
            class="lvl-btn"
            :class="{ active: level === 'advanced' }"
            @click="level = 'advanced'"
          >
            🔬 哥哥轨 (G5 进阶)
          </button>
        </div>
      </div>
    </div>

    <!-- 5 大舱位标签切换 -->
    <div class="nav-tabs">
      <button
        type="button"
        class="tab-btn"
        :class="{ active: activeTab === 'map' }"
        @click="activeTab = 'map'"
      >
        🗺️ 超清全景脑图探针
      </button>
      <button
        type="button"
        class="tab-btn"
        :class="{ active: activeTab === 'action-potential' }"
        @click="activeTab = 'action-potential'; nextTick(drawWaveform)"
      >
        ⚡ 动作电位示波器
      </button>
      <button
        type="button"
        class="tab-btn"
        :class="{ active: activeTab === 'vision' }"
        @click="activeTab = 'vision'"
      >
        👁️ 视觉 GPU 流水线 V1–V7
      </button>
      <button
        type="button"
        class="tab-btn"
        :class="{ active: activeTab === 'senses' }"
        @click="activeTab = 'senses'"
      >
        📡 8 大感官通道对比
      </button>
      <button
        type="button"
        class="tab-btn"
        :class="{ active: activeTab === 'networks' }"
        @click="activeTab = 'networks'"
      >
        🌐 四大协同网络
      </button>
    </div>

    <!-- ═══════════════════════════════════════════════
         舱位 1：超清全景脑图互动探针 (ChatGPT全景图 / 原海报)
         ═══════════════════════════════════════════════ -->
    <div v-if="activeTab === 'map'" class="tab-pane anim-fade">
      <div class="map-toolbar">
        <span class="toolbar-hint">
          💡 点击大图上的<strong>呼吸光标探针</strong>，或点击下方脑区导航，在下方深度解剖每个脑区：
        </span>
        <div class="source-switch">
          <button
            type="button"
            class="src-btn"
            :class="{ active: mapSource === 'overview' }"
            @click="mapSource = 'overview'"
          >
            🎨 ChatGPT 大脑结构全景图
          </button>
          <button
            type="button"
            class="src-btn"
            :class="{ active: mapSource === 'poster' }"
            @click="mapSource = 'poster'"
          >
            🚀 航天工程师原版海报图 (2000×1500)
          </button>
        </div>
      </div>

      <div class="map-layout">
        <!-- 左侧：超清图与覆盖探针 -->
        <div class="map-view-box">
          <div class="img-wrapper">
            <img
              v-if="mapSource === 'overview'"
              src="/assets/brain-diagram-overview.jpg"
              alt="大脑结构与功能全景图"
              class="hd-brain-img"
            />
            <img
              v-else
              src="/agents-showcase/doubao21pro/assets/poster.jpg"
              alt="Your High-Tech Brain 原海报"
              class="hd-brain-img"
            />

            <!-- 覆盖在全景图上的热点探针 (当展示 ChatGPT 全景图时) -->
            <template v-if="mapSource === 'overview'">
              <div
                v-for="(reg, k) in regions"
                :key="k"
                class="hotspot-pin"
                :class="{ active: activeRegionKey === k }"
                :style="{ top: reg.overviewCoords.top, left: reg.overviewCoords.left, '--c': reg.color }"
                @click="pickRegion(k)"
              >
                <div class="pin-marker"></div>
                <span class="pin-tag">{{ reg.nameZh }}</span>
              </div>
            </template>
          </div>
          <div class="img-bottom-tip">
            <span>🔍 超清大图 · 支持点击探针精细定位</span>
            <a
              :href="mapSource === 'overview' ? '/assets/brain-diagram-overview.jpg' : '/agents-showcase/doubao21pro/assets/poster.jpg'"
              target="_blank"
              rel="noopener noreferrer"
              class="view-raw-link"
            >
              新窗口打开超清原图 ➔
            </a>
          </div>
        </div>

        <!-- 下方：当前选中脑区深度解析卡片（全宽上下排布） -->
        <div class="region-detail-card" :style="{ '--reg-color': activeRegion.color }">
          <div class="detail-top">
            <div class="detail-header-left">
              <span class="reg-emoji" :style="{ background: activeRegion.color + '25' }">
                {{ activeRegion.emoji }}
              </span>
              <div>
                <div class="title-en-row">
                  <h4 class="reg-en">{{ activeRegion.nameEn }}</h4>
                  <button
                    type="button"
                    class="audio-btn"
                    title="发音"
                    @click="speakWord(activeRegion.nameEn)"
                  >
                    🔊
                  </button>
                </div>
                <div class="title-zh-row">
                  <span class="reg-zh">{{ activeRegion.nameZh }}</span>
                  <span class="reg-ipa">{{ activeRegion.ipa }}</span>
                </div>
              </div>
            </div>

            <div class="hardware-box">
              <span class="hw-icon">📊</span>
              <span class="hw-text">{{ activeRegion.hardwareNum }}</span>
            </div>
          </div>

          <div class="detail-content">
            <p class="summary-text">{{ activeRegion.summaryZh }}</p>
            <p class="summary-en-text">{{ activeRegion.summaryEn }}</p>

            <div class="mode-explanation">
              <div class="mode-badge">
                {{ level === 'basic' ? '🚀 弟弟轨·直观解析：' : '🔬 哥哥轨·微观机制：' }}
              </div>
              <p class="desc-para">
                {{ level === 'basic' ? activeRegion.basicDesc : activeRegion.advDesc }}
              </p>
            </div>

            <div v-if="level === 'advanced'" class="clinical-box">
              <strong>🩺 神经科学与临床认知：</strong>
              <span>{{ activeRegion.clinicalNote }}</span>
            </div>
          </div>

          <!-- 快捷切换脑区按钮组 -->
          <div class="region-chip-list">
            <button
              v-for="(r, rk) in regions"
              :key="rk"
              type="button"
              class="chip-item"
              :class="{ active: activeRegionKey === rk }"
              :style="{ '--rc': r.color }"
              @click="pickRegion(rk)"
            >
              <span>{{ r.emoji }}</span>
              <span>{{ r.nameZh }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         舱位 2：动作电位示波器 (Action Potential Simulator)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'action-potential'" class="tab-pane anim-fade">
      <div class="sim-intro">
        <h4 class="sim-h4">⚡ 神经元放电公式与膜电位实时示波器</h4>
        <p class="sim-p">
          原海报核心电生理法则：<strong>IF (D⁺ + G⁺ − GABA⁻) &gt; +20 mV Then FIRE ⚡</strong>。<br>
          神经元静息膜电位为 <strong>−70 mV</strong>。当兴奋性神经递质推动膜电位正向去极化超过 <strong>+20 mV</strong>（达到 <strong>−50 mV</strong> 阈值），电压门控 Na⁺ 通道瞬间爆发式开放，释放毫秒级动作电位！
        </p>
      </div>

      <div class="sim-grid">
        <!-- 左侧：示波器 Canvas -->
        <div class="oscilloscope-box">
          <div class="osc-header">
            <span class="osc-title">📈 膜电位毫秒级示波器 (Membrane Potential Vm)</span>
            <span class="status-badge" :class="{ firing: willFire }">
              {{ willFire ? '⚡ 动作电位爆发中 (ACTION POTENTIAL!)' : '💤 待机静息状态 (Subthreshold)' }}
            </span>
          </div>
          <canvas ref="canvasRef" width="460" height="200" class="osc-canvas"></canvas>
          <div class="osc-footer">
            <span>当前瞬时膜电位：<strong :style="{ color: willFire ? '#E5484D' : '#4C8DFF' }">{{ calculatedVm }} mV</strong></span>
            <span>放电阈值线：<strong>−50 mV (ΔV = +20 mV)</strong></span>
          </div>
        </div>

        <!-- 右侧：递质滑块与物理原理控制台 -->
        <div class="controls-box">
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">🟢 兴奋性输入（谷氨酸 Glutamate & 多巴胺）:</span>
              <strong class="slider-val">+{{ glutamate }} mV</strong>
            </div>
            <input
              v-model.number="glutamate"
              type="range"
              min="0"
              max="45"
              class="range-slider slider-green"
              @input="drawWaveform"
            />
            <small class="slider-tip">促进 Na⁺ 阳离子通道开放，使细胞内电位上升（去极化）。</small>
          </div>

          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">🔴 抑制性输入（GABA 刹车）:</span>
              <strong class="slider-val">−{{ gaba }} mV</strong>
            </div>
            <input
              v-model.number="gaba"
              type="range"
              min="0"
              max="35"
              class="range-slider slider-red"
              @input="drawWaveform"
            />
            <small class="slider-tip">促进 Cl⁻ 阴离子内流，使膜电位更负（超极化抑制，踩刹车）。</small>
          </div>

          <div class="calc-box">
            <div class="calc-row">
              <span>相对去极化增量 ΔV：</span>
              <strong>{{ netDeltaV >= 0 ? '+' + netDeltaV : netDeltaV }} mV</strong>
            </div>
            <div class="calc-result" :class="{ fire: willFire }">
              {{ willFire ? '✅ ΔV ≥ +20 mV ➔ 触发动作电位！' : '❌ ΔV < +20 mV ➔ 电位不足，无法放电。' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         舱位 3：视觉流水线 V1–V7 (The Visual Pipeline)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'vision'" class="tab-pane anim-fade">
      <div class="sim-intro">
        <h4 class="sim-h4">👁️ 视觉处理系统：40–60 亿神经元的超级 GPU 流水线</h4>
        <p class="sim-p">
          人类识别一张脸或接住一个棒球只要几百毫秒，但信息在后脑勺经历了 7 级极为震撼的分层加工。点击下方各步骤查看大脑如何“绘制世界”：
        </p>
      </div>

      <div class="pipeline-stepper">
        <button
          v-for="(st, idx) in visualSteps"
          :key="st.code"
          type="button"
          class="step-pill"
          :class="{ active: visualStep === idx }"
          @click="visualStep = idx"
        >
          <span class="step-num">{{ idx + 1 }}</span>
          <span class="step-code">{{ st.code }}</span>
        </button>
      </div>

      <div class="step-card anim-pop">
        <div class="step-card-head">
          <div class="step-title-row">
            <span class="step-badge">第 {{ visualStep + 1 }} 级视觉加工厂</span>
            <h4 class="step-main-title">{{ visualSteps[visualStep].title }}</h4>
          </div>
          <span class="step-cells-tag">{{ visualSteps[visualStep].cells }}</span>
        </div>
        <p class="step-desc">{{ visualSteps[visualStep].desc }}</p>
        <div class="step-highlight">
          <strong>🔬 核心机制：</strong>{{ visualSteps[visualStep].highlight }}
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         舱位 4：8 大感官通道硬核对比 (8 Sensory Inputs)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'senses'" class="tab-pane anim-fade">
      <div class="sim-intro">
        <h4 class="sim-h4">📡 追踪 8 种感官输入 (Follow the 8 Sensory Inputs)</h4>
        <p class="sim-p">
          原海报作者强调：人类不仅有传统的五感，更装备了前庭加速度陀螺仪、关节本体位置觉与面部表情镜像系统。以下是权威神经科学数据盘点：
        </p>
      </div>

      <div class="senses-card-grid">
        <div
          v-for="s in sensesData"
          :key="s.id"
          class="sense-card"
        >
          <div class="sense-card-top">
            <span class="sense-icon">{{ s.icon }}</span>
            <div>
              <h5 class="sense-title">{{ s.nameZh }} <small>({{ s.nameEn }})</small></h5>
              <span class="sense-stat-badge">{{ s.stat }}</span>
            </div>
          </div>
          <p class="sense-detail-text">{{ s.detail }}</p>
          <div class="animal-compare-box">
            <strong>🐾 跨物种硬核比对：</strong>
            <span>{{ s.animalCompare }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         舱位 5：四大协同网络 (Collaborative Networks)
         ═══════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'networks'" class="tab-pane anim-fade">
      <div class="sim-intro">
        <h4 class="sim-h4">🌐 打破单脑区机械孤岛：四大协同功能网络</h4>
        <p class="sim-p">
          ChatGPT 全景图核心精髓：大脑高级能力绝非由单一脑区独立完成，而是由数千亿突触连接而成的宏观网络协同涌现。
        </p>
      </div>

      <div class="net-btn-group">
        <button
          v-for="(v, k) in nets"
          :key="k"
          type="button"
          class="net-btn"
          :class="{ active: activeNetKey === k }"
          @click="activeNetKey = (k as any)"
        >
          {{ v.title.split(' (')[0] }}
        </button>
      </div>

      <div class="net-display-card anim-pop">
        <h4 class="net-display-title">{{ nets[activeNetKey].title }}</h4>
        <div class="net-flow-box">
          <div class="flow-label">⚡ 信号毫秒级流转路径：</div>
          <div class="flow-content">{{ nets[activeNetKey].flow }}</div>
        </div>
        <div class="net-explanation">
          <strong>📖 科学解析：</strong>
          <p>{{ nets[activeNetKey].desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brain-cockpit {
  background: #ffffff;
  border: 2px solid var(--line);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(61, 50, 41, 0.08);
}

.cockpit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.cyber-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  color: #8b5cf6;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.cockpit-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--ink);
  margin: 0;
}

.level-pills {
  display: inline-flex;
  background: #f1ece4;
  padding: 4px;
  border-radius: 999px;
  gap: 4px;
}

.lvl-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink-soft);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lvl-btn.active {
  background: #ffffff;
  color: var(--brand-deep);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.tab-btn {
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 800;
  background: #f9f6f0;
  border: 1.5px solid var(--line);
  color: var(--ink);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  background: var(--brand-soft);
  border-color: var(--brand);
}

.tab-btn.active {
  background: var(--brand-deep);
  color: #ffffff;
  border-color: var(--brand-deep);
  box-shadow: 0 4px 14px rgba(239, 108, 26, 0.25);
}

/* 舱位 1：全景脑图布局 */
.map-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.toolbar-hint {
  font-size: 13px;
  color: var(--ink-soft);
}

.source-switch {
  display: flex;
  gap: 6px;
}

.src-btn {
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  background: #f3eee6;
  border: 1px solid var(--line);
  color: var(--ink);
  cursor: pointer;
}

.src-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}

.map-layout {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
}

.map-view-box {
  background: #0b0e14;
  border: 2px solid var(--line);
  border-radius: 18px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
}

.img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 820px;
  overflow: hidden;
  border-radius: 14px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hd-brain-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.hotspot-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hotspot-pin:hover {
  transform: translate(-50%, -50%) scale(1.22);
  z-index: 20;
}

.hotspot-pin.active {
  transform: translate(-50%, -50%) scale(1.28);
  z-index: 30;
}

.pin-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--c, #ffffff);
  border: 2.5px solid #ffffff;
  box-shadow: 0 0 16px var(--c, #ffffff), 0 0 30px rgba(0, 0, 0, 0.5);
  animation: pulse-pin 1.8s infinite ease-out;
}

.hotspot-pin.active .pin-marker {
  box-shadow: 0 0 0 4px #ffffff, 0 0 24px var(--c, #ffffff);
}

@keyframes pulse-pin {
  0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

.pin-tag {
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
  background: rgba(11, 14, 20, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.hotspot-pin.active .pin-tag {
  background: var(--c, #ffffff);
  color: #0d0f16;
  border-color: #ffffff;
}

.img-bottom-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 4px 8px;
  font-size: 12.5px;
  color: #8b949e;
}

.view-raw-link {
  color: #38bdf8;
  font-weight: 800;
  text-decoration: none;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 4px 12px;
  border-radius: 999px;
  transition: all 0.15s ease;
}

.view-raw-link:hover {
  background: #38bdf8;
  color: #0b0e14;
}

.region-detail-card {
  background: #ffffff;
  border: 2px solid var(--line);
  border-top: 6px solid var(--reg-color, var(--brand));
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 8px 24px rgba(61, 50, 41, 0.05);
}

.detail-top {
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
}

.detail-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.reg-emoji {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  font-size: 28px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.title-en-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reg-en {
  font-size: 20px;
  font-weight: 900;
  color: var(--ink);
  margin: 0;
}

.audio-btn {
  background: #f4eee6;
  border: none;
  font-size: 14px;
  padding: 3px 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.audio-btn:hover {
  transform: scale(1.15);
}

.title-zh-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 2px;
}

.reg-zh {
  font-size: 16.5px;
  font-weight: 800;
  color: var(--brand-deep);
}

.reg-ipa {
  font-size: 12px;
  color: var(--ink-faint);
}

.hardware-box {
  margin: 0;
  background: #fdf8ed;
  border: 1px solid #fde68a;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 700;
  color: #b45309;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.summary-text {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.5;
  margin: 0 0 4px;
}

.summary-en-text {
  font-size: 12px;
  color: var(--ink-faint);
  line-height: 1.4;
  margin: 0 0 12px;
  font-style: italic;
}

.mode-explanation {
  background: #fbf7f0;
  border-left: 3px solid var(--reg-color, var(--brand));
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 12px;
}

.mode-badge {
  font-size: 12px;
  font-weight: 800;
  color: var(--brand-deep);
  margin-bottom: 4px;
}

.desc-para {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink);
  margin: 0;
}

.clinical-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: #166534;
  line-height: 1.45;
  margin-bottom: 14px;
}

.region-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.chip-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #faf6f0;
  border: 1px solid var(--line);
  color: var(--ink);
  cursor: pointer;
}

.chip-item.active {
  background: var(--rc, #333);
  color: #ffffff;
  border-color: var(--rc, #333);
}

/* 舱位 2：动作电位示波器 */
.sim-intro {
  margin-bottom: 18px;
}

.sim-h4 {
  font-size: 18px;
  font-weight: 900;
  color: var(--ink);
  margin: 0 0 6px;
}

.sim-p {
  font-size: 13.5px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0;
}

.sim-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;
}

@media (max-width: 860px) {
  .sim-grid {
    grid-template-columns: 1fr;
  }
}

.oscilloscope-box {
  background: #0b0f19;
  border: 2px solid #1e293b;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.osc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.osc-title {
  font-size: 13px;
  font-weight: 700;
  color: #94a3b8;
}

.status-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 999px;
  background: #1e293b;
  color: #64748b;
}

.status-badge.firing {
  background: #dc2626;
  color: #ffffff;
  animation: pulse-fire 0.6s infinite alternate;
}

@keyframes pulse-fire {
  from { opacity: 0.8; }
  to { opacity: 1; transform: scale(1.05); }
}

.osc-canvas {
  width: 100%;
  height: 200px;
  background: #06090e;
  border-radius: 8px;
  display: block;
}

.osc-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: #94a3b8;
  font-family: monospace;
}

.controls-box {
  background: #fdfaf5;
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
}

.range-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.slider-green {
  accent-color: #10b981;
}

.slider-red {
  accent-color: #ef4444;
}

.slider-tip {
  font-size: 11px;
  color: var(--ink-faint);
}

.calc-box {
  margin-top: auto;
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 12px;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
}

.calc-result {
  font-size: 13px;
  font-weight: 800;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
  background: #f1f5f9;
  color: #475569;
}

.calc-result.fire {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #f87171;
}

/* 舱位 3：视觉流水线 */
.pipeline-stepper {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: 16px;
}

.step-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  background: #ffffff;
  border: 1.5px solid var(--line);
  cursor: pointer;
  white-space: nowrap;
}

.step-pill.active {
  background: #10b981;
  color: #ffffff;
  border-color: #10b981;
}

.step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: grid;
  place-items: center;
  font-size: 11px;
}

.step-card {
  background: #fbf8f2;
  border: 2px solid var(--line);
  border-radius: 16px;
  padding: 22px;
}

.step-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.step-badge {
  font-size: 12px;
  font-weight: 800;
  color: #059669;
  background: #d1fae5;
  padding: 3px 8px;
  border-radius: 6px;
}

.step-main-title {
  font-size: 18px;
  font-weight: 900;
  color: var(--ink);
  margin: 4px 0 0;
}

.step-cells-tag {
  font-size: 12px;
  font-weight: 700;
  color: var(--brand-deep);
  background: #ffffff;
  border: 1px solid var(--line);
  padding: 4px 10px;
  border-radius: 999px;
}

.step-desc {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--ink);
  margin: 0 0 14px;
}

.step-highlight {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #10b981;
  padding: 10px 14px;
  border-radius: 0 8px 8px 0;
  font-size: 13px;
  color: #334155;
}

/* 舱位 4：8 大感官对比网格 */
.senses-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.sense-card {
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.sense-card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.sense-icon {
  font-size: 28px;
}

.sense-title {
  font-size: 15px;
  font-weight: 900;
  color: var(--ink);
  margin: 0;
}

.sense-stat-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--brand-deep);
  background: var(--brand-soft);
  padding: 2px 7px;
  border-radius: 4px;
  margin-top: 2px;
}

.sense-detail-text {
  font-size: 13px;
  line-height: 1.55;
  color: var(--ink);
  margin: 0 0 10px;
  flex: 1;
}

.animal-compare-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 11.5px;
  color: #475569;
  line-height: 1.4;
}

/* 舱位 5：四大协同网络 */
.net-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.net-btn {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  background: #fbf7f0;
  border: 1.5px solid var(--line);
  color: var(--ink);
  cursor: pointer;
}

.net-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}

.net-display-card {
  background: #ffffff;
  border: 2px solid var(--line);
  border-radius: 16px;
  padding: 22px;
}

.net-display-title {
  font-size: 18px;
  font-weight: 900;
  color: var(--ink);
  margin: 0 0 14px;
}

.net-flow-box {
  background: #f0f9ff;
  border: 1.5px solid #bae6fd;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 16px;
}

.flow-label {
  font-size: 12px;
  font-weight: 800;
  color: #0369a1;
  margin-bottom: 6px;
}

.flow-content {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.6;
}

.net-explanation {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink);
}

.anim-fade {
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
