/* Kaiōga portfolio: page behaviour. Everything here is progressive enhancement. */

(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hovering = matchMedia('(hover: hover) and (pointer: fine)');
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* tell the head script JS is running */
  root.classList.add('js-live');

  /* biome colour */

  const SECTION_ACCENT = { tools: '#d8b46a', about: '#e9a06f', contact: '#b8b2a6' };
  let biomeSource = null;
  let deckAccent = null;

  const setBiome = (color) => {
    if (color && root.style.getPropertyValue('--biome') !== color) root.style.setProperty('--biome', color);
  };
  const syncBiome = () => {
    if (!biomeSource) return;
    if (biomeSource.dataset.section === 'hero') setBiome(deckAccent);
    else setBiome(biomeSource.dataset.accent || SECTION_ACCENT[biomeSource.dataset.section]);
  };

  /* hero deck */

  const deck = $('[data-deck]');
  if (deck) {
    const cards = $$('[data-card]', deck);
    const caption = $('[data-deck-caption]', deck);
    let order = cards.slice();
    let busy = false;
    let timer = 0;
    let paused = false;
    let onScreen = true;

    const accentOf = (card) => card.style.getPropertyValue('--accent').trim();

    const apply = () => {
      order.forEach((card, d) => {
        card.style.setProperty('--d', d);
        card.style.setProperty('--dir', d % 2 ? -1 : 1);
        card.classList.toggle('is-top', d === 0);
        /* only draw the first six cards */
        card.classList.toggle('is-deep', d > 5);
        $('button', card).tabIndex = d === 0 ? 0 : -1;
      });
      deckAccent = accentOf(order[0]);
      syncBiome();
    };

    const announce = () => {
      const top = order[0];
      const swap = () => {
        caption.innerHTML = `<b>${top.dataset.title}</b><span>${top.dataset.sub}</span>`;
        caption.classList.remove('is-swapping');
      };
      if (reduced.matches) return swap();
      caption.classList.add('is-swapping');
      setTimeout(swap, 180);
    };

    /* dir > 0: send the top card to the back. dir < 0: bring `card` to the front. */
    const rotateTo = (card, dir) => {
      if (busy) return;
      const idx = order.indexOf(card);
      if (idx === 0 && dir > 0 && order.length < 2) return;
      busy = true;
      const carried = dir > 0 ? order[0] : card;
      carried.classList.add('is-out');
      const settle = () => {
        if (dir > 0) order.push(order.shift());
        else order = [...order.slice(idx), ...order.slice(0, idx)];
        carried.classList.remove('is-out');
        apply();
        announce();
        setTimeout(() => { busy = false; }, reduced.matches ? 0 : 500);
      };
      setTimeout(settle, reduced.matches ? 0 : 480);
      schedule();
    };

    const schedule = () => {
      clearTimeout(timer);
      if (reduced.matches) return;
      timer = setTimeout(() => {
        if (!paused && onScreen && document.visibilityState === 'visible') rotateTo(order[0], 1);
        schedule();
      }, 5200);
    };

    for (const card of cards) {
      $('button', card).addEventListener('click', () => {
        if (order[0] === card) {
          const target = $(card.dataset.target);
          if (target) target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
        } else {
          rotateTo(card, -1);
        }
      });
    }
    $('[data-deck-next]', deck).addEventListener('click', () => rotateTo(order[0], 1));
    $('[data-deck-prev]', deck).addEventListener('click', () => rotateTo(order[order.length - 1], -1));

    deck.addEventListener('pointerenter', () => { paused = true; });
    deck.addEventListener('pointerleave', () => { paused = false; });
    deck.addEventListener('focusin', () => { paused = true; });
    deck.addEventListener('focusout', (ev) => { if (!deck.contains(ev.relatedTarget)) paused = false; });

    /* pointer parallax */
    const hero = deck.closest('.hero');
    if (hero && hovering.matches && !reduced.matches) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const tick = () => {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        deck.style.setProperty('--px', cx.toFixed(3));
        deck.style.setProperty('--py', cy.toFixed(3));
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0;
      };
      const aim = (x, y) => { tx = x; ty = y; if (!raf) raf = requestAnimationFrame(tick); };
      hero.addEventListener('pointermove', (ev) => {
        const r = hero.getBoundingClientRect();
        aim(clamp(((ev.clientX - r.left) / r.width) * 2 - 1, -1, 1), clamp(((ev.clientY - r.top) / r.height) * 2 - 1, -1, 1));
      }, { passive: true });
      hero.addEventListener('pointerleave', () => aim(0, 0));
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { threshold: 0.2 }).observe(deck);
    }

    apply();
    schedule();
  }

  /* page load, after fonts */

  const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  ready.then(() => {
    requestAnimationFrame(() => {
      $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      const wave = $('.wave');
      if (wave) wave.classList.add('is-in');
      if (deck) {
        deck.classList.add('is-in');
        setTimeout(() => deck.classList.add('is-dealt'), reduced.matches ? 0 : 1300);
      }
    });
  });

  /* entrance on scroll */

  const settlers = $$('[data-scene], .tool');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    settlers.forEach((el) => io.observe(el));
  } else {
    settlers.forEach((el) => el.classList.add('is-in'));
  }

  /* current section: drives the nav dot and the biome */

  const navLinks = $$('[data-navlink]');
  let section = null;

  const lightNav = () => {
    navLinks.forEach((a) => {
      const here = a.getAttribute('href') === `#${section}`;
      a.classList.toggle('is-current', here);
      if (here) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (list) => {
        for (const entry of list) {
          const el = entry.target;
          if (entry.isIntersecting) {
            if (el.dataset.section) section = el.dataset.section;
            /* scenes beat the work section */
            if (el.dataset.scene !== undefined || el.dataset.section !== 'work') biomeSource = el;
          } else if (biomeSource === el) {
            biomeSource = null;
          }
        }
        lightNav();
        syncBiome();
      },
      { rootMargin: '-38% 0px -46% 0px', threshold: 0 }
    );
    $$('[data-section], [data-scene]').forEach((el) => io.observe(el));
  }

  const top = $('[data-top]');
  if (top) {
    const stick = () => top.classList.toggle('is-stuck', scrollY > 12);
    addEventListener('scroll', stick, { passive: true });
    stick();
  }

  /* poster tilt */

  if (hovering.matches && !reduced.matches) {
    for (const frame of $$('[data-tilt]')) {
      frame.addEventListener('pointermove', (ev) => {
        const r = frame.getBoundingClientRect();
        const nx = clamp(((ev.clientX - r.left) / r.width) * 2 - 1, -1, 1);
        const ny = clamp(((ev.clientY - r.top) / r.height) * 2 - 1, -1, 1);
        frame.style.setProperty('--ry', `${(nx * 7).toFixed(2)}deg`);
        frame.style.setProperty('--rx', `${(-ny * 6).toFixed(2)}deg`);
        frame.style.setProperty('--ox', `${(0.9 - nx * 0.55).toFixed(2)}rem`);
        frame.style.setProperty('--oy', `${(0.9 - ny * 0.55).toFixed(2)}rem`);
        frame.style.setProperty('--mx', `${((nx + 1) * 50).toFixed(1)}%`);
        frame.style.setProperty('--my', `${((ny + 1) * 50).toFixed(1)}%`);
        frame.classList.add('is-live');
      }, { passive: true });
      frame.addEventListener('pointerleave', () => {
        frame.classList.remove('is-live');
        for (const p of ['--rx', '--ry', '--ox', '--oy', '--mx', '--my']) frame.style.removeProperty(p);
      });
    }
  }

  /* reel drag + fling for mouse/pen. Touch uses native scrolling. */

  for (const reel of $$('[data-reel]')) {
    let down = false, moved = false, startX = 0, startLeft = 0, lastX = 0, lastT = 0, vel = 0, raf = 0;

    reel.addEventListener('pointerdown', (ev) => {
      if (ev.pointerType === 'touch' || ev.button !== 0) return;
      cancelAnimationFrame(raf);
      down = true; moved = false; vel = 0;
      startX = lastX = ev.clientX; startLeft = reel.scrollLeft; lastT = performance.now();
    });
    reel.addEventListener('pointermove', (ev) => {
      if (!down) return;
      const dx = ev.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        reel.classList.add('is-dragging');
        /* capture only once dragging, or plain clicks get swallowed */
        reel.setPointerCapture(ev.pointerId);
      }
      if (!moved) return;
      reel.scrollLeft = startLeft - dx;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      vel = vel * 0.4 + ((ev.clientX - lastX) / dt) * 0.6;
      lastX = ev.clientX; lastT = now;
    });
    const release = () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      let v = -vel * 14;
      const fling = () => {
        reel.scrollLeft += v;
        v *= 0.94;
        if (Math.abs(v) > 0.4) raf = requestAnimationFrame(fling);
      };
      if (!reduced.matches) raf = requestAnimationFrame(fling);
      /* keep the flag until the click that ends the drag has fired */
      setTimeout(() => { moved = false; reel.classList.remove('is-dragging'); }, 0);
    };
    reel.addEventListener('pointerup', release);
    reel.addEventListener('pointercancel', release);
    reel.addEventListener('click', (ev) => {
      if (moved) { ev.preventDefault(); ev.stopPropagation(); }
    }, true);
  }

  /* copy button */

  for (const btn of $$('[data-copy]')) {
    const label = $('[data-copy-label]', btn);
    let timer = 0;
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        const range = document.createRange();
        range.selectNodeContents($('[data-handle]'));
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try { ok = document.execCommand('copy'); } catch { ok = false; }
      }
      btn.classList.toggle('is-done', ok);
      label.textContent = ok ? 'Copied' : 'Select it';
      clearTimeout(timer);
      timer = setTimeout(() => { btn.classList.remove('is-done'); label.textContent = 'Copy'; }, 1800);
    });
  }

  /* lightbox */

  const lb = $('[data-lightbox]');
  if (lb && typeof lb.showModal === 'function') {
    const pic = $('[data-lb-img]', lb);
    const cap = $('[data-lb-cap]', lb);
    const count = $('[data-lb-count]', lb);
    let shots = [];
    let idx = 0;
    let closing = false;

    const show = (i) => {
      idx = (i + shots.length) % shots.length;
      const btn = shots[idx];
      pic.src = btn.dataset.full;
      pic.alt = btn.dataset.caption;
      cap.textContent = btn.dataset.caption;
      count.textContent = `${idx + 1} / ${shots.length}`;
      for (const n of [idx + 1, idx - 1]) {
        const near = shots[(n + shots.length) % shots.length];
        if (near) new Image().src = near.dataset.full;
      }
    };

    /* FLIP from the thumbnail rect */
    const flip = (btn, reverse) => {
      const from = btn.getBoundingClientRect();
      pic.style.transition = 'none';
      pic.style.transform = 'none';
      const to = pic.getBoundingClientRect();
      const s = from.width / to.width;
      const tf = `translate(${(from.left - to.left).toFixed(1)}px, ${(from.top - to.top).toFixed(1)}px) scale(${s.toFixed(4)})`;
      if (reverse) {
        pic.style.transition = 'transform 0.42s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.42s';
        pic.style.transform = tf;
        return;
      }
      pic.style.transform = tf;
      void pic.offsetWidth;
      pic.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      pic.style.transform = 'none';
    };

    const open = (btn) => {
      const reel = btn.closest('[data-reel]');
      shots = $$('[data-shot]', reel);
      document.body.classList.add('has-lightbox');
      pic.style.aspectRatio = '16 / 9';
      show(shots.indexOf(btn));
      lb.showModal();
      if (!reduced.matches) flip(btn, false);
      $('[data-lb-close]', lb).focus({ preventScroll: true });
    };

    const close = () => {
      if (closing) return;
      closing = true;
      const btn = shots[idx];
      const r = btn.getBoundingClientRect();
      const visible = r.bottom > 0 && r.top < innerHeight;
      const finish = () => {
        lb.close();
        document.body.classList.remove('has-lightbox');
        pic.style.transition = 'none';
        pic.style.transform = 'none';
        pic.style.opacity = '';
        pic.removeAttribute('src');
        closing = false;
        btn.focus({ preventScroll: true });
      };
      if (reduced.matches) return finish();
      lb.classList.add('is-closing');
      if (visible) flip(btn, true);
      else pic.style.opacity = '0';
      setTimeout(() => { lb.classList.remove('is-closing'); finish(); }, 400);
    };

    const step = (dir) => {
      if (shots.length < 2) return;
      if (reduced.matches) return show(idx + dir);
      lb.classList.add('is-swapping');
      setTimeout(() => { show(idx + dir); lb.classList.remove('is-swapping'); }, 170);
    };

    for (const btn of $$('[data-shot]')) btn.addEventListener('click', () => open(btn));
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', () => step(-1));
    $('[data-lb-next]', lb).addEventListener('click', () => step(1));
    lb.addEventListener('cancel', (ev) => { ev.preventDefault(); close(); });
    lb.addEventListener('click', (ev) => { if (ev.target === lb || ev.target.classList.contains('lightbox__figure')) close(); });
    lb.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') step(1);
      else if (ev.key === 'ArrowLeft') step(-1);
      else if (ev.key === 'Escape') { ev.preventDefault(); close(); }
    });

    let sx = 0, sy = 0;
    lb.addEventListener('pointerdown', (ev) => { sx = ev.clientX; sy = ev.clientY; });
    lb.addEventListener('pointerup', (ev) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    });
  }
})();
