document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const msg  = document.querySelector('.form-success');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 5000); }
    }, 1200);
  });
});
