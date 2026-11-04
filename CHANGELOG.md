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
