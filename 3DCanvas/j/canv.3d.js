//CANV.3D
//HTML5 S3D dual canvas drawing toolkit
//Author: diekus
//date of creation: 25/4/2013
//date of last modification: 20/06/2015
//This is pre-release code. It needs cleanup and structure. Working on it. 
/*Can manage now several sets of canvases on a page!*/

//global variables
var jsCanvas1 = null;                   // DOM element for first ACTIVE canvas
var jsCanvas2 = null;                   // DOM element for second ACTIVE canvas
var ctx = null;
var ctx1 = null;                        // first ACTIVE canvas drawing context
var ctx2 = null;                        // second ACTIVE canvas drawing context
var jsCanvases = null;                  // DOM canvas elements for each canvas to be drawn on
var activeDrawingCanvas = -1;           // specifies the ACTIVE drawing canvas
var canvasNames = new Array();          // array that contains the names of the canvases that will be drawn upon. Layers of canvases

//starts the 3d canvas script
function startDuoCanvas(){
    init('sxs3d_');
}

function init() {
    //create context
    ctx = new Contexts3DCanvas();
    //prepares all the canvases on the document
    jsCanvases = new Array(canvasNames.length);
    for (icnv = 0; icnv < canvasNames.length; icnv++) {
        //console.log('preparing canvas ' + canvasNames[icnv] + ' clone');
        jsCanvases[icnv] = prep3DCanvas(canvasNames[icnv], 'sxs3d_' + canvasNames[icnv]); //at this point we have an array with subarrays of 4. (canvas and clone, ctx and clone)
    }
    changeActiveCtx(0); // first *SET* canvas (0 and 1)
    //main 
    sxs3dcnv_main();
}

//prepares and initializes canvases for side by side drawing.
//returns an array with both canvases
function prep3DCanvas(pCnvName1, pCnvName2) {
    //create elements canvas
    var canv1 = document.createElement('canvas');
    var canv2 = document.createElement('canvas');
    //asign id's to canvaces
    canv1.id = pCnvName1;    
    canv2.id = pCnvName2;
    //add canvaces to html index
    document.getElementById('dobleCnv').appendChild(canv1); 
    document.getElementById('dobleCnv').appendChild(canv2); 
    //gets elements as var
    var tjsCanvas1 = document.getElementById(pCnvName1);
    var tjsCanvas2 = document.getElementById(pCnvName2);
    //gets 2d drawing context for the canvases
    var tctx1 = tjsCanvas1.getContext('2d');
    var tctx2 = tjsCanvas2.getContext('2d');
    //size
    tjsCanvas1.width = window.innerWidth / 2;
    tjsCanvas2.width = window.innerWidth / 2;
    tjsCanvas1.height = window.innerHeight;
    tjsCanvas2.height = window.innerHeight;
    //position
    tjsCanvas1.style.position = 'absolute';
    tjsCanvas2.style.position = 'absolute';
    tjsCanvas1.style.left = '0px';
    tjsCanvas2.style.left = window.innerWidth / 2 + 'px';
    tjsCanvas1.style.top = '0px';
    tjsCanvas2.style.top = '0px';
    var objTCanvas = new Array(4);
    objTCanvas[0] = tjsCanvas1;                     //original canvas
    objTCanvas[2] = tjsCanvas2;                     //clone canvas
    objTCanvas[1] = tctx1;                          //original context
    objTCanvas[3] = tctx2;                          //clone context
    return objTCanvas;
}

//changes the active *SET* of drawing context. By default it is the first canvas in the array
function changeActiveCtx(n) {
    try {
        if (n < jsCanvases.length) {
            jsCanvas1 = jsCanvases[n][0];
            jsCanvas2 = jsCanvases[n][2];
            this.ctx1 = this.jsCanvases[n][1];
            this.ctx2 = this.jsCanvases[n][3];
            this.activeDrawingCanvas = n;
        }
        else {
            jsCanvas1 = jsCanvases[0][0];
            jsCanvas2 = jsCanvases[0][2];
            this.ctx1 = this.jsCanvases[0][1];
            this.ctx2 = this.jsCanvases[0][3];
            this.activeDrawingCanvas = 0;
        }
    } catch (e) {
        console.log('current drawing context nonexistent.');
    } finally {
        ctx.getProperties(ctx1,ctx2);
    }
}


//converts from degrees to radians
function deg2Rad(degrees) {
    return degrees * Math.PI / 180;
}























/*******************************
*main functions for canvas works
*23/11/2015 UPDATE
*
*
******Author : Alberto Acuña/Beru*/

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback,element){
                window.setTimeout(callback, 1000 / 60);
            };
})();

window.cancelAnimFrame = (function(){  
    return  window.cancelAnimationFrame       || 
            window.mozCancelAnimationFrame ||
            function(callback,element){
                window.setTimeout(callback, 1000 / 60);
            };
})();































/**
 * Create Class for handle contexts and drawn it as objects-programing oriented
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 */

function Contexts3DCanvas(){
    this.ctx1=null;
    this.ctx2=null;
    this.canvas1=null;
    this.canvas2=null;
    this.fillStyle=null;
    this.font=null;
    this.globalAlpha=null;
    this.globalCompositeOperation=null;
    this.imageSmoothingEnabled=null;
    this.lineCap=null;
    this.lineDashOffset=null;
    this.lineJoin=null;
    this.lineWidth=null;
    this.miterLimit=null;
    this.shadowBlur=null;
    this.shadowColor=null;
    this.shadowOffsetX=null;
    this.shadowOffsetY=null;
    this.strokeStyle=null;
    this.textAlign=null;
    this.textBaseline=null;
    this.webkitImageSmoothingEnabled=null;
    this.images = [];
}


/**
 * Set method for change ctx in our context
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 */

Contexts3DCanvas.prototype.getProperties = function ( ctx1, ctx2){
    if(ctx1!=undefined && ctx2!=undefined){
        this.ctx1=ctx1;
        this.ctx2=ctx2;
    }
    this.canvas1=this.ctx1.canvas;
    this.canvas2=this.ctx2.canvas;
    this.fillStyle=this.ctx1.fillStyle;
    this.font=this.ctx1.font;
    this.globalAlpha=this.ctx1.globalAlpha;
    this.globalCompositeOperation=this.ctx1.globalCompositeOperation;
    this.imageSmoothingEnabled=this.ctx1.imageSmoothingEnabled;
    this.lineCap=this.ctx1.lineCap;
    this.lineDashOffset=this.ctx1.lineDashOffset;
    this.lineJoin=this.ctx1.lineJoin;
    this.lineWidth=this.ctx1.lineWidth;
    this.miterLimit=this.ctx1.miterLimit;
    this.shadowBlur=this.ctx1.shadowBlur;
    this.shadowColor=this.ctx1.shadowColor;
    this.shadowOffsetX=this.ctx1.shadowOffsetX;
    this.shadowOffsetY=this.ctx1.shadowOffsetY;
    this.strokeStyle=this.ctx1.strokeStyle;
    this.textAlign=this.ctx1.textAlign;
    this.textBaseline=this.ctx1.textBaseline;
    this.webkitImageSmoothingEnabled=this.ctx1.imageSmoothingEnabled || this.ctx1.webkitImageSmoothingEnabled;
}




/**
 * Set method for update properties
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 */


Contexts3DCanvas.prototype.setProperties = function(){
    this.ctx1.canvas = this.canvas1;
    this.ctx2.canvas = this.canvas2;
    this.ctx1.fillStyle = this.fillStyle;
    this.ctx2.fillStyle = this.fillStyle;
    this.ctx1.font = this.font;
    this.ctx2.font = this.font;
    this.ctx1.globalAlpha = this.globalAlpha;
    this.ctx2.globalAlpha = this.globalAlpha;
    this.ctx1.globalCompositeOperation=this.globalCompositeOperation;
    this.ctx2.globalCompositeOperation=this.globalCompositeOperation;
    this.ctx1.imageSmoothingEnabled=this.imageSmoothingEnabled;
    this.ctx2.imageSmoothingEnabled=this.imageSmoothingEnabled;
    this.ctx1.lineCap=this.lineCap;
    this.ctx2.lineCap=this.lineCap;
    this.ctx1.lineDashOffset=this.lineDashOffset;
    this.ctx2.lineDashOffset=this.lineDashOffset;
    this.ctx1.lineJoin=this.lineJoin;
    this.ctx2.lineJoin=this.lineJoin;
    this.ctx1.lineWidth=this.lineWidth;
    this.ctx2.lineWidth=this.lineWidth;
    this.ctx1.miterLimit=this.miterLimit;
    this.ctx2.miterLimit=this.miterLimit;
    this.ctx1.shadowBlur=this.shadowBlur;
    this.ctx2.shadowBlur=this.shadowBlur;
    this.ctx1.shadowColor=this.shadowColor;
    this.ctx2.shadowColor=this.shadowColor;
    this.ctx1.shadowOffsetX=this.shadowOffsetX;
    this.ctx2.shadowOffsetX=this.shadowOffsetX;
    this.ctx1.shadowOffsetY=this.shadowOffsetY;
    this.ctx2.shadowOffsetY=this.shadowOffsetY;
    this.ctx1.strokeStyle=this.strokeStyle;
    this.ctx2.strokeStyle=this.strokeStyle;
    this.ctx1.textAlign=this.textAlign;
    this.ctx2.textAlign=this.textAlign;
    this.ctx1.textBaseline=this.textBaseline;
    this.ctx2.textBaseline=this.textBaseline;
    this.ctx1.imageSmoothingEnabled=this.webkitImageSmoothingEnabled;
    this.ctx2.imageSmoothingEnabled=this.webkitImageSmoothingEnabled;
}






































/**  
 * Modify _protos_ of context
 * METHODS for the context
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 */





/**
 * Drawn Arc in both context
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.arc
 * @example : ctx.arc( 100 ,75 ,50 ,0 ,2*Math.PI, false, -5);
 */

Contexts3DCanvas.prototype.arc = function(pPosX, pPosY, pRadius, pStartAngle, pEndAngle, pDirection, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.arc(pPosX - pHorOffset, pPosY , pRadius , pStartAngle, pEndAngle, pDirection);
    this.ctx2.arc(pPosX + pHorOffset, pPosY , pRadius , pStartAngle, pEndAngle, pDirection);
    this.restore();
}





/**
 * Drawn Arc curve after a lineTo
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.arcTo
 * @example : ctx.arcTo(150,20,150,70,50);
 */

Contexts3DCanvas.prototype.arcTo = function( xPos1 , yPos1 , xPos2 , yPos2, pRadius, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.arcTo( xPos1 - pHorOffset , yPos1 , xPos2 - pHorOffset , yPos2, pRadius );
    this.ctx2.arcTo( xPos1 + pHorOffset , yPos1 , xPos2 + pHorOffset , yPos2, pRadius );
    this.restore();
}





/**
 * Create Begin Path
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.beginPath
 * @example : ctx.beginPath();
 */

Contexts3DCanvas.prototype.beginPath = function(){
    this.setProperties();
    this.ctx1.beginPath();
    this.ctx2.beginPath();
}




/**
 * Create the BezierCurveTo
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.bezierCurveTo
 * @example : ctx.bezierCurveTo(20,100,200,100,200,20);
 */

Contexts3DCanvas.prototype.bezierCurveTo = function( pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY, pHorOffset ){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.bezierCurveTo(pCP1X - pHorOffset, pCP1Y, pCP2X - pHorOffset, pCP2Y, pX, pY);
    this.ctx2.bezierCurveTo(pCP1X + pHorOffset, pCP1Y, pCP2X + pHorOffset, pCP2Y, pX, pY);
    this.restore();
}






/**
 * Get Canvas Element
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.canvas
 * @example : var canvaces = ctx.canvas()
 */

Contexts3DCanvas.prototype.canvas = function(){
    var that = {};
    that.canvas1 = this.ctx1.canvas;
    that.canvas2 = this.ctx2.canvas;
    return that;
}





/**
 * Clear window of canvas specific area
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.clearRect
 * @example : ctx.clearRect( 0,0,100,100);
 */

Contexts3DCanvas.prototype.clearRect = function( px, py, cWidth, cHeight, pHorOffset){
    this.setProperties();
    if(px==undefined && py==undefined && cWidth==undefined && cHeight==undefined && pHorOffset==undefined){
        px=0;
        py=0;
        cWidth=this.canvas().canvas1.width+this.canvas().canvas2.width;
        cHeight=this.canvas().canvas1.height+this.canvas().canvas2.height;
        pHorOffset=0;
    }
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.clearRect(px-pHorOffset, py, cWidth, cHeight);
    this.ctx2.clearRect(px+pHorOffset, py, cWidth, cHeight);
    this.restore();
}






/**
 * Clear window of canvas specific area
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.clearRect
 * @example : ctx.clearRectColor(0,0,100,100,'red',0)
 */

Contexts3DCanvas.prototype.clearRectColor = function( px, py, cWidth, cHeight, color, pHorOffset){
    this.setProperties();
    if(px!=undefined && py==undefined && cWidth==undefined && cHeight==undefined && color==undefined && pHorOffset==undefined){
        color=px;
        px=0;
        py=0;
        cWidth=ctx.canvas().canvas1.width+ctx.canvas().canvas2.width;
        cHeight=ctx.canvas().canvas1.height+ctx.canvas().canvas2.height;
        pHorOffset=0;
        this.fillStyle = color;
    }
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.fillRect(px, py, cWidth, cHeight, pHorOffset);
    this.fill();
    this.restore();
}






/**
 * clip canvaces
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.clip
 * @example : ctx.clip();
 */

Contexts3DCanvas.prototype.clip = function(){
    this.setProperties();  
    this.ctx1.clip();
    this.ctx2.clip();
}





/**
 * Create Close Path
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.closePath
 * @example : ctx.closePath();
 */

Contexts3DCanvas.prototype.closePath = function(){
    this.setProperties();
    this.ctx1.closePath();
    this.ctx2.closePath();
}





/**
 * Create  ImageData
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.createImageData
 * @example : var img = ctx.createImageData(100,100);
 */

Contexts3DCanvas.prototype.createImageData = function( width, height){
    return this.ctx1.createImageData(width/2,height);
}





/**
 * Set Colors Image Data
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.settImageData
 * @example : ctx.setImageData( img, 255,0,0,255);
 */

Contexts3DCanvas.prototype.setImageData = function( imageData, R, G, B, Opacity){

    for (var i=0;i<imageData.imgData1.data.length;i+=4){
      imageData.data[i+0]=R;
      imageData.data[i+1]=G;
      imageData.data[i+2]=B;
      imageData.data[i+3]=Opacity;
    }

    return imageData;
}





/**
 * Create Linear Gradient
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.createLinearGradient
 * @example : var grd=ctx.createLinearGradient(0,0,100,100);
 */

Contexts3DCanvas.prototype.createLinearGradient= function(x0, y0, x1, y1){
    grd1 = this.ctx1.createLinearGradient(x0/2,y0,x1/2,y1);
    grd2 =this.ctx2.createLinearGradient(x0/2,y0,x1/2,y1);
    return new Gradient(grd1,grd2);
}



/**
 * Create Class Gradient, necesary for keep working
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
*/

function Gradient(grd1,grd2){
    this.gradient1 = grd1;
    this.gradient2 = grd2;
 }




/**
 * Add Gradient Color Stop
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.createLinearGradient
 * @example : grd.addColorStop(0,"red")
 * @example : grd.addColorStop(1,"black")
 */
Gradient.prototype.addColorStop = function ( percent, color){
    this.gradient1.addColorStop( percent, color);
    this.gradient2.addColorStop( percent, color);
}





/**
 * Create Pattern
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.createPattern
 * @example : var pat=ctx.createPattern(img,"repeat");
 */

Contexts3DCanvas.prototype.createPattern= function( objt_img, style){
    var that = {};
    that.pattern1 = this.ctx1.createPattern(objt_img,style);
    that.pattern2 = this.ctx2.createPattern(objt_img,style);
    return that;
}






/**
 * Create Radial Gradient
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.createRadialGradient
 * @example : var grd=ctx.createRadialGradient(75,50,5,90,60,100);
 */

Contexts3DCanvas.prototype.createRadialGradient= function(x0, y0, r0, x1, y1, r1){
    grd1 = this.ctx1.createRadialGradient(x0/2,y0,r0,x1/2,y1,r1);
    grd2 = this.ctx2.createRadialGradient(x0/2,y0,r0,x1/2,y1,r1);
    return new Gradient(grd1,grd2);
}






/**
 * DrawImage Interprate depending of number of inputs avaible
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.DrawImage
 * @example : ctx.drawImage(img,90,130,50,60,10,10,50,60);
 */

Contexts3DCanvas.prototype.drawImage= function( img , sx, sy, swidth, sheight, x, y, width, height, pHorOffset){
    this.setProperties();
    //case 4 values as input
    if( img!= undefined && sx!=undefined && sy!=undefined && (swidth!=undefined || swidth==undefined) && sheight==undefined 
        && x==undefined && y==undefined && width==undefined && height==undefined && pHorOffset==undefined ){
        if(swidth==undefined){
            swidth=0;
        }
        this.drawImageDefaultValues( img, sx, sy, swidth);
    }
    //case 6 values as input
    if( img!= undefined && sx!=undefined && sy!=undefined && swidth!=undefined && sheight!=undefined 
        && (x!=undefined||x==undefined) && y==undefined && width==undefined && height==undefined && pHorOffset==undefined){
        if(x==undefined){
            x=0;
        }
        this.drawImageCustomSize( img, sx, sy, swidth, sheight, x);
    }
    if( img!= undefined && sx!=undefined && sy!=undefined && swidth!=undefined && sheight!=undefined 
        && x!=undefined && y!=undefined && width!=undefined && height!=undefined && (pHorOffset!=undefined || pHorOffset==undefined)){
        if(pHorOffset==undefined){
            pHorOffset=0;
        }
        this.drawImageCustomImage( img , sx, sy, swidth, sheight, x, y, width, height, pHorOffset);
    }
}



/**
 * DrawImage Default Values
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 * @example : ctx.drawImageDefaultValues(img,10,10);   ||    ctx.drawImageDefaultValues(img,10,10, 5); 
 */

Contexts3DCanvas.prototype.drawImageDefaultValues = function( img, posX, posY, pHorOffset){
    if(this.isCreated(img) && this.isLoaded(img)){
        this.save();
        this.scale(0.5,1);
        this.ctx1.drawImage(this.getImage(img), posX-pHorOffset, posY);
        this.ctx2.drawImage(this.getImage(img), posX+pHorOffset, posY);
        this.restore();
    }else{
        this.save();
        var imageObj = new Image();
        var that = this;
        imageObj.onload = function (){
            that.save();
            that.scale(0.5,1);
            that.ctx1.drawImage(this, posX-pHorOffset, posY);
            that.ctx2.drawImage(this, posX+pHorOffset, posY);
            that.restore();
        };
        imageObj.src = img;    
        this.restore();
    }



}



/**
 * DrawImage Custom Position
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 * @example : ctx.drawImageCustomSize(img,10,10,150,180,5);   ||   ctx.drawImageCustomSize(img,10,10,150,180,5);
 */

Contexts3DCanvas.prototype.drawImageCustomSize = function( img, posX, posY, width, height, pHorOffset){
    if(this.isCreated(img) && this.isLoaded(img)){
        this.save();
        this.scale(0.5,1);
        this.ctx1.drawImage(this.getImage(img), posX-pHorOffset, posY, width, height);
        this.ctx2.drawImage(this.getImage(img), posX+pHorOffset, posY, width, height);
        this.restore();
    }else{
        this.save();
        var imageObj = new Image();
        var that = this;
        imageObj.onload = function (){
            that.save();
            that.scale(0.5,1);
            that.ctx1.drawImage(this, posX-pHorOffset, posY, width, height);
            that.ctx2.drawImage(this, posX+pHorOffset, posY, width, height);
            that.restore();
        };
        imageObj.src = img;    
        this.restore();
    }
}



/**
 * DrawImage Custom Position
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 * @example : ctx.drawImageCustomImage(img,90,130,50,60,10,10,50,60);    ||     ctx.drawImageCustomImage(img,90,130,50,60,10,10,50,60,5);
 */

Contexts3DCanvas.prototype.drawImageCustomImage = function( img , sx, sy, swidth, sheight, x, y, width, height, pHorOffset){
    if(this.isCreated(img) && this.isLoaded(img)){
        this.save();
        this.scale(0.5,1);
        this.ctx1.drawImage(this.getImage(img), sx, sy, swidth, sheight, x-pHorOffset, y, width, height);
        this.ctx2.drawImage(this.getImage(img), sx, sy, swidth, sheight, x+pHorOffset, y, width, height);
        this.restore();
    }else{
        this.save();
        var imageObj = new Image();
        var that = this;
        imageObj.onload = function (){
            that.save();
            that.scale(0.5,1);
            that.ctx1.drawImage(this, sx, sy, swidth, sheight, x-pHorOffset, y, width, height);
            that.ctx2.drawImage(this, sx, sy, swidth, sheight, x+pHorOffset, y, width, height);
            that.restore();
        };
        imageObj.src = img;    
        this.restore();
    }
}




/**
 * drawn a rect fill
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.fillRect
 * @example : ctx.fillRect( 0,0,100,100);
 */

Contexts3DCanvas.prototype.fillRect = function( px, py, cWidth, cHeight, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.fillRect(px-pHorOffset, py, cWidth, cHeight);
    this.ctx2.fillRect(px+pHorOffset, py, cWidth, cHeight);
    this.restore();
}





/**
 * fill
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.fill
 * @example : ctx.fill();
 */

Contexts3DCanvas.prototype.fill = function(){
    this.setProperties();
    this.ctx1.fill();
    this.ctx2.fill();
}




/**
 * drawn fill text
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.fillText
 * @example : ctx.fillText('asd',10,10,5);
 */

Contexts3DCanvas.prototype.fillText = function( text, x, y, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.fillText(text, x - pHorOffset,y);
    this.ctx2.fillText(text, x + pHorOffset,y);
    this.restore();
}

   




/**
 * get object that contains the actual context parameters
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype..getContextAttributes
 * @example : ctx.getContextAttributes();
 */

Contexts3DCanvas.prototype.getContextAttributes = function( ){
    return this.ctx1.getContextAttributes();
}






/**
 * Get  ImageData
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.getImageData
 * @example : var imgData=ctx.getImageData(10,10,50,50);
 */

Contexts3DCanvas.prototype.getImageData = function( x, y, width, height, pHorOffset){
    return this.ctx1.getImageData((x-pHorOffset)/2,y,width/2,height);
}

//EXAMPLE INVERT SOME IMAGE
/*ctx.drawImage(img,0,0);
var imgData=ctx.getImageData(0,0,c.width,c.height);
// invert colors
for (var i=0;i<imgData.data.length;i+=4)
  {
  imgData.data[i]=255-imgData.data[i];
  imgData.data[i+1]=255-imgData.data[i+1];
  imgData.data[i+2]=255-imgData.data[i+2];
  imgData.data[i+3]=255;
  }
ctx.putImageData(imgData,0,0);*/




/**
 * getLineDash()
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.getLineDash
 * @example : ctx.getLineDash()
 */

Contexts3DCanvas.prototype.getLineDash = function(){
    return this.ctx1.getLineDash();
}






/**
 * hasOwnProperty()
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.hasOwnProperty
 * @example : ctx.hasOwnProperty()
 */

Contexts3DCanvas.prototype.hasOwnProperty = function(){
    return this.ctx1.hasOwnProperty();
}






/**
 * getimageSmoothingEnabled
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.getimageSmoothingEnabled
 * @example : ctx.getimageSmoothingEnabled()
 */

Contexts3DCanvas.prototype.getimageSmoothingEnabled = function(){
    return this.ctx1.imageSmoothingEnabled;
}




/**
 * isPointInPath
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.isPointInPath
 * @example : ctx.isPointInPath()
 */

Contexts3DCanvas.prototype.isPointInPath = function( x, y){
    return this.ctx1.isPointInPath( x, y);
}




/**
 * isPointInStroke
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.isPointInStroke
 * @example : ctx.isPointInStroke()
 */

Contexts3DCanvas.prototype.isPointInStroke = function( x, y){
    return this.ctx1.isPointInStroke( x, y);
}





/**
 * isPrototypeOf
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.isPrototypeOf
 * @example : ctx.isPrototypeOf()
 */

Contexts3DCanvas.prototype.isPrototypeOf = function( x, y){
    return this.ctx1.isPrototypeOf( x, y);
}




/**
 * drawn a line to (Start)
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.lineTo
 * @example : ctx.lineTo( 30, 30, 5);
 */

Contexts3DCanvas.prototype.lineTo = function( x, y, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.ctx1.lineTo( x - pHorOffset, y);
    this.ctx2.lineTo( x + pHorOffset, y);
}



/**
 * get measureText in pixels
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.measureText
 * @example : ctx.measureText('asd');
 */

Contexts3DCanvas.prototype.measureText = function( text){
    this.setProperties();
    return this.ctx1.measureText('asd');
}




/**
 * drawn a line moveTo (end)
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.moveTo
 * @example : ctx.moveTo( 30, 30, 5);
 */

Contexts3DCanvas.prototype.moveTo = function( x, y, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.ctx1.moveTo( x - pHorOffset, y);
    this.ctx2.moveTo( x + pHorOffset, y);
}






/**
 * propertyIsEnumerable
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.propertyIsEnumerable
 * @example : ctx.propertyIsEnumerable()
 */

Contexts3DCanvas.prototype.propertyIsEnumerable = function( obj ){
    return ctx.ctx1.propertyIsEnumerable( obj );
}





/**
 * Put  ImageData
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.putImageData
 * @example : ctx.putImageData(img,0,0,0);
 */

Contexts3DCanvas.prototype.putImageData= function( imageData, pPosX, pPosY, pHorOffset){
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.ctx1.putImageData(imageData,(pPosX-pHorOffset)/2, pPosY);
    this.ctx2.putImageData(imageData,(pPosX+pHorOffset)/2, pPosY);
}





/**
 * create a quadraticCurveTo
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.quadraticCurveTo
 * @example : ctx.quadraticCurveTo(20,100,200,20, 5)
 */

Contexts3DCanvas.prototype.quadraticCurveTo= function( cpx, cpy, x, y, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.quadraticCurveTo( cpx - pHorOffset, cpy, x - pHorOffset, y);
    this.ctx2.quadraticCurveTo( cpx + pHorOffset, cpy, x + pHorOffset, y);
    this.restore();
}






/**
 * create a quadraticCurveTo
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.quadraticCurveTo
 * @example : ctx.rect(20,20,150,100);
 */

Contexts3DCanvas.prototype.rect= function( x, y, width, height, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.rect(20,20,150,100);
    this.ctx2.rect
    this.restore();
}





/**
 * create a quadraticCurveTo
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.quadraticCurveTo
 * @example : ctx.quadraticCurveTo(20,100,200,20)
 */

Contexts3DCanvas.prototype.quadraticCurveTo= function( cpx, cpy, x, y, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.quadraticCurveTo( cpx - pHorOffset, cpy, x - pHorOffset, y);
    this.ctx2.quadraticCurveTo( cpx + pHorOffset, cpy, x + pHorOffset, y);
    this.restore();
}






/**
 * create a resetTransform
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.resetTransform
 * @example : ctx.resetTransform();
 */

Contexts3DCanvas.prototype.resetTransform= function(){
    this.save();
    this.scale(0.5,1);
    this.ctx1.resetTransform();
    this.ctx2.resetTransform();
    this.restore();
}






/**
 * Restore Last Context Saved
 *
 * @author Juan Acuña
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.Restore
 * @example : ctx.Restore();
 */

Contexts3DCanvas.prototype.restore = function(){
    this.ctx1.restore();
    this.ctx2.restore();
    this.getProperties();
}






/**
 * create a rotate
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.rotate
 * @example : ctx.rotate(20*Math.PI/180);
 */

Contexts3DCanvas.prototype.rotate= function(angle){
    this.ctx1.rotate(angle);
    this.ctx2.rotate(angle);
}





/**
 * Save Actual Context
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.Save
 * @example : ctx.Scale();
 */

Contexts3DCanvas.prototype.save = function(){
    this.setProperties();
    this.ctx1.save();
    this.ctx2.save();
}





/**
 * Set Scale of canvaces
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.scale
 * @example : ctx.scale( 0.5, 0.5);
 */

Contexts3DCanvas.prototype.scale = function( percentX, percentY){
    this.ctx1.scale(percentX, percentY);
    this.ctx2.scale(percentX, percentY);
}






/**
 * create a setLineDash
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.setLineDash
 * @example :ctx.setLineDash([5, 15]);
 */

Contexts3DCanvas.prototype.setLineDash= function( segment ){
    this.ctx1.setLineDash( segment);
    this.ctx2.setLineDash( segment);
}




/**
 * create a setTransform
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.setTransform
 * @example : ctx.setTransform(1,0.5,-0.5,1,30,10);
 */

Contexts3DCanvas.prototype.setTransform= function( a, b, c, d, e, f){
    this.save();
    this.scale(0.5,1);
    this.ctx1.setTransform( a, b, c, d, e, f);
    this.ctx2.setTransform( a, b, c, d, e, f);
    this.restore();
}





/**
 * Stroke Color
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.stroke
 * @example : ctx.stroke();
 */

Contexts3DCanvas.prototype.stroke = function(){
    this.setProperties();
    this.ctx1.stroke();
    this.ctx2.stroke();
}






/**
 * drawn a strokeRect
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.strokeRect
 * @example : ctx.strokeRect( 0,0,100,100);
 */

Contexts3DCanvas.prototype.strokeRect = function( px, py, cWidth, cHeight, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.strokeRect(px-pHorOffset, py, cWidth, cHeight);
    this.ctx2.strokeRect(px+pHorOffset, py, cWidth, cHeight);
    this.restore();
}





/**
 * drawn fill text
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 * @method Contexts3DCanvas.prototype.fillText
 * @example : ctx.fillText('asd',10,10,5);
 */

Contexts3DCanvas.prototype.strokeText = function( text, x, y, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.scale(0.5,1);
    this.ctx1.strokeText(text, x - pHorOffset,y);
    this.ctx2.strokeText(text, x + pHorOffset,y);
    this.restore();
}







/**
 * toLocaleString
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.toLocaleString
 * @example : ctx.toLocaleString();
 */

Contexts3DCanvas.prototype.toLocaleString = function(objt){
    return this.ctx1.toLocaleString(objt);
}






/**
 * create a transform
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.transform
 * @example : ctx.transform(1,1,0,1,0,0);
 */

Contexts3DCanvas.prototype.transform= function( a, b, c, d, e, f){
    this.save();
    this.scale(0.5,1);
    this.ctx1.transform( a, b, c, d, e, f);
    this.ctx2.transform( a, b, c, d, e, f);
    this.restore();
}




/**
 * Translate canvaces
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.translate
 * @example : ctx.translate( 0.5, 0.5);
 */

Contexts3DCanvas.prototype.translate = function( percentX, percentY){
    this.ctx1.translate(percentX, percentY);
    this.ctx2.translate(percentX, percentY);
}





/**
 * valueOf canvaces
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.valueOf
 * @example : ctx.valueOf( 0.5, 0.5);
 */

Contexts3DCanvas.prototype.valueOf = function( objt){
    return this.ctx1.valueOf(objt);
}




/**
 * create a circle ( for drawn need a fill or stroke after this)
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.circle
 * @example : ctx.circle(100, 100, 50, 0)
 */

Contexts3DCanvas.prototype.circle = function( x, y, radius, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.beginPath();
    this.arc( x, y, radius, 0, 2*Math.PI, true, pHorOffset);
    this.closePath();
    this.restore();
}






/**
 * draw a fill circle
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.fillCircle
 * @example : ctx.fillCircle(100, 100, 50, 0)
 */

Contexts3DCanvas.prototype.fillCircle = function( x, y, radius, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.beginPath();
    this.arc( x, y, radius, 0, 2*Math.PI, true, pHorOffset);
    this.ctx1.fillStyle = this.fillStyle;
    this.ctx2.fillStyle = this.fillStyle;
    this.fill();
    this.closePath();
    this.restore();
}


/**
 * draw a stroke circle
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.strokecircle
 * @example : ctx.strokeCircle(100, 100, 50, 0)
 */

Contexts3DCanvas.prototype.strokeCircle = function( x, y, radius, pHorOffset){
    this.setProperties();
    if(pHorOffset==undefined){
        pHorOffset=0;
    }
    this.save();
    this.beginPath();
    this.arc( x, y, radius, 0, 2*Math.PI, true, pHorOffset);
    this.stroke();
    this.closePath();
    this.restore();
}





/**
 * Return true or false depending if is created or not a new image
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.isCreated
 */

Contexts3DCanvas.prototype.isCreated = function(src){
    //fisrt time load image, always
    if(this.images.length == 0){
        this.images.push( new Images3DCanvas(src) );
        return false;
    }else{//second time, check if exist already that src
        var load = true;
        for (var i = 0; i < this.images.length; i++) {
            if(this.images[i].src == src){
                return true;
                load = false;
            }
        }
        if(load){//if not, create a new class for this image handle
            this.images.push( new Images3DCanvas(src) );
            return false;
        }
    }
}



/**
 * Return true or false depending if is loadd or not a new image
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.isLoaded
 */

Contexts3DCanvas.prototype.isLoaded = function(src){
    if(this.images.length>0){
        for (var i = 0; i < this.images.length; i++) {
            if(this.images[i].src == src){
                if(this.images[i].loaded){
                    return true;
                }
            }
        }
    }else{
        return false;
    }
}





/**
 * get image
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Contexts3DCanvas.prototype.getImage
 */

Contexts3DCanvas.prototype.getImage = function(src){
    for (var i = 0; i < this.images.length; i++) {
        if(this.images[i].src == src){
            return this.images[i].obj;
        }
    }
}





/**
 * Create Class for handle images on canvas(loaded error)
 *
 * @author Juan Acuña Silvera
 * @update 20/11/2015
 *
 */

function Images3DCanvas(src){
    this.src = src;
    this.obj = null;
    this.loaded = false;
    this.loadImage();
}




/**
 * loadImage just once
 *
 * @author Juan Acuña Silvera
 * @update 21/11/2015
 *
 * @method Images3DCanvas.prototype.loadImage
 */

Images3DCanvas.prototype.loadImage = function(){
    if(!this.loaded){
        var imageObj = new Image();
        var that = this;
        imageObj.onload = function (){
            that.obj = this;
            that.loaded = true;
        };
        imageObj.src = this.src;
    }
}



