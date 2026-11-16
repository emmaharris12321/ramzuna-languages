# Changelog

All notable changes to the SwiftMove template are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-08-17

### Changed

- Upgraded Astro 6.2 → **7.2.2** (Vite 8, new Rust-based compiler, Sätteri Markdown pipeline).
- Upgraded Tailwind CSS and `@tailwindcss/vite` 4.2 → **4.3.3**.
- Upgraded `@astrojs/mdx` 5 → **7.0.5** and `@astrojs/sitemap` → **3.7.3**.
- Set `compressHTML: true` in `astro.config.mjs` so HTML whitespace stays lossless — Astro 7 defaults to JSX-style whitespace collapsing, which can drop spaces between adjacent inline elements.
- Now requires **Node.js 22.12+**.

## [1.0.0] - 2026-02-22

### Added

- Initial release, built with Astro and Tailwind CSS 4.

_Post-release maintenance without a version bump: upgraded to Astro 6.0 (2026-03-10) and refreshed all dependencies to Astro 6.2 / Tailwind CSS 4.2 (2026-05-03)._


## 2026-11-04 — Lesson 6 media and asynchronous PDFs

- Rebuilt Lesson 6 Hobbys according to the original Creative Commons lesson
  outline, using the four user-provided `.m4a` recordings and Vimeo embed.
- Retained existing portraits; added two sets of self-check exercises.
- Added six printable PDF study sheets for German Lessons 1–6.
- Added a reusable streaming/cancellable PDF download component with native
  direct-link fallback. Linked it from the German learning path and lessons 5/6.
- Patched the static `dist/` version and fixed a stale Lesson 5 stylesheet link.
- External audio/video remain network-dependent. Full Astro rebuild not verified.

## 2026-11-04 — Lessons 7–8; original media and PDF resources

- Replaced the Lesson 7 placeholder with the main *Farben* page and a separate extension page, following the user-supplied Creative Commons source files.
- Reused the two original Lesson 7 activity illustrations. Unavailable H5P embeds were adapted as original accessible quiz exercises.
- Added Lesson 8 *Personen beschreiben* as an adapted page following the source reading, speaking, listening and possessive-adjective structure.
- Added the original remote media URLs provided by the user: two M4A recordings (Yasmin and Max) and an MP4 interview. No audio or video bytes are bundled; the source host may restrict third-party playback.
- Added downloadable PDF study sheets for Lessons 7 and 8; asynchronous download enhancement, progress, cancel and direct links remain unchanged.
- Updated the German curriculum index; distributed editable `.astro` source files and assets only, without generated `dist/`.

## 2026-11-04 — Lessons 9 and 10

Added full editable Lesson 9 (Freunde) main, audio-guided Lesson 9 extension, and Lesson 10 (Studium) using the user-supplied media and verified original sequence. Added PDF study sheets 9–10; preserved asynchronous PDF downloads and updated curriculum navigation to all ten lessons. See `UPDATE-LESSONS-9-10.md`.

## Impact numbers, Voices, Study and Teach pages
- Homepage: new full-width green "Our Impact" band (src/components/sections/ImpactStats.astro) directly under the hero, with large animated numbers. Content lives in `impact:` in src/content/homepage/index.yaml; the small stats row was removed from the hero.
- Palestinian Voices: new intro with at-a-glance totals, "In Their Own Words" pull-quotes (taken from each piece's excerpt), writer jump-links, stronger writer cards; heritage gallery moved below the writers.
- Study with Us / Teach with Us: quick-facts strip, icon lists, language tiles, comparison-style lesson formats, timelines, real student/educator quotes from the homepage content, teacher map.

## Language resources page
- Redesigned src/pages/resources/language-resources.astro: standard page header, language tiles with counts, search/filter card, resources as cards with format badges and source domains, live per-group counts. Filtering logic unchanged.

## Palestinian Voices — reading-first redesign
- Page now leads with the writing: hero with a featured line, "Start reading" and "Surprise me" buttons; a masonry grid of one card per piece (excerpt, title in English and Arabic, writer, read time) with writer filter chips; writers' bios moved lower. Marah's six chapters are a single card. Stats band removed.

## Simplification pass: Language Resources and Palestinian Voices
- Language Resources: one choice up front (language tabs), optional "Jump to" sidebar, one search box (searches all languages), uniform list rows. Removed the skill/format dropdowns, tile row, badges on every row and the mixed card shapes.
- Palestinian Voices: one "Start reading" action, one uniform grid of all pieces, writers collapsed into an expandable list. Removed filter chips, the Surprise-me button, coloured card rotation and Arabic titles on cards.
