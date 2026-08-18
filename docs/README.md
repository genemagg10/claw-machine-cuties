# 📓 Claw Machine Cuties — Development Binder

**Made for Ella — Creator, Owner & Game Boss.**
Working master · August 2026 · game checked at build `1c0c853`

The binder holds three things and keeps them apart on purpose: the game **as it is
now**, **ideas** for the next version, and **Ella's choices**. Every page carries one
of six labels — CURRENT, PROPOSED, APPROVED, BUILT, REPLACED, NO THANKS — so nobody
ever mixes up a dream with a fact.

## 📄 Print this

**[`pdf/claw-machine-cuties-development-binder.pdf`](pdf/claw-machine-cuties-development-binder.pdf)**
— 43 pages, US Letter, ready for a three-ring binder with fourteen divider tabs.

## 🎨 The twelve concept plates

Full-page mock-ups of what Version 2.0 could look like. Every cutie on every plate is
drawn by the game's **own art code**, so anything Ella approves can go straight into
`index.html` without being redrawn.

| Plate | Idea | Fixes |
|---|---|---|
| [Cover](concepts/00-cover.svg) | The binder cover | — |
| [1](concepts/01-arcade-now.svg) | **The Arcade Right Now** — an honest snapshot | *(CURRENT)* |
| [2](concepts/02-everybody-look-up.svg) | **Everybody Look Up!** — cuties that watch the claw, and a target ring | you can't tell what you're aiming at |
| [3](concepts/03-feelings-sheet.svg) | **The Cutie Feelings Sheet** — one face layer, thirteen moods | losing is silent |
| [4](concepts/04-meet-clawdia.svg) | **Meet Clawdia** — the claw gets a face and a name | losing is silent |
| [5](concepts/05-cabinet-glow-up.svg) | **Cabinet Glow-Up** — before and after | how the game looks |
| [6](concepts/06-the-good-miss.svg) | **The Miss That Feels Good** — four in five drops fail; make them the best part | losing is silent |
| [7](concepts/07-new-machines.svg) | **Six New Machines** — each changes a rule, not a colour | — |
| [8](concepts/08-cutie-home.svg) | **The Cutie Home** — where the plushies actually live | winning leads nowhere |
| [9](concepts/09-sticker-scrapbook.svg) | **The Sticker Scrapbook** — the album becomes a treasure | winning leads nowhere |
| [10](concepts/10-bow-boutique.svg) | **The Bow Boutique** — the doubles finally have a job | winning leads nowhere |
| [11](concepts/11-biggest-parade.svg) | **The Biggest Parade Ever** — the ending the game has earned | — |

## 🔍 The three honest problems Version 2.0 is aimed at

1. **You cannot tell what you are aiming at.** The pit is genuinely 3D and depth is
   genuinely hard to read. → Plates 2 and 5.
2. **Losing is silent.** Four out of five drops fail and show a grey banner. The most
   common thing in the game is the emptiest. → Plates 3, 4 and 6.
3. **Winning does not lead anywhere.** Forty-eight lovingly named cuties go into a grid
   of squares and stay there. → Plates 8, 9, 10 and 11.

## 🚫 What Version 2.0 must not do

- **Never change the odds.** The game's proudest sentence is *"It is hard. It is not
  rigged."* Nothing in this binder makes a grab more or less likely.
- **Nothing that nags.** No daily streaks, no come-back-tomorrow-or-lose-it.
- **Keep the one-file rule.** If the game stops opening instantly, it's the wrong change.
- **Never rename anything Ella named.**
- **Never remove calm mode.** Every new sparkle needs a still version.

## 🛠 Rebuilding the binder

The plates and the binder are generated, so they can never drift away from the game:

```
node docs/binder/build.mjs          # writes docs/concepts/*.svg and docs/binder/binder.html
```

Then print `docs/binder/binder.html` to PDF (US Letter, no margins, no headers).

| File | What it is |
|---|---|
| `binder/lib/game-art.mjs` | The plushie art, **extracted verbatim** from `index.html` |
| `binder/lib/game-cabinet.mjs` | The pit projection and cabinet, also verbatim |
| `binder/lib/parts.mjs` | New *proposed* art: moods, Clawdia's faces, cat/sheep/space cuties |
| `binder/lib/scene.mjs` | Poses the real cabinet with a real pile and the claw |
| `binder/lib/plate.mjs` | The shared look of every plate |
| `binder/plates-a.mjs` · `plates-b.mjs` | The twelve plates |
| `binder/binder.mjs` | The binder text — tables are generated from the game's own data |

If the game's art or roster changes, re-extract `game-art.mjs` from `index.html`
(lines 465–809) and `game-cabinet.mjs` (lines 929–1033), then rebuild.
