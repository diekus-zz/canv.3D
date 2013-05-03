//SXS 3D CNV DUO
//HTML5 S3D dual canvas drawing toolkit
// Author: diekus
//date of creation: 25/4/2013
//date of last modification: 3/5/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 

//global variables
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
    init();
});

function init() {
    prepHTMLDoc();                                      // clears default css properties of HTML elements
    prep3DCanvas('miCanvas1', 'miCanvas2', null);
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

//prepares and initializes canvases for side by side drawing
function prep3DCanvas(pCnvName1, pCnvName2, pBgImage) {
    jsCanvas1 = document.getElementById(pCnvName1);
    jsCanvas2 = document.getElementById(pCnvName2);
    ctx1 = jsCanvas1.getContext('2d');
    ctx2 = jsCanvas2.getContext('2d');
    paintBG(pBgImage);
}

//converts from degrees to radians
function deg2Rad(degrees) {
    return degrees * Math.PI / 180;
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

//performs a dual canvas save
function duoSave() {
    ctx1.save();
    ctx2.save();
}

//performs a dual canvas restores
function duoRestore() {
    ctx1.restore();
    ctx2.restore();
}

//image needs to check source
//draws an image
function s3DImage(pSrc, pPosX, pPosY, pHorOffset) {
    duoSave();
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
    duoRestore();
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
    ctx1.scale(0.25, 0.5);
    ctx1.beginPath();
    ctx1.arc((pPosX + pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
    ctx1.fill();
    ctx1.restore();
    ctx1.closePath();

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
    ctx1.lineTo((pPosX + pHorOffset)/2, pPosY);
    ctx2.lineTo((pPosX - pHorOffset)/2, pPosY);
}

//stereo moveTo
function s3DMoveTo(pPosX, pPosY, pHorOffset) {
    ctx1.moveTo((pPosX + pHorOffset)/2, pPosY);
    ctx2.moveTo((pPosX - pHorOffset)/2, pPosY);
}
//stereo stroke
function s3DStroke() {
    ctx1.stroke();
    ctx2.stroke();
}

//stereo fill
function s3DFill() {
    ctx1.fill();
    ctx2.fill();
}

//sets the stereo color
function duoSetStyle(pFill, pStroke) {
    ctx1.fillStyle = pFill;
    ctx2.fillStyle = pFill;
    ctx1.strokeStyle = pStroke;
    ctx2.strokeStyle = pStroke;
}

//draws a s3d arc
function s3DArc(pPosX, pPosY, pRadius, pStartAngle, pEndAngle, pDirection, pHorOffset) {

    ctx1.scale(0.5, 0.5);
    ctx1.arc(pPosX + pHorOffset, pPosY*2 , pRadius , pStartAngle, pEndAngle, pDirection);
    ctx1.restore();

    ctx2.scale(0.5, 0.5);
    ctx2.arc(pPosX - pHorOffset, pPosY*2 , pRadius , pStartAngle, pEndAngle, pDirection);
    ctx2.restore();
}

//draws s3d text
function s3DText(pText, pFontStyle, pIsFilled, pPosX, pPosY, pHorOffset) {
    ctx1.font = pFontStyle;

    ctx2.font = pFontStyle;

    ctx1.save();

    //set left clipping
    ctx1.scale(0.25, 0.5);
    //draw original
    if (pIsFilled)
        ctx1.fillText(pText, pPosX + pHorOffset, pPosY);
    else
        ctx1.strokeText(pText, pPosX + pHorOffset, pPosY);
    ctx1.restore();

    //set right clipping
    ctx2.scale(0.25, 0.5);
    //draw clone
    if (pIsFilled)
        ctx2.fillText(pText, pPosX - pHorOffset, pPosY);
    else
        ctx2.strokeText(pText, pPosX - pHorOffset, pPosY);

    ctx1.restore();
}

//draws stereo bezier curve
function s3DBezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY, pHorOffset) {

    ctx1.save();
    ctx1.translate(pHorOffset, 1);
    ctx1.scale(0.5, 1);
    ctx1.bezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY);
    ctx1.restore();

    ctx2.save();
    ctx2.translate(-1 * pHorOffset, 1);
    ctx2.scale(0.5, 1);
    ctx2.bezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY);
    ctx2.restore();
}

//performs a dual canvas translate
function duoTranslate(pX, pY) {
    ctx1.translate(pX, pY);
    ctx2.translate(pX, pY);
}

//performs a dual canvas scale
function duoScale(pX, pY) {
    ctx1.scale(pX, pY);
    ctx2.scale(pX, pY);
}

//performs a dual canvas fill
function duoFill() {
    ctx1.fill();
    ctx2.fill();
}

//performs a dual canvas stroke
function duoStroke() {
    ctx1.stroke();
    ctx2.stroke();
}

//sets a dual canvas fill style
function duoFillStyle(pStyle) {
    ctx1.fillStyle = pStyle;
    ctx2.fillStyle = pStyle;
}

//sets a dual canvas stroke style
function duoStrokeStyle(pStyle) {
    ctx1.strokeStyle = pStyle;
    ctx2.strokeStyle = pStyle;
}

//sets a dual canvas line style definition
function duoLineStyleDef(pWidth, pCap, pJoin, pMiter) {
    ctx1.lineWidth = pWidth;
    ctx2.lineWidth = pWidth;
    ctx1.lineCap = pCap;
    ctx2.lineCap = pCap;
    ctx1.lineJoin = pJoin;
    ctx2.lineJoin = pJoin;
    ctx1.miterLimit = pMiter;
    ctx2miterLimit = pMiter;
}