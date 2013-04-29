//SXS 3D CNV DUO
//HTML5 S3D dual canvas drawing toolkit
// Author: diekus
//date of creation: 25/4/2013
//date of last modification: 25/4/2013

//global variables
var w = window;                         // window object
//var miCanvas = null;                  // jQuery object for canvas
var jsCanvas1 = null;                   // DOM element for first canvas
var jsCanvas2 = null;                   // DOM element for second canvas
var ctx1 = null;                        // first canvas drawing context
var ctx2 = null;                        // seconds canvas drawing context
var fnd = null;                         // background images for the canvas
var imgsPreloaded = true;               // specifies if the drawings on a canvas are ready to start [image preloading problems]
var resPreloaded = false;
var listoBg = false;                    // specifies if the background image has being loaded
var mainHandler = -1;                   // defines the handler that allows the drawing to begin. After all resources are preloaded

//starts the 3d canvas script
$(document).ready(function () {
    prepHTMLDoc();                                      // clears default css properties of HTML elements
    //prep3DCanvas('miCanvas', 'i/fnd.jpg');            // prepares the JS and jQuery objects asociated with the canvas. Also sets a BG image
    prep3DCanvas('miCanvas1', 'miCanvas2', null);       

});

function main() {
    if (imagesPreloaded()) {

        ctx1.fillStyle = '#ff0000';
        ctx2.fillStyle = '#ff0000';
        /*s3DRectangle(10, 10, 50, 50, 0);
        s3DCircle(300, 300, 50, 10);
        s3DImage('http://d24w6bsrhbeh9d.cloudfront.net/photo/aZberGQ_460s_v1.jpg', 100, 100, 10);
        s3DText('diekus', '80px segoe ui,sans-serif', true, '#00ff00', 500, 500, 0);*/

        s3DBeginPath();
        s3DMoveTo(20, 20, 0);
        s3DLineTo(40, 70, 0);
        s3DClosePath();
        s3DStroke();
        

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

//prepares and initializes canvases for side by side drawing
function prep3DCanvas(pCnvName1, pCnvName2, pBgImage) {
    jsCanvas1 = document.getElementById(pCnvName1);
    jsCanvas2 = document.getElementById(pCnvName2);
    ctx1 = jsCanvas1.getContext('2d');
    ctx2 = jsCanvas2.getContext('2d');
    paintBG(pBgImage);

    //miCanvas = $(pCnvName);
    //miCanvas.attr({ width: w.innerWidth, height: w.innerHeight });

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

//NEEDS CHECK
//paints a background  
function paintBG(pSrc) {
    ctx1.save();
    ctx1.scale(0.5, 1);
    //loads the bg image
    fnd = new Image();
    fnd.onload = function () {
        //draws the image
        ctx1.drawImage(fnd, 0, 0);
        ctx1.drawImage(fnd, jsCanvas.width / 2, 0);
        listoBg = true;
    };
    fnd.src = pSrc;
    ctx1.restore();
}

//draws an image
function s3DImage(pSrc, pPosX, pPosY, pHorOffset) {
    ctx1.save();
    ctx2.save();
    ctx1.scale(0.5, 1);
    ctx2.scale(0.5, 1);
    //loads the bg image
    img = new Image();
    img.onload = function () {
        //draws the image
        ctx1.drawImage(this, pPosX + pHorOffset, pPosY);
        ctx2.drawImage(this, pPosX - pHorOffset, pPosY);
    };
    img.src = pSrc;
    ctx1.restore();
    ctx2.restore();
}

//draws a s3d rectangle
function s3DRectangle(pPosX, pPosY, pAncho, pAlto, pHorOffset) {
    //draw original rect with width modification
    ctx1.fillRect((pPosX + pHorOffset) / 2, pPosY, pAncho / 2, pAlto);
    //draw clone
    ctx2.fillRect((pPosX - pHorOffset) / 2, pPosY, pAncho / 2, pAlto);
}

//draws a s3d circle
function s3DCircle(pPosX, pPosY, pRadius, pHorOffset) {
    //ctx1.fillStyle = pColor;
    
    ctx1.scale(0.25, 0.5);
    ctx1.beginPath();
    ctx1.arc((pPosX + pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
    ctx1.fill();
    ctx1.restore();
    ctx1.closePath();

    // ctx1.fillStyle = '#aa0000'; consider for anaglyph future 
    ctx2.scale(0.25, 0.5);
    ctx2.beginPath();
    ctx2.arc((pPosX - pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
    ctx2.fill();
    ctx2.restore();
    ctx2.closePath();
}

//begins a path (stereo)
function s3DBeginPath() {
    ctx1.beginPath();
    ctx2.beginPath();
}

//ends a path (stereo)
function s3DClosePath() {
    ctx1.closePath();
    ctx2.closePath();
}

//stereo lineTo
function s3DLineTo(pPosX, pPosY, pHorOffset) {
    ctx1.lineTo(pPosX+pHorOffset, pPosY);
    ctx2.lineTo(pPosX-pHorOffset, pPosY);
}

//stereo moveTo
function s3DMoveTo(pPosX, pPosY, pHorOffset) {
    ctx1.moveTo(pPosX+pHorOffset, pPosY);
    ctx2.moveTo(pPosX-pHorOffset, pPosY);
}
//stereo stroke
function s3DStroke() {
    ctx1.stroke();
    ctx2.stroke();
}

//draws a s3d arc
function s3DArc(pColor, pPosX, pPosY, pRadius, pStartAngle, pEndAngle, pDirection, pHorOffset) {
    ctx1.fillStyle = pColor;
    startLeftClip();
    ctx1.scale(0.25, 0.5);
    ctx1.beginPath();
    ctx1.arc((pPosX + pHorOffset) * 2, pPosY * 2, pRadius * 2, pStartAngle, pEndAngle, pDirection);
    ctx1.fill();
    ctx1.restore();
    ctx1.closePath();
    ctx1.restore();

    // ctx1.fillStyle = '#aa0000'; consider for anaglyph future 
    startRightClip();
    ctx1.scale(0.25, 0.5);
    ctx1.beginPath();
    ctx1.arc((pPosX + jsCanvas.width - pHorOffset) * 2, pPosY * 2, pRadius * 2, pStartAngle, pEndAngle, pDirection);
    ctx1.fill();
    ctx1.restore();
    ctx1.closePath();
    ctx1.restore();
}

//draws s3d text
function s3DText(pText, pFontStyle, pIsFilled, pColor, pPosX, pPosY, pHorOffset) {
    ctx1.font = pFontStyle;
    ctx1.fillStyle = pColor;
    ctx2.font = pFontStyle;
    ctx2.fillStyle = pColor;
    ctx1.save();

    //set left clipping
    ctx1.scale(0.5, 1);
    //draw original
    if (pIsFilled)
        ctx1.fillText(pText, pPosX + pHorOffset, pPosY);
    else
        ctx1.strokeText(pText, pPosX + pHorOffset, pPosY);
    ctx1.restore();

    //set right clipping
    ctx2.scale(0.5, 1);
    //draw clone
    if (pIsFilled)
        ctx2.fillText(pText, pPosX - pHorOffset, pPosY);
    else
        ctx2.strokeText(pText, pPosX - pHorOffset, pPosY);

    ctx1.restore();
}

//NEEDS CHECK
function starField(pQuant) {
    ctx1.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
    ctx1.fillStyle = 'rgba(255, 255, 255,' + Math.random() + ')';

    var rX = Math.floor((Math.random() * jsCanvas.width) + 1);
    var rY = Math.floor((Math.random() * jsCanvas.height) + 1);
    var rR = Math.floor((Math.random() * 5) + 1);
    var rO = Math.floor((Math.random() * 10) + 1);

    for (var i = 0; i < pQuant; i++) {
        ctx1.fillStyle = 'rgba(255, 255, 255,' + Math.random() + ')';
        rX = Math.floor((Math.random() * jsCanvas.width) + 1);
        rY = Math.floor((Math.random() * jsCanvas.height) + 1);
        rR = Math.floor((Math.random() * 5) + 1);
        rO = Math.floor((Math.random() * 11) + 1);
        s3DCircle(rX, rY, rR, rO);
    }
}