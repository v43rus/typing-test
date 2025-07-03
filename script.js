// Word list (will be loaded from JSON)
let words = [];

// DOM Elements
const textContainer = document.getElementById("text-container");
const timerElement = document.getElementById("timer");
const finalScoreElement = document.getElementById("final-score");
const tryAgainButton = document.getElementById("try-again");
const videoToggleButton = document.getElementById("video-toggle");
const videoIcon = document.getElementById("video-icon");
const backgroundVideo = document.getElementById("background-video");

// Variables
let totalTyped = "";
let currentCharIndex = 0;
let errors = 0;
let timeLeft = 60;
let timerInterval;
let typingStarted = false;

// Functions
function startTimer() {
  if (!typingStarted) {
    typingStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endTest();
      }

    }, 1000)
  }
}

function endTest() {
  timerElement.textContent = "Time's up!";
  finalScoreElement.textContent = `Final WPM: ${calculateWPM()}`;
  textContainer.style.display = "none";
  tryAgainButton.style.display = "inline-block";
}

function calculateWPM() {
  const wordsTyped = totalTyped.trim().split(/\s+/).length;
  const baseWPM = Math.round((wordsTyped / 60) * 60);
  const adjustedWPM = Math.max(baseWPM - errors, 0);
  return adjustedWPM;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function loadWords() {
  try {
    const response = await fetch('words.json');
    if (!response.ok) {
      throw new Error('Failed to load words.json');
    }
    const data = await response.json();
    words = data.words || data;
    return words;
  } catch (error) {
    console.error('Error loading words:', error);
    // Fallback words if JSON fails to load
    words = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "pack", "my", "box", "with", "five", "dozen", "liquor", "jugs"];
    return words;
  }
}

async function init() {
  if (isMobileDevice()) {
    showMobileMessage();
    return;
  }

  if (words.length === 0) {
    await loadWords();
  }

  let array = shuffleArray([...words]);
  textContainer.textContent = array.join(" ");
}

function resetTest() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timerElement.textContent = `Time left: ${timeLeft}s`;
  finalScoreElement.textContent = "";
  textContainer.style.display = "inline-block";
  tryAgainButton.style.display = "none";
  totalTyped = "";
  typingStarted = false;
  currentCharIndex = 0;
  errors = 0;
  textContainer.scrollLeft = 0;

  init();
}

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 800;
}

function showMobileMessage() {
  textContainer.textContent = "This typing test is designed for desktop use only.";
}

function addCyberpunkEffect(element, isCorrect) {
  element.classList.add(isCorrect ? 'correct' : 'incorrect');
  
  element.style.border = isCorrect 
    ? '1px solid #00ffff'
    : '1px solid #ff0080';
  element.style.borderRadius = '3px';
  element.style.padding = '2px';
  element.style.margin = '1px';
  element.style.boxShadow = isCorrect
    ? '0 0 5px #00ffff'
    : '0 0 5px #ff0080';
  
  if (!isCorrect) {
    element.style.animation = 'glitch 0.3s ease-out';
  } else {
    element.style.animation = 'cyberType 0.4s ease-out';
  }
  
  setTimeout(() => {
    element.style.animation = '';
  }, 400);
}

function toggleVideo() {
  if (backgroundVideo.paused) {
    backgroundVideo.play();
    videoIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
    videoToggleButton.title = 'Pause background video';
  } else {
    backgroundVideo.pause();
    videoIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
    videoToggleButton.title = 'Play background video';
  }
}

// Event Listeners
document.addEventListener("keydown", (e) => {
  if (!typingStarted)
    startTimer();

  if (e.key === "Backspace") {
    if (totalTyped.length > 0) {
      currentCharIndex = Math.max(0, currentCharIndex - 1);
      totalTyped = totalTyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key;
    currentCharIndex++;
  }

  const textArray = textContainer.textContent.split("");
  textContainer.innerText = "";

  errors = 0;

  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span");
    span.textContent = textArray[i];

    if (i < totalTyped.length) {
      const isCorrect = totalTyped[i] === textArray[i];
      
      if (i === totalTyped.length - 1) {
        addCyberpunkEffect(span, isCorrect);
      } else {
        span.classList.add(isCorrect ? "correct" : "incorrect");
      }
      
      if (!isCorrect) {
        errors++;
      }
    }

    textContainer.appendChild(span);
  }

  if (totalTyped.length >= 20) {
    const scrollAmount = (totalTyped.length - 20) * 14;
    textContainer.scrollLeft = scrollAmount;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "try-again") {
    resetTest();
  } else if (e.target.id === "video-toggle" || e.target.id === "video-icon" || e.target.closest("#video-toggle")) {
    toggleVideo();
  }
});

// Runtime
init();
