
// Canvas

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

ctx.canvas.width = 280;
ctx.canvas.height = 280;

canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",stopPainting);
canvas.addEventListener("mousemove",sketch);

canvas.addEventListener("touchstart",startPaintingPhone);
canvas.addEventListener("touchmove",sketchPhone);
canvas.addEventListener("touchcancel",stopPaintingPhone);

// Browser

let coord = {x:0 , y:0};
let isDrawing = false;

function getPos(event){
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event){
    isDrawing= true;
    getPos(event);
}

function stopPainting(){
    isDrawing = false;
}

function sketch(event){
    
    if(! isDrawing ) return;

    ctx.beginPath();
    
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    
    ctx.moveTo(coord.x,coord.y);
    getPos(event);
    ctx.lineTo(coord.x,coord.y);

    ctx.stroke();
}

// For mobile

let coordP = {x:0 , y:0};
let isDrawingP = false;

function getPosPhone(event){
    let touch = event.touches[0];
    coordP.x = touch.clientX - canvas.offsetLeft;
    coordP.y = touch.clientY - canvas.offsetTop;
}


function startPaintingPhone(event){
    isDrawingP= true;
    getPosPhone(event);
}

function stopPaintingPhone(){
    isDrawingP = false;
}

function sketchPhone(event){

    if(! isDrawingP ) return;

    ctx.beginPath();
    
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    
    ctx.moveTo(coordP.x,coordP.y);
    getPosPhone(event);
    ctx.lineTo(coordP.x,coordP.y);

    ctx.stroke();
}

function sendPic()
{
    let dataURL = canvas.toDataURL();
    $.ajax({
        type: "POST",
        url : "/draw",
        data : {
            image: dataURL
        }
    }).done((res) => {
        $("#result").html("The prediction is " + res);
    })
}

