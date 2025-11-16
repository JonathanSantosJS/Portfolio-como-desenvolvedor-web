// Premium Slider with 3D Stack Effect
class StackSlider3D {
  constructor() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.thumbs = Array.from(document.querySelectorAll('.thumb'));
    this.prevBtn = document.querySelector('.slider-nav.prev');
    this.nextBtn = document.querySelector('.slider-nav.next');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    if (this.totalSlides === 0) {
      console.warn('No slides found');
      return;
    }

    console.log(`🎄 Initializing 3D slider with ${this.totalSlides} slides`);

    // Initialize slides positions
    this.updateSlidesPosition();

    // Add thumb click handlers
    this.thumbs.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const index = Number(thumb.dataset.index);
        console.log(`Thumb clicked: ${index}`);
        this.goToSlide(index);
      });
    });

    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Auto-play
    this.startAutoPlay();
    
    // Pause on hover
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.addEventListener('mouseenter', () => this.stopAutoPlay());
      gallery.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Touch/swipe support
    this.addTouchSupport();

    // Preload images
    this.preloadImages();

    console.log('✅ 3D Stack Slider initialized successfully!');
  }

  preloadImages() {
    console.log('🖼️ Preloading images...');
    this.slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) {
        const src = img.src;
        const preloadImg = new Image();
        preloadImg.src = src;
        preloadImg.onload = () => {
          console.log(`✅ Image loaded: ${src}`);
          img.style.opacity = '1';
        };
        preloadImg.onerror = () => {
          console.error(`❌ Failed to load image: ${src}`);
        };
      }
    });
  }

  updateSlidesPosition() {
    this.slides.forEach((slide, index) => {
      // Remove all classes first
      slide.classList.remove('prev', 'active', 'next', 'hidden');
      
      // Calculate position based on current index
      const position = (index - this.currentIndex + this.totalSlides) % this.totalSlides;
      
      // Apply classes based on position
      if (position === 0) {
        // Current active slide
        slide.classList.add('active');
      } else if (position === 1) {
        // Next slide
        slide.classList.add('next');
      } else if (position === this.totalSlides - 1) {
        // Previous slide
        slide.classList.add('prev');
      } else {
        // Hidden slides
        slide.classList.add('hidden');
      }
    });

    // Update thumbs
    this.thumbs.forEach(thumb => {
      const thumbIndex = Number(thumb.dataset.index);
      thumb.classList.toggle('active', thumbIndex === this.currentIndex);
    });
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    
    this.isAnimating = true;
    this.currentIndex = (index + this.totalSlides) % this.totalSlides;
    
    console.log(`🔄 Going to slide: ${this.currentIndex}`);
    
    this.updateSlidesPosition();
    
    // Reset animation flag after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  next() {
    this.goToSlide(this.currentIndex + 1);
  }

  prev() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 4000); // 4 seconds
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  addTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    const slidesContainer = document.querySelector('.slides-container');
    if (!slidesContainer) return;

    slidesContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      this.stopAutoPlay();
    });

    slidesContainer.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      // Apply temporary transform during swipe
      if (Math.abs(diff) > 10) {
        const transform = (diff / slidesContainer.offsetWidth) * 30;
        this.slides.forEach(slide => {
          slide.style.transform = `translateX(${transform}%) scale(0.95)`;
        });
      }
    });

    slidesContainer.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      
      const diff = startX - currentX;
      const swipeThreshold = 50;
      
      if (diff > swipeThreshold) {
        this.next();
      } else if (diff < -swipeThreshold) {
        this.prev();
      } else {
        // Return to current position
        this.updateSlidesPosition();
      }
      
      // Reset temporary transforms
      this.slides.forEach(slide => {
        slide.style.transform = '';
      });
      
      isSwiping = false;
      this.startAutoPlay();
    });
  }
}

// Enhanced smooth scroll with offset
function smoothScrollTo(target, offset = 0) {
  const element = document.querySelector(target);
  if (!element) {
    console.warn(`Element ${target} not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Image error handling
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.error(`❌ Image failed to load: ${this.src}`);
      this.style.opacity = '0.5';
      this.alt = 'Imagem não carregada - ' + this.alt;
    });
    
    img.addEventListener('load', function() {
      console.log(`✅ Image loaded successfully: ${this.src}`);
      this.style.opacity = '1';
    });
  });
}

// Função para adicionar efeito de neve natalino - CORRIGIDA
function addSnowEffect() {
  // Verificar se já existe o container de neve
  if (document.querySelector('.snow-container')) {
    console.log('❄️ Snow effect already exists');
    return;
  }

  const snowContainer = document.createElement('div');
  snowContainer.className = 'snow-container';
  document.body.appendChild(snowContainer);

  console.log('❄️ Creating snow effect...');

  // Criar flocos de neve
  const snowflakeCount = 60;
  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflake(snowContainer, i);
  }

  console.log(`✅ Created ${snowflakeCount} snowflakes`);
}

function createSnowflake(container, index) {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  
  // Tamanhos aleatórios para variedade
  const sizes = ['3px', '4px', '5px', '6px'];
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  
  // Opacidades aleatórias
  const opacities = ['0.3', '0.5', '0.7', '0.9'];
  const opacity = opacities[Math.floor(Math.random() * opacities.length)];
  
  // Configurações de animação
  const duration = 8 + Math.random() * 8; // 8-16 segundos
  const delay = Math.random() * 5;
  const endX = (Math.random() - 0.5) * 150; // Movimento lateral final
  const swayAmount = 10 + Math.random() * 20;

  snowflake.style.cssText = `
    position: absolute;
    top: -30px;
    width: ${size};
    height: ${size};
    background: white;
    border-radius: 50%;
    opacity: ${opacity};
    filter: blur(0.5px);
    pointer-events: none;
    left: ${Math.random() * 100}vw;
    --end-x: ${endX}px;
    --sway-amount: ${swayAmount}px;
    animation: 
      snowFall ${duration}s linear ${delay}s infinite,
      snowSway ${duration * 0.8}s ease-in-out ${delay}s infinite;
  `;

  // Adicionar classe especial para alguns flocos (brilho dourado)
  if (index % 5 === 0) {
    snowflake.classList.add('special');
  }

  container.appendChild(snowflake);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎄 DOM loaded, initializing premium 3D jewelry store...');

  // Adicionar efeito de neve primeiro
  addSnowEffect();

  // Initialize 3D stack slider
  const slider = new StackSlider3D();

  // Enhanced smooth scroll for "Saiba mais" button
  const learnBtn = document.getElementById('learnBtn');
  if (learnBtn) {
    learnBtn.addEventListener('click', () => {
      smoothScrollTo('.product-hero', 80);
    });
  }

  // Handle image errors
  handleImageErrors();

  // Add loading animation to elements as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.testimonial, .imagebox, .textbox').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Enhanced button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add subtle parallax effect to hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `scale(1.02) translateY(${scrolled * 0.4}px)`;
    }
  });

  console.log('✅ Premium 3D Jewelry Store with Snow Effect initialized successfully!');
});

// Add some festive console message
console.log(`%c✨ Colar Nossa Senhora - Edição Natalina 3D ✨`, 
  'color: #D4AF37; font-size: 18px; font-weight: bold; text-shadow: 1px 1px 2px #000;'
);
console.log(`%cEfeito 3D Stack + Neve Natalina Ativado! 🎄❄️`, 
  'color: #1f7a3a; font-size: 14px; font-style: italic;'
);
console.log(`%cQue a magia do Natal ilumine seu dia! 🌟`, 
  'color: #b92b2b; font-size: 12px;'
);
