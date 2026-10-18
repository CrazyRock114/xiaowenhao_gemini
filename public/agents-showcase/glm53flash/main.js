/* ══════════ 你的高科技大脑 · main.js ══════════ */
(function () {
  "use strict";

  /* ── 语言切换：双语 / 中文 / EN ── */
  var body = document.body;
  var langBtns = document.querySelectorAll(".lang-switch button");

  function setLang(lang) {
    body.className = "lang-" + lang;
    langBtns.forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    try { localStorage.setItem("brain-lang", lang); } catch (e) {}
  }
  langBtns.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });
  try {
    var saved = localStorage.getItem("brain-lang");
    if (saved && ["both", "zh", "en"].indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ── 滚动入场动画（IO + 兜底扫描，保证内容必定可见） ── */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function sweepReveal() {
    var vh = window.innerHeight;
    revealEls = revealEls.filter(function (el) {
      if (el.classList.contains("in")) return false;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > -40) el.classList.add("in");
      return !el.classList.contains("in");
    });
  }
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(function (el) { revealObs.observe(el); });
  window.addEventListener("scroll", sweepReveal, { passive: true });
  window.addEventListener("resize", sweepReveal);
  window.addEventListener("load", sweepReveal);
  sweepReveal();
  var sweepTimer = setInterval(function () {
    sweepReveal();
    if (!revealEls.length) clearInterval(sweepTimer);
  }, 900);

  /* ── 导航高亮当前章节 ── */
  var navLinks = document.querySelectorAll("#mainNav a");
  var sections = [];
  navLinks.forEach(function (a) {
    var sec = document.querySelector(a.getAttribute("href"));
    if (sec) sections.push({ link: a, sec: sec });
  });
  var navObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      sections.forEach(function (s) {
        s.link.classList.toggle("active", s.sec === en.target);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(function (s) { navObs.observe(s.sec); });

  /* ── 交互脑图：悬停提示 + 点击跳转 ── */
  var tip = document.getElementById("mapTip");
  var tipDefault = tip ? tip.innerHTML : "";
  var figure = document.querySelector(".brainmap");

  document.querySelectorAll("#brainSvg .rgn").forEach(function (rgn) {
    function go() {
      var target = document.querySelector(rgn.dataset.goto);
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.28;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      target.classList.add("flash");
      setTimeout(function () { target.classList.remove("flash"); }, 1900);
    }
    rgn.addEventListener("click", go);
    rgn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
    rgn.addEventListener("mouseenter", function () {
      if (!tip) return;
      tip.innerHTML = '<span class="zh">📍 ' + rgn.dataset.zh +
        '</span><span class="en en-i">📍 ' + rgn.dataset.en + "</span> — <span class='zh'>点击跳转</span><span class='en en-i'>click to jump</span>";
      figure && figure.classList.add("tip-hot");
    });
    rgn.addEventListener("mouseleave", function () {
      if (tip) tip.innerHTML = tipDefault;
      figure && figure.classList.remove("tip-hot");
    });
  });

  /* ── 动作电位演示 ── */
  var REST = -70, THRESH = 20;
  var inDop = document.getElementById("inDop"),
      inGlu = document.getElementById("inGlu"),
      inGaba = document.getElementById("inGaba"),
      inOth = document.getElementById("inOth");
  var stage = document.getElementById("apStage");
  var fires = 0, wasFiring = false;

  function out(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }

  function apUpdate() {
    var d = +inDop.value, g = +inGlu.value, b = +inGaba.value, o = +inOth.value;
    out("vDop", d); out("vGlu", g); out("vGaba", b); out("vOth", o);
    var sum = d + g - b + o;
    var mv = REST + sum;
    var sign = function (n) { return n < 0 ? "−" + Math.abs(n) : (n > 0 ? "+" + n : "0"); };

    var sumTxt = sign(sum) + " mV";
    ["apSum", "apSumEn"].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = sumTxt; });
    var zh = document.getElementById("apCalcZh"), en = document.getElementById("apCalcEn");
    if (zh) zh.textContent = " · 膜电位 = −70 " + (sum < 0 ? "− " + Math.abs(sum) : "+ " + sum) +
                             " = " + sign(mv) + " mV";
    if (en) en.textContent = " · membrane = −70 " + (sum < 0 ? "− " + Math.abs(sum) : "+ " + sum) +
                             " = " + sign(mv) + " mV";

    var fill = document.getElementById("apFill");
    if (fill) {
      var pct = Math.max(0, Math.min(100, ((mv - -80) / 130) * 100));
      fill.style.width = pct + "%";
    }

    var firing = mv > THRESH;
    if (stage) stage.classList.toggle("firing", firing);
    if (firing && !wasFiring) {
      fires++;
      out("apFires", fires); out("apFiresEn", fires);
    }
    wasFiring = firing;

    var mz = document.getElementById("msgZh"), me = document.getElementById("msgEn");
    if (mz && me) {
      if (firing) {
        mz.textContent = "⚡ 越过 +20 mV 阈值——动作电位触发，信号沿轴突冲出！";
        me.textContent = "⚡ Past the +20 mV threshold — action potential fired, signal racing down the axon!";
      } else if (mv === THRESH) {
        mz.textContent = "恰好抵达 +20 mV 阈值：再增加 1 mV 兴奋输入就放电！";
        me.textContent = "Right at the +20 mV threshold — one more millivolt of excitation and it fires!";
      } else if (sum > 0) {
        mz.textContent = "有兴奋输入但未达阈值（还差 " + (THRESH - mv) + " mV）：神经元整合中……";
        me.textContent = "Excited but sub-threshold (" + (THRESH - mv) + " mV short): the neuron keeps integrating…";
      } else {
        mz.textContent = "抑制占上风：神经元保持静默（膜电位 " + sign(mv) + " mV）。拉高兴奋输入试试。";
        me.textContent = "Inhibition wins: the neuron stays silent (membrane " + sign(mv) + " mV). Raise the excitatory sliders.";
      }
    }
  }
  [inDop, inGlu, inGaba, inOth].forEach(function (s) {
    if (s) s.addEventListener("input", apUpdate);
  });
  apUpdate();
})();
