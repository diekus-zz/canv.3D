/** SXS 3D CNV DEMO EXAMPLE PAGE **/

var squares = null;

//main function
function sxs3dcnv_main() {
    cHeight = jsCanvas.height;
    cWidth = jsCanvas.width;

    createSquares();
    drawSquares();

    //sxs3dcnv_anim_main();   //function to call to start animation loop
}

//generates initial positions for squares
function createSquares(n) {
    squares = new Array();
    for (i = 0; i < n; i++) {
        //get random initial characteristics for each cloud
        var ns = Math.round((Math.random() * 50 + 50));         //scale
        var nd = Math.floor((Math.random() * 10 - 4));                    //depth
        var nx = Math.floor((Math.random() * cWidth));                //initial x position
        var ny = Math.floor((Math.random() * 450));                   //initial y position
        var nv = Math.floor((Math.random() * 4)) + 1;                 //speed
        var no = Math.random() - 0.1;                                 //opacity

        var tSquare = new square(nx, ny, ns, ns, nd, nv, no);
        squares[n] = tSquare;
}

function drawsSquares() {
    for (var s in squares) {
        s3DRectangle(s.px, s.py, ps, ps, po);
    }
}

//square struct
function square(ppx, ppy, psx, psy, pv, po) {
    this.px = ppx;
    this.py = ppy;
    this.sx = psx;
    this.sy = psy;
    this.d = pd;
    this.v = pv;
    this.o = po;
}