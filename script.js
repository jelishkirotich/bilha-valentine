// Canvas setup for falling flowers
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

// Create floating particles
function createParticles() {
    particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: 8 + Math.random() * 20,
            speedY: 1 + Math.random() * 3,
            speedX: 0.2 - Math.random() * 0.4,
            opacity: 0.5 + Math.random() * 0.4,
            type: Math.floor(Math.random() * 3),
            color: `hsl(${340 + Math.random() * 30}, 80%, 75%)`
        });
    }
}

function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);

    if (p.type === 0) { // heart
        ctx.font = `${p.size}px 'Segoe UI'`;
        ctx.fillStyle = p.color;
        ctx.fillText('❤️', -p.size/3, p.size/3);
    } else if (p.type === 1) { // flower
        ctx.font = `${p.size}px 'Segoe UI'`;
        ctx.fillStyle = p.color;
        ctx.fillText('🌸', -p.size/3, p.size/3);
    } else { // sparkle
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff9e6';
        ctx.fill();
    }
    ctx.restore();
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > height + 30) {
            p.y = -30;
            p.x = Math.random() * width;
        }

        drawParticle(p);
    }
    requestAnimationFrame(animateParticles);
}

// ===== VALENTINE INTERACTION =====
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const returnBtn = document.getElementById('returnBtn');
const questionText = document.getElementById('questionText');
const mainImage = document.getElementById('mainImage');
const buttonsDiv = document.querySelector('.buttons');

// Create celebration elements with YOUR EXACT MESSAGE
const celebrationDiv = document.createElement('div');
celebrationDiv.className = 'celebrate hidden';
celebrationDiv.innerHTML = `
    <div class="yay-text">Since nobody asked you😭😭</div>
    <div class="sub-message">I've appointed myself 😭😂😂</div>
    <div class="sub-message" style="margin-top: 0;">You're welcome 😂</div>
    
    <!-- Your images gallery -->
    <div class="image-gallery">
        <img src="one.gif" alt="" class="gallery-img">
        <img src="two.jpg" alt="" class="gallery-img">
        <img src="threee.jpg" alt="" class="gallery-img">
        <img src="four.jpg" alt="" class="gallery-img">
    </div>
    
   
    
    <div class="flower-photo">
        <img src="babes.jpg" alt="Flowers" class="flower-pic">
    </div>

`;


document.querySelector('.card').insertBefore(celebrationDiv, returnBtn);

let yesClicked = false;
let noClickCount = 0;

// Funny images for "No" clicks
const funnyImages = [
    "https://media1.tenor.com/m/9H7QkR3j4oIAAAAi/cute.gif",
    "https://media1.tenor.com/m/9Z9Vp0f0QkIAAAAi/peach-cat.gif",
    "https://media1.tenor.com/m/hnP3mMZ-0FcAAAAi/sad-cat.gif",
    "https://media1.tenor.com/m/8UJ-DTNXp_gAAAAd/valentine-love.gif"
];

// Make NO button run away
function moveNoButton() {
    if (yesClicked) return;
    
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 100;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('mouseover', moveNoButton);

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (yesClicked) return;
    
    noClickCount++;
    
    questionText.textContent = "Wait... nobody asked you so just agree! 😂";
    moveNoButton();
    
    mainImage.src = funnyImages[noClickCount % funnyImages.length];
    
    if (noClickCount >= 6) {
        noBtn.style.display = 'none';
        questionText.textContent = "Okay the NO button gave up! 😂 Click YES!";
    }
});

// YES button click - with your EXACT message
yesBtn.addEventListener('click', () => {
    if (yesClicked) return;
    yesClicked = true;

    questionText.textContent = "YAY! 🎉";
    
    buttonsDiv.classList.add('hidden');
    celebrationDiv.classList.remove('hidden');
    returnBtn.classList.remove('hidden');
    
    noBtn.style.display = 'none';
    
    // Happy confetti
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            for (let j = 0; j < 5; j++) {
                particles.push({
                    x: width/2 + (Math.random() - 0.5) * 400,
                    y: height/2 + (Math.random() - 0.5) * 300,
                    size: 10 + Math.random() * 25,
                    speedY: 1 + Math.random() * 4,
                    speedX: 0.5 - Math.random() * 1,
                    opacity: 0.9,
                    type: Math.floor(Math.random() * 3),
                    color: `hsl(${Math.random() * 360}, 90%, 75%)`
                });
            }
        }, i * 50);
    }
});

// Return button
returnBtn.addEventListener('click', () => {
    yesClicked = false;
    noClickCount = 0;
    
    questionText.textContent = "Bilha, will you be my Valentine? 💖";
    mainImage.src = "funny.jpg";
    
    buttonsDiv.classList.remove('hidden');
    celebrationDiv.classList.add('hidden');
    returnBtn.classList.add('hidden');
    
    noBtn.style.display = 'block';
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
});

// Initialize
initCanvas();
createParticles();
animateParticles();
window.addEventListener('resize', initCanvas);