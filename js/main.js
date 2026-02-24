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
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });
    
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
    
    // Initialize all functionality
    initNavigation();
    initSmoothScroll();
    initContactForm();
    initParallax();
});

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Active section highlighting
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
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
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
    
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalProductImage');
    const modalName = document.getElementById('modalProductName');
    const modalDescription = document.getElementById('modalProductDescription');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalFeatures = document.getElementById('modalProductFeatures');
    
    // Set modal content
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
    
    // Set features
    modalFeatures.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });
    
    // Store current product for ordering
    modal.dataset.currentProduct = productId;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeModalAndOrder() {
    const modal = document.getElementById('productModal');
    const productId = modal.dataset.currentProduct;
    
    closeProductModal();
    
    // Scroll to contact form
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Pre-select product in form
        setTimeout(() => {
            const productSelect = document.getElementById('product');
            if (productSelect) {
                productSelect.value = productId;
                productSelect.focus();
                
                // Add highlight animation
                productSelect.style.animation = 'none';
                setTimeout(() => {
                    productSelect.style.animation = 'pulse 0.5s ease-in-out';
                }, 10);
            }
        }, 500);
    }, 300);
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// ===================================
// Add to Cart
// ===================================
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;
    
    // Show notification
    showCartNotification();
    
    // Scroll to contact form
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Pre-select product in form
        setTimeout(() => {
            const productSelect = document.getElementById('product');
            if (productSelect) {
                productSelect.value = productId;
            }
        }, 500);
    }, 1000);
}

function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
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
        
        // 👇 Paste your Web App URL here
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRCQ2emy53UDIurk_E6NYgOnFCkk6aTWvvkTcRfOD3SfApNtKXjealxroP-_hM4-OW/exec';
        
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            // Show success & open WhatsApp as before
            showSuccessMessage();
            
            const whatsappMessage = `*New Order Request from Loly's Website*\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🍰 *Product:* ${formData.product}\n\n📝 *Message:*\n${formData.message || 'No additional message'}`;
            window.open(`https://wa.me/201234567890?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try WhatsApp directly.');
        }
    });
}
        
        // Create WhatsApp message
        const whatsappMessage = `
*New Order Request from Loly's Website*

👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
🍰 *Product:* ${productName}

📝 *Message:*
${formData.message || 'No additional message'}

---
Thank you for choosing Loly's Kunafa House! 💛
        `.trim();
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/+20 10 93350300?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
    });
}

function showSuccessMessage() {
    const notification = document.getElementById('cartNotification');
    const originalContent = notification.innerHTML;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Opening WhatsApp to complete your order...</span>
    `;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.innerHTML = originalContent;
        }, 300);
    }, 4000);
}

// ===================================
// Parallax Effect
// ===================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Decorative elements parallax
        const decorations = document.querySelectorAll('.story-decoration, .about-decoration');
        decorations.forEach(decoration => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            decoration.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all section elements
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ===================================
// Image Lazy Loading
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// ===================================
// Performance Optimizations
// ===================================

// Debounce function for scroll events
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Mouse Move Effects
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .feature-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// ===================================
// Cursor Effects (Desktop Only)
// ===================================
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-gold);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease-out, opacity 0.15s;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Cursor grow effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .product-card, input, textarea, select');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// ===================================
// Number Animation (Count Up)
// ===================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-gold) 0%, #F4C430 100%);
    color: var(--primary-dark);
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9998;
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

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseenter', () => {
    scrollTopButton.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopButton.addEventListener('mouseleave', () => {
    scrollTopButton.style.transform = 'scale(1) translateY(0)';
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🍰 Welcome to Loly\'s Kunafa House! 🍰', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cHandmade by Mom. Shared with Love.', 'font-size: 16px; font-style: italic; color: #6B4423;');
console.log('%c💛 Made with love by the family', 'font-size: 14px; color: #E67E22;');
