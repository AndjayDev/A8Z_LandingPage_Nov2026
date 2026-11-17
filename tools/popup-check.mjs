// Video + booking pop-up checks (revision 5.3). The visitor must stay on the landing page.
// Usage: node popup-check.mjs <page.html> <label>
// The sandbox cannot reach YouTube or Cal.com, so: the thumbnail and the Cal script fail here (that is the fallback case),
// and C2 serves a stand-in for Cal's embed script that records the calls the page makes to it.
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
const [file, label] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const BO_LEDE = 'Andjay teaches people how to grow connector businesses by selling what partners already want. Members of his network have documented $8 million in wins.';
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const res = []; const check = (id, name, pass, seen) => res.push(`${pass ? 'PASS' : 'FAIL'} ${id} ${name}\n     seen: ${JSON.stringify(seen).slice(0, 260)}`);
const page = async calStub => {
  const p = await b.newPage(); p.errors = []; p.popups = 0; p.on('pageerror', e => p.errors.push(String(e).slice(0, 160)));
  b.on('targetcreated', t => { if (t.type() === 'page' && t.opener && t.opener()) p.popups++; });
  await p.setRequestInterception(true);
  p.on('request', r => { const u = r.url();
    if (calStub && u === 'https://app.cal.com/embed/embed.js') return r.respond({ status: 200, contentType: 'text/javascript', body: `(() => { const C = window.Cal, calls = window.__calCalls = []; Object.keys(C.ns).forEach(ns => { (C.ns[ns].q || []).forEach(a => calls.push([ns, ...a])); C.ns[ns] = function () { calls.push([ns, ...arguments]); }; }); })();` });
    (u.startsWith('file:') || u.startsWith('data:')) ? r.continue() : r.abort(); });
  await p.setViewport({ width: 1440, height: 900 }); await p.goto('file://' + file, { waitUntil: 'load' }); await W(900); return p; };
const dlg = p => p.evaluate(() => { const d = [...document.querySelectorAll('dialog')].find(x => x.open); const f = d && d.querySelector('iframe');
  return { open: !!d, id: d?.id, src: f?.src || '', w: f?.getAttribute('width'), h: f?.getAttribute('height'), frameW: Math.round(d?.querySelector('.media-frame')?.getBoundingClientRect().width || 0), note: d?.querySelector('.media-note:not([hidden])')?.textContent || '', url: location.href.slice(-30) }; });

let p = await page(false);
const teach = await p.evaluate(() => ({ lede: document.querySelector('#teach .lede')?.textContent.trim(), ytLinks: [...document.querySelectorAll('a[href*="youtube.com"]')].length, label: /Watch on YouTube/i.test(document.querySelector('#teach').innerText) }));
check('V1', 'the subtext is the BO text, word for word', teach.lede === BO_LEDE, teach.lede);
check('V2', 'no "Watch on YouTube" label and no link out to YouTube', !teach.label && teach.ytLinks === 0, teach);
await p.evaluate(() => document.querySelector('#teach').scrollIntoView({ behavior: 'instant' })); await W(1500);
const thumb = await p.evaluate(() => { const i = document.querySelector('#teach .video img'), fb = document.querySelector('#teach .video .video-fallback'); return { img: i.hidden ? 'hidden' : i.naturalWidth, card: fb && !fb.hidden ? fb.textContent : '' }; });
check('V3', 'thumbnail blocked (as here): a titled card shows, not an empty black box', thumb.img > 0 || !!thumb.card, thumb);
await p.click('#teach .video'); await W(800); let d = await dlg(p);
check('V4', 'video tile opens the pop-up on this page with the YouTube player, 1280 × 720', d.open && /youtube-nocookie\.com\/embed\/GgIXWb4kymU/.test(d.src) && d.w === '1280' && d.h === '720' && p.popups === 0 && d.url.endsWith('.html'), { ...d, popups: p.popups });
await p.evaluate(() => document.querySelector('[data-media-close]')?.click()); await W(400); const empty = await p.evaluate(() => ({ open: document.getElementById('media')?.open, iframes: document.querySelectorAll('#media iframe').length }));
check('V5', 'closing the pop-up stops the video (frame emptied)', empty.open === false && empty.iframes === 0, empty);

await p.evaluate(() => document.querySelector('#contact').scrollIntoView({ behavior: 'instant' })); await W(300);
await p.click('#contact .alt a'); await W(5000); d = await dlg(p);
check('C1', 'Cal script blocked (as here): "Book one" opens the booking page in a pop-up on this page, with an e-mail line', d.open && d.src.startsWith('https://app.cal.com/andjay-acceler8zone/quickchat') && /andjay@acceler8zone\.com/.test(d.note) && p.popups === 0, { ...d, popups: p.popups });
check('C3', 'no script errors', p.errors.length === 0, p.errors); await p.close();

p = await page(true);
await p.evaluate(() => document.querySelector('#contact').scrollIntoView({ behavior: 'instant' })); await W(300);
await p.hover('#contact .alt a'); await W(600); await p.click('#contact .alt a'); await W(4800);
const calls = await p.evaluate(() => window.__calCalls || null); d = await dlg(p);
const modal = (calls || []).find(c => c[1] === 'modal');
check('C2', 'Cal script available: the page asks Cal for its own pop-up with andjay-acceler8zone/quickchat, and no second frame opens', !!modal && modal[2].calLink === 'andjay-acceler8zone/quickchat' && !d.open && p.popups === 0, { modal, ourDialog: d.open, popups: p.popups });
await p.close();
console.log(res.join('\n')); console.log(`${label}: ${res.filter(r => r.startsWith('PASS')).length} of ${res.length} pass`); await b.close();
