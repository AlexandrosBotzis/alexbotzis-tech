---
name: alexbotzis.tech
description: Personal engineering site of Alex Botzis. Writing on architecture, trade-offs, and leadership.
colors:
  bauhaus-signal-red: "#D9281F"
  paper: "#FFFFFF"
  newsprint-tint: "#F4F4F4"
  hairline: "#DEDEDE"
  press-rule: "#111111"
  ink: "#111111"
  ink-muted: "#555555"
  ink-faint: "#707070"
  night-paper: "#0C0C0B"
  night-tint: "#161615"
  night-hairline: "#333330"
  night-rule: "#D8D8D4"
  night-ink: "#EDEDEA"
  night-ink-muted: "#A3A39E"
  night-ink-faint: "#82827D"
  night-signal-red: "#E5483F"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.8vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  post-title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 3vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  feature-title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.6vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 0.875rem + 0.2vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "\"ss01\", \"cv11\""
  page-label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  page-label-compact:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  gutter: "1.5rem"
  stack-sm: "0.75rem"
  stack-md: "1.5rem"
  column-gap: "3rem"
  row: "2.5rem"
  section: "4rem"
  page-end: "6rem"
components:
  nav-link:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.bauhaus-signal-red}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  text-link-hover:
    textColor: "{colors.bauhaus-signal-red}"
  row-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1.5rem 0"
  row-card-hover:
    backgroundColor: "{colors.newsprint-tint}"
  inline-code:
    backgroundColor: "{colors.newsprint-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.1rem 0.35rem"
---

# Design System: alexbotzis.tech

## Overview

**Creative North Star: "The Engineer's Broadsheet"**

The site is laid out like a broadsheet edited by an engineer. Pages are built from rules, columns, and typographic hierarchy, not from boxes, cards, or imagery. A heavy 2px rule marks every structural boundary (header, page header, hero, footer), and 1px hairlines divide content inside those boundaries. Mono uppercase labels play the role of datelines and section slugs; large mono numerals act like column figures.

The palette is newsprint: near-black ink on white paper, three grades of grey ink, and a single Bauhaus Signal Red that marks the one or two things on a page that matter most. The density is editorial rather than app-like: generous vertical rhythm between sections, tight leading in headlines, comfortable leading in body copy, and line lengths held to reading measure.

Interaction is quiet until touched. At rest everything is ink and grey; a hover or focus answers with a single decisive response, either red text or a faint newsprint tint behind a row. There is no decoration that isn't also structure.

**Key Characteristics:**
- Two-weight rule system: 2px press rules for structure, 1px hairlines for division.
- Zero corner radius, globally enforced.
- Flat surfaces; depth comes from rules and tint, never shadows.
- Geist for reading, JetBrains Mono for labels, figures, and metadata.
- One accent, used sparingly; full light and dark themes via `data-theme`.

## Colors

A newsprint palette of ink greys on paper, with one signal color.

### Primary
- **Bauhaus Signal Red** (`bauhaus-signal-red`): the only chromatic color. Marks the active nav item, the large masthead numerals, the one primary action on a page ("Read →"), hover states on links, focus outlines, and the red junction square in the AB mark. In the dark theme it lifts to `night-signal-red` so small text keeps 4.5:1 on night paper.

### Neutral
- **Paper** (`paper`): page background.
- **Newsprint Tint** (`newsprint-tint`): the only filled surface. Hover background for row cards and the feature post, code blocks, inline code.
- **Hairline** (`hairline`): 1px dividers between rows, list items, footer bands, and the border on code.
- **Press Rule** (`press-rule`): 2px structural rules and the vertical page-header divider. Also the text-selection background.
- **Ink** (`ink`): headlines, titles, primary links.
- **Ink Muted** (`ink-muted`): body copy in bios and descriptions, nav links at rest.
- **Ink Faint** (`ink-faint`): metadata, dates, tags, row labels. Set at the AA floor (4.5:1 on Paper and on Newsprint Tint); never go lighter.

### Dark theme
Every neutral has a night counterpart (`night-*`), swapped in under `[data-theme="dark"]`. Paper becomes a warm near-black, rules become a warm off-white, and the ink ramp inverts. The red lifts slightly (`night-signal-red`) to hold contrast.

### Named Rules
**The Two-Strikes Rule.** Bauhaus Signal Red appears at most twice per page at rest, the active nav item included. Hover and focus states don't count, because they are responses, not composition.

**The AA-Floor Rule.** Every text color passes 4.5:1 against both Paper and Newsprint Tint in its theme, including code tokens. Contrast is checked per theme, never assumed from the light one.

**The Ink-Grade Rule.** Hierarchy in text is carried by the three ink grades (ink, muted, faint) before size or weight. A new element picks its grade by importance: content, supporting copy, or metadata.

## Typography

**Display / Body Font:** Geist Variable (with ui-sans-serif, system-ui)
**Label / Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono)

**Character:** Geist sets the argument; JetBrains Mono files it. The sans carries every sentence a reader actually reads, while the mono handles everything a reader scans: labels, dates, tags, counts, nav.

### Hierarchy
- **Display** (700, clamp 2.25 to 4rem, 1.02): the homepage hero headline only.
- **Headline** (700, clamp 1.4 to 2rem, 1.1): page-header statements (About).
- **Feature Title** (700, clamp 1.5 to 2.25rem, 1.08): the homepage feature post and the featured project name.
- **Post Title** (700, clamp 2 to 3rem, 1.04, -0.035em): the article h1, held to 22ch with balanced wrapping. Prose h2 sits a full step below at `--text-xl`.
- **Title** (600, `--text-xl`, 1.2): post titles in lists. Prose h2 uses `--text-2xl` at 600.
- **Body** (400, `--text-base`, 1.7; 1.8 in articles): all running copy. Article measure is capped at 68ch, bio paragraphs at 60ch.
- **Page Label** (mono 400, clamp 1.75 to 2.5rem, 1.5rem under 640px, uppercase, 0.95): the left-column word in page headers (ABOUT, PROJECTS, WRITING), rendered as the page's h1; also mobile menu items. Under 640px, and for the Writing masthead's date figure, it uses Page Label Compact (1.5rem).
- **Numeral** (mono 400, clamp 2.5 to 4.5rem, red): single counts in page headers (years, entries, works), zero-padded to two digits where it's a count.
- **Label** (mono 400, 0.6875rem, 0.1em tracking, uppercase): nav, row labels, dates, tags, reading time, footer links.

### Named Rules
**The Mono-Means-Metadata Rule.** JetBrains Mono is for things a reader scans, never for sentences. If it's longer than about six words, it's set in Geist.

**The No-Kicker Rule.** Headings carry their own weight. No eyebrow or kicker label above a heading; metadata (date, tags, reading time) goes in a mono row below it.

**The Negative-Tracking Rule.** Geist at title size and above is always tracked tight (-0.02em to -0.03em). Mono labels are always tracked open (0.04em to 0.12em).

## Layout

A single centered column, max 64rem wide (Tailwind `max-w-5xl`), with a 1.5rem side gutter. Inside it, pages use two recurring grids:

- **Page header:** a 55% / 2px rule / remainder grid. Mono page label on the left, a 2px vertical press rule, then the statement and a red numeral on the right. Collapses to one column at 640px, where the vertical rule is dropped and replaced by a hairline above the right column.
- **Content rows:** a 12rem label column plus a fluid body column, separated by a 3rem gap. Each row is 2.5rem tall in padding and opens with a hairline. Collapses to a single column under 640px.

The homepage hero splits 2fr / 1fr below the headline, with a hairline-led meta column. "More posts" uses three equal columns separated by vertical hairlines.

Vertical rhythm is in steps of 0.75, 1.5, 2.5, 4, and 6rem: row internals, row spacing, section spacing, and page end. The single breakpoint is 640px.

### Named Rules
**The Rule-Not-Box Rule.** Group content with a rule above it, not a container around it. If a new section needs a border on all four sides, it's the wrong pattern.

## Elevation & Depth

The system is completely flat. There are no shadows anywhere. Depth and grouping come from two things only: the rule hierarchy (a 2px press rule outranks a 1px hairline), and the Newsprint Tint fill that appears behind a row or feature on hover. The sticky header sits above content by z-index alone, separated by its 2px bottom rule.

### Named Rules
**The Flat-Press Rule.** Nothing floats. If an element needs to feel "above" another, give it a heavier rule, not a shadow.

## Shapes

Every corner is square: `border-radius: 0` is enforced on all elements in the global stylesheet. Form language is rectilinear throughout, echoing the pixel-grid AB mark (a 4x7 cell grid with a red junction square). The one exception is the copy-email cursor bubble, a circle drawn with `clip-path`, which is a pointer affordance rather than a surface.

## Components

### Navigation
Quiet until touched.

**Desktop**
- A sticky 3.5rem bar with a 2px press rule underneath.
- The AB mark sits on the left. Mono uppercase links sit on the right in Ink Muted, turning Bauhaus Signal Red on hover and when active (`aria-current="page"`).
- A hairline-separated "Dark/Light" text toggle closes the list. It names the action.

**Mobile (under 640px)**
- A 44px burger opens a full-screen menu (`role="dialog"`, `aria-modal`).
- **Destinations:** three hairline-ruled rows under a 2px press rule, set in Page Label Compact (mono, 1.5rem, uppercase).
  - No index numbers and no arrows.
  - Hover is a Newsprint Tint only.
  - Red marks only the current page, so the menu shows at most one red mark at rest.
- **Colophon:** pushed to the bottom, in thumb reach, under a 2px press rule. It mirrors the page footer in two compact rows, about 136px:
  1. The static signature mark (linking home, red full stop, like the page footer), then the email with Copy in mono.
  2. After a hairline: GitHub and LinkedIn on the left, and the "Switch to Dark/Light" theme switch on the right.
- **Focus:** opening moves focus to the first link, relabels the burger "Close menu", makes `main` and the footer inert, and locks scroll on `<html>` only. Escape or the X restores all of that and returns focus to the burger.
  - Never lock `<body>` as well. It becomes its own scroll container and the sticky header drops back by the scroll offset.
  - No `aria-modal`: the close control lives in the header, outside the dialog.
- **Colophon signature:** keeps its red full stop, a brand mark exempt from the red count. Red as a state marks only the current page.
- **Last row:** the last destination row has no bottom hairline, so the list ends as type and doesn't open an empty cell.

### Logo (signature)
The AB mark is a 16-unit black tile, inlined in the nav. The favicon (`/ab-favicon-16.svg`) uses the same geometry.

- **Geometry:** drawn in the site's square geometry.
  - White monoline strokes of 1.6 units, with flat (butt) ends and mitered corners.
  - The letters are clipped to a shared cap height and baseline, so the A's feet are horizontal and its apex is flat-cut, like Geist.
  - The B is one continuous path, so its corners stay sharp.
- **Layout:** the A and B are parted along the stroke they once shared, and the group is scaled to 86% so it has a margin inside the tile.
- **The red square:** the A's low crossbar (about 64% down) runs into a 1.8-unit Bauhaus Signal Red square that caps it. This echoes the pixel logo's red square and the zero-radius rule.
- **Motion:** none. The mark is static, and the link uses the standard focus ring.
- **Red count:** the red square is part of the brand mark, like the red full stop in the signature. It doesn't count toward a page's two red marks.

### Link grammar
Every link must read as a link at rest, without hover. Color alone is never the signal (WCAG 1.4.1).

1. **Sans text links** (prose, "Latest: …", "Read the write-up", byline, email, end matter): underlined at rest.
   - 1px, offset 0.25em, in Ink Faint (`#707070`, 4.5:1).
   - On hover, the text and underline turn Signal Red.
   - Never use a hairline-colored border as the cue: it measures about 1.3:1 and is effectively invisible.
2. **Mono links** ("All writing →", footer links, profiles): set in **Ink**, while mono *labels* stay Ink Faint.
   - Standalone mono links carry an arrow: `→` for internal pages, `↗` for external ones.
   - Footer and nav page links rely on their zone and the ink color.
3. **Whole-block links** (feature post, Writing rows): the title is the link. The block also carries a mono "Read →" cue at rest, and tints on hover.

Buttons that act (Copy) use the sans-link underline, so they read as actions, not metadata.

**Hover wipe.** On hover or keyboard focus, Signal Red sweeps across a link's text from left to right (0.7s, cubic ease-out).
- It's done with a red/ink gradient clipped to the text, defined once in `global.css`. New links that turn red must be added to that selector list.
- The active nav item stays fully red.
- Reduced motion makes it instant, and forced-colors mode falls back to plain text.

### Row Cards (post rows, project rows, feature post, grids)
- **Corner Style:** square.
- **Background:** transparent at rest, Newsprint Tint on hover (0.1s).
- **Border:** a single hairline between rows or grid columns. The feature post closes with a 2px press rule. The first row under a masthead drops its hairline, because the masthead's press rule already closes it.
- **Bleed rows:** list rows (`.bleed-row`) extend their hover tint 1.5rem into the gutter while their hairline stays on the content column. The hairline is a background image, never a shadow.
- **Whole-block links:** the feature post links its title and stretches the hit area over the block; secondary links inside it sit above that layer.
- **Hover:** the title turns red or the row tints, never both.
- **No index numbers:** rows are not numbered (01, 02...) unless the order itself is information.

### Page Header (signature)
The broadsheet masthead of every top-level page: mono page label, 2px vertical rule, then a statement and a red mono numeral. Closes with a 2px press rule. It is shared by About, Projects, and Writing, so changes to its grid apply to all three.

### End Matter (signature)
Every post closes on a 2px press rule followed by two label/value rows:
1. **Written by:** your name, linking to About, then the one-line bio.
2. **Next or Related:** the next-older post, and the related project.

Labels are mono faint h2s and values are Geist. The last row has no trailing hairline, so the footer's press rule closes the page.

Contact and follow links are deliberately left out: the footer directly below carries the email, Copy, GitHub and LinkedIn. Don't repeat them here.

### Signature (signature)
The homepage bio closes with a gestural, laser-etched signature for "Alex Botzis".

- **Shape:** one continuous stroke. A and B stay as readable capitals, and the lowercase is compressed into rhythm (62% width, 52% height).
- **Dropped marks:** the t-cross, i-dot, A crossbar and x cross-stroke are left out, the way a fast hand skips them.
- **Tail:** the stroke ends in a long underline tail.
- **Source:** generated from EMS Allure (SIL OFL) into `src/data/signature-name.ts` by `npm run signature`. Glyph fixes live in the generator: the o closes at the top, and the B loops down into the o.
- **Final state:** a flat Ink line (`currentColor`, about 1.6px), ending in a Bauhaus Signal Red full stop where the laser switched off. The full stop counts as one of the page's two red marks.

**The etch** is the site's one authored motion moment. It plays once, when the mark is 60% in view, and takes about 2.6s plus a 0.5s switch-off.
- A requestAnimationFrame loop moves a hot point along the exact path (`getPointAtLength`).
- Layers trail the point as it moves:
  - a 5px white-hot core
  - a 26px red-hot segment
  - an 80px ember glow at 35% opacity

  Together they form a cooling gradient back to ink.
- At switch-off, the trail cools into the end point, which becomes the full stop.

**Footer (colophon).** Two rows under a 2px press rule:
1. Signature mark (linking home), site links and email with Copy. On phones this row wraps: signature and email first, then the links.
2. After a hairline: copyright and profiles, always on one line.

Links are mono labels with about 30px targets, above the 24px WCAG floor and spaced apart. Keep the footer about 125px on desktop and under 180px on mobile. It's a colophon, not a section.

**Footer mark.** Every footer opens with a small static version of the signature (`<Signature animated={false} />`, 7rem, linking home). It shows only the line and the red full stop: no laser, no script.

**The laser exception.** The radial bloom around the tip and the hot color (`--sig-hot`: #FF7A45 on Paper, #FFE4D2 at night) are the only glow and the only second hue on the site. They exist only during the etch and are never present at rest.

**Rules**
- Stroke widths are in path units, never `vector-effect: non-scaling-stroke`, which breaks the dash maths.
- At rest, without JS, and under reduced motion, the finished etch is shown statically.
- Don't add a second animation at this scale anywhere on the site.

### Email Contact
A `mailto:` link plus a mono "Copy" button with an inline, `aria-live` status ("Copied", or a select-and-copy fallback when the clipboard is blocked). No custom cursor, no hover-only feedback.

### Code
Block code sits on Newsprint Tint with a 1px Hairline border, mono at 0.875rem and 1.65 leading, Shiki dual themes bound to `data-theme`. Ligatures are off so operators render as typed. Low-contrast one-light tokens are remapped to AA-passing tones at build time (`astro.config.mjs`). Under 640px, code wraps instead of scrolling. Inline code uses the same tint and border with tight padding and no backtick pseudo-content.

### Focus
A 2px Bauhaus Signal Red outline offset by 2px on every `:focus-visible` element.

## Do's and Don'ts

### Do:
- **Do** separate structural regions with a 2px Press Rule and content items with a 1px Hairline.
- **Do** set labels, dates, tags, and counts in JetBrains Mono uppercase at 0.6875rem with open tracking.
- **Do** keep Bauhaus Signal Red to two uses per page at rest (Two-Strikes Rule).
- **Do** respond to hover with either red text or a Newsprint Tint fill, at 0.1 to 0.15s.
- **Do** define every new color as a token with a `night-*` counterpart so dark mode keeps working.
- **Do** cap reading measure at 60 to 68ch.

### Don't:
- **Don't** round corners. Radius is globally 0 and must stay that way.
- **Don't** add shadows, glows, or blur to express depth. (The signature's transient laser bloom is the one documented exception.)
- **Don't** introduce a second accent color.
- **Don't** set sentences in mono or labels in Geist.
- **Don't** wrap content sections in fully bordered boxes or filled cards at rest.
- **Don't** use font sizes below the label token (0.6875rem) for readable text.
- **Don't** put a kicker or eyebrow label above a heading.
- **Don't** number rows or sections (01, 02...) unless the sequence is information.
