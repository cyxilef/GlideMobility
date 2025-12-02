// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
if (navMenu && navToggle) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handlers
const contactForm = document.getElementById('contactForm');
const referralForm = document.getElementById('referralForm');
const influencerForm = document.getElementById('influencerForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const inquiry = document.getElementById('inquiry').value;
        
        // Simple validation
        if (name && email && message && inquiry) {
            // In a real application, you would send this data to a server
            alert('Thank you for contacting Glide Mobility! We\'ll get back to you within 24 hours. For immediate assistance, call us at 1-800-GLIDE-MOBILE.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

if (referralForm) {
    referralForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('ref-name').value;
        const email = document.getElementById('ref-email').value;
        const phone = document.getElementById('ref-phone').value;
        const location = document.getElementById('ref-location').value;
        
        // Simple validation
        if (name && email && phone && location) {
            // In a real application, you would send this data to a server
            alert('Thank you for joining our Referral Program! Your unique referral code will be sent to ' + email + ' within 24 hours. You can start sharing Glide Mobility right away!');
            referralForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

if (influencerForm) {
    influencerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('inf-name').value;
        const email = document.getElementById('inf-email').value;
        const platform = document.getElementById('inf-platform').value;
        const handle = document.getElementById('inf-handle').value;
        const followers = document.getElementById('inf-followers').value;
        const content = document.getElementById('inf-content').value;
        const location = document.getElementById('inf-location').value;
        
        // Simple validation
        if (name && email && platform && handle && followers && content && location) {
            // In a real application, you would send this data to a server
            alert('Thank you for your interest in the Glide Mobility Influencer Program! We\'ve received your application and will review it within 5-7 business days. You\'ll receive an email at ' + email + ' with our decision.');
            influencerForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero section (only if user hasn't reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    }
});

// Announce page sections for screen readers
const announceSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const heading = section.querySelector('h2, h1');
        if (heading) {
            // Create a live region announcement
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Navigated to ${heading.textContent}`;
            document.body.appendChild(announcement);
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    }
};

// Enhanced smooth scroll with announcements
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Announce section for screen readers
            setTimeout(() => {
                announceSection(targetId);
                // Focus management for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }, 500);
        }
    });
});

