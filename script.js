
// 1. PLAY / PAUSE MUSIC

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic() {

    if (music.paused) {
        music.play();

        musicBtn.innerText = "⏸ Pause Music";

    } else {
        music.pause();

        musicBtn.innerText = "🎵 Play Music";
    }
}


// 2. OPEN SECRET LETTER

function openLetter() {

    const letter = document.getElementById("letter");
    const envelope = document.getElementById("envelope");

    letter.classList.toggle("hidden");

    if (!letter.classList.contains("hidden")) {
        envelope.innerHTML = "💗<p>YOUR LETTER IS OPEN!</p>";
        letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        envelope.innerHTML = "💌<p>CLICK TO OPEN</p>";
    }
}


// 3. CELEBRATION EFFECT

function celebrate() {

    fireworks();

    document.getElementById("memories").scrollIntoView({
        behavior: "smooth"
    });
}


// 4. FIREWORKS EFFECT

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = null;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


function createFirework(x, y) {

    const colors = [
        "#ff78a5",
        "#ffd166",
        "#9b8cff",
        "#7de2c3",
        "#ff9f68"
    ];

    for (let i = 0; i < 55; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 70,
            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });
    }
}


function animateFireworks() {

    ctx.clearRect(
        0, 0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach((p) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.04;
        p.life--;

        ctx.globalAlpha = Math.max(0, p.life / 70);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

    });

    ctx.globalAlpha = 1;

    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
        animationId = requestAnimationFrame(animateFireworks);
    } else {
        ctx.clearRect(
            0, 0,
            window.innerWidth,
            window.innerHeight
        );

        animationId = null;
    }
}


function fireworks() {

    const positions = [
        [0.2, 0.3],
        [0.5, 0.2],
        [0.8, 0.3],
        [0.35, 0.5],
        [0.7, 0.5]
    ];

    positions.forEach(([x, y], index) => {

        setTimeout(() => {

            createFirework(
                window.innerWidth * x,
                window.innerHeight * y
            );

            if (animationId === null) {
                animateFireworks();
            }

        }, index * 250);

    });

}
