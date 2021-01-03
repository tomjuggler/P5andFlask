function setup() {
    createCanvas(window.innerHeight, window.innerWidth);
  }
  
  function draw() {
    if (mouseIsPressed) {
      fill(light, 0, 0);
    } else {
      fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
  }