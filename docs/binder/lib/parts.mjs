/* ============================================================
   parts.mjs — new drawings invented for the binder's concept
   plates. Everything here is PROPOSED art. The real, shipped art
   lives in game-art.mjs / game-cabinet.mjs.
   ============================================================ */
import { INK, eye, blush, smile, bowArt, sparkleArt, keyArt, stuffyArt, MACHINES } from './game-art.mjs';
import { prongPath, projX, projY, sOf, PITX, PITZ } from './game-cabinet.mjs';
import { P } from './plate.mjs';

/* deterministic randomness so a plate looks the same every rebuild */
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

/* ---------- the claw, drawn from the game's own prong path ---------- */
export function clawSVG(open, scale, opts) {
  const o = opts || {};
  const s = scale == null ? 1 : scale;
  const a = (1 - (open == null ? 1 : open)) * 26;   // closing rotation
  return `<g transform="scale(${s})">
    <g class="prong" opacity=".85" transform="rotate(${-a * .6})">${prongPath(-.45, 34, 9, true)}</g>
    <g transform="rotate(${a})">${prongPath(-1, 42, 12)}</g>
    <g transform="rotate(${-a})">${prongPath(1, 42, 12)}</g>
    <ellipse cy="-4" rx="25" ry="15" fill="#dfe7f5"/>
    <ellipse cy="-8" rx="25" ry="15" fill="#f2f6ff"/>
    <rect x="-11" y="-36" width="22" height="26" rx="7" fill="#c9d4e8"/>
    ${o.face ? clawFace(o.face) : `<circle cy="-2" r="6" fill="#ff8fbe"/><circle cy="-2" r="2.4" fill="#fff" opacity=".7"/>`}
    <ellipse cx="-9" cy="-13" rx="7" ry="4" fill="#fff" opacity=".85" transform="rotate(-18 -9 -13)"/>
  </g>`;
}

/* ---------- PROPOSED: the claw gets a face ---------- */
export function clawFace(kind) {
  const E = (dx, dy, r) => `<ellipse cx="${dx}" cy="${dy}" rx="${r}" ry="${r * 1.15}" fill="${INK}"/>
    <circle cx="${dx - r * .3}" cy="${dy - r * .45}" r="${r * .4}" fill="#fff"/>`;
  const bl = `${blush(-13, -3, 5, '#ff9ec9')}${blush(13, -3, 5, '#ff9ec9')}`;
  switch (kind) {
    case 'ready':   return `${E(-7, -9, 4)}${E(7, -9, 4)}${smile(-3.5, -3, 3.5)}${bl}`;
    case 'aiming':  return `<path d="M-11 -11 q4 -4 8 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                            <path d="M3 -11 q4 -4 8 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                            ${E(-7, -7, 3.4)}${E(7, -7, 3.4)}
                            <path d="M-3 -1 h6" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>${bl}`;
    case 'squeeze': return `<path d="M-11 -12 l7 4 l-7 4" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 -12 l-7 4 l7 4" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M-5 -1 h10 M-3 -3 v4 M0 -3 v4 M3 -3 v4" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>${bl}`;
    case 'proud':   return `<path d="M-12 -8 q5 -7 10 0" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>
                            <path d="M2 -8 q5 -7 10 0" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>
                            <path d="M-7 -1 q7 8 14 0 z" fill="${INK}"/>${bl}${sparkleArt(-19, -16, .42, '#fff6bd')}${sparkleArt(18, -14, .34, '#fff6bd')}`;
    case 'oops':    return `${E(-7, -9, 4.6)}${E(7, -9, 4.6)}
                            <ellipse cy="0" rx="4" ry="5" fill="${INK}"/>
                            <path d="M17 -14 q5 6 0 10 q-5 -4 0 -10 z" fill="#7fd8ff"/>${bl}`;
    case 'sleepy':  return `<path d="M-11 -8 q4 5 8 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                            <path d="M3 -8 q4 5 8 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                            <ellipse cy="0" rx="3" ry="3.6" fill="${INK}"/>${bl}
                            <text x="15" y="-14" font-size="11" font-weight="800" fill="#9fb0d0">z</text>
                            <text x="22" y="-22" font-size="14" font-weight="800" fill="#9fb0d0">z</text>`;
    default:        return `${E(-7, -9, 4)}${E(7, -9, 4)}${smile(-3.5, -3, 3.5)}${bl}`;
  }
}

/* ============================================================
   PROPOSED: the feelings system — one face layer, twelve moods
   Drawn to sit on the teddy head (eyes ±11.5,-11 · mouth y≈4)
   ============================================================ */
const brow = (x, d) => `<path d="M${x - 6} ${-22 + d} q6 ${d > 0 ? 4 : -4} 12 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
const arcUp = x => `<path d="M${x - 6} -9 q6 -8 12 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const arcDn = x => `<path d="M${x - 6} -13 q6 8 12 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const heartEye = x => `<path transform="translate(${x},-11) scale(.62)" d="M0 12 C-14 2 -12 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C12 -10 14 2 0 12 Z" fill="#ff4f92"/>`;
const starEye = x => `<path transform="translate(${x},-11) scale(.58)" d="M0 -11 L3.2 -3.4 L11 -3.4 L4.8 1.6 L7.4 9.6 L0 4.8 L-7.4 9.6 L-4.8 1.6 L-11 -3.4 L-3.2 -3.4 Z" fill="${INK}"/>`;
const swirlEye = x => `<path transform="translate(${x},-11)" d="M0 0 m0 -1 a1 1 0 1 1 -1.6 .9 a2.6 2.6 0 1 0 3.6 -1.4 a4.2 4.2 0 1 0 -5.2 3"
  stroke="${INK}" stroke-width="2.1" fill="none" stroke-linecap="round"/>`;
const bigEye = x => `<ellipse cx="${x}" cy="-11" rx="6.4" ry="7.4" fill="#fff" stroke="${INK}" stroke-width="2.2"/>
  <circle cx="${x}" cy="-10" r="3.2" fill="${INK}"/>`;

/* eyes that follow something — dx,dy in −1..1 */
export function lookEyes(dx, dy, s) {
  const k = s == null ? 1 : s;
  const one = x => `<ellipse cx="${x}" cy="${-11 * k}" rx="${5.6 * k}" ry="${6.4 * k}" fill="#fff" stroke="${INK}" stroke-width="${2 * k}"/>
    <ellipse cx="${x + dx * 2.4 * k}" cy="${(-11 + dy * 2.6) * k}" rx="${3.3 * k}" ry="${3.7 * k}" fill="${INK}"/>
    <circle cx="${x + dx * 2.4 * k - 1.1 * k}" cy="${(-11 + dy * 2.6) * k - 1.4 * k}" r="${1.3 * k}" fill="#fff"/>`;
  return one(-11.5 * k) + one(11.5 * k);
}

const MOUTH = {
  w:      `<path d="M0 3 v3.5 M0 6.5 q-5 4.5 -8.5 .5 M0 6.5 q5 4.5 8.5 .5" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  grin:   `<path d="M-9 4 q9 11 18 0 z" fill="${INK}"/><path d="M-5 10 q4 4 8 0 z" fill="#ff7aa8"/>`,
  o:      `<ellipse cx="0" cy="7" rx="4.4" ry="5.6" fill="${INK}"/>`,
  tiny:   `<path d="M-3.5 5 q3.5 3.6 7 0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  wobble: `<path d="M-8 6 q4 -4 8 0 q4 4 8 0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  flat:   `<path d="M-6 6 h12" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`,
  cat:    `<path d="M-8 4 q4 5 8 0 q4 5 8 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
};

export const MOODS = {
  happy:  { label: 'happy',      art: () => `${eye(-11.5, -11, 5)}${eye(11.5, -11, 5)}${MOUTH.w}` },
  pickme: { label: 'PICK ME!',   art: () => `${starEye(-11.5)}${starEye(11.5)}${MOUTH.grin}
              ${sparkleArt(-26, -24, .5, '#fff6bd')}${sparkleArt(26, -22, .42, '#fff6bd')}${sparkleArt(0, -34, .34, '#fff6bd')}` },
  hopeful:{ label: 'hopeful',    art: () => `${lookEyes(0, -1)}${MOUTH.tiny}${brow(-11.5, 2)}${brow(11.5, 2)}` },
  sleepy: { label: 'sleepy',     art: () => `${arcDn(-11.5)}${arcDn(11.5)}${MOUTH.o}
              <text x="24" y="-24" font-size="13" font-weight="800" fill="#9fb0d0">z</text>
              <text x="33" y="-34" font-size="17" font-weight="800" fill="#9fb0d0">z</text>` },
  dizzy:  { label: 'dizzy',      art: () => `${swirlEye(-11.5)}${swirlEye(11.5)}${MOUTH.wobble}
              ${sparkleArt(-24, -30, .42, '#ffe071')}${sparkleArt(24, -30, .42, '#ffe071')}` },
  squish: { label: 'squished',   art: () => `<path d="M-17 -13 l9 5 M-8 -13 l-9 5" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
              <path d="M8 -13 l9 5 M17 -13 l-9 5" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>${MOUTH.wobble}` },
  wow:    { label: 'wow!',       art: () => `${bigEye(-11.5)}${bigEye(11.5)}${MOUTH.o}
              <path d="M-30 -26 l-6 -6 M30 -26 l6 -6 M0 -36 v-8" stroke="${P.lemon}" stroke-width="3" stroke-linecap="round"/>` },
  shy:    { label: 'shy',        art: () => `${arcUp(-11.5)}${arcUp(11.5)}${MOUTH.tiny}` },
  proud:  { label: 'proud',      art: () => `${arcUp(-11.5)}${arcUp(11.5)}${MOUTH.grin}
              ${sparkleArt(-27, -22, .48, '#fff6bd')}${sparkleArt(27, -20, .4, '#fff6bd')}` },
  worried:{ label: 'worried',    art: () => `${eye(-11.5, -10, 4.6)}${eye(11.5, -10, 4.6)}${MOUTH.wobble}
              ${brow(-11.5, 3)}${brow(11.5, 3)}
              <path d="M23 -18 q5 7 0 11 q-5 -4 0 -11 z" fill="#7fd8ff"/>` },
  giggle: { label: 'giggling',   art: () => `${arcUp(-11.5)}${arcUp(11.5)}${MOUTH.grin}
              <path d="M-32 -6 h-7 M-31 2 h-6 M32 -6 h7 M31 2 h6" stroke="${INK}" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>` },
  love:   { label: 'in love',    art: () => `${heartEye(-11.5)}${heartEye(11.5)}${MOUTH.cat}
              <path transform="translate(28,-30) scale(.4)" d="M0 12 C-14 2 -12 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C12 -10 14 2 0 12 Z" fill="#ff8fbe"/>
              <path transform="translate(-27,-26) scale(.28)" d="M0 12 C-14 2 -12 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C12 -10 14 2 0 12 Z" fill="#ff8fbe"/>` },
  brave:  { label: 'brave',      art: () => `${eye(-11.5, -10, 5)}${eye(11.5, -10, 5)}${MOUTH.flat}
              ${brow(-11.5, -3)}${brow(11.5, -3)}` }
};

/* a bare teddy head to hang a mood on — same shapes as artTeddy */
export function bearHead(c, mood, squash) {
  const sq = squash || 1;
  return `<g transform="scale(${1 / sq},${sq})">
    <circle cx="-25" cy="-27" r="13" fill="${c.fur}"/><circle cx="-25" cy="-27" r="6.6" fill="${c.pad}"/>
    <circle cx="25" cy="-27" r="13" fill="${c.fur}"/><circle cx="25" cy="-27" r="6.6" fill="${c.pad}"/>
    <circle cx="0" cy="-8" r="28" fill="${c.fur}"/>
    <ellipse cx="0" cy="4" rx="15" ry="11.5" fill="${c.pad}"/>
    <ellipse cx="0" cy="-1" rx="5.4" ry="4.2" fill="${INK}"/>
    ${blush(-20, -1, 7)}${blush(20, -1, 7)}
    ${(MOODS[mood] || MOODS.happy).art()}
    ${bowArt(20, -30, .72, c.bow, c.bowD, -16)}
  </g>`;
}

/* ---------- a believable pile of plushies inside a pit ---------- */
export function pile(m, seed, n, opts) {
  const o = opts || {};
  const r = rng(seed);
  const items = [];
  for (let i = 0; i < n; i++) {
    const v = m.roster[Math.floor(r() * m.roster.length)];
    const rad = m.size + (r() * 4 - 2);
    const x = -PITX + rad + 8 + r() * (2 * PITX - 2 * rad - 16);
    const z = rad * .6 + r() * (PITZ - rad * 1.1);
    const y = rad * .58 + (r() < .34 ? rad * (.9 + r() * .7) : 0);
    items.push({ v, x, y, z, r: rad, rot: r() * 26 - 13 });
  }
  items.sort((a, b) => (b.z - a.z) || (a.y - b.y));
  const draw = items.map(b => {
    const sc = (b.r / 40) * sOf(b.z);
    const mood = o.moodFor ? o.moodFor(b) : null;
    return `<g transform="translate(${projX(b.x, b.z).toFixed(1)},${projY(b.y, b.z).toFixed(1)}) rotate(${b.rot.toFixed(1)}) scale(${sc.toFixed(3)})">${
      mood ? mood : stuffyArt(b.v)}</g>`;
  }).join('');
  return { items, svg: draw };
}

/* ---------- one plushie, placed ---------- */
export function mini(v, x, y, s, rot) {
  return `<g transform="translate(${x},${y}) rotate(${rot || 0}) scale(${s})">${stuffyArt(v)}</g>`;
}

/* ---------- a small "machine card" cabinet, for idea line-ups ---------- */
export function cabCard(o) {
  const s = o.skin;
  const bulbs = Array.from({ length: 7 }, (_, i) =>
    `<circle cx="${20 + i * 16}" cy="7" r="2.8" fill="#fff8c4"/>`).join('');
  return `<g transform="translate(${o.x},${o.y}) scale(${o.scale || 1})">
    <rect x="0" y="0" width="132" height="176" rx="18" fill="${s.body}"/>
    <rect x="0" y="0" width="132" height="176" rx="18" fill="none" stroke="${s.dark}" stroke-width="3"/>
    <rect x="7" y="4" width="118" height="30" rx="13" fill="${s.marquee}"/>
    ${bulbs}
    <text x="66" y="26" text-anchor="middle" font-size="15" fill="#fff">${o.emoji}</text>
    <rect x="13" y="42" width="106" height="86" rx="10" fill="${s.glass}"/>
    <rect x="13" y="42" width="106" height="86" rx="10" fill="none" stroke="${s.trim}" stroke-width="4"/>
    ${o.inner || ''}
    <rect x="16" y="45" width="34" height="80" rx="8" fill="#fff" opacity=".3"/>
    <rect x="13" y="134" width="106" height="34" rx="10" fill="${s.trim}"/>
    <circle cx="32" cy="151" r="8" fill="${s.dark}"/><circle cx="29" cy="148" r="2.6" fill="#fff" opacity=".6"/>
    <rect x="50" y="144" width="56" height="14" rx="7" fill="${s.marquee}" opacity=".65"/>
  </g>`;
}

/* ---------- PROPOSED: a full teddy that can wear any mood
     and lift its arms. Same shapes as artTeddy, but the face and
     the arms are now separate layers instead of baked in. -------- */
export function bearFull(c, mood, o) {
  o = o || {};
  const armUp = o.arms === 'up';
  const wave  = o.arms === 'wave';
  const sq = o.squash || 1;
  const arm = (side) => {
    const s = side;
    if (armUp) return `<ellipse cx="${33 * s}" cy="-16" rx="10" ry="13" fill="${c.dark}" transform="rotate(${38 * s} ${33 * s} -16)"/>`;
    if (wave && s > 0) return `<ellipse cx="36" cy="-22" rx="10" ry="13" fill="${c.dark}" transform="rotate(52 36 -22)"/>`;
    return `<ellipse cx="${27 * s}" cy="16" rx="11" ry="9" fill="${c.dark}" transform="rotate(${24 * s} ${27 * s} 16)"/>`;
  };
  return `<g transform="scale(${1 / sq},${sq})">
    ${arm(-1)}${arm(1)}
    <ellipse cx="-16" cy="36" rx="13" ry="11" fill="${c.dark}"/>
    <ellipse cx="16" cy="36" rx="13" ry="11" fill="${c.dark}"/>
    <ellipse cx="-16" cy="37" rx="7" ry="5.5" fill="${c.pad}"/>
    <ellipse cx="16" cy="37" rx="7" ry="5.5" fill="${c.pad}"/>
    <ellipse cx="0" cy="22" rx="25" ry="21" fill="${c.fur}"/>
    <ellipse cx="0" cy="25" rx="14" ry="12" fill="${c.pad}" opacity=".75"/>
    ${bearHead(c, mood, 1)}
  </g>`;
}

/* ---------- a rounded speech bubble with a tail ---------- */
export function bubble(x, y, w, h, text, fill, tail, fs, edge) {
  const t = tail || 'bl';
  const tails = {
    bl: `M${x + 22} ${y + h} l-6 18 l24 -18 z`,
    br: `M${x + w - 46} ${y + h} l24 18 l-6 -18 z`,
    tl: `M${x + 22} ${y} l-6 -18 l24 18 z`
  };
  const st = edge ? `stroke="${edge}" stroke-width="2"` : '';
  return `<g>
    <path d="${tails[t]}" fill="${fill || '#fff'}" ${st}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2.2}" fill="${fill || '#fff'}" ${st}/>
    <rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="${h / 2.4}" fill="${fill || '#fff'}"/>
    <text x="${x + w / 2}" y="${y + h / 2 + (fs || 17) * .36}" text-anchor="middle"
      font-size="${fs || 17}" font-weight="800" fill="${P.hot}">${text}</text></g>`;
}
