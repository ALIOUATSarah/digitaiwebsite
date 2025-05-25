from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import base64
import io
from PIL import Image, ImageOps
import tensorflow as tf

# Load your trained CNN model
model = tf.keras.models.load_model("cnn_mnist_model.h5")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow CORS for requests from your React frontend

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_data = data['image'].split(",")[1]  # Remove data:image/png;base64,

        # Convert base64 to grayscale image
        image = Image.open(io.BytesIO(base64.b64decode(image_data))).convert("L")

        # Resize to 28x28 (like MNIST) and invert for white digit on black background
        image = image.resize((28, 28))
        image = ImageOps.invert(image)

        # Convert to array and normalize
        img_array = np.array(image) / 255.0
        img_array = img_array.reshape(1, 28, 28, 1)

        # Make prediction
        prediction = model.predict(img_array)
        predicted_digit = int(np.argmax(prediction))
        confidence = int(np.max(prediction) * 100)

        return jsonify({
            "prediction": predicted_digit,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({ "error": str(e) })

if __name__ == "__main__":
    app.run(debug=True)
