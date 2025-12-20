document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK MODE TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('pitch-black-theme');
        // Change icon based on mode
        themeToggle.textContent = body.classList.contains('pitch-black-theme') ? '☀️' : '🌙';
        
        // Save preference to local storage
        const isDark = body.classList.contains('pitch-black-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('pitch-black-theme');
        themeToggle.textContent = '☀️';
    }

    // --- 2. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active'); // For animating the hamburger
    });

    // --- 3. FORM VALIDATION (For Contact Page) ---
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const emailInput = document.querySelector('input[type="email"]');
            const messageInput = document.querySelector('textarea');
            let valid = true;

            if (!emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                valid = false;
            } else if (messageInput.value.length < 10) {
                alert('Your message is a bit short! Please add more detail.');
                valid = false;
            }

            if (!valid) {
                e.preventDefault(); // Stop form from sending
            } else {
                alert('Thank you! Silva Entreprizes will contact you shortly.');
            }
        });
    }

    // --- 4. REVEAL ON SCROLL ---
    const revealItems = document.querySelectorAll('.teaser-card, .service-box');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "all 0.8s ease-out";
        revealObserver.observe(item);
    });

    // --- 5. TYPING EFFECT ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = "Technology Matters. Innovation Solved.";
        heroTitle.innerHTML = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // --- 6. DYNAMIC YEAR ---
    const footerP = document.querySelector('.footer-bottom p');
    if (footerP) {
        footerP.innerHTML = `&copy; ${new Date().getFullYear()} Silva Entreprizes. All Rights Reserved.`;
    }
});
// --- ANIMATED COUNTER FOR ABOUT PAGE ---
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // The lower the slower

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+"; // Add a plus sign at the end
                }
            };
            updateCount();
            observer.unobserve(counter); // Only animate once
        }
    });
};

const counterObserver = new IntersectionObserver(startCounter, { threshold: 1.0 });
counters.forEach(counter => counterObserver.observe(counter));
