var px = 0;
var py = 0;
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;



//starts EVERYTHING. Main entrance point
window.onload =
//$(document).ready(
    function () {
    //ready canvas names
    canvasNames[0] = 'cnv';
    startDuoCanvas(); //do not remove this line
    document.body.onmousemove = function(event){
    		px = event.clientX;
    		py = event.clientY;

    	};

};

function sxs3dcnv_main() {         // for attaching events or loading assets before starting
    
    renderFrame();
}

function renderFrame()
{
    requestAnimationFrame(renderFrame);

    dibujarCuadrado(px);
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

function dibujarCuadrado(posx)
{
	duoClearRect(0,0,w,h);
	duoFillStyle("blue");
    s3DRectangle(posx, 100, 50, 50, 3);
}
