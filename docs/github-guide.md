# Storing the Acceler8zone page on GitHub — beginner's guide

*Written for someone with a few weeks of GitHub experience. No command line needed.*

---

## TLDR

1. **You create one empty, private repository** called `acceler8zone-site`.
2. **You tell me its exact name.** I then place every file through the GitHub connection in this chat, in one tidy commit (a commit is one saved snapshot).
3. **You open the repository page and check the folders.**

If the connection can't write to the repository, plan B is your own drag-and-drop upload (step 4). It takes the same files from `acceler8zone-site.zip`.

> **What a repository is:** one project folder that lives online. GitHub keeps every earlier version of every file, so nothing you replace is ever lost.

---

## The three large steps, clarified up front

| Step | Who | What happens | What can go wrong |
|---|---|---|---|
| 1 · Create | You | An empty private repository appears on your account | Ticking "Add a README" creates a first file. That is harmless, but leave it unticked so my first commit is clean |
| 2 · Deposit | Me | All files land in the folders shown below, in one commit named "Variant A + reference captures" | If the connection lacks write access, I tell you and switch to step 4 |
| 3 · Check | You | You click through the folders and open `variants/variant-A-clay-and-ink/index.html` | Nothing changes on your live website. A repository is storage, not publishing |

---

## Step 1 — Create the repository

1. Go to **github.com** and sign in.
2. Click the **+** at the top right, then **New repository**.
3. **Repository name:** `acceler8zone-site`
4. **Visibility:** **Private**. Only you, and anyone you invite, can see it.
5. Leave **Add a README**, **.gitignore** and **license** unticked.
6. Click **Create repository**.
7. Copy the address from your browser bar. It looks like `github.com/<your-username>/acceler8zone-site`. Send it to me in the chat.

## Step 2 — I deposit the files

When you send the address, I write all the files into the repository and report back with the commit link and a file count.

## Step 3 — Check

1. Open the repository page and confirm the five folders below are there.
2. Open `README.md`. It explains the folders in plain words.
3. GitHub shows `.html` files as code, not as a page. To *see* the page:
   - download the file and double-click it, or
   - keep using the copy I sent in the chat.

## Step 4 — Plan B: upload it yourself

1. Unzip `acceler8zone-site.zip` on your computer.
2. In your empty repository, click **uploading an existing file**. The link sits on the empty repository's start page.
3. Drag **everything inside** the unzipped folder into the browser window. The folder structure is kept.
4. Type the commit message `Variant A + reference captures` and click **Commit changes**.

---

## The folder structure

```
acceler8zone-site/
├── README.md                          plain explanation of the folders
├── index.html                         the current live page, unchanged (your page.html)
├── variants/
│   └── variant-A-clay-and-ink/
│       └── index.html                 Variant A
├── reference/                         everything you uploaded, names unchanged
│   ├── page.html
│   ├── sections/                      section-10.html … section-13.html
│   ├── data/                          sections.csv, components.csv, typography.csv, index_preflight.csv
│   ├── xml/                           site_tree.xml, sitemap.xml, structure.xml
│   └── screenshots/                   your seven screenshots
├── renders/                           before/after captures, desktop and phone
└── docs/                              explainer.md, missing-elements.md, github-guide.md, technical-guide.md
```

> **Why this shape:** the live page stays at the top, untouched. Each new variant gets its own folder. Your original captures never mix with new work. When B and C arrive, they become `variants/variant-B-…` and `variants/variant-C-…`.

---

## Three habits worth keeping

1. **One change, one commit, one clear message.** For example: "Variant B: sage palette".
2. **Never delete. Move to a folder called `archive/`.** GitHub keeps the history anyway, but a visible archive is easier to find.
3. **Private until you decide otherwise.** You can switch to public later under Settings ▸ General ▸ Danger Zone ▸ Change visibility.
