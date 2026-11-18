// Bake check (5.7): the page without the toolbox must look exactly like the page WITH the BO's toolbox choices of 17 Nov.
// Sizes may differ by 0.1 px rounding; one exception, not yet ruled by the BO: the contact e-mail is capped at 9vw below 1040 px so it fits the screen; the state is written before any page script runs.
// Before = revision 5.6 with the BO's toolbox state put into its storage; after = revision 5.7. Usage: node bake-check.mjs <before.html> <after.html>
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [before, after] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const STATE = { accent: '#6b1818', indent: 0, roles: {
  statement: { font: 'Instrument Serif', weight: '', style: '', width: 100, scale: 1.910, color: '#001657' },
  statement2: { font: 'Noto Serif Display', weight: '', style: 'italic', width: 62.5, scale: 1.818, color: '' },
  axis: { font: '', weight: '', style: '', width: 100, scale: 1, color: '#17191f' },
  top: { font: 'Lato', weight: '', style: 'italic', width: 100, scale: 0.853, color: '' },
  headings: { font: '', weight: '', style: '', width: 100, scale: 1.110, color: '' } } };
const SEL = ['.hero-statement', '.hero-statement i', '.axis-end', '.wordmark', '.mast-right', 'h2.t', '.record h2', '.stone .deal-headline', '.contact a.mail', '.cx-person h3', '.duo h3'];
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const read = async (file, w, state) => {
  const p = await b.newPage(); await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('http://127.0.0.1') || u.startsWith('data:')) ? r.continue() : r.abort(); });
  await p.evaluateOnNewDocument(st => { try { localStorage.clear(); if (st) localStorage.setItem('a8z-type-colour', JSON.stringify(st)); } catch (e) {} }, state);
  await p.setViewport({ width: w, height: 900 }); await p.goto((/^https?:/.test(file) ? file : 'file://' + file), { waitUntil: 'load' });
  await W(1500);
  const out = await p.evaluate(SEL => SEL.map(s => { const e = document.querySelector(s); if (!e) return [s, 'missing']; const c = getComputedStyle(e);
    return [s, `${Math.round(parseFloat(c.fontSize) * 10) / 10}px · ${c.fontFamily.split(',')[0].replace(/"/g, '')} · ${c.fontStyle} · ${c.fontStretch} · ${c.color}`]; }), SEL);
  const extra = await p.evaluate(() => ({ ox: getComputedStyle(document.documentElement).getPropertyValue('--ox').trim(), indent: getComputedStyle(document.querySelector('.hero')).getPropertyValue('--hero-indent').trim(), toolbox: !!document.querySelector('.fp, .fp-toggle') }));
  await p.close(); return { out, extra };
};
let fails = 0;
for (const w of [1440, 1304, 390]) {
  const A = await read(before, w, STATE), B = await read(after, w, null);
  A.out.forEach(([s, v], i) => { const v2 = B.out[i][1]; const px = x => parseFloat(x), rest = x => x.split(' · ').slice(1).join(' · '); const phoneFit = w < 1040 && s === '.contact a.mail' && px(v2) <= px(v) && rest(v) === rest(v2); const ok = phoneFit || (Math.abs(px(v) - px(v2)) <= 0.15 && rest(v) === rest(v2)); if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'} ${w}px ${s}: toolbox ${v}${ok && !phoneFit ? '' : ' | baked ' + v2}${phoneFit ? ' (phone-fit exception, not yet ruled by the BO: e-mail capped at 9vw so it fits the screen)' : ''}`); });
  const okx = A.extra.ox === B.extra.ox && A.extra.indent.replace(/\s/g, '') === B.extra.indent.replace(/\s/g, ''); if (!okx) fails++;
  console.log(`${okx ? 'PASS' : 'FAIL'} ${w}px accent ${A.extra.ox} → ${B.extra.ox} · hero indent ${A.extra.indent} → ${B.extra.indent} · toolbox present after: ${B.extra.toolbox}`);
  if (B.extra.toolbox) fails++;
}
console.log(fails ? `bake: ${fails} differences` : 'bake: identical (apart from the listed exception)'); await b.close();
