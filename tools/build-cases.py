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

# each client's full text, by the BO's file name, verbatim (source: the Lovable repo ▸ reference/case-studies/)
FILES = {
    "Tetra Films": "Connecting a Commercial Production Studio With a Canadian Footwear Brand.md",
    "Advanced Medical Sales": "Connecting a Pharmaceutical Wholesaler With a Healthcare Network.md",
    "Connect Group": "Case Study_ Connect Group (+$105K) _ Scaling AI Talent Placements with Advanced Sales Systems.md",
    "Crawford Thomas Recruiting": "Crawford Thomas Recruiting (+$100K)_ Transforming Skepticism into Success.md",
    "Vention": "Case Study_ Vention (+$85K) _ Scaling Success with Precision.md",
    "Elate Staffing": "Case Study_ Elate Staffing Solutions Ltd. – Elevating Recruitment Efficiency.md",
    "HelpCare AI": "Case Study Acceler8zone x Help HelpCare AI’s —Securing 4 Key Healthcare D.md",
    "Hippocratic AI": "Case Study_ Hippocratic AI (2 New Partners) _ In 60 Days W_Acceler8zone.md",
    "Clean-Seas West Virginia": "Brutal Route, Real Proof_ 6 Introductions for Clean-Seas West Virginia in 120.md",
    "Regent Peak Wealth Advisors": "Case Study - Regent Peak Wealth Advisors - Acceler8zone.md",
    "FabuLingua": "Case Study_ FabuLingua (5 New Clients) _ In 48 Days W_Acceler8Zone.md",
    "Angie Nola Maids": "Connecting a Cleaning Company With a New Orleans Airbnb Owner.md",
    "DGR Systems": "Connecting a Florida Technology Company With a School District.md",
    "ForPlayers": "Case Study_ForPlayers (+70,000€) _Accelerating Growth in Esports with Targeted Lead Generation.md",
    "Lasting Blueprint Productions": "Case Study_How We Routed 4 Qualified Introductions for Lasting Blueprint Productions in 78 Days.md",
}

def render(md):
    # a file whose title is a bold line, not a heading (the Clean-Seas file), gets its title shown as the heading
    md = re.sub(r"\A\s*\*\*([^*\n]+)\*\*[ \t]*\n", lambda m: "# **" + m.group(1) + "**\n", md, count=1)
    return markdown.markdown(md, extensions=["extra", "sane_lists"])

docs, report = {}, []
for c in cases:
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
