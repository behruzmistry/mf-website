// JavaScript for events page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab slider functionality
    const tabsWrapper = document.getElementById('eventsTabsWrapper');
    const tabNavLeft = document.getElementById('tabNavLeft');
    const tabNavRight = document.getElementById('tabNavRight');
    const eventTabs = document.querySelectorAll('.event-tab');
    const eventContentArea = document.getElementById('eventContentArea');
    
    // Initialize tab navigation
    if (tabsWrapper && tabNavLeft && tabNavRight) {
        let scrollAmount = 0;
        const tabWidth = 200; // Approximate width of a tab including margins
        
        tabNavLeft.addEventListener('click', function() {
            if (scrollAmount > 0) {
                scrollAmount -= tabWidth;
                tabsWrapper.style.transform = `translateX(-${scrollAmount}px)`;
            }
        });
        
        tabNavRight.addEventListener('click', function() {
            const maxScroll = tabsWrapper.scrollWidth - tabsWrapper.clientWidth;
            if (scrollAmount < maxScroll) {
                scrollAmount += tabWidth;
                tabsWrapper.style.transform = `translateX(-${scrollAmount}px)`;
            }
        });
    }
    
    // Tab content switching
    if (eventTabs.length && eventContentArea) {
        eventTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                eventTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get event name from data attribute
                const eventName = this.getAttribute('data-event-name');
                
                // Hide all event displays
                const eventDisplays = document.querySelectorAll('.event-display');
                eventDisplays.forEach(display => {
                    display.classList.remove('active');
                });
                
                // Show the selected event display
                const selectedDisplay = document.getElementById(`event-${eventName}`);
                if (selectedDisplay) {
                    selectedDisplay.classList.add('active');
                } else {
                    console.error(`No display found for event: ${eventName}`);
                }
            });
        });
    }
    
    // Booking buttons functionality
    const setupBookingButtons = () => {
        const guestlistButtons = document.querySelectorAll('.guestlist-button');
        const tableButtons = document.querySelectorAll('.table-button');
        
        guestlistButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const eventName = this.getAttribute('data-event-name');
                const eventDate = this.getAttribute('data-event-date');
                
                // Show guestlist form
                showGuestlistForm(eventName, eventDate);
            });
        });
        
        tableButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const eventName = this.getAttribute('data-event-name');
                const eventDate = this.getAttribute('data-event-date');
                
                // Show table booking form
                showTableBookingForm(eventName, eventDate);
            });
        });
    };
    
    // Initialize booking buttons
    setupBookingButtons();
    
    // Create and show guestlist form
    function showGuestlistForm(eventName, eventDate) {
        // Create modal container if it doesn't exist
        let formModal = document.getElementById('booking-form-modal');
        if (!formModal) {
            formModal = document.createElement('div');
            formModal.id = 'booking-form-modal';
            formModal.className = 'modal';
            document.body.appendChild(formModal);
        }
        
        // Set modal content
        formModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Join the Guestlist</h2>
                <h3>${eventName} - ${eventDate}</h3>
                <form id="guestlist-form">
                    <input type="hidden" name="event_name" value="${eventName}">
                    <input type="hidden" name="event_date" value="${eventDate}">
                    
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    
                    <button type="submit" class="submit-button">Submit</button>
                </form>
            </div>
        `;
        
        // Show modal
        formModal.style.display = 'block';
        
        // Close modal functionality
        const closeModal = formModal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            formModal.style.display = 'none';
        });
        
        // Close when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === formModal) {
                formModal.style.display = 'none';
            }
        });
        
        // Form submission
        const form = document.getElementById('guestlist-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            alert(`Thank you for joining the guestlist for ${eventName}!`);
            formModal.style.display = 'none';
        });
    }
    
    // Create and show table booking form
    function showTableBookingForm(eventName, eventDate) {
        // Create modal container if it doesn't exist
        let formModal = document.getElementById('booking-form-modal');
        if (!formModal) {
            formModal = document.createElement('div');
            formModal.id = 'booking-form-modal';
            formModal.className = 'modal';
            document.body.appendChild(formModal);
        }
        
        // Set modal content
        formModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Book a Table</h2>
                <h3>${eventName} - ${eventDate}</h3>
                <form id="table-form">
                    <input type="hidden" name="event_name" value="${eventName}">
                    <input type="hidden" name="event_date" value="${eventDate}">
                    
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="guests">Number of Guests</label>
                        <input type="number" id="guests" name="guests" min="1" max="20" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="time">Preferred Time</label>
                        <select id="time" name="time" required>
                            <option value="">Select a time</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                            <option value="22:00">10:00 PM</option>
                            <option value="23:00">11:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="special_requests">Special Requests</label>
                        <textarea id="special_requests" name="special_requests"></textarea>
                    </div>
                    
                    <button type="submit" class="submit-button">Submit</button>
                </form>
            </div>
        `;
        
        // Show modal
        formModal.style.display = 'block';
        
        // Close modal functionality
        const closeModal = formModal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            formModal.style.display = 'none';
        });
        
        // Close when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === formModal) {
                formModal.style.display = 'none';
            }
        });
        
        // Form submission
        const form = document.getElementById('table-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            alert(`Thank you for booking a table for ${eventName}!`);
            formModal.style.display = 'none';
        });
    }
});
