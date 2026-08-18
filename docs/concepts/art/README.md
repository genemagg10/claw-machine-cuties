# 🎨 Art Direction Mockups — PROPOSED

Five full-screen visual targets for how Claw Machine Cuties could look.
**None of this is in the game yet.** These are Ella's to approve, change, or reject.

| # | Mockup | What it is showing |
|---|---|---|
| [1](01-title-lobby.png) | **Title & Arcade Lobby** | The front screen: six lit machines in a row, locked states, mascots on the roofs |
| [2](02-the-machine.png) | **The Machine, Playing** | The main gameplay screen — refined pile, target ring, Clawdia with a face, the chosen cutie |
| [3](03-inside-the-glass.png) | **Inside the Glass** | The material beauty shot — light shaft, depth of field, contact shadows |
| [4](04-the-cutie-cast.png) | **The Cutie Cast** | All eight Teddy Bear Bonanza cuties at the new fidelity, plus a **now → next** comparison |
| [5](05-cutie-home.png) | **Cutie Home & Album** | The UI screen: the bedroom from Plate 8 and the scrapbook from Plate 9, built |

## What "refined" means here, concretely

The characters keep their **silhouettes, palettes and coordinates**. What changes is the
material — so an approved design drops into `index.html` without redrawing anything:

- **Form shading** — a radial gradient ramp per body part, lit from the upper left
- **Rim light** — a warm arc along the top-left edge of every round form
- **Brushed nap** — short tangential fibres along the silhouette, not spikes
- **A fluff halo** — a blurred copy just behind each form
- **Stitched seams** — dashed lines where a real plushie would be sewn
- **Glossy eyes** — a graded iris, two glints, and a pink bounce-light on the lower lid
- **Contact shadows and ambient occlusion** where forms meet
- **Depth of field** — the back of the pile softened and desaturated

## Where the code lives

| File | What it does |
|---|---|
| `../../binder/lib/refined.mjs` | The material system and the refined teddy, bunny and unicorn |
| `../../binder/artdirection.mjs` | The five screen compositions |

Rebuild with `node docs/binder/build-art.mjs`, then screenshot the SVGs at 1600×1000.

**Still to refine:** dino, butterfly and the eight candy shapes. The system is written to
take them — each is about thirty lines once Ella approves the direction.
