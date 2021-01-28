
let inImg = [];
// PImage[] inImg;
let patName = pattern;
let numImages = light; //from the server please
let count = 0;
var tiempoEspera;
var tiempoInicio;
function preload() {
  // inImg = new PImage[numImages];
  for (var i = 0; i < numImages; i++) {
    var imageName = patName + i + ".jpg";
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
  tiempoEspera = 3; // 3 segundos
  // background(0);
  // for (var i = 0; i < numImages; i++) {
  // inImg[i].filter(INVERT); //done in bash now!
  // }
}

function draw() {
  if (millis() - tiempoInicio > tiempoEspera) {
    count++;
    if (count > numImages) {
      count = 0;
    }
    if (count < numImages) {
      //  inImg[count].filter(INVERT);
      image(inImg[count], 0, 20);
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
    print("preload?");
    //preload() can't be set here, or doesn't work..
    //maybe save all images as different names on server, then call those with a variable! 
} 