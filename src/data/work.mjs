/**
 * Projects, newest first.
 *
 * `date` is the Marketplace release date (ISO) and is what the order is based
 * on; the build refuses to run if dated projects fall out of order. Projects
 * without a known release date carry `undated: true` and a comment explaining
 * where they sit and why. Nothing here is a guess: figures come from the
 * public Marketplace listings, and the Beyond Survival numbers come from the
 * 2.0.0 submission package itself.
 *
 * `roles` is what Kaiōga did on the project, shown as chips under the tagline.
 * `contribution` is an optional one-line note on top of that; while it still
 * reads exactly PLACEHOLDER_CONTRIBUTION it is not rendered.
 */

export const FIGURES_AS_OF = 'August and September 2026';

export const PLACEHOLDER_CONTRIBUTION = 'Development work on the shipped add-on.';

const pdp = (id) => `https://www.minecraft.net/en-us/marketplace/pdp?id=${id}`;

export const work = [
  /* Release date from the Marketplace trackers (bedrockexplorer.com); the
     listing itself shows no date. */
  {
    slug: 'festive-biomes',
    roles: ['Project Manager', 'Head Developer'],
    title: 'Festive Biomes',
    tagline: 'Christmas all year, in four new biomes.',
    studio: 'Piki Studios',
    kind: 'Marketplace add-on',
    date: '2026-05-12',
    released: '12 May 2026',
    accent: '#F2A6C8',
    cover: true,
    link: pdp('740e3cbe-0db0-4515-8a03-8238767c3672'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'Piki Studios’ holiday add-on. It adds four new biomes, from icy wonderlands to ' +
      'candy-covered plains, each with its own underground, and it’s built to still feel ' +
      'like vanilla. Over 200 new blocks and more than 30 mobs come with it.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '4 new biomes, each with its own underground',
      '200+ blocks and 30+ mobs',
      'Keeps the vanilla feel',
    ],
    rating: { score: 4.6, count: '51 ratings' },
    price: '990 Minecoins',
    shots: [
      { src: '01', alt: 'A gingerbread village on white snow, with candy canes and a gingerbread mob.' },
      { src: '02', alt: 'A dark cave lined with gingerbread blocks and glowing lanterns.' },
      { src: '03', alt: 'A pink candy cave with cotton-candy trees and sweets on the ground.' },
      { src: '04', alt: 'A snowy plain with candy mobs and pink trees on the horizon.' },
    ],
  },

  {
    slug: 'village-defense',
    roles: ['Project Manager', 'Head Developer'],
    title: 'Village Defense',
    tagline: 'Build a village, then keep it alive.',
    studio: 'Piki Studios',
    kind: 'Marketplace add-on',
    date: '2026-04-28',
    released: '28 Apr 2026',
    accent: '#3FC4A8',
    cover: true,
    link: pdp('c8d934dc-a5bb-414d-b8d5-e5cd8fa6b74c'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'Village building crossed with wave defence. Your villagers are the thing worth ' +
      'protecting: their homes and workshops level up through a coin economy with its own ' +
      'bank, you place and upgrade defences, and a builder mode handles where everything ' +
      'goes. Ten enemy types and three bosses come knocking, and all of it holds up in ' +
      'multiplayer.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '10 enemies and 3 bosses across escalating waves',
      '20+ upgradable buildings, 5 defences, 10+ weapons',
      'A bank, a coin economy and a builder mode',
    ],
    rating: { score: 3.5 },
    price: '990 Minecoins',
    minVersion: '1.21.120',
    shots: [
      { src: '01', alt: 'A defended village under attack, a mounted defence firing at approaching mobs.' },
      { src: '02', alt: 'A watchtower and armed villagers holding a line at the village edge.' },
      { src: '03', alt: 'An aerial view of the whole village with its walls and outbuildings.' },
      { src: '04', alt: 'A structure being placed in builder mode with on-screen placement hints.' },
      { src: '05', alt: 'On-screen coin transfer notifications during a defence round.' },
      { src: '06', alt: 'The village hall dialog offering buy, upgrade and repair options.' },
      { src: '07', alt: 'The bank villager interface showing copper, silver and gold balances.' },
    ],
  },

  {
    slug: 'tiny-takeover',
    roles: ['Developer'],
    title: 'Tiny Takeover: Mini Mania',
    tagline: 'Baby mobs, big chaos.',
    studio: 'JWolf Creations',
    kind: 'Marketplace add-on',
    date: '2026-04-21',
    released: '21 Apr 2026',
    accent: '#FF7FB8',
    cover: true,
    link: pdp('cdf6c886-a6c6-4167-9d35-2c26c8840d92'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'A free add-on made for Minecraft’s Tiny Takeover event. It’s a set of short co-op ' +
      'minigames: round up baby farm animals, hold off waves of baby zombies, catch bees ' +
      'that scatter everywhere. Points go toward a collection of over 130 plushies, ' +
      'tracked in a Discovery Journal. It drops into any world, so there’s no new map to ' +
      'load.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      'Co-op minigames with a shared score',
      '130+ collectible plushies and a Discovery Journal',
      'Works in the world you already have',
    ],
    rating: { score: 4.8, count: '38,020 ratings' },
    price: 'Free',
    shots: [
      { src: '01', alt: 'A shop interior with shelves of collectible plushies and players browsing.' },
      { src: '02', alt: 'Players herding baby bees and farm animals across a sunny village field.' },
      { src: '03', alt: 'Baby mobs gathered on a desert ridge at dusk.' },
      { src: '04', alt: 'A Nether portal scene with baby piglins and a player in bright armour.' },
      { src: '05', alt: 'A dark cave lit by lanterns with baby skeletons and zombies closing in.' },
    ],
  },

  {
    slug: 'vampire-biomes',
    roles: ['Head Developer'],
    title: 'Vampire Biomes',
    tagline: 'Pick a side: hunter or vampire.',
    studio: 'Waypoint Studios',
    developer: 'Butterfly Games',
    kind: 'Marketplace add-on',
    date: '2026-04-21',
    released: '21 Apr 2026',
    accent: '#E4324F',
    cover: true,
    link: pdp('473238dd-1d80-4871-b071-2152683cc347'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'A vampire overhaul for any world. You choose hunter or vampire and unlock abilities ' +
      'through rituals instead of a menu. Vampires command bat swarms and can turn into a ' +
      'bat; hunters get weapons of their own. Both sides work toward boss fights, Dracula ' +
      'included, across new blood-touched biomes.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      'Two progression paths, unlocked through rituals',
      'Named bosses with their own health and phase UI',
      'New biomes, exclusive weapons and bat-form flight',
    ],
    rating: { score: 4.1, count: '175+ ratings' },
    price: '990 Minecoins',
    shots: [
      { src: '01', alt: 'A gothic castle silhouetted under a full moon, two players watching from the grass.' },
      { src: '02', alt: 'Three vampire characters in ornate armour standing in a candlelit hall.' },
      { src: '03', alt: 'The Dracula boss fight with a named health bar and vampire stats HUD.' },
      { src: '04', alt: 'Hunters in mixed armour advancing through a crimson biome.' },
      { src: '05', alt: 'A player and a pale mount inside a cavern of dark red growth.' },
      { src: '06', alt: 'Players around a campfire surrounded by candles and hanging bats.' },
    ],
  },

  {
    slug: 'cut-the-rope',
    roles: ['Developer'],
    title: 'Cut the Rope',
    tagline: 'Om Nom, in blocks.',
    studio: 'Mush Co',
    licensor: 'ZeptoLab',
    kind: 'Marketplace add-on',
    date: '2025-12-02',
    released: '2 Dec 2025',
    accent: '#8FD14F',
    cover: true,
    link: pdp('b5c52ceb-8b81-4f97-9aae-f5fa668c0278'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'An official Cut the Rope crossover. Om Nom joins you as a companion, there are ' +
      'candy-powered puzzle minigames, and a wardrobe of costumes and accessories that ' +
      'combine into hundreds of looks. It also adds physics blocks, like magnets, fans and ' +
      'jumbo fireworks, so you can build puzzles of your own.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '50+ costumes and accessories, 400+ combinations',
      'Candy tools, bubbles and puzzle blocks',
      'Included with Marketplace Pass',
    ],
    rating: { score: 4.7, count: '1,167 ratings' },
    price: '990 Minecoins',
    minVersion: '1.21.120',
    shots: [
      { src: '01', alt: 'Om Nom beside a wooden puzzle rig of ropes and candy in a Minecraft world.' },
      { src: '02', alt: 'Fireworks and floating candy rings above a group of costumed Om Nom characters.' },
      { src: '03', alt: 'A wooden interior lined with shelves of Om Nom plushies and costume variants.' },
      { src: '04', alt: 'A night village lit by lanterns with Om Nom characters gathered around a cauldron.' },
      { src: '05', alt: 'A framed puzzle painting on a dark stone wall with characters watching.' },
    ],
  },

  /* Release dates for these two come from the Marketplace trackers
     (bedrockexplorer.com); the listings show none. */
  {
    slug: 'more-biomes',
    roles: ['Developer'],
    title: 'More Biomes',
    tagline: 'Fourteen new biomes, above ground and below.',
    studio: 'Pixelusion',
    kind: 'Marketplace add-on',
    date: '2025-09-09',
    released: '9 Sep 2025',
    accent: '#E8C23A',
    cover: true,
    link: pdp('90bfd8db-9ff1-4f56-a4ea-d0ea868832f5'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'Pixelusion’s biome expansion: fourteen new biomes across forests, caves, the End ' +
      'and the sky, each with its own trees, wood sets, foliage, mobs and structures.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '14 biomes: forest, cave, End and sky',
      'New trees, wood sets and foliage',
      'Mobs, structures, items and blocks to match',
    ],
    rating: { score: 4.2, count: '1,106 ratings' },
    price: '990 Minecoins',
    shots: [
      { src: '01', alt: 'Tall pink crystal trees under a purple sky.' },
      { src: '02', alt: 'A misty enchanted forest with pale spirit mobs and glowing motes.' },
      { src: '03', alt: 'A pink forest with white-trunked trees and a horned deer mob.' },
      { src: '04', alt: 'Giant blue and red mushrooms with a small mushroom creature.' },
      { src: '05', alt: 'An autumn forest with orange leaves, a stone shrine and a pale beast.' },
      { src: '06', alt: 'A sleeping bear in a redwood forest.' },
      { src: '07', alt: 'A floating sky island with a winged creature above it.' },
    ],
  },

  {
    slug: 'ghosts',
    roles: ['Developer'],
    title: 'Ghosts',
    tagline: 'Every mob has a ghost now.',
    studio: 'Piki Studios',
    kind: 'Marketplace add-on',
    date: '2025-08-05',
    released: '5 Aug 2025',
    accent: '#9EDCEB',
    cover: true,
    link: pdp('054ac515-f2c5-4365-a5ed-b7065040b6b3'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'A Piki Studios add-on where every creature gets a ghost version, over seventy of ' +
      'them. You can’t touch them, but you can defend yourself: there are ectoplasm and ' +
      'silver items and blocks to craft, and silver ruins to find in the world. Better ' +
      'with friends.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '70+ ghost versions of mobs',
      'Ectoplasm and silver items and blocks',
      'Silver ruins out in the world',
    ],
    rating: { score: 4.6, count: '20 ratings' },
    price: '660 Minecoins',
    shots: [
      { src: '01', alt: 'Ghost mobs drifting over a dark forest at night.' },
      { src: '02', alt: 'A village at night with ghost animals crossing the fields.' },
      { src: '03', alt: 'A room built from silver blocks, seen from inside.' },
      { src: '04', alt: 'A cave full of ghost mobs above lava.' },
    ],
  },

  {
    slug: 'the-dawn-era',
    roles: ['Developer'],
    title: 'The Dawn Era',
    tagline: 'Eleven dinosaurs, and a world that carries on without you.',
    studio: 'Mush Co',
    kind: 'Marketplace add-on',
    date: '2024-07-30',
    released: '30 Jul 2024',
    updated: 'May 2026',
    accent: '#F0A32B',
    cover: true,
    link: pdp('1bca9a28-7cda-4feb-a4db-30a03ae771f9'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'A survival dinosaur add-on: eleven species to find, tame, breed and ride, an ' +
      'aquatic tier headed by Dunkleosteus, craftable gear, and predator and prey ' +
      'behaviour that keeps running whether or not you’re watching. It first shipped in ' +
      '2024 and is still getting updates.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '11 species to discover, tame and raise',
      'An ecosystem, not just spawn tables',
      'Craftable gear and per-creature behaviour settings',
    ],
    rating: { score: 4.6, count: '7,314 ratings' },
    price: '490 Minecoins',
    shots: [
      { src: '01', alt: 'A dense jungle clearing with dinosaurs moving between the trees.' },
      { src: '02', alt: 'A large theropod facing a chicken across a grass field, for scale.' },
      { src: '03', alt: 'Sunset over a shoreline with dinosaurs silhouetted against the sky.' },
      { src: '04', alt: 'A Dunkleosteus swimming past the player underwater with a health bar shown.' },
      { src: '05', alt: 'A river valley with a long-necked dinosaur crossing the shallows.' },
      { src: '06', alt: 'Kelp beds and swimming reptiles seen from below the surface.' },
    ],
  },

  /* The listing shows no release date. It was already live when this portfolio
     first went up (June 2024), so it sits after The Dawn Era, which came out
     that July. Counts are taken from the 2.0.0 package, not the listing. */
  {
    slug: 'beyond-survival',
    roles: ['Project Manager', 'Head Developer'],
    title: 'Beyond Survival',
    tagline: 'Survival, with a lot more in it.',
    studio: 'Piki Studios',
    kind: 'Marketplace add-on',
    undated: true,
    accent: '#2EC4E8',
    cover: true,
    link: pdp('18639b36-e09f-41d6-8ecd-011a988a04c2'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'Piki Studios’ survival expansion: new mobs with their own abilities, new ores and ' +
      'gear, and a big pile of building blocks. The 2.0 update grows it a lot. It adds ' +
      'eighteen custom biomes, over a hundred structures across the Overworld and the ' +
      'End, around sixty new mobs plus a set of mob statues, and more than five hundred ' +
      'new blocks and items each.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      '18 custom biomes and 100+ structures in 2.0',
      'New mobs, ores, tools and armour sets',
      '500+ blocks: bricks, pillars, painted wood, doors, traps and more',
    ],
    rating: { score: 3.8, count: '705 ratings' },
    price: '830 Minecoins',
    version: '1.1 live, 2.0 in the works',
    shots: [
      { src: '01', alt: 'An End forest of pale trees and glowing pink flowers, with winged mobs overhead.' },
      { src: '02', alt: 'A golden autumn forest with a golem walking between red flowers.' },
      { src: '03', alt: 'Mossy stone ruins beside a birch forest, a lantern lit at the doorway.' },
      { src: '04', alt: 'A tall wooden hall lined with bookshelves and lanterns.' },
      { src: '05', alt: 'A stone throne room with moss on the floor and carved wall symbols.' },
      { src: '06', alt: 'A large dark ship at sea under a full moon.' },
      { src: '07', alt: 'A moonlit birch clearing with a rider on a purple horse.' },
      { src: '08', alt: 'A dark mushroom forest with glowing eyes between the trees.' },
    ],
  },

  /* A realm, not a Marketplace listing, so there is no release date to show.
     It predates everything above. */
  {
    slug: 'mob-prison',
    roles: ['Project Manager', 'Head Developer'],
    title: 'Mob Prison',
    tagline: 'A realm that grew past 600 players.',
    kind: 'Bedrock realm',
    undated: true,
    accent: '#5BB3F5',
    link: 'https://youtu.be/vMJob-XLvck',
    linkLabel: 'Watch the trailer',
    summary:
      'A Minecraft Bedrock realm with over 600 players. Prisons, plots, dungeons and ' +
      'arenas where you fight custom mobs with new weapons, all on one persistent server.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [],
    players: '600+',
    shots: [{ src: '01', alt: 'A harbour town of stone and timber buildings around a turquoise canal.' }],
  },

  /* Still being built, so it closes the list. */
  {
    slug: 'kaioga-project',
    roles: ['Project Manager', 'Head Developer'],
    title: 'Kaiōga’s Project',
    tagline: 'The big one. Still building it.',
    kind: 'Personal project',
    status: 'In development',
    undated: true,
    accent: '#B48CFF',
    link: 'https://discord.gg/32VWj26XBD',
    linkLabel: 'Follow along on Discord',
    summary:
      'A story-driven MMORPG inside Minecraft: an open world with its own terrain and ' +
      'structures, and a reworked combat system with new stats, weapons and gear. It’s my ' +
      'own long-running project, and there’s a lot of it still to build.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [],
    shots: [{ src: '01', alt: 'A timber-framed building with a bell tower, a large castle rising behind it.' }],
  },
];

/* Not shown yet: the LycanForge update this describes has not been released.
   Move it back into `work` (it goes after Cut the Rope) when it is. The
   images stay in assets/img/work/lycan-forge. */
export const shelved = [
  {
    slug: 'lycan-forge',
    title: 'LycanForge',
    tagline: 'A werewolf you have to earn.',
    studio: 'JWolf Creations',
    kind: 'Marketplace add-on',
    date: '2025-08-19',
    released: '19 Aug 2025',
    updated: 'Jan 2026',
    accent: '#8FA8FF',
    cover: true,
    link: pdp('1cb294e2-efe3-4b71-9099-52f7d034b3ed'),
    linkLabel: 'See it on the Marketplace',
    summary:
      'Werewolf transformation as a progression system. Craft the Lycan Forge and you ' +
      'unlock claws, night vision, wall climbing and howls in stages, instead of getting ' +
      'everything at once. Your werewolf’s look is built from layered parts (the listing ' +
      'counts over two million combinations), and the whole thing is built to survive ' +
      'multiplayer.',
    contribution: 'Development work on the shipped add-on.',
    highlights: [
      'Abilities unlock in stages, not with one toggle',
      '2,000,000+ looks from layered parts',
      'Survival and multiplayer safe, with custom player animations',
    ],
    rating: { score: 4.8, count: '893 ratings' },
    price: '830 Minecoins',
    shots: [
      { src: '01', alt: 'Three werewolf variants standing together at night under a bright moon.' },
      { src: '02', alt: 'A transformation ritual circle glowing red on the ground at night.' },
      { src: '03', alt: 'A player mid-transformation in a moonlit forest clearing.' },
      { src: '04', alt: 'A werewolf bounding across orange desert terrain in daylight.' },
      { src: '05', alt: 'The Lycan Forge set up inside a stone room with potions and a red carpet.' },
      { src: '06', alt: 'A small night camp with a smoking campfire and a distant figure.' },
    ],
  },
];
