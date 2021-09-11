
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

let isTrained_once = false;

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
    
    ctx.lineWidth = 800;
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
    
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    
    ctx.moveTo(coordP.x,coordP.y);
    getPosPhone(event);
    ctx.lineTo(coordP.x,coordP.y);

    ctx.stroke();
}

// how to change model topology
// https://stackoverflow.com/questions/63143849/tensorflow-js-error-unknown-layer-functional

// shape issue
// https://github.com/tensorflow/tfjs/issues/824

async function prediction()
{   
    
    user_image = document.getElementById("canvas");

    let tensor = tf.browser.fromPixels(user_image)
                           .resizeNearestNeighbor([28,28]).toFloat()
                           .mean(2)
                           .expandDims(2)
                           .expandDims()
                           .toFloat();
    tensor.div(255.0);

    //tensor = tensor.reshape([1,28,28,1]);
    console.log(tensor.shape);
    tensor.print();

    const model = await tf.loadLayersModel("weights/model.json");
    const predicted = await tf.tensor(model.predict(tensor).dataSync());

    const maxPrediction = predicted.argMax().dataSync()[0];
    console.log(maxPrediction);
}