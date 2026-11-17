# Lovable repo · the six files changed since the 23 Oct map

Repo `AndjayDev/13jan2026-remix-combined-black-hero-bluesubhero`, branch `main`, head `2a09f7f` "Verified SSL status" (29 Oct 2026). Base of the 23 Oct map: `32f4e29` "Restrict URL protocols" (22 Feb 2026). Three Lovable commits sit between them, all on 29 Oct: `b995db8` "Work in progress" (4 files), `d4f0b2c` "Changes" (2 files), `2a09f7f` (no file change beyond those). No other file changed. Secret values are not copied here: variable names only.

| # | file | now | what changed | role | touches the landing page transfer? |
|---|---|---|---|---|---|
| 1 | `src/integrations/supabase/previewAuthStorage.ts` | NEW · 143 lines · 6,623 bytes · blob 56f21e3 | written by Lovable | Keeps one login across Lovable's preview windows: inside a Lovable preview frame it hands the login to the editor by postMessage; everywhere else it uses the browser's localStorage as before | No. Login only. The landing page has no login |
| 2 | `src/integrations/supabase/client.ts` | 17 lines · 665 bytes · blob 12f3d36 | 3 lines: imports file 1; `storage: localStorage` → `storage: brokeredPreviewStorage()` | Opens the Supabase connection. Still reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the environment. Marked "automatically generated. Do not edit" | No, as long as the transfer does not touch this file. Used by `src/hooks/useAuth.tsx` and `src/contexts/SettingsContext.tsx` |
| 3 | `src/integrations/supabase/types.ts` | 207 lines · 6,353 bytes · blob 06ea2d4 | 20 lines: brackets added around five type expressions; no table changed | Database type list: tables `admin_settings`, `user_roles`; function `has_role` | No |
| 4 | `tsconfig.json` | 23 lines · 396 bytes · blob 488647b | reformatted; `"baseUrl": "."` removed; `@/*` → `./src/*` kept | TypeScript settings for the whole project | Indirect: the `@/…` import paths the new page will use still resolve |
| 5 | `tsconfig.app.json` | 31 lines · 635 bytes · blob 78b07cf | reformatted; `"baseUrl": "."` and two comments removed; settings otherwise the same | TypeScript settings for the app code | Same as 4 |
| 6 | `bun.lockb` | 210,621 bytes (was 198,351) · blob aa31b14 | package lock rebuilt; `package.json` unchanged | Pins exact package versions for installs | No, unless the transfer adds a package; then Lovable rebuilds this file itself |

Reading: all six are Lovable's own maintenance (preview login, generated types, settings formatting). None touches a page, a component or the booking modal. The transfer plan (`docs/transfer-plan-lovable.md`) does not edit any of them; step T-check: before the transfer branch is opened, re-run this table (`git diff --stat 2a09f7f origin/main`) and stop if a seventh file appears.

Check used: `git fetch --unshallow; git diff --stat 32f4e29 2a09f7f` → exactly these 6 files, 177 lines added, 26 removed.
