import { plate, PAGE, P, FONT, note, pin, leader, chip, lines, wrap, dreamBg, arcadeFloor } from './lib/plate.mjs';
import { MACHINES, stuffyArt, keyArt, sparkleArt, bowArt, INK, eye, blush } from './lib/game-art.mjs';
import { bearHead, bearFull, MOODS, clawSVG, clawFace, mini, cabCard, pile, rng, bubble, lookEyes } from './lib/parts.mjs';
import { cabinetScene } from './lib/scene.mjs';
import { projX, projY, sOf } from './lib/game-cabinet.mjs';

const M = MACHINES;

/* ============================================================
   PLATE 1 — THE COVER
   ============================================================ */
export function cover() {
  const scene = cabinetScene(M[5], { seed: 41, count: 14, clawX: -18, clawZ: 62, clawY: 190, clawOpen: .8 });
  const floaters = [
    ['🧸', 70, 250, 30], ['🎀', 748, 232, 26], ['✨', 120, 470, 22], ['🦄', 720, 480, 28],
    ['💖', 60, 660, 24], ['⭐', 762, 660, 26], ['🍬', 96, 830, 22], ['🦋', 726, 812, 24],
    ['🐰', 44, 400, 22], ['🦕', 770, 380, 22]
  ].map(([e, x, y, s]) => `<text x="${x}" y="${y}" font-size="${s}" opacity=".85">${e}</text>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PAGE.w} ${PAGE.h}" width="${PAGE.w}" height="${PAGE.h}" font-family="${FONT}">
<defs>
  ${dreamBg('gDream')}
  <linearGradient id="gRibbon" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff5c9d"/><stop offset="1" stop-color="#c9a4ff"/></linearGradient>
  <radialGradient id="gGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${PAGE.w}" height="${PAGE.h}" fill="url(#gDream)"/>

<!-- sunburst -->
<g opacity=".3">${Array.from({ length: 36 }, (_, i) => {
    const a = (i * 10 - 90) * Math.PI / 180, a2 = ((i * 10) + 5 - 90) * Math.PI / 180;
    return i % 2 ? '' : `<polygon points="408,-40 ${408 + Math.cos(a) * 1500},${-40 + Math.sin(a) * 1500} ${408 + Math.cos(a2) * 1500},${-40 + Math.sin(a2) * 1500}" fill="#fff"/>`;
  }).join('')}</g>

${arcadeFloor(770, 286, PAGE.w, '#ffc9ea', '#ffe6f6')}
${floaters}

<!-- title -->
<g text-anchor="middle">
  <text x="408" y="118" font-size="19" font-weight="800" fill="#c9539a" letter-spacing="7">DEVELOPMENT BINDER</text>
  <g>
    <text x="408" y="200" font-size="70" font-weight="800" fill="#ef65ab">CLAW MACHINE</text>
    <text x="408" y="196" font-size="70" font-weight="800" fill="#fff">CLAW MACHINE</text>
    <text x="408" y="272" font-size="70" font-weight="800" fill="#ef65ab">CUTIES</text>
    <text x="408" y="268" font-size="70" font-weight="800" fill="#fff">CUTIES</text>
  </g>
  <text x="408" y="308" font-size="18" font-weight="700" fill="#a4548a">the game · the cuties · the big new ideas · the plan</text>
</g>

<!-- hero cabinet -->
<circle cx="408" cy="600" r="300" fill="url(#gGlow)"/>
<g transform="translate(408,318) scale(.545) translate(-320,0)">${scene}</g>

<!-- ribbon -->
<g transform="translate(408,860)">
  <path d="M-300 -34 h600 l-26 34 l26 34 h-600 l26 -34 z" fill="url(#gRibbon)"/>
  <path d="M-300 -34 h600 l-26 34 l26 34 h-600 l26 -34 z" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>
  <text x="0" y="9" text-anchor="middle" font-size="27" font-weight="800" fill="#fff">Version 2.0 — THE BIG CUTENESS UPDATE</text>
</g>

<!-- credit block -->
<g transform="translate(408,946)">
  <rect x="-292" y="-24" width="584" height="86" rx="26" fill="#fff" opacity=".92"/>
  <text x="0" y="6" text-anchor="middle" font-size="24" font-weight="800" fill="#e0287f">Made for Ella — Creator, Owner &amp; Game Boss</text>
  <text x="0" y="36" text-anchor="middle" font-size="14.5" font-weight="700" fill="#a4548a">Working master · August 2026 · Game checked at build 1c0c853 · Ella makes the final choices</text>
</g>
</svg>`;
}

/* ============================================================
   PLATE 2 — THE ARCADE RIGHT NOW  (CURRENT)
   ============================================================ */
export function arcadeNow() {
  const scene = cabinetScene(M[0], { seed: 12, count: 12, clawX: 40, clawZ: 84, clawY: 296, clawOpen: 1 });
  const cards = M.map((m, i) => {
    const r = m.roster;
    const inner = `<g transform="translate(40,104) scale(.30)">${stuffyArt(r[0])}</g>
      <g transform="translate(74,112) scale(.30)">${stuffyArt(r[4])}</g>
      <g transform="translate(96,100) scale(.26)">${stuffyArt(r[7])}</g>`;
    return `<g transform="translate(${44 + (i % 2) * 386},${642 + Math.floor(i / 2) * 114})">
      ${cabCard({ x: 0, y: 0, scale: .52, skin: m.skin, emoji: m.emoji, inner })}
      <text x="84" y="20" font-size="14.5" font-weight="800" fill="${m.skin.marquee}">${i + 1}. ${m.name}</text>
      <text x="84" y="41" font-size="11.5" font-weight="700" fill="${P.mute}">grip ${m.grip.toFixed(2)} · ${m.count} in the pit · 8 cuties</text>
      <text x="84" y="59" font-size="11.5" font-weight="700" fill="${P.mute}">5 normal · 2 ✨rare · 1 👑legendary</text>
      <text x="84" y="79" font-size="11.5" font-weight="700" fill="${P.deep}">“${m.tag}”</text>
    </g>`;
  }).join('');

  const body = `
  <g transform="translate(34,152) scale(.62)">${scene}</g>

  ${note(452, 166, 326, null, 'What the game is today', 'Six claw machines. Each one is stuffed with 8 different cuties you can collect — 48 in all. Win 3 from a machine and the third one arrives holding a golden key that opens the next machine, and the arcade throws you a parade.', P.hot, 46, 142)}
  ${note(452, 318, 326, null, 'It is one file', 'The whole arcade is one index.html. Every plushie is drawn with shapes in code. Every sound is made by the computer as it plays. Nothing is downloaded, nothing is installed. That is why it starts instantly.', P.lilac, 46, 142)}
  ${note(452, 470, 326, null, 'The grab is honest', 'Three things decide a grab: how centred you were, how buried the cutie was, and the machine’s grip. Nothing is faked and nothing is rigged. A miss still shoves the pile, so digging really works.', P.mint, 46, 122)}

  <text x="44" y="622" font-size="19" font-weight="800" fill="${P.hot}">The six machines that exist right now</text>
  ${cards}`;

  return plate({
    num: 2, title: 'The Arcade Right Now', sub: 'checked in the code at build 1c0c853',
    label: 'CURRENT', labelColor: P.mint, body
  });
}

/* ============================================================
   PLATE 3 — EVERYBODY LOOK UP  (PROPOSED)
   ============================================================ */
export function lookUp() {
  const t = M[0].roster;
  const tx = -30, tz = 62;
  const ring = `<ellipse cx="${projX(tx, tz).toFixed(1)}" cy="${projY(24, tz).toFixed(1)}"
      rx="${(64 * sOf(tz)).toFixed(1)}" ry="${(21 * sOf(tz)).toFixed(1)}"
      fill="#ff5c9d" fill-opacity=".14" stroke="#ff5c9d" stroke-width="5" stroke-dasharray="13 10"/>`;
  const scene = cabinetScene(M[0], { seed: 5, count: 12, clawX: tx, clawZ: tz, clawY: 205, clawOpen: 1, clawFace: 'aiming', pitExtra: ring });

  /* crop straight to the glass so the pit fills the panel */
  const K = .80, CX = 100, CY = 104;
  const cropped = `<g clip-path="url(#pitCrop)"><g transform="translate(${(40 - CX * K).toFixed(1)},${(172 - CY * K).toFixed(1)}) scale(${K})">${scene}</g></g>`;

  const zoom = `<g transform="translate(596,368)">
    <clipPath id="zoomClip"><circle r="180"/></clipPath>
    <circle r="180" fill="#fff"/>
    <path d="M-52 -180 L52 -180 L106 92 L-106 92 Z" fill="#fff6bd" opacity=".6" clip-path="url(#zoomClip)"/>
    <circle r="180" fill="none" stroke="${P.hot}" stroke-width="7"/>
    <g transform="translate(0,-116) scale(.98)">${clawSVG(1, 1, { face: 'aiming' })}</g>
    <g transform="translate(-112,70) scale(.80) rotate(-9)">${bearFull(t[2].c, 'hopeful')}</g>
    <g transform="translate(116,72) scale(.76) rotate(8)">${bearFull(t[3].c, 'wow')}</g>
    <g transform="translate(0,52) scale(1.08)">${bearFull(t[4].c, 'pickme', { arms: 'up' })}</g>
    <ellipse cx="0" cy="98" rx="72" ry="23" fill="${P.hot}" fill-opacity=".14" stroke="${P.hot}" stroke-width="5" stroke-dasharray="12 9"/>
    ${bubble(-158, -62, 132, 42, 'pick me!!', P.soft, 'br', 19)}
    <text x="118" y="-52" font-size="26">🌟</text>
  </g>`;

  const body = `
  <defs><clipPath id="pitCrop"><rect x="40" y="172" width="356" height="332" rx="14"/></clipPath></defs>
  <rect x="40" y="172" width="356" height="332" rx="14" fill="${P.blush}"/>
  ${cropped}
  <rect x="40" y="172" width="356" height="332" rx="14" fill="none" stroke="${P.hot}" stroke-width="4"/>
  <text x="218" y="528" text-anchor="middle" font-size="13.5" font-weight="800" fill="${P.mute}">inside the machine · every cutie is facing the claw</text>
  ${zoom}
  <text x="596" y="580" text-anchor="middle" font-size="13.5" font-weight="800" fill="${P.mute}">close up · the one you would actually get</text>

  ${note(40, 608, 176, 1, 'Eyes that follow', 'Every cutie turns its eyes toward the claw. Two dots that move. Suddenly the pit is full of friends instead of full of balls.', P.hot, 25, 176)}
  ${note(232, 608, 176, 2, 'The chosen one', 'Whoever the claw is really over stands up and throws its arms in the air. Now you always know what you are aiming at.', P.lilac, 25, 176)}
  ${note(424, 608, 176, 3, 'A ring on the floor', 'A dashed ring shows exactly where the prongs will land. Depth in the pit stops being a guess.', P.mint, 25, 176)}
  ${note(616, 608, 176, 4, 'Almost free', 'One new face layer. No new pictures, no new sounds, no new files. The cheapest cuteness in the whole binder.', P.gold, 25, 176)}

  <g transform="translate(40,838)">
    <rect x="0" y="0" width="736" height="140" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="30" font-size="16" font-weight="800" fill="${P.hot}">Ella decides 🩷</text>
    ${lines('Should the cuties look sleepy when nobody has dropped in a while? Should the chosen one say something out loud, or only sparkle? Should the floor ring be a dashed circle, a spotlight, or a little heart?', 20, 58, 108, 20, `font-size="13.5" font-weight="600" fill="${P.deep}"`)}
    <text x="20" y="124" font-size="13" font-weight="800" fill="${P.mute}">Decision ID: CMC-2026-___</text>
  </g>`;

  return plate({
    num: 3, title: 'Everybody Look Up!', sub: 'the cuties notice the claw — and notice you',
    label: 'PROPOSED', labelColor: P.hot, body, tint: P.hot
  });
}

/* ============================================================
   PLATE 4 — THE FEELINGS SHEET  (PROPOSED)
   ============================================================ */
export function feelings() {
  const c = M[0].roster[0].c;
  const order = ['happy', 'pickme', 'hopeful', 'wow', 'proud', 'giggle', 'love', 'shy', 'brave', 'worried', 'squish', 'dizzy', 'sleepy'];
  const when = {
    happy: 'sitting in the pit',
    pickme: 'the claw is right above it',
    hopeful: 'the claw is close but not close enough',
    wow: 'the claw starts to fall',
    proud: 'it just got caught!',
    giggle: 'you tickled the pile with a miss',
    love: 'it is your favourite cutie',
    shy: 'first time you ever see it',
    brave: 'it is the one holding the key',
    worried: 'the claw is slipping',
    squish: 'another cutie landed on it',
    dizzy: 'it just got tumbled around',
    sleepy: 'you have not dropped in a while'
  };
  const cells = order.map((k, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const centers = row < 2 ? [108, 258, 408, 558, 708] : [258, 408, 558];
    const x = centers[col], y = 358 + row * 202;
    return `<g transform="translate(${x},${y})">
      <rect x="-62" y="-92" width="124" height="180" rx="20" fill="#fff" stroke="${P.line}" stroke-width="2.4"/>
      <g transform="translate(0,-6) scale(.92)">${bearHead(c, k, k === 'squish' ? 1.18 : 1)}</g>
      <rect x="-58" y="34" width="116" height="26" rx="13" fill="${P.soft}"/>
      <text x="0" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="${P.hot}">${MOODS[k].label}</text>
      ${lines(when[k], 0, 74, 21, 14, `text-anchor="middle" font-size="10.5" font-weight="700" fill="${P.mute}"`)}
    </g>`;
  }).join('');

  const body = `
  ${note(40, 150, 736, null, 'One drawing, thirteen feelings', 'Every cutie is drawn the same way: a body, and then a face on top of it. If the face becomes its own little layer, one plushie can be happy, sleepy, proud, dizzy or in love without anybody drawing a single new plushie. Thirteen faces × forty-eight cuties = six hundred and twenty-four different little moments, out of about thirty lines of code.', P.hot, 104, 112)}
  ${cells}
  <g transform="translate(40,866)">
    <rect x="0" y="0" width="736" height="132" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="30" font-size="16" font-weight="800" fill="${P.hot}">Ella decides 🩷</text>
    ${lines('Which feelings make the cut? Are any missing — grumpy, hungry, ticklish, sparkly-because-it-is-your-birthday? And do bunnies, dinos, butterflies, candies and unicorns all get the same set, or does each kind get one feeling that only it can do?', 20, 58, 100, 20, `font-size="13.5" font-weight="600" fill="${P.deep}"`)}
  </g>`;

  return plate({ num: 4, title: 'The Cutie Feelings Sheet', sub: 'one face layer, and every plushie comes alive', label: 'PROPOSED', labelColor: P.hot, body });
}

/* ============================================================
   PLATE 5 — MEET CLAWDIA  (PROPOSED)
   ============================================================ */
export function clawdia() {
  const faces = [
    ['ready', 'Waiting', 'parked at the top, blinking, ready when you are'],
    ['aiming', 'Aiming', 'you are moving her — she squints at the pile'],
    ['squeeze', 'SQUEEZE!', 'the prongs close. She is trying so hard.'],
    ['proud', 'Got it!', 'she is carrying a cutie to the chute'],
    ['oops', 'Oh no', 'the cutie slipped. She feels terrible.'],
    ['sleepy', 'Snoozing', 'nobody has played for a minute']
  ];
  const cells = faces.map(([k, t, d], i) => {
    const x = 152 + (i % 3) * 250, y = 420 + Math.floor(i / 3) * 268;
    return `<g transform="translate(${x},${y})">
      <rect x="-108" y="-126" width="216" height="248" rx="24" fill="#fff" stroke="${P.line}" stroke-width="2.4"/>
      <circle cx="0" cy="-24" r="82" fill="${P.blush}"/>
      <g transform="translate(0,-46) scale(1.5)">${clawSVG(k === 'squeeze' ? .1 : k === 'proud' ? .2 : 1, 1, { face: k })}</g>
      <text x="0" y="76" text-anchor="middle" font-size="17" font-weight="800" fill="${P.hot}">${t}</text>
      ${lines(d, 0, 98, 30, 15, `text-anchor="middle" font-size="11.5" font-weight="700" fill="${P.mute}"`)}
    </g>`;
  }).join('');

  const body = `
  ${note(40, 152, 490, null, 'The claw is already the main character', 'You look at the claw the entire game. You cheer for it, you beg it, you shout at it. It is on screen more than any plushie — and right now it has no face and no name. Giving it one costs a nose, two eyes and a mouth, and turns every single drop into a little story about somebody trying their best.', P.hot, 50, 140)}
  <g transform="translate(560,158)">
    <rect x="0" y="0" width="216" height="128" rx="20" fill="${P.lemon}" opacity=".25"/>
    <rect x="0" y="0" width="216" height="128" rx="20" fill="none" stroke="${P.gold}" stroke-width="2.4"/>
    <text x="108" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="${P.gold}">NAME HER 🎀</text>
    <text x="108" y="60" text-anchor="middle" font-size="13" font-weight="700" fill="${P.deep}">Clawdia · Snippy · Grabby</text>
    <text x="108" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="${P.deep}">Pinchy · Miss Grabbers</text>
    <text x="108" y="108" text-anchor="middle" font-size="12.5" font-weight="800" fill="${P.mute}">Ella's name: _____________</text>
  </g>
  ${cells}
  <g transform="translate(40,832)">
    <rect x="0" y="0" width="736" height="146" rx="20" fill="${P.blush}" stroke="${P.line}" stroke-width="2.4"/>
    <text x="20" y="30" font-size="16" font-weight="800" fill="${P.hot}">Why this is the cheapest big idea in the binder</text>
    ${lines('The claw already changes between six states in the code: idle, falling, closing, lifting, travelling and returning. Those six states are exactly the six faces on this page. Nothing new has to be invented — the game already knows how the claw feels. It just is not showing it yet.', 20, 58, 112, 20, `font-size="13.5" font-weight="600" fill="${P.deep}"`)}
    <text x="20" y="130" font-size="13" font-weight="800" fill="${P.mute}">Decision ID: CMC-2026-___    ·    Page label: PROPOSED</text>
  </g>`;

  return plate({ num: 5, title: 'Meet Clawdia', sub: 'the claw gets a face, a name, and feelings', label: 'PROPOSED', labelColor: P.hot, body });
}
