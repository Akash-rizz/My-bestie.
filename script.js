
/* =====================================================
   ANAYA BESTIE UNIVERSE ✨
   Complete website JavaScript
   Edit the CONFIG section to personalize your website.
   No API key required.
===================================================== */

const CONFIG = {
  name: "Anaya",
  title: "Anaya's Universe",
  footer: "Made with friendship, for Anaya ✨",

  letter: `Some friendships make ordinary days a little brighter, and I'm genuinely glad to have you as my bestie.

Thank you for the laughs, the random conversations, the memories, and all the little moments that make friendship special.

No matter how busy life gets, I hope you always remember that you deserve happiness, respect, kindness, and people who appreciate the real you.

Here's to more laughs, more memories, and more legendary bestie moments.`,

  stories: [
    {
      icon: "✦",
      title: "How It Began",
      text: "Two different worlds, one random moment, and now… a friendship worth keeping. (Replace with your story!)"
    },
    {
      icon: "☻",
      title: "Funniest Moments",
      text: "Inside jokes, weird laughs, and absolutely no sense. (Replace with your moments!)"
    },
    {
      icon: "☏",
      title: "Random Chats",
      text: "The conversations that make no sense to anyone else."
    },
    {
      icon: "☆",
      title: "Memories Forever",
      text: "The little moments we'll always keep in our hearts."
    },
    {
      icon: "♡",
      title: "Why You're Amazing",
      text: "Your kindness, strength, weirdness, and the way you are just you."
    }
  ],

  memories: [
    { icon: "☁", caption: "Good Times ♡" },
    { icon: "✧", caption: "Our Vibes ♡" },
    { icon: "☾", caption: "Besties Forever" },
    { icon: "✿", caption: "Dreams ♡" }
  ],

  quiz: [
    {
      q: "Who is more likely to laugh at something completely random?",
      a: ["You", "Me", "Both equally", "No idea 😂"]
    },
    {
      q: "What is the best kind of bestie plan?",
      a: [
        "A spontaneous adventure",
        "Snacks and chatting",
        "Doing something chaotic",
        "Any plan together"
      ]
    },
    {
      q: "Choose our friendship's unofficial emoji.",
      a: ["😂", "🫶", "✨", "All of them, obviously"]
    },
    {
      q: "What makes a friendship stronger?",
      a: [
        "Trust",
        "Showing up for each other",
        "Honest conversations",
        "All of the above"
      ]
    },
    {
      q: "What should our next memory be?",
      a: [
        "A new adventure",
        "A legendary laugh",
        "A wholesome little moment",
        "Something completely unexpected"
      ]
    }
  ],

  surprises: [
    "Anaya, never underestimate how much brighter a day can get because you showed up. 💗",
    "Bestie reminder: you deserve kindness, good laughs, peaceful days, and people who cheer for you. ✨",
    "Official universe announcement: your bestie energy has been detected across several galaxies. 🪐",
    "May your snacks be tasty, your worries be lighter, and your laugh be ridiculously contagious. 😂",
    "Some people make memories. Some people become the memory you smile about. Keep being wonderfully you. ♡",
    "Emergency bestie notice: drink some water, stretch a little, and remember you're appreciated. 🌷",
    "If friendship had a constellation, ours would definitely be the one making questionable shapes. ⭐"
  ]
};

/* ---------- BASIC HELPERS ---------- */

const $ = id => document.getElementById(id);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let starTaps = 0;
let orbTaps = 0;
let quizIndex = 0;
let quizAnswers = [];
let selectedAnswer = null;
let lastSurprise = -1;
let toastTimer;

const starCanvas = $("starfield");
const ctx = starCanvas ? starCanvas.getContext("2d") : null;

let stars = [];
let frame = 0;

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* ---------- FRIENDSHIP STORY ---------- */

function buildStories() {
  const grid = $("storyGrid");
  if (!grid) return;

  CONFIG.stories.forEach(item => {
    const card = document.createElement("article");
    card.className = "story-card reveal";

    const icon = document.createElement("div");
    icon.className = "story-icon";
    icon.textContent = item.icon;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    card.append(icon, title, text);
    grid.append(card);
  });
}

/* ---------- MEMORY GALLERY ---------- */

function buildMemories() {
  const grid = $("memoryGrid");
  if (!grid) return;

  CONFIG.memories.forEach(item => {
    const card = document.createElement("figure");
    card.className = "memory-card reveal";

    const art = document.createElement("div");
    art.className = "memory-art";
    art.textContent = item.icon;
    art.setAttribute("aria-hidden", "true");

    const caption = document.createElement("figcaption");
    caption.textContent = item.caption;

    card.append(art, caption);

    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Memory placeholder: ${item.caption}`
    );

    card.addEventListener("click", () => {
      showToast("Add a real photo using the button below ✨");
    });

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });

    grid.append(card);
  });
}

/* ---------- SCROLL REVEAL ---------- */

function refreshReveals() {
  const elements = document.querySelectorAll(
    ".reveal:not(.visible)"
  );

  if (
    !("IntersectionObserver" in window) ||
    reduceMotion
  ) {
    elements.forEach(element => {
      element.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(element => observer.observe(element));
}

/* ---------- COSMIC STAR BACKGROUND ---------- */

function resizeCanvas() {
  if (!starCanvas || !ctx) return;

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    1.5
  );

  starCanvas.width = innerWidth * dpr;
  starCanvas.height = innerHeight * dpr;

  starCanvas.style.width = innerWidth + "px";
  starCanvas.style.height = innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = innerWidth < 600 ? 65 : 115;

  stars = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.4 + 0.25,
    a: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.18 + 0.025,
    phase: Math.random() * 6
  }));
}

function drawStars() {
  if (!ctx || document.hidden) return;

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  stars.forEach(star => {
    const twinkle =
      0.55 + Math.sin(frame * 0.015 + star.phase) * 0.35;

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.r,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(228,204,255,${star.a * twinkle})`;

    ctx.fill();

    if (!reduceMotion) {
      star.y -= star.speed;

      if (star.y < -3) {
        star.y = innerHeight + 3;
        star.x = Math.random() * innerWidth;
      }
    }
  });

  frame++;

  if (!reduceMotion) {
    requestAnimationFrame(drawStars);
  }
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !reduceMotion) {
    requestAnimationFrame(drawStars);
  }
});

/* ---------- SECRET LETTER ---------- */

function openLetter() {
  const envelope = $("envelope");
  const paper = $("letterPaper");
  const openButton = $("openLetter");

  if (!envelope || !paper) return;

  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");

  paper.classList.add("open");
  paper.setAttribute("aria-hidden", "false");

  if (openButton) {
    openButton.setAttribute("aria-pressed", "true");
  }

  $("closeLetter")?.focus({ preventScroll: true });
}

function closeLetter() {
  const envelope = $("envelope");
  const paper = $("letterPaper");
  const openButton = $("openLetter");

  if (!envelope || !paper) return;

  paper.classList.remove("open");
  paper.setAttribute("aria-hidden", "true");

  envelope.classList.remove("open");
  envelope.setAttribute("aria-expanded", "false");

  if (openButton) {
    openButton.setAttribute("aria-pressed", "false");
    openButton.focus({ preventScroll: true });
  }
}

/* ---------- FRIENDSHIP QUIZ ---------- */

function renderQuiz() {
  const total = CONFIG.quiz.length;

  if (!total) {
    $("quizQuestion").textContent =
      "Add some questions in the CONFIG section!";
    return;
  }

  $("quizResult").hidden = true;
  $("quizQuestion").hidden = false;
  $("quizOptions").hidden = false;

  $("quizProgressText").textContent =
    `QUESTION ${quizIndex + 1} / ${total}`;

  $("quizProgressPct").textContent =
    `${Math.round((quizIndex + 1) / total * 100)}%`;

  $("progressBar").style.width =
    `${(quizIndex + 1) / total * 100}%`;

  $("quizQuestion").textContent =
    CONFIG.quiz[quizIndex].q;

  $("quizOptions").replaceChildren();

  selectedAnswer = null;
  $("quizNext").disabled = true;

  $("quizNext").textContent =
    quizIndex === total - 1
      ? "See our result ✨"
      : "Next question →";

  CONFIG.quiz[quizIndex].a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";

    const symbol = document.createElement("span");
    symbol.className = "option-symbol";
    symbol.textContent = ["✧", "♡", "☼", "✦"][index % 4];

    const label = document.createElement("span");
    label.textContent = answer;

    button.append(symbol, label);

    button.addEventListener("click", () => {
      selectedAnswer = index;

      $("quizOptions")
        .querySelectorAll("button")
        .forEach(option => {
          option.classList.remove("selected");
        });

      button.classList.add("selected");
      $("quizNext").disabled = false;
    });

    $("quizOptions").append(button);
  });
}

function finishQuiz() {
  $("quizQuestion").hidden = true;
  $("quizOptions").hidden = true;
  $("quizNext").hidden = true;

  $("quizProgressText").textContent =
    "BESTIE QUIZ COMPLETE";

  $("quizProgressPct").textContent = "100%";
  $("progressBar").style.width = "100%";

  $("quizSecretStatus").textContent = "Unlocked ✨";

  $("secretUnlock").hidden = false;

  $("secretUnlock").textContent =
    "🌟 Secret unlocked: Anaya, you make this little universe more colourful just by being part of it. Keep being your wonderfully unique self. ♡";

  const result = $("quizResult");
  result.hidden = false;

  result.textContent =
    "✨ Official result: 100% bestie vibes. The answers were all about having fun — because this quiz has no wrong answers when friendship is involved. Your secret message has been unlocked below!";
}

$("quizNext").addEventListener("click", () => {
  if (selectedAnswer === null) return;

  quizAnswers.push(selectedAnswer);

  if (quizIndex < CONFIG.quiz.length - 1) {
    quizIndex++;
    renderQuiz();
  } else {
    finishQuiz();
  }
});

$("quizRestart").addEventListener("click", () => {
  quizIndex = 0;
  quizAnswers = [];

  $("quizNext").hidden = false;

  renderQuiz();
});

/* ---------- RANDOM BESTIE SURPRISE ---------- */

function surprise() {
  if (!CONFIG.surprises.length) {
    showToast("Add surprise messages in CONFIG first.");
    return;
  }

  let index = Math.floor(
    Math.random() * CONFIG.surprises.length
  );

  if (
    CONFIG.surprises.length > 1 &&
    index === lastSurprise
  ) {
    index = (index + 1) % CONFIG.surprises.length;
  }

  lastSurprise = index;

  const message = $("surpriseMessage");
  message.textContent = CONFIG.surprises[index];

  if (typeof message.animate === "function") {
    message.animate(
      [
        { opacity: 0.35, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 350,
        easing: "ease-out"
      }
    );
  }
}

async function copySurprise() {
  const message = $("surpriseMessage").textContent;

  try {
    await navigator.clipboard.writeText(message);
    showToast("Message copied! Share the good vibes 💗");
  } catch {
    const area = document.createElement("textarea");

    area.value = message;
    area.style.position = "fixed";
    area.style.opacity = "0";

    document.body.append(area);
    area.select();

    const copied = document.execCommand("copy");
    area.remove();

    showToast(
      copied
        ? "Message copied! 💗"
        : "Select and copy the message manually."
    );
  }
}

/* ---------- HIDDEN EASTER EGGS ---------- */

function starSecret() {
  starTaps++;

  $("starCount").textContent =
    `${Math.min(starTaps, 3)} / 3`;

  if (starTaps >= 3) {
    $("secretUnlock").hidden = false;

    $("secretUnlock").textContent =
      "💫 Secret star message: Even on an ordinary day, you can be somebody's favourite plot twist. Keep shining, Anaya. ♡";

    showToast("Secret star message unlocked! ✨");
  } else {
    showToast(
      `The star is waking up… ${3 - starTaps} more tap(s)!`
    );
  }
}

function orbSecret() {
  orbTaps++;

  $("orbCount").textContent =
    `${Math.min(orbTaps, 5)} / 5`;

  const orb = $("friendshipOrb");

  if (orb && typeof orb.animate === "function") {
    orb.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12) rotate(8deg)" },
        { transform: "scale(1)" }
      ],
      { duration: 450 }
    );
  }

  if (orbTaps >= 5) {
    $("secretUnlock").hidden = false;

    $("secretUnlock").textContent =
      "🪐 Cosmic secret: Friendship is a constellation made from tiny moments. Thanks for being part of this one, Anaya. ♡";

    showToast("Cosmic sparkle unlocked! 🪐");
  } else {
    showToast("Cosmic energy rising… ✨");
  }
}

/* ---------- EVENT LISTENERS ---------- */

$("openLetter").addEventListener("click", openLetter);
$("envelope").addEventListener("click", openLetter);
$("closeLetter").addEventListener("click", closeLetter);

$("surpriseButton").addEventListener("click", surprise);
$("anotherSurprise").addEventListener("click", surprise);
$("copyMessage").addEventListener("click", copySurprise);

$("secretStar").addEventListener("click", starSecret);
$("secretOrb").addEventListener("click", orbSecret);
$("friendshipOrb").addEventListener("click", orbSecret);

/* ---------- OPTIONAL MUSIC ---------- */
/* Music stays off by default. No audio file is bundled. */

$("musicButton").addEventListener("click", () => {
  showToast(
    "Music is optional — add a licensed audio file to assets/music.mp3 to enable music playback."
  );
});

/* ---------- ADD PHOTOS FROM YOUR DEVICE ---------- */

$("photoUpload").addEventListener("change", event => {
  const files = Array.from(
    event.target.files || []
  ).filter(file => file.type.startsWith("image/"));

  if (!files.length) return;

  files.forEach(file => {
    const url = URL.createObjectURL(file);

    const card = document.createElement("figure");
    card.className = "memory-card";

    const image = document.createElement("img");
    image.src = url;
    image.alt = `Photo memory: ${file.name}`;

    const caption = document.createElement("figcaption");

    caption.textContent = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ");

    card.append(image, caption);
    $("memoryGrid").prepend(card);
  });

  showToast(
    `${files.length} photo(s) added for this session. They stay on this device.`
  );

  event.target.value = "";
});

/* ---------- MOBILE NAVIGATION ---------- */

$("menuToggle").addEventListener("click", () => {
  const navigation = $("navigation");
  const isOpen = navigation.classList.toggle("open");

  $("menuToggle").setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  $("menuToggle").textContent = isOpen ? "×" : "☰";
});

$("navigation")
  .querySelectorAll("a")
  .forEach(link => {
    link.addEventListener("click", () => {
      $("navigation").classList.remove("open");

      $("menuToggle").setAttribute(
        "aria-expanded",
        "false"
      );

      $("menuToggle").textContent = "☰";
    });
  });

/* ---------- INITIALIZE WEBSITE ---------- */

document.title = CONFIG.title;

$("letterText").textContent = CONFIG.letter;
$("musicLabel").textContent = "Music off";

const footerText = document.querySelector(".footer p");
if (footerText) {
  footerText.textContent = CONFIG.footer;
}

buildStories();
buildMemories();
resizeCanvas();

if (reduceMotion) {
  drawStars();
} else {
  requestAnimationFrame(drawStars);
}

refreshReveals();
window.addEventListener("resize", resizeCanvas);
