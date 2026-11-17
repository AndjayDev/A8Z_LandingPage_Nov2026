# Transfer plan · landing page revision 5.7 → the Lovable repository

Order (17 Nov 2026): "This website is going to be translated into lovable react and implemented inside the current repo … Before the crucial transfer steps are made prepare the current landing page for the update; follow the [top value rule] enumerate, label and equip with checkboxes and pointers every step, ensure all steps are planed before execution."
Rule: `boot-sequence/harness/top-value-rule.md` R1–R8 (same text as `Website_Boot/hallmark-init/Step4_top-value-rule/top-value-rule.md`). Nothing below the line "TRANSFER" runs before the BO's go on G1 to G3.

Source: `AndjayDev/A8Z_LandingPage_Nov2026` ▸ `variants/variant-A-clay-and-ink/index.html` (revision 5.7).
Target: `AndjayDev/13jan2026-remix-combined-black-hero-bluesubhero`, branch `main` (pks-catalog_bo-quotes.txt ▸ line 31; `Website_Boot/A8Z_Website_Intake/00_ROUTER.md` ▸ 5 · TARGET INDEX). Map of the target: `Website_Boot/hallmark-init/Step5_website-map/STRUCTURE_MAP.md`.
Door legend: two-way = undone by one revert · one-way = changes the live site or cannot be undone alone.

## PREPARE (done in this turn, revision 5.7)
- [x] PR1 · toolbox removed, the BO's type and colour baked in · pointer `docs/technical-guide.md` ▸ REVISION 5.7 · check `tools/bake-check.mjs` (identical at 1440 / 1304 / 390 px, one phone-fit exception)
- [x] PR2 · video frame 5 px · check `tools/frame-and-photos-check.mjs` F (1440 / 768 / 390 px)
- [x] PR3 · portrait upload tool removed (it lived in the toolbox); a missing photo shows a labelled card · check P1 P2
- [x] PR4 · visual switches fixed: Logo.svg on, star field on (were toolbox and address switches)
- [x] PR5 · font picker families reduced to Lato (top line); Instrument Serif, Inter, Inter Tight, JetBrains Mono, Noto Serif Display, News Cycle stay
- [ ] PR6 · the two photos "Andjay @Office1.jpg" and "Ame @Office1.jpg" · BLOCKED: not in Website_Boot.zip, not in the project space, not in the repository · G4

## GATES (the BO answers before TRANSFER)
- [ ] G1 · push access to the target repository for this session (one `add_repo … access:push`); the earlier ruling allowed only A8Z_LandingPage_Nov2026
- [ ] G2 · work on a new branch `landing-r5-7`, merge into `main` only on the BO's go (Lovable publishes `main`) · STRUCTURE_MAP.md ▸ START_HERE rule "New code goes on its own git branch; Lovable commits to main"
- [ ] G3 · what is replaced: the public page `/` only; `/admin`, the Supabase client, `.env` names, the database and the booking component stay
- [ ] G4 · the two photos served as files

## TRANSFER (planned, not started)
| # | step | pointer (where it is defined) | check that ticks it | door |
|---|---|---|---|---|
| T1 | clone the target; compare every file with FILETREE.md fingerprints | Step5_website-map ▸ map-freshness-check.sh | script exit 0, or the changed files listed | read only |
| T2 | create branch `landing-r5-7` from `main` | G2 | `git branch --show-current` | two-way |
| T3 | assets into `public/`: Logo.svg, favicon150x150.svg, Background-Star-Field.svg, the two photos (web-safe names), `fonts/news-cycle/` | this repo ▸ `assets/`, `fonts/` | each file served by `vite preview` (HTTP 200) | two-way |
| T4 | the YouTube relay to `public/relay/youtube/index.html` — it then lives on the Lovable https address and the GitHub Pages 404 is gone | this repo ▸ `relay/youtube/index.html` | `tools/youtube-relay-check.mjs` against the preview address | two-way |
| T5 | page stylesheet to `src/styles/landing.css`, scoped under one root class so Tailwind and shadcn rules do not collide | `index.html` ▸ `<style>` blocks | bake check against the React build | two-way |
| T6 | sections as React components in render order: Mast · Hero (+ axis, strip) · Doors · Money (+ carousel, memo) · Record (stones, filters) · How we work · Teach (+ GlassVideoFrame, existing `src/components/ui/GlassVideoFrame.tsx` set to the 5.7 frame, button → pop-up) · Contact · Footer · dialogs (story, media) | `index.html` section by section; STRUCTURE_MAP.md ▸ 3 · Landing page | one render check per section, before and after | two-way |
| T7 | booking: reuse `@calcom/embed-react` with `andjay-acceler8zone/quickchat` (same link as 5.3) instead of the hand-written loader | STRUCTURE_MAP.md ▸ 1 · Stack, 4 · Booking flow | Cal pop-up opens on the preview, no new tab | two-way |
| T8 | `src/pages/Index.tsx` renders the new page; admin routes untouched | STRUCTURE_MAP.md ▸ 2 · Routes | `/` new, `/admin` unchanged | two-way |
| T9 | `index.html` meta: title, description, author, social image (today they name Lovable) | STRUCTURE_MAP.md ▸ 9 · Findings 3 | meta read back from the build | two-way |
| T10 | run every check of this repo against the built page: bake, frame and photos, pop-up, relay, stone line, hero baseline, doors, no overflow at 390 px | `tools/` | all PASS, before and after printed | read only |
| T11 | push the branch; the BO opens Lovable's preview of the branch | G2 | the BO's look | two-way |
| T12 | merge into `main` → Lovable publishes the live site | G2 | live address shows 5.7; video plays; Cal opens | one-way (live site), undone by a revert commit |

## OPEN, CARRIED (from Website_Boot ▸ SPEC_01_LandingPage.md ▸ 10 · OPEN ITEMS)
Header figure · copy A or B · the 18 case studies: they are not needed to move revision 5.7 as it stands; they change content later.
