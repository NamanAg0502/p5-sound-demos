function setup() {
  // put setup code here
  const myCanvas = createCanvas(1150, 500);
  myCanvas.parent('container');
  angleMode(DEGREES);
  s1 = createSlider(1, 10, 6, 1).position(150, 625);
  p1 = createP('Number of ELements').position(150, 590);

  s2 = createSlider(2, 8, 5, 1).position(350, 625);
  p2 = createP('Number of Parts').position(350, 590);

  s3 = createSlider(3, 30, 3, 1).position(550, 625);
  p3 = createP('Amount of Frames').position(550, 590);

  s4 = createSlider(50, 300, 100, 10).position(750, 625);
  p5 = createP('Minimun Radius').position(750, 590);

  s5 = createSlider(50, 300, 200, 10).position(950, 625);
  p5 = createP('Maximum Radius').position(950, 590);

  s6 = createSlider(0.1, 1, 0.1, 0.05).position(1150, 625);
  p6 = createP('Rotation Speed').position(1150, 590);
}

function draw() {
  // put drawing code here
  background(123, 78, 21, 20);
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(6);
  for (let n = 0; n < s1.value(); n++) {
    stroke(150 + n * 20, 100 + n * 5, 50);
    beginShape();
    for (let i = 0; i < 360; i += s3.value()) {
      let rad = map(
        sin(i * s2.value() + frameCount),
        -1,
        1,
        s4.value(),
        s5.value()
      );
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    endShape(CLOSE);
    rotate(frameCount * s6.value());
  }
}
