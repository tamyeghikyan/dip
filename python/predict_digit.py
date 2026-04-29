import base64
import io
import os
import re
import numpy as np
from PIL import Image
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import ELU
from ultralytics import YOLO

modelYolo = YOLO('./models/number_finder.pt')
modelKeras = load_model("./models/model.h5", custom_objects={'ELU': ELU})
CONFIDENCE_THRESHOLD = 0.3
os.makedirs("./images", exist_ok=True)

def preprocess_and_center_digit(img):
    img = img.convert("L")  # Grayscale
    img_width, img_height = img.size
    new_img = Image.new('L', (28, 28), color=255)
    left = (28 - img_width) // 2
    top = (28 - img_height) // 2
    new_img.paste(img, (left, top))
    return new_img

def predict_digit(img):
    img = np.array(img)
    img = np.expand_dims(img, axis=-1)
    img = np.expand_dims(img, axis=0)
    img = 1 - img / 255.0
    prediction = modelKeras.predict(img)[0]
    return int(np.argmax(prediction)), float(np.max(prediction))

def process_digit_image(base64_image):
    image_data = base64.b64decode(re.sub('^data:image/.+;base64,', '', base64_image))
    image = Image.open(io.BytesIO(image_data)).convert("RGB")
    img_bgr = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    results = modelYolo.predict(img_bgr, conf=CONFIDENCE_THRESHOLD)[0]
    sorted_boxes = sorted(results.boxes, key=lambda box: box.xyxy[0][0].item())

    resultDigits = {}
    for i, box in enumerate(sorted_boxes):
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        digit_img = img_bgr[y1:y2, x1:x2]
        digit_img = cv2.cvtColor(digit_img, cv2.COLOR_BGR2RGB)
        digit_pil = Image.fromarray(digit_img)
        centered_img = preprocess_and_center_digit(digit_pil)
        digit, prediction = predict_digit(centered_img)

        resultDigits[i] = {
            "digit": int(digit),
            "prediction": float(prediction)
        }

    return resultDigits
