# Acceler8zone landing page — framework

*Every section of the page, top to bottom, named the way the page's code names it. Use the code name when you assign an iteration. "Done" shows what revision 3 changed; the last column is yours to fill in.*

**Page:** `variants/variant-A-clay-and-ink/index.html` (revision 3) · earlier revisions beside it: `index-r2.html`, `index-r1.html` · **Repository:** AndjayDev/A8Z_LandingPage_Nov2026

---

## 1 · Sections

| # | Section (code name) | What the visitor sees (verbatim) | Elements inside (code names) | Dormant content (kept, not shown) | Done in revision 3 | Your iteration |
|---|---|---|---|---|---|---|
| 1 | `mast` | Acceler8zone · andjay@acceler8zone.com | `wordmark` (left) · `mast-mid` (empty) · `mast-right` (e-mail) · progress line along the bottom edge | `mast-mid`: an empty centre slot | Both elements twice as large (logo 34 px, e-mail 28 px, bar 88 px high). On phones 24 px and 15 px, so both still fit one line | |
| 2 | `hero` | We introduce companies / that *have a reason to talk.* | `hero-statement` (now the page headline) · `hero-row` · `hero-axis` · `strip` (details in table 2) | "Research & Introductions" (`dormant-hero-title`) · previous headline "We find your next customers and *business opportunities.*" (`dormant-hero-headline`) · `hero-eyebrow`: no text yet | "Research & Introductions" taken out of the hero; SUPPLY ——•—— DEMAND moved onto the top of the strip | |
| 3 | `money` | On strategic introductions. | `money-grid` (heading, `lede`, memo link, `money-photo`) · `results` (6 figures) · `clients` (moving name strip, "Delivered with MyoProcess.com") | `money-photo`: Andjay's photo is missing; a "Photo" placeholder shows | "Read Andjay and Amelia's memo →" opens On_Strategic_Introductions_250.md in the pop-up | |
| 4 | `record` | Client results · 9 | `record-head` (heading + `filters`) · `lede` · `wall` (9 `stone` cards + 1 `stone cta`) | 7 business studies: Angie Nola Maids · Tetra Films · Clean-Seas West Virginia · RESPILON · Elate Staffing · FabuLingua · HelpCare AI | Accent now sky-950 | |
| 5 | `story` (pop-up) | Case cards: What they needed · What we brought · What it was worth. Now also the doors pop-ups and the memos | `story-head` · title · `figline` · three parts · `memo` (memo view) | — | Carries the doors pop-ups, both short memos and the strategic-introductions memo | |
| 6 | `service` | How we work | three numbered steps | — | — | |
| 7 | `doors` | 1 · Win customers / Matching customers for your business. · 2 · Open doors / Access deals and partnerships. | `duo`, two cards; each "Find … →" opens its pop-up; the pop-up holds "Read the short memo →" and the e-mail link | doors.md line 37 "Stop paying for attention. Start stepping into verified conversations." (marked `~~` in your file) | Content from doors.md, verbatim | |
| 8 | `teach` | Acceler8zone | `teach-grid` (`lede`, `teach-links`) · `video` | `teach-strip`: no figures yet · `video-cap`: no text yet | — | |
| 9 | `people` | Who you're working with | `people-head` · `team` (2 `person` cards) | Both team photos are missing; the "m" mark shows | — | |
| 10 | `contact` | Let's talk business · andjay@acceler8zone.com | e-mail link · line · `alt` ("Prefer a call? Book one.") | — | — | |
| 11 | `footer` | Acceler8zone · Amelia · Singapore · Andjay · Georgia · Remote · © 2026 | links: Memorandum · Research · LinkedIn | — | — | |
| 12 | `fp` (toolbox, review only) | "Aa · Type & colour" button, bottom left | presets · accent colour · 8 text roles · your own fonts · hero left margin · "Your choice as CSS" | Not part of the finished page; removed once the choices are made | Rebuilt: colour for every text role, sizes typed in pixels, font upload | |

---

## 2 · The `hero` section, line by line

| Line | Code name | Text (verbatim) | Look now | Your iteration |
|---|---|---|---|---|
| 1 | `hero-statement` | We introduce companies / that *have a reason to talk.* | Instrument Serif, 66 px on a wide screen; "have a reason to talk." italic in sky-950; 20 px left margin | |
| 2 | `hero-row` | We find the right people, open new conversations, and help you win more business. · See the results ↓ · Tell us what you're looking for → | unchanged | |
| 3 | `hero-axis` | SUPPLY ——•—— DEMAND | Sits where the strip's upper line was. SUPPLY starts at the line's left end, DEMAND ends at its right end. 2 px line, sky-950 dot, 3 rings; 10 s of motion, 2 s of rest | |
| 3a | `axis-end` | SUPPLY · DEMAND | News Cycle Bold, upper case | |
| 3b | `axis-track` · `axis-dot` · `axis-radar` | — | line in two halves with travelling signals · centre dot · 3 rings of 2 px | |
| 4 | `strip` | $17,000,000 · $1 billion+ · 16 · 13 (with their labels) | its old 1 px top line is gone; the first figure is sky-950 | |

---

## 3 · The toolbox (`fp`), text roles

| Role | What it covers |
|---|---|
| Hero statement | the headline |
| Supply / Demand | the two words on the strip |
| Top line · logo and e-mail | the `mast` |
| Section headings | all serif headings, card headlines, the big contact e-mail |
| Body text | paragraphs everywhere, the footer |
| Figures | the numbers in `strip`, `results`, cards and pop-ups |
| Small labels | the small upper-case lines |
| Links and buttons | the "… →" links and the filter buttons |

Each role has font, weight, width (only for fonts that have one), size (slider, or type the pixels), colour (picker or hex) and "Reset this role". The size you type is for the first element of the role; the rest of the role scales with it.

---

## 4 · Decisions waiting

| # | Where | The question | Recommended | What it converts |
|---|---|---|---|---|
| 1 | `hero` ▸ `hero-statement` | With the title gone, the statement stands alone at 66 px. Raise it to the old headline size (108 px)? | Try 90 px in the toolbox first | A first screen that carries its weight |
| 2 | `doors` ▸ doors.md line 37 | "~~**Stop paying for attention. Start stepping into verified conversations.**" Is `~~` a cut mark? | Treat it as cut; it stays dormant until you say | The memo reads as you marked it |
| 3 | `doors` ▸ memo links | Your links point to files on your computer (F:/…). The memos now open inside the pop-up. Keep it so, or give each memo its own page? | Keep the pop-up until the site has sub-pages | Working links today |
| 4 | `hero` ▸ fonts | Which fonts stay after you test the toolbox? | Decide in the toolbox, copy the CSS | Locks the type for variants B and C |
| 5 | `teach` ▸ `lede` | "Members of his community have documented $8 million in wins." matches the template capture word for word | Replace it with a figure of your own | Every number on the page survives a prospect's check |
