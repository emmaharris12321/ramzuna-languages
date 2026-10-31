# Ramzunā Languages

Website for Ramzunā Languages — a nonprofit connecting Palestinian students with volunteer educators for free English, French, and German lessons. Built on the SwiftMove Astro/Tailwind template.

## Getting Started

Requires [Node.js](https://nodejs.org/) 22.12 or newer.

```bash
# Install patched dependencies and generate package-lock.json
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

## Security notes (October 2026)

- Vite must resolve to **8.3.3 or later** to address CVE-2026-112947 (`?vite-wasm-instance`). Astro's development server normally uses port **4321**, not 5173. Do not expose the dev server to the public internet.
- `sharp` must resolve to **0.35.5 or later**; SVG decoding is also blocked in `astro.config.mjs` using `sharp.block({ operation: ['VipsForeignLoadSvg'] })`. This means SVGs cannot be decoded through Sharp; the site can continue to serve SVG files as static assets.
- `source-map-js` must resolve to **1.2.2 or later**.
- The original `package-lock.json` pinned affected versions. It was removed because the editing environment couldn't reach npm. Run `npm install` to generate a new lockfile, then commit it. Check installed versions with `npm ls vite sharp source-map-js`.
- Keep `.env` files secret and excluded from version control. The published Vite `.env?vite-wasm-instance` proof of concept uses a dummy variable; do not test using real credentials.
- No project source assignment of `payload = { buffer }` exists. If the `new Uint8Array(buffer)` change is required in an upstream package, upgrade that package rather than patching unrelated application code.
