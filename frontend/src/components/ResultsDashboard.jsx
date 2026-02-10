import React from 'react';
import ParameterCard from './ParameterCard';
import RecommendationsPanel from './RecommendationsPanel';
import { Activity, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const ResultsDashboard = ({ results, onReset }) => {
    const { health_score, summary, parameters, recommendations, filename } = results;

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
        <div className="animate-fade-in space-y-8">
            {/* Top Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Health Score Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Health Score</h3>
                        <div className={`text-4xl font-bold ${getScoreColor(health_score)}`}>
                            {health_score}/100
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Based on {summary.total_tests} parameters</p>
                    </div>

                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-gray-100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className={`${getScoreBg(health_score)}`}
                                strokeDasharray={`${health_score}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                            />
                        </svg>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{summary.total_tests}</p>
                            <p className="text-xs text-gray-500 font-medium">Total Tests</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                            <p className="text-2xl font-bold text-green-600">{summary.normal}</p>
                            <p className="text-xs text-green-700 font-medium">Normal</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                            <p className="text-2xl font-bold text-amber-600">{summary.abnormal}</p>
                            <p className="text-xs text-amber-700 font-medium">Needs Attention</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <RecommendationsPanel recommendations={recommendations} />

            {/* Detailed Parameters */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Detailed Analysis</h2>
                    <div className="text-sm text-gray-500">File: {filename}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parameters.map((param, index) => (
                        <ParameterCard key={index} data={param} />
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
                >
                    Upload another report <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ResultsDashboard;
