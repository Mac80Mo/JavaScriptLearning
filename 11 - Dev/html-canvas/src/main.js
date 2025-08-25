const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let lastDrawTime = 0;
let level = 1;
let gamePaused = false;
let score = 0;
let currentBlockCount = 0;
const pointsForBlock = 0.5;

// Spieler-Variablen
const player = {
  x: 0,
  y: canvas.height - 50,
  xInc: 0,
};

const playerWidth = 100; // Breite des Schlägers
const playerHeight = 10;
const playerSpeed = 1; // Geschwindigkeit

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
const blockSpeed = 0.1;

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
requestAnimationFrame(draw);

function draw(currentTime) {
  const timePassed = currentTime - lastDrawTime;
  console.log(timePassed);
  clearCanvas();

  drawPlayer(timePassed);
  drawBlocks(timePassed);
  drawScore();
  drawLevelCompleted();

  checkForCollision();
  checkForLevelCompleted();

  lastDrawTime = currentTime;
  requestAnimationFrame(draw);
}

function checkForLevelCompleted() {
  if (gamePaused) {
    return;
  }

  if (currentBlockCount >= 15) {
    gamePaused = true;

    setTimeout(() => {
      const success = score >= (currentBlockCount * pointsForBlock) / 2;

      if (success) {
        score = 0;
        currentBlockCount = 0;

        level += 1;
        gamePaused = false;
      }
    }, 5 * 1000);
  }
}

function drawLevelCompleted() {
  if (!gamePaused) {
    return;
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

function drawPlayer(timePassed) {
  context.fillStyle = "#333";
  context.fillRect(player.x, player.y, playerWidth, playerHeight);

  if (gamePaused) {
    return;
  }

  player.x += timePassed * player.xInc;

  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x + playerWidth >= canvas.width) {
    player.x = canvas.width - playerWidth;
  }
}

function drawBlocks(timePassed) {
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    context.fillStyle = "red";
    context.fillRect(block.x, block.y, blockWidth, blockHeight);

    if (!gamePaused) {
      block.y += timePassed * blockSpeed; // Damit der Block runterfällt: blockY + blockSpeed
    }
  }
}

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
