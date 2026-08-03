/* ===================================================
   DIVYANSHI AGARWAL — PORTFOLIO JAVASCRIPT
=================================================== */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== GALLERY TAB FILTERING =====
const tabBtns = document.querySelectorAll('.tab-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;

    galleryItems.forEach((item, index) => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || category === filter;

      if (shouldShow) {
        item.classList.remove('hidden');
        item.style.animationDelay = `${index * 0.08}s`;
        item.classList.add('gallery-reveal');
      } else {
        item.classList.add('hidden');
        item.classList.remove('gallery-reveal');
      }
    });

    // Handle wide items responsiveness
    galleryItems.forEach(item => {
      if (!item.classList.contains('hidden') && filter !== 'all') {
        item.classList.remove('gallery-item--wide');
      } else if (filter === 'all') {
        if (item.id === 'work-2') {
          item.classList.add('gallery-item--wide');
        }
      }
    });
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class to sections
const revealTargets = document.querySelectorAll(
  '.about-image-col, .about-text-col, .gallery-item, .skill-bar-item, .tool-card, .timeline-card, .pillar, .story-text, .edu-card, .stat-card'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger delays
  el.style.transitionDelay = `${(i % 5) * 0.1}s`;
  revealObserver.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        setTimeout(() => fill.classList.add('animated'), 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillSection = document.getElementById('skills');
if (skillSection) skillObserver.observe(skillSection);

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ===== CURSOR TRAIL EFFECT (Subtle Paint Drops) =====
const cursor = { x: 0, y: 0 };
let trailTimeout;

document.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;

  clearTimeout(trailTimeout);
  trailTimeout = setTimeout(() => {
    createPaintDrop(cursor.x, cursor.y);
  }, 100);
}, { passive: true });

function createPaintDrop(x, y) {
  const drop = document.createElement('div');
  drop.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(201, 146, 74, 0.4);
    top: ${y}px;
    left: ${x}px;
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 9999;
    animation: dropFade 1.2s ease-out forwards;
  `;
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 1200);
}

// Inject keyframes for cursor drops
const style = document.createElement('style');
style.textContent = `
  @keyframes dropFade {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
  }
  @keyframes gallery-reveal {
    from { opacity: 0; transform: scale(0.95) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .gallery-reveal {
    animation: gallery-reveal 0.5s ease forwards;
  }
  .nav-links a.active-nav {
    color: var(--gold-light) !important;
  }
  .nav-links a.active-nav::after {
    transform: scaleX(1) !important;
  }
`;
document.head.appendChild(style);

// ===== TYPING EFFECT FOR HERO TAGLINE =====
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.innerHTML;
  tagline.innerHTML = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      tagline.innerHTML = text.substring(0, i + 1);
      i++;
      setTimeout(typeWriter, 18);
    }
  };
  
  // Start after the fade-in animation
  setTimeout(() => {
    tagline.style.opacity = '1';
    tagline.style.animation = 'none';
    tagline.style.transform = 'translateY(0)';
    typeWriter();
  }, 800);
}

// ===== PARALLAX HERO BLOBS =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blobs = document.querySelectorAll('.hero-blob');
  blobs.forEach((blob, i) => {
    const speed = 0.2 + i * 0.1;
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ===== GALLERY HOVER TILT =====
galleryItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    item.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
  });
});

// ===== MARQUEE PAUSE ON HOVER =====
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ===== PAGE LOAD TRANSITION =====
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.6s ease';
  document.body.style.opacity = '1';
});

console.log('%c🎨 Divyanshi Agarwal Portfolio', 'color: #c9924a; font-size: 1.2rem; font-weight: bold;');
console.log('%cMade by hand. Felt from the heart.', 'color: #b0a898; font-style: italic;');

// ===== LIGHTBOX =====
(function () {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lbImg');
  const lbVideo    = document.getElementById('lbVideo');
  const lbTitle    = document.getElementById('lbTitle');
  const lbCat      = document.getElementById('lbCat');
  const lbDesc     = document.getElementById('lbDesc');
  const lbCounter  = document.getElementById('lbCounter');
  const lbLoader   = document.getElementById('lbLoader');
  const lbClose    = document.getElementById('lbClose');
  const lbPrev     = document.getElementById('lbPrev');
  const lbNext     = document.getElementById('lbNext');
  const lbBackdrop = document.getElementById('lbBackdrop');

  let items = [];
  let current = 0;

  function getVisibleItems() {
    return Array.from(document.querySelectorAll('.gallery-item[data-lb-src]:not(.hidden)'));
  }

  function openAt(index) {
    items = getVisibleItems();
    if (!items.length) return;
    current = ((index % items.length) + items.length) % items.length;
    render();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function render() {
    const el   = items[current];
    const src  = el.dataset.lbSrc;
    const type = el.dataset.lbType; // 'video' or undefined

    lbTitle.textContent   = el.dataset.lbTitle || '';
    lbCat.textContent     = el.dataset.lbCat   || '';
    lbDesc.textContent    = el.dataset.lbDesc  || '';
    lbCounter.textContent = (current + 1) + ' / ' + items.length;

    lbLoader.style.display = 'flex';
    lbImg.style.opacity    = '0';
    lbImg.style.display    = 'none';
    
    if (lbVideo) {
      lbVideo.style.opacity = '0';
      lbVideo.style.display = 'none';
      lbVideo.pause();
    }

    if (type === 'video' && lbVideo) {
      lbLoader.style.display = 'none';
      lbVideo.style.display = 'block';
      lbVideo.src = src;
      lbVideo.classList.remove('lb-fadein');
      void lbVideo.offsetWidth; // reflow
      lbVideo.classList.add('lb-fadein');
      lbVideo.style.opacity = '1';
      lbVideo.play().catch(e => console.log('Autoplay prevented', e));
    } else {
      lbImg.style.display = 'block';
      lbImg.onload  = null;
      lbImg.onerror = null;

      lbImg.onload = function () {
        lbLoader.style.display = 'none';
        lbImg.classList.remove('lb-fadein');
        void lbImg.offsetWidth;
        lbImg.classList.add('lb-fadein');
        lbImg.style.opacity = '1';
      };

      lbImg.onerror = function () {
        lbLoader.style.display = 'none';
        lbImg.style.opacity = '1';
      };

      lbImg.src = src;
      lbImg.alt = el.dataset.lbTitle || '';
    }

    lbPrev.style.visibility = items.length > 1 ? 'visible' : 'hidden';
    lbNext.style.visibility = items.length > 1 ? 'visible' : 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lbLoader.style.display = 'none';
    lbImg.onload  = null;
    lbImg.onerror = null;
    lbImg.src = ''; 
    if (lbVideo) {
      lbVideo.pause();
      lbVideo.src = '';
    }
  }

  function prev() { current = ((current - 1) + items.length) % items.length; render(); }
  function next() { current = (current + 1) % items.length; render(); }

  // Click gallery card → open lightbox
  document.getElementById('galleryGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-item[data-lb-src]');
    if (!card) return;
    items = getVisibleItems();
    const idx = items.indexOf(card);
    openAt(idx >= 0 ? idx : 0);
  });

  lbClose.addEventListener('click', close);
  lbBackdrop.addEventListener('click', close);
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Swipe support (mobile)
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  }, { passive: true });
})();
