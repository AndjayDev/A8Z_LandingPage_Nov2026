// 5.7 checks: the video frame is 5 px on every screen; the carousel photos show (or a labelled card when the file is missing);
// the toolbox is gone. The frame is measured flat (scroll tilt switched off for the measurement). Usage: node frame-and-photos-check.mjs <one-file.html> <index-alone.html>
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [one, alone] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const open = async (f, w) => { const p = await b.newPage(); p.errors = []; p.on('pageerror', e => p.errors.push(String(e).slice(0, 120))); await p.setRequestInterception(true);
  p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('data:')) ? r.continue() : r.abort(); }); await p.setViewport({ width: w, height: 900 }); await p.goto('file://' + f, { waitUntil: 'load' }); await W(1200); return p; };
for (const w of [1440, 768, 390]) {
  const p = await open(one, w);
  const r = await p.evaluate(() => { const t = document.querySelector('.gvf-tilt'); t.style.transform = 'none';   /* measure flat: the scroll tilt scales the frame */
    const sh = document.querySelector('.gvf-glass').getBoundingClientRect(), sc = document.querySelector('.gvf-screen').getBoundingClientRect();
    return { left: +(sc.left - sh.left).toFixed(2), top: +(sc.top - sh.top).toFixed(2), right: +(sh.right - sc.right).toFixed(2), border: getComputedStyle(document.querySelector('.gvf-border')).paddingTop }; });
  const in5 = x => x >= 4.5 && x <= 5; const ok = in5(r.left) && in5(r.top) && in5(r.right) && r.border === '5px';   // 4 px + hairline (1 px standard screen, 0.5 px retina)
  console.log(`${ok ? 'PASS' : 'FAIL'} F ${w}px video frame: glass to screen ${r.left}/${r.top}/${r.right} px · border ${r.border}`);
  if (w === 1440) {
    const ph = await p.evaluate(() => [...document.querySelectorAll('.cx-img')].map(i => `${i.dataset.person} ${i.naturalWidth}px ${i.dataset.missing ? 'card' : 'photo'}`));
    console.log(`${ph.every(x => /photo$/.test(x) && !/ 0px/.test(x)) ? 'PASS' : 'FAIL'} P1 one-file page: both photos show · ${ph.join(' · ')}`);
    const tb = await p.evaluate(() => document.querySelectorAll('.fp, .fp-toggle, #fp-portraits').length);
    console.log(`${tb === 0 ? 'PASS' : 'FAIL'} T toolbox removed (elements left: ${tb}) · script errors ${p.errors.length}`);
  }
  await p.close();
}
const p = await open(alone, 1440);
const ph = await p.evaluate(() => [...document.querySelectorAll('.cx-img')].map(i => `${i.dataset.person} ${i.naturalWidth}px ${i.dataset.missing ? 'card' : 'photo'}`));
console.log(`${ph.every(x => /card$/.test(x) && !/ 0px/.test(x)) ? 'PASS' : 'FAIL'} P2 page opened without its photo folder: labelled cards, no broken image · ${ph.join(' · ')}`);
await b.close();
