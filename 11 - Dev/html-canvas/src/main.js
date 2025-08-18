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
const block = {
  x: 101,
  y: 0,
  visible: true,
};

const blocks = [
  {
    x: 101,
    y: 0,
    visible: true,
  },
  {
    x: 250,
    y: 0,
    visible: true,
  },
  {
    x: 380,
    y: 0,
    visible: true,
  },
];

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
  drawBlocks();
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

function drawBlocks() {
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];
    if (block.visible) {
      context.fillStyle = "red";
      context.fillRect(block.x, block.y, blockWidth, blockHeight);
      block.y += blockSpeed;
    } // Damit der Block runterfällt: blockY + blockSpeed
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
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    const blockBottom = block.y + blockHeight;

    if (block.visible && blockBottom >= player.y) {
      const blockRight = block.x + blockWidth;
      if (
        (block.x >= player.x && block.x <= player.x + playerWidth) ||
        (blockRight >= player.x && blockRight <= player.x + playerWidth)
      ) {
        block.visible = false;
        score += pointsForBlock;
      }
    }
  }

  if (block.y > player.y + playerHeight) {
    blockVisible = false;
  }
}
