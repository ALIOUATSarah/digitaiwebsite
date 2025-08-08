from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("cnn_mnist_model.h5")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "No image data provided"}), 400

    image_data = image_data.split(",")[1]
    image = (
        Image.open(BytesIO(base64.b64decode(image_data))).convert("L").resize((28, 28))
    )
    image = np.array(image).reshape(1, 28, 28, 1) / 255.0

    prediction = model.predict(image)
    predicted_digit = np.argmax(prediction)
    confidence = float(np.max(prediction)) * 100

    return jsonify(
        {"prediction": int(predicted_digit), "confidence": round(confidence, 2)}
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
