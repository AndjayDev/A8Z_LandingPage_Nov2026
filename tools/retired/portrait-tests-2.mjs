// Portrait checks T10–T13: the BO's reports of 17 Nov 2026 ("the slot for Andjay doesn't retain the uploaded picture";
// "the slot for Amelia ... shows the place holder instead"). Each check prints PASS or FAIL with what the browser showed.
// Usage: S=<work folder with test-portrait.jpg and test-portrait-2.jpg> node portrait-tests-2.mjs <page.html> <page-alone.html> <label>
//   page.html       the one-file build (photos embedded)
//   page-alone.html the source index.html copied into an empty folder, as the README told the BO to open it
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
const S = process.env.S, [file, alone, label] = process.argv.slice(2);
const W = ms => new Promise(r => setTimeout(r, ms));
const results = []; const check = (id, name, pass, seen) => results.push({ id, name, pass, seen });
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true, userDataDir: `${S}/profile-pt2-${label}` });
const page = async () => { const p = await b.newPage(); p.errors = []; p.on('pageerror', e => p.errors.push(String(e).slice(0, 160)));
  await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:')) ? r.continue() : r.abort(); });
  await p.setViewport({ width: 1440, height: 900 }); return p; };
const fresh = async (p, url) => { await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => { try { localStorage.clear(); indexedDB.deleteDatabase('a8z-portraits'); } catch (e) {} }); await p.reload({ waitUntil: 'load' }); await W(700);
  await p.evaluate(() => { const t = document.querySelector('.fp-toggle'); if (document.getElementById('fp').hidden) t.click(); }); };
// what the visitor sees in each slot: a drawn photo, a labelled fallback, or a broken image (the browser then prints the alt text)
const slots = p => p.evaluate(() => Object.fromEntries(['andjay', 'amelia'].map(k => { const i = document.querySelector(`.cx-img[data-person="${k}"]`);
  const fb = document.querySelector(`.cx-missing[data-person="${k}"]`);
  return [k, { src: i.src.slice(0, 22), w: i.naturalWidth, complete: i.complete, fallback: fb && !fb.hidden ? fb.textContent.trim().slice(0, 80) : '', broken: i.complete && i.naturalWidth === 0 && !(fb && !fb.hidden) }]; })));
const up = async (p, person, f) => { const h = await p.$(`#fp-portraits [data-person="${person}"] [data-upload]`); await h.uploadFile(f); await W(2200); };
const real = `${S}/test-portrait.jpg`, real2 = `${S}/test-portrait-2.jpg`;

// T10 · the source page opened alone (no assets folder beside it): no slot may show a broken image with its alt text
let p = await page(); await fresh(p, 'file://' + alone); let st = await slots(p);
check('T10', 'Page opened without its photo folder: each slot shows a photo or a labelled note, never the raw alt text', !st.andjay.broken && !st.amelia.broken, st);
// T11 · same page alone: an upload for Amelia shows her new portrait
await up(p, 'amelia', real2); st = await slots(p);
check('T11', 'Page opened alone: an upload for Amelia shows the new portrait', st.amelia.w === 900 && !st.amelia.fallback, st);

// T12 · a viewer whose security rules allow embedded (data:) pictures but not blob: pictures, as a hosted preview may
const csp = fs.readFileSync(file, 'utf8').replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="img-src 'self' data:">`);
const cspFile = `${S}/csp-${label}.html`; fs.writeFileSync(cspFile, csp);
p = await page(); await fresh(p, 'file://' + cspFile); await up(p, 'andjay', real); st = await slots(p);
check('T12', 'Viewer without blob: pictures: an upload for Andjay shows the new portrait', st.andjay.w === 900, st);
await up(p, 'amelia', real2); st = await slots(p);
check('T13', 'Viewer without blob: pictures: an upload for Amelia shows the new portrait, not a placeholder', st.amelia.w === 900, st);
await p.reload({ waitUntil: 'load' }); await W(1200); st = await slots(p);
check('T14', 'Viewer without blob: pictures: both uploads are still shown after a reload', st.andjay.w === 900 && st.amelia.w === 900, st);
check('T15', 'No script errors', p.errors.length === 0, p.errors);

for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.id} ${r.name}\n     seen: ${JSON.stringify(r.seen).slice(0, 300)}`);
console.log(`\n${label}: ${results.filter(r => r.pass).length} of ${results.length} pass`);
await b.close();
