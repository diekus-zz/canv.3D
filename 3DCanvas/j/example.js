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

function sxs3dcnv_main() {         // for attaching events or loading assets before starting
    duoFillStyle("#043051");
    s3DRectangle(0,0,w,h,0);
    duoFillStyle("white");
    s3DText('canv.3d.js basic template', "10pt sans-serif", true, 20, 20, 'start', 'hanging', -2);
    starfield(500);
    changeActiveCtx(1);
    
    renderFrame(); //everythin in this function will loop
}

function renderFrame()
{
    duoClearRect(0,0,w,h);
    var xo = mx/50;
    s3DImage('i/canv3dlogo.png', w/2-237+xo, h/2, -4);
    s3DImage('i/cursor.png', mx, my, -4);
    
    requestAnimationFrame(renderFrame);
}

function starfield(n){
    
    for(var i = 0; i < n; i++){
        var xt = Math.floor((Math.random() * w));
        var yt = Math.floor((Math.random() * h));
        var rt = Math.floor((Math.random() * 10));
        var ot = Math.floor((Math.random() * 5));
        duoGlobalAlpha(0.2);
        s3DCircle(xt, yt, rt, ot);
    }
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

    