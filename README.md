# 🧸 Claw Machine Cuties

The cutest claw machines you've ever played.

An arcade of six kawaii claw machines, each stuffed with hand-drawn plushies.
Win three from a machine and the third one comes tied to a golden key that
unlocks the next one — and throws a parade in your honour.

**Play it:** open `index.html`. That's the whole thing.

## What's in the arcade

| # | Machine | Prize | Difficulty |
|---|---------|-------|------------|
| 1 | 🧸 Teddy Bear Bonanza | teddies with eight different coloured bows | easiest |
| 2 | 🐰 Bunny Hop Hop | floppy-eared bunnies | ↓ |
| 3 | 🦕 Dino Stomp | tiny spiky dinosaurs | ↓ |
| 4 | 🦋 Butterfly Breeze | patterned butterflies | ↓ |
| 5 | 🍬 Sweet Tooth Sugar Rush | lollipops, macarons, donuts, cupcakes | ↓ |
| 6 | 🦄 Unicorn Dream Machine | unicorns *and* one of every other cutie | hardest |

Every machine holds 8 collectable variants — 48 plushies in all, including
rare ✨ and legendary 👑 ones. They all live in the album (📖).

## Controls

|  | Desktop | Mobile |
|--|---------|--------|
| Move the claw | arrow keys / WASD | drag the joystick |
| Drop | space or enter | the big pink DROP button |
| Back to the arcade | escape | ← |

Up and down move the claw **deeper into and out of** the cabinet — it's a real
3D pit, not a flat one, so depth is half the aim.

## It is hard. It is not rigged.

Good grabs are rare on purpose, but nothing about the outcome is fudged. Every
drop is scored from three things you actually control:

- **aim** — how close to a plushie's centre the claw came down
- **exposure** — how many other plushies are sitting on top of the one you grabbed
- **the machine** — a fixed grip strength per cabinet, hardest in the unicorn machine

Those multiply into a score, and one random roll decides between *grabbed*,
*grabbed then slipped* (the heartbreaking one), and *fumbled*. There is no
hidden "you're not allowed to win yet" counter, no rubber-banding, and no
payout timer. A failed grab still shoves the pile around, so digging a plushie
loose over several tries is a genuine strategy.

Measured grab rates for a player aiming at a plushie they like the look of:

| Machine | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| casual aim | 48% | 39% | 31% | 23% | 18% | 14% |
| careful aim | 65% | 55% | 39% | 31% | 25% | 20% |

Which works out to roughly 75 drops — about 20–30 minutes — to clear the whole
arcade. Roughly a quarter of all drops are slips: the claw closes, lifts your
plushie, carries it halfway to the chute and then drops it.

## Under the hood

One self-contained `index.html`. No build step, no dependencies, no network
requests, nothing to install.

- **Art** — every plushie, cabinet, float and joystick is hand-written SVG.
  No image files, no icon fonts.
- **Sound** — the arcade tune and every effect are synthesised live with the
  Web Audio API. No audio files.
- **Physics** — plushies are spheres in a real 3D pit (x, y, z) with gravity,
  stacking, and collision response. Depth drives the perspective projection and
  the draw order.
- **Progress** — saved to `localStorage`; there's a reset button in the album.
- **Extras** — confetti, screen sparkles, haptics on mobile, and a full
  `prefers-reduced-motion` path.

## 📓 The development binder

Ella's development binder lives in [`docs/`](docs/) — a 43-page printable master with
twelve full-page concept plates for **Version 2.0, The Big Cuteness Update**.

**[Read the PDF →](docs/pdf/claw-machine-cuties-development-binder.pdf)**

The plates are drawn with the game's own art code, so every cutie on them is the real
cutie. Rebuild everything with `node docs/binder/build.mjs`.
