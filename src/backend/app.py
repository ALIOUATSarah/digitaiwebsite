import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image, ImageFilter
import numpy as np
import tensorflow as tf
from scipy.ndimage import center_of_mass, shift
import os

BASE_DIR = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, "mlp_mnist_model.h5")
model = tf.keras.models.load_model(model_path)


app = Flask(__name__)
CORS(app)


@app.route("/healthcheck", methods=["GET"])
def healthcheck():
    return jsonify({"status": "good"}), 200


def center_image(img_array):
    cy, cx = center_of_mass(img_array)
    shift_y = int(14 - cy)
    shift_x = int(14 - cx)
    return shift(img_array, [shift_y, shift_x], mode="constant")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "No image data provided"}), 400

    try:
        image_data = image_data.split(",")[1]
        decoded = base64.b64decode(image_data)

        print("✅ Decoded image size (bytes):", len(decoded))  # Add this
        image = Image.open(BytesIO(decoded)).convert("L").resize((28, 28))
        image = np.array(image).reshape(1, 28, 28, 1) / 255.0

        prediction = model.predict(image)
        predicted_digit = np.argmax(prediction)
        confidence = float(np.max(prediction)) * 100

        return jsonify(
            {"prediction": int(predicted_digit), "confidence": round(confidence, 2)}
        )

    except Exception as e:
        print("❌ Exception in /predict:", str(e))
        return jsonify({"error": "Failed to process image", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
