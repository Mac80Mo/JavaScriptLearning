const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let i = 0;
let dir = 1;

document.addEventListener("keydown", (event) => {
  console - log(event.code);
  if (event.code == "ArrowLeft") {
    dir = -1 * dir;
  } else if (event.code == "ArrowRight") {
    dir = 1;
  }
});

draw();

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#333";
  context.fillRect(i, 100, 100, 100);
  i += dir * 1;

  requestAnimationFrame(draw);
}
