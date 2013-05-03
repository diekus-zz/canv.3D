/** SXS 3D CNV SOLO EXAMPLE PAGE **/

//main function
function sxs3dcnv_main() {
    cartman();
    //your code goes here
}

function cartman() {
    duoLineStyleDef(0, 'butt', 'miter', 4);
    duoStrokeStyle('rgba(0,0,0,0)');
    duoSave();

    //cara
    duoFillStyle("#ecceac");
    s3DBeginPath();
    s3DMoveTo(160.464, 33.797, 0);
    s3DBezierCurveTo(236.72292597188613, 33.797, 298.543, 83.59144240856896, 298.543, 145.016, -2);
    s3DBezierCurveTo(298.543, 206.440557591431, 236.72292597188613, 256.235, 160.464, 256.235, -2);
    s3DBezierCurveTo(84.20507402811385, 256.235, 22.38499999999999, 206.440557591431, 22.38499999999999, 145.016, -2);
    s3DBezierCurveTo(22.38499999999999, 83.59144240856896, 84.20507402811385, 33.797, 160.464, 33.797, -2);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //papada
    duoSave();
    duoSetStyle('transparent', '#000000'); //color de la boca
    duoLineStyleDef(0.75, 'butt', 'round', 10);
    s3DBeginPath();
    s3DMoveTo(54.163, 204.786, 0);
    s3DBezierCurveTo(54.163, 204.786, 160.84300000000002, 309.196, 272.816, 197.222);
    duoFill();
    duoStroke();
    duoRestore();

    //ojos
    duoSave();
    duoSetStyle('#ffffff', '#000000');
    ctx1.lineWidth = 0.75;
    ctx1.lineJoin = "round";
    ctx1.miterLimit = 10;
    s3DBeginPath();
    s3DMoveTo(159.824, 118.01, 0);
    s3DBezierCurveTo(163.026, 121.313, 165.287, 125.22500000000001, 166.637, 129.477, 3);
    s3DBezierCurveTo(167.887, 125.167, 170.069, 121.18, 173.209, 117.787, 3);
    s3DBezierCurveTo(185.85, 104.12200000000001, 209.279, 105.23700000000001, 225.53300000000001, 120.27600000000001, 3);
    s3DBezierCurveTo(241.78900000000001, 135.315, 244.722, 158.58300000000003, 232.078, 172.24900000000002, 3);
    s3DBezierCurveTo(219.439, 185.91400000000001, 196.012, 184.79900000000003, 179.75400000000002, 169.75900000000001, 3);
    s3DBezierCurveTo(173.33, 163.817, 168.99, 156.591, 166.865, 149.17600000000002, 3);
    s3DBezierCurveTo(164.916, 156.597, 160.761, 163.883, 154.51100000000002, 169.94100000000003, 3);
    s3DBezierCurveTo(138.66400000000001, 185.30300000000002, 115.35100000000003, 186.95800000000003, 102.44100000000003, 173.63900000000004, 3);
    s3DBezierCurveTo(89.52900000000002, 160.31700000000003, 91.90700000000002, 137.06800000000004, 107.75400000000003, 121.70600000000004, 3);
    s3DBezierCurveTo(123.602, 106.344, 146.914, 104.69, 159.824, 118.01, 3);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //separador ojos
    duoSave();
    duoFillStyle("transparent");
    duoStrokeStyle("#000000");
    ctx1.lineWidth = 0.75;
    ctx1.lineJoin = "round";
    ctx1.miterLimit = 10;
    s3DBeginPath();
    s3DMoveTo(166.646, 129.516, 3);
    s3DLineTo(166.836, 148.836, 3);
    duoFill();
    duoStroke();
    duoRestore();

    //pupila izquierda
    duoSave();
    s3DBeginPath();
    s3DArc(150.949, 142.804, 4.398, 0, 6.283185307179586, true, 5);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //pupila derecha
    duoSave();
    s3DBeginPath();
    s3DArc(179.604, 142.665, 4.397, 0, 6.283185307179586, true, 5);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();
    duoSave();

    //barbilla
    duoFillStyle("transparent");
    duoStrokeStyle("#000000");
    ctx1.lineWidth = 0.75;
    ctx1.lineJoin = "round";
    ctx1.miterLimit = 10;
    s3DBeginPath();
    s3DMoveTo(142.578, 233.737, 0);
    s3DBezierCurveTo(142.578, 233.737, 166.695, 241.114, 195.066, 233.454);
    duoFill();
    duoStroke();
    duoRestore();

    //gorro
    duoSave();
    duoFillStyle("#32919b");
    s3DBeginPath();
    s3DMoveTo(160.357, 33.017, 0);
    s3DBezierCurveTo(84.099, 33.017, 22.278999999999996, 82.81200000000001, 22.278999999999996, 144.236, 0);
    s3DBezierCurveTo(22.278999999999996, 144.447, 22.278999999999996, 144.658, 22.281999999999996, 144.87099999999998, 0);
    s3DBezierCurveTo(53.55799999999999, 122.80999999999997, 153.44599999999997, 58.880999999999986, 296.013, 123.38099999999998, 0);
    s3DBezierCurveTo(283.893, 71.925, 227.768, 33.017, 160.357, 33.017, 0);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //bolita gorro
    duoSave();
    duoFillStyle("#cbb31e");
    s3DBeginPath();
    s3DMoveTo(112.883, 39.767, 8);
    s3DBezierCurveTo(112.597, 39.929, 111.557, 49.602000000000004, 122.339, 48.656000000000006, 8);
    s3DBezierCurveTo(133.12, 47.712, 131.23, 36.172000000000004, 135.39, 39.76700000000001, 8);
    s3DBezierCurveTo(139.553, 43.360000000000014, 138.606, 50.92500000000001, 143.33399999999997, 49.03500000000001, 8);
    s3DBezierCurveTo(148.06399999999996, 47.14400000000001, 152.41299999999998, 38.63300000000001, 163.95299999999997, 46.19800000000001, 8);
    s3DBezierCurveTo(163.95299999999997, 46.19800000000001, 169.24799999999996, 49.41400000000001, 171.70699999999996, 43.550000000000004, 8);
    s3DBezierCurveTo(171.70699999999996, 43.550000000000004, 188.72799999999995, 44.30800000000001, 190.62099999999998, 42.794000000000004, 8);
    s3DBezierCurveTo(192.51199999999997, 41.279, 196.48399999999998, 37.307, 194.21499999999997, 33.903000000000006, 8);
    s3DBezierCurveTo(191.94499999999996, 30.498000000000004, 181.92199999999997, 20.475000000000005, 163.76199999999997, 20.475000000000005, 8);
    s3DBezierCurveTo(145.604, 20.474, 122.718, 22.932, 112.883, 39.767, 8);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();

    //boca  
    duoSave();
    duoFillStyle("transparent");
    duoStrokeStyle("#000000");
    ctx1.lineJoin = "round";
    ctx1.miterLimit = 10;
    s3DBeginPath();
    s3DMoveTo(149, 222.5, 0);
    s3DLineTo(188, 222.5, 0);
    duoFill();
    duoStroke();
    duoRestore();

    //línea sombrero
    duoSave();
    duoFillStyle("#cbb31e");
    s3DBeginPath();
    s3DMoveTo(21.429, 149.283, 0);
    s3DBezierCurveTo(21.456999999999997, 149.232, 147.402, 56.78999999999999, 299.477, 131.125, 0);
    s3DBezierCurveTo(299.477, 131.125, 307.41999999999996, 121.479, 297.491, 118.357, 0);
    s3DBezierCurveTo(287.562, 115.235, 168.965, 61.99, 67.392, 115.33, 0);
    s3DBezierCurveTo(67.392, 115.33, 22.563999999999993, 135.19, 18.307999999999992, 140.014, 0);
    s3DBezierCurveTo(18.308, 140.014, 16.038, 146.823, 21.429, 149.283, 0);
    s3DClosePath();
    duoFill();
    duoStroke();
    duoRestore();
    duoRestore();
}