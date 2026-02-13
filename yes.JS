const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
let fireworksRunning = false;

function pick(btn, choice) {
  // Disable further clicks
  document.querySelectorAll(".choices button").forEach(b => b.disabled = true);

  // Highlight selected option
  btn.style.background = "#ff4d6d";
  btn.style.color = "white";

  // Play romantic sound
  document.getElementById("selectSound").play();

  // Flash memory effect
  document.querySelector(".flash").classList.add("active");

  // Confetti burst
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("span");
    c.innerHTML = "🎉";
    c.style.position = "absolute";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-20px";
    c.style.fontSize = "20px";
    c.style.animation = "confettiFall 2s linear";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }

  // Start fireworks
  fireworksRunning = true;
  startFireworks();

  // Save memory image
  setTimeout(saveMemory, 700);

  // Send WhatsApp message
  setTimeout(() => {
    const phone = "2348119487838";
    const msg = encodeURIComponent(
      "My Love ❤️\n\nI choose:\n" + choice + "\n\nLet’s make today special 💕"
    );
    window.open("https://wa.me/" + phone + "?text=" + msg, "_blank");
  }, 1800);
}

/* FIREWORKS LOGIC */
function startFireworks() {
  setInterval(() => {
    if (!fireworksRunning) return;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 50; i++) {
      particles.push({
        x, y,
        dx: Math.random() * 6 - 3,
        dy: Math.random() * 6 - 3,
        life: 60
      });
    }
  }, 500);

  animateFireworks();
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    ctx.fillStyle = `rgba(255,77,109,${p.life / 60})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}
function saveMemory() {

  // Create date + time
  const now = new Date();
  const timeString = now.toLocaleString();

  // Insert timestamp into page
  document.getElementById("timestamp").innerText =
    "Saved on: " + timeString;

  html2canvas(document.getElementById("memory"), {

    // IMAGE QUALITY BOOST
    scale: 3,          // Higher = sharper
    useCORS: true,
    backgroundColor: "#ffffff"

  }).then(canvas => {

    const link = document.createElement("a");

    // File name with date
    const filename =
      "valentine-" +
      now.getFullYear() + "-" +
      (now.getMonth()+1) + "-" +
      now.getDate() + "-" +
      now.getHours() + now.getMinutes() +
      ".png";

    link.download = filename;

    // Max PNG quality
    link.href = canvas.toDataURL("image/png", 1.0);

    link.click();
  });
}
