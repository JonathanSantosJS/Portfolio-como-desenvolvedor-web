// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // WHATSAPP LINK COM GA4 + UTM
    // ============================================
    const phone = '5582987353564';
    const defaultMessage = encodeURIComponent('Olá! Quero um site para meu negócio. Meu nome é:');
    const utm = 'utm_source=site&utm_medium=botao&utm_campaign=whatsapp';

    document.querySelectorAll('.whatsapp-link').forEach(link => {
        // Monta href com UTM
        link.href = `https://wa.me/${phone}?text=${defaultMessage}&${utm}`;

        link.addEventListener('click', function(e) {
            e.preventDefault(); // previne navegação imediata

            if (typeof gtag === 'function') {
                gtag('event', 'click_whatsapp', {
                    event_category: 'engagement',
                    event_label: 'botao_whatsapp',
                    transport_type: 'beacon',
                    event_callback: function() {
                        // navega para o WhatsApp só depois do evento
                        window.location.href = link.href;
                    }
                });

                // Fallback caso callback não seja chamado em 1s
                setTimeout(() => {
                    window.location.href = link.href;
                }, 1000);
            } else {
                // fallback se gtag não estiver carregado
                window.location.href = link.href;
            }
        });
    });
});

    // ============================================
    // 2. SCROLL SUAVE PARA LINKS ANCORA
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. ANIMAÇÃO DE ENTRADA (INTERSECTION OBSERVER)
    // ============================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar animação em todos os elementos com classes de animação
    const elementosParaAnimar = document.querySelectorAll('.animate-up, .animate-scale, .animate-card');
    elementosParaAnimar.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 4. BOTÃO VOLTAR AO TOPO
    // ============================================
    const btnTopo = document.createElement('button');
    btnTopo.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btnTopo.className = 'btn-topo';
    document.body.appendChild(btnTopo);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btnTopo.classList.add('show');
        } else {
            btnTopo.classList.remove('show');
        }
    });
    
    btnTopo.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    btnTopo.addEventListener('mouseenter', function() {
        this.style.background = 'var(--laranja)';
        this.style.transform = 'translateY(-3px)';
    });
    
    btnTopo.addEventListener('mouseleave', function() {
        this.style.background = 'var(--azul-marinho)';
        this.style.transform = 'translateY(0)';
    });

    // ============================================
    // 5. ANO ATUAL NO FOOTER
    // ============================================
    const anoElement = document.getElementById('ano');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // 6. EFEITO PARALLAX NO HERO
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < 600) {
            hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
        }
    });

    // ============================================
    // 7. CARREGAR IMAGENS DOS DEPOIMENTOS (FALLBACK)
    // ============================================
    const avatarImages = document.querySelectorAll('.avatar-img');
    avatarImages.forEach(img => {
        img.addEventListener('error', function() {
            // Se a imagem não carregar, mostra ícone de fallback
            const parent = this.parentElement;
            const icon = document.createElement('i');
            icon.className = 'fas fa-user-circle';
            icon.style.fontSize = '3rem';
            icon.style.color = 'var(--laranja)';
            this.style.display = 'none';
            parent.appendChild(icon);
        });
    });

    // ============================================
    // 8. PREVENIR CLIQUE EM LINKS VAZIOS
    // ============================================
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ============================================
    // 9. EFEITO DE GLOW NO TÍTULO (HERO)
    // ============================================
    const destaque = document.querySelector('.hero-title .destaque');
    if (destaque) {
        setInterval(() => {
            destaque.style.textShadow = '0 0 10px rgba(243, 156, 18, 0.5)';
            setTimeout(() => {
                destaque.style.textShadow = 'none';
            }, 300);
        }, 3000);
    }

    // ============================================
    // 10. LOG DE CARREGAMENTO
    // ============================================
    console.log('✅ Site WebJS carregado com sucesso!');
});
