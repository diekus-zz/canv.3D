//SXS 3D CNV ANIM
//animation structure for HTML5 S3D canvas drawing toolkit
// Author: diekus
//date of creation: 8/7/2013
//date of last modification: 8/7/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 
//This works based on the game loop idea. It updates code/variables/positions and then draws upon this.

//variables
var cHeight = null;
var cWidth = null;
var framerate = 1000;
//user defined variables here


function init_sxs3dcnv_anim() {

    cHeight = jsCanvas1.height;
    cWidth = jsCanvas1.width;

    framerate = 100;


}

function sxs3dcnv_anim_main() {
    //initializes the animation parameters
    init_sxs3dcnv_anim();

    cloudGenerator(8); //example code. initializes drawings

    var intLoop = self.setInterval(function () { gUpdate(); }, framerate);
}

//updates - part of game-like loop for animation
function gUpdate() {

    //start example // replace with your code here

    //update variables to move and animate your objects
    updatePaisaje();

    //end example // your drawing code ends here

    gDraw(); //do not remove this line
}

//draws - part of game-like loop for animation
function gDraw() {
    duoclearRect(0, 0, cWidth, cHeight);            // do not remove this line to avoid ghosting/repainting //DUO

    //start example // replace with your code here

    //redraw your objects
    paisaje();

    //end example // your drawing code ends here
    
}

//stops the ongoing animation
function fermata() {
    clearInterval(intLoop);
}

/***************************************************** user defined functions below **/
//your code here. Recommendation: don't mix everything up! Things have been kept nice and tidy by calling functions and 