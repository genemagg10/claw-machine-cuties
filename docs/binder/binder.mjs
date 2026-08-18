/* ============================================================
   binder.mjs — the Claw Machine Cuties Development Binder.
   Prose is written for an eight-year-old game boss. Tables are
   generated from the game's own data so they cannot drift.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { MACHINES, stuffySVG, RARE_LABEL, WINS_NEEDED } from './lib/game-art.mjs';

const RATES = {                       /* measured, from README.md */
  casual:  [48, 39, 31, 23, 18, 14],
  careful: [65, 55, 39, 31, 25, 20]
};

const plateSVG = slug => fs.readFileSync(path.resolve('docs/concepts', slug + '.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace('width="816" height="1056"', 'class="plate"');

const P = (slug) => `<div class="plateWrap">${plateSVG(slug)}</div>`;

/* ---------- generated tables ---------- */
function rosterTables() {
  return MACHINES.map((m, i) => `
  <h3>${m.emoji} Machine ${i + 1} — ${m.name}</h3>
  <p class="tag">“${m.tag}” · grip strength ${m.grip.toFixed(2)} · ${m.count} cuties in the pit · ${RATES.casual[i]}% of careless drops win, ${RATES.careful[i]}% of careful ones</p>
  <div class="cutieRow">
    ${m.roster.map(v => `<figure class="cutie">
      <div class="cutieArt">${stuffySVG(v)}</div>
      <figcaption><b>${v.name}</b>${v.rare ? `<span class="rare">${RARE_LABEL[v.rare]}</span>` : ''}</figcaption>
    </figure>`).join('')}
  </div>`).join('');
}

function difficultyTable() {
  return `<table>
    <thead><tr><th>Machine</th>${MACHINES.map((m, i) => `<th>${i + 1}</th>`).join('')}</tr></thead>
    <tbody>
      <tr><th>grip strength</th>${MACHINES.map(m => `<td>${m.grip.toFixed(2)}</td>`).join('')}</tr>
      <tr><th>cuties in the pit</th>${MACHINES.map(m => `<td>${m.count}</td>`).join('')}</tr>
      <tr><th>careless aim wins</th>${RATES.casual.map(r => `<td>${r}%</td>`).join('')}</tr>
      <tr><th>careful aim wins</th>${RATES.careful.map(r => `<td>${r}%</td>`).join('')}</tr>
    </tbody></table>`;
}

/* ---------- a blank worksheet master ---------- */
function master(title, blurb, fields, checks) {
  return `<section class="master">
    <div class="masterTop">CREATOR'S WORKSHOP · BLANK MASTER · PRINT A COPY BEFORE WRITING</div>
    <h2>${title}</h2>
    <p class="blurb">${blurb}</p>
    <div class="mHead"><span>ELLA:</span><span>DATE:</span><span>GAME VERSION:</span><span>PAGE LABEL:</span></div>
    <div class="fields">
      ${fields.map(f => `<div class="field ${f[2] || ''}"><b>${f[0]}</b><i>${f[1]}</i><div class="rule"></div><div class="rule"></div>${f[2] === 'big' ? '<div class="rule"></div><div class="rule"></div>' : ''}</div>`).join('')}
    </div>
    <div class="nextStep">NEXT STEP &nbsp; ☐ keep thinking &nbsp; ☐ draw it &nbsp; ☐ build a tiny test &nbsp; ☐ play it &nbsp; ☐ decide
      ${checks ? `<br><span class="checks">${checks}</span>` : ''}
      <span class="decid">ELLA'S DECISION ID: CMC-2026-____</span></div>
  </section>`;
}

export function binderHTML(fontCSS) {
return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Claw Machine Cuties — Development Binder</title>
<style>
${fontCSS}
@page { size: letter; margin: 0; }
:root{
  --ink:#553244; --deep:#7a3f66; --mute:#a4548a; --hot:#e0287f; --pink:#ff5c9d;
  --soft:#ffd9ec; --blush:#ffffff; --cream:#ffffff; --line:#f3c4de;
  --mint:#7fe0c4; --sky:#7fd8ff; --lemon:#ffd447; --lilac:#c9a4ff; --gold:#e8a417; --peach:#ff9a7a;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff}
body{font-family:'Nunito',ui-rounded,system-ui,sans-serif;color:var(--ink);font-size:10.4pt;line-height:1.4}
h1,h2,h3,h4,.tabno,.masterTop{font-family:'Baloo 2','Nunito',ui-rounded,system-ui,sans-serif}

body{counter-reset:pg}
.page{counter-increment:pg}
.page{width:8.5in;height:11in;padding:0.54in 0.6in 0.62in;position:relative;page-break-after:always;overflow:hidden;background:var(--cream)}
.page:last-child{page-break-after:auto}
.page::after{content:attr(data-foot) " · Page " counter(pg);position:absolute;left:0.6in;bottom:0.28in;font-size:8.4pt;font-weight:700;color:var(--mute)}
.page::before{content:attr(data-run);position:absolute;left:0.6in;right:0.6in;top:0.26in;font-size:7.8pt;font-weight:800;letter-spacing:1.6px;color:var(--mute);border-bottom:2px solid var(--line);padding-bottom:5px}
.page.plateOnly{padding:0;background:#fff}
.page.plateOnly::after,.page.plateOnly::before{content:none;display:none}
.plateWrap{width:8.5in;height:11in;display:block}
.plate{width:8.5in;height:11in;display:block}

h1{font-size:25pt;color:var(--hot);margin:.24in 0 .05in;line-height:1.04}
h2{font-size:15pt;color:var(--hot);margin:.17in 0 .04in;line-height:1.12}
h3{font-size:11.6pt;color:var(--deep);margin:.12in 0 .03in}
h4{font-size:10.4pt;color:var(--pink);margin:.14in 0 .02in;text-transform:uppercase;letter-spacing:.6px}
p{margin:.045in 0 .07in}
ul,ol{margin:.05in 0 .1in .22in;padding:0}
li{margin:.026in 0}
b{color:var(--deep)}
a{color:var(--hot)}

.kicker{font-size:9pt;font-weight:800;letter-spacing:2.4px;color:var(--mute);text-transform:uppercase}
.lede{font-size:11.4pt;font-weight:700;color:var(--deep)}
.tabno{position:absolute;right:0.44in;top:0.36in;width:.62in;height:.62in;border-radius:50%;
  background:var(--hot);color:#fff;font-size:17pt;font-weight:800;display:grid;place-items:center}

.label{display:inline-block;border-radius:999px;padding:3px 12px;font-size:8.4pt;font-weight:800;
  letter-spacing:1.2px;color:#fff;background:var(--hot);vertical-align:middle}
.label.current{background:var(--mint);color:#175f4c}
.label.proposed{background:var(--hot)}
.label.workshop{background:var(--lilac)}

.box{border:2px solid var(--line);border-left:7px solid var(--line);background:#fff;border-radius:12px;padding:8px 12px;margin:.08in 0}
.box.hot{border-color:var(--hot);background:#fff}
.box.mint{border-color:var(--mint);background:#fff}
.box.lemon{border-color:var(--gold);background:#fff}
.box.sky{border-color:var(--sky);background:#fff}
.box h4{margin-top:0}
.box p:last-child{margin-bottom:0}

table{border-collapse:collapse;width:100%;margin:.07in 0;font-size:8.9pt}
th,td{border:0;border-bottom:1.3px solid var(--line);padding:4px 7px 3.5px;text-align:left;vertical-align:top}
thead th{background:#fff;color:var(--hot);font-weight:800;border-bottom:2.6px solid var(--hot)}
tbody th{background:#fff;font-weight:800;color:var(--deep);width:1.5in;padding-left:0}
td{text-align:center}
table.left td{text-align:left}

.two{display:grid;grid-template-columns:1fr 1fr;gap:.16in}
.three{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.13in}

.cutieRow{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;margin:.06in 0 .12in}
.cutie{margin:0;text-align:center}
.cutieArt svg{width:100%;height:auto;display:block}
.cutie figcaption{font-size:7.1pt;font-weight:800;color:var(--deep);line-height:1.18}
.rare{display:block;font-size:6.8pt;color:var(--gold)}
.tag{font-size:8.6pt;font-weight:700;color:var(--mute);margin:0 0 .04in}

.master{height:100%;display:flex;flex-direction:column}
.masterTop{font-size:8pt;font-weight:800;letter-spacing:1.8px;color:var(--lilac);background:#fff;
  border:2px solid var(--lilac);border-radius:999px;padding:3px 13px;display:inline-block;align-self:flex-start}
.master h2{margin:.12in 0 .03in}
.blurb{font-size:10.4pt;font-weight:700;color:var(--mute);margin:0 0 .08in}
.mHead{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:8.2pt;font-weight:800;
  color:var(--mute);border-top:2px solid var(--line);border-bottom:2px solid var(--line);padding:6px 0;margin-bottom:.1in}
.fields{display:grid;grid-template-columns:1fr 1fr;gap:.1in;flex:1 1 auto;grid-auto-rows:1fr}
.field{border:2px solid var(--line);border-radius:12px;padding:6px 9px 4px;background:#fff;display:flex;flex-direction:column;min-height:0}
.field.big{grid-column:1 / -1}
.field b{display:block;font-size:8.8pt;color:var(--hot);font-weight:800}
.field i{display:block;font-size:7.6pt;font-style:normal;color:var(--mute);font-weight:700;margin-bottom:5px}
.rule{border-bottom:1.4px dashed var(--line);height:.17in;flex:0 0 auto}
.field .rule:last-child{flex:1 1 auto}
.nextStep{margin-top:.1in;border-top:2px solid var(--line);padding-top:6px;font-size:8.6pt;font-weight:800;color:var(--mute)}
.checks{display:inline-block;margin-top:3px;color:var(--deep)}
.decid{float:right}

.toc td:first-child{width:.6in;text-align:center;font-weight:800;color:var(--hot)}
.toc td{text-align:left}
</style></head><body>

<!-- =========================================================
     COVER
     ========================================================= -->
<div class="page plateOnly">${P('00-cover')}</div>

<!-- =========================================================
     TAB 00 — HOW TO USE THIS BINDER
     ========================================================= -->
<div class="page" data-run="CLAW MACHINE CUTIES · DEVELOPMENT BINDER · GAME · CUTIES · IDEAS · CODE" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">00</div>
  <p class="kicker">Tab 00</p>
  <h1>How to Use This Binder</h1>
  <p class="lede">This binder holds three different things, and it keeps them apart on purpose: the game as it is <b>right now</b>, <b>ideas</b> for the next version, and <b>Ella's choices</b>.</p>

  <div class="box hot">
    <h4>Ella is the game boss 👑</h4>
    <p>Claw Machine Cuties is Ella's game. She invented it, she owns it, and she is the one who decides what it becomes. Everybody else — grown-ups, helpers, computers — makes suggestions. Ella makes decisions. If a page in this binder and Ella disagree, Ella wins and the page gets rewritten.</p>
  </div>

  <h2>The label on every page</h2>
  <p>Every page in this binder gets one of these six stickers, so nobody ever mixes up a dream with a fact:</p>
  <table class="left"><tbody>
    <tr><th>CURRENT</th><td>This is really in the game today. Somebody checked the code to make sure.</td></tr>
    <tr><th>PROPOSED</th><td>This is an idea. It is waiting for Ella to say yes or no. It is not real yet.</td></tr>
    <tr><th>APPROVED</th><td>Ella said yes! Nobody has built it yet.</td></tr>
    <tr><th>BUILT</th><td>Approved, built, and you can play it.</td></tr>
    <tr><th>REPLACED</th><td>A newer idea took over. Keep the page anyway — it is the game's history.</td></tr>
    <tr><th>NO THANKS</th><td>Ella thought about it and said no. Also keep it, so nobody asks twice.</td></tr>
  </tbody></table>

  <h2>Things only Ella gets to decide</h2>
  <ul>
    <li>The names of the cuties, the machines, and anybody new who turns up.</li>
    <li>What the claw is called and whether it gets a face at all.</li>
    <li>How hard the game is, and whether the arcade ever goes easy on a player.</li>
    <li>Which ideas get built first, and which ones wait.</li>
    <li>What the game looks like: colours, faces, cabinets, the parade.</li>
    <li>Anything written where other people can read it — the title, the description, the credits.</li>
  </ul>

  <h2>Filling in a decision</h2>
  <p>When something needs Ella's yes or no, it gets a decision number that looks like <b>CMC-2026-001</b>. CMC is Claw Machine Cuties, 2026 is the year, 001 is the first one. Every decision goes behind Tab 12 and stays there forever, even after it changes.</p>
</div>

<!-- CONTENTS -->
<div class="page" data-run="CLAW MACHINE CUTIES · DEVELOPMENT BINDER · GAME · CUTIES · IDEAS · CODE" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <p class="kicker">Tab 00</p>
  <h1>What Is In This Binder</h1>
  <p>Use numbered divider tabs in the real binder. New pages go behind a tab without changing any tab numbers.</p>
  <table class="toc"><thead><tr><th>Tab</th><th>Section</th><th>What is behind it</th></tr></thead><tbody>
    <tr><td>00</td><td><b>How to Use This Binder</b></td><td>Who decides, the six labels, decision numbers, this list</td></tr>
    <tr><td>01</td><td><b>Ella's Game Vision</b></td><td>What the game is for, and what must never be ruined</td></tr>
    <tr><td>02</td><td><b>The Game Right Now</b></td><td>Every fact about the game as it is today, checked in the code</td></tr>
    <tr><td>03</td><td><b>The Cuties</b></td><td>All forty-eight of them, their names, and the stories they do not have yet</td></tr>
    <tr><td>04</td><td><b>Version 2.0 Proposal</b></td><td>The Big Cuteness Update: twelve full-page ideas, in build order</td></tr>
    <tr><td>05</td><td><b>The Cuteness Style Guide</b></td><td>The rules that make everything look like it belongs together</td></tr>
    <tr><td>06</td><td><b>The Arcade Map</b></td><td>The six machines, the unlock chain, and where a seventh could go</td></tr>
    <tr><td>07</td><td><b>The Cutie Cast</b></td><td>Clawdia, the mascots, and who else lives in the arcade</td></tr>
    <tr><td>08</td><td><b>How Grabbing Works</b></td><td>The honest maths behind every drop, explained properly</td></tr>
    <tr><td>09</td><td><b>Screens and Buttons</b></td><td>Every screen in the game and what each button does</td></tr>
    <tr><td>10</td><td><b>How the Code Works</b></td><td>The whole game explained without any computer words</td></tr>
    <tr><td>11</td><td><b>Building and Testing</b></td><td>How to finish a version and check it did not break</td></tr>
    <tr><td>12</td><td><b>Ella's Decisions</b></td><td>Every question waiting for an answer, and every answer given</td></tr>
    <tr><td>13</td><td><b>Creator's Workshop</b></td><td>Blank pages to print and fill in</td></tr>
    <tr><td>A</td><td><b>Extras</b></td><td>The README, where the facts came from, the update checklist</td></tr>
  </tbody></table>

  <div class="box mint">
    <h4>How to put the binder together</h4>
    <ol>
      <li>Slide the illustrated cover into the front sleeve.</li>
      <li>Put this master document behind Tab 00.</li>
      <li>Print <b>README.md</b> and put it behind Tab 02.</li>
      <li>Print the twelve concept plates from <b>docs/concepts/</b> and put them behind Tab 04.</li>
      <li>Keep Tab 12 and Tab 13 easy to reach. Those are the two that get used the most.</li>
      <li>Keep one clean copy of every blank master. Photocopy it before writing on it.</li>
    </ol>
  </div>
</div>

<!-- =========================================================
     TAB 01 — VISION
     ========================================================= -->
<div class="page" data-run="TAB 01 · ELLA'S GAME VISION" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">01</div>
  <p class="kicker">Tab 01 · <span class="label workshop">FOR ELLA TO FILL IN</span></p>
  <h1>Ella's Game Vision</h1>
  <p class="lede">Everything else in this binder is somebody else's idea. This page is the only one that has to be Ella's, in Ella's words. It is also the page everybody checks when they are not sure what to do.</p>

  <div class="box lemon">
    <h4>What the game already promises 🤙</h4>
    <p>Reading the game's own code and its README, Claw Machine Cuties already makes four promises out loud. Ella can keep them, change them, or throw them out — but somebody should decide on purpose instead of by accident:</p>
    <ol>
      <li><b>It is really hard, and it is really honest.</b> The README says it in capital letters: “It is hard. It is not rigged.” No secret timers, no “you are not allowed to win yet”, no rubber-banding.</li>
      <li><b>Every cutie is worth catching.</b> Forty-eight of them, each with a name somebody thought about. Nobody named a plushie “Bear 4”.</li>
      <li><b>It opens instantly and works anywhere.</b> One file. No downloads, no waiting, no account, no internet needed.</li>
      <li><b>It is cute all the way down.</b> Even the loading, even the losing, even the buttons.</li>
    </ol>
  </div>

  <h2>Ella's answers</h2>
  <div class="fields" style="grid-template-columns:1fr 1fr">
    <div class="field big"><b>What is Claw Machine Cuties, in one sentence?</b><i>Say it the way you would say it to a friend who has never seen it</i><div class="rule"></div><div class="rule"></div></div>
    <div class="field"><b>Who is it for?</b><i>Who should love this game most?</i><div class="rule"></div><div class="rule"></div></div>
    <div class="field"><b>How should a player feel?</b><i>Pick three feelings</i><div class="rule"></div><div class="rule"></div></div>
    <div class="field"><b>What must NEVER change?</b><i>The parts that make it yours</i><div class="rule"></div><div class="rule"></div></div>
    <div class="field"><b>What is allowed to change?</b><i>The parts you are happy to see grow</i><div class="rule"></div><div class="rule"></div></div>
    <div class="field big"><b>What is the best moment in the whole game?</b><i>Everything in Version 2.0 should be pointing at this moment</i><div class="rule"></div><div class="rule"></div></div>
    <div class="field big"><b>What would make you proudest to show somebody?</b><div class="rule"></div><div class="rule"></div></div>
  </div>
</div>

<!-- =========================================================
     TAB 02 — THE GAME RIGHT NOW
     ========================================================= -->
<div class="page plateOnly">${P('01-arcade-now')}</div>

<div class="page" data-run="TAB 02 · THE GAME RIGHT NOW" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">02</div>
  <p class="kicker">Tab 02 · <span class="label current">CURRENT</span> checked in the code at build 1c0c853</p>
  <h1>The Game Right Now</h1>
  <p class="lede">Every fact on this page came out of the game's own code, not out of somebody's memory. If the game changes, this page has to change too.</p>

  <div class="two">
    <div>
      <h3>The shape of it</h3>
      <ul>
        <li><b>Six machines</b>, unlocked one after another.</li>
        <li><b>Eight cuties per machine</b>, so <b>forty-eight</b> in all.</li>
        <li>In every machine: <b>five ordinary</b>, <b>two ✨rare</b>, <b>one 👑legendary</b>.</li>
        <li><b>Three wins</b> finish a machine. The third one carries the 🔑 <b>key</b>.</li>
        <li>The key unlocks the next machine and starts a <b>parade</b>.</li>
        <li>Clearing all six makes you <b>Arcade Master</b>.</li>
      </ul>
      <h3>How you play it</h3>
      <table class="left"><thead><tr><th></th><th>Computer</th><th>Phone</th></tr></thead><tbody>
        <tr><th>Move the claw</th><td>arrows or WASD</td><td>drag the joystick</td></tr>
        <tr><th>Drop</th><td>space or enter</td><td>the big DROP button</td></tr>
        <tr><th>Back to the arcade</th><td>escape</td><td>the ← button</td></tr>
      </tbody></table>
      <p><b>Up and down move the claw deeper into the machine and back out again.</b> It is a real 3D pit, not a flat picture — so half of aiming is depth.</p>
    </div>
    <div>
      <h3>What the game remembers</h3>
      <p>The game saves to your own device, in something called <b>localStorage</b>. It keeps: which machines are unlocked, how many wins you have in each one, every cutie you have ever caught and how many times, how many drops you have taken, and whether the sound is off.</p>
      <p>There is a <b>Reset progress</b> button inside the album. It really does wipe everything, forever.</p>
      <div class="box sky">
        <h4>The thing that is missing</h4>
        <p>Nothing is saved anywhere except this one device, in this one browser. Clear the browser and the whole collection is gone. There is no way to move a collection to a new tablet, and no way to prove to anybody else that you did it.</p>
      </div>
      <h3>What it is made of</h3>
      <ul>
        <li><b>One file</b>: <code>index.html</code>, about 1,839 lines.</li>
        <li><b>No pictures.</b> Every cutie, cabinet and button is drawn with shapes in code.</li>
        <li><b>No sound files.</b> The tune and every noise are built by the computer while you play.</li>
        <li>Real 3D physics: the cuties fall, bounce, stack and shove each other.</li>
        <li>Confetti, sparkles, phone buzzing, and a full <b>calm mode</b> for players who do not want things moving.</li>
      </ul>
    </div>
  </div>

  <h2>How hard each machine is</h2>
  ${difficultyTable()}
  <p style="font-size:9.6pt">Roughly <b>75 drops</b> — about twenty to thirty minutes — clears the whole arcade. About <b>one drop in four</b> is a slip: the claw closes, lifts your cutie, carries it halfway to the chute and then drops it.</p>
</div>

<!-- =========================================================
     TAB 03 — THE CUTIES
     ========================================================= -->
<div class="page" data-run="TAB 03 · THE CUTIES" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">03</div>
  <p class="kicker">Tab 03 · <span class="label current">CURRENT</span></p>
  <h1>All Forty-Eight Cuties</h1>
  <p class="lede">Every cutie in the game, with the exact name the game gives it. These names are official. Nobody should change one without writing down a decision, because a player who has caught Mochi has really caught <i>Mochi</i>.</p>
  ${rosterTables().split('<h3>').slice(0, 4).join('<h3>')}
</div>

<div class="page" data-run="TAB 03 · THE CUTIES" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  ${'<h3>' + rosterTables().split('<h3>').slice(4).join('<h3>')}
</div>

<div class="page" data-run="TAB 03 · THE CUTIES" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <p class="kicker">Tab 03 · <span class="label proposed">QUESTIONS FOR ELLA</span></p>
  <h1>Forty-Eight Names, Zero Stories</h1>
  <p class="lede">Here is the most interesting thing an outsider notices about Claw Machine Cuties: it has forty-eight named characters and not one sentence of story about any of them. That is not a mistake. That is forty-eight empty pages waiting for Ella.</p>

  <div class="box hot">
    <h4>What the names already tell us</h4>
    <p>Somebody was thinking carefully when these were named, and the names are already hinting at things:</p>
    <ul>
      <li><b>Sir Roosevelt</b> and <b>Sir Bearington</b> are knights. Knights of what? Who made them knights?</li>
      <li><b>Mallow King</b> and <b>Sugar Crown</b> sound like royalty in the candy machine. Is there a sweet kingdom?</li>
      <li><b>Celestia</b>, <b>Starlight</b> and <b>Aurora</b> all sound like the sky. Are they related?</li>
      <li><b>Moonpie</b> is a legendary bunny with a moon in its name and gold bows. Why gold?</li>
      <li>The unicorn machine holds <b>one of every other kind</b> — a teddy, a bunny, a dino, a butterfly, a candy. Why are they in there? Did they wander in? Were they invited?</li>
    </ul>
  </div>

  <h2>The questions worth answering</h2>
  <table class="left"><thead><tr><th>Question</th><th>Why it matters</th></tr></thead><tbody>
    <tr><td><b>Who runs the arcade?</b></td><td>Somebody built six machines and filled them with plushies. Right now nobody has ever met them. A single friendly character who greets you would change the whole feeling of the lobby.</td></tr>
    <tr><td><b>Where do the cuties come from?</b></td><td>Are they toys? Are they alive? The moment they get faces that react to the claw (Plate 2), players will decide they are alive whether or not anybody says so.</td></tr>
    <tr><td><b>Why does the third win carry a key?</b></td><td>The best mystery in the game and nobody has explained it. Who put the key in there? Are the cuties helping you escape with them?</td></tr>
    <tr><td><b>What happens to a cutie you win?</b></td><td>Right now: it goes in a list. Plate 8 says it should go home with you. Ella decides where home is.</td></tr>
    <tr><td><b>Is the unicorn machine the boss?</b></td><td>It is the hardest, it holds one of everybody, and finishing it ends the game. That is boss-shaped. Should it act like one?</td></tr>
  </tbody></table>

  <div class="box mint">
    <h4>An important warning ⚠️</h4>
    <p>A story is easy to add and almost impossible to take back. Once the game says out loud where the cuties come from, that is true forever, and every future idea has to fit around it. So: no story goes in the game until Ella has written it on a Lore page in Tab 13, said yes to it, and it has a decision number. Guesses do not count. Only Ella's words count.</p>
  </div>
</div>

<!-- =========================================================
     TAB 04 — VERSION 2.0
     ========================================================= -->
<div class="page" data-run="TAB 04 · VERSION 2.0 PROPOSAL" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">04</div>
  <p class="kicker">Tab 04 · <span class="label proposed">PROPOSED</span></p>
  <h1>Version 2.0 — The Big Cuteness Update</h1>
  <p class="lede">Eleven full-page ideas follow this one. Before reading them, here is what the whole update is trying to fix, and what it is promising not to break.</p>

  <div class="box hot">
    <h4>The three honest problems 🔍</h4>
    <p>Somebody who has never played sat down with Claw Machine Cuties and found exactly three things standing between it and being brilliant. Everything in Version 2.0 is aimed at one of them.</p>
    <ol>
      <li><b>You cannot tell what you are aiming at.</b> The pit is genuinely 3D, and depth is genuinely hard to read. Players drop where they hope the claw is, not where it is. <span class="label proposed">Plates 2 &amp; 5</span></li>
      <li><b>Losing is silent.</b> Four out of five drops fail. The most common thing in the game is a grey banner and then nothing. <span class="label proposed">Plates 3, 4 &amp; 6</span></li>
      <li><b>Winning does not lead anywhere.</b> Forty-eight lovingly named cuties go into a grid of squares and stay there. <span class="label proposed">Plates 8, 9, 10 &amp; 11</span></li>
    </ol>
  </div>

  <h2>What Version 2.0 should do</h2>
  <ul>
    <li>Make the pit easy to read without adding a single instruction or menu.</li>
    <li>Make a miss the most charming thing in the game instead of the emptiest.</li>
    <li>Give the cuties somewhere to live and something to do after they are won.</li>
    <li>Turn the claw into a character everybody cares about.</li>
    <li>Make the arcade look warm and lit instead of flat and printed.</li>
  </ul>

  <h2>What Version 2.0 must NOT do</h2>
  <ul>
    <li><b>Do not change the odds.</b> Not up, not down, not secretly. The game's proudest sentence is “It is hard. It is not rigged.”</li>
    <li><b>Do not add anything that nags.</b> No daily streaks, no “come back tomorrow or lose your prize”, no timers counting down while nobody is playing.</li>
    <li><b>Do not break the one-file rule.</b> If a change means the game stops opening instantly, it is the wrong change.</li>
    <li><b>Do not rename anything Ella named.</b></li>
    <li><b>Do not remove calm mode.</b> Every new sparkle needs a still version.</li>
    <li><b>Do not rebuild the whole game.</b> Every idea in here is an addition, not a replacement.</li>
  </ul>

</div>

<div class="page" data-run="TAB 04 · VERSION 2.0 PROPOSAL" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <p class="kicker">Tab 04 · <span class="label proposed">PROPOSED</span></p>
  <h1>The Order to Build Them In</h1>
  <p class="lede">Eleven ideas is too many for one version. This is the order that gets the most joy for the least work, and the reason behind it.</p>
  <table class="left"><thead><tr><th>#</th><th>Idea</th><th>Fixes</th><th>Size</th></tr></thead><tbody>
    <tr><td><b>1</b></td><td>The target ring under the claw <span style="color:var(--mute)">(Plate 2)</span></td><td>Cannot tell what you are aiming at</td><td>small</td></tr>
    <tr><td><b>2</b></td><td>Faces that look up and light up <span style="color:var(--mute)">(Plates 2 &amp; 3)</span></td><td>Aiming, and the whole feeling of the pit</td><td>medium</td></tr>
    <tr><td><b>3</b></td><td>Clawdia gets a face <span style="color:var(--mute)">(Plate 4)</span></td><td>Losing is silent</td><td>small</td></tr>
    <tr><td><b>4</b></td><td>The three endings get three seconds each <span style="color:var(--mute)">(Plate 6)</span></td><td>Losing is silent</td><td>medium</td></tr>
    <tr><td><b>5</b></td><td>The Cutie Home <span style="color:var(--mute)">(Plate 8)</span></td><td>Winning does not lead anywhere</td><td><b>big</b></td></tr>
    <tr><td><b>6</b></td><td>The scrapbook album <span style="color:var(--mute)">(Plate 9)</span></td><td>Winning does not lead anywhere</td><td>medium</td></tr>
    <tr><td><b>7</b></td><td>Cabinet glow-up <span style="color:var(--mute)">(Plate 5)</span></td><td>How the whole game looks</td><td>medium</td></tr>
    <tr><td><b>8</b></td><td>The bow boutique <span style="color:var(--mute)">(Plate 10)</span></td><td>Doubles are useless</td><td>medium</td></tr>
    <tr><td><b>9</b></td><td>The bigger parade <span style="color:var(--mute)">(Plate 11)</span></td><td>The ending is smaller than it deserves</td><td>small</td></tr>
    <tr><td><b>10</b></td><td>Machine number seven <span style="color:var(--mute)">(Plate 7)</span></td><td>Nothing — it is pure new fun</td><td><b>big</b></td></tr>
  </tbody></table>
  <p style="font-size:9.8pt"><b>Why this order:</b> the first four are small, they fix the two problems every single player hits in the first minute, and together they cost less work than the Cutie Home alone. Do the cheap fixes to the thing players do a hundred times before doing the expensive fix to the thing they do once.</p>
</div>

<div class="page plateOnly">${P('02-everybody-look-up')}</div>
<div class="page plateOnly">${P('03-feelings-sheet')}</div>
<div class="page plateOnly">${P('04-meet-clawdia')}</div>
<div class="page plateOnly">${P('05-cabinet-glow-up')}</div>
<div class="page plateOnly">${P('06-the-good-miss')}</div>
<div class="page plateOnly">${P('07-new-machines')}</div>
<div class="page plateOnly">${P('08-cutie-home')}</div>
<div class="page plateOnly">${P('09-sticker-scrapbook')}</div>
<div class="page plateOnly">${P('10-bow-boutique')}</div>
<div class="page plateOnly">${P('11-biggest-parade')}</div>

<!-- =========================================================
     TAB 05 — CUTENESS STYLE GUIDE
     ========================================================= -->
<div class="page" data-run="TAB 05 · THE CUTENESS STYLE GUIDE" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">05</div>
  <p class="kicker">Tab 05 · <span class="label current">CURRENT</span> — read out of the game's own drawing code</p>
  <h1>The Cuteness Style Guide</h1>
  <p class="lede">Claw Machine Cuties already has a style. Nobody wrote it down — it just happened, the same way handwriting happens. Here it is written down, so that anything new added later looks like it belongs.</p>

  <h2>The seven rules of a cutie</h2>
  <ol>
    <li><b>The head is huge.</b> A teddy's head is a circle of 28 and its body is 25 across. Head first, body second. Babies look like this, and that is exactly why it works.</li>
    <li><b>Nothing is pointy.</b> Every shape is a circle, an oval, or a rounded rectangle. Even the dinosaur's spikes are soft triangles on a round body.</li>
    <li><b>Two eyes, three shines.</b> An eye is a dark oval, slightly taller than it is wide, with one big white shine at the top-left and one small one at the bottom-right. The two shines are what make it look wet and alive. Never draw an eye with only one shine.</li>
    <li><b>Always blush.</b> Every single cutie has two soft cheek ovals at 48% see-through. Not one is missing it.</li>
    <li><b>The mouth is a small ʚ.</b> Two little curves, never a big open grin — unless something wonderful is happening.</li>
    <li><b>One thing that is only yours.</b> Every cutie has a detail nobody else has: a bow, a spike colour, a wing pattern, a horn. That is how you tell Mochi from Snowdrop at thumbnail size.</li>
    <li><b>Dark outline colour, never black.</b> The game's ink colour is <b>#553244</b> — a deep plum. Real black is too hard and would break the softness.</li>
  </ol>

  <h2>The colours the game really uses</h2>
  <table class="left"><thead><tr><th>Colour</th><th>Code</th><th>Where it is used</th></tr></thead><tbody>
    <tr><td><b>Ink</b></td><td>#553244</td><td>Every eye, nose and mouth in the game</td></tr>
    <tr><td><b>Hot pink</b></td><td>#e0287f / #ff5c9d</td><td>Titles, the DROP button, everything important</td></tr>
    <tr><td><b>Soft pink</b></td><td>#ffd9ec</td><td>Backgrounds, joystick, the calm parts</td></tr>
    <tr><td><b>Mint</b></td><td>#7fe0c4</td><td>Bunny Hop Hop, and “good news” messages</td></tr>
    <tr><td><b>Sky</b></td><td>#7fd8ff</td><td>Water, tears, cool things</td></tr>
    <tr><td><b>Lemon</b></td><td>#ffd447</td><td>The key, sparkles, legendary ribbons</td></tr>
    <tr><td><b>Lilac</b></td><td>#c9a4ff</td><td>Butterfly Breeze, magic, mystery</td></tr>
    <tr><td><b>Peach</b></td><td>#ff9a7a</td><td>Sweet Tooth Sugar Rush, warm things</td></tr>
  </tbody></table>

</div>

<div class="page" data-run="TAB 05 · THE CUTENESS STYLE GUIDE" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <p class="kicker">Tab 05 · <span class="label current">CURRENT</span></p>
  <h1>The Cuteness Check</h1>
  <p class="lede">Run this list on anything new before it goes anywhere near the game. It takes about a minute and it catches almost everything.</p>

  <div class="box lemon">
    <h4>The cuteness check ✅</h4>
    <ol>
      <li>Does it have a face? If it can have a face, it should have a face.</li>
      <li>Does it blush?</li>
      <li>Are all its corners round?</li>
      <li>Can you tell what it is when it is the size of a fingernail?</li>
      <li>Does it react to something? Cute things react.</li>
      <li>Is there exactly one detail that is only its own?</li>
      <li>Does it still look good in calm mode, with nothing moving?</li>
    </ol>
    <p>Six out of seven is not a pass. Something that fails one rule is the thing that looks wrong and nobody can say why.</p>
  </div>

  <h2>Two rules about sound</h2>
  <p>Every sound in the game is made by the computer as it plays. There are no sound files at all. That means new sounds are free, but they have to be <b>short</b> and <b>tuned to the same notes</b> as the arcade tune, or they will feel like they came from another game. And every new sound needs a check: does the game still make sense with the sound turned off?</p>
</div>

<!-- =========================================================
     TAB 06 — ARCADE MAP
     ========================================================= -->
<div class="page" data-run="TAB 06 · THE ARCADE MAP" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">06</div>
  <p class="kicker">Tab 06 · <span class="label current">CURRENT</span> + <span class="label proposed">PROPOSED</span></p>
  <h1>The Arcade Map</h1>
  <p class="lede">The arcade is a straight line: finish one machine, the next one unlocks. Simple, clear, and it works. Here is what that line actually looks like, and where a new machine could join it.</p>

  <h2>The chain as it is</h2>
  <table class="left"><thead><tr><th>#</th><th>Machine</th><th>Opens when</th><th>How it feels</th></tr></thead><tbody>
    <tr><td>1</td><td>🧸 Teddy Bear Bonanza</td><td>always open</td><td>The teacher. Almost half of careful drops win, so you learn what a good drop feels like.</td></tr>
    <tr><td>2</td><td>🐰 Bunny Hop Hop</td><td>3 wins in 1</td><td>Barely harder. This is where the game checks you learned it.</td></tr>
    <tr><td>3</td><td>🦕 Dino Stomp</td><td>3 wins in 2</td><td>The step up. Careful aim starts really mattering.</td></tr>
    <tr><td>4</td><td>🦋 Butterfly Breeze</td><td>3 wins in 3</td><td>Now it is a proper claw machine.</td></tr>
    <tr><td>5</td><td>🍬 Sweet Tooth Sugar Rush</td><td>3 wins in 4</td><td>Fifteen sweets in the pit — the most crowded, so digging matters most.</td></tr>
    <tr><td>6</td><td>🦄 Unicorn Dream Machine</td><td>3 wins in 5</td><td>The final boss. Grip 0.19, sixteen cuties, and one of every kind inside.</td></tr>
  </tbody></table>

  <div class="box sky">
    <h4>Something worth noticing 👀</h4>
    <p>The difficulty drops by roughly the same amount every time: 0.62, 0.51, 0.40, 0.31, 0.24, 0.19. That is a really good curve — steady, no nasty surprise. Whatever machine number seven is, it should carry on the pattern (about <b>0.15</b>) or deliberately break it and say why, like the Sleepy Sheep machine on Plate 7, which is <i>easier</i> on purpose so there is somewhere kind to go after the unicorns have been mean.</p>
  </div>

  <h2>Where a seventh machine could go</h2>
  <table class="left"><thead><tr><th>Where</th><th>What it means</th><th>Watch out for</th></tr></thead><tbody>
    <tr><td><b>At the end</b></td><td>Harder than the unicorns. A true final challenge.</td><td>The unicorn machine stops being the boss. It has earned being the boss.</td></tr>
    <tr><td><b>In the middle</b></td><td>Slots in at the right difficulty and stretches the adventure.</td><td>Everybody's saved progress has to be moved along by one. Fiddly.</td></tr>
    <tr><td><b>Off to the side</b></td><td>Unlocked by something other than finishing the machine before it — say, finding ten kinds, or having a favourite.</td><td>Needs a new reason to unlock, but nothing already in the game breaks. <b>Probably the best one.</b></td></tr>
    <tr><td><b>After the ending</b></td><td>Only opens once you are Arcade Master. A reward for finishing.</td><td>Most players never see it. Only worth it if the game already gets finished a lot.</td></tr>
  </tbody></table>

  <div class="box hot">
    <h4>Ella decides 🩷</h4>
    <p>Which machine is number seven, and where does it join the line? Should some machines be <b>side doors</b> instead of steps, so the arcade becomes a place to wander instead of a ladder to climb?</p>
    <p><b>Decision ID: CMC-2026-____</b></p>
  </div>
</div>

<!-- =========================================================
     TAB 07 — THE CUTIE CAST
     ========================================================= -->
<div class="page" data-run="TAB 07 · THE CUTIE CAST" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">07</div>
  <p class="kicker">Tab 07 · <span class="label proposed">PROPOSED</span></p>
  <h1>Who Else Lives in the Arcade</h1>
  <p class="lede">Right now the arcade has forty-eight residents and nobody in charge. These are the four characters that could exist, in the order they would be worth adding.</p>

  <h3>1. Clawdia — the claw 🦾 <span class="label proposed">build first</span></h3>
  <p>Already in the game, already on screen more than anything else, already going through six different moods every time you press DROP — and she has no face. See Plate 4. She is the single best value character in the whole binder because the code has already written her personality; it just is not drawing it.</p>
  <p><b>What she needs:</b> a name from Ella, six faces, and one small sound each for “trying”, “got it” and “oh no”.</p>

  <h3>2. Your Favourite 🌟 <span class="label proposed">build second</span></h3>
  <p>Any cutie you own can be starred. Your favourite then sits in the corner of the machine screen and watches you play — cheering on a win, covering its eyes on a slip, cheering harder after three misses in a row. It sleeps on the bed in the Cutie Home. It leads the parade.</p>
  <p><b>Why it matters:</b> it turns forty-eight prizes into one relationship. That is a much bigger feeling than a collection, and it costs one extra number in the save file.</p>

  <h3>3. The Arcade Keeper 🎪 <span class="label proposed">needs a decision first</span></h3>
  <p>Somebody built six machines, filled them with plushies and hid keys inside. Meeting them would answer the biggest unasked question in the game. They could greet you in the lobby, say something different depending on how you are doing, and hand over each key personally.</p>
  <p><b>The risk:</b> the moment they exist, they are part of the story forever. This one needs Ella's Lore page and a decision number before anybody draws anything.</p>

  <h3>4. The Machine Mascots 🧸 <span class="label proposed">nice to have</span></h3>
  <p>Each machine's legendary cutie sits on the roof and waves as you walk past — Sir Roosevelt on machine one, Moonpie on machine two, Celestia on the unicorns. It makes the lobby feel like a street of shops instead of a grid of buttons, and it quietly shows you what the best prize in each machine looks like before you spend a single drop on it.</p>

  <div class="box mint">
    <h4>The rule for every new character</h4>
    <p>A character must do something a plain button could not. Clawdia makes you feel the drop. Your Favourite makes you care who you catch. The Keeper answers a question. A mascot shows you the prize. If a new character does not have a job, it is decoration — and this game has enough lovely decoration already.</p>
  </div>
</div>

<!-- =========================================================
     TAB 08 — HOW GRABBING WORKS
     ========================================================= -->
<div class="page" data-run="TAB 08 · HOW GRABBING WORKS" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">08</div>
  <p class="kicker">Tab 08 · <span class="label current">CURRENT</span> — this is exactly what the code does</p>
  <h1>How Grabbing Really Works</h1>
  <p class="lede">This is the most important page in the binder, because it is the promise the game makes to every player. Read it once and you will know more about how Claw Machine Cuties works than most people know about any game they play.</p>

  <h2>Three things, multiplied together</h2>
  <p>When the claw closes, the game looks at whichever cutie is nearest and works out three numbers. Then it multiplies them.</p>
  <div class="three">
    <div class="box hot"><h4>1. Aim</h4><p>How close to the middle of the cutie did the claw come down? Dead centre is the best number you can get. Just off the edge is almost nothing.</p></div>
    <div class="box mint"><h4>2. Exposed</h4><p>How many other cuties are sitting on top of this one? Each one on top takes away about a third of your chances. Buried is nearly hopeless.</p></div>
    <div class="box lemon"><h4>3. Grip</h4><p>How strong this machine's claw is. It never changes. Teddies 0.62, unicorns 0.19. This is the number that makes machine six hard.</p></div>
  </div>
  <p style="text-align:center;font-size:13pt;font-weight:800;color:var(--hot);margin:.14in 0">aim × exposed × grip = your chance</p>

  <h2>Then one dice roll, and three possible endings</h2>
  <ul>
    <li><b>Caught</b> — you rolled under your chance. The cutie is yours.</li>
    <li><b>Slipped</b> — you missed by a little. The claw lifts your cutie, carries it partway to the chute, and drops it. This is the one that hurts.</li>
    <li><b>Fumbled</b> — you missed by a lot. The claw nudges the cutie and lets go straight away.</li>
  </ul>

  <div class="box hot">
    <h4>What is NOT in there 🤙</h4>
    <ul>
      <li>There is no counter deciding you are not allowed to win yet.</li>
      <li>There is no timer that pays out every so many tries.</li>
      <li>The game does not get easier because you are losing, or harder because you are winning.</li>
      <li>The game does not know or care how long you have been playing.</li>
      <li>Real claw machines in real arcades do all four of those things. This one does not do any of them.</li>
    </ul>
  </div>

</div>

<div class="page" data-run="TAB 08 · HOW GRABBING WORKS" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <p class="kicker">Tab 08 · <span class="label current">CURRENT</span></p>
  <h1>How to Actually Get Good At It</h1>
  <p class="lede">Four things, in order of how much they matter. A player who knows these four wins roughly a third more often than one who does not — and the game never tells anybody.</p>

  <h2>The strategy that actually works</h2>
  <ol>
    <li><b>Pick a cutie on top of the pile.</b> Exposed beats everything. A perfectly aimed drop on a buried cutie loses to a sloppy drop on an exposed one.</li>
    <li><b>Aim for its middle, not its edge.</b> Careful aim is worth about a third more wins — that is the whole difference between the two rows on the difficulty table.</li>
    <li><b>Remember that up and down mean deeper and nearer.</b> Most missed drops are depth mistakes, not left-and-right mistakes.</li>
    <li><b>A miss is not wasted.</b> The claw shoves the pile every time it dives. Three deliberate misses to dig something loose is a real plan, and it is the most satisfying thing in the game once you know it works.</li>
  </ol>

  <div class="box sky">
    <h4>The thing worth protecting</h4>
    <p>Number four is brilliant and almost nobody discovers it, because the game never mentions it out loud. Plate 6 is entirely about fixing that — not by making the game easier, but by saying what already happened. “Sir Roosevelt is on top now!” is not a change to the rules. It is the game finally telling the truth about itself.</p>
  </div>
</div>

<!-- =========================================================
     TAB 09 — SCREENS AND BUTTONS
     ========================================================= -->
<div class="page" data-run="TAB 09 · SCREENS AND BUTTONS" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">09</div>
  <p class="kicker">Tab 09 · <span class="label current">CURRENT</span></p>
  <h1>Every Screen in the Game</h1>
  <p class="lede">There are only five. That is a good number — a player never gets lost. Any new screen has to earn its place.</p>
  <table class="left"><thead><tr><th>Screen</th><th>What you can do</th><th>How you leave</th></tr></thead><tbody>
    <tr><td><b>The Arcade (lobby)</b></td><td>See all six machines, which are locked, how many wins each has. Open the album, the help, the sound.</td><td>Tap a machine</td></tr>
    <tr><td><b>The Machine</b></td><td>Move the claw, drop, watch. See your three hearts-and-key progress at the top.</td><td>← or escape</td></tr>
    <tr><td><b>My Plushie Album</b></td><td>See all forty-eight slots, how many you have of each, your totals, and the reset button.</td><td>Close</td></tr>
    <tr><td><b>The Win / Key window</b></td><td>See the cutie you just caught, its name, and whether it is rare.</td><td>Play again, Arcade, or Parade</td></tr>
    <tr><td><b>The Parade</b></td><td>Watch your cuties ride past on floats.</td><td>Continue, space or enter</td></tr>
  </tbody></table>

  <h2>What is already good</h2>
  <ul>
    <li><b>Everything is one tap away.</b> Album and sound are on both the lobby and the machine screen.</li>
    <li><b>Locked machines say why.</b> “win 3 from Bunny Hop Hop” beats a padlock with no explanation.</li>
    <li><b>The next machine wiggles.</b> Nobody ever has to wonder where to go.</li>
    <li><b>Reset asks twice.</b> Wiping a collection is the scariest button in the game and it is handled kindly.</li>
    <li><b>Calm mode is real.</b> A player who does not want things moving gets a game that does not move.</li>
  </ul>

  <h2>What could be better <span class="label proposed">PROPOSED</span></h2>
  <table class="left"><thead><tr><th>Thing</th><th>Idea</th></tr></thead><tbody>
    <tr><td>The album is a grid</td><td>Make it a scrapbook. Plate 9.</td></tr>
    <tr><td>Nowhere to look at your cuties</td><td>The Cutie Home. Plate 8.</td></tr>
    <tr><td>No way to see a machine before unlocking it</td><td>Let a locked machine be peeked at, so there is something to want.</td></tr>
    <tr><td>The parade can only be seen once</td><td>Add a “watch it again” button in the album. It is a lovely thing to be able to show somebody.</td></tr>
    <tr><td>No way to move a collection</td><td>A “save my arcade to a file” button, and a way to load it back. This is the only real safety net for two hundred drops of work.</td></tr>
  </tbody></table>

  <div class="box lemon">
    <h4>The rule for new screens</h4>
    <p>Every screen must answer, in under three seconds and without reading: <b>where am I</b>, <b>what can I do</b>, and <b>how do I get back</b>. If a new screen cannot do that, it is not finished — no matter how pretty it is.</p>
  </div>
</div>

<!-- =========================================================
     TAB 10 — HOW THE CODE WORKS
     ========================================================= -->
<div class="page" data-run="TAB 10 · HOW THE CODE WORKS" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">10</div>
  <p class="kicker">Tab 10 · <span class="label current">CURRENT</span></p>
  <h1>How the Whole Game Works</h1>
  <p class="lede">A game is a big pile of small jobs, all happening very fast. Here is every job in Claw Machine Cuties, with no computer words at all.</p>

  <div class="box hot">
    <h4>The big idea 💡</h4>
    <p>Sixty times every second, the game does the same four things in the same order: <b>listen</b> to you, <b>move</b> everything, <b>check</b> what bumped into what, and <b>draw</b> the new picture. That is it. That is a video game. Everything else is decoration on top of those four steps.</p>
  </div>

  <h2>The eight jobs inside the file</h2>
  <table class="left"><thead><tr><th>Job</th><th>What it does</th></tr></thead><tbody>
    <tr><td><b>The Look</b></td><td>Decides how everything is coloured, rounded and shadowed. About 210 lines at the top of the file.</td></tr>
    <tr><td><b>The Noise Maker</b></td><td>Builds every beep, thud and the whole arcade tune out of nothing while you play.</td></tr>
    <tr><td><b>The Artists</b></td><td>Six drawing recipes — bear, bunny, dino, butterfly, candy, unicorn — and a colour card for each of the forty-eight cuties.</td></tr>
    <tr><td><b>The Arcade List</b></td><td>The six machines: names, colours, grip, how crowded, who is inside.</td></tr>
    <tr><td><b>The Memory</b></td><td>Writes down what you own and what you unlocked, and reads it back next time.</td></tr>
    <tr><td><b>The Pit</b></td><td>Real 3D physics. Gravity, bouncing, stacking, and cuties shoving each other out of the way.</td></tr>
    <tr><td><b>The Claw</b></td><td>Six moods it moves between: waiting, falling, closing, lifting, carrying, coming home.</td></tr>
    <tr><td><b>The Party</b></td><td>Confetti, banners, sparkles, buzzing, the win window, and the parade.</td></tr>
  </tbody></table>

  <h2>The five questions for any new idea</h2>
  <p>Ask these five about any idea before building it. If all five have clear answers, the idea is ready. If one is fuzzy, that is exactly where it will go wrong.</p>
  <ol>
    <li><b>What fact changes?</b> Example: “this cutie is my favourite”, or “this cutie is sitting on the top shelf”.</li>
    <li><b>Who owns that fact?</b> The player? One machine? One cutie? The save file?</li>
    <li><b>What makes it change?</b> A button? A win? Dragging something? Time passing?</li>
    <li><b>Who needs to know?</b> The pit? The album? The sound? The parade? All of them?</li>
    <li><b>How would we know it works?</b> What should you see? What happens if you do it twice? What happens after you close the game and come back?</li>
  </ol>

  <div class="box mint">
    <h4>The creator's habit</h4>
    <p>Say every idea twice. Once as a player: <i>“I starred Mochi, and now she cheers when I win.”</i> Once as a fact: <i>“the save file gets a favourite, the machine screen draws it, and it reacts to caught and slipped.”</i> If you cannot say it both ways, the idea is not finished being thought about.</p>
  </div>
</div>

<!-- =========================================================
     TAB 11 — BUILDING AND TESTING
     ========================================================= -->
<div class="page" data-run="TAB 11 · BUILDING AND TESTING" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">11</div>
  <p class="kicker">Tab 11 · <span class="label current">CURRENT</span></p>
  <h1>Finishing a Version</h1>
  <p class="lede">A version is finished when the thing it promised works properly. Not when every idea has been added. Those are two completely different days.</p>

  <h2>The check-before-you-share list</h2>
  <p>Run every one of these before calling a version done. Tick them on paper.</p>
  <table class="left"><thead><tr><th>Check</th><th>How</th></tr></thead><tbody>
    <tr><td>☐ Every machine opens and the claw moves</td><td>Open all six from the album and move the claw in each</td></tr>
    <tr><td>☐ All three endings still happen</td><td>Drop until you have seen caught, slipped and fumbled</td></tr>
    <tr><td>☐ Three wins still give the key</td><td>Win three from any machine</td></tr>
    <tr><td>☐ The next machine really unlocks</td><td>Go back to the arcade and check the padlock is gone</td></tr>
    <tr><td>☐ Progress survives a reload</td><td>Close the tab completely, open it again, check the album</td></tr>
    <tr><td>☐ Works on a phone</td><td>Joystick drags, DROP works, nothing falls off the edge</td></tr>
    <tr><td>☐ Works on a computer</td><td>Arrow keys, space, escape</td></tr>
    <tr><td>☐ Sound off still plays fine</td><td>Mute and play a whole round</td></tr>
    <tr><td>☐ Calm mode still works</td><td>Turn on reduce-motion and check nothing important is invisible</td></tr>
    <tr><td>☐ Reset still asks first</td><td>Tap it, say no, check nothing was lost</td></tr>
    <tr><td>☐ The parade still runs and still ends</td><td>Finish a machine</td></tr>
    <tr><td>☐ An old save file still opens</td><td>The most-forgotten check and the most upsetting one to get wrong</td></tr>
  </tbody></table>

  <div class="box hot">
    <h4>The rule about the odds ⚠️</h4>
    <p>After <b>any</b> change to the pit, the claw or the cuties, take fifty drops in machine one and fifty in machine six and count the wins. They should land near 48% and 14%. If they moved, the change did something nobody meant it to do — and the game's biggest promise just quietly broke.</p>
  </div>

  <h2>How to run a playtest</h2>
  <ol>
    <li>Find somebody who has never played. A friend, a cousin, a grown-up.</li>
    <li>Give them the game and say nothing. Not one hint. This is the hard part.</li>
    <li>Write down what they <b>do</b>, not what you think they are thinking.</li>
    <li>Write down every moment they laugh and every moment they frown.</li>
    <li>When they get stuck, count to ten before helping. The stuck bit is the most useful thing in the whole test.</li>
    <li>Afterwards, ask one question: <i>“what did you think that button did?”</i></li>
    <li>Fill in a Playtest page from Tab 13. Change <b>one</b> thing. Test again.</li>
  </ol>
</div>

<!-- =========================================================
     TAB 12 — ELLA'S DECISIONS
     ========================================================= -->
<div class="page" data-run="TAB 12 · ELLA'S DECISIONS" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">12</div>
  <p class="kicker">Tab 12 · <span class="label workshop">WAITING FOR ELLA</span></p>
  <h1>Questions Waiting for an Answer</h1>
  <p class="lede">Every question this binder raised, in one place. Nothing gets built from any of these until there is an answer with a number next to it.</p>
  <table class="left"><thead><tr><th>ID</th><th>The question</th><th>From</th><th>Ella's answer</th></tr></thead><tbody>
    <tr><td>CMC-2026-001</td><td>Should the cuties get faces that watch the claw?</td><td>Plate 2</td><td></td></tr>
    <tr><td>CMC-2026-002</td><td>Which feelings does a cutie get, and does each kind get one of its own?</td><td>Plate 3</td><td></td></tr>
    <tr><td>CMC-2026-003</td><td>What is the claw called, and does it get a face?</td><td>Plate 4</td><td></td></tr>
    <tr><td>CMC-2026-004</td><td>Which cabinet upgrades happen first?</td><td>Plate 5</td><td></td></tr>
    <tr><td>CMC-2026-005</td><td>Should a miss ever give anything back, or must it always give nothing?</td><td>Plate 6</td><td></td></tr>
    <tr><td>CMC-2026-006</td><td>Which idea is machine number seven, and where does it join the line?</td><td>Plate 7 · Tab 06</td><td></td></tr>
    <tr><td>CMC-2026-007</td><td>What is the Cutie Home called, and can cuties be given away?</td><td>Plate 8</td><td></td></tr>
    <tr><td>CMC-2026-008</td><td>Do uncaught cuties show as shadows, outlines, or stay secret?</td><td>Plate 9</td><td></td></tr>
    <tr><td>CMC-2026-009</td><td>How many spare cuties make one accessory token?</td><td>Plate 10</td><td></td></tr>
    <tr><td>CMC-2026-010</td><td>What does the parade banner say, and who leads it?</td><td>Plate 11</td><td></td></tr>
    <tr><td>CMC-2026-011</td><td>Who runs the arcade — and do we ever meet them?</td><td>Tab 03 · Tab 07</td><td></td></tr>
    <tr><td>CMC-2026-012</td><td>Where do the cuties come from? Are they alive?</td><td>Tab 03</td><td></td></tr>
    <tr><td>CMC-2026-013</td><td>Why does the third cutie carry a golden key?</td><td>Tab 03</td><td></td></tr>
    <tr><td>CMC-2026-014</td><td>Should there be a way to save a collection to a file?</td><td>Tab 09</td><td></td></tr>
    <tr><td>CMC-2026-015</td><td>Is there one accessory only Ella has, that nobody can ever earn?</td><td>Plate 10</td><td></td></tr>
  </tbody></table>

  <h2>Decisions already made</h2>
  <table class="left"><thead><tr><th>ID</th><th>Question</th><th>Ella's decision</th><th>Date</th><th>Built?</th></tr></thead><tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody></table>
</div>

<!-- =========================================================
     TAB 13 — CREATOR'S WORKSHOP
     ========================================================= -->
<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <div class="tabno">13</div>
  <p class="kicker">Tab 13 · <span class="label workshop">BLANK MASTERS</span></p>
  <h1>Ella's Workshop</h1>
  <p class="lede">Ten blank pages for turning a big exciting idea into a small buildable one. Keep one clean copy of each. Photocopy it before writing on it.</p>
  <table class="left"><thead><tr><th>Blank page</th><th>Use it when…</th></tr></thead><tbody>
    <tr><td><b>Big Idea Spark</b></td><td>An idea is exciting but still hard to explain</td></tr>
    <tr><td><b>New Cutie Designer</b></td><td>A new plushie needs a name, a look and a reason to exist</td></tr>
    <tr><td><b>New Machine Designer</b></td><td>A new machine needs a theme, a twist and a place in the line</td></tr>
    <tr><td><b>Feelings and Faces</b></td><td>A cutie needs to react to something new</td></tr>
    <tr><td><b>Cutie Story Page</b></td><td>Something is about to become true forever</td></tr>
    <tr><td><b>Screen Sketch</b></td><td>A new screen or window needs a shape</td></tr>
    <tr><td><b>Feature Builder</b></td><td>An approved idea needs to become instructions</td></tr>
    <tr><td><b>Playtest and Bug Hunt</b></td><td>Somebody is about to play it for the first time</td></tr>
    <tr><td><b>Release Planner</b></td><td>A version needs a goal and a stopping point</td></tr>
    <tr><td><b>Ella's Decision Record</b></td><td>A question finally has an answer</td></tr>
  </tbody></table>
  <div class="box lemon">
    <h4>How to use them 📝</h4>
    <p>You never have to fill in a whole page. Fill in the boxes you know, leave the ones you do not, and come back. A half-filled page is still a hundred times better than an idea that only lives in somebody's head — because a page can be shown to somebody, and a head cannot.</p>
  </div>
</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Big Idea Spark',
  'Catch the exciting bit first. Then find the smallest version that could prove it is fun.',
  [['ELLA’S IDEA, IN ELLA’S WORDS', 'Write it or draw it exactly how it first came out', 'big'],
   ['WHAT SHOULD THE PLAYER FEEL?', 'Pick the feeling before anything else'],
   ['WHY DOES IT BELONG HERE?', 'Why this game and not some other game'],
   ['WHAT DOES THE PLAYER DO?', 'Buttons, taps, choices'],
   ['HOW DOES THE GAME ANSWER?', 'What moves, lights up, or makes a noise'],
   ['WHAT DO THEY GET?', 'A prize, a secret, a new place, or just delight'],
   ['WHAT IS ALREADY IN THE GAME?', 'Cuties, machines, screens or code we can reuse'],
   ['WHAT IS BRAND NEW?', 'Art, sound, rules, screens'],
   ['THE SMALLEST FUN TEST', 'What tiny version could we try first?'],
   ['WHAT IS STILL FUZZY?', 'Questions to answer before building', 'big']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('New Cutie Designer',
  'A cutie has to be recognisable at the size of a fingernail. Start with the shape, then the colours, then the one thing that is only its own.',
  [['NAME', 'Official once Ella says yes'],
   ['WHICH MACHINE?', 'And is it ordinary, ✨rare or 👑legendary?'],
   ['DRAW IT', 'Big, then again really small', 'big'],
   ['WHAT KIND OF THING IS IT?', 'Bear, bunny, dino, butterfly, sweet, unicorn, or something new'],
   ['THE FOUR COLOURS', 'Main, dark, tummy, and its bow or spike'],
   ['THE ONE THING THAT IS ONLY ITS OWN', 'The detail that tells it apart from its neighbours'],
   ['WHAT IS ITS FACE LIKE?', 'Sleepy? Brave? Always surprised?'],
   ['WHY IS IT IN THAT MACHINE?', 'What does it have in common with the other seven?'],
   ['DOES IT HAVE A FRIEND IN HERE?', 'Anybody it knows, matches, or argues with']],
  'CUTENESS CHECK &nbsp; ☐ has a face &nbsp; ☐ blushes &nbsp; ☐ all round &nbsp; ☐ readable tiny &nbsp; ☐ reacts &nbsp; ☐ one detail of its own &nbsp; ☐ good in calm mode')}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('New Machine Designer',
  'A new machine is not a new colour of cabinet. It is a new reason to play. Find the twist first.',
  [['MACHINE NAME', 'And the little saying under it'],
   ['THE EMOJI AND THE COLOURS', 'Body, dark, trim, glass, marquee'],
   ['THE TWIST — WHAT RULE DOES IT CHANGE?', 'Gravity, water, bouncing, hiding, something moving in the pit', 'big'],
   ['WHERE DOES IT GO IN THE LINE?', 'Which machine comes before it and which comes after'],
   ['HOW HARD IS IT?', 'Grip strength, and how many cuties in the pit'],
   ['HOW DOES IT UNLOCK?', 'Three wins from the machine before, or something new?'],
   ['DRAW THE CABINET', 'Marquee, glass, base, chute', 'big'],
   ['THE EIGHT CUTIES', 'Five ordinary, two ✨rare, one 👑legendary'],
   ['WHAT MAKES IT FEEL DIFFERENT TO PLAY?', 'Not just look different — feel different']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Feelings and Faces',
  'One face layer, lots of moments. Say when the feeling happens, what it looks like, and how long it lasts.',
  [['THE FEELING', 'One word'],
   ['WHEN DOES IT HAPPEN?', 'The exact moment in the game'],
   ['DRAW THE FACE', 'Eyes, mouth, blush, and anything floating around it', 'big'],
   ['THE EYES', 'Normal, stars, hearts, swirls, closed, or something new'],
   ['THE MOUTH', 'Little ʚ, big grin, wobble, or an O'],
   ['ANYTHING EXTRA?', 'Sparkles, a sweat drop, zzz, motion lines'],
   ['HOW LONG DOES IT LAST?', 'A blink, a moment, or until something changes'],
   ['WHAT GOES BACK TO NORMAL AFTER?', 'And what happens if two feelings want to happen at once?'],
   ['WHICH CUTIES CAN DO IT?', 'All of them, or only some kinds?']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Cutie Story Page',
  'Careful — anything written here becomes true forever. It is only official when Ella says the exact words are right.',
  [['WHAT IS THIS ABOUT?', 'A cutie, a machine, the arcade, the key, or the keeper'],
   ['IS IT TRUE, OR DOES SOMEBODY JUST SAY IT?', 'A rumour is often better than a fact'],
   ['ELLA’S EXACT WORDS', 'Do not tidy them up. These are the official ones.', 'big'],
   ['WHERE DOES A PLAYER LEARN IT?', 'Album, win window, lobby, a secret'],
   ['DO THEY HAVE TO FIND IT?', 'Main path, or hidden for the curious'],
   ['WHAT DOES IT EXPLAIN?', 'What does a player understand afterwards?'],
   ['WHAT MUST IT NOT BREAK?', 'Names, rules and facts that are already official'],
   ['WHAT NEW QUESTION DOES IT CREATE?', 'A good story leaves a door open']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Screen Sketch',
  'Start with what the player is trying to do. Make the next useful thing the easiest thing to see.',
  [['SCREEN NAME', 'Arcade, machine, album, home, boutique, parade, something new'],
   ['WHAT IS THE PLAYER TRYING TO DO?', 'One sentence'],
   ['DRAW IT', 'Buttons, pictures, words, and the way back', 'big'],
   ['WHAT SHOULD THEY SEE FIRST?', 'The one thing that must be biggest'],
   ['HOW DO THEY GET BACK?', 'And is that button always visible?'],
   ['ON A PHONE', 'Can a thumb reach everything?'],
   ['ON A COMPUTER', 'Which keys, and in what order'],
   ['WHAT IF IT IS EMPTY?', 'What does a brand-new player see here?'],
   ['WHAT IF SOMETHING IS LOCKED?', 'How do we say so kindly?']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Feature Builder',
  'Take one approved idea and follow it all the way from the player’s story to the tests.',
  [['THE PLAYER’S STORY', 'I did ____, the game ____, and I got or learned ____', 'big'],
   ['WHAT FACT CHANGES?', 'The one thing the game has to remember'],
   ['WHO OWNS THAT FACT?', 'Player, machine, cutie, or the save file'],
   ['WHAT MAKES IT CHANGE?', 'The exact moment'],
   ['WHO NEEDS TO KNOW?', 'Pit, album, home, sound, parade, buttons'],
   ['WHAT DOES THE PLAYER SEE?', 'The proof it worked'],
   ['DOES IT SURVIVE A RELOAD?', 'Should it? Why?'],
   ['THE SMALLEST USEFUL VERSION', 'What is worth building first?'],
   ['TESTS', 'Normal, weird, twice in a row, phone, computer, reload']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Playtest and Bug Hunt',
  'Write down what happened, not why you think it happened. Explanations come after the test is over.',
  [['WHO PLAYED', 'Name, and have they played before?'],
   ['WHEN AND ON WHAT', 'Date, phone or computer'],
   ['WHAT WERE THEY ASKED TO DO?', 'Or were they told nothing at all?'],
   ['WHAT THEY DID', 'In order. No guessing about their thoughts.', 'big'],
   ['WHAT THE GAME DID', 'Including anything that looked wrong'],
   ['WHEN THEY LAUGHED', 'The bits that are already working'],
   ['WHEN THEY FROWNED', 'The bits that are not'],
   ['BUGS', 'Where, how to make it happen again, what should have happened'],
   ['HOW BAD?', '☐ cannot play ☐ big ☐ small ☐ tidy-up'],
   ['CHANGE ONE THING AND TEST AGAIN', 'Which one thing?']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Release Planner',
  'A version is finished when its promise works. Not when every idea has been added.',
  [['VERSION NAME AND NUMBER', 'e.g. Version 2.0 — The Big Cuteness Update'],
   ['THE PROMISE, IN ONE SENTENCE', 'What is better for players afterwards?'],
   ['MUST BE IN IT', 'The version cannot keep its promise without these', 'big'],
   ['NICE IF IT IS READY', 'Can slide to the next version'],
   ['NOT IN THIS ONE', 'Protect the stopping point'],
   ['NEW ART', 'Cuties, cabinets, screens, faces'],
   ['NEW SOUNDS', 'And do they fit the tune?'],
   ['DECISIONS IT NEEDS', 'Which CMC numbers must be answered first'],
   ['THE CHECK LIST', 'Copy from Tab 11']])}</div>

<div class="page" data-run="TAB 13 · CREATOR'S WORKSHOP · BLANK MASTER" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">${master('Ella’s Decision Record',
  'Use this for anything that changes the story, the rules, the look, or what people are told about the game.',
  [['DECISION ID', 'CMC-2026-____'],
   ['DATE', 'And the game version it applies to'],
   ['THE QUESTION', 'One clear sentence'],
   ['CHOICE A', 'Good bits and bad bits'],
   ['CHOICE B', 'Good bits and bad bits'],
   ['CHOICE C — OR ELLA’S OWN IDEA', 'Usually the best one'],
   ['ELLA’S DECISION, IN ELLA’S WORDS', 'Keep her exact words and her exact names', 'big'],
   ['WHY', 'The reason matters more than the answer'],
   ['WHAT THIS CHANGES', 'Story, art, rules, screens, code, README'],
   ['STATUS', '☐ approved ☐ no thanks ☐ replaced by ______ &nbsp;·&nbsp; ☐ not started ☐ building ☐ built ☐ tested']])}</div>

<!-- =========================================================
     EXTRAS
     ========================================================= -->
<div class="page" data-run="EXTRA A · WHERE THE FACTS CAME FROM" data-foot="Made for Ella — Creator, Owner &amp; Game Boss">
  <p class="kicker">Extra A</p>
  <h1>Where Every Fact in This Binder Came From</h1>
  <p class="lede">Nothing in the CURRENT pages was remembered or guessed. Every fact was read out of the game itself, at build <b>1c0c853</b>, on 18 August 2026.</p>
  <table class="left"><thead><tr><th>Kind of fact</th><th>Where it was read from</th></tr></thead><tbody>
    <tr><td>The six machines, their colours, grip and crowding</td><td><code>index.html</code> — the <code>MACHINES</code> list</td></tr>
    <tr><td>All forty-eight cutie names and rarities</td><td><code>index.html</code> — each machine's <code>roster</code></td></tr>
    <tr><td>How every cutie is drawn</td><td><code>index.html</code> — <code>artTeddy</code>, <code>artBunny</code>, <code>artDino</code>, <code>artFly</code>, <code>artCandy</code>, <code>artUni</code></td></tr>
    <tr><td>The grab maths</td><td><code>index.html</code> — <code>evaluateGrab</code></td></tr>
    <tr><td>The claw's six moods</td><td><code>index.html</code> — <code>clawTick</code></td></tr>
    <tr><td>The physics of the pit</td><td><code>index.html</code> — <code>step</code> and <code>clawShove</code></td></tr>
    <tr><td>What gets saved</td><td><code>index.html</code> — <code>freshSave</code> and <code>persist</code></td></tr>
    <tr><td>The win rates</td><td><code>README.md</code> — the measured table</td></tr>
    <tr><td>Everything on a PROPOSED page</td><td>Nowhere. Those are ideas, and they are not true until Ella says so.</td></tr>
  </tbody></table>

  <h2>The drawings in this binder</h2>
  <p>The twelve concept plates are not paintings of the game — they are drawn <b>with the game's own art code</b>. Every cutie on every plate is the real cutie, drawn by the real drawing recipe, at the real size. The parts that are new — the faces, Clawdia, the dream cabinet, the bedroom — are drawn in the same style, using the same colours, so that anything approved can go straight into the game without being redrawn.</p>
  <p>They live in <code>docs/concepts/</code> as twelve separate files. Print any one of them on its own whenever a plan changes.</p>

  <h2>Keeping this binder true</h2>
  <ul>
    <li>Check the build number at the top of Tab 02 whenever the game changes.</li>
    <li>Give every new page one of the six labels.</li>
    <li>Write the CMC number on anything Ella has approved.</li>
    <li>Update the README whenever something a player can see changes.</li>
    <li>Never mix a real drawing and an idea drawing without a label. That is how a game slowly forgets what is real.</li>
    <li>Keep replaced pages. A binder with its history in it is worth ten binders that only know today.</li>
  </ul>

  <div class="box hot" style="margin-top:.24in">
    <h4>One last thing 🩷</h4>
    <p>Claw Machine Cuties is already a properly good game. It has real physics, honest odds, forty-eight characters with names somebody cared about, hand-made sound, and a parade at the end. Most games do not have any of that. Everything in this binder is an idea about how to make a good game better — and every single one of them is Ella's to accept, change, or throw straight in the bin.</p>
  </div>
</div>

</body></html>`;
}
