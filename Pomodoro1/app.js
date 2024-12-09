let timerInterval;
let timeLeft = 0; // Default to 0 seconds (on bosse ?)
let isPaused = false; // Track pause state

// Load audio files
const alarmSound = new Audio('alarm.mp3');
const start5minSound = new Audio('FinPause.mp3');
const start25minSound = new Audio('FinPause.mp3');
const pauseSound = new Audio('Pause.mp3');
const endBreakSound = new Audio('FinPause.mp3');
const endWorkSound = new Audio('FinTravail.mp3');

function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  if (timeLeft > 0) {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
  } else {
    timerElement.textContent = "On bosse ?";
  }
}

function startSession(minutes) {
  timeLeft = minutes * 60; // Set time based on session type
  isPaused = false; // Reset pause state
  const pauseButton = document.getElementById('pauseButton');
  if (pauseButton) {
    pauseButton.textContent = "Pause"; // Reset pause button
  }

  // Play appropriate sound
  if (minutes === 25) {
    start25minSound.play();
  } else if (minutes === 5) {
    start5minSound.play();
  }

  updateTimerDisplay();
  startTimer();
}

function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      const pauseButton = document.getElementById('pauseButton');
      if (pauseButton) {
        pauseButton.textContent = "Pause"; // Reset pause button
      }

      // Play end sound based on session type
      if (timeLeft === 0) {
        if (document.getElementById('timer').textContent.includes('25')) {
          endWorkSound.play();
        } else if (document.getElementById('timer').textContent.includes('5')) {
          endBreakSound.play();
        }
      }
      alert("Time is up! Great job!");
    }
  }, 1000);
}

function togglePause() {
  const pauseButton = document.getElementById('pauseButton');
  if (!pauseButton) {
    console.error("Pause button not found.");
    return;
  }

  if (isPaused) {
    // Resume timer
    isPaused = false;
    start5minSound.play(); // Play start sound
    pauseButton.textContent = "Pause";
    startTimer();
  } else {
    // Pause timer
    isPaused = true;
    pauseSound.play(); // Play pause sound
    pauseButton.textContent = "Reprendre";
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 0; // Reset to default
  isPaused = false; // Reset pause state
  const pauseButton = document.getElementById('pauseButton');
  if (pauseButton) {
    pauseButton.textContent = "Pause"; // Reset pause button
  }
  updateTimerDisplay();
}

// Initialize timer display
document.addEventListener("DOMContentLoaded", () => {
  updateTimerDisplay();
});