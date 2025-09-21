// Mayor-K Prime Properties - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initBackToTop();
    initNavbar();
    initForms();
    initTooltips();
    initLazyLoading();
    initNewsletterForm();
    
});

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        // Smooth scroll to top
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Navbar Enhancement
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Add scroll effect to navbar
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navbarToggler = document.querySelector('.navbar-toggler');
            
            if (navbarCollapse && !navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            }
        });
    }
}

// Form Enhancements
function initForms() {
    // Contact Form Enhancement
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add loading state to submit button
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitButton.disabled = true;
            }
        });
        
        // Form validation enhancement
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple email validation
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Field Validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        showFieldError(field, 'This field is required.');
    } else if (field.type === 'email' && value && !validateEmail(value)) {
        field.classList.add('is-invalid');
        showFieldError(field, 'Please enter a valid email address.');
    } else if (field.name === 'message' && value && value.length < 10) {
        field.classList.add('is-invalid');
        showFieldError(field, 'Message must be at least 10 characters long.');
    } else if (value) {
        field.classList.add('is-valid');
        hideFieldError(field);
    }
}

function clearValidation(e) {
    const field = e.target;
    if (field.classList.contains('is-invalid')) {
        field.classList.remove('is-invalid');
        hideFieldError(field);
    }
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// Initialize Tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Newsletter Form Handler
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value.trim();
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const originalHTML = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simulate API call (replace with actual newsletter API)
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalHTML;
        submitButton.disabled = false;
    }, 1000);
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Card Hover Effects Enhancement
document.querySelectorAll('.card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Search Functionality (for future use)
function initSearch() {
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[type="search"]').value.trim();
            if (query) {
                // Implement search functionality
                console.log('Searching for:', query);
            }
        });
    });
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', initSearch);

// Performance: Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error Handling for Images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (!this.classList.contains('error-handled')) {
            this.classList.add('error-handled');
            // Set fallback image or hide
            this.src = '/images/placeholder.jpg';
            this.alt = 'Image not available';
        }
    });
});

// Console welcome message
console.log('%cMayor-K Prime Properties', 'color: #007bff; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully! 🏠', 'color: #28a745; font-size: 16px;');
