/* ==========================================================
   Glonari Homes — How It Works page
   1) Hero scene: pinned on wide screens (.has-scenes), the photo zooms
      and the copy leaves as you scroll. Same pattern as home.js.
   2) Chapter index: highlights the chapter nearest the screen centre;
      runs everywhere (phones and reduced motion included).
   ========================================================== */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const scrubTo = (trigger) => ({ trigger, start: "top top", end: "bottom bottom", scrub: .6, invalidateOnRefresh: true });

  function heroScene() {
    const scene = $('[data-scene="hiw-hero"]');
    if (!scene) return;
    const img = $(".hiw-hero__img", scene);
    const copy = $$(".hiw-hero__in", scene);

    gsap.timeline({ scrollTrigger: scrubTo(scene), defaults: { ease: "none" } })
      .fromTo(img, { scale: 1 }, { scale: 1.08, duration: 1 }, 0)
      .fromTo(copy, { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: .5, stagger: .05 }, 0);
  }

  const mm = gsap.matchMedia();
  mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
    document.documentElement.classList.add("has-scenes");
    heroScene();
    ScrollTrigger.refresh();
    return () => document.documentElement.classList.remove("has-scenes");
  });
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();

(() => {
  "use strict";
  const toc = document.querySelector("[data-hiw-toc]");
  if (!toc) return;
  const items = [...toc.querySelectorAll("li")];
  const counter = toc.querySelector("[data-hiw-toc-current]");
  const target = (li) => document.getElementById(li.querySelector("a").getAttribute("href").slice(1));

  items.forEach((li) => {
    if (!target(li)) li.setAttribute("data-pending", ""); // chapter not on the page yet
  });

  const setActive = (li) => {
    items.forEach((x) => x.classList.remove("is-active"));
    li.classList.add("is-active");
    if (counter) counter.textContent = li.querySelector(".hiw-toc__n").textContent;
  };

  const sections = items.map((li) => ({ li, el: target(li) })).filter((s) => s.el);

  setActive(items[0]); // 01 is active until the visitor scrolls

  if (!("IntersectionObserver" in window)) return;

  // Hide the index while the footer is visible: it would sit on the legal disclosure.
  const footer = document.querySelector(".site-footer");
  if (footer) {
    new IntersectionObserver(([en]) => toc.classList.toggle("is-away", en.isIntersecting)).observe(footer);
  }

  if (!sections.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const i = sections.findIndex((s) => s.el === en.target);
      if (i < 0) return;
      if (en.isIntersecting) setActive(sections[i].li);
      // Scrolling back up: a chapter dropping below the centre band hands over to the one
      // before it (or to 01 when the visitor is back on the hero).
      else if (en.boundingClientRect.top > 0) setActive(i > 0 ? sections[i - 1].li : items[0]);
    });
  }, { rootMargin: "-40% 0px -40% 0px" }); // active = chapter nearest the screen centre
  sections.forEach((s) => io.observe(s.el));
})();
