from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image, ImageFilter
import numpy as np
import tensorflow as tf
from scipy.ndimage import center_of_mass, shift

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("mlp_mnist_model.h5")

def center_image(img_array):
    cy, cx = center_of_mass(img_array)
    shift_y = int(14 - cy)
    shift_x = int(14 - cx)
    return shift(img_array, [shift_y, shift_x], mode='constant')

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image data provided"}), 400

        # DEBUG: log length/type
        print("Received image data:", type(image_data), len(image_data))

        image_data = image_data.split(",")[1]  # will break if "test"
        image = Image.open(BytesIO(base64.b64decode(image_data))).convert("L").resize((28, 28))
        image = image.filter(ImageFilter.GaussianBlur(radius=0.5))
        image = Image.eval(image, lambda x: 255 - x)
        image = image.point(lambda p: 255 if p > 50 else 0)
        image = np.array(image)

        image = center_image(image)
        image = image.reshape(1, 784) / 255.0

        prediction = model.predict(image)
        predicted_digit = np.argmax(prediction)
        confidence = float(np.max(prediction)) * 100

        return jsonify({"prediction": int(predicted_digit), "confidence": round(confidence, 2)})

    except Exception as e:
        print("❌ ERROR:", str(e))  # <-- add this
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
