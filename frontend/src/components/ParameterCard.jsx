import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

const ParameterCard = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    // eslint-disable-next-line
    const { parameter, value, unit, status, reference_range_display, explanation, category } = data;

    // Status Config
    const statusConfig = {
        normal: {
            color: 'text-success',
            bg: 'bg-success-light',
            border: 'border-l-4 border-success',
            badge: 'bg-success-light text-success',
            icon: <CheckCircle className="w-5 h-5 text-success" />
        },
        high: {
            color: 'text-warning',
            bg: 'bg-warning-light',
            border: 'border-l-4 border-warning',
            badge: 'bg-warning-light text-warning',
            icon: <TrendingUp className="w-5 h-5 text-warning" />
        },
        low: {
            color: 'text-alert',
            bg: 'bg-alert-light',
            border: 'border-l-4 border-alert',
            badge: 'bg-alert-light text-alert',
            icon: <TrendingDown className="w-5 h-5 text-alert" />
        },
        default: {
            color: 'text-text-medium',
            bg: 'bg-bg-gray',
            border: 'border-l-4 border-gray-300',
            badge: 'bg-gray-100 text-text-medium',
            icon: <AlertCircle className="w-5 h-5 text-gray-400" />
        }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.default;

    return (
        <div className={`card overflow-hidden ${config.border} flex flex-col h-full`}>
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-text-dark text-lg leading-tight mb-1">{parameter}</h3>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-gray-100/80 text-text-light">
                            {category || 'General'}
                        </span>
                    </div>
                    <div className={`p-2 rounded-full ${config.bg} bg-opacity-30`}>
                        {config.icon}
                    </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-3xl font-extrabold ${config.color}`}>
                        {value}
                    </span>
                    <span className="text-text-light font-medium text-sm">{unit}</span>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-gray-50 pt-3 mt-auto">
                    <div>
                        <span className="block text-text-light mb-0.5">Reference</span>
                        <span className="font-semibold text-text-medium">{reference_range_display}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide ${config.badge}`}>
                        {status || 'Unknown'}
                    </div>
                </div>
            </div>

            {/* AI Explanation Section (Expandable) */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-5 py-3 bg-bg-gray border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-text-medium hover:text-primary transition-colors hover:bg-gray-100"
            >
                <span>AI Insight</span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded && (
                <div className="px-5 py-4 bg-gray-50 text-sm text-text-medium leading-relaxed border-t border-gray-100 animate-slide-up">
                    <p className="border-l-2 border-primary/30 pl-3">
                        {explanation}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ParameterCard;
