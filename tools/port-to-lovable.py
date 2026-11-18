"""Port the landing page from this drafts repo into the Lovable repo.

Run:  python3 tools/port-to-lovable.py <drafts repo> <lovable repo>

What it writes into the Lovable repo (nothing else is touched):
  src/landing/page.html          the page, with asset paths pointed at the Lovable public/ folder
                                 and the Vercel analytics lines removed (they do not exist on Lovable)
  public/landing/fonts/...       the self-hosted News Cycle font
  public/results/<slug>.html     the own page of each featured case study
The React side (src/pages/Landing.tsx, the "/" route, index.html head) is written by hand once
and reads src/landing/page.html, so a later page change is: edit the draft, run this script, commit.
"""
import re, shutil, sys
from pathlib import Path

D, L = Path(sys.argv[1]), Path(sys.argv[2])
V = D / "variants/variant-A-clay-and-ink"

def fix(s, up):
    s = s.replace(f'{up}assets/people/', '/images/')
    s = s.replace(f'{up}assets/brand/', '/images/')
    s = s.replace(f'{up}fonts/', '/landing/fonts/')
    s = s.replace('href="../index.html#record"', 'href="/#record"')
    # Vercel analytics: two lines in the page, one in each case page head
    s = re.sub(r'<script defer="" src="/_vercel/insights/script\.js"></script>', '', s)
    s = re.sub(r'<script>window\.va = window\.va \|\|.*?</script>\n?', '', s, flags=re.S)
    return s

page = fix((V / "index.html").read_text(encoding="utf-8"), "../../")
assert "../../" not in page.split("<body>")[0] + page.split("<body>")[1].split("<script>")[0], "a relative asset path is left in the page"
assert "_vercel" not in page
# every picture the page asks for must exist in the Lovable public/ folder under a web-safe name
# (the live host answers 404 for names with a space or @, 18 Nov 2026)
for name in sorted(set(re.findall(r'(?:src|href)="/images/([^"]+)"', page))):
    assert re.fullmatch(r"[A-Za-z0-9._-]+", name), f"not a web-safe file name: {name}"
    src = D / "assets/people" / name
    if src.exists():
        shutil.copy2(src, L / "public/images" / name)
    assert (L / "public/images" / name).exists(), f"missing in public/images: {name}"
(L / "src/landing").mkdir(parents=True, exist_ok=True)
(L / "src/landing/page.html").write_text(page, encoding="utf-8")

fonts = L / "public/landing/fonts/news-cycle"
fonts.mkdir(parents=True, exist_ok=True)
for f in (D / "fonts/news-cycle").iterdir():
    shutil.copy2(f, fonts / f.name)

out = L / "public/results"
if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True)
n = 0
for f in sorted((V / "results").glob("*.html")):
    s = fix(f.read_text(encoding="utf-8"), "../../../")
    assert "../../../" not in s and "_vercel" not in s, f.name
    (out / f.name).write_text(s, encoding="utf-8"); n += 1
print(f"page.html {len(page)} characters · fonts {len(list(fonts.iterdir()))} files · case pages {n}")
