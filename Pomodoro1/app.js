let timerInterval;
let timeLeft = 0; // Default to 0 seconds (on bosse ?)
let isPaused = false; // Track pause state

// Load audio files
const alarmSound = new Audio('Alarm.mp3');
const clockSound = new Audio('Clock.mp3');
const startSound = new Audio('Start.mp3');

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

  // Play start sound
  startSound.play();

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
      const currentDisplay = document.getElementById('timer').textContent;
      if (currentDisplay === "25:00" || timeLeft === 0) {
        alarmSound.play(); // Pomodoro end
      } else if (currentDisplay === "5:00" || timeLeft === 0) {
        clockSound.play(); // Break end
      }
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
    startSound.play(); // Play start sound
    pauseButton.textContent = "Pause";
    startTimer();
  } else {
    // Pause timer
    isPaused = true;
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
