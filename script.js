/* ============================================
   FITFINITY FITNESS — Minimal 3D Motion
   Smooth, Apple-like interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {


  // ─── HERO IMAGE SLIDER LOGIC ────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const heroTitle = document.querySelector('.hero-content h1');
  let currentSlide = 0;
  
  const titleVariations = [
    'WHERE<br>HUMAN LIMITS<br>BECOME <span class="text-accent">INFINITE.</span>',
    'SCULPT<br>YOUR BODY<br>DEFY <span class="text-accent">GRAVITY.</span>',
    'UNLEASH<br>YOUR INNER<br>RAW <span class="text-accent">POWER.</span>'
  ];

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
      
      if (heroTitle) {
        heroTitle.innerHTML = titleVariations[currentSlide];
      }
      
      // Retrigger GSAP text animation
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(".hero-content h1", 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.1 }
        );
      }
    }, 6000); // 6 seconds per slide
  }

  // (Horizontal GSAP scroll removed for standard Gym layout)

  // ─── MOBILE MENU TOGGLE ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      navLinksList.classList.toggle('active');
    });
    // Close menu when clicking a link
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('active');
      });
    });
  }

  // ─── SCROLL EFFECTS ─────────────────────────────
  function onScroll() {
    const scrollY = window.scrollY;
    
    // Navbar styling
    const navbarEl = document.getElementById('navbar');
    if (navbarEl) {
      if (scrollY > 50) {
        navbarEl.classList.add('scrolled');
      } else {
        navbarEl.classList.remove('scrolled');
      }
    }
    
    // Subtle parallax on hero content
    const heroContentEl = document.querySelector('.hero-content');
    if (heroContentEl) {
      const progress = Math.min(scrollY / window.innerHeight, 1);
      heroContentEl.style.transform = `translateY(${progress * -100}px)`;
      heroContentEl.style.opacity = 1 - progress * 1.5;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── GSAP HERO ANIMATION ────────────────────────
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hero-content h1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
  }

  // ─── GSAP SCROLL REVEAL ANIMATIONS ────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }



  // ─── SMOOTH SCROLL NAV ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarEl = document.getElementById('navbar');
        const navHeight = navbarEl ? navbarEl.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // ─── 3D CARD TILT REMOVED ────────────────────────
  // Cards now rely purely on clean CSS hover states.


  // ─── JOIN MODAL LOGIC ────────────────────────────
  const joinBtns = document.querySelectorAll('#joinBtn, .join-btn');
  const joinModal = document.getElementById('joinModal');
  const closeModal = document.getElementById('closeModal');

  if (joinModal) {
    joinBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        joinModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeModal) {
      closeModal.addEventListener('click', () => {
        joinModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    joinModal.addEventListener('click', (e) => {
      if (e.target === joinModal) {
        joinModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for subscribing! We will keep you updated.');
        joinModal.classList.remove('active');
        document.body.style.overflow = '';
        newsletterForm.reset();
      });
    }
  }

});
