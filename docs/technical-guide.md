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
