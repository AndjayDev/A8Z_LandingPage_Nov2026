import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const W = ms => new Promise(r => setTimeout(r, ms)); const file = process.argv[2];
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 200)));
await p.setRequestInterception(true); p.on('request', r => { const u = r.url(); (u.startsWith('file:') || u.startsWith('data:')) ? r.continue() : r.abort(); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto('file://' + file, { waitUntil: 'load' }); await W(1200);
const openDlg = () => p.evaluate(() => { const d = [...document.querySelectorAll('dialog')].find(d => d.open); return d ? (d.querySelector('h2,h3')?.textContent || d.textContent).trim().slice(0, 60) : ''; });
const out = [];
for (const k of ['win', 'open']) { await p.evaluate(k => document.querySelector(`[data-door="${k}"]`).click(), k); await W(500); const t = await openDlg(); out.push(`${t ? 'PASS' : 'FAIL'} door ${k} opens: "${t}"`);
  const memo = await p.$('dialog[open] [data-door-memo]'); if (memo) { await memo.click(); await W(500); out.push(`${(await openDlg()) ? 'PASS' : 'FAIL'} door ${k} memo opens: "${await openDlg()}"`); }
  await p.keyboard.press('Escape'); await W(400); if (await openDlg()) { await p.keyboard.press('Escape'); await W(400); } out.push(`${(await openDlg()) ? 'FAIL' : 'PASS'} door ${k} closes with Escape`); }
const memoLink = await p.$('[data-memo]'); if (memoLink) { await p.evaluate(() => document.querySelector('[data-memo]').click()); await W(500); out.push(`${(await openDlg()) ? 'PASS' : 'FAIL'} money-section memo opens: "${await openDlg()}"`); await p.keyboard.press('Escape'); await W(400); }
// filters and show all
const counts = []; for (const f of await p.$$eval('.filters button', bs => bs.map(b => b.dataset.filter))) { await p.evaluate(f => document.querySelector(`.filters button[data-filter="${f}"]`).click(), f); await W(200); counts.push(f + ':' + await p.$$eval('#record .stone:not(.hidden):not(.cta)', s => s.length)); }
out.push('filters ' + counts.join(' · '));
await p.evaluate(() => document.querySelector('.filters button[data-filter="all"]').click()); await p.evaluate(() => document.getElementById('record-more').click()); await W(200);
out.push('show all → ' + await p.$$eval('#record .stone:not(.hidden):not(.cta)', s => s.length) + ' stones · header count ' + await p.$eval('.record h2 span', s => s.textContent));
// carousel tabs
await p.evaluate(() => document.querySelectorAll('.cx [role="tab"]')[1].click()); await W(1900); out.push('carousel tab 2 → ' + await p.$eval('.cx-img.is-on', i => i.dataset.person));
console.log(out.join('\n')); console.log('errors', errs); await b.close();
