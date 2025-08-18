const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let gamePaused = false;
let score = 0;
let currentBlockCount = 0;
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
};

const blocks = [
  {
    x: 101,
    y: -100,
  },
  {
    x: 250,
    y: 0,
  },
  {
    x: 380,
    y: -200,
  },
  {
    x: 80,
    y: -300,
  },
];

const blockWidth = 10;
const blockHeight = 10;
const blockSpeed = 2;

function addEventListeners() {
  document.addEventListener("keydown", (event) => {
    if (gamePaused) {
      return;
    }
    if (event.code === "ArrowLeft") {
      player.xInc = -playerSpeed;
    } else if (event.code === "ArrowRight") {
      player.xInc = playerSpeed;
    }
  });

  document.addEventListener("keyup", () => {
    player.xInc = 0;
  });
}

addEventListeners();
draw();

function draw() {
  clearCanvas();

  drawPlayer();
  drawBlocks();
  drawScore();

  checkForCollision();
  checkForLevelCompleted();

  requestAnimationFrame(draw);
}

function checkForLevelCompleted() {
  if (gamePaused) {
    return;
  }

  if (currentBlockCount >= 15) {
    gamePaused = true;
  }
}

function drawPlayer() {
  context.fillStyle = "#333";
  context.fillRect(player.x, player.y, playerWidth, playerHeight);

  if (gamePaused) {
    return;
  }

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

    context.fillStyle = "red";
    context.fillRect(block.x, block.y, blockWidth, blockHeight);

    if (!gamePaused) {
      block.y += blockSpeed; // Damit der Block runterfällt: blockY + blockSpeed
    }
  }
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "blue";
  context.fillText(
    `Punkte: ${score.toString()} (${currentBlockCount * pointsForBlock})`,
    canvas.width - 150,
    20
  ); // x, y -> koordinaten
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function checkForCollision() {
  if (gamePaused) {
    return;
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
        resetBlock(block);
        score += pointsForBlock;
      }
    }

    if (block.y > player.y + playerHeight) {
      resetBlock(block);
    }
  }
}

function resetBlock(block) {
  block.y = -100;
  block.x = Math.random() * (canvas.width - blockWidth);
  currentBlockCount += 1;
}
