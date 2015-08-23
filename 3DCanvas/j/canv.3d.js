//CANV.3D
//HTML5 S3D dual canvas drawing toolkit
//Author: diekus
//date of creation: 25/4/2013
//date of last modification: 20/06/2015
//This is pre-release code. It needs cleanup and structure. Working on it. 
/*Can manage now several sets of canvases on a page!*/

var DEF_CANV3D = {
    CANVASES : {names:['cnv', 'cursor']},
    CURSOR: {}
};

var Canv3d = function(args){
    var _self = this;
    //global variables
    var jsCanvas1 = null;                   // DOM element for first ACTIVE canvas
    var jsCanvas2 = null;                   // DOM element for second ACTIVE canvas
    var ctx1 = null;                        // first ACTIVE canvas drawing context
    var ctx2 = null;                        // second ACTIVE canvas drawing context
    var jsCanvases = null;                  // DOM canvas elements for each canvas to be drawn on
    var activeDrawingCanvas = -1;           // specifies the ACTIVE drawing canvas
    var _canvasNames = new Array();              // array that contains the names of the canvases that will be drawn upon. Layers of canvases
    
    //defaults
    if(args !== undefined){
        _canvasNames = args.canvases || DEF_CANV3D.CANVASES.names;
    }
    else{
        _canvasNames = DEF_CANV3D.CANVASES.names;
    }    
    
    //starts the 3d canvas script
    var startDuoCanvas = function(){
        init('sxs3d_');
    }
    
    //changes the active *SET* of drawing context. By default it is the first canvas in the array
    this.changeActiveCtx = function(n) {
        try {
            if (n < jsCanvases.length) {
                jsCanvas1 = jsCanvases[n][0];
                jsCanvas2 = jsCanvases[n][2];
                ctx1 = jsCanvases[n][1];
                ctx2 = jsCanvases[n][3];
                activeDrawingCanvas = n;
            }
            else {
                jsCanvas1 = jsCanvases[0][0];
                jsCanvas2 = jsCanvases[0][2];
                ctx1 = jsCanvases[0][1];
                ctx2 = jsCanvases[0][3];
                activeDrawingCanvas = 0;
            }
        } catch (e) {
            console.log('current drawing context nonexistent.');
        }
    };
    
    var init = function() {
        //prepares all the canvases on the document
        jsCanvases = new Array(_canvasNames.length);
        for (icnv = 0; icnv < _canvasNames.length; icnv++) {
            console.log('preparing canvas ' + _canvasNames[icnv] + ' clone');
            jsCanvases[icnv] = prep3DCanvas(_canvasNames[icnv], 'sxs3d_' + _canvasNames[icnv]); //at this point we have an array with subarrays of 4. (canvas and clone, ctx and clone)
        }
        _self.changeActiveCtx(0); // first *SET* canvas (0 and 1)
        //main 
        //sxs3dcnv_main();
    };
    
    //prepares and initializes canvases for side by side drawing.
    //returns an array with both canvases
    var prep3DCanvas = function(pCnvName1, pCnvName2) {
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
    };
    
    var pushCanvas = function(val){
        _canvasNames.push(val);
    };
    
    //converts from degrees to radians
    var deg2Rad = function(degrees) {
        return degrees * Math.PI / 180;
    };
    
    //performs a dual canvas save
    this.duoSave = function() {
        ctx1.save();
        ctx2.save();
    };
    
    //performs a dual canvas restores
    this.duoRestore = function() {
        ctx1.restore();
        ctx2.restore();
    };
    
    //draws an image
    this.s3DImage = function(pImg, pPosX, pPosY, pHorOffset) {
        ctx1.save();
        ctx2.save();        
        var imageObj = new Image();
        imageObj.onload = function (){
            var dest1X = pPosX - pHorOffset;
            var dest2X = pPosX + pHorOffset;
            var destY = pPosY;
            ctx1.save();
            ctx2.save();
            ctx1.scale(0.5, 1);
            ctx2.scale(0.5, 1);
            ctx1.drawImage(this, dest1X, destY);
            ctx2.drawImage(this, dest2X, destY);
            ctx1.restore();
            ctx2.restore();
        };
        imageObj.src = pImg;
    
        ctx1.restore();
        ctx2.restore();
    };
    
    //draws an image
    this.s3DImageCustomSize = function(pImg, pPosX, pPosY, pW, pH, pHorOffset) {
        ctx1.save();
        ctx2.save();
        
        var imageObj = new Image();
        imageObj.onload = function (){
            var dest1X = pPosX - pHorOffset;
            var dest2X = pPosX + pHorOffset;
            var destY = pPosY;
            ctx1.save();
            ctx2.save();
            ctx1.scale(0.5, 1);
            ctx2.scale(0.5, 1);
            ctx1.drawImage(this, dest1X, destY, pW, pH);
            ctx2.drawImage(this, dest2X, destY, pW, pH);
            ctx1.restore();
            ctx2.restore();
        };
        imageObj.src = pImg;
    
        ctx1.restore();
        ctx2.restore();
    };
    
    //draws a s3d rectangle
    this.s3DRectangle = function (pPosX, pPosY, pAncho, pAlto, pHorOffset) {
        //draw original rect with width modification
        ctx1.fillRect((pPosX - pHorOffset) / 2, pPosY, pAncho / 2, pAlto);
        //draw clone
        ctx2.fillRect((pPosX + pHorOffset) / 2, pPosY, pAncho / 2, pAlto);
    };
    
    //draws a s3d circle
    this.s3DCircle = function(pPosX, pPosY, pRadius, pHorOffset) {
        ctx1.save();
        ctx1.scale(0.25, 0.5);
        ctx1.beginPath();
        ctx1.arc((pPosX - pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
        ctx1.fill();
        ctx1.closePath();
        ctx1.restore();
    
        ctx2.save();
        ctx2.scale(0.25, 0.5);
        ctx2.beginPath();
        ctx2.arc((pPosX + pHorOffset) * 2, pPosY * 2, pRadius * 2, 0, 2 * Math.PI, true);
        ctx2.fill();
        ctx2.closePath();
        ctx2.restore();
        
    };
    
    //begins a path (stereo) this path should have it's own shift
    this.s3DBeginPath = function(pHorOffset) {
        this.duoSave();
        ctx1.translate(-pHorOffset, 0);
        ctx1.beginPath();
        ctx2.translate(pHorOffset,0);
        ctx2.beginPath();
    };
    
    //ends a path (stereo)
    this.s3DClosePath = function() {
        ctx1.closePath();
        ctx2.closePath();
        this.duoRestore();
    };
    
    //stereo lineTo
    this.s3DLineTo = function(pPosX, pPosY) {
        ctx1.lineTo((pPosX)/2, pPosY);
        ctx2.lineTo((pPosX)/2, pPosY);
    };
    
    //stereo moveTo
    this.s3DMoveTo = function(pPosX, pPosY) {
        ctx1.moveTo((pPosX)/2, pPosY);
        ctx2.moveTo((pPosX)/2, pPosY);
    };
    //stereo stroke
    this.s3DStroke = function() {
        ctx1.stroke();
        ctx2.stroke();
    };
    
    //stereo fill
    this.s3DFill = function() {
        ctx1.fill();
        ctx2.fill();
    };
    
    //sets the stereo color
    this.duoSetStyle = function(pFill, pStroke) {
        ctx1.fillStyle = pFill;
        ctx2.fillStyle = pFill;
        ctx1.strokeStyle = pStroke;
        ctx2.strokeStyle = pStroke;
    };
    
    //draws a s3d arc
    this.s3DArc = function(pPosX, pPosY, pRadius, pStartAngle, pEndAngle, pDirection, pHorOffset) {
    
        ctx1.scale(0.5, 1);
        ctx1.arc(pPosX - pHorOffset, pPosY , pRadius , pStartAngle, pEndAngle, pDirection);
        ctx1.restore();
    
        ctx2.scale(0.5, 1);
        ctx2.arc(pPosX + pHorOffset, pPosY , pRadius , pStartAngle, pEndAngle, pDirection);
        ctx2.restore();
    };
    
    //draws s3d text
    this.s3DText = function(pText, pFontStyle, pIsFilled, pPosX, pPosY, pTextAlign, pTextBaseline, pHorOffset) {
        ctx1.font = pFontStyle;
        ctx2.font = pFontStyle;
        
        ctx1.textAlign = pTextAlign;
        ctx1.textBaseline = pTextBaseline;
        ctx2.textAlign = pTextAlign;
        ctx2.textBaseline = pTextBaseline;
    
        ctx1.save();
        ctx2.save();
    
        //set left clipping
        ctx1.scale(0.5, 1);
        //draw original
        if (pIsFilled)
            ctx1.fillText(pText, pPosX - pHorOffset, pPosY);
        else
            ctx1.strokeText(pText, pPosX - pHorOffset, pPosY);
        ctx1.restore();
    
        //set right clipping
        ctx2.scale(0.5, 1);
        //draw clone
        if (pIsFilled)
            ctx2.fillText(pText, pPosX + pHorOffset, pPosY);
        else
            ctx2.strokeText(pText, pPosX + pHorOffset, pPosY);
    
        ctx1.restore();
        ctx2.restore();
    };
    
    //draws stereo bezier curve
    this.s3DBezierCurveTo = function(pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY) {
    
        ctx1.save();
        ctx1.scale(0.5, 1);
        ctx1.bezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY);
        ctx1.restore();
    
        ctx2.save();
        ctx2.scale(0.5, 1);
        ctx2.bezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pX, pY);
        ctx2.restore();
    };
    
    //draws stereo quadratic bezier curve
    this.s3DQuadraticCurveTo = function(pCPX, pCPY, pX, pY){
        ctx1.save();
        ctx1.scale(0.5, 1);
        ctx1.quadraticCurveTo(pCPX, pCPY, pX, pY);
        ctx1.restore();
    
        ctx2.save();
        ctx2.scale(0.5, 1);
        ctx2.quadraticCurveTo(pCPX, pCPY, pX, pY);
        ctx2.restore();
    };
    
    //performs a dual canvas clipping
    this.duoClip = function() {
        ctx1.clip();
        ctx2.clip();
    };
    
    //performs a dual line cap styling
    this.duoLineCap = function(pLCap) {
        ctx1.lineCap = pLCap;
        ctx2.lineCap = pLCap;
    };
    
    //performs a dual line join styling
    this.duoLineJoin = function(pLJoin) {
        ctx1.lineJoin = pLJoin;
        ctx2.lineJoin = pLJoin;
    };
    
    //performs a dual line width styling
    this.duoLineWidth = function(pLW) {
        ctx1.lineWidth = pLW;
        ctx2.lineWidth = pLW;
    };
    
    //performs a dual mitter limit styling
    this.duoMiterLimit = function(pML) {
        ctx1.miterLimit = pML;
        ctx2.miterLimit = pML;
    };
    
    //performs a dual canvas translate
    this.duoTranslate = function(pX, pY) {
        ctx1.translate(pX, pY);
        ctx2.translate(pX, pY);
    };
    
    //performs a dual canvas scale
    this.duoScale = function(pX, pY) {
        ctx1.scale(pX, pY);
        ctx2.scale(pX, pY);
    };
    
    //performs a dual canvas fill
    this.duoFill = function() {
        ctx1.fill();
        ctx2.fill();
    };
    //performs a dual canvas stroke
    this.duoStroke = function() {
        ctx1.stroke();
        ctx2.stroke();
    };
    
    //sets the global alpha of the dual scene
    this.duoGlobalAlpha = function(value)
    {
        ctx1.globalAlpha = value;
        ctx2.globalAlpha = value;
    };
    
    //sets a dual canvas fill style
    this.duoFillStyle = function(pStyle) {
        ctx1.fillStyle = pStyle;
        ctx2.fillStyle = pStyle;
    };
    
    //sets a dual canvas stroke style
    this.duoStrokeStyle = function(pStyle) {
        ctx1.strokeStyle = pStyle;
        ctx2.strokeStyle = pStyle;
    };
    
    //clears both canvases
    this.duoClearRectColor = function(px, py, cWidth, cHeight, fillStyle) {
        this.duoSave();
        this.duoFillStyle(fillStyle);
        ctx1.fillRect(0, 0, cWidth, cHeight);
        ctx2.fillRect(0, 0, cWidth, cHeight);
        this.duoRestore();
    };
    
    //clears both canvases
    this.duoClearRect = function(px, py, cWidth, cHeight) {
        ctx1.clearRect(px, py, cWidth, cHeight);
        ctx2.clearRect(px, py, cWidth, cHeight);
    };
    
    //sets a dual canvas line style definition
    this.duoLineStyleDef = function(pWidth, pCap, pJoin, pMiter) {
        ctx1.lineWidth = pWidth;
        ctx2.lineWidth = pWidth;
        ctx1.lineCap = pCap;
        ctx2.lineCap = pCap;
        ctx1.lineJoin = pJoin;
        ctx2.lineJoin = pJoin;
        ctx1.miterLimit = pMiter;
        ctx2.miterLimit = pMiter;
    };
    
    startDuoCanvas();
    
    return _self;
};