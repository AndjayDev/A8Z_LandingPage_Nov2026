// Diagnosis for YouTube Error 153: which Referer reaches YouTube when the pop-up opens, per way of opening the page
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core'; import http from 'http'; import fs from 'fs';
const [file] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const html = fs.readFileSync(file);
const srv = http.createServer((q, s) => { if (q.url.startsWith('/preview')) { s.writeHead(200, { 'content-type': 'text/html' }); s.end(`<iframe sandbox="allow-scripts allow-popups allow-modals" style="width:1440px;height:900px;border:0" src="/page"></iframe>`); } else { s.writeHead(200, { 'content-type': 'text/html' }); s.end(html); } }).listen(8765);
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
for (const [name, url, inFrame] of [['opened as a file', 'file://' + file, false], ['served from a web address (live-site case)', 'http://localhost:8765/page', false], ['inside a sandboxed preview frame', 'http://localhost:8765/preview', true]]) {
  const p = await b.newPage(); let seen = null, shown = '';
  await p.setRequestInterception(true);
  p.on('request', r => { const u = r.url(); if (u.startsWith('https://andjaydev.github.io/A8Z_LandingPage_Nov2026/relay/youtube/')) { seen = { url: u.slice(0, 140), referer: 'via relay (the relay page asks YouTube with its own https address)' }; return r.abort(); }
    if (/youtube(-nocookie)?\.com\/embed/.test(u)) { seen = { url: u.slice(0, 140), referer: r.headers()['referer'] || '(none)' }; return r.abort(); }
    (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('http://localhost')) ? r.continue() : r.abort(); });
  await p.setViewport({ width: 1440, height: 900 }); await p.goto(url, { waitUntil: 'load' }); await W(1200);
  const f = inFrame ? p.frames().find(x => x !== p.mainFrame()) : p.mainFrame();
  await f.evaluate(() => document.querySelector('#teach .video').click()); await W(1200);
  shown = await f.evaluate(() => { const d = document.getElementById('media'); return d && d.open ? (d.querySelector('iframe') ? 'player frame' : 'note: ' + (d.querySelector('.media-frame')?.innerText || '').slice(0, 90)) : 'closed'; });
  const ok = seen ? (/^https?:\/\//.test(seen.referer) || seen.referer.startsWith('via relay')) : false;
  console.log(`${ok ? 'PASS' : 'FAIL'} R · ${name}: ${seen ? `player asked with Referer ${seen.referer}` : 'no player request'} · pop-up shows ${shown}${seen ? ' · ' + seen.url : ''}`);
  await p.close();
}
await b.close(); srv.close();
