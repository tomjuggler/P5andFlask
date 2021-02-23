
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

//patterns variables: 
var patternCounter = 0; //will this overflow?
var interval = 1000;
var threeWay = 0;
var rainbowWay = 0;

//iterator for different patterns
var patternIter = 0;
var maxPatterns = 13;

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
  createCanvas(window.innerWidth, window.innerHeight);
  tiempoInicio = 0;
  tiempoEspera = 1; // 3 segundos
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
  patternChooser();
  // background(random(255), random(200), random(255));
  fill(0);
  stroke(0);
  rect(0, 0, width, 20);
  rect(inImg[0].width, 0, width, height);
  rect(0, inImg[0].height + 20, width, height);
  let d = pixelDensity();
  if (millis() - tiempoInicio > tiempoEspera) {
    count++;
    // g = int(random(0, 255));
    // r = 255-g;
    // print(count);
    if (count >= numImages) {
      count = 0;
      // print("count is 0");
    }
    if (count < numImages) {
      // print(count);
      //  inImg[count].filter(INVERT);

      image(inImg[count], 0, 20);
      loadPixels();
      /*
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
            */
      //juggler face:
      //    rectMode(CENTER);
      // fill(0);
      // ellipse(198, 100, 82, 101); //face
      //    rectMode(CORNER);
      stroke(200, 200, 200);
      fill(100);
      bezier(180, 110, 180, 120, 215, 120, 215, 110); //mouth
      fill(0);
      ellipse(185, 80, 20, 20); //eyeglass
      ellipse(205, 80, 20, 20); //eyeglass
      ellipse(185, 80, 10, 10); //eye
      ellipse(205, 80, 10, 10); //eye
      line(215, 80, 235, 74);
      line(175, 80, 166, 75);
      strokeWeight(2);
      point(185, 80); //eye
      point(205, 80); //eyej
      // point(186, 80); //eye
      // point(206, 80); //eye
      // point(186, 81); //eye
      // point(205, 81); //eye
      // point(186, 81); //eye
      // point(206, 81); //eye
      line(192, 92, 192, 97);
      line(192, 97, 196, 97);
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
  patternIter++;
  if(patternIter > maxPatterns){
    patternIter = 0;
  }
  // preload();
  // print("preload?");
  //preload() can't be set here, or doesn't work..
  //maybe save all images as different names on server, then call those with a variable! 
}


////////////////////////////////////// PATTERNS ///////////////////////////////////////////////////////////

function patternChooser(){
  switch(patternIter){
    case 0:
      fade();
    break;
    case 1: 
      strobePlus();
    break;
    case 2: 
      RGBStrobe();
    break;
    case 3: 
      rainbow();
    break;
    case 4: 
      halfStrobe();
    break;
    case 5: 
      GRStrobe();
    break;
    case 6: 
      BGStrobe();
    break;
    case 7: 
      red2();
    break;
    case 8: 
      green2();
    break;
    case 9:
      blue2();
    break;
    case 10: 
      cyan();
    break;
    case 11: 
      yellow();
    break;
    case 12:
      magenta();
    break;
    case 13: 
      white();
    break;

    default:
      red2();
    break;
  }
}
function fade() {
  patternCounter++;
  if (patternCounter % 10 > 0) {
    colorMode(HSB, 100);
    background(patternCounter % 100, 100, 100);
    // rect(0, rectSize*htCount+rectSize, 400, 450);
    colorMode(RGB, 100);
  }
}

function strobePlus(){
  background(random(255), random(255), random(255));
  // rect(0, rectSize*htCount+rectSize, 400, 450);
}

function RGBStrobe() {
  console.log("RGB?");
  patternCounter++;
  // if(patternCounter > 9000){
    // patternCounter = 0;
    console.log("patternCounter is: " + patternCounter%interval);
  // }
  if (patternCounter % interval > 0) {
    if (threeWay == 0) {
      background(255, 0, 0);
      //  rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (threeWay == 1) {
      background(0, 255, 0);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (threeWay == 2) {
      background(0, 0, 255);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    }
    threeWay++;
    if (threeWay > 2) {
      threeWay = 0;
    }
  }

}

function rainbow() {
  patternCounter++;
  if (patternCounter % interval > 0) {
    if (rainbowWay == 0) {
      background(255, 0, 0);
      //  rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 1) {
      background(0, 255, 0);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 2) {
      background(0, 0, 255);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 3) {
      background(0, 255, 255);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 4) {
      background(255, 255, 0);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 5) {
      background(255, 0, 255);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    }
    rainbowWay++;
    if (rainbowWay > 5) {
      rainbowWay = 0;
    }
  }
}

function halfStrobe() {
  patternCounter++;
  if (patternCounter % interval > 0) {
    if (rainbowWay == 0) {
      background(255, 0, 0);
      //  rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 1) {
      background(0, 255, 0);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 2) {
      background(0, 0, 255);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 3) {
      background(220, 220, 220);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 4) {
      background(220, 220, 220);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (rainbowWay == 5) {
      background(220, 220, 220);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    }
    rainbowWay++;
    if (rainbowWay > 5) {
      rainbowWay = 0;
    }
  }
}

function GRStrobe() {
  patternCounter++;
  var longInterval = interval * 100;
  if (patternCounter % longInterval > 0) { //works the same without this loop... not understanding something here
    if (threeWay == 0) {
      background(255, 0, 0);
      //  rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (threeWay == 1) {
      background(0, 255, 0);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    }
    threeWay++;
    if (threeWay > 1) {
      threeWay = 0;
    }
  }
}

function BGStrobe() {
  patternCounter++;
  if (patternCounter % interval > 0) {
    if (threeWay == 0) {
      background(0, 0, 255);
      //  rect(0, rectSize*htCount+rectSize, 400, 450);
    } else if (threeWay == 1) {
      background(0, 255, 0);
      // rect(0, rectSize*htCount+rectSize, 400, 450);
    }
    threeWay++;
    if (threeWay > 1) {
      threeWay = 0;
    }
  }
}

function off() {
  background(0, 0, 0);
  // rect(0, rectSize*htCount+rectSize, 400, 450);
}

function red2(){
  background(255, 0, 0);
}
function green2(){
  background(0, 255, 0);
}
function blue2(){
  background(0, 0, 255);
}
function cyan(){
  background(0, 255, 255);
}
function yellow(){
  background(255, 255, 0);
}
function magenta(){
  background(255, 0, 255);
}
function white(){
  background(255, 255, 255);
}

