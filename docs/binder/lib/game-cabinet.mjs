/* extracted VERBATIM from index.html (build 1c0c853) — pit projection + cabinet */
import { INK } from './game-art.mjs';
const PITX = 205, PITZ = 150, FLOORY = 500, REST_Y = 296;
const HOLE = { x: -152, z: 34 };
const sOf  = z => 1 - z * 0.0017;
const projX = (x, z) => 320 + x * sOf(z);
const projY = (y, z) => FLOORY - y * sOf(z) - z * 0.60;

let M = null, mi = 0;                 // current machine
let bodies = [], nextBid = 1;
let pitG = null, clawG = null, carriageG = null, cableEl = null, prongs = [], holeShade = null;
let raf = 0, lastT = 0, running = false, lastOrder = '';

const claw = {
  x: 0, z: 78, y: REST_Y, open: 1, state: 'idle', t: 0,
  holding: null, outcome: null, slipAt: 0, fromX: 0, fromZ: 0, sway: 0, swayV: 0
};
const input = { x: 0, y: 0 };

/* ---------- cabinet chrome ---------- */
function buildCabinet(m) {
  const s = m.skin;
  const bulbs = [];
  for (let i = 0; i < 14; i++) {
    const bx = 58 + i * 38.5;
    bulbs.push(`<circle class="bulb" cx="${bx}" cy="${i % 2 ? 12 : 88}" r="5.5" fill="#fff8c4" style="animation-delay:${(i * .09).toFixed(2)}s"/>`);
  }
  const shine = `<linearGradient id="gShine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".42" stop-color="#fff" stop-opacity=".07"/>
      <stop offset=".62" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
  return `<defs>
    ${shine}
    <linearGradient id="gBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.body}"/><stop offset="1" stop-color="${s.dark}"/></linearGradient>
    <linearGradient id="gBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.light}"/><stop offset="1" stop-color="${s.glass}"/></linearGradient>
    <radialGradient id="gHole"><stop offset="0" stop-color="#2b1524"/><stop offset="1" stop-color="#5a3049"/></radialGradient>
    <style>
      .bulb{animation:bulbB 1.1s ease-in-out infinite}
      @keyframes bulbB{0%,100%{opacity:.35;r:4.6}50%{opacity:1;r:6.4}}
      .marqueeTxt{font:900 27px ui-rounded,"SF Pro Rounded",Nunito,"Comic Sans MS",system-ui,sans-serif;letter-spacing:.5px}
      .plateTxt{font:900 15px ui-rounded,"SF Pro Rounded",Nunito,"Comic Sans MS",system-ui,sans-serif}
    </style>
  </defs>

  <!-- cabinet shell -->
  <rect x="34" y="2" width="572" height="694" rx="34" fill="url(#gBody)"/>
  <rect x="34" y="2" width="572" height="694" rx="34" fill="none" stroke="${s.dark}" stroke-width="5"/>
  <rect x="46" y="4" width="548" height="96" rx="26" fill="${s.marquee}"/>
  ${bulbs.join('')}
  <text class="marqueeTxt" x="320" y="60" text-anchor="middle" fill="#fff" stroke="${s.dark}" stroke-width="5" paint-order="stroke" >${m.emoji} ${m.name.toUpperCase()} ${m.emoji}</text>

  <!-- interior box -->
  <g>
    <polygon points="108,118 532,118 473,160 167,160" fill="${s.light}"/>
    <rect x="167" y="160" width="306" height="250" fill="url(#gBack)"/>
    <polygon points="108,118 167,160 167,410 115,500" fill="${s.light}" opacity=".92"/>
    <polygon points="532,118 473,160 473,410 525,500" fill="${s.light}" opacity=".78"/>
    <polygon points="115,500 525,500 473,410 167,410" fill="${s.glass}"/>
    <polygon points="115,500 525,500 473,410 167,410" fill="none" stroke="${s.trim}" stroke-width="2"/>
    <!-- polka dots on the back wall, because kawaii -->
    ${[[210, 200], [300, 240], [400, 195], [250, 300], [370, 320], [440, 265], [190, 350], [320, 180]].map((p, i) =>
      `<circle cx="${p[0]}" cy="${p[1]}" r="${8 + (i % 3) * 3}" fill="${s.trim}" opacity=".55"/>`).join('')}
    <g opacity=".8">
      <rect x="242" y="302" width="156" height="46" rx="14" fill="${s.trim}"/>
      <rect x="242" y="302" width="156" height="46" rx="14" fill="none" stroke="${s.body}" stroke-width="3"/>
      <text x="320" y="333" text-anchor="middle" font-size="21" font-weight="900" fill="${s.dark}">GRAB ME!</text>
    </g>
  </g>

  <!-- prize hole -->
  <ellipse cx="${projX(HOLE.x, HOLE.z)}" cy="${projY(0, HOLE.z)}" rx="${52 * sOf(HOLE.z)}" ry="${19 * sOf(HOLE.z)}" fill="url(#gHole)"/>
  <ellipse cx="${projX(HOLE.x, HOLE.z)}" cy="${projY(0, HOLE.z) - 3}" rx="${52 * sOf(HOLE.z)}" ry="${19 * sOf(HOLE.z)}" fill="none" stroke="${s.marquee}" stroke-width="4"/>
  <text x="${projX(HOLE.x, HOLE.z)}" y="${projY(0, HOLE.z) + 34}" text-anchor="middle" font-size="15" font-weight="900" fill="${s.dark}">PRIZE</text>

  <!-- rails -->
  <path d="M112 122 L167 158 M528 122 L473 158" stroke="${s.dark}" stroke-width="7" stroke-linecap="round" opacity=".75"/>

  <g id="pit"></g>

  <g id="gantry"></g>

  <!-- glass -->
  <rect x="108" y="112" width="424" height="396" rx="12" fill="url(#gShine)" pointer-events="none"/>
  <path d="M126 496 L232 124 L288 124 L182 496 Z" fill="#fff" opacity=".13" pointer-events="none"/>
  <path d="M300 496 L406 124 L432 124 L326 496 Z" fill="#fff" opacity=".09" pointer-events="none"/>
  <rect x="100" y="104" width="440" height="412" rx="20" fill="none" stroke="${s.trim}" stroke-width="15"/>
  <rect x="100" y="104" width="440" height="412" rx="20" fill="none" stroke="${s.dark}" stroke-width="4"/>

  <!-- base / chute -->
  <rect x="56" y="524" width="528" height="160" rx="24" fill="${s.trim}"/>
  <rect x="56" y="524" width="528" height="160" rx="24" fill="none" stroke="${s.dark}" stroke-width="4"/>
  <rect x="92" y="556" width="150" height="106" rx="16" fill="#3d2136"/>
  <rect x="92" y="556" width="150" height="52" rx="14" fill="${s.dark}" opacity=".9"/>
  <text x="167" y="590" text-anchor="middle" class="plateTxt" fill="#fff">PRIZES ↓</text>
  <g id="chuteFx"></g>
  <rect x="272" y="560" width="272" height="98" rx="16" fill="#fff" opacity=".65"/>
  <text x="408" y="600" text-anchor="middle" class="plateTxt" fill="${s.dark}">${m.tag}</text>
  <text x="408" y="634" text-anchor="middle" font-size="26">${m.emoji}💖${m.emoji}</text>`;
}

/* ---------- claw ---------- */
const CLAW_SCALE = 1.35;
function prongPath(sign, len, w, light) {
  const d = `M0 2 C${9 * sign} ${len * .38} ${20 * sign} ${len * .55} ${23 * sign} ${len}`;
  return `<path d="${d}" stroke="${light ? '#aab8d2' : '#c9d4e8'}" stroke-width="${w}" fill="none" stroke-linecap="round"/>
    <path d="${d}" stroke="#8fa0c0" stroke-width="${w * .34}" fill="none" stroke-linecap="round" opacity=".5"/>
    <circle cx="${23 * sign}" cy="${len}" r="${w * .68}" fill="${light ? '#d4dcec' : '#eaf0fb'}" stroke="#8fa0c0" stroke-width="2"/>`;
}

export { PITX, PITZ, FLOORY, REST_Y, HOLE, sOf, projX, projY, buildCabinet, prongPath, CLAW_SCALE };
