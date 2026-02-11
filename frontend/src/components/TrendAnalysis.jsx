import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus, ArrowLeft } from 'lucide-react';

const TrendAnalysis = ({ analysis, onReset }) => {
    // eslint-disable-next-line
    const { trends } = analysis;

    const getTrendIcon = (direction) => {
        if (direction === 'increasing') return <ArrowUpRight className="w-4 h-4 text-warning" />;
        if (direction === 'decreasing') return <ArrowDownRight className="w-4 h-4 text-success" />;
        return <Minus className="w-4 h-4 text-text-light" />;
    };

    const getTrendBadgeColor = (direction) => {
        if (direction === 'increasing') return 'bg-warning-light text-warning';
        if (direction === 'decreasing') return 'bg-success-light text-success';
        return 'bg-gray-100 text-text-light';
    };

    // Transform data for charts if needed, or use as is
    // Assuming analysis.trends is an array or object we map over

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-dark">Health Trends Analysis</h2>
                    <p className="text-text-medium mt-1">Visualizing your health metrics over time</p>
                </div>
                <button
                    onClick={onReset}
                    className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Upload
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Check if trends is valid before mapping */}
                {trends && Object.keys(trends).length > 0 ? (
                    Object.entries(trends).map(([paramName, data]) => (
                        <div key={paramName} className="card p-6 animate-slide-up">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-text-dark">{paramName}</h3>
                                    <p className="text-sm font-medium text-text-medium mt-1">
                                        Latest: <span className="font-bold text-text-dark">{data.latest_value}</span> {data.unit}
                                    </p>
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getTrendBadgeColor(data.direction)}`}>
                                    {getTrendIcon(data.direction)}
                                    <span className="text-xs font-bold uppercase tracking-wide">{data.direction}</span>
                                </div>
                            </div>

                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.series}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                            axisLine={false}
                                            tickLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                                            axisLine={false}
                                            tickLine={false}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                            itemStyle={{ color: '#1F2937', fontWeight: 600 }}
                                            labelStyle={{ color: '#6B7280', fontSize: '12px', marginBottom: '4px' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#0EA5E9"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#0EA5E9', strokeWidth: 2, stroke: '#fff' }}
                                            activeDot={{ r: 6, fill: '#0EA5E9', strokeWidth: 0 }}
                                            animationDuration={1500}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 lg:col-span-2 text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Minus className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-text-dark mb-1">No Trends Found</h3>
                        <p className="text-text-medium max-w-sm mx-auto">
                            We couldn't match enough data points across your reports to generate meaningful trends yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendAnalysis;
