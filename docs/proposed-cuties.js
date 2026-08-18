/* ============================================================
   CUTIE SYSTEM v2 — physically distinct characters.
   A cutie is assembled from four independent slots:
      body  · the mass and pose          (6 plans)
      ears  · the head's outline         (6 plans)
      face  · the expression             (6 plans)
      dress · the costume on top         (8 plans)
   Any combination is a different creature, not a recolour.
   Design space: roughly -58..58 x, -64..54 y.
   ============================================================ */
const INK3 = '#6b4436';

/* ---------- shared bits ---------- */
function sparkleBit(x, y, s, c) {
  return `<path transform="translate(${x},${y}) scale(${s})" fill="${c || '#fff'}"
    d="M0 -12 Q1.8 -1.8 12 0 Q1.8 1.8 0 12 Q-1.8 1.8 -12 0 Q-1.8 -1.8 0 -12 Z"/>`;
}
function groundShadow(w, y) {
  return `<ellipse cx="0" cy="${y == null ? 48 : y}" rx="${w}" ry="${w * 0.19}" fill="#c08f78" opacity=".34"/>`;
}
const HX = 0, HY = -14, HR = 33;          // head centre + radius — bigger head = cuter

/* ============================================================
   BODIES — drawn behind the head. Each returns its own limbs.
   ============================================================ */
const BODIES = {
  /* a soft loaf with no legs at all — the cutest and most distinct */
  loaf: c => `
    ${groundShadow(30, 46)}
    <ellipse cx="-30" cy="24" rx="9" ry="11" fill="${c.dark}" transform="rotate(-12 -30 24)"/>
    <ellipse cx="30" cy="24" rx="9" ry="11" fill="${c.dark}" transform="rotate(12 30 24)"/>
    <path d="M-26 44 q-4 -34 26 -34 q30 0 26 34 q-26 6 -52 0 z" fill="${c.fur}"/>
    <ellipse cx="0" cy="30" rx="15" ry="13" fill="${c.pad}" opacity=".85"/>
    <path d="M-26 44 q-4 -34 26 -34 q30 0 26 34 q-26 6 -52 0 z" fill="url(#vol)"/>`,

  /* a near-perfect sphere with two little feet peeking out */
  ball: c => `
    ${groundShadow(27, 47)}
    <ellipse cx="-13" cy="45" rx="10" ry="6.5" fill="${c.dark}"/>
    <ellipse cx="13" cy="45" rx="10" ry="6.5" fill="${c.dark}"/>
    <ellipse cx="-13" cy="45.5" rx="5" ry="3.4" fill="${c.pad}"/>
    <ellipse cx="13" cy="45.5" rx="5" ry="3.4" fill="${c.pad}"/>
    <ellipse cx="-27" cy="24" rx="8.5" ry="10" fill="${c.dark}" transform="rotate(-16 -27 24)"/>
    <ellipse cx="27" cy="24" rx="8.5" ry="10" fill="${c.dark}" transform="rotate(16 27 24)"/>
    <circle cx="0" cy="24" r="24" fill="${c.fur}"/>
    <ellipse cx="0" cy="29" rx="14" ry="12" fill="${c.pad}" opacity=".85"/>
    <circle cx="0" cy="24" r="24" fill="url(#vol)"/>`,

  /* narrow shoulders, heavy bottom — sits like a beanbag */
  pear: c => `
    ${groundShadow(31, 47)}
    <ellipse cx="-27" cy="22" rx="8" ry="10" fill="${c.dark}" transform="rotate(-22 -27 22)"/>
    <ellipse cx="27" cy="22" rx="8" ry="10" fill="${c.dark}" transform="rotate(22 27 22)"/>
    <path d="M0 6 q16 0 22 20 q7 22 -22 22 q-29 0 -22 -22 q6 -20 22 -20 z" fill="${c.fur}"/>
    <ellipse cx="0" cy="32" rx="14" ry="12" fill="${c.pad}" opacity=".85"/>
    <path d="M0 6 q16 0 22 20 q7 22 -22 22 q-29 0 -22 -22 q6 -20 22 -20 z" fill="url(#vol)"/>`,

  /* sitting with both legs stuck straight out toward the player */
  sit: c => `
    ${groundShadow(33, 47)}
    <ellipse cx="-20" cy="43" rx="15" ry="9" fill="${c.dark}" transform="rotate(-8 -20 43)"/>
    <ellipse cx="20" cy="43" rx="15" ry="9" fill="${c.dark}" transform="rotate(8 20 43)"/>
    <ellipse cx="-25" cy="44" rx="7.5" ry="5" fill="${c.pad}"/>
    <ellipse cx="25" cy="44" rx="7.5" ry="5" fill="${c.pad}"/>
    <ellipse cx="-25" cy="20" rx="9" ry="10.5" fill="${c.dark}" transform="rotate(-20 -25 20)"/>
    <ellipse cx="25" cy="20" rx="9" ry="10.5" fill="${c.dark}" transform="rotate(20 25 20)"/>
    <ellipse cx="0" cy="24" rx="22" ry="19" fill="${c.fur}"/>
    <ellipse cx="0" cy="28" rx="13" ry="11" fill="${c.pad}" opacity=".85"/>
    <ellipse cx="0" cy="24" rx="22" ry="19" fill="url(#vol)"/>`,

  /* standing on two stubby legs, arms out — the only tall one */
  stand: c => `
    ${groundShadow(22, 53)}
    <rect x="-14" y="28" width="11" height="22" rx="5.5" fill="${c.dark}"/>
    <rect x="3" y="28" width="11" height="22" rx="5.5" fill="${c.dark}"/>
    <ellipse cx="-8.5" cy="51" rx="9" ry="5" fill="${c.dark}"/>
    <ellipse cx="8.5" cy="51" rx="9" ry="5" fill="${c.dark}"/>
    <ellipse cx="-8.5" cy="51.5" rx="4.6" ry="2.8" fill="${c.pad}"/>
    <ellipse cx="8.5" cy="51.5" rx="4.6" ry="2.8" fill="${c.pad}"/>
    <ellipse cx="-25" cy="14" rx="8" ry="11" fill="${c.dark}" transform="rotate(24 -25 14)"/>
    <ellipse cx="25" cy="14" rx="8" ry="11" fill="${c.dark}" transform="rotate(-24 25 14)"/>
    <rect x="-18" y="4" width="36" height="30" rx="15" fill="${c.fur}"/>
    <ellipse cx="0" cy="22" rx="11" ry="9" fill="${c.pad}" opacity=".85"/>
    <rect x="-18" y="4" width="36" height="30" rx="15" fill="url(#vol)"/>`,

  /* curled up asleep — a comma of fluff with the head resting on it */
  curl: c => `
    ${groundShadow(37, 45)}
    <path d="M-6 6 q34 -2 42 20 q6 16 -12 20 q-30 6 -50 -4 q-16 -10 -6 -22 q8 -12 26 -14 z" fill="${c.fur}"/>
    <ellipse cx="30" cy="38" rx="14" ry="9" fill="${c.dark}" transform="rotate(-14 30 38)"/>
    <ellipse cx="31" cy="38" rx="7.5" ry="4.8" fill="${c.pad}"/>
    <ellipse cx="6" cy="34" rx="18" ry="10" fill="${c.pad}" opacity=".75"/>
    <path d="M-6 6 q34 -2 42 20 q6 16 -12 20 q-30 6 -50 -4 q-16 -10 -6 -22 q8 -12 26 -14 z" fill="url(#vol)"/>`
};
/* how far to nudge the head for each body plan */
const HEAD_OFFSET = { loaf:[0,-2], ball:[0,0], pear:[0,-2], sit:[0,0], stand:[0,-10], curl:[-18,14] };

/* ============================================================
   EARS — drawn behind the head
   ============================================================ */
const EARS = {
  round: c => `<circle cx="-24" cy="-34" r="13" fill="${c.dark}"/><circle cx="24" cy="-34" r="13" fill="${c.dark}"/>
    <circle cx="-24" cy="-33" r="7" fill="${c.pad}"/><circle cx="24" cy="-33" r="7" fill="${c.pad}"/>`,

  flop: c => `<g transform="rotate(-16 -28 -18)"><ellipse cx="-32" cy="-4" rx="10" ry="26" fill="${c.dark}"/>
      <ellipse cx="-32" cy="-2" rx="5.2" ry="18" fill="${c.pad}"/></g>
    <g transform="rotate(16 28 -18)"><ellipse cx="32" cy="-4" rx="10" ry="26" fill="${c.dark}"/>
      <ellipse cx="32" cy="-2" rx="5.2" ry="18" fill="${c.pad}"/></g>`,

  tall: c => `<g transform="rotate(-10 -13 -30)"><ellipse cx="-13" cy="-50" rx="9.5" ry="26" fill="${c.dark}"/>
      <ellipse cx="-13" cy="-51" rx="4.8" ry="18" fill="${c.pad}"/></g>
    <g transform="rotate(10 13 -30)"><ellipse cx="13" cy="-50" rx="9.5" ry="26" fill="${c.dark}"/>
      <ellipse cx="13" cy="-51" rx="4.8" ry="18" fill="${c.pad}"/></g>`,

  /* wide round ears on the SIDES of the head, koala-style */
  side: c => `<circle cx="-34" cy="-16" r="15" fill="${c.dark}"/><circle cx="34" cy="-16" r="15" fill="${c.dark}"/>
    <circle cx="-35" cy="-16" r="8.4" fill="${c.pad}"/><circle cx="35" cy="-16" r="8.4" fill="${c.pad}"/>
    ${[[-44,-24],[-44,-8],[44,-24],[44,-8]].map(p=>`<path d="M${p[0]} ${p[1]} q${p[0]<0?-7:7} -2 ${p[0]<0?-9:9} 3" stroke="${c.dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}`,

  tuft: c => `<path d="M-27 -20 l-7 -24 l22 14 z" fill="${c.dark}"/><path d="M27 -20 l7 -24 l-22 14 z" fill="${c.dark}"/>
    <path d="M-25 -22 l-4 -14 l13 8 z" fill="${c.pad}"/><path d="M25 -22 l4 -14 l-13 8 z" fill="${c.pad}"/>`,

  none: () => ''
};

/* ============================================================
   FACES — drawn on the head, centred on (0,0) of the head group
   ============================================================ */
function eyeShine(x, y, r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r*.95}" ry="${r*1.2}" fill="${INK3}"/>
    <ellipse cx="${x - r*.3}" cy="${y - r*.52}" rx="${r*.46}" ry="${r*.4}" fill="#fff"/>
    <circle cx="${x + r*.36}" cy="${y + r*.44}" r="${r*.22}" fill="#fff" opacity=".85"/>`;
}
const FACES = {
  /* ^ ^ — closed, delighted */
  happy: () => `
    <path d="M-17 2 q6 -9 12 0" stroke="${INK3}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M5 2 q6 -9 12 0" stroke="${INK3}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M-5 9 q5 6 10 0" stroke="${INK3}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,

  /* big glossy eyes, tiny w mouth */
  sparkle: () => `
    ${eyeShine(-11, 2, 6)}${eyeShine(11, 2, 6)}
    <ellipse cx="0" cy="11" rx="3.4" ry="2.6" fill="${INK3}"/>
    <path d="M0 13.5 q-4 4 -6.6 .6 M0 13.5 q4 4 6.6 .6" stroke="${INK3}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    ${sparkleBit(22, -6, .34, '#fff6c8')}${sparkleBit(-24, 4, .26, '#fff6c8')}`,

  /* one eye shut */
  wink: () => `
    <path d="M-17 3 q6 -9 12 0" stroke="${INK3}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    ${eyeShine(11, 2, 6)}
    <path d="M-4 12 q6 7 11 -1" stroke="${INK3}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    ${sparkleBit(-24, -6, .3, '#fff6c8')}`,

  /* small round mouth — surprised */
  oh: () => `
    ${eyeShine(-12, 1, 5.4)}${eyeShine(12, 1, 5.4)}
    <ellipse cx="0" cy="13" rx="4.4" ry="5.4" fill="${INK3}"/>
    <ellipse cx="0" cy="15" rx="2.6" ry="2.8" fill="#ff8fa8" opacity=".8"/>`,

  /* asleep */
  sleep: () => `
    <path d="M-17 3 q6 8 12 0" stroke="${INK3}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M5 3 q6 8 12 0" stroke="${INK3}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M-3 12 q3 4 6 0" stroke="${INK3}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <text x="24" y="-10" font-size="13" font-weight="800" fill="${INK3}" opacity=".55"
      font-family="ui-rounded,system-ui,sans-serif">z</text>`,

  /* open smile, tiny tongue */
  tongue: () => `
    ${eyeShine(-12, 0, 5.6)}${eyeShine(12, 0, 5.6)}
    <path d="M-9 10 q9 11 18 0 z" fill="${INK3}"/>
    <path d="M-4 14 q4 6 8 0 z" fill="#ff8fa8"/>`
};
const BLUSH = (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.68}" fill="#ff90a8" opacity=".45"/>
  <ellipse cx="${x}" cy="${y}" rx="${r*.54}" ry="${r*.36}" fill="#ff7290" opacity=".26"/>`;

/* ============================================================
   DRESS — costumes. { back } goes behind everything,
   { over } goes on top of the finished character.
   ============================================================ */
const DRESS = {
  none: () => ({}),

  /* a pair of soft wings, wider than the whole body */
  wings: () => ({
    back: `<g>${['', 'scale(-1,1)'].map(tf => `<g transform="${tf}">
      <path d="M-16 -6 C-46 -38 -74 -20 -66 8 C-60 30 -30 30 -15 10 Z" fill="#dde5ff"/>
      <path d="M-19 -1 C-42 -26 -62 -12 -56 8 C-52 22 -30 22 -18 6 Z" fill="#f0f4ff"/>
      <path d="M-65 12 q9 10 18 9 q-11 5 -20 -1 z" fill="#c6d2f7"/>
      <path d="M-53 22 q8 8 16 7 q-10 5 -17 0 z" fill="#c6d2f7"/>
      <path d="M-40 28 q7 6 14 5 q-9 5 -15 0 z" fill="#c6d2f7"/>
    </g>`).join('')}</g>`
  }),

  /* the body wears a ribbed pumpkin shell */
  pumpkin: () => ({
    over: `<g>
      <path d="M0 8 q22 0 27 18 q6 22 -27 22 q-33 0 -27 -22 q5 -18 27 -18 z" fill="#ef8734"/>
      <ellipse cx="0" cy="30" rx="11" ry="19" fill="#ffab5c"/>
      <ellipse cx="-18" cy="31" rx="8" ry="16" fill="#d9691f" opacity=".5"/>
      <ellipse cx="18" cy="31" rx="8" ry="16" fill="#d9691f" opacity=".5"/>
      <path d="M0 8 q22 0 27 18 q6 22 -27 22 q-33 0 -27 -22 q5 -18 27 -18 z" fill="url(#vol)"/>
      <g transform="translate(0,-46)"><path d="M-3.4 6 q-2.4 -13 3.4 -17 q5.8 4 3.4 17 z" fill="#7a5a2e"/>
      <path d="M3 -6 q13 -10 22 -3 q-11 10 -22 3 z" fill="#7fc46b"/>
      <path d="M-4 -4 q-12 -7 -19 2" stroke="#5da84c" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
    </g>`
  }),

  /* a cap wider than the head — the outline stops being an animal */
  mushroom: () => ({
    over: `<g transform="translate(0,-42)">
      <path d="M-44 4 q0 -34 44 -34 q44 0 44 34 q-44 10 -88 0 z" fill="#ef5f68"/>
      <path d="M-44 4 q44 10 88 0 q-7 8 -16 8 q-7 -6 -14 -6 q-7 0 -14 6 q-9 0 -16 -8 z" fill="#fff4e6"/>
      ${[[-25,-10,6.4],[2,-16,5.2],[25,-6,4.6],[-9,-3,3.6],[-36,-2,3.4],[15,-15,3.4]]
        .map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[2]*.8}" fill="#fff6ea"/>`).join('')}
      <path d="M-34 -10 q12 -14 28 -14" stroke="#fff" stroke-width="4.4" opacity=".28" fill="none" stroke-linecap="round"/>
    </g>`
  }),

  /* buried in flowers, front and back */
  bloom: () => {
    const f = (x,y,s,col) => `<g transform="translate(${x},${y}) scale(${s})">
      ${[0,72,144,216,288].map(a=>`<ellipse rx="6" ry="4" fill="${col}" transform="rotate(${a}) translate(5.4,0)"/>`).join('')}
      <circle r="3" fill="#ffe98a"/></g>`;
    return {
      back: `<g>${f(-38,-18,1.1,'#ffc2d8')}${f(40,-20,1,'#d8c4ff')}${f(-42,10,.9,'#fff0a8')}${f(43,8,.95,'#ffc2d8')}</g>`,
      over: `<g>${f(-23,-38,1.1,'#ffb3d0')}${f(-6,-46,1.25,'#fff0a8')}${f(13,-44,1.1,'#d8c4ff')}${f(28,-34,.95,'#ffb3d0')}
        <path d="M-28 -34 q12 -10 26 -11" stroke="#8fcf72" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        ${f(-36,48,.75,'#ffd2e2')}${f(34,49,.65,'#fff2c0')}</g>`
    };
  },

  /* a watermelon rind bonnet — an annulus hugging the head, face left open */
  hood: () => {
    const CY = HY, A0 = 168, A1 = 12;
    const pt = (r,a) => [(r*Math.cos(a*Math.PI/180)).toFixed(2), (CY + r*Math.sin(a*Math.PI/180)).toFixed(2)];
    const band = (rO,rI,fill) => { const [ax,ay]=pt(rO,A0),[bx,by]=pt(rO,A1),[cx,cy]=pt(rI,A1),[dx,dy]=pt(rI,A0);
      return `<path d="M${ax} ${ay} A${rO} ${rO} 0 1 1 ${bx} ${by} L${cx} ${cy} A${rI} ${rI} 0 1 0 ${dx} ${dy} Z" fill="${fill}"/>`; };
    return { over: `<g>${band(42,38,'#4f9c3e')}${band(38,33.5,'#7fc46b')}${band(33.5,29,'#fff6ea')}${band(29,18,'#ff6b7a')}
      ${[[-21,-32],[-7,-39],[9,-38],[22,-30]].map(q=>
        `<ellipse cx="${q[0]}" cy="${q[1]}" rx="2" ry="2.9" fill="#4a2a2a" transform="rotate(${q[0]*1.5} ${q[0]} ${q[1]})"/>`).join('')}
      <path d="M-30 -32 q11 -15 27 -17" stroke="#fff" stroke-width="3.6" opacity=".24" fill="none" stroke-linecap="round"/></g>` };
  },

  /* a blown gum bubble, bigger than the head */
  bubble: () => ({
    over: `<g>
      <circle cx="26" cy="-40" r="26" fill="#ff9ec9" opacity=".55"/>
      <circle cx="26" cy="-40" r="26" fill="none" stroke="#ff7ab4" stroke-width="2.6"/>
      <ellipse cx="16" cy="-50" rx="9" ry="6" fill="#fff" opacity=".62" transform="rotate(-28 16 -50)"/>
      <circle cx="22" cy="-30" r="3" fill="#fff" opacity=".4"/>
    </g>`
  }),

  /* a spiral shell riding on the back */
  shell: () => ({
    back: `<g transform="translate(30,20)">
      <circle r="25" fill="#e0a066"/>
      <path d="M0 -25 A25 25 0 1 1 -0.1 -25 M0 -17 A17 17 0 1 0 0.1 -17 M0 -9 A9 9 0 1 1 -0.1 -9"
        fill="none" stroke="#c07f45" stroke-width="4.4" stroke-linecap="round"/>
      <circle r="25" fill="url(#vol)"/>
    </g>`
  }),

  /* legendary */
  crown: () => ({
    over: `<g transform="translate(0,-48)">
      <path d="M-21 7 l-4 -22 l10 8 l7 -15 l7 15 l10 -8 l-4 22 z" fill="#ffd447" stroke="#e0a417" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="-15" cy="-14" r="2.8" fill="#ff7a9c"/><circle cx="15" cy="-14" r="2.8" fill="#7fd8ff"/>
      <circle cx="0" cy="-9" r="3.2" fill="#ff5c8a"/>
      <rect x="-21" y="3" width="42" height="5.4" rx="2.7" fill="#ffe58a"/>
    </g>`
  })
};

/* ============================================================
   ASSEMBLER
   ============================================================ */
function cutieDefs() {
  return `<defs>
    <filter id="diecut2" x="-45%" y="-45%" width="190%" height="190%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="b"/>
      <feComponentTransfer in="b" result="t"><feFuncA type="linear" slope="20" intercept="-1.6"/></feComponentTransfer>
      <feFlood flood-color="#fffaf3" result="c"/>
      <feComposite in="c" in2="t" operator="in" result="ol"/>
      <feMerge><feMergeNode in="ol"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="diecut2Gold" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="gb"/>
      <feComponentTransfer in="gb" result="gt"><feFuncA type="linear" slope="9" intercept="-.9"/></feComponentTransfer>
      <feFlood flood-color="#ffcf4a" result="gc"/><feComposite in="gc" in2="gt" operator="in" result="glow"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="b"/>
      <feComponentTransfer in="b" result="t"><feFuncA type="linear" slope="20" intercept="-1.6"/></feComponentTransfer>
      <feFlood flood-color="#fffaf3" result="c"/><feComposite in="c" in2="t" operator="in" result="ol"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="ol"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="vol" cx=".33" cy=".26" r=".86">
      <stop offset=".42" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#8a5a48" stop-opacity=".28"/>
    </radialGradient>
  </defs>`;
}

function cutie(spec, c) {
  const d  = (DRESS[spec.dress] || DRESS.none)();
  const off = HEAD_OFFSET[spec.body] || [0, 0];
  const hx = HX + off[0], hy = HY + off[1];
  return `<g>
    ${d.back || ''}
    ${(BODIES[spec.body] || BODIES.sit)(c)}
    <g transform="translate(${hx},${hy})">
      ${(EARS[spec.ears] || EARS.round)(c)}
      <circle r="${HR}" fill="${c.fur}"/>
      <ellipse cx="0" cy="12" rx="17" ry="12" fill="${c.pad}" opacity=".9"/>
      <circle r="${HR}" fill="url(#vol)"/>
      <ellipse cx="-15" cy="-18" rx="12" ry="7.5" fill="#fff" opacity=".33" transform="rotate(-24 -15 -18)"/>
      ${(FACES[spec.face] || FACES.sparkle)()}
      ${BLUSH(-21, 9, 8)}${BLUSH(21, 9, 8)}
    </g>
    ${d.over || ''}
  </g>`;
}

function cutieSVG(spec, c, legendary) {
  return `<svg viewBox="-72 -80 144 148" aria-hidden="true">${cutieDefs()}
    <g filter="url(#diecut2${legendary ? 'Gold' : ''})">${cutie(spec, c)}
    ${legendary ? [[-50,-40,.6],[48,-28,.46],[-44,36,.42],[46,40,.54]]
      .map(p => sparkleBit(p[0], p[1], p[2], '#ffd447')).join('') : ''}</g></svg>`;
}
