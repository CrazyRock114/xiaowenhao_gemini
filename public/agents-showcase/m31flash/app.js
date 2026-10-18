/* =====================================================================
   Your High-Tech Brain — render + interactions
   All copy lives in content.js. This file only draws it and wires up
   the language switch, search, nav and lightbox.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.POSTER;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var LANG_KEY = "brain-lang";
  var lang = "zh";
  try { lang = localStorage.getItem(LANG_KEY) || "zh"; } catch (e) {}
  if (["zh", "en", "both"].indexOf(lang) < 0) lang = "zh";

  /* ---------- tiny helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /** bilingual pair: Chinese span + English span, CSS decides which shows */
  function bi(en, zh) {
    return '<span class="zh-only">' + esc(zh) + '</span><span class="en-only">' + esc(en) + "</span>";
  }
  function biHtml(en, zh) {
    return '<span class="zh-only">' + (zh || "") + '</span><span class="en-only">' + (en || "") + "</span>";
  }
  /** pick the right plain string for non-pair text */
  function pick(zh, en) { return lang === "en" ? en : zh; }

  var SEARCH = [];                       // {en, zh, where:{en,zh}, sel}
  /** bilingual "where" label so search results disambiguate in either language */
  function wz(en, zh) { return { en: en, zh: zh || en }; }
  function idx(en, zh, where, sel) {
    SEARCH.push({
      en: en || "", zh: zh || "",
      where: typeof where === "string" ? wz(where) : (where || wz("")),
      sel: sel
    });
  }

  /* ================================================================
     HERO
     ================================================================ */
  function renderHero() {
    $("#heroLede").innerHTML = bi(D.hero.lede_en, D.hero.lede_zh);
    $("#legend").innerHTML = biHtml(
      "<b>Legend:</b> " + esc(D.hero.legend_en),
      "<b>图例：</b>" + esc(D.hero.legend_zh)
    );

    var stats = D.stats.items;
    $("#heroStats").innerHTML = stats.map(function (s, i) {
      idx(s.d_en, s.d_zh, wz("Stats", "关键数字"), null);
      return '<div class="hstat"><b>' + biHtml(esc(s.n), esc(s.cn)) + "</b><span>" +
        biHtml(esc(s.d_en), esc(s.d_zh)) + "</span></div>";
    }).join("");
  }

  /* ================================================================
     OVERVIEW — the eight senses grid
     ================================================================ */
  function renderOverview() {
    $("#overviewTitle").innerHTML = biHtml(esc(D.senses_heading.en), esc(D.senses_heading.zh));
    $("#overviewLede").innerHTML = biHtml(
      "Eight numbered channels run from the receptor to the cortex. Every one of them is traced on the poster — click through to see what each one carries.",
      "八条编号通道，从感受器一路连到皮层。海报上的每一条都做了标注——点击进入，看各自承载什么。"
    );

    $("#senseGrid").innerHTML = D.senses.map(function (s) {
      return '<a class="sg reveal" href="#s-' + s.key + '">' +
        '<span class="no">' + String(s.no).padStart(2, "0") + "</span>" +
        "<b>" + biHtml(esc(s.name_en), esc(s.name_zh)) + "</b>" +
        "<span>" + biHtml(esc(s.tag_en), esc(s.tag_zh)) + "</span>" +
        "</a>";
    }).join("");
  }

  /* ================================================================
     NEURON
     ================================================================ */
  function renderNeuron() {
    var N = D.neuron;
    $("#neuronTitle").innerHTML = biHtml(esc(N.heading_en), esc(N.heading_zh));
    $("#neuronSub").innerHTML = biHtml(esc(N.sub_en), esc(N.sub_zh));

    $("#formulaLead").innerHTML = biHtml(esc(N.formula.lead_en), esc(N.formula.lead_zh));
    // colour-code the formula exactly like the poster: D+G green, GABA red, FIRE amber
    var expr =
      'IF ( <span class="g nowrap">D⁺ + G⁺</span> <span class="i nowrap">− GABA⁻</span> ) &gt; ' +
      '<span class="nowrap">+20 mV</span> <span class="fire nowrap">→ FIRE</span>';
    $("#formulaExpr").innerHTML = expr;
    $("#formulaNote").textContent = pick(N.formula.note_zh, N.formula.note_en);
    $("#formulaCaveat").innerHTML = biHtml(esc(N.formula.caveat_en), esc(N.formula.caveat_zh));

    $("#chem").innerHTML = N.chem.map(function (c, i) {
      idx(c.role_en, c.role_zh, wz("Neuron", "神经元"), null);
      return "<li><b>" + esc(c.en) + "</b><i>" + biHtml(esc(c.en), esc(c.zh)) + "</i>" +
        "<em>" + biHtml(esc(c.role_en), esc(c.role_zh)) + "</em></li>";
    }).join("");

    $("#parts").innerHTML = N.parts.map(function (p, i) {      idx(p.en, p.zh, wz("Neuron", "神经元"), "#np-" + i);
      return '<li id="np-' + i + '">' + biHtml(esc(p.en), esc(p.zh)) + "</li>";
    }).join("");

    $("#related").innerHTML = N.related.map(function (r, i) {
      idx(r.en, r.zh, wz("Neuron", "神经元"), "#nr-" + i);
      return '<li id="nr-' + i + '">' + biHtml(esc(r.en), esc(r.zh)) + "</li>";
    }).join("");

    $("#mirrorQuote").innerHTML = quote(N.mirror_quote);
    idx(N.mirror_quote.text_en, N.mirror_quote.text_zh, wz("Quote · mirror neurons", "引文·镜像神经元"), "#mirrorQuote");
  }

  /* ================================================================
     READING NOTE
     ================================================================ */
  function renderNotice() {
    var N = D.disclaimer;
    $("#noticeBox").innerHTML =
      '<div class="notice-head">' +
      '<span class="kicker">' + biHtml(esc(N.kicker_en), esc(N.kicker_zh)) + "</span>" +
      "<h2>" + biHtml(esc(N.title_en), esc(N.title_zh)) + "</h2>" +
      '<p class="notice-lede">' + biHtml(esc(N.body_en), esc(N.body_zh)) + "</p>" +
      "</div>" +
      '<ul class="notice-list">' +
      N.points.map(function (p, i) {
        var id = "nt-" + i;
        idx(p.h_en, p.h_zh, wz("Reading note", "阅读须知"), "#" + id);
        return '<li id="' + id + '"><b>' + biHtml(esc(p.h_en), esc(p.h_zh)) + "</b>" +
          '<span>' + biHtml(esc(p.p_en), esc(p.p_zh)) + "</span></li>";
      }).join("") +
      "</ul>";
  }

  /* ================================================================
     THE EIGHT SENSES
     ================================================================ */
  function renderSenses() {
    $("#sensesTitle").innerHTML = biHtml("The 8 Sensory Inputs, one by one", "8 种感官输入，逐个拆开");
    $("#sensesLede").innerHTML = biHtml(
      "Every numbered input on the poster, with the counts printed beside it.",
      "海报上每一个带编号的输入，连同它旁边印着的所有数字。"
    );

    $("#sensesList").innerHTML = D.senses.map(function (s) {
      var facts = s.facts.map(function (f, i) {
        var id = "f-" + s.key + "-" + i;
        idx(f.k_en, f.k_zh, wz(s.name_en, s.name_zh), "#" + id);
        return '<li id="' + id + '">' + biHtml(esc(f.k_en), esc(f.k_zh)) + "</li>";
      }).join("");

      var note = s.note_en
        ? '<p class="snote">' + biHtml(esc(s.note_en), esc(s.note_zh)) + "</p>"
        : "";
      var caveat = s.caveat_en
        ? '<p class="caveat">' + biHtml(esc(s.caveat_en), esc(s.caveat_zh)) + "</p>"
        : "";
      // the per-sense quote must carry the .quote wrapper, otherwise it renders unstyled
      var q = s.quote ? '<figure class="quote">' + quote(s.quote) + "</figure>" : "";

      return '<article class="sense reveal" id="s-' + s.key + '">' +
        '<div class="sense-h">' +
        '<span class="sense-n">' + String(s.no).padStart(2, "0") + "</span>" +
        '<div class="sense-t"><h3>' + biHtml(esc(s.name_en), esc(s.name_zh)) + "</h3></div>" +
        '<span class="sense-tag">' + biHtml(esc(s.tag_en), esc(s.tag_zh)) + "</span>" +
        "</div>" +
        '<ul class="facts">' + facts + "</ul>" + note + caveat + q +
        "</article>";
    }).join("");
  }

  /* ================================================================
     VISION
     ================================================================ */
  function renderVision() {
    var V = D.vision;
    $("#visionTitle").innerHTML = biHtml(esc(V.heading_en), esc(V.heading_zh));
    $("#visionSub").innerHTML = biHtml(esc(V.sub_en), esc(V.sub_zh));
    $("#visionSize").innerHTML = biHtml(esc(V.size_en), esc(V.size_zh));

    $("#vstream").innerHTML = V.streams.map(function (s, i) {
      idx(s.en, s.zh, wz("Vision stream", "视觉层级"), "#vs-" + i);
      var note = s.note_en ? '<span>' + biHtml(esc(s.note_en), esc(s.note_zh)) + "</span>" : "";
      return '<div class="vstage" id="vs-' + i + '"><b>' + esc(s.en) + "</b>" + note + "</div>";
    }).join("");

    $("#visionRegions").innerHTML = V.regions.map(function (r, i) {
      idx(r.en, r.zh, wz("Vision region", "视觉分区"), "#vr-" + i);
      return '<li id="vr-' + i + '">' + biHtml(esc(r.en), esc(r.zh)) + "</li>";
    }).join("");

    $("#visionQuote").innerHTML = quote(V.quote);
    idx(V.quote.text_en, V.quote.text_zh, wz("Quote · visual cortex", "引文·视觉皮层"), "#visionQuote");
    idx(I18N.etch.en, I18N.etch.zh, wz("Vision · memory", "视觉·记忆回传"), "#etchLi");
    idx(I18N.pursuit2.en, I18N.pursuit2.zh, wz("Vision · smooth pursuit", "视觉·平滑追踪"), "#pursuitLi");
    $("#ipsQuote").innerHTML = quote(V.ips_quote);
    idx(V.ips_quote.text_en, V.ips_quote.text_zh, wz("Quote · IPS / Brodmann area 5", "引文·顶内沟与布罗德曼 5 区"), "#ipsQuote");
    $("#faceBodyQuote").innerHTML = quote(V.face_body_quote);
    idx(V.face_body_quote.text_en, V.face_body_quote.text_zh, wz("Quote · face & body networks", "引文·面孔与身体网络"), "#faceBodyQuote");
    $("#n170Quote").innerHTML = quote(V.n170_quote);
    idx(V.n170_quote.text_en, V.n170_quote.text_zh, wz("Quote · N170", "引文·N170"), "#n170Quote");
    $("#wikiQuote").innerHTML = quote(V.wiki_quote);
    idx(V.wiki_quote.text_en, V.wiki_quote.text_zh, wz("Quote · single neurons", "引文·单个神经元"), "#wikiQuote");
  }

  /* ================================================================
     DRIVES
     ================================================================ */
  function renderDrives() {
    var G = D.drives;
    $("#drivesTitle").innerHTML = biHtml(esc(G.heading_en), esc(G.heading_zh));
    $("#drivesSub").innerHTML = biHtml(esc(G.sub_en), esc(G.sub_zh));

    $("#driveGroups").innerHTML = G.groups.map(function (g, gi) {
      var items = g.items.map(function (it, i) {
        var id = "dg-" + gi + "-" + i;
        idx(it.en, it.zh, wz(g.title_en, g.title_zh), "#" + id);
        return '<li id="' + id + '">' + biHtml(esc(it.en), esc(it.zh)) + "</li>";
      }).join("");
      return '<div class="dgroup reveal"><h3>' + biHtml(esc(g.title_en), esc(g.title_zh)) +
        '</h3><ul class="chips cloud">' + items + "</ul></div>";
    }).join("");
  }

  /* ================================================================
     MOTOR
     ================================================================ */
  function renderMotor() {
    var M = D.motor;
    $("#motorTitle").innerHTML = biHtml(esc(M.heading_en), esc(M.heading_zh));
    $("#motorSub").innerHTML = biHtml(esc(M.sub_en), esc(M.sub_zh));

    var cb = M.cerebellum;
    $("#cbName").textContent = pick(cb.name_zh, cb.name_en);
    $("#cbRole").textContent = pick(cb.role_zh, cb.role_en);
    $("#cbNum").innerHTML = biHtml(esc(cb.n_en), esc(cb.n_zh));
    $("#cbSize").innerHTML = biHtml(esc(cb.size_en), esc(cb.size_zh));
    $("#cbBits").innerHTML = cb.bits.map(function (b, i) {
      idx(b.en, b.zh, wz("Cerebellum", "小脑"), "#cb-" + i);
      return '<li id="cb-' + i + '">' + biHtml(esc(b.en), esc(b.zh)) + "</li>";
    }).join("");

    var sc = M.spinal;
    $("#scName").textContent = pick(sc.name_zh, sc.name_en);
    $("#scRole").textContent = pick("脊髓：反射与传导", "Spinal cord: reflex & conduit");
    $("#scNum").innerHTML = biHtml(esc(sc.n_en), esc(sc.n_zh));
    $("#scBits").innerHTML = sc.bits.map(function (b, i) {
      idx(b.en, b.zh, wz("Spinal cord", "脊髓"), "#sc-" + i);
      return '<li id="sc-' + i + '">' + biHtml(esc(b.en), esc(b.zh)) + "</li>";
    }).join("");

    $("#cordQuote").innerHTML = quote(M.quote);
    idx(M.quote.text_en, M.quote.text_zh, wz("Quote · interneurons", "引文·中间神经元"), "#cordQuote");
  }

  /* ================================================================
     CORTEX / AUTONOMIC / TRIAD / DNA
     ================================================================ */
  function renderCortex() {
    var C = D.cortex;
    $("#cortexTitle").innerHTML = biHtml(esc(C.heading_en), esc(C.heading_zh));
    $("#pfcName").textContent = pick(C.prefrontal.name_zh, C.prefrontal.name_en);
    $("#pfcNote").innerHTML = biHtml(esc(C.prefrontal.note_en), esc(C.prefrontal.note_zh));
    $("#pfcCanInhibit").innerHTML = biHtml(esc(C.prefrontal.can_inhibit.en), esc(C.prefrontal.can_inhibit.zh));
    idx(C.prefrontal.can_inhibit.en, C.prefrontal.can_inhibit.zh, wz("Prefrontal cortex", "前额叶皮层"), "#pfcCanInhibit");
    $("#ofcName").textContent = pick(C.orbital.name_zh, C.orbital.name_en);
    $("#ofcNote").innerHTML = biHtml(esc(C.orbital.note_en), esc(C.orbital.note_zh));
    $("#ofcFrames").innerHTML = C.orbital.frames.map(function (f, i) {
      idx(f.en, f.zh, wz("Orbitofrontal cortex", "眶额皮层"), "#of-" + i);
      return '<li id="of-' + i + '">' + biHtml(esc(f.en), esc(f.zh)) + "</li>";
    }).join("");

    $("#cortexQuotes").innerHTML = C.quotes.map(function (q, i) {
      idx(q.text_en, q.text_zh, wz("Quote · prefrontal cortex", "引文·前额叶皮层"), "#cq-" + i);
      return '<figure class="quote wide" id="cq-' + i + '">' + quote(q) + "</figure>";
    }).join("");

    var A = D.autonomic;
    $("#autoItems").innerHTML = A.items.map(function (a, i) {
      idx(a.en, a.zh, wz("Autonomic", "自主神经"), "#ai-" + i);
      return '<li id="ai-' + i + '">' + biHtml(esc(a.en), esc(a.zh)) + "</li>";
    }).join("");
    $("#autoCard").insertAdjacentHTML("beforeend",
      '<figure class="quote" id="vagusQuote">' + quote(A.quote) + "</figure>");
    idx(A.quote.text_en, A.quote.text_zh, wz("Quote · vagus nerve", "引文·迷走神经"), "#vagusQuote");

    var T = D.triad;
    $("#triadCard").innerHTML =
      '<h3 class="card-h">' + biHtml(esc(T.heading_en), esc(T.heading_zh)) + "</h3>" +
      '<p style="margin:0 0 6px;font-size:14px;color:var(--muted)">' + biHtml(esc(T.body_en), esc(T.body_zh)) + "</p>" +
      '<div class="triad-axes">' + T.axes.map(function (a) {
        return '<span class="axis ' + a.toLowerCase() + '">' + a + "</span>";
      }).join("") + "</div>";
    idx(T.heading_en, T.heading_zh, wz("Balance & acceleration", "平衡与加速度"), "#triadCard");

    $("#dnaQuote").innerHTML = quote(D.dna.quote);
    idx(D.dna.quote.text_en, D.dna.quote.text_zh, wz("Quote · DNA storage", "引文·DNA 存储"), "#dnaQuote");
  }

  /* ================================================================
     FULL-LABEL INDEX
     ================================================================ */
  function renderIndex() {
    $("#indexTitle").innerHTML = biHtml(esc(D.index_heading.en), esc(D.index_heading.zh));
    $("#indexIntro").innerHTML = biHtml(esc(D.index_intro_en), esc(D.index_intro_zh));

    var total = 0;
    $("#indexGroups").innerHTML = D.index.map(function (g) {
      total += g.items.length;
      var items = g.items.map(function (it) {
        idx(it.en, it.zh, wz("Index · " + g.group_en, "索引 · " + g.group_zh), null);
        return "<li>" + biHtml(esc(it.en), esc(it.zh)) + "</li>";
      }).join("");
      return '<div class="igroup reveal"><h3>' + biHtml(esc(g.group_en), esc(g.group_zh)) +
        '</h3><ul class="ilist">' + items + "</ul></div>";
    }).join("");

    $("#indexCount").innerHTML = biHtml(
      total + " labels indexed · " + D.index.length + " groups",
      "已收录 " + total + " 条标签 · 共 " + D.index.length + " 组"
    );
  }

  /* ================================================================
     ABOUT / PROVENANCE
     ================================================================ */
  function renderAbout() {
    var P = D.provenance;
    $("#aboutTitle").innerHTML = biHtml(esc(P.heading_en), esc(P.heading_zh));
    $("#provBody").innerHTML = "<p>" + biHtml(esc(P.body_en), esc(P.body_zh)) + "</p>";
    $("#provQuote").innerHTML = quote({
      text_en: P.quote_en, text_zh: P.quote_zh, src_en: "— the author", src_zh: "——作者"
    });
    $("#provCopy").innerHTML = biHtml(esc(P.copyright_en), esc(P.copyright_zh));
    $("#footCopy").innerHTML = biHtml(esc(P.copyright_en), esc(P.copyright_zh));
  }

  /* ---------- shared quote renderer ---------- */
  function quote(q) {
    if (!q) return "";
    return '<p class="q-en">' + esc(q.text_en) + "</p>" +
      '<p class="q-zh">' + esc(q.text_zh) + "</p>" +
      '<cite>' + esc(q.src_en) + '<span class="zh-only">' + esc(q.src_zh) + "</span></cite>";
  }

  /* ================================================================
     NAV
     ================================================================ */
  var NAV = [
    { id: "howto", zh: "阅读须知", en: "Read first" },
    { id: "overview", zh: "全景", en: "Overview" },
    { id: "neuron", zh: "神经元", en: "Neuron" },
    { id: "senses", zh: "8 种感官", en: "8 Senses" },
    { id: "vision", zh: "视觉系统", en: "Vision" },
    { id: "drives", zh: "情绪奖赏", en: "Drives" },
    { id: "motor", zh: "运动与反射", en: "Motor" },
    { id: "cortex", zh: "决策与内脏", en: "Decision" },
    { id: "index", zh: "标签索引", en: "Index" },
    { id: "about", zh: "出处", en: "About" }
  ];

  function renderNav() {
    $("#topnav").innerHTML = NAV.map(function (n) {
      return '<a href="#' + n.id + '" data-nav="' + n.id + '">' + esc(pick(n.zh, n.en)) + "</a>";
    }).join("");
  }

  var I18N = {
    brand: { zh: "你的高科技大脑", en: "Your High-Tech Brain" },
    eyebrow: { zh: "人脑示意图 · 全图双语解读", en: "Human brain schematic · fully bilingual" },
    hero_title_zh: "你的高科技大脑",
    hero_title_en: "Your High-Tech Brain",
    hero_sub_zh: "跟随 8 种感官输入",
    hero_sub_en: "Follow the 8 Sensory Inputs",
    cta1: { zh: "从 8 种感官开始", en: "Start with the 8 senses" },
    cta2: { zh: "看视觉处理系统", en: "See the visual system" },
    cta3: { zh: "查看原图", en: "View the original" },
    k_overview: { zh: "全景", en: "Overview" },
    k_neuron: { zh: "单元", en: "Unit" },
    k_senses: { zh: "通道", en: "Channels" },
    k_vision: { zh: "视觉", en: "Vision" },
    k_drives: { zh: "动机", en: "Motivation" },
    k_motor: { zh: "运动", en: "Movement" },
    k_cortex: { zh: "决策", en: "Decision" },
    k_index: { zh: "索引", en: "Index" },
    k_about: { zh: "出处", en: "Provenance" },
    k_auto: { zh: "自主神经", en: "Autonomic" },
    fire_rule: { zh: "放电规则", en: "The fire rule" },
    lg_red: { zh: "红色线路 = 抑制性回路", en: "Red circuits = inhibitory" },
    lg_other: { zh: "其他颜色 = 兴奋性回路", en: "All other colours = excitatory" },
    chem: { zh: "神经化学物质", en: "Neurochemistry" },
    parts: { zh: "结构与线路", en: "Structure & wiring" },
    related: { zh: "相关脑区与功能标签", en: "Related regions & function labels" },
    regions: { zh: "加工区域与功能", en: "Processing regions & functions" },
    recall: { zh: "记忆回传", en: "Feedback to memory" },
    pursuit: { zh: "平滑追踪与前庭协同", en: "Smooth pursuit & vestibular coupling" },
    etch: {
      zh: "习得的图像会铭刻进记忆，随后被识别并转发至眶额皮层（OFC）。",
      en: "Learned images become etched in memory, then recognized and forwarded to the OFC."
    },
    pursuit2: {
      zh: "在头部转动时，两套系统都必须与前庭系统协同。平滑追踪系统的目标，是通过让眼球速度与目标速度匹配，把视网膜上的目标像保持在中心凹上。",
      en: "During head movements, both systems must interact with the vestibular system. The goal of the pursuit system is to keep the retinal target image on the fovea by matching the eye velocity to target velocity."
    },
    decisions: { zh: "三条决策回路", en: "Three decision circuits" },
    r1: { zh: "眶额皮层", en: "Orbitofrontal cortex" },
    r2: { zh: "背外侧前额叶皮层", en: "Dorsolateral prefrontal cortex" },
    r3: { zh: "前扣带回", en: "Anterior cingulate cortex" },
    foot_t: { zh: "你的高科技大脑 · 双语图解", en: "Your High-Tech Brain · bilingual explainer" },
    foot_n: {
      zh: "英文原文逐条转录自海报；中文为对照译文。数字与引文均按原图保留，未作修正。",
      en: "English text transcribed verbatim from the poster; Chinese is a translation. Figures and quotations are reproduced as printed, uncorrected."
    },
    lb_t: { zh: "原图 · The Visual Processing System（2019）", en: "Original poster · The Visual Processing System (2019)" }
  };

  function applyLang() {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-CN");

    // static [data-i18n] slots
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!I18N[k]) return;
      var v = I18N[k];
      if (typeof v === "object") el.textContent = pick(v.zh, v.en);
      else el.textContent = v;             // bilingual-only strings render as-is
    });

    // language-specific plain strings
    $("#formulaNote").textContent = pick(D.neuron.formula.note_zh, D.neuron.formula.note_en);
    $("#cbName").textContent = pick(D.motor.cerebellum.name_zh, D.motor.cerebellum.name_en);
    $("#cbRole").textContent = pick(D.motor.cerebellum.role_zh, D.motor.cerebellum.role_en);
    $("#scName").textContent = pick(D.motor.spinal.name_zh, D.motor.spinal.name_en);
    $("#scRole").textContent = pick("脊髓：反射与传导", "Spinal cord: reflex & conduit");
    $("#pfcName").textContent = pick(D.cortex.prefrontal.name_zh, D.cortex.prefrontal.name_en);
    $("#ofcName").textContent = pick(D.cortex.orbital.name_zh, D.cortex.orbital.name_en);

    $("#etchLi").innerHTML = biHtml(I18N.etch.en, I18N.etch.zh);
    $("#pursuitLi").innerHTML = biHtml(I18N.pursuit2.en, I18N.pursuit2.zh);

    $$("[data-setlang]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-setlang") === lang);
    });

    renderNav();
    initSpy();
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("brain:lang", { detail: lang }));
  }

  /* ================================================================
     SEARCH
     ================================================================ */
  function runSearch(q) {
    q = (q || "").trim().toLowerCase();
    var box = $("#results"), body = $("#resultsBody"), count = $("#searchCount");

    if (!q) {
      box.hidden = true; count.textContent = "";
      return;
    }
    box.hidden = false;

    var hits = SEARCH.filter(function (s) {
      return (s.en && s.en.toLowerCase().indexOf(q) >= 0) ||
        (s.zh && s.zh.toLowerCase().indexOf(q) >= 0);
    });

    count.textContent = hits.length || "";

    if (!hits.length) {
      body.innerHTML = '<div class="empty">' +
        biHtml("No label matches “" + esc(q) + "”.", "没有匹配“" + esc(q) + "”的标签。") + "</div>";
      return;
    }

    body.innerHTML = hits.slice(0, 120).map(function (h) {
      return '<button class="res" data-sel="' + (h.sel || "") + '">' +
        "<b>" + biHtml(esc(h.en), esc(h.zh)) + "</b>" +
        "<i>" + biHtml(esc(h.where.en), esc(h.where.zh)) + "</i></button>";
    }).join("") +
      (hits.length > 120 ? '<div class="empty">…+' + (hits.length - 120) + "</div>" : "");

    $$(".res", body).forEach(function (b) {
      b.addEventListener("click", function () {
        box.hidden = true;
        jumpTo(b.getAttribute("data-sel"));
      });
    });
  }

  function jumpTo(sel) {
    var el = sel ? $(sel) : null;
    if (!el) {
      var idxSec = $("#index");
      if (idxSec) idxSec.scrollIntoView({ behavior: "smooth" });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
    setTimeout(function () { el.classList.remove("flash"); }, 2400);
  }

  /* ================================================================
     SCROLL SPY / PROGRESS / REVEAL
     ================================================================ */
  var spyObserver = null;
  function initSpy() {
    if (spyObserver) spyObserver.disconnect();
    var links = $$("[data-nav]");
    var visible = {};
    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, bestV = 0;
      Object.keys(visible).forEach(function (id) { if (visible[id] > bestV) { bestV = visible[id]; best = id; } });
      links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === best); });
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, .25, .5, 1] });

    NAV.forEach(function (n) {
      var s = document.getElementById(n.id);
      if (s) spyObserver.observe(s);
    });
  }

  function initProgress() {
    var bar = $("#progress"), top = $("#toTop");
    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = p + "%";
      top.classList.toggle("show", window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
    $$(".reveal").forEach(function (e) { io.observe(e); });
  }

  /* ================================================================
     LIGHTBOX
     ================================================================ */
  function initLightbox() {
    var lb = $("#lightbox"), img = $("#lbImg"), closeBtn = $("#lbClose"), opener = null;
    var open = false;

    function focusables() {
      return $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', lb)
        .filter(function (el) { return el.offsetParent !== null; });
    }
    function show() {
      opener = document.activeElement;
      if (!img.getAttribute("src")) img.src = "assets/poster.jpg";
      lb.hidden = false; open = true;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function hide() {
      lb.hidden = true; open = false; document.body.style.overflow = "";
      if (opener && opener.focus) opener.focus();
    }

    $("#viewPoster").addEventListener("click", show);
    closeBtn.addEventListener("click", hide);
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lb-body")) hide();
    });
    document.addEventListener("keydown", function (e) {
      if (!open) return;
      if (e.key === "Escape") { hide(); return; }
      if (e.key !== "Tab") return;
      // keep focus inside the dialog while it is modal
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      var inside = lb.contains(document.activeElement);
      if (!inside) { e.preventDefault(); (e.shiftKey ? last : first).focus(); return; }
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ================================================================
     BOOT
     ================================================================ */
  function boot() {
    renderHero();
    renderNotice();
    renderOverview();
    renderNeuron();
    renderSenses();
    renderVision();
    renderDrives();
    renderMotor();
    renderCortex();
    renderIndex();
    renderAbout();
    applyLang();

    initProgress();
    initLightbox();

    // language switch
    $$("[data-setlang]").forEach(function (b) {
      b.addEventListener("click", function () {
        lang = b.getAttribute("data-setlang");
        applyLang();
      });
    });

    // search
    var s = $("#search"), t = null;
    s.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { runSearch(s.value); }, 110);
    });
    s.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { s.value = ""; runSearch(""); s.blur(); }
    });
    $("#resultsClose").addEventListener("click", function () { s.value = ""; runSearch(""); });

    // mobile menu
    var mb = $("#menuBtn"), nav = $("#topnav");
    mb.addEventListener("click", function () {
      var on = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", on ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }
    });

    // / keyboard shortcut
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== s) { e.preventDefault(); s.focus(); }
    });

    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
