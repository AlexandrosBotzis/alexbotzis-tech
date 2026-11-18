// Single source for identity, contact, and project data shared across pages.

export const author = {
  name: 'Alex Botzis',
  role: 'Senior FullStack Engineer',
  bio: 'Senior FullStack Engineer with an information-security background, applied to AI systems.',
};

export const email = 'hello@alexbotzis.tech';

/** GA4 measurement ID. Set PUBLIC_GA_ID for the Vercel Production environment only;
 *  when unset (dev, previews), no analytics or consent banner is rendered. */
export const gaId: string | undefined = import.meta.env.PROD ? import.meta.env.PUBLIC_GA_ID || undefined : undefined;

export const social = {
  github: 'https://github.com/AlexandrosBotzis',
  linkedin: 'https://linkedin.com/in/AlexandrosBotzis',
};

/** Keep hyphenated compounds ("Post-filter") on one line in display titles.
 *  Word joiners (U+2060) forbid a break around the hyphen without changing the glyph. */
export const keepHyphens = (s: string) => s.replace(/-/g, '\u2060-\u2060');

export const postSlug = (id: string) => id.replace(/\.(md|mdx)$/, '');

export const formatDate = (d: Date, month: 'short' | 'long' = 'short') =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric' });
