// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Projects slider functionality
const projectsSlider = document.getElementById('projectsSlider');
const prevButton = document.getElementById('prevProject');
const nextButton = document.getElementById('nextProject');
const projectCards = document.querySelectorAll('.project-card');

let currentIndex = 0;
let autoScrollInterval;
let autoScrollPaused = false;
let userInteractionTimeout;
let isAutoScrolling = false;

// Scroll to a specific project
function scrollToProject(index) {
    if (index < 0) {
        index = projectCards.length - 1;
    } else if (index >= projectCards.length) {
        index = 0;
    }

    currentIndex = index;
    const card = projectCards[index];
    const cardWidth = card.offsetWidth;
    const containerWidth = projectsSlider.offsetWidth;
    const scrollPosition = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);

    isAutoScrolling = true;

    projectsSlider.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    // Reset flag dopo lo scrolling (attesa tempo animazione)
    setTimeout(() => {
        isAutoScrolling = false;
    }, 1000); // regola in base alla durata reale dello scroll
}

// Auto-scrolling management
function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
        scrollToProject(currentIndex + 1);
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Pause auto-scrolling temporarily upon user interaction
function pauseAutoScroll() {
    stopAutoScroll();
    autoScrollPaused = true;

    clearTimeout(userInteractionTimeout);
    userInteractionTimeout = setTimeout(() => {
        autoScrollPaused = false;
        startAutoScroll();
    }, 60000); // resume after 1 minute
}

// Event listeners
prevButton.addEventListener('click', () => {
    scrollToProject(currentIndex - 1);
    pauseAutoScroll();
});

nextButton.addEventListener('click', () => {
    scrollToProject(currentIndex + 1);
    pauseAutoScroll();
});

projectsSlider.addEventListener('scroll', () => {
    if (!isAutoScrolling) {
        pauseAutoScroll();
    }
});

// Initialize the projects slider to show the first project
window.addEventListener('load', () => {
    setTimeout(() => {
        scrollToProject(0);
    }, 500);
});

// Initialize auto-scroll
startAutoScroll();


// Contact form handling
emailjs.init('6Wx9zhMWcV1oIcEuk');

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const loader = document.getElementById('loader');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    loader.style.display = 'block';

    emailjs.sendForm('service_mznitas', 'template_yd5zchg', this)
      .then(() => {
        formSuccess.classList.remove('hidden');
        loader.style.display = 'none';
        contactForm.reset();
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }, (error) => {
        contactForm.reset();
        console.error('Errore invio:', error);
        alert('Errore durante l\'invio del messaggio.');
      });
});

// Translate
function toggleLanguage() {
  const select = document.querySelector('select.goog-te-combo');
  if (!select) return;

  const currentLang = select.value;
  const newLang = currentLang === 'en' ? 'it' : 'en';
  select.value = newLang;
  select.dispatchEvent(new Event('change'));

  updateLangButton(newLang);
}

function updateLangButton(lang) {
  const langBtn = document.getElementById('langBtn');
  if (!langBtn) return;

  if (lang === 'en') {
    langBtn.textContent = 'IT / EN';
  } else {
    langBtn.textContent = 'EN / IT';
  }
}

// Inizializzazione dopo caricamento
window.addEventListener('load', () => {
  // Aspetta che il dropdown venga creato
  const waitForTranslate = setInterval(() => {
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      updateLangButton(select.value);
      select.addEventListener('change', () => updateLangButton(select.value));
      clearInterval(waitForTranslate);
    }
  }, 500);
});
