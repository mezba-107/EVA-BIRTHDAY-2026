function showPage(page) {
  document.querySelectorAll(".page").forEach((el) => {
    el.classList.add("hidden-page");
  });

  document.getElementById(`page${page}`).classList.remove("hidden-page");

  if (page === 4) {
    confetti();
    startTyping();
  }
}

/* START BUTTON */

document.getElementById("startBtn").onclick = () => {
  showPage(2);
  confetti();
};

/* CLOCK */

function updateClock() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");

  document.getElementById("clock").innerText = `${h}:${m}`;
}

setInterval(updateClock, 1000);
updateClock();

/* =========================
   CONFETTI
========================= */

function confetti() {
  const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#f43f5e", "#facc15"];

  for (let i = 0; i < 80; i++) {
    const div = document.createElement("div");

    div.className = "confetti";

    div.style.left = Math.random() * 100 + "vw";

    div.style.background = colors[Math.floor(Math.random() * colors.length)];

    div.style.borderRadius = Math.random() > 0.5 ? "50%" : "3px";

    div.style.animationDuration = Math.random() * 3 + 2 + "s";

    document.body.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 5000);
  }
}

/* =========================
   FLOATING HEARTS
========================= */

function createHearts() {
  const container = document.getElementById("hearts");

  setInterval(() => {
    const heart = document.createElement("div");

    heart.className = "heart";

    const emojis = ["💖", "✨", "🎈", "💕", "🌸"];

    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.animationDuration = Math.random() * 5 + 5 + "s";

    heart.style.fontSize = Math.random() * 20 + 20 + "px";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }, 500);
}

createHearts();

/* =========================
   STACK PHOTO SLIDER
========================= */

const slides = document.querySelectorAll(".memory-slide");

let currentSlide = 0;

function updateSlider() {
  slides.forEach((slide) => {
    slide.classList.remove(
      "active-card",
      "second-card",
      "third-card",
      "hidden-card",
    );
  });

  slides[currentSlide].classList.add("active-card");

  slides[(currentSlide + 1) % slides.length].classList.add("second-card");

  slides[(currentSlide + 2) % slides.length].classList.add("third-card");

  for (let i = 3; i < slides.length; i++) {
    slides[(currentSlide + i) % slides.length].classList.add("hidden-card");
  }
}

/* NEXT */

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

/* PREVIOUS */

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;

  updateSlider();
}

/* INITIAL LOAD */

updateSlider();

/* =========================
   AUTO SLIDE
========================= */

// setInterval(() => {
//   nextSlide();
// }, 4000);

/* =========================
   MOBILE SWIPE SUPPORT
========================= */

let startX = 0;

const slider = document.querySelector(".slider-container");

if (slider) {
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      nextSlide();
    }

    if (endX - startX > 50) {
      prevSlide();
    }
  });
}

/* =========================
   TYPING EFFECT
========================= */

const message =
  "তোমার জন্মদিন তোমার জীবনের সবচেয়ে সুন্দর দিনগুলোর একটি হোক ✨💖 সবসময় হাসিখুশি থাকো 🌸";

let typingIndex = 0;
let typingRunning = false;

function startTyping() {
  const typingText = document.getElementById("typingText");

  if (!typingText || typingRunning) return;

  typingRunning = true;

  typingText.innerHTML = "";

  typingIndex = 0;

  function typeLetter() {
    if (typingIndex < message.length) {
      typingText.innerHTML += message.charAt(typingIndex);

      typingIndex++;

      setTimeout(typeLetter, 70);
    } else {
      typingRunning = false;
    }
  }

  typeLetter();
}
