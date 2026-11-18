// 5.14 · the page's own video player (BO 18 Nov 2026: no YouTube button, no way out to YouTube).
// Usage: node video-player-check.mjs <page address> <shots folder>
// P1 "See How It Works" opens the pop-up with the page's <video> (the playlist through hls.js = a blob: address, Safari the .m3u8, last resort the .mp4), no <iframe>, no native controls
// P2 a click elsewhere on the video screen of the glass frame opens it too
// P3 the player shows its own controls: play, position bar, time, sound, full screen; no YouTube text or link anywhere in it
// P4 nothing is asked from youtube.com, youtube-nocookie.com, ytimg.com or googlevideo.com
// P5 the playlist of 4-second pieces is served and lists the whole video (jumping works even when the host sends files only whole)
// P8 jumping: a click at 60 % of the position bar lands at 60 % and keeps playing (5.15: before, it started from the beginning)
// P9 speed: + and − change it in 10 % steps, from 0.5× up to 2×
// P10 volume: the slider sets it in 10 % steps; the speaker button mutes and unmutes
// P6 when this browser can decode H.264 the video plays and the play button turns to pause; otherwise it says so
// P7 closing the pop-up removes the player (the video stops)
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const [url, shots = '.'] = process.argv.slice(2); const W = ms => new Promise(r => setTimeout(r, ms)); let fails = 0;
const ok = (id, what, pass, seen) => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${what}${seen !== undefined ? ' · ' + (typeof seen === 'string' ? seen : JSON.stringify(seen)) : ''}`); };
const b = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
const p = await b.newPage(); const yt = [], errs = []; p.on('pageerror', e => errs.push(String(e)));
p.on('request', r => { if (/youtube|ytimg|googlevideo/.test(r.url())) yt.push(r.url()); });
await p.setViewport({ width: 1440, height: 900 }); await p.goto(url, { waitUntil: 'load' }); await p.waitForFunction(() => document.querySelectorAll('#wall .stone').length > 0, { timeout: 30000 }); await W(1200);   // the page scripts have run
await p.evaluate(() => document.querySelector('#teach').scrollIntoView({ block: 'center' })); await W(600);
const read = () => p.evaluate(() => { const d = document.getElementById('media'), v = d?.querySelector('video');
  return { open: !!d?.open, src: v?.getAttribute('src') || '', iframes: d?.querySelectorAll('iframe').length, nativeControls: !!v?.controls,
    parts: ['.vp-play', '.vp-track', '.vp-time', '.vp-mute', '.vp-full'].filter(s => d?.querySelector(s)).length,
    yt: /youtube/i.test(d?.innerHTML || ''), links: d?.querySelectorAll('.vp a').length,
    can: v ? v.canPlayType('video/mp4; codecs="avc1.64001F, mp4a.40.2"') : '' }; });
await p.click('#teach [data-video]'); await p.waitForFunction(() => document.querySelector('#media video')?.src, { timeout: 8000 }).catch(() => {}); await W(400); let s = await read();
ok('P1', '"See How It Works" opens the page\'s own player', s.open && /(\/video\/a8z-intro\.mp4|\/video\/hls\/a8z-intro\.m3u8)$|^blob:/.test(s.src) && s.iframes === 0 && !s.nativeControls, s);
await p.screenshot({ path: `${shots}/video-player-1440.png` });
ok('P3', 'own controls present (5 of 5), no YouTube text or link in the player', s.parts === 5 && !s.yt && s.links === 0, { parts: s.parts, youtube: s.yt, links: s.links });
if (s.can) { await W(2500); const st = await p.evaluate(() => { const v = document.querySelector('#media video'); return { t: v.currentTime, paused: v.paused, label: document.querySelector('#media .vp-play').getAttribute('aria-label') }; });
  ok('P6', 'the video plays (this browser decodes H.264)', st.t > 0.5 && !st.paused && st.label === 'Pause', st); }
else console.log('NOTE P6 this test browser has no H.264 decoder (open-source Chromium); playback is checked in a normal browser');
if (s.can) {
  const box = await p.evaluate(() => { const r = document.querySelector('#media .vp-track').getBoundingClientRect(); return { x: r.left + r.width * .6, y: r.top + r.height / 2 }; });
  await p.mouse.move(box.x, box.y); await p.mouse.down(); await p.mouse.up(); await W(2500);
  const j = await p.evaluate(() => { const v = document.querySelector('#media video'); return { t: Math.round(v.currentTime), d: Math.round(v.duration), paused: v.paused }; });
  ok('P8', 'a click at 60 % of the position bar lands at 60 % and keeps playing', j.t >= j.d * .6 - 2 && j.t <= j.d * .6 + 8 && !j.paused, j);
  const rate = await p.evaluate(async () => { const q = s => document.querySelector('#media ' + s), w = ms => new Promise(r => setTimeout(r, ms)), out = [];
    for (let i = 0; i < 3; i++) q('.vp-faster').click(); out.push(q('video').playbackRate, q('.vp-rate').textContent);
    for (let i = 0; i < 12; i++) q('.vp-slower').click(); out.push(q('video').playbackRate);
    for (let i = 0; i < 20; i++) q('.vp-faster').click(); out.push(q('video').playbackRate, q('.vp-rate').textContent); return out; });
  ok('P9', 'speed in 10 % steps: 3 × + → 1.3×, floor 0.5×, ceiling 2×', rate[0] === 1.3 && rate[1] === '1.3×' && rate[2] === .5 && rate[3] === 2 && rate[4] === '2.0×', rate);
  const vol = await p.evaluate(() => { const q = s => document.querySelector('#media ' + s), v = q('video'), r = q('.vp-volume'), out = [];
    r.value = '0.4'; r.dispatchEvent(new Event('input', { bubbles: true })); out.push(v.volume);
    q('.vp-mute').click(); out.push(v.muted); q('.vp-mute').click(); out.push(v.muted, v.volume); return out; });
  ok('P10', 'volume slider sets 40 %; the speaker mutes and unmutes', Math.abs(vol[0] - .4) < .01 && vol[1] === true && vol[2] === false && Math.abs(vol[3] - .4) < .01, vol);
}
await p.evaluate(() => document.querySelector('#media [data-media-close]')?.click()); await W(400);
const gone = await p.evaluate(() => ({ open: document.getElementById('media').open, players: document.querySelectorAll('#media video').length }));
ok('P7', 'closing the pop-up removes the player', !gone.open && gone.players === 0, gone);
await p.evaluate(() => document.querySelector('#teach .gvf-copy .gvf-kicker').click()); await p.waitForFunction(() => document.querySelector('#media video')?.src, { timeout: 8000 }).catch(() => {}); s = await read();
ok('P2', 'a click on the video screen (not the button) opens it too', s.open && /(a8z-intro\.mp4|a8z-intro\.m3u8)$|^blob:/.test(s.src), { open: s.open });
await p.evaluate(() => document.querySelector('#media [data-media-close]')?.click()); await W(300);
const net = await p.evaluate(async () => { const a = await fetch('/video/hls/a8z-intro.m3u8'); const t = await a.text(); const secs = [...t.matchAll(/#EXTINF:([\d.]+)/g)].reduce((x, m) => x + +m[1], 0); return { status: a.status, pieces: (t.match(/\.ts/g) || []).length, seconds: Math.round(secs) }; });
ok('P5', 'the playlist of pieces is served and covers the whole video', net.status === 200 && net.pieces > 50 && Math.abs(net.seconds - 420) < 3, net);
ok('P4', 'nothing asked from YouTube or Google video hosts', yt.length === 0, yt.slice(0, 2));
ok('P0', 'no script errors', errs.length === 0, errs.slice(0, 2));
console.log(`video player: ${fails === 0 ? 'all pass' : fails + ' failed'}`); await b.close(); process.exit(fails ? 1 : 0);
