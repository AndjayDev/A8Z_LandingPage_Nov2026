# Variant A "Clay & Ink" — technical guide (engineer seat)

Order Q2 · anchors: impeccable/SKILL.md ▸ Setup 1–3 · reference/polish.md · reference/colorize.md · reference/craft-floor.md (loaded before editing) · boot-sequence/harness/top-value-rule.md R1–R8 (STEP E, workplan 17 rows · 3 competing · 9 unrouted, all kept).
Fork anchor: github.com/AndjayDev/pbakaus-impeccable ▸ .claude/skills/impeccable/SKILL.md — body identical to the installed skill (diff after the frontmatter = empty; the frontmatter differs only in YAML quoting). Version 4.0.3.

## BOOT TOKENS
- BOOT: nodes 60 · seams 59 · gaps 1 · standard MET
- ROSTER: rows 60 · closed 60 · debt 0 · skipped 0
- TOOLS: available 24 of 24 · fired by the order 7 (T01 BOOT · T03 RUN QUESTIONS · T07 LENS CHECK · T11 DISCLOSURE CHECK · T16 MINE · T22 CPFI CLOSE · T23 INGEST)
- QUESTIONS: armed 31 · open 31 (not ticked by hand)
- R8 LEARN: 5 BO lines appended, harness-out/pks-catalog_bo-quotes.txt lines 14–18 (BO uploads)
- impeccable context.mjs: NO_PRODUCT_MD · SCOPED_EXISTING_ALLOWED · EXISTING_VISUAL_SYSTEM · MANUAL_DETECTOR_REQUIRED

## CASCADE (STRUCTURE → DIAGNOSE → MINE → DISCOVER → PANEL → DELIVER)
| stage | done as | artifact |
|---|---|---|
| STRUCTURE | 20 uploads indexed (below); page mapped into 14 sections | UPLOAD INDEX |
| DIAGNOSE | detector before (6 findings); headless render before; content diff of sections 10–13 against page.html | DIAGNOSIS |
| MINE | headline off-by-one traced to `OPPORTUNITY_HEADLINES` (9 rows) indexed by position against 8 deal cases | DIAGNOSIS row 1 |
| DISCOVER | `sections.csv` row 10 carries the template sentence verbatim → Decision 1 | explainer.md ▸ 6 |
| PANEL | impeccable command map against the goal | explainer.md ▸ 4 |
| DELIVER | variant + matrix of missing elements + repo tree | the files listed in SESSION MAP |

## UPLOAD INDEX (CPFI · one card per file)
| file | bytes | lines | md5 | holds | routed to |
|---|---|---|---|---|---|
| page.html | 76708 | 1032 | 66cc5268 | the live page | variant source |
| section-10.html | 1066 | 17 | 6d6e0f1d | teach block, newer | applied |
| section-11.html | 1328 | 23 | f027c4b2 | people block, newer | applied; Decision 2 |
| section-12.html | 553 | 7 | f8d8a0bd | contact block, newer | applied |
| section-13.html | 403 | 10 | a09e9abf | footer, newer | applied |
| sections.csv | 5998 | 15 | 5033f6ae | 14-section capture, older template text | Decision 1 |
| components.csv | 1465 | 4 | 2832d1e1 | filter-button styles | unchanged |
| typography.csv | 278 | 5 | ab9e40d7 | 4 font stacks in use | fonts retained |
| index_preflight.csv | 879 | 15 | f7b10d90 | capture checks; 12 of 14 screenshots | missing-elements #14 |
| site_tree.xml | 17443 | 1 | 381c2c1d | landmark tree | structure |
| sitemap.xml | 3878 | 123 | 133dfb52 | 20 URLs incl. 16 case pages | missing-elements #8 |
| structure.xml | 9324 | 1 | d95294c6 | section text capture | structure |
| 1794461448544_image.png | 150336 | — | a2aaa783 | hero, 1903×1079 | reference |
| 1794461467045_image.png | 147134 | — | afad8671 | memo + results strip | reference |
| 1794461484092_image.png | 251871 | — | 591c43be | cases 01–09 | reference |
| 1794461500440_image.png | 320749 | — | cc41237d | cases 10–17 | reference |
| 1794461517308_image.png | 110156 | — | 58246c6c | how we work + doors | reference |
| 1794461536655_image.png | 328320 | — | c0202fbc | teach block | reference |
| 1794461554644_image.png | 80915 | — | 343cafc7 | team block (older order) | reference |
| claude-plugin.zip | 1264 | — | e43b485e | previous order's manifests | not routed (Q1) |
CPFI FIRED ▸ 20 uploads ▸ weight 100 ▸ class reference ▸ CLOSED

## DIAGNOSIS
1. Headline off-by-one (live bug). `OPPORTUNITY_HEADLINES[i]` holds 9 rows for 8 deal cases. Before render: Clean-Seas → "Four prospective video-production clients", RESPILON → "Six industrial business relationships". Fix: object keyed by client (all 8 deal clients kept).
2. Section files 10–13 newer than page.html: YouTube handle, video aria-label (page carried "How This Guy Went From $400 To $27,000/mo…"), people order and titles, cal.com link, LinkedIn, brand capitalisation.
3. Detector before 6: side-tab (play-triangle CSS, false positive) · overused-font (Instrument Serif, kept by BO ruling) · gradient-text (hero ink wipe) · layout-transition ×2 (progress bar width; cursor width/height) · marquee.
4. `.team` 3 columns for 2 people → empty column.
5. JSON-LD and meta author end in ", ".
6. Vercel insights loaded twice (head + inline loader) — listed, not changed.

## CHANGE LOG (make_variant.py, every replacement asserted to match exactly once)
- tokens: paper #fbf8f3 · ink #17191f · ink-2 #3b3d45 · sub #66625b · mute #8f8a81 · rule #e3dbcf · ox #a3431f · ox-2 #c0552a · new --band #f3ece2; rgba literals remapped (mast, ripple, cursor); theme-color
- header: BO block verbatim; `.submast` after it (3 spans, axis dot, keyframes `meet` under no-preference motion); mobile stack
- progress bar: `transform: scaleX(var(--p))`, JS sets `--p` beside `--progress`
- hero padding 112 → 96 px (band height)
- people: saturate(.94) instead of grayscale; grid repeat(2, minmax(0, 396px)); section-11 content
- content: sections 10, 12, 13 applied; caption "co-founder"; lower-case e-mail; JSON-LD/author trailing ", " removed
- cases: `FEATURED` (9 clients) · `SHOWN` · numbering by shown position (`data-n`) · dialog uses `data-n` · CTA `grid-column: 1 / -1` · static no-script wall regenerated from the same template

## EVIDENCE
- Difference: 172 of 1033 lines = 16.7 % · character difference 6.4 % (difflib, CRLF kept)
- Render: Chrome 131 headless via `@sparticuz/chromium` (npm), fonts from `@fontsource` — this closes Q1's screenshot GAP with a named adapter
  - before: stones 16 · deal 8 · sys 8 · errors 0
  - after: stones 9 · deal 4 · sys 5 · numbering No. 01–10 · dialog "No. 04 · Buyers found · Wealth management · Regent Peak…" · errors 0 · horizontal scroll none at 1440 and 390
- Detector: before 6 → after 5 (layout-transition on the progress bar gone); the remaining 5 are listed in DIAGNOSIS row 3, kept by scope
- Not verifiable here: external images (YouTube thumbnail, /people/*.jpg) are blocked in the container; lazy images below the fold do not load in a full-page capture
- Risk: two-way door · blast radius = the new variant file; the live index.html is untouched

## SESSION MAP
- M0003 · Q2 · TW 100 · top-value-rule retained · CHECK workplan exists · RESULT technical-guide.md ▸ CASCADE
- M0004 · Q2 · TW 100 · ground in /boot-sequence · CHECK ingest --verify · RESULT technical-guide.md ▸ BOOT TOKENS
- M0005 · Q2 · TW 100 · indexate all uploads · CHECK 20 rows in UPLOAD INDEX · RESULT technical-guide.md ▸ UPLOAD INDEX
- M0006–M0019 · Q2 · each order line ticked in harness-out/session-map.md with its CHECK and RESULT

---

# REVISION 3 · 17 Nov 2026 · accent, mast, hero, strip, doors, memos, toolbox

Sources: the BO's order of 17 Nov · `reference/iterations/landing-page-framework iteration 1 - 12 NOv 2026.md` ▸ "Your iteration" · `reference/copy/doors.md` · `reference/copy/On_Strategic_Introductions_250.md`. Boot re-run: ROSTER 60/60 · ingestion 59/59 · workplan 11 rows.
Revision 2 was never in the repository (`repo-update-r2.zip` not uploaded); this commit adds it as `index-r2.html`, revision 1 as `index-r1.html`.

## CHANGE LOG (make_r3.py, every replacement asserted)
- accent: `--ox` #a3431f → #0c2850, `--ox-2` #c0552a → #1d4b85, every `rgba(163,67,31,…)` → `rgba(12,40,80,…)`; no clay value left in the file
- mast ×2: bar 60 → 88 px · `.wordmark` 17 → 34 px · `em` 20 → 40 px · `.mast-right` 14 → 28 px; ≤720 px: 64 px bar, 24/28/15 px; `scroll-padding-top` for anchor jumps
- hero: `h1.hero-title` → `template#dormant-hero-title`; `hero-statement` p → h1 (the page's one h1; the motion script's word rise now applies to it)
- strip: `.strip` loses `border-top` and its 60 px top margin; `.hero-axis` moved before `ul.strip`, width 100 %, margin-top 60 px (36 px on phones); radar r 46 → 34 so the rings stay off the figures; the strip's draw-line animation removed with the line
- doors: copy from doors.md verbatim; `[data-door]` opens `#story`; pop-up → "Read the short memo →" swaps to the memo view with Back; line 37 (`~~`) held as `dormant` in the data, never rendered
- money: `a[data-memo="strategic"]` opens On_Strategic_Introductions_250.md in `#story`; modifier-click keeps `/memo`
- toolbox `#fp`: 8 roles × font · weight · width · size (range + typed px; scale = typed ÷ lead element's own size, applied to every element of the role, re-measured on resize and on pop-up content) · colour (picker + hex) · accent (sets `--ox`, `--sky`, `--ox-2` via color-mix) · font upload (FontFace + IndexedDB `a8z-fonts`, stays in this browser) · hero margin · CSS output · presets; state in localStorage `a8z-type-colour`

## EVIDENCE (Chrome 131 headless, desktop 1440 and phone 390, reduced motion)
- accent: strip figure 1, wordmark em, card kind, step numbers, statement italic = rgb(12, 40, 80); clay found on no element
- mast: 88 px · 34 / 40 / 28 px; phone 64 px · 24 / 28 / 15 px
- hero: one h1 "We introduce companies that have a reason to talk."; `.hero .hero-title` absent
- strip: axis 92 → 1348 px = strip 92 → 1348 px; SUPPLY left 92, DEMAND right 1348; line 2 px; strip top border 0; phone 16 → 374 both
- doors: pop-up opens "Matching customers for your business." with the three parts; memo 8 paragraphs + CTA; struck line absent; Back returns; Open doors memo 8 + CTA; strategic memo 13 paragraphs, meta line verbatim
- toolbox: typed 90 → statement 90 px; headings hex #7a1c1c → h2 and card h3 rgb(122, 28, 28); body typed 20 → lead 20 px; accent #2a5c3f → figure 1 rgb(42, 92, 63); upload NewsCycle-Regular.ttf → listed under "your uploads", face loaded, applied to headings; after reload font, size and upload still there; Reset all → 66 px, sky-950, ink
- errors 0 · horizontal scroll none at 1440 and 390
- detector: 10 findings, same kinds as revision 2 (overused-font ×6 = the BO's served fonts, side-tab false positive, gradient-text hero word wipe, cursor ring, marquee)
- contrast on paper: #0c2850 13.81 : 1 · #1d4b85 8.27 : 1
- change against the uploaded page.html: 56.6 % of lines in all; 23.9 % without the toolbox and the new copy
- risk: two-way door · blast radius = this repository's variant folder, fonts/, renders/, docs/, reference/copy, reference/iterations; live `index.html` untouched

---

# REVISION 4 · 17 Nov 2026 · carousel, record order, listing links, switches, favicon

Sources: `reference/iterations/landing-page-framework iteration 3 - 17 NOv 2026.md` ("Your iteration") · `reference/data/Business_Case_Studies_-_Business_Studies_Listing.csv` · `assets/brand/` · `assets/people/`. Build: make_r4.py on revision 3, every replacement asserted once. Revision 3 kept as `index-r3.html`.

## CHANGE LOG
- favicon → `../../assets/brand/favicon150x150.svg`
- mast: Logo.svg inlined as `svg.wm-logo` (40 px; 22 px ≤720 px) beside `span.wm-text`; its one `fill="white"` → `currentColor` = `--ink`. Switch `html[data-logo=svg|text]`
- hero: `::before` layer with Background-Star-Field.svg, cover, `z-index:-1` in an isolated `.hero`. Switch `html[data-stars=on|off]`
- switches: inline script in `<head>` sets both before paint, from `?logo=` / `?stars=`, else localStorage `a8z-visuals`, else on; toolbox fieldset "Visuals" writes `a8z-visuals`
- strip: `b` align-self center + text-align center; `span` align-self flex-start
- money: grid 1fr 1fr; `figure.cx`: `button.cx-frame` (1:1) with two `img.cx-img` (clip-path triangle 0 → 200 %, 1.5 s cubic-bezier(.65,0,.35,1)), `.cx-switch` tablist with sliding thumb, `.cx-person` captions (aria-live); arrow keys switch; reduced motion = instant
- people: section moved into `template#dormant-people`
- service: new steps; old ones in `template#dormant-service-steps`
- record: CASES 16 → 17 (Lasting Blueprint Productions from the listing; its three summary sentences = need/got/worth; headline = the live page's orphaned 9th headline row "Four prospective video-production clients"); every listed study gets `study`, `url`, `summary`; `FEATURED` = 8 in the BO's order with his vertical labels (slot 9 open: Vention named twice); the rest carry `.more` and open with `#record-more`; `layout()` numbers visible cards, keeps the CTA after the featured set (after all when expanded), drives the filters; lede back to the original sentence; `.stone.cta` no longer spans the row
- pop-up: eyebrow shows the card's vertical; "Read the full case study →" (Drive URL) before "Open this case on its own page →"
- toolbox: roles `statement` (`.hero-statement`) + `statement2` (`.hero-statement i`); new "Style" control (upright / italic) on every role; carousel captions added to headings, body and labels

## EVIDENCE (Chrome 131 headless; desktop 1440, phone 390)
- defaults: `data-logo=svg`, `data-stars=on`; logo 280 × 40 px, letters rgb(23, 25, 31); text wordmark hidden; star field painted; favicon href resolves; no sideways scroll on either size
- address `?logo=off&stars=off`: logo none, text wordmark inline, star field none; toolbox switch back on → `svg / on`, saved `{"logo":"on","stars":"on"}`
- strip: figure centre offset 0 px in all four columns; label left offset 0–1 px
- record:
  - first view 01 Tetra Films [Buyer found · Commercial Production] … 08 Hippocratic AI [Revenue added · Healthcare], 09 Next entry
  - CTA 417 px wide = stone 417 px
  - "Show all results" → 17 + CTA last, "Show fewer results ↑"
  - filters, all open: deals 9 · revenue 8; featured only: revenue 6
  - HelpCare pop-up: "No. 07 · Customers added · Microsoft Affiliate (Our Biggest Deal) w/Healthcare IT" + Drive link
  - Lasting Blueprint pop-up: the three listing sentences
- carousel: starts Amelia; switch → clip-path sampled 186 ms 0 % · 651 ms 24.7 % · 1368 ms 190.6 % · 1734 ms 200 %; ends Andjay, one `.is-on`; photo click → Amelia
- toolbox: line 1 #001657 / Instrument Serif; line 2 Libre Caslon Display, upright, #6b1818 — set independently
- script errors 0
- detector: same finding kinds as revision 3 (overused-font on fonts the BO served, side-tab false positive on the play triangle, gradient-text hero word wipe, cursor ring, marquee)
- risk: two-way door · blast radius = the variant folder, `assets/`, `renders/`, `docs/`, `reference/`; live `index.html` untouched

---

# REVISION 5 · 17 Nov 2026 · captions, order, portrait variants

- carousel order Andjay → Amelia; captions and alt texts per the BO: Andjay · Co-Founder & CEO · strategy line; Amelia · Founder & CTO · technology line; `template#dormant-people` updated the same way
- `img.cx-img` carries `data-person`, `data-file`, `data-default-pos`; no second copy of the image source
- toolbox fieldset "Portraits · carousel" (`#fp-portraits`): per person a select (Original + uploads), focus x/y sliders (object-position), multi-file upload (jpeg, png, webp, avif) and remove; blobs in IndexedDB `a8z-portraits`, choice in localStorage `a8z-portrait-choice`
- evidence (Chrome 131, one-file build opened alone): tabs "Andjay / Amelia"; first caption "Andjay · Co-Founder & CEO · Leads strategy…"; second "Amelia · Founder & CTO · Leads technology…"; upload → Andjay image becomes the 900 px upload and the option list shows it; focus ↕ 10 → object-position 46% 10%; reload keeps upload and focus; remove → back to Andjay_Office.jpg 1037 px; errors 0
- revision 4 kept as `index-r4.html`

---

# REVISION 5.1 · 17 Nov 2026 · portrait upload: functions, bugs, fixes

Order: "Analyze the upload portraits feature - it doesn't work … enumerate the functions, label them -> find bugs and write a fix for each of them. No skips, no jumps." Boot: ROSTER 60/60 · ingestion 59/59 · workplan 5 rows. Build: make_fixes.py applies fix 1..N; after each fix the one-file page was rebuilt and all nine checks re-run.

## FUNCTIONS (labels)
| label | function | what it does |
|---|---|---|
| C01 | `go(k)` | carousel: 1.5 s diagonal wipe to person k; ignores calls while a wipe runs |
| C02 | tabs · frame click · arrow keys | carousel controls |
| P01 | `PEOPLE` | one entry per carousel photo: person, original source, caption name |
| P02 | `choice` · `save()` | which portrait and focus per person, in localStorage |
| P03 | `db()` · `tx()` | IndexedDB store `a8z-portraits` for uploaded files |
| P04 | `add(rec)` | makes a blob address for an uploaded file |
| P05 | `apply()` | sets each photo's source and focus |
| P06 | `render()` | builds the toolbox rows: portrait select, focus sliders, upload, remove |
| P07 | input handler | portrait select and focus sliders |
| P08 | change handler | file upload |
| P09 | click handler | remove the chosen upload |
| P10 | restore at load | reads saved uploads back from IndexedDB |
| P11 (new) | `showPerson(key)` | brings the person whose portrait changed on screen (via C01) |
| P12 (new) | `readable(blob)` | accepts a file only if this browser can draw it |
| P13 (new) | `msg(text)` | the note line under the portrait rows |

## CHECKS (Chrome 131 headless; T1–T6 page opened as a file, T7–T9 inside a sandboxed frame without storage, as in the chat preview)
T1 upload for the person on screen changes that photo · T2 upload for the other person shows that portrait · T3 a picture file without a type is used or explained · T4 an unreadable file leaves the current portrait and says why · T5 the file picker lists every image type · T6 no errors (file) · T7 upload works in the preview · T8 no errors (preview) · T9 the preview says uploads cannot be kept

## BUGS, IN ORDER, EACH FIXED AND RE-CHECKED BEFORE THE NEXT
| bug | function | failure (before) | fix | check before → after | all checks after |
|---|---|---|---|---|---|
| 1 | P07, P08 with C01 | uploading for the person not on screen changed a hidden photo; the screen stayed the same | C01 exposed as `root.cxGo` / `root.cxNow`; P11 brings that person on screen after an upload or a pick | T2 FAIL → PASS | 5 of 9 |
| 2 | P08 | a file with no type (no extension, unregistered type on Windows) was dropped without a word | an empty type is tried; P12 decides | T3 FAIL → PASS | 6 of 9 |
| 3 | P08 | a file the browser cannot draw (HEIC, damaged) replaced the portrait with a broken image | P12 checks every file first; rejected files are named in P13's note; the current portrait stays | T4 FAIL → PASS | 7 of 9 |
| 4 | P06 | the picker filter `image/jpeg,image/png,image/webp,image/avif` hid HEIC, GIF, JFIF, BMP | `accept="image/*"` | T5 FAIL → PASS | 8 of 9 |
| 5 | P10 | where storage is blocked (chat preview), uploads vanished on reload without a word | P10's failure path sets a standing note: "Uploads work here, but this view cannot keep them after a reload. Open the file in Chrome or Edge to keep them." | T9 FAIL → PASS | 9 of 9 |

Regression: upload → reload keeps the upload and focus (46% 10%) · remove → back to Andjay_Office.jpg · errors 0.
Risk: two-way door · blast radius = the toolbox's portrait part and two lines of the carousel script in `variants/variant-A-clay-and-ink/index.html`.

---

# REVISION 5.2 · 17 Nov 2026 · portrait upload, stone line, hero baseline

Order (Q2): "analyze the entire landing page structure, search for bugs in all sections, follow the [top value rule] implement fixes." BO reports: Andjay slot "doesn't retain the uploaded picture"; Amelia slot "shows the place holder instead"; "Ensure both parts of the hero statements align to the bottom line"; Bug A confirmed by the BO as the thin line on top of each stone. Revision 5.1 kept as `index-r5.html`.

## BUGS, EACH WITH A FAILING CHECK FIRST
| bug | where | failure (before) | fix | check before → after |
|---|---|---|---|---|
| P-6 | carousel photos, page opened alone | README told the BO to download `index.html` alone; `../../assets/people/*.jpg` then fail and the browser prints the alt text "Amelia, Founder & CTO of Acceler8zone" — the "placeholder" | a missing photo file shows a labelled card ("photo not found · open the one-file version, or upload a portrait"); README points to `one-file.html` | T10 FAIL → PASS |
| P-7 | P04 `add`, P12 `readable` | uploads were shown through `blob:` addresses; a viewer that allows embedded pictures but refuses `blob:` ones (hosted previews may) never shows the upload | uploads become `data:` addresses (FileReader); photos over 1600 px are scaled down (canvas, JPEG 0.88) | T12 T13 T14 FAIL → PASS · E1 4000 px → 1600 px FAIL → PASS |
| P-8 | P03 `db`/`tx`, P08 | the upload waited for IndexedDB before showing; a store that does not answer (blocked by a second open tab) held the upload for ever | the picture is shown first, stored after; IndexedDB gives up after 3 s and closes each connection; localStorage is the second store | T12 FAIL → PASS (second tab open) |
| A | record ▸ `layout()` | `layout()` added `in` to every shown stone at load; 8 of 9 lines drawn while the wall sat 1977 px down | `layout()` no longer adds `in`; the IntersectionObserver draws each line when its stone scrolls in | A1 A2 FAIL → PASS |
| 2 | `.motion .hero h1 .w` | `vertical-align: top` hung line-2 words from the top: 66/100 px → 29.7 px step; 48/120 → 61 px | `vertical-align: baseline` + `clip-path: inset(0)` (keeps the rise clipped without moving the baseline) | B66/100 B100/66 B48/120 FAIL → PASS · render `renders/hero-baseline-before-after-r5-2.png` |

## CHECKS (Chrome 131 headless)
- `tools/portrait-tests.mjs` T1–T9: 9 of 9 before and after (T1 T2 T3 T7 now test the 900 px picture the visitor sees, not the address kind)
- `tools/portrait-tests-2.mjs` T10–T15: before 2 of 6 · after 6 of 6
- `tools/stone-line-check.mjs` A1–A5: before 3 of 5 · after 5 of 5
- `tools/hero-baseline-check.mjs`: before 1 of 4 size pairs · after 4 of 4; clip kept; errors 0
- sweep 1440 px and 390 px: no horizontal overflow, no script errors, no unnamed controls; doors, memos, filters, "Show all" (17), carousel tabs all work
- impeccable detector: the same 10 findings as revision 3 (style, not bugs; carried to the style interview)

Risk: two-way door. Blast radius: the portrait tool script, one line of the record script, one CSS rule of the hero motion, README line, new `one-file.html`.
