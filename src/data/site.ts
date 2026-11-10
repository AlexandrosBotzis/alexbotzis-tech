// Single source for identity, contact, and project data shared across pages.

export const author = {
  name: 'Alex Botzis',
  role: 'Senior Full-Stack Engineer',
  bio: 'Senior Full-Stack Engineer with an information-security background, applied to AI systems: finding the failure modes that pass every test.',
};

export const email = 'hello@alexbotzis.tech';

export const social = {
  github: 'https://github.com/AlexandrosBotzis',
  linkedin: 'https://linkedin.com/in/AlexandrosBotzis',
};

export interface Project {
  id: string;
  name: string;
  stack: string;
  description: string;
  /** Slug of a related blog post. */
  post?: string;
}

export const projects: Project[] = [
  {
    id: 'secure-ai',
    name: 'Secure AI',
    stack: 'Go · Vue 3 · Postgres · OpenTelemetry',
    description: 'Permission-aware document intelligence service. Multi-tenant RBAC, access-controlled RAG retrieval, OIDC auth, and full audit logging.',
    post: 'pre-filter-vs-post-filter-retrieval',
  },
];

/** Keep hyphenated compounds ("Post-filter") on one line in display titles.
 *  Word joiners (U+2060) forbid a break around the hyphen without changing the glyph. */
export const keepHyphens = (s: string) => s.replace(/-/g, '\u2060-\u2060');

export const postSlug = (id: string) => id.replace(/\.(md|mdx)$/, '');

export const formatDate = (d: Date, month: 'short' | 'long' = 'short') =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric' });
