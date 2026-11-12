# Acceler8zone landing page — framework

*Every section of the page, top to bottom, named the way the page's code names it. The left column is the name to use when you assign an iteration. The last column is yours to fill in.*

**Page:** `variants/variant-A-clay-and-ink/index.html` (revision 2) · **Repository:** AndjayDev/A8Z_LandingPage_Nov2026

---

## Naming note

The block you called "sub-menu" is now part of **`hero`**. It holds three lines: `hero-title`, `hero-axis` and `hero-statement`.

The separate band under the top line from revision 1 (`submast`) is removed, as you asked. The top line, **`mast`**, is unchanged.

---

## 1 · Sections

| # | Section (code name) | What the visitor sees (verbatim) | Elements inside (code names) | Dormant content (kept, not shown) | Your iteration |
|---|---|---|---|---|---|
| 1 | `mast` | Acceler8zone · andjay@acceler8zone.com | `wordmark` (left) · `mast-mid` (empty) · `mast-right` (e-mail) · progress line along the bottom edge | `mast-mid`: an empty centre slot, styled and ready for a short label | |
| 2 | `hero` | Research & Introductions / Supply ——•—— Demand / We introduce companies that *have a reason to talk.* | `hero-title` · `hero-axis` · `hero-statement` · `hero-row` · `strip` (details in table 2) | Previous headline "We find your next customers and *business opportunities.*" (kept as `dormant-hero-headline`) · `hero-eyebrow`: a styled line above the title, no text yet | |
| 3 | `money` | On strategic introductions. | `money-grid` (heading, `lede`, memo link, `money-photo`) · `results` (6 figures) · `clients` (moving name strip, "Delivered with MyoProcess.com") | `money-photo`: Andjay's photo is missing; the page shows a "Photo" placeholder | |
| 4 | `record` | Client results · 9 | `record-head` (heading + `filters`: All · Deals opened · Revenue added) · `lede` · `wall` (9 `stone` cards + 1 `stone cta`) | 7 business studies: Angie Nola Maids · Tetra Films · Clean-Seas West Virginia · RESPILON · Elate Staffing · FabuLingua · HelpCare AI | |
| 5 | `story` (pop-up) | Opens when a card is clicked: What they needed · What we brought · What it was worth | `story-head` · title · `figline` · three parts | — | |
| 6 | `service` | How we work | three numbered steps: Tell us what you're looking for. · We find the opportunity. · We connect you. | — | |
| 7 | `doors` | More customers for your business. · Access deals and partnerships. | `duo`, two cards: "Grow sales" + Find customers → · "Open new opportunities" + Find opportunities → | — | |
| 8 | `teach` | Acceler8zone | `teach-grid` (`lede`, `teach-links`: Watch on YouTube →) · `video` (thumbnail + `glass` play label) | `teach-strip`: a styled figures row, no figures yet · `video-cap`: a styled caption under the video, no text yet | |
| 9 | `people` | Who you're working with | `people-head` ("Founded in 2023 by Amelia and Andjay.") · `team` (2 `person` cards: Amelia, Founder & CEO · Andjay, Co-Founder & CTO) | Both team photos are missing; the page shows the "m" mark | |
| 10 | `contact` | Let's talk business · andjay@acceler8zone.com | e-mail link · line "Tell us about your business and what you want to achieve." · `alt` ("Prefer a call? Book one.") | — | |
| 11 | `footer` | Acceler8zone · Amelia · Singapore · Andjay · Georgia · Remote · © 2026 | links: Memorandum · Research · LinkedIn | — | |
| 12 | `fp` (font picker, review tool) | "Aa · Fonts" button, bottom left | presets · one block per hero line · margin slider · "Your choice as CSS" | Not part of the finished page; it is removed once you have chosen the fonts | |

---

## 2 · The `hero` section, line by line

| Line | Code name | Text (verbatim) | Look now | Your iteration |
|---|---|---|---|---|
| 1 | `hero-title` | Research & Introductions | Noto Serif Display, condensed (width 66 %), weight 600, as large as the previous headline; 20 px left margin | |
| 2 | `hero-axis` | SUPPLY ——•—— DEMAND | Runs from 10 % to 90 % of the screen width; a constant 2 px line, with the dot in sky-950 (#0c2850). Labels in News Cycle Bold, upper case. Two signals travel from the ends to the centre, then the dot answers with 3 thin rings; 10 seconds of motion, 2 seconds of rest | |
| 2a | `axis-end` | SUPPLY · DEMAND | the two labels | |
| 2b | `axis-track` | — | the 2 px line in two halves; each half carries a travelling signal (`axis-signal`) | |
| 2c | `axis-dot` | — | the centre dot, sky-950 | |
| 2d | `axis-radar` | — | the 3 rings, 2 px | |
| 3 | `hero-statement` | We introduce companies / that *have a reason to talk.* | Instrument Serif; "have a reason to talk." in italic, sky-950; 20 px left margin | |
| 4 | `hero-row` | We find the right people, open new conversations, and help you win more business. · See the results ↓ · Tell us what you're looking for → | unchanged | |
| 5 | `strip` | $17,000,000 · $1 billion+ · 16 · 13 (with their labels) | unchanged; the first figure is still in the clay accent | |

---

## 3 · Decisions waiting

| # | Where | The question | Recommended | What it converts |
|---|---|---|---|---|
| 1 | `hero` ▸ accent | sky-950 (#0c2850) now colours the hero; the rest of the page still uses clay (#a3431f). Make sky-950 the accent for the whole page? | Yes: one accent reads calmer and more professional | One colour story from the top line to the footer |
| 2 | `hero` ▸ `hero-title` | Which font stays after you test the picker? | Noto Serif Display, condensed | Locks line 1 for variants B and C |
| 3 | `teach` ▸ `lede` | "Members of his community have documented $8 million in wins." matches the template capture word for word (open from the last round) | Replace it with a figure of your own | Every number on the page survives a prospect's check |
