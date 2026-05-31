/* =============================================
   MAIN JS - main.js
   Navbar, scroll reveal, typed text, active link
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar scroll effect ──────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ── 2. Hamburger toggle ──────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navList   = document.querySelector('.nav-list');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navList.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navList.classList.contains('open'));
  });
  navList?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navList.classList.remove('open');
    });
  });

  // ── 3. Active nav link ───────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });

  // ── 4. Scroll reveal ─────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('show'), i * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // ── 5. Typed text effect (home page only) ────
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const phrases = [
      'Full Stack Java Developer',
      'AI & ML Enthusiast',
      'Python Developer',
      'Problem Solver',
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;

    const type = () => {
      const current = phrases[phraseIdx];
      typedEl.textContent = deleting
        ? current.slice(0, charIdx--)
        : current.slice(0, charIdx++);

      let delay = deleting ? 50 : 90;
      if (!deleting && charIdx > current.length) {
        delay = 1600; deleting = true;
      } else if (deleting && charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        charIdx = 0;
        delay = 400;
      }
      setTimeout(type, delay);
    };
    setTimeout(type, 800);
  }

  // ── 6. Counter animation (stats) ─────────────
  const counters = document.querySelectorAll('.count-up');
  if (counters.length) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;
        const step = () => {
          count += Math.ceil(target / 60);
          if (count >= target) { el.textContent = target + (el.dataset.suffix || ''); return; }
          el.textContent = count + (el.dataset.suffix || '');
          requestAnimationFrame(step);
        };
        step();
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

});
