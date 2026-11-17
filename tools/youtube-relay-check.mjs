// Relay check: the page opened as a FILE (as the BO does in Chrome) loads the relay; the relay, served from a web address,
// asks YouTube with its own address as Referer. The real relay is on GitHub Pages; here a local web server stands in for it.
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core'; import http from 'http'; import fs from 'fs';
const [page, relay] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms));
const local = '/tmp/page-relay-test.html'; fs.writeFileSync(local, fs.readFileSync(page, 'utf8').replace('https://andjaydev.github.io/A8Z_LandingPage_Nov2026/relay/youtube/', 'http://127.0.0.1:8766/relay/youtube/'));
const srv = http.createServer((q, s) => { s.writeHead(200, { 'content-type': 'text/html' }); s.end(fs.readFileSync(relay)); }).listen(8766);
const b = await puppeteer.launch({ args: [...chromium.args, '--allow-file-access-from-files'], executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); let relayReq = null, ytReq = null;
await p.setRequestInterception(true);
p.on('request', r => { const u = r.url();
  if (u.startsWith('http://127.0.0.1:8766/')) { relayReq = u; return r.continue(); }
  if (/youtube-nocookie\.com\/embed/.test(u)) { ytReq = { u: u.slice(0, 150), referer: r.headers()['referer'] || '(none)' }; return r.abort(); }
  (u.startsWith('file:') || u.startsWith('data:')) ? r.continue() : r.abort(); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto('file://' + local, { waitUntil: 'load' }); await W(1000);
await p.evaluate(() => document.querySelector('#teach [data-video]').click()); await W(2500);
const note = await p.evaluate(() => !!document.querySelector('#media .media-local'));
const ok = !!relayReq && ytReq && /^https?:\/\//.test(ytReq.referer) && !note;
console.log(`${ok ? 'PASS' : 'FAIL'} page opened as a file: pop-up loads the relay (${relayReq || 'no relay request'}) · YouTube asked with Referer ${ytReq ? ytReq.referer : '(no request)'} · note shown ${note}`);
await b.close(); srv.close();
