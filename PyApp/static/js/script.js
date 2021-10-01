
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
    //coord.y = (event.clientY + 410) - canvas.offsetTop;
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
    //coordP.y = (touch.clientY + 660) - canvas.offsetTop;
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

document.getElementById("clear-btn").addEventListener("click",() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("result").innerText = "Please Draw";
});


// AI STUFFS

let query = "";
const query_input = document.getElementById("ex3");

document.getElementById("drawing-btn").addEventListener("click",() => {
    let dataURL = canvas.toDataURL();
    $.ajax({
        type: "POST",
        url : "/",
        data : {
            image: dataURL
        }
    }).done((res) => {
        $("#result").html("The prediction is " + res);
        query += res;
        query_input.value = query;    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
})

document.getElementById("clr-txt-btn").addEventListener("click",() => {
    query = query.slice(0,-1);
    console.log(query);
    query_input.value = query;
});

// FOR IMAGE
 
document.getElementById("img-btn").addEventListener("click" , (event) => {
    event.preventDefault();

    posibilities = combinations(query);
    console.log("posibilities :: ",posibilities);

    for(let i=0;i<posibilities.length;i++){
        // create the div with class carousel-item

        let div = document.createElement("div");
        div.classList.add("carousel-item");

        // create the img with class d-block w-100
        
        const image_src = 'https://source.unsplash.com/weekly?' + posibilities[i] + '/';
        let img = document.createElement("img");
        img.classList.add("d-block");
        img.classList.add("w-100");
        img.width = 600;
        img.height = 600;
        img.src = image_src;
        
        // adding the image into the div

        div.appendChild(img);

        document.getElementById("container").appendChild(div);
    }

    // const image_src = 'https://source.unsplash.com/weekly?' + query + '/';
    // const image  = document.getElementById("image-generator");
    // image.src = image_src;
    
});

let combinations = (text) => {

    let characters = [',','.','/',';',':','"',"'"];
    let posibilities = []

    posibilities.push(text);

    let string = "";

    for(let i=0;i<characters.length;i++){
        string += characters[i];
        string += text;
        for(let j=i;j<characters.length;j++){
            string += characters[j];
            posibilities.push(string);
        }
        string = "";
    }

    return posibilities;

};