import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// ============================================
// Blog Collection (Markdown/MDX posts)
// ============================================
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string(),
    readTime: z.string(),
    author: z.object({
      name: z.string(),
      role: z.string(),
      image: z.string(),
    }),
    draft: z.boolean().optional().default(false),
  }),
});

// ============================================
// Site Config Collection (YAML)
// Edit: src/content/config/site.yaml
// ============================================
const config = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/config' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    logo: z.object({
      src: z.string(),
      srcLight: z.string().optional(),
      alt: z.string(),
    }),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    }).optional(),
    header: z.object({
      darkMode: z.boolean().optional().default(true),
      cta: z.object({
        text: z.string(),
        url: z.string(),
      }).optional(),
    }).optional(),
    nav: z.array(z.object({
      text: z.string(),
      url: z.string().optional(),
      children: z.array(z.object({
        text: z.string(),
        url: z.string(),
      })).optional(),
    })),
  }),
});

// ============================================
// Homepage Collection (YAML)
// Edit: src/content/homepage/index.yaml
// ============================================
const homepage = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/homepage' }),
  schema: z.object({
    hero: z.any(),
  }).passthrough(),
});

// ============================================
// Pages Collection (YAML)
// Edit: src/content/pages/*.yaml
// ============================================
const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }).passthrough(),
});

export const collections = { blog, config, homepage, pages };
