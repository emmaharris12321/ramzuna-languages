# Ramzuna — editable website source (Astro)

This is the ACTUAL EDITABLE PROJECT SOURCE, not a website export or the generated `dist` folder.
All files are at the root of the ZIP. Open the extracted folder in VS Code or any text editor.

## Where to edit

- `src/pages/`: Every page on the site; `.astro` files contain page markup and logic.
- `src/pages/resources/german-async.astro`: German lesson index / navigation.
- `src/pages/resources/grenzenlos-deutsch.astro`: Lesson 1.
- `src/pages/resources/german-lesson-2-main.astro`: Lesson 2 (main).
- `src/pages/resources/german-lesson-3-main.astro`: Lesson 3 (main).
- `src/pages/resources/german-lesson-4.astro`: Lesson 4.
- `src/pages/resources/german-lesson-5.astro`: Lesson 5 (main).
- `src/pages/resources/german-lesson-5-extension.astro`: Lesson 5 extension.
- `src/pages/resources/german-lesson-6.astro`: Lesson 6 / Hobbys.
- `src/components/`: Shared reusable page components.
- `src/components/PdfResources.astro`: Printable PDF link list and controls.
- `public/assets/german/pdf-downloads.js`: Asynchronous PDF downloader (progress/cancel/fallback).
- `public/assets/german/pdf-resources.css`: PDF-download interface styling.
- `public/resources/pdfs/`: Downloadable study sheets for Lessons 1–6.
- `public/assets/german/`: Lesson images, interactivity scripts, and other local course assets.
- `src/styles/`: Custom lesson styling.
- `src/css/input.css`: General stylesheet.
- `src/layouts/`: Page wrappers and shared layout.
- `src/data/site.ts`: Site branding and navigation information.
- `astro.config.mjs` and `package.json`: Build configuration and dependencies.

## Run locally

Install Node.js 22.19 or newer, then open a terminal inside the extracted folder:

```bash
npm ci
npm run dev
```

Visit the local URL printed by Astro. Build for production using `npm run build`; Astro will create `dist/` automatically. This archive intentionally DOES NOT ship a `dist/` directory so source and generated output cannot be confused.

## Important limitations

This is the recoverable website source as included in the supplied project and updated across lessons 1–6. External videos and original lesson 6 `.m4a` files are linked from their hosts rather than embedded in the ZIP; those require internet.

All six PDF study sheets ARE included. The downloader fetches the PDF asynchronously on click, when supported, with a direct-link fallback. After editing the site, build and check it on your own machine before deployment. Full Astro production build and browser QA have not been performed in this environment.

## Verify the source content

1. Confirm `src/pages/index.astro` exists (homepage markup).
2. Confirm `src/pages/resources/german-lesson-6.astro` exists (Lesson 6 markup).
3. Open `public/assets/german/pdf-downloads.js` (PDF download logic).
4. Confirm `package.json` exists at the project root (not just `index.html`).

This ZIP intentionally has **no** pre-built static HTML folder.
