#!/usr/bin/env python3
"""build-cases.py — the case studies from their source files into the page.

What it does, in plain words:
1. reads every client in the page's CASES list, the listing CSV (three-line summaries, Drive links) and the full
   study texts in reference/case-studies/<name>.md;
2. writes them as one data block CASE_DOCS into the page, between the markers <!-- CASE_DOCS:START --> and
   <!-- CASE_DOCS:END --> (the "Read the full case study" pop-up reads it; no Drive link is needed);
3. writes one page per study: variants/variant-A-clay-and-ink/results/<name>.html, in the landing page's design
   (its fonts and stylesheet are copied in), header = short title + value.
A study without its .md file shows its three-line summary and says the full text follows.
Usage: python3 tools/build-cases.py <repo root>
"""
import csv, html, json, re, sys
from pathlib import Path
import markdown

R = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
PAGE = R / "variants/variant-A-clay-and-ink/index.html"
OUT = R / "variants/variant-A-clay-and-ink/results"
s = PAGE.read_text(encoding="utf-8")

slug = lambda t: re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", t.lower().replace("&", "and")))   # same rule as the page
cases = json.loads(s[s.index("const CASES = ") + len("const CASES = "): s.index("];", s.index("const CASES = ")) + 1])
feat = json.loads(s[s.index("const FEATURED = ") + len("const FEATURED = "): s.index(";", s.index("const FEATURED = "))])
heads = json.loads(re.sub(r",\s*}", "}", s[s.index("const OPPORTUNITY_HEADLINES = ") + len("const OPPORTUNITY_HEADLINES = "): s.index("};", s.index("const OPPORTUNITY_HEADLINES = ")) + 1]))
rows = list(csv.DictReader(open(R / "reference/data/Business_Case_Studies_-_Business_Studies_Listing.csv", encoding="utf-8-sig")))

def listing(c):
    # matched by the study's own Drive address (CASES ▸ url); a name match picked the wrong row (Advanced → "Connect")
    return next((r for r in rows if c.get("url") and r["Business Study URL"].strip() == c["url"]), None)

# each client's full text (source: the Lovable repo ▸ reference/case-studies/); short names since 18 Nov 2026 so Windows can check them out
FILES = {
    "Lasting Blueprint Productions": "Lasting Blueprint Productions - 4 Intros 78 Days.md",
    "ForPlayers": "ForPlayers - 70000 EUR New Revenue.md",
    "Connect Group": "Connect Group - 105K Revenue.md",
    "Clean-Seas West Virginia": "Clean-Seas West Virginia - 6 Intros 120 Days.md",
    "Elate Staffing": "Elate Staffing - 22 Placements 55 Days.md",
    "HelpCare AI": "HelpCare AI - 4 Healthcare Clients.md",
    "Crawford Thomas Recruiting": "Crawford Thomas Recruiting - 100K Revenue.md",
    "Tetra Films": "Tetra Films - Canadian Footwear Brand.md",
    "Hippocratic AI": "Hippocratic AI - 2 Partners 60 Days.md",
    "RESPILON": "RESPILON - 3 Intros 43 Days.md",
    "FabuLingua": "FabuLingua - 5 Clients 48 Days.md",
    "Advanced Medical Sales": "Advanced Medical Sales - Healthcare Network.md",
    "DGR Systems": "DGR Systems - School District.md",
    "Angie Nola Maids": "Angie Nola Maids - Airbnb Owner.md",
    "Vention": "Vention - 85K Revenue.md",
    "Regent Peak Wealth Advisors": "Regent Peak Wealth Advisors - 6 Intros 45 Days.md",
}

def render(md):
    # a file whose title is a bold line, not a heading (the Clean-Seas file), gets its title shown as the heading
    md = re.sub(r"\A\s*\*\*([^*\n]+)\*\*[ \t]*\n", lambda m: "# **" + m.group(1) + "**\n", md, count=1)
    return markdown.markdown(md, extensions=["extra", "sane_lists"])

docs, report = {}, []
live = {f["client"] for f in feat}   # BO 18 Nov 2026: only the featured cases are on the page; the others wait for their month
for c in [c for c in cases if c["client"] in live]:
    n = slug(c["client"]); f = R / "reference/case-studies" / FILES.get(c["client"], f"{n}.md"); r = listing(c)
    vertical = next((x["vertical"] for x in feat if x["client"] == c["client"]), c.get("industry", ""))
    short = f'{vertical}: {c["client"]}'
    if f.exists():
        body, source = render(f.read_text(encoding="utf-8")), "full"
    elif r:
        body, source = f'<p>{html.escape(r["Business Study 3 Lines Summary"])}</p><p class="case-pending">The full case study follows.</p>', "summary"
    else:
        body, source = '<p class="case-pending">The full case study follows.</p>', "none"
    docs[n] = {"client": c["client"], "short": short, "value": f'{c["figure"]} {c["measure"]}'.strip(), "figure": c["figure"],
               "headline": heads.get(c["client"], [""])[0], "html": body, "source": source}
    report.append(f"{source:8} {n}")

block = "<!-- CASE_DOCS:START -->\n<script>\n// the full case studies, built by tools/build-cases.py from reference/case-studies/*.md (do not edit here)\nconst CASE_DOCS = " + json.dumps(docs, ensure_ascii=False) + ";\n</script>\n<!-- CASE_DOCS:END -->"
if "<!-- CASE_DOCS:START -->" in s:
    s = re.sub(r"<!-- CASE_DOCS:START -->.*?<!-- CASE_DOCS:END -->", lambda m: block, s, flags=re.S)
else:
    k = s.index("<script>\n// kind: deal"); s = s[:k] + block + "\n\n" + s[k:]
PAGE.write_text(s, encoding="utf-8")

# the case's own page: the landing page's head (fonts, stylesheet) + mast + the study + contact line
head = s[: s.index("</head>")]
head = re.sub(r"<title>.*?</title>", "<title>{title}</title>", head, flags=re.S)
head = head.replace("../../", "../../../")
mast = s[s.index('<header class="mast'): s.index("</header>") + len("</header>")].replace('href="#', 'href="../index.html#').replace("../../", "../../../")
OUT.mkdir(exist_ok=True)
for old in OUT.glob("*.html"):
    if old.stem not in docs: old.unlink()   # a case taken off the page loses its own page too
for n, d in docs.items():
    page = (head.replace("{title}", html.escape(f'{d["short"]} · Acceler8zone')) + """</head>
<body class="case-page">
""" + mast + f"""
<main class="case-main">
  <div class="wrap case-wrap">
    <p class="case-back"><a class="u" href="../index.html#record">← All client results</a></p>
    <header class="case-head">
      <div class="eyebrow case-short">{html.escape(d["short"])}</div>
      <p class="case-value"><b>{html.escape(d["figure"])}</b> {html.escape(d["value"][len(d["figure"]):].strip())}</p>
      {f'<h1 class="case-title">{html.escape(d["headline"])}</h1>' if d["headline"] else f'<h1 class="case-title">{html.escape(d["client"])}</h1>'}
    </header>
    <article class="case-body">{d["html"]}</article>
    <p class="case-cta">Looking for customers, a supplier or a partner? <a class="u" href="mailto:andjay@acceler8zone.com">andjay@acceler8zone.com</a></p>
  </div>
</main>
</body></html>
""")
    (OUT / f"{n}.html").write_text(page, encoding="utf-8")
print("\n".join(report)); print(f"case-docs: {sum(1 for d in docs.values() if d['source']=='full')} full · {sum(1 for d in docs.values() if d['source']=='summary')} summary · {len(docs)} pages in {OUT}")
