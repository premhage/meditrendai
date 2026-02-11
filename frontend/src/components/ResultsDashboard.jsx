import React from 'react';
import ParameterCard from './ParameterCard';
import RecommendationsPanel from './RecommendationsPanel';
import { Activity, CheckCircle, AlertTriangle, ArrowRight, Printer, Share2 } from 'lucide-react';

const ResultsDashboard = ({ results, onReset }) => {
    const { health_score, summary, parameters, recommendations, filename } = results;

    const handlePrint = () => {
        window.print();
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'stroke-green-500';
        if (score >= 60) return 'stroke-yellow-500';
        return 'stroke-red-500';
    };

    return (
        <div className="space-y-12 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        Health Report Analysis
                        <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                            AI Powered
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-1">Detailed breakdown of {filename}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm print:hidden"
                    >
                        <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 print:hidden">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </div>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Health Score Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex items-center justify-between relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 animate-slide-up">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

                    <div className="relative z-10">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Overall Health Score</h3>
                        <div className={`text-5xl font-extrabold ${getScoreColor(health_score)} drop-shadow-sm`}>
                            {health_score}<span className="text-2xl text-gray-300">/100</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-3 font-medium flex items-center gap-1">
                            <Activity className="w-4 h-4" /> Based on {summary.total_tests} metrics
                        </p>
                    </div>

                    <div className="relative w-28 h-28 transform group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-gray-100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className={`${getScoreBg(health_score)} drop-shadow-md`}
                                strokeDasharray={`${health_score}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                                style={{ transition: 'stroke-dasharray 1s ease-out' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {health_score >= 80 ? (
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            ) : (
                                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col justify-center animate-slide-up-delay-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Summary</h3>
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors cursor-default">
                            <p className="text-3xl font-extrabold text-gray-900 mb-1">{summary.total_tests}</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total Tests</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors cursor-default">
                            <p className="text-3xl font-extrabold text-green-600 mb-1">{summary.normal}</p>
                            <p className="text-xs text-green-700 font-bold uppercase tracking-wide">Normal Range</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 hover:bg-amber-100 transition-colors cursor-default">
                            <p className="text-3xl font-extrabold text-amber-600 mb-1">{summary.abnormal}</p>
                            <p className="text-xs text-amber-700 font-bold uppercase tracking-wide">Action Needed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations Panel */}
            <div className="animate-slide-up-delay-2">
                <RecommendationsPanel recommendations={recommendations} />
            </div>

            {/* Detailed Parameters Grid */}
            <div className="animate-slide-up-delay-3">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-4">
                        Detailed Analysis
                    </h2>
                    <div className="text-sm font-medium text-gray-400">
                        {parameters.length} Parameters Analyzed
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parameters.map((param, index) => (
                        <div key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
                            <ParameterCard data={param} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8 animate-fade-in">
                <button
                    onClick={onReset}
                    className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                    Upload Another Report
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default ResultsDashboard;
