# jasondraper.ai

Personal portfolio and writing home for **Jason Draper** — Technical Co-Founder
at [Punchcard](https://punchcard.com) (YC S23). Built as the canonical home for
his writing and professional identity, optimized for human readers **and** AI
agent discovery ("agentic SEO").

## Stack

- **Astro** (static output, ships zero JS by default)
- **Tailwind CSS v4** (via `@tailwindcss/vite`) with locked glassmorphism design tokens
- **MDX** + **Content Collections** (type-safe writing, Content Layer API)
- **React + Framer Motion** — used only for subtle entrance animations; all real
  content is server-rendered HTML (see "Agentic SEO" below)
- **@astrojs/sitemap** for `sitemap-index.xml`

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # serve the production build locally
```

## Project structure

```
src/
├── content/
│   ├── writing/            # MDX blog posts (frontmatter = type-safe schema)
│   │   └── albert-einstein-library.mdx
│   └── systems/            # future: Creed, CoAudit (schema defined, no content yet)
├── content.config.ts       # Content Layer collections + Zod schemas
├── layouts/
│   └── Base.astro          # <head>, meta, OG/Twitter, Person JSON-LD, no-JS reveal fallback
├── components/
│   ├── GlassCard.astro     # translucent blur panel (design tokens)
│   ├── Header.astro / Footer.astro
│   └── Reveal.tsx          # Framer Motion entrance wrapper (LLM-safe)
├── pages/
│   ├── index.astro         # hero + featured writing
│   └── writing/
│       ├── index.astro     # post list
│       └── [...slug].astro # post template + Article JSON-LD
└── styles/global.css       # design tokens + prose styling
```

## Design tokens (locked)

Defined in `src/styles/global.css` and used verbatim per the product spec:

| Token             | Value                        |
| ----------------- | ---------------------------- |
| `--bg-base`       | `#0a0a0f`                    |
| `--bg-glass`      | `rgba(255, 255, 255, 0.03)`  |
| `--border-glass`  | `rgba(255, 255, 255, 0.08)`  |
| `--text-primary`  | `#f5f5f5`                    |
| `--text-muted`    | `#a0a0a0`                    |
| `--accent`        | `#3b82f6`                    |
| `--radius`        | `16px`                       |
| `--blur`          | `12px`                       |

## Agentic SEO

- **JSON-LD on every page.** A `Person` schema is embedded site-wide via
  `Base.astro`; each post adds an `Article` schema.
- **Content is real static HTML.** Framer Motion animations wrap
  server-rendered content — the full text (including the post body and
  headings) is present in the HTML with JS disabled, so crawlers and AI agents
  read everything. A `<noscript>` rule keeps reveal content visible without JS.
- **Sitemap** at `/sitemap-index.xml`, semantic HTML, clean date-free URLs.
- **Canonical URLs** point at `https://jasondraper.ai` (set via `site` in
  `astro.config.mjs`) even while deployed to a Vercel project URL, so the
  eventual production domain is the canonical home.

## Content

Add a post by dropping an `.mdx` file in `src/content/writing/` with frontmatter:

```yaml
---
title: Post Title
description: One-line summary (used for meta + Article schema)
pubDate: 2025-12-28
updatedDate: 2025-12-28 # optional
tags: [LLMs, agents] # optional
canonicalUrl: https://... # optional — only if canonical lives elsewhere
---
```

## Deploying (Vercel)

The build is plain static output (`astro build` → `./dist`), so no adapter is
needed — Vercel auto-detects Astro.

1. Import this repo in Vercel → it detects the Astro preset (build:
   `astro build`, output: `dist`).
2. Deploy. You'll get a `*.vercel.app` project URL to use immediately.
3. **Custom domain (deferred):** when ready, add `jasondraper.ai` under
   Vercel → Project → Settings → Domains and point Epik's DNS at Vercel.
4. **`.dev` → `.ai` redirect:** add `jasondraper.dev` in Vercel Domains and set
   it to **Redirect** to `jasondraper.ai` (301). Configure Cloudflare DNS for
   `.dev` to point at Vercel.

> Note: the canonical `site` in `astro.config.mjs` is `https://jasondraper.ai`.
> Update it there if the canonical home ever changes.

## Roadmap (future phases)

- Convert LinkedIn posts into additional writing pieces
- `/systems` section (Creed, CoAudit) — collection schema already defined
- `/about` page and `/about.json` machine-readable profile endpoint
- RSS feed
- Custom 3D rendered scenes for post heroes
