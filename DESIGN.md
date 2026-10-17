# Design

## Product

Erik Dyer's personal site: a fast, credible read on education, research, and engineering experience.

## Visual Theme

Clean and minimal. The type, spacing, and small details carry the design; there is no decoration, illustration, or hero interaction. One centered column, short entries, and quiet hairline dividers.

## Color

Colors are CSS custom properties on `:root` in `index.html`, redefined under `prefers-color-scheme: dark`.

- `--bg`, `--ink`: near-white and near-black page and text, swapped in dark mode.
- `--soft`, `--mute`: secondary and tertiary text.
- `--rule`: hairline dividers and logo tile borders.
- `--live`: the small green dot on current roles.

Brand color appears only inside the logo tiles, which stay white in both themes.

## Typography

- Geist for all text, at 16px base.
- Geist Mono for dates and the footer, with tabular numerals.
- One weight step (500) for names and titles; no bold emphasis in running text.

## Layout

A single column (max 680px) with a header (name, Princeton row, intro, links) followed by Research and Experience sections. Each entry is a title row with the date right-aligned, a meta line, and one sentence. Entries with a logo use a 40px white tile beside the text. On phones, dates drop below the title and city names and minors never split across lines. A Projects section is kept as a commented-out template in `index.html` until there are entries to show.

## Motion

A short staggered fade-in on load, using opacity, transform, and a light blur. It is disabled when the system requests reduced motion.

## Content Rules

No placeholders or invented details. Keep descriptions to one broad sentence; no resume bullet lists. On-page sentences end without a trailing period.

## Print

Printing produces a one-page, light resume with contact details spelled out.
