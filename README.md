# MediTrend AI

MediTrend AI is an intelligent medical report analyzer that helps patients understand their lab test results through AI-powered insights and trend analysis.

## Features
- **PDF & Image Upload**: Parse medical reports from PDF documents or images (JPG, PNG).
- **AI Explanations**: Get simple, plain-English explanations for complex medical terms.
- **Health Score**: Instant overview of your health status based on the report.
- **Recommendations**: Personalized health tips based on abnormal values.
- **Privacy Focused**: Files are processed temporarily and not stored permanently.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React
- **Backend**: Python, FastAPI, PDFPlumber, Tesseract OCR, OpenAI/Anthropic

## Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Tesseract OCR (Optional for image support, but recommended)
  - Windows: [Download Installer](https://github.com/UB-Mannheim/tesseract/wiki)
  - Ensure Tesseract is in your system PATH.
- Poppler (Required for PDF-to-Image conversion)
  - Windows: [Download Binary](https://github.com/oschwartz10612/poppler-windows/releases/)
  - Add `bin` folder to your system PATH.

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

Create a `.env` file (copy from `.env.example` if available, or create new):
```env
ANTHROPIC_API_KEY=your_api_key_here
OPENAI_API_KEY=your_api_key_here
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

## Usage
1. Open the frontend URL.
2. Drag and drop a medical report (PDF) or take a photo of your lab results.
3. Wait for the AI to analyze the data.
4. View your health score, detailed explanations, and recommendations.

## Disclaimer
**This tool is for educational purposes only.** It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
