// Founders section ("On strategic introductions." + the Andjay / Amelia photo): nothing may move when the person is switched.
// For each screen width: the left text block's top, the section's height and the photo's top are measured
// with Andjay shown, then with Amelia shown. PASS when every shift is 0 px (1 px rounding allowed), no overflow.
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [file, shots = '.'] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
let fails = 0;
for (const [vw, vh, label] of [[1440, 900, 'desktop 1440'], [1280, 800, 'desktop 1280'], [1024, 1366, 'tablet 1024'], [768, 1024, 'tablet 768'], [390, 844, 'phone 390'], [360, 740, 'phone 360']]) {
  const p = await b.newPage(); await p.setViewport({ width: vw, height: vh });
  await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('http://127.0.0.1') || u.startsWith('data:')) ? r.continue() : r.abort(); });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto((/^https?:/.test(file) ? file : 'file://' + file), { waitUntil: 'load' }); await W(700);
  await p.evaluate(() => document.querySelector('.money').scrollIntoView({ block: 'start', behavior: 'instant' })); await W(300);
  const m = () => p.evaluate(() => { const r = e => document.querySelector(e).getBoundingClientRect();
    return { text: Math.round(r('.money-grid > div').top), sec: Math.round(r('.money').height), photo: Math.round(r('.cx-frame').top), photoH: Math.round(r('.cx-frame').height), next: Math.round(r('.money .results').top), over: [...document.querySelectorAll('.money *')].some(e => e.getBoundingClientRect().right > innerWidth + 1) }; });
  const a = await m(); await p.screenshot({ path: `${shots}/founders-${vw}-andjay.png` });
  await p.evaluate(() => document.querySelectorAll('.cx [role="tab"]')[1].click()); await W(400);
  const c = await m(); await p.screenshot({ path: `${shots}/founders-${vw}-amelia.png` });
  const d = k => Math.abs(a[k] - c[k]); const ok = ['text', 'sec', 'photo', 'next'].every(k => d(k) <= 1) && !a.over && !c.over;
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: text block moves ${d('text')} px · section height ${d('sec')} px · photo ${d('photo')} px · next block ${d('next')} px · photo ${a.photoH} px high · overflow ${a.over || c.over}`);
  await p.close();
}
console.log(`founders: ${6 - fails} of 6 pass`); await b.close();
