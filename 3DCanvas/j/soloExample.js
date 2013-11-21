/** SXS 3D CNV SOLO EXAMPLE PAGE **/

//starts SXS3DCNV SOLO. Main entrance point
$(document).ready(function () {
    //ready canvas names
    canvasNames[0] = 'miCanvas1';
    startSoloCanvas(); //do not remove this line
});

//main function
function sxs3dcnv_main() {
    objectField(200, 35, 0); //EXAMPLE object field drawing
    //your code goes here
}

/**
BENEATH THIS LINE IS A SIMPLE EXAMPLE OF STEREOSCOPIC 3D DRAWING. REPLACE WITH YOUR ACTUAL CODE.
**/

//example drawing. Star fields
function objectField(pQuant, maxRadius, objectType) {
    ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255,' + Math.random() + ')';

    var rX = Math.floor((Math.random() * jsCanvas.width) + 1);
    var rY = Math.floor((Math.random() * jsCanvas.height) + 1);
    var rR = Math.floor((Math.random() * maxRadius) + 1);
    var rO = Math.floor((Math.random() * 10) + 1);

    for (var i = 0; i < pQuant; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255,' + Math.random() + ')';
        rX = Math.floor((Math.random() * jsCanvas.width) + 1);
        rY = Math.floor((Math.random() * jsCanvas.height) + 1);
        rR = Math.floor((Math.random() * maxRadius) + 1);
        rO = Math.floor((Math.random() * 10) + 1);

        switch (objectType) {
            case 0: // circles
                s3DCircle(rX, rY, rR, rO);
                break;
            case 3: // triangles
                s3DPolygon(rX, rY, rR, 3, rO);
                break;
            case 4: // diamond
                s3DPolygon(rX, rY, rR, 4, rO);
                break;
            case 5: // pentagon
                s3DPolygon(rX, rY, rR, 5, rO);
                break;
            case 6: // hexagon
                s3DPolygon(rX, rY, rR, 6, rO);
                break;
            case 7: // heptagon
                s3DPolygon(rX, rY, rR, 7, rO);
                break;
            case 8: // octogon
                s3DPolygon(rX, rY, rR, 8, rO);
                break;
        }
    }
}
