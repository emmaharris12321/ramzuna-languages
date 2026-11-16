# Focused usability improvements

The existing branding, typography, content, page order and dependencies are preserved.

- Removed the full-screen preloader so visitors can read immediately, including without JavaScript.
- Added mobile safe-area spacing and separated the back-to-top button from the fixed actions.
- Made the mobile menu scrollable on small screens, close with Escape and restore focus, update its accessible label, and reset on desktop.
- Made anchor navigation move keyboard focus and respect reduced-motion preferences.
- Disabled rotating headings and parallax for reduced motion; shortened CSS animations and transitions.
- Made theme and cookie preference storage resilient when browser storage is unavailable.
- Removed previously accepted cookie banners instead of retaining invisible controls.
- Added an accessible name to the mobile email link and corrected homepage description punctuation.

Validation: npm ci and npm run build succeeded; 89 pages generated. Browser visual verification was not performed.

Changed source files: src/layouts/Base.astro, src/components/Header.astro, src/scripts/main.ts, src/css/input.css, src/pages/index.astro.

Run locally: npm ci, then npm run dev. Production: npm run build.

## Professional polish pass
- Desktop root font-size reduced from 18px to the 16px default; headings, lead text and section spacing tightened on screens 1024px and up (src/css/input.css). Mobile/tablet unchanged.
- Study with Us: removed the live-lesson photo. Teach with Us: removed the teacher nationality map; the lesson-resources preview image is kept.
- Resources: index, YouTube and Mental Health pages use clean line icons instead of emoji; Language Resources now has a language summary, format filters (Website/Video/Podcast/PDF/Document), a two-column card grid, coloured format tags and visible domains.
