// ========== PORTFOLIO WEBSITE INTERACTIONS ========== 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavbar();
    initSmoothScroll();
    initRevealOnScroll();
    initContactForm();
    initScrollSpy();
});

/**
 * ========== NAVBAR INTERACTIONS ==========
 * Handles mobile menu toggle and navbar behavior
 */
function initNavbar() {
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar__link');

    // Mobile menu toggle
    if (toggle) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            updateAriaExpanded();
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });

    // Handle navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        }
    });
}

/**
 * ========== SMOOTH SCROLL ==========
 * Smooth scrolling for internal anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * ========== REVEAL ON SCROLL ==========
 * Uses Intersection Observer to reveal elements with animation
 */
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        reveals.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        reveals.forEach(element => {
            element.classList.add('in-view');
        });
    }
}

/**
 * ========== SCROLL SPY ==========
 * Highlights the active navigation link based on scroll position
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.style.color = '';
                });

                // Add active style to current link
                const activeLink = document.querySelector(`.navbar__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--color-primary)';
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

/**
 * ========== CONTACT FORM HANDLING ==========
 * Handles form submission and validation
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(form);
    });
}

function handleFormSubmit(form) {
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const notice = form.querySelector('#formNotice');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showFormNotice(notice, 'Please fill out all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormNotice(notice, 'Please enter a valid email address.', 'error');
        return;
    }

    // Create mailto link for frontend form submission
    const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(`Portfolio Inquiry: ${subject}`)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Show success message
    showFormNotice(notice, 'Message prepared! Your email client will open.', 'success');

    // Open email client
    setTimeout(() => {
        window.location.href = mailtoLink;
        // Reset form
        form.reset();
        notice.style.display = 'none';
    }, 500);
}

function showFormNotice(element, message, type) {
    element.textContent = message;
    element.className = `form-notice ${type}`;
    element.style.display = 'block';
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * ========== UTILITY FUNCTION ==========
 * Updates aria-expanded attribute for accessibility
 */
function updateAriaExpanded() {
    const toggle = document.querySelector('.navbar__toggle');
    const isExpanded = toggle.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded);
}
