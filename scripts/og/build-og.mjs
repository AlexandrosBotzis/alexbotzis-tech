// Generates public/og.png (1200x630), the social share image.
//
//   npm run og
//
// Uses the same AB mark geometry as src/components/Nav.astro and
// public/ab-favicon-16.svg. Keep the three in sync when the mark changes.
import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, '../../public/og.png');

const mark = (x, y, size) => `
  <svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 16 16">
    <defs><clipPath id="cap"><rect x="-1" y="2.2" width="18" height="11.6"/></clipPath></defs>
    <rect width="16" height="16" fill="#111111"/>
    <g transform="translate(8 8) scale(0.86) translate(-8 -8)">
      <g clip-path="url(#cap)" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="8">
        <path d="M0.5 14.5 5.1 3 9.7 14.5M2.5 9.4H7.7"/>
        <path d="M11.4 8a2.5 2.5 0 0 0 0-5H7.9L11.9 13H12.4a2.5 2.5 0 0 0 0-5H9.9"/>
      </g>
      <rect x="8.16" y="8.5" width="1.8" height="1.8" fill="#D9281F"/>
    </g>
  </svg>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect x="0" y="0" width="1200" height="12" fill="#111111"/>
  ${mark(80, 72, 168)}
  <text x="80" y="420" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#111111" letter-spacing="-2">Engineering decisions</text>
  <text x="80" y="505" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#111111" letter-spacing="-2">that aren't obvious.</text>
  <rect x="80" y="550" width="1040" height="2" fill="#111111"/>
  <text x="80" y="592" font-family="Menlo, monospace" font-size="24" fill="#555555">Alex Botzis · Senior Full-Stack Engineer</text>
  <text x="1120" y="592" text-anchor="end" font-family="Menlo, monospace" font-size="24" fill="#111111">alexbotzis<tspan fill="#D9281F">.</tspan>tech</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`wrote ${OUT}`);
