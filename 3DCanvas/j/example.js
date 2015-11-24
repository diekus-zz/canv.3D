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
    this.onmousemove = function(event){ 
        drawMouse(event.clientX,event.clientY);
    };
};

function sxs3dcnv_main() {         // for attaching events or loading assets before starting
    renderFrame(); //everythin in this function will loop
}

function renderFrame(){
    mainWallpaper();




    requestAnimFrame(renderFrame);
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

var x= 0;
var y= 0;
var x2=0;
var y2=0;

function mainWallpaper(){
    changeActiveCtx(0);
    ctx.clearRect();//if not define nothing, default all window
    ctx.fillStyle = 'blue';
    ctx.fillRect(x++,y++,100,100,5);
    ctx.drawImage('i/cursor.png',x, y, 0);
    if(x>w){x=0;}
    if(y>h){y=0;}
    ctx.strokeStyle="red";
    ctx.strokeCircle(x2--,y2--,40,5);
    ctx.stroke();
    if(x2<0){x2=w;}
    if(y2<0){y2=h;}
}

function drawMouse(mx,my){
    changeActiveCtx(1);
    ctx.clearRect();//if not define, default all window
    ctx.fillStyle='yellow';
    ctx.globalAlpha=0.5;
    ctx.fillCircle(mx, my, 30, 0);
    ctx.globalAlpha=1;
    ctx.drawImage('i/cursor.png',mx, my, 0);
}


function SnowBall(){
    this.positionX = null;
    this.positionY = null;
}
