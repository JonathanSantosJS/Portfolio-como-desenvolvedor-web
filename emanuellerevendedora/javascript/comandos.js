document.addEventListener('DOMContentLoaded', () => {
    // Alert Banner functionality
    const alertBanner = document.getElementById('alertBanner');
    const closeAlert = document.getElementById('closeAlert');

    // Show alert banner with animation
    setTimeout(() => {
        alertBanner.style.transform = 'translateY(0)';
        alertBanner.style.opacity = '1';
    }, 2000);

    closeAlert.addEventListener('click', () => {
        alertBanner.style.transform = 'translateY(-100%)';
        alertBanner.style.opacity = '0';
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.backgroundColor = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
});