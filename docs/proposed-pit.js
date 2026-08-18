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
  // pile layout: [x, y, z, colourIndex, buildIndex]
  const BUILDS = [
    { body:'sit',  ears:'round',face:'sparkle',dress:'none' },
    { body:'loaf', ears:'none', face:'happy',  dress:'none' },
    { body:'ball', ears:'none', face:'oh',     dress:'mushroom' },
    { body:'stand',ears:'tuft', face:'tongue', dress:'wings' },
    { body:'pear', ears:'side', face:'wink',   dress:'hood' },
    { body:'curl', ears:'flop', face:'sleep',  dress:'none' },
    { body:'loaf', ears:'tall', face:'sparkle',dress:'bubble' },
    { body:'pear', ears:'round',face:'tongue', dress:'shell' },
    { body:'sit',  ears:'tuft', face:'happy',  dress:'bloom' },
    { body:'ball', ears:'side', face:'sparkle',dress:'pumpkin' }
  ];
  const LEGEND = { body:'stand', ears:'round', face:'happy', dress:'crown' };

  const pile = proposed
    ? [ [-156, 24,134,2,1],[-78, 24,140,5,5],[  4, 24,130,4,0],[ 86, 24,142,6,8],[158, 24,132,1,2],
        [-122, 26, 98,4,7],[-40, 26,102,6,9],[ 46, 26, 94,0,1],[126, 26,100,3,3],
        [-142, 80,120,3,0],[-58, 82,126,1,2],[ 26, 80,114,5,6],[110, 82,122,2,5],
        [-102,136,106,6,8],[ -8,138,110,0,4],[ 80,136,100,4,1],
        [ -48,188,112,7,-1],[ 36,184,118,3,9],
        [-152, 24, 18,0,4],[-72, 24, 14,3,1],[ 12, 24, 26,1,3],[ 94, 24, 16,5,6],[166, 24, 30,2,0],
        [-114, 78, 22,4,9],[ -26, 80, 20,6,5],[ 60, 78, 24,0,7],[144, 80, 28,3,2] ]
    : [ [-150,22, 20,0,0],[-70,22, 20,3,0],[ 10,22, 20,1,0],[ 92,22, 20,5,0],[158,22, 20,2,0],
        [-118,22, 72,4,0],[-38,22, 72,6,0],[ 46,22, 72,0,0],[126,22, 72,3,0],
        [-152,22,120,2,0],[-72,22,120,5,0],[  8,22,120,4,0],[ 86,22,120,6,0],[156,22,120,1,0] ];

  // the game's own projection
  const PITZ=150, FLOORY = proposed ? 470 : 500;
  const sOf = z => 1 - z*0.0017;
  const projX = (x,z) => 320 + x*sOf(z);
  const projY = (y,z) => FLOORY - y*sOf(z) - z*0.60;
  const R = MACHINES[0].roster;
  const claw = { x: -66, z: 8 };

  const bodies = pile.map(([x,y,z,vi,bi]) => {
    const legend = bi < 0;
    const sc = (34/40)*sOf(z)*(proposed?1.25:1.35);
    const px = projX(x,z), py = projY(y,z);
    const art = proposed
      ? `<g filter="url(#diecut2${legend?'Gold':''})">${cutie(legend?LEGEND:BUILDS[bi], R[vi].c)}` +
        (legend ? [[-50,-40,.6],[48,-28,.46],[-44,36,.42],[46,40,.54]]
                  .map(q=>sparkleBit(q[0],q[1],q[2],'#ffd447')).join('') : '') + `</g>`
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
    ${proposed ? cutieDefs() : ''}
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
      ${bodies}
      ${chute}
      ${aim}
    </g>
    <rect x="100" y="104" width="440" height="412" rx="20" fill="none" stroke="${s.trim}" stroke-width="15"/>
    <rect x="100" y="104" width="440" height="412" rx="20" fill="none" stroke="${s.dark}" stroke-width="4"/>
  </svg>`;
}
