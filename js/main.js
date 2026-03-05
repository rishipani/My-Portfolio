/**
 * main.js — Amlan Pulak Pani Portfolio
 * Cursor · Clock · Scroll Reveal · Skill Bars · Experience Tabs · Marquee · Navbar
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════
     CUSTOM CURSOR  (desktop only)
  ══════════════════════════════════════════ */
  const cur      = document.getElementById('cur');
  const curTrail = document.getElementById('cur-trail');

  if (cur && curTrail && window.matchMedia('(hover: hover)').matches) {
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', function (e) {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
      trailX = e.clientX;
      trailY = e.clientY;
      curTrail.style.left = trailX + 'px';
      curTrail.style.top  = trailY + 'px';
    });
  }

  /* ══════════════════════════════════════════
     STATUS BAR CLOCK
  ══════════════════════════════════════════ */
  const sbTime = document.getElementById('sb-time');

  function tickClock() {
    if (!sbTime) return;
    sbTime.textContent = new Date().toLocaleTimeString('en-IN', { hour12: false });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ══════════════════════════════════════════
     NAVBAR SCROLL EFFECT
  ══════════════════════════════════════════ */
  const nav = document.getElementById('main-nav');

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     SCROLL REVEAL  (IntersectionObserver)
  ══════════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    /* fallback for very old browsers */
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ══════════════════════════════════════════
     SKILL BARS ANIMATION
  ══════════════════════════════════════════ */
  function animateBars(container) {
    container.querySelectorAll('.sbi-fill, .hc-fill').forEach(function (bar) {
      bar.style.width = (bar.dataset.w || 0) + '%';
    });
  }

  /* Trigger skill section bars */
  const skillsSection = document.getElementById('skills');
  if (skillsSection && 'IntersectionObserver' in window) {
    const barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateBars(entry.target);
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    barObs.observe(skillsSection);
  }

  /* Hero card bars — trigger after page load delay */
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    setTimeout(function () { animateBars(heroCard); }, 2000);
  }

  /* ══════════════════════════════════════════
     EXPERIENCE TABS
  ══════════════════════════════════════════ */
  window.switchExp = function (idx, el) {
    /* deactivate all tabs */
    document.querySelectorAll('.exp-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    /* hide all panes */
    document.querySelectorAll('.exp-pane').forEach(function (p) {
      p.classList.remove('active');
    });
    /* activate selected */
    el.classList.add('active');
    const pane = document.getElementById('exp-' + idx);
    if (pane) pane.classList.add('active');
  };

  /* ══════════════════════════════════════════
     MARQUEE — inject items via JS
  ══════════════════════════════════════════ */
  const marqueeTrack = document.getElementById('marquee-track');

  const MARQUEE_ITEMS = [
    'Spring Boot', 'Angular', 'Java', 'Python', 'MySQL',
    'REST APIs', 'Spring Security', 'Node.js', 'Firebase',
    'Kotlin', 'RBAC', 'Git / GitHub', 'MVC Architecture',
    'JDBC', 'Android Studio', 'Bootstrap 5', 'Express.js',
  ];

  if (marqueeTrack) {
    /* duplicate for seamless loop */
    const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    marqueeTrack.innerHTML = doubled.map(function (item) {
      return '<div class="m-item">' + item + '<div class="m-sep"></div></div>';
    }).join('');
  }

  /* ══════════════════════════════════════════
     SMOOTH SCROLL for nav links
  ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      /* close mobile nav if open */
      const navMenu = document.getElementById('navMenu');
      if (navMenu && navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) bsCollapse.hide();
      }

      /* offset for fixed bars */
      const offset = 28 + 58; /* statusbar + navbar */
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ══════════════════════════════════════════
     ACTIVE NAV HIGHLIGHT ON SCROLL
  ══════════════════════════════════════════ */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.os-nav-link');

  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (l) {
            l.classList.toggle(
              'active',
              l.getAttribute('href') === '#' + id
            );
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { sectionObs.observe(s); });
  }

  /* ══════════════════════════════════════════
     STAG (skill tag) hover — touch friendly tap
  ══════════════════════════════════════════ */
  document.querySelectorAll('.stag').forEach(function (tag) {
    tag.addEventListener('touchstart', function () {
      tag.classList.toggle('hover-active');
    }, { passive: true });
  });

}());
