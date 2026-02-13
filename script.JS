const music = document.getElementById("bgMusic");
document.addEventListener("click", () => music.play(), { once: true });

function goYes() {
  document.querySelector(".love-letter").classList.add("active");
  setTimeout(() => window.location.href = "yes.html", 3000);
}

const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * (innerWidth - 150) + "px";
  noBtn.style.top = Math.random() * (innerHeight - 100) + "px";
});

/* FLOATING HEARTS */
const hearts = document.querySelector(".hearts");
setInterval(() => {
  const h = document.createElement("span");
  h.innerHTML = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 20 + Math.random() * 20 + "px";
  h.style.animationDuration = 4 + Math.random() * 4 + "s";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}, 300);
