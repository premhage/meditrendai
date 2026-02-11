import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadReport from './components/UploadReport';
import ResultsDashboard from './components/ResultsDashboard';
import TrendAnalysis from './components/TrendAnalysis';
import HowItWorks from './pages/HowItWorks';
import Privacy from './pages/Privacy';
import About from './pages/About';
import CookiePolicy from './pages/CookiePolicy';
import { Activity, Brain, TrendingUp, FileText } from 'lucide-react';

function Home() {
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

  // Show Hero/Features ONLY when no results/trends are active
  const showHero = !results && !trendData;

  return (
    <div className="w-full">
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="p-4 bg-warning-light border border-warning text-warning-DEFAULT rounded-lg flex items-center gap-2">
            <Activity className="w-5 h-5" />
            {error}
          </div>
        </div>
      )}

      {showHero ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary-light to-white pt-12 pb-20 lg:pt-20 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-fade-in">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
                    Understand Your <br />
                    <span className="text-primary">Health Reports</span>
                  </h1>
                  <p className="text-lg md:text-xl text-text-medium max-w-lg leading-relaxed">
                    AI-powered insights to help you understand your medical test results in simple language. No more confusing medical jargon.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      Analyze My Report
                    </button>
                    <Link to="/how-it-works" className="btn-secondary flex items-center justify-center">
                      Learn More
                    </Link>
                  </div>
                </div>

                {/* Right Image Placeholder */}
                <div className="relative hidden lg:block animate-slide-up">
                  <div className="bg-blue-100 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Doctor analyzing results"
                      className="w-full h-auto object-cover opacity-90"
                    />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-medical border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Activity className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">AI Analysis</p>
                      <p className="text-xs text-text-medium">98% Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-text-dark mb-4">Why use MediTrend AI?</h2>
                <p className="text-text-medium max-w-2xl mx-auto">
                  We combine advanced AI with medical expertise to simplify your healthcare journey.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="card p-8 group">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
                  <p className="text-text-medium leading-relaxed">
                    Instant insights from your lab reports using advanced pattern recognition and medical knowledge bases.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="card p-8 group">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Trend Tracking</h3>
                  <p className="text-text-medium leading-relaxed">
                    Visualize how your health metrics change over time by comparing multiple reports automatically.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="card p-8 group">
                  <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Plain Language</h3>
                  <p className="text-text-medium leading-relaxed">
                    We translate complex medical jargon into simple, easy-to-understand explanations for everyone.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* Upload/Results Section */}
      <section id="upload-section" className={`py-16 ${showHero ? 'bg-bg-gray' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!results && !trendData ? (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text-dark mb-4">Ready to analyze your report?</h2>
                <p className="text-text-medium">Upload your PDF or Image below. Secure, fast, and private.</p>
              </div>
              <UploadReport
                onUploadSuccess={handleUploadSuccess}
                onTrendAnalysisSuccess={handleTrendAnalysisSuccess}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          ) : results ? (
            <ResultsDashboard results={results} onReset={handleReset} />
          ) : (
            <TrendAnalysis analysis={trendData} onReset={handleReset} />
          )}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-gray font-sans text-text-dark flex flex-col">
        {/* Fixed Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 print:hidden h-20 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Activity className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <span className="text-2xl font-bold text-text-dark tracking-tight">MediTrend AI</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-medium">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/how-it-works" className="hover:text-primary transition-colors">How it works</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>

              <a
                href="/#upload-section"
                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg font-semibold"
              >
                Upload Report
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/cookies" element={<CookiePolicy />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-16 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-xl text-text-dark">MediTrend AI</span>
                </Link>
                <p className="text-text-medium text-sm leading-relaxed">
                  Making healthcare data accessible and understandable for everyone through advanced AI analysis.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-text-dark mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm text-text-medium">
                  <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link to="/how-it-works" className="hover:text-primary transition-colors">Process</Link></li>
                  <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-text-dark mb-6">Legal</h4>
                <ul className="space-y-3 text-sm text-text-medium">
                  <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-text-dark mb-6">Contact</h4>
                <ul className="space-y-3 text-sm text-text-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    premhage8@gmail.com
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Team TechSutra
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Pune, India
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 text-center">
              <p className="text-text-light text-xs">
                © 2026 MediTrend AI. This tool is for educational purposes only and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
