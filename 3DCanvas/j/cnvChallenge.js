function start() {
    var jsCanvas1 = document.getElementById('miCanvas');
    ctx1 = jsCanvas1.getContext('2d');
    ctx1.fillStyle = "#0Fa823";
    ctx1.fillRect(0, 0, 1000, 1000);
    ctx1.fillStyle = "#000000";
    ctx1.font = "20px Arial";
    ctx1.fillText("Canvas Challenge", 10, 50);
    
}