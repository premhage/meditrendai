import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, ImageIcon, X, TrendingUp, Plus, CheckCircle, Loader2 } from 'lucide-react';

const UploadReport = ({ onUploadSuccess, onTrendAnalysisSuccess, setLoading, setError }) => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [mode, setMode] = useState('single');
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
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                    onClick={() => { setMode('single'); setFiles([]); setError(null); }}
                    className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300
                    ${mode === 'single'
                            ? 'bg-white shadow-sm text-primary'
                            : 'text-text-medium hover:text-text-dark'}`}
                >
                    Single Report
                </button>
                <button
                    onClick={() => { setMode('trends'); setFiles([]); setError(null); }}
                    className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${mode === 'trends'
                            ? 'bg-white shadow-sm text-primary'
                            : 'text-text-medium hover:text-text-dark'}`}
                >
                    <TrendingUp className="w-4 h-4" /> Trend Tracking
                </button>
            </div>

            {/* Docmed Style Upload Zone */}
            <div
                className={`
                    relative border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center cursor-pointer
                    ${dragActive
                        ? 'border-primary bg-primary-extraLight scale-[1.01]'
                        : 'border-blue-200 bg-primary-light/30 hover:bg-primary-extraLight hover:border-primary'}
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
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-xl font-bold text-text-dark mb-2">
                            Drop your medical report here
                        </p>
                        <p className="text-sm text-text-medium mb-6">
                            or click to browse
                        </p>
                        <div className="inline-flex gap-2 text-xs font-semibold text-primary bg-white px-3 py-1 rounded-full border border-blue-100">
                            PDF, JPG, PNG (Max 10MB)
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-primary-extraLight rounded-lg border border-blue-200 animate-slide-up">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="p-3 bg-white rounded-lg border border-blue-100 text-primary">
                                        {file.type === 'application/pdf' ? <FileText className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-text-dark truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-text-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(idx)}
                                    className="p-2 hover:bg-white rounded-full transition-colors text-text-medium hover:text-warning"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}

                        {mode === 'trends' && (
                            <button
                                onClick={() => inputRef.current?.click()}
                                className="w-full py-3 bg-white border border-dashed border-primary/30 rounded-lg text-primary hover:bg-primary-extraLight font-semibold text-sm transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add another
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
                    className={`btn-primary w-full text-lg shadow-lg
                        ${files.length === 0 || uploading || (mode === 'trends' && files.length < 2)
                            ? 'opacity-50 cursor-not-allowed shadow-none'
                            : ''}
                    `}
                >
                    {uploading ? (
                        <div className="flex items-center justify-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            {mode === 'single' ? 'Analyze Report' : 'Compare Reports'}
                        </div>
                    )}
                </button>

                {mode === 'trends' && files.length === 1 && (
                    <p className="text-xs font-semibold text-alert bg-alert-light px-3 py-1 rounded-full">
                        * Please upload at least 2 reports to analyze trends.
                    </p>
                )}
            </div>
        </div>
    );
};

export default UploadReport;
