// Particle animation for background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Resize listener
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// Particle configuration
const particleCount = 60;
const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        // Soft pastel colors matching the theme
        const colors = [
            'rgba(167, 139, 250, ', // violet
            'rgba(99, 102, 241, ',  // indigo
            'rgba(59, 130, 246, ',  // blue
            'rgba(147, 197, 253, '   // light blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on boundary
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        // Interaction with mouse cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 1.5;
            this.y -= forceDirectionY * force * 1.5;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.shadowBlur = this.radius * 2;
        ctx.shadowColor = this.color.replace('rgba', 'rgb').split(',').slice(0, 3).join(',') + ')';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
    }
}

// Mouse position tracker
const mouse = {
    x: undefined,
    y: undefined,
    radius: 120
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Touch events for mobile support
window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener('touchend', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Initialize particles
function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Add radial gradient background overlay to create a nice vignette and glow
    const grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
    grad.addColorStop(0, '#0f0d22');
    grad.addColorStop(0.5, '#080710');
    grad.addColorStop(1, '#05040a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();

// Button interactive actions
const exploreBtn = document.getElementById('explore-btn');
const contactBtn = document.getElementById('contact-btn');

exploreBtn.addEventListener('click', () => {
    // Add a simple animation feedback before doing action
    exploreBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        exploreBtn.style.transform = 'none';
        alert('호야 Edu 랩의 AI 교육 프로그램 소개 페이지로 이동합니다. (준비 중)');
    }, 150);
});

contactBtn.addEventListener('click', () => {
    contactBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        contactBtn.style.transform = 'none';
        alert('교육 문의: contact@hoyaedulab.org 로 이메일을 보내실 수 있습니다.');
    }, 150);
});

// Log loading message to developer console
console.log('%c호야 Edu 랩에 오신 것을 환영합니다! 🚀', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
