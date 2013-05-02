//SXS 3D CNV SOLO
//HTML5 S3D canvas drawing toolkit
// Author: diekus
//date of creation: 5/4/2013
//date of last modification: 25/4/2013

//global variables
var w = window;                         // window object
var miCanvas = null;                    // jQuery object for canvas
var jsCanvas = null;                    // DOM element for canvas
var ctx = null;                         // canvas drawing context
var fnd = null;                         // background images for the canvas
var imgsPreloaded = true;               // specifies if the drawings on a canvas are ready to start [image preloading problems]
var resPreloaded = false;               //
var listoBg = false;                    // specifies if the background image has being loaded
var mainHandler = -1;                   // defines the handler that allows the drawing to begin. After all resources are preloaded

//starts the 3d canvas script
$(document).ready(function () {
    prepHTMLDoc();                                  // clears default css properties of HTML elements
    //prep3DCanvas('miCanvas', 'i/fnd.jpg');          // prepares the JS and jQuery objects asociated with the canvas. Also sets a BG image
    prep3DCanvas('miCanvas1', null);

});

function main() {
    if (imagesPreloaded()) {

        objectField(200, 35, 3);
        ctx.fillStyle = '#D2A400';
        ctx.strokeStyle = '#ff0000';

        //s3DPolygon(1900, 100, 50, 8, 5);

        /*
        //flower
        var len = 20;
        ctx.beginPath();
        
        
        ctx.translate(300, 300);
        
        ctx.rotate(deg2Rad(0));
        
        for(var i = 0; i < 8;i++)
        {
          ctx.rotate(deg2Rad(45));
          ctx.moveTo(0,0);
        ctx.lineTo(len, 0);
        ctx.lineTo(len, len);
        ctx.lineTo(0, 0);
        }
        
        
        ctx.stroke();
        ctx.endPath();
        */



        //prueba CR - CAT
        /*
          var colCostaRica = '#003f88';
          var colCatalunya = '#FFC800';
  
          //gradientes
          var grdCR = ctx.createRadialGradient(900, 300, 200, 100, 600, 1000);
          grdCR.addColorStop(0, '#003f88');
          grdCR.addColorStop(1, '#002857');
  
          var grdCat = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
          grdCat.addColorStop(0, '#FFC800');
          grdCat.addColorStop(1, '#cea200');
  
          //franja titulo
          ctx.fillStyle = '#DDDDDD';
          s3DRectangle(0, 0, 220, jsCanvas.height, 0);
          ctx.fillStyle = '#CCCCCC';
          ctx.fillRect(0, 0, jsCanvas.width, 150);
  
  
          //noms
          s3DText('Costa Rica', '35px segoe ui,sans-serif', true, '#000000', 900, 80, 10);
          s3DText('Catalunya', '35px segoe ui,sans-serif', true, '#000000', 300, 80, 10);
  
          ctx.save();
          //ctx.rotate(deg2Rad(90));
  
          s3DText('Territorio', '25px segoe ui,sans-serif', true, '#000000', 50, 310, 0);
          s3DText('Población', '25px segoe ui,sans-serif', true, '#000000', 50, 510, 0);
          ctx.restore();
  
  
          //territori
          ctx.fillStyle = grdCR;
          s3DCircle(colCostaRica, 1000, 300, 127.75, 8);
          ctx.fillStyle = grdCat;
          s3DCircle(colCatalunya, 400, 300, 80.25, 0);
          //poblacio
          ctx.fillStyle = grdCR;
          s3DCircle(colCostaRica, 1000, 500, 53.75, 0);
          ctx.fillStyle = grdCat;
          s3DCircle(colCatalunya, 400, 500, 93.75, 8);
          //banderes
          s3DImage('http://diekus.net/i/banderaCostaRica.png', 550, 40, 5);
          s3DImage('http://diekus.net/i/banderaCatalunya.png', 250, 40, 5);
  
          //cants territori
          s3DText('51k km²', '25px segoe ui,sans-serif', true, '#ffffff', 960, 310, 10);
          s3DText('32k km²', '25px segoe ui,sans-serif', true, '#000000', 360, 310, 0);
  
          //cants poblacio
          s3DText('4.3 mill', '25px segoe ui,sans-serif', true, '#ffffff', 960, 510, 0);
          s3DText('7.5 mill', '25px segoe ui,sans-serif', true, '#000000', 360, 510, 10);
          */



        //s3DArc('#132798', 100, 100, 50, 0, 2*Math.PI, true, 10);
        //s3DRectangle('#0096FF', 200, 50, 100, 100, 10);

        /*ctx.fillStyle = '#789123';
        ctx.beginPath();
        ctx.arc(200, 200, 15, 0, 2*Math.PI, true);
        ctx.scale(0.5,1);
        ctx.arc(300, 300, 15, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.closePath();
          
        ctx.scale(0.5,1);
        ctx.beginPath();
        ctx.arc(300, 300, 15, 0, 2*Math.PI, true);
        ctx.fill();
          ctx.closePath();*/

        /*ctx.fillRect(100,100, 30, 30);
        
        ctx.fillRect(100,100, 30, 30);
        ctx.fillRect(100*2,200, 30*2, 30);*/

        /*ctx.fillStyle = '#789123';
        ctx.beginPath();
        ctx.arc(200, 200, 15, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.closePath();*/

        //s3DRectangle('#0096FF', 1700, 100, 400, 400, 5);
        //s3DRectangle('#ee96ee', 1700, 200, 400, 400, 10);
        //s3DArc('#5A0FC8', 200, 200, 100, 0, 2 * Math.PI, true, 5);
        //s3DText('adeu bona nit', '80px segoe ui,sans-serif', true, '#E05D5D', 1600, 450, 10);
        //s3DImage('i/img1.jpg', 50, 70, 7);

        //concentric grey toned circles
        /*s3DArc('#111111', 250, 250, 150, 0, 2 * Math.PI, true, 0);
        s3DArc('#333333', 260, 260, 125, 0, 2 * Math.PI, true, 5);
        s3DArc('#555555', 270, 270, 100, 0, 2 * Math.PI, true, 10);
        s3DArc('#777777', 280, 280, 75, 0, 2 * Math.PI, true, 15);
        s3DArc('#999999', 290, 290, 50, 0, 2 * Math.PI, true, 20);

        s3DArc('#111111', 750, 250, 150, 0, 2 * Math.PI, true, 0);
        s3DArc('#333333', 740, 260, 125, 0, 2 * Math.PI, true, 5);
        s3DArc('#555555', 730, 270, 100, 0, 2 * Math.PI, true, 10);
        s3DArc('#777777', 720, 280, 75, 0, 2 * Math.PI, true, 15);
        s3DArc('#999999', 710, 290, 50, 0, 2 * Math.PI, true, 20);*/

        //s3DRectangle('#0096FF', 1800, 600, 200, 200, 12);
        //s3DArc('#777777', 1800, 280, 100, 0, 2 * Math.PI, true, 10);
        //s3DRectangle('#44342F', 1800, 200, 150, 150, 6);
        //s3DText('diego gonzalez', '80px segoe ui,sans-serif', '#ff0000', 1650, 450, 5);

        /*ctx.fillStyle = '#5A0FC8';
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = '#64FF00';
        ctx.arc(200, 200, 20, 0, 2 * Math.PI, true);
        ctx.fill();*/

        /*ctx.fillText('adeu bona nit que vagi be', 1750, 300);
        ctx.fillText('adeu bona nit que vagi be', 1750, 300);
        ctx.fillText('adeu bona nit que vagi be', 1750, 300);

        //end
        clearInterval(mainHandler);*/




    }
}

//prepares the html document to acomodate a side by side experience
function prepHTMLDoc() {
    $('body').css(
        {
            'margin': '0',
            'padding': '0',
            'border': '0',
            'outline': '0',
            'font-size': '0',
            'vertical-align': 'baseline',
            'background': 'transparent'
        });
}

//prepares and initializes canvas for side by side drawing
function prep3DCanvas(pCnvName, pBgImage) {
    jsCanvas = document.getElementById(pCnvName);
    ctx = jsCanvas.getContext('2d');
    paintBG(pBgImage);

    miCanvas = $(pCnvName);
    miCanvas.attr({ width: w.innerWidth, height: w.innerHeight });

    mainHandler = setInterval(main(), 100);
}

//converts from degrees to radians
function deg2Rad(degrees) {
    return degrees * Math.PI / 180;
}

//specifies if all resources have being loaded
function resourcesPreloaded() {
    if (imgsPreloaded)
        resPreloaded = true;
    return resPreloaded;
}

//checks if all the requiered images are downloaded
function imagesPreloaded() {
    if (listoBg)
        imgsPreloaded = true;
    return imgsPreloaded;
}

//paints a background  
function paintBG(pSrc) {
    ctx.save();
    ctx.scale(0.5, 1);
    //loads the bg image
    fnd = new Image();
    fnd.onload = function () {
        //draws the image
        ctx.drawImage(fnd, 0, 0);
        ctx.drawImage(fnd, jsCanvas.width / 2, 0);
        listoBg = true;
    };
    fnd.src = pSrc;
    ctx.restore();
}

//draws an image
function s3DImage(pSrc, pPosX, pPosY, pHorOffset) {
    ctx.save();
    ctx.scale(0.5, 1);
    //loads the bg image
    img = new Image();
    img.onload = function () {
        //draws the image
        ctx.drawImage(this, pPosX + pHorOffset, pPosY);
        ctx.drawImage(this, pPosX + (jsCanvas.width / 2) - pHorOffset, pPosY);
    };
    img.src = pSrc;
    ctx.restore();
}

//sets left clipping in the canvas 
function startLeftClip() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(jsCanvas.width / 2, 0);
    ctx.lineTo(jsCanvas.width / 2, jsCanvas.height);
    ctx.lineTo(0, jsCanvas.height);
    ctx.closePath();
    ctx.clip();
}


//sets right clipping in the canvas 
function startRightClip() {

    ctx.save();
    ctx.beginPath();
    ctx.moveTo((jsCanvas.width) / 2, 0);
    ctx.lineTo(jsCanvas.width, 0);
    ctx.lineTo(jsCanvas.width, jsCanvas.height);
    ctx.lineTo(jsCanvas.width / 2, jsCanvas.height);
    ctx.closePath();
    ctx.clip();
}

//draws a s3d rectangle
function s3DRectangle(pPosX, pPosY, pAncho, pAlto, pHorOffset) {
    //draw original rect with width modification
    startLeftClip();
    ctx.fillRect((pPosX + pHorOffset) / 2, pPosY, pAncho / 2, pAlto);
    ctx.restore();

    //draw clone
    startRightClip();
    ctx.fillRect((jsCanvas.width + pPosX - pHorOffset) / 2, pPosY, pAncho / 2, pAlto);
    ctx.restore();
}

//draws a s3d arc
function s3DArc(pColor, pPosX, pPosY, pRadius, pStartAngle, pEndAngle, pDirection, pHorOffset) {
    ctx.fillStyle = pColor;
    startLeftClip();
    ctx.scale(0.25, 0.5);
    ctx.beginPath();
    ctx.arc((pPosX + pHorOffset) * 2, pPosY * 2, pRadius * 2, pStartAngle, pEndAngle, pDirection);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    ctx.restore();

    // ctx.fillStyle = '#aa0000'; consider for anaglyph future 
    startRightClip();
    ctx.scale(0.25, 0.5);
    ctx.beginPath();
    ctx.arc((pPosX + jsCanvas.width - pHorOffset) * 2, pPosY * 2, pRadius * 2, pStartAngle, pEndAngle, pDirection);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    ctx.restore();
}

//draws a s3d circle
function s3DCircle(pPosX, pPosY, pRadius, pHorOffset) {
    //ctx.fillStyle = pColor;
    startLeftClip();
    ctx.scale(0.25, 0.5);
    ctx.beginPath();
    ctx.arc((pPosX + pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    ctx.restore();

    // ctx.fillStyle = '#aa0000'; consider for anaglyph future 
    startRightClip();
    ctx.scale(0.25, 0.5);
    ctx.beginPath();
    ctx.arc((pPosX + jsCanvas.width - pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    ctx.restore();
}

//draws s3d text
function s3DText(pText, pFontStyle, pIsFilled, pColor, pPosX, pPosY, pHorOffset) {
    ctx.font = pFontStyle;
    ctx.fillStyle = pColor;
    ctx.save();

    //set left clipping
    startLeftClip();
    ctx.scale(0.5, 1);
    //draw original
    if (pIsFilled)
        ctx.fillText(pText, pPosX + pHorOffset, pPosY);
    else
        ctx.strokeText(pText, pPosX + pHorOffset, pPosY);
    ctx.restore();

    //set right clipping
    startRightClip();
    ctx.scale(0.5, 1);
    //draw clone
    if (pIsFilled)
        ctx.fillText(pText, jsCanvas.width + pPosX - pHorOffset, pPosY);
    else
        ctx.strokeText(pText, jsCanvas.width + pPosX - pHorOffset, pPosY);
    ctx.restore();

    ctx.restore();
}

//draws a s3D poligon
function s3DPolygon(pCentX, pCentY, pRadius, pSides, pHorOffset) {
    startLeftClip();
    ctx.scale(0.5, 1);
    polygon(pSides, pCentX + pHorOffset, pCentY, pRadius, Math.PI / 4, true);
    ctx.restore();
    ctx.restore();

    startRightClip();
    ctx.scale(0.5, 1);
    polygon(pSides, pCentX + jsCanvas.width - pHorOffset, pCentY, pRadius, Math.PI / 4, true);
    ctx.restore();
    ctx.restore();
}

//draws a polygon
function polygon(n, x, y, r, angle, counterclockwise) {
    ctx.beginPath();
    angle = angle || 0;
    counterclockwise = counterclockwise || false;
    // Compute vertex position and begin a subpath there
    ctx.moveTo(x + r * Math.sin(angle),
    y - r * Math.cos(angle));
    var delta = 2 * Math.PI / n; // Angle between vertices
    for (var i = 1; i < n; i++) { // For remaining vertices
        // Compute angle of this vertex
        angle += counterclockwise ? -delta : delta;
        // Compute position of vertex and add a line to it
        ctx.lineTo(x + r * Math.sin(angle),
        y - r * Math.cos(angle));
    }
    ctx.closePath(); // Connect last vertex back to the first
    ctx.fill();
    ctx.stroke();
}

//example drawing. Star fields
function objectField(pQuant, maxRadius, objectType) {
    ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255,' + Math.random() + ')';

    var rX = Math.floor((Math.random() * jsCanvas.width) + 1);
    var rY = Math.floor((Math.random() * jsCanvas.height) + 1);
    var rR = Math.floor((Math.random() * maxRadius) + 1);
    var rO = Math.floor((Math.random() * 10) + 1);

    for (var i = 0; i < pQuant; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255,' + Math.random() + ')';
        rX = Math.floor((Math.random() * jsCanvas.width) + 1);
        rY = Math.floor((Math.random() * jsCanvas.height) + 1);
        rR = Math.floor((Math.random() * maxRadius) + 1);
        rO = Math.floor((Math.random() * 10) + 1);

        switch (objectType) {
            case 0: // circles
                s3DCircle(rX, rY, rR, rO);
                break;
            case 3: // triangles
                s3DPolygon(rX, rY, rR, 3, rO);
                break;
            case 4: // diamond
                s3DPolygon(rX, rY, rR, 4, rO);
                break;
            case 5: // pentagon
                s3DPolygon(rX, rY, rR, 5, rO);
                break;
            case 6: // hexagon
                s3DPolygon(rX, rY, rR, 6, rO);
                break;
            case 7: // heptagon
                s3DPolygon(rX, rY, rR, 7, rO);
                break;
            case 8: // octogon
                s3DPolygon(rX, rY, rR, 8, rO);
                break;
                
            default:

        }
        
    }
}