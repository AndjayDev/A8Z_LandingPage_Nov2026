import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [file] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
for (const [vw, vh] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage(); const errs = [], failed = [];
  p.on('pageerror', e => errs.push(String(e).slice(0, 200))); p.on('requestfailed', r => failed.push(r.url().slice(0, 90) + ' ' + r.failure()?.errorText));
  await p.setViewport({ width: vw, height: vh }); await p.goto('file://' + file, { waitUntil: 'load' }); await W(1500);
  // scroll through the whole page so lazy and scroll-driven parts run
  const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += vh * .8) { await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await W(150); }
  const r = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const wide = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.right > vw + 1 && cs.position !== 'fixed' && !e.closest('#fp, [hidden], template, .marquee, .ticker, .cx-img'); }).slice(0, 8).map(e => e.tagName.toLowerCase() + '.' + [...e.classList].join('.') + ' right ' + Math.round(e.getBoundingClientRect().right));
    const anchors = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.querySelector(h));
    const files = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => /^(file:|[a-zA-Z]:\/|F:)/.test(h) || h.startsWith('../'));
    const imgs = [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0 && !i.closest('template')).map(i => (i.getAttribute('src') || '').slice(0, 60));
    const noName = [...document.querySelectorAll('button, a[href], input, select')].filter(e => !e.closest('[hidden], template') && !(e.getAttribute('aria-label') || e.textContent.trim() || e.title || e.labels?.length || e.closest('label'))).map(e => e.outerHTML.slice(0, 90));
    const scrollW = document.documentElement.scrollWidth;
    return { vw, scrollW, wide, deadAnchors: anchors, localFileLinks: files, brokenImgs: imgs, unnamedControls: noName.slice(0, 8) };
  });
  console.log(`== ${vw}px`, JSON.stringify(r, null, 1)); console.log('errors', errs); console.log('failed (not fonts):', failed.filter(f => !/fonts\.g|_vercel|ytimg|youtube/.test(f)));
  await p.screenshot({ path: `/home/claude/work/S/full-${vw}.png`, fullPage: true }); await p.close();
}
await b.close();
