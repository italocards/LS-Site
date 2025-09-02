
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
    let digits = e.target.value.replace(/\D/g, '').slice(0, 11); // só 11 dígitos
    let formatted = '';

    if (digits.length <= 2) {
      formatted = '(' + digits;
    } else if (digits.length <= 7) {
      formatted = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    } else {
      formatted = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
    }

    e.target.value = formatted;
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
    const phone = '5585996021384';
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

// Smooth scroll customizado (mais lento e perceptível)
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;

  document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      const startPosition = window.pageYOffset;
      const targetPosition = target.offsetTop - headerHeight;
      const distance = targetPosition - startPosition;
      const duration = 1200; // tempo da animação em ms
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    });
  });
});

document.getElementById("contact-form").addEventListener("submit", function(e){
    e.preventDefault();
    const form = e.target;
    let isValid = true;

    // Limpa erros anteriores
    form.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    // Campos
    const nome = form.querySelector("#nome");
    const email = form.querySelector("#email");
    const telefone = form.querySelector("#telefone");
    const mensagem = form.querySelector("#mensagem");

    // Validações
    if (nome.value.trim().length < 3) {
        nome.nextElementSibling.textContent = "Digite pelo menos 3 caracteres.";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.nextElementSibling.textContent = "E-mail inválido.";
        isValid = false;
    }

    if (telefone.value.trim()) {
        const telDigits = telefone.value.replace(/\D/g, '');
        if (telDigits.length !== 11) {
            telefone.nextElementSibling.textContent = "Informe um número celular válido com 11 dígitos (ex: (85) 98417-5416).";
            isValid = false;
        }
    }


    if (mensagem.value.trim().length < 10) {
        mensagem.nextElementSibling.textContent = "Digite pelo menos 10 caracteres.";
        isValid = false;
    }

    if (!isValid) return; // impede envio

    // Envia se válido
    fetch("https://formsubmit.co/ajax/lsgestaocontabil.contato@gmail.com", {
        method: "POST",
        body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
        form.reset();
        document.getElementById("success-message").style.display = "block";
        setTimeout(() => {
            document.getElementById("success-message").style.display = "none";
        }, 5000);
    })
    .catch(error => console.log(error));
});

