// 5.10: the carousel shows the BO's watermark-free photos (Andjay @Office2.jpg 905 px, Ame @Office2.jpg 837 px), both reachable through the tabs
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [f, out] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e))); await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('http://127.0.0.1') || u.startsWith('data:')) ? r.continue() : r.abort(); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto((/^https?:/.test(f) ? f : 'file://' + f), { waitUntil: 'load' }); await W(1000);
const st = () => p.evaluate(() => [...document.querySelectorAll('.cx-img')].map(i => `${i.dataset.file} ${i.naturalWidth}px${i.classList.contains('is-on') ? ' on' : ''}`));
const a = await st(); await p.evaluate(() => document.querySelector('.cx').scrollIntoView({ block: 'center', behavior: 'instant' })); await W(600);
await (await p.$('.cx')).screenshot({ path: out + '-andjay.png' });
await p.evaluate(() => document.querySelectorAll('.cx [role="tab"]')[1].click()); await W(1900); await (await p.$('.cx')).screenshot({ path: out + '-amelia.png' });
const b2 = await st();
const ok = a.includes('Andjay @Office2.jpg 905px on') && b2.includes('Ame @Office2.jpg 837px on') && errs.length === 0;
console.log(`${ok ? 'PASS' : 'FAIL'} the carousel shows the new photos · at load ${a.join(' | ')} · after tab 2 ${b2.join(' | ')} · errors ${errs.length}`); await b.close();
