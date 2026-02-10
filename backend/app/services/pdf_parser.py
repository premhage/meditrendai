import pdfplumber
import pytesseract
from pdf2image import convert_from_path
import os
from fastapi import UploadFile

async def parse_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    First tries pdfplumber for text-based PDFs.
    If no text is found, falls back to OCR using pytesseract.
    """
    text = ""
    try:
        # 1. Try pdfplumber
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                # Extract tables
                tables = page.extract_tables()
                if tables:
                    for table in tables:
                        for row in table:
                            # Clean and join row data
                            row_text = " ".join([str(cell) for cell in row if cell is not None])
                            text += row_text + "\n"
                
                # Extract plain text
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        # 2. If valid text extracted, return it
        if len(text.strip()) > 50:  # Arbitrary threshold to ensure meaningful text
            return text

        # 3. Fallback to OCR if text is empty or too short
        print("Falling back to OCR for PDF...")
        # Note: pdf2image requires poppler to be installed on the system
        try:
             images = convert_from_path(file_path)
             for i, image in enumerate(images):
                 page_text = pytesseract.image_to_string(image)
                 text += page_text + "\n"
        except Exception as e:
            print(f"OCR failed: {e}")
            # Identify if poppler is missing or other issue
            return f"Error: OCR failed. Please ensure Poppler is installed. Details: {e}"

    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""

    return text
