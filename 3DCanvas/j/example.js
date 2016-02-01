var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var G; //handle duo canvas
var D; //handle main game
var C;
//starts EVERYTHING. Main entrance point
window.onload = function () {

    //create duo canvases
    //EXAMPLE FOR CREATE YOUR DUO CANVAS
    //OPTION1 ===>> D = new DuoCanvas(4)  -->> create 4 layers(couples) of canvases, names autoasigned enumerated
    //OPTION2 ===>> D = new DuoCanvas('Background','Cards','Messages','Mouse');  -->> create 4 layers(couples) of canvases, names choosed
    D = new DuoCanvas(4);

}

var mainFunction = function(duoCanvas){
    //start your code ... 

    //EXAMPLE FOR CHANGE ACTIVE CONTEXT
    //OPTION1 ===>>   D.changeContext(0);   'D'->> name set on window.onload for duocanvas
    //OPTION2 ===>>   duoCanvas.changeContext(0);
    //can add request animation ,etc....
    C = duoCanvas;
    //EXAMPLE REQUEST ANIMATION FRAME:
    renderFrame(); //--->> call ur function renderframe

}


//CREATE FUNCTION FOR ANIMATION

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
    C.changeContext(1);
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
    C.changeContext(0);
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
    C.changeContext(0);
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
