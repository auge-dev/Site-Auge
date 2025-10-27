// Funções essenciais para o site AUGE - Versão simplificada



// Inicializa o menu mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Inicializa o contador regressivo
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        // Data final (7 dias a partir de hoje)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 7);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            // Cálculo de tempo
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Atualiza os elementos HTML
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.innerText = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.innerText = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.innerText = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.innerText = seconds.toString().padStart(2, '0');
            
            // Verifica se o countdown terminou
            if (distance < 0) {
                clearInterval(countdownInterval);
                if (countdownElement) {
                    countdownElement.innerHTML = "<p>Inscrições encerradas!</p>";
                }
            }
        }
        
        // Atualiza imediatamente e depois a cada segundo
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }
}

// Força todos os links a abrirem em nova guia
function initLinksNewTab() {
    const anchors = document.querySelectorAll('a');
    anchors.forEach(a => {
        a.setAttribute('target', '_blank');
        const rel = a.getAttribute('rel');
        a.setAttribute('rel', rel ? `${rel} noopener` : 'noopener');
    });
}

// Inicializa o scroll suave para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Se o link está configurado para abrir em nova guia, não aplica scroll suave
            if (this.getAttribute('target') === '_blank') {
                return;
            }
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicialização do FAQ
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    function collapseItem(item) {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        const q = item.querySelector('.faq-question');
        if (ans) ans.style.maxHeight = 0;
        if (icon) { icon.classList.remove('fa-minus'); icon.classList.add('fa-plus'); }
        if (q) q.setAttribute('aria-expanded', 'false');
    }

    function expandItem(item) {
        item.classList.add('active');
        const ans = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        const q = item.querySelector('.faq-question');
        if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
        if (icon) { icon.classList.remove('fa-plus'); icon.classList.add('fa-minus'); }
        if (q) q.setAttribute('aria-expanded', 'true');
    }

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        if (!question || !answer) return;

        // Acessibilidade
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        question.setAttribute('aria-expanded', 'false');
        const answerId = answer.id || `faq-answer-${index}`;
        answer.id = answerId;
        question.setAttribute('aria-controls', answerId);

        const toggle = () => {
            // Fecha outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    collapseItem(otherItem);
                }
            });
            // Abre/fecha atual
            if (item.classList.contains('active')) {
                collapseItem(item);
            } else {
                expandItem(item);
            }
        };

        question.addEventListener('click', toggle);
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Ajusta altura ao redimensionar a janela
    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if (item.classList.contains('active')) {
                const ans = item.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });
}

// Animação de fade-in para elementos ao rolar a página
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Verifica elementos visíveis ao carregar e ao rolar
    window.addEventListener('scroll', checkFade);
    checkFade();
}

// Inicializa todas as funções quando o DOM estiver carregado
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    if (!track || !prevBtn || !nextBtn || dots.length === 0) return;

    let currentSlide = 0;
    const totalSlides = dots.length;
    let isAnimating = false;

    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;
        const translateX = -currentSlide * 25; // 25% por slide
        track.style.transform = `translateX(${translateX}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        prevBtn.classList.toggle('disabled', currentSlide === 0);
        nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);

        setTimeout(() => { isAnimating = false; }, 300);
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1 && !isAnimating) {
            currentSlide++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentSlide > 0 && !isAnimating) {
            currentSlide--;
            updateCarousel();
        }
    }

    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides && slideIndex !== currentSlide && !isAnimating) {
            currentSlide = slideIndex;
            updateCarousel();
        }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    updateCarousel();
}
document.addEventListener('DOMContentLoaded', function() {
    initLinksNewTab();
    initMobileMenu();
    initCountdown();
    initSmoothScroll();
    initFaq();
    initScrollAnimations();
    initCarousel();
});