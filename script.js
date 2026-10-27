/* ==========================================================================
   1. MENÚ DESPLEGABLE MÓVIL
   ========================================================================== */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================================================
   2. PROTECCIÓN ANTI-BOTS DE CORREO Y NOTIFICACIÓN TOAST
   ========================================================================== */
const fullEmail = atob('Y2F0aGF5c2EuMTVAaG90bWFpbC5jb20=');

const emailDisplay = document.getElementById('email-display');
const mailtoBtn = document.getElementById('mailto-btn');
const copyEmailPill = document.getElementById('copy-email-pill');

if (mailtoBtn) mailtoBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = `mailto:${fullEmail}`; });

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

if (copyEmailPill) {
    copyEmailPill.addEventListener('click', () => {
        navigator.clipboard.writeText(fullEmail).then(() => {
            showToast('Correo copiado al portapapeles ✓');
        });
    });
}

/* ==========================================================================
   3. MODAL ARQUITECTURA ODIN RECIPES
   ========================================================================== */
const recipesModal = document.getElementById('recipes-modal');
const openRecipesBtn = document.getElementById('open-recipes-modal');
const closeRecipesBtn = document.getElementById('close-recipes-modal');

if (openRecipesBtn && recipesModal) {
    openRecipesBtn.addEventListener('click', () => {
        recipesModal.classList.add('active');
    });
}

if (closeRecipesBtn && recipesModal) {
    closeRecipesBtn.addEventListener('click', () => {
        recipesModal.classList.remove('active');
    });
}

if (recipesModal) {
    recipesModal.addEventListener('click', (e) => {
        if (e.target === recipesModal) {
            recipesModal.classList.remove('active');
        }
    });
}

/* ==========================================================================
   4. FONDO DE CONSTELACIONES (Canvas 2D)
   ========================================================================== */
const canvas = document.getElementById('constellation-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.55)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 35 : 75;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 120) * 0.32})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}