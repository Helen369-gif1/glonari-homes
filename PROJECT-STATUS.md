# Glonari Homes — Project Status

Last updated: 2026-11-05. Update this file after every significant step so a new chat (on either computer) can resume without re-reading the whole conversation history. Keep entries short: decisions, what changed, open questions, next step — not a transcript.

## Done

- Home page (`site/index.html`) — all 7 sections and the footer are built: Hero, The problem, What a Glonari Home is, The economics, Meet Gia, Try Before You Buy, Final CTA.
- Checked at desktop 1440×900 and mobile 375px. **Not yet checked:** `prefers-reduced-motion: reduce` in a real browser.
- Documentation reorganized (2026-11-05): `CLAUDE.md`, `PROJECT-STATUS.md`, `DESIGN-SYSTEM-HOMES.md`, `SITE-STRUCTURE.md`, `README.md` now each cover one concern instead of one long `CLAUDE.md`. See `DESIGN-SYSTEM-HOMES.md` for the approved visual system (built from the live home page, with structural rules borrowed from Global Dream Light; no code was changed in this pass).
- The problem section (2026-11-05) — the old permanent side-by-side before/after photos were replaced with a scroll-scrubbed wipe reveal (right to left), adapted from the classic GSAP image-comparison technique (CodePen `ajdija/GRvJGpd`), built on the site's existing sticky-scene pattern rather than GSAP's own `pin`. Captions crossfade independently of the wipe so they never overlap mid-transition. Mobile/reduced-motion fallback is a simple stacked before/after. Owner-approved after review. Markup/CSS/JS: `site/index.html`, `site/css/home.css`, `site/js/home.js` (`problemScene()`).
- Two follow-up polish fixes, owner-approved (2026-11-05): reduced the oversized empty gap above the cards in the "What a Glonari Home is" pinned scene (`.has-scenes .formula__stage` now aligns to the top with a compact offset instead of centering in the full 100svh stage); adjusted the "after" photo's `object-position` in the problem wipe so the couple's heads aren't cropped against the top edge on desktop.
- Problem wipe, second fix (2026-11-05): the fixed header was still covering the man's head. In the pinned scene both photos now start below the header (`inset: var(--header-h) 0 0`), and the "after" photo is anchored to its top edge (`object-position: 50% 0%`). The header is always solid and never hides over this section, so no gap shows.

## In progress

- Nothing is mid-build right now. The home page is awaiting the owner's review before the next page starts.

## Not started

Five stub pages (shared header/footer + a one-line placeholder only), in the build order from `Glonari Homes — Website Architecture & Copy v2.docx`:

1. How It Works
2. Living With Glonari
3. Already Own a Home?
4. Find Your Home
5. FAQs

See `SITE-STRUCTURE.md` for each page's planned sections.

## Open questions

- Try Before You Buy captions ("Move in", "Live and build", "Decide") were written by Claude — need the owner's confirmation.
- Footer links still pointing to `#`: About Glonari, Global Dream Journey, Member Qualification, Contact, Member Login, Privacy & Your Data, Legal & Disclosures.
- Privacy answer on selling personal data — not finalized (from the architecture doc's open-items list).
- Global Dream Journey link and its footer placement — not finalized.
- Whether/when to replace the `--gp-*` (Glonari Pulse) tokens currently used in the footer and focus states with dedicated `--gh-dark-*` tokens — see `DESIGN-SYSTEM-HOMES.md` §3.4. Decision pending; not yet scheduled as a task.
- From the architecture doc's "items to confirm before publishing": GLO vs. HOME as the credential name, variable-share wording for Home Business payouts, the two-purchase-paths framing, the 10-year protected occupancy figure, and the notice period for moving between Glonari Homes.

## Next step

Owner reviews the home page and sends changes. After that: build the remaining pages in the order listed above, each following `DESIGN-SYSTEM-HOMES.md` and the section list in `SITE-STRUCTURE.md`.

## How to resume on another computer

1. Read `CLAUDE.md`.
2. Read this file (`PROJECT-STATUS.md`).
3. Read `DESIGN-SYSTEM-HOMES.md` and `SITE-STRUCTURE.md`.
4. Run the site locally — see `README.md`.
