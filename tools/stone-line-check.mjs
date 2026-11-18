// Bug A check · the 2 px line on top of each case-study stone must draw left → right when the stone scrolls into view,
// not while the wall is still off screen. Usage: node stone-line-check.mjs <page.html> <label>
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
const [file, label] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('http://127.0.0.1') || u.startsWith('data:') || u.startsWith('blob:')) ? r.continue() : r.abort(); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto((/^https?:/.test(file) ? file : 'file://' + file), { waitUntil: 'load' }); await W(800);
// scale of each shown stone's top line: 0 = not drawn, 1 = fully drawn
const lines = () => p.evaluate(() => [...document.querySelectorAll('#record .stone:not(.hidden)')].map(s => { const m = getComputedStyle(s, '::before').transform; const sx = m === 'none' ? 1 : +m.match(/matrix\(([^,]+)/)[1]; return { inView: s.getBoundingClientRect().top < innerHeight, in: s.classList.contains('in'), scale: Math.round(sx * 100) / 100 }; }));
const atLoad = await lines(); const wallTop = await p.evaluate(() => Math.round(document.querySelector('#record .stone').getBoundingClientRect().top));
const drawnOffscreen = atLoad.filter(l => !l.inView && (l.in || l.scale > 0)).length;
console.log(`${drawnOffscreen === 0 ? 'PASS' : 'FAIL'} A1 at load, no off-screen stone has its line drawn · wall top ${wallTop} px · drawn off screen ${drawnOffscreen} of ${atLoad.length}`);
await p.evaluate(() => document.querySelector('#record .stone').scrollIntoView({ block: 'center', behavior: 'instant' }));
// headless Chrome delivers IntersectionObserver late (no painted frames); wait for the first 'in' (max 3 s), then sample 250 ms later
for (let t = 0; t < 30 && !(await p.evaluate(() => !!document.querySelector('#record .stone.in'))); t++) await W(100);
const anims = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.pseudoElement === '::before' && a.transitionProperty === 'transform' && a.effect.target.closest('#record')).length);
const visible = (await lines()).filter(l => l.inView).length;
console.log(`${anims > 0 ? 'PASS' : 'FAIL'} A2 when the stones scroll in, their lines start a left → right drawing (running line transitions: ${anims} for ${visible} visible stones)`);
await W(1600); const end = await lines(); const full = end.filter(l => l.inView && l.scale === 1).length;
console.log(`${full === end.filter(l => l.inView).length ? 'PASS' : 'FAIL'} A3 after 1.85 s every visible line is fully drawn · ${full} of ${end.filter(l => l.inView).length}`);
const count = await p.evaluate(() => ({ stones: document.querySelectorAll('#wall .stone').length, more: !!document.getElementById('record-more') }));
await p.evaluate(() => { const l = [...document.querySelectorAll('#wall .stone')].pop(); window.scrollTo({ top: l.getBoundingClientRect().bottom + scrollY - 700, behavior: 'instant' }); }); await W(1800);
const after = await lines(); const lastRow = after.filter(l => l.inView); const ok4 = lastRow.length > 0 && lastRow.every(l => l.scale === 1);
const ok4b = ok4 && count.stones === 9 && !count.more;
console.log(`${ok4b ? 'PASS' : 'FAIL'} A4 the wall holds 8 cases + "Next entry." (${count.stones} cards, "Show all" ${count.more ? 'present' : 'gone'}); the last row is drawn when it arrives · ${lastRow.filter(l => l.scale === 1).length} of ${lastRow.length}`);
console.log(`${errs.length === 0 ? 'PASS' : 'FAIL'} A5 no script errors ${errs.join(' | ')}`);
await b.close();
