# Kaiōga — portfolio

Personal portfolio for Minecraft Bedrock add-on work and the tooling around it.
Static site, no framework, no runtime dependencies, served straight from GitHub Pages.

**Live:** https://kaioga5.github.io/Portfolio/

---

## How it works

`index.html` is **generated**. Do not hand-edit it — your changes will be
overwritten on the next build.

```
src/data/*.mjs   ← the content lives here
src/build.mjs    ← renders it to index.html + 404.html
assets/          ← css, js, fonts, images (hand-written / pre-optimised)
index.html       ← generated, committed so Pages can serve it
```

Rebuild after editing anything under `src/`:

```bash
npm run build
```

That is plain `node src/build.mjs`. There is nothing to install — `package.json`
has no dependencies. Node 18+.

Preview locally:

```bash
npm run serve
```

---

## Editing content

### Adding detail about your contribution to a project

This is the one field most worth filling in, and it is the only thing on the
page that is currently switched off. Each entry in
[`src/data/work.mjs`](src/data/work.mjs) has a `contribution` line which still
reads the shared placeholder:

```js
contribution: 'Development work on the shipped add-on.',
```

While it matches `PLACEHOLDER_CONTRIBUTION`, **no contribution line is rendered
for that project** — six identical sentences say less about you than none.
Replace it with whatever is accurate and specific:

```js
contribution: 'Built the entity behaviours and animation controllers for the boss encounters.',
```

and it appears, marked with a rule, inside that project's panel. Nothing else
needs to change.

### Fields on a project

| Field | What it does |
| --- | --- |
| `title` | the line in the index |
| `studio`, `date`, `released` | the studio, the ISO release date the order is checked against, and the date as shown |
| `tagline` | the line under the title |
| `summary` | the paragraph; may contain inline `<code>` |
| `highlights` | up to three short points |
| `rating`, `price`, `minVersion`, `updated`, `version`, `licensor`, `developer`, `players`, `status` | the facts strip; each renders only if present |
| `cover` | `true` when `cover.webp` exists; projects without one use their first screenshot as the poster and are left out of the deck |
| `accent` | the colour sampled from the key art; it becomes the biome while the project is in view |
| `shots` | the reel, in the order they should appear; `src` matches the file basename. A project with a single shot gets no reel |
| `link` | Marketplace listing URL |

The `work` array is newest first, and the build refuses to run if the dated
projects fall out of that order. Projects that are not public yet live in the
`shelved` array at the bottom of the same file (currently LycanForge, whose
update has not shipped); nothing in `shelved` is rendered, and its images stay
in `assets/img/work/`. Move an entry back into `work` when it releases. Listing figures come from the public
Marketplace pages; when you refresh them, bump `FIGURES_AS_OF` at the top of
the file so the note under the projects stays honest.

### Adding a project

Add an object to the `work` array, then drop its imagery into
`assets/img/work/<slug>/` following the existing naming:

```
cover.webp        800×343 or larger at the same ratio; key art with the Marketplace "Add-On" badge cropped off
cover-400.webp    400×172
01.webp           800×450 or larger 16:9
01-480.webp       480×270
02.webp …                   the reel, in the order they should appear
```

Screenshots need both the full and the `-480` variant; key art needs `cover.webp`
and `cover-400.webp`. The `srcset` references both sizes of each, and the
generator reads their dimensions off the files.

### Tools

[`src/data/tools.mjs`](src/data/tools.mjs). Every claim there is derived from the
tool's own repository (README, `package.json`, source layout). Keep it that way:
if it is not in the repo, it does not belong on the page.

Link fields are `repo`, `marketplace` and `npm` — each renders only if present,
so leave out anything that is not live yet. A tool may carry `facts`
(`[label, value]` pairs) for a small strip under its points, and `icon` may be
an SVG or PNG in `assets/img/tools/`. Model-to-Particle is not released yet and
sits in the `shelved` array at the bottom of the file; move it back into
`tools` (first) when it ships.

### Everything else

[`src/data/site.mjs`](src/data/site.mjs) — name, greeting and lead, nav,
section intros, about, contact (the Discord username is the primary contact;
`socials` are the icon links) and credits.

---

## Design notes

**One idea: the page changes biome as you travel through the work.** Every
project carries a colour sampled from its key art (`accent` in
`src/data/work.mjs`). Whatever sits in the middle of the viewport sets
`--biome` on the root, and the paper, the top bar and the labels are all mixed
from it, so the whole page drifts toward a project's colour while you are
reading about it. The page ends at night.

**The deck.** The hero holds the key art of every Marketplace project as a
stack of cards. The top card sets the colour you arrive on; the stack leans
toward the pointer; it turns itself every few seconds when left alone, and the
arrows or a click on a back card bring one forward. Clicking the top card jumps
to that project.

**Scenes.** Each project is one scene: the key art whole, on a flat block of
its colour that sits a little behind it (the pointer tilts the pair), the copy,
a small strip of facts (rating as stars, price with a coin, release, version,
licence) and a reel of screenshots that runs off both edges, drags and flings
with a mouse, drifts a little as it scrolls past, and opens each shot in a
lightbox that grows out of its frame.

**Type.** Bricolage Grotesque, one family for everything, self-hosted as two
subsets. **Colour.** Warm paper, near-black ink, one orange for the mark and
the night section, and the project accents.

**Motion.** The page arriving (greeting, lead, the cards dealing in), a scene
settling as it enters, the biome gliding, the deck turning, posters answering
the pointer, reels flinging, the lightbox growing. All of it is gated behind
`prefers-reduced-motion`, and entrance states only apply once the page has
confirmed its script is running; if `site.js` fails to load, a failsafe in the
document head uncovers everything.

## Credits

Project key art and screenshots are the property of their respective studios and
Mojang Studios, reproduced to illustrate work contributed to. Minecraft is a
trademark of Mojang Synergies AB. This site is not affiliated with or endorsed by
Mojang Studios or Microsoft.
