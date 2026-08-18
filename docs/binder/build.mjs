/* build.mjs — writes every concept plate to docs/concepts/*.svg */
import fs from 'node:fs';
import path from 'node:path';
import * as A from './plates-a.mjs';
import * as B from './plates-b.mjs';

export const PLATES = [
  ['00-cover',                A.cover,        'Development Binder Cover'],
  ['01-arcade-now',           A.arcadeNow,    'The Arcade Right Now'],
  ['02-everybody-look-up',    A.lookUp,       'Everybody Look Up!'],
  ['03-feelings-sheet',       A.feelings,     'The Cutie Feelings Sheet'],
  ['04-meet-clawdia',         A.clawdia,      'Meet Clawdia'],
  ['05-cabinet-glow-up',      B.glowUp,       'Cabinet Glow-Up'],
  ['06-the-good-miss',        B.goodMiss,     'The Miss That Feels Good'],
  ['07-new-machines',         B.newMachines,  'Six New Machines to Dream About'],
  ['08-cutie-home',           B.cutieHome,    'The Cutie Home'],
  ['09-sticker-scrapbook',    B.scrapbook,    'The Sticker Scrapbook'],
  ['10-bow-boutique',         B.boutique,     'The Bow Boutique'],
  ['11-biggest-parade',       B.parade,       'The Biggest Parade Ever']
];

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = path.resolve('docs/concepts');
  fs.mkdirSync(out, { recursive: true });
  for (const [slug, fn, title] of PLATES) {
    fs.writeFileSync(path.join(out, slug + '.svg'), fn());
    console.log('plate  ', slug + '.svg', '·', title);
  }
  /* the binder itself — imported late so the plates exist on disk first */
  const { binderHTML } = await import('./binder.mjs');
  const fontCSS = fs.readFileSync(path.resolve('docs/binder/lib/fonts.css'), 'utf8');
  fs.writeFileSync(path.resolve('docs/binder/binder.html'), binderHTML(fontCSS));
  console.log('binder  docs/binder/binder.html');
}
