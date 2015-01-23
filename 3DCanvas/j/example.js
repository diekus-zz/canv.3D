//starts EVERYTHING. Main entrance point
$(document).ready(function () {
    //ready canvas names
    canvasNames[0] = 'cnv';
    startDuoCanvas(); //do not remove this line

});

function sxs3dcnv_main() {         // for attaching events or loading assets before starting
    
    renderFrame();
}

function renderFrame()
{
    requestAnimationFrame(renderFrame);
    
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

    