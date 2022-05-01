
from flask import Flask, jsonify, request
from flask_cors import CORS

import base64
from io import BytesIO
from PIL import Image
import tensorflow as tf
from keras.preprocessing import image
from keras.applications.inception_resnet_v2 import InceptionResNetV2
from keras.applications.inception_resnet_v2 import preprocess_input, decode_predictions
from keras.preprocessing.image import smart_resize
import numpy as np

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
model = None

def load_model():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras)
    global model
    model = InceptionResNetV2(weights="imagenet")

def base64_pil(base64_str):
    image = base64.b64decode(base64_str)
    image = BytesIO(image)
    image = Image.open(image)
    return image

def prepare_image(img,target):
    # if the image mode is not RGB, convert it
    if img.mode != "RGB":
        img = image.convert("RGB")

    # resize the input image and preprocess it
    new_img = tf.image.resize_with_pad(
    img, 299, 299, method='bilinear',
    antialias=False
)
    x = image.img_to_array(new_img)
    x = x.copy()
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    # return the processed image
    return x

@app.route("/", methods=['POST'])
def test():
    # ensure an image was properly uploaded to our endpoint
    if request.method == "POST":
        data = request.json
        # read the image in PIL format
        img = base64_pil(data['image'])

        # preprocess the image and prepare it for classification
        x = prepare_image(img, target=(299, 299))

        # classify the input image and then return the list
        # of predictions to return to the client
        
        preds = model.predict(x)
        results = decode_predictions(preds, top=1)[0]
        _,label, probability = results[0]
        res = { 'Result' : label,
                'Probability':str(probability) }
        print("result is", res)
        # return as JSON response
        return jsonify(res)
    

if __name__ == '__main__':
    print(("* Loading Keras model and Flask starting server..."
        "please wait until server has fully started"))
    app.debug = True
    load_model()
    app.run(host ="0.0.0.0")