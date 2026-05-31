/* =============================================
   ABOUT JS - about.js
   Circular skill progress animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const skills = [
    { name: 'Core Java',        level: 85 },
    { name: 'Python',           level: 88 },
    { name: 'Django',           level: 80 },
    { name: 'HTML/CSS/JS',      level: 90 },
    { name: 'SQL',              level: 78 },
    { name: 'Machine Learning', level: 75 },
  ];

  const grid = document.querySelector('#skills-grid');
  if (!grid) return;

  const R = 15.9155;
  const C = 2 * Math.PI * R;

  // Add SVG gradient definition once
  const defs = `<svg width="0" height="0" style="position:absolute">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#1a56db"/>
        <stop offset="100%" stop-color="#3b82f6"/>
      </linearGradient>
    </defs>
  </svg>`;
  document.body.insertAdjacentHTML('afterbegin', defs);

  const circles = [], texts = [];

  skills.forEach(skill => {
    const wrap = document.createElement('div');
    wrap.className = 'circular-skill reveal';

    wrap.innerHTML = `
      <svg class="progress-circle" viewBox="0 0 36 36">
        <path class="circle-bg"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="circle-progress"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          style="stroke-dasharray:${C};stroke-dashoffset:${C}"/>
        <text x="18" y="20.35" class="circle-text">0%</text>
      </svg>
      <span class="skill-name">${skill.name}</span>`;

    grid.appendChild(wrap);
    circles.push(wrap.querySelector('.circle-progress'));
    texts.push(wrap.querySelector('.circle-text'));
  });

  const wrappers = grid.querySelectorAll('.circular-skill');

  const animate = idx => {
    const circle = circles[idx];
    const text   = texts[idx];
    const target = skills[idx].level;
    let n = 0;
    const step = () => {
      n++;
      if (n <= target) {
        text.textContent = n + '%';
        circle.style.strokeDashoffset = C - (n / 100) * C;
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = [...wrappers].indexOf(entry.target);
      if (idx !== -1) setTimeout(() => animate(idx), idx * 100);
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  wrappers.forEach(el => io.observe(el));
});
