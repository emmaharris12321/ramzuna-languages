# Ramzunā Languages

Website for Ramzunā Languages — a nonprofit connecting Palestinian students with volunteer educators for free English, French, and German lessons. Built on the SwiftMove Astro/Tailwind template.

## Getting Started

Use [Node.js](https://nodejs.org/) 22.19 or newer (one dependency requires at least 22.19).

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

### Site Configuration

Edit `src/data/site.ts` to customize:

- Site name and description
- Contact information
- Social media links
- Navigation items
- Page content

### Colors & Branding

Edit `tailwind.config.js` to change the color scheme:

```js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#your-brand-color',
          // ... add other shades
        },
        accent: {
          500: '#your-accent-color',
        },
      },
    },
  },
};
```

### Fonts

1. Update the Google Fonts link in `src/layouts/Base.astro`
2. Update `tailwind.config.js`:

```js
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
  display: ['YourDisplayFont', 'Georgia', 'serif'],
}
```

## Project Structure

```
├── src/
│   ├── components/      # Reusable components
│   │   └── sections/    # Page sections
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── data/            # Site configuration
│   └── css/             # Tailwind CSS
├── public/              # Static assets
│   └── assets/
│       └── img/         # Images
├── astro.config.mjs     # Astro configuration
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Adding Pages

Create new pages in `src/pages/`:

```astro
---
import Base from '@/layouts/Base.astro';
---

<Base title="New Page" description="Page description">
  <section class="py-20">
    <div class="mx-auto max-w-7xl px-4">
      <h1 class="text-4xl font-bold">New Page</h1>
      <p class="mt-4">Your content here.</p>
    </div>
  </section>
</Base>
```

## Deployment

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

### Static Hosting

```bash
npm run build
# Upload contents of dist/ folder
```

## Tech Stack

- [Astro 7](https://astro.build/) - Static site generator
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Changelog

See `CHANGELOG.md` for the version history of this template.

## Support

For questions or issues, please contact [Colorlib Support](https://colorlib.com/wp/support/).

## License

This template is licensed for use in personal and commercial projects.
See the license file for details.


## German lessons: PDF study resources and Lesson 6

The German learning path at `/resources/german-async/` includes six printable
study-sheet PDFs (Lessons 1–6). Each file is stored at
`public/resources/pdfs/german-lesson-N-study-sheet.pdf`, and the same files
are included in `dist/resources/pdfs/` for direct static deployment.

`src/components/PdfResources.astro` is a reusable list of PDF download links.
Add PDFs to `public/resources/pdfs/`, then add their metadata to the component.
Render `<PdfResources />` for the full list, or
`<PdfResources lessonNumbers={[6]} />` for one lesson.

`public/assets/german/pdf-downloads.js` progressively enhances these links:
when JavaScript is available, same-origin PDFs download asynchronously through
fetch streaming with displayed progress (if byte count is known), a cancel
button, and accessible status updates. A "Direct PDF link" always remains
available; the normal `href` works even without JavaScript. PDFs are fetched
only when requested, not automatically on page load. Browser policies may
limit saving, so all links retain native fallbacks. External websites' PDFs
are not proxied and may behave differently.

The revamped `/resources/german-lesson-6/` follows the open-licensed
*Grenzenlos Deutsch* Lesson 6 (Hobbys), with four character portraits and
external `.m4a` audio tracks (Yasmin, Max, Johannes, Julia), a Vimeo interview,
regular verb and `gern` explanations, and self-check exercises. The recordings
and Vimeo player require internet; the website ZIP **does not** bundle their
media files because they could not be downloaded from this environment.

### Verification / deployment notes

The project archive includes both the editable Astro source and a patched
static `dist/` with Lesson 5, Lesson 6, the resource index and PDF downloads.
The PDF files were checked and rendered, HTML asset paths verified and the new
JavaScript syntax checked. A full Astro build was **not** rerun: the npm package
cache is incomplete and this environment cannot reach npm's registry.
Browser-based acceptance testing was also blocked by a sandbox policy that
prevents Chromium from navigating to local addresses. Review the pages on a
real host and run `npm ci && npm run build` in a normal networked environment
before treating a production build as verified.
