//SXS 3D CNV DUO ANIM EXAMPLE
//js objects needed to store the animation info for elements in the 'paisaje' example 
//Author: diekus
//date of creation: 8/9/2013
//date of last modification: 8/9/2013
//This is pre-release code. It needs cleanup and structure. Working on it. 
//This works based on the game loop idea. It updates code/variables/positions and then draws upon this.

//cloud array
var clouds = new Array();

//nube info container. px, py -> position. sx, sy -> scale. d -> depth. v -> velocity (speed).
function nubeG(ppx, ppy, psx, psy, pd, pv, po) {
    this.px = ppx;
    this.py = ppy;
    this.sx = psx;
    this.sy = psy;
    this.d = pd;
    this.v = pv;
    this.o = po;
}

//creates 'n' clouds and stores them in an array
function cloudGenerator(n) {
    for (i = 0; i < n; i++) {
        //get random initial characteristics for each cloud
        var ns = Math.round((Math.random() + 0.5 * 2 * 100) / 100);         //scale
        var nd = Math.floor((Math.random() * -9));                          //depth
        var nx = Math.floor((Math.random() * cWidth));                      //initial x position
        var ny = Math.floor((Math.random() * 450));                         //initial y position
        var nv = Math.floor((Math.random() * 10)) + 1;                         //speed
        var no = Math.random() + 0.15;                          //opacity

        var tCloud = new nubeG(nx, ny, ns, ns, nd, nv, no);
        clouds[i] = tCloud;
    }
}

//draws the clouds
function drawClouds() {
    for (r = 0; r < clouds.length; r++) {
        nube(clouds[r].px, clouds[r].py, clouds[r].sx, clouds[r].sy, clouds[r].d, clouds[r].o);
    }
}

//draws an html 5 logo
function html5Logo() {
    duoSave();
    duoTranslate(200, 100);

    duoStrokeStyle("rgba(0,0,0,0)");
    duoLineCap("butt");
    duoLineJoin("miter");
    duoMiterLimit("4");

    duoSave();
    duoFillStyle("#e34f26");
    duoLineWidth("0.20000000298023224");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(0, 0, -3) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(298.275, 0, -3) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(271.644, 304.275, -3) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.7, 339.084, -3) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(27.2843, 304.283, -3) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(0, 0, 0) /*last param represents horizontal shift. Change to add depth*/;
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //shield shine

    duoSave();
    duoFillStyle("#ef652a");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(271.884, 25.0466, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(149.956, 25.0467, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(149.987, 61.4665, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(242.745, 61.832, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(239.283, 98.766, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.019, 98.766, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.052, 137.349, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(236.315, 137.349, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(225.432, 252.108, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.169, 273.311, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.203, 312.919, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(248.139, 285.467, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(271.884, 25.0466, 10) /*last param represents horizontal shift. Change to add depth*/;
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //start 5 

    duoSave();
    duoFillStyle("#ebebeb");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(149.987, 61.4665, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(55.9388, 61.0959, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(65.584, 174.613, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.084, 174.613, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.052, 137.349, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(99.7908, 137.349, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(96.3283, 98.766, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.019, 98.766, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(149.987, 61.4665, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    duoSave();
    duoFillStyle("#ebebeb");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(149.091, 234.795, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(107.046, 222.594, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(104.408, 193.409, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(67.3088, 193.574, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(71.7606, 251.943, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(148.761, 273.708, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.169, 273.311, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.136, 234.49, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(149.091, 234.795, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    duoSave();
    duoFillStyle("#ffffff");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(239.283, 98.766, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(242.745, 61.832, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(149.987, 61.4665, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(150.019, 98.766, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(239.283, 98.766, 8) /*last param represents horizontal shift. Change to add depth*/;
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    duoSave();
    duoFillStyle("#ffffff");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(225.432, 252.108, 8);
    s3DLineTo(236.315, 137.349, 8);
    s3DLineTo(150.052, 137.349, 8);
    s3DLineTo(150.084, 174.613, 8);
    s3DLineTo(194.69, 174.613, 8);
    s3DLineTo(190.312, 222.758, 8);
    s3DLineTo(150.136, 234.49, 8);
    s3DLineTo(150.169, 273.311, 8);
    s3DLineTo(225.432, 252.108, 8);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //end 5

    duoRestore();
    duoRestore();
}

//paints the background
function fondo() {
    var gradient = ctx1.createLinearGradient(0,0,0, cHeight);
    gradient.addColorStop(0, "rgb(38, 173, 227)");
    gradient.addColorStop(1, "rgb(5, 84, 115)");

    s3DMoveTo(0, 0, 0);
    duoFillStyle(gradient);
    s3DRectangle(0, 0, 1920, 1080, 0);
}

//draws a cloud
function nube(ppx, ppy, psx, psy, pd, po) {
    duoSave();
    duoTranslate(ppx, ppy);
    duoScale(psx, psy);
    duoStrokeStyle("rgba(255,255,255,0)");
    duoLineCap("butt");
    duoLineJoin("miter");
    duoMiterLimit("4");
    duoSave();
    duoFillStyle("rgba(255,255,255,"+ po +")");
    duoLineWidth("0");
    duoLineJoin("round");
    s3DBeginPath();
    s3DMoveTo(29.8334, 37.3334, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(31.8846, 37.3334, 41.8116, 39.2826, 43.75, 39.6666, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(48.9003, 17.9242, 60.5164, -0.0000104904, 83.8334, -0.0000104904, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(102.833, -0.0000104904, 132.508, 13.4255, 140.75, 29.1666, 0) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(142.681, 28.8495, 144.663, 28.6846, 146.683, 28.6846, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(166.75, 28.6846, 186.255, 42.267, 186.255, 62.3334, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(186.255, 82.3997, 153.566, 98.6667, 133.5, 98.6667, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(83.8334, 98.6667, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DLineTo(30.0001, 98.6667, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(29.9446, 98.667, 29.889, 98.6667, 29.8334, 98.6667, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(12.8966, 98.6667, -0.00000286102, 79.6034, -0.00000286102, 62.6666, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DBezierCurveTo(2.25002, 45.6667, 12.8966, 37.3334, 29.8334, 37.3334, pd) /*last param represents horizontal shift. Change to add depth*/;
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();
    duoRestore();

}

//drawing example
function paisaje() {
    fondo();
 
    drawClouds();
    html5Logo();
}

//update to drawing example. ANimates objects
function updatePaisaje(){
    for (r = 0; r < clouds.length; r++) {
        if (clouds[r].px <= cWidth + 100) {
            clouds[r].px += clouds[r].v;
        }
        else {
            clouds[r].px = -100;
        }
    }
}
