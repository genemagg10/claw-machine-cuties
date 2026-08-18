/* ============================================================
   refined.mjs — PROPOSED art direction for Claw Machine Cuties.
   The same characters, the same palettes, the same silhouettes —
   relit and re-materialled: soft form shading, rim light, fabric
   fuzz, stitched seams, glossy eyes and contact shadows.
   Nothing here is in the game yet.
   ============================================================ */
import { INK } from './game-art.mjs';

let UID = 0;
const uid = () => 'r' + (++UID);

/* ---------- colour maths, so one base colour gives a whole ramp ---------- */
export function hexToRgb(h) {
  const s = h.replace('#', '');
  const n = parseInt(s.length === 3 ? s.split('').map(c => c + c).join('') : s, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function rgbToHex(r, g, b) {
  const c = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}
/* mix toward white (t>0) or toward a shadow tone (t<0) */
export function shade(hex, t, tint) {
  const [r, g, b] = hexToRgb(hex);
  if (t >= 0) return rgbToHex(r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t);
  const [tr, tg, tb] = hexToRgb(tint || '#6b2f57');
  const k = -t;
  return rgbToHex(r + (tr - r) * k, g + (tg - g) * k, b + (tb - b) * k);
}

/* ---------- a plush body gradient: light from the upper left ---------- */
export function plushGrad(id, base) {
  return `<radialGradient id="${id}" cx="34%" cy="24%" r="84%">
    <stop offset="0" stop-color="${shade(base, .42)}"/>
    <stop offset=".38" stop-color="${shade(base, .13)}"/>
    <stop offset=".74" stop-color="${base}"/>
    <stop offset="1" stop-color="${shade(base, -.30)}"/>
  </radialGradient>`;
}

/* ---------- fabric fuzz: soft tufts around a silhouette ---------- */
export function fuzz(cx, cy, rx, ry, n, col, len, seed) {
  /* soft nap, not spikes: short wisps that lie ALONG the silhouette
     and mostly tuck inward, so the edge reads as brushed fibre */
  let s = seed || 1, out = '';
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const L = (len || 3.4) * .42;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd() * .3;
    const x = cx + Math.cos(a) * rx * .985, y = cy + Math.sin(a) * ry * .985;
    const l = L * (.5 + rnd() * .8);
    const tang = a + Math.PI / 2 * (rnd() > .5 ? 1 : -1);
    const ax = Math.cos(tang) * l * 1.5 + Math.cos(a) * l * .35;
    const ay = Math.sin(tang) * l * 1.5 + Math.sin(a) * l * .35;
    out += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${(ax * .4).toFixed(1)} ${(ay * .4).toFixed(1)} ${ax.toFixed(1)} ${ay.toFixed(1)}"
      stroke="${col}" stroke-width="${(.7 + rnd() * .5).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(.3 + rnd() * .3).toFixed(2)}"/>`;
  }
  return out;
}

/* a blurred copy of a form, sitting just behind it — reads as fluff */
export function halo(shape, col, blur, id) {
  return `<defs><filter id="${id}" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="${blur || 2.4}"/></filter></defs>
    <g filter="url(#${id})" fill="${col}" opacity=".38">${shape}</g>`;
}

/* ---------- a stitched seam ---------- */
export function seam(d, col, w) {
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w || 1.5}"
    stroke-linecap="round" stroke-dasharray="2.6 3.2" opacity=".34"/>`;
}

/* ---------- rim light along the top-left of a round form ---------- */
export function rim(cx, cy, rx, ry, col, w, from, to) {
  const a0 = (from == null ? 150 : from) * Math.PI / 180, a1 = (to == null ? 290 : to) * Math.PI / 180;
  const x0 = cx + Math.cos(a0) * rx, y0 = cy + Math.sin(a0) * ry;
  const x1 = cx + Math.cos(a1) * rx, y1 = cy + Math.sin(a1) * ry;
  return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${rx} ${ry} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"
    fill="none" stroke="${col}" stroke-width="${w || 2.6}" stroke-linecap="round" opacity=".72"/>`;
}

/* ---------- ambient occlusion pool where two forms meet ---------- */
export function occl(cx, cy, rx, ry, id) {
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#4a1f3d" stop-opacity=".34"/>
    <stop offset="1" stop-color="#4a1f3d" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})"/>`;
}

/* ---------- contact shadow on the ground ---------- */
export function groundShadow(cx, cy, rx, ry, id, op) {
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#3a1030" stop-opacity="${op == null ? .5 : op}"/>
    <stop offset=".62" stop-color="#3a1030" stop-opacity="${(op == null ? .5 : op) * .4}"/>
    <stop offset="1" stop-color="#3a1030" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})"/>`;
}

/* ============================================================
   THE EYE — the single biggest tell between flat and refined
   ============================================================ */
export function gEye(x, y, r, look) {
  const id = uid();
  const dx = (look ? look[0] : 0) * r * .18, dy = (look ? look[1] : 0) * r * .2;
  return `<defs>
    <radialGradient id="${id}i" cx="50%" cy="72%" r="72%">
      <stop offset="0" stop-color="#7d4a68"/><stop offset=".55" stop-color="${INK}"/><stop offset="1" stop-color="#2e1626"/>
    </radialGradient></defs>
  <ellipse cx="${x}" cy="${y}" rx="${r * 1.06}" ry="${r * 1.2}" fill="#2e1626" opacity=".28"/>
  <ellipse cx="${x + dx}" cy="${y + dy}" rx="${r}" ry="${r * 1.14}" fill="url(#${id}i)"/>
  <ellipse cx="${x + dx}" cy="${y + dy + r * .62}" rx="${r * .62}" ry="${r * .34}" fill="#ff9ec9" opacity=".38"/>
  <circle cx="${x + dx - r * .34}" cy="${y + dy - r * .46}" r="${r * .44}" fill="#fff"/>
  <circle cx="${x + dx - r * .34}" cy="${y + dy - r * .46}" r="${r * .2}" fill="#fff"/>
  <circle cx="${x + dx + r * .34}" cy="${y + dy + r * .42}" r="${r * .2}" fill="#fff" opacity=".8"/>
  <path d="M${x - r * .9} ${y - r * 1.02} q${r * .9} ${-r * .5} ${r * 1.8} 0" stroke="#fff" stroke-width="${r * .16}"
    fill="none" opacity=".5" stroke-linecap="round"/>`;
}

/* ---------- soft blush ---------- */
export function gBlush(x, y, r, col) {
  const id = uid();
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col || '#ff87b8'}" stop-opacity=".62"/>
    <stop offset="1" stop-color="${col || '#ff87b8'}" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .7}" fill="url(#${id})"/>`;
}

/* ---------- satin bow ---------- */
export function gBow(x, y, s, c, cd, rot) {
  const id = uid();
  return `<defs>
    <linearGradient id="${id}a" x1="0" y1="0" x2=".4" y2="1">
      <stop offset="0" stop-color="${shade(c, .46)}"/><stop offset=".45" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -.26)}"/></linearGradient>
  </defs>
  <g transform="translate(${x},${y}) rotate(${rot == null ? -12 : rot}) scale(${s})">
    <path d="M0 0 L-16 -10 Q-21 0 -16 10 Z" fill="url(#${id}a)"/>
    <path d="M0 0 L16 -10 Q21 0 16 10 Z" fill="url(#${id}a)"/>
    <path d="M0 0 L-16 -10 Q-12 -3 -7 0 Z" fill="${cd}" opacity=".55"/>
    <path d="M0 0 L16 -10 Q12 -3 7 0 Z" fill="${cd}" opacity=".55"/>
    <path d="M-14.5 -7.4 q-3.4 7 0 13.6" stroke="${shade(c, .6)}" stroke-width="1.6" fill="none" opacity=".7"/>
    <path d="M14.5 -7.4 q3.4 7 0 13.6" stroke="${shade(c, .6)}" stroke-width="1.6" fill="none" opacity=".55"/>
    <circle r="5.4" fill="${cd}"/><circle r="5.4" fill="url(#${id}a)" opacity=".5"/>
    <circle cx="-1.6" cy="-1.8" r="1.8" fill="#fff" opacity=".8"/>
  </g>`;
}

/* ============================================================
   REFINED SPECIES
   Same coordinates and silhouettes as the shipped art, so an
   approved design drops straight into index.html.
   ============================================================ */
let SID = 0;
const sid = () => 's' + (++SID);

const starEye = (x, y, r) => `<path transform="translate(${x},${y}) scale(${r / 9})"
  d="M0 -11 L3.2 -3.4 L11 -3.4 L4.8 1.6 L7.4 9.6 L0 4.8 L-7.4 9.6 L-4.8 1.6 L-11 -3.4 L-3.2 -3.4 Z" fill="${INK}"/>
  <path transform="translate(${x - r * .3},${y - r * .3}) scale(${r / 22})" d="M0 -11 L3.2 -3.4 L11 -3.4 L4.8 1.6 L7.4 9.6 L0 4.8 L-7.4 9.6 L-4.8 1.6 L-11 -3.4 L-3.2 -3.4 Z" fill="#fff"/>`;
const shutEye = (x, y, r) => `<path d="M${x - r} ${y + r * .3} q${r} ${-r * 1.1} ${r * 2} 0" stroke="${INK}"
  stroke-width="${r * .46}" fill="none" stroke-linecap="round"/>`;

function faceOf(mood, ex, ey, er, look) {
  switch (mood) {
    case 'pickme': return starEye(-ex, ey, er * 1.15) + starEye(ex, ey, er * 1.15);
    case 'proud':
    case 'giggle': return shutEye(-ex, ey, er) + shutEye(ex, ey, er);
    case 'sleepy': return `<path d="M${-ex - er} ${ey - r0(er)} q${er} ${er * 1.1} ${er * 2} 0" stroke="${INK}" stroke-width="${er * .44}" fill="none" stroke-linecap="round"/>
                           <path d="M${ex - er} ${ey - r0(er)} q${er} ${er * 1.1} ${er * 2} 0" stroke="${INK}" stroke-width="${er * .44}" fill="none" stroke-linecap="round"/>`;
    default: return gEye(-ex, ey, er, look) + gEye(ex, ey, er, look);
  }
}
const r0 = e => e * .2;

/* ---------------- TEDDY ---------------- */
export function rTeddy(c, o) {
  o = o || {};
  const g = sid(), mood = o.mood || 'happy', look = o.look;
  const armUp = o.arms === 'up';
  const F = c.fur, D = c.dark, Pd = c.pad;
  return `<g>
  <defs>
    ${plushGrad(g + 'f', F)}
    ${plushGrad(g + 'd', D)}
    ${plushGrad(g + 'p', Pd)}
    <linearGradient id="${g}gl" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>

  <!-- arms -->
  ${armUp
    ? `<ellipse cx="-33" cy="-16" rx="10" ry="13" fill="url(#${g}d)" transform="rotate(-38 -33 -16)"/>
       <ellipse cx="33" cy="-16" rx="10" ry="13" fill="url(#${g}d)" transform="rotate(38 33 -16)"/>`
    : `<ellipse cx="-27" cy="16" rx="11" ry="9" fill="url(#${g}d)" transform="rotate(-24 -27 16)"/>
       <ellipse cx="27" cy="16" rx="11" ry="9" fill="url(#${g}d)" transform="rotate(24 27 16)"/>`}
  ${fuzz(-27, 16, 11, 9, 9, shade(D, .18), 2.6, 5)}${fuzz(27, 16, 11, 9, 9, shade(D, .18), 2.6, 9)}

  <!-- legs -->
  <ellipse cx="-16" cy="36" rx="13" ry="11" fill="url(#${g}d)"/>
  <ellipse cx="16" cy="36" rx="13" ry="11" fill="url(#${g}d)"/>
  ${fuzz(-16, 36, 13, 11, 11, shade(D, .16), 2.8, 3)}${fuzz(16, 36, 13, 11, 11, shade(D, .16), 2.8, 7)}
  <ellipse cx="-16" cy="37" rx="7" ry="5.5" fill="url(#${g}p)"/>
  <ellipse cx="16" cy="37" rx="7" ry="5.5" fill="url(#${g}p)"/>
  ${[-16, 16].map(x => `<g>${[-2.6, 0, 2.6].map(d => `<circle cx="${x + d * 1.5}" cy="${35.2 - Math.abs(d) * .2}" r="1.1" fill="${shade(Pd, -.2)}" opacity=".7"/>`).join('')}</g>`).join('')}
  ${rim(-16, 36, 13, 11, shade(D, .55), 2, 160, 250)}${rim(16, 36, 13, 11, shade(D, .55), 2, 160, 250)}

  <!-- body -->
  ${halo(`<ellipse cx="0" cy="22" rx="26.5" ry="22.5"/>`, shade(F, -.04), 1.9, g + 'hb')}
  <ellipse cx="0" cy="22" rx="25" ry="21" fill="url(#${g}f)"/>
  ${fuzz(0, 22, 25, 21, 26, shade(F, .1), 3.2, 11)}
  <ellipse cx="0" cy="25" rx="14" ry="12" fill="url(#${g}p)" opacity=".92"/>
  ${seam(`M-13.4 22 q13.4 -8 26.8 0`, shade(Pd, -.28), 1.3)}
  ${rim(0, 22, 25, 21, shade(F, .62), 2.6, 172, 268)}
  ${occl(0, 6, 22, 9, g + 'o1')}

  <!-- ears -->
  <circle cx="-25" cy="-27" r="13" fill="url(#${g}f)"/>
  <circle cx="25" cy="-27" r="13" fill="url(#${g}f)"/>
  ${fuzz(-25, -27, 13, 13, 12, shade(F, .16), 3, 13)}${fuzz(25, -27, 13, 13, 12, shade(F, .16), 3, 17)}
  <circle cx="-25" cy="-27" r="6.6" fill="url(#${g}p)"/>
  <circle cx="25" cy="-27" r="6.6" fill="url(#${g}p)"/>
  ${seam(`M-30.4 -30 a6.6 6.6 0 0 1 10.8 0`, shade(Pd, -.3), 1.2)}
  ${seam(`M19.6 -30 a6.6 6.6 0 0 1 10.8 0`, shade(Pd, -.3), 1.2)}
  ${rim(-25, -27, 13, 13, shade(F, .66), 2.2, 160, 260)}
  ${rim(25, -27, 13, 13, shade(F, .66), 2.2, 160, 260)}

  <!-- head -->
  ${halo(`<circle cx="0" cy="-8" r="29.6"/>`, shade(F, -.04), 2.1, g + 'hh')}
  <circle cx="0" cy="-8" r="28" fill="url(#${g}f)"/>
  ${fuzz(0, -8, 28, 28, 30, shade(F, .14), 3.4, 21)}
  <ellipse cx="-9" cy="-20" rx="14" ry="10" fill="url(#${g}gl)" transform="rotate(-24 -9 -20)"/>
  ${rim(0, -8, 28, 28, shade(F, .7), 3, 168, 272)}

  <!-- muzzle -->
  <ellipse cx="0" cy="4" rx="15" ry="11.5" fill="url(#${g}p)"/>
  ${rim(0, 4, 15, 11.5, shade(Pd, .5), 1.8, 175, 265)}
  ${seam(`M-14 3.4 q14 7 28 0`, shade(Pd, -.26), 1.2)}
  <ellipse cx="0" cy="-1" rx="5.4" ry="4.2" fill="#3a1c30"/>
  <ellipse cx="0" cy="-1" rx="5.4" ry="4.2" fill="url(#${g}gl)" opacity=".8"/>
  <ellipse cx="-1.6" cy="-2.4" rx="1.8" ry="1.2" fill="#fff" opacity=".75"/>
  <path d="M0 3 v3.5 M0 6.5 q-5 4.5 -8.5 .5 M0 6.5 q5 4.5 8.5 .5" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>

  ${faceOf(mood, 11.5, -11, 5.4, look)}
  ${gBlush(-20, -1, 8.4)}${gBlush(20, -1, 8.4)}
  ${gBow(20, -30, .76, c.bow, c.bowD, -16)}
  </g>`;
}

/* ---------------- BUNNY ---------------- */
export function rBunny(c, o) {
  o = o || {};
  const g = sid(), mood = o.mood || 'happy', look = o.look;
  const F = c.fur, D = c.dark, In = c.inner, Pd = c.pad || '#fff';
  const ear = (side) => `<g transform="rotate(${13 * side} ${11 * side} -18)">
    <ellipse cx="${11 * side}" cy="-40" rx="9" ry="25" fill="url(#${g}f)"/>
    ${fuzz(11 * side, -40, 9, 25, 14, shade(F, .16), 2.8, side > 0 ? 31 : 37)}
    <ellipse cx="${11 * side}" cy="-41" rx="4.6" ry="17" fill="url(#${g}i)"/>
    ${seam(`M${11 * side} -56 v30`, shade(In, -.24), 1.1)}
    ${rim(11 * side, -40, 9, 25, shade(F, .66), 2, 170, 262)}</g>`;
  return `<g>
  <defs>${plushGrad(g + 'f', F)}${plushGrad(g + 'd', D)}${plushGrad(g + 'i', In)}${plushGrad(g + 'p', Pd)}
    <linearGradient id="${g}gl" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  ${ear(-1)}${ear(1)}
  <circle cx="28" cy="26" r="10" fill="url(#${g}p)"/>${fuzz(28, 26, 10, 10, 14, shade(c.tail || '#fff', -.1), 3, 41)}
  <ellipse cx="-25" cy="18" rx="10" ry="8" fill="url(#${g}d)" transform="rotate(-20 -25 18)"/>
  <ellipse cx="25" cy="18" rx="10" ry="8" fill="url(#${g}d)" transform="rotate(20 25 18)"/>
  <ellipse cx="-15" cy="36" rx="13" ry="10" fill="url(#${g}d)"/>
  <ellipse cx="15" cy="36" rx="13" ry="10" fill="url(#${g}d)"/>
  ${fuzz(-15, 36, 13, 10, 11, shade(D, .16), 2.6, 43)}${fuzz(15, 36, 13, 10, 11, shade(D, .16), 2.6, 47)}
  <ellipse cx="-15" cy="37" rx="6.5" ry="4.8" fill="url(#${g}i)"/>
  <ellipse cx="15" cy="37" rx="6.5" ry="4.8" fill="url(#${g}i)"/>
  ${halo(`<ellipse cx="0" cy="22" rx="24.5" ry="21.5"/>`, shade(F, -.04), 1.9, g + 'hb')}
  <ellipse cx="0" cy="22" rx="23" ry="20" fill="url(#${g}f)"/>
  ${fuzz(0, 22, 23, 20, 24, shade(F, .1), 3, 53)}
  <ellipse cx="0" cy="25" rx="13" ry="11" fill="url(#${g}i)" opacity=".6"/>
  ${rim(0, 22, 23, 20, shade(F, .62), 2.4, 172, 268)}
  ${occl(0, 8, 20, 8, g + 'o1')}
  ${halo(`<circle cx="0" cy="-6" r="27.6"/>`, shade(F, -.04), 2.1, g + 'hh')}
  <circle cx="0" cy="-6" r="26" fill="url(#${g}f)"/>
  ${fuzz(0, -6, 26, 26, 28, shade(F, .14), 3.2, 59)}
  <ellipse cx="-8" cy="-18" rx="13" ry="9" fill="url(#${g}gl)" transform="rotate(-24 -8 -18)"/>
  ${rim(0, -6, 26, 26, shade(F, .7), 3, 168, 272)}
  <ellipse cx="-7" cy="4" rx="9" ry="7" fill="url(#${g}p)" opacity=".8"/>
  <ellipse cx="7" cy="4" rx="9" ry="7" fill="url(#${g}p)" opacity=".8"/>
  ${seam(`M-13 4 q13 6 26 0`, shade(Pd, -.22), 1.1)}
  <path d="M0 -2 l4.6 3.6 h-9.2 z" fill="#ff7aa8" stroke="#ff7aa8" stroke-width="2" stroke-linejoin="round"/>
  <path d="M-1.4 -1.4 l1.6 1.2" stroke="#ffc2da" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M0 2 v3.5 M0 5.5 q-4.5 4 -7.5 .5 M0 5.5 q4.5 4 7.5 .5" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="-4.6" y="9" width="9.2" height="6.5" rx="2.4" fill="#fff" stroke="${INK}" stroke-width="1.2"/>
  <path d="M0 9 v6.5" stroke="${INK}" stroke-width="1.1"/>
  ${faceOf(mood, 12, -9, 5.6, look)}
  ${gBlush(-20, 1, 7.8)}${gBlush(20, 1, 7.8)}
  ${gBow(-21, -25, .66, c.bow, c.bowD, 18)}
  </g>`;
}

/* ---------------- UNICORN ---------------- */
export function rUni(c, o) {
  o = o || {};
  const g = sid(), mood = o.mood || 'happy', look = o.look, m = c.mane;
  return `<g>
  <defs>${plushGrad(g + 'b', c.body)}${plushGrad(g + 'd', c.dark)}${plushGrad(g + 's', c.snout)}
    <linearGradient id="${g}h" x1="0" y1="1" x2=".3" y2="0">
      <stop offset="0" stop-color="${shade(c.horn, -.2)}"/><stop offset=".5" stop-color="${shade(c.horn, .35)}"/>
      <stop offset="1" stop-color="#fffbe8"/></linearGradient>
    ${m.map((mc, i) => plushGrad(g + 'm' + i, mc)).join('')}
    <linearGradient id="${g}gl" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <path d="M24 22 q28 0 34 -26 q14 32 -22 44 z" fill="url(#${g}m0)"/>
  <path d="M28 26 q22 -2 28 -22 q8 26 -20 34 z" fill="url(#${g}m1)"/>
  <path d="M32 30 q16 -2 22 -16 q4 18 -16 25 z" fill="url(#${g}m2)"/>
  <ellipse cx="-15" cy="35" rx="12" ry="10" fill="url(#${g}d)"/>
  <ellipse cx="15" cy="35" rx="12" ry="10" fill="url(#${g}d)"/>
  <ellipse cx="-15" cy="39" rx="12" ry="6" fill="${c.hoof}"/>
  <ellipse cx="15" cy="39" rx="12" ry="6" fill="${c.hoof}"/>
  <ellipse cx="0" cy="21" rx="24" ry="20" fill="url(#${g}b)"/>
  ${fuzz(0, 21, 24, 20, 24, shade(c.body, .12), 3, 61)}
  ${rim(0, 21, 24, 20, shade(c.body, .64), 2.4, 172, 268)}
  ${occl(0, 6, 20, 8, g + 'o1')}
  <path d="M-30 -22 q-16 6 -14 24 q-12 -2 -10 -18 q-10 -6 -2 -18 q-6 -14 8 -18 q6 -12 20 -8 z" fill="url(#${g}m0)"/>
  <path d="M-27 -20 q-12 6 -11 20 q-8 -4 -6 -16 q-8 -6 -1 -15 q-4 -11 7 -14 z" fill="url(#${g}m1)"/>
  <path d="M-24 -18 q-8 6 -8 16 q-6 -6 -3 -14 q-4 -8 3 -12 z" fill="url(#${g}m2)"/>
  <path d="M-24 -28 l-4 -13 l10 6 z" fill="url(#${g}b)"/>
  <path d="M24 -28 l4 -13 l-10 6 z" fill="url(#${g}b)"/>
  <circle cx="0" cy="-8" r="27" fill="url(#${g}b)"/>
  ${fuzz(0, -8, 27, 27, 28, shade(c.body, .14), 3.2, 67)}
  <ellipse cx="-9" cy="-20" rx="13" ry="9" fill="url(#${g}gl)" transform="rotate(-24 -9 -20)"/>
  ${rim(0, -8, 27, 27, shade(c.body, .7), 3, 168, 272)}
  <path d="M-2 -34 l4 -26 l6 26 z" fill="url(#${g}h)"/>
  <path d="M-0.5 -40 l6.2 -1.6 M0.7 -47 l4.4 -1.2 M1.9 -53 l2.8 -1" stroke="#fff" stroke-width="1.8" opacity=".8" stroke-linecap="round"/>
  <path d="M-18 -26 q14 -10 32 -2 q-14 12 -32 2 z" fill="url(#${g}m0)"/>
  <path d="M-12 -25 q12 -7 24 -2 q-12 8 -24 2 z" fill="url(#${g}m2)" opacity=".9"/>
  <ellipse cx="0" cy="4" rx="14" ry="10" fill="url(#${g}s)"/>
  ${rim(0, 4, 14, 10, shade(c.snout, .5), 1.6, 175, 265)}
  <ellipse cx="-5" cy="2" rx="1.7" ry="2.4" fill="${INK}" opacity=".6"/>
  <ellipse cx="5" cy="2" rx="1.7" ry="2.4" fill="${INK}" opacity=".6"/>
  <path d="M-4.5 8 q4.5 4.5 9 0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  ${mood === 'happy' || mood === 'wow'
    ? `<path d="M-17 -10 q5.5 -8 11 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
       <path d="M6 -10 q5.5 -8 11 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : faceOf(mood, 11.5, -11, 5, look)}
  ${gBlush(-20, -1, 8.4, '#ff9ec9')}${gBlush(20, -1, 8.4, '#ff9ec9')}
  <path d="M-30 -34 l1.4 4.4 l4.4 1.4 l-4.4 1.4 l-1.4 4.4 l-1.4 -4.4 l-4.4 -1.4 l4.4 -1.4 z" fill="#fff6bd"/>
  <path d="M30 -30 l1 3.2 l3.2 1 l-3.2 1 l-1 3.2 l-1 -3.2 l-3.2 -1 l3.2 -1 z" fill="#fff6bd"/>
  </g>`;
}

export const REFINED = { teddy: rTeddy, bunny: rBunny, uni: rUni };
export function refinedArt(v, o) {
  const fn = REFINED[v.type];
  return fn ? fn(v.c, o) : null;
}
