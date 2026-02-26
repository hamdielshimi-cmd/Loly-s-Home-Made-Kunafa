// ===================================
// Product Data
// ===================================
const products = {
    'golash-large': {
        name: 'Golash Large',
        price: '350 L.E',
        description: 'Our signature Golash features layers of crispy, golden phyllo dough filled with a premium blend of pistachios, almonds, and walnuts. Each layer is carefully hand-brushed with clarified butter and baked to perfection, then drenched in our special honey-sugar syrup infused with orange blossom water.',
        image: 'https://ik.imagekit.io/xtj3m9hth/WhatsApp%20Image%202026-02-24%20at%201.26.15%20AM.jpeg',
        features: [
            'Handmade with premium phyllo dough',
            'Triple nut filling (pistachios, almonds, walnuts)',
            'Brushed with clarified butter',
            'Special honey-sugar syrup',
            'Orange blossom water infusion',
            'Serves 10-12 people',
            'Perfect for special occasions'
        ]
    },
    'kunafa-large': {
        name: 'Kunafa Large',
        price: '350 L.E',
        description: 'Traditional Egyptian kunafa made with the finest semolina threads, filled with premium sweet cheese that melts beautifully in the center. Topped with crushed pistachios and soaked in our signature sugar syrup. This is the kunafa that brought our family together every Ramadan.',
        image: 'https://ik.imagekit.io/xtj3m9hth/WhatsApp%20Image%202026-02-24%20at%201.27.10%20AM.jpeg',
        features: [
            'Authentic Egyptian recipe',
            'Premium sweet cheese filling',
            'Hand-shredded semolina threads',
            'Topped with crushed pistachios',
            'Mom\'s special sugar syrup',
            'Serves 10-12 people',
            'Made fresh to order'
        ]
    },
    'golash-medium': {
        name: 'Golash Medium',
        price: '250 L.E',
        description: 'A perfect portion of our beloved Golash for smaller gatherings or family dinners. All the same quality, love, and tradition of our large tray, crafted with the same premium ingredients and Mom\'s special touch.',
        image: 'https://ik.imagekit.io/xtj3m9hth/Gemini_Generated_Image_bplmq1bplmq1bplm.png',
        features: [
            'Same premium quality as large',
            'Triple nut filling blend',
            'Hand-layered phyllo dough',
            'Honey-sugar syrup',
            'Orange blossom essence',
            'Serves 6-8 people',
            'Ideal for family gatherings'
        ]
    },
    'kunafa-medium': {
        name: 'Kunafa Medium',
        price: '250 L.E',
        description: 'Our traditional kunafa in a medium size, perfect for intimate gatherings or when you want to enjoy this delicious dessert without leftovers. Made with the same care and premium ingredients as our large tray.',
        image: 'https://ik.imagekit.io/xtj3m9hth/WhatsApp%20Image%202026-02-24%20at%201.27.10%20AM.jpeg',
        features: [
            'Traditional Egyptian kunafa',
            'Premium cheese filling',
            'Golden crispy threads',
            'Pistachio garnish',
            'Special syrup blend',
            'Serves 6-8 people',
            'Fresh daily preparation'
        ]
    }
};

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', function() {

    // Hide loading screen FIRST - always runs no matter what
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        document.body.style.overflow = 'auto';
    }, 1500);

    // Initialize AOS safely
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // Initialize all functionality
    initNavigation();
    initSmoothScroll();
    initContactForm();
    initParallax();
    initCardEffects();
    initScrollObserver();

});

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Product Modal
// ===================================
function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price;

    const modalFeatures = document.getElementById('modalProductFeatures');
    modalFeatures.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    const modal = document.getElementById('productModal');
    modal.dataset.currentProduct = productId;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeModalAndOrder() {
    const modal = document.getElementById('productModal');
    const productId = modal.dataset.currentProduct;
    closeProductModal();
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        window.scrollTo({ top: contactSection.offsetTop - 80, behavior: 'smooth' });
        setTimeout(() => {
            const productSelect = document.getElementById('product');
            if (productSelect) {
                productSelect.value = productId;
                productSelect.focus();
            }
        }, 500);
    }, 300);
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) closeProductModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

// ===================================
// Add to Cart
// ===================================
function addToCart(productId) {
    showCartNotification();
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        window.scrollTo({ top: contactSection.offsetTop - 80, behavior: 'smooth' });
        setTimeout(() => {
            const productSelect = document.getElementById('product');
            if (productSelect) productSelect.value = productId;
        }, 500);
    }, 1000);
}

function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const productSelect = document.getElementById('product');
        const productName = productSelect.options[productSelect.selectedIndex].text;

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            product: productName,
            message: document.getElementById('message').value
        };

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRCQ2emy53UDIurk_E6NYgOnFCkk6aTWvvkTcRfOD3SfApNtKXjealxroP-_hM4-OW/exec';

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } catch (error) {
            console.error('Sheet error:', error);
        }

        form.reset();
        showThankYouPopup(formData.name);
    });
}

function showThankYouPopup(name) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(5px); animation: fadeIn 0.3s ease;
    `;

    overlay.innerHTML = `
        <div style="
            background: white; border-radius: 24px; padding: 60px 50px;
            max-width: 500px; width: 90%; text-align: center;
            box-shadow: 0 30px 80px rgba(0,0,0,0.3);
            animation: slideUp 0.4s cubic-bezier(0.4,0,0.2,1);
        ">
            <div style="
                width: 80px; height: 80px; background: linear-gradient(135deg, #D4AF37, #F4C430);
                border-radius: 50%; display: flex; align-items: center;
                justify-content: center; margin: 0 auto 25px; font-size: 36px;
            ">🍰</div>
            <h2 style="
                font-family: 'Playfair Display', serif; font-size: 32px;
                color: #2C1810; margin-bottom: 15px;
            ">Thank You, ${name}!</h2>
            <p style="
                font-size: 17px; color: #666; line-height: 1.7; margin-bottom: 10px;
            ">Your order request has been received.</p>
            <p style="
                font-size: 17px; color: #666; line-height: 1.7; margin-bottom: 35px;
            ">We will contact you shortly on WhatsApp to confirm your order. 💛</p>
            <button onclick="document.querySelector('[data-popup]').remove()" style="
                background: linear-gradient(135deg, #D4AF37, #F4C430);
                color: #2C1810; border: none; padding: 15px 40px;
                border-radius: 50px; font-size: 16px; font-weight: 700;
                cursor: pointer; letter-spacing: 1px;
            ">Done</button>
        </div>
    `;

    overlay.setAttribute('data-popup', 'true');

    // Close on outside click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);

    // Auto close after 8 seconds
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 8000);
}

// ===================================
// Parallax Effect
// ===================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ===================================
// Card Hover Effects
// ===================================
function initCardEffects() {
    const cards = document.querySelectorAll('.product-card, .feature-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
            const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===================================
// Scroll Observer
// ===================================
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.style.cssText = `
    position: fixed; bottom: 30px; right: 30px;
    width: 50px; height: 50px;
    background: linear-gradient(135deg, #D4AF37 0%, #F4C430 100%);
    color: #2C1810; border: none; border-radius: 50%;
    font-size: 20px; cursor: pointer;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
    opacity: 0; visibility: hidden;
    transition: all 0.3s ease; z-index: 9998;
`;
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.visibility = 'visible';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.visibility = 'hidden';
    }
});

scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollTopButton.addEventListener('mouseenter', () => scrollTopButton.style.transform = 'scale(1.1) translateY(-5px)');
scrollTopButton.addEventListener('mouseleave', () => scrollTopButton.style.transform = 'scale(1) translateY(0)');

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🍰 Welcome to Loly\'s Kunafa House! 🍰', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cHandmade by Mom. Shared with Love.', 'font-size: 16px; font-style: italic; color: #6B4423;');
