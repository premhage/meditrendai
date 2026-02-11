import React, { useState } from 'react';
import UploadReport from './components/UploadReport';
import ResultsDashboard from './components/ResultsDashboard';
import TrendAnalysis from './components/TrendAnalysis';
import { Activity } from 'lucide-react';

function App() {
  const [results, setResults] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadSuccess = (data) => {
    setResults(data);
    setTrendData(null);
    setError(null);
  };

  const handleTrendAnalysisSuccess = (data) => {
    setTrendData(data);
    setResults(null);
    setError(null);
  };

  const handleReset = () => {
    setResults(null);
    setTrendData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-primary/10 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">MediTrend AI</h1>
              <p className="text-xs text-gray-500 font-medium">Smart Medical Report Analysis</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">How it works</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {!results && !trendData ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Understand Your Lab Results <br />
                <span className="text-primary">In Seconds</span>
              </h2>
              <p className="text-lg text-gray-600">
                Upload your medical report (PDF or Image) and let our AI explain your health metrics in plain English.
              </p>
            </div>
            <UploadReport
              onUploadSuccess={handleUploadSuccess}
              onTrendAnalysisSuccess={handleTrendAnalysisSuccess}
              setLoading={setLoading}
              setError={setError}
            />
          </div>
        ) : results ? (
          <ResultsDashboard
            results={results}
            onReset={handleReset}
          />
        ) : (
          <TrendAnalysis
            analysis={trendData}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Activity className="w-5 h-5" />
              <span className="font-bold text-lg">MediTrend AI</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Empowering patients with clear, AI-driven insights from their medical data.
              We help you track trends and understand your health journey.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>support@meditrend.ai</li>
              <li>Team TechSutra</li>
              <li>Pune, India</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© 2026 MediTrend AI. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">
            Disclaimer: This tool is for educational purposes only and does not constitute medical advice.
            Always consult with a qualified healthcare provider.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
