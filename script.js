// Particle animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

// PR / workflow, hardware, connectivity, technologists, culture — plus a few infra extras
const computerEmojis = [
    '🚀', '🐛', '🦋', '🚢', '👀', '✅', '🧪', '♻️', '🏗️', '🧱', '🪵', '📦', '🔄', '🔥', '🚒',
    '💻', '🖥️', '⌨️', '🖱️', '🖲️', '🖨️', '💾', '💿', '📀', '🔌', '🔋', '💽',
    '📶', '🌐', '📡', '☁️', '🔗', '📧',
    '🧑‍💻', '👨‍💻', '👩‍💻', '🤖',
    '➕', '👍', '🤯', '🦆', '☕', '🍕', '💯',
    '⚙️', '🗄️', '🔧', '🛠️', '🧩', '💡'
];
const emojiFloats = [];
const emojiCount = 40;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class EmojiFloat {
    constructor() {
        this.char =
            computerEmojis[Math.floor(Math.random() * computerEmojis.length)];
        this.size = Math.random() * 14 + 20;
        this.speedX = (Math.random() * 2 - 1) * 0.75;
        this.speedY = (Math.random() * 2 - 1) * 0.75;
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.015;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.spin;

        if (this.x > canvas.width + 40) this.x = -40;
        if (this.x < -40) this.x = canvas.width + 40;
        if (this.y > canvas.height + 40) this.y = -40;
        if (this.y < -40) this.y = canvas.height + 40;
    }

    draw() {
        ctx.save();
        ctx.font = `${this.size}px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillText(this.char, 0, 0);
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

for (let i = 0; i < emojiCount; i++) {
    emojiFloats.push(new EmojiFloat());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    emojiFloats.forEach(e => {
        e.update();
        e.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    emojiFloats.forEach(e => {
        e.x = Math.min(e.x, canvas.width);
        e.y = Math.min(e.y, canvas.height);
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const TRAVEL_SLIDES = [
    { src: 'Travel/amsterdam.jpg', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
    { src: 'Travel/barcelona.jpg', city: 'Barcelona', country: 'Spain', flag: '🇪🇸' },
    { src: 'Travel/berlin.jpg', city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
    { src: 'Travel/brusells.jpg', city: 'Brussels', country: 'Belgium', flag: '🇧🇪' },
    { src: 'Travel/budapest.jpg', city: 'Budapest', country: 'Hungary', flag: '🇭🇺' },
    { src: 'Travel/cabo.jpg', city: 'Cabo San Lucas', country: 'Mexico', flag: '🇲🇽' },
    { src: 'Travel/delhi.png', city: 'Delhi', country: 'India', flag: '🇮🇳' },
    { src: 'Travel/fuji.jpg', city: 'Mount Fuji', country: 'Japan', flag: '🇯🇵' },
    { src: 'Travel/hongkong.jpg', city: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰' },
    { src: 'Travel/london.jpg', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
    { src: 'Travel/malta.jpg', city: 'Gozo', country: 'Malta', flag: '🇲🇹' },
    { src: 'Travel/milan.jpg', city: 'Milan', country: 'Italy', flag: '🇮🇹' },
    { src: 'Travel/nyc.jpg', city: 'New York City', country: 'United States', flag: '🇺🇸' },
    { src: 'Travel/paris.jpg', city: 'Paris', country: 'France', flag: '🇫🇷' },
    { src: 'Travel/prague.jpeg', city: 'Prague', country: 'Czechia', flag: '🇨🇿' },
    { src: 'Travel/rome.jpg', city: 'Rome', country: 'Italy', flag: '🇮🇹' },
    { src: 'Travel/stuttgart.jpg', city: 'Stuttgart', country: 'Germany', flag: '🇩🇪' },
    { src: 'Travel/tokyo.jpg', city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
    { src: 'Travel/toronto.jpg', city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
    { src: 'Travel/vatican.jpg', city: 'Vatican City', country: 'Vatican City', flag: '🇻🇦' },
    { src: 'Travel/venice.jpg', city: 'Venice', country: 'Italy', flag: '🇮🇹' },
    { src: 'Travel/vienna.jpg', city: 'Vienna', country: 'Austria', flag: '🇦🇹' },
    { src: 'Travel/zagreb.jpg', city: 'Zagreb', country: 'Croatia', flag: '🇭🇷' },
    { src: 'Travel/zurich.jpg', city: 'Zurich', country: 'Switzerland', flag: '🇨🇭' }
];

function initBeyondWorkTravelSlider() {
    const root = document.getElementById('beyond-work-slider');
    if (!root) return;

    const windowEl = root.querySelector('.slider-window');
    const dotsEl = root.querySelector('.slider-dots');
    if (!windowEl || !dotsEl) return;

    windowEl.innerHTML = '';
    dotsEl.innerHTML = '';

    TRAVEL_SLIDES.forEach((t, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide' + (i === 0 ? ' active' : '');
        slide.innerHTML =
            '<div class="travel-slide">' +
            '<div class="travel-slide__image">' +
            '<img src="' +
            t.src +
            '" alt="' +
            t.city +
            ', ' +
            t.country +
            '" loading="lazy" decoding="async">' +
            '</div>' +
            '<aside class="travel-slide__meta">' +
            '<span class="travel-slide__flag" aria-hidden="true">' +
            t.flag +
            '</span>' +
            '<div class="travel-slide__text">' +
            '<span class="travel-slide__city">' +
            t.city +
            '</span>' +
            '<span class="travel-slide__country">' +
            t.country +
            '</span>' +
            '</div>' +
            '</aside>' +
            '</div>';
        windowEl.appendChild(slide);
    });

    initSlider(root, 5500);
}

function initSlider(sliderEl, intervalMs = 5000) {
    const slides = Array.from(sliderEl.querySelectorAll('.slide'));
    const dotsContainer = sliderEl.querySelector('.slider-dots');
    const prevBtn = sliderEl.querySelector('.prev');
    const nextBtn = sliderEl.querySelector('.next');
    let current = 0;
    let timer;

    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => goTo(idx, true));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function setActive(index) {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
        current = index;
    }

    function goTo(index, userInitiated = false) {
        const nextIndex = (index + slides.length) % slides.length;
        setActive(nextIndex);
        if (userInitiated) restartTimer();
    }

    function next() {
        goTo(current + 1);
    }

    function prev() {
        goTo(current - 1);
    }

    function restartTimer() {
        clearInterval(timer);
        timer = setInterval(next, intervalMs);
    }

    prevBtn.addEventListener('click', () => prev());
    nextBtn.addEventListener('click', () => next());

    timer = setInterval(next, intervalMs);
}

initBeyondWorkTravelSlider();
