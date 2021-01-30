
let inImg = [];
// PImage[] inImg;
let patName = pattern;
let numImages = light; //from the server please
let count = 0;
var tiempoEspera;
var tiempoInicio;
var r = 255;
var g = 0;
var b = 0;
var a = 255;

function preload() {
  // inImg = new PImage[numImages];
  for (var i = 0; i < numImages; i++) {
    var imageName = patName + i + ".png";
    inImg[i] = loadImage('static/' + imageName);
    // inImg[i] = loadImage('static/0.jpg');
    // inImg[i] = loadImage("{{url_for('static', filename='0.jpg')}}")
    // inImg[i] = loadImage(staticPath + i + ".jpg"); //p5 not working with gif images??
    //    inImg[i] = loadImage("/home/tom/Documents/PROGRAMMING/PROCESSING/processing-2.2.1/sketchbook/TomScripts/K8Remote/K8RemoteProcessingJSDemo/data/0.jpg");
  }
  // inImg[0] = loadImage('static/0.jpg');
  // inImg[0] = loadImage('static/Axel_12.jpg'); //ok this works
}



function setup() {
  createCanvas(window.innerHeight, window.innerWidth);
  tiempoInicio = 0;
  tiempoEspera = 2; // 3 segundos
  // background(0);
  colorMode(RGB, 255, 255, 255, 255);
  let c = color(0, 126, 255, 102);
  for (var i = 0; i < numImages; i++) {
    for (var j = 0; j < inImg.width; j++) {
      for (var k = 0; k < inImg.height; k++) {

        //  inImg.pixels[j*k] = c);
      }
    }
    // inImg[i].filter(INVERT); //done in bash now!

  }
  // tint(0,0,0,2);
  background(0);


}

function draw() {

  let d = pixelDensity();
  if (millis() - tiempoInicio > tiempoEspera) {
    count++;
    // g = int(random(0, 255));
    // r = 255-g;
    // print(count);
    if (count > numImages) {
      count = 0;
      // print("count is 0");
    }
    if (count < numImages) {
      // print(count);
      //  inImg[count].filter(INVERT);
      image(inImg[count], 0, 20);
      loadPixels();

      for (let y = 0; y < inImg[count].height; y++) {
        for (let x = 0; x < inImg[count].width; x++) {
          for (let i = 0; i < d; i++) {
            for (let j = 0; j < d; j++) {
              index = 4 * ((y * d + j) * width * d + (x * d + i));
              if (pixels[index + 1] > 100 && pixels[index] < 100) {
                pixels[index] = r;
                pixels[index + 1] = g;
                pixels[index + 2] = b;
                pixels[index + 3] = a;
              }


            }
          }
        }
      }
      updatePixels();
      //juggler face:
      //    rectMode(CENTER);
      // fill(0);
      // ellipse(198, 100, 82, 101); //face
      //    rectMode(CORNER);
      stroke(200, 200, 200);
      line(180, 120, 215, 120); //mouth
      ellipse(185, 80, 10, 10); //eye
      ellipse(205, 80, 10, 10); //eye
      point(185, 80); //eye
      point(205, 80); //eye
      line(192, 90, 192, 95);
      line(192, 95, 196, 95);
    }

    tiempoInicio = millis();
  }
  // filter(INVERT);
  // count++;
  // if(count > numImages){
  //   count = 0;
  // }

  // if(count < numImages){
  //   for(var t = 0; t < 10; t++){
  //     image(inImg[count], 0, 0);
  //   }    
  // }

}
function mousePressed() {

  // preload();
  // print("preload?");
  //preload() can't be set here, or doesn't work..
  //maybe save all images as different names on server, then call those with a variable! 
} 