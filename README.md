# MediTrend AI

MediTrend AI is an intelligent medical report analyzer that helps patients understand their lab test results through AI-powered insights and trend analysis.

## Features
- **PDF & Image Upload**: Parse medical reports from PDF documents or images (JPG, PNG).
- **AI Explanations (Gemini)**: Get simple, plain-English explanations for complex medical terms using Google's Gemini AI.
- **Trend Analysis**: Upload multiple reports to visualize how your health metrics change over time with interactive charts.
- **Health Score**: Instant overview of your health status based on the report.
- **Print Friendly**: Generate clean, printable versions of your analysis for doctor visits.
- **Privacy Focused**: Files are processed temporarily and not stored permanently.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend**: Python, FastAPI, Google Generative AI (Gemini), PDFPlumber, Tesseract OCR

## Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- **Tesseract OCR** (Required for image processing)
  - Windows: [Download Installer](https://github.com/UB-Mannheim/tesseract/wiki)
  - **Important**: Add Tesseract installation folder to your system PATH.
- **Poppler** (Required for PDF processing)
  - Windows: [Download Binary](https://github.com/oschwartz10612/poppler-windows/releases/)
  - **Important**: Add Poppler `bin` folder to your system PATH.

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file and add your Google Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_starting_with_AIza...
# Optional debug mode
DEBUG=True
```

Run the server:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Docker Deployment (Easy Start)

If you have Docker installed, you can run the entire stack with one command:

1. Create a `.env` file in the `backend` folder with your `GEMINI_API_KEY`.
2. Run:
```bash
docker-compose up --build
```
3. Access the app at `http://localhost:3000`.

## Usage
1. **Single Report**: Upload a PDF or Image of your lab results to get a detailed breakdown.
2. **Track Trends**: Switch to "Track Health Trends" mode and upload multiple reports (e.g., from different dates) to see line charts of your progress.
3. **Print**: Use the print button to save a physical copy or PDF for your records.

## Disclaimer
**This tool is for educational purposes only.** It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
