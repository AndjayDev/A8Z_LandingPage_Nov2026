// 5.14 · the page's own video player (BO 18 Nov 2026: no YouTube button, no way out to YouTube).
// Usage: node video-player-check.mjs <page address> <shots folder>
// P1 "See How It Works" opens the pop-up with the page's <video> (src /video/a8z-intro.mp4), no <iframe>, no native controls
// P2 a click elsewhere on the video screen of the glass frame opens it too
// P3 the player shows its own controls: play, position bar, time, sound, full screen; no YouTube text or link anywhere in it
// P4 nothing is asked from youtube.com, youtube-nocookie.com, ytimg.com or googlevideo.com
// P5 the file is served whole and in parts (206 for a range: needed to jump in the video); its first bytes say MP4
// P6 when this browser can decode H.264 the video plays and the play button turns to pause; otherwise it says so
// P7 closing the pop-up removes the player (the video stops)
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [url, shots = '.'] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms)); let fails = 0;
const ok = (id, what, pass, seen) => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${what}${seen !== undefined ? ' · ' + (typeof seen === 'string' ? seen : JSON.stringify(seen)) : ''}`); };
const b = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); const yt = [], errs = []; p.on('pageerror', e => errs.push(String(e)));
p.on('request', r => { if (/youtube|ytimg|googlevideo/.test(r.url())) yt.push(r.url()); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto(url, { waitUntil: 'load' }); await W(1200);
await p.evaluate(() => document.querySelector('#teach').scrollIntoView({ block: 'center' })); await W(600);
const read = () => p.evaluate(() => { const d = document.getElementById('media'), v = d?.querySelector('video');
  return { open: !!d?.open, src: v?.getAttribute('src') || '', iframes: d?.querySelectorAll('iframe').length, nativeControls: !!v?.controls,
    parts: ['.vp-play', '.vp-track', '.vp-time', '.vp-mute', '.vp-full'].filter(s => d?.querySelector(s)).length,
    yt: /youtube/i.test(d?.innerHTML || ''), links: d?.querySelectorAll('.vp a').length,
    can: v ? v.canPlayType('video/mp4; codecs="avc1.64001F, mp4a.40.2"') : '' }; });
await p.click('#teach [data-video]'); await W(1200); let s = await read();
ok('P1', '"See How It Works" opens the page\'s own player', s.open && /\/video\/a8z-intro\.mp4$/.test(s.src) && s.iframes === 0 && !s.nativeControls, s);
await p.screenshot({ path: `${shots}/video-player-1440.png` });
ok('P3', 'own controls present (5 of 5), no YouTube text or link in the player', s.parts === 5 && !s.yt && s.links === 0, { parts: s.parts, youtube: s.yt, links: s.links });
if (s.can) { await W(2500); const st = await p.evaluate(() => { const v = document.querySelector('#media video'); return { t: v.currentTime, paused: v.paused, label: document.querySelector('#media .vp-play').getAttribute('aria-label') }; });
  ok('P6', 'the video plays (this browser decodes H.264)', st.t > 0.5 && !st.paused && st.label === 'Pause', st); }
else console.log('NOTE P6 this test browser has no H.264 decoder (open-source Chromium); playback is checked in a normal browser');
await p.evaluate(() => document.querySelector('#media [data-media-close]')?.click()); await W(400);
const gone = await p.evaluate(() => ({ open: document.getElementById('media').open, players: document.querySelectorAll('#media video').length }));
ok('P7', 'closing the pop-up removes the player', !gone.open && gone.players === 0, gone);
await p.evaluate(() => document.querySelector('#teach .gvf-copy .gvf-kicker').click()); await W(900); s = await read();
ok('P2', 'a click on the video screen (not the button) opens it too', s.open && /a8z-intro\.mp4$/.test(s.src), { open: s.open });
await p.evaluate(() => document.querySelector('#media [data-media-close]')?.click()); await W(300);
const net = await p.evaluate(async () => { const a = await fetch('/video/a8z-intro.mp4', { headers: { Range: 'bytes=0-11' } }); const buf = new Uint8Array(await a.arrayBuffer());
  return { status: a.status, type: a.headers.get('content-type'), sig: String.fromCharCode(...buf.slice(4, 8)) }; });
ok('P5', 'the file is served in parts (206) and is an MP4', net.status === 206 && net.sig === 'ftyp', net);
ok('P4', 'nothing asked from YouTube or Google video hosts', yt.length === 0, yt.slice(0, 2));
ok('P0', 'no script errors', errs.length === 0, errs.slice(0, 2));
console.log(`video player: ${fails === 0 ? 'all pass' : fails + ' failed'}`); await b.close(); process.exit(fails ? 1 : 0);
