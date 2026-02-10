import os
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

@app.get("/")
async def root():
    return {"message": "Welcome to MediTrend AI API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "MediTrend AI"}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_ext = file.filename.split(".")[-1].lower()
        content = await file.read()
        
        # Save file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(content)
            
        text = ""
        if file_ext == "pdf":
            text = await parse_pdf(file_path)
        elif file_ext in ["jpg", "jpeg", "png"]:
            text = await process_image(content)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, JPG, or PNG.")
            
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from file.")
            
        # Extract parameters
        parameters = extract_parameters(text)
        
        # Generate explanations (Simulated async for now, can be parallelized)
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
        abnormal_params = [p for p in extract_parameters(text) if p['status'] != 'normal'] # Re-extracting small opt
        recommendations = await get_health_recommendations(abnormal_params)
        
        # Calculate Health Score (Simple logic: % of normal params)
        total = len(parameters)
        score = int(((total - abnormal_count) / total) * 100) if total > 0 else 0
        
        # Cleanup
        os.remove(file_path)
        
        return {
            "success": True,
            "filename": file.filename,
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
