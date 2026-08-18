import { plate, PAGE, P, FONT, note, pin, leader, chip, lines, dreamBg, arcadeFloor } from './lib/plate.mjs';
import { MACHINES, stuffyArt, keyArt, sparkleArt, bowArt, INK, eye, blush, smile, RARE_LABEL } from './lib/game-art.mjs';
import { bearHead, bearFull, MOODS, clawSVG, mini, cabCard, pile, rng, bubble, lookEyes } from './lib/parts.mjs';
import { cabinetScene } from './lib/scene.mjs';
import { buildCabinet, projX, projY, sOf } from './lib/game-cabinet.mjs';

const M = MACHINES;

/* ============================================================
   PLATE 6 — CABINET GLOW-UP
   ============================================================ */
function dreamCabinet(m) {
  const s = m.skin;
  const r = rng(99);
  const bulbs = Array.from({ length: 15 }, (_, i) =>
    `<circle cx="${56 + i * 36}" cy="${i % 2 ? 16 : 84}" r="6" fill="#fff8c4" stroke="#ffd447" stroke-width="2"/>`).join('');
  const bunting = Array.from({ length: 11 }, (_, i) => {
    const x = 130 + i * 34, c = ['#ff8fbe', '#ffd447', '#7fe0c4', '#c9a4ff', '#7fd8ff'][i % 5];
    return `<path d="M${x} 128 l16 0 l-8 22 z" fill="${c}"/>`;
  }).join('');
  /* quilted plush carpet in the pit floor */
  const quilt = Array.from({ length: 7 }, (_, rw) => Array.from({ length: 11 }, (_, cl) => {
    const t0 = rw / 7, t1 = (rw + 1) / 7;
    const y0 = 412 + (500 - 412) * t0, y1 = 412 + (500 - 412) * t1;
    const w0 = 306 + (410 - 306) * t0, w1 = 306 + (410 - 306) * t1;
    const x0 = 320 - w0 / 2 + cl * w0 / 11, x1 = 320 - w0 / 2 + (cl + 1) * w0 / 11;
    const x2 = 320 - w1 / 2 + (cl + 1) * w1 / 11, x3 = 320 - w1 / 2 + cl * w1 / 11;
    return `<polygon points="${x0.toFixed(0)},${y0.toFixed(0)} ${x1.toFixed(0)},${y0.toFixed(0)} ${x2.toFixed(0)},${y1.toFixed(0)} ${x3.toFixed(0)},${y1.toFixed(0)}"
      fill="${(rw + cl) % 2 ? '#fff' : s.trim}" opacity=".5" stroke="${s.trim}" stroke-width="1"/>`;
  }).join('')).join('');

  const p = pile(m, 21, 11);

  return `<g>
  <defs>
    <linearGradient id="dBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".18" stop-color="${s.body}"/>
      <stop offset=".82" stop-color="${s.dark}"/><stop offset="1" stop-color="${s.body}"/></linearGradient>
    <radialGradient id="dLight" cx="50%" cy="8%" r="86%">
      <stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".55" stop-color="#fff3d0" stop-opacity=".35"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="dGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".34" stop-color="#fff" stop-opacity=".04"/>
      <stop offset=".52" stop-color="#fff" stop-opacity=".30"/><stop offset=".58" stop-color="#fff" stop-opacity=".05"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="dGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="dPit"><rect x="112" y="116" width="416" height="392" rx="12"/></clipPath>
  </defs>

  <!-- soft glow behind the whole machine -->
  <rect x="24" y="-4" width="592" height="708" rx="46" fill="${s.body}" opacity=".35" filter="url(#dGlow)"/>

  <!-- shell -->
  <rect x="34" y="2" width="572" height="694" rx="40" fill="url(#dBody)"/>
  <rect x="34" y="2" width="572" height="694" rx="40" fill="none" stroke="#fff" stroke-width="6" opacity=".75"/>
  <rect x="34" y="2" width="572" height="694" rx="40" fill="none" stroke="${s.dark}" stroke-width="3"/>
  ${[[62, 30], [578, 30], [62, 668], [578, 668]].map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="7" fill="#fff" opacity=".7"/>`).join('')}

  <!-- marquee with a proper light box -->
  <rect x="46" y="4" width="548" height="100" rx="30" fill="${s.marquee}"/>
  <rect x="58" y="12" width="524" height="46" rx="23" fill="#fff" opacity=".22"/>
  ${bulbs}
  <text x="320" y="66" text-anchor="middle" font-size="30" font-weight="800" fill="#fff"
    stroke="${s.dark}" stroke-width="6" paint-order="stroke">${m.emoji} ${m.name.toUpperCase()} ${m.emoji}</text>

  <!-- mascot sitting on the roof -->
  <g transform="translate(508,-6) scale(.86)">${bearFull(m.roster[7].c || m.roster[0].c, 'proud', { arms: 'wave' })}</g>

  <!-- interior -->
  <g clip-path="url(#dPit)">
    <polygon points="108,118 532,118 473,160 167,160" fill="${s.light}"/>
    <rect x="167" y="160" width="306" height="252" fill="${s.glass}"/>
    <polygon points="108,118 167,160 167,412 115,500" fill="${s.light}" opacity=".95"/>
    <polygon points="532,118 473,160 473,412 525,500" fill="${s.light}" opacity=".8"/>
    ${quilt}
    <!-- back wall: soft clouds instead of flat dots -->
    ${[[212, 206, 26], [318, 186, 34], [404, 214, 22], [252, 296, 20], [386, 312, 26], [438, 258, 18]].map(c =>
      `<g opacity=".55"><ellipse cx="${c[0]}" cy="${c[1]}" rx="${c[2]}" ry="${c[2] * .6}" fill="#fff"/>
       <ellipse cx="${c[0] - c[2] * .5}" cy="${c[1] + c[2] * .16}" rx="${c[2] * .58}" ry="${c[2] * .46}" fill="#fff"/>
       <ellipse cx="${c[0] + c[2] * .5}" cy="${c[1] + c[2] * .18}" rx="${c[2] * .5}" ry="${c[2] * .4}" fill="#fff"/></g>`).join('')}
    ${bunting}
    <!-- warm light from the marquee falling into the pit -->
    <rect x="108" y="112" width="424" height="396" fill="url(#dLight)"/>
    <!-- the pile -->
    ${p.svg}
    <!-- the claw, with a face -->
    <g transform="translate(${projX(30, 66).toFixed(1)},${projY(240, 66).toFixed(1)}) scale(${(sOf(66) * 1.35).toFixed(3)})">${clawSVG(1, 1, { face: 'aiming' })}</g>
    <path d="M${projX(30, 66).toFixed(1)} 140 V${(projY(240, 66) - 40).toFixed(1)}" stroke="#9fadc7" stroke-width="4.5" stroke-linecap="round"/>
    <!-- floor target ring -->
    <ellipse cx="${projX(30, 66).toFixed(1)}" cy="${projY(22, 66).toFixed(1)}" rx="${(60 * sOf(66)).toFixed(1)}" ry="${(20 * sOf(66)).toFixed(1)}"
      fill="#fff6bd" fill-opacity=".55" stroke="#ffd447" stroke-width="4" stroke-dasharray="12 9"/>
    <!-- heart-shaped prize hole -->
    <g transform="translate(${projX(-152, 34).toFixed(1)},${projY(0, 34).toFixed(1)})">
      <path transform="scale(2.9,1.5)" d="M0 14 C-17 3 -14 -12 -5 -12 C-1.4 -12 0 -8.4 0 -7 C0 -8.4 1.4 -12 5 -12 C14 -12 17 3 0 14 Z" fill="#4a2740"/>
      <path transform="scale(2.9,1.5) translate(0,-2)" d="M0 14 C-17 3 -14 -12 -5 -12 C-1.4 -12 0 -8.4 0 -7 C0 -8.4 1.4 -12 5 -12 C14 -12 17 3 0 14 Z" fill="none" stroke="${s.marquee}" stroke-width="3"/>
    </g>
    ${Array.from({ length: 10 }, () => sparkleArt(120 + r() * 400, 150 + r() * 340, .3 + r() * .3, '#fff')).join('')}
  </g>

  <!-- glass with a real reflection -->
  <rect x="108" y="112" width="424" height="396" rx="12" fill="url(#dGlass)" pointer-events="none"/>
  <path d="M150 500 L268 122 L318 122 L200 500 Z" fill="#fff" opacity=".16"/>
  <path d="M330 500 L436 122 L458 122 L352 500 Z" fill="#fff" opacity=".10"/>
  <rect x="100" y="104" width="440" height="412" rx="26" fill="none" stroke="#fff" stroke-width="17" opacity=".9"/>
  <rect x="100" y="104" width="440" height="412" rx="26" fill="none" stroke="${s.trim}" stroke-width="10"/>
  <rect x="100" y="104" width="440" height="412" rx="26" fill="none" stroke="${s.dark}" stroke-width="3"/>

  <!-- base -->
  <rect x="56" y="524" width="528" height="160" rx="32" fill="${s.trim}"/>
  <rect x="56" y="524" width="528" height="160" rx="32" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>
  <rect x="56" y="524" width="528" height="160" rx="32" fill="none" stroke="${s.dark}" stroke-width="3"/>
  <!-- prize chute with a bow on it -->
  <rect x="90" y="552" width="164" height="114" rx="24" fill="#3d2136"/>
  <rect x="90" y="552" width="164" height="52" rx="22" fill="${s.dark}"/>
  <text x="172" y="586" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">PRIZES ↓</text>
  ${bowArt(172, 552, 1.5, s.marquee, s.dark, 0)}
  <!-- collection meter -->
  <g transform="translate(286,556)">
    <rect x="0" y="0" width="272" height="106" rx="22" fill="#fff" opacity=".85"/>
    <text x="136" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="${s.dark}">${m.tag}</text>
    <rect x="24" y="44" width="224" height="20" rx="10" fill="${s.light}"/>
    <rect x="24" y="44" width="140" height="20" rx="10" fill="${s.marquee}"/>
    <text x="136" y="88" text-anchor="middle" font-size="15" font-weight="800" fill="${s.dark}">🩷 🩷 🔑  ·  5 of 8 cuties found</text>
  </g>
  </g>`;
}

export function glowUp() {
  const now = cabinetScene(M[0], { seed: 12, count: 11, clawX: 30, clawZ: 66, clawY: 240, clawOpen: 1 });
  const body = `
  <text x="212" y="172" text-anchor="middle" font-size="21" font-weight="800" fill="${P.mute}">NOW</text>
  <g transform="translate(212,182) scale(.455) translate(-320,0)">${now}</g>
  <text x="600" y="172" text-anchor="middle" font-size="21" font-weight="800" fill="${P.hot}">THE DREAM ✨</text>
  <g transform="translate(600,182) scale(.455) translate(-320,0)">${dreamCabinet(M[0])}</g>
  <path d="M394 356 h28 m-10 -10 l10 10 l-10 10" stroke="${P.hot}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

  ${note(40, 552, 176, 1, 'Real light', 'Warm light pours out of the marquee and lands on the pile. Right now the inside is flat and evenly lit, which is why it reads as a box instead of a room.', P.gold, 25, 190)}
  ${note(232, 552, 176, 2, 'A soft floor', 'The pit floor becomes a quilted plush carpet instead of a flat sheet of colour. Cuties look like they are sitting on something.', P.lilac, 25, 190)}
  ${note(424, 552, 176, 3, 'Rounder, glossier', 'Fatter rounded corners, a pearly white rim, four little rivets, and a glow around the whole cabinet so it sits in the arcade instead of on top of it.', P.mint, 25, 190)}
  ${note(616, 552, 176, 4, 'A roof mascot', 'The legendary cutie of that machine sits on top and waves at you. Every machine gets its own greeter.', P.hot, 25, 190)}

  ${note(40, 760, 240, 5, 'A heart-shaped prize hole', 'The chute stops being a grey oval. It becomes a heart with a bow on the front, so the best moment in the game happens somewhere that looks special.', P.peach, 34, 156)}
  ${note(296, 760, 240, 6, 'A progress meter', 'A little meter on the front counts the cuties you have found in this machine, and the two hearts and the key show how close the next unlock is.', P.sky, 34, 156)}
  ${note(552, 760, 224, 7, 'Bunting, clouds, sparkles', 'Flags across the top, soft clouds on the back wall instead of polka dots, and tiny sparkles drifting in the glass.', P.lilac, 32, 156)}

  <g transform="translate(40,934)">
    <rect x="0" y="0" width="736" height="66" rx="18" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="28" font-size="14.5" font-weight="800" fill="${P.hot}">Drawn with shapes in code — no picture files. The game still opens instantly.</text>
    <text x="20" y="52" font-size="13.5" font-weight="700" fill="${P.mute}">Ella decides which upgrades happen first, and whether every machine gets the same treatment.</text>
  </g>`;
  return plate({ num: 6, title: 'Cabinet Glow-Up', sub: 'the same machine, dressed for the party', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 7 — THE MISS THAT FEELS GOOD
   ============================================================ */
export function goodMiss() {
  const t = M[0].roster, b = M[1].roster;
  const panel = (x, y, w, h, title, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#fff" stroke="${c}" stroke-width="3"/>
    <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${c}"/>
    <text x="${x + w / 2}" y="${y + 27}" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">${title}</text>`;

  const body = `
  ${note(40, 150, 736, null, 'Four out of every five drops are a miss. That is the game.', 'The grab rates are 48% at the easiest machine and 14% at the hardest, and that is on purpose — a claw machine that always wins is not a claw machine. But right now a miss shows a grey banner that says YOU LOSE and then nothing happens. The most common thing in the whole game is also the least interesting thing in the whole game. That is the bug. Not the difficulty — the silence.', P.hot, 104, 124)}

  ${panel(40, 300, 236, 292, 'THE SLIP', P.peach)}
  <g transform="translate(158,442)">
    <g transform="translate(0,-72) scale(.62)">${clawSVG(.25, 1, { face: 'oops' })}</g>
    <g transform="translate(6,42) scale(.72) rotate(24)">${bearFull(t[1].c, 'worried', { arms: 'wave' })}</g>
    <path d="M-34 -18 q-10 26 -4 48 M-46 -8 q-8 22 -2 40" stroke="${P.peach}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
    ${bubble(-108, -34, 96, 34, 'byeee!', P.soft, 'br', 15)}
  </g>
  ${lines('It slipped. Instead of a grey banner, the cutie gives a tiny apologetic wave on the way down. Cute heartbreak.', 158, 522, 33, 17, `text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.deep}"`)}

  ${panel(290, 300, 236, 292, 'THE PILE MOVED', P.mint)}
  <g transform="translate(408,436)">
    <rect x="-96" y="-58" width="88" height="96" rx="12" fill="#fff" stroke="${P.line}" stroke-width="2"/>
    <rect x="8" y="-58" width="88" height="96" rx="12" fill="#fff" stroke="${P.mint}" stroke-width="2"/>
    <text x="-52" y="-66" text-anchor="middle" font-size="11" font-weight="800" fill="${P.mute}">before</text>
    <text x="52" y="-66" text-anchor="middle" font-size="11" font-weight="800" fill="${P.mint}">after</text>
    <g transform="translate(-70,16) scale(.30)">${stuffyArt(t[0])}</g>
    <g transform="translate(-40,20) scale(.30)">${stuffyArt(t[2])}</g>
    <g transform="translate(-56,-10) scale(.26)">${stuffyArt(t[7])}</g>
    <g transform="translate(30,22) scale(.30)">${stuffyArt(t[0])}</g>
    <g transform="translate(66,24) scale(.30)">${stuffyArt(t[2])}</g>
    <g transform="translate(48,-24) scale(.32)">${stuffyArt(t[7])}</g>
    <circle cx="48" cy="-24" r="24" fill="none" stroke="${P.mint}" stroke-width="3" stroke-dasharray="6 5"/>
    <path d="M-4 -4 h14 m-6 -6 l6 6 l-6 6" stroke="${P.mint}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${bubble(-56, 48, 168, 32, 'Sir Roosevelt is on top now!', '#fff', 'tl', 12, P.mint)}
  </g>
  ${lines('A miss still shoves the pile — the game already does this. It just never says so. One line of text turns a loss into progress you can see.', 408, 522, 33, 17, `text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.deep}"`)}

  ${panel(540, 300, 236, 292, 'SO CLOSE', P.lilac)}
  <g transform="translate(658,438)">
    <g transform="translate(0,-46) scale(.9)">${bearHead(t[6].c, 'hopeful')}</g>
    <rect x="-88" y="18" width="176" height="22" rx="11" fill="#fff" stroke="${P.lilac}" stroke-width="2"/>
    <rect x="-88" y="18" width="150" height="22" rx="11" fill="${P.lilac}"/>
    <circle cx="62" cy="29" r="15" fill="#fff" stroke="${P.lilac}" stroke-width="3"/>
    <text x="62" y="35" text-anchor="middle" font-size="13" font-weight="800" fill="${P.lilac}">!</text>
    <text x="0" y="66" text-anchor="middle" font-size="14" font-weight="800" fill="${P.lilac}">one whisker away</text>
  </g>
  ${lines('The game already knows exactly how close you were — it is the aim number. Show it. “One whisker away” hurts in the good way.', 658, 522, 32, 17, `text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.deep}"`)}

  ${note(40, 614, 356, 8, 'What must NOT change', 'The odds. Nothing on this page makes a grab more likely, and nothing here is a pity prize. The README promises the game is honest and not rigged, and that promise is worth more than any new feature. A miss should feel better. It should not be worth less.', P.hot, 50, 168)}
  ${note(420, 614, 356, 9, 'What could change (Ella’s call)', 'Should three misses in a row earn a “keep going!” from your favourite cutie? Should the pile ever be re-shuffled after ten misses? Should the machine ever say sorry? These change how the game feels about losing, so they are Ella’s decisions and not anybody else’s.', P.lilac, 50, 168)}

  <g transform="translate(40,800)">
    <rect x="0" y="0" width="736" height="204" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="32" font-size="17" font-weight="800" fill="${P.hot}">The three-second rule 🕒</text>
    ${lines('Every drop ends in one of three ways: caught, slipped, or fumbled. Each ending gets three seconds of the game’s full attention — a face, a sound, a sentence, and something that changed in the pit. Three seconds × three endings is the entire feature. If a player cannot tell those three endings apart with the sound off, it is not finished yet.', 20, 66, 96, 21, `font-size="14" font-weight="600" fill="${P.deep}"`)}
    ${lines('caught → confetti, the name, an album flash  ·  slipped → the wave, “so close”, the meter  ·  fumbled → the pile moves, and the game says what moved', 20, 164, 104, 19, `font-size="13" font-weight="800" fill="${P.mute}"`)}
    <text x="20" y="200" font-size="13" font-weight="800" fill="${P.mute}">Decision ID: CMC-2026-___</text>
  </g>`;
  return plate({ num: 7, title: 'The Miss That Feels Good', sub: 'four out of five drops are a miss — make them the best part', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 8 — SIX NEW MACHINES
   ============================================================ */
/* a cat is a bear with pointy ears — cheap, and very effective */
function catHead(c, mood) {
  return `<g>
    <path d="M-30 -34 l4 -26 l22 14 z" fill="${c.fur}"/><path d="M-25 -32 l3 -16 l13 8 z" fill="${c.pad}"/>
    <path d="M30 -34 l-4 -26 l-22 14 z" fill="${c.fur}"/><path d="M25 -32 l-3 -16 l-13 8 z" fill="${c.pad}"/>
    <circle cx="0" cy="-8" r="28" fill="${c.fur}"/>
    <ellipse cx="0" cy="4" rx="15" ry="11.5" fill="${c.pad}"/>
    <path d="M0 -3 l4 3 h-8 z" fill="#ff7aa8"/>
    ${blush(-20, -1, 7)}${blush(20, -1, 7)}
    ${(MOODS[mood] || MOODS.happy).art()}
    <path d="M-34 2 h-12 M-34 8 h-11 M34 2 h12 M34 8 h11" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>
  </g>`;
}
function sheepHead(c, mood) {
  const puff = Array.from({ length: 11 }, (_, i) => {
    const a = i / 11 * Math.PI * 2;
    return `<circle cx="${(Math.cos(a) * 30).toFixed(1)}" cy="${(-8 + Math.sin(a) * 28).toFixed(1)}" r="12" fill="#fffdf8"/>`;
  }).join('');
  return `<g>${puff}<ellipse cx="-28" cy="-4" rx="8" ry="11" fill="${c.dark}" transform="rotate(-24 -28 -4)"/>
    <ellipse cx="28" cy="-4" rx="8" ry="11" fill="${c.dark}" transform="rotate(24 28 -4)"/>
    <circle cx="0" cy="-6" r="24" fill="${c.fur}"/>
    ${puff.replace(/r="12"/g, 'r="9"').replace(/cy="(-?[\d.]+)"/g, (m0, v) => `cy="${(parseFloat(v) - 16).toFixed(1)}"`)}
    <ellipse cx="0" cy="2" rx="18" ry="15" fill="${c.fur}"/>
    <ellipse cx="0" cy="4" rx="13" ry="9" fill="${c.pad}"/>
    ${blush(-16, 2, 6)}${blush(16, 2, 6)}
    <g transform="translate(0,4)">${(MOODS[mood] || MOODS.sleepy).art()}</g></g>`;
}
function spaceBear(c, mood) {
  return `<g>${bearFull(c, mood, { arms: 'up' })}
    <circle cx="0" cy="-10" r="40" fill="#dff2ff" opacity=".42" stroke="#bfe4ff" stroke-width="3"/>
    <path d="M-26 -30 q14 -12 30 -8" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
    <rect x="-14" y="28" width="28" height="9" rx="4.5" fill="#c9d4e8"/></g>`;
}

export function newMachines() {
  const IDEAS = [
    { name: 'Kitty Café Corner', emoji: '🐱', tag: 'eight cats, eight teacups',
      skin: { body: '#ffb37a', dark: '#ef8f4a', trim: '#ffe6cf', glass: '#fff7ef', light: '#ffeeda', marquee: '#e8762a' },
      gimmick: 'One cat wakes up now and then and bats the pile around while you are still aiming.',
      art: `<g transform="translate(66,86) scale(.52)">${catHead({ fur: '#ffd9b0', pad: '#fff3e4', dark: '#efb887' }, 'giggle')}</g>` },
    { name: 'Ocean Bubble Bay', emoji: '🌊', tag: 'sea cuties in slow motion',
      skin: { body: '#7fc8ff', dark: '#4d9ce8', trim: '#d9f0ff', glass: '#f0faff', light: '#e2f4ff', marquee: '#2a86d8' },
      gimmick: 'The pit is full of water. Everything falls slowly and drifts sideways. Patience beats speed here.',
      art: `<text x="66" y="96" text-anchor="middle" font-size="42">🐙</text><text x="34" y="76" font-size="22">🐟</text><text x="98" y="112" font-size="20">🐚</text>` },
    { name: 'Space Snugglers', emoji: '🚀', tag: 'gravity took the day off',
      skin: { body: '#9f8fe8', dark: '#7059c9', trim: '#e2dcff', glass: '#f4f1ff', light: '#eae4ff', marquee: '#5a41b8' },
      gimmick: 'Low gravity. Cuties float back down after a miss instead of thudding, so the pile never settles the same way twice.',
      art: `<g transform="translate(66,84) scale(.46)">${spaceBear(M[0].roster[1].c, 'wow')}</g>` },
    { name: 'Sleepy Sheep Meadow', emoji: '🐑', tag: 'shhh, they are napping',
      skin: { body: '#a8e0f5', dark: '#79bcd8', trim: '#e6f7ff', glass: '#f5fcff', light: '#ecf9ff', marquee: '#5aa8c9' },
      gimmick: 'The calm machine. Big soft sheep, gentle grip, slow music. Somewhere to go when the unicorn machine has been mean.',
      art: `<g transform="translate(66,88) scale(.48)">${sheepHead({ fur: '#fffdf8', pad: '#ffe4ef', dark: '#e8d8c8' }, 'sleepy')}</g>` },
    { name: 'Mushroom Forest', emoji: '🍄', tag: 'boing boing boing',
      skin: { body: '#ff8f8f', dark: '#e05c5c', trim: '#ffe0e0', glass: '#fff5f5', light: '#ffeaea', marquee: '#d13c3c' },
      gimmick: 'Bouncy mushroom cuties. Miss one and it springs, launching two more into the air. Chaos, but fair chaos.',
      art: `<text x="66" y="98" text-anchor="middle" font-size="44">🍄</text><text x="36" y="112" font-size="22">🌿</text><text x="98" y="80" font-size="20">🦔</text>` },
    { name: 'The Mystery Machine', emoji: '❓', tag: 'nobody knows what is in there',
      skin: { body: '#5b3a52', dark: '#3d2136', trim: '#c9a4ff', glass: '#2b1524', light: '#4a2740', marquee: '#c9a4ff' },
      gimmick: 'You can only see silhouettes through frosted glass. You find out what you caught when it lands in the chute.',
      art: `<g opacity=".55" transform="translate(66,90)">
        <g transform="translate(-16,0) scale(.3)"><g fill="#c9a4ff">${stuffyArt(M[0].roster[0]).replace(/fill="[^"]*"/g, 'fill="#c9a4ff"')}</g></g>
        <g transform="translate(24,6) scale(.28)"><g>${stuffyArt(M[1].roster[0]).replace(/fill="[^"]*"/g, 'fill="#c9a4ff"')}</g></g></g>` }
  ];

  const cards = IDEAS.map((d, i) => {
    const x = 44 + (i % 2) * 386, y = 268 + Math.floor(i / 2) * 232;
    return `<g transform="translate(${x},${y})">
      ${cabCard({ x: 0, y: 0, scale: .86, skin: d.skin, emoji: d.emoji, inner: d.art })}
      <text x="128" y="24" font-size="18" font-weight="800" fill="${d.skin.marquee}">${d.emoji} ${d.name}</text>
      <text x="128" y="46" font-size="13" font-weight="800" fill="${P.mute}">“${d.tag}”</text>
      <text x="128" y="72" font-size="12.5" font-weight="800" fill="${P.hot}">THE TWIST</text>
      ${lines(d.gimmick, 128, 92, 30, 18, `font-size="12.5" font-weight="600" fill="${P.deep}"`)}
      <rect x="128" y="164" width="216" height="24" rx="12" fill="#fff" stroke="${P.line}" stroke-width="2"/>
      <text x="236" y="181" text-anchor="middle" font-size="11.5" font-weight="800" fill="${P.mute}">8 cuties still to be designed</text>
    </g>`;
  }).join('');

  const body = `
  ${note(40, 150, 736, null, 'Six machines exist. These are six that could.', 'A new machine is not a new colour of cabinet — it is a new reason to play. Each of these changes one rule of the pit, so the arcade gets deeper instead of just longer. The cuties inside are not drawn yet, and that part is Ella’s job.', P.hot, 104, 100)}
  ${cards}
  <g transform="translate(40,956)">
    <rect x="0" y="0" width="736" height="42" rx="16" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="27" font-size="13.5" font-weight="800" fill="${P.mute}">Ella picks: which one is machine number 7 · what the eight cuties inside are called · which twist is worth building first</text>
  </g>`;
  return plate({ num: 8, title: 'Six New Machines to Dream About', sub: 'each one changes a rule, not just a colour', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 9 — THE CUTIE HOME
   ============================================================ */
export function cutieHome() {
  const T = M[0].roster, B = M[1].roster, D = M[2].roster, F = M[3].roster, C = M[4].roster, U = M[5].roster;
  const shelfItems = [T[0], B[0], D[3], F[2], C[4], U[7], T[7], B[6], C[6], U[2], D[6], F[6]];

  const shelf = (y, items, x0, gap) => `
    <rect x="${x0 - 12}" y="${y}" width="${gap * items.length + 12}" height="12" rx="6" fill="#e8b98a"/>
    <rect x="${x0 - 12}" y="${y}" width="${gap * items.length + 12}" height="5" rx="2.5" fill="#f5d3ad"/>
    ${items.map((v, i) => `<g transform="translate(${x0 + i * gap + gap / 2 - 6},${y - 4}) scale(.36)">${stuffyArt(v)}</g>`).join('')}`;

  const room = `<g>
    <!-- wall -->
    <rect x="0" y="0" width="472" height="392" rx="18" fill="#ffeef7"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 54 + 8}" y="0" width="22" height="392" fill="#ffe0ef" opacity=".7"/>`).join('')}
    <!-- window -->
    <rect x="316" y="34" width="118" height="106" rx="14" fill="#3b2a58"/>
    <rect x="316" y="34" width="118" height="106" rx="14" fill="none" stroke="#fff" stroke-width="6"/>
    <path d="M375 34 v106 M316 87 h118" stroke="#fff" stroke-width="5"/>
    ${[[336, 58], [404, 62], [352, 112], [416, 116], [366, 76]].map(s => sparkleArt(s[0], s[1], .5, '#fff6bd')).join('')}
    <circle cx="410" cy="56" r="13" fill="#fff6bd"/>
    <!-- fairy lights -->
    <path d="M8 22 q54 34 108 0 q54 34 108 0 q54 34 108 0 q40 26 132 4" stroke="#c9a4ff" stroke-width="2.6" fill="none"/>
    ${Array.from({ length: 13 }, (_, i) => `<circle cx="${18 + i * 34}" cy="${28 + (i % 2 ? 8 : 0)}" r="5.5" fill="${['#ff8fbe', '#ffd447', '#7fe0c4', '#7fd8ff'][i % 4]}"/>`).join('')}
    <!-- shelves -->
    ${shelf(178, shelfItems.slice(0, 6), 26, 46)}
    ${shelf(268, shelfItems.slice(6, 12), 26, 46)}
    <!-- bed -->
    <rect x="252" y="272" width="200" height="72" rx="16" fill="#c9a4ff"/>
    <rect x="252" y="272" width="200" height="26" rx="13" fill="#e2d0ff"/>
    <rect x="262" y="264" width="72" height="34" rx="14" fill="#fff"/>
    <g transform="translate(298,276) scale(.42)">${stuffyArt(U[7])}</g>
    <path d="M252 344 h200" stroke="#9a6ded" stroke-width="5" stroke-linecap="round"/>
    <text x="352" y="364" text-anchor="middle" font-size="12" font-weight="800" fill="${P.lilac}">your favourite sleeps here</text>
    <!-- beanbag + toybox -->
    <ellipse cx="86" cy="322" rx="52" ry="34" fill="#7fe0c4"/>
    <ellipse cx="86" cy="312" rx="44" ry="26" fill="#a4f0da"/>
    <g transform="translate(86,304) scale(.4)">${stuffyArt(T[4])}</g>
    <rect x="152" y="298" width="76" height="52" rx="10" fill="#ffab5c"/>
    <rect x="152" y="298" width="76" height="16" rx="8" fill="#ffc98a"/>
    <g transform="translate(176,294) scale(.26)">${stuffyArt(C[0])}</g>
    <g transform="translate(206,292) scale(.26)">${stuffyArt(D[0])}</g>
    <!-- rug -->
    <ellipse cx="150" cy="360" rx="118" ry="22" fill="#ff9ec9" opacity=".45"/>
  </g>`;

  const body = `
  ${note(40, 150, 736, null, 'You win forty-eight plushies. Right now they go in a list.', 'The album is a neat grid of squares, and a grid of squares is a spreadsheet. Give the cuties a room instead. Winning a plushie should mean somebody new moved in — a shelf gets fuller, the bed gets busier, the room slowly fills up with everyone you rescued.', P.hot, 104, 102)}

  <rect x="34" y="272" width="484" height="404" rx="22" fill="#fff" stroke="${P.hot}" stroke-width="4"/>
  <g transform="translate(40,278)">${room}</g>

  ${note(536, 272, 240, 1, 'Drag them anywhere', 'Pick a cutie up and put it on a shelf, on the bed, in the beanbag, on the rug. The room is saved, so it is still yours tomorrow.', P.hot, 32, 122)}
  ${note(536, 408, 240, 2, 'The room grows', 'Every machine you finish adds something: a window, a rug, fairy lights, a bunk bed, a second room.', P.lilac, 32, 116)}
  ${note(536, 538, 240, 3, 'Your favourite', 'Star one cutie. It sleeps on the bed, and it is the one that cheers for you at the machines.', P.mint, 32, 138)}

  ${note(40, 700, 356, 4, 'Why this is the big one', 'Every other idea in this binder makes a moment better. This one gives the whole game a point. Right now the reason to keep playing is “unlock the next machine”. After this, the reason is “Mochi is lonely on that shelf.” That is a much better reason, and it is the one an eight-year-old actually feels.', P.hot, 50, 176)}
  ${note(420, 700, 356, 5, 'What it needs from the code', 'The game already remembers every cutie you own in save.got. A room is that same list plus a position for each one — two numbers per plushie. Then a screen that draws them, and a finger that can drag them. No new art at all: the cuties are already drawn.', P.sky, 50, 176)}

  <g transform="translate(40,896)">
    <rect x="0" y="0" width="736" height="110" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="30" font-size="16" font-weight="800" fill="${P.hot}">Ella decides 🩷</text>
    ${lines('What is the room called — the Cutie Home, the Plushie House, the Cuddle Club? Is it one room that grows, or one room per machine? Can a doubled cutie be given away to a friend, or does everybody stay?', 20, 58, 104, 20, `font-size="13.5" font-weight="600" fill="${P.deep}"`)}
  </g>`;
  return plate({ num: 9, title: 'The Cutie Home', sub: 'where the plushies you win actually live', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 10 — THE STICKER SCRAPBOOK
   ============================================================ */
export function scrapbook() {
  const T = M[0].roster;
  const tape = (x, y, w, rot, c) => `<rect x="${x}" y="${y}" width="${w}" height="20" rx="3"
    fill="${c}" opacity=".72" transform="rotate(${rot} ${x + w / 2} ${y + 10})"/>`;

  const card = (v, x, y, found, date) => {
    const rare = v.rare;
    return `<g transform="translate(${x},${y})">
      <rect x="0" y="0" width="132" height="156" rx="8" fill="#fff" stroke="#e8d8e4" stroke-width="2"/>
      <rect x="9" y="9" width="114" height="104" rx="6" fill="#fff" stroke="${found ? P.line : '#c9bcc4'}" stroke-width="1.8" stroke-dasharray="${found ? '' : '6 5'}"/>
      ${found
        ? `<g transform="translate(66,78) scale(.62)">${stuffyArt(v)}</g>`
        : `<g transform="translate(66,78) scale(.62)" opacity=".22">${stuffyArt(v).replace(/fill="(?!none)[^"]*"/g, 'fill="#8b7b87"').replace(/stroke="(?!none)[^"]*"/g, 'stroke="#8b7b87"')}</g>
           <text x="66" y="72" text-anchor="middle" font-size="34" font-weight="800" fill="#a9959f">?</text>`}
      <text x="66" y="130" text-anchor="middle" font-size="12.5" font-weight="800" fill="${found ? P.hot : '#a9959f'}">${found ? v.name : '? ? ?'}</text>
      <text x="66" y="146" text-anchor="middle" font-size="9.5" font-weight="700" fill="${P.mute}">${found ? 'caught ' + date : 'not caught yet'}</text>
      ${found && rare ? `<g transform="translate(104,-6)"><path d="M0 0 h26 v34 l-13 -10 l-13 10 z" fill="${rare === 2 ? P.gold : P.lilac}"/>
        <text x="13" y="18" text-anchor="middle" font-size="13">${rare === 2 ? '👑' : '✨'}</text></g>` : ''}
      ${tape(-8, -8, 46, -14, '#ffd447')}
      ${tape(98, 142, 44, 9, '#7fe0c4')}
    </g>`;
  };

  const dates = ['3 Aug', '5 Aug', '9 Aug', '11 Aug', '14 Aug'];
  const cards = T.slice(0, 5).map((v, i) => card(v, 44 + (i % 5) * 148, 292, i < 4, dates[i])).join('') +
    T.slice(5, 8).map((v, i) => card(v, 44 + i * 148, 470, i === 0, '16 Aug')).join('');

  const body = `
  ${note(40, 150, 736, null, 'The album already exists. It just needs to look like a treasure.', 'Every cutie you have ever caught is remembered, including how many times. That is the making of a proper collector’s scrapbook: photo corners, sticky tape, the date you caught it, a ribbon for the rare ones, and a shadowy question mark for the ones still out there.', P.hot, 104, 102)}

  <rect x="26" y="266" width="764" height="384" rx="20" fill="#fff" stroke="#e8d8c8" stroke-width="3"/>
  <path d="M408 266 V650" stroke="#e8d8c8" stroke-width="3" stroke-dasharray="8 8"/>
  <text x="44" y="286" font-size="15" font-weight="800" fill="${P.hot}">🧸 Teddy Bear Bonanza — 5 of 8 found</text>
  ${cards}
  <g transform="translate(492,470)">
    <rect x="0" y="0" width="280" height="156" rx="12" fill="#fff" stroke="${P.line}" stroke-width="2.4"/>
    <text x="140" y="30" text-anchor="middle" font-size="14" font-weight="800" fill="${P.hot}">this machine</text>
    <rect x="26" y="44" width="228" height="22" rx="11" fill="#fff" stroke="${P.line}" stroke-width="1.8"/>
    <rect x="26" y="44" width="142" height="22" rx="11" fill="${P.hot}"/>
    <text x="140" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="${P.mute}">5 of 8 kinds · 11 caught · 34 tries</text>
    <text x="140" y="112" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.deep}">Still missing: Blueberry Bear,</text>
    <text x="140" y="130" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.deep}">Caramel Chip, Sir Roosevelt 👑</text>
    <text x="140" y="148" text-anchor="middle" font-size="11" font-weight="800" fill="${P.gold}">the legendary is still out there</text>
  </g>

  ${note(40, 674, 236, 1, 'Photo corners and tape', 'Every cutie sits in its own little polaroid, taped into the book. It looks like something a person made, not a menu.', P.hot, 32, 148)}
  ${note(292, 674, 236, 2, 'Shadows, not blanks', 'A cutie you have not caught shows as a grey shape with a question mark. You can see the shape you are hunting for.', P.lilac, 32, 148)}
  ${note(544, 674, 232, 3, 'The day you caught it', 'The book remembers the date. Months later that is the best part of the whole page.', P.mint, 30, 148)}

  <g transform="translate(40,834)">
    <rect x="0" y="0" width="736" height="164" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="30" font-size="16" font-weight="800" fill="${P.hot}">One honest warning ⚠️</text>
    ${lines('Showing the shape of a cutie you have not caught yet is a promise: it says “this one is really in there”. That promise has to stay true. If a legendary is one-in-fifteen, the book should not pretend it is around the corner. The game’s whole personality is that it is hard and it is honest — the scrapbook has to be honest too.', 20, 60, 104, 21, `font-size="14" font-weight="600" fill="${P.deep}"`)}
    <text x="20" y="146" font-size="13" font-weight="800" fill="${P.mute}">Ella decides: do the missing ones show as shadows, silhouette outlines, or stay completely secret?</text>
  </g>`;
  return plate({ num: 10, title: 'The Sticker Scrapbook', sub: 'the album becomes something worth showing people', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 11 — THE BOW BOUTIQUE
   ============================================================ */
export function boutique() {
  const T = M[0].roster;
  const hat = (x, y, s, c1, c2) => `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-22 0 h44 l-4 -6 h-36 z" fill="${c2}"/><path d="M-15 -6 q2 -24 15 -24 q13 0 15 24 z" fill="${c1}"/>
    <circle cx="0" cy="-32" r="7" fill="${c2}"/></g>`;
  const crown = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-24 6 l-4 -30 l12 10 l8 -18 l8 18 l12 -10 l-4 30 z" fill="#ffd447" stroke="#e8a417" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="0" cy="-6" r="4" fill="#ff5c9d"/></g>`;
  const glasses = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
    <circle cx="-13" cy="0" r="11" fill="#5b3a52" opacity=".85"/><circle cx="13" cy="0" r="11" fill="#5b3a52" opacity=".85"/>
    <path d="M-2 0 h4 M-24 -4 l-8 -3 M24 -4 l8 -3" stroke="#5b3a52" stroke-width="3" stroke-linecap="round"/></g>`;
  const scarf = (x, y, s, c) => `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-24 0 q24 14 48 0 l0 10 q-24 12 -48 0 z" fill="${c}"/><path d="M14 8 l14 26 l-12 4 l-10 -26 z" fill="${c}"/></g>`;
  const flower = (x, y, s, c) => `<g transform="translate(${x},${y}) scale(${s})">
    ${Array.from({ length: 5 }, (_, i) => `<ellipse cx="0" cy="-11" rx="6" ry="10" fill="${c}" transform="rotate(${i * 72})"/>`).join('')}
    <circle r="5.5" fill="#ffd447"/></g>`;

  const pegs = [
    ['bow', bowArt(0, 0, 1.1, '#ff5c9d', '#c9377f', -10), 'ribbon'],
    ['bow', bowArt(0, 0, 1.1, '#7fd8ff', '#3aabe8', -10), 'blue bow'],
    ['hat', hat(0, 12, 1, '#c9a4ff', '#8f5ce0'), 'party hat'],
    ['crown', crown(0, 4, 1), 'crown 👑'],
    ['glasses', glasses(0, 0, 1), 'star shades'],
    ['scarf', scarf(0, -8, 1, '#ff9a7a'), 'scarf'],
    ['flower', flower(0, 0, 1.2, '#ff8fbe'), 'flower'],
    ['bow', bowArt(0, 0, 1.1, '#ffd447', '#e8a417', -10), 'gold bow']
  ].map((p, i) => {
    const x = 92 + (i % 4) * 96, y = 356 + Math.floor(i / 4) * 104;
    return `<g transform="translate(${x},${y})">
      <circle r="34" fill="#fff" stroke="${P.line}" stroke-width="2.4"/>
      <circle cy="-38" r="4" fill="${P.mute}"/>
      ${p[1]}
      <text x="0" y="52" text-anchor="middle" font-size="11" font-weight="800" fill="${P.mute}">${p[2]}</text>
    </g>`;
  }).join('');

  const body = `
  ${note(40, 150, 736, null, 'You will catch Mochi eleven times. What are the other ten for?', 'Doubles pile up fast — the album already counts them with a little ×3. Turn them into a currency: trade three doubles for one accessory, and every cutie you own can be dressed. Nothing here changes a grab, a difficulty or an unlock. It is pure decoration, which is exactly the point.', P.hot, 104, 102)}

  <rect x="40" y="272" width="380" height="256" rx="20" fill="#fff" stroke="${P.hot}" stroke-width="3"/>
  <text x="230" y="298" text-anchor="middle" font-size="16" font-weight="800" fill="${P.hot}">THE PEGBOARD</text>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${60 + (i % 10) * 40}" cy="${316 + Math.floor(i / 10) * 66}" r="2" fill="${P.line}"/>`).join('')}
  ${pegs}

  <rect x="440" y="272" width="336" height="256" rx="20" fill="#fff" stroke="${P.lilac}" stroke-width="3"/>
  <text x="608" y="298" text-anchor="middle" font-size="16" font-weight="800" fill="${P.lilac}">THE FITTING ROOM</text>
  <g transform="translate(560,420) scale(1.5)">${bearFull(T[0].c, 'proud')}</g>
  ${crown(560, 364, 1.6)}
  ${glasses(560, 404, 1.35)}
  ${scarf(560, 446, 1.5, '#7fe0c4')}
  <g transform="translate(700,340)">
    <rect x="-52" y="-24" width="104" height="48" rx="14" fill="#fff" stroke="${P.line}" stroke-width="2"/>
    <text x="0" y="-2" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.hot}">Honeypaw ×11</text>
    <text x="0" y="16" text-anchor="middle" font-size="11.5" font-weight="700" fill="${P.mute}">10 spare · 3 tokens</text>
  </g>
  <text x="608" y="512" text-anchor="middle" font-size="12.5" font-weight="700" fill="${P.mute}">tap a thing on the pegboard to try it on</text>

  ${note(40, 552, 236, 1, 'Doubles become useful', 'Three spare copies of any cutie = one accessory token. Suddenly the eleventh Mochi is good news.', P.hot, 32, 140)}
  ${note(292, 552, 236, 2, 'It changes nothing else', 'A crown does not make a cutie easier to grab, rarer, or worth more. It is only for looking wonderful.', P.mint, 32, 140)}
  ${note(544, 552, 232, 3, 'It shows up everywhere', 'A dressed cutie wears its outfit in the pit, in the chute, in the room, in the album and in the parade.', P.lilac, 31, 140)}

  ${note(40, 712, 356, 4, 'The eight starter accessories', 'Two bows, a party hat, a crown, star shades, a scarf, a flower, a gold bow. Each one is about ten lines of drawing code and works on all forty-eight cuties, because every cutie is drawn from the same kind of shapes.', P.gold, 50, 148)}
  ${note(420, 712, 356, 5, 'Where they come from', 'Some are bought with tokens. Some are given for finishing a machine. One or two should be pure surprises — a thing that turns up because you played on a rainy Tuesday, and never explains itself.', P.peach, 50, 148)}

  <g transform="translate(40,880)">
    <rect x="0" y="0" width="736" height="122" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="30" font-size="16" font-weight="800" fill="${P.hot}">Ella decides 🩷</text>
    ${lines('How many spares make a token — three, or five? Can a cutie wear two things at once? Is there one accessory only Ella has, that nobody else can ever earn? (There should be.)', 20, 58, 104, 20, `font-size="13.5" font-weight="600" fill="${P.deep}"`)}
  </g>`;
  return plate({ num: 11, title: 'The Bow Boutique', sub: 'the doubles finally have a job', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 12 — THE BIGGEST PARADE EVER
   ============================================================ */
export function parade() {
  const hues = ['#ff8fbe', '#7fd8ff', '#a4f0a0', '#ffd447', '#c9a4ff', '#ff9a7a'];
  const float = (v, x, y, s, i) => {
    const h = hues[i % 6], h2 = hues[(i + 3) % 6];
    return `<g transform="translate(${x},${y}) scale(${s})">
      <g transform="translate(0,-52) scale(.8)">${stuffyArt(v)}</g>
      <path d="M-56 -8 q56 -26 112 0 l-7 20 q-49 -20 -98 0 z" fill="${h2}" opacity=".9"/>
      <path d="M-52 8 h104 l-9 30 h-86 z" fill="${h}"/>
      <path d="M-52 8 h104 l-3 8 h-98 z" fill="#fff" opacity=".55"/>
      ${[-40, -14, 12, 38].map((px, k) => `<path d="M${px - 10} -6 h20 l-10 15 z" fill="${k % 2 ? '#fff' : h2}"/>`).join('')}
      <circle cx="-30" cy="42" r="13" fill="#4a3044"/><circle cx="-30" cy="42" r="5.5" fill="#fff"/>
      <circle cx="30" cy="42" r="13" fill="#4a3044"/><circle cx="30" cy="42" r="5.5" fill="#fff"/>
      <rect x="-46" y="16" width="92" height="16" rx="8" fill="#fff" opacity=".92"/>
      <text x="0" y="28" text-anchor="middle" font-size="11" font-weight="800" fill="#b8437f">${v.name}</text>
      <!-- NEW: a balloon on every float -->
      <path d="M34 -14 q0 -30 -22 -46" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8"/>
      <ellipse cx="12" cy="-66" rx="13" ry="16" fill="${h2}"/><path d="M12 -50 l-4 6 h8 z" fill="${h2}"/>
    </g>`;
  };

  const floats = [M[0].roster[7], M[1].roster[0], M[2].roster[7], M[3].roster[7], M[4].roster[6], M[5].roster[7]]
    .map((v, i) => float(v, 92 + i * 128, 452, .74, i)).join('');

  const crowd = Array.from({ length: 14 }, (_, i) => {
    const src = [M[0], M[1], M[2], M[3], M[4], M[5]][i % 6];
    const v = src.roster[i % 8];
    return `<g transform="translate(${52 + i * 52},${556 + (i % 3) * 6}) scale(.30)">${stuffyArt(v)}</g>`;
  }).join('');

  const confetti = Array.from({ length: 46 }, (_, i) => {
    const r = rng(300 + i);
    const x = 40 + r() * 736, y = 190 + r() * 300;
    return `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="${(11 + r() * 12).toFixed(0)}" opacity=".9">${['💖', '⭐', '✨', '🌸', '🎀', '💫', '🌟'][i % 7]}</text>`;
  }).join('');

  const body = `
  <defs>
    <linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6d5c92"/><stop offset=".55" stop-color="#a684c2"/><stop offset="1" stop-color="#ffcde6"/></linearGradient>
  </defs>
  <rect x="26" y="196" width="764" height="410" rx="22" fill="url(#pSky)"/>
  <g clip-path="url(#pClip)">
    <clipPath id="pClip"><rect x="26" y="196" width="764" height="410" rx="22"/></clipPath>
    ${Array.from({ length: 40 }, (_, i) => { const r = rng(700 + i); return `<circle cx="${(40 + r() * 736).toFixed(0)}" cy="${(190 + r() * 200).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#fff" opacity="${(.4 + r() * .6).toFixed(2)}"/>`; }).join('')}
    <!-- fireworks -->
    ${[[180, 250, '#ffd447'], [640, 232, '#7fe0c4'], [412, 214, '#ff8fbe']].map(f =>
      `<g>${Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2;
        return `<path d="M${f[0]} ${f[1]} l${(Math.cos(a) * 44).toFixed(1)} ${(Math.sin(a) * 44).toFixed(1)}" stroke="${f[2]}" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>
                <circle cx="${(f[0] + Math.cos(a) * 50).toFixed(1)}" cy="${(f[1] + Math.sin(a) * 50).toFixed(1)}" r="3" fill="${f[2]}"/>`; }).join('')}</g>`).join('')}
    <!-- banner -->
    <path d="M56 300 q352 46 704 0 l0 54 q-352 46 -704 0 z" fill="#fff" opacity=".95"/>
    <text x="408" y="342" text-anchor="middle" font-size="30" font-weight="800" fill="${P.hot}">🎉 ELLA CLEARED THE WHOLE ARCADE 🎉</text>
    ${confetti}
    <!-- road -->
    <rect x="26" y="510" width="764" height="96" fill="#8f7189"/>
    <rect x="26" y="510" width="764" height="8" fill="#ab93a5"/>
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${40 + i * 50}" y="556" width="26" height="5" rx="2.5" fill="#ffd447" opacity=".7"/>`).join('')}
    ${floats}
    <g opacity=".92">${crowd}</g>
  </g>
  <rect x="26" y="196" width="764" height="410" rx="22" fill="none" stroke="${P.hot}" stroke-width="4"/>

  ${note(40, 626, 236, 1, 'It already happens', 'The parade is real and it is lovely. The floats roll, the cuties ride, the names are printed on the side. This page is about making it feel like the ending it is.', P.hot, 32, 150)}
  ${note(292, 626, 236, 2, 'Night, stars, fireworks', 'A dark sky makes the confetti and the plushies pop. Right now the parade happens in daylight, so the sparkles have nothing to sparkle against.', P.lilac, 32, 150)}
  ${note(544, 626, 232, 3, 'A cheering crowd', 'Every cutie you did not put on a float lines the road and waves. The bigger your collection, the bigger the crowd.', P.mint, 31, 150)}

  ${note(40, 794, 356, 4, 'Balloons, banners, a band', 'Each float gets a balloon. A banner across the sky says what you did. Three fireworks go off on a timer. The music the game already synthesises gets a marching-band version of the arcade tune — same notes, different instruments.', P.gold, 50, 148)}
  ${note(420, 794, 356, 5, 'The last parade is different', 'Finishing machine six should not look like finishing machine two. Save the fireworks, the banner and the full crowd for the final one, so the biggest moment in the game is visibly the biggest.', P.peach, 50, 148)}

  <g transform="translate(40,942)">
    <rect x="0" y="0" width="736" height="62" rx="16" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="26" font-size="13.5" font-weight="800" fill="${P.mute}">Ella decides: what the banner says · who leads the parade ·</text>
    <text x="20" y="48" font-size="13.5" font-weight="800" fill="${P.mute}">whether it can be watched again later from the album</text>
  </g>`;
  return plate({ num: 12, title: 'The Biggest Parade Ever', sub: 'the ending the game has already earned', label: 'PROPOSED', labelColor: P.hot, body });
}
