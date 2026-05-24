window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments);
};

if (window.gtag) {
  gtag('js', new Date());
  gtag('config', 'G-K22C3GK7WS');
}

const yr = document.getElementById('currentYear');
if (yr) yr.textContent = new Date().getFullYear();

const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const sunPath = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

function setDark(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  if (themeIcon) themeIcon.innerHTML = dark ? sunPath : moonPath;
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setDark(saved ? saved === 'dark' : prefersDark);

themeBtn && themeBtn.addEventListener('click', () => {
  setDark(document.documentElement.getAttribute('data-theme') !== 'dark');
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger && hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const nav = document.getElementById('nav');
const fab = document.getElementById('fab');

function onScroll() {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  if (fab) {
    fab.classList.toggle('visible', window.scrollY > 400);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element) => revealObs.observe(element));

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const navObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${entry.target.id}`) {
        link.classList.add('active');
      }
    });
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 });

sections.forEach((section) => navObs.observe(section));

document.querySelectorAll('[data-track-project]').forEach((element) => {
  element.addEventListener('click', () => {
    if (window.gtag) {
      gtag('event', 'project_click', {
        event_category: 'engagement',
        event_label: element.getAttribute('data-track-project')
      });
    }
  });
});

function trackResumeDownload() {
  if (window.gtag) {
    gtag('event', 'resume_download', {
      event_category: 'engagement'
    });
  }
}

function trackContactClick() {
  if (window.gtag) {
    gtag('event', 'contact_click', {
      event_category: 'engagement'
    });
  }
}

function trackSocialClick(platform) {
  if (window.gtag) {
    gtag('event', 'social_click', {
      event_category: 'engagement',
      event_label: platform
    });
  }
}

function trackPrimaryCta(source) {
  if (window.gtag) {
    gtag('event', 'primary_cta_click', {
      event_category: 'conversion',
      event_label: source
    });
  }
}
