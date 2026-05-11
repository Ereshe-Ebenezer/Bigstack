// ===== STICKY NAVBAR ON SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

// Close mobile menu when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = Math.floor(current);
          requestAnimationFrame(update);
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== TESTIMONIAL SLIDER =====
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

// Build dots
testimonials.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('span');

function goTo(index) {
  testimonials[currentIndex].classList.remove('active');
  dots[currentIndex].classList.remove('active');
  currentIndex = (index + testimonials.length) % testimonials.length;
  testimonials[currentIndex].classList.add('active');
  dots[currentIndex].classList.add('active');
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

// Auto rotate
let autoplay = setInterval(() => goTo(currentIndex + 1), 6000);
const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', () => clearInterval(autoplay));
slider.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goTo(currentIndex + 1), 6000);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("✅ Thank you! We'll be in touch within 24 hours.");
  e.target.reset();
});