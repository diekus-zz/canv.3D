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

var x= -474;
var y= -144;
var x2=w;
var y2=h;

function mainWallpaper(){
    drawImage1();       
    drawCircle1();
}

function drawMouse(mx,my){
    changeActiveCtx(1);
    ctx.clearRect();//if not define, default all window
    ctx.fillStyle='yellow';
    ctx.globalAlpha=0.5;
    ctx.fillCircle(mx, my, 25, -5);
    ctx.globalAlpha=1;
    ctx.drawImage('i/cursor.png',mx, my, -5);
}

function drawImage1(){
    x++;
    y++;
    changeActiveCtx(0);
    ctx.globalAlpha=0.1;
    ctx.clearRectColor('black');//if not define nothing, default all window
    ctx.globalAlpha=1;
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y+50,200,50,-2);
    ctx.drawImage('i/canv3dlogo.png',x, y, -3);
    if(x>w){x=-474;}
    if(y>h){y=-144;}
}

function  drawCircle1() {
    changeActiveCtx(0);
    x2--;
    x2--;
    y2--;
    y2--;
    ctx.fillStyle="blue";
    ctx.fillCircle(x2-40,y2+75, 20,3);
    ctx.fillStyle="red";
    ctx.fillCircle(x2+190,y2+75, 20,3);
    //ctx.drawImage('i/canv3dlogo.png' , sx, sy, swidth, sheight, x, y, width, height, pHorOffset);
    ctx.drawImage('i/canv3dlogo.png',  225, 0, 150, 144, x2, y2, 150,  144,+3);
    if(x2<-474){x2=w;}
    if(y2<-144){y2=h;}
}

