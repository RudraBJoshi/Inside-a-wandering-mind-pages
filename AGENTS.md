<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Overview

**IAWM Pages** (`iawm-pages`) is the Next.js front end for [Inside A Wandering Mind](https://inside-a-wandering-mind.com), incrementally porting pages from the live WordPress (Astra + Elementor) site.

- **Stack**: Next.js `16.4.6` (App Router, Turbopack), React `19.3.0`, TypeScript `5`, Tailwind CSS `4.3.3` (`@tailwindcss/turbopack`), ESLint `9` (`eslint-config-next`).
- **URL convention**: `trailingSlash: true` in `next.config.ts` keeps WordPress-style trailing slashes (`/departments/`) identical.
- **Path alias**: `@/*` maps to `./src/*` (`tsconfig.json`).

## Architecture & Ported Pages

- **Catch-all static routing** (`src/app/[[...slug]]/layout.tsx`, `src/app/[[...slug]]/page.tsx`):
  - Root `<html>`/`<body>` layout lives inside `[[...slug]]` so it can read `slug`, apply the WordPress `bodyClass` (required by Astra/Elementor styles), load `/iawm/fonts.css`, and inject per-page stylesheets from `meta.css` in original order.
  - `dynamicParams = false` with `generateStaticParams()` statically generates only ported pages; unported paths return 404.
  - Page markup renders inside `<div style={{ display: "contents" }}>` so `body > #page` CSS selectors behave as they do on WordPress.
- **Legacy script execution** (`src/components/legacy-scripts.tsx`):
  - `LegacyScripts` runs vendored WordPress/jQuery/Astra/Elementor and inline scripts **after React hydration** in original order, then replays `DOMContentLoaded` and `load` events so DOM-mutating scripts do not conflict with React hydration.
- **Page content & link localization** (`src/lib/pages.ts`, `src/content/pages/`):
  - Each ported page consists of `<key>.json` (`PageMeta`: `path`, `title`, `description`, `canonical`, `bodyClass`, `css`, `scripts`) and `<key>.html`.
  - Key naming (`keyFromPath`): `/` → `home`; nested paths join segments with `__` (e.g., `/departments/stem-department/` → `departments__stem-department`).
  - `localizeLinks()` automatically rewrites `href="https://inside-a-wandering-mind.com/..."` links to relative paths when the target page exists in `src/content/pages/`; unported links stay pointed at the live WordPress site.
- **Currently ported routes**:
  - `/` (`home`)
  - `/departments/` (`departments`)
  - `/departments/arts-entertainment-department/`
  - `/departments/creative-works-department/`
  - `/departments/stem-department/`
  - `/departments/world-and-society-department/`
- **Vendored static assets** (`public/iawm/`):
  - Self-hosted fonts (`fonts/`, `fonts.css`), images (`img/`), CSS (`site.css`, `css/`), and JS (`js/`).
  - `public/**` is ignored by ESLint (`eslint.config.mjs`).
  - Keep `THIRD_PARTY_LICENSES.md` and `public/iawm/THIRD_PARTY_LICENSES.md` updated when adding vendored fonts or scripts.

## Commands

```bash
npm run dev      # Local dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

## Vercel Project

- **Team / Scope**: `jade1xuzhu` (`team_bKmnB2P4B3qo13tAHWKdW8eC`, Hobby plan)
- **Project**: `iawmpages` (`prj_uac8TOuav3OXYguLVUDWQBSp4q8Y`)
- **Production URL**: `https://iawmpages.vercel.app`
- **Build & Runtime**: Framework preset `Next.js`, Node.js `26.x`, Root Directory `.`, default install/build/output commands, region `iad1`.
- **Git Integration**: Connected to GitHub repo `xinjiav2/iawmpages` (production branch `main`). Note that the local `origin` remote currently points to `RudraBJoshi/Inside-a-wandering-mind-pages`.
- **Environment Variables**: None configured.
- **CLI Usage**: Use `vercel --scope jade1xuzhu ...` for project operations (or link locally with `vercel link --project iawmpages --scope jade1xuzhu` when needed).
