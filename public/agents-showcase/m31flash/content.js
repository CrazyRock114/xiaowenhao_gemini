/* =====================================================================
   Your High-Tech Brain — 双语内容数据
   英文原文逐条转录自海报；中文为对照译文。
   English text transcribed verbatim from the poster; Chinese is a translation.
   ===================================================================== */

var POSTER = {

  /* ---------------- HERO ---------------- */
  hero: {
    title_en: "Your High-Tech Brain",
    title_zh: "你的高科技大脑",
    sub_en: "Follow the 8 Sensory Inputs",
    sub_zh: "跟随 8 种感官输入",
    lede_en: "A wall-sized schematic of the human brain: 86 billion neurons, 65 trillion connections, and the eight sensory channels that feed them.",
    lede_zh: "一整面墙大小的人脑示意图：860 亿个神经元、65 万亿条连接，以及为它们供能的 8 条感官通道。",
    legend_en: "Red Circuits are inhibitory, all other colors are excitatory",
    legend_zh: "红色线路为抑制性回路，其余所有颜色均为兴奋性回路"
  },

  /* ---------------- 全局统计（左侧栏） ---------------- */
  stats: {
    heading_en: "By the numbers", heading_zh: "关键数字",
    items: [
      { n: "86+ Billion", cn: "860 亿＋", d_en: "Neurons", d_zh: "神经元" },
      { n: "15+ Billion", cn: "150 亿＋", d_en: "Neurons in the Cerebral Cortex", d_zh: "大脑皮层中的神经元" },
      { n: "65+ Trillion", cn: "65 万亿＋", d_en: "Connections in the Cerebral Cortex", d_zh: "大脑皮层中的连接数" },
      { n: "1,000–10,000", cn: "1,000–10,000", d_en: "Average connections (synapses) per neuron", d_zh: "每个神经元平均的连接（突触）数" }
    ],
    notes: [
      {
        en: "Transistor equivalent of 45,000 (7 Dual Core Processors since synapses work like transistor switches",
        zh: "相当于 45,000（7 个双核处理器）的晶体管总数——因为突触的工作方式就像晶体管开关"
      },
      {
        en: "The Cortex is a 6 layer folded circuit board filled with electronics",
        zh: "皮层是一块充满电子元件的 6 层折叠电路板"
      },
      {
        en: "1 mm³ of cortex contains 50,000+ Neurons making over 100 Million Synapses (switches)",
        zh: "1 立方毫米的皮层含有 50,000＋个神经元，可形成超过 1 亿个突触（开关）"
      },
      {
        en: "Apple A8 processor (iPhone 6) has about 23 Million transistors (switches) per mm³",
        zh: "苹果 A8 处理器（iPhone 6）每立方毫米约有 2,300 万个晶体管（开关）"
      },
      {
        en: "The Total Surface area of the Cerebral Cortex = 2,500 cm²",
        zh: "大脑皮层总表面积 = 2,500 平方厘米"
      },
      {
        en: "est. processing power of over five A8 processors in this little box (1 mm²)",
        zh: "这个小方块（1 平方毫米）估算相当于 5 个以上的 A8 处理器"
      }
    ]
  },

  /* ---------------- 神经元 ---------------- */
  neuron: {
    heading_en: "The Neuron", heading_zh: "神经元",
    sub_en: "Chemistry, wiring, and the fire rule", sub_zh: "化学物质、线路与放电规则",
    parts: [
      { en: "Dendrites", zh: "树突" },
      { en: "The Neuron", zh: "神经元" },
      { en: "Ion Flow", zh: "离子流" },
      { en: "Axons", zh: "轴突" },
      { en: "Axons in", zh: "传入轴突" },
      { en: "Axons out", zh: "传出轴突" },
      { en: "Look Inside", zh: "向内看" },
      { en: "Dendrites → Interneurons", zh: "树突 → 中间神经元" },
      { en: "6 Layer Cortex thickness 1.5 – 4.5 mm, contains all the neurons and all bodies",
        zh: "6 层皮层厚度 1.5–4.5 毫米，包含所有神经元与所有胞体" }
    ],
    chem: [
      { en: "GABA", zh: "γ-氨基丁酸", role_en: "inhibitory — the brake", role_zh: "抑制性——刹车" },
      { en: "Dopamine", zh: "多巴胺", role_en: "reward / motivation", role_zh: "奖励／动机" },
      { en: "Glutamate", zh: "谷氨酸", role_en: "excitatory — the accelerator", role_zh: "兴奋性——油门" },
      { en: "Serotonin", zh: "血清素", role_en: "mood / stability", role_zh: "情绪／稳定" },
      { en: "Na⁺", zh: "钠离子", role_en: "flows in", role_zh: "内流" },
      { en: "K⁺", zh: "钾离子", role_en: "flows out", role_zh: "外流" },
      { en: "Ca²⁺", zh: "钙离子", role_en: "enters on the dendrite", role_zh: "在树突处进入" },
      { en: "−70 mV", zh: "静息膜电位", role_en: "resting membrane potential", role_zh: "−70 mV" }
    ],
    formula: {
      lead_en: "Essentially action potential:", lead_zh: "本质上就是动作电位：",
      expr: "IF ( D⁺ + G⁺ − GABA⁻ ) > +20 mV  →  FIRE",
      note_en: "+ Others", note_zh: "＋ 其他",
      caveat_en: "This rule is the poster's own shorthand, not a standard model. The real action potential is driven by the summed opening and closing of voltage-gated sodium and potassium channels — dopamine and glutamate are modulatory transmitters, not the terms summed in the threshold.",
      caveat_zh: "这条规则是海报作者自己的简化写法，并非公认模型。真实的动作电位由电压门控钠通道与钾通道的开放／关闭总和决定；多巴胺与谷氨酸属于调制性神经递质，并不直接参与阈值的求和。"
    },
    related: [
      { en: "Mirror Motor Learning", zh: "镜像运动学习" },
      { en: "Sensory Area", zh: "感觉区" },
      { en: "Pain – Touch – Proprioception", zh: "疼痛 – 触觉 – 本体感觉" },
      { en: "Sensory Feedback", zh: "感觉反馈" },
      { en: "Grasp", zh: "抓握" },
      { en: "Motor Planning", zh: "运动规划" },
      { en: "FEF / Eye Control", zh: "FEF／眼动控制（前额叶眼动区）" },
      { en: "Smooth Pursuit", zh: "平滑追踪" },
      { en: "Attention", zh: "注意" },
      { en: "Grip Storage", zh: "抓握储存" },
      { en: "Motor Control", zh: "运动控制" },
      { en: "IPS", zh: "IPS（顶内沟）" },
      { en: "CINGULATE CORTEX", zh: "扣带回皮层" },
      { en: "Mirror Feelings", zh: "镜像感受" },
      { en: "Perceived Sensations", zh: "感知到的感觉" },
      { en: "PCC", zh: "PCC（后扣带回）" },
      { en: "Pornography Empathy", zh: "色情内容的共情" },
      { en: "Ideas", zh: "想法" },
      { en: "Executive Control of Behavior", zh: "行为的执行控制" },
      { en: "Arousal", zh: "唤起" },
      { en: "INSULAR / Sexual & Taste", zh: "岛叶／性与味觉" },
      { en: "Tactile", zh: "触觉" },
      { en: "Verbal", zh: "言语" },
      { en: "Visual", zh: "视觉" },
      { en: "Morals", zh: "道德" },
      { en: "Laws", zh: "法律" },
      { en: "Dorsolateral PFC", zh: "背外侧前额叶皮层" },
      { en: "Bad vs Good Processing (your beliefs)", zh: "坏 / 好加工（你的信念）" },
      { en: "Execute Cerebellar Programs", zh: "执行小脑程序" },
      { en: "Shoot", zh: "射击" },
      { en: "Non Sensory Processing", zh: "非感觉性加工" },
      { en: "Parietal Cortex", zh: "顶叶皮层" },
      { en: "Mirrors", zh: "镜像" },
      { en: "Mirror neurons", zh: "镜像神经元" },
      { en: "Visuomotor neurons", zh: "视觉运动神经元" },
      { en: "Portion of the visual field", zh: "视野的一部分" }
    ],
    mirror_quote: {
      text_en: "Mirror neurons are a particular class of visuomotor neurons, that discharge both when performing a particular action and when observing another individual doing a similar action.",
      text_zh: "镜像神经元是一类特殊的视觉运动神经元：它们在自己执行某个动作时放电，在观察另一个个体做出相似动作时同样放电。",
      src_en: "The Mirror-Neuron System", src_zh: "《镜像神经元系统》"
    }
  },

  /* ---------------- 8 种感官 ---------------- */
  senses_heading: { en: "Follow the 8 Sensory Inputs", zh: "跟随 8 种感官输入" },

  senses: [
    {
      no: 1, key: "sight",
      name_en: "Sight", name_zh: "视觉",
      tag_en: "60% of it lands here", tag_zh: "约 60% 的皮层都服务于此",
      facts: [
        { k_en: "Visual Processing in the Retina", k_zh: "视网膜中的视觉处理" },
        { k_en: "125 Million Rods & 6 Million Color Cone Photoreceptors → 1 Million axons in the Optic Nerve",
          k_zh: "1.25 亿个视杆细胞与 600 万个彩色视锥细胞 → 视神经中的 100 万条轴突" },
        { k_en: "Motion Detection Foveal Reflex", k_zh: "运动检测·中心凹反射" },
        { k_en: "Smooth Pursuit Foveal Reflex", k_zh: "平滑追踪·中心凹反射" },
        { k_en: "Peripheral Low Resolution View", k_zh: "周边低分辨率视野" },
        { k_en: "Peripheral Motion Sensing Circuitry provides visual reflexes", k_zh: "周边运动感知线路提供视觉反射" },
        { k_en: "Fovea High Resolution View", k_zh: "中心凹高分辨率视野" },
        { k_en: "200,000 Cones in Fovea", k_zh: "中心凹内有 200,000 个视锥细胞" },
        { k_en: "Fovea Notch Diameter is 1.5 mm", k_zh: "中心凹凹口的直径为 1.5 毫米" },
        { k_en: "Retina Thickness is .12 mm, area is 2,500 mm²", k_zh: "视网膜厚 0.12 毫米，面积 2,500 平方毫米" },
        { k_en: "126 Million Rods", k_zh: "1.26 亿个视杆细胞" },
        { k_en: "Fovea / Notch", k_zh: "中心凹／凹口" },
        { k_en: "Retina", k_zh: "视网膜" },
        { k_en: "Optic Nerve — 1 Million Connections", k_zh: "视神经——100 万个连接" },
        { k_en: "Oculomotor Nerve controls eye muscles", k_zh: "动眼神经支配眼肌" },
        { k_en: "to Right Eye", k_zh: "至右眼" },
        { k_en: "Facial Nerve", k_zh: "面神经" }
      ],
      quote: {
        text_en: "The retina does not simply send a picture to the brain. The retina spatially encodes (compresses) the image to fit the limited capacity of the optic nerve.",
        text_zh: "视网膜并不是简单地把一幅画面送进大脑。它会对图像进行空间编码（压缩），以适应视神经有限的传输容量。",
        src_en: "Wikipedia", src_zh: "维基百科"
      },
      note_en: "compresses video, detects movement, accident avoidance system scans for objects on a collision path and automatically sends reflex control to limbs, estimated processing power of over four Apple A8 processors per eye",
      note_zh: "压缩视频信号、检测运动；这套“事故规避系统”会扫描处于碰撞路径上的物体，并自动向肢体发出反射控制指令。每只眼睛的估算处理能力超过 4 个苹果 A8 处理器。"
    },

    {
      no: 2, key: "smell",
      name_en: "Smell", name_zh: "嗅觉",
      tag_en: "The most direct line to memory", tag_zh: "通往记忆最直接的一条线路",
      facts: [
        { k_en: "12 Million Olfactory Receptor Cells (Human)", k_zh: "1,200 万个嗅觉受体细胞（人）" },
        { k_en: "1 Billion Olfactory Receptor Cells (Dog)", k_zh: "10 亿个嗅觉受体细胞（狗）" },
        { k_en: "5 Billion Olfactory Receptor Cells (Hound)", k_zh: "50 亿个嗅觉受体细胞（猎犬）" },
        { k_en: "How Idolatry controls us", k_zh: "偶像崇拜如何控制着我们" },
        { k_en: "Odors", k_zh: "气味" },
        { k_en: "CLASSICAL", k_zh: "古典音乐" }
      ],
      note_en: "",
      note_zh: ""
    },

    {
      no: 3, key: "taste",
      name_en: "Taste", name_zh: "味觉",
      tag_en: "Nine thousand buds", tag_zh: "九千个味蕾",
      facts: [
        { k_en: "5–10 Receptors per Taste Bud", k_zh: "每个味蕾上有 5–10 个受体" },
        { k_en: "9,000 Taste Buds", k_zh: "9,000 个味蕾" }
      ],
      caveat_en: "Reproduced as printed. Standard references give a different range — about 50–100 receptor cells per taste bud and roughly 2,000–5,000 taste buds (e.g. Wikipedia, “Taste”).",
      caveat_zh: "此处按原图照录。通行资料给出的区间不同——每个味蕾约 50–100 个受体细胞、味蕾总数约 2,000–5,000 个（例如维基百科“味觉”条目）。",
      note_en: "",
      note_zh: ""
    },

    {
      no: 4, key: "touch",
      name_en: "Touch", name_zh: "触觉",
      tag_en: "Pain is dense; warmth is rare", tag_zh: "痛觉密集，温度觉稀疏",
      facts: [
        { k_en: "Pain", k_zh: "疼痛" },
        { k_en: "Strength Limits", k_zh: "力量极限" },
        { k_en: "Tactile", k_zh: "触觉" }
      ],
      quote: {
        text_en: "Every square centimetre of your skin contains around 200 pain receptors but only 15 receptors for pressure, 6 for cold and 1 for warmth.",
        text_zh: "你皮肤上的每一平方厘米大约含有 200 个痛觉受体，却只有 15 个压力受体、6 个冷觉受体和 1 个温觉受体。",
        src_en: "BBC Science & Nature", src_zh: "BBC《科学·自然》"
      }
    },

    {
      no: 5, key: "hearing",
      name_en: "Hearing", name_zh: "听觉",
      tag_en: "15,500 hair cells", tag_zh: "15,500 个毛细胞",
      facts: [
        { k_en: "Cochlea", k_zh: "耳蜗" },
        { k_en: "30,000 Connections in Auditory Nerve", k_zh: "听神经中的 30,000 个连接" },
        { k_en: "15,500 Hair Cells in Cochlea", k_zh: "耳蜗中的 15,500 个毛细胞" },
        { k_en: "100,000,000 Neurons in Auditory Cortex", k_zh: "听觉皮层中的 1 亿个神经元" },
        { k_en: "Sound Inputs", k_zh: "声音输入" },
        { k_en: "Sound Relay", k_zh: "声音中继" },
        { k_en: "Vision Relay", k_zh: "视觉中继" },
        { k_en: "Visual-Audio Reflexes", k_zh: "视听反射" },
        { k_en: "sound", k_zh: "声音" },
        { k_en: "Ear Control", k_zh: "耳部控制" }
      ],
      quote: {
        text_en: "The longest axon of a human motor neuron can be over a meter long.",
        text_zh: "人类运动神经元中最长的轴突可以超过一米长。",
        src_en: "Wikipedia", src_zh: "维基百科"
      }
    },

    {
      no: 6, key: "balance",
      name_en: "Balance & Acceleration", name_zh: "平衡与加速度",
      tag_en: "A three-axis sensor in your ear", tag_zh: "耳朵里的三轴传感器",
      facts: [
        { k_en: "Image Stabilization", k_zh: "图像稳定" },
        { k_en: "Navigation", k_zh: "导航" },
        { k_en: "Eye Reflex", k_zh: "眼反射" },
        { k_en: "Gyro & Accelerometer inputs", k_zh: "陀螺仪与加速度计输入" },
        { k_en: "Balance to Legs", k_zh: "平衡信号通往双腿" },
        { k_en: "Oculo Reflex", k_zh: "眼球反射" },
        { k_en: "Pupil Reflex", k_zh: "瞳孔反射" },
        { k_en: "Vestibule", k_zh: "前庭" },
        { k_en: "Vestibule is similar to the main sensor used in Military Guidance and the Space Shuttle",
          k_zh: "前庭与军用制导和航天飞机所用的主传感器高度相似" }
      ],
      quote: {
        text_en: "Researchers have discovered a sophisticated neural computer, buried deep in the cerebellum, that performs inertial navigation calculations to figure out a person's movement through space.",
        text_zh: "研究者在小脑深处发现了一台精密的神经计算机，它执行惯性导航计算，用以推算一个人在空间中的移动方式。",
        src_en: "Brain's Inertial Navigation System Pinpointed", src_zh: "《大脑的惯性导航系统被定位》"
      }
    },

    {
      no: 7, key: "joint",
      name_en: "Joint Position", name_zh: "关节位置",
      tag_en: "Where your limbs are, always", tag_zh: "你的四肢此刻在哪里",
      facts: [
        { k_en: "Proprioception", k_zh: "本体感觉" },
        { k_en: "Limb Position", k_zh: "肢体位置" },
        { k_en: "Pain-Touch-Proprioception", k_zh: "疼痛 – 触觉 – 本体感觉" },
        { k_en: "Strength Limits", k_zh: "力量极限" }
      ],
      note_en: "",
      note_zh: ""
    },

    {
      no: 8, key: "face",
      name_en: "Facial Expressions", name_zh: "面部表情",
      tag_en: "Produced and read automatically", tag_zh: "自动产生，也自动读懂",
      facts: [
        { k_en: "Automatically Produced and Read", k_zh: "自动产生与自动识别" },
        { k_en: "The six main expressions are happiness, sadness, surprise, fear, anger and disgust",
          k_zh: "六种主要表情是：快乐、悲伤、惊讶、恐惧、愤怒和厌恶" }
      ],
      quote: {
        text_en: "The human face is an engineering marvel. Underneath our skin, a large number of muscles allow us to produce many configurations.",
        text_zh: "人类面孔是一项工程学奇迹：在皮肤之下，大量肌肉让我们能组合出无数种形态。",
        src_en: "A Model of the Perception of Facial Expressions of Emotion by Humans",
        src_zh: "《人类情绪面部表情知觉的一个模型》"
      }
    }
  ],

  /* ---------------- 视觉处理系统 ---------------- */
  vision: {
    heading_en: "The Visual Processing System", heading_zh: "视觉处理系统",
    sub_en: "From V1 to V8 — the hierarchy of sight", sub_zh: "从 V1 到 V8——视觉的层级结构",
    size_en: "4–6 Billion Neurons", size_zh: "40–60 亿个神经元",
    streams: [
      { en: "V1", zh: "V1（初级视觉皮层）", note_en: "layers 1 2 3", note_zh: "第 1、2、3 层" },
      { en: "V2a", zh: "V2a" },
      { en: "V2b", zh: "V2b" },
      { en: "V3", zh: "V3" },
      { en: "V3b", zh: "V3b" },
      { en: "V4h", zh: "V4h" },
      { en: "V3–5/MT", zh: "V3–5/MT（运动区）" },
      { en: "V6 & V7", zh: "V6 与 V7" }
    ],
    regions: [
      { en: "OCCIPITAL LOBE", zh: "枕叶" },
      { en: "Sight Area", zh: "视觉区" },
      { en: "Optic Radiations 570K", zh: "视辐射——57 万条" },
      { en: "Hand-Eye Coordination", zh: "手眼协调" },
      { en: "Word Processing", zh: "文字加工" },
      { en: "Motion", zh: "运动" },
      { en: "Colors", zh: "颜色" },
      { en: "Navigation / Gyro & Accelerometer", zh: "导航／陀螺仪与加速度计" },
      { en: "Face Processing", zh: "面孔加工" },
      { en: "Body Parts", zh: "身体各部位" },
      { en: "Object Processing", zh: "物体加工" },
      { en: "Facial Expression Processing", zh: "面部表情加工" },
      { en: "Nudity Processing", zh: "裸体加工" },
      { en: "Place Processing", zh: "地点加工" },
      { en: "Place Mapping", zh: "地点地图" },
      { en: "Visual Guided Limbs", zh: "视觉引导四肢" },
      { en: "Nudity Processing", zh: "裸体加工" },
      { en: "front profile", zh: "正侧面" },
      { en: "Layered spread across multiple Cues", zh: "分层分布于多个线索" }
    ],
    quote: {
      text_en: "The recognition process likely entails a sequence of computations across visual cortex, starting from local computations in early visual cortex related to low-level properties of the visual stimulus, such as disparity, motion, or orientation, conveying little sense of the global object shape, then proceeding to more global computations in higher levels of the hierarchy of visual processing.",
      text_zh: "识别过程很可能是横跨视觉皮层的一系列计算：先从早期视觉皮层中与视觉刺激的初级属性（如视差、运动或朝向）有关的局部计算开始，这些计算只能传递极少的信息量，再在视觉加工层级中更高的层次进入更整体的计算。",
      src_en: "— Representation of Shapes, Edges, and Surfaces Across Multiple Cues in the Human Visual Cortex",
      src_zh: "——《人类视觉皮层中跨多种线索的形状、边缘与表面表征》"
    },
    ips_quote: {
      text_en: "There is overwhelming evidence that areas in the IPS are involved in complex hand use, reaching, grasping, matching visual and body centered frames of references for reaching and grasping, and programming intentional hand movements.",
      text_zh: "大量证据表明，IPS（顶内沟）区域参与了复杂的手部使用、伸手、抓取，为伸手与抓取匹配以视觉为中心和以身体为中心的参照框架，并规划有意的伸手动作。",
      src_en: "Topographic Maps within Brodmann's Area 5 of Macaque Monkeys",
      src_zh: "《猕猴布罗德曼 5 区内的拓扑图》"
    },
    face_body_quote: {
      text_en: "Evidence from functional neuroimaging indicates that visual perception of human faces and bodies is carried out by distributed networks of face and body-sensitive areas in the occipito-temporal cortex.",
      text_zh: "功能神经影像的证据表明，人类面孔与身体的视觉知觉，是由枕颞皮层中分布式的面孔敏感区与身体敏感区网络完成的。",
      src_en: "Different Cortical Dynamics in Face and Body Perception",
      src_zh: "《面孔与身体知觉中不同的皮层动力学》"
    },
    n170_quote: {
      text_en: "Our results thus confirm that nudity of human bodies is detected early on during visual processing, and that the human brain exhibits enhanced visual processing to other people's nude bodies. Interestingly, the N170 response to nude bodies was even greater than that to faces.",
      text_zh: "我们的结果由此证实，人体裸体在视觉加工的早期阶段即被检测到，而且人脑对他人裸体的视觉加工显著增强。有意思的是，裸体引发的 N170 反应甚至强于面孔。",
      src_en: "The Naked Truth: The Face and Body Sensitive N170 Response Is Enhanced for Nude Bodies",
      src_zh: "《裸体的真相：裸体显著增强面孔与身体敏感的 N170 反应》"
    },
    wiki_quote: {
      text_en: "It is now becoming increasingly apparent that even single neurons can perform complex computations.",
      text_zh: "人们越来越清楚地意识到：即便是单个神经元，也能完成复杂的计算。",
      src_en: "Wikipedia", src_zh: "维基百科"
    }
  },

  /* ---------------- 情绪 · 奖赏 · 驱动 ---------------- */
  drives: {
    heading_en: "Emotions, Rewards & Drives", heading_zh: "情绪、奖赏与驱动",
    sub_en: "The circuitry the poster wires to reward, fear and survival",
    sub_zh: "海报中与奖赏、恐惧和生存相关的线路",
    groups: [
      {
        title_en: "Reward & Pleasure", title_zh: "奖赏与愉悦",
        items: [
          { en: "Rewards", zh: "奖赏" }, { en: "Wants", zh: "想要" }, { en: "Reward", zh: "奖赏" },
          { en: "Pleasure", zh: "愉悦" }, { en: "Needs", zh: "需求" }, { en: "Stop Habits", zh: "停止习惯" },
          { en: "Good", zh: "好" }, { en: "Bad", zh: "坏" }, { en: "ACC", zh: "ACC（扣带前扣带回）" },
          { en: "Dopamine", zh: "多巴胺" }, { en: "Dopamine off", zh: "多巴胺关闭" },
          { en: "Opioids", zh: "阿片类" }, { en: "Drugs", zh: "药物" }, { en: "Gambling", zh: "赌博" },
          { en: "Food", zh: "食物" }, { en: "Education", zh: "教育" }, { en: "Video Games", zh: "电子游戏" },
          { en: "Beauty Area", zh: "美感区" }, { en: "Boosting", zh: "增强" }, { en: "Grooming", zh: "梳理毛发／打扮" },
          { en: "Discipline", zh: "自律" }, { en: "Outliers", zh: "离群值" }, { en: "Bad vs Good Processing (your beliefs)", zh: "坏／好加工（你的信念）" },
          { en: "Morals", zh: "道德" }, { en: "Laws", zh: "法律" }, { en: "Values", zh: "价值观" },
          { en: "Repetition", zh: "重复" }
        ]
      },
      {
        title_en: "Drive & Survival", title_zh: "驱动与生存",
        items: [
          { en: "Hunger", zh: "饥饿" }, { en: "Mating", zh: "求偶" }, { en: "Obesity", zh: "肥胖" },
          { en: "Odor", zh: "气味" }, { en: "Taste", zh: "味觉" }, { en: "Sex / Sexual", zh: "性" },
          { en: "to Organs", zh: "通往内脏器官" }, { en: "Hormones", zh: "激素" },
          { en: "Androgens", zh: "雄激素" }, { en: "Testosterone", zh: "睾酮" },
          { en: "Oxytocin", zh: "催产素" }, { en: "Pheromones", zh: "信息素" },
          { en: "Adrenaline", zh: "肾上腺素" },
          { en: "Stress", zh: "压力" }, { en: "Pain Control", zh: "疼痛调控" },
          { en: "Clock", zh: "时钟" }, { en: "Sleep", zh: "睡眠" }, { en: "Who", zh: "是谁／自我" },
          { en: "Emotion", zh: "情绪" }, { en: "Fear", zh: "恐惧" }, { en: "Punishment", zh: "惩罚" },
          { en: "Terrorized", zh: "惊吓" }, { en: "Words", zh: "言语" }, { en: "Sounds", zh: "声音" },
          { en: "Idol Worship", zh: "偶像崇拜" }, { en: "Religious", zh: "宗教" }, { en: "rap", zh: "说唱" }
        ]
      }
    ]
  },

  /* ---------------- 运动 · 小脑 · 脊髓 ---------------- */
  motor: {
    heading_en: "Movement, Learning & Reflex", heading_zh: "运动、学习与反射",
    sub_en: "Cerebellum, spinal cord and the gearwork of habit",
    sub_zh: "小脑、脊髓与习惯的齿轮装置",
    cerebellum: {
      name_en: "CEREBELLUM", name_zh: "小脑",
      role_en: "Learned Habits / Skills", role_zh: "习得的习惯／技能",
      n_en: "69 Billion Neurons", n_zh: "690 亿个神经元",
      size_en: "1 Meter long if unfolded (500 cm²)", size_zh: "展开后长 1 米（500 平方厘米）",
      bits: [
        { en: "Dentate Nuclei", zh: "齿状核" },
        { en: "Brake", zh: "刹车" },
        { en: "Aim", zh: "瞄准" },
        { en: "Shoot", zh: "射击" },
        { en: "Quarrel", zh: "争吵" },
        { en: "Say Hi", zh: "打招呼" },
        { en: "Sing", zh: "唱歌" },
        { en: "Timing / Timing cycles", zh: "计时／计时周期" },
        { en: "Move", zh: "移动" }
      ]
    },
    spinal: {
      name_en: "Spinal Cord", name_zh: "脊髓",
      n_en: "1 Billion Neurons", n_zh: "10 亿个神经元",
      bits: [
        { en: "to Sensory Cortex", zh: "至感觉皮层" },
        { en: "Spinal cord from Motor Cortex to Muscles", zh: "从运动皮层到肌肉的脊髓通路" },
        { en: "Arm Layer", zh: "臂层" },
        { en: "Inter Neurons", zh: "中间神经元" },
        { en: "Butterfly (grey matter) Spinal Cord Lamina (Reflex Circuitry)", zh: "蝴蝶状（灰质）脊髓板层（反射线路）" },
        { en: "Myelin insulated Axons (wiring) run up/down from the cortex around the lamina", zh: "髓鞘包裹的轴突（导线）自皮层沿板层上下往返" },
        { en: "Pain Reflex Circuitry", zh: "疼痛反射线路" },
        { en: "200 Million Input Programs", zh: "2 亿个输入程序" }
      ]
    },
    quote: {
      text_en: "A complex interneuronal circuitry must exist to coordinate the control of limb extensor and flexor activity across multiple joints bilaterally. Indeed, interneurons make up as much as 97% of all cells in the cord.",
      text_zh: "必须存在一套复杂的中间神经元线路，才能在双侧多个关节上协调肢体伸肌与屈肌的活动。事实上，中间神经元可占脊髓全部细胞的 97%。",
      src_en: "Spinal cord", src_zh: "《脊髓》"
    }
  },

  /* ---------------- 自主神经 ---------------- */
  autonomic: {
    heading_en: "Autonomic & Visceral Control", heading_zh: "自主神经与内脏调控",
    sub_en: "The vagus nerve — the brain's built-in damper",
    sub_zh: "迷走神经——大脑内置的减震器",
    items: [
      { en: "Vagus Nerve", zh: "迷走神经" },
      { en: "Digestion", zh: "消化" },
      { en: "Breathing", zh: "呼吸" },
      { en: "heart rate, blood pressure", zh: "心率、血压" },
      { en: "Digestion from organs", zh: "来自内脏器官的消化信号" },
      { en: "TEMPORAL LOBE", zh: "颞叶" },
      { en: "Adrenaline", zh: "肾上腺素" },
      { en: "acetylcholine", zh: "乙酰胆碱" },
      { en: "Pain", zh: "疼痛" },
      { en: "to organs", zh: "通往内脏器官" }
    ],
    quote: {
      text_en: "Activation of the vagus nerve typically leads to a reduction in heart rate, blood pressure, or both.",
      text_zh: "激活迷走神经通常会导致心率下降、血压下降，或两者同时下降。",
      src_en: "Wikipedia", src_zh: "维基百科"
    }
  },

  /* ---------------- 皮层分区（左侧栏文字） ---------------- */
  cortex: {
    heading_en: "Prefrontal & Orbital Cortex", heading_zh: "前额叶与眶额皮层",
    prefrontal: {
      name_en: "PREFRONTAL CORTEX", name_zh: "前额叶皮层",
      note_en: "Non Sensory Processing (Matures late Age 25+)",
      note_zh: "非感觉性加工（成熟最晚，25 岁以后）",
      can_inhibit: { en: "Can Inhibit Sensory Rewards", zh: "可抑制感觉性奖赏" }
    },
    orbital: {
      name_en: "ORBITAL FRONTAL CORTEX", name_zh: "眶额皮层",
      note_en: "Learned Auto-Sensory Rewards — Develops early",
      note_zh: "习得的自动感觉性奖赏——发育最早",
      frames: [
        { en: "spirit", zh: "spirit（精神）" },
        { en: "flesh", zh: "flesh（肉体）" },
        { en: "Materialism", zh: "Materialism（唯物论）" },
        { en: "Grooming", zh: "Grooming（梳理毛发／打扮）" },
        { en: "Idol worship", zh: "Idol worship（偶像崇拜）" },
        { en: "How Idolatry controls us", zh: "偶像崇拜如何控制着我们" },
        { en: "Discipline", zh: "Discipline（自律）" },
        { en: "Outliers", zh: "Outliers（离群值）" }
      ]
    },
    quotes: [
      {
        text_en: "It is now clear that even fairly innocuous-looking experiences can profoundly affect brain development and that the range of experiences that can alter brain development is much larger than had once been believed.",
        text_zh: "现在很清楚：即便是看起来相当无害的经历，也能深刻影响大脑发育；而能够改变大脑发育的经历范围，远比人们曾经认为的更大。",
        src_en: "Experience and the developing prefrontal cortex",
        src_zh: "《经历与发育中的前额叶皮层》"
      },
      {
        text_en: "Three frontal circuits have been associated with decision making: 1) the OFC 2) the DLPFC, and 3) the ACC, important in sorting among conflicting options, as well as outcome-processing.",
        text_zh: "有三条额叶回路与决策相关：1）眶额皮层（OFC）；2）背外侧前额叶皮层（DLPFC）；3）前扣带回（ACC）。它们在相互冲突的选项之间进行取舍，也参与结果加工。",
        src_en: "The Functional Neuroanatomy of Decision-Making",
        src_zh: "《决策的功能神经解剖学》"
      },
      {
        text_en: "It can now be recognized that the region (Orbital and Medial Prefrontal Cortex) as a whole receives highly processed sensory afferents, provides for cortical influence over visceral functions, and participates in high-level cognitive and emotional processes.",
        text_zh: "现在人们认识到，该区域（眶额与内侧前额叶皮层）整体上接收高度加工过的感觉传入信息，为皮层调控内脏功能提供通道，并参与高级认知与情绪过程。",
        src_en: "The Organization of Networks within the Orbital and Medial Prefrontal Cortex of Rats, Monkeys and Humans",
        src_zh: "《大鼠、猴与人眶额与内侧前额叶皮层内网络的组织》"
      },
      {
        text_en: "Religious conviction acts like an anxiolytic, reducing emotional reactions to errors or uncertainty, providing people with a meaningful system helping them to understand the complex and uncertain world that we live in. In physiological terms, it reduces ACC activity and consequently distress.",
        text_zh: "宗教信念起到类似抗焦虑药的作用：它降低人对错误与不确定性的情绪反应，给人提供一套意义系统，帮助他们理解这个复杂而不确定的世界。就生理学而言，它降低了扣带前区的活动，因而也降低了痛苦。",
        src_en: "The Anterior Cingulate Cortex",
        src_zh: "《前扣带回》"
      }
    ]
  },

  /* ---------------- DNA 存储 ---------------- */
  dna: {
    heading_en: "Wiring stored in DNA code", heading_zh: "以 DNA 代码存储的接线图",
    quote: {
      text_en: "DNA storage is very dense. At theoretical maximum, DNA can encode 455 Billion Gigabytes per gram.",
      text_zh: "DNA 的存储密度非常高。理论上达到最大值时，DNA 每克可编码 4,550 亿吉字节（GB）。",
      src_en: "Next-Generation Digital Information Storage in DNA, Harvard University",
      src_zh: "《DNA 中的下一代数字信息存储》，哈佛大学"
    }
  },

  /* ---------------- 军事传感器类比 ---------------- */
  triad: {
    heading_en: "Military Accelerometer-Gyro Triad", heading_zh: "军用加速度计—陀螺仪三轴组件",
    body_en: "Vestibule is similar to the main sensor used in Military Guidance and the Space Shuttle.",
    body_zh: "前庭与军用制导系统以及航天飞机所用的主传感器非常相似。",
    axes: ["X", "Y", "Z"]
  },

  /* ---------------- 阅读须知 ---------------- */
  disclaimer: {
    kicker_en: "Before you read", kicker_zh: "先看这里",
    title_en: "How to read this page", title_zh: "如何阅读本页",
    body_en: "Everything below is transcribed from one poster — a popular-science infographic made by an individual author, not a peer-reviewed or textbook source. Nothing here has been verified against primary literature except where a line explicitly says so.",
    body_zh: "以下内容全部转录自同一张海报——这是一张由个人作者制作的科普信息图，并非同行评议文献或教科书。这些论断均未经原始文献核实，个别明确标注者除外。",
    points: [
      {
        h_en: "Figures are reproduced as printed, not silently corrected.",
        h_zh: "数字按原图照录，不做静默修改。",
        p_en: "Where the poster's numbers differ from standard references, this page keeps the poster's number and flags it instead of quietly replacing it. See the taste buds, for example.",
        p_zh: "当海报数字与通行资料不一致时，本页保留海报原值并加以标注，而不是悄悄改掉——味蕾一项即是。"
      },
      {
        h_en: "The firing rule is the poster's shorthand, not a real equation.",
        h_zh: "放电公式是作者的简化写法，并非真实公式。",
        p_en: "IF (D⁺+G⁺−GABA⁻) > +20 mV is an illustration. The action potential is generated by summed voltage-gated sodium and potassium conductance; dopamine and glutamate do not enter that sum.",
        p_zh: "IF (D⁺+G⁺−GABA⁻) > +20 mV 只是一句示意。动作电位由电压门控钠电导与钾电导的总和产生，多巴胺与谷氨酸并不进入这个求和。"
      },
      {
        h_en: "What has actually been checked.",
        h_zh: "哪些内容确实核对过。",
        p_en: "The touch-receptor line was checked against the original BBC Science & Nature “Nervous system – Touch” factfile and matches it word for word. The human olfactory figure is consistent with the 10–20 million range given in standard references. Every English quotation on this page has been read back off the poster itself to check transcription; beyond those two, the remaining quotations have not been re-checked against the original articles they name.",
        p_zh: "触觉受体一句已比对 BBC《科学·自然》原版“Nervous system – Touch”资料页，逐字一致。人类的嗅觉受体数量与通行资料给出的 1,000–2,000 万区间相符。本页所有英文引文都已逐条回对原图核过转录；除上述两条外，其余引文未回到各自标注的原始文章复核。"
      },
      {
        h_en: "Labels in the index are poster labels, not diagnoses.",
        h_zh: "索引中的标签是海报上的文字，不是医学结论。",
        p_en: "Labels such as Opioids, Dopamine and Religious mark where the poster's author placed a topic. They are not clinical claims about you, and nothing here is medical advice.",
        p_zh: "「Opioids」「Dopamine」「Religious」等词，只是标示海报作者把某个话题放在了哪里，不构成对任何人的临床判断，也不构成医学建议。"
      }
    ]
  },

  /* ---------------- 出处 ---------------- */
  provenance: {
    heading_en: "About this diagram", heading_zh: "关于这张图",
    body_en: "Research performed by an Aerospace Engineer (BA Mechanical Engineering, Villanova 84). The supervisor of Computer Aided Design (CAD) for a top military guidance and navigation company who worked on the design of the Space Shuttle guidance system and later became a statistics software developer. Over 1,000 Neuroscience studies were analyzed over a 4 year period and a large schematic assembled.",
    body_zh: "本图的研究由一位航空航天工程师完成（维拉诺瓦大学机械工程学士，'84 届）。他曾担任一家顶级军用制导与导航公司的计算机辅助设计（CAD）主管，参与过航天飞机制导系统的设计，后来成为统计软件开发人员。在 4 年时间里分析了 1,000 多项神经科学研究，并汇编成这张大型示意图。",
    quote_en: "The 3 axis gyro/accelerometer triad sensor we put in the Space Shuttle and all missile guidance systems is behind your ear. We're ultra high tech.",
    quote_zh: "我们装在航天飞机和所有导弹制导系统里的三轴陀螺仪／加速度计传感器，就在你耳朵后面。我们是超高科技。",
    copyright_en: "Copyright 2015 www.thehighestofthemountains.com",
    copyright_zh: "版权所有 © 2015 www.thehighestofthemountains.com"
  },

  /* ---------------- 全图标签总索引（覆盖清单） ---------------- */
  index_heading: { en: "Every label on the poster", zh: "海报上的全部标签" },
  index_intro_en: "A complete index of the words printed on the diagram, grouped by region, so nothing on the original is lost in translation.",
  index_intro_zh: "图中印出的全部文字标签索引，按区域分组，确保原图上的任何一处细节都没有在翻译中丢失。",

  index: [
    { group_en: "Title & legend", group_zh: "标题与图例",
      items: [
        { en: "Your High-Tech Brain", zh: "你的高科技大脑" },
        { en: "Follow the 8 Sensory Inputs", zh: "跟随 8 种感官输入" },
        { en: "Red Circuits are inhibitory, all other colors are excitatory", zh: "红色线路为抑制性，其余颜色为兴奋性" },
        { en: "The Neuron", zh: "神经元" },
        { en: "Dendrites", zh: "树突" },
        { en: "Ion Flow", zh: "离子流" },
        { en: "Axons", zh: "轴突" },
        { en: "Look Inside", zh: "向内看" },
        { en: "Essentially action potential", zh: "本质上就是动作电位" }
      ] },
    { group_en: "Chemistry", group_zh: "神经化学物质",
      items: [
        { en: "GABA", zh: "GABA" }, { en: "Dopamine", zh: "多巴胺" }, { en: "Glutamate", zh: "谷氨酸" },
        { en: "Serotonin", zh: "血清素" }, { en: "Na+", zh: "Na+（钠离子）" }, { en: "K+", zh: "K+（钾离子）" },
        { en: "+Ca++", zh: "+Ca²⁺（钙离子）" }, { en: "−70 mV", zh: "−70 mV" }, { en: "+20 mV", zh: "+20 mV" },
        { en: "Then FIRE", zh: "则放电" }
      ] },
    { group_en: "Cortex regions", group_zh: "皮层分区",
      items: [
        { en: "Sensory Area", zh: "感觉区" }, { en: "Motor Control", zh: "运动控制" }, { en: "Attention", zh: "注意" },
        { en: "PREFRONTAL CORTEX", zh: "前额叶皮层" }, { en: "ORBITAL FRONTAL CORTEX", zh: "眶额皮层" },
        { en: "Dorsolateral PFC", zh: "背外侧前额叶皮层" }, { en: "ACC", zh: "前扣带回" },
        { en: "INSULAR", zh: "岛叶" }, { en: "CINGULATE CORTEX", zh: "扣带回皮层" },
        { en: "PCC", zh: "后扣带回" }, { en: "Parietal Cortex", zh: "顶叶皮层" },
        { en: "TEMPORAL LOBE", zh: "颞叶" }, { en: "OCCIPITAL LOBE", zh: "枕叶" },
        { en: "CEREBELLUM", zh: "小脑" }, { en: "Spinal Cord", zh: "脊髓" },
        { en: "IPS", zh: "顶内沟 IPS" }, { en: "FEF", zh: "额叶眼动区 FEF" },
        { en: "spirit", zh: "spirit（精神）" }, { en: "flesh", zh: "flesh（肉体）" },
        { en: "Materialism", zh: "Materialism（唯物论）" },
        { en: "Can Inhibit Sensory Rewards", zh: "可抑制感觉性奖赏" },
        { en: "Non Sensory Processing", zh: "非感觉性加工" },
        { en: "Learned Auto-Sensory Rewards", zh: "习得的自动感觉性奖赏" },
        { en: "Matures late Age 25+", zh: "25 岁以后才成熟" },
        { en: "Executives: Morals / Laws / Values", zh: "道德／法律／价值观" },
        { en: "acetylcholine", zh: "乙酰胆碱" }
      ] },
    { group_en: "The 8 sensory inputs", group_zh: "8 种感官输入",
      items: [
        { en: "1. Sight", zh: "1. 视觉" }, { en: "2. Smell", zh: "2. 嗅觉" },
        { en: "3. Taste", zh: "3. 味觉" }, { en: "4. Touch", zh: "4. 触觉" },
        { en: "5. Hearing", zh: "5. 听觉" }, { en: "6. Balance & Acceleration", zh: "6. 平衡与加速度" },
        { en: "7. Joint Position", zh: "7. 关节位置" }, { en: "8. Facial Expressions", zh: "8. 面部表情" }
      ] },
    { group_en: "Vision stream", group_zh: "视觉层级",
      items: [
        { en: "V1", zh: "V1" }, { en: "V2a", zh: "V2a" }, { en: "V2b", zh: "V2b" },
        { en: "V3", zh: "V3" }, { en: "V3b", zh: "V3b" }, { en: "V4h", zh: "V4h" },
        { en: "V3-5/MT", zh: "V3-5/MT" }, { en: "V6 & V7", zh: "V6 与 V7" },
        { en: "1 2 3 (cortical layers)", zh: "1 2 3（皮层层级）" }
      ] },
    { group_en: "Numbers on the poster", group_zh: "海报上的数字",
      items: [
        { en: "86+ Billion Neurons", zh: "860 亿＋神经元" },
        { en: "15+ Billion Neurons in the Cerebral Cortex", zh: "皮层内 150 亿＋神经元" },
        { en: "65+ Trillion Connections", zh: "65 万亿＋连接" },
        { en: "1,000-10,000 Connections per Neuron", zh: "每个神经元 1,000–10,000 个连接" },
        { en: "6 layer folded circuit board", zh: "6 层折叠电路板" },
        { en: "50,000-100,000 Connections per mm³", zh: "每立方毫米 50,000–100,000 个连接" },
        { en: "over 100 Million Synapses", zh: "超过 1 亿个突触" },
        { en: "23 Million transistors per mm³", zh: "每立方毫米 2,300 万个晶体管" },
        { en: "Total Surface Area 2,500 cm²", zh: "皮层总面积 2,500 平方厘米" },
        { en: "4-6 Billion Neurons (vision)", zh: "40–60 亿个神经元（视觉）" },
        { en: "125 Million Rods & 6 Million Color Cones", zh: "1.25 亿视杆细胞与 600 万视锥细胞" },
        { en: "1 Million axons in the Optic Nerve", zh: "视神经 100 万条轴突" },
        { en: "200,000 Cones in Fovea", zh: "中心凹 200,000 个视锥细胞" },
        { en: "Fovea Notch Diameter 1.5 mm", zh: "中心凹凹口直径 1.5 毫米" },
        { en: "Retina Thickness .12 mm / area 2,500 mm²", zh: "视网膜厚 0.12 毫米／面积 2,500 平方毫米" },
        { en: "126 Million Rods", zh: "1.26 亿个视杆细胞" },
        { en: "Optic Radiations 570K", zh: "视辐射 57 万" },
        { en: "12 Million Olfactory Receptor Cells (Human)", zh: "1,200 万嗅觉受体细胞（人）" },
        { en: "1 Billion (Dog) / 5 Billion (Hound)", zh: "10 亿（狗）／50 亿（猎犬）" },
        { en: "5-10 Receptors per Taste Bud", zh: "每个味蕾 5–10 个受体" },
        { en: "9,000 Taste Buds", zh: "9,000 个味蕾" },
        { en: "200 pain receptors / 15 pressure / 6 cold / 1 warm", zh: "200 痛觉／15 压力／6 冷觉／1 温觉（每平方厘米）" },
        { en: "30,000 Connections in Auditory Nerve", zh: "听神经 30,000 个连接" },
        { en: "15,500 Hair Cells in Cochlea", zh: "耳蜗 15,500 个毛细胞" },
        { en: "100,000,000 Neurons in Auditory Cortex", zh: "听觉皮层 1 亿个神经元" },
        { en: "69 Billion Neurons (Cerebellum)", zh: "690 亿个神经元（小脑）" },
        { en: "1 Meter long if unfolded (500 cm²)", zh: "展开后长 1 米（500 平方厘米）" },
        { en: "1 Billion Neurons (Spinal Cord)", zh: "10 亿个神经元（脊髓）" },
        { en: "97% of all cells in the cord", zh: "脊髓细胞中 97% 为中间神经元" },
        { en: "200 Million Input Programs", zh: "2 亿个输入程序" },
        { en: "455 Billion Gigabytes per gram", zh: "每克 4,550 亿吉字节" }
      ] },
    { group_en: "Emotion, reward, drive labels", group_zh: "情绪、奖赏与驱动标签",
      items: [
        { en: "Bad", zh: "坏" }, { en: "Good", zh: "好" }, { en: "Pleasure", zh: "愉悦" },
        { en: "Needs", zh: "需求" }, { en: "Wants", zh: "想要" }, { en: "Rewards", zh: "奖赏" },
        { en: "Stop Habits", zh: "停止习惯" }, { en: "Dopamine", zh: "多巴胺" },
        { en: "Dopamine off", zh: "多巴胺关闭" }, { en: "Opioids", zh: "阿片类" },
        { en: "Gambling", zh: "赌博" }, { en: "Food", zh: "食物" }, { en: "Education", zh: "教育" },
        { en: "Video Games", zh: "电子游戏" }, { en: "Beauty Area", zh: "美感区" },
        { en: "Classical", zh: "古典音乐" }, { en: "Boosting", zh: "增强" },
        { en: "Discipline", zh: "自律" }, { en: "Outliers", zh: "离群值" },
        { en: "Grooming", zh: "梳理毛发" }, { en: "Idol Worship", zh: "偶像崇拜" },
        { en: "Religious", zh: "宗教" }, { en: "rap", zh: "说唱" },
        { en: "Odors", zh: "气味" }, { en: "Drugs", zh: "药物" }, { en: "Vision", zh: "视觉" },
        { en: "Obesity", zh: "肥胖" }, { en: "Mating", zh: "求偶" }, { en: "Hunger", zh: "饥饿" },
        { en: "to Organs", zh: "通往内脏" }, { en: "Hormones", zh: "激素" },
        { en: "Androgens", zh: "雄激素" }, { en: "Testosterone", zh: "睾酮" },
        { en: "Oxytocin", zh: "催产素" }, { en: "Pheromones", zh: "信息素" },
        { en: "Adrenaline", zh: "肾上腺素" }, { en: "Repetition", zh: "重复" },
        { en: "Vision Relay", zh: "视觉中继" }, { en: "Sound Relay", zh: "声音中继" },
        { en: "Stress", zh: "压力" }, { en: "Pain Control", zh: "疼痛调控" },
        { en: "Clock", zh: "时钟" }, { en: "Who", zh: "自我" }, { en: "Sleep", zh: "睡眠" },
        { en: "Emotion", zh: "情绪" }, { en: "Fear", zh: "恐惧" },
        { en: "Punishment", zh: "惩罚" }, { en: "Terrorized", zh: "惊吓" },
        { en: "Words", zh: "言语" }, { en: "Sounds", zh: "声音" },
        { en: "Inattention", zh: "注意力涣散" }, { en: "Attention", zh: "注意" }
      ] },
    { group_en: "Movement & body", group_zh: "运动与身体",
      items: [
        { en: "Shoot", zh: "射击" }, { en: "Aim", zh: "瞄准" }, { en: "Brake", zh: "刹车" },
        { en: "Quarrel", zh: "争吵" }, { en: "Say Hi", zh: "打招呼" }, { en: "Sing", zh: "唱歌" },
        { en: "Timing", zh: "计时" }, { en: "Move", zh: "移动" },
        { en: "Dentate Nuclei", zh: "齿状核" }, { en: "Proprioception", zh: "本体感觉" },
        { en: "Limb Position", zh: "肢体位置" }, { en: "Strength Limits", zh: "力量极限" },
        { en: "Grasp", zh: "抓握" }, { en: "Grip Storage", zh: "抓握储存" },
        { en: "Motor Planning", zh: "运动规划" }, { en: "Smooth Pursuit", zh: "平滑追踪" },
        { en: "Eye Control", zh: "眼动控制" }, { en: "Ear Control", zh: "耳部控制" },
        { en: "Visual Guided Limbs", zh: "视觉引导四肢" },
        { en: "Balance to Legs", zh: "平衡信号通往双腿" }
      ] }
  ]
};

if (typeof window !== "undefined") window.POSTER = POSTER;
if (typeof module !== "undefined") module.exports = POSTER;
