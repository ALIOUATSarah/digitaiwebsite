import os, base64
from io import BytesIO
import numpy as np
from PIL import Image, ImageOps
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from scipy.ndimage import center_of_mass, shift

# ====== CONFIG based on your training ======
FLAT_INPUT = True        # (1, 784)
NORM = "0_1"             # divide by 255.0
INVERT = True            # canvas black-on-white -> invert -> white-on-black (MNIST style)
# ===========================================

BASE_DIR = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, "mlp_mnist_model.h5")
model = tf.keras.models.load_model(model_path)

app = Flask(__name__)
CORS(app)

@app.get("/healthcheck")
def healthcheck():
    return jsonify({"status": "good"}), 200

def center_image(img28: np.ndarray) -> np.ndarray:
    mask = (img28 > 0.2).astype(np.float32)
    if mask.sum() == 0:
        return img28
    cy, cx = center_of_mass(mask)
    return shift(img28, [14 - cy, 14 - cx], mode="constant", cval=0.0)

def preprocess_pil(pil_img: Image.Image) -> np.ndarray:
    # Ensure white background (handles RGBA from canvas)
    if pil_img.mode in ("RGBA", "LA"):
        bg = Image.new("RGBA", pil_img.size, (255, 255, 255, 255))
        bg.paste(pil_img, mask=pil_img.split()[-1])
        pil_img = bg.convert("L")
    else:
        pil_img = pil_img.convert("L")

    # Resize to 28x28
    pil_img = pil_img.resize((28, 28), Image.BILINEAR)

    x = np.array(pil_img).astype("float32")  # 0..255

    if INVERT:
        x = 255.0 - x

    # normalize like training
    if NORM == "0_1":
        x = x / 255.0

    # optional light binarize helps thin strokes
    # x = (x > 0.2).astype("float32")

    # center like many MNIST demos (optional but helps)
    x = center_image(x)

    # shape for your MLP
    x = x.reshape(1, 28 * 28)  # (1, 784)
    return x

@app.post("/predict")
def predict():
    data = request.get_json(silent=True) or {}
    b64 = data.get("image") or data.get("b64")
    if not b64:
        return jsonify({"error": "No image data provided"}), 400

    try:
        if b64.startswith("data:image"):
            b64 = b64.split(",", 1)[1]

        img = Image.open(BytesIO(base64.b64decode(b64)))
        x = preprocess_pil(img)

        probs = model.predict(x, verbose=0)[0]
        pred = int(np.argmax(probs))
        conf = float(np.max(probs)) * 100.0

        return jsonify({
            "prediction": pred,
            "confidence": round(conf, 2),
            "debug": {"input_shape": list(x.shape), "invert": INVERT, "norm": NORM}
        })
    except Exception as e:
        return jsonify({"error": "Failed to process image", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
