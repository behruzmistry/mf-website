// JavaScript for dynamic event slider and form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Event slider functionality
    const slider = document.querySelector('.event-slider');
    if (slider) {
        // Initialize slider (could use a library like Swiper or build custom functionality)
        console.log('Event slider initialized');
        
        // For now, we'll just add basic left/right navigation
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav prev';
        prevBtn.innerHTML = '&lt;';
        prevBtn.setAttribute('aria-label', 'Previous event');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav next';
        nextBtn.innerHTML = '&gt;';
        nextBtn.setAttribute('aria-label', 'Next event');
        
        slider.parentNode.appendChild(prevBtn);
        slider.parentNode.appendChild(nextBtn);
        
        // Add click handlers for navigation
        let currentPosition = 0;
        const cards = slider.querySelectorAll('.event-card');
        const cardWidth = cards[0].offsetWidth + 20; // card width + margin
        
        prevBtn.addEventListener('click', function() {
            if (currentPosition > 0) {
                currentPosition--;
                slider.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentPosition < cards.length - 1) {
                currentPosition++;
                slider.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
            }
        });
    }
    
    // Form popup functionality
    const setupFormPopups = () => {
        // Get all buttons that should trigger popups
        const guestlistBtns = document.querySelectorAll('.guestlist-btn');
        const tableBtns = document.querySelectorAll('.table-btn');
        
        // Create popup containers if they don't exist
        let guestlistPopup = document.getElementById('guestlist-popup');
        let tablePopup = document.getElementById('table-popup');
        
        if (!guestlistPopup) {
            guestlistPopup = createGuestlistPopup();
            document.body.appendChild(guestlistPopup);
        }
        
        if (!tablePopup) {
            tablePopup = createTablePopup();
            document.body.appendChild(tablePopup);
        }
        
        // Add click handlers to buttons
        guestlistBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const eventType = this.getAttribute('data-event-type');
                const eventName = this.getAttribute('data-event-name');
                
                // Set the form's hidden fields
                document.getElementById('guestlist-event-type').value = eventType;
                document.getElementById('guestlist-event-name').value = eventName;
                
                // Update popup title
                document.querySelector('#guestlist-popup .popup-title').textContent = 
                    `Get on the Guestlist: ${eventName}`;
                
                // Show the popup
                guestlistPopup.classList.add('active');
            });
        });
        
        tableBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const eventType = this.getAttribute('data-event-type');
                const eventName = this.getAttribute('data-event-name');
                
                // Set the form's hidden fields
                document.getElementById('table-event-type').value = eventType;
                document.getElementById('table-event-name').value = eventName;
                
                // Update popup title
                document.querySelector('#table-popup .popup-title').textContent = 
                    `Book a Table: ${eventName}`;
                
                // Show the popup
                tablePopup.classList.add('active');
            });
        });
        
        // Add close functionality to popups
        const closeButtons = document.querySelectorAll('.popup-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.popup').classList.remove('active');
            });
        });
        
        // Close popup when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('popup')) {
                e.target.classList.remove('active');
            }
        });
    };
    
    // Create guestlist popup
    function createGuestlistPopup() {
        const popup = document.createElement('div');
        popup.id = 'guestlist-popup';
        popup.className = 'popup';
        
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close">&times;</span>
                <h2 class="popup-title">Get on the Guestlist</h2>
                <form id="guestlist-form" action="/api/event-signup" method="post">
                    <input type="hidden" id="guestlist-event-type" name="event_type_key">
                    <input type="hidden" id="guestlist-event-name" name="event_name">
                    <input type="hidden" name="signup_type" value="Guestlist">
                    
                    <div class="form-group">
                        <label for="guestlist-name">Full Name</label>
                        <input type="text" id="guestlist-name" name="full_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="guestlist-email">Email</label>
                        <input type="email" id="guestlist-email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="guestlist-mobile">Mobile Number</label>
                        <input type="tel" id="guestlist-mobile" name="mobile" required>
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
                <div id="guestlist-confirmation" class="confirmation-message" style="display: none;">
                    <p>Thank you! You've been added to the guestlist.</p>
                    <p>A confirmation email has been sent to your email address.</p>
                </div>
            </div>
        `;
        
        return popup;
    }
    
    // Create table booking popup
    function createTablePopup() {
        const popup = document.createElement('div');
        popup.id = 'table-popup';
        popup.className = 'popup';
        
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close">&times;</span>
                <h2 class="popup-title">Book a Table</h2>
                <form id="table-form" action="/api/event-signup" method="post">
                    <input type="hidden" id="table-event-type" name="event_type_key">
                    <input type="hidden" id="table-event-name" name="event_name">
                    <input type="hidden" name="signup_type" value="TableReservation">
                    
                    <div class="form-group">
                        <label for="table-name">Full Name</label>
                        <input type="text" id="table-name" name="full_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="table-email">Email</label>
                        <input type="email" id="table-email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="table-mobile">Mobile Number</label>
                        <input type="tel" id="table-mobile" name="mobile" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="table-date">Reservation Date</label>
                        <input type="date" id="table-date" name="event_date" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="table-time">Reservation Time</label>
                        <select id="table-time" name="reservation_time" required>
                            <option value="">Select a time</option>
                            <!-- Time slots will be populated dynamically based on event -->
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="table-guests">Number of Guests</label>
                        <input type="number" id="table-guests" name="guest_count" min="1" max="20" required>
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
                <div id="table-confirmation" class="confirmation-message" style="display: none;">
                    <p>Thank you! Your table has been reserved.</p>
                    <p>A confirmation email has been sent to your email address.</p>
                </div>
            </div>
        `;
        
        return popup;
    }
    
    // Form submission handling
    function setupFormSubmission() {
        const guestlistForm = document.getElementById('guestlist-form');
        const tableForm = document.getElementById('table-form');
        
        if (guestlistForm) {
            guestlistForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(guestlistForm);
                const jsonData = {};
                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });
                
                // Send to backend API
                fetch('/api/event-signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show confirmation message
                        guestlistForm.style.display = 'none';
                        document.getElementById('guestlist-confirmation').style.display = 'block';
                        
                        // Reset form after 5 seconds and close popup
                        setTimeout(() => {
                            guestlistForm.reset();
                            guestlistForm.style.display = 'block';
                            document.getElementById('guestlist-confirmation').style.display = 'none';
                            document.getElementById('guestlist-popup').classList.remove('active');
                        }, 5000);
                    } else {
                        alert('There was an error processing your request. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error processing your request. Please try again.');
                });
            });
        }
        
        if (tableForm) {
            tableForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(tableForm);
                const jsonData = {};
                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });
                
                // Send to backend API
                fetch('/api/event-signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show confirmation message
                        tableForm.style.display = 'none';
                        document.getElementById('table-confirmation').style.display = 'block';
                        
                        // Reset form after 5 seconds and close popup
                        setTimeout(() => {
                            tableForm.reset();
                            tableForm.style.display = 'block';
                            document.getElementById('table-confirmation').style.display = 'none';
                            document.getElementById('table-popup').classList.remove('active');
                        }, 5000);
                    } else {
                        alert('There was an error processing your request. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error processing your request. Please try again.');
                });
            });
        }
    }
    
    // Initialize popups and form submission
    setupFormPopups();
    setupFormSubmission();
    
    // Add micro-animations for components, buttons, and transitions
    function setupMicroAnimations() {
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Add fade-in animation to event cards
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Stagger the animations
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Add pulse animation to CTA elements
        const ctaElements = document.querySelectorAll('.cta, .highlight');
        ctaElements.forEach(el => {
            el.classList.add('pulse-animation');
        });
    }
    
    // Initialize micro-animations
    setupMicroAnimations();
});
