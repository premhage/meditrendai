import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, ImageIcon, X, TrendingUp, Plus } from 'lucide-react';

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
            setFiles([validFiles[0]]); // Only keep the first valid file
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
                // Trends Mode
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
        <div className="w-full max-w-xl mx-auto space-y-6">

            {/* Mode Switcher */}
            <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                    onClick={() => { setMode('single'); setFiles([]); setError(null); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'single' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    Single Report Analysis
                </button>
                <button
                    onClick={() => { setMode('trends'); setFiles([]); setError(null); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${mode === 'trends' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <TrendingUp className="w-4 h-4" /> Track Health Trends
                </button>
            </div>

            <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center
                    ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
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
                    <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
                        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                            {mode === 'single' ? 'Click to upload or drag & drop' : 'Upload multiple reports to compare'}
                        </p>
                        <p className="text-sm text-gray-400">
                            PDF, JPG or PNG (max. 10MB)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2 bg-white rounded-md border border-gray-200">
                                        {file.type === 'application/pdf' ? (
                                            <FileText className="w-5 h-5 text-red-500" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(idx)}
                                    className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                    disabled={uploading}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        {mode === 'trends' && (
                            <button
                                onClick={() => inputRef.current?.click()}
                                className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-primary flex items-center justify-center gap-2 text-sm"
                            >
                                <Plus className="w-4 h-4" /> Add another report
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading || (mode === 'trends' && files.length < 2)}
                    className={`
                        w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200
                        ${files.length === 0 || uploading || (mode === 'trends' && files.length < 2)
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-primary hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}
                    `}
                >
                    {uploading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>{mode === 'single' ? 'Checkups in progress...' : 'Analyzing Trends...'}</span>
                        </div>
                    ) : (
                        mode === 'single' ? 'Analyze Report' : 'Compare Reports'
                    )}
                </button>
            </div>

            {mode === 'trends' && files.length === 1 && (
                <p className="text-center text-xs text-amber-500">
                    * Please upload at least 2 reports to analyze trends.
                </p>
            )}

            {uploading && (
                <p className="text-center text-xs text-gray-500 mt-4 animate-pulse">
                    AI is analyzing your reports. This may take up to 30 seconds.
                </p>
            )}
        </div>
    );
};

export default UploadReport;
