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
