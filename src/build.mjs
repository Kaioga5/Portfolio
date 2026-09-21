/*
 * node src/build.mjs
 * Builds index.html and 404.html from src/data/*.mjs. No dependencies.
 * `summary`, `text` and `credits` are inserted as raw HTML; everything else is escaped.
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { site } from './data/site.mjs';
import { work, FIGURES_AS_OF, PLACEHOLDER_CONTRIBUTION } from './data/work.mjs';
import { tools } from './data/tools.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const e = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const map = (xs, fn) => xs.map(fn).join('');
const pad = (n) => String(n).padStart(2, '0');

/* dated projects must be newest first */
{
  const dated = work.filter((p) => p.date);
  for (let i = 1; i < dated.length; i++) {
    if (dated[i].date > dated[i - 1].date) {
      throw new Error(`work.mjs is out of release order: ${dated[i].slug} (${dated[i].date}) comes after ${dated[i - 1].slug} (${dated[i - 1].date})`);
    }
  }
}

/* cache-bust */
const rev = (path) => {
  let h = 5381;
  const src = readFileSync(join(root, path));
  for (let i = 0; i < src.length; i++) h = ((h * 33) ^ src[i]) >>> 0;
  return `${path}?v=${h.toString(36)}`;
};

/* webp dimensions */
const sizeOf = (path) => {
  const b = readFileSync(join(root, path));
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error(`not a webp: ${path}`);
  }
  const format = b.toString('ascii', 12, 16);
  if (format === 'VP8X') {
    return [(b.readUIntLE(24, 3) & 0xffffff) + 1, (b.readUIntLE(27, 3) & 0xffffff) + 1];
  }
  if (format === 'VP8 ') {
    const at = b.indexOf(Buffer.from([0x9d, 0x01, 0x2a]), 20);
    return [b.readUInt16LE(at + 3) & 0x3fff, b.readUInt16LE(at + 5) & 0x3fff];
  }
  if (format === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  throw new Error(`unreadable webp header: ${path}`);
};

const img = (base, alt, { sizes, cls = '', small = 480, lazy = true, extra = '' } = {}) => {
  const [w, h] = sizeOf(`${base}.webp`);
  const [sw] = sizeOf(`${base}-${small}.webp`);
  return /* html */ `<img${cls ? ` class="${cls}"` : ''} src="${base}.webp"
     srcset="${base}-${small}.webp ${sw}w, ${base}.webp ${w}w" sizes="${sizes}"
     width="${w}" height="${h}" alt="${e(alt)}"${lazy ? ' loading="lazy"' : ''} decoding="${extra.includes('data-sync') ? 'sync' : 'async'}">`;
};

/* shared fragments */

const mark = /* html */ `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
  <path d="M16 3 29 10.5 16 18 3 10.5Z" fill="var(--brand)"/>
  <path d="M3 10.5 16 18v11L3 21.5Z" fill="currentColor" opacity=".55"/>
  <path d="M29 10.5 16 18v11l13-7.5Z" fill="currentColor" opacity=".3"/>
</svg>`;

const arrow =
  '<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 13 13 3M5.5 3H13v7.5"/></svg>';

const out = (href, label, cls = 'link') =>
  `<a class="${cls}" href="${e(href)}" target="_blank" rel="noopener"><span>${e(label)}</span>${arrow}</a>`;

const starRow = () =>
  '<svg viewBox="0 0 100 20" aria-hidden="true" focusable="false">' +
  [0, 20, 40, 60, 80]
    .map((x) => `<path transform="translate(${x} 0)" d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 14.9l-5.3 2.8 1.1-5.9L1.5 7.7l5.9-.8z"/>`)
    .join('') +
  '</svg>';

const coin =
  '<svg class="coin" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7"/><path d="M5.2 11V5.4L8 8.2l2.8-2.8V11"/></svg>';

/* contact icons */
const ICON = {
  discord: '<path d="M19.3 5.4A16.6 16.6 0 0 0 15.2 4l-.5.9a15.4 15.4 0 0 0-5.4 0L8.8 4a16.6 16.6 0 0 0-4.1 1.4C2.1 9.3 1.4 13.1 1.7 16.8a16.7 16.7 0 0 0 5 2.6l1.1-1.7a10.8 10.8 0 0 1-1.7-.8l.4-.3a11.9 11.9 0 0 0 11 0l.4.3-1.7.8 1 1.7a16.7 16.7 0 0 0 5.1-2.6c.4-4.3-.7-8-3-11.4ZM8.7 14.5c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1 1.8 1 1.8 2.1-.8 2.1-1.8 2.1Zm6.6 0c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1 1.8 1 1.8 2.1-.8 2.1-1.8 2.1Z"/>',
  youtube: '<path d="M23 7.3a2.9 2.9 0 0 0-2-2C19.2 4.8 12 4.8 12 4.8s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2C.5 9.1.5 12 .5 12s0 2.9.5 4.7a2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.7.5-4.7s0-2.9-.5-4.7ZM9.7 15.1V8.9l6 3.1-6 3.1Z"/>',
  x: '<path d="M17.6 3h3.1l-6.8 7.8L21.9 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3H8l4.4 5.9L17.6 3Zm-1.1 16.2h1.7L6.9 4.7H5.1l11.4 14.5Z"/>',
  github: '<path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.1v3.2c0 .3.2.7.8.5A11.5 11.5 0 0 0 12 .5Z"/>',
  mail: '<path d="M3 5.5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm0 2.2v.3l9 5.4 9-5.4v-.3l-9 5.3-9-5.3Z"/>',
  copy: '<path d="M9 3h9a2 2 0 0 1 2 2v9h-2V5H9V3Zm-3 4h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm0 2v10h9V9H6Z"/>',
};
const icon = (name) => `<svg class="icon icon--${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON[name]}</svg>`;

const roles = (xs) =>
  xs && xs.length
    ? `<p class="roles"><span class="roles__label">My role</span>${map(xs, (r) => `<span class="chip">${e(r)}</span>`)}</p>`
    : '';

const year = (p) => (p.date ? p.date.slice(0, 4) : '');

/* the hero deck */

const deck = () => {
  const cards = work.filter((p) => p.cover);
  return /* html */ `
    <div class="deck" data-deck>
      <ul class="deck__cards">
        ${map(cards, (p, i) => /* html */ `
        <li class="deck__card" style="--accent:${e(p.accent)}" data-card data-target="#work-${p.slug}" data-title="${e(p.title)}" data-sub="${e(p.studio || p.kind)}">
          <button type="button" class="deck__face" aria-label="${e(p.title)}: go to project">
            ${img(`assets/img/work/${p.slug}/cover`, '', { sizes: '(max-width: 64rem) 92vw, 44vw', small: 400, lazy: false, extra: ' data-sync' })}
          </button>
        </li>`)}
      </ul>
      <div class="deck__foot">
        <p class="deck__caption" data-deck-caption aria-live="polite"><b>${e(cards[0].title)}</b><span>${e(cards[0].studio)}</span></p>
        <div class="deck__ctl">
          <button type="button" class="deck__btn" data-deck-prev aria-label="Previous project"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg></button>
          <button type="button" class="deck__btn" data-deck-next aria-label="Next project"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg></button>
        </div>
      </div>
    </div>`;
};

/* projects */

const fact = (label, value, cls = '') =>
  `<div class="fact${cls ? ` ${cls}` : ''}"><dt>${e(label)}</dt><dd>${value}</dd></div>`;

const facts = (p) => {
  const items = [];
  if (p.rating) {
    const pct = Math.round((p.rating.score / 5) * 100);
    items.push(
      fact(
        'Rating',
        `<span class="stars" style="--score:${pct}%">${starRow()}<span class="stars__fill">${starRow()}</span></span>` +
          `<b>${e(p.rating.score.toFixed(1))}</b>` +
          (p.rating.count ? `<small>${e(p.rating.count)}</small>` : ''),
        'fact--rating'
      )
    );
  }
  if (p.price) {
    items.push(fact('Price', p.price === 'Free' ? '<b>Free</b>' : `${coin}<b>${e(p.price.replace(' Minecoins', ''))}</b><small>Minecoins</small>`));
  }
  if (p.released) items.push(fact('Released', `<b>${e(p.released)}</b>`));
  if (p.updated) items.push(fact('Updated', `<b>${e(p.updated)}</b>`));
  if (p.minVersion) items.push(fact('Needs', `<b>Bedrock ${e(p.minVersion)}+</b>`));
  if (p.version) items.push(fact('Version', `<b>${e(p.version)}</b>`));
  if (p.licensor) items.push(fact('Licence', `<b>${e(p.licensor)}</b>`));
  if (p.developer) items.push(fact('Made by', `<b>${e(p.developer)}</b>`));
  if (p.players) items.push(fact('Players', `<b>${e(p.players)}</b>`));
  if (p.status) items.push(fact('Status', `<b>${e(p.status)}</b>`));
  return items.length ? `<div class="facts"><dl class="facts__row">${items.join('')}</dl></div>` : '';
};

function project(p, i) {
  const dir = `assets/img/work/${p.slug}`;
  const posterBase = p.cover ? `${dir}/cover` : `${dir}/${p.shots[0].src}`;
  const posterAlt = p.cover ? `${p.title} key art` : p.shots[0].alt;
  const reel = p.shots.length > 1;
  const tag = [p.studio, p.status || year(p) || p.kind].filter(Boolean);

  return /* html */ `
    <article class="scene" id="work-${p.slug}" style="--accent:${e(p.accent)}" data-scene data-accent="${e(p.accent)}">
      <header class="scene__head">
        <p class="scene__tag"><span class="scene__num">${pad(i + 1)}</span>${map(tag, (t) => `<span>${e(t)}</span>`)}</p>
        <h3 class="scene__title">${e(p.title)}</h3>
        <p class="scene__line">${e(p.tagline)}</p>
        ${roles(p.roles)}
      </header>
      <div class="scene__body">
        <p class="scene__text">${p.summary}</p>
        ${p.contribution === PLACEHOLDER_CONTRIBUTION ? '' : `<p class="scene__text scene__role">${e(p.contribution)}</p>`}
        ${p.highlights.length ? `<ul class="points">${map(p.highlights, (h) => `<li>${e(h)}</li>`)}</ul>` : ''}
        ${facts(p)}
        ${out(p.link, p.linkLabel, 'cta')}
      </div>
      <div class="scene__side">
        <figure class="poster${p.cover ? '' : ' poster--shot'}" data-poster>
          <div class="poster__frame" data-tilt>
            ${img(posterBase, posterAlt, { sizes: '(max-width: 64rem) calc(100vw - 2.5rem), 52vw', small: p.cover ? 400 : 480, lazy: i > 0 })}
            <span class="poster__sheen" aria-hidden="true"></span>
          </div>
        </figure>
      </div>
      ${reel ? /* html */ `
      <div class="reel" data-reel aria-label="${e(p.title)} screenshots">
        <ul class="reel__track">
          ${map(p.shots, (shot, n) => /* html */ `
          <li class="reel__frame">
            <button type="button" data-shot data-full="${dir}/${shot.src}.webp" data-caption="${e(shot.alt)}" aria-label="Open screenshot ${n + 1} of ${p.shots.length}">
              ${img(`${dir}/${shot.src}`, shot.alt, { sizes: '(max-width: 64rem) 76vw, 30rem' })}
            </button>
          </li>`)}
        </ul>
      </div>` : ''}
    </article>`;
}

/* tools */

function tool(t) {
  const links = [
    t.repo && ['Source on GitHub', t.repo],
    t.marketplace && ['VS Code Marketplace', t.marketplace],
    t.npm && ['npm', t.npm],
  ].filter(Boolean);

  const art = t.image
    ? img(`assets/img/tools/${t.image}`, t.iconAlt, { sizes: '7rem', cls: 'tool__img' })
    : `<img class="tool__img" src="assets/img/tools/${e(t.icon)}" width="256" height="256" alt="${e(t.iconAlt)}" loading="lazy" decoding="async">`;
  const toolFacts = t.facts
    ? `<div class="facts facts--tool"><dl class="facts__row">${map(t.facts, ([k, v]) => fact(k, `<b>${e(v)}</b>`))}</dl></div>`
    : '';

  return /* html */ `
    <li class="tool" id="tool-${t.slug}" style="--accent:${e(t.accent)}">
      <figure class="tool__icon">${art}</figure>
      <div class="tool__body">
        <p class="tool__kind">${e(t.kind)}</p>
        <h3 class="tool__name">${e(t.name)}</h3>
        <p class="tool__hook">${e(t.hook)}</p>
        ${roles(t.roles)}
        <p class="tool__text">${t.text}</p>
        <ul class="points">${map(t.points, (x) => `<li>${e(x)}</li>`)}</ul>
        ${t.notYet ? `<p class="tool__note">${e(t.notYet)}</p>` : ''}
        ${toolFacts}
        <p class="tool__links">
          ${map(links, ([label, href]) => out(href, label))}
          ${t.status ? `<span class="status">${e(t.status)}</span>` : ''}
        </p>
      </div>
    </li>`;
}

/* page */

const firstAccent = work.find((p) => p.cover).accent;

const page = /* html */ `<!doctype html>
<html lang="en" style="--biome:${e(firstAccent)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(site.name)} — ${e(site.role)}</title>
<meta name="description" content="${e(site.description)}">
<meta name="author" content="${e(site.name)}">
<meta name="theme-color" content="#f7f2e8">
<link rel="canonical" href="${e(site.url)}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${e(site.name)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${e(site.name)} — ${e(site.role)}">
<meta property="og:description" content="${e(site.description)}">
<meta property="og:url" content="${e(site.url)}">
<meta property="og:image" content="${e(site.url)}assets/img/og.png">
<meta property="og:image:alt" content="${e(site.name)} — ${e(site.role)}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="assets/img/mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/mark-192.png">

<link rel="preload" href="assets/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${rev('assets/css/site.css')}">
<script>
  /* js-ready enables entrance states; dropped again if site.js never runs */
  var d = document.documentElement;
  d.classList.add('js-ready');
  setTimeout(function () { if (!d.classList.contains('js-live')) d.classList.remove('js-ready'); }, 2500);
</script>
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.description,
  knowsLanguage: ['en', 'es'],
  knowsAbout: ['Minecraft Bedrock Edition', 'Add-on development', 'Blockbench', 'Bedrock geometry and particles', 'Molang', 'TypeScript'],
  sameAs: ['https://github.com/Kaioga5', 'https://x.com/Kaioga55', 'https://www.youtube.com/@Kaioga5', 'https://marketplace.visualstudio.com/items?itemName=Kaioga.bbmodel-unpack'],
}, null, 1)}
</script>
</head>

<body>
<a class="skip" href="#main">Skip to content</a>

<header class="top" data-top>
  <a class="brand" href="#top">${mark}<span>${e(site.name)}</span></a>
  <nav class="nav" aria-label="Sections">
    ${map(site.nav, (n) => `<a href="${n.href}" data-navlink>${e(n.label)}</a>`)}
  </nav>
</header>

<main id="main">
  <section class="hero" id="top" data-section="hero">
    <div class="hero__text">
      <h1 class="hero__hi" data-reveal><span>${e(site.hero.greeting.head)} <span class="nowrap">${e(site.hero.greeting.name)} <span class="wave" aria-hidden="true">👋</span></span></span></h1>
      <p class="hero__lead" data-reveal><span>${e(site.hero.lead)}</span></p>
      <a class="hero__cue" href="#work" data-reveal><span>${e(site.hero.cue)}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3.5 8.5 8 13l4.5-4.5"/></svg></span></a>
    </div>
    ${deck()}
  </section>

  <section class="sec" id="work" data-section="work">
    <header class="sec__head">
      <h2>${e(site.work.heading)}</h2>
      <p>${e(site.work.lead)}</p>
    </header>
    <div class="scenes">
      ${map(work, project)}
    </div>
    <p class="sec__note">Marketplace figures as listed in ${e(FIGURES_AS_OF)}.</p>
  </section>

  <section class="sec sec--tools" id="tools" data-section="tools">
    <header class="sec__head">
      <h2>${e(site.tools.heading)}</h2>
      <p>${e(site.tools.lead)}</p>
    </header>
    <ol class="bench">
      ${map(tools, tool)}
    </ol>
  </section>

  <section class="sec sec--about" id="about" data-section="about">
    <header class="sec__head sec__head--plain">
      <h2>${e(site.about.heading)}</h2>
    </header>
    <div class="about">
      <p class="about__lead">${e(site.about.lead)}</p>
      <div class="about__body">
        ${map(site.about.body, (p) => `<p>${e(p)}</p>`)}
        <ul class="places">
          ${map(site.about.affiliations, (a) => `<li>${out(a.href, a.label)}<span>${e(a.note)}</span></li>`)}
        </ul>
      </div>
    </div>
  </section>
</main>

<footer class="night" id="contact" data-section="contact">
  <div class="night__inner">
    <h2>${e(site.contact.heading)}</h2>
    <p class="night__lead">${e(site.contact.lead)}</p>
    <div class="handle">
      ${icon('discord')}
      <span class="handle__name" data-handle>${e(site.contact.discord)}</span>
      <button type="button" class="handle__copy" data-copy="${e(site.contact.discord)}" aria-label="Copy the Discord username">${icon('copy')}<span data-copy-label>Copy</span></button>
    </div>
    <p class="handle__note">${e(site.contact.discordNote)} ${e(site.contact.emailNote)} <a class="link" href="mailto:${e(site.email)}"><span>${e(site.contact.emailLabel)}</span>${arrow}</a></p>
    <p class="socials__label">${e(site.contact.socialsLabel)}</p>
    <ul class="socials">
      ${map(site.contact.socials, (l) => `<li><a class="social" href="${e(l.href)}" target="_blank" rel="noopener">${icon(l.icon)}<span class="social__label">${e(l.label)}</span><span class="social__value">${e(l.value)}</span></a></li>`)}
    </ul>
    <p class="credits">${site.credits}</p>
    <p class="credits">&copy; ${new Date().getFullYear()} ${e(site.name)}</p>
  </div>
</footer>

<dialog class="lightbox" data-lightbox aria-label="Screenshot viewer">
  <button type="button" class="lightbox__close" data-lb-close aria-label="Close"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13"/></svg></button>
  <button type="button" class="lightbox__nav lightbox__nav--prev" data-lb-prev aria-label="Previous screenshot"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg></button>
  <figure class="lightbox__figure">
    <img data-lb-img alt="" decoding="async">
    <figcaption><span data-lb-count></span><span data-lb-cap></span></figcaption>
  </figure>
  <button type="button" class="lightbox__nav lightbox__nav--next" data-lb-next aria-label="Next screenshot"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg></button>
</dialog>

<script src="${rev('assets/js/site.js')}" defer></script>
</body>
</html>
`;

/* 404 is self-contained: Pages serves it at any depth */
const notFound = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Not found — ${e(site.name)}</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#f7f2e8">
<style>
  :root { color-scheme: light }
  body {
    margin: 0; min-height: 100svh; display: grid; align-content: center;
    padding: 2rem clamp(1.25rem, 6vw, 6rem);
    background: #f7f2e8; color: #17181d;
    font: 400 1rem/1.6 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  main { display: grid; gap: 1rem; justify-items: start; max-width: 40rem }
  .k { display: flex; align-items: center; gap: .6rem; font-weight: 700; margin-bottom: 1.5rem }
  .k svg { width: 1.35rem; height: 1.35rem }
  .n { margin: 0; font-weight: 700; color: #c8410c }
  h1 { margin: 0; font-size: clamp(2rem, 7vw, 4rem); line-height: 1.02; letter-spacing: -.03em }
  p { margin: 0; color: #4a4d56 }
  a { color: inherit; text-decoration: underline; text-underline-offset: .2em }
</style>
</head>
<body>
<main>
  <p class="k">${mark.replace('var(--brand)', '#ff5a1f')}<span>${e(site.name)}</span></p>
  <p class="n">404</p>
  <h1>This chunk never loaded.</h1>
  <p>There’s nothing at this address. Everything lives on one page: <a href="${e(site.url)}">head back to the start</a>.</p>
</main>
</body>
</html>
`;

writeFileSync(join(root, 'index.html'), page);
writeFileSync(join(root, '404.html'), notFound);
console.log(`built index.html (${(page.length / 1024).toFixed(1)} KB) and 404.html`);
