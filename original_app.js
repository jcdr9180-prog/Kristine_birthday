const balloons = document.querySelectorAll(".balloons img");

let clickCount = 0;
const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });

balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
        balloon.style.opacity = "0";

        const rect = balloon.getBoundingClientRect();

        confetti({
            particleCount: 60,
            spread: 45,
            scalar: 1.5,
            shapes: [triangle]
            origin {
                x: balloon.getBoundingClientRect().left /window.innerWidth,
                y: balloon.getBoundingClientRect().top /window.innerHeight,
            },
            colors: ["#ffaa00", "#ff00aa", "#aa00ff", "#aaff00", "#00aaff"]
            gravity: 0.8,
        });

        clickCount++;
    });
});


function resetBalloons() {
    balloons.forEach((balloon) =>{
        balloon.style.opacity = "1";

        const parent = balloon.parentNode;
        parent.removeChild(balloon);
        parent.appendChild(balloon)
    });

    clickCount = 0;
}