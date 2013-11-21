//SXS 3D CNV ANIM
//animation structure for HTML5 S3D canvas drawing toolkit
// Author: diekus
//date of creation: 6/5/2013
//date of last modizzxfication: 16/10/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 
//This works based on the game loop idea. It updates code/variables/positions and then draws upon this.

//variables
var cHeight = null;
var cWidth = null;
var framerate = 1000;
//user defined variables
var posx = 0;
var posy = 0;

function init_sxs3dcnv_anim() {
    /*** SOLO ***/
    cHeight = jsCanvases[activeDrawingCanvas][0].height;
    cWidth = jsCanvases[activeDrawingCanvas][0].width;

    mcHeight = cHeight / 2;
    mcWidth = cWidth / 2;

    /*** BOTH ***/
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

    gDraw(); //do not remove this line
}

//draws - part of game-like loop for animation
function gDraw() {
    ctx.clearRect(0, 0, cWidth, cHeight);           // do not remove this line to avoid ghosting/repainting

    ctx.fillStyle = '#0f88c4';
    s3DRectangle(mcWidth, mcHeight, 250, 250, shiftAmount);   // shift amount is defined in parallaxShift.js
    s3DCircle(20, 20, 40, shiftAmount*1.5);

    var img3DShield = document.getElementById('img_1');
    s3DImage(img3DShield, 100, 100, shiftAmount*0.5);
}

//stops the ongoing animation
function fermata() {
    clearInterval(intLoop);
}