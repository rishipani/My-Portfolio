/**
 * canvas.js — Amlan Pulak Pani Portfolio
 * Animated particle network background (WebGL-free, pure Canvas 2D)
 */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, animId;
  const mouse = { x: -2000, y: -2000 };

  /* ── PARTICLES ── */
  const PARTICLE_COUNT = 72;
  const CONNECT_DIST   = 130;
  const MOUSE_DIST     = 200;
  const particles      = [];

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.17;
    this.vy = (Math.random() - 0.5) * 0.17;
    this.r  = Math.random() * 1.4 + 0.3;
    this.a  = Math.random() * 0.38 + 0.05;
  };

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  /* ── RESIZE ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticles();
  }

  /* ── DRAW ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const len = particles.length;

    /* connections between particles */
    for (let i = 0; i < len; i++) {
      const a = particles[i];

      /* particle–particle */
      for (let j = i + 1; j < len; j++) {
        const b  = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(57,255,138,${(1 - d / CONNECT_DIST) * 0.055})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      /* particle–mouse */
      const mx = a.x - mouse.x;
      const my = a.y - mouse.y;
      const md = Math.sqrt(mx * mx + my * my);
      if (md < MOUSE_DIST) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(57,255,138,${(1 - md / MOUSE_DIST) * 0.22})`;
        ctx.lineWidth   = 0.6;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    /* particles */
    for (let i = 0; i < len; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(57,255,138,${p.a})`;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  /* ── MOUSE ── */
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  /* Touch: update mouse pos so connections follow finger */
  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', function () {
    mouse.x = -2000;
    mouse.y = -2000;
  });

  /* ── INIT ── */
  window.addEventListener('resize', function () {
    cancelAnimationFrame(animId);
    resize();
    draw();
  });

  resize();
  draw();
}());
