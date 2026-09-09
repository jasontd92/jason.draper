import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Writing collection — type-safe blog posts authored as MDX.
// Schema mirrors the PRD (field names unchanged); uses the current Content
// Layer API (`loader: glob`) rather than the deprecated `type: 'content'`.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(), // set only if canonical lives elsewhere
  }),
});

// Systems collection (Creed, CoAudit) — defined now for type-safety; the
// /systems section itself is a future phase (no placeholder content shipped).
const systems = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/systems' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['active', 'archived']),
    ogImage: z.string().optional(),
  }),
});

export const collections = { writing, systems };
