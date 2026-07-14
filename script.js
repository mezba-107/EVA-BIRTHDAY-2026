function showPage(page) {
  document.querySelectorAll(".page").forEach((el) => {
    el.classList.add("hidden-page");
  });

  document.getElementById(`page${page}`).classList.remove("hidden-page");

  if (page === 4) {
    confetti();
  }

  if (page === 5) {
    confetti();
    startLoveRain();
  }
}
/* START BUTTON + MUSIC */

const music = document.getElementById("bgMusic");

music.volume = 0.4; // volume 30%

music.playbackRate = 1.1;

document.getElementById("startBtn").onclick = () => {
  showPage(2);
  confetti();

  music.play().catch((error) => {
    console.log("Music play blocked:", error);
  });
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

let opened = false;

function openLetter() {
  if (opened) return;
  opened = true;

  const envelope = document.getElementById("envelope");

  envelope.classList.add("open");

  // Letter বের হওয়ার পর typing শুরু হবে
  setTimeout(() => {
    startTyping();
  }, 900);

  // শেষে Next button দেখাবে
  setTimeout(() => {
    document.getElementById("nextBtn").style.display = "inline-block";
  }, 1800);
}
/* =========================
   TYPING EFFECT
========================= */

const message = `Happy Birthday, My Love! 🎂❤️

On this Special day i want to let u know how much u mean to me. You are my one of the best gift from Allah. Thank U for coming into my life and making it so beautiful. I Love u Mona 💖.

Allah kache dua kori Allah tmk shustho rakhuk, hashi khushi rakhuk, life a successful how, tmr sob sopno puron hok and life a ja cao sob tmi pao. Allah'r kache aitai dua kori. Tmr life sundor hok.

Keep smiling, stay happy, take care of ur self and always stay by my side. And best of luck for ur beautiful future.

Again Happy Birthday Mona 💝 and I Love U Soooooooo Much 💗💓💖`;

let typingIndex = 0;
let typingRunning = false;
let loveRainInterval = null;
function startTyping() {
  const typingText = document.getElementById("typingText");

  if (!typingText) return;

  typingRunning = true;

  typingText.innerHTML = "";

  typingIndex = 0;

  function typeLetter() {
    if (document.getElementById("page4").classList.contains("hidden-page")) {
      typingRunning = false;
      return;
    }

    if (typingIndex < message.length) {
      const ch = message.charAt(typingIndex);

      if (ch === "\n") {
        typingText.innerHTML += "<br>";
      } else {
        typingText.innerHTML += ch;
      }

      typingText.parentElement.scrollTop =
        typingText.parentElement.scrollHeight;

      typingIndex++;

      setTimeout(typeLetter, 70);
    } else {
      typingRunning = false;
    }
  }

  typeLetter();
}

// part of 5th page code

function startLoveRain() {
  const container = document.getElementById("loveRain");

  container.innerHTML = "";

  if (loveRainInterval) {
    clearInterval(loveRainInterval);
  }

  const items = [
    "❤️",
    "💖",
    "💕",
    "💞",
    "💘",
    "🥰",
    "🌸",
    "✨",
    "💝",
    "💌",
    "😍",
    "😘",
    "💋",
    "❤️ I Love You Mona ❤️",
    "💕 Love You Jaan 💕",
    "💖 I ❤️ U 💖",
    "🥰 Forever Together 🥰",
    "💞 My Love 💞",
    "🌸 Miss You 🌸",
  ];

  loveRainInterval = setInterval(() => {
    if (document.getElementById("page5").classList.contains("hidden-page")) {
      clearInterval(loveRainInterval);
      loveRainInterval = null;
      return;
    }

    const e = document.createElement("div");

    e.className = "loveEmoji";

    const item = items[Math.floor(Math.random() * items.length)];

    e.innerHTML = item;

    e.style.left = Math.random() * 100 + "vw";

    if (
      item.includes("Love") ||
      item.includes("❤️ U") ||
      item.includes("Together") ||
      item.includes("Miss")
    ) {
      e.style.fontSize = 16 + Math.random() * 10 + "px";
      e.style.fontWeight = "700";
      e.style.color = "#ffd6ec";
      e.style.textShadow = "0 0 10px #ff4da6";
      e.style.whiteSpace = "nowrap";
    } else {
      e.style.fontSize = 25 + Math.random() * 35 + "px";
    }

    e.style.animationDuration = 4 + Math.random() * 4 + "s";

    container.appendChild(e);

    setTimeout(() => {
      e.remove();
    }, 8000);
  }, 150);
}

// for restart part

function resetJourney() {
  // Music reset 🎵
  music.pause();
  music.currentTime = 0;

  // Page 4 reset
  opened = false;
  typingIndex = 0;
  typingRunning = false;

  document.getElementById("typingText").innerHTML = "";
  document.getElementById("envelope").classList.remove("open");
  document.getElementById("nextBtn").style.display = "none";

  // Page 3 slider reset
  currentSlide = 0;
  updateSlider();

  // Love Rain reset
  if (loveRainInterval) {
    clearInterval(loveRainInterval);
    loveRainInterval = null;
  }

  document.getElementById("loveRain").innerHTML = "";

  // Back to first page
  showPage(1);
}
