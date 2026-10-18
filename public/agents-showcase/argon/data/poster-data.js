// Exhaustive Bilingual (ZH/EN) Knowledge Base & Node Graph for "Your High-Tech Brain: Follow the 8 Sensory Inputs"
// Audited for 100% poster fidelity AND mainstream neuroscience accuracy (with explicit scientific context notes)
window.BRAIN_POSTER_DATA = {
  meta: {
    title: {
      zh: "你的高科技大脑：追踪 8 大感官输入",
      en: "Your High-Tech Brain: Follow the 8 Sensory Inputs"
    },
    subtitle: {
      zh: "基于航天制导工程师耗时 4 年、精读 1,000+ 篇神经科学文献绘制的完整大脑电路图谱（含现代神经科学严谨性审校注记）",
      en: "Complete neural circuit schematic assembled over 4 years from 1,000+ neuroscience studies by a Space Shuttle guidance engineer (with neuroscience accuracy notes)"
    },
    circuitRule: {
      zh: "原图核心电路法则：红色电路为抑制性（Inhibitory）通路，其余所有颜色均为兴奋性（Excitatory）通路",
      en: "Poster Circuit Rule: Red Circuits are inhibitory, all other colors are excitatory"
    },
    authorCredit: {
      zh: "由一位航空航天工程师（维拉诺瓦大学 84 届机械工程学士）完成研究。他曾任顶尖军工制导与导航公司计算机辅助设计（CAD）主管，参与过航天飞机（Space Shuttle）制导系统设计，后转型为统计软件开发者。他耗时 4 年分析了超过 1,000 篇神经科学研究，最终组装出这幅大型原理图。他的感言是：“我们装在航天飞机和所有导弹制导系统里的三轴陀螺仪/加速度计三联传感器，就藏在你的耳朵后面。我们人类本身就是超高科技。”",
      en: "Research performed by an Aerospace Engineer (BA Mechanical Engineering, Villanova 84). The supervisor of Computer Aided Design (CAD) for a top military guidance and navigation company who worked on the design of the Space Shuttle guidance system and later became a statistics software developer. Over 1,000 Neuroscience studies were analyzed over a 4 year period and a large schematic assembled. His comments, \"The 3 axis gyro/accelerometer triad sensor we put in the Space Shuttle and all missile guidance systems is behind your ear. We're ultra high tech.\""
    },
    copyright: "Copyright 2018 www.thehighestofthemountains.com",
    sourceUrl: "https://thehighestofthemountains.com/index.html"
  },

  // Scientific Clarification Notes (Distinguishing Poster Engineering Metaphors & Personal Framing from Mainstream Neurobiology)
  scientificNotes: [
    {
      id: "note-action-potential",
      title: {
        zh: "⚡ 动作电位阈值与神经递质机制审校（相对去极化 ΔV vs. 绝对膜电位 Vm）",
        en: "⚡ Action Potential Threshold & Neurotransmitter Mechanism Clarification"
      },
      zh: "原图公式写作 IF (D⁺ + G⁺ - GABA⁻) > +20 mV Then FIRE。在电生理学中，皮层神经元静息膜电位约为 -70 mV，触发动作电位的绝对阈值约为 -50 mV——即相对于静息电位正向去极化超过 ΔV = +20 mV 时，电压门控 Na⁺ 通道爆发式开放，膜电位瞬间冲上 +30 至 +40 mV 峰值。此外，谷氨酸（Glutamate）和 GABA 分别是中枢神经系统最主要的快作用离子型兴奋性（AMPA/NMDA）和抑制性（GABA_A 氯离子通道）递质；而多巴胺（Dopamine）和血清素（Serotonin）主要通过代谢型 G 蛋白偶联受体（如 D1 兴奋性调质、D2 抑制性调质）调节神经元兴奋性与突触可塑性，而非直接产生毫秒级大型离子电流。",
      en: "The poster writes 'IF (D+ + G+ - GABA-) > +20 mV Then FIRE'. In electrophysiology, resting potential is ~ -70 mV and threshold is ~ -50 mV — meaning a net relative depolarization ΔV > +20 mV above rest triggers voltage-gated Na+ channels to spike toward +30 to +40 mV. Also, while Glutamate and GABA mediate fast ionotropic excitation (EPSPs) and inhibition (IPSPs), Dopamine (D1 excitatory / D2 inhibitory GPCRs) and Serotonin act primarily as metabotropic neuromodulators tuning gain and plasticity."
    },
    {
      id: "note-silicon-dna",
      title: {
        zh: "💻 突触“晶体管开关”与 DNA 存储密度的工程类比说明",
        en: "💻 Engineering Analogies: Synapse 'Transistors' & DNA Storage Density"
      },
      zh: "原图作者以硬件工程视角将 65 万亿突触类比为 45,000 颗 Intel i7 双核处理器，将 1 mm³ 皮层（1亿突触）类比为 >5 颗 Apple A8 芯片（2,300万晶体管/mm³）。需注意：生物突触并非简单的二进制数字晶体管开关，而是兼具模拟与数字特性的电化学积分器，具备递质释放概率调节与长/短期可塑性（LTP/LTD）。同样，原图引用哈佛大学研究指出 DNA 理论极限可存储 4,550 亿 GB/克（Church et al., 2012），这指的是合成 DNA 数字存储的物理密度极限（每核苷酸 2 bits）；人类单倍体基因组本身约含 32 亿碱基对（约 760 MB 数据），大脑并非在 DNA 中逐一硬编码 65 万亿个突触的坐标，而是通过基因发育规则与后天经验可塑性共同完成布线。",
      en: "The poster compares cortical synapses to digital transistors in Intel i7 and Apple A8 chips. Biologically, synapses are analog-digital electrochemical integrators with dynamic plasticity rather than binary MOSFET switches. Similarly, 455 Billion GB/gram (Church et al., 2012) is the theoretical maximum density of synthetic DNA data storage; the human genome (~3.2B base pairs, ~760 MB) encodes developmental wiring rules refined by experience rather than storing every individual synapse address."
    },
    {
      id: "note-ofc-framing",
      title: {
        zh: "⚖️ 眶额皮层（OFC）“灵与肉（Spirit vs. Flesh）”标签的认知神经科学映射",
        en: "⚖️ Mapping Poster's 'Spirit vs. Flesh' Labels to Cognitive Neuroscience"
      },
      zh: "原图在眶额皮层（OFC）与前额叶（PFC）区域使用了“spirit（灵/精神）”、“flesh（肉体/物欲）”、“How Idolatry controls us（偶像崇拜如何控制我们）”、“Repentance（悔改）”等带有作者个人宗教/哲学色彩的词汇。在现代认知神经科学中，这一对立对应于**自上而下的前额叶执行控制与长远价值系统（DLPFC / vmPFC：延迟满足、道德规范、社会契约、行为抑制）**与**自下而上的边缘-纹状体-眶额习得感官奖赏回路（Mesolimbic Dopamine / OFC：即时多巴胺激励显著性 Wants、成瘾线索反应与自动化习惯环路）**之间的动态博弈。",
      en: "The poster uses philosophical/religious labels ('spirit', 'flesh', 'How Idolatry controls us', 'Repentance') in the PFC/OFC. In mainstream cognitive neuroscience, this maps onto the tug-of-war between top-down prefrontal executive control & value-based regulation (DLPFC/vmPFC) versus bottom-up mesolimbic/orbitofrontal cue-triggered incentive salience ('Wants') and habit loops."
    }
  ],

  // 1. Global Quantitative Benchmarks (Top Left & Across Poster)
  benchmarks: [
    {
      id: "total-neurons",
      value: "86+ Billion",
      valueZh: "860 亿+",
      label: { zh: "大脑总神经元数量", en: "Total Brain Neurons" },
      detail: {
        zh: "全脑拥有超过 860 亿个神经元（其中小脑约 690 亿、大脑皮层 150 亿+、脊髓 10 亿、视觉系统 40–60 亿）。",
        en: "86+ Billion Neurons total (including 69B in Cerebellum, 15B+ in Cerebral Cortex, 1B in Spinal Cord, 4-6B in Visual System)."
      },
      category: "cortex"
    },
    {
      id: "cortex-neurons",
      value: "15+ Billion",
      valueZh: "150 亿+",
      label: { zh: "大脑皮层神经元", en: "Neurons in the Cerebral Cortex" },
      detail: {
        zh: "6 层折叠电路板结构（厚度 1.5–4.5 mm），灰质层容纳了皮层神经元的细胞体，总表面积达 2,500 cm²。",
        en: "15+ Billion Neurons in the 6-layer folded Cerebral Cortex (thickness 1.5 - 4.5 mm, total surface area = 2,500 cm²)."
      },
      category: "cortex"
    },
    {
      id: "cortex-synapses",
      value: "65+ Trillion",
      valueZh: "65 万亿+",
      label: { zh: "大脑皮层突触连接", en: "Connections in the Cerebral Cortex" },
      detail: {
        zh: "每个神经元平均拥有 1,000 到 10,000 个突触连接（原图类比为晶体管开关，数量相当于 45,000 颗英特尔 i7 双核处理器）。",
        en: "Avg of 1,000-10,000 Connections (Synapses) per Neuron. Transistor count equivalent of 45,000 i7 Dual Core Processors."
      },
      category: "cortex"
    },
    {
      id: "cortex-mm3",
      value: "100M / mm³",
      valueZh: "1 亿突触 / mm³",
      label: { zh: "每立方毫米皮层突触密度", en: "1 mm³ Cortex Density & Compute" },
      detail: {
        zh: "仅 1 mm³ 的皮层就包含 50,000+ 个神经元与超过 1 亿个突触——原图按晶体管密度换算，预估算力超过 5 颗苹果 A8 处理器（iPhone 6 的 A8 每 mm³ 约含 2,300 万晶体管）。",
        en: "1 mm³ of cortex contains 50,000+ Neurons making over 100 Million Synapses — est. processing power of over five Apple A8 processors (23M transistors/mm³)."
      },
      category: "cortex"
    },
    {
      id: "retina-compute",
      value: "131M → 1M",
      valueZh: "1.31 亿 → 100 万",
      label: { zh: "视网膜空间编码与算力对比", en: "Retina Compression & Processing" },
      detail: {
        zh: "1.25 亿（图注亦标 1.26 亿）视杆细胞 + 600 万彩色视锥细胞汇聚至视神经的 100 万根轴突（约 131:1 压缩）。实时提取运动与防撞特征，每只眼预估算力超 4 颗苹果 A8 处理器。",
        en: "125M–126M Rods & 6M Color Cones compress into 1M axons in the Optic Nerve (~131:1 ratio). Detects motion and collision paths; est. >4 Apple A8 processors per eye."
      },
      category: "sensory"
    },
    {
      id: "cerebellum-neurons",
      value: "69 Billion",
      valueZh: "690 亿",
      label: { zh: "小脑神经元与展开长度", en: "Cerebellum Neurons & Unfolded Length" },
      detail: {
        zh: "小脑拥有 690 亿个神经元（占全脑近 80%），展开后长达 1 米（表面积 500 cm²），内置惯性导航神经计算回路与精细运动技能库。",
        en: "69 Billion Neurons in the Cerebellum; 1 Meter long if unfolded (500 cm²). Houses learned motor skills and inertial navigation calculations."
      },
      category: "cerebellum"
    },
    {
      id: "dna-density",
      value: "455B GB/g",
      valueZh: "4,550 亿 GB/克",
      label: { zh: "DNA 编码存储理论极限", en: "DNA Code Storage Density" },
      detail: {
        zh: "大脑发育布线蓝图源于 DNA 编码。哈佛大学研究表明，DNA 物理存储密度在理论极限下可达每克 4,550 亿 GB（455 EB/克）。",
        en: "Wiring blueprint stored in DNA code. At theoretical maximum, DNA can encode 455 Billion Gigabytes per gram (Harvard University, Science 2012)."
      },
      category: "spinal"
    }
  ],

  // 2. The 8 Sensory Inputs (Exhaustive Poster Details)
  sensoryInputs: [
    {
      number: 1,
      id: "sight",
      name: { zh: "1. 视觉 (Sight)", en: "1. Sight" },
      organ: { zh: "眼睛、视网膜与中央凹 (Retina & Fovea)", en: "Eye, Retina & Fovea Notch" },
      nerve: { zh: "视神经 (Optic Nerve, 100万连接) & 动眼神经 (Oculomotor Nerve)", en: "Optic Nerve (1 Million Connections) & Oculomotor Nerve" },
      stats: [
        { zh: "1.25亿–1.26亿视杆细胞 (Rods) + 600万彩色视锥细胞 (Color Cones)", en: "125M–126M Rods & 6M Color Cone Photoreceptors" },
        { zh: "中央凹 (Fovea) 含 200,000 个视锥细胞，凹槽直径 1.5 mm", en: "200,000 Cones in Fovea; Fovea Notch diameter is 1.5 mm" },
        { zh: "视网膜厚度 0.12 mm，总面积 2,500 mm²", en: "Retina Thickness is .12 mm, area is 2,500 mm²" },
        { zh: "视神经含 1,000,000 根轴突连接；视辐射 (Optic Radiations) 570K", en: "1 Million axons in Optic Nerve; Optic Radiations 570K" },
        { zh: "每只眼算力 > 4 颗 Apple A8 处理器", en: "Estimated processing power of over four Apple A8 processors per eye" }
      ],
      mechanisms: {
        zh: [
          "光学倒像与半球交叉：晶状体投射在视网膜上的图像是上下颠倒、左右反转的（imaged flipped upside down and backwards），并通过视交叉向对侧半球路由（图注 <- to Right Eye）。",
          "高分辨率中央凹 vs. 低分辨率周边视野：直径 1.5 mm 的中央凹（Fovea Notch）密集排列 200,000 个视锥细胞，提供高清彩色视觉；周边低分辨率视野（Peripheral Low Resolution View）由 1.26 亿视杆细胞主导，配合周边运动感知电路（Peripheral Motion Sensing Circuitry）提供高灵敏度视觉反射。",
          "双重中央凹反射：运动检测中央凹反射（Motion Detection Foveal Reflex）与平滑追踪中央凹反射（Smooth Pursuit Foveal Reflex）。",
          "空间编码压缩与防撞系统：视网膜将约 1.31 亿感光细胞的信号空间编码压缩至 100 万根视神经轴突，同时扫描碰撞路径上的物体并自动向四肢发送避险反射指令。",
          "动眼神经（Oculomotor Nerve）：受脑干与额叶眼动区（FEF）调控，驱动眼外肌实现快速扫视与平滑追踪。"
        ],
        en: [
          "Optical Inversion: Image is projected upside down and backwards onto the retina, with binocular routing (<- to Right Eye).",
          "Fovea High Resolution View vs. Peripheral Low Resolution View: 200,000 cones packed in a 1.5 mm Fovea Notch for sharp color detail, while 126M peripheral rods & Peripheral Motion Sensing Circuitry provide rapid visual reflexes.",
          "Dual Foveal Reflexes: Motion Detection Foveal Reflex and Smooth Pursuit Foveal Reflex.",
          "Spatial Compression & Accident Avoidance: Compresses ~131M photoreceptors into 1M Optic Nerve axons, detects movement, scans for collision paths, and sends reflex control to limbs.",
          "Oculomotor Nerve: Controls eye muscles for saccades, convergence, and smooth pursuit."
        ]
      },
      targetAreas: ["Thalamus (Vision Relay)", "Optic Radiations (570K)", "Occipital Lobe (V1 Sight Area)", "FEF (Eye Control)"]
    },
    {
      number: 2,
      id: "smell",
      name: { zh: "2. 嗅觉 (Smell)", en: "2. Smell" },
      organ: { zh: "鼻腔嗅上皮与嗅觉感受器细胞 (Olfactory Receptor Cells)", en: "Olfactory Epithelium & Olfactory Receptor Cells" },
      nerve: { zh: "嗅球与嗅束 → 边缘系统 / 杏仁核 / 眶额皮层 (Odors & Pheromones)", en: "Olfactory Pathway → Odors, Pheromones, Pleasure/Needs & OFC" },
      stats: [
        { zh: "人类 (Human)：1,200 万 (12 Million) 嗅觉感受器细胞", en: "12 Million Olfactory Receptor Cells (Human)" },
        { zh: "普通犬类 (Dog)：10 亿 (1 Billion) 嗅觉感受器细胞（人类的 83.3 倍）", en: "1 Billion Olfactory Receptor Cells (Dog — 83.3× Human)" },
        { zh: "寻血猎犬 (Hound)：50 亿 (5 Billion) 嗅觉感受器细胞（人类的 416.7 倍）", en: "5 Billion Olfactory Receptor Cells (Hound — 416.7× Human)" }
      ],
      mechanisms: {
        zh: [
          "直接边缘通路：嗅觉是唯一无需先经过丘脑主中继即可直达古皮层（梨状皮层、杏仁核）与边缘回路的感官通道。",
          "双流情绪与本能驱动：在原图中分为气味（Odors）与信息素（Pheromones）两路，直接汇入愉悦/生理需要中枢（Pleasure/Needs）、饥饿（Hunger）、择偶（Mating）、恐惧（Fear）及眶额皮层（OFC）风味与奖赏评估区。"
        ],
        en: [
          "Direct Limbic Access: The only sensory modality that projects directly to paleocortex and limbic structures before thalamic relay.",
          "Dual Chemical Streams: Splits into Odors and Pheromones streams feeding directly into Pleasure (Needs), Hunger, Mating, Fear, and OFC reward valuation."
        ]
      },
      targetAreas: ["Odors", "Pheromones", "Pleasure (Needs)", "Mating / Fear / Emotion", "OFC"]
    },
    {
      number: 3,
      id: "taste",
      name: { zh: "3. 味觉 (Taste)", en: "3. Taste" },
      organ: { zh: "舌部味蕾 (Taste Buds)", en: "Tongue Taste Buds" },
      nerve: { zh: "面神经 (Facial Nerve, CN VII) 等味觉传入通路", en: "Facial Nerve (CN VII) & Gustatory Afferents" },
      stats: [
        { zh: "9,000 个味蕾 (Taste Buds)", en: "9,000 Taste Buds" },
        { zh: "每个味蕾含 5–10 个味觉感受器细胞（图注参数；现代组织学可达 50–150 个/味蕾）", en: "5-10 Receptors per Taste Bud (poster value; modern histology notes up to 50-150 cells/bud)" }
      ],
      mechanisms: {
        zh: [
          "脑神经传入：原图重点标注了面神经（Facial Nerve，负责舌前 2/3 味觉，连同舌咽神经与迷走神经共同上传味觉信号）。",
          "内脏与奖赏整合：经脑干孤束核与丘脑投射至脑岛初级味觉皮层（Insular Cortex：Sexual & Taste），并与嗅觉在眶额皮层（OFC）及愉悦/奖赏中心（Food 食物、Hunger 饥饿、Obesity 肥胖）汇合。"
        ],
        en: [
          "Cranial Nerve Pathway: Highlighted via the Facial Nerve corridor on the schematic.",
          "Visceral & Reward Integration: Projects to the Insular Cortex (Sexual & Taste) and integrates with Odors in the OFC and Pleasure/Rewards centers (Food, Hunger, Obesity)."
        ]
      },
      targetAreas: ["Facial Nerve", "Insular Cortex (Sexual & Taste)", "Pleasure (Hunger / Food)", "OFC"]
    },
    {
      number: 4,
      id: "touch",
      name: { zh: "4. 触觉与痛温觉 (Touch & Pain)", en: "4. Touch" },
      organ: { zh: "皮肤痛觉、压觉、冷觉与温觉感受器", en: "Cutaneous Nociceptors, Mechanoreceptors & Thermoreceptors" },
      nerve: { zh: "脊髓灰质层板 → 脊髓丘脑束/背柱 → 丘脑 → 体感皮层 (Sensory Area)", en: "Spinal Cord Lamina → Thalamus → Somatosensory Cortex" },
      stats: [
        { zh: "每平方厘米皮肤含约 200 个痛觉感受器 (Pain receptors)", en: "~200 Pain receptors per cm² of skin" },
        { zh: "每平方厘米皮肤含 15 个压觉感受器 (Pressure receptors)", en: "15 Pressure receptors per cm² of skin" },
        { zh: "每平方厘米皮肤含 6 个冷觉感受器 (Cold receptors)", en: "6 Cold receptors per cm² of skin" },
        { zh: "每平方厘米皮肤含 1 个温觉感受器 (Warmth receptor)", en: "1 Warmth receptor per cm² of skin" }
      ],
      mechanisms: {
        zh: [
          "高度偏向生存保护的感受器分布：每平方厘米皮肤包含约 200 个痛觉感受器，但仅有 15 个压觉、6 个冷觉和 1 个温觉感受器（引自 BBC Science & Nature）。",
          "脊髓反射与上行通路：痛觉信号一方面在脊髓蝴蝶形灰质层板（Butterfly grey matter lamina）通过占脊髓细胞总数 97% 的中间神经元（Interneurons）触发双侧多关节缩手/缩腿反射；另一方面上传至顶叶感觉区（Sensory Area: Pain - Touch - Proprioception 体感侏儒图）与脑岛（Tactile）。",
          "下行镇痛门控：受脑干痛觉控制中心（Pain Control / pain off）、肾上腺素（Adrenaline）与内源性阿片肽（Opioids）的红色抑制电路调控。"
        ],
        en: [
          "Survival-Weighted Density: Every cm² of skin contains ~200 pain receptors, 15 for pressure, 6 for cold, and 1 for warmth (BBC Science & Nature).",
          "Spinal Reflex & Cortical Map: Triggers bilateral limb coordination via Spinal Cord Pain Reflex Circuitry (97% interneurons) while ascending to Somatosensory Cortex (Pain - Touch - Proprioception) and Insular Cortex (Tactile).",
          "Descending Analgesia Gate: Modulated by red inhibitory Pain Control ('pain off'), Adrenaline, and Opioids."
        ]
      },
      targetAreas: ["Spinal Cord Pain Reflex", "Pain Control (pain off)", "Sensory Area (Homunculus)", "Insular Cortex (Tactile)", "Cingulate Cortex (Mirror Feelings)"]
    },
    {
      number: 5,
      id: "hearing",
      name: { zh: "5. 听觉 (Hearing)", en: "5. Hearing" },
      organ: { zh: "耳蜗 (Cochlea)", en: "Cochlea" },
      nerve: { zh: "听神经 (Auditory Nerve, 30,000 连接)", en: "Auditory Nerve (30,000 Connections)" },
      stats: [
        { zh: "耳蜗内含 15,500 个毛细胞 (Hair Cells in Cochlea)", en: "15,500 Hair Cells in Cochlea" },
        { zh: "听神经含 30,000 个神经连接 (Connections in Auditory Nerve)", en: "30,000 Connections in Auditory Nerve" },
        { zh: "听觉皮层含 100,000,000 (1亿) 个神经元 (Neurons in Auditory Cortex)", en: "100,000,000 Neurons in Auditory Cortex" }
      ],
      mechanisms: {
        zh: [
          "声电换能：耳蜗基底膜上的 15,500 个内/外毛细胞将声波振动转化为神经冲动，经 30,000 根听神经纤维上传。",
          "双通道投射：一路向小脑提供直接声音输入（Sound inputs）参与毫秒级声源定位与运动计时；主路经丘脑声音中继（Sound Relay）触发快速视听反射（Visual-Audio Reflexes），并投射至颞叶含 1 亿神经元的听觉皮层处理声音（Sounds）与语言文字（Words）。"
        ],
        en: [
          "Mechano-Electrical Transduction: 15,500 hair cells in the cochlea transduce acoustic vibrations into spikes across 30,000 Auditory Nerve connections.",
          "Dual Routing: Sends fast Sound inputs to the Cerebellum and relays via Thalamus (Sound Relay) to 100,000,000 Neurons in the Auditory Cortex for Sounds, Words, and Visual-Audio Reflexes."
        ]
      },
      targetAreas: ["Cerebellum (Sound inputs)", "Thalamus (Sound Relay)", "Temporal Lobe (Sounds & Words)", "Visual-Audio Reflexes"]
    },
    {
      number: 6,
      id: "balance",
      name: { zh: "6. 平衡与加速度 (Balance & Acceleration)", en: "6. Balance & Acceleration" },
      organ: { zh: "前庭系统 (Vestibule — 三轴陀螺仪与加速度计)", en: "Vestibule (3-Axis Gyro & Accelerometer)" },
      nerve: { zh: "前庭神经 → 小脑惯性导航计算机 & 动眼反射回路", en: "Vestibular Inputs → Cerebellum Inertial Navigation & Oculo Reflex" },
      stats: [
        { zh: "正交 3 轴测量 (X, Y, Z)：3 个半规管测角速度（陀螺仪）+ 耳石器测线性加速度与重力", en: "3-Axis (X, Y, Z) angular gyro (semicircular canals) + linear accelerometer (otoliths)" },
        { zh: "工程同构：与航天飞机 (Space Shuttle) 和军用导弹制导系统的三轴惯导传感器同构", en: "Identical in principle to the main sensor used in Military Guidance and the Space Shuttle" }
      ],
      mechanisms: {
        zh: [
          "耳后三轴惯导三联体：前庭系统（Vestibule）在物理原理上等同于军工与航天飞机使用的三轴加速度计-陀螺仪三联传感器（Military Accelerometer-Gyro Triad）。",
          "小脑深部惯性导航计算机：前庭信号输入小脑（Gyro & Accelerometer inputs），由小脑深部神经回路对加速度与角速度进行实时微积分运算，解算人体在三维空间中的运动轨迹（Laurens & Angelaki / Cell Press）。",
          "前庭-动眼反射（VOR / Image Stabilization）：在头部晃动时，前庭系统驱动眼球以相等大小、相反方向的速度旋转，并与额叶眼动区（FEF）平滑追踪系统协同，将目标图像牢牢锁定在 1.5 mm 的视网膜中央凹上。"
        ],
        en: [
          "Biological Inertial Triad: Functions as a 3-axis Accelerometer-Gyro Triad analogous to Space Shuttle and missile guidance hardware.",
          "Cerebellar Inertial Navigation: Feeds Gyro & Accelerometer inputs into a sophisticated neural computer deep in the cerebellum to compute movement through 3D space.",
          "Image Stabilization & Oculo Reflex (VOR): Counter-rotates the eyes against head motion and interacts with FEF smooth-pursuit so the retinal image stays locked on the 1.5 mm fovea."
        ]
      },
      targetAreas: ["Cerebellum (Gyro & Accelerometer / Navigation)", "Image Stabilization / Oculo Reflex", "FEF (Smooth Pursuit)", "Spinal Cord (Balance to Legs)"]
    },
    {
      number: 7,
      id: "joint-position",
      name: { zh: "7. 关节位置与本体感觉 (Joint Position / Proprioception)", en: "7. Joint Position (Proprioception)" },
      organ: { zh: "肌梭、高尔基腱器官与关节机械感受器", en: "Muscle Spindles, Golgi Tendon Organs & Joint Receptors" },
      nerve: { zh: "脊髓本体感觉束 → 小脑 & 顶叶体感皮层", en: "Spinal Proprioceptive Tracts → Cerebellum & Somatosensory Cortex" },
      stats: [
        { zh: "实时监测全身肌肉力量极限 (Strength Limits) 与肢体三维位置 (Limb Position)", en: "Continuously tracks muscle Strength Limits and 3D Limb Position" }
      ],
      mechanisms: {
        zh: [
          "张力保护与空间姿态：肌梭与腱器官实时检测肌肉伸展长度、收缩速度与力量极限（Strength Limits），防止过载损伤。",
          "双路闭环反馈：一路经脊髓快速上传至小脑（Proprioception: Limb Position），与运动皮层下达的指令进行毫秒级误差校正；另一路上传至顶叶感觉区（Sensory Area: Pain - Touch - Proprioception）与顶内沟（IPS），将身体坐标系与视觉坐标系对齐以引导精准抓握。"
        ],
        en: [
          "Tension Protection & Posture: Tracks joint angles, muscle stretch, and Strength Limits.",
          "Dual Closed-Loop Feedback: Sends rapid unconscious feedback to the Cerebellum (Proprioception / Limb Position) for error correction and conscious body-map updates to the Parietal Somatosensory Area and IPS."
        ]
      },
      targetAreas: ["Spinal Cord", "Cerebellum (Proprioception / Limb Position)", "Sensory Area (Proprioception)", "IPS (Visual Guided Limbs)"]
    },
    {
      number: 8,
      id: "facial-expressions",
      name: { zh: "8. 面部表情 (Facial Expressions)", en: "8. Facial Expressions" },
      organ: { zh: "面部皮下表情肌群与枕颞叶面孔识别网络", en: "Subcutaneous Facial Muscles & Occipito-Temporal Face Network" },
      nerve: { zh: "面神经运动输出 + 视觉面孔/表情识别双向社交环路", en: "Bidirectional Facial Nerve Output & Visual Face-Processing Input" },
      stats: [
        { zh: "6 大核心跨文化基本表情：快乐、悲伤、惊讶、恐惧、愤怒、厌恶", en: "6 Main Expressions: Happiness, Sadness, Surprise, Fear, Anger, Disgust" },
        { zh: "自动生成并自动解读 (Automatically Produced and Read)", en: "Automatically Produced and Read" }
      ],
      mechanisms: {
        zh: [
          "社会情绪专属通道：原图将“面部表情”独立列为第 8 大感官输入通道。人类面孔皮下复杂的肌肉群能够自动组合生成（Automatically Produced）六大核心情绪构型，而观察者大脑的枕颞叶皮层则通过专门的“面部表情处理区”（Facial Expression Processing）与“面孔处理区”（Face Processing: 正脸 front / 侧脸 profile）自动读取（Read）情绪信号（Martinez & Du, 2012）。",
          "共情与镜像耦合：与眼神接触（Eye Contact）、扣带皮层镜像情感（Mirror Feelings / Empathy）及杏仁核/颞叶情绪中枢（Emotion / Fear）紧密联动。"
        ],
        en: [
          "Dedicated Social-Emotional Channel: Highlighted as the 8th sensory input — subcutaneous facial muscles automatically produce complex emotional configurations that are automatically read by dedicated Face Processing (front/profile) and Facial Expression Processing networks.",
          "Empathy & Mirror Coupling: Tightly linked with Eye Contact, Emotion/Fear hubs, and Cingulate Mirror Feelings (Empathy)."
        ]
      },
      targetAreas: ["Facial Expression Processing", "Face Processing (front/profile)", "Eye Contact", "Emotion / Fear", "Cingulate Cortex (Empathy)"]
    }
  ],

  // 3. Complete Interactive Schematic Map Nodes (covering every region & sub-node on the poster)
  mapNodes: [
    {
      id: "node-neuron",
      x: 24, y: 20,
      category: "neuron",
      circuitType: "excitatory",
      title: { zh: "神经元与动作电位触发器", en: "The Neuron & Action Potential Gate" },
      subtitle: { zh: "IF (D⁺ + G⁺ - GABA⁻) > +20 mV Then FIRE", en: "IF (D⁺ + G⁺ - GABA⁻) > +20 mV Then FIRE" },
      posterLabels: [
        "The Neuron", "Dendrites", "Ion Flow", "-70 mV", "Na+", "+Ca2+",
        "Axons", "GABA-", "Dopamine", "Glutamate", "Serotonin",
        "Essentially action potential Na+ ->",
        "IF ( D+ + G+ - GABA- ) > +20 mV Then FIRE (+ Others)",
        "6 Layer Cortex thickness 1.5 - 4.5 mm contains all the neuron's cell bodies",
        "Look Inside: Dendrites, Neurons, Axons in, Axons out"
      ],
      summary: {
        zh: "神经元胞体静息膜电位约为 -70 mV。树突（Dendrites）整合来自上千个突触的离子流与调质输入：谷氨酸（G⁺，主快兴奋性递质）、多巴胺（D⁺，调质）、血清素（Serotonin）、钙离子（+Ca²⁺）与钠离子（Na⁺）促成去极化；红色的 GABA⁻ 电路提供抑制性超极化/分流抑制。当净去极化超过 +20 mV（即膜电位从 -70 mV 升至约 -50 mV 阈值）时，电压门控 Na⁺ 通道爆发式开放，触发动作电位（FIRE）沿轴突（Axons）传导。右侧小框展示了 1.5–4.5 mm 厚的 6 层大脑皮层（灰质容纳神经元胞体，包含树突、胞体、传入轴突 Axons in 与传出轴突 Axons out）。",
        en: "Resting potential is -70 mV. Dendrites integrate excitatory inputs (Glutamate G+, Dopamine D+ modulation, Serotonin, +Ca2+, Na+) against inhibitory red GABA- inputs. When net depolarization exceeds +20 mV above rest (reaching ~ -50 mV threshold), voltage-gated Na+ channels open and the neuron FIRES down its axon. The inset shows the 1.5–4.5 mm 6-layer cortex containing cortical neuron cell bodies, dendrites, axons in, and axons out."
      }
    },
    {
      id: "node-fef-attention",
      x: 33, y: 27,
      category: "motor",
      circuitType: "both",
      title: { zh: "额叶眼动区 (FEF) 与注意力中枢", en: "FEF (Frontal Eye Fields) & Attention" },
      subtitle: { zh: "眼动控制 · 平滑追踪 · 执行小脑程序", en: "Eye Control · Smooth Pursuit · Execute Cerebellar Programs" },
      posterLabels: [
        "FEF", "Eye Control", "Smooth Pursuit", "Attention",
        "Execute Cerebellar Programs", "Shoot"
      ],
      summary: {
        zh: "额叶眼动区（FEF）主导有意识的眼球控制（Eye Control）与平滑追踪（Smooth Pursuit），并与前庭系统交互，在头部运动时匹配眼球速度与目标速度，使目标图像保持在视网膜中央凹上。紧邻的注意力（Attention）模块负责调用并执行小脑运动程序（Execute Cerebellar Programs），并包含红色的“发射/抑制（Shoot）”控制门。",
        en: "The Frontal Eye Fields (FEF) govern voluntary Eye Control and Smooth Pursuit, interacting with the vestibular system so eye velocity matches target velocity on the fovea. Adjacent Attention circuits trigger and Execute Cerebellar Programs (including the red 'Shoot' control gate)."
      }
    },
    {
      id: "node-mirror-motor",
      x: 40, y: 24,
      category: "motor",
      circuitType: "excitatory",
      title: { zh: "镜像运动学习与主运动皮层", en: "Mirror Motor Learning & Motor Control" },
      subtitle: { zh: "运动规划 · 抓握存储 · 运动侏儒图", en: "Motor Planning · Grip Storage · Motor Homunculus" },
      posterLabels: [
        "Mirror Motor Learning", "Motor Planning", "Grip Storage",
        "Motor Control", "Mirror Neurons quote"
      ],
      summary: {
        zh: "镜像神经元（Mirror Neurons）在个体自己执行动作和观察他人执行相似动作时均会放电（Rizzolatti & Craighero, 2004），构成动作模仿与运动学习（Mirror Motor Learning）的基础。运动规划（Motor Planning）与抓握构型存储（Grip Storage）协同主运动皮层（Motor Control，配运动侏儒图 Homunculus，直观展示手部与口面部占据极大皮层表征面积）向脊髓与小脑下达运动指令。",
        en: "Mirror neurons discharge both when performing an action and when observing another individual doing a similar action. Coupled with Motor Planning, Grip Storage, and Primary Motor Control (illustrated by the Motor Homunculus with enlarged hands and lips/face)."
      }
    },
    {
      id: "node-sensory-ips",
      x: 54, y: 23,
      category: "parietal",
      circuitType: "excitatory",
      title: { zh: "体感皮层、顶叶与顶内沟 (IPS)", en: "Sensory Area, Parietal Cortex & IPS" },
      subtitle: { zh: "痛/触/本体感觉 · 视觉引导肢体 · 手眼抓握", en: "Pain-Touch-Proprioception · Visual Guided Limbs · Grasp" },
      posterLabels: [
        "Sensory Area", "Pain - Touch - Proprioception", "Sensory Feedback",
        "Grasp", "PARIETAL CORTEX", "IPS", "Visual Guided Limbs",
        "PCC", "Ideas", "S1", "R1", "Word Processing", "Place Processing", "Place Mapping"
      ],
      summary: {
        zh: "初级体感皮层（Sensory Area）接收全身痛觉、触觉与本体感觉（配体感侏儒图）。顶叶皮层（Parietal Cortex）与顶内沟（IPS）整合感觉反馈（Sensory Feedback），将视觉参考系与身体中心参考系对齐，编程控制复杂手部使用、伸手、抓握（Grasp）及视觉引导肢体运动（Visual Guided Limbs）。后扣带皮层（PCC）连接创意/想法（Ideas）、地点处理（Place Processing）与罗盘位置映射（Place Mapping）。",
        en: "The Somatosensory Area maps Pain, Touch, and Proprioception across the body homunculus. The Parietal Cortex and Intraparietal Sulcus (IPS) match visual and body-centered reference frames for reaching, grasping, and Visual Guided Limbs, alongside PCC (Ideas), Word Processing, and Place Mapping."
      }
    },
    {
      id: "node-cingulate-insula",
      x: 47, y: 33,
      category: "limbic",
      circuitType: "excitatory",
      title: { zh: "扣带皮层 (ACC/Cingulate) 与脑岛 (Insular Cortex)", en: "Cingulate Cortex & Insular Cortex" },
      subtitle: { zh: "镜像情感 · 共情 · 唤醒 · 味觉与性感受", en: "Mirror Feelings · Empathy · Arousal · Sexual & Taste" },
      posterLabels: [
        "CINGULATE CORTEX", "Mirror Feelings", "Perceived Sensations",
        "Pornography", "Empathy", "Tactile", "Arousal", "Verbal", "Visual",
        "INSULAR CORTEX", "Sexual & Taste", "ACC"
      ],
      summary: {
        zh: "扣带皮层（Cingulate Cortex / ACC）在权衡冲突选项、处理结果误差以及承载“镜像情感”（Mirror Feelings：感知他人的体验 Perceived Sensations、共情 Empathy、色情视觉唤醒 Pornography）和言语/视觉唤醒（Arousal: Verbal / Visual）中起核心作用。深部的脑岛皮层（Insular Cortex）整合触觉（Tactile）、性感受与味觉（Sexual & Taste）及内脏内感受信号。",
        en: "The Cingulate Cortex (ACC) mediates conflict monitoring, Mirror Feelings (Perceived Sensations, Empathy, Pornography response), and Verbal/Visual Arousal, while the Insular Cortex processes Tactile, Sexual & Taste, and visceral interoceptive signals."
      }
    },
    {
      id: "node-pfc-dlpfc",
      x: 29, y: 38,
      category: "executive",
      circuitType: "inhibitory",
      title: { zh: "前额叶皮层 (PFC / DLPFC)：行为执行控制", en: "Prefrontal Cortex (PFC / DLPFC): Executive Control" },
      subtitle: { zh: "25岁+成熟 · 可抑制感官奖赏 · 道德/法律/价值观", en: "Matures late Age 25+ · Can Inhibit Sensory Rewards · Morals/Laws/Values" },
      posterLabels: [
        "PREFRONTAL CORTEX", "Non Sensory Processing",
        "Can Inhibit Sensory Rewards", "(Matures late Age 25+)",
        "Bad vs Good Processing (your beliefs)",
        "Executive Control of Behavior", "Dorsolateral PFC",
        "Morals", "Laws", "Values", "Bad", "Good", "Repentance"
      ],
      summary: {
        zh: "前额叶皮层（PFC，特别是背外侧前额叶 DLPFC）负责非感官高层认知处理（Non Sensory Processing），髓鞘化与突触修剪直到 25 岁以上才完全成熟（Matures late Age 25+）。它依据个体信念进行善恶与规则评估（Bad vs Good Processing: Morals 道德、Laws 法律、Values 价值观、Repentance 悔改），并通过显眼的红色抑制电路自上而下抑制低级感官奖赏冲动（Can Inhibit Sensory Rewards）。",
        en: "The Prefrontal Cortex (including Dorsolateral PFC) performs Non-Sensory Processing and matures late (Age 25+). It houses Executive Control of Behavior (Morals, Laws, Values, Good vs. Bad beliefs, Repentance) and projects red inhibitory circuits that Can Inhibit Sensory Rewards."
      }
    },
    {
      id: "node-ofc-spirit-flesh",
      x: 25, y: 49,
      category: "executive",
      circuitType: "both",
      title: { zh: "眶额皮层 (OFC)：习得自动感官奖赏 (Spirit vs. Flesh)", en: "Orbital Frontal Cortex (OFC): Learned Auto-Sensory Rewards" },
      subtitle: { zh: "发育较早 · 感官价值与道德决策 · 习惯与成瘾线索", en: "Develops early · Sensory Value / Moral Decision · Cue Valuation" },
      posterLabels: [
        "ORBITAL FRONTAL CORTEX", "Learned Auto-Sensory Rewards", "(Develops early)",
        "spirit", "flesh", "Sensory Value / Moral Decision",
        "Gambling", "Education", "Video Games", "Food", "$", "Rewards",
        "Beauty Area", "Class", "Work", "Pride", "Boasting",
        "Tattoos", "Greed", "Materialism", "How Idolatry controls us", "Idol worship",
        "rap", "Quarrel", "Discipline", "Mating", "Fear", "Entertainment", "Emotion", "Pheromones"
      ],
      summary: {
        zh: "眶额皮层（OFC）比背外侧前额叶发育更早（Develops early），编码习得的自动感官奖赏（Learned Auto-Sensory Rewards）。原图作者在此以“spirit（精神/灵）”与“flesh（肉体/物欲）”标签对比高阶道德目标与世俗感官诱惑（认知神经科学中对应于价值评估与线索诱发渴求）：涵盖赌博（Gambling）、教育（Education）、电子游戏（Video Games）、食物（Food）、金钱（$）、外貌美感区（Beauty Area）、社会阶层（Class）、工作（Work）、骄傲（Pride）、吹嘘（Boasting）、文身（Tattoos）、贪婪（Greed）、物质主义（Materialism）、偶像崇拜（How Idolatry controls us / Idol worship）、说唱（rap）、争吵（Quarrel）、管教（Discipline）、择偶（Mating）、娱乐（Entertainment）与信息素（Pheromones）。",
        en: "Developing earlier than DLPFC, the OFC encodes Learned Auto-Sensory Rewards. The poster contrasts 'spirit' and 'flesh' across human motivations and cue valuations: Gambling, Education, Video Games, Food, Money ($), Beauty Area, Class, Work, Pride, Boasting, Tattoos, Greed, Materialism, Idol worship ('How Idolatry controls us'), Rap, Quarrel, Discipline, Mating, Entertainment, and Pheromones."
      }
    },
    {
      id: "node-rewards-pleasure-punishment",
      x: 46, y: 44,
      category: "limbic",
      circuitType: "both",
      title: { zh: "奖赏 (想要 Wants)、愉悦 (需要 Needs) 与惩罚回路", en: "Rewards (Wants), Pleasure (Needs) & Punishment" },
      subtitle: { zh: "多巴胺 · 阿片肽 · 催产素 · 习惯停止开关", en: "Dopamine · Opioids · Oxytocin · Stop Habits" },
      posterLabels: [
        "Rewards (Wants)", "Dopamine", "Opioids",
        "Pleasure (Needs)", "Stop Habits", "Oxytocin", "Obesity",
        "Mating", "Hunger", "Drugs", "Odors", "to Organs",
        "Punishment", "Dopamine off", "Motion", "Fear"
      ],
      summary: {
        zh: "精准对应现代动机神经科学（如 Berridge 的 Wanting vs. Liking 区分）：1) 奖赏（Rewards = Wants“想要/渴求”），由中脑边缘多巴胺（Dopamine）和阿片肽（Opioids）驱动；2) 愉悦与稳态需求（Pleasure = Needs“需要/喜欢”），连接饥饿（Hunger）、肥胖（Obesity）、择偶（Mating）、催产素（Oxytocin）、气味（Odors）、成瘾药物（Drugs）以及红色的“停止习惯”（Stop Habits）抑制节点；3) 惩罚中枢（Punishment），触发多巴胺关闭（Dopamine off）、恐惧（Fear）与逃避运动（Motion）。",
        en: "Reflects affective neuroscience's distinction between 'Wanting' and 'Liking/Needs': 1) Rewards ('Wants') driven by Dopamine and Opioids; 2) Pleasure ('Needs') linking Hunger, Obesity, Mating, Oxytocin, Drugs, Odors, and a red inhibitory 'Stop Habits' node; 3) Punishment, which switches 'Dopamine off' and triggers Fear and defensive Motion."
      }
    },
    {
      id: "node-thalamus-temporal",
      x: 47, y: 56,
      category: "limbic",
      circuitType: "both",
      title: { zh: "丘脑中继与颞叶/下丘脑稳态网络", en: "Thalamus Relays, Temporal Lobe & Stress/Hormone Hub" },
      subtitle: { zh: "视觉/听觉中继 · 生物钟 · 睡眠 · 压力与痛觉控制", en: "Vision/Sound Relay · Clock · Sleep · Stress & Pain Control" },
      posterLabels: [
        "TEMPORAL LOBE", "Thalamus", "Vision Relay", "Sound Relay",
        "Words", "Sounds", "Visual-Audio Reflexes",
        "Emotion", "Fear", "Clock", "Who", "Sleep", "Eye Contact",
        "Hormones", "Stress", "Pain Control",
        "Image Stabilization", "Oculo Reflex", "Balance",
        "serotonin", "acetylcholine"
      ],
      summary: {
        zh: "丘脑（Thalamus）作为全脑感官核心交换机，包含外侧膝状体视觉中继（Vision Relay）与内侧膝状体声音中继（Sound Relay），并分出快速视听反射（Visual-Audio Reflexes）。周围颞叶与下丘脑区域整合语言声音（Words / Sounds）、身份识别（Who）、眼神接触（Eye Contact）、昼夜生物钟（Clock）、睡眠（Sleep）、内分泌激素（Hormones）、红色压力中心（Stress）及下行痛觉控制（Pain Control）。",
        en: "The Thalamus houses the Vision Relay and Sound Relay plus fast Visual-Audio Reflexes. Surrounding Temporal and hypothalamic circuits govern Words, Sounds, 'Who' identity recognition, Eye Contact, circadian Clock, Sleep, Hormones, the red inhibitory Stress hub, and descending Pain Control."
      }
    },
    {
      id: "node-v1-occipital",
      x: 78, y: 38,
      category: "visual",
      circuitType: "excitatory",
      title: { zh: "枕叶初级视觉皮层 (V1) 与 V2a / V2b 分流", en: "Occipital Lobe (V1 Sight Area) & V2a / V2b Split" },
      subtitle: { zh: "57万视辐射输入 · 局部边缘/朝向/视差特征提取", en: "570K Optic Radiations · Local Edges, Orientation & Disparity" },
      posterLabels: [
        "OCCIPITAL LOBE", "V1", "Sight Area", "Optic Radiations 570K",
        "V2a", "V2b", "1 2 3", "A"
      ],
      summary: {
        zh: "40–60 亿神经元的视觉加工系统皮层起点：来自丘脑的 57 万根视辐射纤维（Optic Radiations 570K）将信号送入枕叶 V1（Sight Area）。V1 执行局部早期计算（提取边缘倾角、线条方向、双目视差与基础几何图元 1 2 3 / A），随后分流为背侧通路 V2a（空间与运动引导）和腹侧通路 V2b（形状与物体识别）。",
        en: "Cortical entry point of the 4-6 Billion neuron Visual Processing System: Optic Radiations (570K) feed V1 (Sight Area) in the Occipital Lobe to compute local orientation, edges, and disparity before splitting into dorsal V2a and ventral V2b streams."
      }
    },
    {
      id: "node-dorsal-v6-v7-mt",
      x: 75, y: 20,
      category: "visual",
      circuitType: "excitatory",
      title: { zh: "背侧视觉流：V6 & V7 手眼协调与 V3-5/MT 运动区", en: "Dorsal Stream: V6 & V7 Hand-Eye Coordination & V3-5/MT Motion" },
      subtitle: { zh: "“在哪里/如何行动”通路 · 运动向量与动作引导", en: "'Where / How' Pathway · Motion Vectors & Action Guidance" },
      posterLabels: [
        "V6 & V7", "Hand-Eye Coordination", "V2a", "S1", "1 2 3",
        "V3-5/MT", "Motion"
      ],
      summary: {
        zh: "背侧视觉通路（Dorsal 'Where/How' Stream）：V3-5/MT（中颞区）专门解算视觉运动速度与方向（Motion，配交通信号灯与奔跑小人）；V2a 向上输送至 V6 & V7（Hand-Eye Coordination 手眼协调区，配棒球击球、投球、接球、铁锤敲击、方向盘驾驶、跨栏剪影），并与顶内沟（IPS）相连，实现视觉引导的精准肢体动作。",
        en: "The Dorsal 'Where/How' Stream: V3-5/MT computes visual Motion trajectories, while V2a feeds V6 & V7 for high-speed Hand-Eye Coordination (batting, catching, hammering, steering) and connects to IPS for visually guided limb control."
      }
    },
    {
      id: "node-ventral-v3b-v4h-faces",
      x: 72, y: 53,
      category: "visual",
      circuitType: "excitatory",
      title: { zh: "腹侧视觉流：V3b 物体记忆、V4h 色彩与面孔/身体/裸体(N170)网络", en: "Ventral Stream: V3b Objects, V4h Colors & Face/Body/Nudity (N170)" },
      subtitle: { zh: "“是什么”通路 · 刻印记忆并转发至 OFC", en: "'What' Pathway · Etched in Memory & Forwarded to OFC" },
      posterLabels: [
        "V3b", "Learned images become etched in memory, then recognized and forwarded to the OFC",
        "Object Processing", "V4h", "Colors",
        "Nudity Processing", "Facial Expression Processing",
        "Face Processing (front, profile)", "Body Parts",
        "Place Processing", "Place Mapping", "Word Processing"
      ],
      summary: {
        zh: "腹侧视觉通路（Ventral 'What' Stream）：经 V2b 进入 V3b（全局物体识别 Object Processing：鸟、飞机、汽车、房屋、蝴蝶、人像）和 V4h（色彩恒常性与颜色处理 Colors）。图谱特别标注：“习得的图像被铭刻在记忆中，随后被识别并转发至眶额皮层（OFC）”。枕颞叶皮层分布着高度特化的功能模块：面孔处理（正脸 front / 侧脸 profile）、面部表情处理、身体部位（Body Parts）、地点处理（Place Processing）以及早期即产生超强 N170 负向脑电波响应的裸体处理区（Nudity Processing）。",
        en: "The Ventral 'What' Stream: V2b feeds V3b (Object Processing) and V4h (Colors), where 'Learned images become etched in memory, then recognized and forwarded to the OFC.' Distributed occipito-temporal modules handle Face Processing (front/profile), Facial Expressions, Body Parts, Place Processing, Word Processing, and Nudity Processing (enhanced early N170 ERP response)."
      }
    },
    {
      id: "node-retina-eye",
      x: 20, y: 63,
      category: "sensory",
      circuitType: "excitatory",
      title: { zh: "眼睛与视网膜微电路 (1. Sight)", en: "Eye & Retinal Micro-Circuitry (1. Sight)" },
      subtitle: { zh: "1.26亿视杆 + 600万视锥 → 100万视神经轴突", en: "126M Rods + 6M Cones → 1M Optic Nerve Axons" },
      posterLabels: [
        "1. Sight", "Visual Processing in the Retina",
        "125 Million Rods & 6 Million Color Cone Photoreceptors to 1 Million axons in the Optic Nerve",
        "Motion Detection Foveal Reflex", "Smooth Pursuit Foveal Reflex",
        "Fovea High Resolution View", "200,000 Cones in Fovea",
        "Fovea Notch diameter is 1.5 mm", "Retina Thickness is .12 mm, area is 2,500 mm2",
        "126 Million Rods", "Fovea Notch", "Retina",
        "Peripheral Low Resolution View", "Peripheral Motion Sensing Circuitry provides visual reflexes",
        "imaged flipped upside down and backwards", "<- to Right Eye",
        "Optic Nerve 1 Million Connections", "Oculomotor Nerve controls eye muscles"
      ],
      summary: {
        zh: "视网膜（厚 0.12 mm，面积 2,500 mm²）是一台每眼预估算力超过 4 颗苹果 A8 处理器的前端神经图像处理器：它将晶状体投射的上下颠倒、左右反转图像（imaged flipped upside down and backwards）从 1.25–1.26 亿视杆细胞和 600 万视锥细胞空间编码压缩至 100 万根视神经轴突。其中直径仅 1.5 mm 的中央凹（Fovea Notch）聚集了 20 万个视锥细胞负责高分辨率视图，而周边运动感知电路负责检测碰撞路径并触发四肢避险反射。",
        en: "The retina (0.12 mm thick, 2,500 mm² area) spatially encodes and compresses 125M-126M rods and 6M cones into 1M Optic Nerve connections (>4 Apple A8 processors of compute per eye), combining a 1.5 mm high-res Fovea Notch (200,000 cones) with peripheral motion-sensing collision-avoidance reflexes."
      }
    },
    {
      id: "node-smell-taste-touch-face",
      x: 28, y: 80,
      category: "sensory",
      circuitType: "excitatory",
      title: { zh: "嗅觉 (2)、味觉 (3)、触觉 (4) 与面部表情 (8)", en: "Smell (2), Taste (3), Touch (4) & Facial Expressions (8)" },
      subtitle: { zh: "化学感官 · 皮肤感受器分布 · 六大基本情绪表情", en: "Chemosensation · Skin Receptor Density · 6 Core Expressions" },
      posterLabels: [
        "2. Smell", "12 Million Olfactory Receptor Cells (Human)",
        "1 Billion Olfactory Receptor Cells (Dog)", "5 Billion Olfactory Receptor Cells (Hound)",
        "3. Taste", "5-10 Receptors per Taste Bud", "9,000 Taste Buds", "Facial Nerve",
        "4. Touch", "Pain", "200 pain / 15 pressure / 6 cold / 1 warmth per cm2",
        "8. Facial Expressions", "Automatically Produced and Read",
        "happiness, sadness, surprise, fear, anger and disgust"
      ],
      summary: {
        zh: "左下与中下区域汇集四大感官输入：2. 嗅觉（人类 1,200 万 vs 狗 10 亿 vs 寻血猎犬 50 亿嗅细胞）、3. 味觉（9,000 味蕾 × 5–10 感受器，经面神经上传）、4. 触觉与痛觉（每 cm² 皮肤含 200 痛觉、15 压觉、6 冷觉、1 温觉感受器），以及 8. 面部表情（皮下精密肌群自动生成并由视觉系统自动读取 6 大情绪：快乐、悲伤、惊讶、恐惧、愤怒、厌恶）。",
        en: "Clusters four major sensory modalities: 2. Smell (12M receptors in humans vs. 1B in dogs and 5B in hounds), 3. Taste (9,000 taste buds with 5-10 receptors each via Facial Nerve), 4. Touch (200 pain, 15 pressure, 6 cold, 1 warmth receptor per cm²), and 8. Facial Expressions (6 core emotions automatically produced and read)."
      }
    },
    {
      id: "node-vagus-autonomic",
      x: 48, y: 82,
      category: "spinal",
      circuitType: "both",
      title: { zh: "迷走神经 (Vagus Nerve) 与内脏自主调控", en: "Vagus Nerve & Visceral Autonomic Regulation" },
      subtitle: { zh: "2亿输入程序 · 降低心率与血压 · 消化与呼吸", en: "200M Input Programs · Reduces Heart Rate & BP · Digestion & Breathing" },
      posterLabels: [
        "Vagus Nerve", "200 Million Input Programs", "Digestion", "from organs", "to organs",
        "Strength Limits", "Adrenaline", "pain off",
        "Activation of the vagus nerve typically leads to a reduction in heart rate, blood pressure, or both.",
        "heart rate, blood pressure", "Breathing"
      ],
      summary: {
        zh: "迷走神经（Vagus Nerve，第十对脑神经）是副交感神经系统的核心干线，连接脑干与胸腹腔内脏（心脏心率与血压 heart rate, blood pressure、肺部呼吸 Breathing、胃肠消化 Digestion），配合肠神经系统等构成约 2 亿个内脏输入程序（200 Million Input Programs）。激活迷走神经通常会降低心率、血压或两者兼有，与肾上腺素（Adrenaline）交感应激通路拮抗平衡。",
        en: "Linking the brainstem with visceral organs (Digestion, Heart rate, Blood pressure, Breathing) alongside 200 Million Input Programs. Activation of the vagus nerve typically reduces heart rate, blood pressure, or both."
      }
    },
    {
      id: "node-cerebellum-nav",
      x: 68, y: 74,
      category: "cerebellum",
      circuitType: "both",
      title: { zh: "小脑 (Cerebellum)：690亿神经元的运动技能与惯性导航计算机", en: "Cerebellum: 69B Neurons, Learned Skills & Inertial Navigation" },
      subtitle: { zh: "展开长 1 米 (500 cm²) · 陀螺仪/加速度计积分 · 精细运动库", en: "1m Unfolded (500 cm²) · Gyro/Accelerometer Computer · Motor Programs" },
      posterLabels: [
        "CEREBELLUM", "Learned Habits / Skills", "69 Billion Neurons",
        "1 Meter long if unfolded ( 500 cm2 )",
        "Proprioception (Limb Position)", "Dentate Nuclei", "Climbing fibers",
        "Brake", "Aim", "Shoot", "fine finger motor (play piano)",
        "messy", "green circuits", "Quarrel", "Say Hi", "Sing", "Move", "Stop",
        "Navigation", "Gyro & Accelerometer", "Sound inputs",
        "Gyro & Accelerometer inputs", "from Motor Cortex to Muscles", "acetylcholine"
      ],
      summary: {
        zh: "小脑包含高达 690 亿个神经元（占全脑神经元约 80%），展开长达 1 米（面积 500 cm²）。它不仅是深藏的惯性导航神经计算机（接收前庭 Gyro & Accelerometer inputs 和听觉 Sound inputs，实时解算三维空间运动轨迹），还通过攀援纤维（Climbing fibers）和齿状核（Dentate Nuclei）存储习得的习惯与技能程序（Learned Habits / Skills）：刹车（Brake）、瞄准（Aim）、射击（Shoot）、弹钢琴等精细手指运动（fine finger motor）、打招呼（Say Hi）、唱歌（Sing）、移动（Move）与停止（Stop）。",
        en: "Packing 69 Billion Neurons into a folded cortex 1 meter long if unfolded (500 cm²), the Cerebellum acts both as an inertial navigation computer (processing Gyro & Accelerometer and Sound inputs) and a repository of Learned Habits/Skills: Brake, Aim, Shoot, fine finger motor (play piano), Say Hi, Sing, Move, and Stop via Dentate Nuclei and Climbing fibers."
      }
    },
    {
      id: "node-vestibule-cochlea",
      x: 88, y: 82,
      category: "sensory",
      circuitType: "excitatory",
      title: { zh: "前庭航天制导传感器 (6. Balance) 与耳蜗听觉 (5. Hearing)", en: "Vestibule Triad (6. Balance) & Cochlea (5. Hearing)" },
      subtitle: { zh: "航天飞机同款三轴陀螺仪/加速度计 · 15,500 耳蜗毛细胞", en: "Space Shuttle 3-Axis Gyro/Accelerometer · 15,500 Cochlear Hair Cells" },
      posterLabels: [
        "6. Balance & Acceleration", "Image Stabilization", "Navigation", "Eye Reflex",
        "Vestibule", "Vestibule is similar to the main sensor used in Military Guidance and the Space Shuttle",
        "Military Accelerometer-Gyro Triad",
        "5. Hearing", "Cochlea", "30,000 Connections in Auditory Nerve",
        "15,500 Hair Cells in Cochlea", "100,000,000 Neurons in Auditory Cortex"
      ],
      summary: {
        zh: "右下角展示了内耳两大精密生物传感器：1) 前庭（Vestibule，6. 平衡与加速度），具备正交 X-Y-Z 三轴半规管陀螺仪与耳石加速度计，原理与航天飞机（Space Shuttle）及导弹制导主传感器完全同构，负责图像稳定、空间导航和眼反射；2) 耳蜗（Cochlea，5. 听觉），利用 15,500 个毛细胞驱动 30,000 根听神经连接，最终投射至含 1 亿神经元的听觉皮层。",
        en: "Showcases two inner-ear marvels: 6. Balance & Acceleration via the Vestibule (a biological 3-axis Accelerometer-Gyro Triad analogous to Space Shuttle and missile guidance sensors) and 5. Hearing via the Cochlea (15,500 hair cells -> 30,000 Auditory Nerve connections -> 100M Auditory Cortex neurons)."
      }
    },
    {
      id: "node-spinal-dna",
      x: 64, y: 91,
      category: "spinal",
      circuitType: "both",
      title: { zh: "脊髓 (10亿神经元)、痛觉反射回路与 DNA 布线存储", en: "Spinal Cord (1B Neurons), Pain Reflex & DNA Wiring Code" },
      subtitle: { zh: "97% 为中间神经元 · 1米长运动轴突 · 每克 DNA 存 4,550亿 GB", en: "97% Interneurons · 1m+ Motor Axons · 455B GB/g DNA Storage" },
      posterLabels: [
        "Spinal Cord", "1 Billion Neurons",
        "Myelin insulated Axons (wiring) run up/down from the cortex around the lamina",
        "Pain Reflex Circuitry", "Arm Layer", "Inter Neurons",
        "to Sensory Cortex", "Balance to Legs", "Proprioception",
        "Butterfly (grey matter) Spinal Cord Lamina",
        "The longest axon of a human motor neuron can be over a meter long. -Wikipedia",
        "Wiring stored in DNA code",
        "DNA storage is very dense. At theoretical maximum, DNA can encode 455 Billion Gigabytes per gram"
      ],
      summary: {
        zh: "脊髓（Spinal Cord）含 10 亿神经元，外围白质是髓鞘绝缘轴突（Myelin insulated Axons）上下传导皮层与感官信号，中央是蝴蝶形灰质层板（Butterfly grey matter Lamina）。高达 97% 的脊髓细胞是中间神经元（Interneurons），构成精密的痛觉反射电路（Pain Reflex Circuitry），双侧协调多关节屈肌与伸肌动作（如一侧缩手/缩腿、对侧伸展维持平衡 Balance to Legs）。人类运动神经元最长的轴突可超过 1 米。而全脑神经布线的发育蓝图编码在 DNA 中——理论上每克 DNA 最高可存储 4,550 亿 GB 数据！",
        en: "The Spinal Cord contains 1 Billion Neurons with myelin-insulated axons running around the butterfly-shaped grey matter lamina. Up to 97% of spinal cord cells are interneurons that coordinate bilateral multi-joint flexor/extensor Pain Reflex Circuitry. Motor neuron axons can exceed 1 meter in length, and the developmental wiring blueprint is stored in DNA (up to 455 Billion GB per gram theoretical density)."
      }
    }
  ],

  // 4. All 19 Verbatim Quotes & Scientific Citations on the Poster
  quotes: [
    {
      id: "q-decision-making",
      region: { zh: "前额叶决策三环路 (OFC / DLPFC / ACC)", en: "Prefrontal Decision Circuits (OFC / DLPFC / ACC)" },
      en: "\"Three frontal circuits have been associated with decision making: 1) the OFC 2) the DLPFC, and 3) the ACC, important in sorting among conflicting options, as well as outcome-processing.\"",
      zh: "“三个额叶环路与决策密切相关：1) 眶额皮层（OFC），2) 背外侧前额叶（DLPFC），以及 3) 前扣带皮层（ACC），它们在权衡冲突选项以及处理结果反馈中起关键作用。”",
      source: "The Functional Neuroanatomy of Decision-Making (Rosenbloom et al., 2012)",
      url: "https://psychiatryonline.org/doi/10.1176/appi.neuropsych.11060139"
    },
    {
      id: "q-ompfc",
      region: { zh: "眶额与内侧前额叶网络 (OMPFC)", en: "Orbital & Medial Prefrontal Cortex" },
      en: "\"It can now be recognized that the region (Orbital and Medial Prefrontal Cortex) as a whole receives highly processed sensory afferents, provides for cortical influence over visceral functions, and participates in high-level cognitive and emotional processes.\"",
      zh: "“现在可以确认，该区域（眶额与内侧前额叶皮层）作为一个整体接收高度加工的感官传入信号，提供皮层对内脏功能的调控影响，并参与高级认知和情绪过程。”",
      source: "The Organization of Networks within the Orbital and Medial Prefrontal Cortex of Rats, Monkeys and Humans (Öngür & Price, 2000)",
      url: "https://pubmed.ncbi.nlm.nih.gov/10731217/"
    },
    {
      id: "q-acc-religion",
      region: { zh: "前扣带皮层 (ACC) 与焦虑缓解", en: "Anterior Cingulate Cortex (ACC)" },
      en: "\"Religious conviction acts like an anxiolytic, reducing emotional reactions to errors or uncertainty, providing people with a meaningful system helping them to understand the complex and uncertain world that we live in. In physiological terms, it reduces ACC activity and consequently distress.\"",
      zh: "“宗教信念就像一种抗焦虑剂，能减少对错误或不确定性的情绪反应，为人们提供一套有意义的体系来理解我们所处的复杂而不确定的世界。从生理学角度看，它降低了前扣带皮层（ACC）的活动，从而减轻了痛苦。”",
      source: "The Anterior Cingulate Cortex / Religious Primes Reduce Neurophysiological Response to Errors (Inzlicht et al., 2009/2010)",
      url: "https://pubmed.ncbi.nlm.nih.gov/20558751/"
    },
    {
      id: "q-retina-compression",
      region: { zh: "视网膜空间编码压缩 (Retina)", en: "Retina Spatial Encoding" },
      en: "\"The retina does not simply send a picture to the brain. The retina spatially encodes (compresses) the image to fit the limited capacity of the optic nerve.\"",
      zh: "“视网膜并不是简单地把一张图片发送给大脑。视网膜会对图像进行空间编码（压缩），以适配视神经有限的传输容量。”",
      source: "Wikipedia - Retina",
      url: "https://en.wikipedia.org/wiki/Retina"
    },
    {
      id: "q-pfc-experience",
      region: { zh: "经验对发育中前额叶的塑造", en: "Developing Prefrontal Cortex" },
      en: "\"It is now clear that even fairly innocuous-looking experiences can profoundly affect brain development and that the range of experiences that can alter brain development is much larger than had once been believed.\"",
      zh: "“现在已经很清楚，即使是看似相当无害的经历也会深刻影响大脑发育，而且能够改变大脑发育的经历范围比过去认为的要广泛得多。”",
      source: "Experience and the developing prefrontal cortex (Kolb et al., PNAS 2012)",
      url: "https://pubmed.ncbi.nlm.nih.gov/23045653/"
    },
    {
      id: "q-facial-expressions",
      region: { zh: "第 8 感官：面部表情工程学", en: "8. Facial Expressions" },
      en: "\"The human face is an engineering marvel. Underneath our skin, a large number of muscles allow us to produce many configurations.\"",
      zh: "“人类的面孔是一个工程学奇迹。在我们的皮肤之下，大量的肌肉使我们能够组合出极其丰富的表情构型。”",
      source: "A Model of the Perception of Facial Expressions of Emotion by Humans (Martinez & Du, 2012)",
      url: "https://pubmed.ncbi.nlm.nih.gov/23950695/"
    },
    {
      id: "q-skin-receptors",
      region: { zh: "第 4 感官：皮肤感受器密度", en: "4. Touch - Skin Receptor Density" },
      en: "\"Every square centimetre of your skin contains around 200 pain receptors but only 15 receptors for pressure, 6 for cold and 1 for warmth.\"",
      zh: "“你每平方厘米的皮肤包含大约 200 个痛觉感受器，但只有 15 个压觉感受器、6 个冷觉感受器和 1 个温觉感受器。”",
      source: "BBC Science & Nature / Nervous System Receptor Facts",
      url: "https://www.neurobion.com/en_AE/home/learn/10-facts-about-the-nervous-system.html"
    },
    {
      id: "q-mirror-neurons",
      region: { zh: "镜像神经元系统 (Mirror Neurons)", en: "Mirror Motor Learning" },
      en: "\"Mirror neurons are a particular class of visuomotor neurons, that discharge both when performing a particular action and when observing another individual doing a similar action.\"",
      zh: "“镜像神经元是一类特殊的视运动神经元，当个体执行特定动作以及观察另一个体执行相似动作时，它们都会发生放电。”",
      source: "The Mirror-Neuron System (Rizzolatti & Craighero, Annu. Rev. Neurosci. 2004)",
      url: "https://pubmed.ncbi.nlm.nih.gov/15217330/"
    },
    {
      id: "q-ips-grasping",
      region: { zh: "顶内沟 (IPS) 与手部抓握计算", en: "Intraparietal Sulcus (IPS)" },
      en: "\"There is overwhelming evidence that areas in the IPS are involved in complex hand use, reaching, grasping, matching visual and body centered frames of references for reaching and grasping, and programming intentional hand movements.\"",
      zh: "“有压倒性的证据表明，顶内沟（IPS）区域参与复杂的手部使用、伸手、抓握，将用于伸手和抓握的视觉参考系与身体中心参考系进行匹配，并对有意识的手部运动进行编程。”",
      source: "Topographic Maps within Brodmann's Area 5 of Macaque Monkeys (Seelke et al., 2012)",
      url: "https://pubmed.ncbi.nlm.nih.gov/21955920/"
    },
    {
      id: "q-visual-hierarchy",
      region: { zh: "视觉皮层层级计算 (V1–V7)", en: "The Visual Processing System" },
      en: "\"The recognition process likely entails a sequence of computations across visual cortex, starting from local computations in early visual cortex related to low-level properties of the visual stimulus, such as disparity, motion, or orientation, conveying little sense of the global object shape, then proceeding to more global computations in higher levels of the hierarchy of visual processing.\"",
      zh: "“识别过程可能涉及跨越视觉皮层的一系列计算：从早期视觉皮层中与视觉刺激低级属性（如视差、运动或朝向，几乎不传达整体物体形状感）相关的局部计算开始，随后推进到视觉处理层级更高层面的全局计算。”",
      source: "Representation of Shapes, Edges, and Surfaces Across Multiple Cues in the Human Visual Cortex (Vinberg & Grill-Spector, 2008)",
      url: "https://pubmed.ncbi.nlm.nih.gov/18171705/"
    },
    {
      id: "q-face-body-networks",
      region: { zh: "枕颞叶面孔与身体感知网络", en: "Face & Body Perception" },
      en: "\"Evidence from functional neuroimaging indicates that visual perception of human faces and bodies is carried out by distributed networks of face and body-sensitive areas in the occipito-temporal cortex.\"",
      zh: "“来自功能性神经影像学的证据表明，对人类面孔和身体的视觉感知是由枕颞叶皮层中面孔敏感区和身体敏感区的分布式网络共同执行的。”",
      source: "Different Cortical Dynamics in Face and Body Perception (Meeren et al., PLOS ONE 2013)",
      url: "https://pubmed.ncbi.nlm.nih.gov/24039712/"
    },
    {
      id: "q-nudity-n170",
      region: { zh: "裸体视觉早期检测与 N170 增强响应", en: "Nudity Processing (N170 Response)" },
      en: "\"Our results thus confirm that nudity of human bodies is detected early on during visual processing, and that the human brain exhibits enhanced visual processing to other people's nude bodies. Interestingly, the N170 response to nude bodies was even greater than that to faces.\"",
      zh: "“因此，我们的结果证实，人类身体的裸露在视觉处理的早期阶段就被检测到了，并且人类大脑对他人裸体表现出增强的视觉加工。有趣的是，对裸体的 N170 脑电响应甚至大于对面孔的响应。”",
      source: "The Naked Truth: The Face and Body Sensitive N170 Response Is Enhanced for Nude Bodies (Hietanen & Nummenmaa, PLOS ONE 2011)",
      url: "https://pubmed.ncbi.nlm.nih.gov/22110574/"
    },
    {
      id: "q-smooth-pursuit-vestibular",
      region: { zh: "平滑追踪系统与前庭协同", en: "Smooth-Pursuit & Vestibular System" },
      en: "\"During head movements, both systems must interact with the vestibular system. The goal of the pursuit system is to keep the retinal target image on the fovea by matching the eye velocity to target velocity.\"",
      zh: "“在头部运动期间，这两个系统都必须与前庭系统相互作用。追踪系统的目标是通过使眼球速度与目标速度相匹配，将视网膜上的目标图像稳定保持在中央凹（Fovea）上。”",
      source: "The vestibular-related frontal cortex and its role in smooth-pursuit (Fukushima et al., 2006)",
      url: "https://pubmed.ncbi.nlm.nih.gov/16917164/"
    },
    {
      id: "q-single-neurons",
      region: { zh: "单神经元复杂计算能力", en: "Single Neuron Computation (V3b/V4h)" },
      en: "\"It is now becoming increasingly apparent that even single neurons can perform complex computations.\"",
      zh: "“现在越来越明显的是，即使是单个神经元也能够执行复杂的计算。”",
      source: "Wikipedia - Neuron",
      url: "https://en.wikipedia.org/wiki/Neuron"
    },
    {
      id: "q-cerebellum-inertial",
      region: { zh: "小脑深处的惯性导航神经计算机", en: "Cerebellum Inertial Navigation" },
      en: "\"Researchers have discovered a sophisticated neural computer, buried deep in the cerebellum, that performs inertial navigation calculations to figure out a person's movement through space.\"",
      zh: "“研究人员发现了一台深埋在小脑内部的精密神经计算机，它能够执行惯性导航计算，从而解算出人在空间中的运动轨迹。”",
      source: "Brain's Inertial Navigation System Pinpointed (ScienceDaily / Cell Press, 2007)",
      url: "https://www.sciencedaily.com/releases/2007/06/070620122014.htm"
    },
    {
      id: "q-vagus-nerve",
      region: { zh: "迷走神经激活降低心率与血压", en: "Vagus Nerve Activation" },
      en: "\"Activation of the vagus nerve typically leads to a reduction in heart rate, blood pressure, or both.\"",
      zh: "“迷走神经的激活通常会导致心率下降、血压降低，或两者兼而有之。”",
      source: "Wikipedia - Vagus nerve",
      url: "https://en.wikipedia.org/wiki/Vagus_nerve"
    },
    {
      id: "q-spinal-interneurons",
      region: { zh: "脊髓痛觉反射与 97% 中间神经元", en: "Spinal Cord Reflex Circuitry" },
      en: "\"A complex interneuronal circuitry must exist to coordinate the control of limb extensor and flexor activity across multiple joints bilaterally. Indeed, interneurons make up as much as 97% of all cells in the cord.\"",
      zh: "“必然存在着复杂的中间神经元环路，以双侧协调跨多个关节的肢体伸肌与屈肌活动。事实上，中间神经元占脊髓所有细胞的 97% 之多。”",
      source: "Spinal cord (reflex circuitry)",
      url: "https://en.wikipedia.org/wiki/Spinal_cord"
    },
    {
      id: "q-motor-axon-length",
      region: { zh: "人类运动神经元超 1 米长轴突", en: "Spinal Cord Lamina & Motor Neuron" },
      en: "\"The longest axon of a human motor neuron can be over a meter long.\"",
      zh: "“人类运动神经元最长的轴突可以超过一米长。”",
      source: "Wikipedia - Motor neuron",
      url: "https://en.wikipedia.org/wiki/Motor_neuron"
    },
    {
      id: "q-dna-storage",
      region: { zh: "DNA 编码中的超高密度布线存储", en: "Wiring Stored in DNA Code" },
      en: "\"DNA storage is very dense. At theoretical maximum, DNA can encode 455 Billion Gigabytes per gram\"",
      zh: "“DNA 存储极其密集。在理论最大值下，每克 DNA 可以编码 4,550 亿吉字节（GB）的数据。”",
      source: "Next-Generation Digital Information Storage in DNA, Harvard University (Church et al., Science 2012)",
      url: "https://www.ovid.com/journals/scie/fulltext/10.1126/science.1226355~next-generation-digital-information-storage-in-dna"
    }
  ],

  // 5. Visual Processing Hierarchy Stages (for Interactive Visual Stream Lab)
  visualHierarchy: [
    {
      stage: "Retina",
      name: { zh: "视网膜前端压缩芯片", en: "Retina Front-End Compressor" },
      neurons: "125M–126M Rods + 6M Cones → 1M Optic Nerve Axons",
      compute: { zh: "> 4 颗 Apple A8 处理器 / 眼", en: "> 4 Apple A8 Processors / Eye" },
      function: {
        zh: "光学图像上下颠倒、左右反转投射；中央凹（直径 1.5 mm，含 200,000 视锥细胞）负责高清彩色细节；周边视野（1.26亿视杆）检测运动与碰撞路径并直发四肢避险反射。",
        en: "Image flipped upside down and backwards; 1.5 mm Fovea Notch (200k cones) captures high-res detail; peripheral motion circuitry scans collision paths and triggers limb reflexes."
      }
    },
    {
      stage: "Thalamus → Optic Radiations",
      name: { zh: "丘脑视觉中继与视辐射 (570K)", en: "Thalamus Vision Relay & Optic Radiations (570K)" },
      neurons: "1M Optic Nerve → Thalamus → 570K Optic Radiations",
      compute: { zh: "视听快速反射分流 + 皮层投射", en: "Visual-Audio Reflex Split + Cortical Relay" },
      function: {
        zh: "视神经（100万连接）进入丘脑视觉中继（Vision Relay / LGN），分出快速视听反射（Visual-Audio Reflexes），并通过 570,000 (570K) 根视辐射纤维投射至枕叶 V1。",
        en: "1M Optic Nerve fibers relay through Thalamus (triggering fast Visual-Audio Reflexes) and project via 570K Optic Radiations to Occipital Lobe V1."
      }
    },
    {
      stage: "V1 (Sight Area)",
      name: { zh: "初级视觉皮层 V1 (枕叶)", en: "Primary Visual Cortex V1 (Occipital Lobe)" },
      neurons: "Part of 4–6 Billion Visual System Neurons",
      compute: { zh: "局部边缘、朝向、双目视差计算", en: "Local Orientation, Edges & Disparity" },
      function: {
        zh: "执行早期局部计算：检测线条倾角、边缘对比、双目视差与基础几何图元（1 2 3, A），随后分流至 V2a（背侧空间动作流）与 V2b（腹侧物体识别流）。",
        en: "Performs local computations on low-level stimulus properties (disparity, motion, orientation, basic primitives '1 2 3', 'A') before splitting into V2a and V2b."
      }
    },
    {
      stage: "V2a → V3-5/MT → V6 & V7 → IPS",
      name: { zh: "背侧流 (Dorsal Stream)：运动与手眼协调", en: "Dorsal Stream: Motion & Hand-Eye Coordination" },
      neurons: "V2a · V3-5/MT · V6 & V7 · Parietal IPS",
      compute: { zh: "三维空间轨迹、手眼协调与抓握编程", en: "3D Motion Vectors, Hand-Eye & Grasp Programming" },
      function: {
        zh: "V3-5/MT 解算运动速度与方向（Motion）；V6 & V7 主导手眼协调（Hand-Eye Coordination：击球、接球、使用工具、驾驶）；顶内沟（IPS）将视觉坐标与身体参考系匹配，转化为伸手与抓握（Grasp）指令。",
        en: "V3-5/MT computes Motion; V6 & V7 drive Hand-Eye Coordination; IPS matches visual and body-centered reference frames for reaching, grasping, and Visual Guided Limbs."
      }
    },
    {
      stage: "V2b → V3b & V4h → Occipito-Temporal → OFC",
      name: { zh: "腹侧流 (Ventral Stream)：颜色、物体、面孔/裸体(N170)与记忆铭刻", en: "Ventral Stream: Colors, Objects, Faces/Nudity (N170) & OFC Memory" },
      neurons: "V2b · V3b · V4h · Face/Body/Nudity/Place/Word Areas",
      compute: { zh: "全局形状合成、N170 快速响应、铭刻记忆送往 OFC", en: "Global Shape Synthesis, Enhanced N170, Memory -> OFC" },
      function: {
        zh: "V4h 解算色彩（Colors）；V3b 进行全局物体识别（Object Processing），将习得图像铭刻在记忆中并转发至眶额皮层（OFC）。分布式专职模块处理：面孔（正/侧脸）、面部表情、身体部位、裸体（早期 N170 负向波幅甚至强于面孔）、地点映射（指南针）与文字（Words）。",
        en: "V4h processes Colors; V3b handles Object Processing ('Learned images become etched in memory, then recognized and forwarded to the OFC'). Dedicated modules process Faces (front/profile), Expressions, Body Parts, Nudity (early N170 response greater than faces), Places, and Words."
      }
    }
  ],

  // 6. Complete Directory of Every Label on the Poster (Grouped for Exhaustive Inspection & Search)
  completeGlossary: [
    { group: "Cortex & Neuron Fundamentals", en: "86+ Billion Neurons", zh: "860亿+ 神经元（全脑总量：含小脑690亿、皮层150亿+、脊髓10亿）" },
    { group: "Cortex & Neuron Fundamentals", en: "15+ Billion Neurons in the Cerebral Cortex", zh: "大脑皮层含 150亿+ 神经元" },
    { group: "Cortex & Neuron Fundamentals", en: "65+ Trillion Connections in the Cerebral Cortex", zh: "大脑皮层含 65万亿+ 突触连接" },
    { group: "Cortex & Neuron Fundamentals", en: "Avg of 1,000-10,000 Connections (Synapses) per Neuron", zh: "每个神经元平均 1,000–10,000 个突触连接" },
    { group: "Cortex & Neuron Fundamentals", en: "Transistor equivalent of 45,000 i7 Dual Core Processors", zh: "原图工程类比：突触数量相当于 45,000 颗英特尔 i7 双核处理器的晶体管开关" },
    { group: "Cortex & Neuron Fundamentals", en: "1 mm³ of cortex = 50,000+ Neurons & 100M+ Synapses (>5 Apple A8 processors)", zh: "1立方毫米皮层含 5万+ 神经元与 1亿+ 突触（原图按晶体管密度换算超 5 颗苹果 A8 芯片；A8 每 mm³ 含 2,300 万晶体管）" },
    { group: "Cortex & Neuron Fundamentals", en: "Total Surface Area of the Cerebral Cortex = 2,500 cm²", zh: "大脑皮层总表面积 = 2,500 平方厘米（6层折叠灰质电路板，厚 1.5–4.5 mm）" },
    { group: "Cortex & Neuron Fundamentals", en: "Red Circuits are inhibitory, all other colors are excitatory", zh: "原图电路配色法则：红色电路为抑制性通路，其余所有颜色均为兴奋性通路" },
    { group: "Cortex & Neuron Fundamentals", en: "IF ( D+ + G+ - GABA- ) > +20 mV Then FIRE", zh: "动作电位触发公式：若净去极化 ΔV 超过 +20 mV（膜电位从 -70 mV 升至 -50 mV 阈值），则触发 Na⁺ 内流放电" },
    { group: "Cortex & Neuron Fundamentals", en: "Dendrites / Ion Flow / -70 mV / Na+ / +Ca2+ / Serotonin / GABA- / Axons", zh: "树突 / 离子流 / -70毫伏静息电位 / 钠离子 / 钙离子 / 血清素 / GABA抑制 / 轴突" },
    { group: "Prefrontal & Executive Control", en: "PREFRONTAL CORTEX (Non Sensory Processing, Can Inhibit Sensory Rewards, Matures late Age 25+)", zh: "前额叶皮层（非感官处理、可抑制感官奖赏、25岁以后晚熟）" },
    { group: "Prefrontal & Executive Control", en: "Bad vs Good Processing (your beliefs)", zh: "善恶是非评估处理（基于个体的信念与规则体系）" },
    { group: "Prefrontal & Executive Control", en: "Executive Control of Behavior (Dorsolateral PFC): Morals, Laws, Values, Good, Bad, Repentance", zh: "行为执行控制（背外侧前额叶 DLPFC）：道德、法律、价值观、善、恶、悔改（反思纠错）" },
    { group: "Prefrontal & Executive Control", en: "ORBITAL FRONTAL CORTEX (Learned Auto-Sensory Rewards, Develops early)", zh: "眶额皮层 OFC（习得的自动感官奖赏，发育早于背外侧前额叶）" },
    { group: "Prefrontal & Executive Control", en: "spirit vs. flesh (Sensory Value / Moral Decision)", zh: "原图“精神/灵（spirit）”与“肉体/物欲（flesh）”标签（对应认知控制长远价值 vs. 即时感官诱惑）" },
    { group: "Prefrontal & Executive Control", en: "Gambling, Education, Video Games, Food, $, Rewards, Beauty Area, Class, Work, Pride, Boasting", zh: "赌博、教育、电子游戏、食物、金钱($)、奖赏、外貌美感区、阶层、工作、骄傲、吹嘘" },
    { group: "Prefrontal & Executive Control", en: "Tattoos, Greed, Materialism, How Idolatry controls us, Idol worship, rap, Quarrel, Discipline", zh: "文身、贪婪、物质主义、偶像崇拜如何控制我们、偶像崇拜、说唱、争吵、管教/自律" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "CINGULATE CORTEX / ACC (Arousal: Verbal & Visual, Mirror Feelings, Perceived Sensations, Pornography, Empathy)", zh: "扣带皮层 / 前扣带皮层 ACC（言语与视觉唤醒、镜像情感、感知的体验、色情视觉反应、共情）" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "INSULAR CORTEX (Sexual & Taste, Tactile)", zh: "脑岛皮层（性与味觉感受、触觉及内脏内感受整合）" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "Rewards (Wants): Dopamine, Opioids", zh: "奖赏（想要/激励显著性 Wants）：多巴胺、阿片肽" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "Pleasure (Needs): Stop Habits, Oxytocin, Obesity, Mating, Hunger, Drugs, Odors, to Organs", zh: "愉悦与生理需求（Needs）：停止习惯（红色抑制）、催产素、肥胖、择偶、饥饿、药物、气味、通往内脏器官" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "Punishment: Dopamine off, Opioids, Motion, Fear", zh: "惩罚中枢：多巴胺关闭（Dopamine off）、阿片肽、逃避运动、恐惧" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "TEMPORAL LOBE & Thalamus: Vision Relay, Sound Relay, Words, Sounds, Visual-Audio Reflexes", zh: "颞叶与丘脑：视觉中继(LGN)、声音中继(MGN)、语词、声音、视听反射" },
    { group: "Limbic, Cingulate, Insula & Motivation", en: "Clock, Who, Sleep, Eye Contact, Hormones, Stress, Pain Control, Image Stabilization, Oculo Reflex, Balance", zh: "生物钟、身份识别(Who)、睡眠、眼神接触、激素、压力(Stress)、痛觉控制、图像稳定、动眼反射、平衡" },
    { group: "Motor, Parietal & Mirror Systems", en: "FEF (Eye Control, Smooth Pursuit) & Attention (Execute Cerebellar Programs, Shoot)", zh: "额叶眼动区 FEF（眼动控制、平滑追踪）与注意力（执行小脑程序、发射/抑制门 Shoot）" },
    { group: "Motor, Parietal & Mirror Systems", en: "Mirror Motor Learning, Motor Planning, Grip Storage, Motor Control (Homunculus)", zh: "镜像运动学习、运动规划、抓握存储、主运动皮层控制（运动侏儒图）" },
    { group: "Motor, Parietal & Mirror Systems", en: "Sensory Area (Pain - Touch - Proprioception Homunculus), Sensory Feedback, Grasp", zh: "体感皮层（痛觉-触觉-本体感觉侏儒图）、感觉反馈、抓握" },
    { group: "Motor, Parietal & Mirror Systems", en: "PARIETAL CORTEX & IPS (Visual Guided Limbs, S1, R1, Word Processing, Place Processing, Place Mapping, PCC, Ideas)", zh: "顶叶皮层与顶内沟 IPS（视觉引导肢体、S1/R1、语词处理、地点处理、地点罗盘映射、后扣带皮层 PCC、想法 Ideas）" },
    { group: "Visual Processing System (4-6B Neurons)", en: "OCCIPITAL LOBE / V1 Sight Area / Optic Radiations 570K", zh: "枕叶 / V1 初级视觉区 / 57万根视辐射纤维" },
    { group: "Visual Processing System (4-6B Neurons)", en: "V2a, V6 & V7 (Hand-Eye Coordination), V3-5/MT (Motion)", zh: "背侧流 V2a、V6 & V7（手眼协调：棒球/工具/驾驶）、V3-5/MT（视觉运动检测）" },
    { group: "Visual Processing System (4-6B Neurons)", en: "V2b, V3b (Object Processing & Memory to OFC), V4h (Colors)", zh: "腹侧流 V2b、V3b（物体识别，习得图像铭刻记忆并送往 OFC）、V4h（色彩处理）" },
    { group: "Visual Processing System (4-6B Neurons)", en: "Nudity Processing (N170), Facial Expression Processing, Face Processing (front/profile), Body Parts", zh: "裸体处理（早期增强 N170 脑电响应）、面部表情处理、面孔处理（正脸/侧脸）、身体部位识别" },
    { group: "8 Sensory Inputs", en: "1. Sight: 125M-126M Rods, 6M Cones, 200K Fovea Cones (1.5mm Notch), .12mm thick, 2,500mm² area, 1M Optic Nerve, Oculomotor Nerve", zh: "1. 视觉：1.25–1.26亿视杆、600万视锥、中央凹20万视锥(直径1.5mm)、厚0.12mm、面积2500mm²、100万视神经轴突、动眼神经" },
    { group: "8 Sensory Inputs", en: "2. Smell: 12M (Human), 1B (Dog), 5B (Hound) Olfactory Receptor Cells", zh: "2. 嗅觉：人类 1,200万、狗 10亿(83倍)、寻血猎犬 50亿(417倍) 嗅觉感受器细胞" },
    { group: "8 Sensory Inputs", en: "3. Taste: 5-10 Receptors per Taste Bud, 9,000 Taste Buds, Facial Nerve", zh: "3. 味觉：原图标注每个味蕾 5–10 个感受器、9,000 个味蕾、经面神经传入" },
    { group: "8 Sensory Inputs", en: "4. Touch: 200 pain, 15 pressure, 6 cold, 1 warmth receptor per cm² of skin", zh: "4. 触觉：每平方厘米皮肤含 200 痛觉、15 压觉、6 冷觉、1 温觉感受器" },
    { group: "8 Sensory Inputs", en: "5. Hearing: Cochlea (15,500 Hair Cells, 30,000 Auditory Nerve connections, 100M Auditory Cortex neurons)", zh: "5. 听觉：耳蜗（15,500 毛细胞、30,000 听神经连接、1亿听觉皮层神经元）" },
    { group: "8 Sensory Inputs", en: "6. Balance & Acceleration: Vestibule 3-axis Military Accelerometer-Gyro Triad (Space Shuttle sensor)", zh: "6. 平衡与加速度：前庭三轴陀螺仪/加速度计三联传感器（与航天飞机及导弹制导主传感器原理同构）" },
    { group: "8 Sensory Inputs", en: "7. Joint Position: Proprioception, Limb Position, Strength Limits", zh: "7. 关节位置（本体感觉）：肢体位置感知、肌肉力量极限保护" },
    { group: "8 Sensory Inputs", en: "8. Facial Expressions: Automatically Produced and Read (happiness, sadness, surprise, fear, anger, disgust)", zh: "8. 面部表情：自动生成与解读六大核心表情（快乐、悲伤、惊讶、恐惧、愤怒、厌恶）" },
    { group: "Cerebellum, Vagus, Spinal Cord & DNA", en: "CEREBELLUM: 69 Billion Neurons, 1 Meter long if unfolded (500 cm²), Learned Habits/Skills, Dentate Nuclei, Climbing fibers", zh: "小脑：690亿神经元、展开长1米(500 cm²)、习得习惯与技能、齿状核、攀援纤维" },
    { group: "Cerebellum, Vagus, Spinal Cord & DNA", en: "Cerebellar Programs: Brake, Aim, Shoot, fine finger motor (play piano), Quarrel, Say Hi, Sing, Move, Stop", zh: "小脑精细程序库：刹车、瞄准、射击、弹钢琴精细手指控制、争吵、打招呼、唱歌、移动、停止" },
    { group: "Cerebellum, Vagus, Spinal Cord & DNA", en: "Vagus Nerve: 200 Million Input Programs, Digestion, Heart rate, Blood pressure, Breathing, Adrenaline, pain off", zh: "迷走神经：2亿内脏输入程序、消化、心率与血压降低、呼吸、肾上腺素、痛觉关闭(pain off)" },
    { group: "Cerebellum, Vagus, Spinal Cord & DNA", en: "Spinal Cord: 1 Billion Neurons, Myelin insulated Axons, Butterfly grey matter Lamina, Pain Reflex (97% Interneurons), 1m+ Motor Axon", zh: "脊髓：10亿神经元、髓鞘绝缘轴突、蝴蝶形灰质层板、痛觉反射回路(97%为中间神经元)、超1米长运动神经元轴突" },
    { group: "Cerebellum, Vagus, Spinal Cord & DNA", en: "Wiring stored in DNA code: 455 Billion Gigabytes per gram theoretical maximum (Harvard University)", zh: "DNA编码布线存储：理论极限每克合成 DNA 可存储 4,550亿 GB 数据（哈佛大学 Science 2012 研究）" }
  ]
};
