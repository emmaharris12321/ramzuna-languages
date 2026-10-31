import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sharp from 'sharp';

// Disable SVG decoding in libvips to reduce attack surface.
// Kept as a defense in depth alongside upgrading sharp >=0.35.5.
sharp.block({ operation: ['VipsForeignLoadSvg'] });

export default defineConfig({
  compressHTML: true,
  site: 'https://ramzunalanguages.org',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
});
