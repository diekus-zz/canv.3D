//SXS 3D CNV SOLO
//HTML5 S3D canvas drawing toolkit
//Author: diekus
//date of creation: 5/4/2013
//date of last modification: 21/11/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 
/*Can manage now several canvases on a page!*/

//global variables
var w = window;                         // window object
var jsCanvas = null;                    // gets the ACTIVE drawing canvas
var ctx = null;                         // ACTIVE canvas drawing context
var imgsPreloaded = true;               // specifies if the drawings on a canvas are ready to start [image preloading problems]
var jsCanvases = null;                  // DOM canvas elements for each canvas to be drawn on
var imagesForDrawing = null;            // array that will contain the images that are needed for drawing
var activeDrawingCanvas = -1;           // specifies the ACTIVE drawing canvas
var canvasNames = new Array();          // array that contains the names of the canvases that will be drawn upon. Layers of canvases

// starts the 3d canvas script. the solo canvases must be initialized before this point
function startSoloCanvas(){
    //if images are required, they must be preloaded in the script that draws. The most exist in an array named imagesForDrawing
    if (imagesForDrawing == null)
        console.log('You must create an array to store the images!');
    else
        preloadImagesForDrawing(imagesForDrawing);
    init();
}

function init() {
    prepHTMLDoc();
    //prepares all the canvases on the document
    jsCanvases = new Array(canvasNames.length);
    for (icnv = 0; icnv < canvasNames.length; icnv++)
    {
        console.log('preparing canvas ' + canvasNames[icnv]);
        jsCanvases[icnv] = prep3DCanvas(canvasNames[icnv]);
    }
    changeActiveCtx(0); //first canvas
    //main funtuion
    sxs3dcnv_main();
}

//preloads images and hides them in html code to be available immediately for drawing
function preloadImagesForDrawing(arrImgs) {
    var ind = 1;
    $.each(arrImgs, function (ind, src) {
        $("body").prepend("<img class='img-src-preload' id='img_" + ind + "' src='" + src + "' />");
        $('.img-src-preload').css('display', 'none');
        ind++;
    });
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
function prep3DCanvas(pCnvName) {
    tCanvas = document.getElementById(pCnvName);
    tctxCanvas = tCanvas.getContext('2d');
    tjqCanvas = $(pCnvName);
    tjqCanvas.attr({ width: w.innerWidth, height: w.innerHeight });
    var objTCanvas = new Array(2);
    objTCanvas[0] = tCanvas;
    objTCanvas[1] = tctxCanvas;
    return objTCanvas;
}

//changes the active drawing context. By default it is the first canvas in the array
function changeActiveCtx(n) {
    try {
        if (n < jsCanvases.length) {
            this.ctx = this.jsCanvases[n][1];
            this.activeDrawingCanvas = n;
            jsCanvas = jsCanvases[n][0];
        }
        else {
            this.ctx = this.jsCanvases[0][1];
            this.activeDrawingCanvas = 0;
            jsCanvas = jsCanvases[0][0];
        }
    } catch (e) {
        console.log('current drawing context nonexistent');
        this.ctx = this.jsCanvases[0][1];
        this.activeDrawingCanvas = 0;
        jsCanvas = jsCanvases[0][0];
    }
}

//converts from degrees to radians
function deg2Rad(degrees) {
    return degrees * Math.PI / 180;
}

//draws an image
/*
ATTENTION: In order to draw an image, these most be preloaded first due to downloading latency. The way this is implemented to make sure they are already in the browser is to create them in <img> tags and hide them.
Use the preloadImgs method to get them into the webpage.
*/
function s3DImage(pImg, pPosX, pPosY, pHorOffset) {
    ctx.save();
    ctx.scale(0.5, 1);
    //draws the image
    ctx.drawImage(pImg, pPosX + pHorOffset, pPosY);
    ctx.drawImage(pImg, pPosX + cWidth - pHorOffset, pPosY);
    ctx.restore();
}

//draws an image from a url. Depending on loading times drawing operations might be faster on the canvas. It is recomended to use s3DImage
function s3DImageFromURL(pSrc, pPosX, pPosY, pHorOffset) {
    ctx.save();
    ctx.scale(0.5, 1);
    //loads the bg image
    img = new Image();
    img.onload = function () {
        //draws the image
        ctx.drawImage(this, pPosX + pHorOffset, pPosY);
        ctx.drawImage(this, pPosX + cWidth - pHorOffset, pPosY);
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

//extracts the content of the canvas as a PNG
function canvasShot() {
    var cnvShot = document.createElement("img");
    cnvShot.src = canvas.toDataURL();
    document.body.appendChild(cnvShot);
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

//SXS 3D CNV ANIM
//animation structure for HTML5 S3D canvas drawing toolkit
// Author: diekus
//date of creation: 6/5/2013
//date of last modification: 21/11/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 
//This works based on the game loop idea. It updates code/variables/positions and then draws upon this.

//animation related variables
var cHeight = null;
var cWidth = null;
var framerate = 1000;

//user defined animation variables go here

function init_sxs3dcnv_anim() {
    /*** SOLO ***/
    cHeight = jsCanvas.height;
    cWidth = jsCanvas.width;

    framerate = 5000 / 1000;
}

function sxs3dcnv_anim_main() {
    //initializes the animation parameters
    init_sxs3dcnv_anim();

    var intLoop = self.setInterval(function () { gUpdate(); }, framerate);
}

//updates - part of game-like loop for animation
function gUpdate() {

    //start example // replace with your code here
    
    gDraw(); //do not remoe this line
}

//draws - part of game-like loop for animation
function gDraw() {
    ctx.clearRect(0, 0, cWidth, cHeight);   // do not remove this line to avoid ghosting/repainting

    //start example // replace with your code here

    //redraw your objects
    
    //end example // your drawing code ends here
}

//stops the ongoing animation
function fermata() {
    clearInterval(intLoop);
}