//Parallax Shifting Example
//author: diekus

/* VARIABLES */
var canvasNames = new Array();                  // array that holds all the ids of canvases to be drawn on

var imagesForDrawing = new Array();
//example images for drawing
imagesForDrawing[0] = 'http://diekus.net/i/j8ngo.png';
imagesForDrawing[1] = 'http://diekus.net/i/sxs3d_Shield_logo.png';
imagesForDrawing[2] = 'http://www.tntmagazine.com/media/costa-rica-parrots.jpg';

var shiftAmount = 0;                            // shifting amount

//starts EVERYTHING. Main entrance point
$(document).ready(function () {
    // ready canvas names
    canvasNames[0] = 'miCanvas1';
    canvasNames[1] = 'miCanvas2';

    startSoloCanvas(); // calls function in sxs3d_cnv_solo.js
});

function sxs3dcnv_main() {
    initParallaxShift();
    sxs3dcnv_anim_main(); //function to call to start animation loop
}

function initParallaxShift() {
    
    $(window).on('keypress', function (e) {
        switch (e.which) {
            case 122:
                shiftAmount++;
                break;
            case 120:
                shiftAmount--;
                break;
        }
    });
}