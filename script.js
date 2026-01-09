// script.js — Vanilla JS for smooth scrolling, mobile nav, and form handling

/* Smooth scroll for internal anchor links */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // mobile nav toggle
  const togg = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  togg && togg.addEventListener('click', () => {
    navLinks.classList.toggle('visible');
    togg.classList.toggle('open');
  });

  // header scroll effect
  const header = document.querySelector('.nav');
  function headerToggle(){
    if(window.scrollY > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', headerToggle);
  headerToggle();

  // IntersectionObserver to reveal elements with .reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.16});
    reveals.forEach(r => io.observe(r));
  } else {
    // fallback
    reveals.forEach(r => r.classList.add('in-view'));
  }

  // basic scrollspy to highlight nav
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  function onScroll(){
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navItems.forEach(i=> i.classList.remove('active'));
        const active = document.querySelector('.nav-links a[href="#'+sec.id+'"]');
        active && active.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // contact form: build mailto link (works with user's email client)
  const form = document.getElementById('contact-form');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    // open mail client
    window.location.href = `mailto:hello@yourdomain.com?subject=${subject}&body=${body}`;
  });
});
