// Ursprüngliche Dauer (1 Tag / 13 Stunden / 30 Minuten)
let originalDuration = 60 * 30 * 15 * 5;
let duration = originalDuration; // Aktuell verbleibende Dauer in Sekunden
let isPaused = true;
let countdownInterval; // Speichert die Intervall-Referenz (id) für den Countdown

// Funktion zur Aktualisierung der Timer-Anzeige
function updateTimerDisplay() {
    // Zeitwerte in Tage, Stunde, Minuten und Sekunden aufteilen
    const days = Math.floor(duration / (60 * 60 * 24));
    const hours = Math.floor((duration % (60*60*24)) / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);
    const seconds = duration % 60;

    // Aktualisieren der Timer-Anzeige für Tage, Stunden, Minuten und Sekunden
    document.getElementById("days").querySelector(".time").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").querySelector(".time").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").querySelector(".time").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").querySelector(".time").textContent = String(seconds).padStart(2, "0");

    // Ändern der Klassen, um den Pause- und Abspielzustand anzuzeigen
    document.querySelectorAll(".time").forEach((timeelement) => {
        timeelement.classList.toggle("playing", !isPaused);
        timeelement.classList.toggle(".paused", isPaused);
    });
}

// Funktion zum Umschalten von Play/Pause Zustand
function togglePlayPause() {
    isPaused = !isPaused;

    const playPauseButton = document.getElementById("playPauseBtn");
    playPauseButton.innerHTML = isPaused ? "<span>&#9658;</span>" : "<span>&#10074;</span>";

    playPauseButton.classList.toggle("playing", !isPaused);
    playPauseButton.classList.toggle("paused", isPaused);
}

// Funktion zum Starten des Timers
function startCountdown() {
    togglePlayPause();
    updateTimerDisplay();

    countdownInterval = setInterval(() => {
        duration--;

        if (duration < 0) {
            clearInterval(countdownInterval);
            duration = 0;
            togglePlayPause();
        } 

        updateTimerDisplay();
    }, 1000);
}

// Funktion zum Zurücksetzen des Timers
function resetTimerStyles() {
    // Reset Play/Pause-Button
    const playPauseButton = document.getElementById("playPauseBtn");
    playPauseButton.innerHTML = "<span>&#9658;</span>";
    playPauseButton.classList.toggle("playing", true);
    playPauseButton.classList.toggle("paused", false);

    // Reset Timeslots
    document.querySelectorAll(".time").forEach((timeelement) => {
        timeelement.classList.toggle("playing", true);
        timeelement.classList.toggle(".paused", false);
    });
}

// Events
document.addEventListener("DOMContentLoaded", function() {
    // Buttons
    const playPauseButton = document.getElementById("playPauseBtn");
    const restartButton = document.getElementById("restartBtn");
    const increaseButton = document.getElementById("increaseBtn");
    const decreaseButton = document.getElementById("decreaseBtn");

    // Event-Handler
    // Play/Pause-Button-Event-Handler
    playPauseButton.addEventListener("click", function() {
        if (isPaused) {
            startCountdown() // Starten des Countdowns
        } else {
            clearInterval(countdownInterval);
            togglePlayPause();
            updateTimerDisplay();
        }
    });

    // Restart-Button-Event-Handler
    restartButton.addEventListener("click", function() {
        clearInterval(countdownInterval);
        isPaused = true;
        duration = originalDuration;
        updateTimerDisplay();
        resetTimerStyles();
    });

    // Increase-Button Event-Handler
    increaseButton.addEventListener("click", function() {
        duration += 60;
        originalDuration = Math.ceil(duration / 60) * 60;
        updateTimerDisplay();
    });

    // Decrease-Button Event-Handler
    decreaseButton.addEventListener("click", function() {
        if (duration >= 120) {
            duration -= 60;
            originalDuration = Math.ceil(duration / 60) * 60;
            updateTimerDisplay();
        }
    });
    // Initialisierung der Timer-Anzeige
    updateTimerDisplay();
    resetTimerStyles();
});



