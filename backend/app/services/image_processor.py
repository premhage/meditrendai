import pytesseract
from PIL import Image
import io

async def process_image(file_bytes: bytes) -> str:
    """
    Extract text from an image file using OCR.
    """
    try:
        # Open image using PIL
        image = Image.open(io.BytesIO(file_bytes))
        
        # Perform OCR
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        print(f"Error processing image: {e}")
        return ""
