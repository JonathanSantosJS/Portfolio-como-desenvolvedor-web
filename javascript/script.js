// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LINKS WHATSAPP =====
    const phone = '5582987353564';
    const defaultMessage = encodeURIComponent('Olá! Quero um site simples para meu negócio. Meu nome é:');
    
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.href = `https://wa.me/${phone}?text=${defaultMessage}`;
    });
    
    // ===== SCROLL SUAVE =====
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
    
    // ===== ANIMAÇÃO DE ENTRADA =====
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.beneficio-card, .demo-card, .passo').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ===== BOTÃO VOLTAR AO TOPO (opcional) =====
    const btnTopo = document.createElement('button');
    btnTopo.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btnTopo.className = 'btn-topo';
    btnTopo.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 45px;
        height: 45px;
        background: var(--azul-marinho);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(btnTopo);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btnTopo.style.opacity = '1';
            btnTopo.style.visibility = 'visible';
        } else {
            btnTopo.style.opacity = '0';
            btnTopo.style.visibility = 'hidden';
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
    
    // ===== ANO ATUAL NO FOOTER =====
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
});
