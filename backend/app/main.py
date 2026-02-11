import os
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="MediTrend AI API")

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
    "*" # For development convenience
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

from app.services.pdf_parser import parse_pdf
from app.services.image_processor import process_image
from app.services.data_extractor import extract_parameters
from app.services.llm_service import generate_explanation, get_health_recommendations
from app.services.trend_analyzer import analyze_trends

@app.get("/")
async def root():
    return {"message": "Welcome to MediTrend AI API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "MediTrend AI"}

async def process_file_content(file: UploadFile):
    """
    Helper function to process a single file and extract parameters.
    Returns a dictionary with filename and parameters.
    """
    try:
        file_ext = file.filename.split(".")[-1].lower()
        content = await file.read()
        
        # Save file temporarily
        # Basic validation
        if len(file.filename) > 255:
            return None

        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(content)
            
        # Validate Magic Numbers / File Signature
        # PDF: %PDF (25 50 44 46)
        # JPG: FF D8 FF
        # PNG: 89 50 4E 47
        
        is_valid = False
        if file_ext == "pdf" and content.startswith(b'%PDF'):
            is_valid = True
        elif file_ext in ["jpg", "jpeg"] and content.startswith(b'\xff\xd8\xff'):
            is_valid = True
        elif file_ext == "png" and content.startswith(b'\x89PNG\r\n\x1a\n'):
            is_valid = True
            
        if not is_valid:
            os.remove(file_path)
            print(f"Invalid file signature for {file.filename}")
            return None
            
        text = ""
        if file_ext == "pdf":
            text = await parse_pdf(file_path)
        elif file_ext in ["jpg", "jpeg", "png"]:
            text = await process_image(content)
        else:
            os.remove(file_path) # Cleanup if invalid
            return None
            
        # Cleanup
        os.remove(file_path)
        
        if not text:
            return None
            
        parameters = extract_parameters(text)
        return {
            "filename": file.filename,
            "parameters": parameters
        }
    except Exception as e:
        print(f"Error processing {file.filename}: {e}")
        return None

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        result = await process_file_content(file)
        if not result:
             raise HTTPException(status_code=400, detail="Could not extract text from file or unsupported format.")
        
        parameters = result['parameters']
        
        # Generate explanations
        full_analysis = []
        abnormal_count = 0
        
        for param in parameters:
            explanation = await generate_explanation(
                param['parameter'], 
                param['value'], 
                param['unit'], 
                param['status'],
                param['reference_range_display']
            )
            param['explanation'] = explanation
            full_analysis.append(param)
            if param['status'] != 'normal':
                abnormal_count += 1
                
        # Get overall recommendations
        abnormal_params = [p for p in parameters if p['status'] != 'normal']
        recommendations = await get_health_recommendations(abnormal_params)
        
        # Calculate Health Score
        total = len(parameters)
        score = int(((total - abnormal_count) / total) * 100) if total > 0 else 0
        
        return {
            "success": True,
            "filename": result['filename'],
            "health_score": score,
            "summary": {
                "total_tests": total,
                "normal": total - abnormal_count,
                "abnormal": abnormal_count
            },
            "parameters": full_analysis,
            "recommendations": recommendations
        }

    except Exception as e:
        print(f"Error processing file: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze-trends")
async def analyze_trends_endpoint(files: List[UploadFile] = File(...)):
    """
    Endpoint to upload multiple files and analyze trends.
    """
    reports_data = []
    
    for file in files:
        result = await process_file_content(file)
        if result and result['parameters']:
            reports_data.append(result)
            
    if len(reports_data) < 2:
        raise HTTPException(status_code=400, detail="Please upload at least 2 valid reports to analyze trends.")
        
    trend_analysis = await analyze_trends(reports_data)
    
    return {
        "success": True,
        "report_count": len(reports_data),
        "analysis": trend_analysis
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
