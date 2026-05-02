# Design

## Product

Erik Dyer personal portfolio, a brand surface for research, engineering, and project proof points.

## Visual Theme

The site uses an archival systems-notebook direction: warm paper, ruled sections, compact metadata, timeline photos, and oversized editorial headings. The concept is not biology or neuroscience. It is a technical field record for AI systems, infrastructure, agents, and spatial computing.

## Color

Colors are defined in OKLCH in `site/shared.jsx`.

- `cream`: warm paper default, used for the main portfolio mood.
- `paper`: cooler neutral alternate, used as an optional reader-controlled mood.
- `periwinkle`: about/projects accent.
- `sage`: research accent.
- `coral`: work/timeline accent.

Use a restrained strategy: tinted neutrals carry most of the page, with section accent colors reserved for dots, emphasis words, active states, and small diagram strokes. Avoid large decorative gradients.

## Typography

Current families:

- Fraunces for display headings and italic emphasis.
- Inter for body text and interface copy.
- JetBrains Mono for compact labels, metadata, and technical annotations.

This is an existing identity choice. Preserve it unless doing a larger rebrand. Keep body line length around 65 to 75 characters. Use large headings sparingly, and keep dense proof-point content in smaller, scannable blocks.

## Layout

Desktop uses a fixed left sidebar and scrollable main panel. The sidebar carries identity and section navigation. Main pages use ruled headers, large titles, then proof-oriented content blocks.

Known improvement target: responsive behavior. The fixed sidebar and large headings can create horizontal overflow on narrow screens. Any polish pass should prioritize mobile and small-desktop adaptation.

## Components

- `Sidebar`: persistent identity and section navigation.
- `PageShell`: shared frame header and body padding.
- Section pages: About, Research, Work, Projects, Timeline.
- Timeline components: map card, polaroids, sticky note.
- Tweaks panel: optional paper and accent controls. This is secondary and should never obscure core content on small screens.

## Motion

Motion is subtle: page-in and timeline map zoom. Use ease-out motion, respect reduced-motion preferences, and avoid layout-property animation where possible.

## Content Rules

No placeholders. No fake project names. Use real project descriptions, or mark the status honestly as coursework, research, private, or public. Avoid em dashes in UI copy. Prefer precise punctuation and short sentences.
