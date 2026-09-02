# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Leonardo Del Bino's personal portfolio website, hosted on GitHub Pages as a pure static HTML site. There is no build step for deployment — all HTML is edited directly. The site uses the **Editorial template by HTML5 UP**, adapted with custom SCSS and content.

## Goals

Keep the website as easy to edit manually as possible.

## Styles

When editing styles, always edit the SCSS files and recompile — never edit `assets/css/main.css` directly.

```bash
# Install sass if not present
npm install -g sass

# Compile SASS (run from repo root)
sass assets/sass/main.scss assets/css/main.css
```

SCSS is organized as:
- `assets/sass/libs/` — variables, mixins, grid, vendor prefixes
- `assets/sass/base/` — reset, page defaults, typography
- `assets/sass/components/` — UI components (buttons, forms, posts, contact, etc.)
- `assets/sass/layout/` — header, banner, footer, sidebar, main area

Breakpoints (defined in `libs/_vars.scss`): `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`.

## Site Structure

| Path | Purpose |
|------|---------|
| `index.html` | Homepage — banner + blog post grid (3 most recent) |
| `about/index.html` | Bio, research background, Akhetonics |
| `bucket-list/index.html` | Personal goals and milestones |
| `work-with-me/index.html` | Work With Me page |
| `blog/index.html` | Full blog post grid (all posts) |
| `posts/<slug>/` | Individual blog posts — see "Blog / adding a post" below |

## Shared Header, Sidebar & Footer

The header, sidebar (including the nav menu and contact section), and footer are defined once in [`assets/js/includes.js`](assets/js/includes.js) and injected into every page at load time via JavaScript template literals. To change any of these elements, edit only that file — no other page needs touching.

Each HTML page has empty placeholders that get populated:
```html
<header id="header"></header>   <!-- inside #main .inner -->
<div id="sidebar"></div>        <!-- sibling of #main -->
```

`includes.js` must be loaded **before** `main.js` (the template's JS reads `#sidebar` synchronously at script execution time):
```html
<script src="/assets/js/includes.js"></script>
<script src="/assets/js/main.js"></script>
```

## Blog / adding a post

Posts live under `posts/<slug>/`, where `<slug>` is `YYYY-MM-DD-short-title`. The homepage and `/blog/` both render their post grid client-side from a single hand-maintained data file — nothing else needs to change when you add a post beyond the two steps below. Copy `posts/_TEMPLATE/` as a starting point.

**1. Create the post file(s).** A post is either single-language or dual-language:

- **Single-language** — just `posts/<slug>/index.html`, with `<html lang="en" data-post-langs="en">` (or `lang="it" data-post-langs="it"`).
- **Dual-language** — three files:
  - `posts/<slug>/index.html` — a redirect stub (copy `posts/_TEMPLATE/index.html` verbatim, no edits needed beyond the `<title>`) that sends visitors to whichever language `assets/js/lang.js` resolves for them (their stored choice, else browser language, else `data-post-default`, which defaults to `en`).
  - `posts/<slug>/en.html` — the English article, `<html lang="en" data-post-langs="en,it">`.
  - `posts/<slug>/it.html` — the Italian article, `<html lang="it" data-post-langs="en,it">`.

  Both `en.html`/`it.html` need a `<div id="lang-switch"></div>` inside `<header class="main">` (the template already has it) — `lang.js` renders the "EN | IT" toggle there automatically.

**2. Add one entry to `assets/js/posts-data.js`** — this is what drives the homepage/`/blog/` grids:
```js
{
  slug: "YYYY-MM-DD-short-title",
  date: "YYYY-MM-DD",
  image: "/images/example.jpg", // or null
  langs: {
    en: { title: "...", excerpt: "..." },
    it: { title: "...", excerpt: "..." } // omit if it.html doesn't exist
  }
}
```
The `langs` keys here must match each file's `data-post-langs` — there's no build step to enforce this, so keep them in sync by hand.

That's it — no other file needs editing. `assets/js/lang.js` handles language detection/redirect/switching, `assets/js/blog.js` renders the grids from `posts-data.js`.

## Known TODOs

See `todo.md` for the full list. Key outstanding items:
- "Work With Me" button links to `#` — not yet implemented
- Hosting on both leonardodelbino.com and lyonnard.github.io planned

## Workflow Rules

- Do not use test suite. Verify changes by opening pages in a browser.
- ALWAYS make changes only in the dev branch. do not touch any other branch.
- Keep commits atomic and focused