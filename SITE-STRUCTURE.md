# Glonari Homes — Site Structure

Page list, navigation, and per-page sections. Approved English copy for each section lives in `Glonari Homes — Website Architecture & Copy v2.docx` — this file does not duplicate it, only the structure. Visual rules live in `DESIGN-SYSTEM-HOMES.md`. Build status lives in `PROJECT-STATUS.md`.

## Navigation (as built, every page)

- **Header nav:** Home · How It Works · Living With Glonari · Already Own a Home? · FAQs
- **Header CTA** (always visible, not in the nav list): Find My Glonari Home → `find-your-home.html`
- **Footer columns:**
  - *Explore* — How It Works, Living With Glonari, Already Own a Home?, Find Your Home, FAQs
  - *Glonari* — About Glonari, Global Dream Journey, Member Qualification, Contact, Member Login (all still `#` — not finalized, see `PROJECT-STATUS.md`)
  - *Legal* — Privacy & Your Data, Legal & Disclosures (both still `#`)
- **Footer disclosure** (verbatim, every page): *"All figures are illustrative. Glonari Homes is in development and terms may change. Home Business results are not guaranteed, are not passive income and depend on member participation and program terms. GLO is a membership and access credential, not rent, a property interest or a source of income. This site is not an offer to sell, lease or finance any property. Glonari is not a bank."*

`find-your-home.html` is reachable from the header CTA, the footer, and in-page CTAs — it is intentionally not a top-level nav item.

## Visitor journey (from the architecture doc)

Each page answers one visitor question:

| Page | Visitor's question | What they leave with |
|---|---|---|
| Home | Why would I want this? | A home that costs less and builds toward something |
| How It Works | How can that possibly work? | The four parts, my role, where the money comes from |
| Living With Glonari | What is life like, and where can it lead? | Security, flexibility, a path to ownership |
| Already Own a Home? | Can I get this where I live now? | The Home Module and how to join the waitlist |
| Find Your Home | What do I qualify for? | A first conversation with Gia |
| FAQs | What about...? | Short, honest answers |

Intended reading order: Home → How It Works → Living With Glonari → Find Your Home, with FAQs catching everything else and homeowners branching to Already Own a Home? from the menu.

## Pages

### 1. Home — `site/index.html` — ✅ built

1. Hero
2. The problem
3. What a Glonari Home is
4. The economics, simply
5. Meet Gia
6. Try first, decide later (Try Before You Buy™)
7. Final call to action

### 2. How It Works — `site/how-it-works.html` — ⏳ partly built

Page styles: `site/css/how-it-works.css`. Sections 3–8 are a one-block placeholder until their images arrive.

- Hero (built) — pinned scene on the terrace family photo (zoom + copy out on scroll), copy "How a Glonari Home Works"
- Fixed chapter index 01–08 (compact "01 / 08" at ≤1100px); chapter anchors `#ch-01`…`#ch-08`
1. The four parts (built)
2. Where the value comes from (built)
3. What participation means
4. How results work
5. GLO: the power behind Gia
6. Your monthly statement
7. Privacy
8. The whole system

### 3. Living With Glonari — `site/living-with-glonari.html` — ⏳ stub only

Planned sections:

- Hero
1. Security
2. Try Before You Buy™
3. Two ways to own
4. When life changes
5. Gia goes with you
6. The journey before and after
7. The bigger idea

### 4. Already Own a Home? — `site/already-own-a-home.html` — ⏳ stub only

Planned sections:

- Hero
1. What Gia can do in your home
2. Module vs. full Glonari Home
3. Status and CTA

### 5. Find Your Home — `site/find-your-home.html` — ⏳ stub only

Planned sections:

- Hero
1. Conversation with Gia
2. Your Glonari Home journey
3. Illustrative home card

### 6. FAQs — `site/faqs.html` — ⏳ stub only

Planned categories:

- The basics
- Money
- GLO
- Living and owning
- Privacy

## Cross-page links already referenced from the home page

- `how-it-works.html` (plain, and `#value` anchor)
- `living-with-glonari.html#ownership`
- `already-own-a-home.html`
- `find-your-home.html` (plain, and `#qualify` anchor)

When each stub page is built, keep these anchors (`#value`, `#ownership`, `#qualify`) or update the home page links to match the final section IDs.
