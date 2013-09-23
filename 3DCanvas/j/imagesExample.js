//preload images
//the index corresponds to he number found in the id of each image.
var imagesForDrawing = new Array();
imagesForDrawing[0] = 'http://diekus.net/i/j8ngo.png';
imagesForDrawing[1] = 'http://diekus.net/i/sxs3d_Shield_logo.png';
imagesForDrawing[2] = 'http://www.tntmagazine.com/media/costa-rica-parrots.jpg';


function sxs3dcnv_main() {
    var img3DShield = document.getElementById('img_2');
    s3DImage(img3DShield, 100, 100, 3);

};