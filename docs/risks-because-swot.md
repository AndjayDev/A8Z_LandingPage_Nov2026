# Transfer risks · Because-SWOT → CPVS → sprint-7x (engineer seat)

Anchor chain (BO order, 17 Nov 2026): q8-step-back-matrix.md ▸ 5 · FLAGS THAT CARRY RISK → kaizen-ninja ▸ reference/because-swot/ORCH_BecauseSWOT_ThesisAlgorithm_VenturePipe_13OCT2026_TechGuide.md ▸ 2 · The algorithm (ten moves) + ORCH_BecauseSWOT_ThesisAlgorithm_VenturePipe_13OCT2026.mermaid → fabulous-gsi-toolset ▸ modules/value-cascade-cpvs.md ▸ THE FIVE GATES → boot-sequence ▸ reference/sprint-7x.md (rows 0–6).
Lane: Acceler8zone landing page × move into the Lovable repo `AndjayDev/13jan2026-remix-combined-black-hero-bluesubhero` × supply side (the site is the seller's front door). Shock state: none (no outside event; the lane runs S and O first, T only on the four flagged risks).
Diagram: `docs/risks-because-swot.mermaid` (one file, zoomable).

## Moves 1–4 · SEED · UNIVERSE · ROUTE · DECLARE UU
| # | seed (verbatim source) | bucket after the BO's rulings |
|---|---|---|
| R1 | "Both repositories are public." (q8-step-back-matrix.md ▸ line 42) | K · ruled: "They are only temporary public … after deployment they will be shut private." (pks-catalog_bo-quotes.txt ▸ line 63) |
| R2 | "Both new photos carry a faint stock-photo watermark" (q8-step-back-matrix.md ▸ line 43) | KU · licence or clean original not yet named |
| R3 | "there is no visitor measurement yet on either site" (q8-step-back-matrix.md ▸ line 44) | K · ruled out: "not interesting, we run the outreach, do not need SEO." (pks ▸ line 64) |
| R4 | "Map drift. Lovable changed the Supabase client after 23 Oct" (q8-step-back-matrix.md ▸ line 45) | K · mapped: `docs/lovable-remap-6-files.md` |
| R5 (mined) | "Create an automatic checks on the Lovable repo" (pks ▸ line 62) | UU declared · the checks now run on the A8Z repo (green); they read plain HTML, the Lovable page will be React. Demand: none outside; the port is plan work |
| R6 (mined) | 13 of 16 case texts are summaries on the page ("The full case study follows.") | KU · the 13 source exports |
| R7 (mined) | "your fucking duty is to deliver the query that ensures you and me know what fucking cost the website develops" (pks ▸ line 42) | KU · the running-cost list for the Lovable site is not written |
Musk filter: R3 → noise log by BO ruling. Dead-lane exit: not triggered (six seeds survive).

## Moves 5–8 · BECAUSE S · W · O · T
- S (what already counts): the variant page passes 10 of 10 checks on GitHub (`.github/workflows/landing-checks.yml`, run 44133311001 success); BookingModal.tsx in the Lovable repo already uses `@calcom/embed-react` with quickchat, the same calendar as the page; GlassVideoFrame.tsx exists there for the video.
- W (fear · prevent · repair): fear "the live page shows something not ours" (R2 watermark, R6 summaries) · prevent: the transfer gate lists both as blockers · repair: the BO's (licence/clean photo; the 13 exports into `reference/case-studies/`).
- O (CPVS below): the check suite travels with the page; the case pages become routes.
- T with forks:
  - R1 · observe "deploy done" → route: both repos to private the same day (new plan step T15); plan B if Lovable needs the repo public for sync: keep A8Z private, Lovable as is (it holds only a publishable key).
  - R4 · observe a seventh file in `git diff --stat 2a09f7f origin/main` → stop the transfer, re-map; plan B: transfer onto a branch cut from the new head.
  - R5 · observe the React page replacing `index.html` → the HTML checks go silent (they would test a file that is no longer the site) → route: port the checks to run against `npm run build && npm run preview` (local address) in the Lovable repo; plan B: keep the A8Z variant as the reference and diff screenshots.

## CPVS · G1 MAP (silent) → G2 MINE → G3 RANK → G4 SURFACE → G5 HALT
Envelope: pipeline held ≥20% (variant 5.9 complete, transfer plan T1–T14 written, six-file map done) → MINE allowed. Every mined move ⚠️ PLAUSIBLE until the BO confirms.
G2 MINE: (a) checks that test the page, not the HTML file, are the only checks that survive the React port (R5); (b) the case pages as React routes `/results/<slug>` keep the own-page links working after the move (R6); (c) one running-cost list (Lovable plan, Lovable Cloud/Supabase usage, Cal.com, domain) answers line 42 before the site goes live (R7).
G3 RANK (lens, bar 81):

| item | PAIN | BUDGET | INTENT | URGENCY | P·D·V·S | sum | verdict |
|---|---|---|---|---|---|---|---|
| LENS R5 checks follow the page into Lovable | "Create an automatic checks on the Lovable repo (89)." (pks-catalog_bo-quotes.txt ▸ line 62) | "Deployed via github -> in current lovable git" (pks-catalog_bo-quotes.txt ▸ line 41) | "This website is going to be translated into lovable react and implemented inside the current repo" (pks-catalog_bo-quotes.txt ▸ line 59) | 17 Nov 2026 "Create an automatic checks" (pks-catalog_bo-quotes.txt ▸ line 62) | 24·23·23·23 | 93 | SEED, first |
| LENS R2 watermark on the live photos | "Replace the pictures as those currently embedded aren't the right ones." (pks-catalog_bo-quotes.txt ▸ line 60) | "My main goal is acceler8zone Landing Page" (pks-catalog_bo-quotes.txt ▸ line 41) | "Replace the pictures" (pks-catalog_bo-quotes.txt ▸ line 60) | 17 Nov 2026 "aren't the right ones" (pks-catalog_bo-quotes.txt ▸ line 60) | 24·22·22·23 | 91 | SEED |
| LENS R7 running-cost list | "know what fucking cost the website develops" (pks-catalog_bo-quotes.txt ▸ line 42) | "if a website generates costs" (pks-catalog_bo-quotes.txt ▸ line 42) | "deliver the query that ensures you and me know" (pks-catalog_bo-quotes.txt ▸ line 42) | 24 Oct 2026 "this negligence earns you -20 penalty tokens" (pks-catalog_bo-quotes.txt ▸ line 42) | 23·22·22·22 | 89 | SEED |
| LENS R6 13 case texts | "Implement the following case studies." (BO order 17 Nov 2026) | "Regular updates of business case studies" (pks-catalog_bo-quotes.txt ▸ line 26) | "Read the full case study … popup with the case study" (BO order 17 Nov 2026) | 17 Nov 2026 "Ensure the header carry the short title and the values." (BO order 17 Nov 2026) | 22·22·22·22 | 88 | SEED |
| LENS R4 seventh-file stop | "ensure the current files are mapped" (pks-catalog_bo-quotes.txt ▸ line 65) | "in current lovable git" (pks-catalog_bo-quotes.txt ▸ line 41) | "implemented inside the current repo" (pks-catalog_bo-quotes.txt ▸ line 59) | 17 Nov 2026 "ensure the current files are mapped" (pks-catalog_bo-quotes.txt ▸ line 65) | 21·21·21·21 | 84 | SEED |
| LENS R1 private after deploy | "They are only temporary public" (pks-catalog_bo-quotes.txt ▸ line 63) | "after deployment they will be shut private" (pks-catalog_bo-quotes.txt ▸ line 63) | "so you can get the access" (pks-catalog_bo-quotes.txt ▸ line 63) | 17 Nov 2026 "after deployment" (pks-catalog_bo-quotes.txt ▸ line 63) | 21·20·20·21 | 82 | SEED · a plan step, no work now |
| LENS R3 visitor measurement | "not interesting" (pks-catalog_bo-quotes.txt ▸ line 64) | "do not need SEO" (pks-catalog_bo-quotes.txt ▸ line 64) | "we run the outreach" (pks-catalog_bo-quotes.txt ▸ line 64) | 17 Nov 2026 "Neither site measures visitors yet" (pks-catalog_bo-quotes.txt ▸ line 64) | 10·10·10·10 | 40 | INVENTORY · BO ruling |

G4 SURFACE: sharpest move R5 — the checks must test the running page so they survive the React port. Decision space in the chat reply.
G5 HALT: no transfer step runs; push access to the Lovable repo and the branch `landing-r5-7` (gates G1–G2) are still the BO's.

## sprint-7x rows
| row | done here | check |
|---|---|---|
| 0 WEIGH · buckets | seven seeds, buckets in Moves 1–4 | [x] each seed has a quote and a bucket |
| 1 STATE ROUTING | lane not shocked → S, O first; T on the flagged four | [x] stated in the lane line |
| 2 LENS | seven rows, bar 81 | [x] `lens-row-check.sh docs/risks-because-swot.md` exit 0 |
| 3 CPVS | G1–G5 above | [x] envelope stated before MINE |
| 4 CPWP gardener kill | "would doing nothing be fine?" → yes only for R3 (ruled); no for R2, R5, R6, R7 | [x] |
| 5 CPFI close | `CPFI FIRED ▸ q8-step-back-matrix.md ▸ 5 · FLAGS THAT CARRY RISK ▸ 93 ▸ SEED ▸ CLOSED` | [x] |
| 6 dialogue | chat reply: verdict · leverage · decision | [ ] at ship |

## Plan additions (docs/transfer-plan-lovable.md)
- T13 · port the checks: run the same check names against the built Lovable page (`npm run build && npm run preview`), one workflow in the Lovable repo.
- T14 · before T1 of the move: `git diff --stat 2a09f7f origin/main` shows no seventh file, or stop.
- T15 · after deploy: both repos private (BO action on GitHub ▸ Settings ▸ Danger Zone).
- Blockers before go-live: R2 photo licence or clean original · R6 the 13 case exports · R7 the running-cost list.
