/* ============================================
   SERRA STUDIO DEMO — animations.js
   GSAP ScrollTrigger + Custom Cursor
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

/* --- CUSTOM CURSOR --- */
const cursor = document.createElement('div');
cursor.className = 'cursor';
const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.append(cursor, follower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

gsap.ticker.add(() => {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  gsap.set(follower, { x: followerX, y: followerY });
});

document.querySelectorAll('a, button, .industry-tab, .stack-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { width: 18, height: 18, duration: 0.2 });
    gsap.to(follower, { width: 54, height: 54, opacity: 0.8, duration: 0.2 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { width: 10, height: 10, duration: 0.2 });
    gsap.to(follower, { width: 36, height: 36, opacity: 0.5, duration: 0.2 });
  });
});

/* --- NAV GLASS ON SCROLL --- */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: self => {
    if (self.scroll() > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});

/* --- HERO PARALLAX --- */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  gsap.to(heroBg, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* --- HERO ENTRANCE ANIMATION --- */
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl
  .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .from('#heroLine1', { y: '110%', duration: 0.9, ease: 'power4.out' }, '-=0.4')
  .from('#heroLine2', { y: '110%', duration: 0.9, ease: 'power4.out' }, '-=0.65')
  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  .to('.hero-btn', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

/* --- SECTION REVEALS --- */
gsap.utils.toArray('.reveal-section').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });
});

/* --- STACK CARDS STAGGER --- */
gsap.from('.stack-card', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.stack-grid',
    start: 'top 80%'
  }
});

/* --- HORIZONTAL SCROLL GALLERY --- */
const hContainer = document.getElementById('hContainer');
const hTrack = document.getElementById('hTrack');

if (hContainer && hTrack) {
  const panels = gsap.utils.toArray('.panel');
  const totalWidth = panels.length * window.innerWidth;

  gsap.to(hTrack, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: hContainer,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => '+=' + (totalWidth - window.innerWidth)
    }
  });
}

/* --- PROCESS CARDS STAGGER --- */
gsap.utils.toArray('.process-card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: i * 0.1,
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      onEnter: () => card.classList.add('visible')
    }
  });
});

/* --- CTA HEADLINE REVEAL --- */
const ctaEls = ['.cta-headline', '.cta-sub', '.cta-btn', '.cta-fine'];
ctaEls.forEach((sel, i) => {
  gsap.from(sel, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 75%'
    }
  });
});

/* --- REFRESH on resize --- */
window.addEventListener('resize', () => ScrollTrigger.refresh());
