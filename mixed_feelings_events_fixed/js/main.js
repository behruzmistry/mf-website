// Main JavaScript for Mixed Feelings Website

// DOM Elements
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navClose = document.querySelector('.nav-close');
const scrollRevealElements = document.querySelectorAll('.reveal');

// Scroll Functions
function scrollHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Scroll Reveal Animation
function scrollReveal() {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Mobile Navigation
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
}

// Tab Functionality
function setupTabs(tabsSelector, contentSelector, activeClass = 'active') {
    const tabs = document.querySelectorAll(tabsSelector);
    const contents = document.querySelectorAll(contentSelector);
    
    if (tabs.length && contents.length) {
        // Set first tab as active by default
        tabs[0].classList.add(activeClass);
        contents[0].classList.add(activeClass);
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove(activeClass));
                contents.forEach(c => c.classList.remove(activeClass));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add(activeClass);
                contents[index].classList.add(activeClass);
            });
        });
    }
}

// Event Date Selection
function setupDateSelection() {
    const dateCards = document.querySelectorAll('.date-card');
    const dateInput = document.querySelector('#booking-date');
    const eventNameInput = document.querySelector('#event-name');
    
    if (dateCards.length && dateInput && eventNameInput) {
        dateCards.forEach(card => {
            const bookButtons = card.querySelectorAll('.date-card-btn');
            const date = card.getAttribute('data-date');
            const eventName = document.querySelector('.event-title').textContent;
            
            bookButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Set hidden form values
                    dateInput.value = date;
                    eventNameInput.value = eventName;
                    
                    // Scroll to booking section
                    document.querySelector('.booking-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Switch to correct booking tab based on button
                    const tabType = button.getAttribute('data-booking-type');
                    const tabs = document.querySelectorAll('.booking-tab');
                    const contents = document.querySelectorAll('.booking-content');
                    
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    
                    if (tabType === 'guestlist') {
                        tabs[0].classList.add('active');
                        contents[0].classList.add('active');
                    } else if (tabType === 'table') {
                        tabs[1].classList.add('active');
                        contents[1].classList.add('active');
                    }
                });
            });
        });
    }
}

// Product Options Selection
function setupProductOptions() {
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length) {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    if (sizeOptions.length) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }
    
    // Quantity controls
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (quantityBtns.length && quantityInput) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                let currentValue = parseInt(quantityInput.value);
                
                if (action === 'decrease' && currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                } else if (action === 'increase') {
                    quantityInput.value = currentValue + 1;
                }
            });
        });
    }
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Get selected options
            const selectedColor = document.querySelector('.color-option.active');
            const selectedSize = document.querySelector('.size-option.active');
            const quantity = document.querySelector('.quantity-input').value;
            const productTitle = document.querySelector('.product-title').textContent;
            
            // Create alert message
            let message = `Added to cart: ${quantity}x ${productTitle}`;
            
            if (selectedColor) {
                message += `, Color: ${selectedColor.getAttribute('data-color')}`;
            }
            
            if (selectedSize) {
                message += `, Size: ${selectedSize.textContent}`;
            }
            
            alert(message);
        });
    }
}

// Photo Gallery Lightbox
function setupLightbox() {
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (photoItems.length && lightbox && lightboxImage) {
        let currentIndex = 0;
        
        // Open lightbox
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                const imgSrc = item.querySelector('img').getAttribute('src');
                const caption = item.querySelector('.photo-caption').textContent;
                
                lightboxImage.setAttribute('src', imgSrc);
                if (lightboxCaption) {
                    lightboxCaption.textContent = caption;
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Navigate through images
        if (lightboxPrev && lightboxNext) {
            lightboxPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
                updateLightboxContent();
            });
            
            lightboxNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % photoItems.length;
                updateLightboxContent();
            });
        }
        
        // Update lightbox content
        function updateLightboxContent() {
            const imgSrc = photoItems[currentIndex].querySelector('img').getAttribute('src');
            const caption = photoItems[currentIndex].querySelector('.photo-caption').textContent;
            
            lightboxImage.setAttribute('src', imgSrc);
            if (lightboxCaption) {
                lightboxCaption.textContent = caption;
            }
        }
        
        // Close lightbox on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Form Submission
function setupFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formType = form.getAttribute('data-form-type');
            
            // Simulate form submission
            console.log(`Form submitted: ${formType}`);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            // Show success message
            alert(`Thank you! Your ${formType} submission has been received.`);
            
            // Reset form
            form.reset();
        });
    });
}

// Newsletter Subscription
function setupNewsletterSubscription() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value;
            
            if (email) {
                // Simulate subscription
                console.log(`Newsletter subscription: ${email}`);
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Reset form
                newsletterForm.reset();
            }
        });
    }
}

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup scroll events
    window.addEventListener('scroll', scrollHeader);
    window.addEventListener('scroll', scrollReveal);
    
    // Initial scroll check
    scrollHeader();
    scrollReveal();
    
    // Setup tabs
    setupTabs('.event-tab', '.event-content');
    setupTabs('.media-tab', '.media-content');
    setupTabs('.merch-tab', '.merch-content');
    setupTabs('.booking-tab', '.booking-content');
    
    // Setup other functionalities
    setupDateSelection();
    setupProductOptions();
    setupLightbox();
    setupFormSubmission();
    setupNewsletterSubscription();
});
