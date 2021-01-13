function preload() {
  // preload() runs once
  img = loadImage('static/Axel_12.jpg');
}

function setup() {
    createCanvas(window.innerHeight, window.innerWidth);
  }
  
  function draw() {
    image(img, 0, 0, width, height);
    // if (mouseIsPressed) {
    //   fill(light, 0, 0);
    // } else {
    //   fill(255);
    // }
    // ellipse(mouseX, mouseY, 80, 80);
  }