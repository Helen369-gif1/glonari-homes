# Glonari Homes — Project Status

Last updated: 2026-11-06. Update this file after every significant step so a new chat (on either computer) can resume without re-reading the whole conversation history. Keep entries short: decisions, what changed, open questions, next step — not a transcript.

## Done

- Home page (`site/index.html`) — all 7 sections and the footer are built: Hero, The problem, What a Glonari Home is, The economics, Meet Gia, Try Before You Buy, Final CTA.
- Checked at desktop 1440×900 and mobile 375px. **Not yet checked:** `prefers-reduced-motion: reduce` in a real browser.
- Documentation reorganized (2026-11-05): `CLAUDE.md`, `PROJECT-STATUS.md`, `DESIGN-SYSTEM-HOMES.md`, `SITE-STRUCTURE.md`, `README.md` now each cover one concern instead of one long `CLAUDE.md`. See `DESIGN-SYSTEM-HOMES.md` for the approved visual system (built from the live home page, with structural rules borrowed from Global Dream Light; no code was changed in this pass).
- The problem section (2026-11-05) — the old permanent side-by-side before/after photos were replaced with a scroll-scrubbed wipe reveal (right to left), adapted from the classic GSAP image-comparison technique (CodePen `ajdija/GRvJGpd`), built on the site's existing sticky-scene pattern rather than GSAP's own `pin`. Captions crossfade independently of the wipe so they never overlap mid-transition. Mobile/reduced-motion fallback is a simple stacked before/after. Owner-approved after review. Markup/CSS/JS: `site/index.html`, `site/css/home.css`, `site/js/home.js` (`problemScene()`).
- Two follow-up polish fixes, owner-approved (2026-11-05): reduced the oversized empty gap above the cards in the "What a Glonari Home is" pinned scene (`.has-scenes .formula__stage` now aligns to the top with a compact offset instead of centering in the full 100svh stage); adjusted the "after" photo's `object-position` in the problem wipe so the couple's heads aren't cropped against the top edge on desktop.
- 2026-11-06: enlarged the "What a Glonari Home is" cards on desktop at the owner's request (`--card` from `min(23vw, 33svh, 320px)` to `min(25vw, 46svh, 420px)`) to fill the empty space in the pinned stage. Section padding unchanged; mobile card size unchanged.
- 2026-11-06: removed the doubled gap between the problem statement and the formula scene on desktop (`.has-scenes .formula { padding-top: 0 }` — the pinned stage's own header-clearing padding already provides the section spacing). Gap went from ~400px to ~240px at 1747px wide; mobile unchanged.
- Problem wipe, second fix (2026-11-05): the fixed header was still covering the man's head. In the pinned scene both photos now start below the header (`inset: var(--header-h) 0 0`), and the "after" photo is anchored to its top edge (`object-position: 50% 0%`). The header is always solid and never hides over this section, so no gap shows.
- Try Before You Buy (2026-11-05): the three photos were replaced with short looping videos (`home-06-tbyb-1/2/3.mp4`). The videos are compressed with ffmpeg (no audio, CRF 26, faststart; about 80% smaller than the originals) and play with autoplay, muted, loop, playsinline and no controls. The `home-06-tbyb-N-1586.webp` images stay as poster/fallback. CSS: the `.tbyb__frame img` rules now also cover `video` (plus `display: block; height: auto` so the frame keeps its 1586/992 ratio). Checked at 1440px (horizontal scroll and progress bar work) and 375px.
- The economics (2026-11-06): the house image was replaced with a fuller, symmetric composition (the old one was cropped on the right). New source `home-04-house-cutout-new.png` (1672×941, transparent) → `home-04-house-cutout-1100.webp` / `-2000.webp` (ffmpeg libwebp, q 85, alpha kept); the `<img class="econ__house">` size attributes changed to 2000×1126 (ratio 1.78:1). The previous files are kept as `home-04-house-cutout-1100-old.webp` / `-2000-old.webp` for history. Checked at 1440px (econScene works as before: house rises, numbers come up from behind the roof) and 375px. Follow-up: because the new image includes the whole house plus transparent margins, the house looked smaller, so the pinned width was raised from `min(84vw, 102svh)` to `min(96vw, 116svh)` (`.has-scenes .econ__house` in `home.css`; `sizes` updated to 96vw). Mobile size unchanged.
- Logo (2026-11-06): the text wordmark "Glonari Homes" in the header and footer of all 6 pages was replaced with the graphic logo `site/assets/images/logo-glonari-homes.webp` (540×170, lossless, transparent margins cropped, from the source `logo glonari homes .png`, which is kept). Header link keeps its `aria-label`, so the image has `alt=""`; the footer image has `alt="Glonari Homes"`. CSS: `.brand img { height: calc(var(--header-h) * 0.53) }` for ≤1100px (≈34px on mobile). On desktop (min-width 1101px) the owner asked for a larger logo, so there `--header-h` is 92px (was 76px) and `.brand img` is 66px; this also applies to the footer logo. Removed the text-only `.brand span` and header `text-shadow` rules. Checked at 1440px and 375px: header over hero, solid header, open mobile menu, footer, and the home page's pinned scenes with the taller header.
- The economics, centering fix (2026-11-06): the pinned house sat off-centre to the left because it was shifted twice (CSS `transform: translateX(-50%)` plus GSAP `xPercent: -50` in econScene). Now `.has-scenes .econ__house` is centred with `left: 0; right: 0; margin-inline: auto` (no transform), and `home.js` animates only `yPercent`. Not yet checked in the browser (Playwright was busy).
- Header/footer refactor (2026-11-06): the header and footer now live once in `site/partials/header.html` / `footer.html` and are copied into all 6 pages between `<!-- partial:header -->` / `<!-- partial:footer -->` markers by `python scripts/sync-partials.py` (no npm, no build step; GitHub Actions still uploads `site/` as is). The hand-written `aria-current="page"` was removed from every page; `site/js/main.js` ("Active nav link") now sets it from the URL. No visible change: the script reported every page "already in sync", and a headless Chrome check confirmed the active item on all 6 pages (and on `/`), the header/footer at 1440px and 375px, and the mobile menu.

## In progress

- How It Works (`site/how-it-works.html`, 2026-11-06) — the stub was replaced with the real top of the page:
  - Hero: photo `how-00-terrace-family` with a left-side gradient veil (same img + veil recipe as `.cta`, no pin), copy "How a Glonari Home Works" / "A home, a personal AI and a real business, working together for you." The section has `data-hero`, so the header is transparent over it like on the home page. Desktop: copy sits on the sky at the left, inside the page grid (the width limit is on the copy's children so the `.container` does not centre it onto the family). ≤768px: the photo is framed on the family (`object-position: 64% 50%`) and the copy moves to the bottom over a bottom-up veil.
  - Section 1 "The Four Parts" and Section 2 "Where the value comes from": 4 photo cards each (4:5, rounded), copy verbatim from Architecture & Copy v2. Grid: 4 columns desktop, 2 at ≤1100px, 1 at ≤480px.
  - Sections 3–8: one short "Coming next" placeholder until their images arrive.
  - New page stylesheet `site/css/how-it-works.css`, linked after `main.css`.
  - Images converted to WebP with ffmpeg (q 82): `how-00-terrace-family-2560/-1600.webp`, `how-01-{house,gia,business,connections}-1200.webp` (1200×1500), `how-02-{savings,partners,referrals,knowledge}-1200.webp` (actually 1122×1402 — the sources are that size; the `-1200` suffix kept for consistency, `<img>` sizes use the real dimensions). PNG/JPG masters kept. `how-00-glo-hall.png`, `how-00-market-cards.png`, `how-00-system-circle.png` are not used yet (likely for sections 5–8).
  - Checked at 1440px, 900px and 375px: hero readable, grids correct, all reveal blocks animate in, active menu item "How It Works", no horizontal scroll. At 900px (narrow portrait tablet) the mother is partly cut off at the right edge of the hero — acceptable for now.
  - Awaiting the owner's review. Card images have empty `alt` (decorative, titles carry the meaning).

## Not started

Four stub pages (shared header/footer + a one-line placeholder only), in the build order from `Glonari Homes — Website Architecture & Copy v2.docx`:

1. Living With Glonari
2. Already Own a Home?
3. Find Your Home
4. FAQs

(How It Works sections 3–8 also remain — see "In progress".)

See `SITE-STRUCTURE.md` for each page's planned sections.

## Open questions

- Try Before You Buy captions ("Move in", "Live and build", "Decide") were written by Claude — need the owner's confirmation.
- Footer links still pointing to `#`: About Glonari, Global Dream Journey, Member Qualification, Contact, Member Login, Privacy & Your Data, Legal & Disclosures.
- Privacy answer on selling personal data — not finalized (from the architecture doc's open-items list).
- Global Dream Journey link and its footer placement — not finalized.
- Whether/when to replace the `--gp-*` (Glonari Pulse) tokens currently used in the footer and focus states with dedicated `--gh-dark-*` tokens — see `DESIGN-SYSTEM-HOMES.md` §3.4. Decision pending; not yet scheduled as a task.
- From the architecture doc's "items to confirm before publishing": GLO vs. HOME as the credential name, variable-share wording for Home Business payouts, the two-purchase-paths framing, the 10-year protected occupancy figure, and the notice period for moving between Glonari Homes.

## Next step

Owner reviews the How It Works hero + sections 1–2 and sends images for sections 3–8. Then: finish How It Works, and build the remaining pages in the order listed above, each following `DESIGN-SYSTEM-HOMES.md` and the section list in `SITE-STRUCTURE.md`.

## How to resume on another computer

1. Read `CLAUDE.md`.
2. Read this file (`PROJECT-STATUS.md`).
3. Read `DESIGN-SYSTEM-HOMES.md` and `SITE-STRUCTURE.md`.
4. Run the site locally — see `README.md`.
