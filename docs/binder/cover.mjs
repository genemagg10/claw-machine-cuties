/* ============================================================
   cover.mjs — the illustrated binder cover.
   A night arcade: six glowing machines, a marquee frame of
   running bulbs, and every plushie drawn by the game's own code.
   ============================================================ */
import { PAGE, P, FONT } from './lib/plate.mjs';
import { MACHINES, stuffyArt, keyArt, sparkleArt, bowArt, INK, eye, blush } from './lib/game-art.mjs';
import { bearFull, bearHead, clawSVG, rng, MOODS } from './lib/parts.mjs';

const M = MACHINES;

/* ---------- the night palette ---------- */
export const N = {
  void:  '#25091f',
  deep:  '#3d1233',
  mid:   '#5e1c4a',
  warm:  '#8a2d63',
  gold:  '#ffd447',
  gold2: '#e8a417',
  gold3: '#fff6bd',
  glow:  '#ffe9b8',
  pink:  '#ff5c9d',
  pink2: '#ff8fbe',
  pink3: '#ffc2e0',
  cream: '#fff4fa'
};

/* ---------- a ring of marquee bulbs along a path of points ---------- */
export function bulbs(pts, r, seed) {
  const rd = rng(seed || 4);
  return pts.map((p, i) => {
    const lit = (i + Math.floor(rd() * 1.4)) % 3 !== 2;
    return `<g>
      ${lit ? `<circle cx="${p[0]}" cy="${p[1]}" r="${r * 2.6}" fill="${N.gold}" opacity=".16"/>
               <circle cx="${p[0]}" cy="${p[1]}" r="${r * 1.7}" fill="${N.gold}" opacity=".26"/>` : ''}
      <circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${lit ? '#fffbe8' : '#c99a6a'}" stroke="${N.gold2}" stroke-width="${r * .32}"/>
      ${lit ? `<circle cx="${p[0] - r * .3}" cy="${p[1] - r * .34}" r="${r * .34}" fill="#fff"/>` : ''}
    </g>`;
  }).join('');
}

/* points evenly spaced around a rounded rectangle */
export function roundRectPoints(x, y, w, h, rad, step) {
  const pts = [];
  const push = (px, py) => pts.push([+px.toFixed(1), +py.toFixed(1)]);
  for (let i = x + rad; i <= x + w - rad; i += step) push(i, y);
  for (let a = 0; a <= 90; a += 30) { const t = a * Math.PI / 180; push(x + w - rad + Math.sin(t) * rad, y + rad - Math.cos(t) * rad); }
  for (let i = y + rad; i <= y + h - rad; i += step) push(x + w, i);
  for (let a = 0; a <= 90; a += 30) { const t = a * Math.PI / 180; push(x + w - rad + Math.cos(t) * rad, y + h - rad + Math.sin(t) * rad); }
  for (let i = x + w - rad; i >= x + rad; i -= step) push(i, y + h);
  for (let a = 0; a <= 90; a += 30) { const t = a * Math.PI / 180; push(x + rad - Math.sin(t) * rad, y + h - rad + Math.cos(t) * rad); }
  for (let i = y + h - rad; i >= y + rad; i -= step) push(x, i);
  for (let a = 0; a <= 90; a += 30) { const t = a * Math.PI / 180; push(x + rad - Math.cos(t) * rad, y + rad - Math.sin(t) * rad); }
  return pts;
}

/* ---------- a scalloped edge, like a paper doily / prize ticket ---------- */
export function scallop(x, y, w, h, r, fill, stroke, sw) {
  const seg = (len) => Math.max(3, Math.round(len / (r * 2)));
  let d = `M${x + r} ${y}`;
  const arc = (nx, ny, sweep) => ` A${r} ${r} 0 0 ${sweep} ${nx} ${ny}`;
  let n = seg(w - 2 * r);
  for (let i = 1; i <= n; i++) d += arc(x + r + (w - 2 * r) * i / n, y, 1);
  n = seg(h - 2 * r);
  for (let i = 1; i <= n; i++) d += arc(x + w, y + r + (h - 2 * r) * i / n, 1);
  n = seg(w - 2 * r);
  for (let i = 1; i <= n; i++) d += arc(x + w - r - (w - 2 * r) * i / n, y + h, 1);
  n = seg(h - 2 * r);
  for (let i = 1; i <= n; i++) d += arc(x, y + h - r - (h - 2 * r) * i / n, 1);
  d += 'Z';
  return `<path d="${d}" fill="${fill || 'none'}" stroke="${stroke || 'none'}" stroke-width="${sw || 0}"/>`;
}

/* ---------- corner rosette: a bow with a jewel in the knot ---------- */
export function rosette(x, y, s, rot, c1, c2) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <circle r="30" fill="${N.deep}" stroke="${N.gold2}" stroke-width="3"/>
    <circle r="30" fill="none" stroke="${N.gold}" stroke-width="1.4" stroke-dasharray="3 5"/>
    ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-24" rx="5" ry="10" fill="${N.gold}" opacity=".55" transform="rotate(${i * 45})"/>`).join('')}
    <circle r="19" fill="${N.mid}" stroke="${N.gold}" stroke-width="2"/>
    ${bowArt(0, 0, 1.05, c1 || N.pink, c2 || '#c9377f', -8)}
    <circle cy="0" r="4" fill="${N.gold3}" opacity=".9"/>
    ${sparkleArt(19, -19, .42, N.gold3)}
  </g>`;
}

/* ---------- a faceted candy jewel ---------- */
export function jewel(x, y, r, c, cd) {
  return `<g transform="translate(${x},${y})">
    <ellipse rx="${r * 1.5}" ry="${r * 1.5}" fill="${c}" opacity=".18"/>
    <path d="M0 ${-r * 1.25} L${r * .92} ${-r * .4} L${r * .62} ${r * 1.1} L${-r * .62} ${r * 1.1} L${-r * .92} ${-r * .4} Z" fill="${c}"/>
    <path d="M0 ${-r * 1.25} L${r * .92} ${-r * .4} L0 ${r * .1} Z" fill="#fff" opacity=".38"/>
    <path d="M0 ${-r * 1.25} L${-r * .92} ${-r * .4} L0 ${r * .1} Z" fill="${cd}" opacity=".45"/>
    <path d="M0 ${-r * 1.25} L${r * .92} ${-r * .4} L${r * .62} ${r * 1.1} L${-r * .62} ${r * 1.1} L${-r * .92} ${-r * .4} Z"
      fill="none" stroke="${N.gold}" stroke-width="${r * .18}"/>
    ${sparkleArt(-r * .45, -r * .5, r * .033, '#fff')}
  </g>`;
}

/* ---------- bunting across two points ---------- */
export function bunting(x1, y1, x2, y2, n, sag) {
  const cols = [N.pink2, N.gold, '#7fe0c4', '#c9a4ff', '#7fd8ff', '#ff9a7a'];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + (sag || 40);
  const at = t => {
    const u = 1 - t;
    return [u * u * x1 + 2 * u * t * mx + t * t * x2, u * u * y1 + 2 * u * t * my + t * t * y2];
  };
  let out = `<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="${N.gold2}" stroke-width="2.4" opacity=".85"/>`;
  for (let i = 0; i < n; i++) {
    const t = (i + .5) / n, p = at(t), p2 = at(Math.min(1, t + .02));
    const ang = Math.atan2(p2[1] - p[1], p2[0] - p[0]) * 180 / Math.PI;
    out += `<g transform="translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${ang.toFixed(1)})">
      <path d="M-9 0 L9 0 L0 20 Z" fill="${cols[i % cols.length]}"/>
      <path d="M-9 0 L9 0 L0 5 Z" fill="#fff" opacity=".3"/></g>`;
  }
  return out;
}

/* ---------- a balloon on a string ---------- */
export function balloon(x, y, s, c, cd) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M0 26 q10 22 3 46" stroke="${N.gold3}" stroke-width="1.6" fill="none" opacity=".65"/>
    <ellipse rx="22" ry="27" fill="${c}"/>
    <ellipse rx="22" ry="27" fill="none" stroke="${cd}" stroke-width="1.6" opacity=".6"/>
    <ellipse cx="-7" cy="-9" rx="7" ry="10" fill="#fff" opacity=".5" transform="rotate(-20 -7 -9)"/>
    <path d="M-4 26 h8 l-4 6 z" fill="${cd}"/>
  </g>`;
}

/* ============================================================
   A GLOWING CABINET — 120 x 196, origin top-left
   ============================================================ */
export function cabinet(m, x, y, s, seed, flip) {
  const k = m.skin, rd = rng(seed);
  const id = 'cab' + seed;

  /* the heap behind the glass, drawn with the real plushie art */
  const heap = [];
  const picks = [0, 3, 7, 1, 5, 2, 6];
  for (let i = 0; i < 7; i++) {
    const v = m.roster[picks[i]];
    const col = i % 3, row = Math.floor(i / 3);
    const px = 26 + col * 24 + rd() * 8, py = 104 - row * 15 - rd() * 5;
    heap.push({ v, px, py, sc: .19 + rd() * .04, rot: rd() * 24 - 12, z: py });
  }
  heap.sort((a, b) => a.z - b.z);

  const marqueeBulbs = Array.from({ length: 9 }, (_, i) => [10 + i * 12.5, 4]);

  return `<g transform="translate(${x},${y}) scale(${s})${flip ? ' scale(-1,1)' : ''}">
  <defs>
    <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${k.dark}"/><stop offset=".28" stop-color="${k.body}"/>
      <stop offset=".72" stop-color="${k.body}"/><stop offset="1" stop-color="${k.dark}"/></linearGradient>
    <radialGradient id="${id}g" cx="50%" cy="4%" r="96%">
      <stop offset="0" stop-color="#fff8e0"/><stop offset=".42" stop-color="${k.light}"/>
      <stop offset="1" stop-color="${k.dark}"/></radialGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".38" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".54" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="${id}c"><rect x="10" y="40" width="100" height="82" rx="9"/></clipPath>
  </defs>

  <!-- the light this machine throws into the room -->
  <ellipse cx="60" cy="82" rx="104" ry="96" fill="${k.body}" opacity=".16"/>
  <ellipse cx="60" cy="80" rx="70" ry="64" fill="#ffeec4" opacity=".13"/>

  <!-- feet -->
  <rect x="12" y="176" width="16" height="14" rx="5" fill="${k.dark}"/>
  <rect x="92" y="176" width="16" height="14" rx="5" fill="${k.dark}"/>

  <!-- body -->
  <rect x="2" y="10" width="116" height="172" rx="14" fill="url(#${id}b)"/>
  <rect x="2" y="10" width="116" height="172" rx="14" fill="none" stroke="${N.gold2}" stroke-width="1.6" opacity=".55"/>
  <rect x="7" y="16" width="12" height="160" rx="6" fill="#fff" opacity=".18"/>

  <!-- marquee -->
  <rect x="4" y="-4" width="112" height="34" rx="12" fill="${k.marquee}"/>
  <rect x="4" y="-4" width="112" height="34" rx="12" fill="none" stroke="${N.gold}" stroke-width="1.8" opacity=".8"/>
  <rect x="10" y="0" width="100" height="12" rx="6" fill="#fff" opacity=".22"/>
  ${bulbs(marqueeBulbs, 2.6, seed + 11)}
  <text x="60" y="24" text-anchor="middle" font-size="15">${m.emoji}</text>

  <!-- the glass and what is behind it -->
  <rect x="10" y="40" width="100" height="82" rx="9" fill="url(#${id}g)"/>
  <g clip-path="url(#${id}c)">
    ${[[26, 58, 5], [58, 50, 7], [88, 62, 4], [40, 76, 4], [78, 84, 6]].map(d =>
      `<circle cx="${d[0]}" cy="${d[1]}" r="${d[2]}" fill="#fff" opacity=".2"/>`).join('')}
    <path d="M10 106 h100 v16 h-100 z" fill="${k.trim}" opacity=".5"/>
    ${heap.map(b => `<g transform="translate(${b.px.toFixed(1)},${b.py.toFixed(1)}) rotate(${b.rot.toFixed(1)}) scale(${b.sc.toFixed(3)})">${stuffyArt(b.v)}</g>`).join('')}
    <!-- the claw, mid-hunt -->
    <path d="M64 40 V58" stroke="#cfd8ea" stroke-width="2"/>
    <g transform="translate(64,62) scale(.30)">${clawSVG(1, 1, {})}</g>
    <rect x="10" y="40" width="100" height="82" fill="url(#${id}s)"/>
  </g>
  <rect x="10" y="40" width="100" height="82" rx="9" fill="none" stroke="${k.trim}" stroke-width="4"/>
  <rect x="10" y="40" width="100" height="82" rx="9" fill="none" stroke="${N.gold2}" stroke-width="1.2" opacity=".65"/>

  <!-- control panel -->
  <rect x="12" y="126" width="96" height="20" rx="8" fill="${k.dark}"/>
  <rect x="12" y="126" width="96" height="9" rx="5" fill="#fff" opacity=".14"/>
  <circle cx="34" cy="136" r="6.4" fill="#e8e8f2"/><circle cx="34" cy="134" r="5" fill="${N.pink}"/>
  <circle cx="60" cy="136" r="4.6" fill="${N.gold}"/><circle cx="60" cy="135" r="1.8" fill="#fff" opacity=".7"/>
  <rect x="76" y="132" width="18" height="4" rx="2" fill="#2b1524"/>

  <!-- prize chute, with somebody peeking out -->
  <rect x="12" y="150" width="40" height="26" rx="7" fill="#2b1524"/>
  <rect x="12" y="150" width="40" height="9" rx="4" fill="${k.dark}"/>
  <g transform="translate(32,170) scale(.17)">${stuffyArt(m.roster[0])}</g>

  <!-- name plate -->
  <rect x="58" y="152" width="50" height="22" rx="8" fill="${k.trim}"/>
  <rect x="58" y="152" width="50" height="22" rx="8" fill="none" stroke="${N.gold2}" stroke-width="1.2"/>
  <text x="83" y="167" text-anchor="middle" font-size="11">${m.emoji}💖</text>
  </g>`;
}

/* ---------- a gumball machine, for the corners ---------- */
export function gumball(x, y, s, seed) {
  const rd = rng(seed);
  const cols = ['#ff5c9d', '#ffd447', '#7fe0c4', '#7fd8ff', '#c9a4ff', '#ff9a7a', '#fff'];
  const balls = Array.from({ length: 22 }, () => {
    const a = rd() * Math.PI * 2, r = Math.sqrt(rd()) * 20;
    return `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(-14 + Math.sin(a) * r * .86).toFixed(1)}" r="4.4" fill="${cols[Math.floor(rd() * 7)]}"/>`;
  }).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cy="-12" rx="34" ry="34" fill="#ffd9a8" opacity=".14"/>
    <path d="M-20 30 h40 l4 22 h-48 z" fill="${N.pink}"/>
    <rect x="-26" y="50" width="52" height="9" rx="4" fill="#c9377f"/>
    <rect x="-16" y="16" width="32" height="16" rx="4" fill="#e05a9a"/>
    <circle cx="0" cy="-14" r="26" fill="#dff2ff" opacity=".34"/>
    <g clip-path="url(#gbclip${seed})">${balls}</g>
    <clipPath id="gbclip${seed}"><circle cx="0" cy="-14" r="24"/></clipPath>
    <circle cx="0" cy="-14" r="26" fill="none" stroke="#cfe6f5" stroke-width="2.6" opacity=".8"/>
    <ellipse cx="-9" cy="-26" rx="7" ry="10" fill="#fff" opacity=".5" transform="rotate(-24 -9 -26)"/>
    <path d="M-14 -40 q14 -8 28 0" fill="none" stroke="#fff" stroke-width="2" opacity=".45"/>
    <circle cx="0" cy="-40" r="5" fill="${N.gold}"/>
    <circle cx="14" cy="24" r="5" fill="${N.gold}"/><rect x="12" y="22" width="12" height="4" rx="2" fill="${N.gold2}"/>
  </g>`;
}

/* ---------- the ribbon banner that holds DEVELOPMENT BINDER ---------- */
export function ribbon(cx, y, w, h, text, fs) {
  const half = w / 2, t = h / 2;
  return `<g>
    <path d="M${cx - half - 30} ${y + 4} l22 ${t} l-22 ${t} l34 0 l0 ${-2 * t} z" fill="#c9377f"/>
    <path d="M${cx + half + 30} ${y + 4} l-22 ${t} l22 ${t} l-34 0 l0 ${-2 * t} z" fill="#c9377f"/>
    <rect x="${cx - half}" y="${y}" width="${w}" height="${h}" rx="${h / 2.6}" fill="${N.pink}"/>
    <rect x="${cx - half}" y="${y}" width="${w}" height="${h}" rx="${h / 2.6}" fill="none" stroke="${N.gold}" stroke-width="2.6"/>
    <rect x="${cx - half + 6}" y="${y + 5}" width="${w - 12}" height="${h * .32}" rx="${h * .16}" fill="#fff" opacity=".22"/>
    <text x="${cx}" y="${y + h * .68}" text-anchor="middle" font-size="${fs}" font-weight="800"
      fill="#fff" letter-spacing="2.6">${text}</text>
  </g>`;
}

/* ============================================================
   THE COVER
   ============================================================ */
export function coverOrnate() {
  const rd = rng(20260818);
  const W = PAGE.w, H = PAGE.h;
  const T = M[0].roster, B = M[1].roster, D = M[2].roster, F = M[3].roster, C = M[4].roster, U = M[5].roster;

  /* --- starfield / confetti in the room air --- */
  const air = Array.from({ length: 130 }, () => {
    const x = 24 + rd() * (W - 48), y = 24 + rd() * (H - 48);
    const r = .7 + rd() * 1.9;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${rd() > .6 ? N.gold3 : N.pink3}" opacity="${(.25 + rd() * .5).toFixed(2)}"/>`;
  }).join('');

  const glints = Array.from({ length: 26 }, () => {
    const x = 30 + rd() * (W - 60), y = 40 + rd() * (H - 90);
    return sparkleArt(x, y, .28 + rd() * .34, rd() > .5 ? N.gold3 : '#fff');
  }).join('');

  /* --- the back wall: a quilted diamond damask --- */
  const wall = Array.from({ length: 16 }, (_, r) => Array.from({ length: 13 }, (_, c) => {
    const x = c * 68 + (r % 2 ? 34 : 0), y = r * 68;
    return `<path d="M${x} ${y - 15} L${x + 15} ${y} L${x} ${y + 15} L${x - 15} ${y} Z" fill="${N.mid}" opacity=".30"/>
      <circle cx="${x}" cy="${y}" r="2.6" fill="${N.warm}" opacity=".4"/>`;
  }).join('')).join('');

  /* --- the arcade carpet, in perspective --- */
  const carpet = (() => {
    let o = `<path d="M0 852 H${W} V${H} H0 Z" fill="#3a1030"/>`;
    for (let r = 0; r < 7; r++) {
      const t0 = r / 7, t1 = (r + 1) / 7;
      const y0 = 852 + 204 * t0 * t0, y1 = 852 + 204 * t1 * t1;
      const s0 = .18 + t0 * 1.5, s1 = .18 + t1 * 1.5;
      for (let i = -9; i < 10; i++) {
        if ((i + r) % 2) continue;
        const x0 = W / 2 + i * 62 * s0, x1 = W / 2 + (i + 1) * 62 * s0;
        const x2 = W / 2 + (i + 1) * 62 * s1, x3 = W / 2 + i * 62 * s1;
        o += `<polygon points="${x0.toFixed(0)},${y0.toFixed(0)} ${x1.toFixed(0)},${y0.toFixed(0)} ${x2.toFixed(0)},${y1.toFixed(0)} ${x3.toFixed(0)},${y1.toFixed(0)}" fill="${N.warm}" opacity="${(.20 + t0 * .30).toFixed(2)}"/>`;
      }
    }
    for (let r = 1; r < 7; r++) {
      const t = r / 7, y = 852 + 204 * t * t, s = .18 + t * 1.5;
      for (let i = -6; i < 7; i++) {
        const x = W / 2 + (i + .5) * 62 * s;
        o += `<path transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${(s * .34).toFixed(2)})" d="M0 12 C-14 2 -12 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C12 -10 14 2 0 12 Z" fill="${N.pink}" opacity=".3"/>`;
      }
    }
    return o;
  })();

  /* --- plushies loose in the arcade --- */
  const strays = [
    [T[0], 176, 962, .32, -9], [B[0], 228, 970, .30, 7], [D[0], 280, 960, .31, -5],
    [C[0], 536, 970, .30, 8], [U[1], 588, 960, .32, 6], [B[4], 640, 968, .31, -8]
  ].map(([v, x, y, s, r]) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})">${stuffyArt(v)}</g>`).join('');

  /* tokens and prize tickets on the carpet */
  const litter = Array.from({ length: 26 }, () => {
    const x = 74 + rd() * 668, y = 898 + rd() * 82, a = rd() * 360;
    return rd() > .45
      ? `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) rotate(${a.toFixed(0)})"><ellipse rx="7" ry="6" fill="${N.gold2}"/><ellipse rx="7" ry="6" fill="none" stroke="${N.gold}" stroke-width="1.4"/><text y="2.6" text-anchor="middle" font-size="7" font-weight="800" fill="${N.deep}">C</text></g>`
      : `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) rotate(${a.toFixed(0)})"><rect x="-11" y="-5" width="22" height="10" rx="2" fill="${N.pink3}"/><path d="M-11 -5 v10 M11 -5 v10" stroke="${N.pink}" stroke-width="1.4"/><circle r="1.8" fill="${N.pink}"/></g>`;
  }).join('');

  /* --- plushies perched on top of the cabinets --- */
  const perched = [
    [T[7], 118, 244, .40, -7], [B[7], 118, 468, .38, 6], [D[7], 118, 692, .40, -5],
    [F[7], 700, 244, .38, 8], [C[4], 700, 468, .38, -6], [U[7], 700, 692, .42, 5]
  ].map(([v, x, y, s, r]) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})">${stuffyArt(v)}</g>`).join('');

  /* --- balloons drifting --- */
  const bal = balloon(150, 168, .78, N.pink2, '#e0559a') + balloon(196, 128, .58, N.gold, N.gold2) +
              balloon(666, 168, .74, '#7fe0c4', '#3fbfa0') + balloon(622, 126, .56, '#c9a4ff', '#9a6ded') +
              `<g transform="translate(150,206) scale(.30)">${stuffyArt(B[0])}</g>` +
              `<g transform="translate(666,206) scale(.30)">${stuffyArt(F[3])}</g>`;

  /* --- the marquee frame --- */
  const framePts = roundRectPoints(30, 30, W - 60, H - 60, 30, 25.6);
  const frame = `
    <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="30" fill="none" stroke="${N.gold}" stroke-width="3"/>
    <rect x="20" y="20" width="${W - 40}" height="${H - 40}" rx="26" fill="none" stroke="${N.gold2}" stroke-width="1.6"/>
    <rect x="30" y="30" width="${W - 60}" height="${H - 60}" rx="24" fill="none" stroke="${N.deep}" stroke-width="26" opacity=".55"/>
    ${bulbs(framePts, 4.4, 7)}
    <rect x="46" y="46" width="${W - 92}" height="${H - 92}" rx="18" fill="none" stroke="${N.gold}" stroke-width="2.4"/>
    <rect x="52" y="52" width="${W - 104}" height="${H - 104}" rx="15" fill="none" stroke="${N.gold2}" stroke-width="1.2" opacity=".8"/>`;

  const corners = rosette(56, 56, .86, -14, N.pink, '#c9377f') + rosette(W - 56, 56, .86, 14, N.gold, N.gold2) +
                  rosette(56, H - 56, .86, 14, '#7fe0c4', '#3fbfa0') + rosette(W - 56, H - 56, .86, -14, '#c9a4ff', '#9a6ded');

  /* --- top crest: a little marquee with the key --- */
  const crest = `<g transform="translate(${W / 2},46)">
    <path d="M-96 16 q0 -34 96 -34 q96 0 96 34 z" fill="${N.deep}" stroke="${N.gold}" stroke-width="2.6"/>
    <path d="M-78 10 q0 -22 78 -22 q78 0 78 22 z" fill="${N.mid}" opacity=".7"/>
    ${bulbs([[-66, 2], [-40, -6], [-14, -11], [14, -11], [40, -6], [66, 2]], 3.4, 21)}
    <g transform="translate(0,-2) scale(.62)">${keyArt(0, -6, 1)}</g>
    ${jewel(-84, 12, 5, N.pink2, '#c9377f')}${jewel(84, 12, 5, N.pink2, '#c9377f')}
  </g>`;

  /* --- bottom crest: crossed claws over a heart --- */
  const prong = sign => `<g transform="scale(${sign},1)">
    <path d="M16 -20 C40 -18 54 -4 50 16 C48 26 40 30 34 26" fill="none" stroke="${N.gold}" stroke-width="6" stroke-linecap="round"/>
    <path d="M16 -20 C38 -18 50 -6 47 12" fill="none" stroke="${N.gold3}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    <circle cx="34" cy="26" r="5" fill="${N.gold3}"/>
    <circle cx="16" cy="-20" r="4" fill="${N.gold2}"/></g>`;
  const bottomCrest = `<g transform="translate(${W / 2},${H - 52})">
    <path d="M-104 0 H-64 M64 0 H104" stroke="${N.gold2}" stroke-width="2"/>
    ${prong(1)}${prong(-1)}
    <path transform="translate(0,0) scale(1.6)" d="M0 12 C-14 2 -12 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C12 -10 14 2 0 12 Z" fill="${N.pink}" stroke="${N.gold}" stroke-width="1.4"/>
    <path transform="translate(-4,-6) scale(.5)" d="M0 12 C-14 2 -12 -10 -4 -10 C-1 -10 0 -7 0 -6 C0 -7 1 -10 4 -10 C12 -10 14 2 0 12 Z" fill="#fff" opacity=".45"/>
    ${jewel(-86, 0, 6, '#7fd8ff', '#3aabe8')}${jewel(86, 0, 6, '#7fd8ff', '#3aabe8')}
  </g>`;

  /* --- the neon arch behind the claw --- */
  const arch = `<g transform="translate(${W / 2},214)">
    <path d="M-192 44 q0 -132 192 -132 q192 0 192 132" fill="none" stroke="${N.pink}" stroke-width="13" opacity=".22"/>
    <path d="M-192 44 q0 -132 192 -132 q192 0 192 132" fill="none" stroke="${N.pink2}" stroke-width="6"/>
    <path d="M-192 44 q0 -132 192 -132 q192 0 192 132" fill="none" stroke="#fff" stroke-width="2" opacity=".65"/>
    <path d="M-166 44 q0 -108 166 -108 q166 0 166 108" fill="none" stroke="${N.gold}" stroke-width="2.4" opacity=".75" stroke-dasharray="5 9"/>
    <text x="-122" y="-22" text-anchor="middle" font-size="16" font-weight="800" fill="${N.gold3}" letter-spacing="3.2" transform="rotate(-17 -122 -22)">THE CUTIE</text>
    <text x="122" y="-22" text-anchor="middle" font-size="16" font-weight="800" fill="${N.gold3}" letter-spacing="3.2" transform="rotate(17 122 -22)">ARCADE</text>
  </g>`;

  /* --- the big claw, carrying the golden key --- */
  const bigClaw = `<g>
    <path d="M${W / 2} 92 V196" stroke="#9fadc7" stroke-width="5" stroke-linecap="round"/>
    <rect x="${W / 2 - 30}" y="78" width="60" height="26" rx="9" fill="#dbe3f2" stroke="#9fadc7" stroke-width="3"/>
    <circle cx="${W / 2 - 14}" cy="91" r="4.6" fill="${N.pink}"/><circle cx="${W / 2 + 14}" cy="91" r="4.6" fill="#7fd8ff"/>
    <ellipse cx="${W / 2}" cy="214" rx="86" ry="72" fill="${N.gold}" opacity=".13"/>
    <g transform="translate(${W / 2},200) scale(1.42)">${clawSVG(.34, 1, { face: 'proud' })}</g>
    <g transform="translate(${W / 2},262) scale(1.5)">${keyArt(0, 0, 1)}</g>
    ${sparkleArt(W / 2 - 52, 232, .6, N.gold3)}${sparkleArt(W / 2 + 54, 244, .48, N.gold3)}
    ${sparkleArt(W / 2 - 34, 292, .4, '#fff')}${sparkleArt(W / 2 + 40, 296, .34, '#fff')}
  </g>`;

  /* ============ THE CARTOUCHE ============ */
  const cx = W / 2, cy0 = 322, cw = 396, ch = 592;
  const cl = cx - cw / 2, cb = cy0 + ch;
  const div = (y, w) => `<g><path d="M${cx - w} ${y} H${cx - 16}" stroke="${N.gold2}" stroke-width="1.6"/>
    <path d="M${cx + 16} ${y} H${cx + w}" stroke="${N.gold2}" stroke-width="1.6"/>
    <path d="M${cx} ${y - 6} l6 6 l-6 6 l-6 -6 z" fill="${N.gold}"/></g>`;

  const cartouche = `
    <ellipse cx="${cx}" cy="${cy0 + ch / 2}" rx="${cw * .78}" ry="${ch * .62}" fill="${N.pink}" opacity=".13"/>
    ${scallop(cl - 13, cy0 - 13, cw + 26, ch + 26, 11, N.gold, N.gold2, 2)}
    <rect x="${cl}" y="${cy0}" width="${cw}" height="${ch}" rx="30" fill="${N.deep}"/>
    <rect x="${cl}" y="${cy0}" width="${cw}" height="${ch}" rx="30" fill="none" stroke="${N.gold}" stroke-width="3.4"/>
    <rect x="${cl + 9}" y="${cy0 + 9}" width="${cw - 18}" height="${ch - 18}" rx="24" fill="none" stroke="${N.gold2}" stroke-width="1.4"/>
    <rect x="${cl + 16}" y="${cy0 + 16}" width="${cw - 32}" height="${ch - 32}" rx="20" fill="none" stroke="${N.pink}" stroke-width="1" opacity=".5" stroke-dasharray="4 6"/>
    ${[[cl, cy0], [cl + cw, cy0], [cl, cb], [cl + cw, cb]].map(p => jewel(p[0], p[1], 8, N.pink2, '#c9377f')).join('')}

    <text x="${cx}" y="${cy0 + 62}" text-anchor="middle" font-size="17" font-weight="800" fill="${N.gold}" letter-spacing="5.4">✦ THE CUTEST ARCADE EVER ✦</text>

    <text x="${cx}" y="${cy0 + 124}" text-anchor="middle" font-size="46" font-weight="800" fill="${N.gold3}">Claw Machine</text>
    <text x="${cx}" y="${cy0 + 178}" text-anchor="middle" font-size="52" font-weight="800" fill="${N.gold3}">Cuties</text>
    ${div(cy0 + 202, 132)}
    <text x="${cx}" y="${cy0 + 228}" text-anchor="middle" font-size="15.5" font-weight="700" fill="${N.pink3}" font-style="italic">six machines · forty-eight cuties · one golden key</text>

    ${ribbon(cx, cy0 + 248, 262, 46, 'DEVELOPMENT BINDER', 19)}

    <text x="${cx}" y="${cy0 + 326}" text-anchor="middle" font-size="11.5" font-weight="800" fill="${N.gold}" letter-spacing="3.4">THE MASTER CUTENESS ARCHIVE</text>

    <g transform="translate(${cx},${cy0 + 384})">
      <circle r="40" fill="${N.mid}" stroke="${N.gold}" stroke-width="2.4"/>
      <circle r="40" fill="none" stroke="${N.gold2}" stroke-width="1" stroke-dasharray="3 5"/>
      ${Array.from({ length: 12 }, (_, i) => `<ellipse cx="0" cy="-46" rx="3.4" ry="7" fill="${N.gold}" opacity=".5" transform="rotate(${i * 30})"/>`).join('')}
      <g transform="translate(0,4) scale(1.05)">${keyArt(0, -4, 1)}</g>
    </g>

    <text x="${cx}" y="${cy0 + 452}" text-anchor="middle" font-size="12" font-weight="800" fill="${N.pink3}" letter-spacing="3.2">GAME · CUTIES · IDEAS · CODE</text>
    ${div(cy0 + 474, 120)}

    <text x="${cx}" y="${cy0 + 504}" text-anchor="middle" font-size="11.5" font-weight="800" fill="${N.gold}" letter-spacing="3.6">ORIGINAL CREATION BY</text>
    <text x="${cx}" y="${cy0 + 556}" text-anchor="middle" font-size="54" font-weight="800" fill="${N.gold3}" letter-spacing="4">ELLA</text>
    <text x="${cx}" y="${cy0 + 578}" text-anchor="middle" font-size="10.5" font-weight="800" fill="${N.pink3}" letter-spacing="2.6">CREATOR · OWNER · GAME BOSS</text>`;

  const foot = `<g>
    <rect x="${cx - 138}" y="${cb + 8}" width="276" height="30" rx="15" fill="${N.deep}" opacity=".92"/>
    <rect x="${cx - 138}" y="${cb + 8}" width="276" height="30" rx="15" fill="none" stroke="${N.gold2}" stroke-width="1.4"/>
    <text x="${cx}" y="${cb + 28}" text-anchor="middle" font-size="13" font-weight="700" fill="${N.gold3}" font-style="italic">Cuteness lives in every detail.</text></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FONT}">
<defs>
  <radialGradient id="night" cx="50%" cy="30%" r="86%">
    <stop offset="0" stop-color="${N.warm}"/><stop offset=".38" stop-color="${N.mid}"/>
    <stop offset=".72" stop-color="${N.deep}"/><stop offset="1" stop-color="${N.void}"/></radialGradient>
  <radialGradient id="haze" cx="50%" cy="42%" r="52%">
    <stop offset="0" stop-color="#ffd9a8" stop-opacity=".26"/><stop offset="1" stop-color="#ffd9a8" stop-opacity="0"/></radialGradient>
  <radialGradient id="vig" cx="50%" cy="48%" r="72%">
    <stop offset=".55" stop-color="${N.void}" stop-opacity="0"/><stop offset="1" stop-color="${N.void}" stop-opacity=".62"/></radialGradient>
</defs>

<rect width="${W}" height="${H}" fill="${N.void}"/>
<rect width="${W}" height="${H}" fill="url(#night)"/>
<g opacity=".85">${wall}</g>
${carpet}
<rect width="${W}" height="${H}" fill="url(#haze)"/>
${air}
<rect width="${W}" height="${H}" fill="url(#vig)"/>

${arch}
${bunting(64, 150, 360, 116, 7, 34)}
${bunting(456, 116, 752, 150, 7, 34)}
${bal}

${cabinet(M[0], 56, 250, .96, 101)}
${cabinet(M[1], 56, 474, .96, 202)}
${cabinet(M[2], 56, 698, .96, 303)}
${cabinet(M[3], 644, 250, .96, 404, false)}
${cabinet(M[4], 644, 474, .96, 505, false)}
${cabinet(M[5], 644, 698, .96, 606, false)}
${perched}

${gumball(118, 966, .62, 31)}
${gumball(698, 966, .62, 32)}

${litter}
${strays}
${glints}

${cartouche}
${bigClaw}
${foot}

${frame}
${corners}
${crest}
${bottomCrest}
</svg>`;
}
