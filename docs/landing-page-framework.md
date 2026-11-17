# Acceler8zone landing page — framework

*Every section of the page, top to bottom, named the way the page's code names it. Use the code name when you assign an iteration. The "Iteration 2" column carries your notes from 17 Nov verbatim, with their status. The last column is yours to fill in.*

**Page:** `variants/variant-A-clay-and-ink/index.html` (revision 3) · earlier revisions beside it: `index-r2.html`, `index-r1.html` · **Repository:** AndjayDev/A8Z_LandingPage_Nov2026 · **Updated:** 17 Nov 2026

---

## 0 · Layout values you chose in the toolbox (17 Nov 2026)

These values live in your browser's toolbox for now. The page file itself still carries sky-950 and the old headline settings until you say "write them in".

| Element | Font | Weight | Size (wide screen) | Size (phone) | Colour |
|---|---|---|---|---|---|
| Accent (whole page) | — | — | — | — | **#6b1818** (oxblood, the live site's original accent) |
| `hero-statement` · "We introduce companies that" | **Source Serif 4** | **500** | **100 px** (was 66) | 51 px | **#001657** (deep navy) |
| `hero-statement` · "*have a reason to talk.*" | Source Serif 4, true italic | 500 | 100 px | 51 px | #6b1818 (follows the accent) |
| Everything else | page as built | — | — | — | — |

**What the accent reaches:** the italic "Acceler8" in the logo, the first figure in the strip, the dot and rings of the Sub-hero-row, the small labels on the case cards, the step numbers, link underlines on hover, the toolbox button.

**Checked in a real browser:**

- The navy part shows rgb(0, 22, 87); the italic part shows rgb(107, 24, 24).
- The headline runs on two lines on a wide screen and four lines on a phone.
- No sideways scrolling on either size.
- Contrast on the paper colour: #001657 15.8 : 1 and #6b1818 11.2 : 1. Both are well above the 4.5 : 1 minimum.

---

## 1 · Sections

| # | Section (code name) | What the visitor sees (verbatim) | Elements inside (code names) | Dormant content (kept, not shown) | Iteration 2 · your note (17 Nov) | Status | Your iteration |
|---|---|---|---|---|---|---|---|
| 1 | `mast` | Acceler8zone · andjay@acceler8zone.com | `wordmark` · `mast-mid` (empty) · `mast-right` · progress line | `mast-mid`: an empty centre slot | — (iteration 1: "Make both elements 2X larger") | Done in revision 3 | |
| 2 | `hero` | We introduce companies / that *have a reason to talk.* | `hero-statement` (the page headline) · `hero-row` · Sub-hero-row (code: `hero-axis`) · `strip` (details in table 2) | "Research & Introductions" (`dormant-hero-title`) · previous headline "We find your next customers and *business opportunities.*" (`dormant-hero-headline`) · `hero-eyebrow`: no text yet | "For the headline allow various font parameters, color and font face for: 1. "We introduce companies that" 2. "have a reason to talk."" | **Open.** The toolbox treats the headline as one role today; the italic part takes only the accent colour. Building two separate roles is the next step | |
| 3 | `money` | On strategic introductions. | `money-grid` (heading, `lede`, memo link, `money-photo`) · `results` (6 figures) · `clients` ("Delivered with MyoProcess.com") | `money-photo`: Andjay's photo is missing; a "Photo" placeholder shows | — | Memo link opens On_Strategic_Introductions_250.md (revision 3) | |
| 4 | `record` | Client results · 9 | `record-head` (heading + `filters`) · `lede` · `wall` (9 `stone` cards + 1 `stone cta`) | 7 business studies: Angie Nola Maids · Tetra Films · Clean-Seas West Virginia · RESPILON · Elate Staffing · FabuLingua · HelpCare AI | — | — | |
| 5 | `story` (pop-up) | Case cards: What they needed · What we brought · What it was worth. Also the doors pop-ups and the memos | `story-head` · title · `figline` · three parts · `memo` | — | — | — | |
| 6 | `service` | How we work | three numbered steps: Tell us what you're looking for. · We find the opportunity. · We connect you. | — | "## How we work **1. They already need you.** We find the company that already needs what you do. No list of strangers. **2. We make the call. ** We qualify them on a call ourselves. Nobody has to be talked round. **3. Then we introduce you. When there's a relevant opportunity, we bring both sides together to explore the deal.**" | **Open.** New copy, not yet on the page (see table 3) | |
| 7 | `doors` | 1 · Win customers / Matching customers for your business. · 2 · Open doors / Access deals and partnerships. | `duo`, two cards, each with pop-up and short memo | doors.md line 37 "Stop paying for attention. Start stepping into verified conversations." (marked `~~`) | — (iteration 1: "See files attached") | Done in revision 3 | |
| 8 | `teach` | Acceler8zone | `teach-grid` (`lede`, `teach-links`) · `video` | `teach-strip`: no figures yet · `video-cap`: no text yet | — | — | |
| 9 | `people` | Who you're working with | `people-head` · `team` (2 `person` cards) | Both team photos are missing; the "m" mark shows | — | — | |
| 10 | `contact` | Let's talk business · andjay@acceler8zone.com | e-mail link · line · `alt` ("Prefer a call? Book one.") | — | — | — | |
| 11 | `footer` | Acceler8zone · Amelia · Singapore · Andjay · Georgia · Remote · © 2026 | links: Memorandum · Research · LinkedIn | — | — | — | |
| 12 | `fp` (toolbox, review only) | "Aa · Type & colour" button, bottom left | presets · accent colour · 8 text roles · your own fonts · hero left margin · "Your choice as CSS" | Removed once the choices are made | — | Your values are in table 0 | |

---

## 2 · The `hero` section, line by line

| Line | Code name | Text (verbatim) | Look now (revision 3 file) | With your toolbox values | Iteration 2 · your note (17 Nov) | Status | Your iteration |
|---|---|---|---|---|---|---|---|
| 1 | `hero-statement` | We introduce companies / that *have a reason to talk.* | Instrument Serif 400, 66 px; italic part sky-950 | Source Serif 4 500, 100 px; navy #001657 + italic #6b1818 | — | Values chosen, not yet in the file | |
| — | `hero-title` | Research & Introductions | not shown (dormant) | — | "Remove from here" | Done in revision 3 | |
| 2 | `hero-row` | We find the right people, open new conversations, and help you win more business. · See the results ↓ · Tell us what you're looking for → | unchanged | unchanged | — | — | |
| 3 | Sub-hero-row (code: `hero-axis`) | SUPPLY ——•—— DEMAND | Between `hero-row` and `strip`, exactly as wide as the strip; SUPPLY starts at its left edge and DEMAND ends at its right edge. 2 px line, News Cycle Bold labels, dot and 3 rings; 10 s of motion, 2 s of rest | dot and rings #6b1818 | "Implment here; adjust to the width of the strip section; left and right aligned with 0 margin." | Done in revision 3 | |
| 3a | `axis-end` · `axis-track` · `axis-dot` · `axis-radar` | SUPPLY · DEMAND | the labels · the line with travelling signals · the dot · the 3 rings | — | "Remove from here" (the old place inside the hero) | Done in revision 3 | |
| 4 | `strip` | $17,000,000 · $1 billion+ · 16 · 13 (with their labels) | no upper border line; numbers and shape kept; first figure in the accent | first figure #6b1818 | "Remove the upper line-border from the strip; retain all numbers and shape of the strip" | Done in revision 3 | |

---

## 3 · Copy waiting for its place

| # | Copy (verbatim from your iteration 2 file) | Where it goes | Status |
|---|---|---|---|
| 1 | **How we work** · **1. They already need you.** We find the company that already needs what you do. No list of strangers. · **2. We make the call.** We qualify them on a call ourselves. Nobody has to be talked round. · **3. Then we introduce you.** When there's a relevant opportunity, we bring both sides together to explore the deal. | `service`, replacing the three current steps. Each step keeps the page's shape: a bold title, then one line below it | Ready to build |
| 2 | Most firms that sell to businesses pay for the same thing twice: a list of strangers, then a sales team to talk them round. We skip both. We find the company that already needs what you do, qualify them on a call, and only introduce you once we are sure. | Not stated: in your file it sits after the `strip` row with no section | **Open** · see decision 2 |

---

## 4 · Decisions waiting

| # | Where | The question | Recommended | What it converts |
|---|---|---|---|---|
| 1 | Table 0 ▸ accent | Your order of 16 Nov set sky-950 (#0c2850) for the whole page; your toolbox now shows #6b1818. Does #6b1818 replace sky-950 everywhere, including the Sub-hero-row dot and rings? | Yes: your latest choice, with the navy headline. sky-950 stays on record as the alternative | One accent written into the page instead of two competing ones |
| 2 | Table 3 ▸ copy 2 | "Most firms that sell to businesses pay for the same thing twice…": where does it go? | As the opening line of `service`, under "How we work". It introduces the three steps it summarises. Alternative: it replaces the `hero-row` line "We find the right people…" | The paragraph lands where it does its job |
| 3 | Section 2 ▸ `hero` | Build the headline as two roles in the toolbox: "We introduce companies that" and "have a reason to talk.", each with its own font, weight, size and colour? | Yes, as your iteration 2 note asks | Full control of both parts of the headline |
| 4 | `doors` ▸ doors.md line 37 | Is the `~~` before "Stop paying for attention…" a cut mark? | Treat it as cut; it stays dormant until you say | The memo reads as you marked it |
| 5 | `doors` ▸ memo links | Your links point to files on your computer (F:/…); the memos open inside the pop-up. Keep it so? | Keep the pop-up until the site has sub-pages | Working links today |
| 6 | `teach` ▸ `lede` | "Members of his community have documented $8 million in wins." matches the template capture word for word | Replace it with a figure of your own | Every number on the page survives a prospect's check |
