  const container = document.querySelector('.formas-flutuantes');
  const tipos = ['circulo', 'quadrado', 'triangulo'];
  const cores = ['branca', 'laranja'];
  const tamanhos = ['pequena', 'media', 'grande'];

  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.classList.add('forma');
    span.classList.add(tipos[Math.floor(Math.random() * tipos.length)]);
    span.classList.add(cores[Math.floor(Math.random() * cores.length)]);
    span.classList.add(tamanhos[Math.floor(Math.random() * tamanhos.length)]);
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (15 + Math.random() * 15) + 's';
    container.appendChild(span);
  }

/*BOTÃO FLUTUANTE PARA VOLTAR AO TOPO*/
// Mostra o botão ao rolar
window.onscroll = function() {
    const btn = document.getElementById("btnTopo");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Rola suavemente até o topo
document.getElementById("btnTopo").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animação das formas geométricas
document.addEventListener('DOMContentLoaded', function() {
    // Criar formas geométricas dinamicamente
    const container = document.querySelector('.formas-flutuantes');
    const tipos = ['circulo', 'quadrado', 'triangulo'];
    const cores = ['branca', 'laranja'];
    const tamanhos = ['pequena', 'media', 'grande'];

    for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.classList.add('forma');
        span.classList.add(tipos[Math.floor(Math.random() * tipos.length)]);
        span.classList.add(cores[Math.floor(Math.random() * cores.length)]);
        span.classList.add(tamanhos[Math.floor(Math.random() * tamanhos.length)]);
        
        // Posição aleatória
        const startX = Math.random() * 100;
        span.style.setProperty('--start-x', `${startX}vw`);
        span.style.left = `${startX}%`;
        
        // Duração aleatória da animação
        span.style.animationDuration = `${15 + Math.random() * 20}s`;
        
        // Delay aleatório
        span.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(span);
    }

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const containerMenu = document.querySelector('.containerMenu');
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        containerMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = containerMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar no overlay
    menuOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        containerMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            containerMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Botão voltar ao topo
    const btnTopo = document.getElementById('btnTopo');
    
    window.addEventListener('scroll', function() {
        // Mostrar/esconder botão topo
        if (window.pageYOffset > 300) {
            btnTopo.style.display = 'flex';
            btnTopo.style.alignItems = 'center';
            btnTopo.style.justifyContent = 'center';
        } else {
            btnTopo.style.display = 'none';
        }
        
        // Header scroll effect
        const header = document.querySelector('header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Menu ativo baseado na seção visível
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const menuLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                menuLinks.forEach(link => link.classList.remove('active'));
                if (menuLink) menuLink.classList.add('active');
            }
        });
        
        // Animações de entrada das seções
        const animatedElements = document.querySelectorAll('.section-animate');
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botão topo
    btnTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Inicializar animações das seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-animate');
    });
    
    // Trigger scroll para animações iniciais
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
    
    // Efeito hover nos cards com delay
    const cards = document.querySelectorAll('.card, .pacote, .item, .depoimento');
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animar elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.card, .pacote, .item, .depoimento').forEach(el => {
        observer.observe(el);
    });
});

// Efeito de digitação no subtítulo do banner (opcional)
function typeWriterEffect() {
    const subtitle = document.querySelector('.subtitulobanner');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Iniciar após 1 segundo
    setTimeout(typeWriter, 1000);
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', typeWriterEffect);
