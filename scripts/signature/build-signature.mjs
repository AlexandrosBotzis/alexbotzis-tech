// Generates src/data/signature-name.ts: "Alex Botzis" as one gestural, laser-etchable stroke.
//
//   npm run signature
//
// Source: EMS Allure (SIL OFL 1.1, see OFL.txt), a single-line derivative of
// Allura. Single-line fonts store the pen's centerline, which is what lets the
// signature be *etched* along a path rather than revealed.
//
// From lettering to signature:
//   1. Capitals (A, B) keep their shape, slightly narrowed: they carry recognition.
//   2. Lowercase compresses into rhythm: narrower, x-height flattened.
//   3. Secondary marks a fast hand skips (t-cross, i-dot, A crossbar, x cross-stroke) are dropped.
//   4. Everything fuses into ONE continuous stroke, words joined by the pen's travel,
//      ending in a long underline tail where the laser switches off.
//   5. Douglas-Peucker removes small wiggles; Catmull-Rom smooths the rest,
//      keeping deliberate sharp turns.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, '../../src/data/signature-name.ts');
const TEXT = 'Alex Botzis';

const CAPITAL = { sx: 0.86, sy: 1 };      // capitals: recognisable
const LOWER = { sx: 0.62, sy: 0.52 };     // lowercase: rhythm, not letters
const SIMPLIFY = 11;                      // Douglas-Peucker tolerance (font units)
const CORNER_DEG = 118;                   // turns sharper than this stay sharp
const DROP = { A: [1], t: [1], i: [1], j: [1], x: [1] }; // subpath indexes a fast hand skips

// Tail: where the laser keeps travelling after the last letter (font units, y-up,
// relative to the last point). A long, slightly sagging underline.
const TAIL = [[90, -70], [260, -105], [620, -100], [1000, -70], [1320, -30]];

// Glyph fixes (font units, y-up, relative to the glyph origin).
// EMS Allure's "o" exits via a stroke that starts inside the bowl, which reads
// as "a". Allura's o closes at the top and leaves through a bridge stroke.
const GLYPH_OVERRIDES = {
  o: { subpath: 1, points: [[220, 284], [262, 291], [303, 266], [336, 222], [359.5, 183]] },
};

// Exit flourishes appended to a glyph's last stroke (glyph space, y-up).
// Allura's B ends high on its top-right flourish; joined straight to the next
// letter that becomes a ruled diagonal through the bowl. A hand loops down instead.
const GLYPH_EXITS = {
  B: [[585, 545], [628, 430], [600, 300], [560, 215]],
};

const font = readFileSync(join(here, 'EMSAllure.svg'), 'utf8');
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];
const defaultAdvance = +attr(font.match(/<font\s[^>]*>/)[0], 'horiz-adv-x');

const glyphs = new Map();
for (const tag of font.match(/<glyph\b[^>]*>/g)) {
  const ch = attr(tag, 'unicode');
  if (ch == null || ch.length !== 1) continue;
  const subpaths = (attr(tag, 'd') ?? '').split(/(?=M)/).map(s => s.trim()).filter(Boolean).map(s => {
    const nums = s.match(/-?\d*\.?\d+/g).map(Number);
    const pts = [];
    for (let i = 0; i < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
    return pts;
  });
  const fix = GLYPH_OVERRIDES[ch];
  if (fix) subpaths[fix.subpath] = fix.points;
  glyphs.set(ch, { subpaths, advance: +(attr(tag, 'horiz-adv-x') ?? defaultAdvance) });
}

// 1–4. One continuous stroke in screen space (y down).
const stroke = [];
let x = 0;
for (const ch of TEXT) {
  const g = glyphs.get(ch);
  if (!g) throw new Error(`EMS Allure has no glyph for "${ch}"`);
  const scale = ch === ' ' ? LOWER : /[A-Z]/.test(ch) ? CAPITAL : LOWER;
  if (ch !== ' ') {
    const toScreen = ([px, py]) => [x + px * scale.sx, -py * scale.sy];
    g.subpaths.forEach((sub, i) => {
      if (DROP[ch]?.includes(i)) return;
      stroke.push(...sub.map(toScreen));
    });
    if (GLYPH_EXITS[ch]) stroke.push(...GLYPH_EXITS[ch].map(toScreen));
  }
  x += g.advance * scale.sx;
}
const [ex, ey] = stroke.at(-1);
stroke.push(...TAIL.map(([dx, dy]) => [ex + dx, ey - dy]));

// 5. Simplify, then smooth.
function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts.at(-1)];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((b[0] - a[0]) * (a[1] - pts[i][1]) - (a[0] - pts[i][0]) * (b[1] - a[1])) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [a, b];
  return [...simplify(pts.slice(0, idx + 1), eps).slice(0, -1), ...simplify(pts.slice(idx), eps)];
}

const turnDeg = (a, b, c) => {
  const v1 = [b[0] - a[0], b[1] - a[1]], v2 = [c[0] - b[0], c[1] - b[1]];
  const m = Math.hypot(...v1) * Math.hypot(...v2) || 1;
  return (Math.acos(Math.max(-1, Math.min(1, (v1[0] * v2[0] + v1[1] * v2[1]) / m))) * 180) / Math.PI;
};
const r = n => +n.toFixed(1);

function smooth(points) {
  const runs = [[points[0]]];
  for (let i = 1; i < points.length; i++) {
    runs.at(-1).push(points[i]);
    if (i < points.length - 1 && turnDeg(points[i - 1], points[i], points[i + 1]) > CORNER_DEG) runs.push([points[i]]);
  }
  let d = `M${r(points[0][0])} ${r(points[0][1])}`;
  for (const run of runs) {
    for (let i = 0; i < run.length - 1; i++) {
      const p0 = run[i - 1] ?? run[i], p1 = run[i], p2 = run[i + 1], p3 = run[i + 2] ?? p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
    }
  }
  return d;
}

// Drop consecutive duplicate points (glyph joins) before simplifying.
const clean = stroke.filter((p, i) => i === 0 || Math.hypot(p[0] - stroke[i - 1][0], p[1] - stroke[i - 1][1]) > 0.5);
const points = simplify(clean, SIMPLIFY);

const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
const end = points.at(-1);
const data = {
  text: TEXT,
  d: smooth(points),
  bounds: { minX: r(Math.min(...xs)), maxX: r(Math.max(...xs)), minY: r(Math.min(...ys)), maxY: r(Math.max(...ys)) },
  end: { x: r(end[0]), y: r(end[1]) },
};

writeFileSync(OUT, `// GENERATED by scripts/signature/build-signature.mjs (npm run signature). Do not edit by hand.
// Lettering source: EMS Allure, SIL Open Font License 1.1 (scripts/signature/OFL.txt).
export const signatureName = ${JSON.stringify(data, null, 2)} as const;
`);
console.log(`wrote ${OUT}: ${clean.length} → ${points.length} points, ${data.d.length} chars`);
