/* ==========================================================
   Glonari Homes — Living With Glonari
   Pinned scenes on wide screens (.has-scenes, >=769px):
     1) first screen — "walking into the home": garden in bokeh with
        the word → the kitchen → the family at the table → a slow
        zoom, the shade and the copy (as heroScene() in how-it-works.js);
     2) Try Before You Buy — the gold line becomes a timeline.
   Not a scene: "Two ways to own" — the line splits into two paths
   drawn on scroll (ownBranches(), >=1101px, motion-safe);
   "When life changes" — a self-playing 3-scenario stage, not scrubbed (lifeStage(), pure JS, no GSAP).
     3) "Gia goes with you" — four views behind one window, the chat
        keeps its history (giaScene()).
   Planned (owner): "The bigger idea" — four scenes in total. Scrubbed timelines use fromTo only (from breaks
   on refresh).
   ========================================================== */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const doc = document.documentElement;

  /* When life changes (a pause, no pin, no GSAP): three scenarios play in turn.
     The end of the active timer bar (CSS animation `life-timer`, length --life-ms) advances the
     scene; steps, pill and timer all restart with .is-run, so CSS is the single clock.
     .is-paused (CSS) freezes every animation: off screen, and only while a finger is down (no hover pause).
     Reduced motion: no autoplay, no movement — manual switching only (instant).
     Without JS the CSS shows scene 1 complete (this function adds .is-on). */
  const LIFE_SCENE_MS = 4000; // how long one scenario is shown
  function lifeStage() {
    const stage = $("[data-life-stage]");
    if (!stage) return;
    const cards = $$(".liv-pc", stage);
    const tabs = $$(".liv-tab", stage);
    const dots = $$(".liv-dot", stage);
    const pill = $(".liv-pill", stage);
    const pillText = $(".liv-pill__t", stage);
    const status = $(".liv-stage__status", stage);
    const n = cards.length;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hold = new Set(["view"]); // reasons to pause (no hover); "view" is lifted once the stage is on screen
    let cur = 0;

    const sync = () => stage.classList.toggle("is-paused", hold.size > 0);
    const restart = () => {
      stage.classList.remove("is-run"); pill.classList.remove("is-run");
      if (rm.matches) return;
      void stage.offsetWidth; // let the animations reset
      stage.classList.add("is-run"); pill.classList.add("is-run");
    };
    const go = (i) => {
      cur = ((i % n) + n) % n;
      cards.forEach((c, k) => {
        const d = (k - cur + n) % n, was = c.dataset.pos;
        c.dataset.pos = d === 0 ? 0 : d === 1 ? 1 : -1;
        // a card crossing from one back position to the other passes behind the stack
        if (!rm.matches && was && was !== "0" && c.dataset.pos !== "0" && was !== c.dataset.pos) {
          c.classList.add("is-wrap"); setTimeout(() => c.classList.remove("is-wrap"), 900);
        }
      });
      [tabs, dots].forEach((list) => list.forEach((b, k) => (k === cur ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current"))));
      const text = cards[cur].dataset.gia;
      pillText.textContent = text; status.textContent = text;
      restart();
    };

    stage.style.setProperty("--life-ms", LIFE_SCENE_MS + "ms");
    stage.dataset.motion = rm.matches ? "off" : "on";
    stage.classList.add("is-on");
    sync();
    restart();
    rm.addEventListener("change", () => { stage.dataset.motion = rm.matches ? "off" : "on"; restart(); });

    stage.addEventListener("animationend", (e) => {
      if (e.animationName === "life-timer" && e.target.offsetParent) go(cur + 1);
    });
    [...tabs, ...dots].forEach((b) => b.addEventListener("click", () => go(+b.dataset.i)));

    const toggle = (why, on) => { on ? hold.add(why) : hold.delete(why); sync(); };
    stage.addEventListener("touchstart", () => toggle("touch", true), { passive: true });
    stage.addEventListener("touchend", () => { toggle("touch", false); restart(); }, { passive: true }); // after a touch the cycle starts the scene afresh
    stage.addEventListener("touchcancel", () => toggle("touch", false), { passive: true });

    // swipe on the photo stack
    const stack = $(".liv-stage__stack", stage);
    let x0 = null, y0 = 0;
    stack.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    stack.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => toggle("view", !en.isIntersecting), { threshold: .3 }).observe(stage);
    } else toggle("view", false);
  }
  lifeStage(); // before the GSAP guard below: needs no GSAP

  if (!window.gsap || !window.ScrollTrigger) { doc.classList.remove("scenes-pending"); return; }
  gsap.registerPlugin(ScrollTrigger);

  const scrubTo = (trigger) => ({ trigger, start: "top top", end: "bottom bottom", scrub: .6, invalidateOnRefresh: true });

  function heroScene() {
    const scene = $('[data-scene="liv-hero"]');
    if (!scene) return;
    const kitchen = $(".liv-hero__kitchen", scene);
    const family = $(".liv-hero__family", scene);

    gsap.timeline({ scrollTrigger: scrubTo(scene), defaults: { ease: "none" } })
      .fromTo($(".liv-hero__cue", scene), { opacity: 1 }, { opacity: 0, duration: .06 }, 0)
      // entering the home: the kitchen comes in over the garden
      .fromTo(kitchen, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: .3, ease: "power1.out" }, .04)
      // the family appears at the table, in front of the word
      .fromTo(family, { opacity: 0, yPercent: 3 }, { opacity: 1, yPercent: 0, duration: .2, ease: "power1.out" }, .36)
      // a slow shared zoom (same transform-origin, so the two tables stay on top of each other)
      .fromTo(kitchen, { scale: 1 }, { scale: 1.06, duration: .42, immediateRender: false }, .58)
      .fromTo(family, { scale: 1 }, { scale: 1.1, duration: .42, immediateRender: false }, .58)
      .fromTo($(".liv-hero__shade", scene), { opacity: 0 }, { opacity: 1, duration: .2 }, .62)
      .fromTo($$("[data-hcopy]", scene), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .16, stagger: .08 }, .7);
  }

  /* Try Before You Buy: a gold dot runs down the line; when it reaches a step, the step's
     card comes in and stays (y 20→0, scale .94→1). Prepare / Move In stay outlined;
     Live / Build / Decide then fill with colour and settle with a slight tilt and shift
     (the 1Password "A Vision of the Future" cards). Ends with all five cards, dot on Decide. */
  const TILT = { live: [-3, 12], build: [2.5, -10], decide: [-1.5, 14] }; // [rotation°, x px]
  function tbybScene() {
    const scene = $('[data-scene="liv-tbyb"]');
    if (!scene) return;
    const steps = $$(".liv-step", scene);
    const dot = $(".liv-steps__dot", scene);
    // the dot's top so that it sits on a step's ring (ring: top 23px + 3.5px radius; dot radius 6.5px)
    const dotY = (i) => () => $(".liv-step__label", steps[i]).offsetTop + 20;
    const at = (i) => .06 + i * .19;

    const tl = gsap.timeline({ scrollTrigger: scrubTo(scene), defaults: { ease: "none" } });
    tl.fromTo(dot, { y: dotY(0) }, { y: dotY(0), duration: .01 }, 0);
    steps.forEach((step, i) => {
      const card = $(".liv-step__card", step);
      const label = $(".liv-step__label", step);
      const t = at(i);
      if (i > 0) tl.fromTo(dot, { y: dotY(i - 1) }, { y: dotY(i), duration: at(i) - at(i - 1), immediateRender: false }, at(i - 1));
      tl.fromTo(label, { opacity: .4 }, { opacity: 1, duration: .05 }, t)
        .fromTo(card, { opacity: 0, y: 20, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: .07, ease: "power1.out" }, t);
      const kind = Object.keys(TILT).find((k) => card.classList.contains("liv-step__card--" + k));
      if (kind) {
        const cs = getComputedStyle(card);
        const bg = cs.backgroundColor, ink = cs.color;
        tl.fromTo(card,
          { backgroundColor: bg.replace("rgb(", "rgba(").replace(")", ", 0)"), borderColor: "rgba(244, 237, 226, .32)", color: "rgb(244, 237, 226)", rotation: 0, x: 0 },
          { backgroundColor: bg, borderColor: bg, color: ink, rotation: TILT[kind][0], x: TILT[kind][1], duration: .07, ease: "power2.out" }, t + .07);
      }
    });
    tl.to({}, { duration: .1 }); // hold the finished timeline before the pin releases

    /* The pinned stage is one screen tall with its content centred, so empty brown stays
       under the cards. "Two ways to own" subtracts it (--tbyb-tail) from its top padding:
       content → next eyebrow stays one --section-y (DESIGN-SYSTEM §5), not two. */
    const own = $("#ownership");
    const stage = $(".liv-tbyb__stage", scene);
    const grid = $(".liv-tbyb__grid", scene);
    const tail = () => {
      if (!own) return;
      const t = stage.getBoundingClientRect().bottom - grid.getBoundingClientRect().bottom;
      own.style.setProperty("--tbyb-tail", Math.max(0, Math.round(t)) + "px");
    };
    tail();
    ScrollTrigger.addEventListener("refreshInit", tail);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", tail);
      if (own) own.style.removeProperty("--tbyb-tail");
    };
  }

  /* Two ways to own (a pause, no pin): the gold line from TBYB runs down beside the heading
     and splits into two curves that reach the top centres of the two cards, ending in small
     rings. The curves draw with the scroll (pathLength="1", so the dash values don't depend
     on the geometry). Geometry is measured in .liv-own__stage with offset* (transform-free,
     so the reveal's translateY doesn't skew it) on every refresh and whenever a card changes
     size (ResizeObserver — this also follows the hover widening frame by frame). */
  function ownBranches() {
    const sec = $("#ownership");
    if (!sec) return () => {};
    const stage = $(".liv-own__stage", sec);
    const head = $(".liv-own__head", sec);
    const duo = $(".liv-own__duo", sec);
    const cards = $$(".liv-own__card", sec);
    const paths = $$(".liv-own__branch", sec);
    const rings = $$(".liv-own__ring", sec);

    const layout = () => {
      const tlx = parseFloat(getComputedStyle(sec).getPropertyValue("--tl-x")) || 0;
      const x0 = Math.round(tlx * stage.clientWidth) + .5;  // centre of the 1px CSS line
      const y0 = head.offsetTop + head.offsetHeight + 20;     // the split: just under the heading
      const y1 = duo.offsetTop;                               // top edge of the cards
      const ym = (y0 + y1) / 2;
      sec.style.setProperty("--own-stem", (stage.offsetTop + y0) + "px");
      cards.forEach((card, i) => {
        const cx = Math.round(card.offsetLeft + card.offsetWidth / 2) + .5;
        paths[i].setAttribute("d", `M${x0} ${y0} C${x0} ${ym} ${cx} ${ym} ${cx} ${y1}`);
        rings[i].setAttribute("cx", cx);
        rings[i].setAttribute("cy", y1);
      });
    };

    doc.classList.add("has-branches");
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(stage);
    cards.forEach((c) => ro.observe(c));
    ScrollTrigger.addEventListener("refresh", layout);

    gsap.timeline({
      scrollTrigger: { trigger: duo, start: "top 92%", end: "top 52%", scrub: .6, invalidateOnRefresh: true },
      defaults: { ease: "none" },
    })
      .fromTo(paths, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
      .fromTo(rings, { opacity: 0 }, { opacity: 1, duration: .15 }, .9);
    ScrollTrigger.refresh(); // .has-branches made the gap above the cards taller

    return () => {
      ro.disconnect();
      ScrollTrigger.removeEventListener("refresh", layout);
      sec.style.removeProperty("--own-stem");
      doc.classList.remove("has-branches");
    };
  }

  /* Gia goes with you: the room stays, the view behind the glass changes four times
     (city → suburb → sea → garden; each new view fades in over the last, scale 1.06→1),
     the place label follows, and for each place Gia types (the home page's three dots)
     and her message is added under the earlier ones. The list slides up so the newest
     message is at the bottom; at most 3 stay in view (the oldest fades as it leaves).
     The chat body's height (--gia-h) = the tallest run of 3 consecutive messages,
     measured on every refresh; the list offsets are function values (invalidateOnRefresh). */
  function giaScene() {
    const scene = $('[data-scene="liv-gia"]');
    if (!scene) return () => {};
    const SHOW = 3;
    const views = $$(".liv-gia__view", scene);
    const places = $$(".liv-gia__place-i", scene);
    const items = $$(".liv-gia__item", scene);
    const body = $(".liv-gia__body", scene);
    const list = $(".liv-gia__msgs", scene);
    let H = 0;

    const bottom = (i) => items[i].offsetTop + items[i].offsetHeight;
    const fit = () => {
      H = 0;
      items.forEach((_, i) => { H = Math.max(H, bottom(i) - items[Math.max(0, i - SHOW + 1)].offsetTop); });
      body.style.setProperty("--gia-h", Math.ceil(H) + "px");
    };
    const yAt = (i) => -Math.max(0, Math.ceil(bottom(i) - H));
    fit();
    ScrollTrigger.addEventListener("refreshInit", fit);

    const tl = gsap.timeline({ scrollTrigger: scrubTo(scene), defaults: { ease: "none" } });
    tl.fromTo($(".liv-gia__zoom", scene), { scale: 1 }, { scale: 1.03, duration: 4.4 }, 0);
    items.forEach((item, i) => {
      const typing = $(".msg--typing", item);
      const msg = $(".msg--gia", item);
      tl.fromTo(views[i], { opacity: i ? 0 : 1, scale: 1.06 }, { opacity: 1, scale: 1, duration: .5, ease: "power1.out" }, i);
      if (i) {
        tl.fromTo(places[i - 1], { opacity: 1 }, { opacity: 0, duration: .12, immediateRender: false }, i + .04)
          .fromTo(places[i], { opacity: 0 }, { opacity: 1, duration: .12 }, i + .14)
          .fromTo(list, { y: () => yAt(i - 1) }, { y: () => yAt(i), duration: .15, immediateRender: false }, i + .3);
      }
      if (i >= SHOW) tl.fromTo(items[i - SHOW], { opacity: 1 }, { opacity: 0, duration: .12, immediateRender: false }, i + .3);
      tl.fromTo(typing, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .1 }, i + .4)
        .fromTo(typing, { opacity: 1 }, { opacity: 0, duration: .06, immediateRender: false }, i + .7)
        .fromTo(msg, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .14 }, i + .72);
    });
    tl.to({}, { duration: .4 }); // hold the garden and the full history before the pin releases

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", fit);
      body.style.removeProperty("--gia-h");
    };
  }

  const mm = gsap.matchMedia();
  mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
    doc.classList.add("has-scenes");
    heroScene();
    const tbybOff = tbybScene() || (() => {});
    const giaOff = giaScene();
    doc.classList.remove("scenes-pending");
    ScrollTrigger.refresh();
    return () => { tbybOff(); giaOff(); doc.classList.remove("has-scenes"); };
  });
  // the two ownership paths: only where the line stands at --tl-x beside the text (>=1101px)
  mm.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => ownBranches());
  doc.classList.remove("scenes-pending");
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
