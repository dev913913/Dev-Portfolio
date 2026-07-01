# Portfolio

A single-page portfolio site. Everything you see on the page — text, links,
photos, certificates, projects — comes from **one file**: `content.json`.

## How to update the site (no coding required)

Everything lives in `content.json`. You never need to touch `index.html`,
`css/style.css`, or the files in `js/` for normal updates.

### Add or change your photo
1. Add your image to the `images/` folder (e.g. `images/profile.jpg`).
2. In `content.json`, set `"photo"` under `"profile"` to that path.

### Add a certificate
1. Put the certificate image in `certificates/` (e.g. `certificates/naac-2025.jpg`).
2. In `content.json`, add a new entry under `certificates.items`:
```json
{
  "title": "Certificate Name",
  "issuer": "Who issued it",
  "date": "2025",
  "image": "certificates/naac-2025.jpg"
}
```

### Add a project
Add a new entry under `building.projects`:
```json
{
  "name": "Project Name",
  "description": "One or two sentences.",
  "tech": ["Tech", "Stack"],
  "link": "https://your-live-link.com",
  "image": "images/project-screenshot.jpg"
}
```

### Update a link, bio line, or any text
Just edit the relevant value in `content.json` — everything in quotes after
a colon is editable text.

### How to actually publish the change
- **Easiest:** paste the section you want changed to Claude (or Codex) in
  this repo's context and ask it to update `content.json` — a plain JSON
  edit is low-risk for an AI agent to do correctly, unlike edits buried in
  HTML/CSS.
- **Manual:** edit `content.json` directly in the GitHub web UI (pencil
  icon on the file page) and commit. If deployed on Vercel/Netlify with
  GitHub integration, the live site updates automatically within a minute.
- **Upload photos:** drag files into `images/` or `certificates/` folders
  on GitHub's web UI ("Add file" → "Upload files"), then reference the
  filename in `content.json`.

## Local preview
Open `index.html` directly in a browser, or run a tiny local server:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Deploying
This is a static site (no build step). Easiest options:
- **Vercel**: import this repo, framework preset "Other", no build command needed.
- **GitHub Pages**: Settings → Pages → deploy from `main` branch, root folder.

## Structure
```
index.html        — page structure (rarely needs edits)
css/style.css      — visual design (rarely needs edits)
js/content.js       — loads content.json
js/render.js        — turns content.json into the visible page
content.json        — ALL editable content lives here
images/             — profile photo, project screenshots
certificates/       — certificate images
```
