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
