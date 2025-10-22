window.addEventListener("DOMContentLoaded", () => {
  const balloons = document.querySelectorAll(".balloons img");
  let clickCount = 0;

  balloons.forEach((balloon) => {
    balloon.addEventListener("click", function handleClick() {
      if (balloon.dataset.popped === "true") return;
      balloon.dataset.popped = "true";

      // Get balloon’s current screen position
      const rect = balloon.getBoundingClientRect();

      // Create a clone balloon for popping effect
      const clone = balloon.cloneNode(true);
      clone.style.position = "fixed";
      clone.style.left = rect.left + "px";
      clone.style.top = rect.top + "px";
      clone.style.width = rect.width + "px";
      clone.style.height = rect.height + "px";
      clone.style.animation = "none";
      clone.style.cursor = "default";
      clone.style.zIndex = "999";

      // Add clone to body (overlays in same spot)
      document.body.appendChild(clone);

      // Fade + scale pop effect
      clone.style.transition = "transform 300ms ease, opacity 300ms ease";
      clone.offsetHeight; // force reflow for transition
      clone.style.transform = "scale(0.6) translateY(-20px)";
      clone.style.opacity = "0";

      // Confetti burst
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 70,
        scalar: 1.1,
        origin: { x: originX, y: originY },
        colors: ["#ffaa00", "#ff00aa", "#aa00ff", "#aaff00", "#00aaff"],
        gravity: 0.9,
      });

      // Remove clone after animation
      setTimeout(() => clone.remove(), 600);

      // Hide the original balloon (so it doesn't overlap)
      balloon.style.opacity = "0";
      balloon.style.pointerEvents = "none";

      clickCount++;
      if (clickCount >= balloons.length) {
        setTimeout(showBirthdayMessage, 2000);
      }
    });
  });

  // 🎂 Display birthday message
  function showBirthdayMessage() {
    const message = document.createElement("div");
    message.classList.add("birthday-message");
    message.innerHTML = `
      <h1>🎂 Happy Birthday, Kristine! 🎉</h1>
      <p>Life may be challenging you in different ways, however I know you can get past those challenges because you're strong! And you're never alone - I'm here! 💙</p>
    `;
    document.body.appendChild(message);

    Object.assign(message.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "30px 50px",
      borderRadius: "20px",
      textAlign: "center",
      fontFamily: "Pacifico, cursive",
      fontSize: "1.5rem",
      color: "#333",
      zIndex: "9999",
      boxShadow: "0 0 30px rgba(255, 182, 193, 0.8)",
      animation: "fadeIn 2s ease forwards",
    });

    // Continuous confetti celebration
    const end = Date.now() + 8 * 1000;
    (function frame() {
      confetti({
        particleCount: 5,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
});
