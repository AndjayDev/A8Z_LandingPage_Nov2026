# Acceler8zone landing page — framework

*Every section of the page, top to bottom, named the way the page's code names it. Use the code name when you assign an iteration. "Your note" carries what you wrote in the last round, verbatim; "Status" says what the page does now. The last column is yours to fill in.*

**Page:** `variants/variant-A-clay-and-ink/index.html` (revision 4) · earlier revisions beside it: `index-r3.html`, `index-r2.html`, `index-r1.html` · **Repository:** AndjayDev/A8Z_LandingPage_Nov2026 · **Updated:** 17 Nov 2026

---

## 0 · Visuals and layout values

### 0.1 · Visual switches (on by default)

| Visual | File | Where | On | Off |
|---|---|---|---|---|
| Logo | `assets/brand/Logo.svg` | `mast`, left, in place of the text wordmark | Logo.svg, 40 px high (22 px on phones) | the text wordmark *Acceler8*zone |
| Star field | `assets/brand/Background-Star-Field.svg` | behind the whole `hero` | soft blue stars and haze | plain paper |
| Favicon | `assets/brand/favicon150x150.svg` | the browser tab | always on | — |

**How to switch:**

- In the toolbox: "Visuals · on or off".
- By the page address: add `?logo=off`, `?stars=off` or both (`?logo=off&stars=off`) to send someone the version without.

**Note on Logo.svg:** its letters are white in your file, so they would be invisible on the light page. On the page they take the ink colour. The blue "8" and the icon keep their own colours. Your file itself is unchanged.

### 0.2 · Layout values you chose in the toolbox (17 Nov) · not yet written into the page

| Element | Font | Weight | Size (wide screen) | Size (phone) | Colour |
|---|---|---|---|---|---|
| Accent (whole page) | — | — | — | — | #6b1818 (oxblood) |
| Headline · "We introduce companies that" | Source Serif 4 | 500 | 100 px (was 66) | 51 px | #001657 (deep navy) |
| Headline · "*have a reason to talk.*" | follows line 1 | 500 | 100 px | 51 px | #6b1818 (follows the accent) |
| Everything else | page as built | — | — | — | — |

The page file still carries sky-950 (#0c2850) and the 66 px headline until you rule on decision 2.

---

## 1 · Sections

| # | Section (code name) | What the visitor sees (verbatim) | Elements inside (code names) | Dormant content (kept, not shown) | Your note (17 Nov) | Status | Your iteration |
|---|---|---|---|---|---|---|---|
| 1 | `mast` | Logo.svg · andjay@acceler8zone.com | `wordmark` (holds `wm-logo` and `wm-text`) · `mast-mid` (empty) · `mast-right` · progress line | the text wordmark (switch off the logo to see it) · `mast-mid`: an empty centre slot | "Logo.svg - in place of "Acceler8zone" -> mast board" | **Done** · switch in 0.1 | |
| 2 | `hero` | We introduce companies / that *have a reason to talk.* | `hero-statement` · `hero-row` · Sub-hero-row (code: `hero-axis`) · `strip` · star field behind | "Research & Introductions" (`dormant-hero-title`) · "We find your next customers and *business opportunities.*" (`dormant-hero-headline`) · `hero-eyebrow`: no text yet | "For the headline allow various font parameters, color and font face for: 1. "We introduce companies that" 2. "have a reason to talk."" · "Background-Star-Field.svg - hero-section" | **Done** · the toolbox now has two headline roles, each with font, weight, style (upright or italic), width, size and colour · star field: switch in 0.1 | |
| 3 | `money` | On strategic introductions. · Photo carousel: Amelia / Andjay | `money-grid` (left: heading, `lede`, memo link · right half: `cx` carousel) · `results` (6 figures) · `clients` ("Delivered with MyoProcess.com") | the old single-photo frame `money-photo` | "On the right half of the view port → placeholder for photo: Photo Caroussel for Andjay and Amelia → 1,5 sec. smooth diagonal wipe on click. Add a minimalistic modern switch button, → Andjay + Amelia pictures pasted; Caption import from 'Who you're working with'" | **Done** · Amelia first, then Andjay. A click on the photo or on the Amelia / Andjay switch wipes to the other person diagonally in 1.5 s. Each caption shows name, role and the line from the people section | |
| 4 | `record` | Client results · 8 | `record-head` (heading + `filters`) · `lede` · `wall` (8 `stone` cards + `stone cta`) · "Show all results ↓" | 9 more studies behind "Show all results": Apex Agriculture · DGR Systems · Angie Nola Maids · Regent Peak Wealth Advisors · Clean-Seas West Virginia · RESPILON · Lasting Blueprint Productions · ForPlayers · FabuLingua | "List of studies to present before the full list is dispayed: 1. Commercial Production: Tetra Films 2. Recruitment: Connect Group 3. Pharmaceutical Wholesale: Advanced Medical Sales 4. Recruitment: Crawford Thomas Recruiting 5. Industrial Automation: Vention 6. Recruitment: Elate Staffing LTD 7. Microsoft Affiliate (Our Biggest Deal) w/Healthcare IT: HelpCare AI 8. Healthcare: Hippocratic AI 9. Industrial Automation: Vention" | **Done for 1–8**, with your labels on each card. **Slot 9 open:** your list names Vention twice (decision 1). "Show all results" opens all 17; the filters count what is open | |
| 4.1 | `stone cta` | Next entry. Tell us what you're looking for. | — | — | "Reduce the stone size down – take same size from the 9 other record stones … allign to the left." | **Done** · same size as the other cards. With nine studies it sits bottom-left; with eight it fills the last cell of row 3 | |
| 4.2 | `story` (case pop-up) | What they needed · What we brought · What it was worth · "Read the full case study →" | `story-head` · title · `figline` · three parts · links | each study's three-line summary from Business_Studies_Listing.csv, kept in the page data | Business Case Studies - Business_Studies_Listing.csv | **Done** · every study in the listing links to its full case study on Google Drive · Lasting Blueprint Productions added from the listing | |
| 5 | `service` | How we work | three numbered steps: They already need you. · We make the call. · Then we introduce you. | the previous three steps (`dormant-service-steps`) | "## How we work 1. They already need you. … 2. We make the call. … 3. Then we introduce you. When there's a relevant opportunity, we bring both sides together to explore the deal." | **Done** · step 3 reads "Then we introduce you." as the title and "When there's a relevant opportunity…" below it | |
| 6 | `doors` | 1 · Win customers / Matching customers for your business. · 2 · Open doors / Access deals and partnerships. | `duo`, two cards, each with pop-up and short memo | doors.md line 37 "Stop paying for attention. Start stepping into verified conversations." | — | — | |
| 7 | `teach` | Acceler8zone | `teach-grid` (`lede`, `teach-links`) · `video` | `teach-strip` · `video-cap` | — | — | |
| 8 | `people` | not shown | — | the whole section (`dormant-people`): "Who you're working with", "Founded in 2023 by Amelia and Andjay.", both person cards | "Remove; both captions take to the carousel, right side of the viewport → Section 'On strategic introductions.'" | **Done** | |
| 9 | `contact` | Let's talk business · andjay@acceler8zone.com | e-mail link · line · `alt` ("Prefer a call? Book one.") | — | — | — | |
| 10 | `footer` | Acceler8zone · Amelia · Singapore · Andjay · Georgia · Remote · © 2026 | links: Memorandum · Research · LinkedIn | — | — | — | |
| 11 | `fp` (toolbox, review only) | "Aa · Type & colour" button, bottom left | presets · accent · 9 text roles · your own fonts · visuals on/off · hero margin · "Your choice as CSS" | removed once the choices are made | — | — | |

---

## 2 · The `hero` section, line by line

| Line | Code name | Text (verbatim) | Look now (revision 4) | Your note (17 Nov) | Status | Your iteration |
|---|---|---|---|---|---|---|
| 1 | `hero-statement` | We introduce companies / that *have a reason to talk.* | Instrument Serif 66 px; italic part in the accent; two toolbox roles | see section 1, row 2 | Done | |
| 2 | `hero-row` | We find the right people, open new conversations, and help you win more business. · See the results ↓ · Tell us what you're looking for → | unchanged | — | — | |
| 3 | Sub-hero-row (code: `hero-axis`) | SUPPLY ——•—— DEMAND | as wide as the strip, both words at its ends; 2 px line, dot, 3 rings | — | — | |
| 4 | `strip` | $17,000,000 · $1 billion+ · 16 · 13 (with their labels) | every figure centred in its column; every label starts at the left edge of its column | "Ensure all number values are alligned central. The sub-titles alignment to the left." | **Done** (checked: 0 px off centre, labels 0–1 px from the left edge) | |

---

## 3 · Files received on 17 Nov

| File | Placed | Where |
|---|---|---|
| Andjay_Office.jpg · Ame_Office.jpg | yes | `assets/people/`, in the carousel |
| Business_Case_Studies_-_Business_Studies_Listing.csv | yes | links and summaries in the case pop-ups · stored in `reference/data/` |
| favicon150x150.svg · Logo.svg · Background-Star-Field.svg | yes | `assets/brand/`, see 0.1 |
| robots.txt · placeholder.svg | stored, not placed | `reference/received/`; see decision 7 |

---

## 4 · Copy waiting for its place

| # | Copy (verbatim) | Where it goes | Status |
|---|---|---|---|
| 1 | Most firms that sell to businesses pay for the same thing twice: a list of strangers, then a sales team to talk them round. We skip both. We find the company that already needs what you do, qualify them on a call, and only introduce you once we are sure. | not stated | **Open** · decision 3 |

---

## 5 · Decisions waiting

| # | Where | The question | Recommended | What it converts |
|---|---|---|---|---|
| 1 | `record` ▸ slot 9 | Your list names Vention at 5 and at 9. Which study goes into slot 9? | DGR Systems: the listing says DGR paid $10,000 for the introduction, the strongest proof among the studies not yet shown | Nine studies, and the "Next entry" card bottom-left as you asked |
| 2 | 0.2 ▸ accent and headline | Write your toolbox values into the page: accent #6b1818 instead of sky-950, and the headline in Source Serif 4 500 at 100 px, navy #001657? | Yes: they are your latest choices; sky-950 stays on record as the alternative | One accent and one headline in the file, not only in your browser |
| 3 | 4 ▸ copy 1 | "Most firms that sell to businesses pay for the same thing twice…": where does it go? | As the opening line of `service`, under "How we work". Alternative: in place of the `hero-row` line "We find the right people…" | The paragraph lands where it does its job |
| 4 | `record` ▸ Elate Staffing · HelpCare AI | The listing says "22 placements in 55 days" for Elate and "3-4 high-value healthcare clients" for HelpCare; the cards say 20 and 4. Which figures are right? | Use the listing's figures once you confirm them; the cards keep 20 and 4 until then | Every number on the page matches its case study |
| 5 | `money` ▸ carousel photos | Both photos show a faint "Adobe Stock" watermark in the wooden wall behind. Is the stock background licensed? | Licence it, or use a version without the watermark, before the page goes live | No licence risk on the live site |
| 6 | `record` ▸ Apex Agriculture | Apex Agriculture is not in Business_Studies_Listing.csv. Keep it behind "Show all results"? | Keep it until you say otherwise | The listing and the page say the same thing |
| 7 | 3 ▸ robots.txt · placeholder.svg | Received without a note. robots.txt belongs at the root of the live site; placeholder.svg is a generic image stand-in. Place them? | robots.txt at the site root when the site deploys; placeholder.svg for any missing image | Nothing received sits unused |
| 8 | `doors` ▸ doors.md line 37 | Is the `~~` before "Stop paying for attention…" a cut mark? | Treat it as cut; it stays dormant until you say | The memo reads as you marked it |
| 9 | `doors` ▸ memo links | Your links point to files on your computer (F:/…); the memos open inside the pop-up. Keep it so? | Keep the pop-up until the site has sub-pages | Working links today |
| 10 | `teach` ▸ `lede` | "Members of his community have documented $8 million in wins." matches the template capture word for word | Replace it with a figure of your own | Every number on the page survives a prospect's check |
