/* ============================================================
   artdirection.mjs — PROPOSED creative-direction mockups.
   Full-screen visual targets for how Claw Machine Cuties could
   look. Everything is vector, so an approved frame is buildable.
   ============================================================ */
import { MACHINES, stuffyArt, keyArt, sparkleArt, bowArt, INK } from './lib/game-art.mjs';
import { refinedArt, rTeddy, rBunny, rUni, shade, groundShadow, gEye, gBlush, gBow, rim, fuzz, plushGrad } from './lib/refined.mjs';
import { clawSVG, rng, bearFull, MOODS, bubble } from './lib/parts.mjs';

export const SW = 1600, SH = 1000;
const M = MACHINES;

/* the mockup palette: a warm arcade at night */
export const S = {
  void: '#1d0a1a', deep: '#33122c', mid: '#54203f', warm: '#8a3560', hot: '#ff5c9d',
  glow: '#ffd9a8', gold: '#ffd447', gold2: '#e8a417', gold3: '#fff6bd',
  pink3: '#ffc2e0', cream: '#fff4fa', ink: '#3a1c30'
};

let ID = 0; const nid = () => 'a' + (++ID);

/* ---------- ornate UI panel, the game's chrome refined ---------- */
export function panel(x, y, w, h, o) {
  o = o || {};
  const g = nid();
  return `<defs>
    <linearGradient id="${g}p" x1="0" y1="0" x2=".3" y2="1">
      <stop offset="0" stop-color="${o.fill || '#3b1631'}" stop-opacity="${o.op == null ? .93 : o.op}"/>
      <stop offset="1" stop-color="${o.fill2 || '#240e20'}" stop-opacity="${o.op == null ? .96 : o.op}"/></linearGradient></defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 20}" fill="url(#${g}p)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 20}" fill="none" stroke="${o.edge || S.gold}" stroke-width="${o.sw || 2.6}"/>
  <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="${(o.r || 20) - 5}" fill="none" stroke="${S.gold2}" stroke-width="1" opacity=".55"/>
  ${[[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(c =>
    `<circle cx="${c[0]}" cy="${c[1]}" r="4.6" fill="${o.edge || S.gold}"/>`).join('')}`;
}

/* ---------- a volumetric light cone ---------- */
export function shaft(x, y, wTop, wBot, len, col, op) {
  const g = nid();
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${col || S.glow}" stop-opacity="${op || .3}"/>
    <stop offset=".55" stop-color="${col || S.glow}" stop-opacity="${(op || .3) * .45}"/>
    <stop offset="1" stop-color="${col || S.glow}" stop-opacity="0"/></linearGradient></defs>
  <path d="M${x - wTop / 2} ${y} L${x + wTop / 2} ${y} L${x + wBot / 2} ${y + len} L${x - wBot / 2} ${y + len} Z" fill="url(#${g})"/>`;
}

/* ---------- floating dust in the light ---------- */
export function motes(n, x0, y0, w, h, seed, col) {
  const r = rng(seed);
  return Array.from({ length: n }, () => {
    const x = x0 + r() * w, y = y0 + r() * h, rad = .8 + r() * 2.4;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="${col || S.gold3}" opacity="${(.12 + r() * .5).toFixed(2)}"/>`;
  }).join('');
}

/* ---------- perspective arcade floor with reflections ---------- */
export function floor(yHorizon, col, seed) {
  let o = `<path d="M0 ${yHorizon} H${SW} V${SH} H0 Z" fill="${col || '#2a0f24'}"/>`;
  const rows = 9;
  for (let i = 0; i < rows; i++) {
    const t0 = i / rows, t1 = (i + 1) / rows;
    const y0 = yHorizon + (SH - yHorizon) * t0 * t0, y1 = yHorizon + (SH - yHorizon) * t1 * t1;
    const s0 = .1 + t0 * 1.7, s1 = .1 + t1 * 1.7;
    for (let j = -12; j < 13; j++) {
      if ((j + i) % 2) continue;
      o += `<polygon points="${(SW / 2 + j * 96 * s0).toFixed(0)},${y0.toFixed(0)} ${(SW / 2 + (j + 1) * 96 * s0).toFixed(0)},${y0.toFixed(0)} ${(SW / 2 + (j + 1) * 96 * s1).toFixed(0)},${y1.toFixed(0)} ${(SW / 2 + j * 96 * s1).toFixed(0)},${y1.toFixed(0)}"
        fill="${S.warm}" opacity="${(.12 + t0 * .22).toFixed(2)}"/>`;
    }
  }
  return o;
}

/* ---------- title lockup ---------- */
export function titleLockup(cx, y, scale) {
  return `<g transform="translate(${cx},${y}) scale(${scale || 1})">
    <text x="0" y="0" text-anchor="middle" font-size="76" font-weight="800" fill="#c9377f" opacity=".55">Claw Machine</text>
    <text x="0" y="-5" text-anchor="middle" font-size="76" font-weight="800" fill="${S.gold3}">Claw Machine</text>
    <text x="0" y="66" text-anchor="middle" font-size="86" font-weight="800" fill="#c9377f" opacity=".55">Cuties</text>
    <text x="0" y="61" text-anchor="middle" font-size="86" font-weight="800" fill="${S.gold3}">Cuties</text>
    <path d="M-250 88 H-40 M40 88 H250" stroke="${S.gold2}" stroke-width="2"/>
    <path d="M0 80 l9 8 l-9 8 l-9 -8 z" fill="${S.gold}"/>
    <text x="0" y="116" text-anchor="middle" font-size="21" font-weight="700" fill="${S.pink3}" font-style="italic">six machines · forty-eight cuties · one golden key</text>
  </g>`;
}

/* ============================================================
   MOCKUP 2 — THE MACHINE, PLAYING   (the money shot)
   ============================================================ */
export function mockMachine() {
  const m = M[0], k = m.skin, r = rng(88);
  const CX = 800, GY = 652;                       /* pit floor line */

  /* the pile — refined art, with contact shadows and depth haze */
  const pileDef = [
    /* back row */
    { i: 5, x: -330, y: -108, s: .68, rot: 8, z: .62 }, { i: 2, x: -170, y: -114, s: .70, rot: -7, z: .64 },
    { i: 6, x: 178, y: -112, s: .69, rot: 6, z: .63 }, { i: 3, x: 336, y: -106, s: .67, rot: -9, z: .65 },
    /* middle row */
    { i: 1, x: -258, y: -60, s: .85, rot: -6, z: .36 }, { i: 7, x: -92, y: -64, s: .87, rot: 7, z: .34 },
    { i: 4, x: 104, y: -64, s: .86, rot: -5, z: .35 }, { i: 5, x: 268, y: -58, s: .84, rot: 9, z: .37 },
    /* front row — the hero sits dead centre and closest */
    { i: 2, x: -300, y: 0, s: .98, rot: -8, z: 0 }, { i: 3, x: -152, y: 4, s: 1.00, rot: 5, z: 0 },
    { i: 0, x: 6, y: 10, s: 1.10, rot: -2, z: 0, hero: true },
    { i: 6, x: 168, y: 4, s: 1.00, rot: -6, z: 0 }, { i: 1, x: 314, y: 0, s: .97, rot: 8, z: 0 }
  ];
  const pile = pileDef.map((b, n) => {
    const x = CX + b.x, y = GY + b.y;
    const mood = b.hero ? 'pickme' : (n % 4 === 1 ? 'happy' : 'happy');
    const look = b.hero ? null : [(CX - x) / 260, -1];
    const art = refinedArt(m.roster[b.i], { mood, look }) || stuffyArt(m.roster[b.i]);
    return `<g opacity="${(1 - b.z * .34).toFixed(2)}">
      ${groundShadow(x, y + 74 * b.s, 62 * b.s, 17 * b.s, 'sh' + n, .52 - b.z * .3)}
      <g transform="translate(${x},${y}) rotate(${b.rot}) scale(${(b.s * 1.78).toFixed(3)})">${art}</g>
    </g>`;
  });
  const pileBack = pile.filter((_, n) => pileDef[n].z > .2).join('');
  const pileFront = pile.filter((_, n) => pileDef[n].z <= .2).join('');

  const heroX = CX + 6, heroY = GY + 10;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}"
  font-family="'Baloo 2','Nunito',ui-rounded,system-ui,sans-serif">
<defs>
  <radialGradient id="mRoom" cx="50%" cy="18%" r="92%">
    <stop offset="0" stop-color="${S.warm}"/><stop offset=".45" stop-color="${S.mid}"/>
    <stop offset="1" stop-color="${S.void}"/></radialGradient>
  <linearGradient id="mBack" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${shade(k.light, .3)}"/><stop offset=".55" stop-color="${k.light}"/>
    <stop offset="1" stop-color="${shade(k.dark, -.1)}"/></linearGradient>
  <linearGradient id="mGlass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset=".28" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".46" stop-color="#fff" stop-opacity=".16"/><stop offset=".52" stop-color="#fff" stop-opacity="0"/>
    <stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>
  <linearGradient id="mFloorIn" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${shade(k.trim, -.18)}"/><stop offset="1" stop-color="${shade(k.trim, .28)}"/></linearGradient>
  <radialGradient id="mVig" cx="50%" cy="46%" r="62%">
    <stop offset=".45" stop-color="${shade(k.dark, -.4)}" stop-opacity="0"/>
    <stop offset="1" stop-color="${shade(k.dark, -.4)}" stop-opacity=".55"/></radialGradient>
  <clipPath id="mPit"><rect x="292" y="238" width="1016" height="512" rx="18"/></clipPath>
</defs>

<rect width="${SW}" height="${SH}" fill="url(#mRoom)"/>
${floor(760, '#260d21', 3)}
${motes(70, 200, 120, 1200, 700, 12)}

<!-- cabinet shell -->
<rect x="238" y="120" width="1124" height="812" rx="42" fill="${shade(k.body, -.2)}"/>
<rect x="238" y="120" width="1124" height="812" rx="42" fill="none" stroke="${S.gold2}" stroke-width="3" opacity=".6"/>
<rect x="256" y="138" width="34" height="774" rx="17" fill="#fff" opacity=".13"/>
<rect x="252" y="130" width="1096" height="86" rx="34" fill="${k.marquee}"/>
<rect x="272" y="144" width="1056" height="30" rx="15" fill="#fff" opacity=".2"/>
${Array.from({ length: 15 }, (_, i) => {
    const bx = 300 + i * 71, lit = i % 3 !== 2;
    return `<g><circle cx="${bx}" cy="${lit ? 152 : 196}" r="${lit ? 19 : 8}" fill="${S.gold}" opacity="${lit ? .18 : 0}"/>
      <circle cx="${bx}" cy="${lit ? 152 : 196}" r="7" fill="${lit ? '#fffbe8' : '#c99a6a'}" stroke="${S.gold2}" stroke-width="2"/></g>`;
  }).join('')}
<text x="800" y="196" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" stroke="${shade(k.dark, -.3)}" stroke-width="6" paint-order="stroke">🧸 TEDDY BEAR BONANZA 🧸</text>

<!-- inside the glass -->
<rect x="292" y="238" width="1016" height="512" rx="18" fill="url(#mBack)"/>
<rect x="292" y="238" width="1016" height="512" rx="18" fill="url(#mVig)"/>
<g clip-path="url(#mPit)">
  ${shaft(800, 238, 300, 900, 480, S.glow, .34)}
  ${[[420, 330, 34], [640, 300, 44], [900, 340, 30], [1120, 312, 38], [520, 430, 26], [1010, 440, 30]].map(c =>
    `<g opacity=".5"><ellipse cx="${c[0]}" cy="${c[1]}" rx="${c[2]}" ry="${c[2] * .62}" fill="#fff"/>
     <ellipse cx="${c[0] - c[2] * .5}" cy="${c[1] + c[2] * .16}" rx="${c[2] * .6}" ry="${c[2] * .46}" fill="#fff"/>
     <ellipse cx="${c[0] + c[2] * .5}" cy="${c[1] + c[2] * .18}" rx="${c[2] * .52}" ry="${c[2] * .4}" fill="#fff"/></g>`).join('')}
  <path d="M292 686 H1308 V750 H292 Z" fill="url(#mFloorIn)"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${330 + i * 118} 686 V750" stroke="${shade(k.trim, -.24)}" stroke-width="1.6" opacity=".5"/>`).join('')}
  ${motes(46, 300, 250, 1000, 460, 5)}

  ${pileBack}
  <!-- the floor ring under the claw, in front of the pile it sits behind -->
  <ellipse cx="${heroX}" cy="${heroY + 96}" rx="150" ry="42" fill="${S.gold}" opacity=".26"/>
  <ellipse cx="${heroX}" cy="${heroY + 96}" rx="150" ry="42" fill="none" stroke="#fff3c4" stroke-width="7" stroke-dasharray="24 17"/>
  <ellipse cx="${heroX}" cy="${heroY + 96}" rx="112" ry="30" fill="none" stroke="#fff" stroke-width="2.6" opacity=".8"/>
  ${pileFront}
  <ellipse cx="${heroX}" cy="${heroY + 96}" rx="150" ry="42" fill="none" stroke="#fff3c4" stroke-width="7" stroke-dasharray="24 17" opacity=".45"/>

  <!-- the claw -->
  <path d="M${heroX} 238 V352" stroke="#b9c4da" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="${heroX}" cy="392" rx="150" ry="112" fill="${S.gold}" opacity=".14"/>
  <g transform="translate(${heroX},380) scale(2.35)">${clawSVG(1, 1, { face: 'aiming' })}</g>
  ${sparkleArt(heroX - 168, 348, 1.3, S.gold3)}${sparkleArt(heroX + 176, 384, 1, S.gold3)}
  ${bubble(heroX + 156, 424, 200, 56, 'pick me!!', '#fff', 'bl', 26)}
  <rect x="292" y="238" width="1016" height="512" rx="18" fill="url(#mGlass)"/>
  <path d="M400 750 L640 238 L716 238 L476 750 Z" fill="#fff" opacity=".07"/>
  <path d="M900 750 L1120 238 L1160 238 L940 750 Z" fill="#fff" opacity=".05"/>
</g>
<rect x="292" y="238" width="1016" height="512" rx="18" fill="none" stroke="${k.trim}" stroke-width="14"/>
<rect x="292" y="238" width="1016" height="512" rx="18" fill="none" stroke="${S.gold2}" stroke-width="2.4" opacity=".7"/>

<!-- base, chute, controls -->
<rect x="268" y="772" width="1064" height="148" rx="30" fill="${k.trim}"/>
<rect x="268" y="772" width="1064" height="148" rx="30" fill="none" stroke="${shade(k.dark, -.2)}" stroke-width="3"/>
<rect x="308" y="800" width="240" height="96" rx="22" fill="#2b1524"/>
<rect x="308" y="800" width="240" height="34" rx="16" fill="${shade(k.dark, -.1)}"/>
<text x="428" y="825" text-anchor="middle" font-size="19" font-weight="800" fill="#fff">PRIZES ↓</text>
<g transform="translate(428,868) scale(.5)">${refinedArt(m.roster[4]) || ''}</g>
${bowArt(428, 800, 1.8, k.marquee, shade(k.dark, -.2), 0)}
<g transform="translate(600,800)">
  <rect x="0" y="0" width="440" height="96" rx="22" fill="#fff" opacity=".8"/>
  <text x="220" y="34" text-anchor="middle" font-size="21" font-weight="800" fill="${shade(k.dark, -.25)}">the cosiest bears in town</text>
  <rect x="46" y="48" width="348" height="22" rx="11" fill="${shade(k.light, -.1)}"/>
  <rect x="46" y="48" width="218" height="22" rx="11" fill="${k.marquee}"/>
  <text x="220" y="88" text-anchor="middle" font-size="17" font-weight="800" fill="${shade(k.dark, -.2)}">5 of 8 cuties found</text>
</g>
<g transform="translate(1160,848)">
  <rect x="-52" y="-30" width="104" height="60" rx="14" fill="${shade(k.dark, -.15)}"/>
  <rect x="-16" y="-16" width="32" height="7" rx="3.5" fill="#2b1524"/>
  <circle cx="0" cy="10" r="13" fill="${S.gold}" stroke="${S.gold2}" stroke-width="2.4"/>
  <text x="0" y="16" text-anchor="middle" font-size="14" font-weight="800" fill="${shade(k.dark, -.3)}">C</text>
</g>

<!-- HUD -->
${panel(40, 40, 420, 84, { r: 24 })}
<text x="72" y="94" font-size="30" font-weight="800" fill="${S.gold3}">🧸 Teddy Bear Bonanza</text>
${panel(1180, 40, 380, 84, { r: 24 })}
<text x="1216" y="94" font-size="34" font-weight="800" fill="${S.gold3}">🩷 🩷 🔑</text>
<text x="1400" y="92" font-size="26" font-weight="700" fill="${S.pink3}">2 / 3</text>

<!-- controls -->
<g transform="translate(190,880)">
  <circle r="96" fill="#3b1631" stroke="${S.gold2}" stroke-width="3"/>
  <circle r="76" fill="${shade(S.mid, .1)}"/>
  <ellipse cy="26" rx="34" ry="13" fill="#2b1020" opacity=".6"/>
  <rect x="-13" y="-34" width="26" height="56" rx="13" fill="#e8e8f2"/>
  <circle cy="-40" r="40" fill="${S.hot}"/><circle cy="-40" r="40" fill="none" stroke="#d22f74" stroke-width="4"/>
  <ellipse cx="-14" cy="-56" rx="14" ry="9" fill="#fff" opacity=".55" transform="rotate(-25 -14 -56)"/>
  <circle cx="-11" cy="-42" r="5" fill="${INK}"/><circle cx="11" cy="-42" r="5" fill="${INK}"/>
  <path d="M-7 -30 q7 6 14 0" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
</g>
<g transform="translate(1410,880)">
  <circle r="100" fill="#b8125a"/>
  <circle cy="-8" r="96" fill="${S.hot}"/>
  <circle cy="-8" r="96" fill="none" stroke="#ff9ec9" stroke-width="3" opacity=".6"/>
  <ellipse cx="-28" cy="-52" rx="34" ry="18" fill="#fff" opacity=".38" transform="rotate(-24 -28 -52)"/>
  <text x="0" y="4" text-anchor="middle" font-size="40" font-weight="800" fill="#fff" letter-spacing="3">DROP</text>
</g>
</svg>`;
}

/* ============================================================
   MOCKUP 3 — INSIDE THE GLASS  (the material beauty shot)
   ============================================================ */
export function mockInside() {
  const m = M[0], t = m.roster;
  const cast = [
    { v: t[2], x: 250, y: 760, s: 2.5, rot: -7, mood: 'happy', look: [.7, -1] },
    { v: t[6], x: 560, y: 700, s: 2.2, rot: 6, mood: 'hopeful', look: [.4, -1] },
    { v: t[0], x: 860, y: 790, s: 3.1, rot: -2, mood: 'pickme' },
    { v: t[4], x: 1180, y: 706, s: 2.3, rot: 8, mood: 'happy', look: [-.5, -1] },
    { v: t[7], x: 1440, y: 764, s: 2.4, rot: -6, mood: 'happy', look: [-.8, -1] }
  ];
  const back = [
    { v: t[3], x: 120, y: 610, s: 1.5, rot: 9 }, { v: t[5], x: 400, y: 588, s: 1.4, rot: -8 },
    { v: t[1], x: 700, y: 578, s: 1.45, rot: 5 }, { v: t[6], x: 1040, y: 582, s: 1.4, rot: -6 },
    { v: t[2], x: 1330, y: 596, s: 1.5, rot: 7 }, { v: t[0], x: 1540, y: 616, s: 1.4, rot: -9 }
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}"
  font-family="'Baloo 2','Nunito',ui-rounded,system-ui,sans-serif">
<defs>
  <linearGradient id="iBack" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffe9f5"/><stop offset=".42" stop-color="#ffd2ea"/>
    <stop offset="1" stop-color="#e79ec4"/></linearGradient>
  <radialGradient id="iVig" cx="52%" cy="42%" r="66%">
    <stop offset=".38" stop-color="#8a3560" stop-opacity="0"/><stop offset="1" stop-color="#5c1e42" stop-opacity=".62"/></radialGradient>
  <linearGradient id="iFloor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d98fb8"/><stop offset="1" stop-color="#ffd9ec"/></linearGradient>
  <filter id="iBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4.2"/></filter>
</defs>
<rect width="${SW}" height="${SH}" fill="url(#iBack)"/>
${[[300, 210, 78], [700, 170, 96], [1120, 200, 70], [1450, 160, 84]].map(c =>
    `<g opacity=".55"><ellipse cx="${c[0]}" cy="${c[1]}" rx="${c[2]}" ry="${c[2] * .6}" fill="#fff"/>
     <ellipse cx="${c[0] - c[2] * .5}" cy="${c[1] + c[2] * .15}" rx="${c[2] * .6}" ry="${c[2] * .46}" fill="#fff"/>
     <ellipse cx="${c[0] + c[2] * .5}" cy="${c[1] + c[2] * .17}" rx="${c[2] * .52}" ry="${c[2] * .4}" fill="#fff"/></g>`).join('')}

<!-- the marquee light pouring in from above -->
${shaft(800, 0, 380, 1500, 820, '#fff3c4', .5)}
${shaft(360, 0, 150, 460, 700, '#fff3c4', .22)}
${shaft(1280, 0, 150, 460, 700, '#fff3c4', .22)}

<!-- the quilted pit floor -->
<path d="M0 812 H${SW} V${SH} H0 Z" fill="url(#iFloor)"/>
${Array.from({ length: 4 }, (_, r) => Array.from({ length: 14 }, (_, c) => {
    const t0 = r / 4, t1 = (r + 1) / 4;
    const y0 = 812 + 188 * t0 * t0, y1 = 812 + 188 * t1 * t1;
    const w0 = 1600 * (.7 + t0 * .5), w1 = 1600 * (.7 + t1 * .5);
    const x0 = 800 - w0 / 2 + c * w0 / 14, x1 = 800 - w0 / 2 + (c + 1) * w0 / 14;
    const x2 = 800 - w1 / 2 + (c + 1) * w1 / 14, x3 = 800 - w1 / 2 + c * w1 / 14;
    return `<polygon points="${x0.toFixed(0)},${y0.toFixed(0)} ${x1.toFixed(0)},${y0.toFixed(0)} ${x2.toFixed(0)},${y1.toFixed(0)} ${x3.toFixed(0)},${y1.toFixed(0)}"
      fill="${(r + c) % 2 ? '#fff' : '#ffb3d9'}" opacity=".34" stroke="#e79ec4" stroke-width="1"/>`;
  }).join('')).join('')}

<!-- depth: the back of the pile, softened -->
<g filter="url(#iBlur)" opacity=".72">
${back.map((b, i) => `${groundShadow(b.x, b.y + 78 * b.s / 1.5, 52 * b.s / 1.5, 15 * b.s / 1.5, 'ib' + i, .3)}
  <g transform="translate(${b.x},${b.y}) rotate(${b.rot}) scale(${b.s})">${refinedArt(b.v) || stuffyArt(b.v)}</g>`).join('')}
</g>
<rect width="${SW}" height="${SH}" fill="url(#iVig)"/>

<!-- the front rank, in focus -->
${cast.map((b, i) => `${groundShadow(b.x, b.y + 92 * b.s / 2.5, 74 * b.s / 2.5, 22 * b.s / 2.5, 'ic' + i, .46)}
  <g transform="translate(${b.x},${b.y}) rotate(${b.rot}) scale(${b.s})">${refinedArt(b.v, { mood: b.mood, look: b.look }) || stuffyArt(b.v)}</g>`).join('')}

<!-- the claw entering frame -->
<path d="M860 0 V96" stroke="#b9c4da" stroke-width="11" stroke-linecap="round"/>
<ellipse cx="860" cy="180" rx="240" ry="180" fill="#fff3c4" opacity=".2"/>
<g transform="translate(860,150) scale(3.6)">${clawSVG(1, 1, { face: 'aiming' })}</g>
${motes(90, 60, 60, 1480, 800, 44, '#fff8e0')}
${sparkleArt(620, 300, 2.2, '#fff8e0')}${sparkleArt(1120, 260, 1.8, '#fff8e0')}${sparkleArt(300, 420, 1.4, '#fff8e0')}
${bubble(1000, 540, 230, 62, 'pick me!!', '#fff', 'bl', 30)}
</svg>`;
}

/* ============================================================
   MOCKUP 4 — THE CUTIE CAST  (the roster sheet)
   ============================================================ */
export function mockCast() {
  const t = M[0].roster, b = M[1].roster, u = M[5].roster;
  const RIB = ['', '✨ RARE', '👑 LEGENDARY'];

  const cell = (v, x, y, s, i) => `<g>
    ${groundShadow(x, y + 96, 74, 20, 'cs' + i, .46)}
    <g transform="translate(${x},${y}) scale(${s})">${refinedArt(v) || stuffyArt(v)}</g>
    <text x="${x}" y="${y + 148}" text-anchor="middle" font-size="26" font-weight="800" fill="${S.gold3}">${v.name}</text>
    ${v.rare ? `<g><rect x="${x - 62}" y="${y + 162}" width="124" height="26" rx="13" fill="none" stroke="${v.rare === 2 ? S.gold : '#c9a4ff'}" stroke-width="2"/>
      <text x="${x}" y="${y + 181}" text-anchor="middle" font-size="14" font-weight="800" fill="${v.rare === 2 ? S.gold : '#c9a4ff'}">${RIB[v.rare]}</text></g>` : ''}
  </g>`;

  const grid = t.map((v, i) => cell(v, 172 + (i % 4) * 236, 330 + Math.floor(i / 4) * 314, 1.62, i)).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}"
  font-family="'Baloo 2','Nunito',ui-rounded,system-ui,sans-serif">
<defs>
  <radialGradient id="cBg" cx="42%" cy="34%" r="86%">
    <stop offset="0" stop-color="#4a1a3c"/><stop offset=".6" stop-color="#2c0f26"/><stop offset="1" stop-color="#1a0817"/></radialGradient>
</defs>
<rect width="${SW}" height="${SH}" fill="url(#cBg)"/>
${motes(60, 0, 0, SW, SH, 77)}

<text x="60" y="86" font-size="46" font-weight="800" fill="${S.gold3}">The Cutie Cast</text>
<text x="60" y="126" font-size="21" font-weight="700" fill="${S.pink3}">Teddy Bear Bonanza · all eight, at the proposed fidelity</text>
<path d="M60 150 H1080" stroke="${S.gold2}" stroke-width="2" opacity=".6"/>
${grid}

<!-- the treatment applied to other species -->
${panel(1136, 170, 404, 760, { r: 26 })}
<text x="1338" y="222" text-anchor="middle" font-size="24" font-weight="800" fill="${S.gold3}">THE SAME TREATMENT</text>
<path d="M1180 244 H1496" stroke="${S.gold2}" stroke-width="1.6" opacity=".6"/>
${groundShadow(1338, 400, 66, 18, 'cx1', .4)}
<g transform="translate(1338,318) scale(1.5)">${refinedArt(b[0])}</g>
<text x="1338" y="446" text-anchor="middle" font-size="22" font-weight="800" fill="${S.pink3}">Mochi · bunny</text>
${groundShadow(1338, 660, 66, 18, 'cx2', .4)}
<g transform="translate(1338,566) scale(1.42)">${refinedArt(u[7])}</g>
<text x="1338" y="706" text-anchor="middle" font-size="22" font-weight="800" fill="${S.pink3}">Celestia · unicorn</text>

<!-- now vs next -->
<path d="M1180 742 H1496" stroke="${S.gold2}" stroke-width="1.6" opacity=".6"/>
<text x="1338" y="778" text-anchor="middle" font-size="19" font-weight="800" fill="${S.gold}">NOW  →  NEXT</text>
<g transform="translate(1246,852) scale(1.05)">${stuffyArt(t[0])}</g>
<path d="M1320 846 h44 m-16 -14 l16 14 l-16 14" stroke="${S.gold}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g transform="translate(1436,852) scale(1.05)">${refinedArt(t[0])}</g>

<text x="60" y="962" font-size="17" font-weight="700" fill="${S.gold3}" opacity=".95">Same silhouettes · same palettes · same coordinates — relit with form shading, rim light, brushed nap, stitched seams and glossy eyes.</text>
</svg>`;
}

/* ============================================================
   MOCKUP 5 — THE CUTIE HOME + ALBUM  (the UI screen)
   ============================================================ */
export function mockHome() {
  const T = M[0].roster, B = M[1].roster, D = M[2].roster, F = M[3].roster, C = M[4].roster, U = M[5].roster;
  const shelfKit = [T[0], B[0], U[7], T[7], B[6], U[1]];

  const shelf = (y, items, x0, gap) => `
    <rect x="${x0 - 16}" y="${y}" width="${gap * items.length + 26}" height="15" rx="7" fill="#c98a5e"/>
    <rect x="${x0 - 16}" y="${y}" width="${gap * items.length + 26}" height="6" rx="3" fill="#f0c194"/>
    ${items.map((v, i) => {
      const cx = x0 + i * gap + gap / 2 - 8;
      const art = refinedArt(v);
      return `${groundShadow(cx, y - 2, 30, 8, 'hs' + y + i, .35)}
        <g transform="translate(${cx},${y - 34}) scale(.64)">${art || stuffyArt(v)}</g>`;
    }).join('')}`;

  const album = [
    { v: T[0], f: 1 }, { v: T[1], f: 1 }, { v: T[2], f: 1 }, { v: T[3], f: 1 },
    { v: T[4], f: 1 }, { v: T[5], f: 0 }, { v: T[6], f: 0 }, { v: T[7], f: 0 }
  ].map((s, i) => {
    const x = 902 + (i % 4) * 158, y = 372 + Math.floor(i / 4) * 220;
    return `<g>
      <rect x="${x}" y="${y}" width="136" height="196" rx="12" fill="${s.f ? '#fffdf8' : '#2c1226'}" stroke="${s.f ? S.gold : '#6b3a58'}" stroke-width="2.4"/>
      <rect x="${x + 9}" y="${y + 9}" width="118" height="130" rx="8" fill="${s.f ? '#fff4fa' : '#20101c'}"/>
      ${s.f
        ? `<g transform="translate(${x + 68},${y + 92}) scale(.72)">${refinedArt(s.v) || stuffyArt(s.v)}</g>`
        : `<g transform="translate(${x + 68},${y + 92}) scale(.72)" opacity=".2">${stuffyArt(s.v).replace(/fill="(?!none)[^"]*"/g, 'fill="#8b7b87"')}</g>
           <text x="${x + 68}" y="${y + 86}" text-anchor="middle" font-size="40" font-weight="800" fill="#7a5a70">?</text>`}
      <text x="${x + 68}" y="${y + 164}" text-anchor="middle" font-size="15" font-weight="800" fill="${s.f ? '#c9377f' : '#7a5a70'}">${s.f ? s.v.name : '? ? ?'}</text>
      <text x="${x + 68}" y="${y + 184}" text-anchor="middle" font-size="11" font-weight="700" fill="${s.f ? '#a4548a' : '#6b4a62'}">${s.f ? 'caught 14 Aug' : 'not caught yet'}</text>
      ${s.f && s.v.rare ? `<path d="M${x + 106} ${y - 6} h26 v34 l-13 -10 l-13 10 z" fill="${s.v.rare === 2 ? S.gold : '#c9a4ff'}"/>` : ''}
      <rect x="${x - 8}" y="${y - 9}" width="44" height="18" rx="3" fill="${S.gold}" opacity=".65" transform="rotate(-14 ${x + 14} ${y})"/>
    </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}"
  font-family="'Baloo 2','Nunito',ui-rounded,system-ui,sans-serif">
<defs>
  <radialGradient id="hBg" cx="50%" cy="20%" r="92%">
    <stop offset="0" stop-color="#5e2447"/><stop offset=".55" stop-color="#331229"/><stop offset="1" stop-color="#1c0819"/></radialGradient>
  <linearGradient id="hWall" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffe6f4"/><stop offset="1" stop-color="#ffc8e4"/></linearGradient>
</defs>
<rect width="${SW}" height="${SH}" fill="url(#hBg)"/>
${motes(50, 0, 0, SW, SH, 91)}

<!-- top bar -->
${panel(40, 34, 700, 76, { r: 24 })}
<text x="74" y="84" font-size="28" font-weight="800" fill="${S.gold3}">🧸 41 caught</text>
<text x="300" y="84" font-size="28" font-weight="800" fill="${S.gold3}">🌈 23 / 48 kinds</text>
<text x="560" y="84" font-size="28" font-weight="800" fill="${S.gold3}">🕹️ 118 tries</text>
${panel(1300, 34, 260, 76, { r: 24 })}
<text x="1430" y="84" text-anchor="middle" font-size="26" font-weight="800" fill="${S.pink3}">Ella's Arcade</text>

<!-- LEFT: the Cutie Home -->
${panel(40, 140, 820, 820, { r: 28 })}
<text x="450" y="196" text-anchor="middle" font-size="34" font-weight="800" fill="${S.gold3}">🏠 My Cutie Home</text>
<path d="M96 216 H804" stroke="${S.gold2}" stroke-width="1.6" opacity=".6"/>

<rect x="82" y="238" width="736" height="600" rx="18" fill="url(#hWall)"/>
${Array.from({ length: 12 }, (_, i) => `<rect x="${94 + i * 62}" y="238" width="26" height="600" fill="#ffb3d9" opacity=".45"/>`).join('')}
<clipPath id="roomClip"><rect x="82" y="238" width="736" height="600" rx="18"/></clipPath>
<g clip-path="url(#roomClip)">
  <!-- window -->
  <rect x="586" y="278" width="196" height="168" rx="16" fill="#3b2a58"/>
  <rect x="586" y="278" width="196" height="168" rx="16" fill="none" stroke="#fff" stroke-width="8"/>
  <path d="M684 278 v168 M586 362 h196" stroke="#fff" stroke-width="7"/>
  <circle cx="742" cy="316" r="20" fill="#fff6bd"/>
  ${[[620, 328], [660, 400], [716, 412], [606, 414]].map(p => sparkleArt(p[0], p[1], .8, '#fff6bd')).join('')}
  <!-- fairy lights -->
  <path d="M92 268 q92 46 184 0 q92 46 184 0 q92 46 184 0" stroke="#c9a4ff" stroke-width="3" fill="none"/>
  ${Array.from({ length: 11 }, (_, i) => `<circle cx="${112 + i * 56}" cy="${282 + (i % 2 ? 12 : 0)}" r="8" fill="${['#ff8fbe', '#ffd447', '#7fe0c4', '#7fd8ff'][i % 4]}"/>`).join('')}
  ${shelf(500, shelfKit, 118, 108)}
  ${shelf(660, [T[3], B[4], U[2], T[6], B[1], T[4]], 118, 108)}
  <!-- bed -->
  <rect x="470" y="712" width="330" height="110" rx="22" fill="#c9a4ff"/>
  <rect x="470" y="712" width="330" height="38" rx="19" fill="#e2d0ff"/>
  <rect x="486" y="700" width="112" height="48" rx="20" fill="#fff"/>
  <g transform="translate(542,700) scale(.66)">${refinedArt(U[7]) || ''}</g>
  <!-- beanbag -->
  <ellipse cx="200" cy="790" rx="86" ry="54" fill="#7fe0c4"/>
  <ellipse cx="200" cy="774" rx="72" ry="42" fill="#a4f0da"/>
  <g transform="translate(200,756) scale(.72)">${refinedArt(T[4]) || ''}</g>
  <!-- rug -->
  <ellipse cx="330" cy="846" rx="196" ry="38" fill="#ff9ec9" opacity=".5"/>
</g>
<g transform="translate(360,894)">
  <rect x="-190" y="-24" width="380" height="48" rx="24" fill="#3b1631" stroke="${S.gold2}" stroke-width="2"/>
  <text x="0" y="8" text-anchor="middle" font-size="19" font-weight="800" fill="${S.gold3}">drag a cutie anywhere you like</text>
</g>

<!-- RIGHT: the scrapbook -->
${panel(890, 140, 670, 820, { r: 28 })}
<text x="1225" y="196" text-anchor="middle" font-size="34" font-weight="800" fill="${S.gold3}">📖 My Plushie Album</text>
<path d="M930 216 H1520" stroke="${S.gold2}" stroke-width="1.6" opacity=".6"/>
<text x="930" y="262" font-size="23" font-weight="800" fill="${S.pink3}">🧸 Teddy Bear Bonanza</text>
<rect x="930" y="282" width="590" height="22" rx="11" fill="#2c1226" stroke="${S.gold2}" stroke-width="1.6"/>
<rect x="933" y="285" width="365" height="16" rx="8" fill="${S.hot}"/>
<text x="1520" y="326" text-anchor="end" font-size="18" font-weight="800" fill="${S.gold3}">5 / 8</text>
${album}
<text x="1225" y="928" text-anchor="middle" font-size="17" font-weight="700" fill="${S.pink3}" opacity=".85">the shapes you have not caught are still out there</text>
</svg>`;
}

/* ============================================================
   MOCKUP 1 — TITLE & ARCADE LOBBY
   ============================================================ */
import { cabinet as coverCabinet, bulbs, bunting, balloon, N } from './cover.mjs';

export function mockLobby() {
  const perched = [M[0].roster[7], M[1].roster[7], M[2].roster[7], M[3].roster[7], M[4].roster[4], M[5].roster[7]];
  const cabs = M.map((m, i) => {
    const x = 84 + i * 244, y = 470, s = 1.55;
    return `<g>
      ${groundShadow(x + 60 * s, y + 196 * s, 120, 28, 'lb' + i, .5)}
      ${coverCabinet(m, x, y, s, 700 + i * 13)}
      ${refinedArt(perched[i])
        ? `<g transform="translate(${x + 60 * s},${y - 26}) scale(.72)">${refinedArt(perched[i])}</g>`
        : `<g transform="translate(${x + 60 * s},${y - 26}) scale(.6)">${stuffyArt(perched[i])}</g>`}
      <g transform="translate(${x + 60 * s},${y + 214 * s})">
        <rect x="-114" y="-2" width="228" height="72" rx="20" fill="#3b1631" stroke="${i < 3 ? S.gold : '#6b3a58'}" stroke-width="${i < 3 ? 2.6 : 1.8}"/>
        <text x="0" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="${i < 3 ? S.gold3 : '#8b6a80'}">${m.name.length > 19 ? m.name.slice(0, 18) + '…' : m.name}</text>
        <text x="0" y="56" text-anchor="middle" font-size="19" font-weight="800" fill="${i < 3 ? S.hot : '#6b4a62'}">${i < 2 ? '🩷 🩷 🔑' : i === 2 ? '🩷 · ·' : '🔒 locked'}</text>
      </g></g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}"
  font-family="'Baloo 2','Nunito',ui-rounded,system-ui,sans-serif">
<defs>
  <radialGradient id="lRoom" cx="50%" cy="14%" r="96%">
    <stop offset="0" stop-color="#8a3560"/><stop offset=".42" stop-color="#54203f"/><stop offset="1" stop-color="#180716"/></radialGradient>
</defs>
<rect width="${SW}" height="${SH}" fill="url(#lRoom)"/>
${Array.from({ length: 14 }, (_, r) => Array.from({ length: 11 }, (_, c) => {
    const x = c * 160 + (r % 2 ? 80 : 0), y = r * 80;
    return `<path d="M${x} ${y - 18} L${x + 18} ${y} L${x} ${y + 18} L${x - 18} ${y} Z" fill="${S.warm}" opacity=".22"/>`;
  }).join('')).join('')}
${floor(724, '#280e22', 9)}
${motes(80, 0, 60, SW, 800, 55)}

<!-- ceiling: bunting and lights -->
${bunting(40, 250, 560, 190, 9, 46)}
${bunting(1040, 190, 1560, 250, 9, 46)}
${balloon(220, 300, 1.1, N.pink2, '#e0559a')}${balloon(1390, 296, 1.05, '#7fe0c4', '#3fbfa0')}
${shaft(800, 0, 460, 1700, 760, '#ffd9a8', .2)}

${titleLockup(800, 150, 1)}

${cabs}

<!-- the greeter, peeking in from the corner -->
<g transform="translate(1524,952)">
  <g transform="scale(1.45)">${refinedArt(M[0].roster[7], { mood: 'proud' })}</g>
</g>
${bubble(1218, 900, 244, 62, 'welcome back!', '#fff', 'br', 26)}

<g transform="translate(152,96)">
  <rect x="-100" y="-34" width="200" height="68" rx="34" fill="#3b1631" stroke="${S.gold}" stroke-width="2.6"/>
  <text x="0" y="10" text-anchor="middle" font-size="26" font-weight="800" fill="${S.gold3}">📖 Album</text>
</g>
<g transform="translate(1448,96)">
  <rect x="-100" y="-34" width="200" height="68" rx="34" fill="#3b1631" stroke="${S.gold}" stroke-width="2.6"/>
  <text x="0" y="10" text-anchor="middle" font-size="26" font-weight="800" fill="${S.gold3}">🔊  ❓</text>
</g>
</svg>`;
}
