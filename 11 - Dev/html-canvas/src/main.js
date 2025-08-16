const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

for (let i = 0; i < 100; i++) {
  draw(i);
}

function draw(i) {
  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#333";
  context.fillRect(i, i, 100, 100);
}
