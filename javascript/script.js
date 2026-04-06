// script.js
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 0. INICIALIZAR GOOGLE ANALYTICS (GTAG)
    // ============================================
    // Verifica se o gtag está disponível
    function trackEvent(eventName, eventParams = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
            console.log(`📊 GA4 Event tracked: ${eventName}`, eventParams);
        } else {
            console.warn('⚠️ Google Analytics não carregado. Evento não enviado:', eventName);
        }
    }

    // ============================================
    // 1. CONFIGURAÇÃO WHATSAPP + EVENTOS GA4
    // ============================================
    const phone = '5582987353564';
    const defaultMessage = encodeURIComponent('Olá! Quero um site para meu negócio. Meu nome é:');
    
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.href = `https://wa.me/${phone}?text=${defaultMessage}`;

        // Evento de clique no WhatsApp
        link.addEventListener('click', function(e) {
            // Identificar qual botão foi clicado (header, hero, preço, footer, float)
            let buttonLocation = 'desconhecido';
            
            if (this.closest('header')) buttonLocation = 'header';
            else if (this.closest('.hero')) buttonLocation = 'hero';
            else if (this.closest('.preco-card')) buttonLocation = 'preco';
            else if (this.closest('.cta-final')) buttonLocation = 'cta_final';
            else if (this.classList.contains('whatsapp-float')) buttonLocation = 'float_button';
            
            // Evento personalizado para GA4
            trackEvent('whatsapp_click', {
                event_category: 'conversion',
                event_label: buttonLocation,
                button_location: buttonLocation,
                page_title: document.title,
                page_url: window.location.href
            });
        });
    });

    // ============================================
    // 2. EVENTOS DE CLIQUE EM BOTÕES PRINCIPAIS
    // ============================================
    // Botões "Solicitar orçamento" / "Quero meu site agora"
    document.querySelectorAll('.btn-primary, .btn-large, .btn-outline').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const buttonText = this.innerText.trim();
            const buttonClass = this.className;
            let buttonLocation = 'desconhecido';
            
            if (this.closest('header')) buttonLocation = 'header';
            else if (this.closest('.hero')) buttonLocation = 'hero';
            else if (this.closest('.preco-card')) buttonLocation = 'preco';
            else if (this.closest('.cta-final')) buttonLocation = 'cta_final';
            
            // Se for botão WhatsApp, já tratamos acima
            if (!this.classList.contains('whatsapp-link')) {
                trackEvent('button_click', {
                    event_category: 'engagement',
                    event_label: buttonText,
                    button_text: buttonText,
                    button_class: buttonClass,
                    button_location: buttonLocation
                });
            }
        });
    });

    // ============================================
    // 3. EVENTOS DE VISUALIZAÇÃO DE SEÇÕES (SCROLL DEPTH)
    // ============================================
    const sections = ['beneficios', 'como-funciona', 'depoimentos', 'preco', 'contato'];
    const viewedSections = new Set();
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !viewedSections.has(entry.target.id)) {
                viewedSections.add(entry.target.id);
                trackEvent('section_view', {
                    event_category: 'engagement',
                    event_label: entry.target.id,
                    section_name: entry.target.id,
                    section_title: entry.target.querySelector('h2')?.innerText || 'Sem título'
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) sectionObserver.observe(section);
    });

    // ============================================
    // 4. EVENTO DE SCROLL PROFUNDO (25%, 50%, 75%, 100%)
    // ============================================
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 100];
    const reachedMilestones = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        scrollMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                reachedMilestones.add(milestone);
                trackEvent('scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${milestone}%`,
                    scroll_percent: milestone,
                    page_title: document.title
                });
            }
        });
    });

    // ============================================
    // 5. EVENTO DE SAÍDA (ANTES DE FECHAR)
    // ============================================
    let exitTracked = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitTracked) {
            exitTracked = true;
            trackEvent('exit_intent', {
                event_category: 'engagement',
                event_label: 'mouse_leave_top',
                scroll_depth: Math.round(maxScroll),
                time_on_page: Math.round((Date.now() - pageStartTime) / 1000)
            });
        }
    });

    // ============================================
    // 6. TEMPO DE PERMANÊNCIA NA PÁGINA
    // ============================================
    const pageStartTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
        trackEvent('time_on_page', {
            event_category: 'engagement',
            event_label: 'page_view_duration',
            seconds_on_page: timeOnPage,
            page_title: document.title
        });
    });

    // ============================================
    // 7. SCROLL SUAVE PARA LINKS ÂNCORA
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Evento de clique em âncora
                trackEvent('anchor_click', {
                    event_category: 'navigation',
                    event_label: href,
                    anchor_target: href
                });
                
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
    // 8. ANIMAÇÃO DE ENTRADA (INTERSECTION OBSERVER)
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
    // 9. BOTÃO VOLTAR AO TOPO
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
        trackEvent('back_to_top', {
            event_category: 'navigation',
            event_label: 'click',
            scroll_position: Math.round(window.scrollY)
        });
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
    // 10. ANO ATUAL NO FOOTER
    // ============================================
    const anoElement = document.getElementById('ano');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // 11. EFEITO PARALLAX NO HERO
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < 600) {
            hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
        }
    });

    // ============================================
    // 12. CARREGAR IMAGENS DOS DEPOIMENTOS (FALLBACK)
    // ============================================
    const avatarImages = document.querySelectorAll('.avatar-img');
    avatarImages.forEach(img => {
        img.addEventListener('error', function() {
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
    // 13. PREVENIR CLIQUE EM LINKS VAZIOS
    // ============================================
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ============================================
    // 14. EFEITO DE GLOW NO TÍTULO (HERO)
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
    // 15. EVENTO DE CARREGAMENTO DA PÁGINA
    // ============================================
    trackEvent('page_view', {
        event_category: 'engagement',
        event_label: 'page_loaded',
        page_title: document.title,
        page_url: window.location.href,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight
    });

    // ============================================
    // 16. LOG DE CARREGAMENTO
    // ============================================
    console.log('✅ Site WebJS carregado com sucesso!');
    console.log('📊 Google Analytics 4 events configurados: WhatsApp clicks, Button clicks, Section views, Scroll depth, Exit intent, Time on page');
});
