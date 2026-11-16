# Typography update

The homepage impact statistics remain restored beneath the hero.

Shared typography lives in src/css/input.css. Body and form text use Outfit; display headings use Playfair Display. Both stacks include Noto Sans Arabic for Arabic glyphs. Font loading is configured in src/layouts/Base.astro.

The shared scale uses 16px body text, 14px small text, and 20/24/30/36/48px larger text at the default root size. Scoped lesson and component CSS uses shared variables instead of isolated sizes. Tailwind small labels use the same 14px scale. Decorative icons and quotation glyphs retain their artwork sizing. Heading hierarchy and responsive layouts are retained.

Validation: npm ci completed and npm run build generated 89 pages. Static checks verified homepage statistics and typography token definitions. Browser visual verification was blocked by the execution sandbox.

Build: npm ci, then npm run build. Deploy dist/.
