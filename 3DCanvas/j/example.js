var mx = 0;
var my = 0;
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var canv3d;

//starts EVERYTHING. Main entrance point
window.onload = function () {
    //ready canvas names. defaults are CNV and CURSOR
    sxs3dcnv_main();
    //sets the mouse movement event 
    document.body.onmousemove = function(event){
    		mx = event.clientX;
    		my = event.clientY;

    	};

};

function sxs3dcnv_main() {         // for attaching events or loading assets before starting
    canv3d = new Canv3d();
    canv3d.duoFillStyle("#043051");
    canv3d.s3DRectangle(0,0,w,h,0);
    canv3d.duoFillStyle("white");
    canv3d.s3DText('canv.3d.js basic template', "10pt sans-serif", true, 20, 20, 'start', 'hanging', -2);
    starfield(500);
    canv3d.changeActiveCtx(1);
    
    renderFrame(); //everythin in this function will loop
}

function renderFrame()
{
    canv3d.duoClearRect(0,0,w,h);
    var xo = mx/50;
    canv3d.s3DImage('i/canv3dlogo.png', w/2-237+xo, h/2, -4);
    canv3d.s3DImage('i/cursor.png', mx, my, -4);
    
    requestAnimationFrame(renderFrame);
}

function starfield(n){
    
    for(var i = 0; i < n; i++){
        var xt = Math.floor((Math.random() * w));
        var yt = Math.floor((Math.random() * h));
        var rt = Math.floor((Math.random() * 10));
        var ot = Math.floor((Math.random() * 5));
        canv3d.duoGlobalAlpha(0.2);
        canv3d.s3DCircle(xt, yt, rt, ot);
    }
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

    