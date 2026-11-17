"""One-file version: embeds the favicon, star field, carousel photos and News Cycle so the page opens on its own."""
import sys, base64
SRC, R, OUT = sys.argv[1:4]
s = open(SRC, encoding="utf-8", newline="").read()
def rep(old, new, count=1):
    global s
    n = s.count(old); assert n == count, f"expected {count} got {n}: {old[:80]!r}"; s = s.replace(old, new, count)
b64 = lambda p: base64.b64encode(open(p, "rb").read()).decode()
rep('href="../../assets/brand/favicon150x150.svg"', 'href="data:image/svg+xml;base64,' + b64(f"{R}/assets/brand/favicon150x150.svg") + '"')
rep('url("../../assets/brand/Background-Star-Field.svg")', 'url("data:image/svg+xml;base64,' + b64(f"{R}/assets/brand/Background-Star-Field.svg") + '")')
for f in ["Ame_Office.jpg", "Andjay_Office.jpg"]:
    rep(f'"../../assets/people/{f}"', '"data:image/jpeg;base64,' + b64(f"{R}/assets/people/{f}") + '"', count=s.count(f'"../../assets/people/{f}"'))
css = open(f"{R}/fonts/news-cycle/news-cycle.css", encoding="utf-8").read()
rep('<link href="../../fonts/news-cycle/news-cycle.css" rel="stylesheet">', '<style>\n' + css + '</style>')
rep('<!-- hero line 2 default: News Cycle, self-hosted from News_Cycle.zip -->',
    '<!-- one-file version: News Cycle, the star field, the photos and the favicon are embedded; the repository copy loads them from assets/ and fonts/ -->\n<!-- hero line 2 default: News Cycle, self-hosted from News_Cycle.zip -->')
left = [s[i-30:i+30] for i in range(len(s)) if s.startswith("../../", i)]
assert len(left) == 1 and "fonts/uploaded" in left[0], left
open(OUT, "w", encoding="utf-8", newline="").write(s); print("one-file bytes", len(s.encode()))
