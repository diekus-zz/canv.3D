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

var x= -256; //width image canv3dlog.png
var y= -256; //height image canv3dlog.png
var x2=w;
var y2=h;

function mainWallpaper(){
    drawImage1();       
    drawImage2();
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
    ctx.fillStyle = 'orange';
    ctx.fillRect(x+10,y+90,235,50, +3);
    var grd=ctx.createLinearGradient(x+25,y+140,x+25,y+210);
    grd.addColorStop(0,"#FF9900");
    grd.addColorStop(1,"#FF1A00");
    ctx.fillStyle = grd;
    ctx.fillRect(x+25,y+140,200,90, +3);
    ctx.drawImage('http://calculatorcroc.com/images/smile.png',x, y, +3);
    if(x>w){x=-256;}
    if(y>h){y=-256;}
}

function  drawImage2() {
    changeActiveCtx(0);
    x2--;
    x2--;
    y2--;
    y2--;
    ctx.fillStyle="blue";
    ctx.fillCircle(x2-40,y2+75, 20,3);
    ctx.fillStyle="red";
    ctx.fillCircle(x2+190,y2+75, 20,3);
    ctx.drawImage('i/canv3dlogo.png',  225, 0, 150, 144, x2, y2, 150,  144,-3);
    if(x2<-474){x2=w;}
    if(y2<-144){y2=h;}
}

