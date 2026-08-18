/* ============================================================
   PROPOSED PIT STAGING — the "level design" half.
   Same cabinet geometry as the game; five changes:
     1. pit floor raised + deeper pile   (fills the box, no dead air)
     2. neutral cream interior           (characters read against it)
     3. contact shadow per plushie       (you can see depth = z)
     4. aim pool under the claw          (you can see where it will land)
     5. lit prize chute with a rim       (the goal is visible)
   ============================================================ */
function pitMock(mode, skin) {
  const clampP=(v,a,b)=>v<a?a:v>b?b:v;
  const cream = '#fdf4e8', creamD = '#f2e3d0';
  const s = skin;
  const proposed = mode === 'proposed';
  const wallFill = proposed ? cream : s.light;
  const floorFill = proposed ? creamD : s.glass;
  // pile layout: [x, y, z, variantIndex, prop] — y stacks the pile UP,
  // which is what fills the box and gives the claw something to reach into
  const pile = proposed
    ? [ // back row, deep
        [-155, 24,132,2,'none'],[-78, 24,138,5,'leaf'],[  4, 24,128,4,'none'],[ 84, 24,140,6,'none'],[158, 24,130,1,'none'],
        [-120, 26, 96,4,'none'],[-40, 26,100,6,'flowers'],[ 44, 26, 92,0,'none'],[124, 26, 98,3,'none'],
        // middle band, sitting on the back row
        [-140, 78,118,3,'none'],[-58, 80,124,1,'mushroom'],[ 26, 78,112,5,'none'],[108, 80,120,2,'none'],
        [-100,132,104,6,'none'],[ -8,134,108,0,'strawberry'],[ 78,132, 98,4,'none'],
        // the crown of the pile
        [ -50,182,110,7,'crown'],[ 34,178,116,3,'none'],
        // front row, closest to the glass
        [-150, 24, 18,0,'strawberry'],[-72, 24, 14,3,'none'],[ 10, 24, 26,1,'mushroom'],[ 92, 24, 16,5,'none'],[164, 24, 30,2,'none'],
        [-112, 76, 22,4,'flowers'],[ -26, 78, 20,6,'none'],[ 58, 76, 24,0,'none'],[142, 78, 28,3,'leaf'] ]
    : [ [-150,22, 20,0,'none'],[-70,22, 20,3,'none'],[ 10,22, 20,1,'none'],[ 92,22, 20,5,'none'],[158,22, 20,2,'none'],
        [-118,22, 72,4,'none'],[-38,22, 72,6,'none'],[ 46,22, 72,0,'none'],[126,22, 72,3,'none'],
        [-152,22,120,2,'none'],[-72,22,120,5,'none'],[  8,22,120,4,'none'],[ 86,22,120,6,'none'],[156,22,120,1,'none'] ];

  // the game's own projection
  const PITZ=150, FLOORY = proposed ? 470 : 500;
  const sOf = z => 1 - z*0.0017;
  const projX = (x,z) => 320 + x*sOf(z);
  const projY = (y,z) => FLOORY - y*sOf(z) - z*0.60;
  const R = MACHINES[0].roster;
  const claw = { x: 150, z: 40 };

  const bodies = pile.map(([x,y,z,vi,prop]) => {
    const sc = (34/40)*sOf(z)*(proposed?1.5:1.35);
    const px = projX(x,z), py = projY(y,z);
    const art = proposed
      ? `<g filter="url(#${prop==='crown'?'diecutGold':'diecut'})">${teddySticker(R[vi].c, prop)}${prop==='crown'?legendGarnish():''}</g>`
      : stuffyArt(R[vi]);
    const lift = clampP((y - 22) / 170, 0, 1);
    const shadow = proposed
      ? `<ellipse cx="${px}" cy="${(projY(y - 22, z) + 4).toFixed(1)}" rx="${(30*sOf(z)*1.5*(1-lift*.35)).toFixed(1)}"
           ry="${(9*sOf(z)*1.5*(1-lift*.35)).toFixed(1)}" fill="#a87a5f" opacity="${(0.32-lift*0.14).toFixed(2)}"/>` : '';
    return { z, html: `${shadow}<g transform="translate(${px.toFixed(1)},${py.toFixed(1)}) scale(${sc.toFixed(3)})">${art}</g>` };
  }).sort((a,b)=>b.z-a.z).map(o=>o.html).join('');

  const aim = proposed ? `
    <ellipse cx="${projX(claw.x,claw.z)}" cy="${projY(0,claw.z)}" rx="${46*sOf(claw.z)}" ry="${14*sOf(claw.z)}"
      fill="none" stroke="#ff4f92" stroke-width="4" stroke-dasharray="10 7" opacity=".85"/>
    <ellipse cx="${projX(claw.x,claw.z)}" cy="${projY(0,claw.z)}" rx="${46*sOf(claw.z)}" ry="${14*sOf(claw.z)}"
      fill="#ff4f92" opacity=".14"/>` : '';

  const chute = proposed ? `
    <ellipse cx="${projX(-166,6)}" cy="${projY(0,6)}" rx="${54*sOf(6)}" ry="${20*sOf(6)}" fill="#3a2030"/>
    <ellipse cx="${projX(-166,6)}" cy="${projY(0,6)-4}" rx="${54*sOf(6)}" ry="${20*sOf(6)}"
      fill="none" stroke="#ffd447" stroke-width="5"/>
    <ellipse cx="${projX(-166,6)}" cy="${projY(0,6)-4}" rx="${54*sOf(6)}" ry="${20*sOf(6)}"
      fill="none" stroke="#fff6cc" stroke-width="1.6"/>` : `
    <ellipse cx="${projX(-166,6)}" cy="${projY(0,6)}" rx="${54*sOf(6)}" ry="${20*sOf(6)}" fill="#4a2840"/>`;

  return `<svg viewBox="100 104 440 412" style="width:100%;height:auto;display:block">
    ${proposed ? stickerDefs() : ''}
    <defs><clipPath id="cl${mode}"><rect x="108" y="112" width="424" height="396" rx="12"/></clipPath></defs>
    <g clip-path="url(#cl${mode})">
      <polygon points="108,118 532,118 473,160 167,160" fill="${wallFill}"/>
      <rect x="167" y="160" width="306" height="${proposed?230:250}" fill="${wallFill}"/>
      <polygon points="108,118 167,160 167,${proposed?390:410} 115,${FLOORY}" fill="${wallFill}" opacity=".9"/>
      <polygon points="532,118 473,160 473,${proposed?390:410} 525,${FLOORY}" fill="${wallFill}" opacity=".76"/>
      <polygon points="115,${FLOORY} 525,${FLOORY} 473,${proposed?390:410} 167,${proposed?390:410}" fill="${floorFill}"/>
      ${proposed
        ? `<g opacity=".5">${[[210,200,'🎀'],[300,236,''],[400,196,''],[250,296,''],[372,312,''],[440,262,'']]
            .map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${7+(i%3)*3}" fill="${s.trim}" opacity=".5"/>`).join('')}</g>
           <rect x="167" y="160" width="306" height="230" fill="url(#vig)" opacity="0"/>`
        : `${[[210,200],[300,240],[400,195],[250,300],[370,320],[440,265],[190,350],[320,180]]
            .map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${8+(i%3)*3}" fill="${s.trim}" opacity=".55"/>`).join('')}
           <g opacity=".8"><rect x="242" y="302" width="156" height="46" rx="14" fill="${s.trim}" stroke="${s.body}" stroke-width="3"/>
           <text x="320" y="333" text-anchor="middle" font-size="21" font-weight="900" fill="${s.dark}">GRAB ME!</text></g>`}
      ${aim}
      ${bodies}
      ${chute}
    </g>
    <rect x="100" y="104" width="440" height="412" rx="20" fill="none" stroke="${s.trim}" stroke-width="15"/>
    <rect x="100" y="104" width="440" height="412" rx="20" fill="none" stroke="${s.dark}" stroke-width="4"/>
  </svg>`;
}
