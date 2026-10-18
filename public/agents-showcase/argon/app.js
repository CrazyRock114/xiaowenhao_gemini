(function () {
  "use strict";

  const DATA = window.BRAIN_POSTER_DATA;
  if (!DATA) return;

  // --- Utility: High-DPR Canvas Setup ---
  function setupHiDPICanvas(canvas) {
    if (!canvas) return null;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(300, rect.width || 600);
    const height = Math.max(180, rect.height || 240);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width, height };
  }

  // --- 1. Language Switcher ---
  const langButtons = document.querySelectorAll("[data-set-lang]");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-set-lang");
      document.body.setAttribute("data-lang", lang);
      langButtons.forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  // --- 2. Render Hero Benchmarks & Scientific Rigor Notes ---
  const benchmarksContainer = document.getElementById("benchmarks-container");
  if (benchmarksContainer) {
    benchmarksContainer.innerHTML = DATA.benchmarks
      .map(
        (b) => `
      <div class="benchmark-card">
        <div class="benchmark-val">
          <span>${b.value}</span>
          <span class="zh-num lang-zh">(${b.valueZh})</span>
        </div>
        <div class="benchmark-label">
          <div class="lang-zh">${b.label.zh}</div>
          <div class="lang-en">${b.label.en}</div>
        </div>
        <div class="benchmark-detail">
          <div class="lang-zh">${b.detail.zh}</div>
          <div class="lang-en">${b.detail.en}</div>
        </div>
      </div>
    `
      )
      .join("");
  }

  const notesContainer = document.getElementById("scientific-notes-container");
  if (notesContainer && DATA.scientificNotes) {
    notesContainer.innerHTML = DATA.scientificNotes
      .map(
        (n) => `
      <div class="rigor-note-card">
        <h5>
          <span class="lang-zh">${n.title.zh}</span>
          <span class="lang-en">${n.title.en}</span>
        </h5>
        <p class="lang-zh">${n.zh}</p>
        <p class="lang-en">${n.en}</p>
      </div>
    `
      )
      .join("");
  }

  // --- 3. Interactive Schematic Map & Hotspot Pins ---
  const pinsLayer = document.getElementById("hotspot-pins-layer");
  const inspCategory = document.getElementById("insp-category");
  const inspTitle = document.getElementById("insp-title");
  const inspSubtitle = document.getElementById("insp-subtitle");
  const inspZh = document.getElementById("insp-zh");
  const inspEn = document.getElementById("insp-en");
  const inspChips = document.getElementById("insp-chips");

  let activeNodeId = DATA.mapNodes[0].id;

  function selectMapNode(nodeId) {
    const node = DATA.mapNodes.find((n) => n.id === nodeId) || DATA.mapNodes[0];
    activeNodeId = node.id;

    document.querySelectorAll(".hotspot-pin").forEach((pin) => {
      pin.classList.toggle("active", pin.getAttribute("data-node-id") === node.id);
    });

    if (inspCategory) {
      inspCategory.textContent = `${node.category.toUpperCase()} · ${
        node.circuitType === "inhibitory"
          ? "RED INHIBITORY CIRCUIT"
          : node.circuitType === "both"
          ? "EXCITATORY + RED INHIBITORY"
          : "EXCITATORY CIRCUIT"
      }`;
    }
    if (inspTitle) {
      inspTitle.innerHTML = `<span class="lang-zh">${node.title.zh}</span> <span class="lang-en">${node.title.en}</span>`;
    }
    if (inspSubtitle) {
      inspSubtitle.innerHTML = `<span class="lang-zh">${node.subtitle.zh}</span> · <span class="lang-en">${node.subtitle.en}</span>`;
    }
    if (inspZh) inspZh.textContent = node.summary.zh;
    if (inspEn) inspEn.textContent = node.summary.en;
    if (inspChips) {
      inspChips.innerHTML = node.posterLabels
        .map((lbl) => `<span class="label-chip">${lbl}</span>`)
        .join("");
    }
  }

  function renderHotspotPins() {
    if (!pinsLayer) return;
    pinsLayer.innerHTML = DATA.mapNodes
      .map(
        (node, idx) => `
      <button class="hotspot-pin ${node.circuitType} ${node.id === activeNodeId ? "active" : ""}"
              style="left: ${node.x}%; top: ${node.y}%;"
              data-node-id="${node.id}"
              data-category="${node.category}"
              data-circuit="${node.circuitType}">
        <span>#${idx + 1}</span>
        <span class="lang-zh">${node.title.zh.split("：")[0].split(" (")[0]}</span>
        <span class="lang-en">${node.title.en.split(":")[0].split(" (")[0]}</span>
      </button>
    `
      )
      .join("");

    pinsLayer.querySelectorAll(".hotspot-pin").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectMapNode(btn.getAttribute("data-node-id"));
      });
    });
  }

  renderHotspotPins();
  selectMapNode(activeNodeId);

  // Filter buttons for Schematic Map
  const filterPills = document.querySelectorAll("#map-filter-pills .filter-pill");
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.toggle("active", p === pill));
      const filter = pill.getAttribute("data-filter");
      document.querySelectorAll(".hotspot-pin").forEach((pin) => {
        const cat = pin.getAttribute("data-category");
        const cir = pin.getAttribute("data-circuit");
        let match = false;
        if (filter === "all") match = true;
        else if (filter === "inhibitory") match = cir === "inhibitory" || cir === "both";
        else if (filter === "neuron") match = cat === "neuron" || cat === "motor" || cat === "parietal";
        else if (filter === "cerebellum") match = cat === "cerebellum" || cat === "spinal";
        else match = cat === filter;
        pin.classList.toggle("dimmed", !match);
      });
    });
  });

  // Optional Original Poster Overlay Loader
  const posterInput = document.getElementById("poster-file-input");
  const posterBgImg = document.getElementById("poster-bg-img");
  const posterOpacitySlider = document.getElementById("poster-opacity-slider");

  if (posterInput && posterBgImg && posterOpacitySlider) {
    posterInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      posterBgImg.src = url;
      posterBgImg.style.display = "block";
      posterOpacitySlider.style.display = "inline-block";
    });
    posterOpacitySlider.addEventListener("input", () => {
      posterBgImg.style.opacity = (Number(posterOpacitySlider.value) / 100).toFixed(2);
    });
  }

  // --- 4. Interactive Lab 1: Action Potential Gate Simulator & Cortex Calculator ---
  const slGlutamate = document.getElementById("sim-glutamate");
  const slDopamine = document.getElementById("sim-dopamine");
  const slOthers = document.getElementById("sim-others");
  const slGaba = document.getElementById("sim-gaba");
  const apCanvas = document.getElementById("ap-canvas");

  let apPhase = 0;

  function getAPParams() {
    const g = Number(slGlutamate ? slGlutamate.value : 12);
    const d = Number(slDopamine ? slDopamine.value : 8);
    const o = Number(slOthers ? slOthers.value : 6);
    const gaba = Number(slGaba ? slGaba.value : 4);
    const netDV = g + d + o - gaba;
    const resting = -70;
    const vm = resting + netDV;
    const firing = netDV > 20;
    return { g, d, o, gaba, netDV, resting, vm, firing };
  }

  function updateAPUI() {
    const { g, d, o, gaba, netDV, vm, firing } = getAPParams();
    document.getElementById("val-glutamate").textContent = `+${g} mV`;
    document.getElementById("val-dopamine").textContent = `+${d} mV`;
    document.getElementById("val-others").textContent = `+${o} mV`;
    document.getElementById("val-gaba").textContent = `-${gaba} mV`;

    const netEl = document.getElementById("ap-net-dv");
    const vmEl = document.getElementById("ap-vm");
    const badgeEl = document.getElementById("ap-fire-badge");

    netEl.textContent = `${netDV >= 0 ? "+" : ""}${netDV} mV`;
    vmEl.textContent = `${vm} mV`;

    if (firing) {
      badgeEl.className = "fire-badge firing";
      badgeEl.textContent = "⚡ FIRE! (ΔV > +20 mV ⇒ Vm > -50 mV)";
    } else {
      badgeEl.className = "fire-badge subthreshold";
      badgeEl.textContent = "🛑 Sub-threshold (ΔV ≤ +20 mV · No Spike)";
    }
  }

  [slGlutamate, slDopamine, slOthers, slGaba].forEach((sl) => {
    if (sl) sl.addEventListener("input", updateAPUI);
  });

  function drawAPCanvas() {
    const setup = setupHiDPICanvas(apCanvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const { netDV, vm, firing, gaba } = getAPParams();

    ctx.clearRect(0, 0, width, height);

    // Voltage Y mapping: +45 mV at top (y=22), -90 mV at bottom (y=height-28)
    const mapY = (mv) => {
      const norm = (mv - -90) / (45 - -90);
      return height - 28 - norm * (height - 50);
    };

    // Calibrated reference voltage lines
    const levels = [
      { mv: 35, label: "+35 mV (Na⁺ Action Potential Peak)", color: "rgba(52, 211, 153, 0.25)" },
      { mv: 0, label: "0 mV (Depolarized Zero Crossing)", color: "rgba(148, 163, 184, 0.16)" },
      { mv: -50, label: "-50 mV (Threshold Vth = Vrest + 20 mV)", color: "rgba(251, 191, 36, 0.65)" },
      { mv: -70, label: "-70 mV (Resting Membrane Potential Vrest)", color: "rgba(56, 189, 248, 0.35)" }
    ];

    ctx.font = "11px monospace";
    levels.forEach((lv) => {
      const y = mapY(lv.mv);
      ctx.strokeStyle = lv.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(12, y);
      ctx.lineTo(width - 12, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(lv.label, 16, y - 4);
    });

    // Draw Membrane Potential Waveform
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = firing ? "#34d399" : "#f43f5e";
    ctx.beginPath();

    for (let x = 15; x < width - 15; x++) {
      const t = (x - 15) / (width - 30);
      let v = -70;

      if (t < 0.18) {
        v = -70;
      } else if (t < 0.38) {
        // Synaptic integration ramp (Dendrites: G+ + D+ + Others - GABA-)
        const p = (t - 0.18) / 0.2;
        v = -70 + netDV * Math.sin(p * Math.PI * 0.5);
      } else if (firing) {
        // Action potential train when netDV > +20 mV (Vm > -50 mV)
        const freq = Math.min(5.0, 2.5 + (netDV - 20) * 0.08);
        const cycle = ((t - 0.38) * freq + apPhase * 0.4) % 1;
        if (cycle < 0.12) {
          v = -50 + (cycle / 0.12) * 85; // Upstroke to +35 mV
        } else if (cycle < 0.28) {
          v = 35 - ((cycle - 0.12) / 0.16) * 113; // K+ repolarization + hyperpolarization to -78 mV
        } else if (cycle < 0.46) {
          v = -78 + ((cycle - 0.28) / 0.18) * (-50 - -78);
        } else {
          v = Math.min(-49, vm);
        }
      } else {
        // Sub-threshold EPSP/IPSP passive decay back to -70 mV
        const decay = Math.exp(-(t - 0.38) * 4.5);
        v = -70 + netDV * decay;
      }

      const y = mapY(v);
      if (x === 15) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bottom X-axis time indicator & Red GABA- indicator
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("Time (ms): Dendritic Integration → Axon Hillock Threshold Gate", 16, height - 8);
    ctx.fillStyle = "#fda4af";
    ctx.fillText(`Red GABA⁻ Inhibition: -${gaba} mV`, Math.max(16, width - 210), 18);
  }

  // Cortex Silicon Benchmark Calculator (Two-way bound for all 4 cards)
  const slCortexVol = document.getElementById("sim-cortex-vol");
  if (slCortexVol) {
    slCortexVol.addEventListener("input", () => {
      const vol = Number(slCortexVol.value);
      document.getElementById("val-cortex-vol").textContent = `${vol.toLocaleString()} mm³`;
      document.getElementById("calc-neurons").textContent = `${(vol * 50000).toLocaleString()}+`;
      document.getElementById("calc-synapses").textContent =
        vol >= 10 ? `${(vol * 0.1).toFixed(1)} Billion+` : `${(vol * 100000000).toLocaleString()}+`;
      document.getElementById("calc-a8").textContent = `${(vol * 5).toLocaleString()}+ Chips`;
      // Proportional i7 Dual-Core equivalence (~0.069 i7 per mm3 since 65T synapses = 45,000 i7)
      const sampleI7 = ((vol * 100000000) / (65000000000000 / 45000)).toFixed(2);
      const i7El = document.getElementById("calc-i7");
      const i7Det = document.getElementById("calc-i7-detail");
      if (i7El) i7El.textContent = `${sampleI7} i7 (采样) / 45,000 (全皮层)`;
      if (i7Det) i7Det.textContent = `Sampled ${vol} mm³ ≈ ${sampleI7} i7 CPUs · Full Cortex = 45,000 i7 CPUs`;
    });
  }

  // --- 5. Follow the 8 Sensory Inputs Explorer & Sub-Labs ---
  const sensoryTabsNav = document.getElementById("sensory-tabs-nav");
  const sensoryDetailPanel = document.getElementById("sensory-detail-panel");
  let activeSenseId = DATA.sensoryInputs[0].id;

  function renderSensoryDetail(senseId) {
    const s = DATA.sensoryInputs.find((item) => item.id === senseId) || DATA.sensoryInputs[0];
    activeSenseId = s.id;

    document.querySelectorAll(".sensory-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-sense-id") === s.id);
    });

    if (!sensoryDetailPanel) return;
    sensoryDetailPanel.innerHTML = `
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; align-items:center;">
        <h4 style="font-size:1.25rem; color:#fff;">
          <span class="lang-zh">${s.name.zh}</span>
          <span class="lang-en">${s.name.en}</span>
        </h4>
        <span class="section-badge">Sensory Input #${s.number} of 8</span>
      </div>

      <div class="sensory-meta-row">
        <div class="meta-pill">
          <strong>🔬 感受器官 · Organ:</strong>
          <span class="lang-zh">${s.organ.zh}</span>
          <span class="lang-en">${s.organ.en}</span>
        </div>
        <div class="meta-pill">
          <strong>🔌 传入神经通路 · Nerve Pathway:</strong>
          <span class="lang-zh">${s.nerve.zh}</span>
          <span class="lang-en">${s.nerve.en}</span>
        </div>
      </div>

      <div class="stats-chip-list">
        ${s.stats
          .map(
            (st) => `
          <div class="stat-chip-card">
            <div class="lang-zh" style="font-weight:700; color:#f8fafc;">${st.zh}</div>
            <div class="lang-en" style="font-family:var(--font-mono); color:var(--excitatory-cyan); font-size:0.8rem;">${st.en}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
        <div class="lang-zh">
          <div class="poster-tags-title">中文完整神经机制解析</div>
          <ul class="mechanism-list">
            ${s.mechanisms.zh.map((m) => `<li>${m}</li>`).join("")}
          </ul>
        </div>
        <div class="lang-en">
          <div class="poster-tags-title">Poster Mechanisms &amp; Circuit Details (EN)</div>
          <ul class="mechanism-list">
            ${s.mechanisms.en.map((m) => `<li>${m}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div style="margin-top:1rem;">
        <span class="poster-tags-title">Target Brain Hubs on Poster: </span>
        <div class="poster-label-chips" style="margin-top:0.35rem;">
          ${s.targetAreas.map((t) => `<span class="label-chip">${t}</span>`).join("")}
        </div>
      </div>
    `;
  }

  if (sensoryTabsNav) {
    sensoryTabsNav.innerHTML = DATA.sensoryInputs
      .map(
        (s) => `
      <button class="sensory-tab-btn ${s.id === activeSenseId ? "active" : ""}" data-sense-id="${s.id}">
        <div class="lang-zh">${s.name.zh}</div>
        <div class="lang-en" style="font-size:0.76rem; color:var(--excitatory-cyan);">${s.name.en}</div>
      </button>
    `
      )
      .join("");

    sensoryTabsNav.querySelectorAll(".sensory-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderSensoryDetail(btn.getAttribute("data-sense-id"));
      });
    });
  }
  renderSensoryDetail(activeSenseId);

  // --- Sensory Micro-Lab A: Sight (Retina Fovea/Inversion), Touch (1 cm² Skin 200:15:6:1), Smell (Human/Dog/Hound) ---
  const sensoryCanvas = document.getElementById("sensory-canvas");
  const slSensoryParam = document.getElementById("sim-sensory-param");
  const valSensoryParam = document.getElementById("val-sensory-param");
  const sensorySliderTitle = document.getElementById("sensory-slider-title");
  let sensoryLabMode = "retina"; // 'retina' | 'skin' | 'smell'

  // Pre-generate deterministic 1 cm² skin receptors: 200 pain, 15 pressure, 6 cold, 1 warmth
  const skinReceptors = [];
  for (let i = 0; i < 200; i++) {
    skinReceptors.push({
      type: "pain",
      x: ((i * 73 + 19) % 96) / 100,
      y: ((i * 41 + 11) % 96) / 100,
      color: "#f43f5e"
    });
  }
  for (let i = 0; i < 15; i++) {
    skinReceptors.push({
      type: "pressure",
      x: ((i * 61 + 23) % 92) / 100,
      y: ((i * 83 + 31) % 92) / 100,
      color: "#38bdf8"
    });
  }
  for (let i = 0; i < 6; i++) {
    skinReceptors.push({
      type: "cold",
      x: ((i * 47 + 15) % 88) / 100,
      y: ((i * 59 + 40) % 88) / 100,
      color: "#a78bfa"
    });
  }
  skinReceptors.push({ type: "warmth", x: 0.52, y: 0.48, color: "#fbbf24" });

  function setSensoryLabMode(mode) {
    sensoryLabMode = mode;
    document.querySelectorAll("#sensory-mode-btns .btn-secondary").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });
    if (sensorySliderTitle && slSensoryParam) {
      if (mode === "retina") {
        sensorySliderTitle.textContent = "🎯 调节视角偏心度 Eccentricity (0° 中央凹 Fovea ↔ 45° 周边视野 Periphery)";
        slSensoryParam.value = "0";
      } else if (mode === "skin") {
        sensorySliderTitle.textContent = "🖐️ 移动 1 cm² 皮肤刺激探针位置 (Move Stimulus Probe Across 1 cm² Skin Patch)";
        slSensoryParam.value = "50";
      } else {
        sensorySliderTitle.textContent = "🧪 调节气味分子痕量浓度 (Odor Concentration Threshold Test)";
        slSensoryParam.value = "35";
      }
    }
    drawSensoryCanvas();
  }

  document.getElementById("btn-mode-retina")?.addEventListener("click", () => setSensoryLabMode("retina"));
  document.getElementById("btn-mode-skin")?.addEventListener("click", () => setSensoryLabMode("skin"));
  document.getElementById("btn-mode-smell")?.addEventListener("click", () => setSensoryLabMode("smell"));
  slSensoryParam?.addEventListener("input", drawSensoryCanvas);

  function drawSensoryCanvas() {
    const setup = setupHiDPICanvas(sensoryCanvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const param = Number(slSensoryParam ? slSensoryParam.value : 0);

    ctx.clearRect(0, 0, width, height);
    ctx.font = "11px monospace";

    if (sensoryLabMode === "retina") {
      // Eccentricity from 0 deg (Fovea Notch) to 45 deg (Far Periphery)
      const eccDeg = Math.round((param / 100) * 45);
      const isFovea = eccDeg <= 5;
      if (valSensoryParam) {
        valSensoryParam.textContent = isFovea
          ? `${eccDeg}° · Fovea High-Res View (1.5 mm Notch · 200,000 Cones)`
          : `${eccDeg}° · Peripheral Low-Res Motion View (126M Rods)`;
      }

      // 1. Left: Upright External Object (House with Red Roof & Green Door)
      const objX = 48;
      const objY = 72 + (eccDeg / 45) * 40; // Object shifts off-axis as eccentricity increases
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("1. Upright Object", 14, 20);

      // Roof (Top = Red)
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.moveTo(objX, objY - 24);
      ctx.lineTo(objX - 20, objY);
      ctx.lineTo(objX + 20, objY);
      ctx.closePath();
      ctx.fill();
      // Walls (Bottom = Cyan)
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(objX - 15, objY, 30, 24);

      // 2. Center: Eye Cross-Section & Optical Ray Inversion
      const eyeCx = width * 0.44;
      const eyeCy = height * 0.52;
      const eyeR = Math.min(width * 0.18, height * 0.35);
      const lensX = eyeCx - eyeR;

      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(eyeCx, eyeCy, eyeR, 0, Math.PI * 2);
      ctx.stroke();

      // Lens ellipse
      ctx.fillStyle = "rgba(56, 189, 248, 0.28)";
      ctx.beginPath();
      ctx.ellipse(lensX, eyeCy, 6, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rays crossing through lens nodal point to back of retina
      const retX = eyeCx + eyeR - 6;
      const imgCenterY = eyeCy - (objY - eyeCy) * 0.65;
      ctx.strokeStyle = "rgba(251, 191, 36, 0.55)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(objX, objY - 24); // Object top
      ctx.lineTo(lensX, eyeCy);
      ctx.lineTo(retX, imgCenterY + 16); // Inverted bottom on retina
      ctx.moveTo(objX, objY + 24); // Object bottom
      ctx.lineTo(lensX, eyeCy);
      ctx.lineTo(retX, imgCenterY - 16); // Inverted top on retina
      ctx.stroke();

      // Draw Upside-Down House on Retina
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(retX - 10, imgCenterY - 14, 14, 12); // Inverted walls on top
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.moveTo(retX - 3, imgCenterY + 12); // Inverted roof pointing down!
      ctx.lineTo(retX - 12, imgCenterY - 2);
      ctx.lineTo(retX + 6, imgCenterY - 2);
      ctx.closePath();
      ctx.fill();

      // Highlight 1.5 mm Fovea Notch at eyeCy
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(eyeCx + eyeR, eyeCy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("Fovea (1.5mm)", eyeCx + eyeR - 42, eyeCy - 48);

      // 3. Right Panel: Simulated Retinal Percept (Sharp Color at Fovea vs Blurred Rod Motion Periphery)
      const pBoxX = width * 0.69;
      const pBoxY = 28;
      const pBoxW = width * 0.27;
      const pBoxH = height - 62;

      ctx.strokeStyle = isFovea ? "#34d399" : "#fbbf24";
      ctx.lineWidth = 2;
      ctx.strokeRect(pBoxX, pBoxY, pBoxW, pBoxH);

      ctx.fillStyle = "#f8fafc";
      ctx.fillText(isFovea ? "Fovea High-Res Color" : "Peripheral Low-Res Rod", pBoxX + 8, pBoxY + 18);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(isFovea ? "200k Cones (Sharp)" : "Motion Reflex Only", pBoxX + 8, pBoxY + 34);

      const previewCx = pBoxX + pBoxW * 0.5;
      const previewCy = pBoxY + pBoxH * 0.62;
      ctx.save();
      if (!isFovea) {
        ctx.globalAlpha = Math.max(0.28, 1 - eccDeg / 55);
      }
      // Draw perceived object (sharp color in fovea, desaturated & blurry double-ghost in periphery)
      const spread = Math.round((eccDeg / 45) * 10);
      for (let k = -spread; k <= spread; k += Math.max(1, spread || 1)) {
        ctx.fillStyle = isFovea ? "#f43f5e" : "#64748b";
        ctx.beginPath();
        ctx.moveTo(previewCx + k, previewCy - 22);
        ctx.lineTo(previewCx - 20 + k, previewCy + 2);
        ctx.lineTo(previewCx + 20 + k, previewCy + 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = isFovea ? "#38bdf8" : "#94a3b8";
        ctx.fillRect(previewCx - 14 + k, previewCy + 2, 28, 22);
      }
      ctx.restore();

      ctx.fillStyle = "#fda4af";
      ctx.fillText(
        "Imaged flipped upside down & backwards · 131M→1M Optic Nerve (>4 A8 chips/eye)",
        14,
        height - 10
      );
    } else if (sensoryLabMode === "skin") {
      const pad = 22;
      const boxW = width - pad * 2;
      const boxH = height - pad * 2 - 22;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
      ctx.strokeRect(pad, pad, boxW, boxH);

      const probeX = pad + (param / 100) * boxW;
      const probeY = pad + boxH * 0.5;
      const probeR = 38;

      ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(probeX, probeY, probeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      let hitPain = 0,
        hitPress = 0,
        hitCold = 0,
        hitWarm = 0;

      skinReceptors.forEach((r) => {
        const rx = pad + r.x * boxW;
        const ry = pad + r.y * boxH;
        const dist = Math.hypot(rx - probeX, ry - probeY);
        const inside = dist <= probeR;
        if (inside) {
          if (r.type === "pain") hitPain++;
          else if (r.type === "pressure") hitPress++;
          else if (r.type === "cold") hitCold++;
          else if (r.type === "warmth") hitWarm++;
        }
        ctx.fillStyle = r.color;
        ctx.globalAlpha = inside ? 1.0 : 0.42;
        ctx.beginPath();
        ctx.arc(rx, ry, r.type === "warmth" ? 6.5 : r.type === "pain" ? 2.3 : 4.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (valSensoryParam) {
        valSensoryParam.textContent = `Probe Hits: ${hitPain} Pain · ${hitPress} Pressure · ${hitCold} Cold · ${hitWarm} Warmth`;
      }

      ctx.fillStyle = "#e2e8f0";
      ctx.fillText(
        "1 cm² Total: 🔴 200 Pain   🔵 15 Pressure   🟣 6 Cold   🟡 1 Warmth (BBC Science & Nature)",
        pad,
        height - 8
      );
    } else {
      // 2. Smell: Dual Log10 & Linear Comparator + Odor Trace Concentration Threshold
      // Slider param (0..100): 0 = ultra-trace odor (only Hound detects), 50 = moderate trace (Dog & Hound), 85+ = strong (All 3 detect)
      const tracePpb = Math.pow(10, -3 + (param / 100) * 5); // 0.001 ppb to 100 ppb
      if (valSensoryParam) {
        valSensoryParam.textContent = `Odor Concentration: ${tracePpb < 1 ? tracePpb.toFixed(3) : tracePpb.toFixed(1)} ppb`;
      }

      const species = [
        {
          name: "Human (人类): 12 Million (1.2×10⁷) Cells",
          cellsM: 12,
          minParam: 70,
          color: "#38bdf8"
        },
        {
          name: "Dog (普通犬): 1 Billion (10⁹) Cells [83.3× Human]",
          cellsM: 1000,
          minParam: 30,
          color: "#34d399"
        },
        {
          name: "Bloodhound (寻血猎犬): 5 Billion (5×10⁹) Cells [416.7× Human]",
          cellsM: 5000,
          minParam: 5,
          color: "#fbbf24"
        }
      ];

      species.forEach((sp, idx) => {
        const y = 26 + idx * 70;
        const detected = param >= sp.minParam;
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(
          `${sp.name} — ${detected ? "✅ DETECTED (已检出气味)" : "⚪ Below Threshold (未达阈值)"}`,
          20,
          y
        );

        // Log10 bar (top half) vs Linear bar (bottom half)
        const maxBarW = width - 48;
        const logNorm = Math.log10(sp.cellsM * 1e6) / Math.log10(5e9);
        const linNorm = sp.cellsM / 5000;

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = detected ? 0.95 : 0.35;
        ctx.fillRect(20, y + 8, logNorm * maxBarW, 14);
        ctx.fillStyle = "#09101d";
        ctx.fillText("Log₁₀ Scale", 26, y + 19);

        ctx.fillStyle = sp.color;
        ctx.fillRect(20, y + 25, Math.max(4, linNorm * maxBarW), 14);
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText("Linear Scale", 26 + Math.max(4, linNorm * maxBarW) + 6, y + 36);
        ctx.globalAlpha = 1;
      });
    }
  }

  // --- Sensory Micro-Lab B: 6. Vestibule Space Shuttle 3-Axis Gyro Triad & Oculo Reflex (VOR) ---
  const vestCanvas = document.getElementById("vestibular-canvas");
  const slGyroX = document.getElementById("sim-gyro-x");
  const slGyroY = document.getElementById("sim-gyro-y");
  const slGyroZ = document.getElementById("sim-gyro-z");

  function drawVestibularCanvas() {
    const setup = setupHiDPICanvas(vestCanvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const gx = Number(slGyroX ? slGyroX.value : 15);
    const gy = Number(slGyroY ? slGyroY.value : -10);
    const gz = Number(slGyroZ ? slGyroZ.value : 25);

    document.getElementById("val-gyro-x").textContent = `${gx}°/s`;
    document.getElementById("val-gyro-y").textContent = `${gy}°/s`;
    document.getElementById("val-gyro-z").textContent = `${gz}°/s`;

    ctx.clearRect(0, 0, width, height);

    // 1. Left: 3-Axis Orthogonal Semicircular Canal Gyro Triad (X-Roll, Y-Pitch, Z-Yaw all active)
    const cx = width * 0.24;
    const cy = height * 0.55;
    const r = Math.min(width * 0.18, height * 0.34);

    // X-Roll Ring (Cyan)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.38, (gx * Math.PI) / 180, 0, Math.PI * 2);
    ctx.stroke();

    // Y-Pitch Ring (Green)
    ctx.strokeStyle = "#34d399";
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 0.38, r, (gy * Math.PI) / 180, 0, Math.PI * 2);
    ctx.stroke();

    // Z-Yaw Horizontal Canal Ring with Rotating Heading Spokes (Amber)
    const yawRad = (gz * Math.PI) / 180;
    ctx.strokeStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(yawRad - Math.PI / 2) * r * 0.72, cy + Math.sin(yawRad - Math.PI / 2) * r * 0.72);
    ctx.stroke();

    // 2. Center: Head vs. Eye Counter-Rotation (Vestibulo-Ocular Reflex / Smooth Pursuit)
    const headCx = width * 0.62;
    const headCy = height * 0.56;
    const headR = Math.min(width * 0.14, height * 0.28);

    // Head circle rotated by Z-Yaw (gz)
    ctx.save();
    ctx.translate(headCx, headCy);
    ctx.rotate(yawRad * 0.6);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, headR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px monospace";
    ctx.fillText(`Head Yaw: ${gz}°/s`, -36, headR + 16);

    // Eye inside head counter-rotates by -gz so gaze vector stays straight up toward target!
    ctx.translate(0, -headR * 0.55);
    ctx.rotate(-yawRad * 0.6);
    ctx.strokeStyle = "#34d399";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -34); // Locked vertical gaze vector to target
    ctx.stroke();
    ctx.restore();

    // Fixed External Target at top of headCx
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(headCx, 22, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f8fafc";
    ctx.font = "11px monospace";
    ctx.fillText("Vestibule 3-Axis Triad (X/Y/Z)", 14, 18);
    ctx.fillStyle = "#34d399";
    ctx.fillText("Target Locked on 1.5mm Fovea", headCx - 75, 14);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`Eye Reflex: (${-gx}, ${-gy}, ${-gz})°/s`, width - 195, height - 26);
    ctx.fillText("→ Cerebellum Inertial Nav", width - 195, height - 10);
  }

  [slGyroX, slGyroY, slGyroZ].forEach((sl) => {
    if (sl) sl.addEventListener("input", drawVestibularCanvas);
  });

  // --- 6. Section 4: Visual Processing System (V1-V7) & N170 ERP Simulator ---
  const pipelineContainer = document.getElementById("visual-pipeline-cards");
  const visualStageDesc = document.getElementById("visual-stage-desc");
  const visualStreamCanvas = document.getElementById("visual-stream-canvas");
  let activeVisualIdx = 0;
  let visualHitBoxes = [];

  function selectVisualStage(idx) {
    activeVisualIdx = idx;
    const st = DATA.visualHierarchy[idx] || DATA.visualHierarchy[0];
    document.querySelectorAll(".pipeline-step").forEach((el, i) => {
      el.classList.toggle("active", i === idx);
    });
    if (visualStageDesc) {
      visualStageDesc.innerHTML = `<span class="lang-zh">${st.function.zh}</span> <span class="lang-en">${st.function.en}</span>`;
    }
    drawVisualStreamCanvas();
  }

  if (pipelineContainer) {
    pipelineContainer.innerHTML = DATA.visualHierarchy
      .map(
        (st, idx) => `
      <div class="pipeline-step ${idx === 0 ? "active" : ""}" data-stage-idx="${idx}">
        <div class="step-tag">STAGE ${idx + 1} · ${st.stage}</div>
        <h5>
          <span class="lang-zh">${st.name.zh}</span>
          <span class="lang-en">${st.name.en}</span>
        </h5>
        <div style="font-size:0.76rem; color:var(--excitatory-cyan); font-family:var(--font-mono);">${st.neurons}</div>
      </div>
    `
      )
      .join("");

    pipelineContainer.querySelectorAll(".pipeline-step").forEach((card) => {
      card.addEventListener("click", () => {
        selectVisualStage(Number(card.getAttribute("data-stage-idx")));
      });
    });
  }

  // Allow clicking directly on nodes inside visual-stream-canvas
  visualStreamCanvas?.addEventListener("click", (e) => {
    const rect = visualStreamCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    for (const box of visualHitBoxes) {
      if (mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) {
        selectVisualStage(box.idx);
        break;
      }
    }
  });

  function drawVisualStreamCanvas() {
    const setup = setupHiDPICanvas(visualStreamCanvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    ctx.clearRect(0, 0, width, height);

    // Responsive proportional layout that never overflows on narrow viewports
    const boxW = Math.min(130, Math.max(82, width * 0.22));
    const boxH = 54;
    const nodes = [
      { x: width * 0.13, y: height * 0.52, label: "1. Retina\n131M → 1M", idx: 0, color: "#fbbf24" },
      { x: width * 0.36, y: height * 0.52, label: "2. Thalamus\n570K Rad.", idx: 1, color: "#38bdf8" },
      { x: width * 0.59, y: height * 0.52, label: "3. V1 Sight\n1 2 3 / A", idx: 2, color: "#38bdf8" },
      { x: width * 0.84, y: height * 0.25, label: "4. Dorsal V2a\nMT/V6-V7/IPS", idx: 3, color: "#34d399" },
      { x: width * 0.84, y: height * 0.78, label: "5. Ventral V2b\nV3b/V4h/Face→OFC", idx: 4, color: "#a78bfa" }
    ];

    // Draw pathways
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nodes[1].x, nodes[1].y);
    ctx.lineTo(nodes[2].x, nodes[2].y);
    ctx.lineTo(nodes[3].x, nodes[3].y);
    ctx.moveTo(nodes[2].x, nodes[2].y);
    ctx.lineTo(nodes[4].x, nodes[4].y);
    ctx.stroke();

    visualHitBoxes = [];
    ctx.font = "11px monospace";
    nodes.forEach((n) => {
      const isSelected = n.idx === activeVisualIdx;
      const rx = n.x - boxW / 2;
      const ry = n.y - boxH / 2;
      visualHitBoxes.push({ x: rx, y: ry, w: boxW, h: boxH, idx: n.idx });

      ctx.fillStyle = isSelected ? n.color : "#1e293b";
      ctx.strokeStyle = n.color;
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.beginPath();
      ctx.roundRect(rx, ry, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSelected ? "#09101d" : "#f8fafc";
      const lines = n.label.split("\n");
      ctx.fillText(lines[0], rx + 8, n.y - 4);
      ctx.fillText(lines[1] || "", rx + 8, n.y + 14);
    });

    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Click any node box above to inspect its computation stage", 14, 18);
  }

  // N170 ERP Waveform Simulator with Calibrated Axes (Hietanen & Nummenmaa 2011)
  const n170Canvas = document.getElementById("n170-canvas");
  let activeN170 = "nude";

  document.querySelectorAll("#n170-buttons .filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#n170-buttons .filter-pill").forEach((b) => b.classList.toggle("active", b === btn));
      activeN170 = btn.getAttribute("data-n170");
      drawN170Canvas();
    });
  });

  function drawN170Canvas() {
    const setup = setupHiDPICanvas(n170Canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    ctx.clearRect(0, 0, width, height);

    const padLeft = 48;
    const padRight = 20;
    const plotW = width - padLeft - padRight;
    const zeroY = height * 0.36; // 0 uV line

    // Map microvolts (-10 uV to +5 uV) to canvas Y (+uV up, -uV down)
    const mapUvY = (uv) => zeroY - uv * 11.5;

    ctx.font = "10px monospace";
    // Y-axis ticks (+4, 0, -4, -8 uV)
    [4, 0, -4, -8].forEach((uv) => {
      const y = mapUvY(uv);
      ctx.strokeStyle = uv === 0 ? "rgba(148, 163, 184, 0.5)" : "rgba(148, 163, 184, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`${uv > 0 ? "+" : ""}${uv}μV`, 8, y + 3);
    });

    // X-axis time ticks (0, 100, 170, 300, 400 ms)
    [0, 100, 170, 300, 400].forEach((ms) => {
      const x = padLeft + (ms / 400) * plotW;
      ctx.fillStyle = ms === 170 ? "#fbbf24" : "#94a3b8";
      ctx.fillText(`${ms}ms`, x - 14, height - 8);
    });

    // 170ms N170 marker line
    const x170 = padLeft + (170 / 400) * plotW;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
    ctx.beginPath();
    ctx.moveTo(x170, 18);
    ctx.lineTo(x170, height - 22);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#fbbf24";
    ctx.fillText("N170 Negative Peak (~170 ms)", x170 - 65, 15);

    const curves = [
      { id: "nude", label: "Nude Bodies (-9.2 μV)", amp: -9.2, color: "#f43f5e" },
      { id: "face", label: "Faces (-6.8 μV)", amp: -6.8, color: "#38bdf8" },
      { id: "body", label: "Clothed Bodies (-4.5 μV)", amp: -4.5, color: "#34d399" },
      { id: "object", label: "Objects/Words (-2.1 μV)", amp: -2.1, color: "#94a3b8" }
    ];

    curves.forEach((c, idx) => {
      const isFocused = c.id === activeN170;
      ctx.strokeStyle = c.color;
      ctx.lineWidth = isFocused ? 3.2 : 1.4;
      ctx.globalAlpha = isFocused ? 1 : 0.45;
      ctx.beginPath();
      for (let ms = 0; ms <= 400; ms += 4) {
        const x = padLeft + (ms / 400) * plotW;
        const p100 = 3.0 * Math.exp(-Math.pow((ms - 100) / 20, 2));
        const n170 = c.amp * Math.exp(-Math.pow((ms - 170) / 25, 2));
        const p250 = 2.4 * Math.exp(-Math.pow((ms - 255) / 36, 2));
        const uv = p100 + n170 + p250;
        const y = mapUvY(uv);
        if (ms === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Legend in top-right
      ctx.globalAlpha = isFocused ? 1 : 0.65;
      ctx.fillStyle = c.color;
      ctx.fillText(`${isFocused ? "▶ " : "  "}${c.label}`, width - 165, 28 + idx * 15);
    });
    ctx.globalAlpha = 1;
  }

  // --- 7. Section 5: Executive Control (DLPFC vs. OFC Spirit/Flesh) & Spinal Reflex Simulator ---
  const slDlpfc = document.getElementById("sim-dlpfc");
  const slSpirit = document.getElementById("sim-spirit");
  const slFlesh = document.getElementById("sim-flesh");
  const slWants = document.getElementById("sim-wants");
  const execReadout = document.getElementById("executive-readout");

  function updateExecutiveSim() {
    const dlpfc = Number(slDlpfc ? slDlpfc.value : 75);
    const spirit = Number(slSpirit ? slSpirit.value : 70);
    const flesh = Number(slFlesh ? slFlesh.value : 45);
    const wants = Number(slWants ? slWants.value : 50);

    document.getElementById("val-dlpfc").textContent = `${dlpfc}%`;
    document.getElementById("val-spirit").textContent = `${spirit}%`;
    document.getElementById("val-flesh").textContent = `${flesh}%`;
    document.getElementById("val-wants").textContent = `${wants}%`;

    const topDownControl = dlpfc * 0.6 + spirit * 0.4;
    const impulseDrive = flesh * 0.55 + wants * 0.45;
    const accDistress = Math.max(5, Math.round(65 + (impulseDrive - topDownControl) * 0.5 - spirit * 0.35));
    const inhibited = topDownControl >= impulseDrive;

    if (execReadout) {
      execReadout.innerHTML = `
        <div>
          <strong>DLPFC/Spirit Top-Down Control:</strong> ${topDownControl.toFixed(0)} vs.
          <strong>OFC/Mesolimbic Impulse:</strong> ${impulseDrive.toFixed(0)} |
          <strong>ACC Conflict/Distress Activity:</strong> ${accDistress}%
        </div>
        <span class="fire-badge ${inhibited ? "firing" : "subthreshold"}">
          ${
            inhibited
              ? "✅ DLPFC Inhibits Auto-Sensory Impulse ('Stop Habits' Gate Active)"
              : "⚠️ Auto-Sensory Flesh/Dopamine Wants Override Executive Control"
          }
        </span>
      `;
    }
  }

  [slDlpfc, slSpirit, slFlesh, slWants].forEach((sl) => {
    if (sl) sl.addEventListener("input", updateExecutiveSim);
  });
  updateExecutiveSim();

  // Spinal Cord Pain Reflex Arc (97% Interneurons) & Vagus Nerve Simulator
  const spinalCanvas = document.getElementById("spinal-canvas");
  const btnTriggerPain = document.getElementById("btn-trigger-pain");
  const btnToggleVagus = document.getElementById("btn-toggle-vagus");
  const btnTogglePainOff = document.getElementById("btn-toggle-painoff");

  let painReflexTimer = 0;
  let vagusActive = false;
  let painOffActive = false;

  btnTriggerPain?.addEventListener("click", () => {
    painReflexTimer = 1.0;
  });
  btnToggleVagus?.addEventListener("click", () => {
    vagusActive = !vagusActive;
    btnToggleVagus.classList.toggle("active", vagusActive);
  });
  btnTogglePainOff?.addEventListener("click", () => {
    painOffActive = !painOffActive;
    btnTogglePainOff.classList.toggle("active", painOffActive);
  });

  function drawSpinalCanvas() {
    const setup = setupHiDPICanvas(spinalCanvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    ctx.clearRect(0, 0, width, height);

    // 1. Left: Spinal Cord Cross-Section with Butterfly Grey Matter Lamina
    const cx = width * 0.25;
    const cy = height * 0.54;

    // Outer white matter (Myelin insulated Axons)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
    ctx.fillStyle = "rgba(30, 41, 59, 0.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 56, 52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Inner Butterfly (grey matter) Spinal Cord Lamina (97% Interneurons)
    ctx.strokeStyle = "#fbbf24";
    ctx.fillStyle = painReflexTimer > 0 ? "rgba(244, 63, 94, 0.35)" : "rgba(251, 191, 36, 0.18)";
    ctx.beginPath();
    ctx.ellipse(cx - 18, cy, 18, 36, -0.25, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy, 18, 36, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Reflex Arc Lines (Sensory Afferent in -> 97% Interneurons -> Motor Neuron Axon > 1m out to Flexor/Extensor)
    ctx.lineWidth = 2;
    ctx.strokeStyle = painReflexTimer > 0 ? "#f43f5e" : "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(16, cy - 22);
    ctx.lineTo(cx - 18, cy - 18); // Dorsal Horn entry
    ctx.lineTo(cx + 18, cy + 16); // Bilateral Interneuron coordination
    ctx.lineTo(16, cy + 24); // Ventral Horn motor axon exit
    ctx.stroke();

    // 2. Right Panel: Responsive Readout Cards on Canvas
    const rx = width * 0.46;
    ctx.font = "11px monospace";
    ctx.fillStyle = "#f8fafc";
    ctx.fillText("Butterfly Lamina: 97% Interneurons (1B Spinal Neurons)", 14, 18);

    // Vagus Status
    const hr = vagusActive ? 58 : 76;
    const bp = vagusActive ? "106/68" : "122/80";
    ctx.fillStyle = vagusActive ? "#34d399" : "#cbd5e1";
    ctx.fillText(`🫀 Vagus Nerve (200M Programs): ${vagusActive ? "ACTIVE" : "Basal"}`, rx, 46);
    ctx.fillText(`   Heart Rate: ${hr} bpm | BP: ${bp} mmHg`, rx, 64);

    // Descending Pain Off Gate
    ctx.fillStyle = painOffActive ? "#f43f5e" : "#cbd5e1";
    ctx.fillText(
      `🔴 Descending Gate: ${painOffActive ? "PAIN OFF (Adrenaline/Opioids)" : "Normal Nociceptive Flow"}`,
      rx,
      98
    );

    // Reflex Status
    if (painReflexTimer > 0) {
      const suppressed = painOffActive ? " (Cortical Pain Attenuated)" : "";
      ctx.fillStyle = "#fbbf24";
      ctx.fillText(`⚡ BILATERAL REFLEX FIRING!${suppressed}`, rx, 134);
      ctx.fillStyle = "#34d399";
      ctx.fillText("   Ipsilateral Flexor + Contralateral Balance to Legs", rx, 152);
    } else {
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("👉 Click 'Trigger Bilateral Pain Reflex' above", rx, 134);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("   Coordinates multi-joint flexor/extensor (>1m axon)", rx, 152);
    }
  }

  // --- 8. Render All 19 Verbatim Quotes & Searchable Glossary ---
  const quotesContainer = document.getElementById("quotes-container");
  if (quotesContainer) {
    quotesContainer.innerHTML = DATA.quotes
      .map(
        (q, i) => `
      <article class="quote-card">
        <div>
          <div class="quote-region">
            #${i + 1} · <span class="lang-zh">${q.region.zh}</span> <span class="lang-en">${q.region.en}</span>
          </div>
          <blockquote>${q.en}</blockquote>
          <p class="zh-quote lang-zh">${q.zh}</p>
        </div>
        <div class="quote-source">
          📖 Source: <a href="${q.url}" target="_blank" rel="noopener">${q.source} ↗</a>
        </div>
      </article>
    `
      )
      .join("");
  }

  const glossaryTbody = document.getElementById("glossary-tbody");
  const glossarySearch = document.getElementById("glossary-search");

  function renderGlossary(query = "") {
    if (!glossaryTbody) return;
    const q = query.trim().toLowerCase();
    const rows = DATA.completeGlossary.filter(
      (item) =>
        !q ||
        item.en.toLowerCase().includes(q) ||
        item.zh.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
    glossaryTbody.innerHTML = rows
      .map(
        (item) => `
      <tr>
        <td style="font-family:var(--font-mono); color:var(--excitatory-amber);">${item.group}</td>
        <td style="font-weight:600; color:#fff;">${item.en}</td>
        <td style="color:var(--text-secondary);">${item.zh}</td>
      </tr>
    `
      )
      .join("");
  }

  renderGlossary();
  glossarySearch?.addEventListener("input", (e) => renderGlossary(e.target.value));

  // Footer Author Credit
  const footerEn = document.getElementById("footer-author-en");
  const footerZh = document.getElementById("footer-author-zh");
  if (footerEn) footerEn.textContent = DATA.meta.authorCredit.en;
  if (footerZh) footerZh.textContent = DATA.meta.authorCredit.zh;

  // --- Master Animation & Resize Loop (Clamped dt for numerical stability) ---
  let lastTs = performance.now();
  function animate(now) {
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTs) / 1000));
    lastTs = now;
    apPhase += dt * 2.2;
    if (painReflexTimer > 0) {
      painReflexTimer = Math.max(0, painReflexTimer - dt * 0.45);
    }
    drawAPCanvas();
    drawSpinalCanvas();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    drawAPCanvas();
    drawSensoryCanvas();
    drawVestibularCanvas();
    drawVisualStreamCanvas();
    drawN170Canvas();
    drawSpinalCanvas();
  });

  // Initial Draw
  updateAPUI();
  drawSensoryCanvas();
  drawVestibularCanvas();
  selectVisualStage(0);
  drawN170Canvas();
  drawSpinalCanvas();
  requestAnimationFrame(animate);
})();
