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
| `index.html` | Homepage — banner + blog post grid |
| `about/index.html` | Bio, research background, Akhetonics |
| `bucket-list/index.html` | Personal goals and milestones |
| `posts/*/index.html` | Individual blog posts |

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

## Known TODOs

See `todo.md` for the full list. Key outstanding items:
- "Work With Me" button links to `#` — not yet implemented
- Blog migration to Substack planned
- Hosting on both leonardodelbino.com and lyonnard.github.io planned

## Workflow Rules

- Do not use test suite. Verify changes by opening pages in a browser.
- ALWAYS make changes only in the dev branch. do not touch any other branch.
- Keep commits atomic and focused