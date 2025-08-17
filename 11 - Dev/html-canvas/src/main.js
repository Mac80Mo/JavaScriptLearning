const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let x = 0;
let xInc = 1;
const playerWidth = 100; // Breite des Schlägers
const speed = 25; // Geschwindigkeit

document.addEventListener("keydown", (event) => {
  console.log(event.code);

  if (event.code == "ArrowLeft") {
    xInc = -speed;
  } else if (event.code == "ArrowRight") {
    xInc = speed;
  }
});

draw();

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#333";
  context.fillRect(x, canvas.height - 25, playerWidth, 10);
  x += xInc;

  if (x < 0) {
    x = 0;
  }

  if (x + playerWidth >= canvas.width) {
    x = canvas.width - playerWidth;
  }

  xInc = 0;

  requestAnimationFrame(draw);
}
