# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: engineering peers.** Senior engineers, tech leads, and engineering managers who arrive through a shared post (LinkedIn, aggregators) and judge Alex on the quality of the thinking in one article.
- **Secondary: hiring managers and recruiters.** People evaluating Alex for senior and Engineering Manager roles. They usually arrive after a post or a LinkedIn profile, skim About and Projects for credibility, then decide whether to make contact.

Peers bring the traffic; hiring decisions follow from what peers and hiring managers read.

## Product Purpose

alexbotzis.tech is the personal engineering site of Alex Botzis: a blog with an About page and a project index. It exists to publish writing on engineering decisions and, through that writing, build a reputation that supports the move from senior IC to Engineering Manager.

Success, in priority order:
1. A visitor reads a full post.
2. They follow along (LinkedIn, coming back for the next post). No RSS: removed on 2026-11-09.
3. They make contact (email or LinkedIn) about a role or collaboration.
4. They download the CV (once published).

## Positioning

**A security-minded AI builder.** Alex's academic background is information security (MS, University of East London), applied here to AI and RAG systems: finding the failure modes that pass tests and stay invisible, such as permission leaks in post-filter retrieval. Generic engineering blogs explain how to build AI features; this site explains where they quietly break and why.

Supporting threads: architecture trade-offs across frontend, backend, and AI ("Engineering decisions that aren't obvious."), and the shift from writing code to leading the people who do.

## Operating Context

- Readers mostly land on a single post from a shared link, often on mobile, then may browse About and Projects.
- Content is authored as Markdown in `src/content/blog/` with frontmatter (title, description, pubDate, tags, draft).
- Distribution is LinkedIn sharing; social previews use `public/og.png`. There is no RSS feed.
- Static Astro site, deployed to Vercel at `https://alexbotzis.tech`. Light and dark themes.

## Capabilities and Constraints

- Pages: Home, About, Projects, Writing (blog index), post pages, sitemap.
- No backend, no comments, no newsletter, no analytics yet.
- Language: English.
- Contact via `hello@alexbotzis.tech` (copy-to-clipboard) and LinkedIn/GitHub.
- CV download section on About renders only when `public/alex-botzis-cv.pdf` exists.
- **Open decisions:**
  - Whether `hello@alexbotzis.tech` is live.

## Brand Commitments

- **Name and domain:** Alex Botzis, alexbotzis.tech.
- **Title:** Senior Full-Stack Engineer (decided 2026-11-09; used everywhere).
- **Experience:** stated as "since 2017", never as a year count (decided 2026-11-10).
- **Mark:** the AB tile: a parted monoline A and B with a red square capping the A's crossbar (inlined in `src/components/Nav.astro`, favicon `public/ab-favicon-16.svg`). The earlier pixel-grid AB was retired on 2026-11-10.
- **Tagline:** "Engineering decisions that aren't obvious."
- **About headline:** "I build software, and the teams that build it."
- **Voice:** direct, first person, concrete. Leads with the answer and admits what broke. "Engineering, architecture, leadership. No tutorials."
- **About is not a CV.** Career history and education live in the downloadable CV and on LinkedIn, not on the page.

## Evidence on Hand

- **Writing:** one published post, "Pre-filter vs Post-filter Retrieval in RAG" (`src/content/blog/pre-filter-vs-post-filter-retrieval.md`).
- **Projects:** only Secure AI is shown on the site (homepage Selected work and /projects, data in `src/data/site.ts`), paired with its write-up. Other projects (MediRecord, Trading Bot, Cerebrad, Trading Dashboard, OnCoNovo, Greek Invoice for WooCommerce) were deliberately removed on 2026-11-09 to keep the site on the security-and-AI positioning.
- **Profiles:** LinkedIn and GitHub.
- **Absent, do not fabricate:** quantified career metrics (team size, markets, impact numbers), testimonials, employer endorsements, readership or follower counts, the CV PDF.

## Product Principles

1. **Writing is the product.** Every page should lead a visitor toward reading a post; everything else is supporting evidence.
2. **Show the failure mode.** Credibility comes from explaining what broke and why, not from claiming outcomes.
3. **Security lens on AI.** When choosing what to write or feature, favour work where security and AI meet.
4. **Not a CV.** Keep career detail off the pages; link to the CV and LinkedIn for history.
5. **Claims stay qualitative until there are real numbers.** No invented metrics.
