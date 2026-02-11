import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, ImageIcon, X, TrendingUp, Plus, CheckCircle, Loader2 } from 'lucide-react';

const UploadReport = ({ onUploadSuccess, onTrendAnalysisSuccess, setLoading, setError }) => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [mode, setMode] = useState('single'); // 'single' or 'trends'
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (newFiles) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        const validFiles = newFiles.filter(file => {
            if (!validTypes.includes(file.type)) {
                setError(`File ${file.name} is not a supported format.`);
                return false;
            }
            if (file.size > 10 * 1024 * 1024) {
                setError(`File ${file.name} is too large (max 10MB).`);
                return false;
            }
            return true;
        });

        if (mode === 'single') {
            setFiles([validFiles[0]]);
        } else {
            setFiles(prev => [...prev, ...validFiles]);
        }
        setError(null);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        setLoading(true);
        setError(null);

        const formData = new FormData();

        try {
            let endpoint = '';

            if (mode === 'single') {
                endpoint = 'http://localhost:8000/api/upload';
                formData.append('file', files[0]);

                const response = await axios.post(endpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.data.success) {
                    onUploadSuccess(response.data);
                } else {
                    setError("Analysis failed. Please try again.");
                }
            } else {
                endpoint = 'http://localhost:8000/api/analyze-trends';
                files.forEach(file => {
                    formData.append('files', file);
                });

                const response = await axios.post(endpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.data.success) {
                    onTrendAnalysisSuccess(response.data.analysis);
                } else {
                    setError("Trend analysis failed. Require at least 2 valid reports.");
                }
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "An error occurred. Ensure backend is running.");
        } finally {
            setUploading(false);
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-8 animate-fade-in">

            {/* Mode Switcher */}
            <div className="flex p-1.5 bg-gray-100 rounded-xl shadow-inner">
                <button
                    onClick={() => { setMode('single'); setFiles([]); setError(null); }}
                    className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform 
                    ${mode === 'single'
                            ? 'bg-white shadow-md text-primary scale-[1.02]'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}
                >
                    Single Report Analysis
                </button>
                <button
                    onClick={() => { setMode('trends'); setFiles([]); setError(null); }}
                    className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform flex items-center justify-center gap-2
                    ${mode === 'trends'
                            ? 'bg-white shadow-md text-primary scale-[1.02]'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}
                >
                    <TrendingUp className="w-4 h-4" /> Track Health Trends
                </button>
            </div>

            {/* Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 ease-out text-center group cursor-pointer overflow-hidden
                    ${dragActive
                        ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg ring-4 ring-primary/10'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 hover:scale-[1.01] hover:shadow-md'}
                    ${files.length > 0 ? 'bg-white border-solid border-gray-200' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple={mode === 'trends'}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                />

                {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <Upload className="w-10 h-10" />
                        </div>
                        <p className="text-xl font-bold text-gray-800 mb-2">
                            {mode === 'single' ? 'Upload Your Report' : 'Upload Reports to Compare'}
                        </p>
                        <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto leading-relaxed">
                            Drag & drop your PDF or Image here, or click to browse files
                        </p>
                        <div className="flex gap-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                            <span className="bg-gray-100 px-2 py-1 rounded">PDF</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">JPG</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">PNG</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm animate-slide-up">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        {file.type === 'application/pdf' ? (
                                            <FileText className="w-6 h-6 text-red-500" />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-gray-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(idx)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-red-500"
                                    disabled={uploading}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}

                        {mode === 'trends' && (
                            <button
                                onClick={() => inputRef.current?.click()}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-primary hover:border-primary/50 flex items-center justify-center gap-2 text-sm font-semibold transition-all"
                            >
                                <Plus className="w-5 h-5" /> Add another report
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="mt-8 flex flex-col items-center gap-4">
                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading || (mode === 'trends' && files.length < 2)}
                    className={`
                        w-full py-4 px-8 rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-lg
                        ${files.length === 0 || uploading || (mode === 'trends' && files.length < 2)
                            ? 'bg-gray-300 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-primary to-blue-600 hover:to-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] ring-4 ring-primary/20'}
                    `}
                >
                    {uploading ? (
                        <div className="flex items-center justify-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Processing Intelligence...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            {mode === 'single' ? 'Analyze Report' : 'Compare Reports'}
                            {!uploading && <CheckCircle className="w-5 h-5 opacity-50" />}
                        </div>
                    )}
                </button>

                {mode === 'trends' && files.length === 1 && (
                    <p className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full animate-pulse-slow">
                        * Please upload at least 2 reports to analyze trends.
                    </p>
                )}

                {uploading && (
                    <p className="text-center text-sm text-gray-500 flex items-center gap-2 animate-pulse-slow">
                        <Loader2 className="w-4 h-4 animate-spin" /> AI is analyzing your health data securely...
                    </p>
                )}
            </div>
        </div>
    );
};

export default UploadReport;
