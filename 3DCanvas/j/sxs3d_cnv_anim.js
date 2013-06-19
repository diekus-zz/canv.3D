//SXS 3D CNV ANIM
//animation structure for HTML5 S3D canvas drawing toolkit
// Author: diekus
//date of creation: 6/5/2013
//date of last modification: 7/5/2013
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
    cHeight = jsCanvas.height;
    cWidth = jsCanvas.width;
    framerate = 5000 / 1000;
}

function sxs3dcnv_anim_main() {
    //initializes the animation parameters
    init_sxs3dcnv_anim()

    
    var intLoop = self.setInterval(function () { gUpdate() }, framerate);
}

//updates - part of game-like loop for animation
function gUpdate() {

    //start example // replace with your code here
    if (posx > cWidth)
        posx = -25;
    if (posy > cHeight)
        posy = -25
    posx++;
    posy++;

    gDraw(); //do not remoe this line
}

//draws - part of game-like loop for animation
function gDraw() {
    //ctx.clearRect(0, 0, cWidth, cHeight);   // do not remove this line to avoid ghosting/repainting

    ctx.fillStyle = '#ff8824';
    s3DRectangle(posx, posy, 50, 50, 10);
    ctx.fillStyle = '#0f88c4';
    s3DRectangle(posx * 1.5, posy * 1.5, 35, 35, 5);
}

//stops the ongoing animation
function fermata() {
    clearInterval(intLoop);
}