//SXS 3D CNV SOLO
//HTML5 S3D canvas drawing toolkit
// Author: diekus
//date of creation: 5/4/2013
//date of last modification: 3/5/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 

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
    init();
});

function init() {
    prepHTMLDoc();
    prep3DCanvas('miCanvas1', null);
    sxs3dcnv_main();
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
function s3DText(pText, pFontStyle, pIsFilled, pPosX, pPosY, pHorOffset) {
    ctx.font = pFontStyle;
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