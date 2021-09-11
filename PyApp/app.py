from flask import Flask, app,render_template,request,jsonify
import base64
import numpy as np
from io import BytesIO
from PIL import Image
import re
import onnxruntime

app = Flask(__name__)
 
alphabets = {
    1 : "a",
    2 : "b",
    3 : "c",
    4 : "d",
    5 : "e",
    6 : "f",
    7 : "g",
    8 : "h",
    9 : "i",
    10 : "j",
    11 : "k",
    12 : "l",
    13 : "m",
    14 : "n",
    15 : "o",
    16 : "p",
    17 : "q",
    18 : "r",
    19 : "s",
    20 : "t",
    21 : "u",
    22 : "v",
    23 : "w", 
    24 : "x",
    25 : "y",
    26 : "z",
}


@app.route("/draw",methods=["POST","GET"])
def ai():

    if request.method == "POST": # how to get image from canvas to flask --> https://stackoverflow.com/questions/31077366/pil-cannot-identify-image-file-for-io-bytesio-object
        
        image_b64 = request.values['image']
        image_data = re.sub('^data:image/.+;base64,','',image_b64) # replaces data:image/.+;base64, with empty space
        decoded = base64.b64decode(image_data)

        image_PIL = Image.open(BytesIO(decoded))
        image_PIL.save("image.png")
        
        image_np = np.array(image_PIL,dtype=np.float32)
        
        session = onnxruntime.InferenceSession("onnx_model.onnx")
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        result = np.array(session.run(None, {input_name: image_np}))
        
        alpha_index  = result.argmax()
        alpha = alphabets[alpha_index + 1]
        
        return alpha

    else:
        return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)