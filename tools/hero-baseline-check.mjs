// Bug 2 check · the two parts of the hero statement ("… that" and "have a reason to talk.") must sit on one bottom line
// (baseline) at any size pair, with the word-rise animation still clipped. Usage: node hero-baseline-check.mjs <page.html> <label> [shot-folder]
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
const [file, label, shots] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('http://127.0.0.1') || u.startsWith('data:') || u.startsWith('blob:')) ? r.continue() : r.abort(); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto((/^https?:/.test(file) ? file : 'file://' + file), { waitUntil: 'load' }); await W(2500);
const clipped = await p.evaluate(() => { const w = document.querySelector('.hero-statement .w'); if (!w) return 'no word spans'; const cs = getComputedStyle(w); return cs.overflow === 'hidden' || cs.clipPath !== 'none' ? 'yes' : 'no'; });
// baseline of a word = the top of a zero-height inline-block placed on its baseline
const measure = (l1, l2) => p.evaluate((l1, l2) => {
  const h = document.querySelector('.hero-statement'); h.style.fontSize = l1 + 'px'; h.querySelector('i').style.fontSize = l2 + 'px';
  const base = word => { const s = [...h.querySelectorAll('.w > span, .w')].find(x => x.firstChild && x.firstChild.nodeType === 3 && x.textContent === word) || [...h.querySelectorAll('span')].find(x => x.textContent === word);
    const host = s.parentElement && s.parentElement.classList.contains('w') ? s.parentElement : s;   // the .w box: not moved by the rise animation
    const m = document.createElement('span'); m.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; host.appendChild(m); const y = m.getBoundingClientRect().top; m.remove(); return Math.round(y * 10) / 10; };
  return { that: base('that'), have: base('have'), talk: base('talk.') };
}, l1, l2);
let all = true;
for (const [l1, l2] of [[66, 100], [100, 66], [66, 66], [48, 120]]) {
  const m = await measure(l1, l2); const ok = Math.abs(m.that - m.have) <= 1 && Math.abs(m.have - m.talk) <= 1; all = all && ok;
  console.log(`${ok ? 'PASS' : 'FAIL'} B${l1}/${l2} line 1 ${l1} px · line 2 ${l2} px · baseline "that" ${m.that} · "have" ${m.have} · "talk." ${m.talk} · step ${Math.round((m.have - m.that) * 10) / 10} px`);
  if (shots && l1 === 66 && l2 === 100) { await W(200); await (await p.$('.hero-statement')).screenshot({ path: `${shots}/hero-${label}-66-100.png` }); }
}
console.log(`${clipped === 'yes' ? 'PASS' : 'FAIL'} B-clip the word-rise animation is still clipped (${clipped})`);
console.log(`${errs.length === 0 ? 'PASS' : 'FAIL'} B-errors no script errors ${errs.join(' | ')}`);
console.log(`${label}: baselines ${all ? 'match' : 'do not match'}`);
await b.close();
