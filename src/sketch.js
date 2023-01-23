let song, fft, img;
let particles = [];

function preload() {
  song = loadSound('./cairo-21956.mp3');
  img = loadImage('./bg.jpg');
}

function setup() {
  const myCanvas = createCanvas(1150, 600);
  myCanvas.parent('container');
  angleMode(DEGREES);
  imageMode(CENTER);
  fft = new p5.FFT(0.3);

  noLoop();
}

function draw() {
  background(0, 0, 0);
  stroke(255);
  strokeWeight(2);
  noFill();

  translate(width / 2, height / 2);

  fft.analyze();
  amp = fft.getEnergy(20, 200);

  push();
  if (amp > 230) {
    rotate(random(-0.5, 0.5));
  }

  image(img, 0, 0, width, height);
  pop();

  let wave = fft.waveform();

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let rad = map(wave[index], -1, 1, 150, 350);
      let x = rad * sin(i) * t;
      let y = rad * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  let p = new Particle();
  particles.push(p);

  for (let j = particles.length - 1; j >= 0; j--) {
    if (!particles[j].edges()) {
      particles[j].update(amp > 230);
      particles[j].show();
    } else {
      particles.splice(j, 1);
    }
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.color = [
      random(200, 225),
      random(200, 225),
      random(200, 225),
      random(200, 225),
    ];
    this.w = random(3, 5);
  }
  edges() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}
