/* ============================================================
   scene.mjs — poses the REAL cabinet with a real-looking pile and
   the claw parked wherever a concept plate needs it. The maths
   (projection, cable, carriage) is copied from the game's render().
   ============================================================ */
import { buildCabinet, projX, projY, sOf, PITZ, CLAW_SCALE } from './game-cabinet.mjs';
import { pile, clawSVG } from './parts.mjs';

const lerp = (a, b, t) => a + (b - a) * t;

export function cabinetScene(m, o) {
  o = o || {};
  const seed = o.seed == null ? 7 : o.seed;
  const n = o.count == null ? m.count : o.count;
  const p = pile(m, seed, n, { moodFor: o.moodFor });

  const cz = o.clawZ == null ? 70 : o.clawZ;
  const cxw = o.clawX == null ? 0 : o.clawX;
  const cyw = o.clawY == null ? 250 : o.clawY;
  const cs = sOf(cz) * CLAW_SCALE * (o.clawScale || 1);
  const cx = projX(cxw, cz), cy = projY(cyw, cz);

  const t = cz / PITZ;
  const railY = lerp(122, 158, t);
  const xL = lerp(112, 167, t), xR = lerp(528, 473, t);

  const gantry = `<path d="M${xL} ${railY} H${xR} M${cx.toFixed(1)} ${railY.toFixed(1)} V${(cy - 30 * cs).toFixed(1)}"
      stroke="#9fadc7" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <g transform="translate(${cx.toFixed(1)},${railY.toFixed(1)}) scale(${cs.toFixed(3)})">
      <rect x="-24" y="-14" width="48" height="28" rx="9" fill="#dbe3f2" stroke="#9fadc7" stroke-width="3"/>
      <circle cx="-12" cy="0" r="4.2" fill="#ff8fbe"/><circle cx="12" cy="0" r="4.2" fill="#7fd8ff"/>
      <rect x="-8" y="-20" width="16" height="8" rx="4" fill="#9fadc7"/></g>`;

  const claw = `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) scale(${cs.toFixed(3)})">${
    clawSVG(o.clawOpen == null ? 1 : o.clawOpen, 1, { face: o.clawFace })}</g>`;

  return buildCabinet(m)
    .replace('<g id="pit"></g>', `<g id="pit">${p.svg}${o.pitExtra || ''}${claw}</g>`)
    .replace('<g id="gantry"></g>', `<g id="gantry">${gantry}</g>`);
}

/* where the claw ended up, in cabinet coordinates — for drawing callouts */
export function clawScreenPos(o) {
  const cz = o.clawZ == null ? 70 : o.clawZ;
  return { x: projX(o.clawX == null ? 0 : o.clawX, cz), y: projY(o.clawY == null ? 250 : o.clawY, cz) };
}
