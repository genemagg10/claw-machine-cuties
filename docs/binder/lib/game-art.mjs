/* ============================================================
   game-art.mjs — extracted VERBATIM from index.html (build 1c0c853)
   so every concept plate in the binder is drawn with the real
   plushie art, not a redrawing of it. Do not edit by hand:
   re-extract from index.html if the game art changes.
   ============================================================ */
const INK = '#553244';

function eye(x, y, r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.12}" fill="${INK}"/>` +
         `<circle cx="${x - r * .32}" cy="${y - r * .44}" r="${r * .42}" fill="#fff"/>` +
         `<circle cx="${x + r * .3}" cy="${y + r * .36}" r="${r * .19}" fill="#fff" opacity=".85"/>`;
}
function blush(x, y, r, c) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .64}" fill="${c || '#ff87b8'}" opacity=".48"/>`;
}
function smile(x, y, w, c) {
  return `<path d="M${x - w} ${y} q${w} ${w * .9} ${w * 2} 0" stroke="${c || INK}" stroke-width="2.3" fill="none" stroke-linecap="round"/>`;
}
function bowArt(x, y, s, c, cd, rot) {
  return `<g transform="translate(${x},${y}) rotate(${rot == null ? -12 : rot}) scale(${s})">
    <path d="M0 0 L-16 -10 Q-21 0 -16 10 Z" fill="${c}"/>
    <path d="M0 0 L16 -10 Q21 0 16 10 Z" fill="${c}"/>
    <path d="M0 0 L-16 -10 Q-12 -3 -7 0 Z" fill="${cd}" opacity=".5"/>
    <path d="M0 0 L16 -10 Q12 -3 7 0 Z" fill="${cd}" opacity=".5"/>
    <circle r="5.2" fill="${cd}"/><circle cx="-1.4" cy="-1.6" r="1.6" fill="#fff" opacity=".65"/>
  </g>`;
}
function sparkleArt(x, y, s, c) {
  return `<path transform="translate(${x},${y}) scale(${s})" d="M0 -10 Q1.6 -1.6 10 0 Q1.6 1.6 0 10 Q-1.6 1.6 -10 0 Q-1.6 -1.6 0 -10 Z" fill="${c || '#fff'}"/>`;
}
/* the golden key that rides on the last plushie of every machine */
function keyArt(x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-2 -22 q-14 6 -6 16" stroke="#ff5c9d" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M2 -22 q14 6 6 16" stroke="#ff5c9d" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cy="-2" r="9" fill="#ffd447" stroke="#e8a417" stroke-width="2.4"/>
    <circle cy="-2" r="3.4" fill="#fff5cc"/>
    <path d="M-2.6 5 h5.2 v18 h-5.2 z" fill="#ffd447" stroke="#e8a417" stroke-width="2"/>
    <path d="M2.6 13 h7 v4 h-7 z M2.6 20 h5 v4 h-5 z" fill="#ffd447" stroke="#e8a417" stroke-width="1.6"/>
    ${sparkleArt(11, -10, .5, '#fffbe6')}
  </g>`;
}

/* ---------------- TEDDY BEAR ---------------- */
function artTeddy(c) {
  return `<g>
    <ellipse cx="-27" cy="16" rx="11" ry="9" fill="${c.dark}" transform="rotate(-24 -27 16)"/>
    <ellipse cx="27" cy="16" rx="11" ry="9" fill="${c.dark}" transform="rotate(24 27 16)"/>
    <ellipse cx="-16" cy="36" rx="13" ry="11" fill="${c.dark}"/>
    <ellipse cx="16" cy="36" rx="13" ry="11" fill="${c.dark}"/>
    <ellipse cx="-16" cy="37" rx="7" ry="5.5" fill="${c.pad}"/>
    <ellipse cx="16" cy="37" rx="7" ry="5.5" fill="${c.pad}"/>
    <ellipse cx="0" cy="22" rx="25" ry="21" fill="${c.fur}"/>
    <ellipse cx="0" cy="25" rx="14" ry="12" fill="${c.pad}" opacity=".75"/>
    <circle cx="-25" cy="-27" r="13" fill="${c.fur}"/><circle cx="-25" cy="-27" r="6.6" fill="${c.pad}"/>
    <circle cx="25" cy="-27" r="13" fill="${c.fur}"/><circle cx="25" cy="-27" r="6.6" fill="${c.pad}"/>
    <circle cx="0" cy="-8" r="28" fill="${c.fur}"/>
    <ellipse cx="0" cy="4" rx="15" ry="11.5" fill="${c.pad}"/>
    <ellipse cx="0" cy="-1" rx="5.4" ry="4.2" fill="${INK}"/>
    <path d="M0 3 v3.5 M0 6.5 q-5 4.5 -8.5 .5 M0 6.5 q5 4.5 8.5 .5" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    ${eye(-11.5, -11, 5)}${eye(11.5, -11, 5)}
    ${blush(-20, -1, 7)}${blush(20, -1, 7)}
    ${bowArt(20, -30, .72, c.bow, c.bowD, -16)}
  </g>`;
}

/* ---------------- BUNNY ---------------- */
function artBunny(c) {
  return `<g>
    <g transform="rotate(-13 -11 -18)"><ellipse cx="-11" cy="-40" rx="9" ry="25" fill="${c.fur}"/><ellipse cx="-11" cy="-41" rx="4.6" ry="17" fill="${c.inner}"/></g>
    <g transform="rotate(13 11 -18)"><ellipse cx="11" cy="-40" rx="9" ry="25" fill="${c.fur}"/><ellipse cx="11" cy="-41" rx="4.6" ry="17" fill="${c.inner}"/></g>
    <circle cx="28" cy="26" r="10" fill="${c.tail || '#fff'}"/>
    <ellipse cx="-25" cy="18" rx="10" ry="8" fill="${c.dark}" transform="rotate(-20 -25 18)"/>
    <ellipse cx="25" cy="18" rx="10" ry="8" fill="${c.dark}" transform="rotate(20 25 18)"/>
    <ellipse cx="-15" cy="36" rx="13" ry="10" fill="${c.dark}"/>
    <ellipse cx="15" cy="36" rx="13" ry="10" fill="${c.dark}"/>
    <ellipse cx="-15" cy="37" rx="6.5" ry="4.8" fill="${c.inner}"/>
    <ellipse cx="15" cy="37" rx="6.5" ry="4.8" fill="${c.inner}"/>
    <ellipse cx="0" cy="22" rx="23" ry="20" fill="${c.fur}"/>
    <ellipse cx="0" cy="25" rx="13" ry="11" fill="${c.inner}" opacity=".5"/>
    <circle cx="0" cy="-6" r="26" fill="${c.fur}"/>
    <ellipse cx="-7" cy="4" rx="9" ry="7" fill="${c.pad || '#fff'}" opacity=".65"/>
    <ellipse cx="7" cy="4" rx="9" ry="7" fill="${c.pad || '#fff'}" opacity=".65"/>
    <path d="M0 -2 l4.6 3.6 h-9.2 z" fill="#ff7aa8" stroke="#ff7aa8" stroke-width="2" stroke-linejoin="round"/>
    <path d="M0 2 v3.5 M0 5.5 q-4.5 4 -7.5 .5 M0 5.5 q4.5 4 7.5 .5" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <rect x="-4.6" y="9" width="9.2" height="6.5" rx="2.4" fill="#fff" stroke="${INK}" stroke-width="1.2"/>
    <path d="M0 9 v6.5" stroke="${INK}" stroke-width="1.1"/>
    ${eye(-12, -9, 5.4)}${eye(12, -9, 5.4)}
    ${blush(-20, 1, 6.5)}${blush(20, 1, 6.5)}
    ${bowArt(-21, -25, .62, c.bow, c.bowD, 18)}
  </g>`;
}

/* ---------------- DINO ---------------- */
function artDino(c) {
  return `<g>
    <path d="M20 20 q30 6 34 -18 q10 30 -26 34 z" fill="${c.dark}"/>
    <path d="M50 4 l7 -9 l3 11 z" fill="${c.spike}"/>
    <ellipse cx="-16" cy="35" rx="14" ry="11" fill="${c.dark}"/>
    <ellipse cx="16" cy="35" rx="14" ry="11" fill="${c.dark}"/>
    <path d="M-24 40 h16 M-22 34 h12" stroke="${c.belly}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <path d="M8 40 h16 M10 34 h12" stroke="${c.belly}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <path d="M-18 -34 l6 -12 l7 11 z M0 -40 l6 -13 l7 12 z M16 -32 l8 -10 l5 12 z" fill="${c.spike}"/>
    <ellipse cx="0" cy="14" rx="27" ry="23" fill="${c.body}"/>
    <ellipse cx="0" cy="20" rx="17" ry="15" fill="${c.belly}"/>
    <path d="M-14 12 h28 M-15 21 h30 M-13 29 h26" stroke="${c.body}" stroke-width="1.6" opacity=".28" stroke-linecap="round"/>
    <ellipse cx="-26" cy="8" rx="9" ry="7" fill="${c.dark}" transform="rotate(-28 -26 8)"/>
    <ellipse cx="26" cy="8" rx="9" ry="7" fill="${c.dark}" transform="rotate(28 26 8)"/>
    <circle cx="0" cy="-12" r="26" fill="${c.body}"/>
    <ellipse cx="0" cy="-2" rx="19" ry="14" fill="${c.body}"/>
    <ellipse cx="-5.5" cy="-4" rx="1.8" ry="2.4" fill="${INK}" opacity=".65"/>
    <ellipse cx="5.5" cy="-4" rx="1.8" ry="2.4" fill="${INK}" opacity=".65"/>
    <path d="M-11 5 q11 10 22 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M-4 8.4 l0 4.4 l4 -3.4 z" fill="#fff"/>
    ${eye(-11, -16, 5.6)}${eye(11, -16, 5.6)}
    ${blush(-19, -6, 6.5)}${blush(19, -6, 6.5)}
  </g>`;
}

/* ---------------- BUTTERFLY ---------------- */
function artFly(c) {
  const wing = `
    <path d="M-3 -8 C-26 -46 -60 -36 -52 -9 C-47 6 -19 7 -3 -8 Z" fill="${c.w}"/>
    <path d="M-6 -10 C-24 -36 -48 -30 -43 -11 C-39 0 -19 1 -6 -10 Z" fill="${c.w2}" opacity=".9"/>
    <path d="M-4 4 C-25 6 -44 18 -37 33 C-31 45 -9 31 -4 12 Z" fill="${c.w}"/>
    <path d="M-6 6 C-22 9 -35 18 -30 28 C-26 35 -10 26 -6 12 Z" fill="${c.w2}" opacity=".9"/>
    <circle cx="-33" cy="-19" r="6" fill="${c.dot}" opacity=".95"/>
    <circle cx="-45" cy="-8" r="3.4" fill="${c.dot}" opacity=".8"/>
    <circle cx="-22" cy="22" r="4.6" fill="${c.dot}" opacity=".9"/>
    <circle cx="-31" cy="12" r="2.6" fill="${c.dot}" opacity=".7"/>`;
  return `<g>
    <g>${wing}</g><g transform="scale(-1,1)">${wing}</g>
    <path d="M-4 -30 q-9 -10 -16 -14" stroke="${c.body}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M4 -30 q9 -10 16 -14" stroke="${c.body}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="-21" cy="-45" r="4.4" fill="${c.dot}"/><circle cx="21" cy="-45" r="4.4" fill="${c.dot}"/>
    <ellipse cx="0" cy="10" rx="8" ry="22" fill="${c.body}"/>
    <path d="M-7 2 h14 M-7.6 11 h15.2 M-6 20 h12" stroke="#fff" stroke-width="1.8" opacity=".38" stroke-linecap="round"/>
    <circle cx="0" cy="-20" r="12.5" fill="${c.body}"/>
    ${eye(-4.8, -21, 3.8)}${eye(4.8, -21, 3.8)}
    ${smile(-3, -14, 3, '#fff')}
    ${blush(-9, -15.5, 4, '#ff9dc6')}${blush(9, -15.5, 4, '#ff9dc6')}
  </g>`;
}

/* ---------------- CANDY (8 different sweets) ---------------- */
function artCandy(c) {
  const face = (y, s) => `${eye(-7 * s, y, 4 * s)}${eye(7 * s, y, 4 * s)}${smile(0, y + 8 * s, 4 * s)}${blush(-14 * s, y + 5 * s, 5 * s)}${blush(14 * s, y + 5 * s, 5 * s)}`;
  switch (c.shape) {
    case 'lolli': return `<g>
      <rect x="-4" y="4" width="8" height="42" rx="4" fill="#fff3e0" stroke="#e8d5be" stroke-width="1.6"/>
      <circle cx="0" cy="-6" r="32" fill="${c.a}"/>
      <path d="M0 -6 q0 -10 10 -10 q17 0 17 17 q0 24 -24 24 q-31 0 -31 -31" stroke="${c.b}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="-6" r="32" fill="none" stroke="${c.b}" stroke-width="3" opacity=".5"/>
      ${face(-9, 1)}${bowArt(19, 22, .52, c.b, c.a, -30)}
      ${sparkleArt(-19, -24, .5, '#fff')}</g>`;
    case 'gum': return `<g>
      <path d="M-30 32 q-4 -50 30 -50 q34 0 30 50 z" fill="${c.a}"/>
      <path d="M-22 30 q-3 -38 22 -38 q10 0 15 10" fill="none" stroke="#fff" stroke-width="4" opacity=".35" stroke-linecap="round"/>
      <ellipse cx="0" cy="32" rx="30" ry="6" fill="${c.b}"/>
      ${[[-20, 12], [18, 4], [-6, 24], [12, 22], [24, 16], [-24, -2]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2" fill="#fff" opacity=".85"/>`).join('')}
      ${face(0, 1)}</g>`;
    case 'wrap': return `<g>
      <path d="M-30 -2 l-16 -16 q-4 16 0 32 z" fill="${c.b}"/>
      <path d="M30 -2 l16 -16 q4 16 0 32 z" fill="${c.b}"/>
      <path d="M-30 -14 l-8 -6 M-30 6 l-8 8 M30 -14 l8 -6 M30 6 l8 8" stroke="${c.a}" stroke-width="2" opacity=".55" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="31" fill="${c.a}"/>
      <path d="M-22 -16 q22 -8 40 8" stroke="#fff" stroke-width="6" opacity=".35" fill="none" stroke-linecap="round"/>
      <path d="M-14 20 q14 8 28 -6" stroke="${c.b}" stroke-width="4" opacity=".45" fill="none" stroke-linecap="round"/>
      ${face(-4, 1)}</g>`;
    case 'corn': return `<g>
      <path d="M0 -44 q10 22 26 68 q-26 8 -52 0 q16 -46 26 -68 z" fill="#ffe98a"/>
      <path d="M0 -44 q8 18 20 52 q-20 6 -40 0 q12 -34 20 -52 z" fill="#ffab5c"/>
      <path d="M0 -44 q5 10 11 26 q-11 4 -22 0 q6 -16 11 -26 z" fill="#fffdf5"/>
      ${face(2, 1)}${sparkleArt(-20, 14, .45, '#fff')}</g>`;
    case 'macaron': return `<g>
      <path d="M-31 -4 q0 -24 31 -24 q31 0 31 24 q-31 8 -62 0 z" fill="${c.a}"/>
      <path d="M-30 10 q0 22 30 22 q30 0 30 -22 q-30 -8 -60 0 z" fill="${c.a}"/>
      <path d="M-30 -2 q30 10 60 0 q0 14 -30 14 q-30 0 -30 -14 z" fill="${c.b}"/>
      <path d="M-26 -12 q10 -8 22 -7" stroke="#fff" stroke-width="4" opacity=".4" fill="none" stroke-linecap="round"/>
      ${face(-14, .9)}</g>`;
    case 'donut': return `<g>
      <path fill="${c.a}" fill-rule="evenodd" d="M0 -32 a32 32 0 1 0 .1 0 z M0 -12 a12 12 0 1 1 -.1 0 z"/>
      <path fill="${c.b}" d="M-31 -6 q-2 -26 31 -26 q33 0 31 26 q-6 6 -14 2 q-4 -12 -17 -12 q-13 0 -17 12 q-8 4 -14 -2 z"/>
      ${[['#ff6f9c', -20, -18, 20], ['#7fd8ff', -2, -26, -14], ['#ffe066', 16, -20, 40], ['#a4f0a0', 24, -6, 8], ['#c9a4ff', -26, -4, -30]].map(s => `<rect x="${s[1]}" y="${s[2]}" width="8" height="3.4" rx="1.7" fill="${s[0]}" transform="rotate(${s[3]} ${s[1] + 4} ${s[2] + 1.7})"/>`).join('')}
      ${eye(-11, 6, 4)}${eye(11, 6, 4)}${blush(-19, 12, 5)}${blush(19, 12, 5)}
      <path d="M-5 22 q5 5 10 0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>`;
    case 'cupcake': return `<g>
      <path d="M-26 4 h52 l-7 34 q-19 5 -38 0 z" fill="${c.b}"/>
      <path d="M-19 6 l-3 32 M-7 6 l-1 34 M7 6 l1 34 M19 6 l3 32" stroke="#fff" stroke-width="3" opacity=".45"/>
      <path d="M-28 6 q2 -20 14 -22 q4 -14 16 -13 q13 -1 16 13 q13 3 13 22 z" fill="${c.a}"/>
      <path d="M-16 -12 q8 -8 18 -6" stroke="#fff" stroke-width="4" opacity=".45" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="-30" r="7.5" fill="#ff5d7e"/><path d="M2 -36 q4 -8 9 -9" stroke="#7bbf5a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      ${face(14, .9)}</g>`;
    default: return `<g>
      <rect x="-30" y="-26" width="60" height="56" rx="18" fill="${c.a}"/>
      <rect x="-30" y="-26" width="60" height="22" rx="16" fill="#fff" opacity=".55"/>
      <rect x="-24" y="18" width="48" height="10" rx="5" fill="${c.b}" opacity=".55"/>
      ${face(-2, 1)}${sparkleArt(20, -18, .5, '#fff')}</g>`;
  }
}

/* ---------------- UNICORN ---------------- */
function artUni(c) {
  const m = c.mane;
  return `<g>
    <path d="M24 22 q28 0 34 -26 q14 32 -22 44 z" fill="${m[0]}"/>
    <path d="M28 26 q22 -2 28 -22 q8 26 -20 34 z" fill="${m[1]}"/>
    <path d="M32 30 q16 -2 22 -16 q4 18 -16 25 z" fill="${m[2]}"/>
    <ellipse cx="-15" cy="35" rx="12" ry="10" fill="${c.dark}"/>
    <ellipse cx="15" cy="35" rx="12" ry="10" fill="${c.dark}"/>
    <ellipse cx="-15" cy="39" rx="12" ry="6" fill="${c.hoof}"/>
    <ellipse cx="15" cy="39" rx="12" ry="6" fill="${c.hoof}"/>
    <ellipse cx="0" cy="21" rx="24" ry="20" fill="${c.body}"/>
    <path d="M-30 -22 q-16 6 -14 24 q-12 -2 -10 -18 q-10 -6 -2 -18 q-6 -14 8 -18 q6 -12 20 -8 z" fill="${m[0]}"/>
    <path d="M-27 -20 q-12 6 -11 20 q-8 -4 -6 -16 q-8 -6 -1 -15 q-4 -11 7 -14 z" fill="${m[1]}"/>
    <path d="M-24 -18 q-8 6 -8 16 q-6 -6 -3 -14 q-4 -8 3 -12 z" fill="${m[2]}"/>
    <path d="M-24 -28 l-4 -13 l10 6 z" fill="${c.body}"/>
    <path d="M24 -28 l4 -13 l-10 6 z" fill="${c.body}"/>
    <circle cx="0" cy="-8" r="27" fill="${c.body}"/>
    <path d="M-2 -34 l4 -26 l6 26 z" fill="${c.horn}"/>
    <path d="M-0.5 -40 l6.2 -1.6 M0.7 -47 l4.4 -1.2 M1.9 -53 l2.8 -1" stroke="#fff" stroke-width="1.8" opacity=".75" stroke-linecap="round"/>
    <path d="M-18 -26 q14 -10 32 -2 q-14 12 -32 2 z" fill="${m[0]}"/>
    <path d="M-12 -25 q12 -7 24 -2 q-12 8 -24 2 z" fill="${m[2]}" opacity=".9"/>
    <ellipse cx="0" cy="4" rx="14" ry="10" fill="${c.snout}"/>
    <ellipse cx="-5" cy="2" rx="1.7" ry="2.4" fill="${INK}" opacity=".55"/>
    <ellipse cx="5" cy="2" rx="1.7" ry="2.4" fill="${INK}" opacity=".55"/>
    <path d="M-4.5 8 q4.5 4.5 9 0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M-17 -10 q5.5 -8 11 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M6 -10 q5.5 -8 11 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M-19 -16 l-5 -3 M19 -16 l5 -3" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    ${blush(-20, -1, 7, '#ff9ec9')}${blush(20, -1, 7, '#ff9ec9')}
    ${sparkleArt(-30, -34, .55, '#fff6bd')}${sparkleArt(30, -30, .4, '#fff6bd')}
  </g>`;
}

const ARTISTS = { teddy: artTeddy, bunny: artBunny, dino: artDino, fly: artFly, candy: artCandy, uni: artUni };
function stuffyArt(v) { return (ARTISTS[v.type] || artTeddy)(v.c); }
function stuffySVG(v, withKey, cls) {
  return `<svg viewBox="-60 -72 120 130" class="${cls || ''}" xmlns="http://www.w3.org/2000/svg">${stuffyArt(v)}${withKey ? keyArt(28, 26, .95) : ''}</svg>`;
}

/* ============================================================
   3. THE ARCADE — machines and their plushie rosters
   ============================================================ */
const T = (fur, dark, pad, bow, bowD) => ({ fur, dark, pad, bow, bowD });
const B = (fur, dark, inner, bow, bowD, tail) => ({ fur, dark, inner, bow, bowD, tail: tail || '#fff', pad: '#fff' });
const D = (body, dark, belly, spike) => ({ body, dark, belly, spike });
const F = (w, w2, dot, body) => ({ w, w2, dot, body });
const C = (shape, a, b) => ({ shape, a, b });
const U = (body, dark, snout, hoof, horn, mane) => ({ body, dark, snout, hoof, horn, mane });

const MACHINES = [
  {
    key: 'teddy', name: 'Teddy Bear Bonanza', emoji: '🧸', tag: 'the cosiest bears in town',
    grip: 0.62, count: 12, size: 34,
    skin: { body: '#ff87b8', dark: '#e4568f', trim: '#ffd9ec', glass: '#fff2f9', light: '#ffe4f2', marquee: '#ff4f92' },
    roster: [
      { id: 't0', name: 'Honeypaw', type: 'teddy', rare: 0, c: T('#f0c08a', '#e0a96c', '#ffe6c8', '#ff87b8', '#e4568f') },
      { id: 't1', name: 'Marshmellow', type: 'teddy', rare: 0, c: T('#fff1e2', '#f3ddc7', '#fffaf3', '#7fe0c4', '#3fbfa0') },
      { id: 't2', name: 'Cocoa Puff', type: 'teddy', rare: 0, c: T('#b98058', '#a06b46', '#e8c9ab', '#c9a4ff', '#9a6ded') },
      { id: 't3', name: 'Butterscotch', type: 'teddy', rare: 0, c: T('#ffcf8f', '#f0b96f', '#fff0d4', '#86c8ff', '#4d9ce8') },
      { id: 't4', name: 'Strawberry Cream', type: 'teddy', rare: 1, c: T('#ffd3d8', '#f5b9c1', '#fff0f2', '#ffe071', '#f0bf2c') },
      { id: 't5', name: 'Caramel Chip', type: 'teddy', rare: 0, c: T('#d8a06a', '#c08b56', '#f5dcc0', '#ff8a6b', '#e85c3c') },
      { id: 't6', name: 'Blueberry Bear', type: 'teddy', rare: 1, c: T('#b9c8f2', '#9fb0e0', '#e6ecff', '#ffb37a', '#f08c42') },
      { id: 't7', name: 'Sir Roosevelt', type: 'teddy', rare: 2, c: T('#efe4d2', '#dcd0ba', '#fffaf0', '#ff4d6d', '#c81f45') }
    ]
  },
  {
    key: 'bunny', name: 'Bunny Hop Hop', emoji: '🐰', tag: 'floppy ears, fluffy tails',
    grip: 0.51, count: 13, size: 33,
    skin: { body: '#7fe0c4', dark: '#3fbfa0', trim: '#d6fff2', glass: '#f0fffa', light: '#ddfff4', marquee: '#22b892' },
    roster: [
      { id: 'b0', name: 'Mochi', type: 'bunny', rare: 0, c: B('#fffdf8', '#f0ebe0', '#ffc9dd', '#ff87b8', '#e4568f') },
      { id: 'b1', name: 'Lavender', type: 'bunny', rare: 0, c: B('#d9c9f5', '#c4b0e8', '#f0e2ff', '#a4f0a0', '#5cc75c') },
      { id: 'b2', name: 'Peaches', type: 'bunny', rare: 0, c: B('#ffd0b0', '#f0b894', '#ffeadd', '#7fd8ff', '#3aabe8') },
      { id: 'b3', name: 'Clover', type: 'bunny', rare: 1, c: B('#c8ecc0', '#aad9a0', '#eafce6', '#ffe071', '#f0bf2c') },
      { id: 'b4', name: 'Snowdrop', type: 'bunny', rare: 0, c: B('#ffffff', '#e9e9f2', '#ffd9e8', '#86c8ff', '#4d9ce8') },
      { id: 'b5', name: 'Cinnamon', type: 'bunny', rare: 0, c: B('#d9a273', '#c08b5c', '#ffd7c2', '#ff8a6b', '#e85c3c', '#ffe8d6') },
      { id: 'b6', name: 'Bubblegum', type: 'bunny', rare: 1, c: B('#ffb3d9', '#f292c4', '#fff0f7', '#c9a4ff', '#9a6ded') },
      { id: 'b7', name: 'Moonpie', type: 'bunny', rare: 2, c: B('#cfd8ef', '#b4bfdc', '#eef3ff', '#ffe071', '#e8a417') }
    ]
  },
  {
    key: 'dino', name: 'Dino Stomp', emoji: '🦕', tag: 'tiny roars, big hearts',
    grip: 0.40, count: 14, size: 35,
    skin: { body: '#8fd85f', dark: '#5fae32', trim: '#ddffc4', glass: '#f4ffea', light: '#e8ffd4', marquee: '#4a9c22' },
    roster: [
      { id: 'd0', name: 'Sprout', type: 'dino', rare: 0, c: D('#8fd85f', '#6cbb3e', '#eaffd4', '#ffe071') },
      { id: 'd1', name: 'Blueberry Rex', type: 'dino', rare: 0, c: D('#7fb8f5', '#5c96d8', '#e2f1ff', '#ffb3d9') },
      { id: 'd2', name: 'Tangerine Tail', type: 'dino', rare: 0, c: D('#ffb069', '#ef934a', '#ffe8d0', '#7fe0c4') },
      { id: 'd3', name: 'Bubble Stego', type: 'dino', rare: 1, c: D('#ff9ec9', '#ef7bb0', '#ffe3f0', '#c9a4ff') },
      { id: 'd4', name: 'Mintosaur', type: 'dino', rare: 0, c: D('#87e8cf', '#5cc9ad', '#e2fff7', '#ffd166') },
      { id: 'd5', name: 'Grape Soda', type: 'dino', rare: 0, c: D('#b79cf0', '#9679df', '#efe6ff', '#a4f0a0') },
      { id: 'd6', name: 'Sunny Spike', type: 'dino', rare: 1, c: D('#ffdf6b', '#efc73f', '#fff8d6', '#ff8a6b') },
      { id: 'd7', name: 'Rainbow Rawr', type: 'dino', rare: 2, c: D('#ffc2e0', '#e896c0', '#fff0f8', '#7fd8ff') }
    ]
  },
  {
    key: 'fly', name: 'Butterfly Breeze', emoji: '🦋', tag: 'flutter flutter, sparkle sparkle',
    grip: 0.31, count: 14, size: 33,
    skin: { body: '#c9a4ff', dark: '#9a6ded', trim: '#eee2ff', glass: '#f9f4ff', light: '#efe4ff', marquee: '#8452e0' },
    roster: [
      { id: 'f0', name: 'Flutterpuff', type: 'fly', rare: 0, c: F('#ff8fbe', '#ffc2da', '#fff0a0', '#8a5c74') },
      { id: 'f1', name: 'Skywing', type: 'fly', rare: 0, c: F('#7fc8ff', '#c2e6ff', '#fff', '#4d6f8a') },
      { id: 'f2', name: 'Buttercup', type: 'fly', rare: 0, c: F('#ffdd6b', '#fff0b8', '#ff9ec9', '#a08040') },
      { id: 'f3', name: 'Lilac Wisp', type: 'fly', rare: 1, c: F('#bb9cf5', '#ded0ff', '#fff0a0', '#6b5490') },
      { id: 'f4', name: 'Minty Moth', type: 'fly', rare: 0, c: F('#87e8cf', '#ccfff0', '#ffb3d9', '#4d8a7a') },
      { id: 'f5', name: 'Sherbet', type: 'fly', rare: 0, c: F('#ffab6b', '#ffd6b3', '#fff0a0', '#9c6438') },
      { id: 'f6', name: 'Rosewing', type: 'fly', rare: 1, c: F('#ff6f9c', '#ffb0cb', '#fff', '#8a3f5c') },
      { id: 'f7', name: 'Aurora', type: 'fly', rare: 2, c: F('#a4e8ff', '#ffd0f0', '#fff0a0', '#6b5490') }
    ]
  },
  {
    key: 'candy', name: 'Sweet Tooth Sugar Rush', emoji: '🍬', tag: 'do not lick the glass',
    grip: 0.24, count: 15, size: 32,
    skin: { body: '#ff9a7a', dark: '#ef6a4a', trim: '#ffe4d4', glass: '#fff6f0', light: '#ffe8dc', marquee: '#f0492a' },
    roster: [
      { id: 'c0', name: 'Swirlypop', type: 'candy', rare: 0, c: C('lolli', '#ff8fbe', '#fff') },
      { id: 'c1', name: 'Gummy Drop', type: 'candy', rare: 0, c: C('gum', '#8fe86f', '#5cc73c') },
      { id: 'c2', name: 'Twinkle Taffy', type: 'candy', rare: 0, c: C('wrap', '#c9a4ff', '#8f5ce0') },
      { id: 'c3', name: 'Corny', type: 'candy', rare: 0, c: C('corn', '#ffab5c', '#ffe98a') },
      { id: 'c4', name: 'Macaroon', type: 'candy', rare: 1, c: C('macaron', '#ffc8d8', '#ff8fbe') },
      { id: 'c5', name: 'Sprinkle Ring', type: 'candy', rare: 0, c: C('donut', '#e8b07a', '#ff9ec9') },
      { id: 'c6', name: 'Cupcakey', type: 'candy', rare: 1, c: C('cupcake', '#fff0a0', '#ff9ec9') },
      { id: 'c7', name: 'Mallow King', type: 'candy', rare: 2, c: C('mallow', '#ffd6e8', '#ff8fbe') }
    ]
  },
  {
    key: 'uni', name: 'Unicorn Dream Machine', emoji: '🦄', tag: 'every cutie, all at once',
    grip: 0.19, count: 16, size: 34,
    skin: { body: '#ffc2e8', dark: '#e88fc9', trim: '#fff0fa', glass: '#fdf7ff', light: '#ffeaf8', marquee: '#ff6fbe' },
    rainbow: true,
    roster: [
      { id: 'u0', name: 'Starlight', type: 'uni', rare: 0, c: U('#fffdfa', '#f0e8e0', '#ffe4ef', '#ffd447', '#ffd447', ['#ff9ec9', '#c9a4ff', '#87d8ff']) },
      { id: 'u1', name: 'Bubblegum Dream', type: 'uni', rare: 0, c: U('#ffd0e8', '#f0b0d0', '#fff0f7', '#ffd447', '#fff0a0', ['#fff0a0', '#a4f0d0', '#87c8ff']) },
      { id: 'u2', name: 'Sir Bearington', type: 'teddy', rare: 1, c: T('#f5e0c0', '#e0c9a4', '#fff8ec', '#ffd447', '#e8a417') },
      { id: 'u3', name: 'Sky Bun', type: 'bunny', rare: 1, c: B('#cfe8ff', '#aecff0', '#eaf6ff', '#ffd447', '#e8a417') },
      { id: 'u4', name: 'Dino Deluxe', type: 'dino', rare: 1, c: D('#7fe0d0', '#5cc0b0', '#e6fffa', '#ffd447') },
      { id: 'u5', name: 'Prism Wings', type: 'fly', rare: 1, c: F('#ffb3e0', '#c2e6ff', '#ffe071', '#7a5c8a') },
      { id: 'u6', name: 'Sugar Crown', type: 'candy', rare: 1, c: C('lolli', '#ffd447', '#fff6d0') },
      { id: 'u7', name: 'Celestia', type: 'uni', rare: 2, c: U('#f2eaff', '#ded0f0', '#fff0fa', '#ffd447', '#ffd447', ['#ff8fbe', '#ffd447', '#87e8cf']) }
    ]
  }
];
const RARE_W = [1, .42, .15];
const RARE_LABEL = ['', '✨ rare', '👑 legendary'];
const WINS_NEEDED = 3;
const byId = {};
MACHINES.forEach((m, mi) => m.roster.forEach(v => { v.mi = mi; byId[v.id] = v; }));


export { INK, eye, blush, smile, bowArt, sparkleArt, keyArt, artTeddy, artBunny, artDino, artFly, artCandy, artUni, ARTISTS, stuffyArt, stuffySVG, T, B, D, F, C, U, MACHINES, RARE_W, RARE_LABEL, WINS_NEEDED, byId };
