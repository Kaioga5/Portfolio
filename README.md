# Portfolio

My portfolio site: Minecraft Bedrock Marketplace add-ons and tools for creators.
Static HTML, no framework, hosted on GitHub Pages.

Live: https://kaioga5.github.io/Portfolio/

## Build

`index.html` is generated. Don't edit it by hand, edit `src/` and rebuild.

```
src/data/*.mjs   content
src/build.mjs    generator -> index.html + 404.html
assets/          css, js, fonts, images
```

```bash
npm run build    # node src/build.mjs, no dependencies, Node 18+
npm run serve    # build + local server
```

## Content

### Projects (`src/data/work.mjs`)

Newest first. `date` is the ISO release date and the build fails if dated
entries are out of order. Undated entries have a comment saying where they go.

| Field | Notes |
| --- | --- |
| `title`, `tagline`, `summary` | `summary` may contain inline `<code>` |
| `studio`, `date`, `released` | release date as ISO and as displayed |
| `roles` | rendered as chips under the tagline |
| `highlights` | up to three points |
| `rating`, `price`, `minVersion`, `updated`, `version`, `licensor`, `developer`, `players`, `status` | facts strip, each optional |
| `cover` | `true` if `cover.webp` exists. Without it the first screenshot is the poster and the project is left out of the hero deck |
| `accent` | colour from the key art, used as the page tint while the project is in view |
| `shots` | reel order; `src` is the file basename. One shot = no reel |
| `link`, `linkLabel` | listing URL |
| `contribution` | optional extra line; hidden while it equals `PLACEHOLDER_CONTRIBUTION` |

Unreleased projects go in the `shelved` array at the bottom of the file and
are not rendered. Bump `FIGURES_AS_OF` when refreshing Marketplace numbers.

Images go in `assets/img/work/<slug>/`:

```
cover.webp        800x343 (or larger, same ratio), Add-On badge cropped off
cover-400.webp    400x172
01.webp           800x450 or larger 16:9
01-480.webp       480x270
02.webp ...
```

Both sizes are required for each image. The generator reads dimensions from the files.

### Tools (`src/data/tools.mjs`)

Same idea. `repo`, `marketplace` and `npm` links render only if present.
`facts` is an optional `[label, value]` list. `icon` is an SVG or PNG in
`assets/img/tools/`. Unreleased tools sit in `shelved`.

### Everything else (`src/data/site.mjs`)

Nav, hero, section intros, about, contact (Discord username + social links), credits.

## Credits

Project key art and screenshots belong to their studios and Mojang Studios and are
shown to illustrate work I contributed to. Minecraft is a trademark of Mojang
Synergies AB. This site is not affiliated with or endorsed by Mojang Studios or Microsoft.
