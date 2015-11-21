var mx = 0;
var my = 0;
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

//starts EVERYTHING. Main entrance point
window.onload =
//$(document).ready(
    function () {
    //ready canvas names
    canvasNames[0] = 'cnv';
    canvasNames[1] = 'cursor';
    startDuoCanvas(); //do not remove this line
    document.body.style.cursor = 'none';
    
    document.body.onmousemove = function(event){
    		mx = event.clientX;
    		my = event.clientY;

    	};

};

function sxs3dcnv_main() {
    renderFrame(); //everythin in this function will loop
}

function renderFrame(){
    //drawn something here ..
    requestAnimationFrame(renderFrame);
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

    
