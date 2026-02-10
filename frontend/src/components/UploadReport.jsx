import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, ImageIcon, X, AlertCircle } from 'lucide-react';

const UploadReport = ({ onUploadSuccess, setLoading, setError }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(selectedFile.type)) {
            setError("Please upload a PDF or Image file (JPG, PNG).");
            return;
        }
        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
            setError("File size exceeds 10MB limit.");
            return;
        }
        setError(null);
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Assuming backend is running on port 8000
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                onUploadSuccess(response.data);
            } else {
                setError("Upload failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "An error occurred during upload. Ensure backend is running.");
        } finally {
            setUploading(false);
            setLoading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center
          ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
          ${file ? 'bg-white border-solid border-gray-200' : ''}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                />

                {!file ? (
                    <div className="flex flex-col items-center justify-center py-6 cursor-pointer" onClick={() => inputRef.current?.click()}>
                        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-400">
                            PDF, JPG or PNG (max. 10MB)
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 text-left">
                            <div className="p-2 bg-white rounded-md border border-gray-200">
                                {file.type === 'application/pdf' ? (
                                    <FileText className="w-6 h-6 text-red-500" />
                                ) : (
                                    <ImageIcon className="w-6 h-6 text-blue-500" />
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={clearFile}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            disabled={uploading}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200
            ${!file || uploading
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-primary hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}
          `}
                >
                    {uploading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processing Report...</span>
                        </div>
                    ) : (
                        'Analyze Report'
                    )}
                </button>
            </div>

            {uploading && (
                <p className="text-center text-xs text-gray-500 mt-4 animate-pulse">
                    This checks sensitive health data. Please wait while AI analyzes your report...
                </p>
            )}
        </div>
    );
};

export default UploadReport;
