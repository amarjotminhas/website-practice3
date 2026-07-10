# Everwood Construction — Demo / Pitch Website Template

A complete, multi-page **static** website for a residential construction company,
built as a reusable demo you can reskin for a real client in minutes. Plain
HTML/CSS/JS — no frameworks, no build step, no npm.

The demo client is **Everwood Construction** (Portland, OR). All of that business
content lives in one file — [`js/client-data.js`](js/client-data.js) — so pointing
the template at a new client is a matter of editing values there and regenerating
the static HTML to match.

---

## Local preview

Serve the folder over a local HTTP server — **do not** open the pages by
double-clicking them from the file system.

```bash
# from the project root
python -m http.server 8000
# then visit http://localhost:8000
```

**Why not just double-click?** Some browsers restrict `localStorage` on raw
`file://` origins. The contact form's demo confirmation saves the submission to
`localStorage`, so on a `file://` origin that step can silently fail. Serving over
`http://localhost` (any static server works) avoids it. The code still degrades
gracefully — if storage is blocked it falls back to an in-memory store — but the
demo is meant to be viewed over a local server.

Any static server is fine, e.g.:

```bash
npx serve .        # Node
php -S localhost:8000
```

---

## Deployment

This is a flat static site. Upload the whole folder to any static host:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect the
  repo; no build command, publish directory is the project root.
- **GitHub Pages** — push to a repo and enable Pages on the root.
- **S3 / any web server** — copy the files as-is.

`404.html` is a real dead-end page for typo'd URLs; most hosts serve it
automatically for unknown paths (configure it as the 404 document if needed).

Before going live, complete the two wiring steps under **Reskin checklist**
(form backend + analytics).

---

## How the template is wired

- **`js/client-data.js`** — the single source of truth for business data **and**
  image URLs. It is an *authoring reference only*: it is **not** linked from any
  page and does **not** run in the browser. Edit it, then regenerate the static
  HTML so the markup matches.
- **`js/main.js`** — the only script the browser loads. Interactive behavior only
  (mobile drawer, smooth-scroll, one fade-up animation, and the demo contact form).
  It defines `PROMISE_TEXT` at the top, which must stay identical to the `promise`
  field in `client-data.js`.
- **`css/main.css`** — the whole design system in one file.
- Every page ships **real static HTML** — the hero, footer, trust bar, services,
  project cards, testimonials, FAQ answers, and `<title>`/meta tags are all real
  markup, not rendered by JavaScript.

### Photos & hero video
The six project cards, the service/testimonial card backgrounds, and the About
portrait use live Unsplash URLs; the home hero plays a looping background video
(`heroVideo`, hosted on Pexels) with `heroImage` as its poster/fallback. All are
stored in `client-data.js`. Each `<img>`, background image, and the hero `<video>`
has a `<!-- REPLACE WITH CLIENT'S ACTUAL PHOTO -->` / `<!-- ... VIDEO -->` comment
directly above it. The hero video is muted, autoplaying, and looping, and it is
skipped for visitors who prefer reduced motion (they see the poster image). Swap in
the client's real media before launch.

### Lead capture (demo mode)
The contact form is in **demo mode**. On a valid submit it saves the lead to
`localStorage` (with an in-memory fallback) and shows a confirmation — nothing is
sent anywhere yet. Wire up a form backend before launch (see below).

---

## Reskin checklist (point the template at a new client)

1. **Edit `js/client-data.js`** — replace every value: `companyName`, `tagline`,
   `foundedYear`, `ownerName`, `credentials`, `phone`, `email`, `address`,
   `website`, `hours`, `promise`, `services`, `testimonials`, `projects`,
   `heroImage`, `heroVideo`, `ownerPhoto`.
2. **Regenerate the static HTML** to match the new data — update the hero, trust
   bar, services, project cards, testimonials, footer, and each page's
   `<title>`/meta so they read from the new values. Run the sync check below to
   confirm nothing drifted.
3. **Update the `<select>` options in `contact.html`** to match the new `services`
   array in `client-data.js`. (The options are static HTML, not populated at
   runtime.)
4. **Keep `PROMISE_TEXT` in `js/main.js` identical** to the `promise` field in
   `client-data.js` (character for character).
5. **Replace the photos** — swap each Unsplash URL for the client's real image and
   update the `alt` text to describe the new photo. Keep the
   `<!-- REPLACE WITH CLIENT'S ACTUAL PHOTO -->` workflow.
6. **Replace the testimonials** with the client's real reviews. The included ones
   are sample content and must not ship to real visitors as-is.
7. **Wire up the form backend** — in `contact.html`, set the `<form action="…">`
   attribute to your endpoint (Formspree / Netlify Forms / Web3Forms). Look for the
   comment: `WIRE UP TO A FORM BACKEND … BEFORE GOING LIVE`.
8. **Add analytics** — each page has a commented GA4 slot in `<head>`; paste your
   real snippet in.
9. **Update `sitemap.xml` and `robots.txt`** to the client's real domain (the
   `website` field), and update the `<link rel="canonical">` base on each page.
10. **Regenerate `assets/favicon.svg` and `assets/apple-touch-icon.png`** with the
    new brand letter/colors.

### Sync check
A quick script confirms the shipped HTML still matches `client-data.js`:

```bash
python scripts/sync_check.py    # prints pass/fail per field; non-zero exit on drift
```

---

## File structure

```
/
├── index.html          about.html      services.html   projects.html
├── testimonials.html   blog.html       contact.html    404.html
├── css/main.css
├── js/
│   ├── main.js         ← interactive behavior only; defines PROMISE_TEXT at top
│   └── client-data.js  ← single source of truth; edit this, then regenerate HTML
├── assets/
│   ├── favicon.svg
│   └── apple-touch-icon.png
├── scripts/sync_check.py   ← dev-only content sync check (not served)
├── robots.txt
├── sitemap.xml
└── README.md
```
