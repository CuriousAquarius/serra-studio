/* ============================================
   SERRA STUDIO DEMO — theme-switcher.js
   Industry Tab → CSS Custom Property Swap
   ============================================ */

const industryData = {
  salon: {
    title: 'Salon & Med Spa',
    image: 'assets/hero-salon.jpg',
    desc: 'Warm, aspirational, and luxurious. We pair Vietnamese-owned salon aesthetics with marble textures, chandelier photography, and glass morphism cards that feel as premium as your services.',
    features: ['Glass morphism navigation', 'AI-generated luxury interiors', 'Scroll-reveal service cards', 'CSS clip-path photo reveals']
  },
  autobody: {
    title: 'Auto Body Shop',
    image: 'assets/hero-autobody.jpg',
    desc: 'Dark, dramatic, built to earn trust. Cinematic garage photography, bold industrial typography, and before/after galleries that show your craftsmanship before a customer even calls.',
    features: ['Dark cinematic color palette', 'Before/after scroll gallery', 'Dramatic hero video loop', 'Trust-building certifications section']
  },
  photographer: {
    title: 'Photographer & Videographer',
    image: 'assets/hero-photographer.jpg',
    desc: 'Your work is the design. Maximum visual real estate, horizontal scroll galleries, and a cursor follower that turns every hover into an experience. Film noir meets modern portfolio.',
    features: ['Horizontal scroll portfolio', 'Custom cursor follower', 'Mix-blend-mode text overlays', 'Lightbox with scale animation']
  },
  event: {
    title: 'Event Vendor',
    image: 'assets/hero-event.jpg',
    desc: 'Lush, celebratory, emotional. Golden hour photography, staggered gallery reveals, and seasonal palette switching — because your portfolio changes with the calendar.',
    features: ['Seasonal palette switcher', 'Staggered grid gallery', 'Frosted glass testimonial cards', 'CSS gradient scroll indicators']
  }
};

const tabs = document.querySelectorAll('.industry-tab');
const industryImg = document.getElementById('industryImg');
const industryTitle = document.getElementById('industryTitle');
const industryDesc = document.getElementById('industryDesc');
const industryFeatures = document.getElementById('industryFeatures');

function switchIndustry(theme) {
  const data = industryData[theme];
  if (!data) return;

  // Swap CSS theme
  document.documentElement.setAttribute('data-theme', theme);

  // Swap content with fade
  industryImg.style.opacity = '0';
  industryImg.style.transform = 'scale(1.04)';

  setTimeout(() => {
    industryImg.onload = () => {
      industryImg.style.opacity = '1';
      industryImg.style.transform = 'scale(1)';
      industryImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    };
    industryImg.src = data.image; // src set after onload to catch cached-image case
    industryTitle.textContent = data.title;
    industryDesc.textContent = data.desc;
    industryFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
  }, 200);

  // Update hero bg image
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    heroBg.style.backgroundImage = `url('${data.image}')`;
  }
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    switchIndustry(tab.dataset.theme);
  });
});

// Set salon as default on load
switchIndustry('salon');
