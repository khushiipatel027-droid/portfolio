/* ============================================================
   KHUSHI SUVAGIYA — PORTFOLIO JAVASCRIPT
   File: static/script.js
   ============================================================ */

/* ==============================================================
   1. ANIMATED PARTICLE BACKGROUND
   ============================================================== */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', function () { resize(); buildParticles(); });

  function Particle() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 1.6 + 0.3;
    this.vx    = (Math.random() - 0.5) * 0.4;
    this.vy    = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '#4f8ef7' : '#9b6dff';
  }
  Particle.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle   = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
  };

  function buildParticles() {
    particles = [];
    const count = Math.floor((W * H) / 11000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  buildParticles();

  function connectLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#4f8ef7';
          ctx.globalAlpha = (1 - dist / 110) * 0.1;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function (p) { p.move(); p.draw(); });
    connectLines();
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();


/* ==============================================================
   2. NAVBAR — scroll shadow + hamburger toggle
   ============================================================== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


/* ==============================================================
   3. TYPING EFFECT
   ============================================================== */
(function () {
  const phrases = [
    'B.Tech CSE Student',
    'Aspiring Software Developer',
    'AI Enthusiast',
    'Web Developer',
    'Problem Solver'
  ];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed');

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.substring(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
})();


/* ==============================================================
   4. SCROLL REVEAL — fade-in cards when visible
   ============================================================== */
(function () {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });
})();


/* ==============================================================
   5. SKILL BAR ANIMATION — fill bars on scroll into view
   ============================================================== */
(function () {
  const skillBlocks = document.querySelectorAll('.skills-block');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(function (bar) {
          const target = bar.getAttribute('data-w');
          bar.style.width = target + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  skillBlocks.forEach(function (block) { observer.observe(block); });
})();


/* ==============================================================
   6. CERTIFICATE OPEN — opens PDF in new tab
   ============================================================== */
function openCert(url) {
  window.open(url, '_blank');
}


/* ==============================================================
   7. ACTIVE NAV LINK — highlight current section
   ============================================================== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (a) { a.style.color = ''; });
        const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (active) active.style.color = '#4f8ef7';
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(function (s) { observer.observe(s); });
})();


/* ==============================================================
   8. SMOOTH STAGGER — add transition delay to grid children
   ============================================================== */
(function () {
  const grids = document.querySelectorAll(
    '.about-grid, .projects-grid, .certs-grid, .contact-grid'
  );
  grids.forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });
})();
