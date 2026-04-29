from flask import Flask, request, jsonify
from flask_cors import CORS
from predict_digit import process_digit_image
from imageUpload import process_text_image
import os

API_TOKEN = os.environ.get("API_TOKEN", "predict_digit")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict-digit', methods=['POST'])
def predict_digit():
    token = request.headers.get("Authorization")
    if not token or token != f"Bearer {API_TOKEN}":
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({"error": "No image provided"}), 400

    try:
        results = process_digit_image(data['image'])
        print(results)
        return jsonify({"digits": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict-text', methods=['POST'])
def predict_text():
    token = request.headers.get("Authorization")
    if not token or token != f"Bearer {API_TOKEN}":
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({"error": "No image provided"}), 400

    try:
        text = process_text_image(data['image'])
        return jsonify({"text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
