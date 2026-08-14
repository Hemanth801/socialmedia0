/* ============================================================
   PORTFOLIO - JAVASCRIPT FUNCTIONALITY
   ============================================================ */

/**
 * Mobile Menu Toggle
 * Handles hamburger menu for mobile devices
 */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Smooth Scrolling
 * Enhances smooth scroll behavior for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Back to Top Button
 * Shows/hides and handles scroll functionality
 */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/**
 * Scroll Reveal Animation
 * Animates elements as they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply reveal animation to relevant elements
document.querySelectorAll(
    'section, .project-card, .cert-card, .strength-card, .skill-category, .interest-item'
).forEach(el => {
    observer.observe(el);
});

/**
 * Active Navigation Link Highlighting
 * Highlights the current section in the navigation menu
 */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

/**
 * Contact Form Handler
 * Handles form submission with validation
 */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelector('input[type="text"]:nth-of-type(2)').value,
            message: this.querySelector('textarea').value
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        alert(`Thank you, ${formData.name}! Your message has been received. I'll get back to you soon.`);

        // Reset form
        this.reset();

        // Note: To actually send emails, integrate with:
        // - EmailJS (emailjs.com)
        // - Formspree (formspree.io)
        // - Your own backend API
        // - Firebase Cloud Functions
        
        // Example with EmailJS:
        // emailjs.init('YOUR_PUBLIC_KEY');
        // emailjs.send('service_id', 'template_id', formData)
        //     .then(() => alert('Email sent successfully!'))
        //     .catch(error => console.log('Error:', error));
    });
}

/**
 * Navbar Scroll Effect
 * Adjusts navbar styling based on scroll position
 */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.1)';
    }
});

/**
 * Skill Item Interaction
 * Adds hover effects to skill items
 */
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Add any additional hover effects if needed
        this.style.transform = 'scale(1.08)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

/**
 * Interest Item Tooltip
 * Shows/hides tooltips on interest items
 */
const interestItems = document.querySelectorAll('.interest-item');

interestItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 212, 255, 0.15)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.background = 'var(--card-bg)';
    });
});

/**
 * Lazy Loading for Images
 * Improves performance for image loading
 */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Device Detection and Responsive Handling
 * Adjusts behavior for different devices
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Disable animations on mobile for performance
if (isMobileDevice()) {
    document.body.style.setProperty('--animation-duration', '0.3s');
}

/**
 * Performance Optimization
 * Throttles scroll events for better performance
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

/**
 * Accessibility: Focus Management
 * Improves keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

/**
 * Page Load Animation
 * Fades in page content on load
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/**
 * Print Styles Handler
 * Prepares page for printing
 */
window.addEventListener('beforeprint', () => {
    backToTop.style.display = 'none';
    navbar.style.position = 'static';
});

window.addEventListener('afterprint', () => {
    backToTop.style.display = '';
    navbar.style.position = 'fixed';
});

/**
 * Local Storage for User Preferences
 * Remembers user's last visited section (optional)
 */
function saveScrollPosition() {
    const scrollPos = window.pageYOffset;
    localStorage.setItem('portfolioScrollPos', scrollPos);
}

window.addEventListener('scroll', throttle(saveScrollPosition, 1000));

window.addEventListener('load', () => {
    const savedScrollPos = localStorage.getItem('portfolioScrollPos');
    if (savedScrollPos && window.location.hash === '') {
        window.scrollTo(0, parseInt(savedScrollPos));
    }
});

/**
 * Console message for developers
 */
console.log('%c Welcome to Lokarapu Hemanth Portfolio', 
    'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%c Cybersecurity Specialist | B.Tech CSE Student', 
    'font-size: 14px; color: #764ba2;');
console.log('%c Connect: https://linkedin.com/in/hemanth-lokarapu-966375293', 
    'font-size: 12px; color: #b0b0b0;');
// Profile image support removed per user request


/**
 * Service Worker Registration (Optional)
 * For PWA functionality and offline support
 */
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}
