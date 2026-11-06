/**
 * Main Application Script
 * GSAP animations, Interactive 3D Card Tilts, Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  // 3. Navbar Blur & Shrink on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-black/70', 'backdrop-blur-xl', 'border-b', 'border-cyan-500/20', 'py-3');
      header.classList.remove('py-5');
    } else {
      header.classList.remove('bg-black/70', 'backdrop-blur-xl', 'border-b', 'border-cyan-500/20', 'py-3');
      header.classList.add('py-5');
    }
  });

  // 4. GSAP & ScrollTrigger Animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('#hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
      .from('#hero-title', { opacity: 0, y: 30, duration: 1 }, '-=0.4')
      .from('#hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('#hero-cta', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('#hero-stats', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');

    // Section Headers Reveal
    gsap.utils.toArray('.section-header').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    // Staggered Cards Reveal (Skills, Works, Timeline)
    gsap.utils.toArray('.reveal-group').forEach((group) => {
      const items = group.querySelectorAll('.reveal-item');
      gsap.from(items, {
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });
    });

    // Timeline Line Progress Fill
    const timelineProgress = document.getElementById('timeline-progress');
    if (timelineProgress) {
      gsap.to(timelineProgress, {
        scrollTrigger: {
          trigger: '#timeline-container',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.8
        },
        height: '100%',
        ease: 'none'
      });
    }
  }

  // 5. Interactive 3D Tilt Effect on Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Dynamic glare/glow position
      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.15) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.background = `transparent`;
      }
    });
  });

  // 6. Contact Form Mock Handling with Feedback
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⟳</span> 送信中...
      `;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formSuccess.classList.remove('hidden');

        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }, 1000);
    });
  }
});
