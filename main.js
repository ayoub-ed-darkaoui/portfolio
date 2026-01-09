// main.js — Minimal JS for mobile menu toggle, smooth scrolling, and contact mailto
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Contact form: mailto fallback
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const message = fd.get('message') || '';
      if (!name || !email || !message) {
        alert('Please complete all fields.');
        return;
      }
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = `mailto:hello@yourdomain.com?subject=${subject}&body=${body}`;
    });
  }
});
