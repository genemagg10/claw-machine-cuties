/* build-art.mjs — writes the five art-direction mockups to docs/concepts/art */
import fs from 'node:fs';
import path from 'node:path';
import * as A from './artdirection.mjs';

const OUT = path.resolve('docs/concepts/art');
const SHEETS = [
  ['01-title-lobby',      A.mockLobby,  'Title & Arcade Lobby'],
  ['02-the-machine',      A.mockMachine, 'The Machine, Playing'],
  ['03-inside-the-glass', A.mockInside, 'Inside the Glass'],
  ['04-the-cutie-cast',   A.mockCast,   'The Cutie Cast'],
  ['05-cutie-home',       A.mockHome,   'Cutie Home & Album']
];
fs.mkdirSync(OUT, { recursive: true });
for (const [slug, fn, title] of SHEETS) {
  fs.writeFileSync(path.join(OUT, slug + '.svg'), fn());
  console.log('art  ', slug + '.svg', '·', title);
}
