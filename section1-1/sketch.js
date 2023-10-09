function setup() {
  createCanvas(128,128);
}

function draw() {
  background(0);
  strokeWeight(4);
  fill(100, 30, 50);
  triangle(12,120,116,120,116,10);
  fill(90, 160, 23);
  triangle(0,99,22,108,106,0);
  fill(255);
  textSize(32);
  textFont("serif");
  text("46", 68, 100);
}
