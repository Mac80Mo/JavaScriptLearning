const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

let i = 0;

draw();

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#333";
  context.fillRect(i, i, 100, 100);
  i++;

  requestAnimationFrame(draw);
}
