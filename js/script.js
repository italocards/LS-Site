
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Add active class to navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    value = value.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
    e.target.value = value;
  });
}


// Add loading animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type !== 'submit') {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// WhatsApp integration
function openWhatsApp() {
    const phone = '5511987654321'; // Replace with actual WhatsApp number
    const message = 'Olá! Gostaria de saber mais sobre os serviços da LS Gestão Contábil.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add WhatsApp click handler
document.addEventListener('DOMContentLoaded', function() {
    const whatsappElements = document.querySelectorAll('.contact-method');
    whatsappElements.forEach(element => {
        if (element.textContent.includes('WhatsApp')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', openWhatsApp);
        }
    });
});

// Scroll indicator click handler
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#servicos').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const typeTarget = document.querySelector('.typewriter');
    if (!typeTarget) return;

    const fullText = typeTarget.getAttribute('data-text');
    let index = 0;

    function typeLetter() {
        if (index < fullText.length) {
            typeTarget.textContent += fullText.charAt(index);
            index++;
            setTimeout(typeLetter, 50); // velocidade (ms) por letra
        }
    }

    typeLetter();
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('client-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    const scrollAmount = 280;
    let direction = 1;
    let isAnimating = false;

    // Função de scroll suave personalizada
    function smoothScrollTo(element, to, duration = 600) {
        const start = element.scrollLeft;
        const change = to - start;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            element.scrollLeft = start + change * easeInOutQuad(progress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                animateVisibleCarouselItems();
                isAnimating = false;
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Easing para suavidade
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Anima os itens visíveis
    function animateVisibleCarouselItems() {
        const items = carousel.querySelectorAll('.fade-up');

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const carouselRect = carousel.getBoundingClientRect();

            const isVisible =
                itemRect.left >= carouselRect.left &&
                itemRect.right <= carouselRect.right;

            if (isVisible) {
                item.classList.add('animate');
            }
        });
    }

    // Botões
    prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        smoothScrollTo(carousel, carousel.scrollLeft - scrollAmount);
    });

    nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        smoothScrollTo(carousel, carousel.scrollLeft + scrollAmount);
    });

    // Auto scroll
    setInterval(() => {
        if (isAnimating) return;

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        if (carousel.scrollLeft >= maxScrollLeft) {
            direction = -1;
        } else if (carousel.scrollLeft <= 0) {
            direction = 1;
        }

        isAnimating = true;
        smoothScrollTo(carousel, carousel.scrollLeft + direction * scrollAmount);
    }, 3000);

    // Inicializar
    animateVisibleCarouselItems();
});
