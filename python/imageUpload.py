import base64
import re
from PIL import Image
from io import BytesIO
import pytesseract


# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def process_text_image(base64_image):
    base64_clean = re.sub('^data:image/.+;base64,', '', base64_image)
    image_data = base64.b64decode(base64_clean)
    image = Image.open(BytesIO(image_data))
    text = pytesseract.image_to_string(image, lang='hye', config='--psm 6')
    return text.strip()
