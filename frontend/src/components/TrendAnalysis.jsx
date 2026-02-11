import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const TrendAnalysis = ({ analysis, onReset }) => {
    const { trends } = analysis;

    const getTrendIcon = (direction) => {
        if (direction === 'increasing') return <ArrowUpRight className="w-5 h-5 text-red-500" />;
        if (direction === 'decreasing') return <ArrowDownRight className="w-5 h-5 text-green-500" />;
        return <Minus className="w-5 h-5 text-gray-400" />;
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Health Trends Analysis</h2>
                <button
                    onClick={onReset}
                    className="text-sm text-primary hover:underline"
                >
                    Back to Upload
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(trends).map(([paramName, data]) => (
                    <div key={paramName} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{paramName}</h3>
                                <p className="text-sm text-gray-500">Latest: {data.latest_value} {data.unit}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                                {getTrendIcon(data.direction)}
                                <span className="text-xs font-medium uppercase text-gray-600">{data.direction}</span>
                            </div>
                        </div>

                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.series}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563EB"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>

            {Object.keys(trends).length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">Not enough matching data points found across reports to generate trends.</p>
                </div>
            )}
        </div>
    );
};

export default TrendAnalysis;
