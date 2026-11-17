// Portrait-upload checks for the carousel. Each check prints PASS or FAIL with what the browser showed.
// Usage: node portrait-tests.mjs <page.html> <label>
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
const S = process.env.S, [file, label] = process.argv.slice(2);
const FX = `${S}/fixtures`; fs.mkdirSync(FX, { recursive: true });
const W = ms => new Promise(r => setTimeout(r, ms));
const results = [];
const check = (id, name, pass, seen) => { results.push({ id, name, pass, seen }); };

const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true, userDataDir: `${S}/profile-pt-${label}` });
const page = async () => {
  const p = await b.newPage(); p.errors = [];
  p.on('pageerror', e => p.errors.push(String(e).slice(0, 160)));
  await p.setRequestInterception(true);
  p.on('request', r => { const u = r.url(); if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('about:')) r.continue(); else r.abort(); });
  await p.setViewport({ width: 1440, height: 900 });
  return p;
};
// state read from a frame (top page or the sandboxed preview frame)
const state = f => f.evaluate(() => {
  const shown = document.querySelector('.cx-img.is-on');
  const and = document.querySelector('.cx-img[data-person="andjay"]'), ame = document.querySelector('.cx-img[data-person="amelia"]');
  const note = document.querySelector('#fp-portraits .fp-msg, #fp-portrait-note');
  return { shown_person: shown?.dataset.person, shown_src: (shown?.src || '').slice(0, 20), shown_w: shown?.naturalWidth,
    andjay_src: and.src.slice(0, 20), andjay_w: and.naturalWidth, amelia_src: ame.src.slice(0, 20), amelia_w: ame.naturalWidth,
    caption: document.querySelector('.cx-person:not([hidden]) h3')?.textContent, note: note && !note.hidden ? note.textContent : '' };
});
const upload = async (f, person, path) => { const h = await f.$(`[data-person="${person}"] [data-upload]`); await h.uploadFile(path); await W(900); };
const openTool = f => f.evaluate(() => { const t = document.querySelector('.fp-toggle'); if (document.getElementById('fp').hidden) t.click(); });

// fixtures: a real portrait, a file with no extension (the browser gives it no type), a HEIC-named file the browser cannot draw
const real = `${S}/test-portrait.jpg`;
fs.copyFileSync(real, `${FX}/portrait-no-extension`);
fs.writeFileSync(`${FX}/phone-photo.heic`, Buffer.from('00000018667479706865696300000000', 'hex'));

// T1 · page opened as a file, Andjay shown, upload for Andjay
let p = await page(); await p.goto('file://' + file, { waitUntil: 'load' }); await p.evaluate(() => { localStorage.clear(); indexedDB.deleteDatabase('a8z-portraits'); }); await p.reload({ waitUntil: 'load' }); await W(600); await openTool(p);
await upload(p, 'andjay', real); let st = await state(p);
check('T1', 'Upload for the person on screen changes the photo on screen', st.shown_person === 'andjay' && st.shown_src.startsWith('blob:') && st.shown_w === 900, st);

// T2 · Andjay on screen, upload for Amelia: the visitor must see the new portrait
await p.evaluate(() => { indexedDB.deleteDatabase('a8z-portraits'); localStorage.clear(); }); await p.reload({ waitUntil: 'load' }); await W(600); await openTool(p);
await upload(p, 'amelia', real); await W(1800); st = await state(p);   // the diagonal wipe takes 1.5 s
check('T2', 'Upload for the other person shows that portrait', st.shown_person === 'amelia' && st.shown_src.startsWith('blob:') && st.shown_w === 900, st);

// T3 · a file without an extension (no type from the system): it must be accepted, or the BO must be told why not
await p.evaluate(() => { indexedDB.deleteDatabase('a8z-portraits'); localStorage.clear(); }); await p.reload({ waitUntil: 'load' }); await W(600); await openTool(p);
await upload(p, 'andjay', `${FX}/portrait-no-extension`); st = await state(p);
check('T3', 'A picture file without a type is used, or a message says why not', (st.andjay_src.startsWith('blob:') && st.andjay_w > 0) || /not|cannot|could/i.test(st.note), st);

// T4 · a file the browser cannot draw (HEIC from a phone): no broken image, a message, the old portrait stays
await p.evaluate(() => { indexedDB.deleteDatabase('a8z-portraits'); localStorage.clear(); }); await p.reload({ waitUntil: 'load' }); await W(600); await openTool(p);
await upload(p, 'andjay', `${FX}/phone-photo.heic`); await W(600); st = await state(p);
check('T4', 'An unreadable file leaves the current portrait and says why', st.andjay_w > 0 && /not|cannot|could/i.test(st.note), st);

// T5 · the file picker does not hide common photo types (jpg, png, webp, heic, gif, jfif)
const accept = await p.evaluate(() => document.querySelector('[data-person="andjay"] [data-upload]').accept);
check('T5', 'The file picker shows every image type', accept === 'image/*', { accept });
check('T6', 'No script errors on the page opened as a file', p.errors.length === 0, p.errors);
await p.close();

// T7 · the chat preview: the page inside a sandboxed frame without storage
const wrap = `${FX}/preview-wrapper.html`;
fs.writeFileSync(wrap, `<!doctype html><iframe id="f" sandbox="allow-scripts" style="width:1400px;height:880px;border:0" srcdoc="${fs.readFileSync(file, 'utf8').replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"></iframe>`);
p = await page(); await p.goto('file://' + wrap, { waitUntil: 'load' }); await W(1500);
const fr = p.frames().find(f => f !== p.mainFrame());
await openTool(fr); await W(200);
let ok = true; try { await upload(fr, 'andjay', real); } catch (e) { ok = false; }
st = await state(fr);
check('T7', 'In the chat preview, an upload still changes the photo', ok && st.andjay_src.startsWith('blob:') && st.andjay_w === 900, { ...st, errors: p.errors });
check('T8', 'No script errors in the chat preview', p.errors.length === 0, p.errors);
check('T9', 'In the chat preview, a note says uploads cannot be kept there', /keep|saved|kept|browser/i.test(st.note), { note: st.note });
await p.close(); await b.close();

const pass = results.filter(r => r.pass).length;
for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.id} ${r.name}\n     seen: ${JSON.stringify(r.seen).slice(0, 300)}`);
console.log(`\n${label}: ${pass} of ${results.length} pass`);
