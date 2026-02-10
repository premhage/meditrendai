import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';

const RecommendationsPanel = ({ recommendations }) => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-100/50 w-24 h-24 rounded-full blur-2xl"></div>

            <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-white rounded-lg shadow-sm text-primary">
                    <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Health Recommendations</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {recommendations}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-amber-700 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <p>
                    Always consult with your doctor before making significant changes to your specific medication or treatment plan.
                </p>
            </div>
        </div>
    );
};

export default RecommendationsPanel;
