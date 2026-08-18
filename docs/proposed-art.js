/* ============================================================
   PROPOSED STYLE — "kawaii sticker" pass
   three additions over the current art:
   1. die-cut keyline    (separation from any background)
   2. soft interior shading + contact shadow  (volume, depth)
   3. a theme PROP per variant  (identity at thumbnail size)
   ============================================================ */
const INK2 = '#6b4a3d';

/* --- 1. the die-cut + shadow filters, defined once per document --- */
function stickerDefs() {
  return `<defs>
    <!-- rounded die-cut: blur the alpha then threshold it. feMorphology would
         square the corners; this keeps the outline as round as the art. -->
    <filter id="diecut" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b"/>
      <feComponentTransfer in="b" result="t"><feFuncA type="linear" slope="18" intercept="-1.4"/></feComponentTransfer>
      <feFlood flood-color="#fffaf3" result="c"/>
      <feComposite in="c" in2="t" operator="in" result="ol"/>
      <feMerge><feMergeNode in="ol"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- legendary: gold halo outside the cream keyline -->
    <filter id="diecutGold" x="-55%" y="-55%" width="210%" height="210%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="gb"/>
      <feComponentTransfer in="gb" result="gt"><feFuncA type="linear" slope="9" intercept="-.9"/></feComponentTransfer>
      <feFlood flood-color="#ffcf4a" result="gc"/>
      <feComposite in="gc" in2="gt" operator="in" result="glow"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b"/>
      <feComponentTransfer in="b" result="t"><feFuncA type="linear" slope="18" intercept="-1.4"/></feComponentTransfer>
      <feFlood flood-color="#fffaf3" result="c"/>
      <feComposite in="c" in2="t" operator="in" result="ol"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="ol"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="shadeR" cx=".32" cy=".28" r=".85">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#8a5a48" stop-opacity=".26"/>
    </radialGradient>
  </defs>`;
}

/* --- 2. shared pieces --- */
function eye2(x, y, r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r * .92}" ry="${r * 1.15}" fill="${INK2}"/>
    <ellipse cx="${x - r * .28}" cy="${y - r * .5}" rx="${r * .42}" ry="${r * .36}" fill="#fff"/>
    <circle cx="${x + r * .34}" cy="${y + r * .42}" r="${r * .2}" fill="#fff" opacity=".8"/>`;
}
function blush2(x, y, r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .7}" fill="#ff9db0" opacity=".42"/>
    <ellipse cx="${x}" cy="${y}" rx="${r * .55}" ry="${r * .38}" fill="#ff8098" opacity=".28"/>`;
}
function contactShadow(w) { return `<ellipse cx="0" cy="46" rx="${w}" ry="${w * .2}" fill="#c99a86" opacity=".38"/>`; }

/* --- 3. props: what actually makes a variant readable --- */
const PROPS = {
  none: () => '',
  strawberry: () => `<g transform="translate(2,-40)">
    <path d="M0 6 q-13 -2 -13 -11 q0 -10 13 -10 q13 0 13 10 q0 9 -13 11 z" fill="#ff6b7a"/>
    <path d="M-9 -13 q9 -5 18 0 q-4 -4 -9 -4 q-5 0 -9 4 z" fill="#ff9aa4" opacity=".8"/>
    ${[[-6,-9],[3,-11],[7,-4],[-3,-2],[-9,-3]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="1.1" ry="1.7" fill="#fff5d6"/>`).join('')}
    <path d="M-8 -14 q-6 -5 -1 -8 q4 5 9 4 q5 -6 10 -2 q-3 4 -8 6 z" fill="#7fc46b"/>
    <path d="M1 -22 q4 -5 8 -4" stroke="#5da84c" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`,
  mushroom: () => `<g transform="translate(0,-38)">
    <path d="M-24 2 q0 -20 24 -20 q24 0 24 20 q-24 6 -48 0 z" fill="#ef6a72"/>
    ${[[-14,-6,4.4],[4,-10,3.4],[14,-3,3],[-4,-2,2.4],[-20,-1,2.2]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[2]*.78}" fill="#fff6ea"/>`).join('')}
    <path d="M-19 -6 q7 -8 16 -8" stroke="#fff" stroke-width="3.4" opacity=".3" fill="none" stroke-linecap="round"/></g>`,
  leaf: () => `<g transform="translate(0,10)">
    ${[[-20,-4,-46],[-8,2,-16],[8,2,16],[20,-4,46]].map(l=>`
      <g transform="translate(${l[0]},${l[1]}) rotate(${l[2]})">
        <path d="M0 0 q-8 -9 0 -17 q8 8 0 17 z" fill="#8fcf72"/>
        <path d="M0 -1 v-14" stroke="#6fb356" stroke-width="1.3"/></g>`).join('')}
    <ellipse cx="0" cy="1" rx="13" ry="4.6" fill="#7fc46b"/>
    <ellipse cx="0" cy="0" rx="13" ry="4.6" fill="#a8dd90"/></g>`,
  flowers: () => `<g transform="translate(0,-34)">
    ${[[-20,2,'#ffb3d0'],[-7,-6,'#fff0a8'],[7,-7,'#ffb3d0'],[19,1,'#c9b8ff']].map(f=>`
      <g transform="translate(${f[0]},${f[1]})">
        ${[0,72,144,216,288].map(a=>`<ellipse rx="4.6" ry="3" fill="${f[2]}" transform="rotate(${a}) translate(4.4,0)"/>`).join('')}
        <circle r="2.4" fill="#ffe98a"/></g>`).join('')}</g>`,
  crown: () => `<g transform="translate(0,-40)">
    <path d="M-19 6 l-4 -20 l9 7 l6 -13 l6 13 l9 -7 l-4 20 z" fill="#ffd447" stroke="#e0a417" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="-14" cy="-13" r="2.6" fill="#ff7a9c"/><circle cx="14" cy="-13" r="2.6" fill="#7fd8ff"/>
    <circle cx="0" cy="-8" r="3" fill="#ff5c8a"/>
    <rect x="-19" y="2" width="38" height="5" rx="2.5" fill="#ffe58a"/></g>`,
  bow: (c) => `<g transform="translate(20,-32) rotate(-14)">
    <path d="M0 0 L-15 -9 Q-20 0 -15 9 Z" fill="${c}"/><path d="M0 0 L15 -9 Q20 0 15 9 Z" fill="${c}"/>
    <circle r="4.6" fill="#fff" opacity=".55"/><circle r="4.6" fill="${c}" opacity=".5"/></g>`
};

/* --- 4. the redrawn teddy: chibi proportions, soft volume, a prop --- */
function teddySticker(c, prop, propArg) {
  const P = PROPS[prop || 'none'];
  return `<g>
    ${contactShadow(30)}
    <!-- ears -->
    <circle cx="-22" cy="-30" r="12" fill="${c.dark}"/><circle cx="22" cy="-30" r="12" fill="${c.dark}"/>
    <circle cx="-22" cy="-29" r="6.4" fill="${c.pad}"/><circle cx="22" cy="-29" r="6.4" fill="${c.pad}"/>
    <!-- stubby limbs -->
    <ellipse cx="-24" cy="20" rx="10" ry="8.4" fill="${c.dark}" transform="rotate(-18 -24 20)"/>
    <ellipse cx="24" cy="20" rx="10" ry="8.4" fill="${c.dark}" transform="rotate(18 24 20)"/>
    <ellipse cx="-13" cy="38" rx="11.5" ry="8.6" fill="${c.dark}"/>
    <ellipse cx="13" cy="38" rx="11.5" ry="8.6" fill="${c.dark}"/>
    <ellipse cx="-13" cy="39" rx="6" ry="4.4" fill="${c.pad}"/><ellipse cx="13" cy="39" rx="6" ry="4.4" fill="${c.pad}"/>
    <!-- small body -->
    <ellipse cx="0" cy="24" rx="21" ry="17" fill="${c.fur}"/>
    <ellipse cx="0" cy="27" rx="12" ry="10" fill="${c.pad}" opacity=".8"/>
    <!-- big head -->
    <circle cx="0" cy="-9" r="30" fill="${c.fur}"/>
    <ellipse cx="0" cy="3" rx="15" ry="11" fill="${c.pad}" opacity=".9"/>
    <!-- soft volume -->
    <circle cx="0" cy="-9" r="30" fill="url(#shadeR)"/>
    <ellipse cx="0" cy="24" rx="21" ry="17" fill="url(#shadeR)"/>
    <ellipse cx="-13" cy="-25" rx="11" ry="7" fill="#fff" opacity=".32" transform="rotate(-24 -13 -25)"/>
    <!-- tiny features, clustered low -->
    ${eye2(-10, -8, 4.6)}${eye2(10, -8, 4.6)}
    <ellipse cx="0" cy="1" rx="4.2" ry="3.2" fill="${INK2}"/>
    <path d="M0 4 v2.6 M0 6.6 q-4 3.6 -6.6 .4 M0 6.6 q4 3.6 6.6 .4" stroke="${INK2}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${blush2(-19, 2, 7.4)}${blush2(19, 2, 7.4)}
    ${P ? P(propArg || c.bow) : ''}
  </g>`;
}


/* legendary garnish: a few sparkles that sit outside the keyline */
function legendGarnish() {
  return [[-34,-30,.62],[33,-20,.46],[-28,26,.4],[30,30,.52]].map(p =>
    `<path transform="translate(${p[0]},${p[1]}) scale(${p[2]})" fill="#ffd447"
      d="M0 -13 Q2 -2 13 0 Q2 2 0 13 Q-2 2 -13 0 Q-2 -2 0 -13 Z"/>`).join('');
}

/* ============================================================
   COSTUMES — the level above props.
   A prop sits ON the character; a costume CHANGES THE SILHOUETTE.
   Each returns { back, body, front }: layers drawn behind the
   character, replacing its body, and over the top.
   ============================================================ */
const COSTUMES = {
  /* wings — the biggest silhouette break available, and it costs nothing
     structurally because it lives entirely behind the body */
  wings: () => ({
    back: `<g>
      ${[['',''],['','scale(-1,1)']].map(([,tf])=>`<g transform="${tf}">
        <path d="M-18 -8 C-42 -34 -64 -20 -58 4 C-54 21 -30 24 -17 8 Z" fill="#dbe4ff"/>
        <path d="M-20 -4 C-38 -24 -54 -14 -50 3 C-47 15 -30 17 -19 5 Z" fill="#eef2ff"/>
        <path d="M-57 6 q7 8 15 8 q-9 3 -16 -1 z" fill="#c6d2f7"/>
        <path d="M-47 14 q7 7 14 6 q-8 4 -15 0 z" fill="#c6d2f7"/>
        <path d="M-36 19 q6 5 12 4 q-7 4 -13 0 z" fill="#c6d2f7"/>
        <path d="M-50 -8 q-6 8 -4 16 M-40 -14 q-6 9 -5 18" stroke="#b9c6f0" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      </g>`).join('')}
    </g>`, body: '', front: ''
  }),

  /* pumpkin — the body IS the costume: ribbed, wider than the base body,
     with a stem crown. Reads as a pumpkin at 40px. */
  pumpkin: () => ({
    back: '',
    body: `<g>
      <ellipse cx="0" cy="25" rx="27" ry="20" fill="#f08a3c"/>
      <ellipse cx="-15" cy="25" rx="10" ry="19" fill="#ffa köz" opacity="0"/>
      <ellipse cx="0" cy="25" rx="11" ry="20" fill="#ffa955"/>
      <ellipse cx="-17" cy="26" rx="8" ry="17" fill="#e0762e" opacity=".55"/>
      <ellipse cx="17" cy="26" rx="8" ry="17" fill="#e0762e" opacity=".55"/>
      <path d="M-20 14 q8 -5 0 0 M20 14 q-8 -5 0 0" stroke="#c96520" stroke-width="1.4" fill="none"/>
    </g>`,
    front: `<g transform="translate(0,-36)">
      <path d="M-3 4 q-2 -12 3 -16 q5 4 3 16 z" fill="#7a5a2e"/>
      <path d="M2 -8 q11 -9 19 -3 q-9 9 -19 3 z" fill="#7fc46b"/>
      <path d="M4 -7 q9 -6 14 -3" stroke="#5da84c" stroke-width="1.4" fill="none"/>
      <path d="M-3 -6 q-10 -6 -16 2" stroke="#5da84c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>`
  }),

  /* mushroom — a cap WIDER than the head, so the silhouette changes
     from "round bear" to "toadstool" */
  mushroom: () => ({
    back: '', body: '',
    front: `<g transform="translate(0,-30)">
      <path d="M-38 2 q0 -30 38 -30 q38 0 38 30 q-38 9 -76 0 z" fill="#ef5f68"/>
      <path d="M-38 2 q38 9 76 0 q-6 7 -14 7 q-6 -5 -12 -5 q-6 0 -12 5 q-8 0 -14 -7 z" fill="#fff4e6"/>
      ${[[-22,-9,5.6],[2,-14,4.6],[22,-5,4],[-8,-3,3.2],[-31,-2,3],[13,-13,3]]
        .map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[2]*.8}" fill="#fff6ea"/>`).join('')}
      <path d="M-30 -8 q10 -12 24 -12" stroke="#fff" stroke-width="4" opacity=".28" fill="none" stroke-linecap="round"/>
    </g>`
  }),

  /* bloom — flowers over the shoulders and crown, petals on the floor.
     Softens and widens the top half without a hard prop shape. */
  bloom: () => {
    const f = (x,y,s,c) => `<g transform="translate(${x},${y}) scale(${s})">
      ${[0,72,144,216,288].map(a=>`<ellipse rx="5.2" ry="3.4" fill="${c}" transform="rotate(${a}) translate(4.8,0)"/>`).join('')}
      <circle r="2.6" fill="#ffe98a"/></g>`;
    return {
      back: `<g opacity=".95">${f(-30,-14,1,'#ffc2d8')}${f(31,-16,.9,'#d8c4ff')}${f(-34,8,.8,'#fff0a8')}${f(34,6,.85,'#ffc2d8')}</g>`,
      body: '',
      front: `<g>${f(-19,-30,1,'#ffb3d0')}${f(-5,-37,1.1,'#fff0a8')}${f(11,-35,1,'#d8c4ff')}${f(23,-27,.85,'#ffb3d0')}
        <path d="M-24 -26 q10 -8 22 -9" stroke="#8fcf72" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        ${f(-30,44,.7,'#ffd2e2')}${f(28,45,.6,'#fff2c0')}</g>`
    };
  },

  /* hood — a fruit rind framing the face, the move from your second
     reference sheet. Changes the head outline, keeps the face. */
  hood: () => {
    /* an annular band hugging the head circle (cx 0, cy -9), open at the
       bottom so the face stays clear — a bonnet, not a mask */
    const CY = -9, A0 = 168, A1 = 12;                       // band ends, degrees
    const pt = (r, a) => [ (r * Math.cos(a * Math.PI / 180)).toFixed(2),
                           (CY + r * Math.sin(a * Math.PI / 180)).toFixed(2) ];
    const band = (rO, rI, fill) => {
      const [ax, ay] = pt(rO, A0), [bx, by] = pt(rO, A1);
      const [cx, cy] = pt(rI, A1), [dx, dy] = pt(rI, A0);
      return `<path d="M${ax} ${ay} A${rO} ${rO} 0 1 1 ${bx} ${by} L${cx} ${cy} A${rI} ${rI} 0 1 0 ${dx} ${dy} Z" fill="${fill}"/>`;
    };
    return {
      back: '', body: '',
      front: `<g>
        ${band(39, 35.5, '#4f9c3e')}
        ${band(35.5, 31, '#7fc46b')}
        ${band(31, 27, '#fff6ea')}
        ${band(27, 17, '#ff6b7a')}
        ${[[-19,-26],[-6,-32],[8,-31],[20,-24]].map(q =>
          `<ellipse cx="${q[0]}" cy="${q[1]}" rx="1.8" ry="2.6" fill="#4a2a2a" transform="rotate(${q[0]*1.5} ${q[0]} ${q[1]})"/>`).join('')}
        <path d="M-27 -26 q10 -14 25 -16" stroke="#fff" stroke-width="3.4" opacity=".24" fill="none" stroke-linecap="round"/>
      </g>`
    };
  }
};

/* the base bear, now able to wear a costume as well as carry a prop */
function teddyDressed(c, prop, costume) {
  const K = costume && COSTUMES[costume] ? COSTUMES[costume]() : { back:'', body:'', front:'' };
  const P = PROPS[prop || 'none'];
  const bodyArt = K.body || `<ellipse cx="0" cy="24" rx="21" ry="17" fill="${c.fur}"/>
      <ellipse cx="0" cy="27" rx="12" ry="10" fill="${c.pad}" opacity=".8"/>
      <ellipse cx="0" cy="24" rx="21" ry="17" fill="url(#shadeR)"/>`;
  return `<g>
    ${K.back}
    ${contactShadow(K.body ? 34 : 30)}
    <circle cx="-22" cy="-30" r="12" fill="${c.dark}"/><circle cx="22" cy="-30" r="12" fill="${c.dark}"/>
    <circle cx="-22" cy="-29" r="6.4" fill="${c.pad}"/><circle cx="22" cy="-29" r="6.4" fill="${c.pad}"/>
    <ellipse cx="-24" cy="20" rx="10" ry="8.4" fill="${c.dark}" transform="rotate(-18 -24 20)"/>
    <ellipse cx="24" cy="20" rx="10" ry="8.4" fill="${c.dark}" transform="rotate(18 24 20)"/>
    <ellipse cx="-13" cy="38" rx="11.5" ry="8.6" fill="${c.dark}"/>
    <ellipse cx="13" cy="38" rx="11.5" ry="8.6" fill="${c.dark}"/>
    <ellipse cx="-13" cy="39" rx="6" ry="4.4" fill="${c.pad}"/><ellipse cx="13" cy="39" rx="6" ry="4.4" fill="${c.pad}"/>
    ${bodyArt}
    <circle cx="0" cy="-9" r="30" fill="${c.fur}"/>
    <ellipse cx="0" cy="3" rx="15" ry="11" fill="${c.pad}" opacity=".9"/>
    <circle cx="0" cy="-9" r="30" fill="url(#shadeR)"/>
    <ellipse cx="-13" cy="-25" rx="11" ry="7" fill="#fff" opacity=".32" transform="rotate(-24 -13 -25)"/>
    ${K.front}
    ${eye2(-10, -8, 4.6)}${eye2(10, -8, 4.6)}
    <ellipse cx="0" cy="1" rx="4.2" ry="3.2" fill="${INK2}"/>
    <path d="M0 4 v2.6 M0 6.6 q-4 3.6 -6.6 .4 M0 6.6 q4 3.6 6.6 .4" stroke="${INK2}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${blush2(-19, 2, 7.4)}${blush2(19, 2, 7.4)}
    ${P ? P(c.bow) : ''}
  </g>`;
}
