# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal engineering site of Alex Botzis (blog, About, project case studies). Static Astro 5 + Tailwind v4, deployed to Vercel at `https://alexbotzis.tech`. No backend, no RSS, no tests.

## Commands

- `npm run dev` / `npm run build` / `npm run preview`
- `npm run lint`: `tsc --noEmit` (the only check; there is no test suite)
- `npm run og`: regenerates `public/og.png` from an inline SVG via `sharp` (sharp comes in transitively through Astro, not as a declared dependency)
- `npm run signature`: regenerates `src/data/signature-name.ts` from the EMS Allure single-line font. Never edit that file by hand.

## Read before changing anything visible

- `PRODUCT.md`: audience, positioning (security-minded AI builder), brand commitments, and what must not be fabricated (metrics, testimonials, readership numbers, the CV). Decisions there are dated and settled; don't reopen them.
- `DESIGN.md`: the design system ("The Engineer's Broadsheet") with named rules. Key constraints: zero radius, no shadows, one accent (Bauhaus Signal Red, max two uses per page at rest), 2px press rules for structure / 1px hairlines for division, Geist for sentences and JetBrains Mono for labels only, every color token needs a `night-*` dark counterpart.
- `.impeccable/` holds design-tool state and past critiques; `DESIGN.md` is derived from the shipped site, so update it when a component's documented behavior changes.

## Architecture

- **Content collections** (`src/content/config.ts`): `blog` (title, description, pubDate, tags, draft) and `projects` (case studies). Project optional facts (role, year, status, links) render only when set, so pages never show placeholders. A project's `post` field is the slug of its related blog post and links the case study to the write-up.
- **Shared data** (`src/data/`): `site.ts` is the single source for author identity, email, social links, and helpers (`postSlug`, `formatDate`, `keepHyphens`, which inserts word joiners so hyphenated titles don't break). `projects.ts` wraps the collection (`getProjects`, `projectTitle`, `projectHref`). Use these instead of hardcoding identity or URLs in pages.
- **Layouts**: `Base.astro` owns all meta/OG tags, canonical URL, the pre-paint theme script (`data-theme` on `<html>`, from `localStorage`, defaults to light), and the one-time `.reveal` scroll-reveal script. `BlogPost.astro` wraps posts.
- **Theming**: dark mode is driven by `[data-theme="dark"]` in `src/styles/global.css`, not `prefers-color-scheme`. Shiki code blocks use dual themes wired to `data-theme`; `astro.config.mjs` has a transformer that remaps one-light token colors to AA-passing variants on the code surface.
- **URLs**: `trailingSlash: 'never'` in Astro and `trailingSlash: false` in `vercel.json`. Always link as `/about`, never `/about/`.
- **AB mark**: the same geometry lives in `src/components/Nav.astro`, `public/ab-favicon-16.svg`, and `scripts/og/build-og.mjs`. Keep all three in sync.
- **Analytics**: GA4 behind a consent banner. `gaId` in `site.ts` reads `PUBLIC_GA_ID` in production builds only; unset means no banner and no GA. `src/lib/analytics.ts` owns loading, withdrawal (cookie removal) and `track()`, which is a no-op until consent. Add new events through `track()`, never by calling `gtag` directly.
- **CV**: the About page's CV section renders only if `public/alex-botzis-cv.pdf` exists (checked at build time with `existsSync`).

## Content rules

- Title is "Senior FullStack Engineer"; experience is "since 2017", never a year count.
- About is not a CV: career history stays in the CV and LinkedIn.
- Only the Clearance project is shown, by design. Don't re-add removed projects.
