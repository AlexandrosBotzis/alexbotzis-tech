import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Case studies. Optional facts (role, year, status, links) render only when set,
// so a page never shows a placeholder.
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    /** Short "what it is", shown after the name: "Clearance: permission-aware RAG". */
    descriptor: z.string().optional(),
    summary: z.string(),
    stack: z.array(z.string()),
    order: z.number().default(0),
    role: z.string().optional(),
    year: z.string().optional(),
    status: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    /** Slug of the related blog post. */
    post: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
