const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let score = 0;
const pointsForBlock = 1;

// Spieler-Variablen
const player = {
  x: 0,
  y: canvas.height - 50,
  xInc: 0,
};

const playerWidth = 100; // Breite des Schlägers
const playerHeight = 10;
const playerSpeed = 5; // Geschwindigkeit

// Block-Variablen
let blockX = 100;
let blockY = 0;
let blockVisible = true;
const blockWidth = 10;
const blockHeight = 10;
const blockSpeed = 2;

document.addEventListener("keydown", (event) => {
  console.log(event.code);

  if (event.code === "ArrowLeft") {
    player.xInc = -playerSpeed;
  } else if (event.code === "ArrowRight") {
    player.xInc = playerSpeed;
  }
});

document.addEventListener("keyup", () => {
  player.xInc = 0;
});

draw();

function draw() {
  clearCanvas();

  drawPlayer();
  drawBlock();
  drawScore();

  checkForCollision();

  requestAnimationFrame(draw);
}

function drawPlayer() {
  context.fillStyle = "#333";
  context.fillRect(player.x, player.y, playerWidth, playerHeight);
  player.x += player.xInc;

  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x + playerWidth >= canvas.width) {
    player.x = canvas.width - playerWidth;
  }
}

function drawBlock() {
  if (blockVisible) {
    context.fillStyle = "red";
    context.fillRect(blockX, blockY, blockWidth, blockHeight);
    blockY += blockSpeed; // Damit der Block runterfällt: blockY + blockSpeed
  }
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "blue";
  context.fillText(`Punkte: ${score.toString()}`, canvas.width - 100, 20); // x, y -> koordinaten
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function checkForCollision() {
  const blockBottom = blockY + blockHeight;

  if (blockVisible && blockBottom >= player.y) {
    const blockRight = blockX + blockWidth;
    if (
      (blockX >= player.x && blockX <= player.x + playerWidth) ||
      (blockRight >= player.x && blockRight <= player.x + playerWidth)
    ) {
      blockVisible = false;
      score += pointsForBlock;
    }
  }

  if (blockY > player.y + playerHeight) {
    blockVisible = false;
  }
}
