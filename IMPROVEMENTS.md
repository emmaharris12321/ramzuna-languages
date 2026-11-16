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

---

# Round 2: consistent text size, readable poems, clearer language resources

- **Font size:** removed the rule in `src/css/input.css` that raised the root font size to 18px on screens 1280px and wider. The root is now 16px on every device. Poem text (`src/pages/voices/[...slug].astro`), programme descriptions and testimonial quotes now use 16px body text.
- **Palestinian Voices (`src/pages/palestinian-voices.astro`):** the writers section is now laid out like the blog. Each writer has a heading with their bio, and every poem or chapter is a card with its title, Arabic title, excerpt and reading time. There is a search box and writer filter buttons (deep links such as `/palestinian-voices#noor` work). Poems are read automatically from `src/content/voices/*.md`, so a new poem for an existing writer needs no edit to the page. A brand-new writer needs one line in the `writers` list.
- **Language Resources (`src/pages/resources/language-resources.astro`):** added a "How to use this page" box and numbered steps (choose a language, narrow it down, open a resource). Added a "Not sure where to start?" suggestion per language (editable in the `startHere` list), a clear selected state for the language buttons, a format badge on every link (Website, Video, Podcast, PDF, Document) and plain-language filter labels. "Clear filters" keeps the chosen language.

Validation: `npm ci` and `npm run build` succeeded (89 pages). Checked in a headless browser at 1440px wide: root and body font size are 16px; writer filter, search, deep links and language filters work with no script errors.

---

# Round 3: card layouts (replaces the Round 2 layouts for these two pages)

- **Palestinian Voices:** the page first shows one card per writer (same card style as the Resources page). Selecting a writer shows only their poems, as cards with a green or sand header in the same look as the poem pages. Direct links like `/palestinian-voices#noor` still work.
- **Language Resources:** the page first shows five language cards. Selecting one shows a "Not sure where to start?" box, optional filters, and the resources as cards grouped by topic, each with a Website, Video, Podcast, PDF or Document label.
- Text stays at 16px everywhere (Round 2).

Validation: `npm ci` and `npm run build` succeeded (89 pages); filters, deep links and card selection checked in a headless browser with no script errors.
