let volHistory = [];

function setup() {
  createCanvas(1150, 600);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);

  let level = mic.getLevel();
  // console.log(volHistory);

  volHistory.push(level);
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < volHistory.length; i++) {
    let y = map(volHistory[i], 0, 1, height / 2, 0);
    vertex(i, y);
  }
  endShape();

  if (volHistory.length > width) {
    volHistory.splice(0, 1);
  }

  // ellipse(width / 2, height / 2, (level * width) / 2, (level * width) / 2);
}
