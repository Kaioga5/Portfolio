/** Identity, copy and links that are not tied to a single project. */

export const site = {
  name: 'Kaiōga',
  handle: 'Kaioga5',
  role: 'Minecraft Bedrock creator',
  url: 'https://kaioga5.github.io/Portfolio/',
  email: 'landomgonzalezbff@gmail.com',
  description:
    'Kaiōga makes add-ons for the Minecraft Bedrock Marketplace and tools for other ' +
    'creators: converters, templates and the pipelines that take a model from Blockbench ' +
    'to a finished pack.',

  nav: [
    { href: '#work', label: 'Work' },
    { href: '#tools', label: 'Tools' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Say hi' },
  ],

  hero: {
    greeting: { head: 'Hi! I’m', name: 'Kaioga' },
    lead:
      'I make add-ons for the Minecraft Bedrock Marketplace, and tools that help other ' +
      'creators along the way: converters, templates, and the pipelines that take a model ' +
      'from Blockbench to a finished pack.',
    cue: 'Have a look around',
  },

  work: {
    heading: 'Work',
    lead: 'Add-ons I’ve worked on, newest first. Most of them were made with partner studios.',
  },

  tools: {
    heading: 'Tools',
    lead:
      'Things I’ve made for other creators. The fiddly parts of Bedrock shouldn’t have to ' +
      'be fiddly for everyone.',
  },

  about: {
    heading: 'About',
    lead:
      'I’m a Minecraft Bedrock creator, mostly on the add-on side: entities, custom ' +
      'blocks, animation controllers, behaviour and resource packs, and the JSON and Molang ' +
      'under all of it.',
    body: [
      'I work with partner studios on Marketplace releases.',
      'The tools are a separate thing, and honestly the part I enjoy most. I like being ' +
      'part of the Bedrock creator community and making things easier for the people in ' +
      'it, whether that’s a converter, a template you can copy, or an answer to a question ' +
      'on Discord. I’m one of the three admins at Bedrock Add-Ons, and I write for the ' +
      'Bedrock Wiki for the same reason.',
      'I work in Spanish and English.',
    ],
    affiliations: [
      { label: 'Piki Studios', note: 'Marketplace partner', href: 'https://www.pikistudios.com/' },
      { label: 'Bedrock Add-Ons', note: 'Discord, one of three admins', href: 'https://discord.gg/Q3jhmVSPcd' },
      { label: 'Bedrock Wiki', note: 'Contributor', href: 'https://wiki.bedrock.dev/' },
    ],
  },

  /* Discord is the way to reach me. The username is literally `kaioga.`, with
     the trailing full stop. The server is a different thing: it is where I
     talk to the wider community, not a DM. */
  contact: {
    heading: 'Say hi',
    lead: 'Working on something for Bedrock? Want a hand with an add-on or a tool? The quickest way to reach me is a Discord message.',
    discord: 'kaioga.',
    discordNote: 'Discord username, full stop included.',
    emailNote: 'Not on Discord?',
    emailLabel: 'Email works too',
    socialsLabel: 'Elsewhere',
    socials: [
      { icon: 'discord', label: 'Discord server', value: 'My community server', href: 'https://discord.gg/uJ6QKWFFNe' },
      { icon: 'youtube', label: 'YouTube', value: '@Kaioga5', href: 'https://www.youtube.com/@Kaioga5' },
      { icon: 'x', label: 'X', value: '@Kaioga55', href: 'https://x.com/Kaioga55' },
      { icon: 'github', label: 'GitHub', value: 'Kaioga5', href: 'https://github.com/Kaioga5' },
    ],
  },

  credits:
    'Project key art and screenshots belong to their studios and to Mojang Studios, and ' +
    'are shown here to illustrate work I contributed to. Minecraft is a trademark of Mojang ' +
    'Synergies AB. This site is not affiliated with or endorsed by Mojang Studios or ' +
    'Microsoft.',
};
