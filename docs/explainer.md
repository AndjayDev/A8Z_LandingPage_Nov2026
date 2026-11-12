# Acceler8zone landing page — Variant A "Clay & Ink"

*What changed, what we found, and what the impeccable skill can do next*

---

## TLDR

1. **Variant A is ready.** It keeps your fonts, sizes and layout system. It swaps the colours from oxblood to a warm clay accent, and adds the header sub-menu block you asked for.
2. **It stays close to the original.** 16.7 % of the page's lines changed and 6.4 % of its characters. Both are under your 20 % limit.
3. **The page now shows 9 business studies.** All 16 stay in the page's data, so any of the 7 hidden ones comes back by adding one name to a list.
4. **We found and fixed one real bug.** Two case cards carried the wrong headline (details in section 3).
5. **Three decisions are open** (section 6). The first one matters most: two claims on the page match a template capture word for word.

> **Decision now:** read section 6 and answer decision 1. The two further variants follow once you rule on it.

---

## 1. What you get

| File | What it is |
|---|---|
| `variant-A-clay-and-ink.html` | The page itself. Open it in any browser. |
| `explainer.md` | This document. |
| `missing-elements.md` | Every element the page needs that was not in your upload. |
| `github-guide.md` | Your step-by-step guide to storing all of this on GitHub. |
| `technical-guide.md` | The engineer's version: checks, numbers and the change log. |
| `acceler8zone-site.zip` | The ready-made GitHub folder structure, with all files sorted in. |

---

## 2. What changed in Variant A

### 2.1 The header

**Kept exactly as you gave it:** the first line. The Acceler8zone logotype sits on the left and andjay@acceler8zone.com on the right.

**Added below it — the sub-menu block**, on a soft sand-coloured band:

- **Left:** Research & Introductions
- **Centre:** Supply ——•—— Demand. The dot drifts slowly between the two sides, like an introduction being made. It stays still for visitors who switch off motion.
- **Right:** *We introduce companies that have a reason to talk.* This line is set in the same italic serif as your headline.

On phones the three parts stack and centre.

> **Why it works:** your page says *what* you do in the headline. The band tells a visitor *how* you do it, before they read a single paragraph.

### 2.2 The colours — "Clay & Ink"

| Role | Before | Variant A | Feeling |
|---|---|---|---|
| Page background | warm white | slightly warmer cream | softer, more welcoming |
| Text | near-black | deep ink with a hint of navy | professional, calm |
| Accent (headline italics, numbers, links) | oxblood red | clay / terracotta | warm, confident, friendly |
| Header band | — | sand | new: gives the header a "home" |

All text colours pass the accessibility contrast test. The grey for small labels got slightly darker, so it is now easier to read than before.

### 2.3 Friendlier details

1. **Team photos now show in colour.** Before, they were grayscale until you hovered over them.
2. **The team grid is now two-up.** The empty third column next to Amelia and Andjay is gone.
3. **Your newer section files are applied:**
   - the YouTube channel is @Acceler8zone, with the correct video title;
   - Amelia is listed first;
   - the booking link and the LinkedIn link are updated;
   - "Acceler8zone" is capitalised in the footer.
4. **The team line now reads:** "Founded in 2023 by Amelia and Andjay."
5. **E-mail addresses are lower-case everywhere.**

### 2.4 Business studies: 16 → 9

**Shown now:** 4 "deals opened" and 5 "revenue added". Every revenue figure from the strip under your memo also has its own card.

| Shown | Kept in the data for later |
|---|---|
| Apex Agriculture · DGR Systems · Advanced Medical Sales · Regent Peak · Vention · Connect Group · Crawford Thomas · ForPlayers · Hippocratic AI | Angie Nola Maids · Tetra Films · Clean-Seas West Virginia · RESPILON · Elate Staffing · FabuLingua · HelpCare AI |

The "Next entry. Yours" card now spans the full width under the nine studies.

The intro line under the heading now says: "Nine of our sixteen documented results…". Your "16 client results" figure in the top strip therefore stays true.

---

## 3. What we diagnosed

> **A real bug, now fixed.** On the live page, Clean-Seas West Virginia showed the headline "Four prospective video-production clients". RESPILON showed "Six industrial business relationships". The headline list had shifted by one card, so each card showed the next one's text. Variant A ties every headline to its client by name, so this cannot happen again.

Other findings:

- **The header progress line** (the thin line that fills as you scroll) now animates in a smoother way. The design checker flagged it before; it no longer does.
- **Two images are referenced but missing:** both team photos, and Andjay's photo beside the memo. The page shows placeholders instead. See `missing-elements.md`.
- **One file name has a capital-letter trap:** `/people/Andjay.jpg` and `/people/andjay.jpg` count as two different files on most web hosts.

---

## 4. What the impeccable skill offers on iterations

The skill has 23 commands. These are the ones that move the page towards a **professional, friendly, charismatic character** while staying under your 20 % limit:

| # | Command | What it does for this page | Stays under 20 %? |
|---|---|---|---|
| 1 | `critique` | Scores the page against design principles and returns a ranked to-do list | yes (report only) |
| 2 | `colorize` | Builds colour systems by role. It made Variant A and will make B and C | yes |
| 3 | `typeset` | Fine-tunes the hierarchy with your existing fonts | yes |
| 4 | `layout` | Fixes spacing and rhythm, e.g. the large empty photo frame beside the memo | yes |
| 5 | `clarify` | Sharpens the wording on buttons, labels and the team line | yes |
| 6 | `delight` | Adds small personality touches, like the Supply–Demand dot | yes |
| 7 | `bolder` / `quieter` | Turns the character up or down | yes, if used lightly |
| 8 | `animate` | Gives the page one signature motion moment instead of many small ones | yes |
| 9 | `polish` | The final quality pass before going live (already run once for Variant A) | yes |
| 10 | `audit` · `harden` · `adapt` · `optimize` | Checks and fixes accessibility, missing-image fallbacks, phone/tablet layout and speed | yes |
| 11 | `init` · `document` · `extract` | Writes your product brief (PRODUCT.md), your design rulebook (DESIGN.md) and reusable tokens | yes (files only) |
| 12 | `live` | Lets you pick elements in the browser and generate alternatives | needs Claude Code and a running local site |

> **Recommended sequence for Variants B and C:**
> 1. `init` (one short interview to capture who the page is for)
> 2. `critique` (baseline)
> 3. `colorize` + header block, twice
> 4. `polish`
> 5. `document` (so all three variants share one rulebook)

**What the skill would push back on.** Its quality rules discourage small uppercase labels above headings, like "GROW SALES" and "LET'S TALK BUSINESS". Your page uses these today. We kept them because you asked to keep everything; dropping them is an option for later.

---

## 5. Checks run on Variant A

- ✅ Opened in a real browser (Chrome engine) at desktop size 1440 px and phone size 390 px, before and after.
- ✅ No script errors. No sideways scrolling on either size.
- ✅ Filters work: All shows 9, Deals opened shows 4, Revenue added shows 5.
- ✅ Case pop-up opens with the right number and client.
- ✅ The design checker found 6 issues before and 5 after. The remaining 5 are kept on purpose or are false alarms (see the technical guide).

---

## 6. Open decisions

**Decision 1 — Two claims match a template capture word for word**
- **Where:** `sections.csv` ▸ row 10 ▸ "Saad teaches people how to grow businesses by selling what people already want. Members of his community have documented $8 million in wins."
- **The question:** Your page says the same sentence with "Andjay" in place of "Saad". The same capture also lists the same client results under "Saad, founder", and the page credits them "Delivered with MyoProcess.com". Can you stand behind the $8 million figure and the 16 results as Acceler8zone's own?
- **Recommended:** keep the results with the "Delivered with MyoProcess.com" credit visible. Replace the $8 million line with a figure of your own.
- **What it converts:** a page whose every number survives a prospect's due diligence.

**Decision 2 — Titles versus descriptions in the team block**
- **Where:** `section-11.html` ▸ people ▸ "Amelia · Founder & CEO · Leads technology and operations…"
- **The question:** The CEO title carries the technology description, and the CTO title carries the strategy description. Should the descriptions swap, or the titles?
- **Recommended:** swap the descriptions, so Amelia leads strategy and Andjay leads technology. This fits Andjay's AI and systems role.
- **What it converts:** a team block that reads true to the people who meet you.

**Decision 3 — Which nine studies, and when Variant A goes live**
- **Where:** `variant-A-clay-and-ink.html` ▸ script ▸ `const FEATURED = [...]`
- **The question:** Keep my nine (chosen so every headline figure has its own card), or swap some in? And should Variant A replace the live `index.html` now, or wait for B and C?
- **Recommended:** keep the nine, and wait for B and C before going live.
- **What it converts:** one comparison round instead of three separate launches.
