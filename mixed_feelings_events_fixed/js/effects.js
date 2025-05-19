// Additional JavaScript for dynamic effects on Mixed Feelings Website

// Parallax Effect for Hero Section
function setupParallax() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.3;
            
            // Parallax effect for hero image
            heroImage.style.transform = `scale(1.05) translateY(${translateY}px)`;
            
            // Fade effect for hero content
            if (heroContent) {
                heroContent.style.opacity = 1 - (scrollPosition * 0.003);
            }
        });
    }
}

// Animated Background Gradient
function setupAnimatedGradient() {
    const noiseBg = document.querySelector('.noise-bg');
    
    if (noiseBg) {
        let angle = 135;
        
        setInterval(() => {
            angle = (angle + 1) % 360;
            noiseBg.style.background = `linear-gradient(${angle}deg, #000000, #1a001a, #000000)`;
        }, 100);
    }
}

// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Hover Effects for Cards
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.event-card, .mix-card, .podcast-card, .product-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Animated Counter for Statistics
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 20)); // Update every 20ms
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    setTimeout(updateCounter, 20);
                }
            };
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.disconnect();
                }
            });
            
            observer.observe(counter);
        });
    }
}

// Typing Effect for Hero Title
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.getAttribute('data-typing') === 'true') {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// Audio Player Customization
function setupAudioPlayers() {
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(player => {
        player.addEventListener('play', () => {
            // Pause all other audio players
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });
    });
}

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    setupParallax();
    setupAnimatedGradient();
    setupSmoothScroll();
    setupCardHoverEffects();
    setupCounters();
    setupTypingEffect();
    setupAudioPlayers();
});
