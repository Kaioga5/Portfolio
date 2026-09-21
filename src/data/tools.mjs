/* Tools. Claims come from the repos (README, manifests). */

export const tools = [
  {
    slug: 'bbmodel-unpack',
    roles: ['Developer'],
    name: 'BBModel Unpack',
    kind: 'VS Code extension and CLI',
    accent: '#FFB13D',
    icon: 'bbmodel-unpack.svg',
    iconAlt: 'An amber isometric cube lifting out of an open slate crate.',
    repo: 'https://github.com/Kaioga5/BBModel-Unpack',
    marketplace: 'https://marketplace.visualstudio.com/items?itemName=Kaioga.bbmodel-unpack',
    hook: 'Get everything out of a .bbmodel without opening Blockbench.',
    text:
      'Right-click a <code>.bbmodel</code> in VS Code and get a tidy folder of Bedrock ' +
      'geometry, animations, animation controllers and decoded textures. The converter ' +
      'underneath is its own dependency-free package with a CLI, so Regolith filters and ' +
      'build scripts can use it too.',
    points: [
      'Matches Blockbench’s own export: mirrored UVs, box UV, locators, keyframe types, Molang',
      'Tells you when something couldn’t convert exactly instead of quietly guessing',
      'Reads every .bbmodel version from 3.x to 5.0',
    ],
  },

  {
    slug: 'block-templates',
    roles: ['Developer'],
    name: 'Kaiōga’s Block Templates',
    kind: 'Block template library',
    accent: '#7E9BFF',
    icon: 'block-templates-logo.png',
    iconAlt: 'Three blue isometric blocks stacked in a pyramid with a script B on the front.',
    repo: 'https://github.com/Kaioga5/Kaioga-s-Block-Templates',
    hook: 'Working custom blocks, made for Minecraft creators.',
    text:
      'Vanilla packs don’t ship block files, so every custom block starts from nothing. ' +
      'This is a library of working block definitions you can copy: building blocks, ' +
      'plants, crops, redstone, lighting and interactive blocks, each one a matched ' +
      'behaviour and resource pack pair with a one-click <code>.mcaddon</code>. It exists ' +
      'to make building things easier for other creators.',
    points: [
      'Runs on the stable platform, no experimental toggles',
      'Every template says what it does and what it doesn’t',
      'Older modules kept as they shipped, from 1.20.50 to 1.26.40',
    ],
    facts: [
      ['Templates', '76'],
      ['Current module', '1.26.50'],
      ['Licence', 'Free for noncommercial use'],
    ],
  },
];

/* not rendered: unreleased. Move it back into `tools` (first) when it ships. */
export const shelved = [
  {
    slug: 'model-to-particle',
    name: 'Model-to-Particle',
    kind: 'VS Code extension',
    accent: '#6EE7FF',
    icon: 'model-to-particle.svg',
    iconAlt: 'A wireframe cube dissolving into a cluster of glowing square pixels.',
    // no public repo yet
    status: 'Source not public yet',
    hook: 'Turn a Blockbench model into a particle effect.',
    text:
      'Bedrock can’t put a 3D model in the world without an entity or a block behind it, ' +
      'but particles can be spawned anywhere. This converts a <code>.bbmodel</code> (or ' +
      'Bedrock geometry JSON) into a particle effect where every face is a quad locked to ' +
      'its real orientation, so you can walk around it and it stays a model instead of ' +
      'turning into a poster. One command spawns it.',
    points: [
      'Handles cube models, box and per-face UV, embedded or external textures, and transparency',
      'Optimises without losing anything: hidden faces dropped, coplanar faces merged, one packed atlas',
      'Ships calibration and diagnostic packs for the engine behaviour the docs don’t cover',
    ],
    notYet: 'Meshes and animations aren’t supported yet.',
  },
];
