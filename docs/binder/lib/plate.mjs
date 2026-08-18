/* ============================================================
   plate.mjs — the shared look of every concept plate in the
   Claw Machine Cuties development binder.
   One page = 816 x 1056 (US Letter portrait at 96dpi).
   ============================================================ */

export const PAGE = { w: 816, h: 1056 };

export const P = {
  ink:    '#553244',
  deep:   '#7a3f66',
  mute:   '#a4548a',
  pink:   '#ff5c9d',
  hot:    '#e0287f',
  soft:   '#ffd9ec',
  blush:  '#ffeef7',
  cream:  '#fffaf6',
  paper:  '#fff6fb',
  line:   '#f3c4de',
  mint:   '#7fe0c4',
  sky:    '#7fd8ff',
  lemon:  '#ffd447',
  lilac:  '#c9a4ff',
  peach:  '#ff9a7a',
  leaf:   '#8fd85f',
  gold:   '#e8a417'
};

export const FONT = `'Baloo 2','Nunito',ui-rounded,'SF Pro Rounded','Hiragino Maru Gothic ProN','Comic Sans MS',system-ui,sans-serif`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* --- word wrapping, because SVG will not do it for us --- */
export function wrap(text, perLine) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if (!cur.length) { cur = w; continue; }
    if ((cur + ' ' + w).length > perLine) { lines.push(cur); cur = w; }
    else cur += ' ' + w;
  }
  if (cur) lines.push(cur);
  return lines;
}

export function lines(text, x, y, perLine, lh, attrs) {
  const ls = wrap(text, perLine);
  return `<text x="${x}" y="${y}" ${attrs || ''}>` +
    ls.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join('') + `</text>`;
}

/* --- a numbered pin --- */
export function pin(n, x, y, c) {
  return `<g><circle cx="${x}" cy="${y}" r="15" fill="${c || P.hot}" stroke="#fff" stroke-width="3.5"/>
    <text x="${x}" y="${y + 6}" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">${n}</text></g>`;
}

/* --- dashed leader line from a pin to the thing it points at --- */
export function leader(x1, y1, x2, y2, c) {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c || P.hot}" stroke-width="2.6"
    stroke-dasharray="7 6" stroke-linecap="round" fill="none" opacity=".8"/>`;
}

/* --- a rounded note card with a heading and body copy --- */
export function note(x, y, w, n, title, body, c, perLine, fixedH) {
  const col = c || P.hot;
  const ls = wrap(body, perLine || 34);
  const h = fixedH || (40 + ls.length * 17 + 12);
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#fff" stroke="${col}" stroke-width="2.4" opacity=".97"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${col}" opacity=".07"/>
    ${n != null ? pin(n, x + 20, y + 20, col) : ''}
    <text x="${x + (n != null ? 42 : 14)}" y="${y + 26}" font-size="15.5" font-weight="800" fill="${col}">${esc(title)}</text>
    <text x="${x + 14}" y="${y + 48}" font-size="13" font-weight="600" fill="${P.deep}">
      ${ls.map((l, i) => `<tspan x="${x + 14}" dy="${i ? 17 : 0}">${esc(l)}</tspan>`).join('')}
    </text>
  </g>`;
}

/* --- little status label, same vocabulary as the Ingoizer binder --- */
export function chip(x, y, text, c) {
  const w = 16 + text.length * 8.4;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${c || '#fff'}" opacity=".95"/>
    <text x="${x + w / 2}" y="${y + 18}" text-anchor="middle" font-size="13" font-weight="800"
      fill="${c ? '#fff' : P.hot}" letter-spacing="1">${esc(text)}</text></g>`;
}

/* --- the dreamy arcade backdrop the game itself uses --- */
export function dreamBg(id, a, b, c) {
  return `<radialGradient id="${id}" cx="50%" cy="-8%" r="118%">
    <stop offset="0" stop-color="${a || '#fff3fb'}"/><stop offset=".34" stop-color="${b || '#ffdff2'}"/>
    <stop offset="1" stop-color="${c || '#e9c6ff'}"/></radialGradient>`;
}

/* --- checkerboard arcade floor in perspective --- */
export function arcadeFloor(y, h, w, a, b) {
  const rows = 9;
  let out = `<g clip-path="url(#floorClip)">`;
  out += `<rect x="0" y="${y}" width="${w}" height="${h}" fill="${a}"/>`;
  for (let r = 0; r < rows; r++) {
    const t0 = r / rows, t1 = (r + 1) / rows;
    const yy0 = y + h * t0 * t0, yy1 = y + h * t1 * t1;
    const spread0 = 0.5 + t0 * 1.9, spread1 = 0.5 + t1 * 1.9;
    for (let i = -7; i < 8; i++) {
      if ((i + r) % 2) continue;
      const x0 = w / 2 + i * (w / 14) * spread0, x1 = w / 2 + (i + 1) * (w / 14) * spread0;
      const x2 = w / 2 + (i + 1) * (w / 14) * spread1, x3 = w / 2 + i * (w / 14) * spread1;
      out += `<polygon points="${x0},${yy0} ${x1},${yy0} ${x2},${yy1} ${x3},${yy1}" fill="${b}" opacity="${(.25 + t0 * .4).toFixed(2)}"/>`;
    }
  }
  return out + `</g><clipPath id="floorClip"><rect x="0" y="${y}" width="${w}" height="${h}"/></clipPath>`;
}

/* ------------------------------------------------------------
   the page frame every plate shares
   ------------------------------------------------------------ */
export function plate({ num, kicker, title, sub, label, labelColor, body, defs, foot, tint }) {
  const t = tint || P.hot;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PAGE.w} ${PAGE.h}"
  width="${PAGE.w}" height="${PAGE.h}" font-family="${FONT}">
<defs>
  ${dreamBg('gDream')}
  <linearGradient id="gHead" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${P.pink}"/></linearGradient>
  ${defs || ''}
</defs>

<rect width="${PAGE.w}" height="${PAGE.h}" fill="${P.cream}"/>

<!-- header band -->
<path d="M0 0 H${PAGE.w} V96 Q${PAGE.w / 2} 122 0 96 Z" fill="url(#gHead)"/>
<text x="40" y="38" font-size="13" font-weight="800" fill="#ffd9ec" letter-spacing="2.4">${esc(kicker || 'CLAW MACHINE CUTIES · DEVELOPMENT BINDER')}</text>
<text x="40" y="72" font-size="31" font-weight="800" fill="#fff">${esc(title)}</text>
${num != null ? `<g><circle cx="${PAGE.w - 62}" cy="46" r="27" fill="#fff" opacity=".95"/>
  <text x="${PAGE.w - 62}" y="55" text-anchor="middle" font-size="24" font-weight="800" fill="${t}">${num}</text></g>` : ''}
${label ? chip(40, 104, label, labelColor || P.leaf) : ''}
${sub ? `<text x="${label ? 40 + 16 + label.length * 8.4 + 14 : 40}" y="122" font-size="15" font-weight="700" fill="${P.mute}">${esc(sub)}</text>` : ''}

${body}

<!-- footer -->
<path d="M0 ${PAGE.h - 42} H${PAGE.w} V${PAGE.h} H0 Z" fill="${P.soft}" opacity=".7"/>
<text x="40" y="${PAGE.h - 16}" font-size="12" font-weight="700" fill="${P.mute}">${esc(foot || 'Made for Ella — Creator, Owner & Game Boss')}</text>
<text x="${PAGE.w - 40}" y="${PAGE.h - 16}" text-anchor="end" font-size="12" font-weight="700" fill="${P.mute}">Plate ${num != null ? num : '—'}</text>
</svg>`;
}
