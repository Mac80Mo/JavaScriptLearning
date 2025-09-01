// Das Canvas-Element wird aus dem HTML-Dokument geholt und der 2D-Kontext initialisiert.
const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

// Globale Variablen für das Spiel
let lastDrawTime = 0; // Zeitstempel der letzten Aktualisierung
let level = 1; // Aktuelles Level
let gamePaused = false; // Spielstatus (pausiert oder nicht)
let score = 0; // Punktestand
let currentBlockCount = 0; // Anzahl der Blöcke, die bisher gefallen sind
const pointsForBlock = 0.5; // Punkte pro Block
let powerUpProbability = 0.05; // Wahrscheinlichkeit für Power-Ups

// Spieler-Variablen
const player = {
  x: 0, // X-Position des Spielers
  y: canvas.height - 50, // Y-Position des Spielers (unten im Canvas)
  xInc: 0, // Bewegungsgeschwindigkeit des Spielers
};

const initialPlayerWidth = 100; // Anfangsbreite des Spielers
let playerWidth = initialPlayerWidth; // Aktuelle Breite des Spielers
const playerHeight = 10; // Höhe des Spielers
const playerSpeed = 1; // Bewegungsgeschwindigkeit des Spielers

// Tasten-Status (ob gedrückt oder nicht)
const keys = {
  arrowLeft: false, // Linke Pfeiltaste
  arrowRight: false, // Rechte Pfeiltaste
};

// Block-Variablen
const block = {
  x: 101, // X-Position eines Blocks
  y: 0, // Y-Position eines Blocks
};

// Array mit Blöcken, die im Spiel verwendet werden
const blocks = [
  { x: 101, y: -100 },
  { x: 250, y: 0 },
  { x: 380, y: -200 },
  { x: 80, y: -300 },
  { x: 225, y: -400, powerUp: true }, // Block mit Power-Up
];

const blockWidth = 10; // Breite eines Blocks
const blockHeight = 10; // Höhe eines Blocks
let blockSpeed = 0.1; // Geschwindigkeit, mit der die Blöcke fallen

// Funktion, um Event-Listener für Tasteneingaben hinzuzufügen
function addEventListeners() {
  document.addEventListener("keydown", (event) => {
    if (gamePaused) {
      return; // Keine Eingaben, wenn das Spiel pausiert ist
    }
    if (event.code === "ArrowLeft") {
      keys.arrowLeft = true;
      player.xInc = -playerSpeed; // Spieler nach links bewegen
    } else if (event.code === "ArrowRight") {
      keys.arrowRight = true;
      player.xInc = playerSpeed; // Spieler nach rechts bewegen
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
      keys.arrowLeft = false;
      if (!keys.arrowRight) {
        player.xInc = 0; // Bewegung stoppen, wenn keine Taste gedrückt ist
      }
    } else if (event.code === "ArrowRight") {
      keys.arrowRight = false;
      if (!keys.arrowLeft) {
        player.xInc = 0; // Bewegung stoppen
      }
    }
    player.xInc = 0; // Sicherheitshalber Bewegung stoppen
  });
}

// Event-Listener für Mausbewegungen
document.addEventListener("mousemove", (event) => {
  player.x = event.clientX - playerWidth / 2; // Spieler folgt der Maus
});

// Event-Listener hinzufügen
addEventListeners();

// Hauptspiel-Schleife starten
requestAnimationFrame(draw);

// Hauptzeichnungsfunktion, die das Spiel aktualisiert und neu zeichnet
function draw(currentTime) {
  const timePassed = currentTime - lastDrawTime; // Zeit seit der letzten Aktualisierung
  console.log(timePassed);
  clearCanvas(); // Canvas löschen

  drawPlayer(timePassed); // Spieler zeichnen
  drawBlocks(timePassed); // Blöcke zeichnen
  drawScore(); // Punktestand anzeigen
  drawLevelCompleted(); // Level-Status anzeigen

  checkForCollision(); // Kollisionen prüfen
  checkForLevelCompleted(); // Prüfen, ob das Level abgeschlossen ist

  lastDrawTime = currentTime; // Zeitstempel aktualisieren
  requestAnimationFrame(draw); // Nächste Aktualisierung planen
}

// Prüfen, ob das Level abgeschlossen ist
function checkForLevelCompleted() {
  if (gamePaused) {
    return; // Keine Prüfung, wenn das Spiel pausiert ist
  }

  if (currentBlockCount >= 15) {
    gamePaused = true; // Spiel pausieren

    setTimeout(() => {
      const success = score >= (currentBlockCount * pointsForBlock) / 2;

      if (success) {
        // Level erfolgreich abgeschlossen
        score = 0;
        currentBlockCount = 0;

        level += 1; // Nächstes Level
        blockSpeed += 0.033; // Blöcke werden schneller
        gamePaused = false; // Spiel fortsetzen
      }
    }, 5 * 1000); // 5 Sekunden warten
  }
}

// Level-Abschlussnachricht anzeigen
function drawLevelCompleted() {
  if (!gamePaused) {
    return; // Keine Nachricht, wenn das Spiel läuft
  }

  const success = score >= (currentBlockCount * pointsForBlock) / 2;

  context.font = "26px Arial";
  context.fillStyle = success ? "green" : "orange";
  context.textAlign = "center";
  context.fillText(`Level beendet!`, canvas.width / 2, 100);
  context.fillText(
    success
      ? "Du hast es geschafft!"
      : "Du hast es nicht geschafft, Game Over!",
    canvas.width / 2,
    150
  );
}

// Spieler zeichnen
function drawPlayer(timePassed) {
  context.fillStyle = "#333";
  context.fillRect(player.x, player.y, playerWidth, playerHeight);

  if (gamePaused) {
    return; // Spieler nicht bewegen, wenn das Spiel pausiert ist
  }

  // Spielerbewegung (auskommentiert)
  // player.x += timePassed * player.xInc;

  // Spieler am Rand des Canvas stoppen (auskommentiert)
  // if (player.x < 0) {
  //   player.x = 0;
  // }
  // if (player.x + playerWidth >= canvas.width) {
  //   player.x = canvas.width - playerWidth;
  // }
}

// Blöcke zeichnen
function drawBlocks(timePassed) {
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    context.fillStyle = block.powerUp ? "green" : "red"; // Power-Up-Blöcke grün, normale rot
    context.fillRect(block.x, block.y, blockWidth, blockHeight);

    if (!gamePaused) {
      block.y += timePassed * blockSpeed; // Blöcke fallen lassen
    }
  }
}

// Punktestand anzeigen
function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "blue";
  context.textAlign = "right";
  context.fillText(
    `Level: ${level} Punkte: ${score.toString()} (${
      currentBlockCount * pointsForBlock
    })`,
    canvas.width - 20,
    20
  ); // Punktestand oben rechts anzeigen
}

// Canvas löschen
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Kollisionen zwischen Spieler und Blöcken prüfen
function checkForCollision() {
  if (gamePaused) {
    return; // Keine Prüfung, wenn das Spiel pausiert ist
  }
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];
    const blockBottom = block.y + blockHeight;

    if (blockBottom >= player.y) {
      const blockRight = block.x + blockWidth;
      if (
        (block.x >= player.x && block.x <= player.x + playerWidth) ||
        (blockRight >= player.x && blockRight <= player.x + playerWidth)
      ) {
        if (block.powerUp) {
          // Power-Up: Spielerbreite temporär erhöhen
          playerWidth = initialPlayerWidth * 1.5;
          setTimeout(() => {
            playerWidth = initialPlayerWidth;
          }, 5 * 1000);
        }

        score += pointsForBlock; // Punkte hinzufügen
        resetBlock(block); // Block zurücksetzen
      }
    }

    if (block.y > player.y + playerHeight) {
      resetBlock(block); // Block zurücksetzen, wenn er den Spieler verfehlt
    }
  }
}

// Block zurücksetzen (neue Position und Eigenschaften)
function resetBlock(block) {
  block.y = -100; // Block wieder oben platzieren
  block.x = Math.random() * (canvas.width - blockWidth); // Zufällige X-Position
  block.powerUp = Math.random() < powerUpProbability; // Zufälliges Power-Up
  currentBlockCount += 1; // Block-Zähler erhöhen
}
