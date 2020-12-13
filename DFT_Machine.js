// #################  SETTINGS  #################
let   VELO = 0.01,
      SCALE = 30.0,
      drawData = false,
      customMode = false;
// #################  SETTINGS  #################

let vertices = [];
let renderer;
let font;
let fpsWrapper = document.getElementById("fps");

function preload() {
  font = loadFont("Quicksand.ttf");
}

function setup() {
  createCanvas(document.body.offsetWidth, document.body.offsetHeight);
  
  // Render fourier text
  let points = font.textToPoints("Fourier", 0, 0, 192, {
    sampleFactor: 0.6
  });
  
  const minX = points.reduce((min, p) => p.x < min ? p.x : min, points[0].x);
  const maxX = points.reduce((max, p) => p.x > max ? p.x : max, points[0].x);
  const w = maxX - minX;
  points = points.map(({x, y}) => ({x: x-w/2, y}));
  vertices = points.map(p => new Complex(p.x / SCALE, p.y / SCALE));
  
  // Calc DFT and initiate animation
  renderer = new Renderer(DFT(), vertices);
  renderer.buildEpicycles(vertices.length);
  vertices = [];
}

function draw() {
  background(51);
  translate(width / 2, height / 2);
  
  if (renderer) {
    renderer.render();
  }
  
  if (frameCount % 30 === 1)
    fpsWrapper.innerHTML = `FPS:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${~~frameRate()}<br>Points:&nbsp;&nbsp; ${renderer.epicycles.length}`;
}

function mouseClicked() {
  const x = (mouseX - width/2) / SCALE;
  const y = (mouseY - height/2) / SCALE;
  vertices.push(new Complex(x, y));
  
  renderer = new Renderer(DFT(), vertices);
  renderer.buildEpicycles(vertices.length);
  if (!customMode) {
    VELO = 0.05;
    drawData = true;
    customMode = true;
  }
}

/*
* ###################################################################
* Discrete Fourier Trasformation (DFT) Algorithm
* 1/2𝜋∫ 𝑓(𝑡)𝑒⁻ⁿⁱᵗ𝑑𝑡=𝑐ₙ
*/
function DFT() {
  let func = [];
  for (const n in vertices) {
    let sigma = new Complex(0, 0);
    for (const t in vertices) {
      let unitVector = new Complex(0, 1);
      unitVector = unitVector.scale(-2 * PI * (n-floor(vertices.length/2)) * (t/vertices.length));
      unitVector = unitVector.cexp();
      unitVector = unitVector.mul(vertices[t]);
      unitVector = unitVector.scale(1/vertices.length);
      sigma = sigma.add(unitVector);
    }
    func.push(sigma);
  }
  return func;
}
/*
* ##############################################################
*/
