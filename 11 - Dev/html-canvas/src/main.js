const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let score = 0;
const pointsForBlock = 1;

// Spieler-Variablen
let playerX = 0;
let playerInc = 0;
let playerY = canvas.height - 50;
const playerWidth = 100; // Breite des Schlägers
const playerHeight = 10;
const playerSpeed = 5; // Geschwindigkeit

// Gegenstand der Fällt
let blockX = 100;
let blockY = 0;
let blockVisible = true;
const blockWidth = 10;
const blockHeight = 10;
const blockSpeed = 2;

document.addEventListener("keydown", (event) => {
  console.log(event.code);

  if (event.code === "ArrowLeft") {
    playerInc = -playerSpeed;
  } else if (event.code === "ArrowRight") {
    playerInc = playerSpeed;
  }
});

document.addEventListener("keyup", () => {
  playerInc = 0;
});

draw();

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#333";
  context.fillRect(playerX, playerY, playerWidth, playerHeight);
  playerX += playerInc;

  if (playerX < 0) {
    playerX = 0;
  }

  if (playerX + playerWidth >= canvas.width) {
    playerX = canvas.width - playerWidth;
  }

  if (blockVisible) {
    context.fillStyle = "red";
    context.fillRect(blockX, blockY, blockWidth, blockHeight);
    blockY += blockSpeed; // Damit der Block runterfällt: blockY + blockSpeed
  }

  checkForCollision();

  requestAnimationFrame(draw);
}

function checkForCollision() {
  const blockBottom = blockY + blockHeight;

  if (blockVisible && blockBottom >= playerY) {
    const blockRight = blockX + blockWidth;
    if (
      (blockX >= playerX && blockX <= playerX + playerWidth) ||
      (blockRight >= playerX && blockRight <= playerX + playerWidth)
    ) {
      blockVisible = false;
      score += pointsForBlock;
      console.log(`Punkte: ${score.toString()}`);
    }
  }
}
