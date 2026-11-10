import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// one-light tokens that fall below 4.5:1 on the code surface (#F4F4F4),
// mapped to the same hues darkened to pass AA. Dark-theme tokens already pass.
const LIGHT_CODE_CONTRAST = {
  '#986801': '#7A5300',
  '#50A14F': '#357A34',
  '#A0A1A7': '#696B73',
  '#4078F2': '#2F5DC4',
  '#0184BC': '#016A97',
  '#E45649': '#B8352A',
  '#C18401': '#855B00',
  '#0997B3': '#06728A',
};

// Astro renders code via Shiki's HAST path, so rewrite each token span's style.
const lightCodeContrast = {
  name: 'light-code-contrast',
  span(node) {
    const style = node.properties?.style;
    if (typeof style !== 'string') return;
    node.properties.style = style.replace(/--shiki-light:(#[0-9A-Fa-f]{6})/g, (match, hex) => {
      const fixed = LIGHT_CODE_CONTRAST[hex.toUpperCase()];
      return fixed ? `--shiki-light:${fixed}` : match;
    });
  },
};

export default defineConfig({
  site: 'https://alexbotzis.tech',
  // One URL form everywhere: internal links, canonicals, sitemap and Vercel
  // (vercel.json trailingSlash: false) all use /about, never /about/.
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'github-dark-dimmed',
      },
      defaultColor: false,
      transformers: [lightCodeContrast],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
