import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

const ParameterCard = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const { parameter, value, unit, status, reference_range_display, explanation, category } = data;

    const isNormal = status === 'normal' || status === 'optimal';
    const isHigh = status === 'high';
    const isLow = status === 'low';

    // Status Styles
    const statusStyles = {
        normal: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
        optimal: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
        high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: <TrendingUp className="w-5 h-5 text-red-600" /> },
        low: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: <TrendingDown className="w-5 h-5 text-yellow-600" /> },
        default: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: <AlertCircle className="w-5 h-5 text-gray-600" /> }
    };

    const currentStatus = statusStyles[status] || statusStyles.default;

    return (
        <div className={`bg-white rounded-xl border ${currentStatus.border} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-gray-100 text-gray-500 mb-2">
                            {category}
                        </span>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{parameter}</h3>
                    </div>
                    <div className={`p-2 rounded-full ${currentStatus.bg}`}>
                        {currentStatus.icon}
                    </div>
                </div>

                <div className="flex items-baseline gap-1 my-3">
                    <span className={`text-3xl font-extrabold ${currentStatus.text}`}>
                        {value}
                    </span>
                    <span className="text-gray-500 font-medium text-sm">{unit}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <div>
                        <span className="block mb-0.5">Reference Range</span>
                        <span className="font-semibold">{reference_range_display}</span>
                    </div>
                    <div className={`px-2 py-1 rounded font-semibold capitalize ${currentStatus.bg} ${currentStatus.text}`}>
                        {status}
                    </div>
                </div>
            </div>

            {/* AI Explanation Section (Expandable) */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
                <span>AI Insight</span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded && (
                <div className="px-5 py-4 bg-gray-50/50 text-sm text-gray-700 leading-relaxed border-t border-gray-100 animate-slide-down">
                    {explanation}
                </div>
            )}
        </div>
    );
};

export default ParameterCard;
